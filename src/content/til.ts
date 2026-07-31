import { site } from "./site";
import { generatedSeries } from "./til.generated";

/**
 * 학습 기록 (TIL).
 *
 * 글 목록은 BaseStudyNote 저장소에서 자동 동기화됩니다.
 *   npm run sync:til
 *
 * 이 파일에서는 "무엇을 강조할지"만 정합니다.
 */
export type Post = {
  id: string;
  title: string;
  url: string;
};

export type Series = {
  id: string;
  title: string;
  caption: string;
  /** 원본 노트(GitHub) 주소 */
  source: string;
  posts: Post[];
};

export const series: Series[] = generatedSeries;

export const posts: Post[] = series.flatMap((s) => s.posts);

export const totalPostCount = posts.length;

const postById = new Map(posts.map((p) => [p.id, p]));

/** id로 글을 찾습니다. 동기화로 id가 사라졌다면 undefined. */
export function getPost(id: string): Post | undefined {
  return postById.get(id);
}

/** 글의 실제 링크. 없으면 블로그 메인으로 폴백합니다. */
export function postHref(post: Post | undefined): string {
  return post?.url ?? site.blogUrl;
}

/** 시리즈 id로 시리즈를 찾습니다. */
export function getSeries(id: string): Series | undefined {
  return series.find((s) => s.id === id);
}
