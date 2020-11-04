---
$title: 送信者配布への登録
$order: 1
description: AMP メールの送信者配布への登録
$category: スタート
author: CrystalOnScript
---

メールクライアントが AMP メールをユーザーに表示するには、送信者登録を行う必要があります。このガイドに従って、対応クライアントの許可リストに送信者アドレスを追加しましょう！

# 本番で使用可能な AMP メールの作成と送信

AMP メール形式の理解とコンプライアンスを証明する必要があります。メールは以下の条件を満たしていなければなりません。

- TLD と "From:" アドレスの一致により、[SPF/DKIM/DMARC](https://support.google.com/a/answer/33786?hl=en) に合格すること
- フォールバック用の "text/html" MIME パートが指定されていること
- すべてのクライアントの送信者要件を順守していること

以下のアドレスに、本番で使用可能な AMP メールを送信します。

- amphtmltest@outlook.com
- postmaster_amp@corp.mail.ru
- ampforemail.whitelisting@gmail.com

# グローバルフォームへの記入

[AMP for Email: Sender Registration form](https://docs.google.com/forms/d/e/1FAIpQLSdso95e7UDLk_R-bnpzsAmuUMDQEMUgTErcfGGItBDkghHU2A/viewform?gxids=7628) に記入する必要があります。これは、すべての対応メールクライアント向けの AMP メールを送信できるように、許可リストに登録する上で必要となる唯一のフォームです。

# プライバシーポリシーの順守

各クライアントのプライバシーポリシーを順守している必要があります。

**Gmail**

[Google Privacy & Terms](https://policies.google.com/privacy)

**Mail.ru**

- [ロシア国外居住ユーザー](https://help.mail.ru/engmail-help/privacy)
- [ロシア国内居住ユーザー](https://agent.mail.ru/legal/privacypolicy/en)

**Microsoft**

[Microsoft プライバシーステートメント](https://privacy.microsoft.com/en-us/privacystatement)

**Verizon Media (Yahoo Mail)**

- [Verizon Media Privacy Policy - US](https://www.verizonmedia.com/policies/us/en/verizonmedia/privacy/index.html)
- 上記以外の国については、[こちら](https://www.verizonmedia.com/policies/)を参照してください。

# 確認

各メールクライアントは、メールによって許可リストのステータスを通知します。問題が発生した場合は、[GitHub](https://github.com/ampproject/wg-amp4email) 経由で AMP for Email ワーキンググループにご連絡ください。

# クライアントのサポートの追加

AMP for Email のサポートの追加に関心のあるメールクライアントは、[GitHub でチームにご連絡ください](https://github.com/ampproject/wg-amp4email/)！
