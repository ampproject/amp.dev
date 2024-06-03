---
'$title': Navigating your site
$order: 5
description: モバイルサイトには通常、サイトのナビゲーションメニューを設けます。こうしたメニューにはさまざまな形式があります。このチュートリアルでは、AMP ページでのナビゲーション ...
---

モバイルサイトには通常、サイトのナビゲーションメニューを設けます。こうしたメニューにはさまざまな形式があります。このチュートリアルでは、AMP ページでのナビゲーションの表示について、以下のような例を試してみましょう。

- ホームページに戻るリンク: 最も簡単な方法
- ナビゲーションのサイドバー: [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) コンポーネントを使用

## ホームに戻るリンク

ユーザーがウェブサイトの通常のナビゲーションオプションにアクセスできるようにするには、ホームページにユーザーを戻すのが最も簡単です。

`<header>` タグをリンクを含めた以下のバージョンに**置き換える**方法を試します。

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

以下のスタイルルールをインライン CSS に**追加**します。

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

ここでページを**更新**します。ページの左上に `homepage.html` を指すリンクが表示されます。このホームアイコンをクリックしても、どこにも移動しないことがすぐにわかります（`homepage.html` ファイルがないからです）。

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='ホームアイコンのナビゲーション') }}

このリンクをウェブサイトのホームページの URL に置き換えると、ユーザーが既存のウェブサイトのナビゲーションを使ってサイトの別の場所に移動できます。

これは既存のウェブサイトのナビゲーションを活用する最も簡単な方法です。では次に、サイトのナビゲーションとして一般的な方法を試しましょう。

## サイドバーでの移動

ナビゲーションの一般的な方法は、メニューアイコンを追加して、クリックするとナビゲーションのリンク一式が（ページの横に）表示されるようにすることです。AMP では、こうしたナビゲーションを [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) コンポーネントを使って作成できます。

まず、[`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) コンポーネントの JavaScript を `<head>` タグに**追加**します。

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

次に、メニュー アイコンが表示されるようにします。このアイコンがタップされると、サイドバーが開きます。`<header>` を次のコードに**置き換えて**、ホームアイコンの代わりに ["ハンバーガー"](https://en.wikipedia.org/wiki/Hamburger_button) アイコンを表示します。

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

上記のコードではサイドバーを `toggle`（切り替える）のに、[`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) 要素の [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) アクション属性を使用しています。サイドバー要素は `sidebar1` ID で識別されます。では、サイドバーを追加しましょう。

以下の HTML を `</header>` のすぐ後に**追加**します。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

サイドバーは非表示ですが、ユーザーがハンバーガーアイコンをタップすると、画面の左側にメニューが表示されます。メニューを閉じるには、X アイコンをタップします。

最後に、以下のスタイルルールをインライン CSS に**追加**します。

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

では、作成したサイドバーを確認しましょう。AMP ページを**更新**して再読み込みすると、次のように表示されます。

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='サイドバーメニューのナビゲーション') }}

ページの見栄えがよくなりました。では、仕上げとしてカスタムフォントを追加しましょう。
