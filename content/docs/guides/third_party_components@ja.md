---
$title: サードパーティ コンテンツを追加する
---

ページにサードパーティ コンテンツを追加する方法について説明します。

[TOC]

## ツイートを埋め込む

ページに Twitter のツイートを埋め込むには、[`amp-twitter`](/docs/reference/extended/amp-twitter.html) 要素を使用します。

ページにツイートを追加するには、最初に次のスクリプトを `<head>` に追加します。

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

現在、ツイートは自動的に、用意されたサイズに合わせて均等に拡大縮小されますが、そのために標準の外観から少し外れる場合があります。用意された幅と高さを手動で調整するか、または、media 属性を使用して、画面の幅に基づくアスペクト比を選択してください。

[twitter.amp のサンプル](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html)からの `amp-twitter` の例:

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Instagram を埋め込む

ページに Instagram を埋め込むには、[`amp-instagram`](/docs/reference/extended/amp-instagram.html) 要素を使用します。

Instagram を埋め込むには、最初に次のスクリプトを `<head>` に追加します。

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Instagram の写真 URL にある data-shortcode を指定します。たとえば、`https://instagram.com/p/fBwFP` の場合、`fBwFP` が data-shortcode です。また、Instagram ではレスポンシブ レイアウトに対して固定のアスペクト比を使用しているため、幅と高さの値は共通になります。

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Facebook の投稿や動画を表示する

Facebook の投稿や動画をページに表示するには、[`amp-facebook`](/docs/reference/extended/amp-facebook.html) 要素を使用します。

`<head>` に次のスクリプトを追加する必要があります。

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

例 - 投稿を埋め込む:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

例 - 動画を埋め込む:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## YouTube 動画を追加する

YouTube 動画をページに追加するには、[`amp-youtube`](/docs/reference/extended/amp-youtube.html) 要素を使用します。

`<head>` に次のスクリプトを追加する必要があります。

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

YouTube の `data-videoid` は YouTube 動画ページの URL で見つかります。たとえば、https://www.youtube.com/watch?v=Z1q71gFeRqM の場合、Z1q71gFeRqM が動画 ID です。

`layout="responsive"` を使用すると、アスペクト比 16:9 の動画に対する正しいレイアウトが生成されます。

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## 広告を表示する

ページに広告を表示するには、[`amp-ad`](/docs/reference/amp-ad.html) 要素を使用します。HTTPS 経由で配信される広告のみがサポートされています。

広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別の場所から iframe を読み込んで、広告ネットワークの JS をその iframe サンドボックス内で実行します。

広告の幅と高さ、広告ネットワークのタイプを指定する必要があります。`type` では広告ネットワークのテンプレートを指定します。広告のタイプごとに別々の `data-*` 属性が必要です。

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

広告ネットワークでサポートされている場合は、使用できる広告がない場合に表示される `placeholder` を追加します。

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP はさまざまな広告ネットワークに対応しています。詳細なリストについては、[リファレンス](/docs/reference/amp-ad.html#supported-ad-networks)をご覧ください。
