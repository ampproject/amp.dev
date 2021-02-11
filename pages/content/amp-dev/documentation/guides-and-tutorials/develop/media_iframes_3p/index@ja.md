---
'$title': 画像や動画を含める
$order: 8
description: 通常の HTML ページと同じように、AMP では画像、動画、音声を埋め込むことができます。通常の HTML と AMP コンポーネントの違いと、こうしたコンポーネントを...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

通常の HTML ページと同じように、AMP でも **画像** 、**動画** 、**音声を埋め込むことができます内容。** 通常の HTML と AMP のコンポーネントの違いと、こうしたコンポーネントをページに含める方法について解説します。

## Why not `<img>`、`<video>`、`<audio>` を使用しない理由

AMP は、メディアの表示に使用されるデフォルトの HTML タグ（`<img>`など）には対応していません。次の理由で、同等のコンポーネントが用意されています。

- アセットの読み込み前にページのレイアウトを把握しなければならない（[最初のビューポートのプリロードに対応](../../../../about/how-amp-works.html#size-all-resources-statically) するために不可欠）
- ネットワーク リクエストを管理して、[リソースの遅延読み込みと優先順位付けを効果的に行えるように](../../../../about/how-amp-works.html#prioritize-resource-loading) しなければならない

注: こうしたタグの使用は、非対応ですが、_will_ 表示には有効です。ただし、AMP で [ページの検証](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) が行われないので、AMP のメリットをすべて利用することはできなくなります。

## 画像

画像をページに追加するには [`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素を使用します。たとえば次のようになります。

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

こちらのごく基本的な例では、画像は、指定した固定の高さと幅で表示されます。少なくとも、幅と高さを明確に設定する必要があります。

#### JavaScript が無効な場合に画像を表示する

As `<amp-img>` は JavaScript に依存するので、ユーザーがスクリプトを無効にすると画像は表示されなくなります。このような場合、その画像のフォールバックを、`<img>` と `<noscript>` を使って指定する必要があります。たとえば次のようになります。

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### 高度なレイアウト

AMP では、標準の CSS や HTML を使う場合よりもかなり簡単に、完全にレスポンシブな画像を作成できます。最も基本的な形式では、必要な作業は次のように `layout="responsive" `を追加することだけです。

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

参考情報: 詳しくは、[高度なレイアウトの手法](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) についての説明をご覧ください。

### 動作とプレースホルダ

AMP HTML のランタイムでは、画像のリソースを効果的に管理でき、ビューポートの位置、システム リソース、接続の帯域幅などの要素に基づいて、リソースの読み込みを遅らせるか優先させるかを選べます。

参考情報: 方法は、[画像のフォールバックやプレースホルダの指定](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) についての説明をご覧ください。

## アニメーション画像

The [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) 要素は[`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素とよく似ています。この要素では、アニメーション画像（GIF など）の読み込みや再生を管理する機能を追加できます。

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

注: このコンポーネントを使用するには、<code><script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script></code> をページの先頭に追加します。

## 動画

動画をページに追加するには [`amp-video`](../../../../documentation/components/reference/amp-video.md) 要素を使用します。

この要素は、HTML5 の動画ファイルを直接埋め込む場合にのみ使用します。この要素により、`src` 属性で指定された動画のリソースが、AMP で決められたタイミングで、遅れて読み込まれます。

動画が開始する前のプレースホルダと、ブラウザが HTML5 の動画に対応していない場合のフォールバックを追加します。たとえば次のようになります。

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## 音声

音声のリソースをページに追加するには [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) 要素を使用します。

この要素は、HTML5 の音声ファイルを直接埋め込む場合にのみ使用します。AMP ページに埋め込まれるすべての外部リソースと同様に、この要素により、`src` 属性で指定された音声のリソースが、AMP で決められたタイミングで、遅れて読み込まれます。

音声が開始する前のプレースホルダと、ブラウザが HTML5 の音声に対応していない場合のフォールバックを追加します。たとえば次のようになります。

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

注: このコンポーネントを使用するには、<code><script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script></code> をページの先頭に追加します。
