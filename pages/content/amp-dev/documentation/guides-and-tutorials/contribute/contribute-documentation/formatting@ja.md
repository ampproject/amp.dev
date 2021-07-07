---
'$title': 書式設定ガイドとチュートリアル
$order: 3
description: amp.dev のファイルの書式設定要件
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

ガイドとチュートリアルは、追加の Frontmatter とショートコードの書式設定とともに [Markdown](https://www.markdownguide.org/) に提出します。

## ドキュメントの場所

amp.dev のコンテンツは 、[amp.dev](https://github.com/ampproject/amp.dev) と [AMPHTML](https://github.com/ampproject/amphtml) の 2 つのレポジトリから pull されます。components の下のすべてのリファレンスドキュメントは、AMPHTML の builtins または extensions から pull されます。

- [ビルトインコンポーネント ](https://github.com/ampproject/amphtml/tree/main/src/builtins)
- [コンポーネント](https://github.com/ampproject/amphtml/tree/main/extensions)
- [コース](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [例](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [ガイドとチュートリアル](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

ほかにも、AMPHTML から amp.dev にインポートされるドキュメントがいくつかあります。これらは、[このファイルにリスト](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json)されています。これらの amp.dev 内のドキュメントを更新しないでください。変更内容は、以降のビルドで上書きされます！

## Frontmatter

Frontmatter は、各ガイドとチュートリアルの最上位にあります。

次に例を示します。

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>目次に表示されるドキュメントの題名です。“AMP” やその他の固有名詞以外は、最初の単語の先頭の英字を大文字にします。単語の `and` の代わりにアンパサンド記号の `&` を使用してください。</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>目次のどこにドキュメントが表示されるかを定義します。正しい位置に表示されるように、ほかのドキュメントで `$order` を編集する必要がある場合があります。</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>ドキュメントに関連する AMP エクスペリエンスをリストします。ドキュメントが AMP ウェブサイトと AMP ストーリーに関連しており、AMP 広告や AMP メールに関連していない場合は、Frontmatter を ```yaml         formats:           - websites           - stories     ``` のようにします。</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>作成者はあなたです！あなたの GitHub ユーザー名を使用してください。</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>ドキュメントに貢献した人をリストします。このフィールドはオプションです。</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>ガイドまたはチュートリアルに関する簡単な説明文を記述します。この内容をもとに検索エンジンが最適化され、ドキュメントを必要とする人に届けられます！</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>ウェブサイトの Frontmatter に `tutorial: true` を追加すると、チュートリアルアイコンがウェブサイトの隣に追加されます。チュートリアルのセクションは目次の下部にあります。</td>
  </tr>
</table>

# ショートコード

ショートコードとその使用方法のリストについては、[GitHub の documentation.md](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes) を参照してください。

## 画像

amp.dev は AMP で作られています！そのため、画像は [`amp-img`](../../../../documentation/components/reference/amp-img.md) 基準に一致していなければなりません。ビルドプロセスでは、以下の構文により、画像を適切な `amp-img` 形式に変換しています。

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre></div>

## セクションのフィルタリング

ドキュメントには、複数の AMP 形式に関連性のあるものもあれば、ほかの形式には関連性のない説明や情報がさらに必要なものもあります。こういったセクションについては、以下のショートコードで囲むことでフィルタリングすることができます。

<div class="ap-m-code-snippet"><pre>&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) &amp; [email](?format=email).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&amp;lsqb;/filter]</pre></div>

## ヒント

以下のショートコードでテキストを囲むことで、ヒントとコールアウトを追加できます。

<div class="ap-m-code-snippet"><pre>&amp;lsqb;tip type="default"]
Default tip
[/tip]

&amp;lsqb;tip type="important"]
Important
[/tip]

&amp;lsqb;tip type="note"]
Note
[/tip]

&amp;lsqb;tip type="read-on"]
Read-on
[/tip]</pre></div>

## コードスニペット

コードスニペットは、3 連バックティックの間に配置し、言語を最初の 3 連バックティックセットの最後に指定します。

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
// code sample
```

````js
  // code sample
```</pre></div>

コードに二重波かっこが含まれる場合、コードの部分が囲まれている必要があります。二重波かっこは、[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) テンプレートを使用している場合に見られることがよくあります。

<div class="ap-m-code-snippet"><pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre></div>

### リスト内のコードスニペット

Python-Markdown にはいくつかの制限があります。リストにコードスニペットを含める場合は、次の構文を使用してください。

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## コードサンプルのプレビュー

コードサンプルにはプレビューや [AMP Playground](https://playground.amp.dev/) バージョンへのリンクを使用できます。

<div class="ap-m-code-snippet">
  <pre>&lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="<custom-element-1>,<custom-element-2>,..."
          template="<custom-template>"]
  ```html
    // code sample
````

&lsqb;/example]</pre>

</div>

注意: プレビューは、Playground で開くと、現在選択されている形式に自動的に変換されます 🤯！

プレビューがどのように生成されるかを定義するには、`preview` 属性を使用します。

- **none**: プレビューは生成されません

- **inline**: プレビューの例はソースコードの上に表示されます。インラインプレビューは、コードに `head` 要素が含まれていない場合に、通常のウェブサイトの例でのみ使用できます。このオプションは、スタイル付けやほかの `head` 要素が不要である小さな例に使用します（インポートは `imports` 属性で指定されるため、この制限に考慮されません）。

- **top-frame**: プレビューの例は、iframe 内のソースコードの上に表示されます。`portrait` と `landscape` モードで向きを切り替えることができます。次のように属性を追加指定することで、向きをあらかじめ選択することができます。

- **orientation**: `default: landscape|portrait`

カスタム要素が必要な場合は、コンポーネント名の後にコロンとバージョンを付けて、カンマ区切りのリストとして `imports` 属性に指定します。コードに [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) が使用されている場合は、代わりに `template` 属性に依存関係を指定してください。

リソースリンク付きのメールコンテンツについては、ソースにプレースホルダの <code>{{server_for_email}}</code> を使用します。

### インラインサンプル

以下は、単純な埋め込みのインラインサンプルです。インラインスタイルで CSS を定義できます。

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

これは次のように表示されます。

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

警告: インラインサンプルは、ページに直接埋め込まれるため、ページ上ですでにコンポーネントが使用されている場合（`amp-consent` など）に競合が発生する可能性があります。

### トップフレームプレビュー

ヘッダー要素を指定したり、グローバルスタイルを `<style amp-custom>` 内に定義したりする必要がある場合は、トップフレームプレビューを使用します。

重要: ヘッダーに AMP ボイラープレートコードを追加しないでください。AMP ボイラープレートは AMP 形式に基づいて自動的に追加されます。サンプルで必要とされる要素のみをヘッダーに追加してください！

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
      <style amp-custom>
        body {
          background: red;
        }
      </style>
    </head>
    <body>
      <h1>Hello AMP</h1>
      <amp-youtube width="480"
        height="270"
        layout="responsive"
        data-videoid="lBTCB7yLs8Y">
      </amp-youtube>
    </body>
    ```
  [/example]</pre></div>

これは次のように表示されます。

[example preview="top-frame"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-youtube"
    src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
  ></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube
    width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y"
  >
  </amp-youtube>
</body>
```

[/example]

### AMP ストーリー

AMP ストーリーのプレビューには、`preview="top-frame"` と `orientation="portrait"` を合わせて使用します。

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         orientation="portrait"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
      <style amp-custom>
        body {
          font-family: 'Roboto', sans-serif;
        }
        amp-story-page {
          background: white;
        }
      </style>
    </head>
    <body>
      <amp-story standalone>
        <amp-story-page id="cover">
          <amp-story-grid-layer template="vertical">
            <h1>Hello World</h1>
            <p>This is the cover page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="vertical">
            <h1>First Page</h1>
            <p>This is the first page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
      </amp-story>
    </body>
    ```
  [/example]</pre></div>

これは次のように表示されます。

[example preview="top-frame"
orientation="portrait"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
  ></script>
  <style amp-custom>
    body {
      font-family: 'Roboto', sans-serif;
    }
    amp-story-page {
      background: white;
    }
  </style>
</head>
<body>
  <amp-story standalone>
    <amp-story-page id="cover">
      <amp-story-grid-layer template="vertical">
        <h1>Hello World</h1>
        <p>This is the cover page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
    <amp-story-page id="page-1">
      <amp-story-grid-layer template="vertical">
        <h1>First Page</h1>
        <p>This is the first page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
  </amp-story>
</body>
```

[/example]

### AMP メールの絶対 URL

AMP メールに <code>{{server_for_email}}</code> を埋め込む場合に、それをどのように使用してエンドポイント URL を絶対 URL にしているか、注意してください。

<div class="ap-m-code-snippet"><pre>[example preview="top-frame" playground="true"]
    ```html
    <div class="resp-img">
      <amp-img alt="flowers"
        src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
        layout="responsive"
        width="640"
        height="427"></amp-img>
    </div>
    ```
  [/example]</pre></div>

これは次のように表示されます。

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

### mustache テンプレートのエスケープ処理

以下は、リモートエンドポイントを使用した `top-frame` サンプルです。Mustache テンプレートは、<code>{% raw %}</code> と <code>{% endraw %}</code> を使用して、サンプルでエスケープ処理する必要があります。

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"
        playground="true"
        imports="amp-list:0.1"
        template="amp-mustache:0.2"]
    ```html
    <amp-list width="auto" height="100" layout="fixed-height"
      src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
      <template type="amp-mustache">{% raw %}
        <div class="url-entry">
          <a href="{{url}}">{{title}}</a>
        </div>
      {% endraw %}
      </template>
    </amp-list>
    ```
[/example]</pre>
</div>

これは次のように表示されます。

[example preview="top-frame"
playground="true"
imports="amp-list:0.1"
template="amp-mustache:0.2"]

```html
<amp-list
  width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json"
>
  <template type="amp-mustache"
    >{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## リンク

標準的なマークダウンのリンク構文を使って、ほかのページにリンクすることができます。

```md
[link](../../../courses/beginning-course/index.md)
```

amp.dev の別のページにリンクする場合、参照はそのターゲットファイルへの相対ファイルパスになります。

### アンカー

ドキュメント内の特定のセクションへのリンクには、アンカーを使用します。

```md
[link to example section](#example-section)
```

アンカーがないセクションにリンクする前に、`<a name="#anchor-name></a>` を使ってアンカーターゲットを作成してください。セクションの見出しの最後に作成するのが適しています。

```html
## Example section <a name="example-section"></a>
```

アンカーには、文字、数字、ダッシュ、およびアンダースコアのみを使用できます。見出しに一致するか、セクションを説明する短いアンカー名を英語で指定してください。ドキュメント内で一意のアンカー名を指定してください。

ページを翻訳する場合でも、アンカー名は英語のまま、変更してはいけません。

別のページからのリンクに使用されるアンカーを作成する場合は、すべての翻訳で同じアンカーを作成することも必要です。

### AMP 形式フィルタ

コンポーネントドキュメント、ガイド、およびチュートリアルと例は、AMP ウェブサイトや AMP ストーリーなどの AMP 形式を使用してフィルタすることができます。そういったページにリンクする場合は、リンクに format パラメータを追加して、ターゲットにサポートされた形式を明示的に指定する必要があります。

```md
[link](../../learn/amp-actions-and-events.md?format=websites)
```

このパラメータは、ページがサポートする**すべて**の形式をターゲットがサポートするとわかっている場合にのみ省略できます。

### コンポーネントリファレンス

コンポーネントリファレンスドキュメントへのリンクは、バージョン部分が省略されている場合、自動的に最新バージョンにポイントされます。あるバージョンに明示的にポイントする場合は、完全名を指定してください。

```md
[latest version](../../../components/reference/amp-carousel.md?format=websites)
[explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## ドキュメント構造

### 題名、見出し、小見出し

題名、見出し、および小見出しの最初の単語の先頭の英字は大文字にし、後は小文字で続けます。ただし、AMP とほかの固有名詞は例外です。見出しを `Introduction` としてはいけません。Introduction はドキュメントの題名の後に挿入されます。

### ドキュメントの命名

ドキュメントの名前には、ダッシュの命名規則を使用します。

<table>
  <tr>
   <td>
<strong>正しい</strong>
   </td>
   <td>
<strong>誤り</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
