/**
 * 프로젝트.
 *
 * 내용은 실제 저장소(README · 기획서 · 커밋 이력)와
 * BaseStudyNote의 학습 기록에서 확인 가능한 사실만 적었습니다.
 *
 * `results`에는 지어낸 수치 대신 "실제로 구현한 것"을 적었습니다.
 * 측정한 수치가 생기면 그때 바꾸는 편이 설득력 있습니다.
 *
 * relatedPosts / posts 는 til.generated.ts의 id를 참조합니다. (근거 링크)
 */
import { getSeries, totalPostCount } from "./til";

// 학습 기록에서 계산합니다 — npm run sync:til 하면 자동으로 따라옵니다
const algoCount = getSeries("algo")?.posts.length ?? 0;
const csCount = getSeries("cs")?.posts.length ?? 0;

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

export type DetailSection = {
  id: string;
  eyebrow: string;
  title: string;
  /** 한 문장 요약 */
  lead: string;
  /** 본문 문단 */
  body: string[];
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

export type Troubleshoot = {
  title: string;
  cause: string;
  fix: string;
  lesson?: string;
  /** 본인이 직접 해결한 것인지 (팀원 해결과 구분) */
  mine: boolean;
  /** 과정을 기록한 블로그 글 */
  postUrl?: string;
};

export type ProjectDetail = {
  /** 상세 페이지 상단 요약 */
  overview: string[];
  /** 게임 자체에 대한 사실 */
  facts: { label: string; value: string }[];
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
  /** 목록의 아이콘 (src/components/project/ProjectIcon.tsx) */
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
    icon: "gear",
    label: "Unreal · 팀 5인",
    period: "2026.06 – 2026.07",
    role: "네트워크 · 열차 시스템 · 렌더링 / UI",
    teamSize: "5인 팀 (커밋 54회 기여)",
    stack: ["Unreal Engine 5", "C++", "GAS", "Steam OSS", "VOIP"],
    problem:
      "5명이 같은 열차 위에서 서로를 의심하는 게임입니다. 그런데 누가 어디서 무슨 말을 했는지가 승패를 가르는 장르에서, 세션이 불안정하거나 목소리가 엉뚱한 곳까지 들리면 게임 자체가 성립하지 않습니다.",
    approach: [
      "Steam OSS와 AdvancedSessions로 로비를 세우고, 방이 뜨지 않거나 남의 방이 섞이는 문제를 필터 단위로 잡았습니다",
      "거리 감쇠 보이스를 붙이고, 비밀방에 들어간 플레이어의 목소리를 별도 채널로 격리했습니다",
      "열차를 스플라인 위에서 주행시키고, 그 위에 선 캐릭터가 함께 이동하도록 Movement Base를 정리했습니다",
      "Custom Depth 기반 툰 셰이딩과 외곽선을 넣고, 프리징을 유발하던 소프트웨어 커서를 하드웨어 커서로 교체했습니다",
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
        "10분 안에 열차를 목적지까지 몰고 가야 하는 시민, 그것을 막아야 하는 마피아. 어몽어스식 마피아를 뿌리로 삼되 무거운 추리를 걷어내고 “도착하느냐 마느냐”라는 단순한 목표 아래 파티 게임의 정신없는 재미에 집중한 3D 멀티플레이 액션입니다.",
        "퀘스트를 완료한 인원이 많을수록 열차가 빨라지고(전원 완료 시 2배속), 마피아는 압력 밸브와 기어를 망가뜨려 열차를 멈춰 세웁니다. 근접 보이스 채팅이 필수라 “누가 어디서 무슨 말을 했는가”가 그대로 증거가 됩니다.",
      ],
      facts: [
        { label: "장르", value: "3D 소셜 디덕션 파티 액션" },
        { label: "인원", value: "5인 고정 멀티플레이" },
        { label: "플랫폼", value: "PC (Steam)" },
        { label: "한 판", value: "10분" },
      ],
      teamNote:
        "5인 팀 프로젝트입니다. 아래 “제가 맡은 부분”은 커밋 이력으로 확인 가능한 본인 작업이며, 그 밖의 시스템(미니게임 7종, 동물 스킨, 역할별 어빌리티 등)은 팀원들이 담당했습니다.",

      myScope: [
        {
          title: "멀티플레이 세션",
          text: "Steam OSS · AdvancedSessions 기반 로비 생성/참가, 세션 리팩토링, Shipping 빌드 대응",
        },
        {
          title: "보이스 채팅",
          text: "거리 감쇠 보이스, 비밀방 보이스 격리, VoiceChannelSubsystem 연동",
        },
        {
          title: "열차 시스템",
          text: "스플라인 주행, 적재 무게에 따른 감속, 탈선 방지 처리",
        },
        {
          title: "렌더링 · UI",
          text: "툰 셰이딩과 외곽선 포스트 프로세스, 메인 메뉴, 하드웨어 커서 전환, HUD 머티리얼",
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
          eyebrow: "01 · 네트워크",
          title: "방이 안 뜨고, 모르는 방이 섞이고, 유령 방이 남았다",
          lead: "멀티플레이 게임에서 가장 먼저 부딪히는 벽은 게임플레이가 아니라 “방에 들어가지지가 않는다”였습니다.",
          body: [
            "테스트를 돌릴 때마다 세 종류의 문제가 반복됐습니다. 한 번 나갔다가 다시 들어오면 방 목록에 아무것도 안 뜨고, 어떨 때는 우리가 만들지 않은 방이 목록에 섞여 있고, 강제 종료한 방이 계속 살아 있는 것처럼 보였습니다.",
            "원인이 각각 달랐습니다. 첫 번째는 ESC로 나가는 경로가 세션 정리를 건너뛰고 있었던 것이고, 두 번째는 Steam 공용 테스트 AppID(480)를 쓰는 다른 개발자들의 방까지 검색에 잡힌 것이었습니다. 세 번째는 정상 종료되지 못한 세션이 그대로 남은 것이었습니다.",
            "각각에 맞는 처방을 따로 붙였습니다. 나가기 경로를 메인 메뉴 로드에 연결하고 검색 워치독과 가드 리셋을 넣었고, BUILD_ID 서명으로 우리 빌드의 방만 통과시켰으며, 생성된 지 30분이 넘은 세션은 목록에서 걸러냈습니다.",
          ],
          bullets: [
            { label: "재참여 시 방 안 뜸", text: "ESC 종료 경로를 LoadMainMenu에 연결 + 검색 워치독 · 가드 리셋" },
            { label: "모르는 방이 섞임", text: "공용 AppID 480 공유 문제 → BUILD_ID 서명 필터로 차단" },
            { label: "유령 방", text: "강제 종료로 남은 세션을 30분 나이 필터로 제거" },
            { label: "Shipping 빌드", text: "OSS 초기화 실패 대응, Null 서브시스템 환경에서 클라이언트 ServerTravel 차단" },
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
          eyebrow: "02 · 보이스",
          title: "목소리가 들리는 범위가 곧 게임 규칙이 된다",
          lead: "소셜 디덕션에서 보이스 채팅은 편의 기능이 아니라 핵심 메커닉입니다.",
          body: [
            "전원에게 항상 목소리가 들리면 알리바이라는 개념 자체가 사라집니다. 그래서 거리에 따라 감쇠하는 근접 보이스를 적용해, 같은 칸에 있어야 대화가 가능하도록 만들었습니다. 누가 어디에 있었는지가 소리로 드러나야 추리가 성립하기 때문입니다.",
            "여기에 비밀방 규칙이 겹쳤습니다. 특정 공간에 들어간 플레이어들은 바깥과 완전히 분리된 채로 대화할 수 있어야 했고, 반대로 바깥에서는 그 대화가 새어 나오면 안 됐습니다. 위치 기반 감쇠만으로는 벽을 사이에 둔 두 사람을 확실히 갈라놓을 수 없어서, 채널을 별도로 두고 진입·이탈 시점에 갈아 끼우는 방식으로 처리했습니다.",
          ],
          bullets: [
            { label: "근접 보이스", text: "거리 감쇠를 적용해 같은 칸 안에서만 대화가 성립" },
            { label: "채널 격리", text: "비밀방 진입 시 별도 채널로 전환, 이탈 시 복귀" },
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
          eyebrow: "03 · 열차",
          title: "움직이는 바닥 위에서 게임을 성립시키기",
          lead: "무대 전체가 계속 이동한다는 설정은 낭만적이지만, 구현에서는 거의 모든 것을 흔듭니다.",
          body: [
            "열차는 스플라인을 따라 주행하고, 그 속도는 퀘스트 완료 인원과 적재 무게에 함께 반응합니다. 사람들이 일을 잘하면 빨라지고, 무거운 기어를 들고 다니면 느려집니다. 속도가 곧 승패이므로 이 값은 서버에서 관리하고 전원에게 동기화해야 했습니다.",
            "진짜 문제는 그 위에 선 캐릭터였습니다. 열차가 움직이는 동안 캐릭터가 함께 실려 가려면 Movement Base가 유지되어야 하는데, 특정 상황에서 엔진이 이를 자동으로 해제하면서 캐릭터만 제자리에 남고 열차가 빠져나가는 현상이 생겼습니다. 탈선 방지 콜라이더와 시작 위치 고정도 같은 맥락에서 필요했습니다.",
          ],
          bullets: [
            { label: "주행", text: "스플라인 기반 이동, 서버 권위로 속도 관리" },
            { label: "속도 규칙", text: "퀘스트 완료 인원과 적재 무게에 연동 (전원 완료 시 2배속)" },
            { label: "탑승 처리", text: "Movement Base 유지, 탈선 방지 콜라이더, 시작 위치 고정" },
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
          eyebrow: "04 · 렌더링 · UI",
          title: "손그림 같은 룩과, 프레임을 갉아먹던 커서",
          lead: "보기 좋은 화면을 만드는 일과 화면이 부드럽게 도는 일은 서로 다른 문제였습니다.",
          body: [
            "스팀펑크 세계관에 맞춰 Custom Depth를 이용한 툰 셰이딩과 외곽선을 포스트 프로세스로 구성했습니다. 메시의 Custom Render Depth를 켜고 스텐실 값을 주면 외곽선이 잡히는 구조라, 상호작용 가능한 오브젝트를 강조하는 데에도 같은 파이프라인을 재사용했습니다.",
            "UI 쪽에서는 성능 문제가 하나 있었습니다. UMG의 소프트웨어 커서가 매 프레임 메인 스레드와 Slate 스레드를 동기화하면서 프리징을 유발하고 있었습니다. 하드웨어 커서로 전면 교체해 해결했는데, 이번에는 장갑이나 빗자루처럼 비대칭인 커서 이미지에서 시각적 조준점과 실제 클릭 지점(0,0)이 어긋나는 문제가 따라왔습니다. 피벗과 렌더 트랜스폼 오프셋으로 보정했습니다.",
          ],
          bullets: [
            { label: "툰 셰이딩", text: "Custom Depth 기반 외곽선과 셀 셰이딩 포스트 프로세스" },
            { label: "상호작용 강조", text: "같은 스텐실 파이프라인으로 조작 가능한 오브젝트 하이라이트" },
            { label: "커서 성능", text: "소프트웨어 → 하드웨어 커서 전환으로 프레임 병목 제거" },
            { label: "HUD", text: "진행바 · 압력 게이지 · 연료 표시 머티리얼과 UI 애니메이션" },
          ],
          media: [
            {
              src: "/projects/gears-of-deceit/toon.png",
              alt: "툰 셰이딩이 적용된 게임 화면",
              caption: "포스트 프로세스로 구성한 셀 셰이딩과 외곽선",
              hint: "툰 셰이딩",
              aspect: "16/9",
            },
            {
              src: "/projects/gears-of-deceit/hud.png",
              alt: "인게임 HUD",
              caption: "남은 시간 · 압력 · 연료 · 퀘스트 진행도를 한 화면에 통합 배치",
              hint: "인게임 HUD",
              aspect: "16/9",
            },
          ],
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
          cause:
            "ESC 종료가 세션 정리를 우회 / Steam 공용 테스트 AppID(480)를 다른 개발자와 공유 / 강제 종료로 세션이 잔존",
          fix: "LoadMainMenu 연결 + 검색 워치독, BUILD_ID 서명 필터, 30분 나이 필터",
          lesson: "세 증상이 비슷해 보여도 원인이 다르면 처방도 따로 붙여야 한다.",
          postUrl: "https://blog.naver.com/startblack7/224352390229",
        },
        {
          mine: true,
          title: "죽은 플레이어의 목소리가 산 사람에게 들림",
          cause:
            "보이스 채널이 위치만 기준으로 동작해, 사망 상태와 비밀방 같은 게임 규칙상의 경계를 반영하지 못함",
          fix: "생사와 공간을 기준으로 채널을 분리하고, 상태가 바뀌는 시점에 채널을 다시 배정",
          lesson:
            "소셜 디덕션에서 들리는 범위는 편의 기능이 아니라 규칙이다. 규칙이 새면 게임이 무너진다.",
          postUrl: "https://blog.naver.com/startblack7/224335734651",
        },
        {
          mine: true,
          title: "움직이는 열차 위에서 캐릭터가 반대로 밀려 떨어짐",
          cause:
            "등반·상호작용 진입 시 엔진이 Movement Base를 자동 해제하고 관성이 사라져, 캐릭터만 제자리에 남고 열차는 계속 이동",
          fix: "SetBase()로 캐릭터의 Base를 발판에 강제 바인딩해 열차의 이동 벡터를 다시 받도록 처리",
          lesson: "움직이는 바닥 위에서는 '가만히 있는 것'도 매 프레임 계산해야 하는 상태다.",
          postUrl: "https://blog.naver.com/startblack7/224332228398",
        },
        {
          mine: true,
          title: "소프트웨어 커서로 인한 프레임 병목과 클릭 오차",
          cause:
            "UMG 소프트웨어 커서가 매 프레임 메인/Slate 스레드를 동기화 / 비대칭 커서의 시각적 조준점과 클릭점(0,0) 불일치",
          fix: "하드웨어 커서로 전면 교체 후 피벗·렌더 트랜스폼 오프셋으로 조준점 보정",
          lesson: "성능을 고치자 조작감 문제가 드러났다. 교체는 대체로 새 문제를 데려온다.",
        },
        {
          mine: false,
          title: "호스트만 캐릭터 스킨이 적용되지 않음",
          cause:
            "스킨 전송을 BeginPlay·OnRep_Controller에 연결했으나, 리슨 호스트는 BeginPlay가 빙의보다 먼저 실행되고 OnRep_Controller는 서버에서 호출되지 않음",
          fix: "서버 빙의 시점인 PossessedBy에서 전송 (중복 1회 가드)",
          lesson: "초기화 타이밍은 서버 · 클라이언트 · 리슨 호스트가 각각 다르다.",
        },
      ],
    },
  },
  {
    slug: "destination",
    title: "DESTINATION",
    tagline: "좀비 웨이브를 함께 버티는 3D 멀티플레이 슈터",
    icon: "network",
    label: "Unreal · 개인",
    period: "2025.10",
    role: "전체 설계 및 구현",
    teamSize: "개인 프로젝트",
    stack: ["Unreal Engine 5", "C++", "GAS", "Steam OSS", "Replication"],
    problem:
      "슈터 하나에 필요한 시스템은 전부 서로 얽혀 있습니다. 무기가 늘면 데미지 계산이 흔들리고, 아이템이 늘면 네트워크가 무거워지고, 적이 늘면 프레임이 무너집니다. 각각을 따로 붙이면 결국 어느 하나를 건드릴 때마다 나머지가 깨집니다.",
    approach: [
      "데미지 계산을 GAS의 ExecCalc 한 곳으로 모아, 무기가 몇 종이 되든 계산 경로는 하나만 유지되도록 했습니다",
      "인벤토리와 장비를 FastArraySerializer로 구성해 배열 전체가 아니라 바뀐 항목만 복제되게 했습니다",
      "AI 컨트롤러를 미리 만들어두고 빌려 쓰는 풀로 바꿔, 웨이브 중 스폰 비용을 없앴습니다",
      "무기·아이템·카드 수치를 전부 DataAsset과 DataTable로 빼내 코드 밖에서 조정 가능하게 했습니다",
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
        "혼자 만든 프로젝트라 네트워크부터 전투·아이템·AI·UI까지 전부 직접 설계했습니다. 기능을 늘리는 것보다 “나중에 하나를 바꿔도 나머지가 안 깨지는 구조”를 잡는 데 시간을 더 썼습니다.",
      ],
      facts: [
        { label: "장르", value: "협동 좀비 웨이브 슈터" },
        { label: "규모", value: "개인 프로젝트 (C++ 141파일)" },
        { label: "멀티", value: "Steam OSS 세션" },
        { label: "기간", value: "2025.10" },
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
          eyebrow: "01 · 네트워크",
          title: "먼저 “같이 할 수 있는 상태”부터 만들었다",
          lead: "멀티플레이 게임은 전투가 아무리 좋아도 방에 못 들어가면 아무것도 아닙니다.",
          body: [
            "그래서 게임플레이보다 세션을 먼저 세웠습니다. GameInstance가 세션 인터페이스를 들고 방 생성·검색·참가를 처리하고, 메뉴 위젯은 IMenuInterface를 통해 그 기능만 호출합니다. UI가 온라인 서브시스템을 직접 알지 못하게 막아둔 구조입니다.",
            "로비를 별도 게임 모드와 게임 스테이트로 분리해, 접속 인원이 모이면 본 게임 레벨로 함께 넘어가도록 했습니다. 게임 중 메뉴에서도 같은 인터페이스로 방을 나가고 메인 메뉴로 돌아올 수 있습니다.",
            "판정은 전부 서버가 쥡니다. 스포너의 남은 체력과 웨이브 수처럼 승패에 직결되는 값은 Replicated로 두고, 클라이언트는 RepNotify로 UI만 갱신합니다.",
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
          eyebrow: "02 · 전투",
          title: "무기가 늘어도 데미지 계산은 한 곳에서만",
          lead: "샷건·스나이퍼·바주카·미니건이 각자 데미지를 계산하기 시작하면, 밸런스를 잡는 순간 어디를 고쳐야 할지 알 수 없게 됩니다.",
          body: [
            "그래서 무기별로 다른 것은 발사 방식과 투사체까지로 한정하고, “맞았을 때 얼마가 깎이는가”는 GameplayEffect 하나가 ExecCalc로 처리하도록 통일했습니다. 어빌리티는 데미지 원본값만 SetByCaller로 실어 보냅니다.",
            "계산 순서도 한 곳에 있으니 규칙이 분명해집니다. 공격자의 치명타 확률과 배수를 먼저 적용하고, 대상의 피해 감소를 적용한 뒤, 남은 피해를 실드가 먼저 흡수하고 그다음 체력이 깎입니다. 새 무기를 추가할 때 이 순서를 다시 구현할 일이 없습니다.",
            "체력·실드·피해감소·치명타·마나는 모두 AttributeSet에 RepNotify로 올려, 값이 바뀌면 UI가 따라오게 했습니다.",
          ],
          bullets: [
            { label: "단일 경로", text: "모든 피해가 ExecCalc_Damage 한 곳을 통과" },
            { label: "계산 순서", text: "치명타 → 피해 감소 → 실드 흡수 → 체력" },
            { label: "무기별 차이", text: "발사 방식과 투사체만 어빌리티로 분리 (샷건 · 스나이퍼 · 바주카 · 미니건)" },
            { label: "적 어빌리티", text: "일반 · 원거리 · 보스 좀비도 같은 파이프라인 사용" },
          ],
          posts: ["cs-27", "cs-26"],
          postsLabel: "관련해서 정리한 개념",
        },
        {
          id: "items",
          eyebrow: "03 · 아이템",
          title: "인벤토리가 커질수록 네트워크가 무거워지는 문제",
          lead: "배열 하나를 통째로 복제하면, 아이템 하나만 바뀌어도 전체가 다시 날아갑니다.",
          body: [
            "인벤토리와 장비를 FastArraySerializer로 구성했습니다. 바뀐 항목만 델타로 복제되므로 아이템 수가 늘어도 트래픽이 비례해서 커지지 않습니다. 항목마다 고유 ID를 두어 어떤 칸이 바뀌었는지 클라이언트가 정확히 알 수 있게 했습니다.",
            "장비는 정의(Definition)와 실제로 장착된 인스턴스(Instance)를 나눴습니다. 아이템의 슬롯·희귀도는 GameplayTag로 표현하고, 장착하면 능력치 효과와 어빌리티가 함께 부여됐다가 해제할 때 부여 핸들로 정확히 회수됩니다. 장착과 해제가 대칭이 되어야 스탯이 새지 않기 때문입니다.",
            "UI는 위젯 컨트롤러를 사이에 두어 인벤토리 데이터를 직접 참조하지 않습니다. 데이터가 바뀌면 델리게이트로 알리고, 위젯은 받은 것만 그립니다.",
          ],
          bullets: [
            { label: "복제", text: "FastArraySerializer로 바뀐 항목만 전송" },
            { label: "장비 구조", text: "Definition(설계) / Instance(장착된 실체) 분리" },
            { label: "태그", text: "슬롯 · 희귀도 · 아이템 종류를 GameplayTag로 표현" },
            { label: "UI 분리", text: "WidgetController가 데이터와 위젯 사이를 중재" },
          ],
          posts: ["cs-34", "cs-27"],
          postsLabel: "관련해서 정리한 개념",
        },
        {
          id: "optimize",
          eyebrow: "04 · 최적화와 성장",
          title: "적을 늘리면서 프레임을 지키기",
          lead: "웨이브 게임의 재미는 “점점 많아지는 것”인데, 구현에서는 그게 그대로 비용입니다.",
          body: [
            "좀비가 스폰될 때마다 AI 컨트롤러를 새로 만들면 웨이브가 몰리는 순간 프레임이 흔들립니다. 그래서 맵에 배치된 스포너들의 필요 수를 시작할 때 모두 더해, 그만큼의 컨트롤러를 미리 만들어두고 빌려 쓰는 방식으로 바꿨습니다.",
            "대기 중인 컨트롤러는 Tick과 가시성을 꺼둡니다. 살아 있지만 아무것도 하지 않는 상태로 두었다가, 필요할 때 꺼내 빙의시키고 좀비가 죽으면 빙의를 풀어 다시 풀에 돌려놓습니다.",
            "성장은 웨이브 사이의 카드 선택으로 붙였습니다. 카드 정의는 DataAsset에 두고 런타임 상태만 따로 관리해, 같은 카드를 다시 고르면 레벨이 올라갑니다. 넉백 증가·지속 회복·신규 무기처럼 성격이 다른 보상을 같은 틀에 담을 수 있습니다.",
          ],
          bullets: [
            { label: "AI 풀링", text: "스포너들의 필요 수를 합산해 컨트롤러를 미리 생성" },
            { label: "대기 상태", text: "Tick · 가시성을 끈 채 보관, 빌려줄 때만 활성화" },
            { label: "웨이브", text: "스포너마다 체력 · 웨이브 수 · 스폰 간격을 개별 설정" },
            { label: "성장", text: "능력 카드 선택 · 중복 선택 시 레벨업" },
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
  {
    slug: "fundamentals",
    title: "기본기 트레이닝",
    tagline: `알고리즘 ${algoCount}문제와 CS ${csCount}편 — 매일 쌓은 기록`,
    icon: "nodes",
    label: "알고리즘 · CS",
    period: "2025.10 – 현재",
    role: "자기 주도 학습",
    teamSize: "개인",
    stack: ["C++", "자료구조", "운영체제", "네트워크"],
    problem:
      "엔진 기능은 쓸 줄 알아도 그 아래에서 무슨 일이 벌어지는지는 설명하지 못했습니다. 면접에서든 최적화에서든 결국 막히는 지점이라고 판단했습니다.",
    approach: [
      "자료구조·완전탐색·DFS/BFS·DP·그리디 순으로 문제를 풀고 풀이를 전부 글로 남겼습니다",
      "vector와 list, std::find와 binary_search처럼 '왜 이게 존재하는가'를 묻는 주제를 골라 정리했습니다",
      "프로세스와 스레드, 캐시 히트, 페이지 폴트 같은 CS 개념을 언리얼의 대응 개념(UObject, RTTI, GameThread/RenderThread)과 짝지어 이해했습니다",
    ],
    results: [
      { label: "푼 문제", value: `${algoCount}문제` },
      { label: "CS 정리", value: `${csCount}편` },
      { label: "전체 기록", value: `${totalPostCount}편` },
    ],
    relatedPosts: ["cs-08", "cs-12", "cs-18", "cs-31", "cs-37"],
    links: [
      { label: "학습 노트 저장소", href: "https://github.com/Geniedevice/BaseStudyNote" },
    ],
    surface: "dark",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** 상세 페이지가 있는 프로젝트만 */
export const detailedProjects = projects.filter((p) => p.detail);
