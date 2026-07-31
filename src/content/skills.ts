/**
 * 기술 스택.
 *
 * BaseStudyNote에 실제 기록이 있는 항목만 넣었습니다.
 * note는 뱃지에 마우스를 올렸을 때 보이는 한 줄 근거입니다.
 *
 * level:
 *   "core"      — 프로젝트에서 직접 설계하고 구현해본 것
 *   "working"   — 구현 경험이 있고 설명할 수 있는 것
 *   "familiar"  — 개념을 정리했고 다뤄본 것
 */
export type SkillLevel = "core" | "working" | "familiar";

export type Skill = {
  name: string;
  level: SkillLevel;
  note?: string;
};

export type SkillGroup = {
  title: string;
  caption: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Engine & Language",
    caption: "게임 로직을 실제로 작성하는 층",
    skills: [
      { name: "Unreal Engine 5", level: "core", note: "게임플레이 프레임워크 · 레벨 전환 · 서브시스템" },
      { name: "C++", level: "core", note: "포인터·레퍼런스, RAII, 스마트 포인터, STL" },
      { name: "Gameplay Ability System", level: "core", note: "Ability · Effect · Cue · Attribute 분리 설계" },
      { name: "Blueprint", level: "working", note: "C++ 베이스 클래스 + BP 파생 구조" },
      { name: "UMG", level: "working", note: "UI 모듈화와 상태 동기화" },
      { name: "Unreal Reflection", level: "working", note: "UObject · UClass/UStruct · UE RTTI" },
    ],
  },
  {
    title: "Gameplay Systems",
    caption: "규모가 커져도 버티는 구조를 만드는 도구",
    skills: [
      { name: "GameplayTag", level: "core", note: "상태 표현과 태그 기반 애니메이션 분기" },
      { name: "Linked Anim Layer", level: "working", note: "태그로 애니메이션 레이어 전환" },
      { name: "Delegate", level: "working", note: "시스템 간 결합도를 낮추는 이벤트 전달" },
      { name: "Object Pooling", level: "working", note: "총알 스폰 비용 제거" },
      { name: "디자인 패턴", level: "working", note: "컴포지트 · 템플릿 · 샌드박스 패턴 적용" },
      { name: "WorldSubsystem", level: "working", note: "전역 데이터와 수명 관리" },
      { name: "SeamlessTravel", level: "familiar", note: "끊김 없는 레벨 전환" },
      { name: "RPC / Replication", level: "familiar", note: "서버-클라이언트 통신 개념 정리" },
    ],
  },
  {
    title: "Computer Science",
    caption: "엔진 아래에서 무슨 일이 일어나는지",
    skills: [
      { name: "자료구조", level: "core", note: "vector · list · map · TMap의 선택 기준" },
      { name: "알고리즘", level: "core", note: "완전탐색 · DFS/BFS · DP · 그리디 (97문제)" },
      { name: "객체지향 설계", level: "core", note: "OOP, vtable, 객체 복사 제어" },
      { name: "메모리", level: "working", note: "스택 오버플로 · 단편화 · 페이지 폴트 · 캐시" },
      { name: "운영체제", level: "working", note: "프로세스/스레드 · 컨텍스트 스위칭 · IPC · 레이스 컨디션" },
      { name: "네트워크", level: "familiar", note: "TCP/UDP · 소켓 · 방화벽" },
      { name: "멀티스레딩", level: "familiar", note: "GameThread · RenderThread · RHIThread" },
    ],
  },
  {
    title: "Tooling",
    caption: "기록하고 협업하기 위한 것들",
    skills: [
      { name: "Git / GitHub", level: "working", note: "학습 노트 저장소 운영" },
      { name: "Visual Studio", level: "working" },
      { name: "기술 문서화", level: "core", note: "160편의 학습 기록" },
      { name: "TypeScript", level: "familiar", note: "본 소개서 사이트 제작" },
    ],
  },
];
