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
import dns from 'node:dns/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.orangelabs.xyz').replace(/\/+$/, '');

/**
 * SITE_URL의 호스트가 실제로 존재하는지 확인한다.
 *
 * 한 번 크게 데인 자리다. 도메인을 사기만 하고 DNS 연결은 안 된 상태에서
 * SITE_URL을 그 도메인으로 바꿔 배포한 적이 있다. 그러면 사이트는 멀쩡히
 * 뜨는데 —
 *   - 모든 canonical이 존재하지 않는 호스트를 가리키고,
 *   - sitemap.xml의 URL이 사이트맵 자신과 다른 호스트가 되어 구글이 통째로
 *     거부한다("가져올 수 없음", 발견된 페이지 0).
 * 화면상 아무 증상이 없어서 한 달을 모르고 지나갔다.
 *
 * 도메인을 옮길 때는 DNS가 붙은 뒤에 이 값을 바꿔야 한다. 이 검사가 그 순서를
 * 강제한다. 빌드를 실패시키는 쪽을 택한 이유는, 이 사고가 조용히 진행되는 데
 * 비해 실패는 바로 눈에 띄기 때문이다.
 */
const siteHost = new URL(SITE_URL).hostname;
try {
  await dns.lookup(siteHost);
} catch {
  console.error(
    `[seo] SITE_URL의 호스트 '${siteHost}'를 DNS에서 찾을 수 없습니다.\n` +
      `  이대로 배포하면 canonical과 sitemap이 존재하지 않는 도메인을 가리켜\n` +
      `  검색엔진이 사이트맵을 거부하고 색인이 무너집니다.\n` +
      `  도메인을 옮기는 중이라면 DNS 연결을 먼저 끝내세요.\n` +
      `  (현재 값은 VITE_SITE_URL 환경변수 또는 scripts/generate-seo.mjs·src/seo/site.ts의 기본값)`,
  );
  process.exit(1);
}
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

// Google Search Console이 실제로 읽는 사이트맵. 내용은 sitemap.xml과 바이트
// 단위로 같고 경로만 다르다. 지우지 말 것 — 이유는 아래.
//
// /sitemap.xml 은 GSC에서 한 달 넘게 "가져올 수 없음 / 발견된 페이지 0 /
// 마지막으로 읽은 날짜 없음"으로 굳어 있다. 그 URL은 초기에 페이지 URL을 잘못
// 제출해 몇 번 실패했고, 이어서 SITE_URL이 연결되지 않은 도메인을 가리키던
// 기간 내내 거부당했다. 구글은 반복 실패한 사이트맵 URL의 재시도 간격을 크게
// 늘리므로, 파일을 고친 뒤에도 그 URL은 한동안 다시 시도되지 않는다.
//
// 같은 내용을 이력 없는 경로로 내보내자 즉시 읽혔다 (118 URL 전부 발견).
// 파일·서빙 문제가 아니라 그 URL에 붙은 실패 이력의 문제라는 뜻이다.
//
// robots.txt 의 Sitemap 은 sitemap.xml 을 가리킨 그대로 둔다. 네이버·빙 등은
// 그쪽을 정상으로 읽는다. GSC만 이 파일을 쓴다.
//
// GSC의 /sitemap.xml 항목이 언젠가 성공으로 바뀌면 이 블록과 파일을 지워도 된다.
fs.writeFileSync(path.join(dist, 'sitemap-1.xml'), sitemap, 'utf8');

// ---------------------------------------------------------------------- RSS

/**
 * 기술 블로그 RSS 피드.
 *
 * 네이버 서치어드바이저의 'RSS 제출'용이자 일반 구독용이다. 네이버는 사이트맵만
 * 두면 새 글을 늦게 잡는데, RSS는 갱신 확인 주기가 짧아 주 1회 발행되는 블로그에
 * 효과가 크다. 구글도 RSS를 사이트맵 대체 포맷으로 받는다.
 *
 * 전문이 아니라 제목·요약·링크만 싣는다. 본문은 각 글 페이지에서 읽게 한다.
 */
const RSS_MAX = 50; // 피드 관례상 최근분만. 전체 목록은 사이트맵이 담당한다.

/** YYYY-MM-DD → RFC 822 (KST 기준). 형식이 어긋나면 undefined를 돌려 항목에서 뺀다. */
function rfc822(isoDate) {
  if (!isoDate) return undefined;
  const t = Date.parse(`${isoDate}T00:00:00+09:00`);
  if (Number.isNaN(t)) return undefined;
  // Date는 UTC로 들고 있으므로 +9시간 보정 후 UTC 필드를 읽으면 KST 벽시계가 된다.
  const k = new Date(t + 9 * 3600 * 1000);
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][k.getUTCDay()];
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
    k.getUTCMonth()
  ];
  const p = (n) => String(n).padStart(2, '0');
  return `${day}, ${p(k.getUTCDate())} ${mon} ${k.getUTCFullYear()} ${p(k.getUTCHours())}:${p(k.getUTCMinutes())}:${p(k.getUTCSeconds())} +0900`;
}

const feedPosts = [...posts]
  .sort((a, b) => String(b.lastmod ?? '').localeCompare(String(a.lastmod ?? '')))
  .slice(0, RSS_MAX);

