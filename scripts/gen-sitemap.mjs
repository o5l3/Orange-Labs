#!/usr/bin/env node
/**
 * public/sitemap.xml을 만든다.
 *
 *   node scripts/gen-sitemap.mjs [--base https://orangelabs.xyz] [--check]
 *
 * 고정 페이지 + 기술 블로그 글 + 릴리즈 노트를 모두 넣는다. 블로그는 매주
 * 늘어나므로 blogs 동기화 워크플로에서 이 스크립트를 이어서 돌린다.
 *
 * SPA라 라우트마다 별도 HTML이 없다. Googlebot이 JS를 실행해 렌더하므로
 * 사이트맵으로 URL 목록만 알려주면 각 페이지가 개별 색인된다.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const DEFAULT_BASE = 'https://orangelabs.xyz';

/** changefreq/priority는 색인 힌트일 뿐 강제력이 없다. 갱신이 잦은 순으로 둔다. */
const STATIC_ROUTES = [
  ['/', 'weekly', '1.0'],
  ['/products/orange-the-client', 'monthly', '0.9'],
  ['/pricing', 'monthly', '0.8'],
  ['/resources/tech-blog', 'weekly', '0.8'],
  ['/resources/release-notes', 'monthly', '0.8'],
  ['/resources/user-manual', 'monthly', '0.7'],
  ['/resources/demo-videos', 'monthly', '0.7'],
  ['/company/about', 'monthly', '0.6'],
  ['/company/careers', 'weekly', '0.6'],
  ['/company/partners', 'monthly', '0.5'],
  ['/company/support', 'monthly', '0.5'],
  ['/company/contact', 'monthly', '0.5'],
  ['/privacy', 'yearly', '0.2'],
  ['/terms', 'yearly', '0.2'],
];

const readJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf-8')) : null);

/** 2026.07.27 · 2026-07-27 둘 다 받아 YYYY-MM-DD로 맞춘다. */
const toW3C = (s) => String(s).replace(/\./g, '-').slice(0, 10);

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

function collect() {
  const urls = STATIC_ROUTES.map(([loc, changefreq, priority]) => ({ loc, changefreq, priority }));

  // 기술 블로그 — 한국어 목록이 전체 글을 담고 있다.
  const blog = readJson(path.join(PUBLIC, 'tech_blog', 'tech_blog.json'));
  const posts = blog?.find((b) => b.language === 'ko')?.posts ?? [];
  for (const post of posts) {
    const slug = (post.md.split('/').at(-1) ?? '').replace(/\.md$/, '');
    if (!slug) continue;
    urls.push({
      loc: `/resources/tech-blog/${slug}`,
      lastmod: toW3C(post.createdAt),
      changefreq: 'yearly',
      priority: '0.6',
    });
  }

  // 릴리즈 노트
  for (const release of readJson(path.join(PUBLIC, 'release_notes', 'index.json')) ?? []) {
    urls.push({
      loc: `/resources/release-notes/${release.slug}`,
      lastmod: toW3C(release.date),
      changefreq: 'yearly',
      priority: '0.6',
    });
  }

  return urls;
}

function main() {
  const argv = process.argv.slice(2);
  const baseIndex = argv.indexOf('--base');
  const base = (baseIndex >= 0 ? argv[baseIndex + 1] : process.env.SITE_URL || DEFAULT_BASE).replace(/\/$/, '');
  const check = argv.includes('--check');

  const urls = collect();
  const body = urls
    .map(({ loc, lastmod, changefreq, priority }) =>
      [
        '  <url>',
        `    <loc>${escapeXml(base + loc)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  if (!check) fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), xml, 'utf-8');

  console.log(
    `${check ? '[check] ' : ''}sitemap ${urls.length}개 URL (고정 ${STATIC_ROUTES.length} · 나머지 ${urls.length - STATIC_ROUTES.length}) — ${base}`,
  );
}

main();
