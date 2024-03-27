---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: データ バインディングや JS に似た単純な式を使用して、ユーザーの操作やデータの変更に応じた要素の変更を可能にします。
---



データ バインディングと式を使用して独自のインタラクティブ性を追加します。


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


<table>
  <tr>
    <td class="col-fourty"><strong>必要なスクリプト</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-bind" src="https://ampjs.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">初歩的なコードの例（注釈付き）</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">リンク画像のカルーセルの例（注釈付き）</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">e コマース商品ページの例（注釈付き）</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>チュートリアル</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">インタラクティブな AMP ページを作成する</a></td>
  </tr>
</table>

# 概要 <a name="overview"></a>

`amp-bind` コンポーネントを使用すると、データ バインディングと JS に似た式を使って独自のステートフルなインタラクティブ性を AMP ページに追加できます。

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>この動画で amp-bind の概要をご覧ください。</figcaption></figure>

# 簡単な例 <a name="a-simple-example"></a>

次の例では、ボタンをタップすると、`<p>` 要素のテキストが「Hello World」から「Hello amp-bind」に変わります。

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"] `amp-bind` では、パフォーマンスの向上と、予期しないコンテンツの移動が発生するリスクの回避のために、ページの読み込み時に式の評価を行いません。そのため、表示要素のデフォルトの状態を指定して、最初のレンダリングで`amp-bind`を使用しないようにしてください。
[/tip]

### 仕組み <a name="how-does-it-work"></a>

`amp-bind` には以下の 3 つの主要なコンポーネントがあります。

