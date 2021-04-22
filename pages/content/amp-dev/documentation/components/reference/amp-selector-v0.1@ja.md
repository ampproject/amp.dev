---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: オプションのメニューを提示し、ユーザーに選択を求めるコントロールを表示します。
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



オプションのメニューを提示し、ユーザーに選択を求めるコントロールを表示します。

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>必須のスクリプト</strong></td>
      <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>すべて</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-selector/">amp-selector サンプル</a>をご覧ください。</td>
  </tr>
</table>


## 動作 <a name="behavior"></a>

AMP セレクタは、オプションのリストを提示し、その中から 1 つまたは複数のオプションを選択するようユーザーに求めるコントロールを表示します。オプションの内容はテキストに限定されません。

* `amp-selector` は、任意の HTML 要素や AMP コンポーネントを含めることができます（たとえば、`amp-carousel`、`amp-img` など）。
* `amp-selector` の内部に、`amp-selector` コントロールをネストすることはできません。
* 選択可能オプションは、対象の要素に `option` 属性を追加し、その属性に値を代入することで設定できます（例: `<li option='value'></li>`）。
* 無効オプションは、対象の要素に `disabled` 属性を追加することで設定できます（例: `<li option='d' disabled></li>`）。
* 事前選択オプションは、対象の要素に `selected` 属性を追加することで設定できます（例: `<li option='b' selected></li>`）。
* 複数選択を許可するには、`amp-selector` 要素に `multiple` 属性を追加します。デフォルトでは、`amp-selector` で選択できるのは、一度に 1 つずつに限られます。
* `amp-selector` 全体を無効にするには、`amp-selector` 要素に `disabled` 属性を追加します。
* `amp-selector` 内に `name` 属性があり、`amp-selector` が `form` タグ内にある場合、そのフォーム上で submit イベントが発生すると、`amp-selector` は radio-button / checkbox グループのように動作し、`amp-selector` の名前に基づいて、選択されている値（オプションに割り当てられている値）を送信します。

例:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">None of the Above</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## 選択を解除する <a name="clearing-selections"></a>

要素に対してタップやクリックが行われたときにすべての選択を解除するには、要素内に [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) action 属性を設定し、`clear` action メソッドで AMP セレクタ `id` を指定します。

例:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
[AMP By Example](https://ampbyexample.com/components/amp-selector/) のライブデモをご覧ください。
[/tip]

## 属性 <a name="attributes"></a>

### `<amp-selector>` 内の属性 <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled、form、multiple、name</strong></td>
    <td>上記の属性は、標準 HTML 要素の場合と同じように動作します<code>select</code> [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td><code>keyboard-select-mode</code> 属性は、<code>amp-selector</code> 内部のオプションのキーボード ナビゲーション動作を決定します。

    <ul><li><code>none</code>（デフォルト）: Tab キーを押すと、<code>amp-selector</code> 内のアイテム間でフォーカスを変更します。選択内容を変更するには、Enter キーまたはスペースキーを押す必要があります。矢印キーは無効になっています。</li>
    <li><code>focus</code>: Tab キーを押すと <code>amp-selector</code> にフォーカスを移動します。矢印キーを使用して、アイテム間を移動します。選択内容を変更するには、スペースキーまたは Enter キーを押す必要があります。</amp-selector></li>
    <code>select</code>: Tab キーを押すと、<code>amp-selector</code> にフォーカスを移動します。ユーザーが矢印キーを使用してオプションを移動すると、選択内容も変更されます。</li></ul></td>
    </tr>
  </table>

### `<amp-selector>` オプション内の属性 <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>対象のオプションが選択可能であることを示します。値が指定されている場合、値の内容はフォームと一緒に送信されます。</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled、selected</strong></td>
    <td>上記の属性は、標準 HTML 要素の場合と同じように動作します。<option>`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/option) 要素の場合と同じように動作します。</option></td>
  </tr>
</table>

## イベント <a name="events"></a>

`on` 属性を使用したイベントにより、他の AMP コンポーネントに対してアクションをトリガーできます。たとえば、`on="select: my-tab.show"` のように指定します。

詳細については、[AMP のアクションとイベント](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)をご覧ください。

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code> は、ユーザーがオプションを選択したときに <code>select</code> イベントをトリガーします。マルチセレクタやシングルセレクタの場合、オプションの選択や選択解除が行われたときに、このイベントがトリガーされます。無効オプション（disabled）をタップしても、<code>select</code> イベントはトリガーされません。
      <ul>
        <li><code>event.targetOption</code> は、選択された要素の <code>option</code> 属性値を格納します。</li>
        <li><code>event.selectedOptions</code> には、選択されたすべての要素の <code>option</code> 属性値の配列が含まれます。
        </li>
      </ul></td>
    </tr>

  </table>

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-selector ルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-selector/validator-amp-selector.protoascii)をご覧ください。
