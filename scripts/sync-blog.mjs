#!/usr/bin/env node
/**
 * blogs 저장소(_posts)의 기술 블로그 글을 홈페이지 공개 블로그로 동기화한다.
 *
 *   node scripts/sync-blog.mjs [--posts <dir>] [--check]
 *
 *   --posts  원본 _posts 디렉터리 (기본: ../blogs/_posts, 환경변수 BLOG_POSTS_DIR로도 지정 가능)
 *   --check  파일을 쓰지 않고 정제 검사만 수행 (CI용)
 *
 * 산출물
 *   public/tech_blog/md/<slug>.md   정제된 본문
 *   public/tech_blog/tech_blog.json ko/en/zh/ja 목록 메타데이터
 *
 * 원본은 사내용이라 팀원 계정명·입사일·개인별 실적 같은 개인정보가 들어 있다.
 * 정제 규칙은 scripts/blog-sanitize.json, 번역은 scripts/blog-i18n.json에 있다.
 * 정제 후에도 금지 패턴이 남아 있으면 이 스크립트는 에러로 중단한다.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'tech_blog');
const MD_DIR = path.join(OUT_DIR, 'md');

/**
 * 'zh'는 간체다. 페이지가 언어 코드를 완전 일치 → 앞부분 일치 → en 순으로 찾으므로
 * zh-Hans는 'zh'로, zh-Hant는 전용 항목으로 떨어진다.
 */
const LANGUAGES = ['ko', 'en', 'zh', 'zh-Hant', 'ja'];

/** blogs의 category → 홈페이지 카드에 표시할 라벨과 색상 */
const CATEGORIES = {
  tech: { label: 'Guide', color: '#3b82f6' },
  report: { label: 'Report', color: '#10b981' },
  'dev-log': { label: 'Dev Log', color: '#8b5cf6' },
};

/** 한국어 기술 문서 기준 분당 읽기 분량(글자). 코드 블록이 많아 보수적으로 잡았다. */
const CHARS_PER_MINUTE = 700;

function parseArgs(argv) {
  const args = { posts: process.env.BLOG_POSTS_DIR ?? null, check: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--posts') {
      args.posts = argv[i + 1];
      i += 1;
    } else if (argv[i] === '--check') {
      args.check = true;
    }
  }
  args.posts = path.resolve(args.posts ?? path.join(ROOT, '..', 'blogs', '_posts'));
  return args;
}

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'));

/**
 * frontmatter를 파싱한다. blogs의 frontmatter는 `key: value` 한 줄 형식에
 * 큰따옴표 문자열과 `[a, b]` 목록만 쓰므로 YAML 파서를 들이지 않는다.
 * 형식을 벗어나면 조용히 넘기지 않고 에러를 낸다.
 */
function parseFrontMatter(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: frontmatter를 찾을 수 없습니다`);

  const data = {};
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: frontmatter 해석 실패 — ${line}`);
    const [, key, rawValue] = kv;
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      data[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (rawValue.startsWith('"') && rawValue.endsWith('"') && rawValue.length >= 2) {
      data[key] = rawValue.slice(1, -1);
    } else {
      data[key] = rawValue;
    }
  }
  return { data, body: m[2] };
}

function serializeFrontMatter(data) {
  const lines = Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) return `${key}: [${value.join(', ')}]`;
    if (key === 'title' || key === 'excerpt') return `${key}: "${value}"`;
    return `${key}: ${value}`;
  });
  return `---\n${lines.join('\n')}\n---\n`;
}

/** 첫 줄이 dropCodeBlocks 패턴과 맞는 fenced code block을 통째로 지운다. */
function dropCodeBlocks(text, patterns) {
  if (!patterns.length) return text;
  const regexes = patterns.map((p) => new RegExp(p));
  return text.replace(/```[^\n]*\n([\s\S]*?)```\n?/g, (block, inner) => {
    const firstLine = inner.split('\n')[0] ?? '';
    return regexes.some((re) => re.test(firstLine)) ? '' : block;
  });
}

