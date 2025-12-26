"use client";

import { useState, useEffect } from "react";
import { getKiribanMessage, getKiribanType } from "@/lib/kiriban";
import { createClient } from "@/lib/supabase";

interface KiribanCelebrationProps {
  count: number;
  profileId: string;
  onClose: () => void;
}

export default function KiribanCelebration({ count, profileId, onClose }: KiribanCelebrationProps) {
  const [visitorName, setVisitorName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const kiribanType = getKiribanType(count);
  const message = getKiribanMessage(count);

  const handleSave = async () => {
    if (!visitorName.trim()) return;
    setSaving(true);

    try {
      const supabase = createClient();
      await supabase.from("kiriban_logs").insert({
        profile_id: profileId,
        visitor_number: count,
        visitor_name: visitorName.trim(),
      });
      setSaved(true);
    } catch {
      // エラーは無視
    } finally {
      setSaving(false);
    }
  };

  // 派手なエフェクトのためのスタイル
  const getBgStyle = () => {
    switch (kiribanType) {
      case "lucky7":
        return "bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400";
      case "zorome":
        return "bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400";
      case "thousand":
        return "bg-gradient-to-b from-gold-400 via-yellow-300 to-orange-400";
      default:
        return "bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center kiriban-flash">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className={`relative ${getBgStyle()} rounded-lg p-6 max-w-sm mx-4 kiriban-bounce shadow-2xl`}>
        {/* キラキラ装飾 */}
        <div className="absolute -top-4 -left-4 text-3xl sparkle">☆</div>
        <div className="absolute -top-4 -right-4 text-3xl sparkle" style={{ animationDelay: "0.2s" }}>☆</div>
        <div className="absolute -bottom-4 -left-4 text-3xl sparkle" style={{ animationDelay: "0.4s" }}>☆</div>
        <div className="absolute -bottom-4 -right-4 text-3xl sparkle" style={{ animationDelay: "0.6s" }}>☆</div>

        <div className="text-center text-white">
          {/* メインメッセージ */}
          <div className="text-4xl font-bold mb-4 rainbow-text drop-shadow-lg">
            おめでとう!!
          </div>

          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <p className="text-2xl font-bold mb-2">{message}</p>
            <p className="text-lg">キリ番ゲットです!!</p>
          </div>

          {/* 名前入力 */}
          {!saved ? (
            <div className="space-y-3">
              <p className="text-sm">記念に名前を残していってね♪</p>
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-3 py-2 rounded text-gray-800 text-center"
                placeholder="あなたの名前"
                maxLength={20}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !visitorName.trim()}
                  className="flex-1 bg-white text-pink-500 font-bold py-2 rounded hover:bg-pink-100 disabled:opacity-50"
                >
                  {saving ? "保存中..." : "登録する"}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-white/30 text-white font-bold py-2 rounded hover:bg-white/40"
                >
                  スキップ
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-lg font-bold">
                {visitorName}さん<br />
                登録完了☆
              </p>
              <button
                onClick={onClose}
                className="w-full bg-white text-pink-500 font-bold py-2 rounded hover:bg-pink-100"
              >
                閉じる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
