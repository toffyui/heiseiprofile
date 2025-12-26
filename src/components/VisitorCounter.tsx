"use client";

import type { Template } from "@/types/database";
import { textShadowStyle } from "./ProfileLayout";

interface VisitorCounterProps {
  count: number;
  template: Template;
}

export default function VisitorCounter({
  count,
  template,
}: VisitorCounterProps) {
  const countStr = count.toString().padStart(6, "0");

  return (
    <div
      className="relative py-2 px-4 mx-4"
      style={{
        background: `linear-gradient(90deg, transparent, ${template.primaryColor}20, ${template.primaryColor}40, ${template.primaryColor}20, transparent)`,
        borderTop: `2px dashed ${template.primaryColor}60`,
        borderBottom: `2px dashed ${template.primaryColor}60`,
      }}
    >
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span
          className="text-xs font-bold sparkle"
          style={{
            color: template.primaryColor,
            fontFamily: template.titleFont,
            ...textShadowStyle,
          }}
        >
          ★あなたは
        </span>
        {/* レトロなカウンター数字 */}
        <div className="flex gap-0.5">
          {countStr.split("").map((digit, i) => (
            <span
              key={i}
              className="inline-block w-5 h-6 text-center text-sm font-bold leading-6 rounded"
              style={{
                background:
                  "linear-gradient(180deg, #333 0%, #666 50%, #333 100%)",
                color: "#00ff00",
                fontFamily: "monospace",
                textShadow: "0 0 4px #00ff00",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {digit}
            </span>
          ))}
        </div>
        <span
          className="text-xs font-bold sparkle"
          style={{
            color: template.primaryColor,
            fontFamily: template.titleFont,
            ...textShadowStyle,
          }}
        >
          人目のお客様です★
        </span>
      </div>
    </div>
  );
}
