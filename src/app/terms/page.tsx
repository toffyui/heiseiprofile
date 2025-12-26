"use client";

import Link from "next/link";
import { DEFAULT_TEMPLATE } from "@/types/database";
import { ProfileLayout } from "@/components/ProfileLayout";
import Footer from "@/components/Footer";

const OPERATOR_NAME = "小柳友衣子";
const CONTACT_SNS = "@toffy_dev";

export default function TermsPage() {
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
              ☆ 利用規約 ☆
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
                  ★ 第1条（適用）
                </h2>
                <p>
                  本規約は、平成ぷろふぃーる（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第2条（利用登録）
                </h2>
                <p>
                  本サービスの利用にはGoogleアカウントによる認証が必要です。登録を完了した時点で本規約に同意したものとみなします。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第3条（禁止事項）
                </h2>
                <p>ユーザーは以下の行為を行ってはなりません：</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                  <li>わいせつ、暴力的、差別的な内容の投稿</li>
                  <li>他人になりすます行為</li>
                  <li>営利目的での無断利用</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>不正アクセスやハッキング行為</li>
                  <li>スパムや迷惑行為</li>
                </ul>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第4条（コンテンツの権利）
                </h2>
                <p>
                  ユーザーが投稿したコンテンツの著作権はユーザーに帰属します。ただし、本サービスの運営・改善のために必要な範囲で利用することを許諾するものとします。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第5条（サービスの変更・停止）
                </h2>
                <p>
                  運営者は、事前の通知なく本サービスの内容を変更、または提供を停止・終了することができます。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第6条（免責事項）
                </h2>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>
                    本サービスは「現状のまま」提供され、特定目的への適合性を保証しません
                  </li>
                  <li>ユーザー間のトラブルについて運営者は責任を負いません</li>
                  <li>データの消失・破損について運営者は責任を負いません</li>
                  <li>
                    本サービスの利用により生じた損害について運営者は責任を負いません
                  </li>
                </ul>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第7条（アカウントの停止・削除）
                </h2>
                <p>
                  運営者は、本規約に違反したユーザーのアカウントを事前の通知なく停止または削除できます。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第8条（規約の変更）
                </h2>
                <p>
                  運営者は本規約を変更できるものとし、変更後の規約は本ページに掲載した時点で効力を生じます。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ 第9条（準拠法・管轄）
                </h2>
                <p>
                  本規約の解釈には日本法を適用し、紛争が生じた場合は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </section>

              <section>
                <h2
                  className="font-bold mb-1"
                  style={{ color: template.primaryColor }}
                >
                  ★ お問い合わせ
                </h2>
                <p>
                  本規約に関するお問い合わせは、X（Twitter）アカウント{" "}
                  {CONTACT_SNS} までご連絡ください。
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
