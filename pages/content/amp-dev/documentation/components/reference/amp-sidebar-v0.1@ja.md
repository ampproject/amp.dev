---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    一時的なアクセスを目的としたメタコンテンツ（ナビゲーション、リンク、ボタン、メニューなど）を表示できます。
toc: true
$title: amp-sidebar
---


<!--
       Copyright 2017 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->



<table>
  <tr>
    <td width="40%"><strong>説明</strong></td>
    <td>サイドバーを使用すると、一時的なアクセスを目的としたメタコンテンツ（ナビゲーション、リンク、ボタン、メニューなど）を表示できます。サイドバーは、ボタンのタップによって表示されます。サイドバーを表示しても、メイン コンテンツはその下層で表示状態を維持します。
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://ampjs.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-sidebar/">amp-sidebar サンプル</a>をご覧ください。</td>
  </tr>
</table>

## 概要 <a name="overview"></a>

`<amp-sidebar>` は、一時的なアクセスを目的としたメタコンテンツ（ナビゲーション リンク、ボタン、メニューなど）を非表示にします。`<amp-sidebar>` の開閉は、ボタンのタップで切り替えることができます。また、amp-sidebar の外部をタップして閉じることもできます。メディアクエリを受け入れるオプション属性を使用すると、サイト内の他の部分にメタコンテンツを表示することができます。子要素として `<nav toolbar="(media query)" toolbar-target="elementID">` 要素を使用すると、サイドバー内のコンテンツをメイン コンテンツの他の部分に表示できます。

## 動作 <a name="behavior"></a>

* `<amp-sidebar>` は、`<body>` の直接の子である必要があります。
* サイドバーを表示できるのは、ページの左側または右側に限られます。
* `<amp-sidebar>` は、AMP がサポートしている有効な HTML 要素をすべて格納することができます。
    * `<amp-sidebar>` は、以下の AMP 要素を格納することができます。<li>`<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* サイドバーの最大高さは 100 vh です。高さが 100 vh を超えた場合は、垂直スクロールバーが表示されます。デフォルトの高さは CSS 内で 100 vh に設定されていますが、CSS 内でオーバーライドすることができます。
* サイドバーの幅は、CSS を使用して設定、調整することができます（最小幅は 45 px です）。
* サイドバーが開いている場合、`amp-sidebar` やそのマスクに対するタップズームは無効化されます。

*例:*

以下の例では、`amp-sidebar` を使用して、ナビゲーション アイテムを格納しています。ただし、2 番目のアイテム（Nav Item 2）と 4 番目のアイテム（Nav Item 4）は、ページ上の要素 ID に割り当てられています。[`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) 属性を使用することで、要素 ID と `scrollTo` を使用して、要素をスムーズにスクロールすることができます。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### サイドバーを開閉する <a name="opening-and-closing-the-sidebar"></a>

要素に対してタップやクリックが行われたときにサイドバーを切り替えたり、開いたり、閉じたりするには、要素内に [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) action 属性を設定して、次のいずれかの action メソッドを指定します。

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td>open（デフォルト）</td>
    <td>サイドバーを開きます。</td>
  </tr>
  <tr>
    <td>close</td>
    <td>サイドバーを閉じます。</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>サイドバーの状態を切り替えます。</td>
  </tr>
</table>

部分的に表示されているメイン コンテンツ領域をタップすると、サイドバーが閉じます。

また、キーボードの Esc キーを押した場合も、サイドバーが閉じます。

*例:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### ツールバー <a name="toolbar"></a>

`<amp-sidebar>` の子である `<nav>` 要素内に、メディアクエリを持つ `toolbar` 属性と、要素 ID を持つ `toolbar-target` 属性を指定することで、`<body>` 内に表示される `toolbar` 要素を作成することができます。`toolbar` は、`<nav>` 要素とその子要素を複製して、`toolbar-target` 要素に追加します。

#### 動作 <a name="behavior-1"></a>

