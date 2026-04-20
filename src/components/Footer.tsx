import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('nav.products'),
      links: [
        {
          label: t('nav.orange-the-client'),
          path: '/products/orange-the-client',
        },
      ],
    },
    {
      title: t('nav.resources'),
      links: [
        { label: t('nav.introduction'), path: '/resources/introduction' },
        { label: t('nav.userManual'), path: '/resources/user-manual' },
        { label: t('nav.demoVideos'), path: '/resources/demo-videos' },
        { label: t('nav.techBlog'), path: '/resources/tech-blog' },
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
  ];

  return (
    <footer style={{ backgroundColor: 'var(--bg-deep)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top section: nav */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Nav columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-xs font-semibold tracking-wider mb-4"
                style={{ color: 'var(--fg-muted)' }}
              >
                {section.title.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors"
                      style={{ color: 'var(--fg-dim)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-dim)')}
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
          style={{ borderTop: '1px solid var(--border)', color: 'var(--fg-dimmer)' }}
        >
          <span>{t('footer.rights')}</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-gray-300">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gray-300">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
