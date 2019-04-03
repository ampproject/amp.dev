---
$title: 拡張 AMP コンポーネントを追加する
---

コンポーネント システムを採用する AMP では、効率的でレスポンシブな機能を簡単に記事に組み込むことができます。AMP HTML ライブラリには、次の 3 種類の AMP コンポーネントが用意されています。

- **組み込みコンポーネント**: [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) や [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}) のような、AMP JavaScript の基本ライブラリに含まれるコンポーネント（`<head>` タグ内に指定）。組み込みコンポーネントは、AMP ドキュメントの中で直接使用できます。

- **拡張コンポーネント**: 基本ライブラリを拡張するもので、カスタム要素としてドキュメントに明示的に含める必要のあるコンポーネント。カスタム要素を使用するには、特定のスクリプトを `<head>` セクションに追加する必要があります（たとえば、`<script async custom-element="amp-video" ...` のようにします）。

- **試験運用コンポーネント**: リリースされているが、まだ一般公開する前の段階にあるコンポーネント。デベロッパーは、完全リリースされる前のこれらの機能を使用するかどうか、ご自身の意思で選択できます。詳しくは、[試験運用機能]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/experimental.md', locale=doc.locale).url.path}})をご覧ください。

「[HTML を AMP に変換する],[`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}).url.path}}) を使用し、このコンポーネントと AMP レイアウト システムの関係について解説しました。ここでは、一般に広く使用されているいくつかの**拡張** AMP コンポーネントを新しい記事に追加してみます。

## 広告で収益化する

AMP ページに広告を掲載するには、[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントを使用します。[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントを使用すると、幅、高さ、レイアウト モードなど、複数の方法で広告を設定できます。ただし、多くの広告プラットフォームではこれ以外にも設定が必要となります。たとえば、広告ネットワークのアカウント ID や掲載する広告の条件、広告のターゲットを設定するオプションなどです。[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントでも、HTML 属性を使用することでこれらのオプションを簡単に指定できます。

**DoubleClick** 広告を設定する場合の例を見てみましょう。

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

ご覧のとおり、設定は非常にシンプルです。[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントに対し、使用する広告プラットフォームを `type` 属性で指定しています。ここでは、[DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) プラットフォームを使用するために、値として `doubleclick` を指定しています。

`data-slot` はさらにユニークな属性です。[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントでは、`data-` で始まる属性はすべてベンダー固有の属性です。この属性はすべてのベンダーに必須指定するものではなく、指定しても必ず反応するとは限りません。上に示した **DoubleClick** の場合の例と、以下に示す [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) プラットフォームの広告の例を比べてみましょう。

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

ご自身の記事の `<header>` タグの直後に、上の 2 つの例を**追加**してみてください。ページを**更新**すると、次のように 2 つの広告が表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='テスト広告') }}

重要: 場合によっては、`Mixed Content` や `XMLHttpRequest cannot load` などのエラーがデベロッパー コンソールに出力されることがあります。前者のエラーは、A9 広告に関係している可能性があります。A9 広告では、セキュリティで保護されていないコンテンツが読み込まれる場合がありますが、AMP では、広告はすべてセキュリティで保護されていることが要求されます。

[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントは、広告プラットフォームの機能を柔軟にサポートします。それを示す [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントの 2 つの設定例を見てみましょう。以下では、DoubleClick のダッシュボードを使用して、特定の国のユーザーにだけ表示される DoubleClick 広告を 2 つ設定しています。1 つ目の広告は英国のユーザーにだけ表示され、2 つ目の広告は米国のユーザーにだけ表示されます。先ほど AMP ドキュメントに追加した広告の下に、次の 2 つの地域ターゲティング広告設定を**追加**してみてください。

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

ページを**更新**して、表示内容を確認してください。次のスクリーンショットは、カナダ国内でキャプチャされたものですが、どちらの広告も表示されていません。

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='テスト広告') }}

注: 上記の [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) タグには `div` タグが追加されており、そこには `fallback` という属性が指定されています。この `fallback` 属性が何を意味しているかおわかりでしょうか。この属性は AMP の読み込みシステムに対し、親要素が読み込みに失敗した場合はその要素に記述された内容のみを表示するよう指定しています。詳しくは、[プレースホルダとフォールバック]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}})をご覧ください。

詳細情報: サポートされる広告ネットワークの最新リストについては、[`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) コンポーネントの関連ドキュメントをご覧ください。

注: 広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別の場所から iframe を AMP ドキュメントとして読み込み、広告ネットワークの JavaScript をその iframe サンドボックス内で実行します。

ここまでで、ページに埋め込まれるテキスト、画像、広告を AMP ドキュメントに記述することができました。これらの要素はいずれも、ストーリーを発信し、コンテンツを収益化するためには欠かせない重要な要素です。しかし、現代のウェブサイトでは、単にテキストと画像を掲載するだけでは十分とはいえません。

