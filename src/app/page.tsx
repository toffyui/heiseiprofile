"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { DEFAULT_TEMPLATE, TEMPLATES, INPUT_FONT } from "@/types/database";
import { ProfileLayout, AvatarWithFlame } from "@/components/ProfileLayout";
import Footer from "@/components/Footer";

// サンプルプロフィールデータ
const SAMPLE_PROFILE = {
  nickname: "ゆいぴ",
  residence: "とうきょう",
  sns: "yuipi_dayo",
  comment: "よろしくね♡",
  birth_year: "2000",
  birth_month: "3",
  birth_day: "14",
  zodiac: "うお",
  blood_type: "O",
  personality: "のんびり",
  hobby: "おえかき",
  favorite_animal: "うさぎ",
  favorite_music: "ボカロ",
  favorite_tv: "アニメ",
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const template = DEFAULT_TEMPLATE;
  const previewTemplate = TEMPLATES[previewIndex];

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    <ProfileLayout template={template}>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 flex flex-col items-center px-6 py-4">
          {/* タイトル */}
          <div className="text-center mb-4 relative">
            <Image
              src={template.characters[0]}
              alt=""
              width={50}
              height={50}
              className="absolute -top-2 -left-8 pointer-events-none object-contain"
            />
            <Image
              src={template.characters[1]}
              alt=""
              width={40}
              height={40}
              className="absolute -top-1 -right-6 pointer-events-none object-contain"
            />
            <h1
              className="text-xl font-bold mb-1 text-shadow-xs text-shadow-white"
              style={{
                color: template.primaryColor,
                fontFamily: template.titleFont,
              }}
            >
              <span className="blink">☆</span>
              平成プロフィール
              <span className="blink">☆</span>
            </h1>
            <p
              className="text-sm"
              style={{
                color: template.textColor,
                fontFamily: template.titleFont,
              }}
            >
              ﾌﾟﾛﾌ作ってﾏｲﾍﾟｰｼﾞ公開しよ★ﾐ
            </p>
          </div>

          {/* サンプルプレビュー */}
          <div className="w-full max-w-sm mb-4">
            <p
              className="text-center text-sm font-bold mb-2 text-shadow-xs text-shadow-white"
              style={{
                color: template.primaryColor,
                fontFamily: template.titleFont,
              }}
            >
              こんな感じのプロフが作れちゃう
              <span className="blink">★</span>
            </p>
          </div>

          {/* メインコンテンツ */}
          <div className="rounded-2xl p-4 w-full max-w-sm">
            <div className="text-center mb-3">
              <p
                className="text-base font-bold mb-1"
                style={{
                  color: template.primaryColor,
                  fontFamily: template.titleFont,
                }}
              >
                ♪ ようこそ ♪
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: template.textColor,
                  fontFamily: template.titleFont,
                }}
              >
                懐かしの平成プロフが現代に復活！！
                <br />
                プロフィールを作って友達に見せよう☆
              </p>
            </div>

            <div
              className="border-t-2 border-dashed my-3"
              style={{ borderColor: `${template.primaryColor}40` }}
            />

            {/* 機能紹介 */}
            <div className="text-sm mb-3">
              <p
                className="font-bold text-center mb-1"
                style={{
                  color: template.primaryColor,
                  fontFamily: template.titleFont,
                }}
              >
                ★ 機能 ★
              </p>
              <ul
                className="space-y-0.5"
                style={{
                  color: template.textColor,
                  fontFamily: template.titleFont,
                }}
              >
                <li>☆ プロフィール作成</li>
                <li>☆ テーマ選択OK</li>
                <li>☆ キリ番機能搭載!!</li>
                <li>☆ 訪問者カウンター</li>
              </ul>
            </div>

            <div
              className="border-t-2 border-dashed my-3"
              style={{ borderColor: `${template.primaryColor}40` }}
            />

            {/* ボタン */}
            {loading ? (
              <div
                className="text-center"
                style={{
                  color: template.textColor,
                  fontFamily: template.titleFont,
                }}
              >
                <span className="blink">読み込み中...</span>
              </div>
            ) : isLoggedIn ? (
              <Link
                href="/profile/edit"
                className="block w-full py-2 text-center text-base font-bold rounded-full shadow-lg text-white"
                style={{
                  backgroundColor: template.primaryColor,
                  fontFamily: template.titleFont,
                }}
              >
                プロフを編集する
              </Link>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={loginLoading}
                className="w-full py-2 text-base font-bold rounded-full shadow-lg text-white flex items-center justify-center gap-2 disabled:opacity-50"
                style={{
                  backgroundColor: template.primaryColor,
                  fontFamily: template.titleFont,
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="relative mt-auto px-6 pb-4">
          <Image
            src={template.characters[3]}
            alt=""
            width={40}
            height={40}
            className="absolute -bottom-2 left-4 pointer-events-none object-contain"
          />
          <p
            className="text-center text-sm mb-1"
            style={{
              color: template.textColor,
              fontFamily: template.titleFont,
            }}
          >
            ♡ 平成プロフィール ♡
          </p>
          <p
            className="text-center text-sm sparkle mb-2"
            style={{
              color: template.textColor,
              fontFamily: template.titleFont,
            }}
          >
            ☆*:.｡.2025.｡.:*☆
          </p>
          <Footer template={template} />
        </div>
      </div>
    </ProfileLayout>
  );
}
