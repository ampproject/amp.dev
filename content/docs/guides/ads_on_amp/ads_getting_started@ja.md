---
$title : スタートガイド
$order : 0
---

## AMP ページに広告を掲載するための 3 つの手順

このガイドでは、AMP ページに簡単に広告を掲載するための手順について解説します。

###  1.`<amp-ads>` コンポーネントを AMP ページに追加する

[sourcecode:html]

<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>

[/sourcecode]

`amp-ads` コンポーネントを追加すると、AMP ページに広告フレームワークが追加されます。

###  2.`type` 属性に広告サーバーまたは広告ネットワークを指定する

[sourcecode:html]
<amp-ad
type="a9">
</amp-ad>
[/sourcecode]

[こちら](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)から、利用可能な広告ネットワークを確認できます。

### 3. 広告ユニットの高さと幅を指定する

[sourcecode:html]
<amp-ad width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302">
</amp-ad>
[/sourcecode]

広告ユニットの高さと幅を定義することで、AMP ページ上の広告のサイズが指定されます。

{% call callout('注', type='note') %}
 追加的なデータ属性は、広告ネットワークがサーバーから適切なサイズとサイト運営者を取得できるようにするための情報です。送信できる属性は広告ネットワークにより異なります。[詳細](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)
{% endcall %}

###  4. [省略可能] プレースホルダを指定する

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP ではプレースホルダ属性を使用することもできます（省略可）。広告ネットワークによっては、広告が表示されるまでの間にプレースホルダを表示することが可能です。これにより空白のページが表示されることがなくなるため、ユーザー エクスペリエンスが向上します。

###  5. [省略可能] フォールバック属性を指定する

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

AMP ではフォールバック属性を使用することもできます（省略可）。広告ネットワークによっては、掲載できる広告がない場合にフォールバック要素を表示することが可能です。

### 6. これで、AMP ページに広告を掲載するための手順は完了です。

