---
version: alpha
name: 喫茶 Kissa
description: >
  차 한 잔이 식기 전의 시간. 빛바랜 도자기, 낡은 나무 의자,
  유리창에 번지는 빗소리. 喫茶(킷사)는 그 순간을 색으로 옮긴 시스템입니다.
  Primitive → Semantic → Molecule, 세 겹의 레이어가
  따뜻하고 오래된 것들의 언어를 구성합니다.

colors:
  # ── 原色 Primitive · Gray — 시간의 먼지 ──────────────────────────
  gray-100: "#F7F5F2"
  gray-200: "#E0DAD2"
  gray-300: "#C8BEB1"
  gray-400: "#B1A390"
  gray-500: "#9A8870"
  gray-600: "#7A6C59"
  gray-700: "#5B5042"
  gray-800: "#3C342B"
  gray-900: "#1C1814"

  # ── 原色 Primitive · Info — 블루 스톤 ───────────────────────────
  info-100: "#E8EFF7"
  info-200: "#C5D3E3"
  info-300: "#A2B6CE"
  info-400: "#7E9ABA"
  info-500: "#5B7EA6"
  info-600: "#48688C"
  info-700: "#355273"
  info-800: "#223B5A"
  info-900: "#0F2540"

  # ── 原色 Primitive · Success — 세이지 그린 ──────────────────────
  success-100: "#EAF3EC"
  success-200: "#CAD9C0"
  success-300: "#AAC8B3"
  success-400: "#8BB396"
  success-500: "#6B9E7A"
  success-600: "#578665"
  success-700: "#426E50"
  success-800: "#2E553A"
  success-900: "#1A3D25"

  # ── 原色 Primitive · Warning — 팬케이크 앰버 ────────────────────
  warning-100: "#FDF0E3"
  warning-200: "#F8D8BD"
  warning-300: "#F2C196"
  warning-400: "#EDAA70"
  warning-500: "#E8924A"
  warning-600: "#C0763A"
  warning-700: "#995A29"
  warning-800: "#723E18"
  warning-900: "#4A2208"

  # ── 原色 Primitive · Danger — 홍차 로즈 ─────────────────────────
  danger-100: "#FAECF0"
  danger-200: "#EEC9D2"
  danger-300: "#E1A6B5"
  danger-400: "#D48398"
  danger-500: "#C8607A"
  danger-600: "#A94D66"
  danger-700: "#8A3A51"
  danger-800: "#6A283C"
  danger-900: "#4B1528"

  # ── 意味色 Semantic — 역할의 언어 ────────────────────────────────
  primary:              "{colors.info-900}"
  on-primary:           "{colors.info-100}"
  primary-container:    "{colors.info-200}"
  on-primary-container: "{colors.info-700}"
  secondary:            "{colors.gray-900}"
  on-secondary:         "{colors.gray-100}"
  surface:              "{colors.gray-100}"
  on-surface:           "{colors.gray-900}"
  on-surface-muted:     "{colors.gray-600}"
  on-surface-disabled:  "{colors.gray-400}"
  outline:              "{colors.gray-400}"
  outline-strong:       "{colors.gray-600}"
  success:              "{colors.success-500}"
  on-success:           "{colors.success-100}"
  success-container:    "{colors.success-100}"
  on-success-container: "{colors.success-700}"
  warning:              "{colors.warning-500}"
  on-warning:           "{colors.warning-100}"
  warning-container:    "{colors.warning-100}"
  on-warning-container: "{colors.warning-800}"
  danger:               "{colors.danger-500}"
  on-danger:            "{colors.danger-100}"
  danger-container:     "{colors.danger-100}"
  on-danger-container:  "{colors.danger-700}"

  # ── 品牌 Brand — 킷사의 얼굴 ─────────────────────────────────────
  brand-navy:   "#2B3060"
  brand-cream:  "#F5ECD7"
  brand-accent: "#E8924A"