* サイドバーは、`toolbar` 属性と `toolbar-target` 属性を持つ nav 要素を追加することで、ツールバーを実装することができます。
* nav 要素は、`<amp-sidebar>` の子にする必要があります。また、`<nav toolbar="(media-query)" toolbar-target="elementID">` という形式にする必要があります。
    * たとえば、`<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">` と指定すると、有効なツールバーになります。</li>
* toolbar 属性を格納している nav は、`<li>` 要素を格納する単一の `<ul>` 要素だけを格納している必要があります。
    * `<li>` 要素は、AMP がサポートしている有効な HTML 要素と、`<amp-sidebar>` がサポートしているすべての AMP 要素をすべて格納することができます。</li>
* ツールバー動作は、`toolbar` 属性のメディアクエリが有効な場合に限り適用されます。また、ツールバーを適用するには、`toolbar-target` 属性 ID を持つ要素が、ページ上に存在している必要があります。

*例: 基本ツールバー*

以下の例では、ウィンドウ幅が 767 px 以下の場合に `toolbar` を表示します。`toolbar` 内に、検索入力要素が含まれています。`toolbar` 要素は、`<div id="target-element">` 要素に追加されます。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>
```

## ツールバーのスタイルを設定する <a name="styling-toolbar"></a>

`<amp-sidebar>` 要素内の `toolbar` 要素は、`toolbar-target` 要素の表示 / 非表示に応じて適用されるクラスを持っています。これは、`toolbar` 要素と `toolbar-target` 要素にそれぞれ異なるスタイルを適用する場合に便利です。対象となるクラスは、`amp-sidebar-toolbar-target-shown` と `amp-sidebar-toolbar-target-hidden` です。クラス `amp-sidebar-toolbar-target-shown` は、`toolbar-target` 要素が表示されているときに `toolbar` 要素に適用されます。クラス `amp-sidebar-toolbar-target-hidden` は、`toolbar-target` 要素が非表示のときに `toolbar` 要素に適用されます。

*例: ツールバー状態クラス*

以下の例では、ウィンドウ幅が 767 px 以下の場合に `toolbar` を表示します。`toolbar` 内に、検索入力要素が含まれています。`toolbar` 要素は、`<div id="target-element">` 要素に追加されます。ただし、`<div id="toolbar-target">` 要素が表示されているときに `toolbar` 要素を非表示にするカスタム スタイルを追加しています。

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Search..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>


```

