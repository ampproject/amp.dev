---
$title: amp-lightbox
$category@: layout
teaser:
  text: フルビューポートの「ライトボックス」モーダル内に要素を表示します。
---


<!--
       Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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
    <td>フルビューポートの「ライトボックス」モーダル内に要素を表示します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> サンプルをご覧ください。</td>
  </tr>
</table>

## 動作 <a name="behavior"></a>

`amp-lightbox` コンポーネントは、フルビューポート オーバーレイ / モーダル内に表示する子要素を定義します。ユーザーが要素（ボタンなど）に対してタップやクリックを行うと、クリックされた要素の `on` 属性内で参照されている `amp-lightbox` ID がライトボックスをトリガーしてフルビューポートを占有し、`amp-lightbox` の子要素を表示します。

キーボードの Esc キーを押すと、ライトボックスが閉じます。あるいは、ライトボックス内の 1 つまたは複数の要素に対して `on` 属性を設定し、そのメソッドを `close` に設定しておくと、その要素に対してタップやクリックが行われたときにライトボックスが閉じます。

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
ライトボックス内に画像を表示するための [`<amp-image-lightbox>`](amp-image-lightbox.md) コンポーネントもあります。
[/tip]

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in（省略可）</strong></td>
    <td>ライトボックスを開くときのアニメーションのスタイルを定義します。デフォルトでは、<code>fade-in</code> に設定されています。有効な値は、<code>fade-in</code>、<code>fly-in-bottom</code>、<code>fly-in-top</code> です。
      <br><br>
        <strong>注</strong>: <code>fly-in-*</code> アニメーション プリセットは、<code>amp-lightbox</code> 要素の <code>transform</code> プロパティを変更します。<code>amp-lightbox</code> 要素を直接変換する方法は使用しないでください。変換を適用する必要がある場合は、代わりに、ネスト要素に対して変換を設定してください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button（AMPHTML 広告の場合は必須）</strong></td>
        <td>ライトボックスの上部に、閉じるボタンのヘッダーを表示します。この属性は、<a href="#a4a">AMPHTML 広告</a>で使用する場合に限り、必須かつ有効になります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>id（必須）</strong></td>
        <td>ライトボックスごとに一意の ID。</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout（必須）</strong></td>
        <td><code>nodisplay</code> に設定する必要があります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable（省略可）</strong></td>
        <td><code>scrollable</code> 属性が存在する場合、ライトボックスのコンテンツは、ライトボックスの高さをオーバーフローしてスクロールできます。
          <br><br>
            <strong>注</strong>: AMPHTML 広告内で <code><amp-lightbox></code> を使用する場合、<code>scrollable</code> 属性は使用できません。詳細については、<a href="#a4a">AMPHTML 広告内で amp-lightbox を使用する</a>をご覧ください。</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable（省略可）</strong></td>
            <td></td>
          </tr>
        </table>

## スタイル設定 <a name="styling"></a>

標準の CSS を使用して `amp-lightbox` のスタイルを設定できます。

## アクション <a name="actions"></a>

`amp-lightbox` は、[AMP on 構文を使用してトリガー](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)できる以下のアクションをエクスポーズします。

<table>
  <tr>
    <th width="20%">アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>open</code>（デフォルト）</td>
    <td>ライトボックスを開きます。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>ライトボックスを閉じます。</td>
  </tr>
</table>

## <a id="a4a"></a>AMPHTML 広告内で `amp-lightbox` を使用する <a name="a4a"></a>

[tip type="note"]
AMPHTML 広告内で使用する `amp-lightbox` コンポーネントは[試験運用中](../../../documentation/guides-and-tutorials/learn/experimental.md)であり、現時点でも開発が続けられています。AMPHTML 広告内で `amp-lightbox` を使用するには、[`amp-lightbox-a4a-proto` テストを有効](http://cdn.ampproject.org/experiments.html)にします。
[/tip]

[AMPHTML で記述された広告](../../../documentation/guides-and-tutorials/learn/a4a_spec.md)の場合、通常の AMP ドキュメントの場合と比べて、`amp-lightbox` の使用に関して以下のような相違点があります。

### 閉じるボタンが必要となる <a name="requires-close-button"></a>

AMPHTML 広告の場合、`close-button` 属性は必須になります。この属性により、ヘッダーがライトボックスの上部に表示されます。ヘッダーには、閉じるボタンと「Ad」と表示されるラベルがあります。このヘッダーが必要とされるのは、以下の目的のためです。

* AMPHTML 広告に対して、予測可能で一貫したユーザー エクスペリエンスを設定します。
* ライトボックスを終了させるポイントが常に存在するようにします。そうでないと、クリエイティブが、ライトボックスを通じて、ホスト ドキュメントのコンテンツを実質的にハイジャックする可能性があります。

`close-button` 属性は、AMPHTML 広告の場合に限り必須であり、使用することができます。通常の AMP ドキュメントの場合は、必要に応じて、`<amp-lightbox>` コンテンツの一部として、閉じるボタンを任意の場所に表示することができます。

### スクロール可能なライトボックスは許可されていない <a name="scrollable-lightboxes-are-disallowed"></a>

AMPHTML 広告の場合、スクロール可能なライトボックスは使用できません。

### 透明な背景 <a name="transparent-background"></a>

AMPHTML 広告内で `<amp-lightbox>` を使用する場合、ライトボックスが展開される前に AMP ランタイムがクリエイティブ コンテンツのサイズを変更し、位置を再調整するため、`<body>` 要素の背景が透明になります。これは、ライトボックスが開く際にクリエイティブが視覚的に「ジャンプ」するのを防ぐための仕様です。クリエイティブに背景が必要な場合は、`<body>` ではなく、中間コンテナ（フルサイズの `<div>` など）を使用して設定してください。

AMPHTML 広告がサードパーティ環境（非 AMP ドキュメントなど）内で配信された場合、クリエイティブはビューポートを基準にして中央に配置されてから展開されます。これは、非同期フレームサイズ変更などの機能を有効にするために、サードパーティ iframe が postMessage API を使用する必要があるためです。そのため、最初にクリエイティブを中央に配置することで、視覚的なジャンプをせずにスムーズに移行できるようになります。

### AMPHTML 広告のライトボックス内のトランジションの例 <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

以下の例では、lightbox 要素に `animate-in="fly-in-bottom"` 属性が設定されている AMPHTML 広告の場合に、Friendly iframe 内とサードパーティ iframe 内で AMPHTML 広告のトランジションがどのように表示されるのかを示します。

##### Friendly iframe の場合（AMP キャッシュ内の iframe など） <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="Friendly iframe 内のライトボックス広告" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="Friendly iframe 内のライトボックス広告" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### サードパーティ iframe の場合（AMP キャッシュ外の iframe など） <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="サードパーティ iframe 内のライトボックス広告" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="サードパーティ iframe 内のライトボックス広告" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-lightbox ルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/validator-amp-lightbox.protoascii)をご覧ください。