typography:
  display:
    fontFamily: DM Serif Display
    fontSize: 3.5rem
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: 0.01em
  h1:
    fontFamily: DM Serif Display
    fontSize: 2.5rem
    fontWeight: 400
    lineHeight: 1.1
  h2:
    fontFamily: DM Serif Display
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.2
  h3:
    fontFamily: Hahmlet
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.35
  body-lg:
    fontFamily: Hahmlet
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Hahmlet
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Hahmlet
    fontSize: 0.8125rem
    fontWeight: 300
    lineHeight: 1.65
  label-mono:
    fontFamily: DM Mono
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.08em
  caption:
    fontFamily: DM Mono
    fontSize: 0.625rem
    fontWeight: 400
    letterSpacing: 0.12em
  serif-kr:
    fontFamily: Noto Serif KR
    fontSize: 0.875rem
    fontWeight: 300
    lineHeight: 1.8

rounded:
  none: 0px
  xs:   4px
  sm:   8px
  md:   12px
  lg:   16px
  full: 9999px

spacing:
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px

components:
  button-primary:
    backgroundColor: "{colors.info-500}"
    textColor:       "{colors.info-100}"
    rounded:         "{rounded.sm}"
    padding:         "10px 20px"
    typography:      "{typography.label-mono}"
  button-primary-hover:
    backgroundColor: "{colors.info-600}"
    textColor:       "{colors.info-100}"
  button-primary-active:
    backgroundColor: "{colors.info-700}"
    textColor:       "{colors.info-100}"
  button-primary-disabled:
    backgroundColor: "{colors.gray-300}"
    textColor:       "{colors.gray-400}"
  button-secondary:
    backgroundColor: "transparent"
    textColor:       "{colors.gray-900}"
    rounded:         "{rounded.sm}"
    padding:         "10px 20px"
    typography:      "{typography.label-mono}"
  button-secondary-hover:
    backgroundColor: "{colors.gray-100}"
    textColor:       "{colors.gray-900}"
  button-danger:
    backgroundColor: "{colors.danger-500}"
    textColor:       "{colors.danger-100}"
    rounded:         "{rounded.sm}"
    padding:         "10px 20px"
    typography:      "{typography.label-mono}"
  button-danger-hover:
    backgroundColor: "{colors.danger-600}"
    textColor:       "{colors.danger-100}"
  badge-info:
    backgroundColor: "{colors.info-100}"
    textColor:       "{colors.info-700}"
    rounded:         "{rounded.full}"
    padding:         "3px 10px"
    typography:      "{typography.label-mono}"
  badge-success:
    backgroundColor: "{colors.success-100}"
    textColor:       "{colors.success-700}"
    rounded:         "{rounded.full}"
    padding:         "3px 10px"
    typography:      "{typography.label-mono}"
  badge-warning:
    backgroundColor: "{colors.warning-100}"
    textColor:       "{colors.warning-800}"
    rounded:         "{rounded.full}"
    padding:         "3px 10px"
    typography:      "{typography.label-mono}"
  badge-danger:
    backgroundColor: "{colors.danger-100}"
    textColor:       "{colors.danger-700}"
    rounded:         "{rounded.full}"
    padding:         "3px 10px"
    typography:      "{typography.label-mono}"
  badge-neutral:
    backgroundColor: "{colors.gray-100}"
    textColor:       "{colors.gray-700}"
    rounded:         "{rounded.full}"
    padding:         "3px 10px"
    typography:      "{typography.label-mono}"
  alert-info:
    backgroundColor: "{colors.info-100}"
    textColor:       "{colors.info-700}"
    rounded:         "{rounded.sm}"
    padding:         "10px 14px"
    typography:      "{typography.body-md}"
  alert-success:
    backgroundColor: "{colors.success-100}"
    textColor:       "{colors.success-700}"
    rounded:         "{rounded.sm}"
    padding:         "10px 14px"
    typography:      "{typography.body-md}"
  alert-warning:
    backgroundColor: "{colors.warning-100}"
    textColor:       "{colors.warning-800}"
    rounded:         "{rounded.sm}"
    padding:         "10px 14px"
    typography:      "{typography.body-md}"
  alert-danger:
    backgroundColor: "{colors.danger-100}"
    textColor:       "{colors.danger-700}"
    rounded:         "{rounded.sm}"
    padding:         "10px 14px"
    typography:      "{typography.body-md}"
  input-default:
    backgroundColor: "#FFFFFF"
    textColor:       "{colors.gray-900}"
    rounded:         "{rounded.sm}"
    padding:         "8px 12px"
    typography:      "{typography.body-md}"
  input-focus:
    backgroundColor: "#FFFFFF"
    textColor:       "{colors.gray-900}"
  input-error:
    backgroundColor: "#FFFFFF"
    textColor:       "{colors.gray-900}"
  input-disabled:
    backgroundColor: "{colors.gray-100}"
    textColor:       "{colors.gray-400}"
  toast-info:
    backgroundColor: "{colors.info-800}"
    textColor:       "{colors.info-100}"
    rounded:         "{rounded.sm}"
    padding:         "8px 16px"
    typography:      "{typography.label-mono}"
  toast-success:
    backgroundColor: "{colors.success-800}"
    textColor:       "{colors.success-100}"
    rounded:         "{rounded.sm}"
    padding:         "8px 16px"
    typography:      "{typography.label-mono}"
  toast-warning:
    backgroundColor: "{colors.warning-700}"
    textColor:       "{colors.warning-100}"
    rounded:         "{rounded.sm}"
    padding:         "8px 16px"
    typography:      "{typography.label-mono}"
  toast-danger:
    backgroundColor: "{colors.danger-800}"
    textColor:       "{colors.danger-100}"
    rounded:         "{rounded.sm}"
    padding:         "8px 16px"
    typography:      "{typography.label-mono}"
