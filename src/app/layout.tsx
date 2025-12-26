import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "平成プロフィール - 平成風Webアプリ",
  description:
    "平成女児懐かしのプロフィール帳が現代に復活！プロフィールを作って友達に見せよう☆",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Klee+One&family=Zen+Kurenaido&family=Zen+Maru+Gothic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
