"use client";

import Image from "next/image";
import type { Template } from "@/types/database";

interface ProfileLayoutProps {
  template: Template;
  children: React.ReactNode;
}

// テキストシャドースタイル（読みやすさのため）
export const textShadowStyle = {
  textShadow:
    "1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9), 1px -1px 2px rgba(255,255,255,0.9), -1px 1px 2px rgba(255,255,255,0.9)",
};

// メインレイアウト - 背景とコンテナ
export function ProfileLayout({ template, children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* PC横幅制限 + 背景画像 */}
      <div
        className="max-w-md mx-auto min-h-screen flex flex-col relative z-10"
        style={{
          backgroundImage: `url(${template.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1 py-6 mx-auto w-full">{children}</div>
      </div>
    </div>
  );
}

// アバター with フレーム（1:1比率保証）
interface AvatarWithFlameProps {
  template: Template;
  avatarUrl: string | null;
  nickname: string;
  size?: number; // px
  onClick?: () => void;
  uploading?: boolean;
}

export function AvatarWithFlame({
  template,
  avatarUrl,
  nickname,
  size = 80,
  onClick,
  uploading,
}: AvatarWithFlameProps) {
  const flameSize = size + 16; // フレームは少し大きく

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {/* フレーム */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          width: flameSize,
          height: flameSize,
          top: -8,
          left: -8,
        }}
      >
        <Image
          src={template.imageFlame}
          alt=""
          width={flameSize}
          height={flameSize}
          className="object-contain"
          style={{ width: flameSize, height: flameSize }}
        />
      </div>
      {/* アバター */}
      <div
        className={`w-full h-full rounded-lg overflow-hidden relative z-0 ${
          onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
        }`}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={nickname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-2xl"
            style={{
              backgroundColor: `${template.primaryColor}20`,
              color: template.primaryColor,
            }}
          >
            &#128100;
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="blink">...</span>
          </div>
        )}
      </div>
    </div>
  );
}

// タイトル画像
interface TitleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function TitleImage({
  src,
  alt,
  width = 200,
  height = 50,
  className = "",
}: TitleImageProps) {
  return (
    <div className={`text-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mx-auto object-contain"
        style={{ width, height }}
      />
    </div>
  );
}