---

## Overview

> *喫茶去 — 차나 한 잔 드시게.*
>
> 唐代의 선사 趙州가 찾아오는 누구에게든 건넨 이 한마디는,
> 특별하지 않은 순간을 가장 특별한 것으로 만드는 힘을 담고 있습니다.
> 이 시스템은 그 마음에서 시작됩니다.

**喫茶 Kissa**는 킷사텐(喫茶店) — 일본과 대만의 오래된 다방 문화 — 에서 출발한 디자인 시스템입니다. 1960–80년대 도쿄와 타이베이의 골목, 낡은 줄무늬 어닝 아래 놓인 플라스틱 의자, 손때 묻은 메뉴판, 유리잔에 담긴 밀크티. 그 안에는 새것이 절대로 가질 수 없는 온도가 있습니다.

이 시스템이 추구하는 것은 **완벽한 아름다움이 아닌, 시간이 쌓인 아름다움**입니다. 픽셀 퍼펙트한 정렬보다 약간의 비틀림이, 차가운 순백보다 황토빛이 도는 크림이, 형광 컬러보다 빛바랜 채도가 여기서는 더 올바른 선택입니다.

---

### 三層の構造 · 세 겹의 구조

색은 세 개의 레이어를 통과하며 비로소 의미를 얻습니다. 마치 안료가 그릇에 담기고, 그릇이 찻상에 오르듯.

```
原色 Primitive  ─→  意味色 Semantic  ─→  品物 Molecule
 (순수한 값)         (역할의 이름)         (컴포넌트의 언어)
```

- **原色 Primitive** — 팔레트의 원시값. 5개 팔레트 × 9단계(100–900). 이 레이어의 토큰은 직접 사용하지 않습니다. 안료처럼, 섞이기 전의 순수한 상태로 보관합니다.
- **意味色 Semantic** — 색에 역할을 부여하는 레이어. `primary`, `success`, `warning` 같은 이름으로 Primitive를 alias 참조합니다. "이 색이 무엇을 뜻하는가"가 여기서 결정됩니다.
- **品物 Molecule** — 컴포넌트가 실제로 소비하는 토큰. 버튼, 배지, 알림, 인풋, 토스트. 각 상태(default · hover · active · disabled)가 완전하게 정의됩니다.

---

### 裏面 · 다크 모드

앞면과 뒷면. 찻잔을 뒤집어도 찻잔인 것처럼.

Primitive 스케일을 반전(100 ↔ 900)하면 다크 모드가 완성됩니다. Semantic과 Molecule 레이어는 손댈 필요가 없습니다. 구조가 올바르게 설계되어 있다면, 모드 전환은 한 번의 결정으로 끝납니다.


## Colors

