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

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.nameEn} — ${site.role}`,
    template: `%s — ${site.nameEn}`,
  },
  description: site.subheadline,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.siteUrl,
    title: `${site.nameEn} — ${site.role}`,
    description: site.subheadline,
    siteName: `${site.nameEn} 기술 소개서`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nameEn} — ${site.role}`,
    description: site.subheadline,
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
