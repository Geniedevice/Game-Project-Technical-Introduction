// @ts-check
/**
 * BaseStudyNote 저장소의 학습 노트를 읽어 src/content/til.generated.ts 를 다시 만듭니다.
 *
 *   npm run sync:til
 *
 * 노트에 글을 추가한 뒤 이 스크립트만 돌리면 사이트가 따라옵니다.
 * 손으로 링크를 옮기지 마세요.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO = "Geniedevice/BaseStudyNote";
const BRANCH = "main";

/** @type {{ id: string, title: string, caption: string, file: string }[]} */
const SERIES = [
  {
    id: "gas",
    title: "GAS 탐구",
    caption: "Gameplay Ability System으로 전투·인벤토리·보상을 설계한 기록",
    file: "Unreal/GAS/GasStudyNote.md",
  },
  {
    id: "trouble",
    title: "트러블 슈팅",
    caption: "원인을 찾기까지 오래 걸렸던 문제와 그 해결 과정",
    file: "Unreal/TroubleShooting.md",
  },
  {
    id: "unreal",
    title: "언리얼 엔진 탐구",
    caption: "엔진 기능을 하나씩 뜯어보며 남긴 연재 기록",
    file: "Unreal/UnrealStudy.md",
  },
  {
    id: "ui",
    title: "UI 탐구",
    caption: "UMG 모듈화와 상태 동기화",
    file: "Unreal/UI/UIStudyNote.md",
  },
  {
    id: "material",
    title: "머티리얼 · 셰이더",
    caption: "셀 셰이딩, 포스트 프로세스, 나이아가라로 만든 연출",
    file: "Unreal/Material.md",
  },
  {
    id: "cs",
    title: "CS · Unreal 심화",
    caption: "C++ 내부 동작, 운영체제, 네트워크, 그리고 언리얼의 대응 개념",
    file: "Unreal/Study/StudyNote.md",
  },
  {
    id: "assignment",
    title: "과제 구현",
    caption: "콘솔 게임 시스템부터 언리얼 C++ 프로그램까지",
    file: "Assignment/Assignment.md",
  },
  {
    id: "algo",
    title: "알고리즘 문제풀이",
    caption: "매일 한 문제씩. 자료구조·완전탐색·DP·그래프",
    file: "C++/Problem Solving.md",
  },
  {
    id: "wrong",
    title: "오답노트",
    caption: "틀린 문제를 다시 풀며 왜 틀렸는지 정리한 기록",
    file: "C++/오답노트.md",
  },
];

/** `| **0x00** | [제목](주소) |` 형태의 표 행에서 제목과 주소를 뽑습니다. */
function parseRows(markdown) {
  const rows = [];
  const re = /\|\s*\*\*(0x[0-9a-fA-F]+)\*\*\s*\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|/g;

  let match;
  while ((match = re.exec(markdown)) !== null) {
    const [, index, rawTitle, url] = match;
    rows.push({ index, title: cleanTitle(rawTitle), url: url.trim() });
  }
  return rows;
}

/**
 * 노트에 남은 오타(끝 글자 중복)를 정리합니다.
 * 예: "Delegate의 이해해" → "Delegate의 이해", "피보나치 수수" → "피보나치 수"
 */
function cleanTitle(title) {
  return title
    .trim()
    .replace(/([가-힣])\1$/, "$1")
    .replace(/\s+/g, " ");
}

const toKey = (s) => JSON.stringify(s);

async function fetchNote(file) {
  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${file
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${file} → HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const series = [];
  let total = 0;

  for (const meta of SERIES) {
    const markdown = await fetchNote(meta.file);
    const rows = parseRows(markdown);

    // 같은 글이 여러 노트에 중복 등록된 경우가 있어 주소 기준으로 제거
    const seen = new Set();
    const posts = rows
      .filter((r) => (seen.has(r.url) ? false : seen.add(r.url)))
      .map((r) => ({ id: `${meta.id}-${r.index.slice(2)}`, ...r }));

    total += posts.length;
    series.push({ ...meta, posts });
    console.log(`  ${meta.title.padEnd(16)} ${String(posts.length).padStart(3)}편`);
  }

  const body = `// 이 파일은 자동 생성됩니다. 직접 수정하지 마세요.
// 다시 만들려면: npm run sync:til
// 출처: https://github.com/${REPO}

import type { Series } from "./til";

export const generatedSeries: Series[] = [
${series
  .map(
    (s) => `  {
    id: ${toKey(s.id)},
    title: ${toKey(s.title)},
    caption: ${toKey(s.caption)},
    source: ${toKey(`https://github.com/${REPO}/blob/${BRANCH}/${s.file}`)},
    posts: [
${s.posts
  .map(
    (p) =>
      `      { id: ${toKey(p.id)}, title: ${toKey(p.title)}, url: ${toKey(p.url)} },`,
  )
  .join("\n")}
    ],
  },`,
  )
  .join("\n")}
];
`;

  const out = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "content",
    "til.generated.ts",
  );

  await writeFile(out, body, "utf8");
  console.log(`\n총 ${total}편 → src/content/til.generated.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
