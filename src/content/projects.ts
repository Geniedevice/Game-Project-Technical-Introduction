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
 * 섹션 종류.
 * 제목만 봐도 "기능을 만든 이야기"인지 "고장을 고친 이야기"인지 알 수 있게 합니다.
 */
export type SectionKind = "feature" | "trouble";

/**
 * 문제 추론 → 가설 → 해결방안 → 결과.
 * 모든 섹션이 같은 순서로 읽히도록 구조로 고정했습니다.
 * 각 칸은 한두 문장, 키워드 위주로 짧게 씁니다.
 */
export type DetailFlow = {
  /** 무엇이 문제였는가 */
  problem: string;
  /** 원인을 무엇이라고 봤는가 */
  hypothesis: string;
  /** 그래서 무엇을 했는가 */
  solution: string;
  /** 그래서 무엇이 달라졌는가 */
  result: string;
};

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
  /** 문제 추론 → 가설 → 해결방안 → 결과 */
  flow: DetailFlow;
  /** 표로 담기 애매한 보조 설명. 없으면 flow와 표만으로 끝납니다 */
  body?: string[];
  /** 규칙 · 비교를 표로 */
  table?: DetailTable;
  /** 적용 전 · 후 비교 (왼쪽 = 적용 전, 오른쪽 = 적용 후) */
  compare?: DetailCompare;
  /** 구현 항목 */
  bullets?: { label: string; text: string }[];
  media?: MediaSlot[];
  /** 근거가 되는 til post id (til.generated.ts) */
  posts?: string[];
  /**
   * posts 묶음의 제목. 기본값은 "그때 공부한 것"입니다.
   * 프로젝트보다 나중에 정리한 글이라면 문구를 바꿔주세요.
   */
  postsLabel?: string;
  /** 학습 노트에는 없는 블로그 글 직접 링크 */
  blogPosts?: { title: string; url: string }[];
};

