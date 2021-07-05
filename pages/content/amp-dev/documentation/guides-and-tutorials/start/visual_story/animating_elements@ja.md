---
'$title': Animating elements
$order: 6
description: ページ内の要素の表示処理をアニメーション化することで、Web ストーリーの見栄えをさらに向上させることができます。たとえば、タイトルを画面の左からスライドインさせたり、ページにドロップインさせたり ...
components:
  - anim
author: bpaduch
---

ページ内の要素の表示処理をアニメーション化することで、Web ストーリーの見栄えをさらに向上させることができます。たとえば、タイトルを画面の左からスライドインさせたり、ページにドロップインさせたり、フェードインさせたりといった視覚効果を適用できます。AMP ストーリーのフレームワークには、以下のプリセット アニメーションが用意されています。

<table>
<thead><tr>
  <th width="50%">アニメーション プリセット</th>
  <th width="25%">デフォルトの長さ（ミリ秒）</th>
  <th width="25%">デフォルトの遅延（ミリ秒）</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

要素に表示処理のアニメーション化を適用するには、<code>animate-in="<em>&lt;animation preset></em>"</code> でアニメーション プリセットの値を指定する必要があります。たとえば、ページにテキストをドロップインには、以下のようにテキスト要素に `animate-in="drop"` を追加します。

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

ストーリー ページ上の要素に `animate-in="<アニメーション プリセット>"` 属性を追加することで、さまざまなアニメーション効果を確認できます。

## アニメーションのタイミング

各アニメーション プリセットには、以下のデフォルト値が設定されています。

- **遅延**: アニメーションの開始をどのくらいの時間遅延するかを指定します。たとえば、遅延を「0.3s」と指定すると、ページが表示されてから 0.3 秒後にアニメーションが開始されます。遅延を「0s」にするとアニメーションはすぐに開始されます。
- **長さ**: アニメーションの時間をどのくらいの長さにするかを指定します。たとえば、フェードイン アニメーションの開始から完了までには 500 ミリ秒かかります。

アニメーションのタイミングは、`animate-in-delay` 属性や `animate-in-duration` 属性を使って遅延や長さを変更することでカスタマイズできます。以下の例では、ページが表示されてから 0.3 秒後に `my-element` が左からスライドインを開始し、0.5 秒以内に完全にスライドインします。

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## 最後のページをアニメーション化する

このガイドで作成している Web ストーリーの最後のページは、2 つのレイヤで構成されています。1 つ目のレイヤは動物の画像のコラージュで、2 つ目のレイヤではバナーテキストを表示しています。このページを作成するには、前のストーリー ページの直後に以下のコードを**追加**します。

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

ブラウザで AMP ストーリーを再度読み込み、ページが以下のように正しく表示されることを確認してください。

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='静止ページ 5' ) }}

見栄えのよいページができあがりましたが、すべての要素が静止しています。このページをアニメーション化してみましょう。

まず、バナーテキストの表示処理をアニメーション化し、ページの右側からスライドインします。以下のように、`<p>` 要素に `animate-in="whoosh-in-right"` を追加します。

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

ブラウザでストーリー ページを再度読み込み、バナーがスライドインすることを確認してください。

次に、すべての画像をフェードインします。以下のように、コードの各 <a><code>amp-img</code></a> 要素に `animate-in="fade-in"` を追加します。

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

ページを更新して再度読み込むと、各画像がフェードインします。さらに見栄えがよくなりましたが、すべての画像が同時にフェードインするため、効果があまり目立たない可能性もあります。その場合は、アニメーションのタイミングを変更すると視覚効果を改善できます。

たとえば、最初の画像の表示処理を開始するタイミングを 0.4 秒（0.4s）遅延させて、テキストバナーの表示処理が完了する寸前に開始されるようにしましょう。残りの 3 枚の画像の表示処理は、直前の画像の表示処理が開始されてから 0.2 秒（0.2s）後に開始されるようにします。各 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 要素に、`animate-in-delay=""` 属性を使って適切な遅延の値を指定します。コードは以下のようになります。

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

ストーリーを更新して再度読み込みます。最後のページが以下のようになります。

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='ページ 5 のコラージュ', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Web ストーリーのアニメーションでは、アニメーションの組み合わせやアニメーションの変更などによって、このチュートリアルで紹介した以外にもさまざまな視覚効果を追加できます。アニメーションについて詳しくは、[`amp-story`](../../../../documentation/components/reference/amp-story.md) の関連ドキュメントをご覧ください。
