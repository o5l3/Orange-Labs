import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.tsx';
import { ThemeProvider } from './theme/ThemeContext';

// index.html / 사전 렌더링 HTML에 박힌 정적 메타 태그를 걷어낸다.
// 이후 head의 메타데이터는 Seo 컴포넌트가 단독으로 관리한다.
document.querySelectorAll('[data-seo-static]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
