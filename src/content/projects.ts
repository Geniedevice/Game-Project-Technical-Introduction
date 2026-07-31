/**
 * 프로젝트.
 *
 * 내용은 BaseStudyNote의 학습 기록에서 확인 가능한 사실만 적었습니다.
 * ⚠️ 실제 프로젝트 제목 · 기간 · 팀 규모는 본인 상황에 맞게 고쳐주세요.
 *
 * `results`에는 지어낸 수치 대신 "실제로 구현한 것"을 적었습니다.
 * 측정한 수치가 생기면 그때 바꾸는 편이 설득력 있습니다.
 *
 * relatedPosts는 til.generated.ts의 id를 참조합니다. (근거 링크)
 */
export type ProjectSurface = "dark" | "light" | "parchment";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  role: string;
  teamSize: string;
  stack: string[];
  /** 무엇이 문제였는가 */
  problem: string;
  /** 어떻게 접근했는가 */
  approach: string[];
  /** 무엇을 만들었는가 */
  results: { label: string; value: string }[];
  /** til의 post id 목록 */
  relatedPosts: string[];
  links?: { label: string; href: string }[];
  surface: ProjectSurface;
};

export const projects: Project[] = [
  {
    slug: "roguelike-action",
    // ⚠️ 실제 프로젝트 제목으로 교체하세요
    title: "로그라이크 액션 프로젝트",
    tagline: "GAS 위에 올린 전투 · 인벤토리 · 보상 시스템",
    period: "진행 중",
    role: "게임플레이 클라이언트",
    teamSize: "개인 프로젝트",
    stack: ["Unreal Engine 5", "C++", "GAS", "UMG"],
    problem:
      "스킬과 아이템이 하나씩 늘어날 때마다 캐릭터 클래스에 분기와 상태 변수가 쌓였습니다. 새 능력을 붙이려면 기존 전투 코드를 다시 읽어야 했고, 어디까지 영향이 가는지 확신할 수 없었습니다.",
    approach: [
      "능력을 GameplayAbility 단위로, 수치 변화를 GameplayEffect와 Attribute로 분리해 데미지 경로를 한 곳으로 모았습니다",
      "GameplayTag로 상태를 표현하고 Linked Anim Layer가 태그를 보고 애니메이션을 고르게 해, 애니메이션 분기를 코드에서 걷어냈습니다",
      "인벤토리 UI를 컴포지트 패턴으로 구성해 슬롯·장비 카드·보상 카드가 같은 구조를 재사용하도록 만들었습니다",
      "매 발사마다 생성되던 총알을 오브젝트 풀로 바꿔 런타임 스폰 비용을 없앴습니다",
    ],
    results: [
      { label: "전투", value: "Ability · Effect · Cue 분리" },
      { label: "인벤토리", value: "아이템 태그 + 컴포지트 UI" },
      { label: "최적화", value: "총알 Object Pooling" },
    ],
    relatedPosts: [
      "gas-01",
      "gas-07",
      "gas-06",
      "gas-13",
      "gas-14",
      "gas-15",
      "gas-17",
    ],
    links: [
      {
        label: "GAS 학습 노트 전체",
        href: "https://github.com/Geniedevice/BaseStudyNote/blob/main/Unreal/GAS/GasStudyNote.md",
      },
    ],
    surface: "dark",
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
      {
        label: "학습 노트 저장소",
        href: "https://github.com/Geniedevice/BaseStudyNote",
      },
    ],
    surface: "dark",
  },
];
