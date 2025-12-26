"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("ログインエラー:", error);
      setLoginLoading(false);
    }
  };

  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen gap-8">
      {/* タイトル */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          <span className="rainbow-text">☆</span>
          <span className="text-pink-500">平成</span>
          <span className="text-purple-500">プロフィール</span>
          <span className="rainbow-text">☆</span>
        </h1>
        <p className="text-sm text-gray-600">ﾌﾟﾛﾌ作ってﾏｲﾍﾟｰｼﾞ公開しよ★ﾐ</p>
      </div>

      {/* メインコンテンツ */}
      <div className="retro-frame rounded-lg p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-lg font-bold mb-2">♪ ようこそ ♪</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            懐かしの平成プロフが<br />
            現代に復活！！<br /><br />
            プロフィールを作って<br />
            友達に見せよう☆
          </p>
        </div>

        <div className="border-t-2 border-dashed border-pink-300 my-4"></div>

        {/* 機能紹介 */}
        <div className="text-sm mb-6">
          <p className="font-bold text-center mb-2">★ 機能 ★</p>
          <ul className="space-y-1 text-gray-700">
            <li>☆ HN・プロフィール作成</li>
            <li>☆ カスタム項目追加OK</li>
            <li>☆ キリ番機能搭載!!</li>
            <li>☆ 訪問者カウンター</li>
          </ul>
        </div>

        <div className="border-t-2 border-dashed border-pink-300 my-4"></div>

        {/* ボタン */}
        {loading ? (
          <div className="text-center text-gray-500">読み込み中...</div>
        ) : isLoggedIn ? (
          <div className="flex flex-col gap-3">
            <Link href="/profile/edit" className="retro-button text-center block">
              プロフを編集する
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoogleLogin}
              disabled={loginLoading}
              className="retro-button text-center block w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#fff"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fff"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#fff"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loginLoading ? "接続中..." : "Googleではじめる"}
            </button>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="text-center text-xs text-gray-500">
        <p>♡ 平成プロフィール ♡</p>
        <p className="sparkle">☆*:.｡.2025.｡.:*☆</p>
      </div>
    </div>
  );
}
