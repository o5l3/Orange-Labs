import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ko', label: '한국어', short: 'KO' },
  { code: 'zh-Hans', label: '中文(简体)', short: '简' },
  { code: 'zh-Hant', label: '中文(繁體)', short: '繁' },
  { code: 'ja', label: '日本語', short: 'JA' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    {
      label: t('nav.products'),
      key: 'products',
      dropdown: [
        {
          group: t('nav.solutions'),
          items: [{ label: t('nav.orange-the-client'), path: '/products/orange-the-client' }],
        },
      ],
    },
    {
      label: t('nav.resources'),
      key: 'resources',
      dropdown: [
        {
          group: t('nav.docs'),
          items: [
            { label: t('nav.userManual'), path: '/resources/user-manual' },
            { label: t('nav.demoVideos'), path: '/resources/demo-videos' },
          ],
        },
        {
          group: t('nav.learn'),
          items: [{ label: t('nav.techBlog'), path: '/resources/tech-blog' }],
        },
      ],
    },
    {
      label: t('nav.company'),
      key: 'company',
      dropdown: [
        {
          group: undefined,
          items: [
            { label: t('nav.about'), path: '/company/about' },
            { label: t('nav.careers'), path: '/company/careers' },
            { label: t('nav.partners'), path: '/company/partners' },
            { label: t('nav.support'), path: '/company/support' },
            { label: t('nav.contactUs'), path: '/company/contact' },
          ],
        },
      ],
    },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setLangOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderBottom: '1px solid var(--header-border)',
      }}
    >
      <div className="w-full px-6 sm:px-10 flex items-center h-16 relative">
        {/* Logo */}
        <div className="absolute left-6 sm:left-10 flex items-center">
          <Link to="/" onClick={() => setActiveDropdown(null)}>
            <img
              src="/images/orangelabs_text_logo.png"
              alt="OrangeLabs"
              className="h-5 object-contain"
              style={{
                // 라이트 모드: invert 후 hue-rotate 180°로 주황은 유지, 흰색 "labs"만 검정으로
                filter: theme === 'light' ? 'invert(1) hue-rotate(180deg)' : 'none',
              }}
            />
          </Link>
        </div>

        {/* Desktop Nav — 뷰포트 기준 중앙 */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <div key={item.key} className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-md"
                style={{ color: activeDropdown === item.key ? 'var(--accent)' : 'var(--fg)' }}
                onMouseEnter={() => setActiveDropdown(item.key)}
                onClick={() => setActiveDropdown(activeDropdown === item.key ? null : item.key)}
              >
                {item.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: activeDropdown === item.key ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M2 4L6 8L10 4" />
                </svg>
              </button>

              {/* Dropdown */}
              {item.dropdown && activeDropdown === item.key && (
                <div
                  className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl py-4 min-w-52"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown.map((group, gi) => (
                    <div key={gi}>
                      {group.group && (
                        <div
                          className="px-4 py-1 text-xs font-semibold tracking-wider"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          {group.group}
                        </div>
                      )}
                      {group.items.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-sm transition-colors"
                          style={{ color: 'var(--fg)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                      {gi < item.dropdown!.length - 1 && (
                        <div className="my-2 mx-4" style={{ borderTop: '1px solid var(--border)' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right: Language + Theme */}
        <div className="absolute right-6 sm:right-10 hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            className="flex items-center px-2 py-2 rounded-md transition-colors"
            style={{ color: 'var(--fg-muted)' }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-muted)')}
          >
            <span className="text-xs font-medium">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
          </button>

          {/* Language switcher */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 px-2 py-2 rounded-md transition-colors"
              style={{ color: langOpen ? 'var(--accent)' : 'var(--fg-muted)' }}
              onClick={() => {
                setLangOpen(!langOpen);
                setActiveDropdown(null);
              }}
              aria-label="Select language"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => {
                if (!langOpen) e.currentTarget.style.color = 'var(--fg-muted)';
              }}
            >
              {/* Globe icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-xs font-medium">{currentLang.short}</span>
            </button>

            {langOpen && (
              <div
                className="absolute top-full right-0 mt-1 rounded-xl shadow-2xl py-2 min-w-36"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm transition-colors"
                    style={{ color: i18n.language === lang.code ? 'var(--accent)' : 'var(--fg)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => {
                      if (i18n.language !== lang.code) e.currentTarget.style.color = 'var(--fg)';
                    }}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span>{lang.label}</span>
                    {i18n.language === lang.code && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile right: theme + language + hamburger */}
        <div className="ml-auto md:hidden flex items-center gap-2">
          {/* Mobile theme toggle */}
          <button
            className="flex items-center px-2 py-2 rounded-md"
            style={{ color: 'var(--fg-muted)' }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="text-xs font-medium">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
          </button>

          {/* Mobile language switcher */}
          <div className="relative">
            <button
              className="flex items-center gap-1 p-2 rounded-md"
              style={{ color: 'var(--fg-muted)' }}
              onClick={() => {
                setLangOpen(!langOpen);
                setMobileMenuOpen(false);
              }}
              aria-label="Select language"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute top-full right-0 mt-1 rounded-xl shadow-2xl py-2 min-w-36 z-50"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm"
                    style={{ color: i18n.language === lang.code ? 'var(--accent)' : 'var(--fg)' }}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span>{lang.label}</span>
                    {i18n.language === lang.code && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setLangOpen(false);
            }}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: 'var(--fg)',
                transform: mobileMenuOpen ? 'translateY(8px) rotate(45deg)' : '',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ backgroundColor: 'var(--fg)', opacity: mobileMenuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: 'var(--fg)',
                transform: mobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : '',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
          {navItems.map((item) => (
            <div key={item.key}>
              <button
                className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium"
                style={{ color: 'var(--fg)' }}
                onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
              >
                {item.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: mobileExpanded === item.key ? 'rotate(180deg)' : '',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M2 4L6 8L10 4" />
                </svg>
              </button>
              {mobileExpanded === item.key && item.dropdown && (
                <div style={{ backgroundColor: 'var(--bg)' }}>
                  {item.dropdown.map((group, gi) => (
                    <div key={gi}>
                      {group.group && (
                        <div
                          className="px-8 pt-2 pb-1 text-xs font-semibold tracking-wider"
                          style={{ color: 'var(--fg-muted)' }}
                        >
                          {group.group}
                        </div>
                      )}
                      {group.items.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-8 py-2 text-sm"
                          style={{ color: 'var(--fg-muted)' }}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileExpanded(null);
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
