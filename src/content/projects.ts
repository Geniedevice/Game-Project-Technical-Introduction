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
            "네 가지 요청을 GameInstance 한 곳이 전담합니다. 메뉴 위젯은 인터페이스로 요청만 보내고 결과는 델리게이트로 돌려받아, UI가 온라인 서브시스템을 직접 다루지 않습니다. 세션을 어떻게 만드는지 바뀌어도 위젯은 손대지 않습니다.",
            "네 요청 모두 비동기라 요청과 결과가 분리됩니다. 요청을 보낸 뒤 완료 델리게이트를 받아 다음 단계로 넘어가고, 화면은 그동안 대기 상태를 유지합니다.",
          ],
          table: {
            caption: "네 요청이 각각 무엇을 싣고 무엇으로 이어지는지.",
            headers: ["기능", "요청에 싣는 것", "완료 후"],
            rows: [
              [
                "방 생성",
                "최대 인원 · 공개 여부 · 빌드 서명",
                "세션 생성 → 로비 레벨로 ServerTravel",
              ],
              [
                "검색",
                "빌드 서명 · 생성 시각 필터",
                "조건에 맞는 방만 서버 목록에 표시",
              ],
              ["참가", "목록에서 고른 세션", "접속 주소를 받아 ClientTravel"],
              ["나가기", "현재 세션 핸들", "세션 파기 → 메인 메뉴 레벨 로드"],
            ],
          },
          bullets: [
            { label: "세션 구성", text: "PlayerGameInstance + Steam OSS + AdvancedSessions" },
            { label: "경계", text: "UI는 메뉴 인터페이스만 알고 OSS를 직접 다루지 않음" },
            {
              label: "검색 필터",
              text: "빌드 서명이 같고 생성한 지 30분이 안 된 방만 목록에 올림",
            },
            { label: "로비", text: "접속 인원과 호스트를 서버 목록에 표시, 정원이 차면 시작" },
            {
              label: "Shipping",
              text: "OSS 초기화 실패 대응, Null 서브시스템에서 클라이언트 ServerTravel 차단",
            },
          ],
          // 왼쪽이 정상 동작, 오른쪽이 필터를 걸기 전의 증상입니다
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
          lead: "거리 감쇠로 목소리가 닿는 범위를 좁혀, 누가 어디 있었는지가 추리 재료가 되게 했습니다.",
          body: [
            "보이스 컴포넌트에 감쇠 설정(SA_Voice)을 물렸습니다. 반경 100 안에서는 원음 그대로 들리고 거리가 멀어질수록 줄어들다 400을 넘으면 들리지 않습니다. 옆 칸 사람의 말은 닿지 않으므로 어디에 있었는지가 곧 알리바이가 됩니다.",
            "여기에 채널 분리를 겹쳤습니다. 비밀방에 들어가면 별도 채널로 옮겨 바깥과 끊고, 사망하면 사망자 채널로 옮깁니다. 상태가 바뀌는 시점마다 채널을 다시 배정합니다.",
          ],
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
          lead: "주행 중 흔들림과 위치 동기화로 달리는 무대를 구현했습니다.",
          body: [
            "열차는 스플라인을 따라 달립니다. 속도와 위치는 서버가 소유해 전원에게 복제하므로 모든 클라이언트가 같은 지점의 열차를 봅니다. 속도는 퀘스트 완료 인원과 적재 무게가 함께 움직입니다.",
            "여기에 주행 중 흔들림을 더해 달리고 있다는 감각을 만들고, 그 위에 선 캐릭터는 SetBase()로 발판에 묶어 등반이나 상호작용 중에도 열차의 이동 벡터를 계속 받도록 했습니다.",
          ],
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
            { label: "주행", text: "스플라인 기반 이동, 서버 권위로 속도 · 위치 관리" },
            { label: "주행 연출", text: "달리는 동안 흔들림을 더해 속도감 부여" },
            { label: "탑승 유지", text: "SetBase()로 캐릭터의 Base를 발판에 강제 바인딩" },
            { label: "안전 처리", text: "탈선 방지 콜라이더, 시작 위치 고정" },
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
          lead: "룩은 셀 셰이딩으로, 상호작용 표시는 뎁스 스텐실로 구현했습니다.",
          body: [
            "룩은 포스트 프로세스에서 셀 셰이딩으로 만듭니다. 라이팅 결과를 단계로 끊어 명암이 계단처럼 떨어지게 하고, 외곽선을 더해 스팀펑크 톤을 맞췄습니다.",
            "상호작용 표시는 뎁스 스텐실을 씁니다. 조작 가능한 오브젝트의 Custom Depth를 켜고 스텐실 값을 주면 포스트 프로세스가 그 값을 가진 픽셀만 골라 외곽선을 그립니다. 새 오브젝트는 플래그만 켜면 표시가 붙습니다.",
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
          posts: ["cs-33", "cs-30", "cs-22"],
          postsLabel: "관련해서 정리한 개념",
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
          posts: ["cs-27", "cs-26"],
          postsLabel: "관련해서 정리한 개념",
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
          posts: ["cs-34", "cs-27"],
          postsLabel: "관련해서 정리한 개념",
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
