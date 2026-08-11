import { useState, useEffect, startTransition } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Markdown from '../../components/Markdown';
import Seo from '../../components/Seo';
import { SITE_NAME, SITE_URL, absoluteUrl } from '../../seo/site';
import {
  formatDate,
  getSlugFromMd,
  pickPosts,
  toIsoDate,
  type BlogData,
  type BlogPost,
} from './blogLocale';

const stripFrontMatter = (md: string): string => md.replace(/^---[\s\S]*?---\n/, '');

interface PostCardProps {
  post: BlogPost;
  label: string;
  onClick: () => void;
}

function PostCard({ post, label, onClick }: PostCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div
      className="p-5 rounded-2xl cursor-pointer transition-all flex flex-col gap-2"
      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      onClick={onClick}
    >
      <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
          style={{
            backgroundColor: `${post.categoryColor ?? 'var(--fg-dim)'}22`,
            color: post.categoryColor ?? 'var(--fg-dim)',
          }}
        >
          {post.category}
        </span>
        <span className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
          {formatDate(post.createdAt, lang)}
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
        {post.subject}
      </p>
    </div>
  );
}

export default function TechBlogContent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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
      .then((data: BlogData[]) => setPosts(pickPosts(data, lang)));
  }, [lang]);

  const currentIndex = posts.findIndex((p) => getSlugFromMd(p.md) === slug);
  const currentPost = currentIndex >= 0 ? posts[currentIndex] : null;
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const olderPost =
    currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const postPath = `/resources/tech-blog/${slug}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {currentPost && (
        <Seo
          title={currentPost.subject}
          description={currentPost.content}
          path={postPath}
          type="article"
          article={{
            publishedTime: toIsoDate(currentPost.createdAt),
            section: currentPost.category,
          }}
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: currentPost.subject,
            description: currentPost.content,
            datePublished: toIsoDate(currentPost.createdAt),
            articleSection: currentPost.category,
            inLanguage: lang,
            mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(postPath) },
            author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/orangelabs_mark_logo.png`,
              },
            },
          }}
        />
      )}

      {/* 뒤로 가기 버튼 */}
      <button
        className="flex items-center gap-1 text-sm font-semibold mb-10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        style={{ color: 'var(--accent)', backgroundColor: 'transparent' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-strong)';
          e.currentTarget.style.backgroundColor = 'rgba(249,115,22,0.08)';
          (e.currentTarget.querySelector('svg') as HTMLElement | null)?.style.setProperty(
            'transform',
            'translateX(-3px)',
          );
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
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
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${currentPost.categoryColor ?? 'var(--fg-dim)'}22`,
                color: currentPost.categoryColor ?? 'var(--fg-dim)',
              }}
            >
              {currentPost.category}
            </span>
            <span className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
              {formatDate(currentPost.createdAt, lang)}
            </span>
          </div>
          <span className="text-xs" style={{ color: 'var(--fg-dimmer)' }}>
            {t('blog.minRead', { minutes: currentPost.readMinutes })}
          </span>
        </div>
      )}

      {/* MD 본문 */}
      {mdContent === null ? (
        <div className="text-center py-24" style={{ color: 'var(--fg-dim)' }}>
          {t('blog.loading')}
        </div>
      ) : (
        <article>
          <Markdown>{mdContent}</Markdown>
        </article>
      )}

      {/* 이전 / 다음 포스트 */}
      {posts.length > 0 && (olderPost || newerPost) && (
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
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
