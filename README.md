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

## 환경 요구사항

| 항목 | 버전 |
|------|------|
| Node.js | 18.x 이상 권장 |
| npm | 9.x 이상 권장 |
