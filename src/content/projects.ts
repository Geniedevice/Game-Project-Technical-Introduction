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
export type ProjectSurface = "dark" | "light" | "parchment";

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
              // ⚠️ 순찰자 영상을 유튜브에 올린 뒤 여기에 ID만 넣으면 영상으로 바뀝니다.
              //    https://youtu.be/AbCdEfG → youtubeId: "AbCdEfG"
              youtubeId: null,
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
    slug: "console-game-systems",
    title: "콘솔 게임 시스템 과제 5종",
    tagline: "C++만으로 상태창 · 전투 · 인벤토리 · 경영 시뮬레이션 구현",
    period: "학습 과정",
    role: "단독 구현",
    teamSize: "개인 과제",
    stack: ["C++", "Unreal Engine C++", "OOP"],
    problem:
      "엔진이 대신 해주던 것들을 걷어내고, 게임 시스템을 자료구조와 클래스 설계만으로 처음부터 세워보는 것이 목표였습니다.",
    approach: [
      "캐릭터 상태창부터 시작해 전직 시스템과 전투 루프까지 단계적으로 확장했습니다",
      "인벤토리와 연금술사 공방 관리 시스템에서 아이템·레시피 관계를 직접 자료구조로 설계했습니다",
      "마지막 과제에서 같은 구조를 언리얼 C++로 옮기며, 엔진이 무엇을 대신해주는지 비교했습니다",
    ],
    results: [
      { label: "구현 과제", value: "5종 전부 완료" },
      { label: "다룬 시스템", value: "상태창 · 전투 · 인벤토리" },
      { label: "확장", value: "콘솔 → Unreal C++" },
    ],
    relatedPosts: [
      "assignment-00",
      "assignment-01",
      "assignment-02",
      "assignment-03",
      "assignment-04",
    ],
    surface: "parchment",
  },
  {
    slug: "fundamentals",
    title: "기본기 트레이닝",
    tagline: "알고리즘 97문제와 CS 38편 — 매일 쌓은 기록",
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
      { label: "푼 문제", value: "97문제" },
      { label: "CS 정리", value: "38편" },
      { label: "전체 기록", value: "160편" },
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
