import { useLayoutEffect, type ReactElement } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { LOCALES, localizedPath, splitLangPath } from './i18n/locales';
import Home from './pages/Home';
import OrangeTheClient from './pages/Products/OrangeTheClient';
import UserManual from './pages/Resources/UserManual';
import DemoVideos from './pages/Resources/DemoVideos';
import ReleaseNotes from './pages/Resources/ReleaseNotes';
import Downloads from './pages/Resources/Downloads';
import ReleaseNoteContent from './pages/Resources/ReleaseNoteContent';
import TechBlog from './pages/Resources/TechBlog';
import TechBlogContent from './pages/Resources/TechBlogContent';
import About from './pages/Company/About';
import Careers from './pages/Company/Careers';
import Partners from './pages/Company/Partners';
import Support from './pages/Company/Support';
import ContactUs from './pages/Company/ContactUs';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-40 px-4 text-center">
      <div className="text-7xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
        404
      </div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
        {t('notFound.title')}
      </h1>
      <p className="mb-8" style={{ color: 'var(--fg-muted)' }}>
        {t('notFound.desc')}
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-full font-semibold text-sm"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        {t('notFound.home')}
      </a>
    </div>
  );
}

/**
 * 기본 언어(한국어) 기준 경로 목록. 아래에서 언어별 접두어를 붙여
 * 같은 트리를 언어마다 한 번씩 등록한다.
 */
const PAGES: { path: string; element: ReactElement }[] = [
  { path: '/', element: <Home /> },
  { path: '/products/orange-the-client', element: <OrangeTheClient /> },
  { path: '/resources/user-manual', element: <UserManual /> },
  { path: '/resources/demo-videos', element: <DemoVideos /> },
  { path: '/resources/downloads', element: <Downloads /> },
  { path: '/resources/release-notes', element: <ReleaseNotes /> },
  { path: '/resources/release-notes/:slug', element: <ReleaseNoteContent /> },
  { path: '/resources/tech-blog', element: <TechBlog /> },
  { path: '/resources/tech-blog/:slug', element: <TechBlogContent /> },
  { path: '/company/about', element: <About /> },
  { path: '/company/careers', element: <Careers /> },
  { path: '/company/partners', element: <Partners /> },
  { path: '/company/support', element: <Support /> },
  { path: '/company/contact', element: <ContactUs /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
];

/**
 * URL의 언어 접두어를 i18n에 반영한다.
 *
 * 첫 로드는 src/i18n/index.ts 가 window.location 으로 이미 맞춰 두므로,
 * 여기서 처리하는 것은 클라이언트 라우팅으로 언어가 바뀌는 경우다.
 * 커밋 전에 동기로 맞춰 잘못된 언어가 한 프레임 비치지 않게 한다.
 */
function SyncLanguageWithPath() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { lang } = splitLangPath(pathname);

  useLayoutEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SyncLanguageWithPath />
      <ScrollToTop />
      <Routes>
        {LOCALES.map(({ code, prefix }) => (
          <Route key={code} element={<Layout />}>
            {PAGES.map(({ path, element }) => (
              <Route key={path} path={localizedPath(path, code)} element={element} />
            ))}
            {/* 언어 접두어는 맞지만 그 아래 경로가 없는 경우 */}
            {prefix && <Route path={`${prefix}/*`} element={<NotFound />} />}
          </Route>
        ))}
        <Route element={<Layout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
