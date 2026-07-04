# 한국경제 개선안 프로토타입 — AIS (React)

원본 `prototype_integrated.html` 을 **Vite + React** 구조로 이식한 앱입니다.
원본 파일(`prototype_integrated.html`, `prototype_integrated_files/`, `mvp.zip`)은
전혀 수정하지 않았으며, 이 `react-app/` 폴더만 새로 추가되었습니다.

## 실행 방법

```bash
cd react-app
npm install
npm run dev
```

개발 서버가 뜨면 브라우저에서 자동으로 http://localhost:5173 이 열립니다.

프로덕션 빌드:

```bash
npm run build      # dist/ 생성
npm run preview    # 빌드 결과 미리보기
```

## 구현된 기능 (원본과 동일)

- **읽기 난이도 슬라이더** (원문 / 쉬운말 / 쉽게읽기) — 세로 드래그·클릭으로 본문 실시간 전환
- **수치 하이라이트 팝오버** (`hk-stat`) — 지표·단위·출처·정의 표시, 바깥 클릭 시 닫힘
- **Epic AI 사이드바** — 무료/유료 토글, 탭 전환(AI 검증 대화 / 이해관계자 시각), 페이월 잠금
- **구독 모달** — 상품 다중 선택, 번들 할인(최대 30%), 결제 확인 → 완료 플로우

## 구조

```
react-app/
├─ index.html              # 폰트/아이콘 CDN 연결 + 앱 마운트
├─ vite.config.js
├─ public/
│  └─ water-rate-table.png # 원본 스크린샷 이미지(복사본)
└─ src/
   ├─ main.jsx
   ├─ App.jsx              # 전체 레이아웃 + 상태(읽기 레벨, 구독 모달)
   ├─ index.css            # 원본 스타일 그대로 이식
   ├─ components/
   │  ├─ Header.jsx
   │  ├─ ReadingLevelSlider.jsx
   │  ├─ Article.jsx
   │  ├─ Sidebar.jsx
   │  └─ SubscriptionModal.jsx
   ├─ data/
   │  ├─ levels.js         # 읽기 레벨 3단계 본문
   │  └─ products.js       # 구독 상품/할인 로직
   └─ lib/
      └─ hkStat.js         # 수치 팝오버 엔진
```

## 폰트/아이콘 관련 참고

원본의 로컬 `tabler-icons.min.css` / `pretendard.min.css` 는 실제 폰트 파일
(`fonts/*.woff2`)이 zip 에 포함돼 있지 않아 로컬에서는 아이콘·폰트가 렌더링되지
않습니다. 이 React 앱은 동일 리소스를 **CDN**(`index.html`)으로 연결해 정상적으로
표시되도록 했습니다.
