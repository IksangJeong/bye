import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "예진성은 롤링페이퍼",
  description: "학생회장 예진, 부학생회장 성은을 위한 롤링페이퍼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
