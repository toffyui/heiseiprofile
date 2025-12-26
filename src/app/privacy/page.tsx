"use client";

import Link from "next/link";
import { DEFAULT_TEMPLATE } from "@/types/database";
import { ProfileLayout } from "@/components/ProfileLayout";
import Footer from "@/components/Footer";

const OPERATOR_NAME = "小柳友衣子";
const CONTACT_SNS = "@toffy_dev";

export default function PrivacyPage() {
  const template = DEFAULT_TEMPLATE;

  return (
    <ProfileLayout template={template}>
      <div className="flex flex-col min-h-full">
        <div className="flex-1 px-6 py-4">
          {/* タイトル */}
          <div className="text-center mb-4">
            <h1
              className="text-xl font-bold mb-1 text-shadow-xs text-shadow-white"
              style={{
                color: template.primaryColor,
                fontFamily: template.titleFont,
              }}
            >
              ☆ プライバシーポリシー ☆
            </h1>
          </div>

          {/* コンテンツ */}
          <div className="rounded-2xl p-4 w-full max-w-sm mx-auto bg-white/80">
            <div
              className="text-sm leading-relaxed space-y-4"
              style={{
                color: template.textColor,
                fontFamily: template.titleFont,
              }}
            >
              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ はじめに
                </h2>
                <p>
                  平成ぷろふぃーる（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 収集する情報
                </h2>
                <p>本サービスでは以下の情報を収集します：</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Googleアカウント情報（メールアドレス）</li>
                  <li>プロフィールに入力された情報</li>
                  <li>アップロードされた画像</li>
                  <li>アクセスログ（IPアドレス、閲覧日時等）</li>
                </ul>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 情報の利用目的
                </h2>
                <p>収集した情報は以下の目的で利用します：</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>本サービスの提供・運営</li>
                  <li>ユーザー認証</li>
                  <li>プロフィールページの表示</li>
                  <li>訪問者カウンター・キリ番機能の提供</li>
                  <li>サービス改善のための分析</li>
                </ul>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 情報の第三者提供
                </h2>
                <p>
                  法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ Cookieの使用
                </h2>
                <p>
                  本サービスでは、ユーザー認証およびサービス改善のためにCookieを使用しています。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ データの保管
                </h2>
                <p>
                  ユーザーデータはSupabase（クラウドサービス）に保管されます。適切なセキュリティ対策を講じていますが、インターネット上の通信は完全な安全性を保証するものではありません。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ ユーザーの権利
                </h2>
                <p>ユーザーは以下の権利を有します：</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>自身の情報の閲覧・修正</li>
                  <li>アカウントの削除依頼</li>
                </ul>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ お問い合わせ
                </h2>
                <p>
                  プライバシーに関するお問い合わせは、X（Twitter）アカウント{" "}
                  {CONTACT_SNS} までご連絡ください。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 改定
                </h2>
                <p>
                  本ポリシーは予告なく変更されることがあります。変更後のポリシーは本ページに掲載した時点で効力を生じます。
                </p>
              </section>

              <p
                className="text-center mt-4"
                style={{ color: template.primaryColor }}
              >
                運営者: {OPERATOR_NAME}
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-auto px-6 pb-4">
          <Link
            href="/"
            className="text-sm underline mb-2 inline-block"
            style={{ color: template.textColor }}
          >
            TOPへ戻る
          </Link>
          <Footer template={template} />
        </div>
      </div>
    </ProfileLayout>
  );
}
