import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import Home from './pages/Home';
import OrangeTheClient from './pages/Products/OrangeTheClient';
import Introduction from './pages/Resources/Introduction';
import UserManual from './pages/Resources/UserManual';
import TechBlog from './pages/Resources/TechBlog';
import About from './pages/Company/About';
import Careers from './pages/Company/Careers';
import Partners from './pages/Company/Partners';
import Support from './pages/Company/Support';
import ContactUs from './pages/Company/ContactUs';
import Pricing from './pages/Pricing';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-40 px-4 text-center">
      <div className="text-7xl font-bold mb-4" style={{ color: '#f97316' }}>404</div>
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#f1f1f3' }}>{t('notFound.title')}</h1>
      <p className="mb-8" style={{ color: '#9ca3af' }}>{t('notFound.desc')}</p>
      <a href="/" className="px-6 py-3 rounded-full font-semibold text-sm" style={{ backgroundColor: '#f97316', color: '#fff' }}>
        {t('notFound.home')}
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/orange-the-client" element={<OrangeTheClient />} />
          <Route path="/resources/introduction" element={<Introduction />} />
          <Route path="/resources/user-manual" element={<UserManual />} />
          <Route path="/resources/blog" element={<TechBlog />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/partners" element={<Partners />} />
          <Route path="/company/support" element={<Support />} />
          <Route path="/company/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
