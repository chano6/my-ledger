import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "우리집 가계부",
    template: "%s | 우리집 가계부",
  },
  description: "살림을 기록하는 작은 습관",
  keywords: ["가계부", "지출 관리", "수입 관리", "금융", "예산"],
  openGraph: {
    title: "우리집 가계부",
    description: "살림을 기록하는 작은 습관",
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
