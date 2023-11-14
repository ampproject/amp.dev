---
'$title': サードパーティコンテンツを含める
$order: 9
description: ページにサードパーティコンテンツを含める方法について...
formats:
  - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

ページにサードパーティコンテンツを含める方法について説明します。

## ツイートの埋め込み

ページに Twitter のツイートを埋め込むには、[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) 要素を使用します。

ページにツイートを埋め込むには、最初に次のスクリプトを `<head>` に含めます。

[sourcecode:html]

<script async custom-element="amp-twitter"
  src="https://ampjs.org/v0/amp-twitter-0.1.js"></script>

[/sourcecode]

現在、ツイートは自動的に、用意されたサイズに合わせて均等に拡大縮小されますが、そのために標準の外観から少し外れる場合があります。用意された幅と高さを手動で調整するか、または、media 属性を使用して、画面の幅に基づくアスペクト比を選択してください。

[example preview="inline" playground="true" imports="amp-twitter:0.1"]

```html
<amp-twitter
  width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

[/example]

[tip type="tip"] <strong>ヒント:</strong> その他の [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) の例については、[AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html) をご覧ください。[/tip]

## Instagram の埋め込み

ページに Instagram を埋め込むには、[`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) 要素を使用します。

Instagram を埋め込むには、最初に次のスクリプトを `<head>` に追加します。

[sourcecode:html]

<script async custom-element="amp-instagram"
  src="https://ampjs.org/v0/amp-instagram-0.1.js"></script>

[/sourcecode]

Instagram の写真 URL にある data-shortcode を指定します。たとえば、`https://instagram.com/p/fBwFP` の場合、`fBwFP` が data-shortcode です。また、Instagram ではレスポンシブレイアウトに対して固定のアスペクト比を使用しているため、幅と高さの値は共通になります。

[example preview="inline" playground="true" imports="amp-instagram:0.1"]

```html
<amp-instagram
  data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive"
>
</amp-instagram>
```

[/example]

[tip type="tip"] <strong>ヒント:</strong> その他の [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) の例については、[AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html) をご覧ください。[/tip]

## Facebook の投稿や動画の表示

Facebook の投稿や動画をページに表示するには、[`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) 要素を使用します。

`<head>` に次のスクリプトを追加する必要があります。

[sourcecode:html]

<script async custom-element="amp-facebook"
  src="https://ampjs.org/v0/amp-facebook-0.1.js"></script>

[/sourcecode]

##### 例 - 投稿を埋め込む

ソースコード:

```html
<amp-facebook
  width="486"
  height="657"
  layout="responsive"
  data-href="https://www.facebook.com/zuck/posts/10102593740125791"
>
</amp-facebook>
```

プレビュー: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### 例 - 動画を埋め込む

ソースコード:

```html
<amp-facebook
  width="476"
  height="316"
  layout="responsive"
  data-embed-as="video"
  data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"
>
</amp-facebook>
```

プレビュー: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

[tip type="tip"] <strong>ヒント:</strong> その他の [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) の例については、[AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html) をご覧ください。[/tip]

## YouTube 動画の埋め込み

YouTube 動画をページに埋め込むには、[`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 要素を使用します。

`<head>` に次のスクリプトを追加する必要があります。

[sourcecode:html]

<script async custom-element="amp-youtube"
  src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>

[/sourcecode]

YouTube の `data-videoid` は YouTube 動画ページの URL で見つかります。たとえば、`https://www.youtube.com/watch?v=Z1q71gFeRqM` の場合、`Z1q71gFeRqM` が動画 ID です。

`layout="responsive"` を使用すると、アスペクト比 16:9 の動画に対する正しいレイアウトが生成されます。

[example preview="inline" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

[tip type="tip"] <strong>ヒント:</strong> その他の [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) の例については、[AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html) をご覧ください。[/tip]

## 広告の表示

ページに広告を表示するには、[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 要素を使用します。HTTPS 経由で配信される広告のみがサポートされています。

広告ネットワークから提供される JavaScript を AMP ドキュメント内で実行することはできません。代わりに、AMP ランタイムは（iframe サンドボックス経由で）別の場所から iframe を読み込んで、広告ネットワークの JS をその iframe サンドボックス内で実行します。

広告の幅と高さ、広告ネットワークのタイプを指定する必要があります。`type` では広告ネットワークのテンプレートを指定します。広告のタイプごとに別々の `data-*` 属性が必要です。

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
</amp-ad>
```

[/example]

広告ネットワークでサポートされている場合は、使用できる広告がない場合に表示される `placeholder` を追加します。

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
  <div placeholder>Have a great day!</div>
</amp-ad>
```

[/example]

AMP はさまざまな広告ネットワークに対応しています。詳細なリストについては、[<code>amp-ad</code>](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks) をご覧ください。

[tip type="read-on"] <strong>参考情報:</strong> 広告について詳しくは、[AMP での広告の配信](../../../../documentation/guides-and-tutorials/develop/monetization/index.md)に関するガイドをご覧ください。[/tip]
