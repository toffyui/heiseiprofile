// PC背景用の斜め文字パターン（全ページ共通）
// HeiseiJyojiフォントを使うためDOM生成方式
// パフォーマンス最適化: モバイルでは非表示、DOM要素数削減
"use client";

import { useState, useEffect } from "react";

export default function BackgroundPattern() {
  const [isMobile, setIsMobile] = useState(true); // デフォルトはモバイル（SSR対策）

  useEffect(() => {
    // 768px以上をPCとみなす
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // モバイルでは何も描画しない
  if (isMobile) return null;

  const words = ["ﾌﾟﾛﾌﾒ-ｶ-", "☆", "♡", "平成ぷろふぃーる", "♪"];
  const colors = ["#FFB6C1", "#87CEEB", "#DDA0DD"]; // ピンク、水色、紫

  // 行ごとにパターンを生成（DOM要素数を削減: 35行×50列 = 1750要素）
  const rows = [];
  for (let row = 0; row < 35; row++) {
    const items = [];
    for (let col = 0; col < 50; col++) {
      const idx = row * 50 + col;
      const word = words[idx % words.length];
      const color = colors[idx % colors.length];
      items.push(
        <span key={col} style={{ color, opacity: 0.4 }} className="mx-4">
          {word}
        </span>
      );
    }
    rows.push(
      <div key={row} className="whitespace-nowrap">
        {items}
      </div>
    );
  }

  return (
    <div className="pc-background-pattern">
      <div className="pc-background-pattern-inner">{rows}</div>
    </div>
  );
}
