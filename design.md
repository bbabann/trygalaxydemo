# Design Guide — Try Galaxy Demo

shadcn/ui의 디자인 원칙(중립적인 컬러, 얇은 보더, 절제된 radius/shadow)을 참고한 화이트 테마 가이드입니다.
새 체험 페이지나 컴포넌트를 추가할 때 이 문서의 토큰/규칙을 따라주세요.

## 금지 사항

- **그라데이션 사용 금지** — 배경, 버튼, 텍스트 등 어디에도 사용하지 않습니다. 단색(solid color)만 사용합니다.
  - 예외: `experiences/exp1.html`(My FanCam)의 분석/인물선택/렌더링 화면(`.ai-screen`, `assets/css/fancam.css`)은 Figma 레퍼런스(구글 포토 "Magic Editor" 류 AI 처리 화면)를 충실히 재현하기 위해 사용자 승인 하에 그라데이션을 예외적으로 허용했습니다. 다른 화면/체험에는 이 예외를 확장하지 마세요.
  - 예외: `experiences/exp3.html`(Privacy Display)의 홈스크린 목업 배경(`.privacy-screen`, `assets/css/privacydisplay.css`)도 Figma 레퍼런스의 보라색 월페이퍼를 재현하기 위해 동일한 사유로 그라데이션을 예외적으로 허용했습니다. 실제 앱 아이콘/로고는 상표 문제를 피하려 일반적인 자리표시자 아이콘으로 대체했습니다.
- **이모지 사용 금지** — 아이콘이 필요하면 SVG 아이콘(예: lucide-icons)을 사용합니다.
- 폰트는 **Pretendard**로 통일합니다. 다른 폰트를 섞지 않습니다.

## 재사용 후보 컴포넌트

- **Video HUD** — `experiences/exp1.html`(My FanCam)의 촬영 화면(`.camera-screen` 및 하위 요소, `assets/css/fancam.css`)에서 만든 네이티브 카메라 앱 스타일 HUD(상단 닫기/인디케이터, 하단 줌/그리드/셔터/모드탭).
- **Camera HUD** — `experiences/exp2.html`(Palm Selfie)의 후면 카메라 Photo 모드 화면(`.photo-hud#screen-camera`, `assets/css/palmselfie.css`).
- **Selfie HUD** — 같은 체험의 전면 카메라 Photo 모드 화면(`.photo-hud#screen-selfie`). Camera HUD와 레이아웃은 거의 동일하고, 상단 인디케이터 아이콘 개수(해상도 표시 유무)와 줌열 콘텐츠(줌 배지 vs 그룹/개인 셀피 토글 + 더보기 버튼)만 다릅니다.
- 세 HUD 모두 지금은 체험별 CSS 파일에 각각 구현되어 있습니다. 카메라/셀피 UI를 쓰는 체험이 하나 더 생기면 공용 라이브러리(`camera-kit` 등)로 분리하는 걸 고려하세요.
- **Gallery UI** — Android 갤러리 뷰어 스타일의 결과 화면(`.gallery-screen`)이 `exp1.html`(영상)과 `exp2.html`(사진, `#screen-gallery`)에서 거의 동일한 구조로 2번 쓰였습니다. 다음에 한 번 더 쓰이면 공용 컴포넌트로 분리하기 좋은 1순위 후보입니다.
- **AR 오버레이 좌표 매핑** — `exp5.html`(AR Try-On)의 `mapPoint()`/`drawPlacedImage()`(정규화 랜드마크 좌표 → 거울모드 object-fit:cover 캔버스 좌표 변환, 중심점·회전·스케일을 적용해 이미지를 올리는 로직)는 손/얼굴 랜드마크를 추적하는 다른 체험에서도 그대로 재사용 가능합니다. 실제 제품 이미지로 교체할 때도 이 좌표 변환 로직은 그대로 두고 `IMAGES`/앵커 랜드마크 인덱스만 바꾸면 됩니다.

