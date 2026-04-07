import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('nav.products'),
      links: [
        { label: t('nav.orange-the-client'), path: '/products/orange-the-client' },
      ],
    },
    {
      title: t('nav.resources'),
      links: [
        { label: t('nav.introduction'), path: '/resources/introduction' },
        { label: t('nav.userManual'), path: '/resources/user-manual' },
        { label: t('nav.techBlog'), path: '/resources/blog' },
      ],
    },
    {
      title: t('nav.company'),
      links: [
        { label: t('nav.about'), path: '/company/about' },
        { label: t('nav.careers'), path: '/company/careers' },
        { label: t('nav.partners'), path: '/company/partners' },
        { label: t('nav.support'), path: '/company/support' },
        { label: t('nav.contactUs'), path: '/company/contact' },
      ],
    },
    {
      title: t('nav.pricing'),
      links: [
        { label: t('pricing.plan1_sub'), path: '/pricing' },
        { label: t('pricing.plan2_sub'), path: '/pricing' },
        { label: t('pricing.plan3_sub'), path: '/pricing' },
        { label: t('pricing.plan4_sub'), path: '/pricing' },
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: '#0e0e11', borderTop: '1px solid #2a2a33' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top section: logo + nav */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img
                src="/images/orangelabs_mark_logo.png"
                alt="OrangeLabs"
                className="h-10 object-contain"
                style={{ filter: 'brightness(1.1)' }}
              />
            </Link>
            <p className="mt-4 text-sm" style={{ color: '#6b7280' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold tracking-wider mb-4" style={{ color: '#9ca3af' }}>
                {section.title.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors"
                      style={{ color: '#6b7280' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderTop: '1px solid #2a2a33', color: '#4b5563' }}
        >
          <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-gray-300">{t('footer.privacy')}</Link>
            <Link to="/terms" className="transition-colors hover:text-gray-300">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