const rssChannel = locale.seo.techBlog;

const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  `    <title>${xmlEscape(`${rssChannel.title} | ${SITE_NAME}`)}</title>`,
  `    <link>${xmlEscape(`${SITE_URL}/resources/tech-blog`)}</link>`,
  `    <description>${xmlEscape(rssChannel.description)}</description>`,
  '    <language>ko</language>',
  `    <atom:link href="${xmlEscape(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
  feedPosts.length && rfc822(feedPosts[0].lastmod)
    ? `    <lastBuildDate>${rfc822(feedPosts[0].lastmod)}</lastBuildDate>`
    : null,
  ...feedPosts.map((p) =>
    [
      '    <item>',
      `      <title>${xmlEscape(p.title)}</title>`,
      `      <link>${xmlEscape(SITE_URL + p.path)}</link>`,
      `      <guid isPermaLink="true">${xmlEscape(SITE_URL + p.path)}</guid>`,
      `      <description>${xmlEscape(p.description)}</description>`,
      p.section ? `      <category>${xmlEscape(p.section)}</category>` : null,
      rfc822(p.lastmod) ? `      <pubDate>${rfc822(p.lastmod)}</pubDate>` : null,
      '    </item>',
    ]
      .filter(Boolean)
      .join('\n'),
  ),
  '  </channel>',
  '</rss>',
  '',
]
  .filter(Boolean)
  .join('\n');

fs.writeFileSync(path.join(dist, 'rss.xml'), rss, 'utf8');

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

/**
 * 목록 페이지에서 개별 글로 내려가는 링크.
 *
 * 이게 없으면 블로그 68편과 릴리즈 노트는 사이트맵으로만 발견된다. 발견 경로가
 * 하나뿐이면 사이트맵 수집이 막히는 순간 84개 URL 중 14개만 남는다. 실제로
 * 네이버는 목록 페이지의 제목·설명만 읽고 개별 글은 하나도 보지 못했다.
 * 목록 → 글 링크를 원본 HTML에 박아 두면 JS를 실행하지 않는 크롤러도
 * 링크를 타고 전부 도달할 수 있다.
 */
const childLinks = {
  '/resources/tech-blog': posts,
  '/resources/release-notes': releasePages,
};

function linkList(items) {
  const li = items
    .map((i) => `<li><a href="${attrEscape(i.path)}">${htmlEscape(i.title)}</a></li>`)
    .join('');
  return `<nav><ul>${li}</ul></nav>`;
}

function fallbackBody({ heading, title, description, links }) {
  return (
    '<div id="root">' +
    '<div data-seo-fallback>' +
    `<h1>${htmlEscape(heading ?? title)}</h1>` +
    `<p>${htmlEscape(description)}</p>` +
    (links?.length ? linkList(links) : '') +
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
    links: childLinks[route.path],
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

// ---------------------------------------------------- 검색엔진 소유권 확인

// 검색엔진은 meta 태그 하나로 사이트 소유권을 확인한다. Google·네이버 모두 JS를
// 실행하지 않고 원본 HTML만 읽으므로, 태그가 index.html에서 빠지거나
// seo:start ~ seo:end 안으로 들어가(경로별 교체 대상이 되어) 사라지면 인증이
// 조용히 풀린다. data-seo-static이 붙어도 main.tsx가 런타임에 걷어내므로
// 붙이면 안 된다.
// 생성된 모든 HTML에 남아 있는지 확인하고, 하나라도 빠지면 빌드를 세운다.
const VERIFICATION_METAS = [
  { label: 'Google Search Console', attr: 'name="google-site-verification"' },
  { label: '네이버 서치어드바이저', attr: 'name="naver-site-verification"' },
];

function collectHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return collectHtml(full);
    return e.name.endsWith('.html') ? [full] : [];
  });
}

const htmlFiles = collectHtml(dist).map((f) => ({ f, html: fs.readFileSync(f, 'utf8') }));

let verificationFailed = false;
for (const { label, attr } of VERIFICATION_METAS) {
  const missing = htmlFiles.filter(({ html }) => !html.includes(attr));
  if (missing.length) {
    verificationFailed = true;
    console.error(
      `[seo] ${label} 확인 메타 태그(${attr})가 없는 HTML ${missing.length}개:\n` +
        missing.map(({ f }) => `  - ${path.relative(dist, f)}`).join('\n') +
        '\nindex.html의 seo:start ~ seo:end 바깥에 태그가 있는지 확인하세요.',
    );
  }
}
if (verificationFailed) process.exit(1);

console.log(`[seo] rss.xml — 기술 블로그 최근 ${feedPosts.length}편`);
console.log(
  `[seo] sitemap.xml (${routes.length + releasePages.length + posts.length}개 URL) · ` +
    `사전 렌더링 ${routes.length}개 라우트 + 릴리즈 노트 ${releasePages.length}건 + ` +
    `블로그 ${posts.length}편 · 기준 도메인 ${SITE_URL}`,
);
console.log(
  `[seo] 소유권 확인 태그(${VERIFICATION_METAS.map((v) => v.label).join(' · ')}) — ` +
    `HTML ${htmlFiles.length}개 전부 확인`,
);
