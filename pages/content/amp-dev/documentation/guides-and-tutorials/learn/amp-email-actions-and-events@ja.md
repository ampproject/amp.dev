---
"$title": AMP メールのアクションとイベント
order: '0'
formats:
- email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] このドキュメントでは、AMP メール形式のアクションとイベントについて説明します。AMP ウェブサイト、ストーリー、および広告については、こちらの[アクションとイベント](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md)を参照してください。 [/tip]

`on` 属性は、要素にイベントハンドラをインストールするために使用されます。サポートされているイベントは、要素によって異なります。

構文の値は、フォームの単純なドメイン固有の言語です。

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

構文の各部分の説明については、以下のテーブルを参照してください。

<table>
  <tr>
    <th width="30%">構文</th>
    <th width="18%">必須？</th>
    <th width="42%">説明</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>はい</td>
    <td>これは、要素が公開するイベントの名前です。</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>はい</td>
    <td>これは要素の DOM id またはイベントのレスポンスとしてアクションを実行する事前定義済みの<a href="#special-targets">特殊ターゲット</a>です。次の例では、<code>targetId</code> は <code>amp-lightbox</code> ターゲットの DOM id である <code>photo-slides</code> です。     <pre><amp-lightbox id="photo-slides"></amp-lightbox>
<button on="tap:photo-slides">Show Images</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>いいえ</td>
    <td>これは、デフォルトアクションを伴う要素に使用します。<p>ターゲット要素（<code>targetId</code> で参照）が公開しており、イベントがトリガされたときに実行するメソッドです。</p> <p>AMP には、要素が実装できるデフォルトアクションの概念があるため、<code>methodName</code> を省略すると、AMP はそのメソッドを実行します。</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>いいえ</td>
    <td>Some actions, if documented, may accept arguments. The arguments are defined between parentheses in <code>key=value</code> notation. The accepted values are:       <ul>         <li>simple unquoted strings: <code>simple-value</code>
</li>         <li>quoted strings: <code>"string value"</code> or <code>'string value'</code>
</li>         <li>boolean values: <code>true</code> or <code>false</code>
</li>         <li>numbers: <code>11</code> or <code>1.1</code>
</li>         <li>dot-syntax reference to event data: <code>event.someDataVariableName</code>
</li>       </ul>     </td>
  </tr>
</table>

## 複数のイベントの処理 <a name="handling-multiple-events"></a>

1 つの要素で複数のイベントをリスンすることができます。イベントの指定にはセミコロン `;` 区切りを使用します。

例: `on="submit-success:lightbox1;submit-error:lightbox2"`

## 1 つのイベントに対する複数のアクション <a name="multiple-actions-for-one-event"></a>

同一のイベントに対し、複数のアクションを順に実行できます。アクションの指定にはカンマ ',' 区切りを使用します。

例: `on="tap:target1.actionA,target2.actionB"`

## グローバル定義のイベントとアクション <a name="globally-defined-events-and-actions"></a>

AMP は、HTML 要素（AMP 要素を含む）でリスンできる `tap` イベントをグローバルに定義します。

また、AMP は HTML 要素でトリガできる `hide`、`show`、および `toggleVisibility` アクションもグローバルに定義します。

[tip type="note"]

