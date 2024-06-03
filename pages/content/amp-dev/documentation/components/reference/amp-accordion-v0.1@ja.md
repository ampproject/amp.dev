---
$title: amp-accordion
$category@: layout
teaser:
  text: 閲覧者がコンテンツの概要を一目で把握し、選択した任意のセクションにジャンプできるようにします。
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



閲覧者がコンテンツの概要を一目で把握し、選択した任意のセクションにジャンプできるようにします。この機能は、セクション内の数行の文章でもスクロールが必要なモバイル デバイスの場合に役立ちます。

<table>
  <tr>
    <td class="col-fourty"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">amp-accordion のアノテーション付きコードの例</a></td>
  </tr>
</table>


## 動作 <a name="behavior"></a>

`amp-accordion` コンポーネントを使用すると、折りたたみと展開が可能なコンテンツ セクションを表示できます。`amp-accordion` コンポーネントの直接の子は、それぞれアコーディオン内の 1 つのセクションと見なされます。各ノードは、`<section>` タグにする必要があります。

* `amp-accordion` は、直接の子として 1 つまたは複数の `<section>` 要素を格納することができます。
* 各 `<section>` は、直接の子を 2 つ格納している必要があります。
* セクションの 1 番目の子は、セクションの見出しを示し、見出し要素である必要があります（`h1`、`h2`、 ... 、`h6`、`header` のいずれか）。
* セクションの 2 番目の子は、AMP HTML 内で許可されている任意のタグを指定することが可能で、セクションの内容を示します。
* セクションの見出しをクリック / タップすると、セクションの展開や折りたたみが行われます。
* `amp-accordion` 要素内の各セクションの折りたたみ状態 / 展開状態は、セッション レベルで保持されます。状態を保持しないようにするには、`amp-accordion` 要素に `disable-session-states` 属性を追加します。

#### 例: アコーディオンを表示する <a name="example-displaying-an-accordion"></a>

この例では、3 つのセクションを表示します。3 番目のセクションはページの読み込み時に展開されます。また、`disable-session-states` を設定して、折りたたみ状態や展開状態を保持しないようにします。

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
`amp-accordion` の他のデモについては、[AMP By Example](https://ampbyexample.com/components/amp-accordion/) をご覧ください。
[/tip]

### イベント <a name="events"></a>

`accordion` の `section` で、以下のイベントがトリガーされます。

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>このイベントは、折りたたみ状態から展開状態に変化するターゲット <code>section</code> 上でトリガーされます。すでに展開済みの <code>section</code> で <code>expand</code> を呼び出しても、このイベントはトリガーされません。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>このイベントは、展開状態から折りたたみ状態に変化するターゲット <code>section</code> 上でトリガーされます。すでに折りたたみ済みの <code>section</code> で <code>collapse</code> を呼び出しても、このイベントはトリガーされません。</td>
  </tr>
</table>

### アクション <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>このイベントは、折りたたみ状態から展開状態に変化するターゲット <code>section</code> 上でトリガーされます。すでに展開済みの <code>section</code> で <code>expand</code> を呼び出しても、このイベントはトリガーされません。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>このアクションは、<code>amp-accordion</code> の <code>expanded</code> 状態と <code>collapsed</code> 状態を切り替えます。引数なしで呼び出した場合、アコーディオンのすべてのセクションの状態を切り替えます。<code>section</code> 引数と、対応する <code>id</code> を値として指定すると、単一のセクションを指定できます。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>このアクションは、<code>amp-accordion</code> を展開します。すでに <code>expanded</code> になっている場合は、その状態が維持されます。引数なしで呼び出した場合、アコーディオンのすべてのセクションを展開します。<code>section</code> 引数と、対応する <code>id</code> を値として指定すると、単一のセクションを指定できます。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>このアクションは、<code>amp-accordion</code> を折りたたみます。すでに折りたたみ状態になっている場合は、その状態が維持されます。引数なしで呼び出した場合、アコーディオンのすべてのセクションを折りたたみます。<code>section</code> 引数と、対応する <code>id</code> を値として指定すると、単一のセクションを指定できます。</td>
  </tr>
</table>

#### 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td><code>&lt;amp-accordion&gt;</code> に対してこの属性を設定すると、すべてのアコーディオン セクションの展開 / 折りたたみ動作がアニメーション化されます。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td><code>&lt;amp-accordion&gt;</code> に対してこの属性を設定すると、アコーディオンの折りたたみ / 展開状態が保持されなくなります。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td><code>&lt;section&gt;</code> に対してこの属性を設定すると、そのセクションはページの読み込み時に展開状態で表示されます。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td><code>&lt;amp-accordion&gt;</code> に対してこの属性を設定すると、一度に 1 つの <code>&lt;section&gt;</code> だけが展開できるようになります。ユーザーが 1 つの <code>&lt;section&gt;</code> にフォーカスすると、以前に展開されていた他の <code>&lt;section&gt;</code> は折りたたまれます。</td>
  </tr>
</table>

## スタイル設定 <a name="styling"></a>

* `amp-accordion` 要素セレクタを使用して、自由にスタイルを設定できます。
* `amp-accordion` 要素は常に `display: block` です。
* `<section>` 要素、heading 要素、content 要素は、フローティングできません。
* セクションが展開されている場合、`<section>` 要素は `expanded` 属性を持ちます。
* content 要素は、`overflow: hidden` によって clearfix されているため、スクロールバーを持つことはできません。
* `<amp-accordion>` 要素、`<section>` 要素、heading 要素、content 要素のマージンは 0 に設定され、カスタム スタイルでオーバーライドできます。
* header 要素と content 要素はどちらも `position: relative` です。

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-accordion ルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-accordion/validator-amp-accordion.protoascii)をご覧ください。
