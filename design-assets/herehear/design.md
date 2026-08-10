# HereHear 디자인 시스템 — Design.md

> 지역맞춤 뮤직 플레이어 앱(Travel Music) 전용 디자인 시스템
> Figma "디자인시스템" 섹션 기준 (2026년 8월)

HereHear는 여행지·현재 위치에 맞춘 음악을 추천하는 뮤직 플레이어입니다. 이 문서는 Figma 디자인시스템 섹션(Color / Typography / Spacing & Radius / Elevation)에서 추출한 디자인 토큰을 정리한 design.md입니다.

## 목차

1. [컬러 시스템](#1-컬러-시스템)
2. [타이포그래피](#2-타이포그래피)
3. [스페이싱 &amp; Radius](#3-스페이싱--radius)
4. [Elevation](#4-elevation)
5. [사용 가이드](#5-사용-가이드)

---

## 1. 컬러 시스템

### 1.1 Primitive Colors

#### Purple (Primary)

브랜드 프라이머리 컬러. 인터랙티브 요소, 액센트, CTA 버튼에 사용. 50-200은 배경, 400-500은 인터랙션, 700-900은 텍스트에 적합.

| Token | Hex |
|---|---|
| purple/50 | #faf2ff |
| purple/100 | #f2e0ff |
| purple/200 | #e0bfff |
| purple/300 | #cc94fa |
| purple/400 | #b86bf7 |
| purple/500 | #a855f7 |
| purple/600 | #9341d4 |
| purple/700 | #7c34b2 |
| purple/800 | #682c93 |
| purple/900 | #552578 |

#### Pink (Secondary)

세컨더리 액센트 컬러. 좋아요, 하이라이트, 인기 장소 뱃지 등 감성적 포인트에 사용.

| Token | Hex |
|---|---|
| pink/50 | #fdf2f8 |
| pink/100 | #fce7f3 |
| pink/200 | #fbcfe8 |
| pink/300 | #f9a8d4 |
| pink/400 | #f472b6 |
| pink/500 | #ec4899 |
| pink/600 | #db2777 |

#### Neutral

텍스트, 배경, 보더 등 UI 전반에 사용되는 중립 색상. 0은 화이트, 900은 가장 어두운 값.

| Token | Hex |
|---|---|
| neutral/0 | #ffffff |
| neutral/50 | #f8f8ff |
| neutral/100 | #f5f5f5 |
| neutral/200 | #e5e5e5 |
| neutral/300 | #c8beb1 |
| neutral/400 | #999999 |
| neutral/500 | #595959 |
| neutral/600 | #484848 |
| neutral/700 | #333333 |
| neutral/800 | #1d1928 |
| neutral/900 | #1c1814 |

---

### 1.2 Semantic Tokens

컴포넌트에는 Primitive를 직접 참조하지 말고 아래 Semantic Token을 사용합니다.

#### Background

| Token | Hex | 참조 Primitive |
|---|---|---|
| color/bg/primary | #ffffff | neutral/0 |
| color/bg/secondary | #f8f8ff | neutral/50 |
| color/bg/tertiary | #f5f5f5 | neutral/100 |
| color/background/primary | #ffffff | neutral/0 |
| color/background/secondary | #f8f8ff | neutral/50 |

#### Surface

| Token | Hex | 사용처 |
|---|---|---|
| color/surface/card | #ffffff | 카드, 리스트 아이템 배경 |
| color/surface/overlay | #f8f8ff | 모달·바텀시트 오버레이 배경 |
| color/surface/input | #ffffff | 인풋 필드 배경 |

#### Text

| Token | Hex | 참조 Primitive |
|---|---|---|
| color/text/primary | #1d1928 | neutral/800 |
| color/text/secondary | #484848 | neutral/600 |
| color/text/tertiary | #595959 | neutral/500 |
| color/text/inverse | #ffffff | neutral/0 |
| color/text/brand | #a855f7 | purple/500 |

#### Brand / Accent

| Token | Hex | 참조 Primitive |
|---|---|---|
| color/brand/primary | #a855f7 | purple/500 |
| color/brand/secondary | #b86bf7 | purple/400 |
| color/brand/subtle | #f2e0ff | purple/100 |
| color/brand/muted | #faf2ff | purple/50 |
| color/accent/primary | #a855f7 | purple/500 |
| color/accent/secondary | #ec4899 | pink/500 |
| color/accent/subtle | #f3e8ff | purple/100 계열 |

#### Border

| Token | Hex | 참조 Primitive |
|---|---|---|
| color/border/default | #e5e5e5 | neutral/200 |
| color/border/subtle | #f5f5f5 | neutral/100 |
| color/border/brand | #a855f7 | purple/500 |

#### Icon

| Token | Hex | 참조 Primitive |
|---|---|---|
| color/icon/primary | #333333 | neutral/700 |
| color/icon/secondary | #595959 | neutral/500 |
| color/icon/brand | #a855f7 | purple/500 |
| color/icon/inverse | #ffffff | neutral/0 |
| color/icon/default | #484848 | neutral/600 |
| color/icon/subtle | #71717a | — |

#### Interactive (버튼·탭 상태)

| Token | Hex | 사용처 |
|---|---|---|
| color/interactive/default | #a855f7 | 기본 상태 |
| color/interactive/hover | #9333ea | 호버 상태 |
| color/interactive/pressed | #7e22ce | 눌림 상태 |
| color/interactive/disabled | #cbd5e1 | 비활성 상태 |

---

## 2. 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 용도 |
|---|---|---|
| Primary | SUIT Variable | 전체 UI 텍스트 (Display, Heading, Title, Body, Label, Caption) |
| Mono | DM Mono | 코드·데이터 값 표시 |

### 스타일

| 스타일명 | 폰트 | 크기 | Weight | 행간(LH) |
|---|---|---|---|---|
| Display | SUIT Variable Regular | 44px | 400 | 52 |
| Display/Large | SUIT Variable ExtraBold | 36px | 800 | 40 |
| Display/Medium | SUIT Variable SemiBold | 28px | 600 | 34 |
| Heading/H1 | SUIT Variable SemiBold | 24px | 600 | 32 |
| Heading/H2 | SUIT Variable Bold | 20px | 700 | 28 |
| Heading/H3 | SUIT Variable SemiBold | 18px | 600 | 26 |
| Title/Large | SUIT Variable Bold | 20px | 700 | 28 |
| Title/Medium | SUIT Variable Bold | 18px | 700 | 26 |
| Title/Small | SUIT Variable SemiBold | 16px | 600 | 24 |
| Body/Large | SUIT Variable Regular | 16px | 400 | 24 |
| Body/Regular | SUIT Variable Regular | 16px | 400 | 24 |
| Body/Medium | SUIT Variable Regular | 14px | 400 | 22 |
| Body/Small | SUIT Variable Regular | 12px | 400 | 18 |
| Label/Large | SUIT Variable SemiBold | 14px | 600 | 20 |
| Label/Medium | SUIT Variable SemiBold | 12px | 600 | 16 |
| Label/Small | SUIT Variable Medium | 12px | 500 | 16 |
| Mono/Medium | DM Mono Medium | 24px | 500 | 32 |
| Mono/Small | DM Mono Medium | 14px | 500 | 20 |
| Mono | DM Mono Medium | 12px | 500 | 18 |
| Caption | SUIT Variable Medium | 11px | 500 | 16 |

---

## 3. 스페이싱 &amp; Radius

### 스페이싱

8pt Grid 기반은 아니며, 토큰명이 곧 px 값입니다. 변수명: `spacing/[value]`

| Token | 값 |
|---|---|
| spacing/2 | 2px |
| spacing/4 | 4px |
| spacing/6 | 6px |
| spacing/8 | 8px |
| spacing/10 | 10px |
| spacing/12 | 12px |
| spacing/16 | 16px |
| spacing/20 | 20px |
| spacing/24 | 24px |
| spacing/32 | 32px |
| spacing/44 | 44px |
| spacing/64 | 64px |

### Border Radius

변수명: `radius/[name]`

| Token | 값 |
|---|---|
| radius/none | 0px |
| radius/sm | 4px |
| radius/md | 8px |
| radius/lg | 12px |
| radius/xl | 16px |
| radius/2xl | 24px |
| radius/full | 9999px |

---

## 4. Elevation

| 스타일명 | Shadow 값 | CSS |
|---|---|---|
| Shadow/Small | rgba(0,0,0,0.08), offset (0, 2), blur 4 | `box-shadow: 0 2px 4px rgba(0,0,0,0.08)` |
| Shadow/Medium | rgba(0,0,0,0.12), offset (0, 4), blur 12 | `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` |
| Shadow/Large | rgba(0,0,0,0.16), offset (0, 8), blur 24 | `box-shadow: 0 8px 24px rgba(0,0,0,0.16)` |
| Glow/Purple | rgba(168,85,247,0.30), offset (0, 4), blur 16 | `box-shadow: 0 4px 16px rgba(168,85,247,0.30)` |

> **Glow/Purple**는 브랜드 컬러(purple/500)를 활용한 강조 효과로, 선택된 상태·재생 중 앨범 카드 등 브랜드 포인트 강조에 사용합니다.

---

## 5. 사용 가이드

### 컬러 원칙

1. 컴포넌트에는 반드시 Semantic Token 사용 — Primitive(`purple/*`, `pink/*`, `neutral/*`) 직접 사용 금지
2. 브랜드 강조는 `color/brand/primary`(purple/500) 또는 `color/accent/primary` 사용
3. 세컨더리 감성 포인트(좋아요, 인기 뱃지)는 `color/accent/secondary`(pink/500) 사용
4. 인터랙션 상태(hover/pressed/disabled)는 반드시 `color/interactive/*` 토큰 사용 — 임의의 opacity 조정 금지

### 타이포그래피 원칙

- UI 텍스트는 SUIT Variable, 코드·데이터 값은 DM Mono로 구분해 혼용하지 않습니다
- 화면 최상위 타이틀은 `Display/Large` 또는 `Heading/H1`, 카드·리스트 제목은 `Title/*` 또는 `Label/Large` 사용
- 본문은 `Body/Regular`(16px) 기본, 보조 설명은 `Body/Medium`(14px)·`Body/Small`(12px) 사용
- 최소 텍스트 크기는 `Caption`(11px) — 이하 사용 금지

### 스페이싱 &amp; Radius 원칙

- 컴포넌트 내부 패딩·요소 간 gap은 `spacing/*` 토큰만 사용 — 임의 px 값 금지
- 카드·패널: `radius/lg`(12px), 인풋·소형 버튼: `radius/md`(8px), 뱃지·태그·앨범 아트 등 알약형: `radius/full`
- 카드 기본 elevation은 `Shadow/Small`, 모달·바텀시트는 `Shadow/Large` 사용

---

*Generated from Figma Design System — fileKey: cZRQkGyyE01VFX9AzJ6ZQX, node: 2115:2531*
