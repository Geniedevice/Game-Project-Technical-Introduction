# Gears of Deceit — 이미지 자리

이 폴더에 아래 파일들을 넣고, `src/content/projects.ts`의 해당 `src`를 채우면
사이트에 바로 반영됩니다. 지금은 전부 `null`이라 안내 문구가 대신 표시됩니다.

| 파일명(권장) | 어떤 화면 | projects.ts 위치 |
|---|---|---|
| `key-art.png` | 게임 대표 컷 (열차 외관 또는 엔진룸 전경) | `detail.keyArt` |
| `lobby.png` | 메인 메뉴 / 세션(방) 목록 화면 | `sections[0].media[0]` — 네트워크 |
| `voice.png` | 보이스 UI 또는 비밀방 장면 | `sections[1].media[0]` — 보이스 |
| `train.png` | 주행 중인 열차 (GIF도 가능) | `sections[2].media[0]` — 열차 |
| `toon.png` | 툰 셰이딩·외곽선이 잘 보이는 컷 | `sections[3].media[0]` — 렌더링 |
| `hud.png` | 압력 게이지·퀘스트 진행 HUD | `sections[3].media[1]` — 렌더링 |

## 채우는 법

```ts
// src/content/projects.ts
keyArt: {
  src: "/projects/gears-of-deceit/key-art.png",   // null → 경로로 교체
  alt: "Gears of Deceit 대표 이미지",
  caption: "달리는 증기기관차 '베헤모스'",
  hint: "...",
  aspect: "16/9",
},
```

## 주의

- **네이버 블로그 이미지 주소를 그대로 쓰지 마세요.** 핫링크가 차단되어 있어
  다른 도메인에서 불러오면 깨집니다. 블로그에서 이미지를 내려받아 이 폴더에 두세요.
- 가로 1600px 내외의 PNG 또는 JPG를 권장합니다. 16:9 비율로 잘라두면 가장 깔끔합니다.
- GIF도 그대로 넣을 수 있습니다. (열차 주행처럼 움직임이 중요한 컷)

## 영상

유튜브에 플레이 영상이 있다면 `detail.youtubeId`에 영상 ID만 넣으면 됩니다.
`https://youtu.be/AbCdEfG` → `youtubeId: "AbCdEfG"`
