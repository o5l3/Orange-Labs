import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

/*
 * 컨텍스트를 컴포넌트와 같은 파일에 두면 그 파일이 컴포넌트와 컴포넌트가 아닌
 * 것을 함께 내보내게 되어 Fast Refresh가 해당 모듈에서 전체 리로드로 떨어진다
 * (react-refresh/only-export-components). 그래서 컨텍스트와 타입은 JSX가 없는
 * 이 파일에 두고, Provider는 ThemeContext.tsx, 훅은 useTheme.ts가 맡는다.
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
