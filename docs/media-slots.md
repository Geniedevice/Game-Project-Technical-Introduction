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
| `train-roof.jpg` | 시연 영상 프레임 | 03 열차 — 주행 중인 지붕 |
| `toon.png` | 포스트 프로세스 글 | 04 렌더링 — 툰 셰이딩 |
| `hud.png` | 카툰 렌더링 글 | 04 렌더링 — 인게임 HUD |
| `voice.jpg` | 시연 영상 프레임 | 02 보이스 |

자리표시자는 남아 있지 않습니다.

### 시연 영상에서 프레임 가져오기

시연 영상은 네이버 자체 플레이어로 올라가 있어 **외부 사이트에 임베드할 수 없습니다.**
지금은 `detail.demoVideoUrl`로 블로그 글에 연결하고, 영상에서 뽑은 프레임을 이미지로 씁니다.

네이버는 영상마다 전체 해상도(2560×1440) 대표 프레임을 여러 장 제공합니다.
글 HTML에서 `"vid"`와 `"inkey"`를 찾아 아래 API를 호출하면 주소를 얻을 수 있습니다.

```bash
# 1) 영상 정보 (meta.cover.source에 대표 프레임 주소가 있습니다)
curl -H "Referer: https://blog.naver.com/" \
  "https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/{vid}?key={inkey}"

# 2) 프레임 내려받기 — 파일명 끝의 _01, _02 … 를 바꾸면 다른 구간이 나옵니다
curl -H "Referer: https://blog.naver.com/" \
  "https://phinf.pstatic.net/image.nmv/blog_2026_07_21_809/DjI42nRdU2_01.jpg" \
  -o public/projects/gears-of-deceit/voice.jpg
```

`thumbnails.sprites`의 스프라이트 시트(100컷 한 장)를 받으면 영상 전체를 한눈에 훑어
원하는 장면의 번호를 고를 수 있습니다.

## 영상 넣기

### 유튜브 (권장)

`MediaSlot`이나 `detail`의 `youtubeId`에 영상 ID만 넣으면 그 자리가 플레이어로 바뀝니다.
(`https://youtu.be/AbCdEfG` → `youtubeId: "AbCdEfG"`)

`youtubeId`가 비어 있으면 `src` 이미지가 그대로 보이므로,
지금은 대표 프레임을 띄워두고 나중에 ID만 채우면 됩니다.

**지금 비어 있는 곳** — 보이스 섹션의 순찰자 플레이 영상
(`projects.ts`에서 `youtubeId: null`을 찾으세요)

### 직접 올리기 (짧은 클립만)

`MediaSlot.video`에 `public/` 기준 경로를 넣으면 `<video>`로 재생됩니다.
`preload="none"`이라 재생 버튼을 눌러야 내려받으므로 페이지 로딩은 느려지지 않습니다.

다만 **저장소에 영원히 남습니다.** 순찰자 영상(9분 39초)은 720p로 압축해도 69MB라
유튜브로 보냈습니다. 30초~1분짜리 하이라이트 클립 정도만 직접 올리는 걸 권합니다.

```bash
# 구간을 잘라 압축하는 예 (3분20초부터 50초간)
ffmpeg -ss 200 -t 50 -i 원본.mp4 -vf "scale=1280:-2" \
  -c:v libx264 -crf 30 -preset veryfast -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 96k clip.mp4

# 포스터 프레임 뽑기
ffmpeg -ss 10 -i clip.mp4 -frames:v 1 -q:v 3 clip-poster.jpg
```

## DESTINATION 현재 상태

이미지 4장과 영상 1개 모두 [블로그 영상 글](https://blog.naver.com/startblack7/224034428520)에서
가져왔습니다. (`public/projects/destination/`)

| 파일 | 쓰이는 곳 |
|---|---|
| `demo.mp4` (8.5MB) | 히어로 — 74초 플레이 영상, 페이지에서 바로 재생 |
| `key-art.jpg` | 위 영상의 포스터 |
| `city.jpg` | 개요 — 폐허 도시 전경 |
| `combat.jpg` | 01 네트워크 — 전투 화면 |
| `ability-cards.jpg` | 04 최적화와 성장 — 카드 선택 |

영상이 74초로 짧아(8.5MB) 유튜브 대신 직접 올렸습니다.
`preload="none"`이라 재생 버튼을 눌러야 내려받습니다.

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

## 목록 배너

프로젝트 목록의 타일은 `projects.ts`의 `banner`(public/ 기준 경로, 16:9 권장)를 씁니다.
게임 프로젝트는 대표 아트를 넣고, 비워두면 `icon`으로 지정한 선 아이콘이 대신 그려집니다.

```ts
banner: "/projects/gears-of-deceit/key-art.png",
icon: "gear",   // banner가 없을 때만 쓰입니다
```

## 새 프로젝트에 상세 페이지 추가하기

`projects.ts`의 프로젝트에 `detail` 필드를 채우면 `/projects/{slug}/`가 자동 생성되고,
메인 타일에 "자세히 보기" 버튼과 sitemap 항목이 함께 붙습니다.
이미지는 `public/projects/{slug}/`에 두세요.
