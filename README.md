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

컴포넌트를 건드릴 필요 없이 `src/content/` 안의 파일 4개만 수정하면 사이트 전체가 바뀝니다.

| 파일 | 무엇을 담나 |
|---|---|
| `src/content/site.ts` | 이름, 직무, 히어로 문구, 이메일, 블로그·GitHub 주소 |
| `src/content/projects.ts` | 프로젝트 — 문제 / 접근 / 결과 / 관련 글 |
| `src/content/skills.ts` | 기술 스택 뱃지 (그룹 · 숙련도 · 근거 한 줄) |
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

## 구조

```
src/
├─ app/
│  ├─ layout.tsx        메타데이터 · 폰트
│  ├─ page.tsx          섹션 조립
│  └─ globals.css       디자인 토큰 (@theme) · 유틸리티
├─ components/
│  ├─ layout/           GlobalNav · SubNav · Footer
│  ├─ sections/         Hero · Projects · Skills · Til · Contact
│  └─ ui/               Button · SkillBadge · SectionHeading · Reveal
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

배포 후 `src/content/site.ts`의 `siteUrl`을 실제 주소로 바꿔주세요. (OG 메타태그에 사용됩니다)
