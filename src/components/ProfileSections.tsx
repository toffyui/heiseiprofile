"use client";

import Image from "next/image";
import type { Profile, Template } from "@/types/database";
import {
  INPUT_FONT,
  ZODIAC_SIGNS,
  BLOOD_TYPES,
  TEXT_LIMITS,
} from "@/types/database";
import { AvatarWithFlame, TitleImage } from "@/components/ProfileLayout";

// ============================================
// 共通Props
// ============================================
interface ProfileSectionProps {
  template: Template;
  profile: Partial<Profile>;
  editable?: boolean;
  onFieldChange?: (field: keyof Profile, value: string) => void;
}

interface BasicInfoProps extends ProfileSectionProps {
  onAvatarClick?: () => void;
  uploadingAvatar?: boolean;
}

// ============================================
// 共通フィールドコンポーネント
// ============================================

// 下線付きテキストフィールド（基本情報用）
function TextField({
  value,
  placeholder,
  editable,
  onChange,
  borderColor,
  textSize = "text-sm",
  maxLength,
  required,
  className = "w-full",
}: {
  value?: string | null;
  placeholder: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  borderColor: string;
  textSize?: string;
  maxLength?: number;
  required?: boolean;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={editable ? placeholder : ""}
      disabled={!editable}
      className={`${className} px-2 py-1 ${textSize} border-b-2 border-dashed bg-transparent focus:outline-none disabled:opacity-100 disabled:cursor-default ${
        textSize === "text-lg" ? "font-bold" : ""
      }`}
      style={{ borderColor, fontFamily: INPUT_FONT }}
      maxLength={maxLength}
      required={required}
    />
  );
}

// インラインフィールド（穴埋め用）
function InlineField({
  value,
  placeholder,
  editable,
  onChange,
  width = "w-20",
  maxLength,
}: {
  value?: string | null;
  placeholder: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  width?: string;
  maxLength?: number;
}) {
  return (
    <input
      type="text"
      value={value || (editable ? "" : placeholder)}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={editable ? placeholder : ""}
      disabled={!editable}
      className={`${width} px-2 py-1 mx-1 text-center bg-gray-50 rounded-full shadow-sm border-0 focus:outline-none disabled:opacity-100 disabled:cursor-default`}
      style={{ fontFamily: INPUT_FONT }}
      maxLength={maxLength}
    />
  );
}

