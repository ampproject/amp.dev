---
$title: AMP HTML 広告
---

## AMP HTML 広告とは

AMP HTML 広告では、より高速、軽量かつ安全にウェブ広告を配信できます。AMP ページは通常の HTML 広告にも対応していますが、その場合、読み込みに時間がかかることがあります。その点 AMP HTML で広告を作成すると、広告自体を AMP ページの他の部分と同じくらい高速に表示できます。AMP HTML 広告は、配信前に必ず検証されるため、安全で効果的な広告を配信できます。また、AMP ページだけでなくウェブ上のさまざまな場所で配信できます。

AMP HTML 広告は、AMP HTML と CSS で定義された [AMP HTML 広告仕様](a4a_spec.md)に沿って、AMP HTML 形式で記述します。このため、広告の表示速度が低下する最大の原因とされる、広告での任意の JavaScript の実行が制限されます。その代わり、基盤となる AMP と同様に、広告用 JavaScript の主なユースケースが AMP オープンソース プロジェクトに直接組み込まれています。これらのユースケースにより、広告が適切に動作することが保証されます。

### メリット

AMP HTML 広告が通常の広告よりも優れている点は次のとおりです。

1. **高速**: AMP HTML 広告では、広告表示を高速化するため、ページ表示プロセスの通常よりも早い段階で広告をリクエストし、ユーザーが見る直前に表示します。また、ファイルサイズが小さいという点も広告の高速化に貢献します。
1. **軽量**: AMP HTML 広告には一般的な広告機能が組み込まれており、広告のファイルサイズが小さく抑えられています。また、ページに読み込まれた後のリソース消費量も軽減されています。たとえば、通常の広告のように、10 個のトラッカーがそれぞれ個別の情報をリクエストするのではなく、一度すべてのデータを収集してから、関係する任意の数のトラッカーにそのデータを配信するといった仕組みが採用されています。
1. **協調**: AMP ページでは、[AMP ランタイム](spec/amphtml.md#amp-runtime)がスマートフォンの限られたリソースを適切なタイミングで適切なコンポーネントと協調させることで、最適なユーザー エクスペリエンスを実現します。たとえば、アニメーションを含む AMP HTML 広告が現在のビューポートに表示されていない場合、再生は一時的に停止されます。
1. **高い訴求力**: ユーザーは、表示されていない広告に反応することはできません。高速に表示される広告は、視認性が高いためにクリックされやすく、最終的に広告の掲載結果の向上につながります。
1. **マルウェアを排除**: AMP HTML 広告は配信前に検証されるため、マルウェアを拡散させることがありません。このため広告主は、ユーザー エクスペリエンスの安全性を保証し、ブランド イメージを守ることができます。
1. **高い柔軟性**: AMP HTML 広告は、AMP ページと通常のウェブページの両方に掲載でき、端末の種類も問いません。

### フォーマット

柔軟性に優れ、動的に運用できる AMP HTML 広告は、カルーセルやパララックス、ライトボックスをはじめ、数多くの広告フォーマットに対応しています。まずは、[Examples](../../../documentation/examples/index.html) で公開されているオープンソースの AMP HTML 広告テンプレートを使用して広告を作成することをおすすめします。

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>カルーセル</td>
    <td>動画パララックス</td>
    <td>ライトボックス</td>
  </tr>
</table>

## AMP HTML 広告の仕組み

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='AMP HTML 広告を AMP ページに配信', caption='AMP HTML 広告を AMP ページに配信', align='' ) }}

1. サイト運営者が、[`amp-ad`](../../../documentation/components/reference/amp-ad.md) タグを使用して AMP ページに広告スロットを挿入し、使用する広告ネットワークを指定します。
1. AMP ランタイムが、広告を取得するための広告リクエストを指定の広告ネットワークに送信します。AMP HTML 広告の配信に対応している広告ネットワークは、広告を検証して署名する[高速フェッチ実装](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md)を提供しています。
1. 広告ネットワークが AMP HTML 広告を返し、AMP ランタイムがその広告を AMP ページに表示します。

## AMP HTML 広告を配信する

### サイト運営者

直接販売の広告を AMP HTML で配信するには、[AMP HTML 広告仕様](a4a_spec.md)に沿って広告を作成し、AMP HTML 広告の配信に対応した広告サーバーから配信する必要があります。現時点で、AMP HTML 広告に対応している広告サーバーは次のとおりです。

