# 뉴스 쉬운말 모드 (Chrome 확장 프로그램)

네이버뉴스 · 다음뉴스 · 한국경제 · 중앙일보 · 동아일보 · 한겨레 · 연합뉴스 · 조선일보 기사 페이지에 플로팅 버튼이 뜨고, 클릭하면 AI가 본문을 쉬운 말로 바꿔줍니다. 다시 누르면 원문으로 돌아갑니다.

> ⚠️ 조선일보는 자바스크립트로 기사 본문을 나중에 그려주는 방식(SPA)이라 선택자를 실제 페이지 HTML로 검증하지 못했습니다. 안 뜨면 알려주세요 — `extension/content.js`의 `SITE_CONFIGS`에서 `chosun.com` 항목을 조정하면 됩니다.

네이버뉴스는 자체 도메인(`n.news.naver.com`)에서 기사를 볼 때만 동작합니다. "기사원문" 등을 눌러 언론사 자체 사이트로 이동하면(예: 연합뉴스TV처럼 위 목록에 없는 도메인), 그 사이트는 지원 범위 밖이라 버튼이 뜨지 않는 게 정상입니다.

## 폴더 구조

```
news-reading-mode/
├── extension/          # 크롬 확장 프로그램 (content script + background)
├── server/              # 백엔드 (Netlify Function, Groq API 호출)
└── 기획문서.md
```

## 1. 백엔드 배포 (server/)

1. Groq API 키 발급: https://console.groq.com (무료)
2. Netlify에서 **Add new site → Import an existing project** → 이 저장소 선택
3. Base directory: `public/projects/news-reading-mode/server`
4. Build command: 비워둠 (정적 파일 + 함수뿐이라 빌드 불필요)
5. Publish directory: `public/projects/news-reading-mode/server/public`
6. 배포 후 **Project configuration → Environment variables**에서 `GROQ_API_KEY` 등록
7. 배포된 사이트 주소(`https://xxx.netlify.app`)를 기억해두기

## 2. 확장 프로그램 설정

`extension/background.js` 상단의 `API_BASE_URL`을 방금 배포한 주소로 바꿉니다.

```js
const API_BASE_URL = 'https://xxx.netlify.app';
```

`extension/manifest.json`의 `host_permissions`에도 같은 주소를 추가/수정해주세요.

## 3. 크롬에 설치하기

1. 크롬 주소창에 `chrome://extensions` 입력
2. 우측 상단 **개발자 모드** 켜기
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. `extension` 폴더 선택

## 4. 사용하기

지원 언론사 기사 페이지에 들어가면 화면 왼쪽에 세로 슬라이더(원문 / 쉬운말 / 쉽게읽기)가 뜹니다.
Agile Squad 프로토타입과 같은 UI로, 트랙을 클릭하거나 드래그해서 단계를 고르면 AI가 변환한 본문으로 바뀝니다.

- **원문** (맨 위): 기사 원래 내용 그대로
- **쉬운말** (중간 점): 어려운 용어를 풀어 쓴 "-습니다"체, 세부 정보 유지
- **쉽게읽기** (맨 아래): 초등학생도 읽을 수 있는 아주 짧고 친근한 문장

한 번 변환한 결과는 브라우저에 저장(캐싱)되어, 같은 기사를 다시 열면 AI 재요청 없이 즉시 표시됩니다.
