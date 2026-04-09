import { useState, useEffect, startTransition } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  category: string;
  categoryColor: string;
  subject: string;
  content: string;
  readMinutes: string;
  createdAt: string;
  md: string;
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

const getSlugFromMd = (md: string): string => (md.split('/').at(-1) ?? '').replace(/\.md$/, '');

const stripFrontMatter = (md: string): string => md.replace(/^---[\s\S]*?---\n/, '');

interface PostCardProps {
  post: BlogPost;
  label: string;
  onClick: () => void;
}

function PostCard({ post, label, onClick }: PostCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language.split('-')[0];
  return (
    <div
      className="p-5 rounded-2xl cursor-pointer transition-all flex flex-col gap-2"
      style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
      onClick={onClick}
    >
      <span className="text-xs font-semibold" style={{ color: '#f97316' }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            backgroundColor: `${post.categoryColor ?? '#6b7280'}22`,
            color: post.categoryColor ?? '#6b7280',
          }}
        >
          {post.category}
        </span>
        <span className="text-xs" style={{ color: '#4b5563' }}>
          {formatDate(post.createdAt, lang)}
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug" style={{ color: '#f1f1f3' }}>
        {post.subject}
      </p>
    </div>
  );
}

export default function TechBlogContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language.split('-')[0];

  // null = 로딩 중, '' = 에러/없음, string = 정상
  const [mdContent, setMdContent] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // MD 파일 fetch (slug 변경 시 초기화 포함)
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    startTransition(() => setMdContent(null));
    fetch(`/tech_blog/md/${slug}.md`)
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((text) => {
        if (!cancelled) setMdContent(stripFrontMatter(text));
      })
      .catch(() => {
        if (!cancelled) setMdContent('');
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // 포스트 목록 fetch
  useEffect(() => {
    fetch('/tech_blog/tech_blog.json')
      .then((res) => res.json())
      .then((data: BlogData[]) => {
        const matched =
          data.find((d) => d.language === lang) ?? data.find((d) => d.language === 'en');
        if (!matched) return;
        const parseDate = (s: string) => new Date(s.replace(/\./g, '-'));
        const sorted = [...matched.posts].sort(
          (a, b) => parseDate(b.createdAt).getTime() - parseDate(a.createdAt).getTime(),
        );
        setPosts(sorted);
      });
  }, [lang]);

  const currentIndex = posts.findIndex((p) => getSlugFromMd(p.md) === slug);
  const currentPost = currentIndex >= 0 ? posts[currentIndex] : null;
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const olderPost =
    currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* 뒤로 가기 버튼 */}
      <button
        className="flex items-center gap-1 text-sm font-semibold mb-10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        style={{ color: '#f97316', backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ea6c0a';
          e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.08)';
          (e.currentTarget.querySelector('svg') as HTMLElement | null)?.style.setProperty(
            'transform',
            'translateX(-3px)',
          );
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#f97316';
          e.currentTarget.style.backgroundColor = 'transparent';
          (e.currentTarget.querySelector('svg') as HTMLElement | null)?.style.setProperty(
            'transform',
            'translateX(0)',
          );
        }}
        onClick={() => navigate('/resources/tech-blog')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transition: 'transform 0.2s ease' }}
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {t('blog.back')}
      </button>

      {/* 포스트 메타 정보 */}
      {currentPost && (
        <div
          className="flex items-center justify-between flex-wrap mb-10 pb-6"
          style={{ borderBottom: '1px solid #2a2a33' }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${currentPost.categoryColor ?? '#6b7280'}22`,
                color: currentPost.categoryColor ?? '#6b7280',
              }}
            >
              {currentPost.category}
            </span>
            <span className="text-xs" style={{ color: '#4b5563' }}>
              {formatDate(currentPost.createdAt, lang)}
            </span>
          </div>
          <span className="text-xs" style={{ color: '#4b5563' }}>
            {t('blog.minRead', { minutes: currentPost.readMinutes })}
          </span>
        </div>
      )}

      {/* MD 본문 */}
      {mdContent === null ? (
        <div className="text-center py-24" style={{ color: '#6b7280' }}>
          {t('blog.loading')}
        </div>
      ) : (
        <article>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-10 mb-4" style={{ color: '#f1f1f3' }}>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  className="text-xl font-bold mt-8 mb-3 pb-2"
                  style={{ color: '#f1f1f3', borderBottom: '1px solid #2a2a33' }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-bold mt-6 mb-2" style={{ color: '#e5e7eb' }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm leading-7 mb-4" style={{ color: '#9ca3af' }}>
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: '#f1f1f3' }}>
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 space-y-1.5 pl-1" style={{ color: '#9ca3af' }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 space-y-1.5 pl-5 list-decimal" style={{ color: '#9ca3af' }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-sm leading-6 flex gap-2 items-start">
                  <span style={{ color: '#f97316', marginTop: '2px' }}>•</span>
                  <span>{children}</span>
                </li>
              ),
              code: ({
                inline,
                children,
                ...props
              }: {
                inline?: boolean;
                children?: React.ReactNode;
              }) =>
                inline ? (
                  <code
                    className="px-1.5 py-0.5 rounded text-xs font-mono"
                    style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#fb923c' }}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className="block text-xs font-mono leading-6"
                    style={{ color: '#d1d5db' }}
                    {...props}
                  >
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre
                  className="rounded-xl p-4 mb-4 overflow-x-auto text-xs"
                  style={{ backgroundColor: '#111114', border: '1px solid #2a2a33' }}
                >
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  className="pl-4 my-4 text-sm italic"
                  style={{ borderLeft: '3px solid #f97316', color: '#9ca3af' }}
                >
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                  style={{ color: '#f97316' }}
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8" style={{ borderColor: '#2a2a33' }} />,
              table: ({ children }) => (
                <div
                  className="overflow-x-auto mb-4 rounded-xl"
                  style={{ border: '1px solid #2a2a33' }}
                >
                  <table className="w-full text-sm">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th
                  className="px-4 py-2 text-left text-xs font-semibold"
                  style={{
                    backgroundColor: '#1a1a1f',
                    color: '#f1f1f3',
                    borderBottom: '1px solid #2a2a33',
                  }}
                >
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td
                  className="px-4 py-2 text-xs"
                  style={{ color: '#9ca3af', borderBottom: '1px solid #1f1f27' }}
                >
                  {children}
                </td>
              ),
            }}
          >
            {mdContent}
          </ReactMarkdown>
        </article>
      )}

      {/* 이전 / 다음 포스트 */}
      {posts.length > 0 && (olderPost || newerPost) && (
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid #2a2a33' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              {olderPost && (
                <PostCard
                  post={olderPost}
                  label={`← ${t('blog.prevPost')}`}
                  onClick={() => navigate(`/resources/tech-blog/${getSlugFromMd(olderPost.md)}`)}
                />
              )}
            </div>
            <div>
              {newerPost && (
                <PostCard
                  post={newerPost}
                  label={`${t('blog.nextPost')} →`}
                  onClick={() => navigate(`/resources/tech-blog/${getSlugFromMd(newerPost.md)}`)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
