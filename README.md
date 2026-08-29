# 기술 소개서 (Technical Introduction)

Next.js 16 · TypeScript · Tailwind CSS v4 로 만든 게임 클라이언트 개발자 기술 소개서 사이트.
디자인 시스템은 `DESIGN-apple.md` 분석 문서를 토큰으로 옮긴 것입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # out/ 폴더로 정적 내보내기
npm run lint
```

## 콘텐츠 수정 — 여기만 고치면 됩니다

컴포넌트를 건드릴 필요 없이 `src/content/` 안의 파일 3개만 수정하면 사이트 전체가 바뀝니다.

| 파일 | 무엇을 담나 |
|---|---|
| `src/content/site.ts` | 이름, 직무, 히어로 문구, 이메일, 블로그·GitHub 주소 |
| `src/content/projects.ts` | 프로젝트 — 문제 / 접근 / 결과 / 관련 글 / 상세 페이지 |
| `src/content/til.ts` | 학습 기록 — **자동 생성**, 아래 참고 |

## 학습 기록 동기화

TIL 목록은 손으로 관리하지 않습니다.
[BaseStudyNote](https://github.com/Geniedevice/BaseStudyNote) 저장소의 마크다운 노트를 읽어
`src/content/til.generated.ts`를 다시 만듭니다.

```bash
npm run sync:til
```

노트에 글을 추가한 뒤 이 명령만 돌리면 사이트가 따라옵니다. 동기화 대상은 5개 시리즈입니다.

| 시리즈 | 원본 노트 |
|---|---|
| GAS 탐구 | `Unreal/GAS/GasStudyNote.md` |
| UI 탐구 | `Unreal/UI/UIStudyNote.md` |
| CS · Unreal 심화 | `Unreal/Study/StudyNote.md` |
| 과제 구현 | `Assignment/Assignment.md` |
| 알고리즘 문제풀이 | `C++/Problem Solving.md` |

시리즈를 추가·수정하려면 `scripts/sync-til.mjs` 상단의 `SERIES` 배열만 고치면 됩니다.
중복 링크는 주소 기준으로 자동 제거되고, 제목 끝 글자가 중복된 오타(`이해해` → `이해`)도 정리됩니다.

> `til.generated.ts`는 직접 수정하지 마세요. 다음 동기화 때 덮어써집니다.

### 프로젝트 ↔ TIL 연결

생성된 글은 `gas-15`, `cs-37` 같은 `id`를 갖습니다.
프로젝트에서 그 `id`를 `relatedPosts`에 적으면,
프로젝트 타일 하단 **"이 판단의 근거"** 영역에 해당 글이 자동으로 링크됩니다.

```ts
// projects.ts
relatedPosts: ["gas-15", "gas-17"]   // 총알 최적화, 장비 카드 UI 시스템 구현
```

히어로의 지표(기록 편수·푼 문제 수)도 이 데이터에서 계산되므로 따로 고칠 필요가 없습니다.

## 프로젝트 상세 페이지

`projects.ts`의 프로젝트에 `detail` 필드가 있으면 `/projects/{slug}/` 페이지가 자동 생성됩니다.
메인의 프로젝트 타일에도 "자세히 보기" 버튼이 붙고, sitemap에도 추가됩니다.

현재 상세 페이지가 있는 프로젝트: **Gears of Deceit** · **Crawlescape** · **DESTINATION**

### 섹션 두 종류 — 기능 구현과 트러블 슈팅

섹션은 `kind`로 종류를 밝히고, 종류에 따라 쓰는 내용이 다릅니다.

| `kind` | 꼬리표 | 무엇을 쓰나 |
|---|---|---|
| `"feature"` | **기능 구현** | 기능이 무엇을 하고 어떻게 도는지. 핵심만 |
| `"trouble"` | **트러블 슈팅** | 아래 4단계 |

기능 섹션은 `lead`(한 문장) → `body`(두 문단 안쪽) → `table` / `bullets` / `compare`로 끝냅니다.
과정 서술을 넣지 않습니다.

트러블 슈팅(`troubleshooting`)만 추론 과정을 씁니다.

| 순서 | 필드 | 무엇을 쓰나 |
|---|---|---|
| 1 | `problem` | 겉으로 드러난 증상 |
| 2 | `hypotheses` | 세워본 가설들과 검증 결과 — **기각된 것도 남깁니다** |
| 3 | `fix` | 해결방안 |
| 4 | `result` | 무엇이 달라졌나 |
| — | `lesson` | 배운 점 (선택) |

```ts
hypotheses: [
  { text: "감쇠 반경이 너무 넓다", test: "반경을 좁혀서 재현 확인", verdict: "기각" },
  { text: "채널이 위치만 기준이다", test: "벽 너머 조합으로 비교", verdict: "확인" },
]
```

무엇을 지웠는지가 곧 추론 과정이라, 기각된 가설은 취소선으로 함께 보입니다.

규칙처럼 문장으로 늘어놓으면 안 읽히는 것은 `table`로 뺍니다.

```ts
table: {
  caption: "표 아래 한 줄 설명 (선택)",
  headers: ["조건", "속도", "의도"],
  rows: [["전원 완료", "×2.0", "협력의 최대 보상"]],
}
```

### 이미지 채우기

상세 페이지의 이미지 자리(`MediaSlot`)는 `src`가 `null`이면
"여기에 무엇을 넣으면 되는지" 안내 문구가 대신 표시됩니다. 레이아웃은 그대로 잡혀 있으므로
나중에 파일만 넣으면 됩니다.

필요한 이미지 목록과 채우는 방법은 **[docs/media-slots.md](docs/media-slots.md)** 에 있습니다.

> ⚠️ 네이버 블로그 이미지 주소를 그대로 쓰면 핫링크 차단으로 깨집니다.
> 이미지를 내려받아 `public/projects/{slug}/`에 두고 그 경로를 쓰세요.

## 구조

```
src/
├─ app/
│  ├─ layout.tsx        메타데이터 · 폰트
│  ├─ page.tsx          섹션 조립
│  └─ globals.css       디자인 토큰 (@theme) · 유틸리티
├─ components/
│  ├─ layout/           GlobalNav · SubNav · Footer
│  ├─ sections/         Hero · Projects · Til · Contact
│  └─ ui/               Button · Media · SectionHeading · Reveal
├─ content/             ← 콘텐츠는 전부 여기
│  └─ til.generated.ts  자동 생성 (수정 금지)
└─ lib/cn.ts

