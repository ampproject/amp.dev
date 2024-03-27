---
'$title': CSS アニメーションとトランジションのトリガ
$order: 1
description: ページ上の CSS アニメーションのトリガは、JavaScript を使ってクラスを追加または削除することで行われます。AMP ページでは、toggleClass アクションを使用して、同じ動作を達成できます。
formats:
  - websites
  - ads
---

CSS アニメーションは、ウェブ要素をある CSS スタイル構成から別の構成にトランジションすることができます。ブラウザは、定義済みのアニメーションを読み込み時に開始できますが、イベントでトリガされる CSS アニメーションは、[クラスの追加と削除によって行われます](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)。AMP では、これら両方の種類のアニメーションをサポートしています。

正確にタイミングを合わせる必要のない、小さめの完結型アニメーションの場合は、CSS を使用してください。

## CSS とキーフレームの定義

AMP では、次の方法で CSS を定義できます。

[filter formats="websites, stories"]

- ドキュメントの head 内にある `<style amp-custom>` タグに定義。75,000 バイトの制限。
- インラインスタイル。インラインスタイルの各インスタンスには、1,000 バイトの制限があります。インラインスタイルは、`<style amp-custom>` の 75,000 バイトの制限に含まれます。
- ドキュメントの head 内にある `<style amp-keyframes>` タグに定義。500,000 バイトの制限。キーフレームプロパティに制限されます。

[/filter]

[filter formats="ads"]

- ドキュメントの head 内にある `<style amp-custom>` タグに定義。20,000 バイトの制限。
- インラインスタイル。インラインスタイルの各インスタンスには、1,000 バイトの制限があります。インラインスタイルは、`<style amp-custom>` の 20,000 バイトの制限に含まれます。
- ドキュメントの head 内にある `<style amp-keyframes>` タグに定義。500,000 バイトの制限。キーフレームプロパティに制限されます。

[/filter]

[tip type="read-on"] AMP での CSS の使用に関する詳細は、[スタイルとレイアウト](../style_and_layout/index.md)をお読みください。[/tip]

[filter formats="websites, stories"] すっきりしたページを維持して高速に処理できるようにするために、AMP は `<amp style-custom>` タグに 75,000 バイトの CSS 制限を設けています。これを使用してアニメーションのスタイルを定義することはできますが、貴重なサイトスタイルのリソースを取り上げることなく、長々としたアニメーションを使用できるように、`<amp style-keyframes>` タグ内の制限は 500,000 バイトになっています。 [/filter]

[filter formats="ads"] すっきりした広告を維持して高速に処理できるようにするために、AMP は `<amp style-custom>` タグに 20,000 バイトの CSS 制限を設けています。これを使用してアニメーションのスタイルを定義することはできますが、貴重なサイトスタイルのリソースを取り上げることなく、長々としたアニメーションを使用できるように、`<amp style-keyframes>` タグ内の制限は 500,000 バイトになっています。 [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## クラスの追加、削除、および切り替え

AMP アクションの `toggleClass` を使用して、定義済みの要素にクラスを追加し、削除することができます。

```js
elementName.toggleClass(class="className")
```

ハンバーガーメニューのアニメーションなど、ユーザーが操作する同一の要素のクラスを切り替えることができます。

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

`force` 属性を追加すると、`toggleClass` アクションをほかの要素にも適用して 2 つのクラス間を切り替えることができます。

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

クラスを削除して、適用し直せないようにする必要がある場合は、`force` 属性を `false` の値に指定して追加します。クラスを追加して削除を無効にする必要がある場合は、`force` 属性を `true` の値に指定して追加します。

## CSS と状態によるアニメーション

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) を使用すると、状態が指定された任意の数の CSS クラスを追加・削除することができます。

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://ampjs.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

複数のクラスのアニメーションを定義するには、まず、ドキュメントの `head` にある `<style amp-custom>` タグに CSS クラスのリストを追加します。

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

次に、各クラスと状態をペアリングします。

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

そして、要素とクラスをリンク付けます。

```html
<div [class]="magicBox[animateBox].className"></div>
```

状態は、関連付けられた AMP アクションやイベントによって変化します。次の例では、ユーザーインタラクションによって状態が変化します。

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) をこのように使用すると、定義済みのクラスに明示的にクラスを設定することができます。そのため、別のクラスを削除するように要求する必要がありません。