1. [状態](#state) : ドキュメント スコープの変更可能な JSON ステータス。上の例では、ボタンをタップする前の状態は空です。ボタンをタップした後の状態は `{foo: 'amp-bind'}`です。
2. [式](#expressions) : 状態を参照可能な、JavaScript に似た式です。上の例の式`'Hello ' + foo`は、文字列リテラル `'Hello'` とステータス変数 `foo` を連結します。式で使用できるオペランドには 100 個の制限があります。
3. [バインディング](#bindings): : 要素のプロパティを式にリンクする、[プロパティ] の形式の特別な属性です。上の例のバインディング [`text`] は、式の値が変化するたびに要素のテキストを更新します。

`amp-bind` `では、AMP ページの速度、セキュリティ、パフォーマンスを確保するために特別な措置が取られています。

### 少し複雑な例 <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<p><button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  ボタンを押すと、次のようになります。

  1. **状態**が更新されます（`currentAnimal` がd `'cat'` に定義されます）。
  1. `currentAnimal` に依存する**式**が評価されます。

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. 変更された式に依存する**バインディング**が更新されます。

    * 1 つ目の `<p>` 要素のテキストが「This is a cat.」になります。
    * 2 つ目の `<p>` 要素の `class` 属性が「redBackground」になります。
    * `amp-img` 要素によって猫の画像が表示されます。</li>

  [tip type="success"] この例の[**ライブデモ**をお試しください](https://ampbyexample.com/components/amp-bind/)。コードの注釈もご覧いただけます。
  [/tip]

# 詳細 <a name="details"></a>

# 状態 <a name="state"></a>

`amp-bind` を使用する各 AMP ドキュメントでは、ドキュメント スコープの変更可能な JSON データ（**状態**）が作成されます。

# `amp-state` による状態の初期化 <a name="initializing-state-with-amp-state"></a>

`amp-bind` の状態は、`amp-state` コンポーネントを通じて初期化できます。

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[式](#expressions)では、ドット構文によってステータス変数を参照できます。この例の `myState.foo` は `"bar"` として評価されます。

* `<amp-state>` 要素の子 JSON の最大サイズは 100 KB です。
* `<amp-state>` 要素では、子 JSON スクリプトの代わりに CORS URL を指定することもできます。詳しくは、[付録](#amp-state-specification)をご覧ください。

# 状態の更新 <a name="refreshing-state"></a>

状態コンポーネントでは `refresh` アクションがサポートされており、このアクションを使用して状態の内容を更新することができます。

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# `AMP.setState()` による状態の更新 <a name="updating-state-with-ampsetstate"></a>

[`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) アクションは、オブジェクト リテラルを状態にマージします。たとえば、下のボタンを押すと、`AMP.setState()` によってオブジェクト リテラルが状態に[ディープマージ](#deep-merge-with-ampsetstate)されます。

```html
<!-- Like JavaScript, you can reference existing
      variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

一般に、ネストされたオブジェクトをマージする場合の最大深度は 10 です。変数（`amp-state` によって導入された変数を含む）はすべてオーバーライド可能です。

`AMP.setState()` は、特定のイベントによってトリガーされた場合、`event` プロパティでイベント関連のデータにアクセスすることもできます。

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
  <input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# `AMP.pushState()` による履歴の変更 <a name="modifying-history-with-amppushstate"></a>

[`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) アクションは、新しいエントリもブラウザの履歴スタックにプッシュすることを除き、`AMP.setState()` に似ています。この履歴エントリを（戻るなどの操作によって）ポップすると、`AMP.pushState()` で設定された以前の変数の値が復元されます。

例:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* ボタンをタップすると、変数 `foo` が 123 に設定され、新しい履歴エントリがプッシュされます。
* 戻る操作を行うと、`foo` が以前の値 "bar" に復元されます（`AMP.setState({foo: 'bar'})` を呼び出すのと同じ効果があります）。

# 式 <a name="expressions"></a>

式は JavaScript に似ていますが、重要な違いがいくつかあります。

# JavaScript との違い <a name="differences-from-javascript"></a>

* 式は、含んでいるドキュメントの[状態](#state)にのみアクセスできます。
* 式は、`window` や `document` などのグローバル変数にはアクセス**できません**。
* [ホワイトリストに登録されている関数](#allow-listed-functions)と演算子のみを使用できます。
* 一般に、独自の関数、クラス、ループは使用できません。arrow 関数はパラメータとして使用できます（例: `Array.prototype.map`）。
* 未定義の変数と array-index-out-of-bounds は、`undefined` を返したりエラーをスローしたりするのではなく、`null` を返します。
* パフォーマンスの向上のために、現在は 1 つの式で使用できるオペランドの数が 50 個に制限されています。不十分な場合は[お問い合わせください](https://github.com/ampproject/amphtml/issues/new)。

式の文法と実装について詳しくは、[bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) と [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js) をご覧ください。

# 例 <a name="examples"></a>

以下はすべて有効な式です。

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# ホワイトリストに登録されている関数 <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>オブジェクトの種類</th>
    <th>関数</th>
    <th>例</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>配列</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code>（not-in-place）<br>
      <code>splice</code>（not-in-place）<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
[3, 2, 1].sort()</pre>
      <pre>// Returns [1, 3, 5].
[1, 2, 3].map((x, i) => x + i)</pre>
      <pre>// Returns 6.
[1, 2, 3].reduce((x, y) => x + y)</pre>
    </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>数値</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>文字列</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>計算</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>オブジェクト</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>グローバル</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup> パラメータが 1 つだけの arrow 関数では、かっこは使用できません（例: `(x) => x + 1` ではなく、`x => x + 1` を使用します）。また、`sort()` と `splice()` は、in-place を操作するのではなく、変更されたコピーを返します。
<sup>2</sup> 静的関数は名前空間化されません（例: `Math.abs(-1)` ではなく、`abs(-1)` を使用します）。

# `amp-bind-macro` によるマクロの定義 <a name="defining-macros-with-amp-bind-macro"></a>

`amp-bind-macro` を定義することにより、`amp-bind` の式フラグメントを再利用できます。`amp-bind-macro` 要素を使用すると、0 個以上の引数を取り、現在の状態を参照する式を定義できます。マクロは、ドキュメント内の任意の場所から `id` 属性の値を参照することで、関数のように呼び出すことができます。

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

マクロは、自身より前に定義された他のマクロを呼び出すこともできます<i></i>。自身を再帰的に呼び出すことはできません。

# バインディング <a name="bindings"></a>

**バインディング**は、要素のプロパティを[式](#expressions)にリンクする、`[property]` の形式の特別な属性です。代わりに、XML 互換の構文を `data-amp-bind-property` の形式で使用することもできます。

**状態** が変わると式が再評価され、バインドされた要素のプロパティが新しい式の結果で更新されます。

`amp-bind` は、以下の 4 種類の要素の状態に基づいてデータ バインディングをサポートします

<table>
  <tr>
    <th>種類</th>
    <th>属性</th>
    <th>詳細</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>ほとんどのテキスト要素でサポートされています。</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">CSS クラス</a></td>
    <td><code>[class]</code></td>
    <td>式の結果がスペース区切りの文字列である必要があります。</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden"><code>hidden</code> 属性</a></td>
    <td><code>[hidden]</code></td>
    <td>ブール式である必要があります。</td>
  </tr>
  <tr>
    <td><a href="../../../documentation/components/index.html">AMP 要素</a>のサイズ</td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>AMP 要素の幅または高さ（あるいはその両方）を変更します。</td>
  </tr>
  <tr>
    <td>要素固有の属性</td>
    <td><a href="#element-specific-attributes">各種</a></td>
    <td></td>
  </tr>
</table>

バインディングに関する注意事項:

* セキュリティ上の理由から、`innerHTML` へのバインドは禁止されています。
* 属性のバインディングは、安全でない値（`javascript:` など）の場合はすべてサニタイズされます。
* ブール式の結果によってブール値の属性が切り替えられます。たとえば、`<amp-video [controls]="expr"...>` では、`expr` の評価結果が `true` の場合、`<amp-video>` 要素に `controls` 属性が設定されます。`expr` の評価結果が `false` の場合、`controls` 属性が削除されます。
* DOM API で XML（XHTML、JSX など）や属性を書き込む場合に、属性名の角かっこ（`[` と `]`）が問題になることがあります。このような場合は、構文に `[x]="foo"` ではなく `data-amp-bind-x="foo"` を使用します。

# 要素固有の属性 <a name="element-specific-attributes"></a>

以下のコンポーネントと属性へのバインディングのみが許可されています。

<table>
  <tr>
    <th>コンポーネント</th>
    <th>属性</th>
    <th>動作</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">表示される Brightcove 動画を変更します。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>現在表示されているスライドのインデックスを変更します。<a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">例をご覧ください</a>。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>選択可能な最も古い日付を設定します。<br>選択可能な最も新しい日付を設定します。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>更新された URL のドキュメントを表示します。<br>ドキュメントのタイトルを変更します。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>iframe のソース URL を変更します。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td><code>[src]</code> にバインドする場合、キャッシュ上でバインドを行うには、<code>[srcset]</code> にもバインドします。<br>対応する <a href="amp-img.md#attributes">amp-img 属性</a>をご確認ください。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>ライトボックスの表示を切り替えます。ヒント: ライトボックスが閉じているときに変数を更新するには、<code>on="lightboxClose: AMP.setState(...)"</code> を使用します。
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>式が文字列の場合は、JSON を文字列の URL から取得してレンダリングします。式がオブジェクトまたは配列の場合は、式データをレンダリングします。
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>現在選択されている子要素を変更します。<br>子要素は <code>option</code> 属性の値で特定できます。値のカンマ区切りのリストから複数の値を選択できます。<a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">例をご覧ください</a>。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>JSON を新しい URL から取得して既存の状態にマージします。<em>次の更新では、サイクルの防止のために <code>&lt;amp-state&gt;</code> 要素が無視されます。</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>対応する <a href="amp-video.md#attributes">amp-video 属性</a>をご確認ください。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>表示される YouTube 動画を変更します。</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>リンクを変更します。</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">button 属性</a>をご確認ください。</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">details 属性</a>をご確認ください。</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>フィールドセットを有効または無効にします。</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> 対応する <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">image 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">input 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">option 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">optgroup 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">select 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">source 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">track 属性</a>をご確認ください。</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>対応する <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">textarea 属性</a>をご確認ください。</td>
    </tr>
  </table>

  <sup>*</sup> バインド可能な属性を示します（同等のバインド不可能な属性はありません）。

# デバッグ <a name="debugging"></a>

開発中に警告とエラーに焦点を当てたり、特殊なデバッグ関数を使用したりするには、開発モードで（URL フラグメント `#development=1` を使用して）テストを実施します。

# 警告 <a name="warnings"></a>

開発モードでは、バインドされた属性のデフォルト値が対応する式の初期結果と一致しない場合、`amp-bind` によって警告が発行されます。これにより、他の状態変数の変化に伴って生じる意図しない変化を防止できます。以下に例を示します。

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
so a warning will be issued in development mode. -->

<p class="def" [class]="'abc'"></p>

```

開発モードでは、未定義の変数またはプロパティの参照を解除した場合にも、`amp-bind` によって警告が発行されます。これにより、`null` 式の結果が原因の意図しない変化も防止できます。以下に例を示します。

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->
<p [text]="myAmpState.bar">Some placeholder text.</p>
```

# エラー <a name="errors"></a>

`amp-bind` の使用時に発生する可能性があるランタイム エラーにはさまざまな種類があります。

<table>
  <tr>
    <th>種類</th>
    <th>メッセージ</th>
    <th>アドバイス</th>
  </tr>
  <tr>
    <td class="col-thirty">無効なバインディング</td>
    <td class="col-fourty">&lt;P>  要素の [someBogusAttribute] にはバインドできません<em></em>。</td>
    <td class="col-thirty"><a href="#element-specific-attributes">ホワイトリストに登録されているバインディング</a>のみを使用してください。</td>
  </tr>
  <tr>
    <td>構文エラー</td>
    <td><em>式のコンパイル エラーです。</em></td>
    <td>式に入力ミスがないか確認してください。</td>
  </tr>
  <tr>
    <td>ホワイトリストに登録されていない関数</td>
    <td><em>alert はサポート対象の関数ではありません。</em></td>
    <td><a href="#allow-listed-functions">ホワイトリストに登録されている関数</a>のみを使用してください。</td>
  </tr>
  <tr>
    <td>サニタイズされた結果</td>
    <td><em>「javascript:alert(1)」は [href] の有効な結果ではありません。</em></td>
    <td>禁止されている URL プロトコルや式を使用しないでください。AMP 検証ツールでエラーが発生します。</td>
  </tr>
  <tr>
    <td>CSP 違反</td>
    <td><em>次のコンテンツ セキュリティ ポリシーのディレクティブに違反しているため、「blob:...」からのワーカーの作成を拒否されました。</em></td>
    <td><code>default-src blob:</code> をオリジンのコンテンツ セキュリティ ポリシーに追加してください。コストのかかる作業が <code>amp-bind</code> によって<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">専用のウェブワーカー</a>に委任されるため、優れたパフォーマンスを実現できます。</td>
  </tr>
</table>

# 状態のデバッグ <a name="debugging-state"></a>

`AMP.printState()` を使用して、現在の状態をコンソールに出力します。

# 付録 <a name="appendix"></a>

# `<amp-state>` の仕様 <a name="amp-state-specification"></a>

`amp-state` 要素には、子 `<script>` 要素、またはリモートの JSON エンドポイントの CORS URL を含む `src` 属性の**いずれか**を含めることができます。両方を含めることはできません。

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state></p>

<p><amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# XHR のバッチ処理 <a name="xhr-batching"></a>

AMP では、JSON エンドポイントに対する XMLHttpRequest（XHR）をバッチ処理します。つまり、AMP ページでは、複数のコンシューマー（複数の `amp-state` 要素など）のデータソースとして単一の JSON データ リクエストを使用できます。たとえば、`amp-state` 要素によってエンドポイントへの XHR が作成された場合、XHR の送信中は、同じエンドポイントに対する後続の XHR はトリガーされず、代わりに 1 つ目の XHR の結果を返します。

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>amp-state</code> を更新する JSON を返すリモート エンドポイントの URL。この属性には CORS HTTP サービスを指定する必要があります。
      <code>src</code> 属性では、標準的な URL 変数の置換をすべて使用できます。詳しくは、<a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">置換ガイド</a>をご覧ください。
          [tip type="important"] エンドポイントは、<a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">AMP の CORS リクエスト</a>の仕様で指定されている要件を満たしている必要があります。
          [/tip]</td>
      </tr>
      <tr>
        <td width="40%"><strong>credentials（オプション）</strong></td>
        <td><a href="https://fetch.spec.whatwg.org/">Fetch API</a> で指定されているとおりに <code>credentials</code> オプションを定義します。
          <ul>
            <li>サポートされている値: 「omit」、「include」</li>
            <li>デフォルト値: 「omit」</li>
          </ul>
          認証情報を送信するには、<code>include</code> を渡します。この値が設定されている場合、レスポンスは <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">AMP CORS セキュリティ ガイドライン</a>に準拠する必要があります。</td>
        </tr>
      </table>

# `AMP.setState()` によるディープマージ <a name="deep-merge-with-ampsetstate"></a>

`AMP.setState()` が呼び出されると、`amp-bind` により、指定されたオブジェクト リテラルと現在の状態がディープマージされます。繰り返しマージされるネストされたオブジェクトを除き、オブジェクト リテラルの変数はすべて、状態に直接書き込まれます。状態に含まれているプリミティブと配列は必ず、オブジェクト リテラル内の同じ名前の変数によって上書きされます。

次の例をご覧ください。

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

つ目のボタンを押すと、状態が次のように変わります。

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

 つ目のボタンを押すと、`amp-bind` により、オブジェクト リテラルの引数 `{employee: {age: 64}}` が既存の状態に繰り返しマージされます。

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` は更新されていますが、`employee.name` キーと `employee.vehicle` キーは変更されていません。

循環参照を含むオブジェクト リテラルを指定して `AMP.setState()` を呼び出すと、`amp-bind` によってエラーがスローされます。

# 変数の削除 <a name="circular-references"></a>

既存のステータス変数を削除するには、`AMP.setState()` でその値を `null` に設定します。前の例の状態から開始して、次のボタンを押します。

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

状態が次のように変わります。

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

同様に、次のボタンを押します。

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

状態が次のように変わります。

```javascript
{
  <!-- State is empty -->
  }
```

# 式の文法 <a name="expression-grammar"></a>

`amp-bind` の式の文法は BNF に似ています。

```text
expr:
  operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    !' expr
    | '-' expr
    | '+' expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    | expr '&&' expr
    | expr '||' expr
    | expr '<=' expr
    | expr '<' expr
    | expr '>=' expr
    | expr '>' expr
    | expr '!=' expr
    | expr '==' expr
    | expr '?' expr ':' expr

invocation:
      expr '.' NAME args

args:
  (' ')'
  | '(' array ')'
    ;

member_access:
  expr member
    ;

member:
  .' NAME
  | '[' expr ']'

variable:
   NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    ' ']'
    | '[' array ']'

array:
  expr
  | array ',' expr

object_literal:
  {' '}'
  '{' object '}'

object:
  key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
