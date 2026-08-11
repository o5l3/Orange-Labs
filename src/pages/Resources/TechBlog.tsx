import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate, pickPosts, type BlogData, type BlogPost } from './blogLocale';
import Seo from '../../components/Seo';

const ALL = '__all__';

export default function TechBlog() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<string>(ALL);

  useEffect(() => {
    fetch('/tech_blog/tech_blog.json')
      .then((res) => res.json())
      .then((data: BlogData[]) => setPosts(pickPosts(data, i18n.language)));
  }, [i18n.language]);

  /** 카테고리 목록은 글 수가 많은 순으로. 라벨·색은 tech_blog.json이 들고 있다. */
  const categories = useMemo(() => {
    const seen = new Map<string, { name: string; color: string; count: number }>();
    for (const p of posts) {
      const entry = seen.get(p.category);
      if (entry) entry.count += 1;
      else seen.set(p.category, { name: p.category, color: p.categoryColor, count: 1 });
    }
    return [...seen.values()].sort((a, b) => b.count - a.count);
  }, [posts]);

  const visible = category === ALL ? posts : posts.filter((p) => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <Seo title={t('blog.title')} description={t('blog.desc')} />
      <div className="text-center mb-16">
        <div
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
          style={{
            backgroundColor: 'rgba(249,115,22,0.1)',
            color: 'var(--accent)',
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          {t('blog.badge')}
        </div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
          {t('blog.title')}
        </h1>
        <p className="text-lg" style={{ color: 'var(--fg-muted)' }}>
          {t('blog.desc')}
        </p>
      </div>

      {/* ── 카테고리 필터 ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[{ name: ALL, color: 'var(--accent)', count: posts.length }, ...categories].map((c) => {
          const active = category === c.name;
          return (
            <button
              key={c.name}
              className="px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer"
              style={{
                backgroundColor: active ? `${c.color}22` : 'var(--surface)',
                color: active ? c.color : 'var(--fg-muted)',
                border: `1px solid ${active ? c.color : 'var(--border)'}`,
              }}
              onClick={() => setCategory(c.name)}
            >
              {c.name === ALL ? t('blog.allCategories') : c.name}
              <span className="ml-1.5 text-xs" style={{ color: 'var(--fg-dimmer)' }}>
                {c.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((post) => (
          <article
            key={`${post.subject}-${post.createdAt}`}
            className="p-6 rounded-2xl cursor-pointer transition-all flex flex-col"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            onClick={() => {
              const slug = post.md.split('/').at(-1)?.replace(/\.md$/, '');
              if (slug) navigate(`/resources/tech-blog/${slug}`);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${post.categoryColor ?? 'var(--fg-dim)'}22`,
                  color: post.categoryColor ?? 'var(--fg-dim)',
                }}
              >
                {post.category}
              </span>
              <span className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
                {t('blog.minRead', { minutes: post.readMinutes })}
              </span>
            </div>
            <h2
              className="text-base font-semibold mb-3"
              style={{ color: 'var(--fg)', lineHeight: '1.5' }}
            >
              {post.subject}
            </h2>
            <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: 'var(--fg-muted)' }}>
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
                {formatDate(post.createdAt, i18n.language)}
              </span>
              <span
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                {t('blog.readMore')}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