> *色即是空, 空即是色 — 색은 곧 비어있음이요, 비어있음이 곧 색이다.*
>
> 토큰은 비어있는 그릇입니다. 의미는 맥락이 채웁니다.
> 같은 `info-500`이라도 배경이 되면 고요하고, 텍스트가 되면 또렷합니다.

### 灰 · Gray — 시간의 먼지

가장 오래된 색. 빛바랜 신문지, 낡은 목재, 도자기의 소지(素地). 흰색도 검정도 아닌, 시간이 만든 중간 어딘가.

Gray 램프는 순수한 무채색이 아닙니다. `gray-100 #F7F5F2`는 황토빛이 살짝 섞인 크림화이트이고, `gray-900 #1C1814`는 에스프레소의 어둠입니다. 차갑지 않고, 그저 오래됐습니다. 텍스트, 배경, 보더, 아이콘의 기본값이며 이 시스템에서 가장 많이 쓰이는 팔레트입니다.

| 단계 | Hex | 용도 |
|------|-----|------|
| 100 | `#F7F5F2` | 페이지 배경 · 카드 표면 |
| 200 | `#E0DAD2` | 서피스 · 구분선 · 페이지 바닥 |
| 400 | `#B1A390` | 인풋 보더 · 플레이스홀더 |
| 600 | `#7A6C59` | 보조 텍스트 · 아이콘 |
| 900 | `#1C1814` | 본문 · 제목 |

---

### 靑石 · Info — 블루 스톤

킷사텐 도자기의 감청색. 잉크가 번진 편지지. 비 오는 날 창 너머로 보이는 하늘. 차분하고 무게감 있는 파랑입니다.

`info-500 #5B7EA6`은 이 시스템의 대표 인터랙션 색입니다. 선명하지 않고, 조용하게 눈에 띕니다. `primary` Semantic 토큰의 소스이며, 사용자의 행동을 부드럽게 이끕니다.

| 단계 | Hex | 용도 |
|------|-----|------|
| 100 | `#E8EFF7` | 배경 subtle · on-emphasis 텍스트 |
| 500 | `#5B7EA6` | Primary 버튼 배경 · 포커스 링 |
| 700 | `#355273` | 배지 · 알림 텍스트 |
| 900 | `#0F2540` | Semantic primary · 네이비 딥 |

> ⚠ `button-primary`(info-500 위 info-100)의 컨트라스트는 3.64:1입니다. WCAG AA Large 기준을 충족하므로 버튼 텍스트는 반드시 **Bold 14px 이상**으로 사용합니다.

---

### 艾草 · Success — 세이지 그린

킷사텐 창가에 놓인 화분. 메뉴판 옆에 꽂힌 민트 잎. 오래 키운 식물처럼, 과하게 밝지 않은 초록입니다. 성공은 요란하지 않습니다. 조용히, 그러나 분명하게.

| 단계 | Hex | 용도 |
|------|-----|------|
| 100 | `#EAF3EC` | 배경 subtle |
| 500 | `#6B9E7A` | 아이콘 · 강조 배경 |
| 700 | `#426E50` | 텍스트 (AA 5.18:1 ✅) |

---

### 琥珀 · Warning — 팬케이크 앰버

갓 구운 핫케이크의 황금빛. 버터가 녹아드는 찰나의 색. 위험을 알리되 불안하지 않습니다. 이 시스템에서 경고는 따뜻하게 주의를 요청합니다.

`warning-500 #E8924A`는 Brand Accent이기도 합니다. UI에서 가장 에너지가 넘치는 색이지만, **작은 텍스트로는 절대 사용하지 않습니다.** 배경으로서만 빛을 발합니다.

| 단계 | Hex | 용도 |
|------|-----|------|
| 100 | `#FDF0E3` | 배경 subtle |
| 500 | `#E8924A` | 아이콘 · 배경 강조 · Brand Accent |
| 800 | `#723E18` | 텍스트 전용 (AA 7.76:1 ✅) |

> ⚠ `warning-500`(`#E8924A`)을 크림 배경 위 텍스트로 사용하지 마세요. 컨트라스트 2.07:1 — WCAG 기준 미달.

---

### 紅茶 · Danger — 홍차 로즈

