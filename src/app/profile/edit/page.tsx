"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Profile, Template } from "@/types/database";
import { TEMPLATES, DEFAULT_TEMPLATE, INPUT_FONT } from "@/types/database";
import { ProfileLayout } from "@/components/ProfileLayout";
import {
  BasicInfoSection,
  QuestionsSection,
  FavoritesSection,
  IfSection,
} from "@/components/ProfileSections";

export default function ProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Profile>>({
    username: "",
    nickname: "",
    avatar_url: null,
    template_id: "dog",
    residence: null,
    sns: null,
    comment: null,
    birth_year: null,
    birth_month: null,
    birth_day: null,
    zodiac: null,
    blood_type: null,
    personality: null,
    hobby: null,
    my_boom: null,
    favorite_food: null,
    disliked_food: null,
    treasure: null,
    happiest_moment: null,
    dream: null,
    future_self: null,
    if_million_yen: null,
    if_reborn: null,
    if_time_machine: null,
    favorite_animal: null,
    favorite_music: null,
    favorite_tv: null,
  });

  const template: Template =
    TEMPLATES.find((t) => t.id === formData.template_id) || DEFAULT_TEMPLATE;

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setProfileId(profile.id);
        setFormData({
          username: profile.username || "",
          nickname: profile.nickname || "",
          avatar_url: profile.avatar_url,
          template_id: profile.template_id || "dog",
          residence: profile.residence,
          sns: profile.sns,
          comment: profile.comment,
          birth_year: profile.birth_year,
          birth_month: profile.birth_month,
          birth_day: profile.birth_day,
          zodiac: profile.zodiac,
          blood_type: profile.blood_type,
          personality: profile.personality,
          hobby: profile.hobby,
          my_boom: profile.my_boom,
          favorite_food: profile.favorite_food,
          disliked_food: profile.disliked_food,
          treasure: profile.treasure,
          happiest_moment: profile.happiest_moment,
          dream: profile.dream,
          future_self: profile.future_self,
          if_million_yen: profile.if_million_yen,
          if_reborn: profile.if_reborn,
          if_time_machine: profile.if_time_machine,
          favorite_animal: profile.favorite_animal,
          favorite_music: profile.favorite_music,
          favorite_tv: profile.favorite_tv,
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const handleFieldChange = (field: keyof Profile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("画像は2MB以下にしてください");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }

    setUploadingAvatar(true);
    setError("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      if (formData.avatar_url) {
        const oldFileName = formData.avatar_url.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("avatars").remove([oldFileName]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError("アップロードに失敗しました: " + uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setFormData((prev) => ({
        ...prev,
        avatar_url: publicUrl,
      }));
    } catch {
      setError("アップロードに失敗しました");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (!formData.username?.trim()) {
      setError("ユーザー名は必須です");
      setSaving(false);
      return;
    }

    if (!formData.nickname?.trim()) {
      setError("なまえは必須です");
      setSaving(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("ユーザー名は半角英数字とアンダースコアのみ使用できます");
      setSaving(false);
      return;
    }

    try {
      const supabase = createClient();

      const profileData = {
        user_id: userId!,
        username: formData.username.toLowerCase(),
        nickname: formData.nickname,
        avatar_url: formData.avatar_url,
        template_id: formData.template_id || "dog",
        residence: formData.residence || null,
        sns: formData.sns || null,
        comment: formData.comment || null,
        birth_year: formData.birth_year || null,
        birth_month: formData.birth_month || null,
        birth_day: formData.birth_day || null,
        zodiac: formData.zodiac || null,
        blood_type: formData.blood_type || null,
        personality: formData.personality || null,
        hobby: formData.hobby || null,
        my_boom: formData.my_boom || null,
        favorite_food: formData.favorite_food || null,
        disliked_food: formData.disliked_food || null,
        treasure: formData.treasure || null,
        happiest_moment: formData.happiest_moment || null,
        dream: formData.dream || null,
        future_self: formData.future_self || null,
        if_million_yen: formData.if_million_yen || null,
        if_reborn: formData.if_reborn || null,
        if_time_machine: formData.if_time_machine || null,
        favorite_animal: formData.favorite_animal || null,
        favorite_music: formData.favorite_music || null,
        favorite_tv: formData.favorite_tv || null,
      };

      if (profileId) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update(profileData)
          .eq("id", profileId);

        if (updateError) {
          if (updateError.message.includes("duplicate")) {
            setError("このユーザー名は既に使用されています");
          } else {
            setError(updateError.message);
          }
          setSaving(false);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert(profileData);

        if (insertError) {
          if (insertError.message.includes("duplicate")) {
            setError("このユーザー名は既に使用されています");
          } else {
            setError(insertError.message);
          }
          setSaving(false);
          return;
        }
      }

      router.push(`/${formData.username}`);
    } catch {
      setError("保存に失敗しました");
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white/80 p-6 rounded-2xl">
          <p className="text-lg">読み込み中...</p>
          <p className="blink text-2xl">&#10024;</p>
        </div>
      </div>
    );
  }

  return (
    <ProfileLayout template={template}>
      {/* テーマ選択の案内テキスト */}
      <div className="text-center mb-3">
        <p
          className="text-sm font-bold mb-1 text-shadow-xs text-shadow-white"
          style={{
            color: template.primaryColor,
            fontFamily: template.titleFont,
          }}
        >
          <span className="retro-bounce-text">☆</span>
          <span className="retro-bounce-text">テ</span>
          <span className="retro-bounce-text">ー</span>
          <span className="retro-bounce-text">マ</span>
          <span className="retro-bounce-text">を</span>
          <span className="retro-bounce-text">え</span>
          <span className="retro-bounce-text">ら</span>
          <span className="retro-bounce-text">ぶ</span>
          <span className="retro-bounce-text">☆</span>
        </p>
        <p
          className="text-lg blink text-shadow-xs text-shadow-white"
          style={{
            color: template.secondaryColor,
            fontFamily: template.titleFont,
          }}
        >
          ↓↓↓(o^∀^o)↓↓↓
        </p>
      </div>

      {/* テンプレート選択 */}
      <div className="flex justify-center gap-4 mb-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleFieldChange("template_id", t.id)}
            className={`relative p-2 rounded-full transition-all ${
              formData.template_id === t.id ? "bg-white scale-110" : ""
            }`}
          >
            <Image
              src={t.characters[0]}
              alt={t.name}
              width={40}
              height={40}
              className="rounded-lg object-contain"
              style={{ width: 40, height: 40 }}
            />
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        {/* 基本情報カード */}
        <BasicInfoSection
          template={template}
          profile={formData}
          editable={true}
          onFieldChange={handleFieldChange}
          onAvatarClick={handleAvatarClick}
          uploadingAvatar={uploadingAvatar}
        />
        <div className="px-6">
          {/* 穴埋め部分 */}
          <QuestionsSection
            template={template}
            profile={formData}
            editable={true}
            onFieldChange={handleFieldChange}
          />

          {/* 好きなもの♡コーナー */}
          <FavoritesSection
            template={template}
            profile={formData}
            editable={true}
            onFieldChange={handleFieldChange}
          />

          {/* もしもコーナー */}
          <IfSection
            template={template}
            profile={formData}
            editable={true}
            onFieldChange={handleFieldChange}
          />

          {/* プロフURL */}
          <div className="mb-4">
            <p
              className="text-xs mb-1 text-center"
              style={{
                color: template.primaryColor,
                fontFamily: template.titleFont,
              }}
            >
              あなたのプロフURL
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm" style={{ color: template.textColor }}>
                heiseiprofile.com/
              </span>
              <input
                type="text"
                value={formData.username || ""}
                onChange={(e) => handleFieldChange("username", e.target.value)}
                placeholder="username"
                className="w-32 px-2 py-1 text-sm text-center border-b-2 border-dashed bg-transparent focus:outline-none"
                style={{
                  borderColor: template.primaryColor,
                  fontFamily: INPUT_FONT,
                }}
                required
              />
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="text-sm text-center p-3 mb-4 rounded-xl bg-red-100 text-red-600 border-2 border-red-300">
              {error}
            </div>
          )}

          {/* 保存ボタン */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 text-lg font-bold rounded-full shadow-lg disabled:opacity-50 text-white"
            style={{
              backgroundColor: template.primaryColor,
              fontFamily: template.titleFont,
            }}
          >
            {saving ? "ほぞんちゅう..." : "かんせい！"}
          </button>
        </div>
      </form>

      {/* フッター */}
      <div className="flex gap-2 mt-2 justify-center">
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs underline"
          style={{
            color: template.textColor,
          }}
        >
          ログアウト
        </button>
        <Link
          href="/"
          className="text-xs underline"
          style={{ color: template.textColor }}
        >
          TOPへ戻る
        </Link>
      </div>
    </ProfileLayout>
  );
}
