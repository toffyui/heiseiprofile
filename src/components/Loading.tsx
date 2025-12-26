"use client";

import Image from "next/image";
import { DEFAULT_TEMPLATE } from "@/types/database";

interface LoadingProps {
  fullScreen?: boolean;
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  const content = (
    <div className="text-center">
      <Image
        src="/loading.gif"
        alt="Loading"
        width={80}
        height={80}
        className="mx-auto mb-2"
        unoptimized
      />
      <p
        className="text-base font-bold"
        style={{
          color: DEFAULT_TEMPLATE.primaryColor,
          fontFamily: DEFAULT_TEMPLATE.titleFont,
        }}
      >
        よみこみちゅう・・・
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 p-6 rounded-2xl">{content}</div>
      </div>
    );
  }

  return content;
}