날카롭지 않습니다. 이것은 경보음이 아닙니다. 홍차잔 바닥에 남은 찻물의 붉음, 오래된 벨벳의 색. 빈티지한 위험색 — 서정적이지만 분명히 위험을 말합니다.

| 단계 | Hex | 용도 |
|------|-----|------|
| 100 | `#FAECF0` | 배경 subtle |
| 500 | `#C8607A` | 아이콘 · 배경 강조 |
| 700 | `#8A3A51` | 텍스트 (AA 6.53:1 ✅) |

> ⚠ `button-danger`(danger-500 위 danger-100)의 컨트라스트는 3.39:1입니다. **Bold 14px 이상** 조건 필수.


## Typography

> *一字一字に魂を込める — 한 글자 한 글자에 혼을 담는다.*

세 가지 폰트 패밀리가 역할을 나눠 맡습니다. 서로 다른 온도를 가진 세 가지 목소리입니다.

**DM Serif Display** — 헤드라인의 목소리. 이탤릭을 적극 활용합니다. 빈티지 에디토리얼 감성의 핵심이며, 글자 하나하나가 오래된 활판 인쇄의 질감을 냅니다. 이 폰트가 있는 곳에는 언제나 약간의 낭만이 있습니다.

**Hahmlet** — 한국어 본문의 목소리. 세리프 기반의 따뜻한 산세리프로, 긴 글을 읽어도 피곤하지 않습니다. 한자·한글·영문이 혼재해도 자연스럽게 어울립니다. 이 시스템의 일상적인 언어입니다.

**DM Mono** — 수치와 레이블의 목소리. 토큰 이름, 버전 표기, 인풋 플레이스홀더에 씁니다. 기계적이지만 차갑지 않은 모노스페이스. 正確하게, 그러나 따뜻하게.

**Noto Serif KR** — 한자와 감성 텍스트의 목소리. 인용구, 브랜드 장식, 컨셉 설명에 씁니다. 이 시스템의 정서적 깊이를 담당합니다.

타이포그래피 스케일: `display → h1 → h2 → h3 → body-lg → body-md → body-sm → label-mono → caption`


## Layout

최대 콘텐츠 너비 `1100px`. 사이드바 레이아웃은 `220px + 1fr` 그리드.

보더는 항상 `0.5px solid`. 얇을수록 오래된 것처럼 보입니다. 두꺼운 보더(`2px`)는 강조 카드 테두리 한 곳에만, 예외로 허용합니다.


## Elevation & Depth

> *影なき光なし — 그림자 없는 빛은 없다.*
> 그러나 이 시스템은 그림자 대신 배경의 층위로 깊이를 만듭니다.

`box-shadow`를 쓰지 않습니다. 빛에 의한 그림자 대신, 배경색의 층위로 공간을 만듭니다. 마치 켜켜이 쌓인 한지처럼.

```
Level 3  ·  네이비 딥   #2B3060  ─  사이드바 · 고정 헤더
Level 2  ·  흰색        #FFFFFF  ─  팝업 · 드롭다운
Level 1  ·  크림화이트  #F7F5F2  ─  카드 · 패널
Level 0  ·  웜 샌드     #E0DAD2  ─  페이지 배경
```

노이즈 텍스처 오버레이(`opacity: 0.035`)를 페이지 배경에 깔면 빈티지 종이 질감이 납니다. SVG `feTurbulence` 필터로 구현하며, 실제 이미지 파일은 사용하지 않습니다.


## Shapes

> *角を丸くする — 모서리를 둥글게 한다.*
> 너무 날카롭지도, 너무 부드럽지도 않게.

새것처럼 보이는 큰 radius는 이 시스템과 어울리지 않습니다. 적당히 다듬어진 모서리가 킷사텐의 낡은 가구와 닮아 있습니다.

| 이름 | 값 | 쓰임 |
|------|----|------|
| xs | 4px | 인라인 소형 요소 |
| sm | 8px | 버튼 · 인풋 · 알림 · 토스트 |
| md | 12px | 카드 · 패널 · 드롭다운 |
| lg | 16px | 모달 · 대형 카드 |
| full | 9999px | 배지 · 태그 · 필 버튼 |

