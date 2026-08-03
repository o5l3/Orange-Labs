#!/usr/bin/env node
/**
 * public/release_notes/ 아래의 릴리즈별 폴더를 훑어 목록 index.json을 만든다.
 *
 *   node scripts/sync-release-notes.mjs [--check]
 *
 * 새 릴리즈를 낼 때는 폴더 하나만 추가하면 된다. 페이지 코드는 손대지 않는다.
 *
 *   public/release_notes/<slug>/
 *     release.json      버전 · 배포일 · 변경 항목 · 언어별 문구
 *     ko.md             상세 페이지 본문 (한국어)
 *     release-notes.pdf 원본 릴리즈 노트
 *
 * 산출물
 *   public/release_notes/index.json   목록·상세 페이지가 읽는 단일 파일
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'public', 'release_notes');
const INDEX = path.join(DIR, 'index.json');

/** index.json은 생성물이므로 릴리즈 폴더를 찾을 때 건너뛴다. */
const isReleaseDir = (name) => fs.statSync(path.join(DIR, name)).isDirectory();

const KINDS = new Set(['new', 'improved', 'fixed']);

function readRelease(slug) {
  const dir = path.join(DIR, slug);
  const file = path.join(dir, 'release.json');
  if (!fs.existsSync(file)) {
    throw new Error(`${slug}: release.json이 없습니다`);
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  for (const field of ['version', 'date', 'pdf', 'items', 'i18n']) {
    if (!data[field]) throw new Error(`${slug}: release.json에 ${field}가 없습니다`);
  }
  if (data.slug && data.slug !== slug) {
    throw new Error(`${slug}: release.json의 slug(${data.slug})가 폴더명과 다릅니다`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    throw new Error(`${slug}: date는 YYYY-MM-DD 형식이어야 합니다 — ${data.date}`);
  }
  if (!fs.existsSync(path.join(dir, data.pdf))) {
    throw new Error(`${slug}: PDF를 찾을 수 없습니다 — ${data.pdf}`);
  }
  if (!fs.existsSync(path.join(dir, 'ko.md'))) {
    throw new Error(`${slug}: 상세 본문 ko.md가 없습니다`);
  }

  const keys = data.items.map((it) => {
    if (!KINDS.has(it.kind)) {
      throw new Error(`${slug}: 알 수 없는 kind "${it.kind}" — ${[...KINDS].join(' / ')} 중 하나여야 합니다`);
    }
    return it.key;
  });

  // 한국어는 필수, 나머지 언어는 빠지면 한국어로 대체된다(페이지에서 처리).
  if (!data.i18n.ko) throw new Error(`${slug}: i18n.ko가 없습니다`);
  for (const [lang, block] of Object.entries(data.i18n)) {
    const missing = keys.filter((k) => !block.items?.[k]);
    if (missing.length) {
      console.warn(`  ${slug} (${lang}) 문구 누락: ${missing.join(', ')}`);
    }
  }

  return {
    ...data,
    slug,
    pdf: `/release_notes/${slug}/${data.pdf}`,
    body: `/release_notes/${slug}/ko.md`,
  };
}

function main() {
  const check = process.argv.includes('--check');

  if (!fs.existsSync(DIR)) throw new Error(`릴리즈 노트 폴더가 없습니다: ${DIR}`);

  const slugs = fs.readdirSync(DIR).filter(isReleaseDir).sort();
  if (!slugs.length) throw new Error(`${DIR} 아래에 릴리즈 폴더가 없습니다`);

  const releases = slugs.map(readRelease);
  // 최신 배포가 위로. 같은 날짜면 slug 역순.
  releases.sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug));

  if (!check) {
    fs.writeFileSync(INDEX, `${JSON.stringify(releases, null, 2)}\n`, 'utf-8');
  }

  console.log(
    `${check ? '[check] ' : ''}릴리즈 ${releases.length}건 처리 완료 — ` +
      releases.map((r) => r.version).join(', '),
  );
}

main();
