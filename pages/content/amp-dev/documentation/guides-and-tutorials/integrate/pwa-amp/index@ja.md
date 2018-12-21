---
$title: AMP とプログレッシブ ウェブアプリを組み合わせる
---
[TOC]

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='AMP と PWA の併用に関する動画をご覧ください。']

プログレッシブ ウェブアプリ（PWA）と AMP ページは効果的に連携します。多くの場合、さまざまな点で補完し合います。以下の手法をご覧ください。

1. AMP ページで [PWA 機能を有効にする]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}})
2. AMP から PWA への[円滑で超高速なユーザー エクスペリエンス]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}})を実現する
3. AMP の機能を活用して [PWA を簡素化する]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}})

[tip type="note"]

詳しくは、Web Fundamentals の[プログレッシブ ウェブアプリについての説明](https://developers.google.com/web/progressive-web-apps/)をご覧ください。

[/tip]

## PWA の機能を取り入れた AMP ページ

AMP ページでは、AMP キャッシュとは対照的に自分のサイトのドメインから配信する限り、さまざまな PWA の機能を独力で使用することができます。つまり、Google や Bing などのプラットフォーム内にある AMP ページが消費される時点では PWA の機能は作動しませんが、ユーザーが AMP ページに直接アクセスすると、処理が行われます。

詳細情報: 詳しくは、AMP ページで [PWA の機能を有効にする方法]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-as-pwa.md', locale=doc.locale).url.path}})についてご覧ください。

## PWA へのエントリ ポイントとしての AMP

AMP の独自のセールス ポイントは、**ほとんど瞬時の配信**という特性にあります。このために、AMP はサイトの最初のユーザー インタラクションとして最適なものとなっています。*プログレッシブ ウェブアプリ*は、**インタラクティブ性やエンゲージメントの可能性がより高い機能**を実現します。最初の読み込みはやや遅くなりますが、サイトの Service Worker（とそのアセットとアプリシェル）によって、以降の読み込み時の配信は加速されます。

サイトへのエントリ ポイントとして AMP ページを使用し、背後で PWA を準備しておいて、進行中に PWA に切り替えるのが、効果的な戦略です。

詳細情報: `amp-install-serviceworker` を使って [AMP を PWA に接続する方法]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-to-pwa.md', locale=doc.locale).url.path}})についてご覧ください。

## PWA のデータソースとしての AMP

AMP ページの基本的な特徴は、簡単で安全に埋め込みできるという点です。AMP ページを配信するプラットフォームの数がますます増えているのはそのためです。

プログレッシブ ウェブアプリを作成する場合は、**AMP ページを PWA のデータソースとして再利用する**ことで、AMP のメリットを享受しながら、バックエンドとクライアントの複雑さを大幅に緩和することができます。

詳細情報: [PWA 内で AMP ページを消費する方法]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/amp-in-pwa.md', locale=doc.locale).url.path}})についてご覧ください。
