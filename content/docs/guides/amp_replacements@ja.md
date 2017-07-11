---
$title: 画像や動画を含める
$order: 1
$category: Develop
toc: true
---

[TOC]

通常の HTML ページと同じように、AMP でも **画像** 、**動画** 、**音声を埋め込むことができます内容。** 通常の HTML と AMP のコンポーネントの違いと、こうしたコンポーネントをページに含める方法について解説します。

##  Why not `<img>`、`<video>`、`<audio>` を使用しない理由

AMP は、メディアの表示に使用されるデフォルトの HTML タグ（`<img>`など）には対応していません。次の理由で、同等のコンポーネントが用意されています。

*  アセットの読み込み前にページのレイアウトを把握しなければならない（[最初のビューポートのプリロードに対応](/learn/about-how/#size-all-resources-statically) するために不可欠）
*  ネットワーク リクエストを管理して、[リソースの遅延読み込みと優先順位付けを効果的に行えるように](/learn/about-how/#prioritize-resource-loading) しなければならない

{% call callout('注', type='caution') %}
こうしたタグの使用は、非対応ですが、*will* 表示には有効です。ただし、AMP で [ページの検証](/docs/guides/debug/validate.html) が行われないので、AMP のメリットをすべて利用することはできなくなります。
{% endcall %}

## 画像

画像をページに追加するには [amp-img](/ja/docs/reference/components/amp-img.html) 要素を使用します。たとえば次のようになります。

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

こちらのごく基本的な例では、画像は、指定した固定の高さと幅で表示されます。少なくとも、幅と高さを明確に設定する必要があります。

#### JavaScript が無効な場合に画像を表示する

As `<amp-img>` は JavaScript に依存するので、ユーザーがスクリプトを無効にすると画像は表示されなくなります。このような場合、その画像のフォールバックを、`<img>` と `<noscript>` を使って指定する必要があります。たとえば次のようになります。

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96">
  <noscript>
    <img src="fixed.jpg" width="264" height="96" />
  </noscript>
</amp-img>
[/sourcecode]

### 高度なレイアウト

 AMP では、標準の CSS や HTML を使う場合よりもかなり簡単に、完全にレスポンシブな画像を作成できます。最も基本的な形式では、必要な作業は次のように `layout="responsive" `を追加することだけです。

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

{% call callout('参考情報', type='success') %}
詳しくは、[高度なレイアウトの手法](/ja/docs/guides/author-develop/responsive/control_layout.html) についての説明をご覧ください。
{% endcall %}

### 動作とプレースホルダ

AMP HTML のランタイムでは、画像のリソースを効果的に管理でき、ビューポートの位置、システム リソース、接続の帯域幅などの要素に基づいて、リソースの読み込みを遅らせるか優先させるかを選べます。

{% call callout('参考情報', type='success') %}
方法は、[画像のフォールバックやプレースホルダの指定](/ja/docs/guides/author-develop/responsive/placeholders.html) についての説明をご覧ください。
{% endcall %}

## アニメーション画像

The [amp-anim](/ja/docs/reference/components/amp-anim.html) 要素は`amp-img` 要素とよく似ています。この要素では、アニメーション画像（GIF など）の読み込みや再生を管理する機能を追加できます。

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
  <amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
[/sourcecode]

{% call callout('注', type='note') %}
このコンポーネントを使用するには、`<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` をページの先頭に追加します。
{% endcall %}

## 動画

動画をページに追加するには [amp-video](/ja/docs/reference/components/amp-video.html) 要素を使用します。

この要素は、HTML5 の動画ファイルを直接埋め込む場合にのみ使用します。この要素により、`src` 属性で指定された動画のリソースが、AMP で決められたタイミングで、遅れて読み込まれます。

動画が開始する前のプレースホルダと、ブラウザが HTML5 の動画に対応していない場合のフォールバックを追加します。たとえば次のようになります。

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4" poster="myvideo-poster.jpg">
  <div fallback>
    <p>このブラウザは HTML5 の動画に対応していません</p>
  </div>
</amp-video>
[/sourcecode]

## 音声

音声のリソースをページに追加するには [amp-audio](/docs/reference/components/amp-audio.html) 要素を使用します。

この要素は、HTML5 の音声ファイルを直接埋め込む場合にのみ使用します。AMP ページに埋め込まれるすべての外部リソースと同様に、この要素により、`src` 属性で指定された音声のリソースが、AMP で決められたタイミングで、遅れて読み込まれます。

音声が開始する前のプレースホルダと、ブラウザが HTML5 の音声に対応していない場合のフォールバックを追加します。たとえば次のようになります。

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">
  <div fallback>
    <p>このブラウザは HTML5 の音声に対応していません</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

{% call callout('注', type='note') %}
このコンポーネントを使用するには、`<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` をページの先頭に追加します。
{% endcall %}
