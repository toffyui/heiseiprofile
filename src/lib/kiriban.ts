// キリ番判定ロジック
// 平成時代のキリ番文化を再現

export function isKiriban(count: number): boolean {
  // 100の倍数
  if (count % 100 === 0) return true;

  // ゾロ目 (111, 222, 333, ... 9999, 11111, など)
  if (isZorome(count)) return true;

  // ラッキー7 (7, 77, 777, 7777, など)
  if (isAllSevens(count)) return true;

  // 1000の倍数
  if (count % 1000 === 0) return true;

  return false;
}

function isZorome(n: number): boolean {
  const str = n.toString();
  if (str.length < 2) return false;
  return str.split('').every(c => c === str[0]);
}

function isAllSevens(n: number): boolean {
  return /^7+$/.test(n.toString());
}

export function getKiribanMessage(count: number): string {
  if (isAllSevens(count)) {
    return `${count}人目☆*:.｡.ラッキーセブン.｡.:*☆`;
  }
  if (isZorome(count)) {
    return `${count}人目♪ゾロ目ゲットおめでとう♪`;
  }
  if (count % 1000 === 0) {
    return `祝☆${count}人目!!大キリ番おめでとう!!`;
  }
  if (count % 100 === 0) {
    return `${count}人目☆キリ番おめでとう☆`;
  }
  return '';
}

export function getKiribanType(count: number): 'lucky7' | 'zorome' | 'thousand' | 'hundred' | null {
  if (isAllSevens(count)) return 'lucky7';
  if (isZorome(count)) return 'zorome';
  if (count % 1000 === 0) return 'thousand';
  if (count % 100 === 0) return 'hundred';
  return null;
}
