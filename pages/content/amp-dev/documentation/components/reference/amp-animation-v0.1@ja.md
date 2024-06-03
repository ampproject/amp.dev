---
$title: amp-animation
$category@: presentation
teaser:
  text: アニメーションを定義して表示します。
---


<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



アニメーションを定義して表示します。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## 概要 <a name="overview"></a>

AMP アニメーションは、[Web Animations API](https://www.w3.org/TR/web-animations/) を使用して、AMP ドキュメントのアニメーションを定義、表示します。

## フォーマット <a name="format"></a>

`amp-animation` 要素は、アニメーションを JSON 構造として定義します。

### トップレベル アニメーション仕様 <a name="top-level-animation-specification"></a>

トップレベル オブジェクトは、`animations` 配列として定義される任意の数のアニメーション コンポーネントで構成される全体的なアニメーション プロセスを定義します。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### DOM 内の配置 <a name="placement-in-dom"></a>

`<amp-animation>` は、`trigger="visibility"` の場合、必ず `<body>` 要素の直接の子として配置する必要があります。`trigger` を指定しておらず、アクションを通じてプログラムでアニメーションの再生を制御している場合は、DOM 内の任意の場所に配置することができます。

### アニメーション コンポーネント <a name="animation-component"></a>

各アニメーション コンポーネントは、[キーフレーム効果](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect)であり、以下の要素で構成されます。

 - セレクタによって参照されるターゲット要素
 - 条件: メディアクエリとサポート条件
 - タイミング プロパティ
 - キーフレーム

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### 条件 <a name="conditions"></a>

条件を使用することで、各アニメーション コンポーネントを最終アニメーションに含めるかどうかを指定できます。

#### メディアクエリ <a name="media-query"></a>

メディアクエリは、`media` プロパティを使用して指定できます。このプロパティは、[Window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia) API で使用できる任意の式を格納することができ、`@media` CSS ルールに対応します。

アニメーション コンポーネントに対して値を指定した場合、メディアクエリが現在の環境に合致する場合に限り、そのアニメーション コンポーネントが含まれるようになります。

#### サポート条件 <a name="supports-condition"></a>

サポート条件は、`supports` プロパティを使用して指定できます。このプロパティは、[CSS.supports](https://developer.mozilla.org/ja/docs/Web/API/CSS/supports) API で使用できる任意の式を格納することができ、`@supports` CSS ルールに対応します。

アニメーション コンポーネントに対して値を指定した場合、サポート条件が現在の環境に合致する場合に限り、そのアニメーション コンポーネントが含まれるようになります。

### アニメーション `switch` ステートメント <a name="animation-switch-statement"></a>

場合によっては、複数の[条件付きアニメーション](#conditions)とデフォルト（省略可）を組み合わせて 1 つのアニメーションにすると便利です。これには、下記のフォーマットの `switch` アニメーション ステートメントを使用します。

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

`switch` アニメーションでは、定義した順序で各候補が評価され、[条件ステートメント](#conditions)に合致する最初のアニメーションが実行され、残りは無視されます。

たとえば、次のアニメーションは、サポートされている場合はモーションパス アニメーションを表示し、そうでない場合はフォールバックして変換を行います。
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### 変数 <a name="variables"></a>

アニメーション コンポーネントは、`var()` 式を通じて、タイミングとキーフレームの値に使用する CSS 変数を宣言できます。`var()` 式は、現在のターゲット コンテキストを使用して評価されます。アニメーション コンポーネント内で指定されている CSS 変数は、ネスト アニメーションに反映され、アニメーション ターゲットに適用されます。これにより、最終アニメーション内で使用されている CSS 変数をオーバーライドします。

たとえば、次のようになります。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

このサンプルの場合、以下のようになります。

- `--delay` は、ネスト アニメーションに反映され、`#target1` アニメーションの遅延として使用されます。
- `--x` は、ネスト アニメーションに反映されますが、`#target1` アニメーションによってオーバーライドされ、後で `transform` プロパティに使用されます。
- `--y` は、`<amp-animation>` 内のどこにも指定されていないため、`#target1` 要素に対してクエリが実行されます。CSS 内でも定義されていない場合は、デフォルト値の `0px` が使用されます。

`var()` の詳細については、[`var()` と `calc()` のセクション](#var-and-calc-expressions)をご覧ください。

### タイミング プロパティ <a name="timing-properties"></a>

トップレベル アニメーションとアニメーション コンポーネントは、タイミング プロパティを格納することができます。このプロパティについては、Web Animations 仕様の [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) で詳細に定義されています。使用できる各プロパティは次のとおりです。

<table>
  <tr>
    <th class="col-twenty">プロパティ</th>
    <th class="col-twenty">型</th>
    <th class="col-twenty">デフォルト</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>time</td>
    <td>0</td>
    <td>アニメーションの長さ。ミリ秒単位の数値または CSS 時間値（「2s」など）。</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>time</td>
    <td>0</td>
    <td>アニメーションの実行を開始するまでの遅延時間。ミリ秒単位の数値または CSS 時間値（「2s」など）。</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>time</td>
    <td>0</td>
    <td>アニメーションが完了した後、実際に「完了した」と見なされるまでの遅延時間。ミリ秒単位の数値または CSS 時間値（「2s」など）。</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>number または<br>"Infinity" または<br>"infinite"</td>
    <td>1</td>
    <td>アニメーション効果を繰り返す回数。</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>number / CSS</td>
    <td>0</td>
    <td>効果のアニメーション化が始まるタイム オフセット。</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>string</td>
    <td>"linear"</td>
    <td>イージング効果を生成するために時間をスケーリングする際に使用する<a href="https://www.w3.org/TR/web-animations/#timing-function">タイミング関数</a>。</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>string</td>
    <td>"normal" </td>
    <td>「normal」、「reverse」、「alternate」、「alternate-reverse」のいずれか。</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>string</td>
    <td>"none"</td>
    <td>「none」、「forwards」、「backwards」、「both」、「auto」のいずれか。</td>
  </tr>
</table>

すべてのタイミング プロパティで、数値や文字列値を直接使用するか、CSS 値を使用することができます。たとえば、「duration」の場合、`1000`、`1s`、`1000ms` のいずれかで指定できます。また、`calc()` や `var()` などの CSS 式も使用できます。

JSON 構造のタイミング プロパティの例:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

アニメーション コンポーネントは、トップレベル アニメーションに対して指定されているタイミング プロパティを継承します。

### サブターゲット <a name="subtargets"></a>

`selector` を指定できる場所であれば、`subtargets: []` も指定できます。サブターゲットを使用すると、インデックスまたは CSS セレクタ経由で指定したサブターゲットを対象に、タイミング プロパティやアニメーション内で定義されている変数をオーバーライドすることができます。

例:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

この例の場合、デフォルトでは、「.target」に合致するすべてのターゲットで遅延が 100ms に設定され、「--y」が 100px に設定されます。ただし、1 番目のターゲット（`index: 0`）は遅延が 200ms になるようにオーバーライドされ、奇数のターゲットは「--y」が 200px になるようにオーバーライドされます。

なお、複数のサブターゲットが 1 つのターゲット要素に合致することも可能です。

### キーフレーム <a name="keyframes"></a>

キーフレームは、Web Animations 仕様の [keyframes セクション](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)で説明されているさまざまな方法で指定することができます。また、CSS 内で `@keyframes` 名を参照する文字列として指定することもできます。

キーフレーム定義の一般的な例を以下に示します。

簡略型オブジェクト形式の「to」フォーマットは、100% 時の最終状態を指定します。
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

簡略型オブジェクト形式の「from-to」フォーマットは、0% 時の開始状態と 100% 時の最終状態を指定します。
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

簡略型オブジェクト形式の「value-array」フォーマットは、複数の値によって開始状態、最終状態、複数の等間隔オフセットを指定します。
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

array 形式はキーフレームを指定します。オフセットは、0% から 100% までの間を等間隔にして自動的に割り当てられます。
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

array 形式の場合、明示的に「offset」を含めることもできます。
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

array 形式の場合、「easing」を含めることもできます。
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

他のキーフレーム フォーマットについては、[Web Animations 仕様](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)をご覧ください。

プロパティ値には、`calc()` や `var()` などの CSS 式を含め、有効な CSS 値を指定できます。

#### CSS に基づくキーフレーム <a name="keyframes-from-css"></a>

キーフレームを指定するもう 1 つの方法は、ドキュメントのスタイルシート（`<style>` タグ）内で、`@keyframes` CSS ルールを使用する方法です。たとえば、次のようになります。
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

CSS `@keyframes` は、[Web Animations 仕様](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)に沿った JSON 内のインライン キーフレーム定義とほとんど同じです。ただし、以下のような相違点があります。

- broad-platform サポートの場合、ベンダー プレフィックス（`@-ms-keyframes {}` や `-moz-transform` など）が必要になります。ベンダー プレフィックスは、JSON 形式の場合は不要であり、使用できませんが、CSS の場合は必要になります。
- CSS 内でキーフレームを指定した場合、`calc()` や `var()` をサポートしていないプラットフォームでは、`amp-animation` ポリフィルを使用できません。そのため、常に CSS 内にフォールバック値を含めることをおすすめします。
- [`width()` や、`height()`、`num()`、`rand()`、`index()`、`length()`](#css-extensions) などの CSS 拡張機能を CSS 内で使用することはできません。

#### キーフレーム向けホワイトリストに登録されたプロパティ <a name="allow-listed-properties-for-keyframes"></a>

必ずしもすべての CSS プロパティをキーフレームで使用できるわけではありません。最新のブラウザですぐに最適化とアニメーション化を行うことができる CSS プロパティだけが、ホワイトリストに登録されています。優れたパフォーマンスを発揮することが確認されたプロパティが増えると、このリストも拡張されます。現在リストに登録されているプロパティは以下のとおりです。
- [`opacity`](https://developer.mozilla.org/ja/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/ja/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/ja/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/ja/docs/Web/CSS/offset-distance)

なお、ベンダー プレフィックス CSS プロパティは必須ではなく、使用も許可されていません。

### アニメーション設定の簡略形式 <a name="abbreviated-forms-of-animation-configuration"></a>

アニメーションに含まれる要素が 1 つだけであり、1 つのキーフレーム効果だけで十分である場合、アニメーション設定をこのアニメーション コンポーネントだけに縮小することができます。たとえば、次のようになります。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

アニメーションがコンポーネントのリストで構成されていて、トップレベル アニメーションがない場合、アニメーション設定をコンポーネントの配列だけに縮小することができます。たとえば、次のようになります。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### アニメーションの構成 <a name="animation-composition"></a>

アニメーションは他のアニメーションを参照することで、複数の `amp-animation` 宣言を単一の最終アニメーションに結合することができます。他のアニメーションからアニメーションを参照する方法は、ネストとほとんど同じです。アニメーションを異なる要素に分割するメリットとしては、同じアニメーションを複数の場所から再利用できる点や、各アニメーション宣言を小型化して管理しやすくできる点などがあります。

たとえば、次のようになります。
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

このサンプル アニメーションでは、「anim2」アニメーションを「anim1」の一部として結合しています。「anim2」は、ターゲット（`selector`）の設定なしに組み込まれています。このような場合、組み込まれる方のパーツ側アニメーションが独自のターゲットを参照するものと想定されます。

あるいは、別の形式を使用して、組み込む方のパッケージ側アニメーション内で 1 つまたは複数のターゲットを指定することもできます。この場合、合致したターゲットごとに、パーツ側アニメーションが実行されます。たとえば、次のようになります。
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

「.target-class」は 1 つまたは複数の要素に合致することも、まったく合致しないこともあります。いずれにせよ、合致したターゲットごとに「anim2」が実行されます。

呼び出し元アニメーション内で指定されている変数とタイミング プロパティは、パーツ側アニメーションにも渡されます。

### `var()` 式と `calc()` 式 <a name="var-and-calc-expressions"></a>

`amp-animation` では、タイミングやキーフレームの値に `var()` 式や `calc()` 式を使用できます。

たとえば、次のようになります。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

`var()` や `calc()` は、直接サポートしていないプラットフォーム上ではポリフィルされます。`var()` プロパティは、対応するターゲット要素から抽出されます。ただし、`var()` を完全にポリフィルすることはできません。そのため、互換性が重要な場合は、`var()` 式内にデフォルト値を組み込んでおくことを強くおすすめします。たとえば、次のようになります。
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay, 100ms)",
  }
]
</script>
</amp-animation>
```

アニメーション コンポーネントは、それぞれ独自の変数を `--var-name` フィールドとして指定できます。この変数はネスト アニメーションに反映され、スタイルシート（`<style>` タグ）を通じて指定されているターゲット要素の変数をオーバーライドします。`var()` 式は、変数値を解決する際、まずアニメーション内で指定されていないか確認し、その次にターゲット スタイルをクエリします。

### CSS 拡張機能 <a name="css-extensions"></a>

`amp-animation` は、一般的なアニメーションに必要とされる CSS 拡張機能（`rand()`、`num()`、`width()`、`height()` など）をサポートしています。各関数は、タイミングやキーフレームの値など、`amp-animation` 内で CSS 値を使用できる場所であればどこででも使用できます。

#### CSS `index()` 拡張機能 <a name="css-index-extension"></a>

`index()` 関数は、アニメーション効果内の現在のターゲット要素のインデックスを返します。`selector` プロパティを使用して複数のターゲットを同じ効果でアニメーション化する場合に最適です。セレクタによって合致した 1 番目のターゲットはインデックス `0` に、2 番目のターゲットはインデックス `1` になり、以降も順に続いていきます。

特に、このプロパティと `calc()` 式を組み合わせて使用すると、千鳥効果を生み出すことができます。たとえば、次のようになります。
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### CSS `length()` 拡張機能 <a name="css-length-extension"></a>

`length()` 関数は、アニメーション効果内のターゲット要素の数を返します。この関数は、`index()` と組み合わせて使用すると最も効果的です。

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### CSS `rand()` 拡張機能 <a name="css-rand-extension"></a>

`rand()` 関数はランダムな CSS 値を返します。2 つの形式があります。

引数を指定しない形式の場合、0 から 1 までの間の乱数を返します。
```
{
  "delay": "calc(10s * rand())"
  }
```

2. つ目の形式として、2 つの引数を指定した場合、2 つの引数の間のランダムな値を返します。
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### CSS `width()` / `height()` 拡張機能 <a name="css-width-and-height-extensions"></a>

`width()` 拡張機能と `height()` 拡張機能は、アニメーション要素や、セレクタによって指定された要素の幅と高さを返します。戻り値はピクセル単位です（例: `100px`）。

以下の形式がサポートされています。

- `width()`、`height()` - アニメーション要素の幅 / 高さ。
- `width('.selector')`、`height('.selector')` - セレクタによって指定された要素の幅 / 高さ。どの CSS セレクタでも使用できます。たとえば、`width('#container &gt; li')` などを使用できます。
- `width(closest('.selector'))`、`height(closest('.selector'))` - 最も近いセレクタによって指定された要素の幅 / 高さ。

`width()` と `height()` は、特に変換を行う際に役立ちます。`%` 値を使用できる CSS プロパティ（`left`、`top` など）では、コンテナサイズとの比率に基づいてアニメーションが表示されます。ただし、`transform` プロパティは `%` 値の解釈が異なり、選択した要素のパーセントになります。そのため、`width()` や `height()` を使用した際、コンテナ要素などを比率の基準として変換アニメーションを表示することができます。

各関数は、`calc()` や `var()` などの CSS 式と組み合わせることができます。たとえば、次のようになります。
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### CSS `num()` 拡張機能 <a name="css-num-extension"></a>

`num()` 関数は、CSS 値の数値表現を返します。たとえば、次のようになります。

- `num(11px)` の場合は `11` を返します。
- `num(110ms)` の場合は `110` を返します。
- その他も同様です。

たとえば、次の式の場合、要素の幅に比例した遅延を秒単位で計算します。
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### SVG アニメーション <a name="svg-animations"></a>

アニメーションには SVG を使用することをおすすめします。

SVG アニメーションは、[キーフレーム向けホワイトリストに登録されているプロパティ](#allow-listed-properties-for-keyframes)とほぼ同じ CSS プロパティを通じてサポートされています。以下の点が異なります。

* IE / Edge SVG 要素は、[CSS `transform` プロパティをサポートしていません](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/)。`transform` アニメーション自体はポリフィルされます。ただし、スタイルシート内で定義されている初期状態は適用されません。初期変換状態が IE / Edge で重要な場合は、[SVG `transform` 属性](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/transform)を使用して複製することをおすすめします。
* `transform` CSS は IE / Edge 向けにポリフィルされますが、`transform-origin` をポリフィルすることはできません。そのため、IE / Edge との互換性が必要な場合は、デフォルトの `transform-origin` だけを使用することをおすすめします。
* ほとんどのブラウザは、`transform-origin` CSS を正しく解釈することができません。[Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300)、[Safari](https://bugs.webkit.org/show_bug.cgi?id=174285)、[Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340) に関する問題をご覧ください。ほとんどの場合、[CSS `transform-box`](https://developer.mozilla.org/ja/docs/Web/CSS/transform-box) を実装することで、この問題を解決できます。`transform-origin` が重要な場合は、今後の互換性のために `transform-box` CSS も組み込んでおくことをおすすめします。

## アニメーションをトリガーする <a name="triggering-animation"></a>

アニメーションは、`trigger` 属性または `on` アクションでトリガーできます。

### `trigger` 属性 <a name="trigger-attribute"></a>

現在のところ、`trigger` 属性で使用できる値は、`visibility` に限られています。`visibility` は、基盤のドキュメントや埋め込みがビューポート内で表示されているときにトリガーされます。

たとえば、次のようになります。
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### `on` アクションを通じてトリガーする <a name="triggering-via-on-action"></a>

たとえば、次のようになります。

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## `on` アクション <a name="on-actions"></a>

`amp-animation` 要素は、以下のアクションをエクスポートします。

* `start` - アニメーションがまだ表示されていない場合、アニメーションを開始します。タイミング プロパティと変数をアクション引数として指定できます。たとえば、`anim1.start(delay=-100, --scale=2)` のようになります。
* `restart` - アニメーションを開始するか、現在表示中のアニメーションを再起動します。タイミング プロパティと変数をアクション引数として指定できます。たとえば、`anim1.start(delay=-100, --scale=2)` のようになります。
* `pause` - 現在表示中のアニメーションを一時停止します。
* `resume` - 現在表示中のアニメーションを再開します。
* `togglePause` - 一時停止と再開のアクションを切り替えます。
* `seekTo` - アニメーションを一時停止し、`time` 引数で指定したミリ秒単位の時間位置か、`percent` 引数で指定したタイムライン内のパーセント ポイントにシークします。
* `reverse` - アニメーションを逆再生します。
* `finish` - アニメーションを終了します。
* `cancel` - アニメーションをキャンセルします。
