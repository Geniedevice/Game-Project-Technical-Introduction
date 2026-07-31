import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// SF Pro가 없는 환경(Windows·Android)에서의 대체 서체
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** 공유 미리보기 이미지 — src/app/og.png/route.tsx 가 빌드 시 생성합니다. */
const ogImage = {
  url: new URL("og.png", site.siteUrl).toString(),
  width: 1200,
  height: 630,
  alt: `${site.nameEn} — ${site.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.nameEn} — ${site.role}`,
    template: `%s — ${site.nameEn}`,
  },
  description: site.subheadline,
  alternates: { canonical: site.siteUrl },
  keywords: [
    "언리얼", "Unreal Engine", "게임 클라이언트", "C++", "GAS",
    "Gameplay Ability System", "포트폴리오", site.nameEn,
  ],
  authors: [{ name: site.name, url: site.githubUrl }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.siteUrl,
    title: `${site.nameEn} — ${site.role}`,
    description: site.subheadline,
    siteName: `${site.nameEn} 기술 소개서`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameEn} — ${site.role}`,
    description: site.subheadline,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
