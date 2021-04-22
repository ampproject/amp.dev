---
$title: amp-list
$category@: dynamic-content
teaser:
  text: データを動的にダウンロードし、テンプレートを使用してリスト項目を作成します。
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



CORS JSON エンドポイントからコンテンツを動的に取得し、指定のテンプレートを使用してレンダリングします。

<table>
  <tr>
    <td width="40%"><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-list/">amp-list の例</a>をご覧ください。</td>
  </tr>
</table>

## 使用方法 <a name="usage"></a>

`<amp-list>` コンポーネントは、CORS JSON エンドポイントから動的コンテンツを取得します。エンドポイントからのレスポンスには、指定したテンプレートでレンダリングされるデータが含まれます。

[tip type="important"] エンドポイントは、[AMP の CORS リクエスト](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)の仕様で指定されている要件を満たしている必要があります。
[/tip]

テンプレートは次の 2 種類の方法で指定できます。

* 既存の `template` または `script` 要素の ID を参照する `template` 属性。
* `amp-list` 要素内で直接ネストされた `template` または `script` 要素。

テンプレートについて詳しくは、[AMP HTML テンプレート](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md)をご覧ください。

*例: 動的リストの表示*

次の例では、URL とタイトルを含む JSON データを取得し、ネストされた [amp-mustache テンプレート](amp-mustache.md)でコンテンツをレンダリングします。

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

以下に、使用した JSON ファイルを示します。

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
以下に、取得したコンテンツのスタイル設定を示します。

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## 動作 <a name="behavior"></a>

ドキュメントが AMP キャッシュから配信された場合でも、リクエストは常にクライアントで作成されます。読み込みは、要素が現在のビューポートからどれだけ離れているかに応じて、通常の AMP ルールを使用してトリガーされます。

`<amp-list>` は、読み込み後に追加のスペースが必要な場合、通常の AMP フローを使用して高さを更新するよう AMP ランタイムにリクエストします。AMP ランタイムは、新しい高さのリクエストに対応できない場合、`overflow` 要素を表示します（可能な場合）。ただし、`<amp-list>` 要素の通常の配置（ドキュメントの一番下）では、ほとんどの場合、AMP ランタイムによるサイズ変更が可能であることが保証されます。

`<amp-list>` はデフォルトで、リスト要素に `list` ARIA ロールを、テンプレートを介してレンダリングされるアイテム要素に `listitem` ロールを追加します。

### XHR のバッチ処理 <a name="xhr-batching"></a>

AMP では、JSON エンドポイントに対する XMLHttpRequest（XHR）をバッチ処理します。つまり、AMP ページでは、複数のコンシューマー（複数の `<amp-list>` 要素など）のデータソースとして単一の JSON データ リクエストを使用できます。たとえば、`<amp-list>` によってエンドポイントへの XHR が作成された場合、XHR の送信中は、同じエンドポイントに対する後続の XHR はトリガーされず、代わりに 1 つ目の XHR の結果を返します。

