"use client";

interface VisitorCounterProps {
  count: number;
}

export default function VisitorCounter({ count }: VisitorCounterProps) {
  const countStr = count.toString().padStart(6, "0");

  return (
    <div className="text-center">
      <p className="text-sm mb-2 font-bold">
        ☆ あなたは ☆
      </p>
      <div className="retro-counter inline-block">
        {countStr.split("").map((digit, i) => (
          <span key={i} className="inline-block min-w-[1ch]">{digit}</span>
        ))}
      </div>
      <p className="text-sm mt-2 font-bold">
        人目のお客様です♪
      </p>
    </div>
  );
}
