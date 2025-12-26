// PC背景用の斜め文字パターン（全ページ共通）
// HeiseiJyojiフォントを使うためDOM生成方式
export default function BackgroundPattern() {
  const words = ["ﾌﾟﾛﾌﾒ-ｶ-", "☆", "♡", "平成ぷろふぃーる", "♪"];
  const colors = ["#FFB6C1", "#87CEEB", "#DDA0DD"]; // ピンク、水色、紫

  // 行ごとにパターンを生成
  const rows = [];
  for (let row = 0; row < 80; row++) {
    const items = [];
    for (let col = 0; col < 100; col++) {
      const idx = row * 40 + col;
      const word = words[idx % words.length];
      const color = colors[idx % colors.length];
      items.push(
        <span key={col} style={{ color, opacity: 0.4 }} className="mx-1">
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
