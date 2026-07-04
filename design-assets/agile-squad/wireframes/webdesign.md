# Agile Squad 웹 디자인 시스템 — WebDesign.md

> 웹·앱(한경 서비스 리디자인) UI 전용 디자인 시스템
> 작성자 : 김민성 DesignOPS

## 개요

컬러 토큰(§1), 타이포그래피 스케일(§2), 스페이싱(§3), Border Radius(§4), Elevation(§5)은
**[design.md](design.md) §1~§6과 동일**하다. 이 문서는 웹·앱 환경에서 달라지는 항목만 기술한다.

---

## 목차

1. [웹 환경 차이점](#1-웹-환경-차이점)
2. [레이아웃 그리드](#2-레이아웃-그리드)
3. [타이포그래피 — 웹 사용 기준](#3-타이포그래피--웹-사용-기준)
4. [컴포넌트](#4-컴포넌트)
5. [사용 가이드](#5-사용-가이드)

---

## 1. 웹 환경 차이점

| 항목 | 장표 (design.md) | 웹·앱 (webdesign.md) |
|---|---|---|
| 캔버스 | 1280×720px 고정 | 반응형 360~1440px |
| 주요 타이포 | Display/Heading 위주 | Body/Caption 위주 |
| 컴포넌트 | 슬라이드 전용 (header-bar, tooltip 등) | 네비게이션, 버튼, 인풋, 카드, 모달 등 |
| 인터랙션 | 없음 (정적 슬라이드) | hover, focus, active, disabled 상태 |
| 색상 예외 | 다크 배경 indigo 직접 사용 허용 | Semantic Token 전용 — 예외 없음 |

---

## 2. 레이아웃 그리드

### 브레이크포인트

| 이름 | 범위 | 컬럼 | Gutter | 마진 |
|---|---|---|---|---|
| Mobile | 360~767px | 4 | 16px | 16px |
| Tablet | 768~1023px | 8 | 24px | 24px |
| Desktop | 1024~1279px | 12 | 24px | 32px |
| Wide | 1280px+ | 12 | 32px | 64px |

### 컨텐츠 최대 너비

| 용도 | 최대 너비 |
|---|---|
| 본문 컨텐츠 | 720px |
| 페이지 레이아웃 | 1200px |
| 풀 와이드 섹션 | 100% |

---

## 3. 타이포그래피 — 웹 사용 기준

스케일 정의는 [design.md §2](design.md#2-타이포그래피)와 동일. 웹에서의 사용 매핑만 추가.

| 스타일명 | 웹 사용처 |
|---|---|
| Heading/XL (28px) | 페이지 H1 |
| Heading/L (24px) | 섹션 제목 H2 |
| Heading/M (20px) | 카드 제목, H3 |
| Heading/XS (16px) | 소형 카드 제목, 사이드바 헤더 |
| Body/L-Regular (16px) | 본문 메인 텍스트 |
| Body/M-Regular (14px) | 카드 설명, 목록 |
| Body/S-Regular (13px) | 보조 설명, 메타 |
| Caption/L-Regular (12px) | 태그, 뱃지 본문 |
| Caption/M-Bold (11px) | 상태 칩, 레이블 |

> Display 계열(32~48px)은 웹 히어로 섹션에서만 제한적으로 사용.

---

## 4. 컴포넌트

> 장표 전용 컴포넌트(header-bar, tooltip, viewpoint card, persona-card)는 웹에서 사용하지 않는다.
> 아래는 웹·앱 전용 컴포넌트 스펙이다. Figma 파일: `aPVAfH6RnkG0eugmNNN87s`

### 4.1 버튼 `(220:137)`

| variant | 배경 | 텍스트 | Radius |
|---|---|---|---|
| Primary | `brand/primary` (blue90 #143c7e) | `text/inverse` | radius/md |
| primary_hover | `brand/primary-hover` (blue100) | `text/inverse` | radius/md |
| secondary | `background/secondary` | `brand/secondary` (blue60) | radius/md |
| Secondary_hover | `brand/secondary-hover` (blue70) | `text/inverse` | radius/md |
| Ghost | transparent | `text/primary` | radius/md |
| Danger | `status/error` | `text/inverse` | radius/md |
| Disabled | `background/muted` | `text/disabled` | radius/md |

- 높이: hug (아이콘 크기 기준 자동 확장), px: `spacing/16`
- 폰트: `Body/M-Bold`
- Properties: `label`[T], `leadIcon`[B] (default: false), `trailIcon`[B] (default: false)
- 아이콘: Icon/Large 인스턴스 — lead(앞), trail(뒤)

### 4.2 인풋 필드 `(220:154)`

- 배경: `background/surface` → Disabled: `background/muted`
- 테두리: `border/default` 1px → Focus: `border/brand` 2px → Error: `border/error` 1px
- 플레이스홀더: `text/disabled` · 텍스트: `Body/M-Regular` + `text/primary`
- Radius: `radius/md`
- variant: `state` (Default·Focus·Error·Disabled) × `size` (MD·SM)
- Properties: `placeholder`[T]

### 4.3 카드 `(221:112)`

- 배경: `background/surface`, Radius: `radius/lg`, Padding: `spacing/24`
- 제목: `Heading/XS` + `text/primary` · 본문: `Body/M-Regular` + `text/secondary`
- Properties: `title`[T], `description`[T], `show-image`[B], `show-badge`[B], `설명보이기`[B], `Slot`[SLOT], `Show Slot`[B]

### 4.4 네비게이션 바 `(238:686)`

- 배경: `background/surface`, 높이: 64px (Desktop) / 56px (Mobile)
- 하단 border: `border/default` 1px · 로고: `asset/hk-logo` (213:356)
- 활성 메뉴: `text/brand` + 하단 2px `brand/primary`
- variant: `Property 1` — Default · searchbar
- Properties: `show-search`[B] (default: true), `show-subscribe`[B] (default: true)

### 4.5 모달 `(221:135)`

- 배경: `background/surface`, Radius: `radius/2xl`, Padding: `spacing/32`
- variant: `size` — MD (최대 560px) · SM (최대 480px)
- Properties: `title`[T], `show-footer`[B], `Slot`[SLOT]

### 4.6 상태 칩 → 기존 컴포넌트 사용

| 용도 | 컴포넌트 ID |
|---|---|
| 성공 상태 | `status/success chip` (76:227) |
| 경고 상태 | `status/warning chip` (76:231) |
| 정보 상태 | `status/info chip` (76:233) |
| 오류 상태 | `status/error chip` (76:237) |

### 4.7 뱃지 → 기존 컴포넌트 사용

| 용도 | 컴포넌트 ID |
|---|---|
| 역할·카테고리 뱃지 | `role-badge` (76:239) |
| 일반 중립 뱃지 | `badge/general` (83:378) |
| 보조 뱃지 | `badge/sub` (83:380) |

### 4.8 Icon/Small `(238:663)`

- 크기: 12×12px
- 색상: 부모 컨텍스트 Semantic Token 상속 (`text/primary`, `text/secondary`, `text/brand` 등)
- variant property: `icon` — 총 19개:

| 아이콘 | 용도 |
|---|---|
| `ai` | AI 기능 |
| `data` | 데이터·차트 |
| `book-open` | 기사·콘텐츠 |
| `ear` | 오디오 |
| `share-2` | 공유 |
| `users` | 커뮤니티·구독자 |
| `move-up-right` | 상승 지표 |
| `move-down-right` | 하락 지표 |
| `thumbs-up` / `thumbs-down` | 신뢰도 평가 |
| `chevron-right` | 내비게이션 화살표 |
| `download` | 다운로드 |
| `send` | 전송·공유 |
| `lock` | 유료·잠금 |
| `arrow-right` | 이동·다음 |
| `circle-check-big` | 완료·확인 |
| `info` | 정보 |
| `menu` | 햄버거 메뉴 |
| `scroll-text` | 본문·긴 텍스트 |

### 4.9 Icon/Large `(76:224)`

- 크기: 24×24px
- variant property: `icon` — 총 12개:

| 아이콘 | 용도 |
|---|---|
| `arrow-right` | 이동·다음 |
| `user` | 사용자 |
| `folder` | 폴더·카테고리 |
| `smile` | 감정·긍정 |
| `megaphone-off` | 알림 끄기 |
| `shield-alert` | 보안 경고 |
| `sparkles` | AI·하이라이트 |
| `shopping-cart` | 장바구니·구독 |
| `x` | 닫기·취소 |
| `print` | 인쇄 |
| `share` | 공유 |
| `laugh` | 긍정 반응 |

### 4.10 웹 공통 — 보조 컴포넌트

| 컴포넌트 | ID | Properties |
|---|---|---|
| smallButton | `238:675` | `Text`[T], `Show lead_icon`[B] (default: true), `Show trail_icon`[B] (default: true) / variant: Default·Variant2·Variant3 |
| toggle | `293:895` | variant: on·off |
| logo-hk | `238:340` | variant: full·two |
| AI Button | `238:744` | — |
| search bar | `238:149` | — |
| 본문카드 | `293:3153` | `Show title`[B], `Show Button`[B], `Slot`[SLOT], `Show Slot`[B] / variant: Default·Variant2 |

### 4.11 AIS 기사 시스템

| 컴포넌트 | ID | Properties |
|---|---|---|
| Article Header | `223:110` | `title`[T], `date`[T], `author`[T], `show-verify`[B], `show-trust-btn`[B], `Slot`[SLOT] |
| 기사 | `293:4117` | `타이틀`[SLOT], `인포`[SLOT], `바디`[SLOT] |
| 기사본문 | `293:4177` | — |
| ai요약 | `293:4255` | — |
| 히로이미지 | `293:4129` | — |

### 4.12 AIS 패널 시스템

| 컴포넌트 | ID | Properties |
|---|---|---|
| 패널 레이아웃 | `291:3254` | `Slot`[SLOT], `Show Slot`[B] (default: true) |
| 패널탭 레이아웃 | `291:1759` | `Show 패널탭1~3`[B] (default: true) |
| 패널탭 | `291:2653` | `패널탭`[T] / variant: highlighted·Default |
| 패널 헤드 | `291:3079` | `패널헤드`[T], `패널캡션`[T] |
| 패널 뷰요약 | `291:2285` | `의견타이틀`[T], `의견내용`[T] |
| 패널 질문 레이아웃 | `291:3150` | `Slot`[SLOT] |
| 패널 추천 추가 질문 | `291:2334` | `AI추천질문`[T] |

### 4.13 AIS 구독 플로우

| 컴포넌트 | ID | Properties |
|---|---|---|
| 상품아이콘 | `299:981` | variant: 모바일한경·프리미엄9·한경아르떼·월스트리트저널·애픽AI·ais |
| 상품카드+아이콘 | `292:1066` | `상품명`[T], `상품설명`[T], `가격`[T] |
| 상품명+가격 | `299:1786` | `상품명`[T], `상품설명`[T], `가격`[T] |
| 구독요약카드 | `292:1625` | `title`[T], `안내문구`[T], Slot×3 |
| 구독요약카드2 | `299:1798` | `Slot`[SLOT] |
| 상품선택후 카드 | `292:1629` | `상품이름`[T], `가격`[T] |
| 혜택 카드 | `292:1715` | `설명 1`[T], `설명 2`[T] |
| 총금액 섹션 | `317:654` | `가격`[T] |

### 4.14 AIS 데이터 컴포넌트

| 컴포넌트 | ID | Properties |
|---|---|---|
| Market Ticker Item | `221:148` | `name`[T], `value`[T], `change`[T] / variant: Up·Down·Flat |
| AIS Caption Panel | `226:108` | `selected-value`[T], `selected-label`[T], `unit`[T], `time-ref`[T], `source`[T], `definition`[T] |
| Line Chart | `226:116` | `title`[T], `latest-value`[T], `Slot`[SLOT] |
| Audio Player | `223:145` | `title`[T], `speed`[T], `show-live`[B] / variant: Idle·Playing·Paused |
| Tab Item | `223:109` | `label`[T], `show-count`[B] / variant: Default·Active·Hover |
| Inline Verify Button | `223:126` | `value`[T], `show-icon`[B] / variant: Default·Active·Verified |
| Summary Bullet Card | `223:161` | `title`[T], `bullet-1~3`[T], `show-b2`[B], `show-b3`[B] / variant: count=1·2·3 |
| 체크버튼 | `292:1062` | variant: 기본·클릭 |
| market ticket bar | `293:2167` | — |

---

## 5. 사용 가이드

### 컬러 원칙 (웹)

- 장표와 달리 **예외 없이** Semantic Token만 사용 — indigo primitive 직접 사용 금지
- 다크 모드는 현재 스펙 외 — 추후 변수 모드 추가 시 확장

### 타이포그래피 원칙 (웹)

- 본문 최소 크기: `Body/S-Regular` (13px) — 이하 사용 금지
- 버튼 텍스트: 반드시 `Body/M-Bold` 또는 `Body/S-Bold`
- 링크: `text/link` + underline on hover

### 인터랙션 원칙

- 모든 인터랙티브 요소: hover, focus, active, disabled 4개 상태 필수 정의
- Focus: `border/brand` 2px outline (접근성)
- 트랜지션: 150ms ease-out (색상), 200ms ease-out (크기·위치)

---

*공통 토큰 출처: Figma Design System — aPVAfH6RnkG0eugmNNN87s*
