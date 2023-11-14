---
'$title': 拡張 AMP コンポーネントの追加
$order: 2
description: コンポーネントシステムを採用する AMP では、効率的でレスポンシブな機能を簡単に記事に埋め込むことができます。AMP HTML ライブラリには、次の 3 種類の AMP コンポーネントが用意されています。 ...
---

コンポーネントシステムを採用する AMP では、効率的でレスポンシブな機能を簡単に記事に組み込むことができます。AMP HTML ライブラリには、次の 3 種類の AMP コンポーネントが用意されています。

- **組み込みコンポーネント**: [`amp-img`](../../../../documentation/components/reference/amp-img.md) や [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) のような、AMP JavaScript の基本ライブラリに含まれるコンポーネント（`<head>` タグ内に指定）。組み込みコンポーネントは、AMP ドキュメントの中で直接使用できます。

- **拡張コンポーネント**: 基本ライブラリを拡張するもので、カスタム要素としてドキュメントに明示的に含める必要のあるコンポーネント。カスタム要素を使用するには、特定のスクリプトを `<head>` セクションに追加する必要があります（たとえば、`<script async custom-element="[`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...` のようにします）。

- **実験的コンポーネント**: リリースされているが、まだ一般公開する前の段階にあるコンポーネント。デベロッパーは、完全リリースされる前のこれらの機能を使用するかどうか、ご自身の意思で選択できます。詳しくは、[実験的機能](../../../../documentation/guides-and-tutorials/learn/experimental.md)をご覧ください。

サンプルでは、組み込みコンポーネントである [`amp-img`](../../../../documentation/components/reference/amp-img.md) が既に使用されており、「<a>HTML から AMP への変換</a>」チュートリアルにおいてこのコンポーネントと AMP レイアウトシステムの関係について解説しました。ここでは、一般に広く使用されているいくつかの<strong>拡張</strong> AMP コンポーネントを新しい記事に追加してみます。

## 広告による収益化

AMP の広告は、[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントを使用して構築されています。[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントを使用すると、幅、高さ、レイアウトモードなど、複数の方法で広告を設定できます。ただし、多くの広告プラットフォームではこれ以外にも設定が必要となります。たとえば、広告ネットワークのアカウント ID や掲載する広告の条件、広告のターゲットを設定するオプションなどです。[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントでも、HTML 属性を使用することでこれらのオプションを簡単に指定できます。

次の **DoubleClick** 広告の例を見てみましょう。

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

ご覧のとおり、設定は非常にシンプルです。[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントに対し、使用する広告プラットフォームを `type` 属性で指定しています。ここでは、[DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md) プラットフォームを使用するために、値として `doubleclick` を指定しています。

`data-slot` はさらにユニークな属性です。[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントでは、`data-` で始まる属性はすべてベンダー固有の属性です。この属性はすべてのベンダーに必須指定するものではなく、指定しても必ず反応するとは限りません。上に示した **DoubleClick** の場合の例と、以下に示す [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md) プラットフォームの広告の例を比べてみましょう。

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

自分の記事の `<header>` タグの直後に、上の 2 つの例を**追加**してみてください。

すでに説明したように、AMP 基本ライブラリの JavaScript ファイルには、すべてのコンポーネントが含まれているわけではありません。広告コンポーネントのための JavaScript リクエストをファイルに追加する必要があります。

次のスクリプトを `<head>` タグに<strong>追加</strong>します。

```html
<script
  async
  custom-element="amp-ad"
  src="https://ampjs.org/v0/amp-ad-0.1.js"
