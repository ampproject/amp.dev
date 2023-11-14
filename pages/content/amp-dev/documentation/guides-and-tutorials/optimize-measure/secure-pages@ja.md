---
'$title': サードパーティ攻撃からの保護
$order: 7
description: ウェブに存在するセキュリティの脆弱性から AMP ページとユーザーを保護する対策を講じましょう
formats:
  - websites
author: CrystalOnScript
---

ウェブに存在するセキュリティの脆弱性から、サイトとユーザーを保護する対策を講じましょう。最も悪質な攻撃の 1 つに、[クロスサイトスクリプティング](https://www.google.com/about/appsecurity/learning/xss/)（XSS）と呼ばれるものがあります。XSS は、攻撃者がユーザーに表示される HTML ページに悪意のあるコードをインジェクトできるセキュリティのバグです。

上記のような攻撃から保護するには、[コンテンツセキュリティポリシー（CSP）](https://csp.withgoogle.com/docs/index.html)を採用する方法があります。Google AMP キャッシュのような AMP キャッシュは、すでにページに CSP を追加するようになっています！ただし、ユーザーがキャッシュバージョンを回避した場合、独自の CSP を追加していなければ、ページにはこの追加の保護レイヤーが存在しないことになってしまいます。

# AMP の CSP の実装

適切なメタタグをページの head に追加することで、CSP を実装することができます。以下は 、AMP スクリプトのみをページにインジェクトできるようにする AMP の CSP です。

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://ampjs.org/v0.js https://ampjs.org/v0/ https://ampjs.org/viewer/ https://ampjs.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://ampjs.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[例の全文は、ここで閲覧できます](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html)。

[tip type="read-on"] [セキュリティの脆弱性からの保護と CSP については、こちら](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)を参照してください。 [/tip]
