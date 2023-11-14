---
'$title': 複雑なアニメーションの基礎
$order: 2
description: クラスの追加や削除によって操作できないアニメーション向けに、AMP はアニメーション固有のコンポーネントをいくつか提供しています。これらのコンポーネントはアニメーションに AMP の原則を提供し...
formats:
  - websites
  - ads
author: CrystalOnScript
---

[クラスの追加や削除](triggering_css_animations.md)によって操作できないアニメーション向けに、AMP はアニメーション固有のコンポーネントをいくつか提供しています。これらのコンポーネントは、アニメーションに AMP の原則を適用し、高速化、効率化、およびユーザー中心のエクスペリエンスを提供します。AMP はキーフレーム内で使用できる CSS プロパティを制限していますが、ほかに作業を施すことなく、細かい制御、シームレスなアニメーション、およびクロスブラウザの互換性などのメリットを提供しています。

厳密に再生を制御する必要がある場合や、同時にアニメーションする複数の要素のタイミングを正確に制御する必要がある場合は、amp-animation を使用してください。

## 基本的な AMP アニメーションの作成

[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) コンポーネントを使用すると、AMP で [Web Animation API](https://www.w3.org/TR/web-animations/) を使用することができます。

基本的な [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) は、次の主な項目で構成される JSON オブジェクトです。

- コンポーネントがアニメーションしている要素、または `selector`
- [タイミングプロパティ](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [キーフレーム](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- [トリガ](/content/amp-dev/documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### セレクタ

CSS とほぼ同様に、[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) コンポーネントは、`"selector"` フィールドで要素のタグ名、クラス、または id を宣言することによって、アニメーションプロパティと要素を関連付けます。コンポーネントは、宣言されているタグの種類やクラス名を使って各要素をアニメーションします。単一の要素を確実にアニメーションするには、id を使用してください。

### タイミングプロパティ

[タイミングプロパティ](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)は、アニメーションにかかる時間、アニメーションの再生時間、およびキーフレームの実行方向を制御します。

タイミングプロパティは必須ではありませんが、`duration` や `fill` といった、時間や表示に関わるプロパティが欠落していると、アニメーションが実行しない可能性があります。

### キーフレーム

CSS では、トランジションを使用して、状態間を変化させることができますが、[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes)します。このため、アニメーションによって、AMP やブラウザの[レンダリングプロセス](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing)が妨害されることがありません。

[tip type="note"] キーフレームは、プロパティの制限に従う限り、[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)をご覧ください。 [/tip]

### トリガ

トリガはアニメーションシーケンスを開始します。[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) の実行は、`<body>` がページに表示されたとき、または [AMP アクションまたはイベント](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)に接続することによって開始します。

`<body>` の表示状態でのトリガは、アニメーションが「フォールドの上」またはページの最初のビューポートに表示されるため、ページが読み込まれた瞬間にアニメーションを実行させる場合に役立ちます。 コンポーネントの属性として `trigger="visibility"` を追加することで、表示状態によってアニメーションをトリガすることができます。

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

アニメーションは、[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) コンポーネントに `id` を割り当てて、その `id` をボタンのタップといった希望するイベントトリガに関連付けて、アクションやイベントに接続します。

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## 複雑なアニメーションの構築

[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) でアニメーションを構築すると、アニメーションを開始して停止するといった操作だけでなく、一時停止、逆再生、および特定のポイントへの移動といった細かい制御を行えるようになります。また、複数のアニメーションをつないで、順に要素をアニメーションさせることもできます。

### サブターゲット

タグまたはクラスが同じ要素には、タイミングプロパティを指定し、トップレベルのアニメーションに定義された変数の値をオーバーライドすることができます。

[example preview="top-frame" playground="true" imports="amp-animation"]

```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### チェーンアニメーション

複数のアニメーションを繋いで大きなシーケンスを作ることができます。[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) コンポーネント内の `animations` 配列にアニメーションを書き込むことで、動画へのオーバーレイといったタイミング効果を指定することが可能となります。

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

このセットアップは、各アニメーションを 3 秒間ずつ順に再生します。

より大規模なアニメーションの場合、`animations` 配列内のアニメーションは、ほかの [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) コンポーネントを参照できます。

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### 不明な要素数のアニメーション

[CSS extensions](/content/amp-dev/documentation/components/reference/amp-animation.md) を使用すると、任意の数の要素で動作する複雑な時限式アニメーションを記述することができます。この方法を使えば、動的なユーザー生成データを簡単かつ滑らかにアニメーションすることができます。

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://ampjs.org/v0/amp-animation-0.1.js"
  ></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
          {"transform": "translate3d(0px, 0px, 0px)"},
          {"transform": "translate3d(50%, 0px, 100px)"},
          {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
          {"transform": "translate3d(50%, 0px, -100px)"},
          {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example]

- 変数 `--duration` を宣言し、値を 2 秒にします。
- var `--duration` の値に `duration` を設定します。
- セレクタ `.card`に一致する各要素に適用されたディレイを計算します。
  1. [`length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension>) を使って、選択された `.card` 要素を計算する
  2. 長さは、`.card` の [index(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension>) を差し引く
  3. その結果の値を var `--duration` で乗算する
  4. 要素のディレイに最終合計を秒で適用する
- カードが、すべて同時にではなく、順にシャッフルされるように、アニメーションが各要素に個別に適用されます。

この動作をテストするために、AMP Playground でアニメーションを開いて、[`amp-img`](../../../../documentation/components/reference/amp-img) 要素をさらに追加してみてください。

### どこで再生しても見栄えのあるアニメーション

アニメーションには、カスタム効果を可能にする [`conditions`](/content/amp-dev/documentation/components/reference/amp-animation.md#supports-condition)を使用します。

[example preview="top-frame" playground="true"]

```html
<head>
  <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script
    async
    custom-element="amp-animation"
    src="https://ampjs.org/v0/amp-animation-0.1.js"
  ></script>
</head>
<body>
  <amp-animation id="mediaAnimation" layout="nodisplay">
    <script type="application/json">
      {
        "duration": "1s",
        "iterations": "4",
        "fill": "both",
        "direction": "alternate",
        "animations": [
          {
            "media": "(min-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(50vw)"
            }
          },
          {
            "media": "(min-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-50vw)"
            }
          }
        ]
      }
    </script>
  </amp-animation>

  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```

[/example]