></script>
```

ページを<strong>更新</strong>すると、2 つのテスト広告が表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='テスト広告') }}

[tip type="important"] <strong>重要:</strong> 場合によっては、<code>Mixed Content</code> や <code>XMLHttpRequest cannot load</code> などのエラーがデベロッパーコンソールに出力されることがあります。前者のエラーは、A9 広告に関係している可能性があります。A9 広告では、セキュリティで保護されていないコンテンツが読み込まれる場合がありますが、AMP では、広告はすべてセキュリティで保護されていることが要求されます。[/tip]

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) コンポーネントは、広告プラットフォームの機能を柔軟にサポートします。それを示す <a><code data-md-type="codespan">amp-ad</code></a> コンポーネントの 2 つの設定例を見てみましょう。以下では、DoubleClick のダッシュボードを使用して、特定の国のユーザーにだけ表示される DoubleClick 広告を 2 つ設定しています。1 つ目の広告は英国のユーザーにだけ表示され、2 つ目の広告は米国のユーザーにだけ表示されます。先ほど AMP ドキュメントに追加した広告の下に、次の 2 つの地域ターゲティング広告設定を<strong>追加</strong>してみてください。

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

ページを<strong>更新</strong>して、表示内容を確認してください。次のスクリーンショットはカナダ国内でキャプチャされたものですが、どちらの広告も表示されていません。

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='テスト広告') }}

[tip type="note"] <strong>注意:</strong> 上記の <a><code>amp-ad</code></a> タグには <code>div</code> タグが追加されており、そこには <code>fallback</code> という属性が指定されています。この <code>fallback</code> 属性が何を意味しているかおわかりでしょうか。この属性は AMP の読み込みシステムに対し、親要素が読み込みに失敗した場合はその要素に記述された内容のみを表示するよう指定しています。詳しくは、<a>プレースホルダとフォールバック</a>をご覧ください。[/tip]

[tip type="read-on"] <strong>参考情報: </strong> サポートされる広告ネットワークの最新リストについては、<a><code>amp-ad</code></a> コンポーネントの関連ドキュメントをご覧ください。[/tip]

[tip type="note"] <strong>注意:</strong> 広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別の場所から iframe を AMP ドキュメントとして読み込み、広告ネットワークの JavaScript をその iframe サンドボックス内で実行します。[/tip]

ここまでで、ページに埋め込まれるテキスト、画像、広告を AMP ドキュメントに記述することができました。これらの要素はいずれも、ストーリーを発信し、コンテンツを収益化するためには欠かせない重要な要素です。しかし、現代のウェブサイトでは、単にテキストと画像を掲載するだけでは十分とはいえません。

ここからは、AMP ドキュメントをより充実した内容にするため、多くのニュース記事に見られる次のような最新のウェブ機能を追加していきます。

- YouTube 動画
- ツイート
- 記事の引用

## YouTube 動画の埋め込み

では、YouTube 動画を AMP ドキュメントに埋め込んでみましょう。AMP ドキュメントの <code><header></code> の直後（先ほど追加した 2 つの <a><code>amp-ad</code></a> の上）に次のコードを<strong>追加</strong>します。

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

ページを<strong>更新</strong>します。動画の代わりに、<em>「動画を読み込めませんでした。」</em>というテキストが表示されるはずです。

このエラーは、ブラウザで他の YouTube 動画を問題なく表示できる場合でも発生します。なぜなら、実際には動画の読み込みに失敗しているのではなく、コンポーネント自体が失敗しているからです。

すでに説明したように、AMP 基本ライブラリの JavaScript ファイルには、すべてのコンポーネントが含まれているわけではありません。YouTube コンポーネントのための JavaScript リクエストをファイルに追加する必要があります。

[tip type="note"] <strong>注意:</strong> デベロッパー コンソールがまだ開いていて、URL に <code>#development=1</code> と表示されている場合は、<a><code>amp-youtube</code></a> JavaScript の追加を促す AMP Validator エラーと、追加する必要のある <code>script</code> タグの説明を含むキュメントへのリンクが表示されます。[/tip]

次のスクリプトを `<head>` タグに<strong>追加</strong>します。

```html
<script
  async
  custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"
