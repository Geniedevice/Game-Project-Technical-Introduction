/**
 * 프로젝트.
 *
 * 내용은 실제 저장소(README · 기획서 · 커밋 이력)와
 * BaseStudyNote의 학습 기록에서 확인 가능한 사실만 적었습니다.
 *
 * 모든 섹션은 같은 골자로 흐릅니다.
 *   제목(기능 구현 / 트러블 슈팅) → 문제 추론 → 가설 → 해결방안 → 결과
 * 설명은 문장을 늘리지 않고 핵심 키워드로 줄이되,
 * 규칙처럼 문장으로 늘어놓으면 안 읽히는 것은 표(`table`)로 뺐습니다.
 *
 * relatedPosts / posts 는 til.generated.ts의 id를 참조합니다. (근거 링크)
 */
export type ProjectSurface = "dark" | "light" | "parchment";

/** 목록에 쓸 수 있는 아이콘. 새 모양이 필요하면 ProjectIcon.tsx에 추가하세요. */
export type ProjectIconName = "gear" | "terminal" | "nodes" | "network" | "cube";

/**
 * 이미지 자리.
 * `src`가 null이면 사이트에 "여기에 무엇을 넣으면 되는지" 안내가 표시됩니다.
 * public/ 폴더에 파일을 넣고 src만 채우면 바로 반영됩니다. (예: "/projects/god/train.png")
 *
 * ⚠️ 네이버 블로그 이미지 주소를 그대로 넣지 마세요.
 *    핫링크가 차단되어 다른 도메인에서는 깨집니다. 파일을 내려받아 public/에 두세요.
 */
export type MediaSlot = {
  /** 이미지 경로. video가 있으면 재생 전 포스터로 쓰입니다 */
  src: string | null;
  /**
   * 유튜브 영상 ID. 채우면 이 자리가 영상 플레이어로 바뀝니다.
   * 비어 있으면 src 이미지가 그대로 보이므로, 나중에 ID만 넣으면 됩니다.
   * https://youtu.be/AbCdEfG → "AbCdEfG"
   */
  youtubeId?: string | null;
  /**
   * 직접 올린 mp4 경로 (public/ 기준).
   * 저장소가 무거워지므로 짧은 클립에만 쓰세요. 긴 영상은 유튜브를 권합니다.
   */
  video?: string;
  alt: string;
  caption: string;
  /** src가 비었을 때 자리표시자에 뜨는 안내 문구 */
  hint: string;
  aspect?: "16/9" | "4/3" | "1/1";
};

/**
 * 흐름도 한 장.
 *
 * 프로젝트 소개 아래에 "한눈에 보는 흐름"으로 나란히 놓입니다.
 * 도식은 글자가 작아 잘라내면 못 읽으므로 비율 그대로 그리고,
 * 누르면 화면 가득 확대됩니다. (FlowDiagrams.tsx)
 */
export type FlowDiagram = {
  /** 카드 제목 — 예: "워크플로우" */
  title: string;
  src: string;
  alt: string;
  /** 그림 아래 한 줄 설명 */
  caption: string;
};

/**
 * 섹션 종류.
 * 제목만 봐도 "기능을 만든 이야기"인지 "고장을 고친 이야기"인지,
 * 아니면 "만들고 나서 돌아본 이야기"인지 알 수 있게 합니다.
 */
export type SectionKind = "feature" | "trouble" | "retro";

/**
 * 적용 전 · 후 비교.
 * 화면에는 **왼쪽이 적용 전, 오른쪽이 적용 후**로 놓입니다.
 * 읽는 순서와 같게 두어 무엇이 달라졌는지 바로 보이게 합니다.
 */
export type DetailCompare = {
  /** 무엇을 비교하는지 한 줄 */
  title: string;
  /** 왼쪽 — 적용 전 */
  before: MediaSlot;
  /** 오른쪽 — 적용 후 */
  after: MediaSlot;
};

/** 가시성을 위한 표. 문장으로 늘어놓으면 안 읽히는 규칙을 담습니다. */
export type DetailTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type DetailSection = {
  id: string;
  /** 기능 구현 / 트러블 슈팅 — 제목 옆에 꼬리표로 붙습니다 */
  kind: SectionKind;
  eyebrow: string;
  title: string;
  /** 한 문장 요약 */
  lead: string;
  /** 기능이 무엇을 하고 어떻게 도는지. 핵심만 두 문단 안쪽으로 */
  body?: string[];
  /** 규칙 · 비교를 표로 */
  table?: DetailTable;
  /** 적용 전 · 후 비교 (왼쪽 = 적용 전, 오른쪽 = 적용 후) */
  compare?: DetailCompare;
  /** 제목 바로 아래에 위에서 아래로 놓이는 미디어. 영상을 먼저 보여줄 때 씁니다 */
  headerMedia?: MediaSlot[];
  /**
   * media 를 어디에 놓을지. 기본은 섹션 맨 아래.
   * "top" 이면 제목 바로 아래로 올라가되 좌우 배치는 그대로 유지됩니다.
   */
  mediaPosition?: "top" | "bottom";
  /** 구현 항목 */
  bullets?: { label: string; text: string }[];
  media?: MediaSlot[];
  /** 학습 노트에는 없는 블로그 글 직접 링크 */
  blogPosts?: { title: string; url: string }[];
};

/**
 * 세워본 가설 하나와 그 검증 결과.
 * 기각된 가설도 남깁니다 — 무엇을 지웠는지가 곧 추론 과정이라서요.
 */
export type Hypothesis = {
  /** 원인을 무엇이라고 봤는가 */
  text: string;
  /** 어떻게 확인했는가 */
  test: string;
  /** 검증 결과 */
  verdict: "확인" | "기각";
};

/**
 * 트러블 슈팅.
 * 문제 → 가설 검증 → 해결방안 → 결과 순서로 읽힙니다.
 * 4단계 흐름은 여기에만 씁니다. 기능 섹션은 기능 설명만 합니다.
 */
export type Troubleshoot = {
  title: string;
  /** 문제 — 겉으로 드러난 증상 */
  problem: string;
  /** 세운 가설들과 검증 결과 */
  hypotheses: Hypothesis[];
  /** 해결방안 */
  fix: string;
  /** 결과 */
  result?: string;
  lesson?: string;
  /** 본인이 직접 해결한 것인지 (팀원 해결과 구분) */
  mine: boolean;
  /** 과정을 기록한 블로그 글 */
  postUrl?: string;
};

/**
 * 개요의 정보 블록.
 * 게임 정보 · 기간/팀 규모 · 개발 환경을 한 덩어리로 뭉쳐두면 읽히지 않아
 * 제목을 단 블록으로 나눠서 그립니다.
 */
export type FactGroup = {
  /** 블록 제목 — 예: "개발 환경" */
  title: string;
  items: { label: string; value: string }[];
};

export type ProjectDetail = {
  /** 상세 페이지 상단 요약 — "프로젝트 소개" */
  overview: string[];
  /** 게임 정보 · 기간/팀 규모 · 개발 환경 */
  factGroups: FactGroup[];
  /** 담당 영역 — 팀 성과와 구분하기 위한 목록 */
  myScope: { title: string; text: string }[];
  keyArt: MediaSlot;
  /** 프로젝트 소개 제목 바로 아래에 놓이는 영상 */
  overviewVideo?: MediaSlot;
  /** 소개 글 아래에 놓이는 이미지 · 영상 */
  overviewMedia?: MediaSlot[];
  /** 소개 아래에 놓이는 흐름도 — 워크플로우 · 게임 플로우 */
  flows?: FlowDiagram[];
  /** 유튜브 영상 id. 있으면 상세 페이지에 임베드됩니다 */
  youtubeId?: string | null;
  /** 유튜브가 아닌 곳(네이버 등)에 올린 시연 영상. 버튼으로 연결됩니다 */
  demoVideoUrl?: string | null;
  sections: DetailSection[];
  troubleshooting: Troubleshoot[];
  /** 팀 규모와 본인 위치를 명시 */
  teamNote: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /**
   * 목록에 쓰는 배너 이미지 (public/ 기준, 16:9 권장).
   * 게임 프로젝트는 대표 아트를 넣고, 없으면 icon으로 그려집니다.
   */
  banner?: string;
  /** banner가 없을 때 쓰이는 선 아이콘 (src/components/project/ProjectIcon.tsx) */
  icon: ProjectIconName;
  /** 아이콘 아래에 붙는 짧은 꼬리표. 한 줄을 넘기지 마세요 */
  label: string;
  period: string;
  role: string;
  teamSize: string;
  stack: string[];
  problem: string;
  approach: string[];
  results: { label: string; value: string }[];
  relatedPosts: string[];
  links?: { label: string; href: string }[];
  surface: ProjectSurface;
  /** 있으면 /projects/{slug} 상세 페이지가 생성됩니다 */
  detail?: ProjectDetail;
};

const GOD_REPO = "https://github.com/NBcampUnrealTrack/8th-Team4-CH4-Project";

/** 블로그 글 주소 — EmberRoad 섹션에서 여러 번 쓴다 */
const blog = (id: string) => `https://blog.naver.com/startblack7/${id}`;

