import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  category: string;
  subject: string;
  content: string;
  readMinutes: string;
  createdAt: string;
  link: string;
}

interface BlogData {
  language: string;
  posts: BlogPost[];
}

const localeMap: Record<string, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ja: 'ja-JP',
};

const formatDate = (dateStr: string, lang: string): string => {
  const date = new Date(dateStr.replace(/\./g, '-'));
  return new Intl.DateTimeFormat(localeMap[lang] ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const categoryColors: Record<string, string> = {
  Engineering: '#3b82f6',
  Product: '#f97316',
  Security: '#10b981',
  Insights: '#a855f7',
};

export default function TechBlog() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/tech_blog.json')
      .then((res) => res.json())
      .then((data: BlogData[]) => {
        const lang = i18n.language.split('-')[0];
        const matched =
          data.find((d) => d.language === lang) ??
          data.find((d) => d.language === 'en');
        if (!matched) return;

        const parseDate = (s: string) => new Date(s.replace(/\./g, '-'));
        const sorted = [...matched.posts].sort(
          (a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime()
        );
        setPosts(sorted);
      });
  }, [i18n.language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider" style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
          {t('blog.badge')}
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>{t('blog.title')}</h1>
        <p className="text-lg" style={{ color: '#9ca3af' }}>
          {t('blog.desc')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={`${post.subject}-${post.createdAt}`}
            className="p-6 rounded-2xl cursor-pointer transition-all flex flex-col"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
            onClick={() => post.link && window.open(post.link, '_blank', 'noopener,noreferrer')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${categoryColors[post.category] ?? '#6b7280'}22`, color: categoryColors[post.category] ?? '#6b7280' }}>
                {post.category}
              </span>
              <span className="text-xs" style={{ color: '#4b5563' }}>{post.readMinutes} {t('blog.minRead')}</span>
            </div>
            <h2 className="text-base font-semibold mb-3 flex-1" style={{ color: '#f1f1f3', lineHeight: '1.5' }}>{post.subject}</h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#9ca3af' }}>{post.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#4b5563' }}>{formatDate(post.createdAt, i18n.language.split('-')[0])}</span>
              <span className="text-xs font-medium flex items-center gap-1" style={{ color: '#f97316' }}>
                {t('blog.readMore')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
