// テンプレート定義
export interface Template {
  id: string;
  name: string;
  // 画像パス
  background: string;
  profileBackground: string;
  imageFlame: string;
  characters: string[];
  loveFlame: string[];
  texts: {
    profile: string;
    love: string;
    if: string;
  };
  // テーマカラー
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  inputTextColor: string;
  // フォント
  titleFont: string;
}

// テンプレート一覧
export const TEMPLATES: Template[] = [
  {
    id: "candy",
    name: "キャンディ",
    background: "/templates/candy/background.webp",
    profileBackground: "/templates/candy/profile_background.webp",
    imageFlame: "/templates/candy/image_flame.webp",
    characters: [
      "/templates/candy/characters/1.webp",
      "/templates/candy/characters/2.webp",
      "/templates/candy/characters/3.webp",
      "/templates/candy/characters/4.webp",
    ],
    loveFlame: [
      "/templates/candy/love_flame/1.webp",
      "/templates/candy/love_flame/2.webp",
      "/templates/candy/love_flame/3.webp",
    ],
    texts: {
      profile: "/templates/candy/texts/profile.webp",
      love: "/templates/candy/texts/love.webp",
      if: "/templates/candy/texts/if.webp",
    },
    primaryColor: "#D269E6",
    secondaryColor: "#FFDB41",
    textColor: "#4a4a4a",
    inputTextColor: "#4a4a4a",
    titleFont: '"Zen Maru Gothic", "Klee One", "Zen Kurenaido", sans-serif',
  },
  {
    id: "dog",
    name: "わんこ",
    background: "/templates/dog/background.webp",
    profileBackground: "/templates/dog/profile_background.webp",
    imageFlame: "/templates/dog/image_flame.webp",
    characters: [
      "/templates/dog/characters/1.webp",
      "/templates/dog/characters/2.webp",
      "/templates/dog/characters/3.webp",
      "/templates/dog/characters/4.webp",
    ],
    loveFlame: [
      "/templates/dog/love_flame/1.webp",
      "/templates/dog/love_flame/2.webp",
      "/templates/dog/love_flame/3.webp",
    ],
    texts: {
      profile: "/templates/dog/texts/profile.webp",
      love: "/templates/dog/texts/love.webp",
      if: "/templates/dog/texts/if.webp",
    },
    primaryColor: "#F3B15B",
    secondaryColor: "#8E5036",
    textColor: "#8E5036",
    inputTextColor: "#4a4a4a",
    titleFont: '"Zen Maru Gothic", "Klee One", "Zen Kurenaido", sans-serif',
  },
  {
    id: "party",
    name: "パーティー",
    background: "/templates/party/background.webp",
    profileBackground: "/templates/party/profile_background.webp",
    imageFlame: "/templates/party/image_flame.webp",
    characters: [
      "/templates/party/characters/1.webp",
      "/templates/party/characters/2.webp",
      "/templates/party/characters/3.webp",
      "/templates/party/characters/4.webp",
    ],
    loveFlame: [
      "/templates/party/love_flame/1.webp",
      "/templates/party/love_flame/2.webp",
      "/templates/party/love_flame/3.webp",
    ],
    texts: {
      profile: "/templates/party/texts/profile.webp",
      love: "/templates/party/texts/love.webp",
      if: "/templates/party/texts/if.webp",
    },
    primaryColor: "#FF69B4",
    secondaryColor: "#41D4E0",
    textColor: "#FFFFFF",
    inputTextColor: "#4a4a4a",
    titleFont: '"Zen Maru Gothic", "Klee One", "Zen Kurenaido", sans-serif',
  },
];

// デフォルトテンプレート
export const DEFAULT_TEMPLATE = TEMPLATES[0];

// 入力用フォント（平成女児フォント固定）
export const INPUT_FONT = '"Miyu", "Klee One", "Zen Kurenaido", cursive';

// 表示用丸文字フォント
export const DISPLAY_FONT = '"Klee One", "Zen Kurenaido", cursive';

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  // デザイン設定（テンプレートID）
  template_id: string;

  // === 基本項目 ===
  nickname: string;
  residence: string | null; // 住んでる場所
  sns: string | null; // SNS (@xxx)
  comment: string | null; // 一言コメント

  // === 穴埋め項目 ===
  birth_year: string | null; // 生まれ年（4桁）
  birth_month: string | null; // 生まれ月
  birth_day: string | null; // 生まれ日
  zodiac: string | null;
  blood_type: string | null;
  personality: string | null;
  hobby: string | null;
  my_boom: string | null;
  favorite_food: string | null;
  disliked_food: string | null;
  treasure: string | null;
  happiest_moment: string | null; // 一番嬉しかったこと
  dream: string | null; // 将来のユメ
  future_self: string | null; // 10年後の私は

  // === もしも質問 ===
  if_million_yen: string | null; // もし100万円あったら？
  if_reborn: string | null; // もし生まれ変わるなら？
  if_time_machine: string | null; // もしタイムマシーンに乗れたら？

  // === 好きなもの♡コーナー ===
  favorite_animal: string | null;
  favorite_music: string | null;
  favorite_tv: string | null;

  // メタ情報
  visitor_count: number;
  created_at: string;
  updated_at: string;
}

export interface KiribanLog {
  id: string;
  profile_id: string;
  visitor_number: number;
  visitor_name: string | null;
  created_at: string;
}

export type BloodType = "A" | "B" | "O" | "AB" | "？";

export const BLOOD_TYPES = ["A", "B", "O", "AB", "？"] as const;

export const ZODIAC_SIGNS = [
  "おひつじ",
  "おうし",
  "ふたご",
  "かに",
  "しし",
  "おとめ",
  "てんびん",
  "さそり",
  "いて",
  "やぎ",
  "みずがめ",
  "うお",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

// 穴埋め部分の文字数制限
export const TEXT_LIMITS = {
  short: 10, // 月、日など
  medium: 20, // 星座、血液型など
  long: 50, // 趣味、食べ物など
  extraLong: 100, // 一番嬉しかったこと、将来の夢など
} as const;

// フィールド名の日本語ラベル
export const FIELD_LABELS: Record<string, string> = {
  nickname: "なまえ",
  residence: "すんでいるところ",
  sns: "SNS",
  comment: "ひとことコメント",
  birth_month: "月",
  birth_day: "日",
  zodiac: "星座",
  blood_type: "血液型",
  personality: "性格",
  hobby: "趣味",
  my_boom: "マイブーム",
  favorite_food: "好きな食べ物",
  disliked_food: "苦手な食べ物",
  treasure: "宝物",
  happiest_moment: "一番嬉しかったこと",
  dream: "将来のユメ",
  future_self: "10年後の私",
  if_million_yen: "もし100万円あったら",
  if_reborn: "生まれ変わるなら",
  if_time_machine: "タイムマシーンに乗れたら",
  favorite_animal: "どうぶつ",
  favorite_music: "おんがく",
  favorite_tv: "テレビ",
};
