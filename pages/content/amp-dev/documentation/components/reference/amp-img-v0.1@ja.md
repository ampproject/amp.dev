---
$title: amp-img
$category@: media
teaser:
  text: HTML5 の img タグを置き換えます。
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
    <td class="col-fourty"><strong>説明</strong></td>
    <td>HTML の <code>img</code> タグに代わるランタイム管理コンポーネント。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-img/">amp-img の例</a>をご覧ください。</td>
  </tr>
</table>


# 動作 <a name="behavior"></a>

ランタイム環境では、ビューポートの位置、システム リソース、接続帯域幅などの要素に基づいてリソースの読み込みを遅延または優先させることができます。`amp-img` コンポーネントを使用すると、ランタイム環境における画像リソースの管理をこのように効果的に行うことができます。

`amp-img` コンポーネントは、外部で取得されるすべての AMP リソースと同様に、画像を取得しなくてもアスペクト比を把握できるよう、（`width` / `height` のような）明示的なサイズをあらかじめ指定しておく必要があります。実際のレイアウトの動作は `layout` 属性によって決まります。

[tip type="read-on"] レイアウトについて詳しくは、[AMP HTML レイアウト システム](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)の仕様と[サポートされるレイアウト](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)をご覧ください。
[/tip]

# 例: レスポンシブ画像の表示 <a name="example-displaying-a-responsive-image"></a>

次の例では、`layout=responsive` を設定することにより、ビューポートのサイズに合わせて画像を表示します。画像は、`width` と `height` で指定されたアスペクト比に従って伸縮します。

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"] レスポンシブな AMP ページについて詳しくは、[レスポンシブな AMP ページの作成](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md)ガイドをご覧ください。
[/tip]

