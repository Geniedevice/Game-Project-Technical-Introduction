/**
 * 사이트 전역 정보.
 * 이름·문구는 원하는 대로 바꾸세요. 나머지 링크는 실제 주소입니다.
 */
export const site = {
  name: "장진희",
  nameEn: "Jinhui Jang",
  role: "Unreal Engine Game Client Developer",
  /** 히어로 한 줄. 줄바꿈(\n)이 그대로 반영됩니다 */
  headline: "멈추지 않고\n매일 기록합니다",
  /** 히어로 서브카피 */
  subheadline:
    "구현을 넘어 동작 원리를 집요하게 파고듭니다. 그 과정을 하나도 빠짐없이 남깁니다.",
  email: "jangjinhui080@gmail.com",
  blogUrl: "https://blog.naver.com/startblack7",
  githubUrl: "https://github.com/Geniedevice",
  studyNoteUrl: "https://github.com/Geniedevice/BaseStudyNote",
  /**
   * 배포 주소. 링크 공유 시 미리보기 카드와 canonical 태그에 쓰입니다.
   * 저장소 이름을 바꾸면 이 값도 함께 바꿔주세요.
   */
  siteUrl: "https://geniedevice.github.io/Game-Project-Technical-Introduction/",
} as const;

export const nav = [
  { label: "개요", href: "#overview" },
  { label: "프로젝트", href: "#projects" },
  { label: "기술 스택", href: "#skills" },
  { label: "학습 기록", href: "#til" },
] as const;