要素を表示できるのは、その要素が以前に `hide` または `toggleVisibility` アクションで、または[`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) 属性を使って非表示にされていた場合のみです。`show` アクションは、CSS `display:none` または AMP の `layout=nodisplay` で非表示にされた要素には使用できません。

たとえば、AMP では以下を行うことができます。

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## 要素固有のイベント <a name="element-specific-events"></a>

### * - すべての要素 <a name="---all-elements"></a>

<table>
  <tr>
    <th>イベント</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>要素がクリックまたはタップされたときに発行されます。</td>
  </tr>
</table>

### 入力要素 <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">イベント</th>
    <th width="30%">説明</th>
    <th width="40%">要素</th>
    <th>データ</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Fired when the value of the element is changed and committed.       <p>       Data properties mirror those in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>     </td>
    <td><code>input</code></td>
    <td>
      <pre>event.min
event.max
event.value
event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td>
<code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min
event.max
event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>要素の値が変更されると発行されます。これは、標準的な <code>change</code> イベントに似ていますが、入力の値が変化しなくなってから 300 ミリ秒後にのみ発行されます。</td>
    <td>
<code>input</code> イベントを発行する要素。</td>
    <td>
<code>change</code> イベントデータと同じ。</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>要素の値が変更されると発行されます。これは、標準的な <code>change</code> イベントに似ていますが、入力の値が変化する間に、最大 100 ミリ秒ごとに発行されます。</td>
    <td>
<code>input</code> イベントを発行する要素。</td>
    <td>
<code>change</code> イベントデータと同じ。</td>
  </tr>
</table>

### amp-accordion > セクション <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>アコーディオンセクションが展開されると発行されます。</td>
    <td>なし。</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>アコーディオンセクションが折り畳まれると発行されます。</td>
    <td>なし。</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>カルーセルの現在のスライドが変化すると発行されます。</td>
    <td><pre>// Slide number.
event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>ライトボックスが完全に可視化されると発行されます。</td>
    <td>なし</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>ライトボックスが完全に閉じられると発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>データのフェッチに失敗したときに発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>オプションが選択または選択解除されると発行されます。</td>
    <td><pre>// Target element's "option" attribute value.
event.targetOption
// Array of "option" attribute values of all selected elements.
event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>トランジションが終了した後にサイドバーが完全に開くと発行されます。</td>
    <td>なし</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>トランジションが終了した後にサイドバーが完全に閉じると発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>データのフェッチに失敗したときに発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>フォームが送信されると発行されます。</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>フォーム送信のレスポンスが成功である場合に発行されます。</td>
    <td><pre>// Response JSON.
event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>フォーム送信のレスポンスがエラーである場合に発行されます。</td>
    <td><pre>// Response JSON.
event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>フォームが有効である場合に発行されます。</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>フォームが無効である場合に発行されます。</td>
    <td></td>
  </tr>
</table>

## 要素固有のアクション <a name="element-specific-actions"></a>

### * （すべての要素） <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>ターゲット要素を非表示にします。</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Shows the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Toggles the visibility of the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>ターゲット要素のクラスを切り替えます。<code>force</code> はオプションです。<code>true</code> に設定すると、クラスは追加されるだけで削除されません。<code>false</code> に設定すると、削除されるだけで追加されません。</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Makes the target element gain focus. To lose focus, <code>focus</code>     on another element (usually parent element). We strongly advise against     losing focus by focusing on <code>body</code>/<code>documentElement</code>     for accessibility reasons.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Toggles the <code>expanded</code> and <code>collapsed</code> states of <code>amp-accordion</code> sections. When called with no arguments, it toggles all sections of the accordion. Trigger on a specific section by providing the section id: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.   </td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>アコーディオンのセクションを展開します。セクションがすでに展開済みである場合は、そのままになります。引数なしで呼び出されると、アコーディオンのすべてのセクションを展開します。次のようにセクション ID を指定すると、特定のセクションでトリガされます。<code>on="tap:myAccordion.expand(section='section-id')"</code>
</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>アコーディオンのセクションを折り畳みます。すでに折り畳まれている場合は、そのままになります。引数なしで呼び出されると、アコーディオンのすべてのセクションを折り畳みます。次のようにセクション ID を指定すると、特定のセクションでトリガされます。<code>on="tap:myAccordion.collapse(section='section-id')"</code>
</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>特定のスライドインデックスまでカルーセルを進めます。</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>アクションをトリガしたソース画像で、画像のライトボックスを開きます。</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>ライトボックスを開きます。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>ライトボックスを閉じます。</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>
<code>amp-list</code> のレイアウトを <code>layout="CONTAINTER"</code> に更新し、<a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">動的なサイズ変更</a>を行えるようにします。</td>
  </tr>
  <tr>
    <td>
<code>fetch-error</code>(low-trust)</td>
    <td>データのフェッチに失敗したときに発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>定義された <code>amp-selector</code> からすべての選択をクリアします。</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>`delta` の値ずつ選択を上に移動します。デフォルトの `delta` は -1 に設定されています。オプションが選択されない場合、選択状態は最後のオプションの値になります。</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>`delta` の値ずつ選択を下に移動します。デフォルトの `delta` は 1 に設定されています。オプションが選択されない場合、選択状態は最初のオプションの値になります。</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Toggles the application of the `selected`. If the select attribute is absent, this action adds it. If the select attribute is present, this action removes it.     You may force and keep an add or remove by including a boolean value in the `value` argument. A value of `true` will force add the `selected` attribute and not remove it if already present. A value of  `false` will remove the attribute, but not add it if absent.   </td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>サイドバーを開きます。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>サイドバーを閉じます。</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>サイドバーの状態を切り替えます。</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>フォームの入力の値をすべてクリアします。</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>フォームを送信します。</td>
  </tr>
</table>

## 特殊ターゲット <a name="special-targets"></a>

以下は、AMP システムが提供する、特殊な要件を持つターゲットです。

### Target: AMP <a name="target-amp"></a>

`AMP` ターゲットは、AMP ランタイムによって提供され、ドキュメント全体に適用されるトップレベルのアクションを実装します。

<table>
  <tr>
    <th width="40%">アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p><a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a> が必要です。</p>
      <p>オブジェクトリテラルをバインド可能な状態にマージします。</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup><a href="#multiple-actions-for-one-event">複数のアクション</a>とともに使用した場合、後続のアクションは、<code>setState()</code> が完了するのを待ってから呼び出されます。1 つのイベント当たり、1 つの <code>setState()</code> が許可されます。