scripts/sync-til.mjs    학습 노트 → til.generated.ts
```

## 디자인 규칙

`globals.css`의 `@theme` 블록이 유일한 진실 공급원입니다. 하드코딩된 hex를 쓰지 마세요.

- **액센트는 하나뿐** — Action Blue `#0066cc`. 다크 타일 위에서는 Sky Blue `#2997ff`.
- **섹션 구분선은 색이 한다** — 라이트/파치먼트 ↔ near-black 타일 교차. 테두리를 긋지 않습니다.
- **그림자는 시스템 전체에 하나** — `shadow-product`, 이미지 전용. 카드·버튼·텍스트에는 쓰지 않습니다.
- **본문은 17px** — 16px 아님. `--text-body`가 그 값을 들고 있습니다.
- **누르는 상태는 `scale(0.95)`** — `press` 유틸리티로 통일.
- 폰트 굵기 사다리는 300 / 400 / 600 / 700. **500은 쓰지 않습니다.**

## GitHub Pages 배포

`.github/workflows/deploy.yml`이 이미 준비되어 있습니다.

1. GitHub에 저장소를 만들고 푸시합니다.
2. 저장소 → **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 바꿉니다.
3. `main`에 푸시할 때마다 자동으로 빌드·배포됩니다.

`basePath`는 워크플로가 자동으로 처리합니다.

- `<username>.github.io` 저장소 → basePath 없음
- 그 외 저장소 → `/<repo-name>` 이 자동 주입

배포 주소: **https://geniedevice.github.io/Game-Project-Technical-Introduction/**

저장소 이름을 바꾸면 `src/content/site.ts`의 `siteUrl`도 함께 바꿔주세요.
canonical 태그, sitemap, 공유 미리보기 이미지 주소가 전부 이 값에서 나옵니다.

### 공유 미리보기

링크를 카카오톡·트위터 등에 붙였을 때 뜨는 카드는 `src/app/og.png/route.tsx`가 빌드 시 생성합니다.
이름·직무·기록 편수가 자동으로 들어가므로 따로 이미지를 만들 필요가 없습니다.

> Next.js의 `opengraph-image.tsx` 파일 컨벤션을 쓰지 않은 이유가 있습니다.
> 그 방식은 확장자 없는 파일(`/opengraph-image`)로 내보내는데,
> GitHub Pages는 확장자로 Content-Type을 판단하기 때문에 `image/png`로 응답하지 않아
> 미리보기가 깨집니다. `robots.txt`·`sitemap.xml`과 같은 라우트 방식으로 `/og.png`를 만듭니다.

함께 생성되는 것: `robots.txt`, `sitemap.xml`, canonical 태그.