[tip type="success"]
[AMP By Example](https://ampbyexample.com/components/amp-sidebar/) のライブデモをご覧ください。
[/tip]

## ストーリー向けサイドバー <a name="sidebar-for-stories"></a>

`amp-sidebar` は、[`amp-story` コンポーネント](../../../about/stories.html)内でも使用できます。

### 動作 <a name="behavior-2"></a>

* `<amp-sidebar>` は、`<amp-story>` の直接の子である必要があります。
* デフォルトでは、サイドバーは、通常の AMP ドキュメントの「開始」側に設定されます。つまり、左から右に向かう言語の場合は右側に、右から左に向かう言語の場合は左側に設定されます。
* `<amp-sidebar>` のデフォルト背景色は白色に設定されており、CSS 内でオーバーライドすることができます。
* `<amp-sidebar>` の最大幅は、通常は `280px` に設定されており、パソコン向けの場合は `320px` になります。
* サイドバーを開閉する「ハンバーガー」スタイルのボタンが、ストーリー UI 上に表示されます。

ストーリー プラットフォームを横断して一貫した UI エクスペリエンスを提供するため、許可される属性と機能に関して一定の制限があります。`amp-story` 内で `amp-sidebar` を使用する場合に許可される属性と機能は以下のとおりです。

### 許可される属性 <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [共通の属性](#common)

*例: ストーリー内の基本サイドバー*

`amp-story` 内でシンプルな `amp-sidebar` を使用する例を以下に示します。

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## 属性 <a name="attributes"></a>

##### side <a name="side"></a>

ページのどちら側からサイドバーを開くのかを指定します。指定できる値は `left` または `right` です。`side` が指定されていない場合、`side` 値は `body` タグの `dir` 属性から継承されます（`ltr` =&gt; `left`、`rtl` =&gt; `right`）。`dir` が存在しなかった場合、`side` はデフォルトで `left` に設定されます。

##### layout <a name="layout"></a>

サイドバーの表示レイアウトを指定します。`nodisplay` にする必要があります。

##### open <a name="open"></a>

この属性は、サイドバーが開いているときに存在します。

##### data-close-button-aria-label <a name="data"></a>

ユーザー補助機能用に追加されたオプション属性で、閉じるボタンの ARIA ラベルを設定する際に使用します。

##### toolbar <a name="toolbar-1"></a>

この属性は、子要素の `<nav toolbar="(media-query)" toolbar-target="elementID">` 要素内に存在し、ツールバーを表示するタイミングを示すメディアクエリを受け入れます。ツールバーの使い方については、[ツールバー](#toolbar-1)をご覧ください。

##### toolbar-target <a name="toolbar-target"></a>

この属性は、子要素の `<nav toolbar="(media-query)" toolbar-target="elementID">` 要素内に存在し、ページ上の要素の ID を受け入れます。`toolbar-target` 属性を使用すると、デフォルトのツールバー スタイル設定を使用せずに、ページ上の要素の指定 ID にツールバーを配置できます。ツールバーの使い方については、[ツールバー](#toolbar-1)をご覧ください。

##### 共通の属性 <a name="common"></a>

この要素には、AMP コンポーネントに拡張された[共通の属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)が含まれます。

## スタイル設定 <a name="styling"></a>

`amp-sidebar` コンポーネントは、標準 CSS でスタイルを設定できます。

* `amp-sidebar` の `width` を設定すると、プリセットの最小値（45 px）と最大値（80 vw）の間で幅を調整できます。
* 必要に応じて、`amp-sidebar` の高さを設定すると、サイドバーの高さを調整できます。高さが 100 vw を超えると、サイドバーに垂直スクロールバーが表示されます。サイドバーの高さのプリセットは 100 vw です。短くしたい場合は、CSS 内でオーバーライドすることができます。
* サイドバーの現在の状態は、サイドバーがページ上で開いているときに `amp-sidebar` タグ内に設定された `open` 属性を通じてエクスポーズされます。

[tip type="success"]
AMP ページ内で使用できるスタイル設定済みのレスポンシブ ナビゲーション メニューについては、[AMP Start](https://ampstart.com/components#navigation) をご覧ください。
[/tip]

## オーバーフロー領域内の自動スクロール <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar` は、サイドバーの場合でもツールバーの場合でも、属性として `autoscroll` で装飾されている最初の要素に向けて、オーバーフロー コンテナを自動的にスクロールできます。

この機能は、ナビゲーション リストが長いときに、ページの読み込み時にサイドバーを現在のナビゲーション アイテムまでスクロールする場合に便利です。

`toolbar` 機能を使用する際、`autoscroll` が機能するのは、`<nav toolbar>` 要素を `overflow: auto` または `overflow: scroll` に設定している場合に限られます。

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

機能するサンプルコードについては、[こちらのサンプル ファイル](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html)をご覧ください。

## UX に関する注意事項 <a name="ux-considerations"></a>

`<amp-sidebar>` を使用する際、留意すべき点があります。多くのユーザーは、モバイル上で AMP ビューアを使用してページを表示します。この場合、固定位置のヘッダーが表示されることがあります。また、ページの上部にブラウザ自身の固定ヘッダーが表示されることもあります。画面の上部に別の固定位置要素を追加すると、それだけでモバイル画面領域の大部分が埋まってしまうことになり、ユーザーに新しい情報を伝えられなくなります。

そのため、フル幅の固定ヘッダー内には、サイドバーを開く機能を配置しないことをおすすめします。

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-sidebar ルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii)をご覧ください。
