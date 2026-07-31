/**
 * 사이트 전역 정보.
 * 이름·문구는 원하는 대로 바꾸세요. 나머지 링크는 실제 주소입니다.
 */
export const site = {
  name: "장진희",
  nameEn: "Jinhui Jang",
  role: "Unreal Engine Game Client Developer",
  /** 히어로 한 줄 */
  headline: "매일 하나씩 기록하며\n기본기를 쌓고 있습니다.",
  /** 히어로 서브카피 */
  subheadline:
    "언리얼 C++와 GAS로 게임 시스템을 만들고, 왜 그렇게 만들었는지를 전부 글로 남깁니다. 아래의 모든 주장에는 링크된 근거가 있습니다.",
  email: "jangjinhui080@gmail.com",
  blogUrl: "https://blog.naver.com/startblack7",
  githubUrl: "https://github.com/Geniedevice",
  studyNoteUrl: "https://github.com/Geniedevice/BaseStudyNote",
  /** GitHub Pages 배포 후 실제 주소로 바꿔주세요 (OG 태그에 사용) */
  siteUrl: "https://geniedevice.github.io",
} as const;

export const nav = [
  { label: "개요", href: "#overview" },
  { label: "프로젝트", href: "#projects" },
  { label: "기술 스택", href: "#skills" },
  { label: "학습 기록", href: "#til" },
] as const;
