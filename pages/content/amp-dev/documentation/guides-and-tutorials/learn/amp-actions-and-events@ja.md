---
"$title": アクションとイベント
order: '0'
formats:
- ウェブサイト
- ストーリー
- 広告
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

[tip type="note"] このドキュメントでは、AMP ウェブサイト、ストーリー、および広告のアクションとイベントについて説明します。AMP メール形式については、「[AMP メールのアクションとイベント](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md)」を参照してください。 [/tip]

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
    <td>一部のアクションは引数を受け取ることができ、その場合はドキュメントに記されています。引数は、<code>key=value</code> 表記で括弧に囲んで定義されます。受け入れられる値は次のとおりです。<ul> <li>引用符で囲まれていない単純な文字列: <code>simple-value</code> </li> <li>引用符で囲まれた文字列: <code>"string value"</code> または <code>'string value'</code> </li> <li>ブール値: <code>true</code> または <code>false</code> </li> <li>数値: <code>11</code> または <code>1.1</code> </li> <li>イベントデータへのドット構文参照: <code>event.someDataVariableName</code> </li> </ul>
</td>
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
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">要素の値が変更されたりコミットされたりした場合に発行されます。       <p>       データプロパティは <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> と <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a> にミラーされます。</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>要素の値が変更されると発行されます。これは、標準的な <code>change</code> イベントに似ていますが、入力の値が変化しなくなってから 300 ミリ秒後にのみ発行されます。</td>
    <td>
<code>input</code> イベントを発行する要素。</td>
    <td>
<code>change</code> イベントデータと同じ。</td>
  </tr>
    <!-- input-throttled -->
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
    <td><pre>// Slide number.<br>event.index</pre></td>
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
    <td><code>changeToLayoutContainer</code></td>
    <td>
<code>amp-list</code> のレイアウトを <code>layout="CONTAINTER"</code> に更新し、<a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">動的なサイズ変更</a>を行えるようにします。</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(低信頼)</td>
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
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
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

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(低信頼)</td>
    <td>データのフェッチに失敗したときに発行されます。</td>
    <td>なし</td>
  </tr>
</table>

### amp-video、amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">イベント</th>
    <th width="35%">説明</th>
    <th width="40%">データ</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(低信頼)</td>
    <td>ユーザーによって動画が初めて再生されたときに発行されます。自動再生動画では、ユーザーが動画と対話した時点で発行されます。このイベントは低信頼性であるため、ほとんどのアクションをトリガできません。<code>amp-animation</code> アクションなどの低信頼性アクションのみを実行できます。</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>（低信頼）</td>
    <td>動画の再生位置が変更されると発行されます。イベントの頻度は AMP によって制御されており、現在 1 秒間隔に設定されています。このイベントは低信頼性であるため、ほとんどのアクションをトリガできません。<code>amp-animation</code> アクションなどの低信頼性アクションのみを実行できます。</td>
    <td> <code>{time, percent}</code><code>time</code> は、現在の時間を秒で示し、<code>percent</code> は、合計時間のパーセント率として現在の位置を示す、0 と 1 の間の数値です。</td>
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
    <td>Fired when the form is submitted.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Fired when the form submission response is success.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>フォーム送信のレスポンスがエラーである場合に発行されます。</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
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
    <td>ターゲット要素を表示します。<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 要素</a>が可視状態になると、フォーカスが設定されます。</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>ターゲット要素の可視性を切り替えます。<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 要素</a>が可視状態になると、フォーカスが設定されます。</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>ターゲット要素のクラスを切り替えます。<code>force</code> はオプションです。<code>true</code> に設定すると、クラスは追加されるだけで削除されません。<code>false</code> に設定すると、削除されるだけで追加されません。</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>スムーズなアニメーションで要素をビューにスクロールします。<br>     <code>duration</code> はオプションで、アニメーションの長さをミリ秒で指定します。 指定されない場合、500 ミリ秒以下のスクロール差に相対する長さが使用されます。<br>     <code>position</code> はオプションで、<code>top</code>、<code>center</code>、または <code>bottom</code> を指定します（デフォルトは <code>top</code>）。    スクロール後のビューポートに相対する要素の位置を指定します。<br>     アクセシビリティのベストプラクティスとして、これと、<code>focus()</code> の呼び出しを組み合わせ、スクロール先の要素にフォーカスを設定するようにします。</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>ターゲット要素にフォーカスを設定します。フォーカスを解除するには、別の要素に <code>focus</code> します（通常、親要素）。アクセシビリティを考慮し、<code>body</code>/<code>documentElement</code> にフォーカスを設定することで解除することは強くお勧めしません。</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>オーディオを再生します。<code>&lt;amp-audio></code> 要素が <code>&lt;amp-story></code> の子である場合は no-op です。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>オーディオを一時停止します。<code>&lt;amp-audio></code> 要素が <code>&lt;amp-story></code> の子である場合は no-op です。</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>アニメーションを再生します。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>アニメーションを一時停止します。</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>アニメーションを停止します。</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>アニメーションの currentTime を特定の値に設定し、アニメーションを一時停止します。</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>あるパーセント値を使用して特定の値に対するアニメーションの currentTime を判定し、アニメーションを一時停止します。</td>
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
    <td>