></script>
```

ページを<strong>更新</strong>すると、YouTube 動画が表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='埋め込み Youtube 動画') }}

設定では、ページ上の他の要素と同様に、動画の <code>width</code> と `height` を 指定しています。AMP レイアウトシステムは、この値に基づいてアスペクト比を計算します。また、<code>layout</code> を <code>responsive</code> に設定しているため、動画は親要素の幅一杯まで拡大されます。

YouTube 動画の埋め込みについて詳しくは、<a><code>amp-youtube</code></a> コンポーネントのドキュメントをご覧ください。その他の動画とメディア関連コンポーネントについては、 <a>メディア AMP コンポーネントのリスト</a>をご覧ください。

[tip type="tip"] **ヒント:** コンポーネントの読み込みに失敗したことやコンポーネントがブラウザでサポートされていないことをユーザーに伝えるには、<a><code>fallback</code></a> 属性を使用します。[/tip]

## ツイートの表示

Twitter に投稿されたツイートをそのまま埋め込む機能も、ニュース記事で広く使用されています。<a><code data-md-type="codespan">amp-twitter</code></a> コンポーネントを使用すると、この機能を簡単に実現できます。

次の JavaScript リクエストをドキュメントの <code><head></code> タグに追加しましょう。

```html
<script
  async
  custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"
></script>
```

続いて、ツイートの埋め込み先となる記事に次のコードを<strong>追加</strong>します。

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

<code>data-tweetid</code> 属性も、特定のプラットフォームで必要となるカスタム属性です。Twitter は、`data-tweetid` 属性の値を特定のツイートに関連付けます。

ブラウザを<strong>更新</strong>してページの表示を確認してください。次のようにツイートが表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='埋め込みツイート') }}

ツイートの埋め込みについて詳しくは、<a><code>amp-twitter</code></a> コンポーネントのドキュメントをご覧ください。

[tip type="tip"] <strong>ヒント:</strong> AMP には、ソーシャル ネットワークのコンテンツを埋め込むためのコンポーネントが他にも用意されています。詳しくは、最新の[ソーシャル AMP コンポーネント](../../../../documentation/components/reference/amp-fit-text.md)をご覧ください。[/tip]

## 記事の引用のハイライト表示

ニュース記事では、記事の重要部分を抜粋してハイライト表示する機能もよく使われます。たとえば、特定の情報源からの引用や重要な事実を、読者の注意を引くために大きなフォントで抜粋するといったことがよく行われています。

ただし、抜粋するテキストの文字数は必ずしも一定ではないため、フォントのサイズは、そのテキストがページ上で占有するスペースとのバランスを考慮して決めなければなりません。

AMP には、この問題を解決するための専用のコンポーネントとして、<a><code>amp-fit-text</code></a> が用意されています。<a><code>amp-fit-text</code></a> コンポーネントを使用すると、テキストの幅と高さに固定値を設定し、最大のフォントサイズを指定することができます。フォントサイズは、指定された幅と高さにテキストが<strong>収まる</strong>ようインテリジェントに調整されます。

実際に試してみましょう。まず、次のようにコンポーネントのライブラリを <code><head></code> タグに<strong>追加</strong>します。

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://ampjs.org/v0/amp-fit-text-0.1.js"
></script>
```

次の内容をページに追加します。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

ページを<strong>更新</strong>して表示を確認してください。

続いて、別の設定も試してみましょう。引用をもっと短くするとどうなるでしょうか。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

逆に、引用がもっと長い場合はどうでしょうか。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) を使った最後の実験として、max-font-size 属性の値は 42 のまま、height に 400 などの大きな値を設定し、「こんにちは」などの短いテキストを指定してみましょう。 テキストはページ上でどのように表示されるでしょうか。垂直方向の中央揃えで表示されるでしょうか。それとも、最大フォントサイズに合わせて、[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) タグの高さが縮小されるでしょうか。AMP のレイアウト システムについてこれまでに学んだ知識を踏まえ、実際にコードを試す前に答えを考えてみてください。

[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) について詳しくは、[AMP by Example のライブデモ](../../../../documentation/examples/documentation/amp-fit-text.html)をご覧ください。
