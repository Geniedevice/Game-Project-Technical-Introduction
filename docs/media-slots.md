# 프로젝트 이미지 관리

상세 페이지의 이미지는 `src/content/projects.ts`의 `MediaSlot`으로 관리합니다.
`src`가 `null`이면 "여기에 무엇을 넣으면 되는지" 안내 문구가 대신 표시되고,
레이아웃은 그대로 유지되므로 나중에 파일만 넣으면 됩니다.

```ts
{
  src: "/projects/gears-of-deceit/train.png",  // null이면 자리표시자
  alt: "설원을 가로지르는 열차 전경",
  caption: "스플라인을 따라 설원을 가로지르는 열차 '베헤모스'",
  hint: "열차 주행 장면",                        // 자리표시자에 뜨는 안내
  aspect: "16/9",
}
```

## Gears of Deceit 현재 상태

이미지는 블로그의 [시연 영상 글](https://blog.naver.com/startblack7/224353530954)과
개발 기록 글들에서 가져왔습니다. (`public/projects/gears-of-deceit/`)

| 파일 | 출처 | 쓰이는 곳 |
|---|---|---|
| `key-art.png` | 발표 자료 표지 | 히어로 |
| `design-direction.png` | 발표 자료 02 | 개요 — 기획 방향 전환 |
| `lobby.png` | OSS 세션 글 | 01 네트워크 — 실제 서버 목록 화면 |
| `session.png` | 발표 자료 08 | 01 네트워크 — 세션 구성 |
| `train.png` | Gears of Deceit(1) | 03 열차 — 주행 전경 |
| `quest-speed.png` | 발표 자료 03 | 03 열차 — 속도 배율 규칙 |
| `toon.png` | 포스트 프로세스 글 | 04 렌더링 — 툰 셰이딩 |
| `hud.png` | 카툰 렌더링 글 | 04 렌더링 — 인게임 HUD |

### 비어 있는 자리 1개

**02 보이스 섹션** — 블로그의 보이스 관련 글에 이미지가 없어 자리만 잡아뒀습니다.
근접 보이스나 비밀방 격리가 보이는 스크린샷이 생기면
`public/projects/gears-of-deceit/voice.png`로 넣고 `src`를 채우면 됩니다.

### 시연 영상

시연 영상은 네이버 자체 플레이어로 올라가 있어 **외부 사이트에 임베드할 수 없습니다.**
지금은 `detail.demoVideoUrl`로 블로그 글에 연결해 두었습니다.

유튜브에 올리면 임베드로 바꿀 수 있습니다. `detail.youtubeId`에 영상 ID만 넣으면
히어로 아래에 플레이어가 붙습니다. (`https://youtu.be/AbCdEfG` → `youtubeId: "AbCdEfG"`)

## 네이버 블로그 이미지를 가져올 때

**이미지 주소를 그대로 쓰면 안 됩니다.** 네이버는 다른 도메인에서의 요청(핫링크)을
차단하기 때문에 사이트에서 깨집니다. 파일을 내려받아 `public/`에 두세요.

브라우저에서 이미지를 우클릭해 저장하는 게 가장 간단하고,
명령줄로 받을 때는 Referer 헤더가 필요합니다.

```bash
curl -H "Referer: https://blog.naver.com/" \
     "https://postfiles.pstatic.net/.../image.png?type=w966" \
     -o public/projects/gears-of-deceit/voice.png
```

`?type=w966`은 가로 966px 버전입니다. 더 큰 원본이 필요하면 `?type=w1200`을 씁니다.

## 새 프로젝트에 상세 페이지 추가하기

`projects.ts`의 프로젝트에 `detail` 필드를 채우면 `/projects/{slug}/`가 자동 생성되고,
메인 타일에 "자세히 보기" 버튼과 sitemap 항목이 함께 붙습니다.
이미지는 `public/projects/{slug}/`에 두세요.
