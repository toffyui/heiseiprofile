import Link from "next/link";
import type { Template } from "@/types/database";

interface FooterProps {
  template: Template;
}

export default function Footer({ template }: FooterProps) {
  return (
    <div
      className="text-center text-sm mt-4 space-y-1"
      style={{ color: template.textColor, fontFamily: template.titleFont }}
    >
      <div className="flex justify-center gap-3">
        <Link href="/privacy" className="underline hover:opacity-70">
          プライバシーポリシー
        </Link>
        <Link href="/terms" className="underline hover:opacity-70">
          利用規約
        </Link>
      </div>
      <p>&copy; 2025 平成プロフィール All Rights Reserved.</p>
      <p className="text-xs opacity-70">
        Font:{" "}
        <a
          href="http://sozaiya405.chu.jp/405/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70"
        >
          素材屋405番地
        </a>
        {" "}(みきゆFont)
      </p>
    </div>
  );
}
