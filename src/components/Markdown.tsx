import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** 기술 블로그 본문과 릴리즈 노트 본문이 함께 쓰는 마크다운 렌더러. */
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-10 mb-4" style={{ color: 'var(--fg)' }}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className="text-xl font-bold mt-8 mb-3 pb-2"
            style={{ color: 'var(--fg)', borderBottom: '1px solid var(--border)' }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold mt-6 mb-2" style={{ color: 'var(--fg-strong)' }}>
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-sm leading-7 mb-4" style={{ color: 'var(--fg-muted)' }}>
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold" style={{ color: 'var(--fg)' }}>
            {children}
          </strong>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 space-y-1.5 pl-1" style={{ color: 'var(--fg-muted)' }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 space-y-1.5 pl-5 list-decimal" style={{ color: 'var(--fg-muted)' }}>
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-sm leading-6 flex gap-2 items-start">
            <span style={{ color: 'var(--accent)', marginTop: '2px' }}>•</span>
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
              style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: 'var(--accent-light)' }}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="block text-xs font-mono leading-6"
              style={{ color: 'var(--fg-strong)' }}
              {...props}
            >
              {children}
            </code>
          ),
        pre: ({ children }) => (
          <pre
            className="rounded-xl p-4 mb-4 overflow-x-auto text-xs"
            style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote
            className="pl-4 my-4 text-sm italic"
            style={{ borderLeft: '3px solid var(--accent)', color: 'var(--fg-muted)' }}
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
            style={{ color: 'var(--accent)' }}
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-8" style={{ borderColor: 'var(--border)' }} />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4 rounded-xl" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th
            className="px-4 py-2 text-left text-xs font-semibold"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--fg)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className="px-4 py-2 text-xs"
            style={{ color: 'var(--fg-muted)', borderBottom: '1px solid var(--surface-3)' }}
          >
            {children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