/** 트러블 슈팅도 섹션과 같은 골자(문제 → 가설 → 해결 → 결과)로 읽히게 맞춥니다. */
export type Troubleshoot = {
  title: string;
  /** 문제 — 겉으로 드러난 증상 */
  problem: string;
  /** 가설 — 원인을 무엇이라고 추론했는가 */
  cause: string;
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
  /** 개요 섹션에 들어가는 이미지 */
  overviewMedia?: MediaSlot;
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

export const projects: Project[] = [
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
      "렌더링 — Custom Depth 툰 셰이딩 · 외곽선, 하드웨어 커서 전환",
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
      overview: [
        "10분 안에 열차를 목적지까지 몰고 가야 하는 시민, 그것을 막아야 하는 마피아. 어몽어스식 마피아를 뿌리로 삼되 무거운 추리를 걷어내고 도착 여부라는 단순한 목표 아래 파티 게임의 재미에 집중한 3D 멀티플레이 액션입니다.",
        "퀘스트를 완료한 인원이 많을수록 열차가 빨라지고(전원 완료 시 2배속), 마피아는 압력 밸브와 기어를 망가뜨려 열차를 멈춰 세웁니다. 근접 보이스 채팅이 필수라 누가 어디서 무슨 말을 했는지가 그대로 증거가 됩니다.",
      ],
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
          text: "툰 셰이딩 · 외곽선 포스트 프로세스, 메인 메뉴, 하드웨어 커서 전환, HUD 머티리얼",
        },
      ],

      keyArt: {
        src: "/projects/gears-of-deceit/key-art.png",
        alt: "Gears of Deceit 타이틀 아트",
        caption: "달리는 열차 위, 10분간의 심리전",
        hint: "게임 대표 컷",
        aspect: "16/9",
      },
      overviewMedia: {
        src: "/projects/gears-of-deceit/design-direction.png",
        alt: "기획 방향 전환 다이어그램",
        caption:
          "총 기반 서부 마피아 → 회의 시스템 도입 → 추리를 걷어내고 '도착 여부'로 단순화",
        hint: "기획 방향",
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
          lead: "게임플레이보다 먼저 세운 것은 방에 들어가진다는 최소 조건이었습니다.",
          flow: {
            problem:
              "재참여 시 방 목록이 비고, 만들지 않은 방이 섞이고, 강제 종료한 방이 계속 살아 있었습니다.",
            hypothesis:
              "증상은 비슷해도 원인 계층이 다르다고 봤습니다 — 종료 경로(게임) · 공용 AppID(플랫폼) · 세션 잔존(수명).",
            solution:
              "계층별로 처방을 따로 붙였습니다. 종료 경로 연결 + 검색 워치독, BUILD_ID 서명 필터, 30분 나이 필터.",
            result:
              "재참여 · 검색 · 강제 종료 어느 경로에서도 방 목록이 깨지지 않고, Shipping 빌드에서도 동일하게 동작합니다.",
          },
          table: {
            caption:
              "세 증상을 하나로 뭉뚱그리지 않고, 원인 계층별로 분리해 처방했습니다.",
            headers: ["증상", "원인", "처방"],
            rows: [
              [
                "재참여 시 방 목록이 빔",
                "ESC 종료가 세션 정리를 우회",
                "종료 경로를 LoadMainMenu에 연결 · 검색 워치독",
              ],
              [
                "모르는 방이 섞임",
                "Steam 공용 테스트 AppID(480) 공유",
                "BUILD_ID 서명으로 우리 빌드만 통과",
              ],
              [
                "유령 방이 남음",
                "비정상 종료로 세션이 잔존",
                "생성 후 30분 경과 세션은 목록에서 제외",
              ],
            ],
          },
          bullets: [
            { label: "세션 구성", text: "PlayerGameInstance + Steam OSS + AdvancedSessions" },
            { label: "경계", text: "UI는 메뉴 인터페이스만 알고 OSS를 직접 다루지 않음" },
            {
              label: "Shipping",
              text: "OSS 초기화 실패 대응, Null 서브시스템에서 클라이언트 ServerTravel 차단",
            },
          ],
          media: [
            {
              src: "/projects/gears-of-deceit/lobby.png",
              alt: "게임 내 서버 목록 화면",
              caption: "직접 만든 SERVER LIST 화면 — 호스트와 접속 인원이 함께 표시된다",
              hint: "방 목록 화면",
              aspect: "4/3",
            },
            {
              src: "/projects/gears-of-deceit/session.png",
              alt: "멀티플레이 세션 구성 설명 슬라이드",
              caption: "PlayerGameInstance + Steam OSS + AdvancedSessions 구성",
              hint: "세션 구조",
              aspect: "16/9",
            },
          ],
          posts: ["cs-33", "cs-30", "cs-23", "cs-24"],
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
          lead: "소셜 디덕션에서 들리는 범위는 편의 기능이 아니라 게임 규칙입니다.",
          flow: {
            problem:
              "전원에게 항상 목소리가 들리면 알리바이라는 개념이 사라져 추리가 성립하지 않습니다.",
            hypothesis:
              "위치 기반 감쇠만으로는 벽 · 생사 같은 규칙상의 경계를 가를 수 없다고 봤습니다.",
            solution:
              "거리 감쇠(공간)와 채널 분리(규칙)를 겹쳐 적용하고, 상태가 바뀌는 시점에 채널을 재배정했습니다.",
            result:
              "같은 칸에 있어야 대화가 되고 비밀방 대화는 밖으로 새지 않습니다. 위치와 발화가 그대로 증거가 됩니다.",
          },
          table: {
            caption: "누구에게 들리는가를 코드 분기가 아니라 채널 규칙으로 관리했습니다.",
            headers: ["상황", "들리는 대상", "의도"],
            rows: [
              ["같은 칸 · 근접", "반경 안의 생존자", "알리바이 성립"],
              ["비밀방 내부", "같은 방 인원만", "밀담 보장 · 외부 유출 차단"],
              ["사망", "사망자끼리만", "관전자가 정보를 흘리지 못하게"],
            ],
          },
          bullets: [
            { label: "근접 보이스", text: "거리 감쇠로 같은 칸 안에서만 대화 성립" },
            { label: "채널 격리", text: "진입 시 별도 채널로 전환, 이탈 시 복귀" },
            { label: "상태 동기화", text: "플레이어별 발화 상태를 UI에 반영" },
          ],
          media: [
            {
              // https://www.youtube.com/watch?v=d1UV0k-tygk
              youtubeId: "d1UV0k-tygk",
              src: "/projects/gears-of-deceit/patrol-poster.jpg",
              alt: "순찰자 시점 플레이 — 두 플레이어가 마주친 순간",
              caption:
                "순찰자 시점 플레이 — 근접 보이스가 걸린 상태에서 다른 플레이어와 마주치는 순간",
              hint: "플레이 영상",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/voice.jpg",
              alt: "보이스·세션 시연 영상의 인게임 화면",
              caption: "역할(마피아)과 어빌리티 슬롯이 함께 보이는 화면",
              hint: "보이스 시연 장면",
              aspect: "16/9",
            },
          ],
          posts: ["cs-28", "cs-26", "ui-01"],
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
          lead: "무대 전체가 계속 이동한다는 설정은 낭만적이지만, 구현에서는 거의 모든 것을 흔듭니다.",
          flow: {
            problem:
              "열차 속도가 곧 승패인데, 그 위에 선 캐릭터가 함께 실려 가지 않고 제자리에 남았습니다.",
            hypothesis:
              "속도는 서버가 소유해야 할 값이고, 탑승 문제는 엔진의 Movement Base 자동 해제가 원인이라고 봤습니다.",
            solution:
              "주행 속도를 서버 권위로 두어 복제하고, 발판에 Base를 강제 바인딩해 이동 벡터를 계속 받게 했습니다.",
            result:
              "주행 중인 지붕 위에서도 이동 · 전투가 성립하고, 속도 규칙이 전원에게 같은 값으로 보입니다.",
          },
          table: {
            caption:
              "속도를 협력의 결과로 두어, 퀘스트 진행도가 그대로 승패로 이어지게 했습니다.",
            headers: ["조건", "속도", "의도"],
            rows: [
              ["퀘스트 완료 인원 비례", "1.0 + (완료 / 유효 인원)", "진행도 = 속도"],
              ["전원 완료", "×2.0", "협력의 최대 보상"],
              ["기어 적재 중", "감속", "운반에 리스크 부여"],
              ["압력 밸브 파손", "정지", "마피아의 방해 수단"],
            ],
          },
          bullets: [
            { label: "주행", text: "스플라인 기반 이동, 서버 권위로 속도 관리" },
            { label: "탑승 유지", text: "SetBase()로 캐릭터의 Base를 발판에 강제 바인딩" },
            { label: "안전 처리", text: "탈선 방지 콜라이더, 시작 위치 고정" },
          ],
          media: [
            {
              src: "/projects/gears-of-deceit/train.png",
              alt: "설원을 가로지르는 열차 전경",
              caption: "스플라인을 따라 설원을 가로지르는 열차 '베헤모스'",
              hint: "열차 주행 장면",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/train-roof.jpg",
              alt: "주행 중인 열차 지붕 위를 달리는 캐릭터",
              caption: "주행 중인 열차 지붕 — 바닥이 계속 움직이는 상태에서의 이동",
              hint: "열차 지붕",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/quest-speed.png",
              alt: "퀘스트 완료와 열차 속도의 관계 슬라이드",
              caption: "속도 배율 = 1.0 + (완료 인원 / 유효 인원) — 전원 완료 시 2배속",
              hint: "속도 규칙",
              aspect: "16/9",
            },
          ],
          posts: ["cs-25", "cs-27", "cs-17"],
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
          lead: "룩을 만드는 파이프라인과 상호작용을 알려주는 파이프라인을 하나로 합쳤습니다.",
          flow: {
            problem:
              "스팀펑크 룩을 위한 외곽선과, 조작 가능한 오브젝트 하이라이트가 각각 필요했습니다.",
            hypothesis:
              "둘 다 결국 실루엣을 뽑는 일이므로 Custom Depth 스텐실 하나로 겸할 수 있다고 봤습니다.",
            solution:
              "Custom Depth 기반 외곽선 · 셀 셰이딩을 포스트 프로세스로 구성하고, 같은 스텐실 값으로 하이라이트를 분기했습니다.",
            result:
              "룩과 상호작용 표현이 한 파이프라인에서 나와, 오브젝트에 플래그만 켜면 둘 다 적용됩니다.",
          },
          bullets: [
            { label: "툰 셰이딩", text: "Custom Depth 외곽선 + 셀 셰이딩 포스트 프로세스" },
            {
              label: "상호작용 강조",
              text: "같은 스텐실 파이프라인으로 조작 가능한 오브젝트 하이라이트",
            },
            { label: "HUD", text: "진행바 · 압력 게이지 · 연료 표시 머티리얼과 UI 애니메이션" },
            { label: "커서", text: "소프트웨어 → 하드웨어 전환 (아래 트러블 슈팅 참고)" },
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
              src: "/projects/gears-of-deceit/toon.png",
              alt: "툰 셰이딩과 외곽선이 적용된 게임 화면",
              caption: "적용 후 — 셀 셰이딩과 외곽선으로 실루엣이 분리된다",
              hint: "적용 후 화면",
              aspect: "16/9",
            },
          },
          posts: ["cs-37", "ui-00", "ui-01"],
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
            "재참여 시 방 목록이 비고, 만들지 않은 방이 검색되고, 강제 종료한 방이 계속 살아 있었습니다.",
          cause:
            "증상 세 개의 원인 계층이 각각 다르다고 봤습니다 — ESC 종료가 세션 정리를 우회 / Steam 공용 테스트 AppID(480) 공유 / 비정상 종료로 세션 잔존",
          fix: "종료 경로를 LoadMainMenu에 연결 + 검색 워치독, BUILD_ID 서명 필터, 30분 나이 필터",
          result: "어느 경로로 나가도 방 목록이 정상 상태로 복귀합니다.",
          lesson: "세 증상이 비슷해 보여도 원인이 다르면 처방도 따로 붙여야 한다.",
          postUrl: "https://blog.naver.com/startblack7/224352390229",
        },
        {
          mine: true,
          title: "죽은 플레이어의 목소리가 산 사람에게 들림",
          problem: "사망한 플레이어의 발언이 생존자에게 그대로 전달돼 추리가 무의미해졌습니다.",
          cause:
            "보이스 채널이 위치만 기준으로 동작해, 생사와 비밀방 같은 게임 규칙상의 경계를 반영하지 못한 것으로 추론했습니다.",
          fix: "생사 · 공간을 기준으로 채널을 분리하고, 상태가 바뀌는 시점에 채널을 재배정",
          result: "관전자가 정보를 흘릴 수 없게 되어 규칙이 다시 성립했습니다.",
          lesson:
            "소셜 디덕션에서 들리는 범위는 편의 기능이 아니라 규칙이다. 규칙이 새면 게임이 무너진다.",
          postUrl: "https://blog.naver.com/startblack7/224335734651",
        },
        {
          mine: true,
          title: "움직이는 열차 위에서 캐릭터가 반대로 밀려 떨어짐",
          problem: "지붕에서 등반이나 상호작용을 하면 캐릭터만 제자리에 남고 열차가 빠져나갔습니다.",
          cause:
            "해당 동작 진입 시 엔진이 Movement Base를 자동 해제해 관성이 끊긴 것으로 추론했습니다.",
          fix: "SetBase()로 캐릭터의 Base를 발판에 강제 바인딩해 열차의 이동 벡터를 다시 받도록 처리",
          result: "주행 중에도 지붕 위 이동 · 전투가 유지됩니다.",
          lesson: "움직이는 바닥 위에서는 '가만히 있는 것'도 매 프레임 계산해야 하는 상태다.",
          postUrl: "https://blog.naver.com/startblack7/224332228398",
        },
        {
          mine: true,
          title: "소프트웨어 커서로 인한 프레임 병목과 클릭 오차",
          problem: "UI 조작 중 주기적인 프리징이 생기고, 커서를 교체한 뒤에는 클릭 지점이 어긋났습니다.",
          cause:
            "UMG 소프트웨어 커서가 매 프레임 메인/Slate 스레드를 동기화 / 비대칭 커서의 시각적 조준점과 클릭점(0,0) 불일치",
          fix: "하드웨어 커서로 전면 교체 후 피벗 · 렌더 트랜스폼 오프셋으로 조준점 보정",
          result: "프레임 병목이 사라지고 조준점과 실제 클릭 지점이 일치합니다.",
          lesson: "성능을 고치자 조작감 문제가 드러났다. 교체는 대체로 새 문제를 데려온다.",
        },
        {
          mine: false,
          title: "호스트만 캐릭터 스킨이 적용되지 않음",
          problem: "클라이언트는 정상인데 리슨 호스트만 선택한 스킨이 반영되지 않았습니다.",
          cause:
            "스킨 전송을 BeginPlay · OnRep_Controller에 연결했으나, 리슨 호스트는 BeginPlay가 빙의보다 먼저 실행되고 OnRep_Controller는 서버에서 호출되지 않는 것이 원인이었습니다.",
          fix: "서버 빙의 시점인 PossessedBy에서 전송 (중복 1회 가드)",
          result: "호스트 · 클라이언트 모두 같은 시점에 스킨이 적용됩니다.",
          lesson: "초기화 타이밍은 서버 · 클라이언트 · 리슨 호스트가 각각 다르다.",
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
            { label: "규모", value: "C++ 141파일" },
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

      keyArt: {
        // 74초짜리 짧은 영상이라 유튜브 대신 직접 올렸습니다 (8.5MB)
        video: "/projects/destination/demo.mp4",
        src: "/projects/destination/key-art.jpg",
        alt: "DESTINATION 플레이 영상",
        caption: "플레이 영상 — 웨이브를 버티며 폐허가 된 도시를 이동한다",
        hint: "대표 화면",
        aspect: "16/9",
      },
      overviewMedia: {
        src: "/projects/destination/city.jpg",
        alt: "폐허가 된 도시",
        caption: "안개가 깔린 폐허 도시 — 좌상단은 남은 적 수와 웨이브 타이머",
        hint: "맵 전경",
        aspect: "16/9",
      },
      // 영상은 위에서 바로 재생되므로 원문 글만 링크로 남깁니다
      youtubeId: null,

      sections: [
        {
          id: "network",
          kind: "feature",
          eyebrow: "01 · 네트워크",
          title: "Steam OSS 세션과 서버 권위 구조 구현",
          lead: "멀티플레이 게임은 전투가 아무리 좋아도 방에 못 들어가면 아무것도 아닙니다.",
          flow: {
            problem:
              "게임플레이를 먼저 붙이면 UI가 온라인 서브시스템에 직접 묶이고, 승패 값이 클라이언트로 흩어집니다.",
            hypothesis:
              "세션을 먼저 세우고 UI와 OSS 사이에 인터페이스를 끼워야 나중에 흔들리지 않는다고 봤습니다.",
            solution:
              "GameInstance가 세션을 전담하고 위젯은 IMenuInterface만 호출하게 했습니다. 승패에 직결되는 값은 서버가 소유하고 복제합니다.",
            result:
              "UI가 OSS를 몰라도 되고, 로비 → 본 게임 전환과 나가기가 같은 인터페이스로 처리됩니다.",
          },
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
          posts: ["cs-33", "cs-30", "cs-22"],
          postsLabel: "관련해서 정리한 개념",
        },
        {
          id: "combat",
          kind: "feature",
          eyebrow: "02 · 전투",
          title: "ExecCalc 단일 데미지 파이프라인 구현",
          lead: "무기가 늘어도 맞으면 얼마가 깎이는지는 한 곳에서만 결정되게 했습니다.",
          flow: {
            problem:
              "샷건 · 스나이퍼 · 바주카 · 미니건이 각자 데미지를 계산하면, 밸런스를 잡을 때 어디를 고쳐야 할지 알 수 없습니다.",
            hypothesis:
              "무기별로 달라야 하는 것은 발사 방식까지이고, 피해 계산은 공통 규칙이라고 봤습니다.",
            solution:
              "GameplayEffect 하나가 ExecCalc로 피해를 계산하고, 어빌리티는 원본값만 SetByCaller로 실어 보냅니다.",
            result:
              "새 무기를 추가할 때 계산 로직을 다시 구현하지 않습니다. 적 어빌리티도 같은 경로를 씁니다.",
          },
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
          posts: ["cs-27", "cs-26"],
          postsLabel: "관련해서 정리한 개념",
        },
        {
          id: "items",
          kind: "feature",
          eyebrow: "03 · 아이템",
          title: "FastArraySerializer 인벤토리 · 장비 구현",
          lead: "아이템 하나가 바뀔 때 배열 전체가 다시 날아가지 않게 하는 것이 목표였습니다.",
          flow: {
            problem:
              "배열을 통째로 복제하면 인벤토리가 커질수록 트래픽이 비례해서 늘어납니다.",
            hypothesis:
              "바뀐 항목만 식별할 수 있으면 아이템 수와 네트워크 비용을 분리할 수 있다고 봤습니다.",
            solution:
              "FastArraySerializer로 델타 복제하고 항목마다 고유 ID를 부여했습니다. 장비는 정의와 인스턴스를 분리했습니다.",
            result:
              "아이템이 늘어도 트래픽이 따라 늘지 않고, 장착 · 해제가 대칭이라 스탯이 새지 않습니다.",
          },
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
          posts: ["cs-34", "cs-27"],
          postsLabel: "관련해서 정리한 개념",
        },
        {
          id: "optimize",
          kind: "feature",
          eyebrow: "04 · 최적화 · 성장",
          title: "AI 컨트롤러 풀링과 능력 카드 성장 구현",
          lead: "웨이브 게임의 재미는 점점 많아지는 것인데, 구현에서는 그게 그대로 비용입니다.",
          flow: {
            problem:
              "좀비가 스폰될 때마다 AI 컨트롤러를 새로 만들면 웨이브가 몰리는 순간 프레임이 흔들립니다.",
            hypothesis:
              "필요한 컨트롤러의 최대 수는 시작 시점에 계산할 수 있으므로, 생성 비용을 런타임 밖으로 뺄 수 있다고 봤습니다.",
            solution:
              "맵의 모든 스포너 필요 수를 합산해 미리 생성하고, 대기 중에는 Tick · 가시성을 끈 채 빌려 씁니다.",
            result:
              "웨이브 중 스폰 비용이 사라지고, 좀비가 죽으면 빙의만 풀어 다시 풀로 돌아갑니다.",
          },
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
          posts: ["gas-10", "cs-18"],
          postsLabel: "관련해서 정리한 개념",
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
