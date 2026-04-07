import { useTranslation } from 'react-i18next';

const posts = [
  {
    date: 'March 28, 2026',
    category: 'Engineering',
    title: 'How We Built a Zero-Latency Agent Orchestration Layer',
    summary: 'A deep dive into the architecture decisions behind Orange The Client\'s real-time agent coordination system.',
    readTime: '8 min read',
  },
  {
    date: 'March 15, 2026',
    category: 'Product',
    title: 'Introducing Workflow Builder: Visual Automation for Everyone',
    summary: 'Our new drag-and-drop workflow editor makes it easy for non-engineers to build complex automation pipelines.',
    readTime: '5 min read',
  },
  {
    date: 'February 22, 2026',
    category: 'Security',
    title: 'Enterprise Security at OrangeLabs: A Multi-Layer Approach',
    summary: 'How we ensure your data and operations remain secure at every layer of the stack.',
    readTime: '6 min read',
  },
  {
    date: 'February 5, 2026',
    category: 'Engineering',
    title: 'Scaling AI Agents to 10,000 Concurrent Tasks',
    summary: 'Lessons learned from optimizing our agent runtime for high-throughput enterprise workloads.',
    readTime: '10 min read',
  },
  {
    date: 'January 18, 2026',
    category: 'Product',
    title: 'Agent v1.6.240: What\'s New and Why It Matters',
    summary: 'A comprehensive overview of the major improvements in our latest Agent release.',
    readTime: '7 min read',
  },
  {
    date: 'January 4, 2026',
    category: 'Insights',
    title: 'The State of Enterprise AI Automation in 2026',
    summary: 'Our analysis of industry trends and what\'s driving adoption of agentic AI in large organizations.',
    readTime: '9 min read',
  },
];

const categoryColors: Record<string, string> = {
  Engineering: '#3b82f6',
  Product: '#f97316',
  Security: '#10b981',
  Insights: '#a855f7',
};

export default function TechBlog() {
  const { t } = useTranslation();

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
            key={post.title}
            className="p-6 rounded-2xl cursor-pointer transition-all flex flex-col"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: `${categoryColors[post.category]}22`, color: categoryColors[post.category] }}>
                {post.category}
              </span>
              <span className="text-xs" style={{ color: '#4b5563' }}>{post.readTime}</span>
            </div>
            <h2 className="text-base font-semibold mb-3 flex-1" style={{ color: '#f1f1f3', lineHeight: '1.5' }}>{post.title}</h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: '#9ca3af' }}>{post.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: '#4b5563' }}>{post.date}</span>
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
