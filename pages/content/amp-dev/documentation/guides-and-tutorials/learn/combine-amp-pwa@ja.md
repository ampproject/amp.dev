---
"$title": AMP と PWA の相互関係
"$order": '7'
description: プログレッシブウェブアプリ（PWA）と AMP ページは効果的に連携します。多くの場合、さまざまな点で補完し合います。以下の...
formats:
- websites
components:
- youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='AMP と PWA の併用に関する動画をご覧ください。']

プログレッシブウェブアプリ（PWA）と AMP ページは効果的に連携します。多くの場合、さまざまな点で補完し合います。以下の手法をご覧ください。

1. AMP ページで [PWA 機能を有効にする](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)
2. AMP から PWA への[円滑で超高速なユーザーエクスペリエンス](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)を実現する
3. AMP の機能を活用して [PWA を単純化する](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)

[tip type="note"]

詳しくは、Web Fundamentals の[プログレッシブウェブアプリ](https://developers.google.com/web/progressive-web-apps/)についての説明をご覧ください。

[/tip]

## PWA の機能を取り入れた AMP ページ

AMP ページでは、AMP キャッシュとは対照的に自分のサイトのドメインから配信する限り、さまざまな PWA の機能を独力で使用することができます。つまり、Google や Bing などのプラットフォーム内にある AMP ページが消費される時点では PWA の機能は作動しませんが、それから先に進む場合やユーザーが AMP ページに直接アクセスすると、処理が行われます。

[tip type="read-on"] <strong>詳細情報:</strong> 詳しくは、AMP ページで [PWA の機能を有効にする](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)方法についてご覧ください。[/tip]

## PWA へのエントリポイントとしての AMP

AMP の独自のセールスポイントは、**ほば瞬時に配信**という特性にあります。このために、AMP はサイトの最初のユーザーインタラクションとして最適なものとなっています。*プログレッシブウェブアプリ*は、**インタラクティブ性やエンゲージメントの可能性がより高い機能**を実現します。最初の読み込みはやや遅くなりますが、サイトの Service Worker とつまりはそのアセットとアプリシェルによって、以降の読み込み時の配信は加速されます。

サイトへのエントリ ポイントとして AMP ページを使用し、背後で PWA を準備しておいて、進行中に PWA に切り替えるのが、効果的な戦略です。

[tip type="read-on"] <strong>詳細情報:</strong> [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) を使って [AMP を PWA に接続する方法](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)についてご覧ください。[/tip]

## PWA のデータソースとしての AMP

AMP ページの基本的な特徴は、簡単で安全に埋め込みできるという点です。AMP ページを配信するプラットフォームの数がますます増えているのはそのためです。

プログレッシブウェブアプリを作成する場合は、**AMP ページを PWA のデータソースとして再利用する**ことで、AMP のメリットを享受しながら、バックエンドとクライアントの複雑さを大幅に緩和することができます。

[tip type="read-on"] <strong>詳細情報:</strong> [PWA 内で AMP ページを消費する](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)方法についてご覧ください。[/tip]