// インラインセレクト（穴埋め用）
function InlineSelect({
  value,
  placeholder,
  options,
  editable,
  onChange,
}: {
  value?: string | null;
  placeholder: string;
  options: readonly string[];
  editable?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={!editable}
      className="px-2 py-1 mx-1 text-center bg-gray-50 rounded-full shadow-sm border-0 focus:outline-none appearance-none disabled:opacity-100 disabled:cursor-default"
      style={{ fontFamily: INPUT_FONT }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

// フィールドラベル
function FieldLabel({
  label,
  editable,
  color,
  font,
}: {
  label: string;
  editable?: boolean;
  color: string;
  font: string;
}) {
  return (
    <p className="text-xs" style={{ color, fontFamily: font }}>
      {editable ? "★" : ""}
      {label}
    </p>
  );
}

// ラベル付きフィールド（もしも用 - 縦並び）
function LabeledField({
  label,
  value,
  editable,
  onChange,
  labelColor,
  labelFont,
  maxLength,
}: {
  label: string;
  value?: string | null;
  editable?: boolean;
  onChange?: (value: string) => void;
  labelColor: string;
  labelFont: string;
  maxLength?: number;
}) {
  return (
    <div>
      <p
        className="text-sm mb-1 font-bold"
        style={{ color: labelColor, fontFamily: labelFont }}
      >
        {label}
      </p>
      <textarea
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={""}
        rows={3}
        disabled={!editable}
        className="w-full p-3 text-xs bg-gray-50 rounded-lg border focus:outline-none disabled:opacity-100 disabled:cursor-default"
        style={{ fontFamily: INPUT_FONT, borderColor: labelColor }}
        maxLength={maxLength}
      />
    </div>
  );
}

// ============================================
// セクションコンポーネント
// ============================================

// 基本情報セクション
export function BasicInfoSection({
  template,
  profile,
  editable = false,
  onFieldChange,
  onAvatarClick,
  uploadingAvatar,
}: BasicInfoProps) {
  return (
    <div
      className="relative mt-10 z-10 py-6 px-16 rounded-2xl bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${template.profileBackground})`,
      }}
    >
      <TitleImage
        src={template.texts.profile}
        alt="Profile"
        width={200}
        height={50}
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
      />
      {/* アバター & なまえ */}
      <div className="flex items-center gap-4">
        <AvatarWithFlame
          template={template}
          avatarUrl={profile.avatar_url || null}
          nickname={profile.nickname || ""}
          size={60}
          onClick={editable ? onAvatarClick : undefined}
          uploading={uploadingAvatar}
        />
        <div className="flex-1 pt-2">
          <FieldLabel
            label="なまえ"
            editable={editable}
            color={template.primaryColor}
            font={template.titleFont}
          />
          <TextField
            value={profile.nickname}
            placeholder="なまえを入力"
            editable={editable}
            onChange={(v) => onFieldChange?.("nickname", v)}
            borderColor={`${template.primaryColor}60`}
            maxLength={20}
            required
          />
          {/* 住所 */}
          <div className="mb-2">
            <FieldLabel
              label="すんでいるところ"
              editable={editable}
              color={template.primaryColor}
              font={template.titleFont}
            />
            <TextField
              value={profile.residence}
              placeholder="○○けん とか"
              editable={editable}
              onChange={(v) => onFieldChange?.("residence", v)}
              borderColor={`${template.primaryColor}60`}
              maxLength={30}
            />
          </div>
        </div>
      </div>

      {/* SNS */}
      <div className="mb-2 px-2">
        <FieldLabel
          label="SNS"
          editable={editable}
          color={template.primaryColor}
          font={template.titleFont}
        />
        <div className="flex items-center">
          <span className="text-sm mr-1">@</span>
          <TextField
            value={profile.sns}
            placeholder="username"
            editable={editable}
            onChange={(v) => onFieldChange?.("sns", v)}
            borderColor={`${template.primaryColor}60`}
            className="flex-1"
            maxLength={30}
          />
        </div>
      </div>

      {/* ひとこと */}
      <div className="px-8">
        <FieldLabel
          label="ひとこと"
          editable={editable}
          color={template.primaryColor}
          font={template.titleFont}
        />
        <TextField
          value={profile.comment}
          placeholder="よろしくね！"
          editable={editable}
          onChange={(v) => onFieldChange?.("comment", v)}
          borderColor={`${template.primaryColor}60`}
          maxLength={12}
        />
      </div>
    </div>
  );
}

// Questions（穴埋め）セクション
export function QuestionsSection({
  template,
  profile,
  editable = false,
  onFieldChange,
}: ProfileSectionProps) {
  return (
    <div
      className="relative z-10 space-y-2 text-sm mt-4 py-2 "
      style={{ fontFamily: template.titleFont, color: template.textColor }}
    >
      <Image
        src={template.characters[0]}
        alt=""
        width={80}
        height={80}
        className="absolute -bottom-2 -right-6 pointer-events-none object-contain"
      />
      <Image
        src={template.characters[1]}
        alt=""
        width={60}
        height={60}
        className="absolute -bottom-12 right-12 pointer-events-none object-contain"
      />

      {/* 誕生日・星座 */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>私</span>
        <span>は</span>
        <InlineField
          value={profile.birth_year}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("birth_year", v)}
          width="w-16"
          maxLength={4}
        />
        <span>年</span>
        <InlineField
          value={profile.birth_month}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("birth_month", v)}
          width="w-10"
          maxLength={2}
        />
        <span>月</span>
        <InlineField
          value={profile.birth_day}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("birth_day", v)}
          width="w-10"
          maxLength={2}
        />
        <span>日</span>
        <span>生</span>
        <span>ま</span>
        <span>れ</span>
        <span>で</span>
        <span>、</span>
        <span>星</span>
        <span>座</span>
        <span>は</span>
        <InlineSelect
          value={profile.zodiac}
          placeholder=""
          options={ZODIAC_SIGNS}
          editable={editable}
          onChange={(v) => onFieldChange?.("zodiac", v)}
        />
        <span>座</span>
        <span>だ</span>
        <span>よ</span>
        <span>！</span>
        <span>！</span>
        <span>血</span>
        <span>液</span>
        <span>型</span>
        <span>は</span>
        <InlineSelect
          value={profile.blood_type}
          placeholder=""
          options={BLOOD_TYPES}
          editable={editable}
          onChange={(v) => onFieldChange?.("blood_type", v)}
        />
        <span>型</span>
        <span>な</span>
        <span>ん</span>
        <span>だ</span>
        <span>！</span>
      </p>

      {/* 血液型・性格 */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>み</span>
        <span>ん</span>
        <span>な</span>
        <span>か</span>
        <span>ら</span>
        <span>は</span>
        <InlineField
          value={profile.personality}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("personality", v)}
          width="w-32"
          maxLength={TEXT_LIMITS.medium}
        />
        <span>な</span>
        <span>性</span>
        <span>格</span>
        <span>っ</span>
        <span>て</span>
        <span>い</span>
        <span>わ</span>
        <span>れ</span>
        <span>る</span>
        <span>よ</span>
        <span>！</span>
      </p>

      {/* 趣味・マイブーム */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>趣</span>
        <span>味</span>
        <span>は</span>
        <InlineField
          value={profile.hobby}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("hobby", v)}
          width="w-42"
          maxLength={TEXT_LIMITS.medium}
        />
        <span>な</span>
        <span>ん</span>
        <span>だ</span>
        <span>け</span>
        <span>ど</span>
        <span>、</span>
        <span>実</span>
        <span>は</span>
        <span>最</span>
        <span>近</span>
        <InlineField
          value={profile.my_boom}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("my_boom", v)}
          width="w-40"
          maxLength={TEXT_LIMITS.short}
        />
        <span>に</span>
        <span>ハ</span>
        <span>マ</span>
        <span>っ</span>
        <span>て</span>
        <span>る</span>
        <span>よ</span>
        <span>！</span>
      </p>

      {/* 食べ物 */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>食</span>
        <span>べ</span>
        <span>物</span>
        <span>は</span>
        <InlineField
          value={profile.favorite_food}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("favorite_food", v)}
          width="w-20"
          maxLength={TEXT_LIMITS.short}
        />
        <span>が</span>
        <span>ス</span>
        <span>キ</span>
        <span>。</span>
        <span>け</span>
        <span>ど</span>
        <span>、</span>
        <InlineField
          value={profile.disliked_food}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("disliked_food", v)}
          width="w-20"
          maxLength={TEXT_LIMITS.short}
        />
        <span>は</span>
        <span>苦</span>
        <span>手</span>
        <span>な</span>
        <span>ん</span>
        <span>だ</span>
        <span>よ</span>
        <span>ね</span>
        <span>。</span>
      </p>

      {/* 宝物・嬉しかったこと */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>大</span>
        <span>切</span>
        <span>に</span>
        <span>し</span>
        <span>て</span>
        <span>い</span>
        <span>る</span>
        <span>宝</span>
        <span>物</span>
        <span>は</span>
        <InlineField
          value={profile.treasure}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("treasure", v)}
          width="w-32"
          maxLength={TEXT_LIMITS.medium}
        />
        <span>で</span>
        <span>、</span>
        <span>今</span>
        <span>ま</span>
        <span>で</span>
        <span>で</span>
        <span>一</span>
        <span>番</span>
        <span>嬉</span>
        <span>し</span>
        <span>か</span>
        <span>っ</span>
        <span>た</span>
        <span>こ</span>
        <span>と</span>
        <span>は</span>
        <InlineField
          value={profile.happiest_moment}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("happiest_moment", v)}
          width="w-42"
          maxLength={TEXT_LIMITS.medium}
        />
        <span>か</span>
        <span>な</span>
        <span>。</span>
      </p>

      {/* 将来の夢 */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>将</span>
        <span>来</span>
        <span>の</span>
        <span>ユ</span>
        <span>メ</span>
        <span>は</span>
        <InlineField
          value={profile.dream}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("dream", v)}
          width="w-40"
          maxLength={TEXT_LIMITS.medium}
        />
        <span>だ</span>
        <span>よ</span>
        <span>！</span>
      </p>

      {/* 10年後 */}
      <p className="flex flex-wrap items-center gap-y-2">
        <span>1</span>
        <span>0</span>
        <span>年</span>
        <span>後</span>
        <span>の</span>
        <span>私</span>
        <span>は</span>
        <InlineField
          value={profile.future_self}
          placeholder=""
          editable={editable}
          onChange={(v) => onFieldChange?.("future_self", v)}
          width="w-52"
          maxLength={TEXT_LIMITS.extraLong}
        />
      </p>
      <p className="flex flex-wrap items-center gap-y-2">
        <span>と</span>
        <span>思</span>
        <span>う</span>
        <span>よ</span>
        <span>！</span>
      </p>
    </div>
  );
}

