---
$title: AMP との統合でディスプレイ広告を掲載する
---

[TOC]

このガイドは、AMP との統合で AMP ページにディスプレイ広告を配信したいと考えている広告ネットワークの運営者を対象としています。

## 概要

広告サーバーでは、AMP との統合により、[AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) 広告と通常の HTML 広告の両方を AMP ページに配信できます。

##### 通常の HTML 広告を配信する

1. [amp-ad の実装を作成します](#creating-an-amp-ad-implementation)。

##### AMP HTML 広告を配信する

1. [amp-ad の実装を作成します](#creating-an-amp-ad-implementation)（通常の HTML 広告を配信するための実装をまだ作成していない場合）。
2. [AMP HTML 広告を配信するための高速フェッチ統合を作成します](#creating-a-fast-fetch-integration)。


## amp-ad の実装を作成する

広告の配信先となるサイトの運営者が、広告ネットワークから提供される JavaScript ライブラリを広告サーバーとして設定し、各種の「広告スニペット」を設置します。広告スニペットは、JavaScript ライブラリを使用して広告をフェッチし、サイト運営者のウェブサイトに広告を表示します。AMP では、サイト運営者が任意の JavaScript を実行することは禁止されているため、広告ネットワークでは、AMP のオープンソース コードの開発に参加して、[`amp-ad`](/ja/docs/reference/components/amp-ad.html) タグで自社の広告サーバーの広告をリクエストできるようにする必要があります。

[tip type="note"]

この amp-ad の実装で、従来の HTML 広告と AMP HTML 広告の**両方**を表示することができます。

[/tip]


たとえば、Amazon A9 サーバーを呼び出すには、次の構文を使用します。

```html
<amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

上記のコードでは、`type` 属性で広告ネットワーク（この例では A9）を指定しています。`data-*` 属性の値は、Amazon A9 サーバーが広告を配信するために必要とするパラメータによって決まります。各パラメータと、A9 サーバーの URL に対する JavaScript の呼び出しの対応関係は、[`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) ファイルに記述されています。amp-ad タグによって渡される、対応するパラメータは前述の URL に付加され、広告を返すために使用されます。

`amp-ad` の統合を作成する手順については、[AMP への広告ネットワークの統合](https://github.com/ampproject/amphtml/blob/master/ads/README.md)に関する説明をご確認ください。

## 高速フェッチ統合を作成する

[高速フェッチ](/latest/blog/even-faster-loading-ads-in-amp/)は、広告リクエストと広告レスポンスを分離する AMP のメカニズムです。これにより、ページ ライフサイクルの通常よりも早い段階で広告リクエストを実施し、ユーザーが見る可能性が高い場合にのみ広告を表示できるようになります。高速フェッチでは、通常の HTML 広告よりも検証済みの AMP HTML 広告が優先されます。検証に失敗した広告は、クロスドメインの iFrame にラップされ、AMP ドキュメントの他の要素からは隔離されます。これに対し、検証を通過した AMP HTML 広告は、直接ページに書き込まれます。高速フェッチは、AMP 広告と通常の広告の両方を扱うことができます。検証に失敗した広告についても、追加で広告リクエストを行う必要は必要ありません。

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='高速フェッチの統合フロー', caption='高速フェッチの統合フロー' ) }}

広告サーバーから AMP HTML 広告を配信するには、次の条件を満たす高速フェッチ統合を提供する必要があります。

1. SSL ネットワーク通信をサポートする。
1. 広告リクエストを作成するための JavaScript を提供する（実装例: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl)、[DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)）。
1. 検証サービスを通じて広告を検証、署名する。たとえば [Cloudflare](https://blog.cloudflare.com/firebolt/) は AMP 広告の検証サービスを提供しており、第三者の広告プロバイダは、このサービスを利用して軽量で訴求力のある広告を高速に配信できます。

高速フェッチ統合を作成する手順については、[高速フェッチのネットワーク実装ガイド](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md)をご確認ください。


## 関連資料

*   [amp-ad の全拡張機能の GitHub ディレクトリ](https://github.com/ampproject/amphtml/tree/master/ads)
*   [対応広告ベンダーの一覧]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})
*   [高速フェッチのリリースに関するブログ記事](/latest/blog/even-faster-loading-ads-in-amp/)
 
