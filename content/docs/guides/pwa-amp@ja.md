---
$title: AMP とプログレッシブ ウェブアプリを組み合わせる
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='AMP と PWA の併用に関する動画をご覧ください。') }}

プログレッシブ ウェブアプリ（PWA）と AMP ページは効果的に連携します。多くの場合、さまざまな点で補完し合います。以下の手法をご覧ください。

1. AMP ページで [PWA 機能を有効にする](/ja/docs/guides/pwa-amp/amp-as-pwa.html)
2. AMP から PWA への[円滑で超高速なユーザー エクスペリエンス](/ja/docs/guides/pwa-amp/amp-to-pwa.html)を実現する
3. AMP の機能を活用して [PWA を簡素化する](/ja/docs/guides/pwa-amp/amp-in-pwa.html)

{% call callout('プログレッシブ ウェブアプリとは', type='note') %}
詳しくは、Web Fundamentals の[プログレッシブ ウェブアプリについての説明](https://developers.google.com/web/progressive-web-apps/)をご覧ください。
{% endcall %}

## PWA の機能を取り入れた AMP ページ

AMP ページでは、AMP キャッシュとは対照的に自分のサイトのドメインから配信する限り、さまざまな PWA の機能を独力で使用することができます。つまり、Google や Bing などのプラットフォーム内にある AMP ページが消費される時点では PWA の機能は作動しませんが、ユーザーが AMP ページに直接アクセスすると、処理が行われます。

{% call callout('詳細情報', type='read') %}
詳しくは、AMP ページで [PWA の機能を有効にする方法](/ja/docs/guides/pwa-amp/amp-as-pwa.html)についてご覧ください。
{% endcall %}

## PWA へのエントリ ポイントとしての AMP

AMP の独自のセールス ポイントは、**ほとんど瞬時の配信**という特性にあります。このために、AMP はサイトの最初のユーザー インタラクションとして最適なものとなっています。*プログレッシブ ウェブアプリ*は、**インタラクティブ性やエンゲージメントの可能性がより高い機能**を実現します。最初の読み込みはやや遅くなりますが、サイトの Service Worker（とそのアセットとアプリシェル）によって、以降の読み込み時の配信は加速されます。

サイトへのエントリ ポイントとして AMP ページを使用し、背後で PWA を準備しておいて、進行中に PWA に切り替えるのが、効果的な戦略です。

{% call callout('詳細情報', type='read') %}
`amp-install-serviceworker` を使って [AMP を PWA に接続する方法](/ja/docs/guides/pwa-amp/amp-to-pwa.html)についてご覧ください。
{% endcall %}

## PWA のデータソースとしての AMP

AMP ページの基本的な特徴は、簡単で安全に埋め込みできるという点です。AMP ページを配信するプラットフォームの数がますます増えているのはそのためです。

プログレッシブ ウェブアプリを作成する場合は、**AMP ページを PWA のデータソースとして再利用する**ことで、AMP のメリットを享受しながら、バックエンドとクライアントの複雑さを大幅に緩和することができます。

{% call callout('詳細情報', type='read') %}
[PWA 内で AMP ページを消費する方法](/ja/docs/guides/pwa-amp/amp-in-pwa.html)についてご覧ください。
{% endcall %}
 
 
