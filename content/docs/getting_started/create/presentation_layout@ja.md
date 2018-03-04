---
$title: 体裁とレイアウトを変更する
---

## 体裁を変更する

AMP はウェブページなので、ページやその中に含まれる要素のスタイリングには、必ず共通の CSS プロパティを使用します。以下のように、`<head>` 内のインライン スタイルシートにあるクラスや要素セレクターを使うスタイル要素を `<style amp-custom>` と呼びます。

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

各 AMP ページで使える埋め込みスタイルシートは 1 つだけで、使用できないセレクターもいくつかあります。[スタイリングの詳細については、こちらをご確認ください](/ja/docs/guides/responsive/style_pages.html)。

## レイアウトを制御する

AMP は厳密な規則に従って、ページ上に要素を配置します。通常の HTML ページは CSS を使って要素を配置することがほとんどですが、AMP ではパフォーマンスを上げるために、すべての要素のサイズを最初から明示的に設定する必要があります。

AMP ページのレンダリングやレイアウトの方法、レイアウトの変更方法については[レイアウトの制御方法](/ja/docs/guides/responsive/control_layout.html)をご覧ください。

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ja/docs/tutorials/create/include_image.html"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="/ja/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">次へ</span></a>
</div>