*   DoubleClick for Publishers
*   TripleLift
*   Dianomi
*   Adzerk
*   Google AdSense

エクスチェンジや SSP など、間接チャネル経由で AMP HTML 広告を配信する場合は、[こちらの一覧](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)にある、AMP HTML 広告に対応した広告ネットワークや広告サーバーをご利用ください。

### 広告会社

広告会社では、[AMP HTML 広告仕様](a4a_spec.md)に沿って広告を作成する必要があります。ヒントとサンプルについては、[Examples](../../../documentation/examples/index.html) で公開されているオープンソースの AMP HTML 広告テンプレートをご覧ください。または、次のツールを使用して AMP HTML 広告を作成することもできます。

*  [Celtra の AdCreator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate（近日公開予定）

### 広告ネットワーク / 広告サーバー

AMP HTML 広告を AMP ページに配信するには、[`amp-ad`](../../../documentation/components/reference/amp-ad.md)する方法についての説明をご確認ください。なお、AMP HTML 広告を非 AMP ページに配信する場合、特別な統合は必要ありません。

## AMP HTML 広告を作成する

**ゼロから作成する**: AMP HTML 広告は、[AMP HTML 広告仕様](a4a_spec.md)に沿って作成されている必要があります。デモとサンプルについては、[AMP by Example](../../../documentation/examples/documentation/amp-ad.html) で公開されているオープンソースの AMP HTML 広告テンプレートをご覧ください。

**ツールを使用する**: 次のツールを使用して AMP HTML 広告を作成できます。

*  [Celtra の AdCreator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate（近日公開予定）

### AMP HTML 広告の構文を検証する

AMP HTML 広告を作成したら、広告が正しい AMP HTML 構文に基づいて作成されていることを確認します。開発環境によって、AMP HTML 広告を検証するためのオプションが用意されている場合があります。

*   [NPM の AMP 検証ツール](https://www.npmjs.com/package/amphtml-validator)のモジュールを使用すると、検証機能をビルドの CI に組み込むことができます。
*   1 回限りのテストには、[AMP 検証ツール](https://validator.ampproject.org/)を使用します。
*   [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) とのパートナーシップを通じて、パブリックな検証用エンドポイントを使用できます。

[tip type="note"]

高速フェッチの優先表示機能などを使用して、AMP HTML 広告を AMP ページで高速に表示するには、構文が正しく記述されている必要があります。構文が有効でなくても広告は表示されますが、高速化効果は得られません。

[/tip]

## RTB での AMP HTML 広告のサポート

SSP やアド エクスチェンジのリアルタイム ビッダー（RTB）環境で AMP HTML 広告に対応する方法について詳しくは、[RTB アド エクスチェンジのための実装ガイド](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/RTBExchangeGuide.md)をご確認ください。

## よくある質問

#### AMP HTML 広告のサンプルは公開されていますか？

はい、公開されています。デザイン性に優れた AMP HTML 広告テンプレートが [Examples](../../../documentation/examples/documentation/amp-ad.html) で数多く公開されています。公開されているサンプルは、AMP の高度なコンポーネントを使用しています。

#### AMP HTML 広告は、サードパーティによる検証や視認性検出に対応していますか？

はい、対応しています。[`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) を使用した検証と視認性検出をネイティブ サポートしています（Google の ActiveView はこの方法で統合されています）。MOAT など、その他のベンダーも、両機能への対応を積極的に進めています。

#### AMP HTML 広告は、タイムラインベースのアニメーションに対応していますか？

はい、対応しています。[`amp-animation`](../../../documentation/components/reference/amp-animation.md) についての説明をご覧ください。

#### ほとんどの広告は、タップ可能なターゲットや設定可能な広告終了に対応しています。AMP HTML 広告にも同様の仕組みがありますか？

はい、あります。[`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md) についての説明をご覧ください。

#### 必要な情報を見つけられません。どこで質問をすればよいですか？

*   AMP に関する質問の投稿先には、[Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) をおすすめします。AMP プロジェクト コミュニティのメンバーは、定期的にこのサイトをチェックしているため、短時間で質問への回答を得られる可能性があります。
*   [Slack の #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) チャネルに参加すると、質問を投稿して問題の解決策や回答を得られます。
*   AMP のバグを見つけた場合や、AMP の機能をリクエストしたい場合は、[AMP に関する問題を報告](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#reporting-issues-with-amp)する方法についての説明をご覧ください。
