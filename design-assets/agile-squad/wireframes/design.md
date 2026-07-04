# Egile slide 디자인 시스템 — Design.md

> 장표(프레젠테이션) 디자인 전용 디자인 시스템
> 작성자 : 김민성 DesignOPS

한경(한국경제)은 종이신문 기반의 높은 신뢰도와 전문성을 보유하고 있지만, 이 자산이 디지털 채널(랜딩페이지·모바일 앱)에 충분히 녹아들지 못하고 있다. 현재 문서는 이를 개선하기 위한 AIS 프로젝트의 발표용 slide 디자인 결과물을 위한 design.md 문서이다.  

## 목차

1. [컬러 시스템](#1-컬러-시스템)
2. [타이포그래피](#2-타이포그래피)
3. [스페이싱](#3-스페이싱)
4. [Border Radius](#4-border-radius)
5. [Elevation](#5-elevation)
6. [그라디언트](#6-그라디언트)
7. [컴포넌트](#7-컴포넌트)
8. [사용 가이드](#8-사용-가이드)

---

## 1. 컬러 시스템

### 구조 원칙

- **Primitive Colors**: 절대 직접 사용 금지. Semantic Token을 통해서만 참조
- **Semantic Tokens**: 컴포넌트와 슬라이드에 항상 이 레이어를 사용
- **예외**: `secondary/indigo100`, `indigo40`, `indigo50`, `indigo30` — 다크 슬라이드 배경·텍스트 전용으로 직접 사용 허용

---

### 1.1 Primitive Colors

#### Primary · Blue

| Token | Hex | 참조 Semantic |
|---|---|---|
| primary/blue10 | #e8f3ff | background/brand |
| primary/blue20 | #c5dcff | — |
| primary/blue30 | #9dbeff | — |
| primary/blue40 | #6ea8fe | — |
| primary/blue50 | #4f94f3 | — |
| primary/blue60 | #3182f6 | brand/secondary, status/info |
| primary/blue70 | #2163d2 | brand/secondary-hover |
| primary/blue80 | #1a4faa | — |
| primary/blue90 | #143c7e | brand/primary, text/brand, border/brand |
| primary/blue100 | #0e2856 | brand/primary-hover |

#### Secondary · Indigo

| Token | Hex | 참조 Semantic |
|---|---|---|
| secondary/indigo10 | #eef2ff | background/secondary |
| secondary/indigo20 | #e0e7ff | — |
| secondary/indigo30 | #c7d2fe | ⚡ 다크 슬라이드 텍스트 전용 |
| secondary/indigo40 | #a5b4fc | ⚡ 다크 슬라이드 강조 텍스트 |
| secondary/indigo50 | #818cf8 | ⚡ 다크 슬라이드 Footer |
| secondary/indigo60 | #6366f1 | brand/secondary (슬라이드 포인트) |
| secondary/indigo70 | #4f46e5 | brand/secondary-hover |
| secondary/indigo80 | #4338ca | — |
| secondary/indigo90 | #3730a3 | — |
| secondary/indigo100 | #312e81 | ⚡ 다크 슬라이드 배경 전용 |

#### Tertiary · Teal

| Token | Hex | 참조 Semantic |
|---|---|---|
| tertiary/teal10 | #f0fdf4 | status/success-bg |
| tertiary/teal20 | #dcfce7 | — |
| tertiary/teal30 | #d1fae5 | — |
| tertiary/teal40 | #a7f3d0 | — |
| tertiary/teal50 | #6ee7b7 | — |
| tertiary/teal60 | #34d399 | — |
| tertiary/teal70 | #10b981 | brand/tertiary, status/success |
| tertiary/teal80 | #059669 | brand/tertiary-hover |
| tertiary/teal90 | #047857 | — |
| tertiary/teal100 | #065f46 | — |

#### Error · Red

| Token | Hex |
|---|---|
| semantic/error10 | #fff1f2 |
| semantic/error20 | #ffe4e6 |
| semantic/error30 | #fecdd3 |
| semantic/error40 | #fda4af |
| semantic/error50 | #fb7185 |
| semantic/error60 | #ef4444 |
| semantic/error70 | #dc2626 |
| semantic/error80 | #b91c1c |
| semantic/error90 | #991b1b |
| semantic/error100 | #7f1d1d |

#### Warning · Amber

| Token | Hex |
|---|---|
| semantic/warning10 | #fffbeb |
| semantic/warning20 | #fef3c7 |
| semantic/warning30 | #fde68a |
| semantic/warning40 | #fcd34d |
| semantic/warning50 | #fbbf24 |
| semantic/warning60 | #f59e0b |
| semantic/warning70 | #d97706 |
| semantic/warning80 | #b45309 |
| semantic/warning90 | #92400e |
| semantic/warning100 | #78350f |

#### Success · Green

| Token | Hex |
|---|---|
| semantic/success10 | #f0fdf4 |
| semantic/success20 | #dcfce7 |
| semantic/success30 | #bbf7d0 |
| semantic/success40 | #86efac |
| semantic/success50 | #4ade80 |
| semantic/success60 | #22c55e |
| semantic/success70 | #16a34a |
| semantic/success80 | #15803d |
| semantic/success90 | #166534 |
| semantic/success100 | #14532d |

#### Neutral · Gray

| Token | Hex |
|---|---|
| neutral/white | #ffffff |
| neutral/neutral10 | #f9fafb |
| neutral/neutral20 | #f2f4f6 |
| neutral/neutral30 | #e5e8eb |
| neutral/neutral40 | #d1d5db |
| neutral/neutral50 | #9ca3af |
| neutral/neutral60 | #8b95a1 |
| neutral/neutral70 | #6b7280 |
| neutral/neutral80 | #4e5968 |
| neutral/neutral90 | #374151 |
| neutral/neutral100 | #191f28 |
| neutral/black | #000000 |

---

### 1.2 Semantic Tokens

#### Background

| Token | Primitive | 사용처 |
|---|---|---|
| background/surface | neutral/white | 카드, 패널, 모달 배경 |
| background/subtle | neutral/neutral10 | 페이지 배경, 섹션 배경 |
| background/muted | neutral/neutral20 | 테이블 헤더, 구분 배경 |
| background/brand | primary/blue10 | 브랜드 강조 배경, Kicker 배경 |
| background/secondary | secondary/indigo10 | 인디고 계열 강조 배경 |

#### Text

| Token | Primitive | 사용처 |
|---|---|---|
| text/primary | neutral/neutral100 | 기본 텍스트 (제목, 본문) |
| text/secondary | neutral/neutral80 | 보조 텍스트 |
| text/tertiary | neutral/neutral60 | 힌트, 메타 정보 |
| text/disabled | neutral/neutral50 | 비활성 상태 |
| text/inverse | neutral/white | 다크 배경 위 텍스트 |
| text/brand | primary/blue90 | 브랜드 컬러 텍스트 |
| text/link | primary/blue60 | 인터랙티브 링크 |

#### Border

| Token | Primitive | 사용처 |
|---|---|---|
| border/default | neutral/neutral30 | 기본 경계선, 구분선 |
| border/hover | neutral/neutral40 | 호버 상태 경계선 |
| border/brand | primary/blue90 | 포커스, 선택 상태 |
| border/error | semantic/error60 | 에러 상태 입력 경계선 |

#### Brand

| Token | Primitive | 사용처 |
|---|---|---|
| brand/primary | primary/blue90 | 주요 CTA 버튼, 히어로·배너 배경 |
| brand/primary-hover | primary/blue100 | CTA 버튼 hover |
| brand/primary-subtle | primary/blue10 | 브랜드 배경 강조 |
| brand/secondary | primary/blue60 | 인터랙티브 버튼, 링크 강조 |
| brand/secondary-hover | primary/blue70 | 세컨더리 hover |
| brand/tertiary | tertiary/teal70 | 긍정 지표, 성장률 강조 |
| brand/tertiary-hover | tertiary/teal80 | 터셔리 hover |

#### Status

| Token | Primitive | 사용처 |
|---|---|---|
| status/error | semantic/error60 | 오류, 감소 지표 |
| status/error-bg | semantic/error10 | 오류 상태 배경 |
| status/warning | semantic/warning60 | 경고, 주의 상태 |
| status/warning-bg | semantic/warning10 | 경고 배경 |
| status/success | semantic/success70 | 성공, 달성, 긍정 |
| status/success-bg | semantic/success10 | 성공 배경 |
| status/info | primary/blue60 | 정보, 진행 중 |
| status/info-bg | primary/blue10 | 정보 배경 |

---

## 2. 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 용도 |
|---|---|---|
| Primary | Pretendard | Display, Heading, Body 전체 |
| Data | Inter | KPI 수치, 데이터 레이블 |
| Caption | Noto Sans KR | 소형 캡션, 뱃지 텍스트 |
| Code | JetBrains Mono | SQL 쿼리, 코드 블록, 인라인 코드 |

### Display

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Display/2XL | Pretendard ExtraBold | 48px | 120% | 슬라이드 표지 메인 타이틀 |
| Display/XL | Pretendard ExtraBold | 40px | 120% | 섹션 오프닝 히어로 타이틀 |
| Display/L | Pretendard ExtraBold | 32px | 125% | KPI 대형 수치 타이틀 |

### Heading

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Heading/XL | Pretendard Bold | 28px | 140% | 콘텐츠 슬라이드 좌측 메인 제목 |
| Heading/L | Pretendard Bold | 24px | 140% | 슬라이드 상단 섹션 제목 |
| Heading/M | Pretendard Bold | 20px | 140% | 카드 그리드 타이틀 |
| Heading/S | Pretendard Bold | 18px | 140% | 카드 헤드 1단계, 페르소나 이름 |
| Heading/XS | Pretendard Bold | 16px | 140% | 카드 헤드 2단계, Feature Card 제목 |

### Body

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Body/L-Regular | Pretendard Regular | 16px | 160% | 콘텐츠 슬라이드 메인 본문 |
| Body/L-Medium | Pretendard Medium | 16px | 160% | 본문 내 강조 단어 |
| Body/L-Bold | Pretendard Bold | 16px | 160% | 본문 내 핵심 문구 강조 (절제) |
| Body/M-Regular | Pretendard Regular | 14px | 160% | 카드 설명문, 사이드바 항목 본문 |
| Body/M-Medium | Pretendard Medium | 14px | 160% | 카드 내 수치 단위, 레이블 |
| Body/M-Bold | Pretendard Bold | 14px | 160% | 카드 내 항목 구분 라벨 (카드 제목 아님) |
| Body/S-Regular | Pretendard Regular | 13px | 160% | Feature Card 설명, 페르소나 역할명 |
| Body/S-Medium | Pretendard Medium | 13px | 160% | 인라인 강조, 짧은 메타 라벨 |
| Body/S-Bold | Pretendard Bold | 13px | 160% | Dark Panel 내 제목 |

### Caption

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Caption/L-Regular | Noto Sans KR Regular | 12px | 150% | 카드 설명, 테이블 셀 본문 |
| Caption/L-Medium | Noto Sans KR Medium | 12px | 150% | 상태 뱃지 텍스트, 역할 태그 |
| Caption/L-Bold | Pretendard Bold | 12px | — | 섹션 구분 레이블, KPI 단위 |
| Caption/M-Regular | Noto Sans KR Regular | 11px | 150% | 카드 하단 날짜, 페르소나 불릿 |
| Caption/M-Bold | Noto Sans KR Bold | 11px | 150% | 상태 인라인 칩, 슬라이드 번호 |
| Caption/S-Regular | Noto Sans KR Regular | 10px | 150% | Footer 회사명, 출처, 저작권 |
| Caption/S-Bold | Noto Sans KR Bold | 10px | 150% | Kicker Badge, Footer 날짜 |

### Data (Inter — 숫자·영문 전용)

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Data/Large | Pretendard ExtraBold | 32px | 120% | 슬라이드 핵심 KPI 강조 수치 |
| Data/Medium | Pretendard ExtraBold | 24px | 120% | KPI 카드 메인 수치 |
| Data/Small | Pretendard Bold | 20px | 120% | 보조 KPI, 달성률, 증감 표시 |
| Data/Label-M | Inter Medium | 13px | 140% | 테이블 헤더, 차트 범례 레이블 |
| Data/Label-S | Inter Medium | 12px | 140% | 차트 축 레이블, 수치 단위 |
| Data/Label-XS | Inter Regular | 11px | 140% | 툴팁, 데이터 포인트 레이블 |

### Code (JetBrains Mono — SQL·코드 전용)

| 스타일명 | 폰트 | 크기 | 행간 | 사용처 |
|---|---|---|---|---|
| Code/Block-Regular | JetBrains Mono Regular | 13px | 160% | 코드 블록 본문, SQL 쿼리 |
| Code/Block-Bold | JetBrains Mono Bold | 13px | 160% | 키워드·예약어 강조 (SELECT, FROM 등) |
| Code/Inline | JetBrains Mono Regular | 13px | — | 본문 내 인라인 코드 스팬 |
| Code/Label | JetBrains Mono Regular | 11px | 140% | 언어 레이블 배지 (SQL, JS, Python 등) |

---

## 3. 스페이싱

8pt Grid 기반. 변수명: `spacing/[value]`
padding, itemSpacing에 변수 바인딩.

| Token | 값 | 주요 사용처 |
|---|---|---|
| spacing/2 | 2px | 아이콘 내부 미세 간격 |
| spacing/4 | 4px | 인라인 요소 간격, 뱃지 수직 패딩 |
| spacing/6 | 6px | 소형 버튼 수직 패딩 |
| spacing/8 | 8px | 기본 아이템 간격, 소형 카드 내부 |
| spacing/10 | 10px | 뱃지 수평 패딩, Kicker 패딩 |
| spacing/12 | 12px | 카드 내부 항목 gap, 버튼 수직 패딩 MD |
| spacing/16 | 16px | 기본 패딩, 리스트 gap |
| spacing/20 | 20px | 카드 내부 패딩 SM |
| spacing/24 | 24px | 카드 기본 패딩, 주요 컴포넌트 간격 |
| spacing/28 | 28px | 중형 섹션 패딩 |
| spacing/32 | 32px | 컨테이너 수평 패딩 |
| spacing/40 | 40px | 섹션 블록 gap |
| spacing/48 | 48px | 섹션 수직 패딩 |
| spacing/56 | 56px | 대형 섹션 간격 |
| spacing/64 | 64px | 페이지 수평 패딩 기준 |
| spacing/80 | 80px | 슬라이드 여백 |
| spacing/96 | 96px | 슬라이드 대형 여백 |
| spacing/120 | 120px | 슬라이드 히어로 여백 |

---

## 4. Border Radius

변수명: `radius/[name]`
cornerRadius에 바인딩 (topLeft/topRight/bottomLeft/bottomRight 개별).

| Token | 값 | 주요 사용처 |
|---|---|---|
| radius/xs | 2px | 태그 내 세부 요소 |
| radius/sm | 4px | 뱃지, Kicker Badge, 소형 칩 |
| radius/md | 8px | 인풋 필드, 아이콘 박스, 소형 카드 |
| radius/lg | 12px | Feature Card, Viewpoint Card, 기본 카드 |
| radius/xl | 16px | 대형 패널, Dark Info Panel |
| radius/2xl | 24px | 모달, 오버레이 |
| radius/full | 9999px | 역할 뱃지, 상태 뱃지, 알약형 요소 전체 |

---

## 5. Elevation

| 스타일명 | Shadow 값 | 사용처 |
|---|---|---|
| Elevation/0 · Flat | 없음 | 플랫 배경 요소 |
| Elevation/1 · Raised | 0 1px 2px rgba(0,0,0,0.04) + 0 1px 4px rgba(0,0,0,0.04) | 인풋, 칩 |
| Elevation/2 · Card | 0 2px 8px rgba(0,0,0,0.06) + 0 1px 2px rgba(0,0,0,0.04) | **카드 기본값** |
| Elevation/3 · Popover | 0 4px 16px rgba(0,0,0,0.10) spread -2 | 드롭다운, 팝오버 |
| Elevation/4 · Modal | 0 8px 24px rgba(0,0,0,0.14) spread -4 | 모달, 다이얼로그 |
| Elevation/5 · Overlay | 0 16px 48px rgba(0,0,0,0.20) spread -8 | 드로어, 오버레이 |
| Elevation/Brand-Glow | 0 4px 20px rgba(49,130,246,0.30) | 브랜드 버튼 강조 |
| Elevation/Indigo-Glow | 0 4px 24px rgba(99,102,241,0.35) | 세컨더리 강조 요소 |

---

## 6. 그라디언트

그라디언트 스타일은 배경, CTA, 데이터 시각화 등 목적에 따라 구분됩니다.
방향은 모두 **135° 대각선 (↘)** 기준이며, Glass Dark는 알파(투명도)를 포함합니다.

| 스타일명 | 용도 | 방향 | Start (0%) | End (100%) | CSS |
|---|---|---|---|---|---|
| **Gradient/Primary** | 브랜드 CTA | 135° diagonal | `#3182f6` 100% | `#6366f1` 100% | `linear-gradient(135deg, #3182f6, #6366f1)` |
| **Gradient/Dark-Hero** | 슬라이드 배경 | 135° diagonal | `#1e1b4b` 100% | `#2a2a6a` 100% | `linear-gradient(135deg, #1e1b4b, #2a2a6a)` |
| **Gradient/Indigo-Deep** | 딥 강조 | 135° diagonal | `#312e81` 100% | `#1e40af` 100% | `linear-gradient(135deg, #312e81, #1e40af)` |
| **Gradient/Teal-Accent** | 포인트 | 135° diagonal | `#10b981` 100% | `#3182f6` 100% | `linear-gradient(135deg, #10b981, #3182f6)` |
| **Gradient/Surface-Light** | 배경 | top → bottom | `#f9fafb` 100% | `#f0f2f5` 100% | `linear-gradient(180deg, #f9fafb, #f0f2f5)` |
| **Gradient/Warm-Sunset** | 워닝 | 135° diagonal | `#f59e0b` 100% | `#ef4444` 100% | `linear-gradient(135deg, #f59e0b, #ef4444)` |
| **Gradient/DataViz-Blue** | 데이터 시각화 | top → bottom | `#e8f3ff` 100% | `#3182f6` 80% | `linear-gradient(180deg, #e8f3ff, #3182f6cc)` |
| **Gradient/Glass-Dark** | 글래스 다크 | 135° diagonal | `#6366f1` 30% | `#1e1b4b` 80% | `linear-gradient(135deg, #6366f14d, #1e1b4bcc)` |

> **Glass Dark** 사용 시: 알파값이 있으므로 배경 레이어 위에 overlay로 적용합니다.
> **DataViz Blue**는 fade-in 효과용이며 하단 색상(`#3182f6`)에 80% 불투명도를 사용합니다.

---

## 7. 컴포넌트

### 7.1 header-bar (ID: 83:368)

슬라이드 최상단 고정 헤더. 모든 장표에 공통 적용하나 표지 제외.

- 크기: 1280 × 100px
- 배경: secondary/indigo100
- Kicker 텍스트: Caption/S-Bold + secondary/indigo40
- 제목 텍스트: Heading/M + text/inverse
- 아이콘: 우측 고정 24×24px

---

### 7.2 tooltip (ID: 83:358)

결론, NEXT STEPS, 주요 인사이트 텍스트 패널.

- 크기: 1160 × 155px
- 배경: secondary/indigo100 (다크) 또는 background/secondary (라이트)
- 헤더 레이블: Caption/S-Bold + secondary/indigo40
- 본문: Body/S-Regular + text/inverse (다크) / text/primary (라이트)
- Elevation: Elevation/2 · Card
- Radius: radius/lg

---

### 7.3 viewpoint card (ID: 83:403)

인사이트·관점 카드. 카드 그리드 슬라이드에 사용.

- 크기: 400 × 237px
- 배경: background/surface
- Elevation: Elevation/2 · Card
- Radius: radius/lg (12px)
- 번호 배지: brand/primary 원형, Heading/S 흰색 숫자
- 제목: Heading/XS + text/primary
- 설명: Body/S-Regular + text/secondary
- 태그: radius/full, background/brand + text/brand
- Padding: spacing/24 / Gap: spacing/12

---

### 7.4 persona-card (ID: 83:413)

사용자 페르소나 카드. 썸네일 갤러리 슬라이드에 사용.

- 크기: 272 × 236px
- 배경: background/surface
- Elevation: Elevation/2 · Card
- Radius: radius/lg (12px)
- 아바타: 48×48px, radius/full, background/secondary
- 이름: Heading/S + text/primary
- 역할 뱃지: role-badge 컴포넌트 인라인
- 역할 설명: Body/S-Regular + text/secondary
- 구분선: border/default
- 불릿: Caption/M-Regular + text/secondary
- Padding: spacing/20

---

### 7.5 role-badge (ID: 76:239)

역할·카테고리 구분 소형 뱃지. Persona Card 내 인라인 배치.

- 크기: 41 × 21px (콘텐츠 따라 가변)
- Radius: radius/full (9999px)
- 텍스트: Caption/L-Medium (12px)

| 역할 | Background Token | Text Token |
|---|---|---|
| 에이전시 | background/secondary | brand/secondary |
| 프로젝트 매니저 | background/brand | text/brand |
| UX 디자이너 | background/secondary | text/link |
| 애널리스트 | status/success-bg | status/success |
| 개발자 | background/muted | text/secondary |

---

### 7.6 code-block

SQL 쿼리·코드 스니펫 표시 패널. 보고서·분석 슬라이드에 사용.

- 배경 (다크): `neutral/neutral100`
- 배경 (라이트): `background/muted`
- 언어 레이블: `Code/Label` + `text/tertiary`, 좌상단 고정
- 본문: `Code/Block-Regular` + `text/inverse` (다크) / `text/primary` (라이트)
- 키워드 강조: `Code/Block-Bold` + `secondary/indigo40` — 다크 배경 전용 허용
- Radius: `radius/md` (8px)
- Padding: `spacing/16`
- Elevation: `Elevation/1 · Raised`

**인라인 코드 스팬**
- 배경: `background/muted`
- 텍스트: `Code/Inline` + `text/primary`
- Radius: `radius/xs` (2px)
- Padding: `spacing/2` (상하) · `spacing/4` (좌우)

---

### 7.7 기타 컴포넌트

| 컴포넌트명 | ID | 크기 | 설명 |
|---|---|---|---|
| image-thumb | 83:414 | 232×122px | 썸네일 이미지 |
| status/success chip | 76:227 | 39×23px | 성공 상태 인라인 칩 |
| status/warning chip | 76:231 | 39×23px | 경고 상태 인라인 칩 |
| status/info chip | 76:233 | 39×23px | 정보 상태 인라인 칩 |
| status/error chip | 76:237 | 39×23px | 오류 상태 인라인 칩 |
| badge/general | 83:378 | 43×31px | 일반 중립 뱃지 (neutral beige) |
| badge/sub | 83:380 | 43×31px | 보조 뱃지 (muted gray) |
| viewpoint list (Default) | 76:257 | 432×92px | 리스트형 관점 카드 |
| viewpoint list (Variant2) | 80:304 | 432×86px | 리스트형 관점 카드 변형 |
| content block (Default) | 83:363 | 568×135px | 콘텐츠 블록 |
| content block (Variant2) | 83:365 | 568×135px | 콘텐츠 블록 변형 |
| radar-chart | 12:4 | 420×626px | 헥사곤 레이더 차트 + 지표 progress bar — 활동 역량 분석 슬라이드 전용 |

### 7.8 Icon/Large `(76:224)`

- 크기: 24×24px
- variant property: `icon`

| icon | 용도 |
|---|---|
| arrow-right | 이동·다음 |
| user | 사용자 |
| folder | 폴더·카테고리 |
| smile | 감정·긍정 |
| megaphone-off | 알림 끄기 |
| shield-alert | 보안 경고 |
| sparkles | AI·하이라이트 |
| shopping-cart | 장바구니·구독 |
| x | 닫기·취소 |
| print | 인쇄 |
| share | 공유 |
| laugh | 긍정 반응 |

---

## 8. 사용 가이드

### 컬러 원칙

1. 컴포넌트에는 반드시 Semantic Token 사용 — `brand/primary`, `text/primary` 등
2. Primitive는 직접 사용 금지 — 팔레트 문서 표시 용도로만 존재
3. 예외 허용 — 다크 슬라이드 배경에만 `secondary/indigo100`, `indigo30/40/50` 직접 사용 가능
4. Light 배경 기본값 — `background/surface`, 강조 섹션은 `background/subtle`

### 타이포그래피 원칙

- 카드 제목 = `Heading/XS` (16px Bold) — `Body/M-Bold` 사용 금지
- 숫자·수치 = `Data/` 계열 (Inter) — 한글과 혼용 금지
- 한국어 본문 행간 = 160% — 가독성 필수 기준
- 캡션 최소 크기 = 10px — 이하 사용 금지
- SQL·코드 = `Code/` 계열 (JetBrains Mono) — 일반 본문 폰트 혼용 금지

### 컴포넌트 원칙

- 모든 카드: `Elevation/2 · Card` + `radius/lg`
- 뱃지/태그: `radius/full` 고정
- 다크 배경 텍스트: `text/inverse` + `secondary/indigo40` (강조)
- 슬라이드 기준 패딩: `spacing/64` (좌우), `spacing/48` (상하)
- **부분 스트로크 금지**: 컴포넌트·콘텐츠 요소에 상·하·좌·우 중 특정 1면만 stroke 적용 금지. 테두리가 필요한 경우 4면 전체에 `border/default` 1px 균일 적용. 방향성 구분선이 필요하면 별도 Divider 요소를 레이아웃 외부에 배치.
- **이미지·스크린샷 비율 유지**: 장표에 이미지 삽입 시 원본 비율(aspect ratio) 유지 필수 — stretch·squish 금지. 영역이 맞지 않을 경우 클리핑 마스크로 처리하되 핵심 콘텐츠가 잘리지 않도록 배치 기준점 중앙 또는 상단으로 고정. 여백은 `background/subtle`로 채움.

### 슬라이드 타입별 컴포넌트 조합

| 슬라이드 타입 | 주요 컴포넌트 | 배경 |
|---|---|---|
| 표지 (Cover) | header-bar + Display/2XL | Gradient/Dark-Hero |
| 카드 그리드 | header-bar + viewpoint card × N | background/surface |
| 썸네일 갤러리 | header-bar + persona-card × N | background/subtle |
| 콘텐츠+사이드바 | header-bar + tooltip + Dark Panel | background/surface |
| 요약/결론 | header-bar + tooltip | Gradient/Dark-Hero |

---

*Generated from Figma Design System — aPVAfH6RnkG0eugmNNN87s*
