---
$title: amp-iframe
$category@: layout
teaser:
  text: iframe を表示します。
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



iframe を表示します。


<table>
  <tr>
    <td width="40%"><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">amp-iframe のアノテーション付きコードの例</a></td>
  </tr>
</table>

# 動作 <a name="behavior"></a>

`amp-iframe` と vanilla iframe には重要な違いがいくつかあります。vanilla iframe は安全性を重視して設計されており、単一の iframe で制御される AMP ファイルを使用しません。

* `amp-iframe` はドキュメントの上部付近には表示できません（[以下](#iframe-with-placeholder)で説明するように、`placeholder` を使用する iframe は除く）。iframe は、最上部から 600 ピクセル離れた位置、または最上部までスクロールしたときにビューポートの最初の 75% の範囲内でない位置のどちらか上の位置に配置する必要があります。
* デフォルトでは、amp-iframe はサンドボックス化されています（[詳細](#sandbox)をご確認ください）。
* `amp-iframe` はリソースをリクエストする際に、HTTPS、データ URI、`srcdoc` 属性のいずれかのみを使用します。
* `amp-iframe` は、`sandbox` 属性に `allow-same-origin` を指定できる場合、コンテナと同じオリジンに含めてはなりません。iframe に使用できるオリジンについて詳しくは、[iframe オリジン ポリシー](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)をご覧ください。

*例: amp-iframe に埋め込まれた Google マップ*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

次のようにレンダリングされます。

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"] `amp-iframe` のその他のデモを [AMP By Example](https://ampbyexample.com/components/amp-iframe/) でご覧いただけます。
[/tip]

# 広告での amp-iframe の使用 <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe` は、広告の表示を主な目的として使用**しないでください**。広告が含まれている動画を表示する目的で `amp-iframe` を使用することについては問題ありません。この AMP ポリシーを適用するには、個々の iframe をレンダリングしないようにします。

広告のユースケースでは、代わりに [`amp-ad`](amp-ad.md) を使用してください。

このポリシーを適用する理由を以下に示します。

* `amp-iframe` ではサンドボックス化が強制的に行われ、子 iframe にもサンドボックスが適用されます。つまり、広告自体は動作しているように見えても、ランディング ページは壊れている可能性があります。
* `amp-iframe` は、設定を iframe に渡すメカニズムを備えていません。
* `amp-iframe` は、iframe を完全に制御するサイズ変更メカニズムを備えていません。
* 視認性に関する情報を `amp-iframe` で使用できない場合があります。

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>src</code> 属性は、標準的な iframe の場合とほぼ同じように動作します。ただし、1 つ例外があります。それは、<code>#amp=1</code> フラグメントを URL に追加すると、ソース ドキュメントが AMP コンテキストに埋め込まれていることを理解できるようになるという点です。このフラグメントは、<code>src</code> で指定された URL にまだフラグメントが設定されていない場合にのみ追加されます。</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc、frameborder、allowfullscreen、allowpaymentrequest、allowtransparency、referrerpolicy</strong></td>
    <td>これらの属性はすべて、標準的な iframe の場合と同じように動作します。
      <br><code>frameborder</code> が指定されていない場合、デフォルトで <code>0</code> に設定されます。</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td><code>amp-iframe</code> で作成された iframe には必ず <code>sandbox</code> 属性が定義されます。デフォルト値は空です。これは、iframe が「最大限にサンドボックス化」されることを意味します。<code>sandbox</code> の値を設定することで、サンドボックス化する iframe を減らすことができます。ブラウザでサポートされている値はすべて指定できます。たとえば、<code>sandbox="allow-scripts"</code> と設定すると、iframe で JavaScript を実行できます。また、<code>sandbox="allow-scripts allow-same-origin"</code> と設定すると、JavaScript の実行、非 CORS XHR の作成、Cookie の読み取りと書き込みを iframe で行えるようになります。
          <br><br>サンドボックス化することを念頭に置いて作成されていないドキュメントを iframe 化する場合、<code>allow-scripts allow-same-origin</code> を <code>sandbox</code> 属性に追加しなければならない可能性が高く、追加の機能を使用できるようにしなければならないこともあります。
            <br><br>また、サンドボックス化された iframe から開いたすべてのウィンドウにもサンドボックスが適用されます。これには、<code>target=_ blank</code> が設定されたリンクをクリックしたときに作成される新しいウィンドウも含まれます（この動作を行えるようにするには、<code>allow-popups</code> を追加します）。<code>allow-popups-to-escape-sandbox</code> を <code>sandbox</code> 属性に追加すると、新たに作成されたウィンドウを、サンドボックス化されていない新しいウィンドウと同じように動作させることができます。ほとんどの場合、ユーザーはこのような動作を希望、期待しているでしょう。しかし残念ながら、本ドキュメントの執筆時点で Chrome でサポートされているのは <code>allow-popups-to-escape-sandbox</code> だけです。
              <br><br>sandbox 属性について詳しくは、<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">MDN のドキュメント</a>をご覧ください。</td>
              </tr>
              <tr>
                <td width="40%"><strong>共通の属性</strong></td>
                <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
              </tr>
            </table>

# プレースホルダが設定された iframe <a name="iframe-with-placeholder"></a>

以下の例に示すように、`amp-iframe` に `placeholder` 要素を設定すると、`amp-iframe` をドキュメントの上部に表示させることができます。

* `amp-iframe` には、`placeholder` 属性が設定された要素（`amp-img` 要素など）を含める必要があります。この要素は、iframe を表示できるようになるまで、プレースホルダとしてレンダリングされます。
* iframe を表示できるようになったかどうかは、iframe の `onload` か、iframe ドキュメントから送信される `embed-ready` `postMessage` のいずれか先に届いた方をリッスンすることによって確認できます。

*例: プレースホルダが設定された iframe*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*例: iframe の embed-ready リクエスト*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# iframe のサイズ変更 <a name="iframe-resizing"></a>

`amp-iframe` では、他のすべての AMP 要素と同様に、静的レイアウトを定義する必要があります。ただし、実行時に `amp-iframe` のサイズを変更することは可能です。そのためには、次のようにする必要があります。

1. `resizable` 属性を指定して `amp-iframe` を定義する必要があります。
1. `amp-iframe` に `overflow` 子要素を設定する必要があります。
1. `amp-iframe` で `allow-same-origin` サンドボックス属性を設定する必要があります。
1. iframe ドキュメントから `embed-size` リクエストをウィンドウ メッセージとして送信する必要があります。
1. `embed-size` リクエストの高さが特定のしきい値（100 ピクセル）未満の場合、リクエストは拒否されます。

`resizable` を指定すると、`scrolling` の値が `no` にオーバーライドされることに注意してください。

*例: `overflow` 要素が設定された `amp-iframe`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*例: iframe のサイズ変更リクエスト*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

このメッセージを受信すると、AMP ランタイムはできるだけ早くリクエストに対応しようとしますが、リーダーが現在読んでいる場所、スクロールが実行中かどうか、その他の UX やパフォーマンスに関する要素を考慮に入れます。ライタイムがサイズ変更リクエストに対応できない場合、`amp-iframe` によって `overflow` 要素が表示されます。`overflow` 要素をクリックすると、サイズ変更がユーザー操作によってトリガーされるため、`amp-iframe` のサイズが直ちに変更されます。

サイズ変更の実行速度に影響する要素の一部を以下に示します。

* サイズ変更がユーザー操作によってトリガーされたかどうか。
* サイズ変更リクエストの対象が現在アクティブな iframe かどうか。
* サイズ変更リクエストの対象の iframe がビューポートの上と下のどちらにあるか。

# iframe の視認性 <a name="iframe-viewability"></a>

iframe は `send-intersections` メッセージを自身の親に送信することで、iframe の親ビューポートとの共通部分に関する IntersectionObserver スタイル[変更レコード](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)の受信を開始できます。

*注: 以下の例では、作成した iframe 内にスクリプトがあると想定しています（`window.parent` は上部ウィンドウ）。ネストされた iframe 内にスクリプトがある場合は、`window.parent` を上部の AMP ウィンドウに変更します。*

*例: iframe の `send-intersections` リクエスト*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

iframe は親ウィンドウからの `intersection` メッセージをリッスンして、共通部分のデータを受信することができます。

*例: iframe の `send-intersections` リクエスト*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

共通部分に関するメッセージは、iframe がビューポートに出入りしたとき（または、iframe が部分的に表示されているとき）、iframe がスクロールまたはサイズ変更されたときに、親から iframe に送信されます。

# トラッキング / アナリティクス用の iframe <a name="trackinganalytics-iframes"></a>

[`amp-analytics`](amp-analytics.md) は幅広いアナリティクス ベンダー向けに設定可能な、堅牢性と効率性に優れた包括的なソリューションであるため、アナリティクスの目的ではこのコンポーネントを使用することを強くおすすめします。

AMP でアナリティクスやトラッキングの目的で使用できる iframe は、1 ページにつき 1 つだけです。リソースを節約するために、これらの iframe は、読み込まれてから 5 秒後に DOM から削除されます（5 秒あれば、必要な作業を完了できるはずです）。

iframe は、ユーザーの直接の目的を果たさないように思える場合（ユーザーから見えない、表示が小さいなど）、トラッキング / アナリティクス用の iframe として認識されます。

# ガイドライン: amp-iframe を介して既存の AMP コンポーネントを使用する <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

必要なユーザー エクスペリエンスを AMP の他の手段では実現できない場合、つまり、ユースケースに適した既存の [AMP コンポーネント](../../../documentation/components/index.html)がない場合、代わりに `amp-iframe` コンポーネントを使用することを検討してください。その理由は、特定のユースケース用に調整された AMP コンポーネントを使用することには、以下のようなさまざまなメリットがあるためです。

* リソース管理を改善し、パフォーマンスを向上させることができます。
* 場合によっては、カスタム コンポーネントで組み込みのプレースホルダ画像を提供できます。つまり、動画の読み込みの前に適切な動画のサムネイルを取得できます。また、プレースホルダを手動で追加するためのコーディング作業を減らすことができます。
* サイズ変更機能を組み込むことができます。これにより多くの場合、予測不能なサイズの iframe コンテンツを、スクロール可能なフレーム内に表示するのではなく、ページに対してネイティブであるかのように表示できるようになります。
* 他の追加機能（動画プレーヤーの自動再生など）を組み込むこともできます。

# 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-iframe のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii)をご確認ください。