<code>amp-accordion</code> の <code>expanded</code> と <code>collapsed</code> 状態を切り替えます。引数なしで呼び出されると、アコーディオンのすべてのセクションを切り替えます。次のようにセクション ID を指定すると、特定のセクションでトリガされます。<code>on="tap:myAccordion.toggle(section=</code>
</td>
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
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>カルーセルの autoplay ステータスを切り替えます。 <code>toggleOn</code> はオプションです。</td>
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

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>ライトボックスギャラリーを開きます。次のように画像 ID を指定する場合、別の要素をタップしてトリガできます。 `on="tap:amp-lightbox-gallery.open(id='image-id')"`</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>
<code>src</code> のデータを再読み込みし、リストをレンダリングし直します。</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>DOM の項目を更新して、更新されたコンテンツを表示します。</td>
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
    <td>`selected` のアプリケーションを切り替えます。select 属性がない場合、このアクションによって追加されます。select 属性が存在する場合、このアクションによって削除されます。`value` 引数にブール値を指定すると、追加または削除を強制・維持することができます。`true` の場合は `selected` 属性を強制的に追加し、すでに存在する場合は削除しません。`false` の場合は属性を削除し、すでに存在しない場合は追加しません。</td>
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

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>ブラウザのキャッシュを無視して、`src` 属性にあるデータをフェッチし直します。</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>参照されたユーザー通知要素を非表示にします。</td>
  </tr>
</table>

### 動画要素 <a name="video-elements"></a>

以下のアクションは、次の AMP 動画要素でサポートされています。`amp-video`、`amp-youtube`、`amp-3q-player`、`amp-brid-player`、`amp-dailymotion`、`amp-delight-player`、`amp-ima-video`

<table>
  <tr>
    <th>アクション</th>
    <th>説明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>動画を再生します。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>動画を一時停止します。</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>動画をミュートします。</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>動画をミュート解除します。</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>動画を全画面表示にします。</td>
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
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>現在のウィンドウを指定された URL に移動し、指定されている場合はオプションのターゲットで開きます（現在、<code>_top</code> と <code>_blank </code> のみがサポートされています）。オプションの <code>opener</code> パラメータは  <code>_blank</code> のターゲットが使用されている場合に指定し、新たに開いたページが <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a> にアクセスできるようにします。<a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">標準的な URL 置換</a> をサポートしています。</p>
      <p><strong>警告:</strong> できる限り通常の <code><a></code> リンクを使用することが推奨されます。これは、<code>AMP.navigateTo</code> がウェブクローラに認識されないためです。</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>許可された場合はウィンドウを閉じます。そうでない場合は <code>navigateTo</code> アクションと同様に移動させます。前のページから開かれた新規ウィンドウを「戻る」ボタンで閉じる必要がある場合や、開かれていなければ移動する場合の使用事例で役立ちます。</p>
      <p><strong>警告:</strong> できる限り通常の <code><a></code> リンクを使用することが推奨されます。これは、<code>AMP.navigateTo</code> がウェブクローラに認識されないためです。</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>履歴をさかのぼって移動します。</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>印刷ダイアログを開き、現在のページを印刷します。</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>現在のページの指定された要素 ID までスクロールします。</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>全スコープのクライアント ID をオプトアウトします。</td>
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
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p><a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a> が必要です。</p>
      <p>オブジェクトリテラルをバインド可能な状態にマージし、新しいエントリをブラウザの履歴スタックにプッシュします。エントリを消去すると、変数の前の値に復元されます（この例では、<code>foo</code>）。</p>
</td>
  </tr>
</table>

<sup>1</sup><a href="#multiple-actions-for-one-event">複数のアクション</a>とともに使用した場合、後続のアクションは、<code>setState()</code> または <code>pushState()</code> が完了するのを待ってから呼び出されます。1 つのイベント当たり、1 つの <code>setState()</code> または <code>pushState()</code> が許可されます。

### Target: amp-access <a name="target-amp-access"></a>

`amp-access` ターゲットは、[amp-access](https://amp.dev/documentation/components/amp-access.html) コンポーネントによって提供されます。

`amp-access` ターゲットが特別なのには、以下の理由があります。

1. このターゲットには、任意の ID を指定できません。ターゲットは常に `amp-access` です。
2. `amp-access` のアクションは、[AMP Access 構成](https://amp.dev/documentation/components/amp-access#configuration)に応じて動的に変化します。

`amp-access` ターゲットの使用に関する[詳細](https://amp.dev/documentation/components/amp-access#login-link)をご覧ください。