`<amp-list>` では、[`items`](#items-optional) 属性を使用して JSON レスポンスのサブセットをレンダリングできます。これにより、さまざまなコンテンツをレンダリングする複数の `<amp-list>` 要素を指定できますが、1 つの XHR を共有します。

### オーバーフローの指定 <a name="specifying-an-overflow"></a>

必要に応じて、`overflow` 属性が設定された要素を `<amp-list>` 要素に含めることができます。AMP ランタイムが `<amp-list>` 要素のサイズを要求どおりに変更できない場合、この要素が表示されます。

*例: リストに追加のスペースが必要な場合のオーバーフローの表示*

次の例では、画像とタイトルのリストを表示します。`<amp-list>` のコンテンツで追加のスペースが必要なため、AMP ランタイムによってオーバーフロー要素が表示されます。

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

以下に、`overflow` の CSS を示します。

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### プレースホルダとフォールバック <a name="placeholder-and-fallback"></a>

`<amp-list>` は必要に応じて、プレースホルダまたはフォールバック（あるいはその両方）をサポートします。

* プレースホルダ**は、`placeholder` 属性が設定された子要素です。この要素は、`<amp-list>` による読み込みが成功するまで表示されます。フォールバックも指定されている場合、`<amp-list>` が読み込みに失敗すると、プレースホルダが表示されなくなります。
* フォールバック**は、`fallback` 属性が設定された子要素です。この要素は、`<amp-list>` が読み込みに失敗すると表示されます。

詳しくは、[プレースホルダとフォールバック](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)をご覧ください。子要素にプレースホルダとフォールバックの両方を指定することはできません。

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### データの更新 <a name="refreshing-data"></a>

`<amp-list>` 要素は、他の要素が `on="tap:..."` 属性で参照可能な `refresh` アクションを公開します。

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### 動的なサイズ変更 <a name="dynamic-resizing"></a>

##### 試験運用版: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

ユーザー操作に基づいてサイズを変更する際に `<amp-list>` が必要になることがあります。たとえば、ユーザーがタップする可能性がある amp-accordion が `<amp-list>` に含まれている場合、バインドされた CSS クラスが原因で `<amp-list>` のコンテンツがサイズ変更する場合、バインドされた `[src]` 属性が原因で `<amp-list>` 内のアイテム数が変更される場合などです。`changeToLayoutContainer` アクションは動的なサイズ変更に対処するために、アクションがトリガーされたときに amp-list を `layout="CONTAINER"` に変更します。次の例をご覧ください。

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

このアクションは試験運用版として、`amp-list-resizable-children` で使用できます。

## 属性 <a name="attributes"></a>

##### src（必須） <a name="src-required"></a>

`<amp-list>` 内でレンダリングされる JSON を返すリモート エンドポイントの URL。この属性には CORS HTTP サービスを指定する必要があります。また、URL のプロトコルは HTTPS である必要があります。

[tip type="important"] エンドポイントは、[AMP の CORS リクエスト](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)の仕様で指定されている要件を満たしている必要があります。
[/tip]

`[src]` 属性が存在する場合、`src` 属性を省略できることがあります。この属性は、[`amp-bind`](amp-bind.md) を使用している場合に、ページ読み込みではなくユーザー操作の結果としてコンテンツをレンダリングするのに便利です。

##### credentials（オプション） <a name="credentials-optional"></a>

[Fetch API](https://fetch.spec.whatwg.org/) で指定されているとおりに `credentials` オプションを定義します。

* サポートされている値: `omit`、`include`
* デフォルト値: `omit`

認証情報を送信するには、`include` を渡します。この値が設定されている場合、レスポンスは [AMP CORS セキュリティ ガイドライン](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)に準拠する必要があります。

以下の例では、カスタマイズされたコンテンツをリストで表示するための認証情報などが指定されています。

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items（オプション） <a name="items-optional"></a>

レスポンス内でレンダリングする配列を特定する式を定義します。これは、JSON レスポンスのフィールドを介してナビゲートするドット表記の式です。デフォルトでは、`<amp-list>` は配列を期待しますが、`single-item` 属性を使用してオブジェクトからデータを読み込むこともできます。

* デフォルト値は `"items"` です。期待されるレスポンスは `{items: [...]}` です。
* レスポンス自体が目的の配列の場合は、`"."` の値を使用します。期待されるレスポンスは `[...]` です。
* ネストされたナビゲーションは許容されます（`"field1.field2"` など）。期待されるレスポンスは `{field1: {field2: [...]}}` です。

`items="items"` が指定されている場合（デフォルト）、レスポンスは `"items"` と呼ばれる配列プロパティを含む JSON オブジェクトである必要があります。
```text
{
  "items": [...]
}
```

#### max-items（オプション） <a name="max-items-optional"></a>

レンダリングするアイテム配列の最大長を指定する整数値。戻り値が `max-items` を超えると、`items` 配列が `max-items` のエントリ数で切り捨てられます。

#### single-item（オプション） <a name="single-item-optional"></a>

この属性を指定すると、`<amp-list>` において返された結果が単一の要素配列のように扱われます。オブジェクト レスポンスは配列でラップされるため、`{items: {...}}` は `{items: [{...}]}` のように動作するようになります。

#### reset-on-refresh（オプション） <a name="reset-on-refresh-optional"></a>

リストのソースが `amp-bind` アクションまたは `refresh()` アクションによって更新されたときに、読み込みインジケーターとプレースホルダを再表示します。

デフォルトでは、ネットワーク フェッチを開始させる更新時にのみトリガーされます。すべての更新時にリセットするには、`reset-on-refresh="always"` を使用します。

#### [is-layout-container] （試験運用版、オプション） <a name="binding-optional"></a>

これはバインド可能な属性です。デフォルトでは必ず false に指定されている必要があります。`bind` を介して true に設定すると、`<amp-list>` のレイアウトが `CONTAINER` に変更されます。この属性は、amp-list の動的なサイズ変更を処理する際に役立ちます。`<amp-list>` がレイアウト `CONTAINER` をサポートしていないのと同じ理由により（最初の読み込み時にコンテンツが移動される可能性があります）、デフォルトではこの属性を true に設定できません。この属性は試験運用版として、`amp-list-resizable-children` で使用できます。また、`changeToLayoutContainer` アクションを使用することも可能です。

#### binding（オプション） <a name="is-layout-container-optional"></a>

`<amp-list>` を使用しているページで `amp-bind` も使用する場合、レンダリング対象の子要素でのバインディング（`[text]` など）の評価に基づいてレンダリングをブロックするかどうかを制御します。

パフォーマンスの強化のために、`binding="no"` または `binding="refresh"` を使用することをおすすめします。

* `binding="no"`: レンダリングをブロックしません**（最速）**。
* `binding="refresh"`: 最初の読み込み時にレンダリングをブロックしません**（速い）**。
* `binding="always"`: 常にレンダリングをブロックします**（遅い）**。

`binding` 属性を指定しない場合のデフォルト値は `always` です。

## 試験運用版: 追加の読み込みと無限スクロール（amp-list-load-more） <a name="common-attributes"></a>

`<amp-list>` でのページ分けと無限スクロールの実装として `amp-list-load-more`（試験運用版）が導入されました。この機能を有効にするには、[テストページ](https://cdn.ampproject.org/experiments.html)で「amp-list-load-more」（試験運用版）を有効にして、`load-more` 属性を `<amp-list>` に追加します。この機能は現在、初期試用版のため、最終的な API は変更される可能性があります。

#### 使用例 <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

実際の例については、[test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) と [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) をご覧ください。

### 属性 <a name="sample-usage"></a>

#### load-more（必須） <a name="attributes-1"></a>

この属性には「auto」または「manual」を設定できます。「manual」に設定すると、`<amp-list>` の最後に「load-more」ボタンが表示されます。「auto」に設定すると、`<amp-list>` が無限スクロール効果用の 3 つのビューポートを自動的に読み込み、下方向に追加します。

#### load-more-bookmark（オプション） <a name="load-more-mandatory"></a>

この属性では、返されたデータのフィールド名を指定します。このフィールド名によって次に読み込むアイテムの URL が指定されます。この属性が指定されていない場合、`<amp-list>` は、次に読み込む URL に対応する `load-more-src` フィールドが JSON ペイロードに設定されることを期待します。このフィールドが他の名前で呼ばれている場合、`load-more-bookmark` フィールドでそのフィールドの名前を指定できます。たとえば次のサンプル ペイロードでは、`load-more-bookmark="next"` を指定しています。

```
{ "items": [...], "next": "https://url.to.load" }
```

### load-more 要素のカスタマイズ <a name="load-more-bookmark-optional"></a>

`load-more` 属性が設定された `<amp-list>` には、UI 要素（load-more ボタン、ローダー、load-failed 要素）と、リストの最後を示すエンドキャップ（オプション）が含まれます。これらの要素をカスタマイズするには、以下の属性を使用して、`<amp-list-load-more>` 要素を `<amp-list>` の子として指定します。

#### load-more-button <a name="customizing-load-more-elements"></a>

`load-more-button` 属性が設定された `<amp-list-load-more>` 要素。読み込む要素が他にもある場合、（手動の load-more の）リストの最後に表示されます。この要素をクリックするとフェッチがトリガーされ、`load-more-src` フィールド、または `load-more-bookmark` 属性に対応して返されたデータのフィールドに含まれている URL からさらに要素が読み込まれます。この要素をカスタマイズするには、`load-more-button` 属性が設定された子要素を `<amp-list>` に指定します。

##### 例: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  テンプレート化するには `amp-mustache` を使用します。

##### 例: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

この要素は、ユーザーがリストの最後に到達したときにコンテンツがまだ読み込む中の場合に表示されるローダーです。また、（`<amp-list>` の新しい子要素の読み込み中に）`load-more-button` 要素をクリックした場合にも表示されます。この要素をカスタマイズするには、`load-more-loading` 属性が設定された子要素を `<amp-list>` に指定します。以下に例を示します。
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

`load-more-failed` 属性を含む `<amp-list-load-more>` 要素。読み込みが失敗した場合に `<amp-list>` の一番下に表示される、`load-more-clickable` 属性が設定されたボタンが含まれています。この要素をクリックすると、失敗した URL の読み込みが再度トリガーされます。この要素をカスタマイズするには、`load-more-failed` 属性が設定された子要素を `<amp-list>` に指定します。以下に例を示します。

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

上の例では `load-more-failed` 要素全体をクリックできますが、この要素は、クリック可能な「再読み込み」ボタンを含む、クリックできない「読み込み失敗」要素にするのが一般的です。この点を考慮して、クリックできない要素と、`load-more-clickable` 要素を含むボタンを指定することができます。以下に例を示します。

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

この要素はデフォルトでは指定されませんが、`load-more-end` 属性を含む `<amp-list-load-more>` 要素が子要素として `<amp-list>` に追加されると、読み込むアイテムがもうない場合、この要素が `<amp-list>` の一番下に表示されます。この要素をテンプレート化するには、`amp-mustache` を使用します。以下に例を示します。

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### 共通の属性 <a name="load-more-end"></a>

この要素には、AMP コンポーネントに拡張された[共通の属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)が含まれます。

## 置換 <a name="substitutions"></a>

`<amp-list>` では、標準的な URL 変数の置換をすべて使用できます。詳しくは、[置換ガイド](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)をご覧ください。

例:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
この例のリクエストの送信先は、`https://foo.com/list.json?0.8390278471201` のようになります。RANDOM の値は各インプレッションに基づいてランダムに生成されます。

## 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-list のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-list/validator-amp-list.protoascii)をご確認ください。
