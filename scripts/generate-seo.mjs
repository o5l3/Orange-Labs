/**
 * 빌드 산출물(dist)에 SEO 자산을 채워 넣는다.
 *
 *  1. sitemap.xml 생성 (정적 라우트 + 기술 블로그 글 전체)
 *  2. robots.txt의 Sitemap 주소를 실제 배포 도메인으로 교정
 *  3. 경로별 index.html 사전 생성 — JS를 실행하지 않는 크롤러와
 *     카카오톡·슬랙 같은 공유 미리보기 봇이 올바른 메타태그를 보게 한다.
 *
 * Vercel은 rewrites보다 파일 시스템을 먼저 확인하므로,
 * dist/company/about/index.html 이 있으면 /company/about 요청에 그 파일이 응답된다.
 *
 * 사용: node scripts/generate-seo.mjs   (package.json의 build 마지막 단계)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.orangelabs.xyz').replace(/\/+$/, '');
const SITE_NAME = 'OrangeLabs';
const OG_IMAGE = `${SITE_URL}/images/orangebox.png`;
const OG_IMAGE_WIDTH = 720;
const OG_IMAGE_HEIGHT = 720;

/** 사전 렌더링에 사용할 기준 언어 (i18n fallbackLng와 동일) */
const BASE_LANG = 'ko';
const BASE_OG_LOCALE = 'ko_KR';

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const routes = readJson(path.join(root, 'src/seo/routes.json'));
const locale = readJson(path.join(root, `src/i18n/locales/${BASE_LANG}.json`));
const blogData = readJson(path.join(root, 'public/tech_blog/tech_blog.json'));
const releases = readJson(path.join(root, 'public/release_notes/index.json'));

if (!fs.existsSync(dist)) {
  console.error('[seo] dist 디렉터리가 없습니다. vite build 후에 실행하세요.');
  process.exit(1);
}

// ---------------------------------------------------------------- 블로그 글

const basePosts =
  blogData.find((d) => d.language === BASE_LANG)?.posts ??
  blogData.find((d) => d.language === 'en')?.posts ??
  [];

const slugOf = (md) => (md.split('/').at(-1) ?? '').replace(/\.md$/, '');
const isoDate = (s) => {
  const [y, m, d] = String(s).split('.');
  return y && m && d ? `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}` : undefined;
};

const posts = basePosts
  .map((p) => ({
    slug: slugOf(p.md),
    path: `/resources/tech-blog/${slugOf(p.md)}`,
    title: p.subject,
    description: p.content,
    lastmod: isoDate(p.createdAt),
    section: p.category,
  }))
  .filter((p) => p.slug);

// ------------------------------------------------------------- 릴리즈 노트

const releaseTitle = locale.releaseNotes?.title ?? '릴리즈 노트';

const releasePages = releases
  .filter((r) => r.slug)
  .map((r) => ({
    path: `/resources/release-notes/${r.slug}`,
    title: `${r.version} ${releaseTitle}`,
    description: (r.i18n?.[BASE_LANG] ?? r.i18n?.ko)?.excerpt ?? '',
    lastmod: r.date,
  }));

// ---------------------------------------------------------------- sitemap

const xmlEscape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlEntry = ({ loc, lastmod, changefreq, priority }) =>
  [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority !== undefined ? `    <priority>${priority.toFixed(1)}</priority>` : null,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) =>
    urlEntry({
      loc: r.path === '/' ? `${SITE_URL}/` : SITE_URL + r.path,
      changefreq: r.changefreq,
      priority: r.priority,
    }),
  ),
  ...releasePages.map((r) =>
    urlEntry({
      loc: SITE_URL + r.path,
      lastmod: r.lastmod,
      changefreq: 'yearly',
      priority: 0.6,
    }),
  ),
  ...posts.map((p) =>
    urlEntry({
      loc: SITE_URL + p.path,
      lastmod: p.lastmod,
      changefreq: 'yearly',
      priority: 0.6,
    }),
  ),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

// ---------------------------------------------------------------- robots.txt

const robotsPath = path.join(dist, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs
    .readFileSync(robotsPath, 'utf8')
    .replace(/^Sitemap:.*$/m, `Sitemap: ${SITE_URL}/sitemap.xml`);
  fs.writeFileSync(robotsPath, robots, 'utf8');
}

// ---------------------------------------------------------------- 사전 렌더링

