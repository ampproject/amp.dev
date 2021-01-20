---
"$title": AMP への広告テクノロジーの統合
order: '3'
formats:
- ads
teaser:
  text: AMP HTML の統合を検討中の広告テクノロジープロバイダーは、以下のガイドラインをお読みください。
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

AMP HTML の統合を検討中の広告テクノロジープロバイダーは、以下のガイドラインをお読みください。最小限のレイテンシーと高い品質を確保するには、AMP オープンソースプロジェクトにプルリクエストを提出する前に、[こちら](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads)に記載されている手順に従ってください。AMP へのコントリビューションを始める方法に関する一般的なガイダンスについては、「[CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md)」を参照してください。

## アドサーバー <a name="ad-server"></a>

*例 : DFP、A9*

サポートするサイト運営者は、アドサーバーとして、プロバイダーが提供する JavaScript ライブラリを含め、広告をフェッチしてサイト運営者のウェブサイトにレンダリングする上でその JavaScript ライブラリに依存するさまざまな「広告スニペット」を配置します。

AMP では、サイト運営者が任意の JavaScript を実行できないようになっているため、アドサーバーから広告をリクエストするための `amp-ad` タグを実行できるように、AMP オープンソースコードにコントリビューションする必要があります。

たとえば、Amazon A9 サーバーは、以下の構文を使って呼び出すことができます。

[sourcecode:html]
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
[/sourcecode]

`type` の後に続く各属性は、広告を配信するために Amazon の A9 サーバーが期待するパラメーターに依存しています。[a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) ファイルには、`https://c.amazon-adsystem.com/aax2/assoc.js` URL を介して A9 サーバーを呼び出す JavaScript 呼び出しにパラメーターがどのようにマッピングされているかが示されています。AMP 広告タグによって渡される対応するパラメーターは、広告を返すための URL にアペンドされます。

広告ネットワークを AMP に統合する方法に関する詳細については、「[AMP への広告ネットワークの統合](https://github.com/ampproject/amphtml/blob/master/ads/README.md)」を参照してください。

## サプライサイドプラットフォーム（SSP）または Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

*例 : Rubicon、Criteo OR Appnexus、Ad-Exchange*

サイト運営者のウェブサイトから直接呼び出されることを希望するセルサイドプラットフォームの場合は、アドサーバーとの統合について上述した指示に従う必要があります。amp-ad タグに独自の `type` 値を追加すると、サイト運営者にタグを直接配布できるため、サイト運営者自身が AMP ページにタグを直接挿入することができます。

さらに一般的なのは、SSP がサイト運営者と協力して、SSP の広告タグをアドサーバーにトラフィックする方法です。この場合、アドサーバーのクリエイティブにあるスクリプトで読み込まれるすべてのアセットが HTTPS で読み込まれることを確認してください。エクスパンダブルといった広告形態に関する制限がいくつかあるため、最も一般的に配信されているクリエイティブフォーマットをサイト運営者とテストすることをお勧めします。

## 広告代理店 <a name="ad-agency"></a>

*例 : Essence、Omnicom*

サイト運営者と協力し、開発するクリエイティブが AMP 対応であることを確認してください。すべてのクリエイティブは iframe に配信され、そのサイズは広告が呼び出されたときにけってするため、クリエイティブによって iframe のサイズが変更されないように確認する必要があります。

クリエイティブの一部であるすべてのアセットは、HTTPS でリクエストされることを確認してください。現在、すべての広告形態が完全にサポートされているわけではないため、AMP 環境でクリエイティブをテストすることをお勧めします。こういった形態には、リッチメディアエクスパンダブル、インタースティシャル、ページレベル広告などがあります。

## 動画プレーヤー <a name="video-player"></a>

*例 : Brightcove、Ooyala*

通常の HTML ページで動作する動画プレーヤーは AMP では動作しないため、AMP ランタイムがプレーヤーを読み込めるようにする特殊タグを作成する必要があります。Brightcove は、メディアと広告を AMP ページで再生できるようにするカスタム [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) タグを作成しました。

Brightcove プレーヤーは、以下のようにして呼び出すことができます。

[sourcecode:html]
<amp-brightcove
  data-account="1290862519001"
  data-video-id="ref:amp-docs-sample"
  data-player="S1Tt8cgaM"
  layout="responsive"
  width="480"
  height="270"
>
</amp-brightcove>
[/sourcecode]

Brightcove のような amp タグを開発する手順については、[こちらのプルリクエスト](https://github.com/ampproject/amphtml/pull/1052)を参照してください。

## 動画広告ネットワーク <a name="video-ad-network"></a>

*例 : Tremor、Brightroll*

動画広告ネットワークの場合は、サイト運営者と協力して、以下の点を確認してください。

- すべての動画アセットが HTTPS で配信される
- サイト運営者の動画プレーヤーは AMP 対応である

## データ管理プラットフォーム（DMP）<a name="data-management-platform-dmp"></a>

*例 : KRUX、Bluekai*

「[カスタム広告構成の強化方法](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration)」を参照してください。

似たようなアプローチで、ユーザーの cookie から得るオーディエンスセグメントを広告呼び出しに渡すことで、広告呼び出しを充実させることができます。

## ビューアビリティプロバイダー <a name="viewability-provider"></a>

*例 : MOAT、Integral Ad Science*

ビューアビリティプロバイダーは、一般的にアドサーバーのクリエイティブラッパーを介してサイト運営者に統合します。この場合は、クリエイティブラッパーによってすべてのアセットが HTTPS 経由で読み込まれるようにしてください。

MOAT の例の場合は、`http://js.moatads.com` が `https://z.moatads.com` に切り替えられることを確認してください。

また、[Intersection Observer パターン](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability)の使用方法も参照してください。

## コンテンツ推奨プラットフォーム <a name="content-recommendation-platform"></a>

*例 : Taboola、Outbrain*

現時点でサイト運営者のウェブサイトに JavaScript が埋め込まれているが、AMP ページで動作しない場合に役立ちます。AMP ページでコンテンツを推奨する場合は、コンテンツの詳細をリクエストする [`amp-embed` 拡張機能](https://amp.dev/documentation/components/amp-ad)を使用しすることをお勧めします。[Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) の例を参照してください。