ここからは、AMP ドキュメントをより充実した内容にするため、多くのニュース記事に見られる次のような最新のウェブ機能を追加していきます。

- YouTube 動画
- ツイート
- 記事の引用

##  YouTube 動画を埋め込む
では、YouTube 動画を AMP ドキュメントに埋め込んでみましょう。AMP ドキュメントの `<header>` の直後（先ほど追加した 2 つの [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) の上）に次のコードを**追加**します。

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

ページを**更新**します。動画の代わりに、*「動画を読み込めませんでした。」*というテキストが表示されるはずです。

このエラーは、ブラウザで他の YouTube 動画を問題なく表示できる場合でも発生します。なぜなら、実際には動画の読み込みに失敗しているのではなく、コンポーネント自体が失敗しているからです。

すでに説明したように、AMP 基本ライブラリの JavaScript ファイルには、すべてのコンポーネントが含まれているわけではありません。YouTube コンポーネントのための JavaScript リクエストをファイルに追加する必要があります。

注: デベロッパー コンソールがまだ開いていて、URL に `#development=1` と表示されている場合は、[`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) JavaScript の追加を促す AMP 検証エラーと、追加する必要のある `script` タグの説明を含むキュメントへのリンクが表示されます。

次のスクリプトを `<head>` タグに**追加**します。

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

ページを**更新**すると、YouTube 動画が表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='埋め込まれた YouTube 動画') }}

設定では、ページ上の他の要素と同様に、動画の `width` と `height` を 指定しています。AMP レイアウト システムは、この値に基づいてアスペクト比を計算します。また、`layout` を `responsive` に設定しているため、動画は親要素の幅一杯まで拡大されます。

YouTube 動画の埋め込みについて詳しくは、[`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}})をご覧ください。

ヒント: コンポーネントの読み込みに失敗したことやコンポーネントがブラウザでサポートされていないことをユーザーに伝えるには、[`fallback`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}#fallbacks) 属性を使用します。

## ツイートを表示する
Twitter に投稿されたツイートをそのまま埋め込む機能も、ニュース記事で広く使用されています。[`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) コンポーネントを使用すると、この機能を簡単に実現できます。

まず、次の JavaScript リクエストをドキュメントの `<head>` タグに追加します。

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

続いて、ツイートの埋め込み先となる記事に次のコードを**追加**します。

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

`data-tweetid` 属性も、特定のプラットフォームで必要となるカスタム属性です。Twitter は、`data-tweetid` 属性の値を特定のツイートに関連付けます。

ブラウザを**更新**してページの表示を確認してください。次のようにツイートが表示されるはずです。

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='埋め込まれたツイート') }}

ツイートの埋め込みについて詳しくは、[`amp-twitter`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-twitter.md', locale=doc.locale).url.path}}) コンポーネントのドキュメントをご覧ください。

ヒント: AMP には、ソーシャル ネットワークのコンテンツを埋め込むためのコンポーネントが他にも用意されています。詳しくは、[ソーシャル AMP コンポーネント]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}})の最新リストをご覧ください。

## 記事の引用をハイライト表示する

ニュース記事では、記事の重要部分を抜粋してハイライト表示する機能もよく使われます。たとえば、特定の情報源からの引用や重要な事実を、読者の注意を引くために大きなフォントで抜粋するといったことがよく行われています。

ただし、抜粋するテキストの文字数は必ずしも一定ではないため、フォントのサイズは、そのテキストがページ上で占有するスペースとのバランスを考慮して決めなければなりません。

AMP には、この問題を解決するための専用のコンポーネントとして、[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) が用意されています。[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) コンポーネントを使用すると、テキストの幅と高さに固定値を設定し、最大のフォントサイズを指定することができます。フォントサイズは、指定された幅と高さにテキストが**収まる**ようインテリジェントに調整されます。

実際に試してみましょう。まず、次のようにコンポーネントのライブラリを `<head>` タグに**追加**します。

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

次の内容をページに追加します。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

ページを**更新**して表示を確認してください。

続いて、別の設定も試してみましょう。引用をもっと短くするとどうなるでしょうか。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

今度は引用を長くしてみましょう。

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) を使った最後の実験として、max-font-size 属性の値は 42 のまま、height に 400 などの大きな値を設定し、「こんにちは」などの短いテキストを指定してみましょう。 テキストはページ上でどのように表示されるでしょうか。垂直方向の中央揃えで表示されるでしょうか。それとも、最大フォントサイズに合わせて、[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) タグの高さが縮小されるでしょうか。AMP のレイアウト システムについてこれまでに学んだ知識を踏まえ、実際にコードを試す前に答えを考えてみてください。

[`amp-fit-text`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-fit-text.md', locale=doc.locale).url.path}}) について詳しくは、[AMP by Example のライブデモ]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fit-text.html', locale=doc.locale).url.path}})をご覧ください。