/** '## <계정명> — <주제>' 헤더에서 계정명을 떼고 주제만 남긴다. */
function stripIdentityFromHeadings(text, identities) {
  if (!identities.length) return text;
  const alt = identities.map(escapeRegExp).join('|');
  return text.replace(new RegExp(`^(#{1,6}) (?:${alt})\\s*[—-]\\s*`, 'gm'), '$1 ');
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function sanitize(text, rules) {
  let out = text;

  for (const { find, replace } of rules.redactions) {
    out = out.split(find).join(replace);
  }

  out = dropCodeBlocks(out, rules.dropCodeBlocks ?? []);

  const identities = Object.keys(rules.identityMap);
  if (rules.stripIdentityFromHeadings) {
    out = stripIdentityFromHeadings(out, identities);
  }

  // 긴 계정명부터 치환해야 hja-orange가 hja로 먼저 잘리지 않는다.
  for (const name of [...identities].sort((a, b) => b.length - a.length)) {
    out = out.replace(
      new RegExp(`\`${escapeRegExp(name)}\`|\\b${escapeRegExp(name)}\\b`, 'g'),
      rules.identityMap[name],
    );
  }

  // 라벨로 바뀌면서 앞말의 받침이 달라진 자리의 조사 교정
  for (const { find, replace } of rules.particleFixes ?? []) {
    out = out.split(find).join(replace);
  }

  // 통계표 블록이 빠지면서 생긴 연속 빈 줄만 정리한다.
  // 본문 문자 자체는 건드리지 않는다 — 예전에 빈 괄호를 지우는 규칙을 뒀다가
  // PowerShell 코드의 `@()` · `.Trim()`까지 망가뜨린 적이 있다.
  out = out.replace(/\n{3,}/g, '\n\n');

  return out;
}

function readMinutes(body) {
  const chars = body.replace(/\s+/g, '').length;
  return String(Math.max(1, Math.round(chars / CHARS_PER_MINUTE)));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(args.posts)) {
    throw new Error(
      `원본 글 디렉터리를 찾을 수 없습니다: ${args.posts}\n` +
        `blogs 저장소를 체크아웃한 뒤 --posts 로 경로를 지정하세요.`,
    );
  }

  const rules = readJson(path.join(ROOT, 'scripts', 'blog-sanitize.json'));
  const i18n = readJson(path.join(ROOT, 'scripts', 'blog-i18n.json'));
  const forbidden = rules.forbiddenPatterns.map((p) => ({ src: p, re: new RegExp(p) }));

  const files = fs.readdirSync(args.posts).filter((f) => f.endsWith('.md')).sort();
  const posts = [];
  const violations = [];
  const missingTranslations = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(args.posts, file), 'utf-8');
    const { data, body } = parseFrontMatter(raw, file);

    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const category = CATEGORIES[data.category];
    if (!category) {
      throw new Error(`${file}: 알 수 없는 category "${data.category}" — CATEGORIES에 추가하세요`);
    }

    const cleanBody = sanitize(body, rules);
    const cleanData = {
      ...data,
      title: sanitize(data.title, rules),
      excerpt: sanitize(data.excerpt, rules),
      author: rules.authorOverride,
      tags: (data.tags ?? []).filter((t) => !rules.tagBlocklist.includes(t)),
    };

    const output = serializeFrontMatter(cleanData) + cleanBody;

    for (const { src, re } of forbidden) {
      const hit = output.match(re);
      if (hit) violations.push(`${file}: 금지 패턴 "${src}" 잔류 — ${JSON.stringify(hit[0])}`);
    }

    const minutes = readMinutes(cleanBody);
    const createdAt = String(data.date).slice(0, 10).replace(/-/g, '.');
    const translations = i18n[slug] ?? {};

    for (const language of LANGUAGES) {
      const t = language === 'ko' ? { title: cleanData.title, excerpt: cleanData.excerpt } : translations[language];
      if (!t) missingTranslations.push(`${slug} (${language})`);
      const bucket = posts.find((p) => p.language === language) ?? (posts.push({ language, posts: [] }), posts.at(-1));
      bucket.posts.push({
        category: category.label,
        categoryColor: category.color,
        subject: t?.title ?? cleanData.title,
        content: t?.excerpt ?? cleanData.excerpt,
        readMinutes: minutes,
        createdAt,
        md: `/tech_blog/md/${slug}.md`,
      });
    }

    if (!args.check) {
      fs.mkdirSync(MD_DIR, { recursive: true });
      fs.writeFileSync(path.join(MD_DIR, `${slug}.md`), output, 'utf-8');
    }
  }

  if (violations.length) {
    console.error('\n정제되지 않은 개인정보/내부정보가 남아 있어 동기화를 중단합니다:\n');
    for (const v of violations) console.error(`  - ${v}`);
    console.error(
      '\nscripts/blog-sanitize.json의 redactions 또는 identityMap에 규칙을 추가한 뒤 다시 실행하세요.\n',
    );
    process.exit(1);
  }

  for (const bucket of posts) {
    bucket.posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  posts.sort((a, b) => LANGUAGES.indexOf(a.language) - LANGUAGES.indexOf(b.language));

  if (!args.check) {
    fs.writeFileSync(path.join(OUT_DIR, 'tech_blog.json'), `${JSON.stringify(posts, null, 2)}\n`, 'utf-8');
  }

  console.log(`${args.check ? '[check] ' : ''}글 ${files.length}건 · 언어 ${LANGUAGES.length}종 처리 완료`);
  if (missingTranslations.length) {
    console.warn(`\n번역 누락 ${missingTranslations.length}건 (한국어 원문으로 표시됩니다):`);
    for (const m of missingTranslations) console.warn(`  - ${m}`);
    console.warn('\nscripts/blog-i18n.json에 번역을 추가하세요.');
  }
}

main();
