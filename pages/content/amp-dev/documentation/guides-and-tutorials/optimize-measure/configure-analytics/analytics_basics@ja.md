---
'$title': 'アナリティクス: 基本'
$order: 0
description: AMP にはアナリティクスや測定に役立つ amp-pixel と amp-analytics という 2 つのコンポーネントがあります。どちらを使用してもアナリティクスのデータは指定したエンドポイントに送信されます。
formats:
  - websites
  - stories
---

このページで AMP アナリティクスの基本を学びましょう。

## amp-pixel または amp-analytics の使用 <a name="use-amp-pixel-or-amp-analytics"></a>

AMP にはアナリティクスや測定に役立つ [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) という 2 つのコンポーネントがあります。どちらを使用してもアナリティクスのデータは指定したエンドポイントに送信されます。

単純な[トラッキングピクセル](https://en.wikipedia.org/wiki/Web_beacon#Implementation)のような動作を求めているのであれば、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) コンポーネントには、ページビューデータを定義された URL に送信する、基本的なページビュートラッキングが用意されています。統合するベンダーによっては、このコンポーネントが必要になることがあり、その場合はベンダーが正確なエンドポイント URL を指定します。

ほとんどのアナリティクスソリューションでは、 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用します。ページビュートラッキングも [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) で動作しますが、リンクやボタンのクリックなど、あらゆるページコンテンツに対するユーザーエンゲージメントもトラッキング可能です。[filter formats="websites"]ユーザーがページをどのくらいスクロールしたか、ソーシャル メディアを使用しているかなどもわかります。[/filter] [filter formats="stories"]ユーザーがどれくらい先までストーリーに没頭したか、インタラクティブ要素を使用したかなどもわかります。[/filter]

[tip type="read-on"] 詳しくは、[AMP アナリティクスについて詳しく知る](deep_dive_analytics.md)をご覧ください。[/tip]

AMP プラットフォームを統合するにあたり、データの取得やトラッキングツールへの転送が簡単に行えるよう、プロバイダはあらかじめ定義した [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 設定を提示しています。ベンダーのドキュメントは、[アナリティクスベンダー](analytics-vendors.md)リストからアクセスできます。

ページには [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を両方使うことも可能です。[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) はシンプルなページビュートラッキング用で、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) はそれ以外の全機能に対応しています。各タグを複数追加することもできます。アナリティクスプロバイダを複数使っている場合は、ソリューションごとに 1 つのタグが必要です。ユーザーにとって AMP ページはシンプルであるほど良いので、余分なタグは使わないようにしましょう。

## 簡単なアナリティクス構成の作成

次に、簡単な [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 構成の作成方法を説明します。

### 簡単な amp-pixel 構成

簡単な [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 構成を作成するには、以下のようなコードを AMP ページの body に挿入します。

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

この例では、ページビューデータは乱数とともに指定の URL に送信されます。`RANDOM` 変数は、数ある [AMP プラットフォームの変数置換](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)の 1 つです。[変数置換](analytics_basics.md)に関する詳細は、こちらをご覧ください。

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) は組み込みのコンポーネントであるため、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) などの AMP 拡張コンポーネントと違って、宣言を追加する必要はありません。ただし [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) タグは、極力 `<body>` の先頭付近に配置してください。トラッキングピクセルはタグが表示されてからのみ呼び出されるため、[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) がページの下の方に配置されている場合、トラッキングピクセルが呼び出されない可能性があります。

### 簡単な <code>amp-analytics</code> 構成

簡単な [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 構成を作成するには、まず `custom-element` 宣言を AMP ドキュメントの `<head>` 内に含める必要があります（[コンポーネントの包含宣言](../../../../documentation/components/index.html)もご覧ください）。

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

以下の例は [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と似ています。ページが表示されるたびにイベントの発行がトリガされ、ページビューデータがランダム ID とともに指定の URL に送信されます。

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://foo.com/pixel?RANDOM"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>
</amp-analytics>
```

上の例では、pageview というリクエストを `https://foo.com/pixel?RANDOM` と定義しています。上記で説明したとおり、RANDOM は乱数に置換されるため、最終的なリクエストは `https://foo.com/pixel?0.23479283687235653498734` のようになります。

（トリガーキーワード `visible` を使って指定したとおり）ページが表示されると、イベントが発生して `pageview` リクエストが送信されます。ページビューリクエストが送信されるタイミングは、トリガー属性で定義します。詳しくは、[リクエストとトリガー](deep_dive_analytics.md#requests-triggers--transports)をご覧ください。

[filter formats="stories"]

## AMP ストーリーのデフォルト構成

ウェブサイトの典型的なユーザージャーニーはストーリーによって非常に異なります。ウェブサイトでは、ユーザーは見出しを読み、ページの下までスクロールし、フォームに入力してから次のページへのリンクをクリックします。一方、ストーリーはビューポート全体に表示されるため、ユーザーはスクロールせず、タップして先に進みます。

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

多くの人は、コンテンツがスクリーンごとに大きく異なるため、ストーリー内の各 [`<amp-story-page>`](../../../../documentation/components/reference/amp-analytics.md) を新しいページビューとして測定したがりますが、ページはストーリー全体の一つの要素にすぎません。ユーザーがストーリーを理解するには複数のストーリーページを表示する必要があります。ページビューほど単純なものをどのように計測するのかという疑問は、アナリティクスの手法により非常に複雑化していしまいます。

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

AMP アナリティクスでは、アナリティクスベンダーを使って上記のケースを簡単に実装することができます。たとえば、Google アナリティクスの [グローバルサイトタグ](deep_dive_analytics.md#variable-substitution-ordering) を使うと、下のスニペットのようになります。

```html
<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
    {
      "vars": {
        "gtag_id": "YOUR_GOOGLE_ANALYTICS_ID",
        "config": {
          "YOUR_GOOGLE_ANALYTICS_ID": {
            "groups": "default"
          }
        }
      },
      "triggers": {
        "storyProgress": {
          "on": "story-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_progress",
            "event_category": "${title}",
            "event_label": "${storyPageId}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        },
        "storyEnd": {
          "on": "story-last-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_complete",
            "event_category": "${title}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        }
      }
    }
  </script>
</amp-analytics>
```

このデフォルト構成であれば、AMP ストーリーで完全に機能する構成を得られます。

デフォルト構成が提供する以上の機能に関心がある方は、Google アナリティクスを使ったより高度な使用事例について、<a>AMP ストーリーのアナリティクス</a>をお読みください。

[/filter]

## 変数置換 <a name="user-identification"></a>

<a><code data-md-type="codespan">amp-pixel</code></a> と <a><code data-md-type="codespan">amp-analytics</code></a> の両方のコンポーネントでは、すべての標準的な URL 変数置換を利用できます（<a>AMP HTML 変数の置換</a>を参照してください）。以下の例では、ページビューリクエストは、現在の AMP ドキュメントの正規 URL、そのタイトル、および<a>クライアント ID</a> とともに URL に送信されます。

```html
<amp-pixel
  src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"
></amp-pixel>
```

その単純な構造により、<a><code>amp-pixel</code></a> タグは、プラットフォームによって定義される変数か、AMP ランタイムが AMP ページからパースできる変数のみしか含むことができません。上記の例では、プラットフォームが <code>canonicalURL</code> と <code>clientId(site-user-id)</code> の両方に対する値を入力しています。<a><code>amp-analytics</code></a> タグは、<a><code>amp-pixel</code></a> と同じ変数のほか、タグ構成内に一意に定義された変数も含めることができます。

ページまたはプラットフォーム定義の変数をリクエストする文字列には、`${varName}` 形式を使用します。<a><code>amp-analytics</code></a> タグは、アナリティクスリクエストの作成時に、テンプレートを実際の値に置換します（<a><code>amp-analytics</code> でサポートされている変数</a> も参照してください）。

次の [<code>amp-analytics</code>](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) の例では、ページビューリクエストは、<a><code>amp-analytics</code></a> 構成内の、変数置換から抽出された追加データ、プラットフォームが提供するデータ、インラインで定義されるデータとともに URL に送信されます。

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account": "ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

上記の例では、変数、<code>account</code> および <code>title</code> は <a><code>amp-analytics</code></a> 構成内に定義されています。<code>canonicalUrl</code> と <code>clientId</code> 変数は構成に定義されていないため、値はプラットフォームによって置換されます。

[tip type="important"] **重要 –** 変数置換には柔軟性があります。同じ変数を異なる場所で定義することができ、AMP ランタイムは優先順位によって値をパースします（[変数置換の順序](deep_dive_analytics.md#variable-substitution-ordering)を参照してください）。[/tip]

## ユーザーの識別 <a name="user-identification"></a>

ウェブサイトは、ブラウザの cookie を使用してユーザー固有の情報を格納しています。cookie は、ユーザーが過去にサイトに訪問したことがあるかを知るために使用することができます。AMP では、ページはサイト運営者のウェブサイトかキャッシュ（Google AMP キャッシュなど）から配信されます。サイト運営者のウェブサイトとキャッシュのドメインは異なることがほとんどですが、セキュリティの理由により、ブラウザは別のドメインの cookie へのアクセスを制限することができます（ほとんどにおいて制限します）。[オリジン上でのユーザーのトラッキング](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)も参照してください。

デフォルトでは、AMP は、ページがサイト運営者の元のウェブサイトからアクセスされているか、キャッシュからアクセスされているのかを指定するクライアント ID を管理しています。AMP が生成するクライアント ID には、`"amp-"` とそれに続くランダムの `base64` でエンコードされた文字列の値が使用されており、同じユーザーがもう一度アクセスすると、同じ ID がそのまま使用されます。

AMP は、すべてのケースにおいて、クライアント ID の読み取りと書き込みを管理していますが、ページがキャッシュから配信されている場合、またはサイト運営者の元のサイトの表示文脈外で表示される場合には特に、このことが明確であり、この場合、サイト運営者の cookie を使用できません。

AMP ページがサイト運営者のサイトから配信される場合、AMP が使用するクライアント ID フレームワークに、フォールバック cookie を探して使用するように指示することができます。この場合、`clientId` 変数の `cid-scope-cookie-fallback-name` 引数が cookie 名として解釈され、その形式は、`CLIENT_ID(cid-scope-cookie-fallback-name)` または `${clientId(cid-scope-cookie-fallback-name)}` のいずれかで表示されます。

以下に例を示します。

```html
<amp-pixel
  src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"
></amp-pixel>
```

AMP が この cookie が設定されていることを認識すると、クライアント ID の置換によって、cookie の値が返されます。AMP がこの cookie の設定を認識しない場合、AMP は、`amp-` の後にランダムの base64 エンコード文字列が続く形式の値が生成されます。

オプションのユーザー通知 ID の追加方法など、クライアント ID の置換に関する詳細は、[AMP アナリティクスでサポートされている変数](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)をご覧ください。

今後の学習: 引き続き、[AMP アナリティクスについて詳しく知る](deep_dive_analytics.md)および[使用事例](use_cases.md)をお読みください。
