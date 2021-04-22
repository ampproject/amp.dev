---
$title: "ウェブページへのストーリーの埋め込み"
description: "AMP ストーリープレーヤーを使うと、ウェブウェブページ内でユーザーがタップやクリックできるストーリーを埋め込むには AMP ストーリープレーヤーを使用できます。このステップバイステップガイドでは、その方法を学習します。"
---

ストーリーは、全画面の没入型エクスペリエンスです。独自の URL を持つオープンウェブにホストされているため、簡単に共有することができます。しかし、ブログ、製品説明、またはニュース記事などのストーリーを独自のサイトに統合する場合はどうすればよいのでしょうか。

ウェブページ内でユーザーがタップやクリックできるストーリーを埋め込むには [AMP ストーリープレーヤー](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md)を使用できます。このステップバイステップガイドでは、その方法を学習します。

# AMP 非対応ページでのストーリーの表示

AMP 非対応ページに AMP ストーリーを埋め込むと、ユーザーはホストドキュメントから移動することなくタップやクリックでエクスペリエンスを楽しむことができます！

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          style="--story-player-poster: url('https://amp.dev/static/samples/img/story_dog2_portrait.jpg')"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## AMP ストーリープレーヤーの埋め込み

AMP 非対応ページで AMP ストーリーを表示するには、[`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md) 要素を使用する必要があります。

### スクリプトをインポートする

必要な 2 つのスクリプトをドキュメントのヘッドに含めます。

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css">
```

最初のスクリプトはプレーヤーのロジックをインポートし、2 つ目のスクリプトはデフォルトのスタイルをインポートします。

### ストーリーを指定する

ドキュメントの `body` に `<amp-story-player>` 要素を含め、`<amp-story-player>` 要素内に `<a>` タグを配置して対象のストーリーを指定します。`href` をストーリの場所にポイントしてください。`href` には、ホストされるストーリーの URL または相対パスを使用できます。ストーリーのタイトルは、`<a>` タグ内に指定します。

```html
 <amp-story-player style="width: 360px; height: 600px;">
    <a
      href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/">
      Stories in AMP - Hello World
    </a>
  </amp-story-player>
```

### プレーヤーのサイズを設定する

ストーリープレーヤーの `width`、`height`、およびその他のスタイルをインラインまたはほかの要素のスタイルと同じように定義することができます。

```html
<body>
...
  <amp-story-player style="width: 360px; height: 600px;">
...
  </amp-story-player>
...
</body>
```

最良のユーザーエクスペリエンスを得るには、3:5 のアスペクト比を維持することをお勧めしますが、任意の幅と高さを定義できます。

#### レスポンシブのサイズ設定

ストーリープレーヤーのレスポンシブはほかのブロック要素と同様に機能します。以下の例のように、CSS を使って幅と高さの比率を維持することができます。

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  ...
</amp-story-player>
```

### プレースホルダーを使用する

ストーリーの `<a>` タグに `style="--story-player-poster: url('...');"` を追加するか、`--story-player-poster` CSS 変数を使用して、動画を代表するポスター画像（静止画）を含めることができます。ストーリー全体が読み込まれるまで、AMP ストーリープレーヤーにはこの画像が表示されます。

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a
    href="https://www.example.com/story.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes this story.
  </a>
</amp-story-player>
```

最良のユーザーエクスペリエンスを得るには、ポスター画像を含めることを強くお勧めします。ポスター画像を含めない場合は、ストーリープレーヤーには、グレーの背景にローディングスピナーが表示されます。

## 複数のストーリーの埋め込み

複数の `<a>` タグを定義すると、同一 `<amp-story-player>` 要素に複数のストーリーを追加することができます。プレーヤーは、ユーザーが最初のストーリーを終了した後に、2 つ目のストーリーのカバーページを表示します。

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story1.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes story 1.
  </a>
  <a
    href="https://www.example.com/story2.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover2.html');"
  >
    A title that describes story 2.
  </a>
</amp-story-player>
```

埋め込める `<amp-story-player>` インスタンスの数に制限はありません。各インスタンスは独立したビューアとして表示されます。

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story1.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story2.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover2.html');"
  >
    A title that describes story 2.
  </a>
</amp-story-player>
```

# AMP ページでのストーリーの表示

現在のところ、AMP ページ内で `<amp-story-player>` コンポーネントを使用すると、それが無効化されるようになっています。このコンポーネントを AMP ページでサポートできるように努めています。[ロードマップの進捗状況](https://github.com/ampproject/amphtml/issues/26308)をご確認ください！
