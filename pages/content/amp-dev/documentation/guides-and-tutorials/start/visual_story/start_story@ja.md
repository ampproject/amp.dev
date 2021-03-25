---
'$title': ストーリーを始める
$order: 3
description: ウェブストーリー全体は amp-story コンポーネントで表現されています。このコンポーネントはストーリー内のすべてのページのコンテナとしての役割を果たします。amp-story コンポーネントには...
author: bpaduch
---

ウェブストーリー全体は [`amp-story`](../../../../documentation/components/reference/amp-story.md) コンポーネントで表現されています。このコンポーネントはストーリー内のすべてのページのコンテナとしての役割を果たします。[`amp-story`](../../../../documentation/components/reference/amp-story.md) コンポーネントには、ジェスチャやナビゲーションの処理など、UI シェルを作成する役割もあります。

[`amp-story`](../../../../documentation/components/reference/amp-story.md) コンポーネントはカスタム AMP コンポーネントで、すべてのカスタムコンポーネントと同様に、そのコンポーネントに関連するスクリプトを AMP ドキュメントに追加する必要があります。

テキストエディタで `pets.html` ファイルを**開き**、`<head>` セクションに以下のスクリプトを**追加**します。

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
  ></script>
</head>
```

ドキュメントの `<body>` に `<amp-story>` 要素を**追加**し、以下のように必須の `standalone` 属性を指定します。

```html
<body>
  <amp-story standalone> </amp-story>
</body>
```

有効な AMP ストーリーを作成するには、`<body>` 要素に有効な子要素である [`amp-story`](../../../../documentation/components/reference/amp-story.md) コンポーネントが 1 つだけ必要です。ほかの要素はすべて [`amp-story`](../../../../documentation/components/reference/amp-story.md) に格納されます。

## メタ情報の提供

ストーリーをウェブで検索可能にするには、以下のようなちょっとした情報を提供するメタデータが必要です。

- ストーリーのタイトル。`title` 属性で指定します（"ペットを飼う楽しみ" など）。
- サイト運営者の名前。`publisher` 属性で指定します（"AMP チュートリアル" など）。
- サイト運営者のロゴ。`publisher-logo-src` 属性で指定します。これは、1x1 のアスペクト比を持つ正方形のロゴ画像の URL です。
- ストーリーのポスター画像。`poster-portrait-src` 属性で指定します。これはポスターの URL で、画像は 3x4 のアスペクト比を持つポートレート形式である必要があります。

では、上記の属性を [`amp-story`](../../../../documentation/components/reference/amp-story.md) タグに追加しましょう。

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
></amp-story>
```

こういった必須属性のほかに適用できる属性があります。詳細は、[`amp-story`](../../../../documentation/components/reference/amp-story.md) リファレンスドキュメントの「[属性](../../../../documentation/components/reference/amp-story.md#attributes)」セクションを参照してください。

[tip type="note"] **注意 –** 上記のメタデータ属性は補足であり、構造化データ（JSON-LD など）に置き換わるものではありあｍせん。ウェブストーリーがすべてのプラットフォームで検索可能となるように、AMP ストーリーを含むすべての AMP ページに[構造化データ](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata)を追加してください。 [/tip]

この時点で、コンテンツのないストーリーのシェルが準備できましたので、ページを作成しましょう。