const indexPath = path.join(dist, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const SEO_BLOCK = /<!--\s*seo:start\s*-->[\s\S]*?<!--\s*seo:end\s*-->/;
if (!SEO_BLOCK.test(indexHtml)) {
  console.error('[seo] index.html에서 seo:start ~ seo:end 마커를 찾지 못했습니다.');
  process.exit(1);
}

const attrEscape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const htmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function metaBlock({ title, description, url, type, lastmod, section }) {
  const t = attrEscape(title);
  const d = attrEscape(description);
  const u = attrEscape(url);
  return [
    '<!-- seo:start -->',
    `<title data-seo-static>${htmlEscape(title)}</title>`,
    `<meta data-seo-static name="description" content="${d}" />`,
    `<link data-seo-static rel="canonical" href="${u}" />`,
    '<meta data-seo-static name="robots" content="index, follow, max-image-preview:large" />',
    `<meta data-seo-static property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-seo-static property="og:type" content="${type}" />`,
    `<meta data-seo-static property="og:title" content="${t}" />`,
    `<meta data-seo-static property="og:description" content="${d}" />`,
    `<meta data-seo-static property="og:url" content="${u}" />`,
    `<meta data-seo-static property="og:image" content="${OG_IMAGE}" />`,
    `<meta data-seo-static property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta data-seo-static property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta data-seo-static property="og:locale" content="${BASE_OG_LOCALE}" />`,
    lastmod
      ? `<meta data-seo-static property="article:published_time" content="${lastmod}" />`
      : null,
    section
      ? `<meta data-seo-static property="article:section" content="${attrEscape(section)}" />`
      : null,
    '<meta data-seo-static name="twitter:card" content="summary_large_image" />',
    `<meta data-seo-static name="twitter:title" content="${t}" />`,
    `<meta data-seo-static name="twitter:description" content="${d}" />`,
    `<meta data-seo-static name="twitter:image" content="${OG_IMAGE}" />`,
    '<!-- seo:end -->',
  ]
    .filter(Boolean)
    .join('\n    ');
}

/**
 * JS를 실행하지 않는 크롤러(네이버 Yeti 등)에 보여줄 최소한의 본문.
 * createRoot().render()가 #root의 자식을 통째로 교체하므로 실제 화면에는 영향이 없다.
 */
const crawlerNav = [...routes.map((r) => ({ href: r.path, label: locale.seo[r.key].title }))]
  .map((l) => `<li><a href="${attrEscape(l.href)}">${htmlEscape(l.label)}</a></li>`)
  .join('');

function fallbackBody({ heading, title, description }) {
  return (
    '<div id="root">' +
    '<div data-seo-fallback>' +
    `<h1>${htmlEscape(heading ?? title)}</h1>` +
    `<p>${htmlEscape(description)}</p>` +
    `<nav><ul>${crawlerNav}</ul></nav>` +
    '</div>' +
    '</div>'
  );
}

function writePage(routePath, meta) {
  const html = indexHtml
    .replace(SEO_BLOCK, metaBlock(meta))
    .replace('<div id="root"></div>', fallbackBody(meta));

  const outDir = routePath === '/' ? dist : path.join(dist, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

const BRAND_SUFFIX = '오렌지랩스 OrangeLabs';
const withBrand = (title) => (title.includes(SITE_NAME) ? title : `${title} | ${BRAND_SUFFIX}`);

for (const route of routes) {
  const entry = locale.seo[route.key];
  if (!entry) {
    console.warn(`[seo] 로케일에 seo.${route.key} 항목이 없어 건너뜁니다.`);
    continue;
  }
  writePage(route.path, {
    title: withBrand(entry.title),
    heading: entry.title,
    description: entry.description,
    url: route.path === '/' ? `${SITE_URL}/` : SITE_URL + route.path,
    type: 'website',
  });
}

for (const release of releasePages) {
  writePage(release.path, {
    title: withBrand(release.title),
    heading: release.title,
    description: release.description,
    url: SITE_URL + release.path,
    type: 'article',
    lastmod: release.lastmod,
  });
}

for (const post of posts) {
  writePage(post.path, {
    title: withBrand(post.title),
    heading: post.title,
    description: post.description,
    url: SITE_URL + post.path,
    type: 'article',
    lastmod: post.lastmod,
    section: post.section,
  });
}

console.log(
  `[seo] sitemap.xml (${routes.length + releasePages.length + posts.length}개 URL) · ` +
    `사전 렌더링 ${routes.length}개 라우트 + 릴리즈 노트 ${releasePages.length}건 + ` +
    `블로그 ${posts.length}편 · 기준 도메인 ${SITE_URL}`,
);