직선(`none`)은 테이블 셀과 코드 블록에만 씁니다.


## Components

### 動作 · Button — 행동을 요청합니다

버튼은 사용자에게 무언가를 부탁하는 목소리입니다. 조용하되 분명하게.

`button-primary`는 靑石(info-500) 배경에 `label-mono` 텍스트. 인터랙션의 기본 목소리입니다. `button-secondary`는 투명 배경에 가장 짙은 회색 — 컨트라스트 16.21:1, WCAG AAA 통과. `button-danger`는 紅茶(danger-500). 삭제·취소처럼 되돌릴 수 없는 행동에만 씁니다.

> ⚠ Primary · Danger 버튼은 AA Large 충족 조건(Bold 14px 이상)을 반드시 준수합니다.

### 標識 · Badge — 상태를 조용히 말합니다

작은 라벨 하나가 많은 것을 전달합니다. 5가지 시맨틱 변형 모두 WCAG AA 이상. `rounded-full`로 부드럽게 감쌉니다. 배지는 소리치지 않습니다.

### 伝言 · Alert — 인라인 메시지

인라인 알림 박스. 배경 100단계 + 텍스트 700–800단계 조합. 보더는 해당 팔레트의 400단계로 은은하게 경계를 만듭니다. 알림은 문을 두드리는 것이지, 부수는 것이 아닙니다.

### 記入 · Input — 사용자의 글쓰기 공간

기본 보더 `gray-400`, 포커스 `info-500`, 에러 `danger-500`. 상태 변화를 보더 색 하나로 전달합니다. 레이블은 `gray-600`, 에러 헬퍼 텍스트는 `danger-700`. 인풋은 사용자를 환영해야 합니다.

### 瞬報 · Toast — 찰나의 메시지

잠깐 나타났다 사라집니다. 어두운 배경(800단계) + 밝은 텍스트(100단계). 4가지 변형 모두 컨트라스트 9.0:1 이상. 찰나의 메시지는 또렷해야 합니다. 놓치면 그만이기 때문에.


## Do's and Don'ts

### ✅ 이렇게 하세요

- 컴포넌트에는 **Molecule 토큰만** 참조합니다. 레이어를 건너뛰지 않습니다.
- 새 컴포넌트 색이 필요하면 **Semantic 토큰을 먼저 정의**하고, Molecule에서 alias로 참조합니다.
- 다크 모드는 **Primitive 모드 전환만**으로 구현합니다. Semantic · Molecule은 그대로입니다.
- 버튼 텍스트는 반드시 `label-mono`(DM Mono, weight 500, 12px+)를 사용합니다.
- 보더는 `0.5px solid`가 기본입니다. 얇게.
- 깊이는 배경색 레이어링으로 표현합니다. `box-shadow`는 없습니다.
- 텍스트는 `gray-600` 이상(어두운 단계)을 씁니다.
- **불완전함을 두려워하지 않습니다.** 이 시스템은 새것보다 낡은 것에 가깝습니다. 약간의 비틀림이 온도를 만듭니다.

### ❌ 하지 마세요

- 컴포넌트에서 **Primitive 토큰을 직접 참조**하지 않습니다. `info-500`이 아닌 `{components.button-primary.backgroundColor}`.
- **hex 코드를 하드코딩**하지 않습니다. 토큰이 있는 이유가 있습니다.
- `warning-500`(`#E8924A`)을 **텍스트 색**으로 쓰지 않습니다. 배경 전용입니다.
- `brand-accent`(`#E8924A`)를 크림 배경 위 **텍스트**로 쓰지 않습니다. 컨트라스트 2.07:1.
- `button-primary` · `button-danger`를 **Bold 14px 미만** 텍스트에 쓰지 않습니다.
- `box-shadow`, `backdrop-filter: blur`를 남용하지 않습니다.
- 색을 너무 많이 쓰지 않습니다. **킷사텐의 메뉴판은 단출합니다.**
- Semantic을 건너뛰고 **Primitive → Molecule 직접 연결**하지 않습니다.
- 너무 깨끗하게, 너무 완벽하게 만들려 하지 않습니다. **이 시스템의 온도는 약간의 불완전함에서 옵니다.**