`amp-img` コンポーネントからリクエストされたリソースを読み込むことができない場合、[`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) 子要素が指定されている場合を除き、スペースが空白になります。フォールバックは初期レイアウトでのみ実行され、サイズ変更と srcset の設定などが行われた後の src 変更では、パフォーマンスへの影響によりフォールバックは行われません。

# 例: フォールバック画像の指定 <a name="example-specifying-a-fallback-image"></a>

次の例では、ブラウザが WebP をサポートしていない場合、JPG のフォールバック画像が表示されます。

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

プレースホルダの背景色やその他のビジュアルは、要素自体の CSS セレクタとスタイルを使用して設定できます。

字幕などのその他の画像機能は、標準の HTML（`figure` や `figcaption` など）で実装できます。

[tip type="read-on"] `amp-img` の使用方法について詳しくは、以下のリソースをご覧ください。

* [プレースホルダとフォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [画像と動画を含める](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# 属性 <a name="attributes"></a>

**src**

この属性は `img` タグの `src` 属性に似ています。値には、公開キャッシュ可能な画像ファイルを指す URL を指定する必要があります。キャッシュ プロバイダは、AMP ファイルを取り込む際に、キャッシュ バージョンの画像を指すようにこの URL を書き換えることがあります。

**srcset**

`img` タグの `srcset` 属性と同じです。`srcset` をサポートしていないブラウザでは、`<amp-img>` がデフォルトで `src` を使用するように設定されます。`srcset` のみを指定して `src` を指定しない場合、`srcset` の最初の URL が選択されます。

**sizes**

`img` タグの `sizes` 属性と同じです。

[tip type="read-on"] `sizes` と `srcset` の使用方法については、[srcset、sizes、heights を使ったレスポンシブ画像](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md)をご覧ください。
[/tip]

**alt**

代替テキストの文字列。`img` タグの `alt` 属性に似ています。

**attribution**

画像の帰属を示す文字列。例: `attribution="CC courtesy of Cats on Flicker"`

**height** と **width**

画像の明示的なサイズ。AMP ランタイムはこのサイズを使用することで、画像を取得しなくてもアスペクト比を確認できます。

**共通の属性**

この要素には、AMP コンポーネントに拡張された[共通の属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)が含まれます。

# スタイル設定 <a name="styling"></a>

`amp-img` のスタイルは、CSS プロパティで直接設定できます。たとえば、グレーの背景のプレースホルダを設定するには、次のようにします。

```css
amp-img {
  background-color: grey;
  }
```

# ヒントとアドバイス <a name="tips--tricks"></a>

# 画像を最大幅まで拡大する <a name="scaling-an-image-up-to-a-maximum-width"></a>

ウィンドウのサイズ変更に合わせて画像を最大幅まで拡大縮小する場合（画像がその幅を越えて拡大されないようにする）:

1. `<amp-img>` に `layout=responsive` を設定します。
1. 画像のコンテナで、CSS 属性 `max-width:<max width to display image>` を指定します。コンテナで指定する理由は、`layout=responsive` が設定された `amp-img` 要素がブロックレベルの**要素であるのに対し、`<img>` はインライン**であるためです。また、amp-img 要素の CSS で `display: inline-block` を設定することもできます。

# responsive レイアウトと intrinsic レイアウトの違い <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

`responsive` レイアウトと `intrinsic` レイアウトはどちらも、自動的に拡大縮小される画像を作成します。主な違いは、`intrinsic` レイアウトでは、拡大縮小する要素として SVG 画像を使用する点です。このため、標準の HTML 画像と同じように動作するようになり、しかも、ブラウザが初期レイアウトの画像サイズを把握できるというメリットが維持されます。`intrinsic` レイアウトは固有のサイズを持ち、float が指定された `div` 要素を、本来の画像サイズまたは CSS による制限（`max-width` など）に達するまでインフレートします。`responsive` レイアウトは、float が指定された `div` 要素では 0x0 をレンダリングします。その理由は、このレイアウトでは親からサイズを取得しますが、float が指定されている場合は親が本来の所定のサイズを持たないためです。

# 固定サイズの画像を設定する <a name="setting-a-fixed-sized-image"></a>

画像を固定サイズで表示する場合:

1. `<amp-img>` に `layout=fixed` を設定します。
1. `width` と `height` を指定します。

[tip type="read-on"] `layout` 属性を指定しない場合は、[推定レイアウト](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)について確認してください。
[/tip]

# アスペクト比を設定する <a name="setting-the-aspect-ratio"></a>

レスポンシブ画像の `width` と `height` は `amp-img` の幅と高さに正確に一致する必要はなく、アスペクト比のみが一致する必要があります。

たとえば、`width="900"` と `height="675"` を指定する代わりに、`width="1.33"` と `height="1"` を指定できます。

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# 各種の画面解像度に複数のソースファイルを設定する <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

同じ画像に対してさまざまな解像度（アスペクト比はすべて同じ）を指定するには、[`srcset`](#attributes) 属性を使用します。ブラウザは、デバイスの画面の解像度と幅に基づいて、`srcset` から最も適切なファイルを自動的に選択します。

一方、[`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) 属性は AMP コンポーネントの表示と非表示を切り替えます。レスポンシブ レイアウトをデザインする際には、この属性を使用する必要があります。アスペクト比が異なる複数の画像を表示するのに適した方法は、複数の `<amp-img>` コンポーネントを使用して、それぞれに `media` 属性を指定する方法です。この属性は、各インスタンスを表示する画面の幅と一致するように設定します。

詳しくは、[レスポンシブ AMP ページの作成](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images)ガイドをご覧ください。

# ディメンションが不明な画像のアスペクト比を維持する <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

AMP レイアウト システムでは、画像を取得する前にあらかじめ画像のアスペクト比を把握しておく必要がありますが、画像のディメンションがわからないこともあります。ディメンションが不明な画像を表示し、アスペクト比を維持するには、AMP の [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) レイアウトと [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) CSS プロパティを組み合わせて使用します。詳しくは、AMP By Example の[ディメンションが不明な画像に対応する方法](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions)をご覧ください。

# 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-img のルール](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)をご確認ください。
