"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/lib/supabase";
import { isKiriban } from "@/lib/kiriban";
import type { Profile, KiribanLog, Template } from "@/types/database";
import { TEMPLATES, DEFAULT_TEMPLATE, INPUT_FONT } from "@/types/database";
import VisitorCounter from "@/components/VisitorCounter";
import KiribanCelebration from "@/components/KiribanCelebration";
import Link from "next/link";
import { ProfileLayout, textShadowStyle } from "@/components/ProfileLayout";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import {
  BasicInfoSection,
  QuestionsSection,
  FavoritesSection,
  IfSection,
} from "@/components/ProfileSections";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [showKiriban, setShowKiriban] = useState(false);
  const [kiribanLogs, setKiribanLogs] = useState<KiribanLog[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();

      // ログインユーザーを取得
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.toLowerCase())
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(data);

      // 本人かどうかチェック
      if (user && data.user_id === user.id) {
        setIsOwner(true);
      }

      // 訪問者カウンターを増やす
      const newCount = (data.visitor_count || 0) + 1;
      setVisitorCount(newCount);

      await supabase
        .from("profiles")
        .update({ visitor_count: newCount })
        .eq("id", data.id);

      // キリ番チェック
      if (isKiriban(newCount)) {
        setShowKiriban(true);
      }

      // キリ番履歴を取得
      const { data: logs } = await supabase
        .from("kiriban_logs")
        .select("*")
        .eq("profile_id", data.id)
        .order("visitor_number", { ascending: false })
        .limit(10);

      if (logs) {
        setKiribanLogs(logs);
      }

      setLoading(false);
    };

    loadProfile();
  }, [username]);

  const template: Template =
    TEMPLATES.find((t) => t.id === profile?.template_id) || DEFAULT_TEMPLATE;

  if (loading) {
    return <Loading fullScreen />;
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div
          className="max-w-sm text-center p-6 rounded-2xl shadow-lg"
          style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
        >
          <p
            className="text-xl mb-4"
            style={{ fontFamily: DEFAULT_TEMPLATE.titleFont }}
          >
            &#128557; ページが見つかりません
          </p>
          <p
            className="text-sm text-gray-600 mb-4"
            style={{ fontFamily: DEFAULT_TEMPLATE.titleFont }}
          >
            このユーザーは存在しないか、
            <br />
            まだプロフを作成していません。
          </p>
          <Link
            href="/"
            className="inline-block  py-2 rounded-full font-bold text-white"
            style={{
              backgroundColor: DEFAULT_TEMPLATE.primaryColor,
              fontFamily: DEFAULT_TEMPLATE.titleFont,
            }}
          >
            TOPへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProfileLayout template={template}>
      <div className="flex flex-col min-h-full">
        <div className="flex-1">
          {/* キリ番演出 */}
          {showKiriban && profile && (
            <KiribanCelebration
              count={visitorCount}
              profileId={profile.id}
              onClose={() => setShowKiriban(false)}
            />
          )}

          {/* Welcome マーキー */}
          <div className="overflow-hidden mb-4" style={textShadowStyle}>
            <p
              className="marquee text-lg font-bold whitespace-nowrap"
              style={{ color: template.primaryColor, fontFamily: INPUT_FONT }}
            >
              &#9734;.&#12290;.:*&#12539;&#176; Welcome to {profile?.nickname}
              &apos;s Profile (*&#180;&#9661;`*)&#9834;
            </p>
          </div>

          {/* 訪問者カウンター - 帯 */}
          <VisitorCounter count={visitorCount} template={template} />

          {/* 基本情報カード */}
          <BasicInfoSection
            template={template}
            profile={profile || {}}
            editable={false}
          />
          <div className="px-6">
            {/* Questions - 穴埋め */}
            <QuestionsSection
              template={template}
              profile={profile || {}}
              editable={false}
            />

            {/* 好きなもの♡コーナー */}
            <FavoritesSection
              template={template}
              profile={profile || {}}
              editable={false}
            />

            {/* もしも質問 */}
            <IfSection
              template={template}
              profile={profile || {}}
              editable={false}
            />

            {/* キリ番履歴 */}
            {kiribanLogs.length > 0 && (
              <div className="my-4">
                <p
                  className="text-center font-bold text-sm mb-3"
                  style={{
                    color: template.primaryColor,
                    fontFamily: template.titleFont,
                  }}
                >
                  &#127942; キリ番ゲッター &#127942;
                </p>
                <div className="space-y-2 rounded-2xl p-4 w-full max-w-sm mx-auto bg-white/80">
                  {kiribanLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex justify-between items-center py-2 border-b border-dashed"
                      style={{ borderColor: `${template.primaryColor}30` }}
                    >
                      <span
                        className="text-sm px-2 py-1 rounded-full text-white"
                        style={{
                          backgroundColor: template.primaryColor,
                        }}
                      >
                        {log.visitor_number}人目
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ fontFamily: INPUT_FONT }}
                      >
                        {log.visitor_name || "名無しさん"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-auto px-6 pb-4">
          <div className="flex justify-center gap-3 mb-4 flex-wrap">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm font-bold shadow-md"
              style={{
                backgroundColor: template.primaryColor,
                color: "#fff",
                fontFamily: template.titleFont,
              }}
            >
              TOP
            </Link>
            {isOwner && (
              <Link
                href="/profile/edit"
                className="px-4 py-2 rounded-full text-sm font-bold shadow-md"
                style={{
                  backgroundColor: template.secondaryColor,
                  color: "#fff",
                  fontFamily: template.titleFont,
                }}
              >
                編集する
              </Link>
            )}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-4 py-2 rounded-full text-sm font-bold border-2 bg-white/80"
              style={{
                borderColor: template.primaryColor,
                color: template.primaryColor,
                fontFamily: template.titleFont,
              }}
            >
              &#9650; 上へ
            </button>
          </div>
          <Footer template={template} />
        </div>
      </div>
    </ProfileLayout>
  );
}