// 好きなものセクション
export function FavoritesSection({
  template,
  profile,
  editable = false,
  onFieldChange,
}: ProfileSectionProps) {
  const favorites = [
    {
      label: "どうぶつ",
      field: "favorite_animal" as const,
      value: profile.favorite_animal,
    },
    {
      label: "おんがく",
      field: "favorite_music" as const,
      value: profile.favorite_music,
    },
    {
      label: "テレビ",
      field: "favorite_tv" as const,
      value: profile.favorite_tv,
    },
  ];

  return (
    <div className="py-2 ">
      <TitleImage
        src={template.texts.love}
        alt="スキなもの"
        width={200}
        height={50}
      />
      <div className="flex justify-center relative">
        <Image
          src={template.characters[3]}
          alt=""
          width={60}
          height={60}
          className="absolute bottom-2 -left-6 z-20 pointer-events-none object-contain"
        />
        {favorites.map((item, index) => (
          <div
            key={item.field}
            className="relative flex flex-col items-center"
            style={{ width: 160, height: 160 }}
          >
            {/* ハート型フレーム背景 */}
            <Image
              src={template.loveFlame[index]}
              alt=""
              width={160}
              height={160}
              className="absolute inset-0 pointer-events-none object-contain"
            />
            {/* ラベル */}
            <p
              className="relative z-10 text-xs font-bold mt-3 text-center text-shadow-xs text-shadow-white"
              style={{
                color: template.textColor,
                fontFamily: template.titleFont,
              }}
            >
              {item.label}
            </p>
            {/* textarea */}
            <textarea
              value={item.value || ""}
              onChange={(e) => onFieldChange?.(item.field, e.target.value)}
              placeholder={""}
              disabled={!editable}
              rows={3}
              maxLength={TEXT_LIMITS.medium}
              className="relative z-10 w-20 mt-2 p-1 text-xs text-center bg-transparent border-0 resize-none focus:outline-none disabled:opacity-100 disabled:cursor-default"
              style={{ fontFamily: INPUT_FONT }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// もしもセクション
export function IfSection({
  template,
  profile,
  editable = false,
  onFieldChange,
}: ProfileSectionProps) {
  return (
    <div className="relative py-2 ">
      {/* デコ */}
      <Image
        src={template.characters[2]}
        alt=""
        width={70}
        height={70}
        className="absolute -top-4 right-2 z-20 pointer-events-none object-contain"
      />
      <Image
        src={template.characters[1]}
        alt=""
        width={60}
        height={60}
        className="absolute -bottom-6 -left-2 z-20 pointer-events-none object-contain"
      />
      <TitleImage
        src={template.texts.if}
        alt="もしも"
        width={200}
        height={50}
      />
      <div className="space-y-2 mt-2">
        <LabeledField
          label="もし100万円あったら？"
          value={profile.if_million_yen}
          editable={editable}
          onChange={(v) => onFieldChange?.("if_million_yen", v)}
          labelColor={template.primaryColor}
          labelFont={template.titleFont}
          maxLength={TEXT_LIMITS.long}
        />
        <LabeledField
          label="もし生まれ変わるなら？"
          value={profile.if_reborn}
          editable={editable}
          onChange={(v) => onFieldChange?.("if_reborn", v)}
          labelColor={template.primaryColor}
          labelFont={template.titleFont}
          maxLength={TEXT_LIMITS.long}
        />
        <LabeledField
          label="もしタイムマシーンに乗れたら？"
          value={profile.if_time_machine}
          editable={editable}
          onChange={(v) => onFieldChange?.("if_time_machine", v)}
          labelColor={template.primaryColor}
          labelFont={template.titleFont}
          maxLength={TEXT_LIMITS.long}
        />
      </div>
    </div>
  );
}
