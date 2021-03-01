---
'$title': AMP メールのテスト
$order: 2
'$category': Develop
description: 大勢のオーディエンスに AMP メールを送信する前にテストすることで、優れたユーザーエクスペリエンスを確保できます。
formats:
  - email
author: fstanis
---

大勢のオーディエンスに AMP メールを送信する前にテストすることで、優れたユーザーエクスペリエンスを確保できます。

## テストのチェックリスト

1. AMP メールの HTML やプレーンテキストバージョンが含まれている。これは、AMP をサポートしないメールクライアントでフォールバックとして表示されます。
2. 「[AMP メールの検証](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md)」に説明されている手順に従って、AMP メールの有効性を確認する。
3. 「[AMP for Email 対応 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)」に目を通し、 使用している CSS がすべてのメールクライアントでサポートされていることを確認する。
4. [AMP Playground](https://playground.amp.dev/?runtime=amp4email) でメールを試し、フォームなどのすべての動的機能が正しく動作することを確認する。

## メールクライアントに特化したテスト

AMP をサポートするメールクライアントも開発者向けドキュメントを提供しており、ほかのガイドラインや要件が含まれる可能性があります。

### Gmail

Gmail ドキュメンテーションは、「[Test your AMP emails in Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email)」にテストのガイドラインを記載しています。

Gmail ユーザーは、[Gmail AMP for Email Playground](https://amp.gmail.dev/playground/) を使ってメールのテスト送信を行えます。

### Mail.ru

「[Mail.ru AMP emails](https://postmaster.mail.ru/amp)」は、Mail.ru アカウントでテストを実行する方法を説明しています。

Mail.ru ユーザーは、[Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) を使ってメールのテスト送信を行えます。