export const projects: Project[] = [
  {
    slug: "emberroad",
    title: "EmberRoad",
    tagline: "모닥불에 둘러앉은 4~7인, 확률 판정 카드로 싸우는 마피아 게임",
    banner: "/projects/emberroad/title.webp",
    icon: "cube",
    label: "Unreal · 팀 9인",
    period: "2026.07 – 2026.10",
    role: "카드 연출 · 시퀀스 · 렌더링 / 라이팅",
    teamSize: "9인 팀",
    stack: ["Unreal Engine 5.8", "C++", "GAS", "CommonUI", "Chaos Destruction"],
    problem:
      "카드가 11종이고 판정이 4단계라, 연출을 카드마다 만들면 44가지를 손으로 그려야 했습니다. 거기에 멀티플레이라 인트로 · 엔딩 연출이 클라마다 어긋나면 같은 판을 다르게 보게 됩니다.",
    approach: [
      "카드 연출 — 카드 효과 목록을 그대로 연출 프리미티브 조합으로 재사용",
      "카드 위젯 — Input · Motion · FX 모듈로 나눈 상태 기계, 머티리얼 글로우 · 디졸브",
      "시퀀스 — 서버 GameState 가 단계를 복제, 영상은 각 클라가 로컬 재생",
      "렌더링 — 실사 전제 설정을 걷어내고 노을 3레이어 라이팅, Chaos 붕괴 엔딩",
    ],
    results: [
      { label: "카드 연출", value: "카드별 에셋 없이 효과 조합으로" },
      { label: "시퀀스", value: "늦게 들어와도 같은 단계" },
      { label: "엔딩", value: "진영별 3종 · 붕괴 시뮬레이션" },
    ],
    relatedPosts: ["unreal-36", "unreal-37", "unreal-45", "unreal-50", "unreal-49", "unreal-48"],
    surface: "dark",

    detail: {
      overview: [],
      factGroups: [
        {
          title: "게임 정보",
          items: [
            { label: "장르", value: "TRPG 스타일 마피아 카드 게임" },
            { label: "인원", value: "PvP 4~7인 · PvE 싱글" },
            { label: "기반", value: "보드게임 《뱅!》 + 확률 판정" },
          ],
        },
        {
          title: "기간 · 팀 규모",
          items: [
            { label: "개발 기간", value: "2026.07 – 2026.10" },
            { label: "팀 구성", value: "9명" },
            { label: "담당 업무", value: "카드 연출 · 시퀀스 · 렌더링 / 라이팅" },
          ],
        },
        {
          title: "개발 환경",
          items: [
            { label: "게임 엔진", value: "Unreal Engine 5.8" },
            { label: "IDE", value: "Visual Studio 2022" },
            { label: "프로그래밍 언어", value: "C++ / Blueprint" },
            { label: "플랫폼", value: "PC (Steam)" },
          ],
        },
      ],
      teamNote:
        "9인 팀 프로젝트입니다. 아래는 커밋 이력으로 확인 가능한 본인 작업이며, 규칙 · 판정 서버 로직, PvE AI, 사운드, 캐릭터 애니메이션, HUD 대부분은 팀원들이 담당했습니다.",

      myScope: [
        {
          title: "카드 연출",
          text: "카드 위젯 상태 기계(등장 · 호버 · 사용 · 퇴장), 손패 레이아웃, 효과 조합 연출, 판정 게이지",
        },
        {
          title: "머티리얼",
          text: "카드 테두리 글로우 · 디졸브 머티리얼과 머티리얼 함수, 생성 스크립트",
        },
        {
          title: "시퀀스",
          text: "인트로 4단계 · 진영별 엔딩 시퀀스, 연출 디렉터, Chaos Destruction 성 붕괴",
        },
        {
          title: "렌더링 · 레벨",
          text: "로우폴리 라이팅 · 렌더링 설정, 캠프파이어 조명, 성 맵, 타이틀 화면, 그래픽 옵션",
        },
      ],

      flows: [
        {
          title: "카드 한 장의 생애",
          src: "/projects/emberroad/flow-card.png",
          alt: "카드가 손패에 들어와 사용되고 사라지기까지의 상태 흐름도",
          caption: "Pending → Dealing → Idle → Presenting → Dwelling → Exiting, 사용 단계에서 글로우 · 디졸브",
        },
        {
          title: "인트로 흐름",
          src: "/projects/emberroad/flow-intro.png",
          alt: "야영지 진입부터 첫 턴 안내까지 인트로 4단계 흐름도",
          caption: "야영지 진입 → 내 역할 → 용사 공개 → 첫 턴, 서버 타이머 하나가 단계를 넘긴다",
        },
      ],
      keyArt: {
        src: "/projects/emberroad/title.webp",
        alt: "EmberRoad 타이틀 화면 — 노을 진 성과 모닥불",
        caption: "타이틀 화면 — 노을 진 성 앞의 야영지에서 판이 벌어진다",
        hint: "게임 대표 컷",
        aspect: "16/9",
      },
      overviewVideo: {
        video: "/projects/emberroad/card-play.mp4",
        src: "/projects/emberroad/card-play.jpg",
        alt: "카드 플레이 영상",
        caption: "한 턴의 카드 플레이 — 손패에서 골라 내고, 판정을 받고, 효과가 나간다",
        hint: "플레이 영상",
        aspect: "16/9",
      },
      overviewMedia: [
        {
          src: "/projects/emberroad/hand.jpg",
          alt: "모닥불 앞에 부채꼴로 펼쳐진 손패",
          caption: "모닥불 앞에 펼친 손패 — 카드마다 대실패 · 실패 · 성공 · 대성공 확률이 붙는다",
          hint: "인게임 손패",
          aspect: "16/9",
        },
      ],
      youtubeId: null,

      sections: [
        {
          id: "card-fx",
          kind: "feature",
          eyebrow: "01 · 카드 연출",
          title: "효과 목록을 그대로 쓰는 조합형 카드 연출",
          lead: "카드 효과 데이터가 곧 연출 조합이 되게 해, 카드를 추가해도 연출을 따로 만들지 않습니다.",
          body: [
            "카드는 판정 등급마다 효과 목록(뽑기 1 · 피해 1 · 한도 회복 1 …)을 들고 있습니다. 서버는 이 목록대로 효과를 실행하고, 클라는 같은 목록에서 Op만 남겨 연출 프리미티브를 차례로 재생합니다.",
            "연출 전용 데이터 테이블은 만들지 않았습니다. 같은 사실이 두 곳에 적히면 카드에서 피해를 뺐는데 공격 연출이 계속 나가는 식으로 반드시 어긋나기 때문입니다.",
          ],
          table: {
            caption: "분기 수가 아니라 정보를 버리는지가 갈랐습니다.",
            headers: ["방식", "분기", "문제"],
            rows: [
              ["카드 ID로 Switch", "카드 수만큼", "카드 추가마다 그래프 수정, 빠뜨리면 조용히 연출 없음"],
              ["대표 성격 하나로 Switch", "7개", "속공(뽑기 + 피해 + 회복)이 피해 하나로 뭉개짐"],
              ["효과 목록을 순서대로 재생", "프리미티브 수만큼 고정", "새 카드는 효과만 적으면 연출이 따라옴"],
            ],
          },
          media: [
            {
              src: "/projects/emberroad/card-bp.png",
              alt: "카드 위젯 블루프린트의 연출 이벤트 노드",
              caption: "위젯 BP — 등장 · 사용 · 판정 이벤트가 문맥(등급 · 효과 단계)을 받아 재생만 한다",
              hint: "카드 위젯 BP",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            { title: "Primitive 조합을 통한 연출 구현", url: blog("224369187359") },
            { title: "카드 이벤트(상호작용)", url: blog("224415309629") },
          ],
        },
        {
          id: "card-widget",
          kind: "feature",
          eyebrow: "02 · 카드 위젯",
          title: "모듈로 나눈 카드 위젯 상태 기계",
          lead: "한 파일에 쌓이던 연출을 성격별 모듈로 나눴습니다.",
          headerMedia: [
            {
              video: "/projects/emberroad/card-hover.mp4",
              src: "/projects/emberroad/card-hover.jpg",
              alt: "카드 호버 영상",
              caption: "커서를 올리면 카드가 들리고 이웃이 밀려난다 — 기울기는 커서 위치를 따른다",
              hint: "카드 호버 영상",
              aspect: "16/9",
            },
            {
              video: "/projects/emberroad/card-fly.mp4",
              src: "/projects/emberroad/card-fly.jpg",
              alt: "카드 비행 영상",
              caption: "드로우한 카드가 덱에서 손패 자리로 날아든다",
              hint: "카드 비행 영상",
              aspect: "16/9",
            },
            {
              src: "/projects/emberroad/card-modules.png",
              alt: "카드 위젯과 손패 위젯을 이루는 모듈 구성도",
              caption: "한 클래스, 여러 모듈 — 공통 계산은 MotionMath · Internal 로 빼서 가져다 쓴다",
              hint: "모듈 구성도",
              aspect: "16/9",
            },
          ],
          body: [
            "카드는 날아오고, 커서에 반응하고, 판정에 번쩍이고, 타서 사라집니다. 클래스를 쪼개지 않고 파일만 나눈 이유는 이 연출들이 위치 · 크기 · 각도라는 같은 상태를 공유하기 때문입니다.",
            "입력은 상태만 기록하고, 무엇을 그릴지는 Tick이 정합니다. 호버 여부는 IsHoverActive() 한 함수만 보게 해, 커서를 움직이지 않아도 풀려야 하는 경우(턴 종료 · 잠금)를 놓치지 않습니다.",
          ],
          table: {
            headers: ["모듈", "하는 일"],
            rows: [
              ["Input", "슬레이트 입력을 상태로 옮긴다"],
              ["Motion", "위치 · 크기 · 각도를 갱신하는 상태 기계"],
              ["FX", "머티리얼 파라미터 구동"],
              ["MotionMath", "오버슈트 · 진행도 같은 순수 계산"],
              ["Layout / Play", "손패의 자리 계산 / 카드 사용 흐름"],
            ],
          },
          media: [
            {
              src: "/projects/emberroad/card-hover.png",
              alt: "입력과 연출을 분리한 카드 호버 파이프라인",
              caption: "호버 파이프라인 — 입력 → 단일 판정 → 모션 · 레이아웃 · BP 이벤트",
              hint: "호버 파이프라인",
              aspect: "16/9",
            },
            {
              src: "/projects/emberroad/card-pipeline.png",
              alt: "카드를 드롭했을 때 버리기 · 즉시 사용 · 대상 선택으로 갈리는 분기도",
              caption: "카드 한 장이 거치는 분기 — 드롭 위치와 대상 필요 여부로 갈린다",
              hint: "카드 사용 분기",
              aspect: "16/9",
            },
          ],
          blogPosts: [{ title: "카드 연출 모듈화", url: blog("224434348874") }],
        },
        {
          id: "card-material",
          kind: "feature",
          eyebrow: "03 · 머티리얼",
          title: "위젯 애니메이션이 흔드는 판정 글로우 · 퇴장 디졸브",
          lead: "곡선은 시퀀서가 그리고, 머티리얼은 0~1 값 하나만 받습니다.",
          headerMedia: [
            {
              video: "/projects/emberroad/dissolve-attack.mp4",
              src: "/projects/emberroad/dissolve-attack.jpg",
              alt: "공격 카드 디졸브 영상",
              caption: "공격 카드 퇴장 — 뒤로 갈수록 빠르게 타며 잔불이 흩날린다",
              hint: "공격 카드 디졸브 영상",
              aspect: "16/9",
            },
            {
              video: "/projects/emberroad/dissolve-heal.mp4",
              src: "/projects/emberroad/dissolve-heal.jpg",
              alt: "회복 카드 디졸브 영상",
              caption: "회복 카드 퇴장 — 같은 머티리얼, 잔불 없이 고르게 사라진다",
              hint: "회복 카드 디졸브 영상",
              aspect: "16/9",
            },
          ],
          body: [
            "판정 글로우를 C++ → BP Tick → 위젯 애니메이션 순으로 세 번 옮겼습니다. 기준은 C++이냐 BP냐가 아니라 만드는 사람이 눈으로 보면서 다듬을 수 있는가였습니다.",
            "머티리얼은 평소 세기와 등급별 피크 사이를 BurstAlpha 하나로 보간합니다. 위젯 애니메이션은 그 값을 언제 얼마만큼 줄지만 정하므로, 감쇠 곡선을 숫자가 아니라 커브로 맞춥니다.",
          ],
          table: {
            caption: "세 안 모두 동작은 했습니다. 튜닝할 때의 반복 비용이 달랐습니다.",
            headers: ["안", "값을 고치는 법", "판단"],
            rows: [
              ["C++ 이 파라미터 직접 구동", "코드 수정 → 빌드", "BP에서 손댈 수 없음"],
              ["BP Event Tick + 수식", "숫자 수정 → PIE → 0.45초 관찰", "재생 전엔 볼 수 없음"],
              ["위젯 애니메이션 + 머티리얼", "커브를 보며 바로 수정", "채택"],
            ],
          },
          media: [
            {
              src: "/projects/emberroad/card-glow.png",
              alt: "판정이 확정된 카드의 글로우가 터졌다가 가라앉는 과정",
              caption: "판정 글로우 — 확정 순간 터졌다가 평상시로 잦아든다",
              hint: "판정 글로우",
              aspect: "16/9",
            },
            {
              src: "/projects/emberroad/card-dissolve.png",
              alt: "퇴장 진행도에 따라 카드가 타 들어가는 디졸브",
              caption: "퇴장 디졸브 — 머티리얼은 하나, 공격 · 회복은 진행 곡선만 다르다",
              hint: "퇴장 디졸브",
              aspect: "16/9",
            },
          ],
          blogPosts: [{ title: "카드 연출(Dynamic Material Instance)", url: blog("224370473451") }],
        },
        {
          id: "sequence",
          kind: "feature",
          eyebrow: "04 · 시퀀스",
          title: "서버가 단계를 들고 있는 인트로 · 엔딩 시퀀스",
          lead: "단계만 복제하고 영상은 각 클라가 로컬로 재생합니다.",
          headerMedia: [
            {
              src: "/projects/emberroad/sequence-gamestate.png",
              alt: "GameState 가 단계를 복제해 클라마다 로컬 재생하는 구조",
              caption: "GameState 가 단계를 소유 — 늦게 들어온 클라도 지금 단계부터 따라잡는다",
              hint: "시퀀스 구조",
              aspect: "16/9",
            },
          ],
          table: {
            headers: ["고민", "선택"],
            rows: [
              ["이벤트로 쏠까, 상태로 둘까", "상태 — 늦게 와도 지금 단계를 받는다"],
              ["타이머는 누가", "서버에 하나 — 클라가 각자 세면 어긋난다"],
              ["영상을 복제할까", "단계만 복제, 영상은 각자 로컬 재생"],
              ["시퀀스 목록은 어디에", "맵의 액터 — 그 맵의 성을 찍은 것이라 맵에 속한다"],
              ["무거운 에셋은", "레벨과 함께 로드되는 하드 참조로 연출 시작 시 대기 없음"],
            ],
          },
          media: [
            {
              src: "/projects/emberroad/ending-debug.png",
              alt: "F1 · F2 · F3 로 진영별 엔딩을 바로 보는 디버그 슬롯",
              caption: "진영별 엔딩을 키 하나로 확인 — 서버 · 판 진행 중 · Shipping 제외 조건으로 버그를 만들지 않게",
              hint: "엔딩 디버그",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            { title: "인트로/엔딩 시퀸스", url: blog("224433425791") },
            { title: "타이밍 이슈", url: blog("224367134864") },
          ],
        },
        {
          id: "collapse",
          kind: "feature",
          eyebrow: "05 · 엔딩 연출",
          title: "Chaos Destruction 으로 만든 성 붕괴 엔딩",
          lead: "조각을 손으로 애니메이션하지 않고 시뮬레이션을 캐시로 구워 재생합니다.",
          headerMedia: [
            {
              video: "/projects/emberroad/ending-collapse.mp4",
              src: "/projects/emberroad/ending-collapse.jpg",
              alt: "무법자 승리 엔딩 영상",
              caption: "무너진 왕국 — 무법자 승리. Chaos 캐시로 성이 무너진다",
              hint: "무법자 승리 엔딩 영상",
              aspect: "16/9",
            },
            {
              video: "/projects/emberroad/ending-dawn.mp4",
              src: "/projects/emberroad/ending-dawn.jpg",
              alt: "보안관 승리 엔딩 영상",
              caption: "지켜낸 새벽 — 보안관 승리. 성에 아침이 온다",
              hint: "보안관 승리 엔딩 영상",
              aspect: "16/9",
            },
            {
              video: "/projects/emberroad/ending-throne.mp4",
              src: "/projects/emberroad/ending-throne.jpg",
              alt: "배신자 승리 엔딩 영상",
              caption: "빼앗긴 왕좌 — 배신자 승리. 주인이 바뀐 옥좌",
              hint: "배신자 승리 엔딩 영상",
              aspect: "16/9",
            },
          ],
          body: [
            "무법자 승리 엔딩은 성이 무너지는 장면입니다. 스태틱 메시를 조각내 하나하나 애니메이션하는 대신 Geometry Collection 으로 성을 쪼개고, 앵커가 받치던 조각을 필드로 풀어 무너뜨렸습니다.",
            "6초 분량의 시뮬레이션은 에디터에서 한 번 굽고, 런타임은 그 프레임을 순서대로 읽기만 합니다. 매번 결과가 같아 시퀀스 카메라와 맞출 수 있습니다.",
          ],
          table: {
            headers: ["진영", "엔딩"],
            rows: [
              ["보안관", "지켜낸 새벽 — 성에 아침이 온다"],
              ["무법자", "무너진 왕국 — 성이 붕괴한다"],
              ["배신자", "빼앗긴 왕좌 — 주인이 바뀐다"],
            ],
          },
          media: [
            {
              src: "/projects/emberroad/collapse-structure.png",
              alt: "Geometry Collection · 조각 · 앵커로 이뤄진 성 구조",
              caption: "조각은 떨어지려 하고, 앵커가 붙잡는다 — 이 균형이 서 있는 성이다",
              hint: "붕괴 구조",
              aspect: "16/9",
            },
            {
              src: "/projects/emberroad/collapse-timeline.png",
              alt: "6초 동안 성이 무너지는 단계별 그림",
              caption: "6초가 캐시다 — 균열 → 상부 낙하 → 잔해",
              hint: "붕괴 타임라인",
              aspect: "16/9",
            },
          ],
          blogPosts: [{ title: "붕괴 시뮬레이션 연출", url: blog("224426329189") }],
        },
        {
          id: "lighting",
          kind: "feature",
          eyebrow: "06 · 라이팅",
          title: "로우폴리를 위한 노을 3레이어 라이팅",
          lead: "무엇을 켤까보다 무엇을 끌까를 먼저 정했습니다.",
          compare: {
            title: "실사 프리셋 → Lumen off + 노을 3점 조명",
            before: {
              src: "/projects/emberroad/lighting-before.png",
              alt: "실사 프리셋 그대로인 야영지 그레이박스",
              caption: "실사 프리셋 + 라이팅 미설정",
              hint: "적용 전",
              aspect: "16/9",
            },
            after: {
              src: "/projects/emberroad/lighting-after.png",
              alt: "노을빛 3레이어 라이팅을 적용한 야영지",
              caption: "Lumen off + 노을 3레이어",
              hint: "적용 후",
              aspect: "16/9",
            },
          },
          table: {
            caption: "씬 반경이 10m 남짓이고 라이트가 5개뿐이라 베이크 없이 전부 Movable 로 둬 이터레이션 속도를 지켰습니다.",
            headers: ["레이어", "핵심 값", "이유"],
            rows: [
              ["Directional Light", "2700K · 8 lux · Pitch −20°", "노을은 약하다. 세지면 모닥불이 존재감을 잃는다"],
              ["Sky Light", "Intensity 3.5 · 아래 반구 색 지정", "카메라를 향한 면을 밝히는 유일한 레이어"],
              ["Post Process", "노출 수동 고정 · 그림자 Gain 1.35", "색을 고르기 전에 노출부터 잠근다"],
            ],
          },
          blogPosts: [{ title: "로우폴리 라이팅", url: blog("224391284637") }],
        },
      ],

      troubleshooting: [
        {
          title: "로우폴리 씬이 실사처럼 보이고 외곽선이 안 나오는 문제",
          problem:
            "로우폴리 에셋만 배치했는데 실사 엔진에 로우폴리를 던져 놓은 느낌이 났고, 실루엣은 계단처럼 지글거렸습니다. 대상에 마우스를 올리면 떠야 할 외곽선도 나오지 않았습니다.",
          hypotheses: [
            {
              text: "포스트 프로세스 값이 맞지 않는다",
              test: "포스트는 마감 단계라, 값보다 먼저 프로젝트 렌더링 설정(DefaultEngine.ini)을 확인",
              verdict: "기각",
            },
            {
              text: "파이프라인이 실사 전제로 잡혀 있다",
              test: "고정 카메라 단일 씬에 Lumen · 하드웨어 레이트레이싱 · Substrate · Nanite 가 켜져 있음",
              verdict: "확인",
            },
            {
              text: "외곽선 코드가 스텐실 값을 못 찍는다",
              test: "SetCustomDepthStencilValue 는 정상 — r.CustomDepth=1 이라 읽을 스텐실 버퍼가 없었음",
              verdict: "기각",
            },
          ],
          fix: "Lumen · Substrate · Nanite 를 끄고 반사는 Screen Space 로, 꺼져 있던 AA는 TSR 로, r.CustomDepth 는 스텐실을 포함하는 3 으로 바꿨습니다. 디퍼드 셰이딩이라 적혀 있던 MSAA 4x 는 처음부터 동작하지 않고 있었습니다.",
          result: "실루엣이 깨끗해지고 호버 외곽선이 정상으로 나왔습니다. 톤은 3레이어 라이팅으로 고정할 수 있게 됐습니다.",
          lesson:
            "코드는 멀쩡한데 렌더링 쪽이 0%였습니다. 스타일라이즈드에서 Lumen 을 끄는 건 품질을 낮추는 게 아니라, 물리적으로 맞는 빛 대신 의도한 빛을 고르는 일이었습니다.",
          mine: true,
          postUrl: blog("224391284637"),
        },
        {
          title: "맵의 바닥 · 길 · 잡초가 미세하게 깜빡이는 문제",
          problem: "게임 씬에서 바닥, 길, 잡초 주변이 미세하게 깜빡였습니다. 카메라가 고정이라 작은 떨림도 그대로 눈에 띄었습니다.",
          hypotheses: [
            {
              text: "겹친 표면의 Z-Fighting",
              test: "같은 자리의 중복 길 조각, 너무 가까운 길 · 바닥 표면, 성벽 마감재와 캡의 겹침을 확인",
              verdict: "확인",
            },
            {
              text: "메시 겹침 하나만의 문제다",
              test: "겹침을 정리한 뒤에도 식생 그림자와 광원 하이라이트 주변의 깜빡임이 남음",
              verdict: "기각",
            },
            {
              text: "작은 식생의 그림자 · 거리장 AO 가 떨린다",
              test: "잡초 · 수풀의 Cast Shadow 와 Distance Field Lighting 기여를 끄고 비교",
              verdict: "확인",
            },
            {
              text: "보조 광원의 반사 하이라이트가 반짝인다",
              test: "길 주변 · 모닥불 광원의 Specular Scale 과 Source Radius 를 조정해 비교",
              verdict: "확인",
            },
          ],
          fix: "중복 조각은 숨기고 길 높이를 올려 표면을 분리했습니다. 작은 식생과 바닥의 그림자 · 거리장 기여를 끄고, 보조 광원은 재배치한 뒤 Specular Scale 0.1~0.15 · Source Radius 20cm 로 하이라이트를 눌렀습니다.",
          result: "바닥 · 길 · 식생 주변의 깜빡임이 사라졌습니다.",
          lesson: "깜빡임 하나에 원인이 셋이었습니다. 표면 겹침 · 그림자 · 반사를 나눠 하나씩 끄며 본 것이 원인을 가려냈습니다.",
          mine: true,
          postUrl: blog("224416393147"),
        },
        {
          title: "연출 단계가 클라마다 어긋나는 문제",
          problem:
            "인트로 · 승리 연출을 클라마다 도는 타이머와 일회성 멀티캐스트로 넘기면, 늦게 접속한 사람은 자기 도착 시각부터 다시 세어 뒤처지고, 히치로 콜백이 밀린 클라는 다른 화면에 갇혔습니다.",
          hypotheses: [
            {
              text: "멀티캐스트로 시작을 알리면 된다",
              test: "늦게 들어온 클라 기준으로 확인 — 이미 지나간 멀티캐스트는 받을 수 없음",
              verdict: "기각",
            },
            {
              text: "클라마다 시계를 따로 갖는 것이 원인이다",
              test: "어긋남의 기준점이 각 클라의 도착 시각 · 월드 시간이라는 점을 확인",
              verdict: "확인",
            },
          ],
          fix: "타이머를 서버에 하나만 두고, 단계를 GameState 의 복제 변수(OnRep)로 바꿨습니다. 리슨 서버의 호스트는 자기에게 복제가 오지 않아 OnRep 이 불리지 않으므로, 서버에서 값을 바꿀 때 직접 통지하도록 했습니다.",
          result: "늦게 들어와도 현재 단계부터 받고, 호스트 화면만 연출이 안 뜨는 일이 없어졌습니다.",
          lesson: "피할 것은 타이머가 아니라 클라마다 도는 타이머였습니다. 어긋나도 남과 다른 결과를 보지 않는 것(피격 플래시 · 카메라 셰이크)만 로컬에 둡니다.",
          mine: true,
          postUrl: blog("224367134864"),
        },
      ],
    },
  },
  {
    slug: "gears-of-deceit",
    title: "Gears of Deceit",
    tagline: "달리는 증기기관차 위, 5인 멀티플레이 소셜 디덕션",
    banner: "/projects/gears-of-deceit/key-art.png",
    icon: "gear",
    label: "Unreal · 팀 5인",
    period: "2026.06 – 2026.07",
    role: "네트워크 · 열차 시스템 · 렌더링 / UI",
    teamSize: "5인 팀",
    stack: ["Unreal Engine 5", "C++", "GAS", "Steam OSS", "VOIP"],
    problem:
      "누가 어디서 무슨 말을 했는지가 승패를 가르는 장르입니다. 세션이 불안정하거나 목소리가 엉뚱한 곳까지 들리면 게임 자체가 성립하지 않습니다.",
    approach: [
      "세션 — Steam OSS · AdvancedSessions 로비, BUILD_ID 서명으로 남의 방 차단",
      "보이스 — 거리 감쇠 근접 대화, 비밀방 · 생사 기준 채널 격리",
      "열차 — 스플라인 주행, Movement Base 강제 바인딩으로 탑승 유지",
      "렌더링 — 셀 셰이딩 포스트 프로세스, 뎁스 스텐실 기반 상호작용 표시",
    ],
    results: [
      { label: "멀티플레이", value: "Steam 세션 + 근접 보이스" },
      { label: "열차", value: "스플라인 주행 · 무게 연동 속도" },
      { label: "렌더링", value: "툰 셰이딩 + 외곽선" },
    ],
    relatedPosts: ["cs-30", "cs-33", "cs-22", "cs-25", "ui-01", "cs-37"],
    links: [{ label: "GitHub 저장소", href: GOD_REPO }],
    surface: "dark",

    detail: {
      overview: [],
      factGroups: [
        {
          title: "게임 정보",
          items: [
            { label: "장르", value: "3D 소셜 디덕션 파티 액션" },
            { label: "인원", value: "5인 고정 멀티플레이" },
            { label: "한 판", value: "10분" },
          ],
        },
        {
          title: "기간 · 팀 규모",
          items: [
            { label: "개발 기간", value: "2026.06 – 2026.07" },
            { label: "팀 구성", value: "5명" },
            { label: "담당 업무", value: "네트워크 · 열차 시스템 · 렌더링 / UI" },
          ],
        },
        {
          title: "개발 환경",
          items: [
            { label: "게임 엔진", value: "Unreal Engine 5" },
            { label: "IDE", value: "Visual Studio 2022" },
            { label: "프로그래밍 언어", value: "Blueprint / C++" },
            { label: "플랫폼", value: "PC (Steam)" },
          ],
        },
      ],
      teamNote:
        "5인 팀 프로젝트입니다. 아래 제가 맡은 부분은 커밋 이력으로 확인 가능한 본인 작업이며, 그 밖의 시스템(미니게임 7종, 동물 스킨, 역할별 어빌리티 등)은 팀원들이 담당했습니다.",

      myScope: [
        {
          title: "네트워크",
          text: "Steam OSS · AdvancedSessions 로비 생성/참가, 세션 리팩토링, Shipping 빌드 대응",
        },
        {
          title: "보이스 채팅",
          text: "거리 감쇠 근접 보이스, 비밀방 · 생사 채널 격리, VoiceChannelSubsystem 연동",
        },
        {
          title: "열차 시스템",
          text: "스플라인 주행, 적재 무게 연동 감속, 탑승 유지 · 탈선 방지",
        },
        {
          title: "렌더링 · UI",
          text: "셀 셰이딩 · 외곽선 포스트 프로세스, 뎁스 스텐실 상호작용 표시, 메인 메뉴, HUD 머티리얼",
        },
      ],

      flows: [
        {
          title: "역할 · 능력 구조",
          src: "/projects/gears-of-deceit/flow-gas.png",
          alt: "역할 태그로 데이터 테이블을 찾아 GAS에 능력을 붙이는 구조도",
          caption:
            "역할 태그로 DT 행을 찾아 GameplayEffect · GameplayAbility를 ASC에 붙인다",
        },
        {
          title: "게임 플로우",
          src: "/projects/gears-of-deceit/flow-game.png",
          alt: "접속부터 승패 판정까지의 한 판 흐름도",
          caption:
            "접속 → 로비 → 역할 배정 → 열차 운행 · 퀘스트 · 방해 → 승패 판정 → 로비 복귀",
        },
      ],
      keyArt: {
        src: "/projects/gears-of-deceit/key-art.png",
        alt: "Gears of Deceit 타이틀 아트",
        caption: "달리는 열차 위, 10분간의 심리전",
        hint: "게임 대표 컷",
        aspect: "16/9",
      },
      overviewVideo: {
        // https://youtu.be/d1UV0k-tygk
        youtubeId: "d1UV0k-tygk",
        src: "/projects/gears-of-deceit/patrol-poster.jpg",
        alt: "순찰자 시점 플레이 영상",
        caption: "순찰자 시점 플레이 — 열차 안을 돌며 다른 플레이어와 마주치는 한 판",
        hint: "플레이 영상",
        aspect: "16/9",
      },
      /** 시연 영상은 네이버 자체 플레이어라 외부 임베드가 되지 않아 글로 연결합니다. */
      demoVideoUrl: "https://blog.naver.com/startblack7/224353530954",
      youtubeId: null,

      sections: [
        {
          id: "session",
          kind: "feature",
          eyebrow: "01 · 네트워크",
          title: "Steam OSS 기반 멀티플레이 세션 구현",
          lead: "Steam OnlineSubsystem으로 방 생성 · 검색 · 참가 · 나가기를 구현했습니다.",
          body: [
            "모든 요청을 GameInstance 한 곳이 전담합니다. 메뉴 위젯은 인터페이스로 요청만 보내고 결과는 델리게이트로 돌려받아, UI가 온라인 서브시스템을 직접 다루지 않습니다. 세션을 어떻게 만드는지 바뀌어도 위젯은 손대지 않습니다.",
            "네 요청 모두 비동기라 요청과 결과가 분리됩니다. 요청을 보낸 뒤 완료 델리게이트를 받아 다음 단계로 넘어가고, 화면은 그동안 대기 상태를 유지합니다.",
          ],
          table: {
            caption:
              "PlayerGameInstance + Steam OSS · AdvancedSessions. UI는 메뉴 인터페이스만 알고 OSS를 직접 다루지 않습니다.",
            headers: ["기능", "요청에 싣는 것", "완료 후"],
            rows: [
              [
                "방 생성",
                "최대 인원 · 공개 여부 · 빌드 서명",
                "세션 생성 → 로비 레벨로 ServerTravel",
              ],
              [
                "검색",
                "빌드 서명 · 생성 30분 이내",
                "조건에 맞는 방만 서버 목록에 표시",
              ],
              ["참가", "목록에서 고른 세션", "접속 주소를 받아 ClientTravel"],
              ["나가기", "현재 세션 핸들", "세션 파기 → 메인 메뉴 레벨 로드"],
            ],
          },
          // 왼쪽이 정상 동작, 오른쪽이 필터를 걸기 전의 증상입니다
          mediaPosition: "top",
          media: [
            {
              // https://youtu.be/XhcKvdL2alY
              youtubeId: "XhcKvdL2alY",
              src: null,
              alt: "로비에서 방을 만들고 참가하는 영상",
              caption: "정상 동작 — 방 생성 → 검색 → 참가 → 로비 대기까지의 흐름",
              hint: "로그인 · 방 참가 영상",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/lobby.png",
              alt: "이름이 깨진 외부 방이 서버 목록에 잡힌 화면",
              caption:
                "필터 전 — 우리가 만들지 않은 방이 이름이 깨진 채로 검색된다. 공용 AppID를 함께 쓰던 시절의 증상이다",
              hint: "에러 방 예시",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            {
              title: "Gears of Deceit — Steam OSS 기반 멀티 세션",
              url: "https://blog.naver.com/startblack7/224355773944",
            },
            {
              title: "트러블 슈팅 — 유령 세션",
              url: "https://blog.naver.com/startblack7/224352390229",
            },
          ],
        },
        {
          id: "voice",
          kind: "feature",
          eyebrow: "02 · 보이스",
          title: "거리 감쇠 · 채널 격리 보이스 채팅 구현",
          lead: "거리 감쇠로 목소리가 닿는 범위를 좁혀, 누가 어디 있었는지가 추리 재료가 되게 했습니다.",
          body: [
            "보이스 컴포넌트에 감쇠 설정(SA_Voice)을 물렸습니다. 반경 100 안에서는 원음 그대로 들리고 거리가 멀어질수록 줄어들다 400을 넘으면 들리지 않습니다. 옆 칸 사람의 말은 닿지 않으므로 어디에 있었는지가 곧 알리바이가 됩니다.",
            "여기에 채널 분리를 겹쳤습니다. 비밀방에 들어가면 별도 채널로 옮겨 바깥과 끊고, 사망하면 사망자 채널로 옮깁니다. 상태가 바뀌는 시점마다 채널을 다시 배정합니다.",
          ],
          table: {
            caption:
              "누구에게 들리는가를 코드 분기가 아니라 채널 규칙으로 관리했습니다. 상태가 바뀌는 시점마다 채널을 다시 배정합니다.",
            headers: ["상황", "들리는 대상", "의도"],
            rows: [
              ["같은 칸 · 근접", "반경 100~400 안의 생존자", "알리바이 성립"],
              ["비밀방 내부", "같은 방 인원만", "밀담 보장 · 외부 유출 차단"],
              ["사망", "사망자끼리만", "관전자가 정보를 흘리지 못하게"],
            ],
          },
          headerMedia: [
            {
              // https://youtu.be/JYJum1TzH1E
              youtubeId: "JYJum1TzH1E",
              src: null,
              alt: "근접 보이스 동작을 확인하는 영상",
              caption: "거리에 따라 목소리가 줄고, 채널이 갈리면 아예 들리지 않는다",
              hint: "보이스 테스트 영상",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/voice-attenuation.png",
              alt: "보이스 컴포넌트의 감쇠 설정 화면",
              caption:
                "Voice Attenuation Override에 SA_Voice를 물리고 Inner Radius 100 · Falloff Distance 400 — 이 두 값이 대화가 성립하는 거리를 정한다",
              hint: "감쇠 설정 화면",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            {
              title: "시연 영상 — VOIP 보이스 · 세션 멀티",
              url: "https://blog.naver.com/startblack7/224353530954",
            },
            {
              title: "Gears of Deceit — 보이스 감쇄",
              url: "https://blog.naver.com/startblack7/224338475374",
            },
            {
              title: "트러블 슈팅 — 보이스 생사별 격리",
              url: "https://blog.naver.com/startblack7/224335734651",
            },
            {
              title: "트러블 슈팅 — 멀티플레이 근접 VOIP + Seamless Travel",
              url: "https://blog.naver.com/startblack7/224321224056",
            },
            {
              title: "OSS::VOIP Talker",
              url: "https://blog.naver.com/startblack7/224319170946",
            },
          ],
        },
        {
          id: "train",
          kind: "feature",
          eyebrow: "03 · 열차",
          title: "스플라인 주행 열차와 탑승 유지 구현",
          lead: "주행 중 흔들림과 위치 동기화로 달리는 무대를 구현했습니다.",
          body: [
            "열차는 스플라인을 따라 달립니다. 속도와 위치는 서버가 소유해 전원에게 복제하므로 모든 클라이언트가 같은 지점의 열차를 봅니다. 속도는 퀘스트 완료 인원과 적재 무게가 함께 움직입니다.",
            "여기에 주행 중 흔들림을 더해 달리고 있다는 감각을 만들고, 그 위에 선 캐릭터는 SetBase()로 발판에 묶어 등반이나 상호작용 중에도 열차의 이동 벡터를 계속 받도록 했습니다. 탈선 방지 콜라이더와 시작 위치 고정으로 무대 밖으로 떨어지는 경우를 막았습니다.",
          ],
          table: {
            caption:
              "속도를 협력의 결과로 두어, 퀘스트 진행도가 그대로 승패로 이어지게 했습니다. 속도 · 위치는 서버가 소유해 전원에게 복제합니다.",
            headers: ["조건", "속도", "의도"],
            rows: [
              ["퀘스트 완료 인원 비례", "1.0 + (완료 / 유효 인원)", "진행도 = 속도"],
              ["전원 완료", "×2.0", "협력의 최대 보상"],
              ["기어 적재 중", "감속", "운반에 리스크 부여"],
              ["압력 밸브 파손", "정지", "마피아의 방해 수단"],
            ],
          },
          headerMedia: [
            {
              // https://youtu.be/NLYeQMLkxEc
              youtubeId: "NLYeQMLkxEc",
              src: null,
              alt: "주행 중인 열차 영상",
              caption: "스플라인을 따라 달리는 열차 — 주행 중 흔들림이 함께 걸린 상태",
              hint: "열차 주행 영상",
              aspect: "16/9",
            },
          ],
          media: [
            {
              src: "/projects/gears-of-deceit/train-front.png",
              alt: "설원을 달리는 열차 베헤모스 전경",
              caption:
                "스플라인을 따라 설원을 가로지르는 열차 베헤모스 — 기관차와 객차 전체가 하나의 무대다",
              hint: "열차 전경",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/train-roof.jpg",
              alt: "주행 중인 열차 지붕 위를 달리는 캐릭터",
              caption: "주행 중인 열차 지붕 — 바닥이 계속 움직이는 상태에서의 이동",
              hint: "열차 지붕",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            {
              title: "트러블 슈팅 — 움직이는 발판 위 캐릭터",
              url: "https://blog.naver.com/startblack7/224332228398",
            },
            {
              title: "Gears of Deceit(1) — 프로젝트 시작",
              url: "https://blog.naver.com/startblack7/224331016694",
            },
          ],
        },
        {
          id: "render",
          kind: "feature",
          eyebrow: "04 · 렌더링 · UI",
          title: "Custom Depth 툰 셰이딩과 HUD 구현",
          lead: "룩은 셀 셰이딩으로, 상호작용 표시는 뎁스 스텐실로 구현했습니다.",
          body: [
            "룩은 포스트 프로세스에서 셀 셰이딩으로 만듭니다. 라이팅 결과를 단계로 끊어 명암이 계단처럼 떨어지게 하고, 외곽선을 더해 스팀펑크 톤을 맞췄습니다.",
            "상호작용 표시는 뎁스 스텐실을 씁니다. 조작 가능한 오브젝트의 Custom Depth를 켜고 스텐실 값을 주면 포스트 프로세스가 그 값을 가진 픽셀만 골라 외곽선을 그립니다. 새 오브젝트는 플래그만 켜면 표시가 붙습니다.",
          ],
          headerMedia: [
            {
              // https://youtu.be/Lvm8ebl0OSE
              youtubeId: "Lvm8ebl0OSE",
              src: null,
              alt: "셀 셰이딩과 상호작용 표시가 적용된 화면 영상",
              caption: "셀 셰이딩이 걸린 화면과, 대상에 붙는 상호작용 외곽선",
              hint: "셰이딩 · 상호작용 표시 영상",
              aspect: "16/9",
            },
          ],
          bullets: [
            { label: "셀 셰이딩", text: "라이팅을 단계로 끊는 포스트 프로세스와 외곽선" },
            {
              label: "상호작용 표시",
              text: "Custom Depth + 스텐실 값으로 조작 가능한 오브젝트만 골라 외곽선",
            },
            { label: "HUD", text: "진행바 · 압력 게이지 · 연료 표시 머티리얼과 UI 애니메이션" },
          ],
          compare: {
            title: "툰 셰이딩 포스트 프로세스",
            before: {
              src: "/projects/gears-of-deceit/hud.png",
              alt: "포스트 프로세스를 적용하기 전의 게임 화면",
              caption: "적용 전 — 색이 뭉치고 형태 경계가 배경에 묻힌다",
              hint: "적용 전 화면",
              aspect: "16/9",
            },
            after: {
              src: "/projects/gears-of-deceit/toon-after.png",
              alt: "툰 셰이딩이 적용된 인게임 화면",
              caption:
                "적용 후 — 명암이 단을 이루고 실루엣이 배경에서 떨어져 나온다. 남은 시간 · 압력 · 연료 · 퀘스트 진행도가 한 화면에 모인다",
              hint: "적용 후 화면",
              aspect: "16/9",
            },
          },
          media: [
            {
              src: "/projects/gears-of-deceit/toon-material.png",
              alt: "툰 셰이딩 포스트 프로세스 머티리얼의 노드 그래프",
              caption:
                "화면 밝기를 뽑아 SmoothStep 으로 명암을 단으로 끊고, 그림자 · 광원 색을 입힌 뒤, CustomDepth 와 SceneDepth 차이로 외곽선을 더한다",
              hint: "머티리얼 노드 그래프",
              aspect: "16/9",
            },
          ],
          blogPosts: [
            {
              title: "Gears of Deceit — 카툰 렌더링",
              url: "https://blog.naver.com/startblack7/224341852380",
            },
            {
              title: "Gears of Deceit(2) — 포스트 프로세스",
              url: "https://blog.naver.com/startblack7/224334575960",
            },
          ],
        },
      ],

      troubleshooting: [
        {
          mine: true,
          title: "세션 목록이 비거나, 남의 방이 섞이거나, 유령 방이 남음",
          problem:
            "재참여하면 방 목록이 비고, 만들지 않은 방이 검색되고, 강제 종료한 방이 계속 살아 있었습니다. 세 증상이 번갈아 나타났습니다.",
          hypotheses: [
            {
              text: "세션 검색 호출 자체가 실패한다",
              test: "검색 콜백의 성공 여부와 결과 수를 로그로 확인",
              verdict: "기각",
            },
            {
              text: "ESC 종료 경로가 세션 정리를 건너뛴다",
              test: "종료 경로마다 로그를 걸어 세션 파기가 호출되는지 비교",
              verdict: "확인",
            },
            {
              text: "Steam 공용 테스트 AppID(480)를 쓰는 다른 개발자의 방이 섞인다",
              test: "검색 결과의 방 이름과 호스트를 우리 빌드가 만든 것과 대조",
              verdict: "확인",
            },
            {
              text: "비정상 종료된 세션이 플랫폼에 그대로 남는다",
              test: "강제 종료한 방이 이후에도 계속 검색되는지 시간을 두고 확인",
              verdict: "확인",
            },
          ],
          fix: "원인 계층별로 처방을 따로 붙였습니다. 종료 경로를 LoadMainMenu에 연결하고 검색 워치독 · 가드 리셋 추가, BUILD_ID 서명 필터로 우리 빌드만 통과, 생성 후 30분이 지난 세션은 목록에서 제외.",
          result: "재참여 · 검색 · 강제 종료 어느 경로에서도 방 목록이 정상 상태로 돌아옵니다.",
          lesson: "세 증상이 비슷해 보여도 원인이 다르면 처방도 따로 붙여야 한다.",
          postUrl: "https://blog.naver.com/startblack7/224352390229",
        },
        {
          mine: true,
          title: "죽은 플레이어의 목소리가 산 사람에게 들림",
          problem:
            "사망한 플레이어의 발언이 생존자에게 그대로 전달돼 추리가 무의미해졌습니다.",
          hypotheses: [
            {
              text: "감쇠 반경이 너무 넓어 멀리까지 들린다",
              test: "반경을 좁혀서 재현되는지 확인",
              verdict: "기각",
            },
            {
              text: "사망 시 보이스 컴포넌트를 끄지 않는다",
              test: "사망 처리 경로에서 발화 상태가 어떻게 바뀌는지 추적",
              verdict: "기각",
            },
            {
              text: "채널이 위치만 기준이라 생사 · 비밀방 같은 규칙상의 경계를 모른다",
              test: "벽을 사이에 둔 두 사람과 사망자 · 생존자 조합으로 들리는 범위를 비교",
              verdict: "확인",
            },
          ],
          fix: "생사와 공간을 기준으로 채널을 분리하고, 상태가 바뀌는 시점에 채널을 다시 배정했습니다.",
          result: "관전자가 정보를 흘릴 수 없게 되어 규칙이 다시 성립했습니다.",
          lesson: "소셜 디덕션에서 들리는 범위는 편의 기능이 아니라 규칙이다. 규칙이 새면 게임이 무너진다.",
          postUrl: "https://blog.naver.com/startblack7/224335734651",
        },
        {
          mine: true,
          title: "움직이는 열차 위에서 캐릭터가 반대로 밀려 떨어짐",
          problem:
            "지붕에서 등반이나 상호작용을 하면 캐릭터만 제자리에 남고 열차가 빠져나갔습니다.",
          hypotheses: [
            {
              text: "열차 이동이 캐릭터 갱신보다 늦어 한 프레임씩 밀린다",
              test: "가만히 서 있을 때도 재현되는지 확인",
              verdict: "기각",
            },
            {
              text: "콜리전이 얇아 발판을 뚫고 빠진다",
              test: "콜라이더 두께를 키워 재현 여부 확인",
              verdict: "기각",
            },
            {
              text: "특정 동작 진입 시 엔진이 Movement Base를 자동으로 해제한다",
              test: "등반 · 상호작용에서만 재현되는지, 그때 Base 값이 비는지 확인",
              verdict: "확인",
            },
          ],
          fix: "SetBase()로 캐릭터의 Base를 발판에 강제 바인딩해 열차의 이동 벡터를 계속 받도록 했습니다.",
          result: "주행 중에도 지붕 위 이동 · 전투가 유지됩니다.",
          lesson: "움직이는 바닥 위에서는 '가만히 있는 것'도 매 프레임 계산해야 하는 상태다.",
          postUrl: "https://blog.naver.com/startblack7/224332228398",
        },
        {
          mine: false,
          title: "호스트만 캐릭터 스킨이 적용되지 않음",
          problem:
            "클라이언트는 정상인데 리슨 호스트만 선택한 스킨이 반영되지 않았습니다.",
          hypotheses: [
            {
              text: "스킨 값이 복제되지 않는다",
              test: "클라이언트에서는 정상 적용되는지 확인",
              verdict: "기각",
            },
            {
              text: "초기화 시점이 리슨 호스트에서만 어긋난다",
              test: "BeginPlay · OnRep_Controller · PossessedBy의 호출 순서를 서버 · 클라이언트 · 리슨 호스트에서 각각 로그로 비교",
              verdict: "확인",
            },
          ],
          fix: "서버 빙의 시점인 PossessedBy에서 전송하도록 옮겼습니다. (중복 1회 가드)",
          result: "호스트 · 클라이언트 모두 같은 시점에 스킨이 적용됩니다.",
          lesson: "초기화 타이밍은 서버 · 클라이언트 · 리슨 호스트가 각각 다르다.",
        },
      ],
    },
  },
  {
    slug: "crawlescape",
    title: "Crawlescape",
    tagline: "다양한 무기로 싸우는 액션 로그라이크 TPS",
    banner: "/projects/crawlescape/key-art.png",
    icon: "cube",
    label: "Unreal · 팀 6인",
    period: "2026.05.01 – 2026.05.27",
    role: "전투 시스템 · 오브젝트 풀링 · UI 매니저 · 포스트 프로세스",
    teamSize: "6인 팀",
    stack: ["Unreal Engine 5.5", "C++", "Blueprint", "DataAsset", "Object Pooling"],
    problem:
      "총기가 늘 때마다 클래스를 하나씩 더 만들고, 화면이 늘 때마다 열고 닫는 코드를 여기저기 심는 구조였습니다. 거기에 몬스터를 많이 스폰하면 프레임이 무너졌습니다. 기능을 더할수록 비용이 같이 붙는 것이 문제였습니다.",
    approach: [
      "무기 — 수치는 DataAsset, 무기별 동작은 BlueprintImplementableEvent로 열어 템플릿화",
      "총알 — 미리 만들어 두고 꺼내 쓰는 오브젝트 풀링으로 스폰 비용 제거",
      "UI — UIManager 한 곳이 열고 닫기와 중복을 카운팅으로 전담",
      "연출 — 무기 소켓 · 스프링 암 트레이스, 포스트 프로세스와 UI 머티리얼",
    ],
    results: [
      { label: "무기 추가", value: "C++ 수정 없이 DataAsset + BP" },
      { label: "총알 · 몬스터", value: "오브젝트 풀링 재사용" },
      { label: "프레임", value: "60fps 안정화" },
    ],
    relatedPosts: ["gas-10", "gas-15", "gas-16", "gas-17", "gas-13", "material-04"],
    links: [
      {
        label: "플레이 영상",
        href: "https://www.youtube.com/watch?v=6jrdc7jVilQ",
      },
    ],
    surface: "dark",

    detail: {
      overview: [],
      factGroups: [
        {
          title: "게임 정보",
          items: [
            { label: "장르", value: "액션 TPS" },
            { label: "플랫폼", value: "PC (Windows)" },
          ],
        },
        {
          title: "기간 · 팀 규모",
          items: [
            { label: "개발 기간", value: "2026.05.01 – 2026.05.27 (4주)" },
            { label: "팀 구성", value: "6명" },
            { label: "담당 업무", value: "전투 시스템 · 오브젝트 풀링 · UI 매니저 · 포스트 프로세스" },
          ],
        },
        {
          title: "개발 환경",
          items: [
            { label: "게임 엔진", value: "Unreal Engine 5.5" },
            { label: "IDE", value: "Visual Studio 2022" },
            { label: "프로그래밍 언어", value: "C++ / Unreal Blueprint" },
          ],
        },
      ],
      teamNote:
        "6인 팀 프로젝트입니다. 아래는 제가 맡은 전투 시스템, 오브젝트 풀링, UI 관리, 포스트 프로세스이며, 그 밖의 시스템은 팀원들이 담당했습니다.",

      myScope: [
        {
          title: "전투 시스템",
          text: "DataAsset 기반 무기 정보, 소켓 장착, BlueprintImplementableEvent 템플릿 패턴",
        },
        {
          title: "오브젝트 풀링",
          text: "풀링 컴포넌트를 붙여 총알 · 몬스터를 회수하고 재활용",
        },
        {
          title: "UI",
          text: "UIManager 중심의 열고 닫기 · 중복 방지 카운팅, 재사용 가능한 위젯 흐름",
        },
        {
          title: "포스트 프로세스",
          text: "화면 연출용 포스트 프로세스 머티리얼, UI 머티리얼, 스프링 암 기반 무기 트레이스",
        },
      ],

      flows: [
        {
          title: "워크플로우",
          src: "/projects/crawlescape/flow-work.png",
          alt: "전투 · 미션 · 지원 시스템이 이벤트로 이어지는 구조도",
          caption:
            "장비 · 전투 · 성장, 처치 이벤트로 이어지는 미션, 그리고 풀링 · 스폰 지원 시스템",
        },
        {
          title: "게임 플로우",
          src: "/projects/crawlescape/flow-game.png",
          alt: "구역 진입부터 다음 구역 이동까지의 한 판 흐름도",
          caption:
            "구역 진입 → 전투 · 성장 → 미션 달성 → 출구 개방, 제한 시간이 지나면 전기장",
        },
      ],
      keyArt: {
        src: "/projects/crawlescape/key-art.png",
        alt: "Crawlescape 타이틀 아트",
        caption: "",
        hint: "게임 대표 컷",
        aspect: "16/9",
      },
      overviewVideo: {
        // https://www.youtube.com/watch?v=6jrdc7jVilQ
        youtubeId: "6jrdc7jVilQ",
        src: null,
        alt: "Crawlescape 플레이 영상",
        caption: "프로젝트 전체 기록 영상",
        hint: "플레이 영상",
        aspect: "16/9",
      },
      youtubeId: null,

      sections: [
        {
          id: "weapon",
          kind: "feature",
          eyebrow: "01 · 전투 시스템",
          title: "데이터 드리븐 무기 시스템과 템플릿 패턴",
          lead: "템플릿 패턴을 기반으로 확장하여 구현했습니다.",
          headerMedia: [
            {
              // https://youtu.be/LmYBKiMyngM
              youtubeId: "LmYBKiMyngM",
              src: null,
              alt: "전투 시스템 시연 영상",
              caption: "전투 시스템 — 무기 교체와 사격",
              hint: "전투 시스템 영상",
              aspect: "16/9",
            },
            {
              src: "/projects/crawlescape/weapon-dataasset.png",
              alt: "무기 DataAsset의 디테일 패널",
              caption:
                "무기 DataAsset — 표시 이름 · 레벨별 강화 수치와 아이콘 · 장착할 Equipment 클래스 · 슬롯 인덱스가 전부 에셋 안에 있다",
              hint: "DataAsset 디테일 패널",
              aspect: "4/3",
            },
          ],
          table: {
            caption:
              "무엇을 코드에 두고 무엇을 데이터 · 노드로 뺐는지가 확장 비용을 가릅니다. 팀원이 C++을 건드리지 않고도 무기를 추가할 수 있습니다.",
            headers: ["구분", "구현"],
            rows: [
              ["수치 · 레벨별 강화 · 아이콘", "DataAsset"],
              ["장착 위치", "소켓 이름 (DataAsset)"],
              ["장착 · 교체", "소켓 재바인딩 (C++)"],
              ["조준", "스프링 암 기준 트레이스 (C++)"],
              ["발사 · 재장전 순서", "C++ 뼈대"],
              ["무기별 고유 동작 · 연출", "BlueprintImplementableEvent"],
            ],
          },
          blogPosts: [
            {
              title: "템플릿 패턴과 샌드박스 패턴",
              url: "https://blog.naver.com/startblack7/224271901922",
            },
            {
              title: "장비 카드 UI 시스템 구현",
              url: "https://blog.naver.com/startblack7/224276952661",
            },
            {
              title: "GAS(21) - 무기 트레이스 기능 (SpringArm & Socket)",
              url: "https://blog.naver.com/startblack7/224291732825",
            },
          ],
          // 장착 · 조준 사진은 섹션 맨 아래, 개발 기록 링크 바로 위에 둡니다
          media: [
            {
              src: "/projects/crawlescape/weapon-sockets.png",
              alt: "캐릭터 메시의 소켓마다 무기가 장착된 화면",
              caption:
                "장비 장착 — 등 · 허리 · 양손 소켓에 무기가 각각 붙는다. 어느 소켓에 붙일지는 DataAsset이 들고 있다",
              hint: "무기 장착 · 조준 화면",
              aspect: "16/9",
            },
          ],
        },
        {
          id: "pooling",
          kind: "feature",
          eyebrow: "02 · 오브젝트 풀링",
          title: "총알 오브젝트 풀링",
          lead: "컴포넌트를 붙여 오브젝트를 회수하고 재활용했습니다.",
          body: [
            "풀링은 액터에 컴포넌트를 붙이는 방식으로 만들었습니다. 상속 계층을 건드리지 않고 컴포넌트만 달면 그 액터는 회수 · 재활용 대상이 되므로, 총알에 쓰던 것을 몬스터에도 그대로 붙일 수 있었습니다.",
            "시작할 때 필요한 만큼 미리 만들어 두고, 발사할 때는 꺼내 위치와 방향만 다시 세팅합니다. 명중하거나 수명이 끝나면 지우지 않고 비활성 상태로 되돌려 풀에 반납합니다. 대기 중에는 Tick과 충돌 · 가시성을 모두 꺼 둬, 풀에 있다는 것이 곧 아무 비용도 쓰지 않는다는 뜻이 되게 했습니다.",
          ],
          table: {
            caption: "발사 수와 비용의 관계를 끊는 것이 풀링의 목적입니다.",
            headers: ["단계", "매번 Spawn / Destroy", "오브젝트 풀링"],
            rows: [
              ["생성", "발사할 때마다 액터 생성 · 초기화", "미리 확보해 두고 꺼내 쓰기"],
              ["대기", "해당 없음", "Tick · 충돌 · 가시성을 끈 채 보관"],
              ["반환", "Destroy → GC 대상", "비활성화 후 풀에 반납"],
              ["재사용", "매번 새로 만듦", "컴포넌트만 붙이면 몬스터에도 적용"],
              ["비용", "발사 수에 비례", "풀 크기만큼 고정"],
            ],
          },
          blogPosts: [
            {
              title: "Object Pooling",
              url: "https://blog.naver.com/startblack7/224254925484",
            },
            {
              title: "총알 최적화",
              url: "https://blog.naver.com/startblack7/224269651875",
            },
            {
              title: "GAS(19) - Bullet Pooling",
              url: "https://blog.naver.com/startblack7/224285715523",
            },
          ],
        },
        {
          id: "ui",
          kind: "feature",
          eyebrow: "03 · UI",
          title: "UI 매니저 중심의 화면 관리",
          lead: "레퍼런스 카운터를 기준으로 위젯을 중앙에서 관리했습니다.",
          headerMedia: [
            {
              // https://youtu.be/05jIXJ4GJK8
              youtubeId: "05jIXJ4GJK8",
              src: null,
              alt: "UI 시스템 시연 영상",
              caption: "UI 시스템 — 화면을 열고 닫는 흐름",
              hint: "UI 시스템 영상",
              aspect: "16/9",
            },
          ],
          body: [
            "위젯을 만들고 붙이고 떼는 일을 UIManager 한 곳으로 모았습니다. 게임플레이 코드는 무엇을 열지만 말하고, 실제로 어떤 위젯을 어떤 순서로 올릴지는 매니저가 정합니다.",
            "중복은 하드코딩으로 막지 않고 카운팅으로 처리했습니다. 같은 화면을 여러 곳에서 요청하면 참조 수만 올라가고, 닫기 요청이 그 수만큼 들어와야 실제로 내려갑니다. 덕분에 요청하는 쪽은 상대가 이미 열었는지 신경 쓸 필요가 없어집니다.",
          ],
          table: {
            caption: "여는 쪽이 상태를 알 필요가 없어지면, 그만큼 화면끼리의 의존이 사라집니다.",
            headers: ["구분", "개별 관리", "중앙 관리 (UIManager)"],
            rows: [
              ["관리 주체", "화면마다 제각기", "매니저 한 곳"],
              ["여닫는 기준", "각자의 판단", "레퍼런스 카운트"],
              ["두 곳에서 요청", "두 번 겹쳐 뜸", "카운트만 증가"],
              ["한쪽만 닫음", "남은 쪽까지 사라짐", "0이 될 때만 내려감"],
              ["새 화면 추가", "여닫는 코드를 또 작성", "매니저 함수 재사용"],
              ["결합도", "화면끼리 서로를 알아야 함", "위젯 클래스를 몰라도 됨"],
            ],
          },
          blogPosts: [
            { title: "UI 모듈", url: "https://blog.naver.com/startblack7/224203079327" },
            { title: "UI 동기화", url: "https://blog.naver.com/startblack7/224204409547" },
            {
              title: "Inventory - UI 컴포지트 패턴",
              url: "https://blog.naver.com/startblack7/224263026340",
            },
            {
              title: "PlayerController를 UI 이벤트의 중앙 허브로 활용하기",
              url: "https://blog.naver.com/startblack7/224297331171",
            },
          ],
        },
        {
          id: "render",
          kind: "feature",
          eyebrow: "04 · UI 효과",
          title: "Dynamic Material Instance로 UI 효과 구현",
          lead: "연출을 로직이 아니라 머티리얼에서 처리해 게임 코드와 분리했습니다.",
          headerMedia: [
            {
              // https://youtu.be/gZ5CZWi2KTQ
              youtubeId: "gZ5CZWi2KTQ",
              src: null,
              alt: "히트 이펙트 시연 영상",
              caption: "히트 이펙트 — 피격 순간의 화면 반응",
              hint: "히트 이펙트 영상",
              aspect: "16/9",
            },
          ],
          table: {
            caption: "연출이 갈라져도 머티리얼은 늘지 않습니다.",
            headers: ["구분", "위젯 로직으로 처리", "Dynamic Material Instance"],
            rows: [
              ["연출 제어", "위젯 코드에서 분기", "머티리얼 파라미터 값만 변경"],
              ["위젯별 상태", "머티리얼을 따로 만듦", "인스턴스를 따로 들어 값만 다르게"],
              ["효과 추가", "에셋이 함께 늘어남", "파라미터만 열면 됨"],
              ["수정 범위", "게임플레이 코드까지 번짐", "머티리얼 안에서 끝"],
            ],
          },
          blogPosts: [
            {
              title: "Material - Enter Effect",
              url: "https://blog.naver.com/startblack7/224274779372",
            },
          ],
        },
      ],

      troubleshooting: [
        {
          title: "총알을 SpawnActor로 만들 때 프레임이 떨어지는 문제",
          problem:
            "총알을 발사할 때마다 SpawnActor로 만들고 명중하면 Destroy했습니다. 연사 무기를 쏘는 동안 프레임이 눈에 띄게 떨어졌고, 화면에 남은 총알 수보다 쏘는 속도에 비례해 나빠졌습니다.",
          hypotheses: [
            {
              text: "날아가는 총알의 이동 · 충돌 연산이 병목이다",
              test: "화면에 떠 있는 총알 수는 그대로 두고 발사 간격만 늘려 비교",
              verdict: "기각",
            },
            {
              text: "SpawnActor와 Destroy를 반복하는 비용 자체가 병목이다",
              test: "발사 간격을 좁힐수록 하락 폭이 커지는지 확인",
              verdict: "확인",
            },
            {
              text: "파괴된 총알이 한꺼번에 GC 대상이 되며 순간 부하를 만든다",
              test: "프레임이 튀는 시점과 총알이 대량으로 사라지는 시점을 대조",
              verdict: "확인",
            },
          ],
          fix: "풀링 컴포넌트를 붙여 총알을 미리 만들어 두고, 발사할 때는 꺼내 위치와 방향만 다시 세팅하도록 바꿨습니다. 명중하거나 수명이 끝나면 Destroy 대신 비활성화해 풀에 반납하므로 생성도 파괴도 일어나지 않습니다.",
          result:
            "발사량과 무관하게 프레임이 유지됐습니다. 같은 컴포넌트를 몬스터에도 붙여 다수 스폰 구간까지 60fps를 안정적으로 유지했습니다.",
          lesson:
            "비용이 총알 수가 아니라 생성 · 소멸 횟수에 붙어 있었습니다. 떠 있는 총알 수를 고정한 채 발사 간격만 바꿔본 것이 그 둘을 갈라줬고, 그 확인이 없었다면 이동 · 충돌 쪽을 붙잡고 있었을 겁니다.",
          mine: true,
        },
        {
          title: "패키징하면 일부 UASSET이 빠지는 문제",
          problem:
            "에디터에서는 멀쩡한데 패키징한 빌드에서는 일부 에셋이 누락돼 정상적으로 뜨지 않았습니다.",
          hypotheses: [
            {
              text: "패키징 설정이 잘못돼 콘텐츠가 통째로 빠졌다",
              test: "다른 에셋들이 정상 포함되는지 빌드 산출물에서 확인",
              verdict: "기각",
            },
            {
              text: "어떤 클래스도 직접 참조하지 않아 쿠킹 대상에서 제외됐다",
              test: "누락된 에셋들의 참조 관계를 확인 — 런타임에 경로로만 불러오는 것들이었음",
              verdict: "확인",
            },
          ],
          fix: "프로젝트 세팅의 Additional Asset Directories to Cook에 해당 에셋 경로를 등록해 참조가 없어도 쿠킹에 포함되도록 했습니다.",
          result: "에셋 누락이 사라지고 패키징이 정상적으로 완료됐습니다.",
          lesson:
            "참조 그래프로 쿠킹 대상을 정한다는 엔진의 전제를 알고 나니, 경로로 불러 쓰는 에셋은 따로 알려줘야 한다는 것이 당연한 결론이 됐습니다.",
          mine: true,
        },
      ],
    },
  },
  {
    slug: "destination",
    title: "DESTINATION",
    tagline: "대규모 PVE와 총기 액션이 결합된 빠른 템포의 서바이벌 게임",
    banner: "/projects/destination/banner.png",
    icon: "network",
    label: "Unreal · 개인",
    period: "2025.10",
    role: "전체 설계 및 구현",
    teamSize: "개인 프로젝트",
    stack: ["Unreal Engine 5", "C++", "GAS", "Steam OSS", "Replication"],
    problem:
      "슈터의 시스템은 서로 얽혀 있습니다. 무기가 늘면 데미지 계산이 흔들리고, 아이템이 늘면 네트워크가 무거워지고, 적이 늘면 프레임이 무너집니다.",
    approach: [
      "전투 — 모든 피해를 ExecCalc 한 곳으로 모아 계산 경로를 단일화",
      "아이템 — FastArraySerializer로 바뀐 항목만 델타 복제",
      "AI — 컨트롤러를 미리 만들어 빌려 쓰는 풀링으로 스폰 비용 제거",
      "데이터 — 무기 · 아이템 · 카드 수치를 DataAsset / DataTable로 분리",
    ],
    results: [
      { label: "데미지 경로", value: "ExecCalc 단일화" },
      { label: "아이템 동기화", value: "FastArray 델타 복제" },
      { label: "AI", value: "컨트롤러 풀링" },
    ],
    relatedPosts: ["cs-30", "cs-33", "cs-27"],
    links: [
      {
        label: "GitHub 저장소",
        href: "https://github.com/Geniedevice/DESTINATION-OnlineSubSystem",
      },
      {
        label: "개발 기록",
        href: "https://blog.naver.com/startblack7/224034428520",
      },
    ],
    surface: "dark",

    detail: {
      overview: [
        "폐허가 된 도시에서 몰려오는 좀비 웨이브를 함께 버티는 3D 멀티플레이 슈터입니다. 스팀으로 방을 만들고 친구가 들어와, 웨이브를 넘길 때마다 능력 카드를 골라 캐릭터를 키워 나갑니다.",
        "혼자 만든 프로젝트라 네트워크부터 전투 · 아이템 · AI · UI까지 전부 직접 설계했습니다. 기능을 늘리는 것보다 나중에 하나를 바꿔도 나머지가 안 깨지는 구조를 잡는 데 시간을 더 썼습니다.",
      ],
      factGroups: [
        {
          title: "게임 정보",
          items: [
            { label: "장르", value: "3D 좀비 로그라이크 액션" },
            { label: "인원", value: "멀티플레이 협동" },
          ],
        },
        {
          title: "기간 · 팀 규모",
          items: [
            { label: "개발 기간", value: "2025.10" },
            { label: "팀 구성", value: "1명 (개인 프로젝트)" },
            { label: "담당 업무", value: "네트워크 · 전투 · 아이템 · AI · UI 전 영역" },
          ],
        },
        {
          title: "개발 환경",
          items: [
            { label: "게임 엔진", value: "Unreal Engine 5" },
            { label: "IDE", value: "Visual Studio 2022" },
            { label: "프로그래밍 언어", value: "Blueprint / C++" },
            { label: "플랫폼", value: "PC (Steam)" },
          ],
        },
      ],
      teamNote:
        "개인 프로젝트입니다. 아래 시스템은 전부 직접 설계하고 구현했습니다.",

      myScope: [
        {
          title: "네트워크",
          text: "Steam OSS 세션 · 로비 · 서버 권위 게임 모드 구성",
        },
        {
          title: "전투 (GAS)",
          text: "AttributeSet · ExecCalc 데미지 파이프라인 · 무기별 어빌리티",
        },
        {
          title: "아이템",
          text: "FastArraySerializer 기반 인벤토리 · 장비 시스템",
        },
        {
          title: "AI · 성장",
          text: "컨트롤러 풀링, 웨이브 스포너, 로그라이크 능력 카드",
        },
      ],

      flows: [
        {
          title: "코드 플로우",
          src: "/projects/destination/flow-code.png",
          alt: "접속부터 좀비 재사용까지 다섯 단계로 나눈 코드 흐름도 — 단계마다 서버 · 클라이언트 권한을 표시",
          caption:
            "① 온라인 접속 → ② 초기화 · 입력 → ③ 아이템 · 장비 → ④ 전투 · 피해 계산 → ⑤ 좀비 · 스포너 재사용. 상자마다 그 일을 누가(서버 · 클라이언트) 하는지 함께 적었다",
        },
        {
          title: "게임 플로우",
          src: "/projects/destination/flow-game.png",
          alt: "방 생성부터 스포너 재활성화까지 반복되는 한 판 흐름도",
          caption:
            "방 생성 → 전장 이동 → 좀비 · 스포너 전투 → 보상 → 스포너 재활성화 반복",
        },
      ],
      keyArt: {
        // 74초짜리 짧은 영상이라 유튜브 대신 직접 올렸습니다 (8.5MB)
        video: "/projects/destination/demo.mp4",
        src: "/projects/destination/key-art.jpg",
        alt: "DESTINATION 플레이 영상",
        caption: "플레이 영상 — 웨이브를 버티며 폐허가 된 도시를 이동한다",
        hint: "대표 화면",
        aspect: "16/9",
      },
      overviewMedia: [
        {
          src: "/projects/destination/city.jpg",
          alt: "폐허가 된 도시",
          caption: "안개가 깔린 폐허 도시 — 좌상단은 남은 적 수와 웨이브 타이머",
          hint: "맵 전경",
          aspect: "16/9",
        },
      ],
      // 영상은 위에서 바로 재생되므로 원문 글만 링크로 남깁니다
      youtubeId: null,

      sections: [
        {
          id: "network",
          kind: "feature",
          eyebrow: "01 · 네트워크",
          title: "Steam OSS 세션과 서버 권위 구조 구현",
          lead: "멀티플레이 게임은 전투가 아무리 좋아도 방에 못 들어가면 아무것도 아닙니다.",
          body: [
            "GameInstance가 세션을 전담하고 위젯은 IMenuInterface만 호출합니다. 로비는 별도 게임 모드 · 게임 스테이트로 분리해, 인원이 모이면 본 게임 레벨로 함께 넘어갑니다.",
            "스포너 체력이나 웨이브 수처럼 승패에 직결되는 값은 서버가 소유하고, 클라이언트는 RepNotify로 UI만 갱신합니다.",
          ],
          bullets: [
            { label: "세션", text: "Steam OSS · 방 생성 / 검색 / 참가 / 나가기" },
            { label: "경계", text: "UI는 IMenuInterface만 알고 OSS를 직접 다루지 않음" },
            { label: "로비", text: "LobbyGameMode · LobbyGameState로 대기 상태 분리" },
            { label: "권위", text: "스포너 체력 · 웨이브 수를 서버가 소유하고 복제" },
          ],
          media: [
            {
              src: "/projects/destination/combat.jpg",
              alt: "좀비를 처치한 직후의 화면",
              caption: "좌상단 남은 적 수와 타이머는 서버가 관리하고 클라이언트로 복제된다",
              hint: "전투 화면",
              aspect: "16/9",
            },
          ],
        },
        {
          id: "combat",
          kind: "feature",
          eyebrow: "02 · 전투",
          title: "ExecCalc 단일 데미지 파이프라인 구현",
          lead: "무기가 늘어도 맞으면 얼마가 깎이는지는 한 곳에서만 결정되게 했습니다.",
          body: [
            "무기별로 다른 것은 발사 방식과 투사체까지입니다. 맞았을 때 얼마가 깎이는지는 GameplayEffect 하나가 ExecCalc로 계산하고, 어빌리티는 원본값만 SetByCaller로 실어 보냅니다.",
            "계산 순서가 한 곳에 있으니 새 무기를 붙일 때 그 순서를 다시 구현할 일이 없습니다. 적 어빌리티도 같은 경로를 씁니다.",
          ],
          table: {
            caption: "계산 순서를 한 곳에 고정해, 어떤 무기로 맞아도 같은 규칙이 적용됩니다.",
            headers: ["순서", "단계", "쓰이는 속성"],
            rows: [
              ["1", "치명타 판정", "공격자 치명타 확률 · 배수"],
              ["2", "피해 감소", "대상 피해 감소율"],
              ["3", "실드 흡수", "대상 실드"],
              ["4", "체력 차감", "대상 체력"],
            ],
          },
          bullets: [
            { label: "단일 경로", text: "모든 피해가 ExecCalc_Damage 한 곳을 통과" },
            {
              label: "무기별 차이",
              text: "발사 방식과 투사체만 어빌리티로 분리 (샷건 · 스나이퍼 · 바주카 · 미니건)",
            },
            {
              label: "속성",
              text: "체력 · 실드 · 피해감소 · 치명타 · 마나를 RepNotify로 UI와 연동",
            },
          ],
        },
        {
          id: "items",
          kind: "feature",
          eyebrow: "03 · 아이템",
          title: "FastArraySerializer 인벤토리 · 장비 구현",
          lead: "아이템 하나가 바뀔 때 배열 전체가 다시 날아가지 않게 하는 것이 목표였습니다.",
          body: [
            "인벤토리와 장비를 FastArraySerializer로 구성해 바뀐 항목만 델타로 복제합니다. 항목마다 고유 ID가 있어 어떤 칸이 바뀌었는지 클라이언트가 정확히 압니다.",
            "장비는 정의(Definition)와 장착된 실체(Instance)를 나눴습니다. 장착하면 효과와 어빌리티가 함께 부여되고, 해제할 때 부여 핸들로 정확히 회수됩니다.",
          ],
          table: {
            caption: "복제 방식만 바꿔도 아이템 수와 네트워크 비용의 관계가 끊어집니다.",
            headers: ["구분", "배열 전체 복제", "FastArray 델타 복제"],
            rows: [
              ["전송 단위", "배열 전체", "바뀐 항목만"],
              ["비용", "아이템 수에 비례", "변경 수에 비례"],
              ["클라이언트", "무엇이 바뀌었는지 모름", "고유 ID로 정확히 식별"],
            ],
          },
          bullets: [
            { label: "장비 구조", text: "Definition(설계) / Instance(장착된 실체) 분리" },
            { label: "회수", text: "장착 시 부여한 효과 · 어빌리티를 부여 핸들로 정확히 회수" },
            { label: "태그", text: "슬롯 · 희귀도 · 아이템 종류를 GameplayTag로 표현" },
            { label: "UI 분리", text: "WidgetController가 데이터와 위젯 사이를 중재" },
          ],
        },
        {
          id: "optimize",
          kind: "feature",
          eyebrow: "04 · 최적화 · 성장",
          title: "AI 컨트롤러 풀링과 능력 카드 성장 구현",
          lead: "웨이브 게임의 재미는 점점 많아지는 것인데, 구현에서는 그게 그대로 비용입니다.",
          body: [
            "맵에 놓인 스포너들의 필요 수를 시작할 때 모두 더해, 그만큼의 AI 컨트롤러를 미리 만들어둡니다. 대기 중에는 Tick과 가시성을 끈 채 보관하다가 필요할 때 꺼내 빙의시킵니다.",
            "성장은 웨이브 사이의 카드 선택으로 붙였습니다. 카드 정의는 DataAsset에 두고 런타임 상태만 따로 관리해, 같은 카드를 다시 고르면 레벨이 오릅니다.",
          ],
          table: {
            caption: "성장 보상은 성격이 달라도 같은 틀(DataAsset 정의 + 런타임 레벨)에 담았습니다.",
            headers: ["카드", "효과", "중복 선택 시"],
            rows: [
              ["넉백 증가", "타격 시 밀어내는 힘 상승", "레벨업"],
              ["지속 회복", "시간당 체력 회복", "레벨업"],
              ["신규 무기", "무기 해금", "레벨업"],
            ],
          },
          bullets: [
            { label: "AI 풀링", text: "스포너들의 필요 수를 합산해 컨트롤러를 미리 생성" },
            { label: "대기 상태", text: "Tick · 가시성을 끈 채 보관, 빌려줄 때만 활성화" },
            { label: "웨이브", text: "스포너마다 체력 · 웨이브 수 · 스폰 간격을 개별 설정" },
            { label: "성장", text: "카드 정의는 DataAsset, 런타임 상태만 별도 관리" },
          ],
          media: [
            {
              src: "/projects/destination/ability-cards.jpg",
              alt: "웨이브 사이의 능력 카드 선택 화면",
              caption:
                "웨이브 사이 카드 선택 — 넉백 증가 · 지속 회복 · 신규 무기를 같은 틀에 담았다",
              hint: "카드 선택",
              aspect: "16/9",
            },
          ],
        },
        {
          id: "solo",
          kind: "retro",
          eyebrow: "05 · 회고",
          title:
            "혼자 만드는 구조는 어디까지 가야 할까? Lyra 분석으로 배운 데이터 기반 설계",
          lead: "InputTag 도입으로 코드 수정을 최소화하고, 과도한 설계의 시행착오 속에서 배운 구조적 기준.",
          body: [
            "기능을 하나 붙일 때마다 앞서 만든 것이 흔들렸습니다. 무기가 늘면 입력이 늘고, 입력이 늘면 어빌리티 분기가 늘었습니다. 혼자라 \"이렇게 나누는 게 맞냐\"고 물을 곳이 없어, 이미 검증된 구조를 읽는 것으로 리뷰를 대신했습니다.",
            "에픽의 Lyra에서 가져온 것은 InputTag였습니다. 키를 어빌리티에 바로 묶지 않고 이름표를 사이에 두니 무기가 늘어도 손댈 곳이 데이터 한 줄로 줄었고, 같은 발상을 아이템 · 장비로 넓히자 세 갈래가 태그 하나로 이어졌습니다.",
            "시행착오 끝에 남은 것은 기능이 아니라 기준이었습니다. 큰 프로젝트를 그대로 흉내내는 대신 감당할 수 있는 만큼만 가져오고, 구조를 고를 때 \"이게 나중에 무엇을 바꾸기 쉽게 해주는가\"를 먼저 묻게 됐습니다. 이후 팀 프로젝트에서 위젯이 온라인 서브시스템을 직접 다루지 않도록 사이에 인터페이스를 둔 것도 여기서 온 습관입니다.",
          ],
          table: {
            caption:
              "혼자 만들며 가져온 것과 걷어낸 것. 마지막 줄이 코드 플로우에 경고를 붙여둔 자리입니다.",
            headers: ["구분", "무엇을", "결과"],
            rows: [
              [
                "가져온 것",
                "Lyra의 InputTag — 키와 어빌리티 사이에 이름표를 둔다",
                "키 → InputTag → ASC → GA. 무기 추가가 데이터 한 줄로",
              ],
              [
                "넓혀 쓴 것",
                "ItemTag로 DataTable 선택, SlotTag로 장착 위치 결정",
                "입력 · 데이터 · 장비가 같은 키로 연결",
              ],
              [
                "걷어낸 것",
                "Experience · GameFeature — 기능을 통째로 갈아끼우는 구조",
                "감당할 수 있는 범위를 넘어 포기",
              ],
              [
                "과했던 것",
                "쓸 수 있는 곳마다 태그를 붙임",
                "이름 체계를 중간에 두 번 갈아엎음",
              ],
              [
                "남은 숙제",
                "스포너 체력을 GAS 피해 체계 밖에 둠",
                "피해가 흐르는 길이 두 갈래로 갈라짐",
              ],
            ],
          },
        },
      ],

      troubleshooting: [],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** 상세 페이지가 있는 프로젝트만 */
export const detailedProjects = projects.filter((p) => p.detail);
