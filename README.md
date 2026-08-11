# OrangeLabs 공식 홈페이지

OrangeLabs의 공식 웹사이트 프로젝트입니다.  
**React 19 + TypeScript + Vite** 기반으로 구축되었으며, 다국어(i18n) 지원 및 반응형 UI를 제공합니다.

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [페이지 구성](#페이지-구성)
- [다국어 지원](#다국어-지원)
- [시작하기](#시작하기)
- [스크립트 명령어](#스크립트-명령어)
- [환경 요구사항](#환경-요구사항)

---

## 프로젝트 개요

OrangeLabs 공식 홈페이지로, 제품 소개(Orange The Client), 리소스(문서 · 기술 블로그), 회사 정보(소개 · 채용 · 파트너 · 지원 · 문의), 요금제 등을 제공합니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 언어 | TypeScript 5.9 |
| 빌드 도구 | Vite 8 |
| 스타일링 | Tailwind CSS 4 |
| 라우팅 | React Router DOM 7 |
| 다국어(i18n) | i18next + react-i18next |
| 이메일 | EmailJS Browser |
| 린트 | ESLint 9 + typescript-eslint |

---

## 프로젝트 구조

```
Orange-Labs/
├── public/                    # 정적 파일
│   ├── favicon.ico
│   ├── icons.svg
│   └── images/                # 로고 이미지
├── src/
│   ├── assets/                # 내부 에셋
│   ├── components/            # 공통 컴포넌트
│   │   ├── DotPattern.tsx     # 배경 도트 패턴
│   │   ├── Footer.tsx         # 푸터
│   │   ├── Header.tsx         # 헤더 (네비게이션 + 언어 전환)
│   │   └── Layout.tsx         # 공통 레이아웃
│   ├── i18n/                  # 다국어 설정
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── en.json        # 영어
│   │       ├── ko.json        # 한국어
│   │       ├── zh.json        # 중국어
│   │       └── ja.json        # 일본어
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   ├── Pricing.tsx
│   │   ├── Products/
│   │   │   └── OrangeTheClient.tsx
│   │   ├── Resources/
│   │   │   ├── Introduction.tsx
│   │   │   ├── TechBlog.tsx
│   │   │   └── UserManual.tsx
│   │   └── Company/
│   │       ├── About.tsx
│   │       ├── Careers.tsx
│   │       ├── ContactUs.tsx
│   │       ├── Partners.tsx
│   │       └── Support.tsx
│   ├── App.tsx                # 라우터 설정
│   ├── main.tsx               # 앱 진입점
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 페이지 구성

| URL | 페이지 | 설명 |
|-----|--------|------|
| `/` | 홈 | 히어로 섹션, 주요 기능, 통계, 파트너 소개 |
| `/products/orange-the-client` | Orange The Client | 제품 상세 소개 |
| `/resources/introduction` | 소개 | 제품 소개 문서 |
| `/resources/user-manual` | 사용자 매뉴얼 | 사용 방법 가이드 |
| `/resources/blog` | 기술 블로그 | 기술 아티클 |
| `/company/about` | 회사 소개 | OrangeLabs 소개 |
| `/company/careers` | 채용 | 채용 공고 |
| `/company/partners` | 파트너 | 파트너 정보 |
| `/company/support` | 지원 | 고객 지원 |
| `/company/contact` | 문의하기 | 문의 폼 (EmailJS 연동) |
| `/pricing` | 요금제 | 플랜별 요금 안내 |

---

## 다국어 지원

헤더의 언어 선택 드롭다운을 통해 아래 4개 언어를 전환할 수 있습니다.  
선택한 언어는 `localStorage`에 저장되어 다음 방문 시에도 유지됩니다.

| 코드 | 언어 |
|------|------|
| `en` | English |
| `ko` | 한국어 |
| `zh` | 中文 |
| `ja` | 日本語 |

번역 파일 위치: `src/i18n/locales/*.json`

---

## 시작하기

### 1. 저장소 클론

```bash
git clone <저장소-URL>
cd Orange-Labs
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 아래 주소로 접속하세요.

```
http://localhost:30001
```

---

## 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 30001) |
| `npm run build` | TypeScript 컴파일 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |
| `npm run lint` | ESLint 코드 검사 |

### 프로덕션 빌드 및 미리보기

```bash
# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

---

## SEO

기준 도메인은 `https://www.orangelabs.xyz` 입니다. 다른 도메인으로 배포하려면 `VITE_SITE_URL` 환경변수를 설정하세요 (빌드 시점에 canonical · sitemap · OG URL에 모두 반영됩니다).

### 구성

| 파일 | 역할 |
|------|------|
| `src/seo/site.ts` | 도메인 · 브랜드명 · OG 이미지 등 전역 상수 |
| `src/seo/routes.json` | 정적 라우트별 sitemap 우선순위 및 로케일 키 매핑 |
| `src/seo/organization.ts` | Organization · WebSite 구조화 데이터 |
| `src/components/Seo.tsx` | 페이지 단위 메타태그 (React 19 네이티브 메타데이터) |
| `src/components/RouteSeo.tsx` | 경로 → 메타데이터 자동 매핑. `Layout`에 한 번만 연결 |
| `scripts/generate-seo.mjs` | 빌드 후 sitemap.xml 생성 + 경로별 HTML 사전 렌더링 |
| `public/robots.txt` | 크롤러 정책 (Yeti · Daum 포함) |

문구는 각 로케일 파일의 `seo` 섹션(`src/i18n/locales/*.json`)에 있습니다. 페이지를 추가할 때는 `routes.json`에 경로를 넣고 5개 로케일에 `seo.<key>.title` / `.description`을 추가하면 됩니다. 기술 블로그 글과 릴리즈 노트 상세는 각각의 데이터를 쓰므로 `TechBlogContent.tsx` · `ReleaseNoteContent.tsx`가 직접 처리합니다.

### 사전 렌더링

SPA는 JS를 실행하지 않는 크롤러(네이버 Yeti 등)와 공유 미리보기 봇(카카오톡 · 슬랙)에게 빈 페이지로 보입니다. 이를 막기 위해 `npm run build`가 경로별 `index.html`을 만들어 메타태그와 최소 본문을 미리 박아 둡니다. Vercel은 rewrites보다 파일 시스템을 먼저 확인하므로 해당 파일이 그대로 응답됩니다.

### 배포 후 할 일

1. [Google Search Console](https://search.google.com/search-console)에 도메인 등록 후 `sitemap.xml` 제출
2. [네이버 서치어드바이저](https://searchadvisor.naver.com)에 사이트 등록 후 sitemap 제출 (국문 브랜드 검색 대응)
3. 1200×630 전용 OG 이미지를 만들어 `src/seo/site.ts`의 `DEFAULT_OG_IMAGE` 교체

---

## 환경 요구사항

| 항목 | 버전 |
|------|------|
| Node.js | 18.x 이상 권장 |
| npm | 9.x 이상 권장 |