## 컬러 토큰 (CSS 변수, `assets/css/style.css` 기준)

| 변수 | 값 | 용도 |
|---|---|---|
| `--background` | `#ffffff` | 페이지 배경 |
| `--foreground` | `#0a0a0a` | 기본 텍스트 |
| `--muted` | `#f5f5f5` | 보조 배경 (옅은 섹션 구분 등) |
| `--muted-foreground` | `#737373` | 보조 텍스트 (설명, 캡션) |
| `--card` | `#ffffff` | 카드 배경 |
| `--card-foreground` | `#0a0a0a` | 카드 내 텍스트 |
| `--border` | `#e5e5e5` | 기본 보더 |
| `--ring` | `#0a0a0a` | 포커스/호버 강조 보더 |

새 컬러가 필요하면 그레이 스케일(`#f5f5f5` ~ `#0a0a0a`) 범위 안에서 톤만 조절하고, 강조색이 꼭 필요하면 무채색에 가까운 톤 하나만 추가로 정의합니다.

## 타이포그래피

- 폰트 패밀리: `"Pretendard", "Apple SD Gothic Neo", -apple-system, sans-serif`
- 제목(h1): 28px / font-weight 600
- 카드 제목(h2): 16px / font-weight 600
- 본문/설명: 14px / `--muted-foreground`
- 폰트 두께는 400(본문) / 600(제목) 두 단계만 사용

## 레이아웃 — 모바일 아일랜드

- 기본 캔버스는 **360px × 780px** (모바일 뷰) 기준으로 디자인합니다.
- 모든 페이지는 `<body>` 바로 아래 `.app-frame` 래퍼로 감쌉니다 (`max-width: 360px`, `min-height: 780px`).
- `body` 배경은 `--muted`, `.app-frame` 배경은 `--background`(흰색)로 분리합니다.
- 400px 이하(실제 모바일 디바이스)에서는 `.app-frame`이 보더/그림자 없이 화면을 꽉 채웁니다.
- 400px 초과(데스크탑)에서는 `.app-frame`이 화면 중앙에 고정 크기로 떠서 "아일랜드" 형태가 되며, 얇은 보더 + 옅은 그림자로 경계를 표시합니다.
- 새 페이지를 추가할 때도 반드시 콘텐츠를 `.app-frame`으로 감싸야 합니다.

## 간격

- 카드 사이 간격(gap): 16px
- 카드 내부 padding: 24px
- 섹션 padding: 24px (프레임 내부 기준)

## Radius & Shadow

- `--radius: 10px` — 카드, 버튼, 링크 버튼 등 모든 모서리에 동일하게 적용
- 그림자는 호버 상태에서만, 아주 옅게: `0 1px 3px rgba(0, 0, 0, 0.08)`
- 평상시에는 그림자 없이 `1px solid var(--border)` 보더로만 구분

## 컴포넌트 규칙

### 카드 (`.card`)
- 배경 `--card`, 보더 `1px solid --border`, radius `--radius`
- 호버 시: 보더 색 `--ring`으로 변경 + 옅은 shadow 추가 (transform/scale 등 움직임 효과는 사용하지 않음)
- 아이콘/이모지 없이 제목 + 설명 텍스트만 구성

### 버튼 / 링크 버튼 (`.back-link` 등)
- 보더 `1px solid --border`, radius `--radius`, padding `8px 16px`
- 호버 시 보더 색만 `--ring`으로 변경 (배경색 변화 없음)

## 새 체험 페이지 추가 시 체크리스트

1. `experiences/expN.html` 생성 — Pretendard CDN 링크 + `../assets/css/style.css` 링크 포함
2. `assets/js/experiences.js`의 `EXPERIENCES` 배열에 항목 추가 (title, description, link만 — icon 필드 없음)
3. 그라데이션/이모지 사용 여부 재확인
4. 컬러는 위 토큰 표 범위 내에서만 사용
