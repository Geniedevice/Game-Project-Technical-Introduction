import { nav, site } from "@/content/site";

const columns = [
  {
    title: "섹션",
    links: nav.map((n) => ({ label: n.label, href: n.href, external: false })),
  },
  {
    title: "링크",
    links: [
      { label: "TIL 블로그", href: site.blogUrl, external: true },
      { label: "학습 노트 저장소", href: site.studyNoteUrl, external: true },
      { label: "GitHub", href: site.githubUrl, external: true },
      { label: "이메일", href: `mailto:${site.email}`, external: false },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-parchment px-6 py-16">
      <div className="container-wide">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <p className="text-caption-strong text-ink">{site.nameEn}</p>
            <p className="text-fine text-ink-48">{site.role}</p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col">
              <p className="text-caption-strong text-ink">{col.title}</p>
              <ul className="mt-2 flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="press text-dense-link text-ink-80 underline-offset-4 hover:text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-6">
          <p className="text-fine text-ink-48">
            © {new Date().getFullYear()} {site.nameEn}. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
