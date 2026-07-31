import Link from "next/link";
import { site } from "@/content/site";

/** 최상단 초슬림 블랙 바. 페이지 전체에서 유일하게 순수 검정이 등장하는 곳. */
export function GlobalNav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-11 bg-black text-white">
      <nav
        aria-label="사이트"
        className="container-wide flex h-full items-center justify-between"
      >
        <Link
          href="/"
          className="press text-nav font-normal opacity-90 hover:opacity-100"
        >
          {site.nameEn}
        </Link>

        <ul className="flex items-center gap-5">
          <li>
            <a
              href={site.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press text-nav opacity-80 hover:opacity-100"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press text-nav opacity-80 hover:opacity-100"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="press text-nav opacity-80 hover:opacity-100"
            >
              Email
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
