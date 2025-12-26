import type { Metadata } from "next";
import "./globals.css";
import BackgroundPattern from "@/components/BackgroundPattern";

export const metadata: Metadata = {
  title: "平成ぷろふぃーる",
  description: "平成時代の懐かしﾌﾟﾛﾌ帳を簡単に作っちゃお★",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "平成ぷろふぃーる",
    description: "平成時代の懐かしﾌﾟﾛﾌ帳を簡単に作っちゃお★",
    images: ["/OGP.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "平成ぷろふぃーる",
    description: "平成時代の懐かしﾌﾟﾛﾌ帳を簡単に作っちゃお★",
    images: ["/OGP.jpg"],
  },
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
      <body>
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
