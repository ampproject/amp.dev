---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Mustache.js テンプレートのレンダリングを可能にします。
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



[Mustache.js](https://github.com/janl/mustache.js/) のレンダリングを可能にします。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td>AMP By Example の<a href="https://ampbyexample.com/components/amp-mustache/">アノテーション付き amp-mustache</a> サンプルをご覧ください。</td>
  </tr>
</table>


## バージョン履歴 <a name="version-notes"></a>

| バージョン | 説明 |
|-------|-----|
| 0.2 | `<svg>` 要素がサポートされ、バンドルサイズが縮小されました（20.5 KB から 12.2 KB へ。gzip 形式で圧縮）。最新の HTML サニタイズ ライブラリに移行しました（Caja から DOMPurify へ）。タグと属性のホワイトリストが変更されるため、マイナー変更が発生する可能性があります。生成されるマークアップの変更が機能に影響を与えないか確認するため、本番環境に進む前に、まずページをテストしておくことをおすすめします。 |
| 0.1 | 初期実装。 |

## 構文 <a name="syntax"></a>

Mustache は、ロジックレスのテンプレート構文です。細については、[Mustache.js ドキュメント](https://github.com/janl/mustache.js/)をご覧ください。主な Mustache タグは次のとおりです。

* {% raw %}`{{variable}}`{% endraw %}: 変数タグ。HTML エスケープした変数の値を出力します。
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: セクションタグ。変数の存在をテストし、配列の場合は反復処理を行うことができます。
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: 逆タグ。変数の非存在をテストできます。
* {% raw %}`{{{unescaped}}}`{% endraw %}: エスケープなしの HTML。出力できるマークアップには制限があります（下記の「制限事項」を参照）。

## 使用方法 <a name="usage"></a>

`amp-mustache` テンプレートは、[AMP テンプレート仕様](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md)に沿って定義、使用する必要があります。

まず、以下のように `amp-mustache` を宣言して読み込む必要があります。

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

次に、Mustache テンプレートを `script` タグか `template` タグ内で以下のように定義します。

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]

あるいは、以下のように定義します。


<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

可能な限り `template` タグを使用してください。AMP 検証によって有用な dev-x ヒントを得ることができます。テーブルのコンテキストでテンプレートを使用する際のエッジケースや問題に関しては、`script` テンプレートを使用してください。詳細については、下記の「テーブル」をご覧ください。

テンプレートの検出方法や、レンダリングのタイミング、データの提供方法は、このテンプレートを使用してコンテンツをレンダリングするターゲット AMP 要素によってすべて決定されます（[amp-list](amp-list.md)、[amp-form](amp-form.md) など）。

## 制限事項 <a name="restrictions"></a>

### 検証 <a name="validation"></a>

すべての AMP テンプレートと同様、`amp-mustache` テンプレートは、適切な形式の DOM フラグメントである必要があります。そのため、`amp-mustache` を使用して次のことを行うことはできません。

* タグ名の計算。たとえば、{% raw %}`<{{tagName}}>`{% endraw %} は使用できません。
* 属性名の計算。たとえば、{% raw %}`<div {{attrName}}=something>`{% endraw %} は使用できません。

「triple-mustache」の出力はサニタイズされ、使用できるタグは、`a`、`b`、`br`、`caption`、`colgroup`、`code`、`del`、`div`、`em`、`i`、`ins`、`li`、`mark`、`ol`、`p`、`q`、`s`、`small`、`span`、`strong`、`sub`、`sup`、`table`、`tbody`、`time`、`td`、`th`、`thead`、`tfoot`、`tr`、`u`、`ul` だけに限られます。

### サニタイズ <a name="sanitization"></a>

セキュリティを強化し AMP 有効性を維持するため、Mustache 出力はサニタイズされます。これにより、一部の要素や属性が暗黙的に削除されることがあります。

## 注意事項 <a name="pitfalls"></a>

### ネスト テンプレート <a name="nested-templates"></a>

AMP 検証の仕様により、`<template>` 要素を他の `<template>` 要素の子にすることはできません。この状況は、テンプレートを使用する 2 つのコンポーネントをネストするときに発生することがあります（`amp-list` と `amp-form` など）。

対応策としては、コンポーネントの `template` 属性を使用して、`id` に基づいて `<template>` 要素を参照する方法があります。たとえば、次のようになります。

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

次のように指定することもできます。

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]


### テーブル <a name="tables"></a>

AMP テンプレート文字列は `<template>` 要素内で指定する必要があるため、ブラウザの解析によって予期しない動作が発生する可能性があります。たとえば、`<table>` 要素が、テキストの[フォスター ペアレンティング](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables)を引き起こすことがあります。次の例をご覧ください。

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

ブラウザが、テキストノードの {% raw %}`{{#foo}}`{% endraw %} と {% raw %}`{{/foo}}`{% endraw %} のフォスター ペアレンティングを行います。

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

対応策としては、HTML コメント内に Mustache セクションをラップする方法があります（例: {% raw %}`<!-- {{#bar}} -->`{% endraw %}）。`<div>` などの非 table 要素を使用するか、`<script type="text/plain">` タグを使用してテンプレートを定義してください。

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### 引用符のエスケープ <a name="quote-escaping"></a>

`amp-mustache` を使用して属性値を計算する場合、引用符のエスケープが問題になることがあります。たとえば、次のようになります。

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

{% raw %}`{{foo}}`{% endraw %} 変数や {% raw %}`{{bar}}`{% endraw %} 変数内で HTML 文字コードを使用した場合、Mustache が `&;` 文字を HTML エスケープするため（例: `&quot;`  -&gt; `&amp;quot;`）、正常に機能しません。対応策としては、ファクシミリ文字を使用する方法があります（例: ′（`&prime;`）、″（`&Prime;`)。

`amp-mustache` 内でこの置換を実行できるようにするための[オープン プロポーザル](https://github.com/ampproject/amphtml/issues/8395)もあります。賛成の方は、コメントしてください。

### HTML エンティティ <a name="html-entities"></a>

HTML エンティティは、`<template>` 要素内で保持されません。

これは、ユーザーが作成したテキストを含む `<template>` を、サーバーサイドでレンダリングする場合に問題になる可能性があります。ユーザーが作成したテキストに {% raw %}`{{`、`}}`、`{{{`、`}}}`{% endraw %} が含まれる場合、Mustache セクションとして扱われます。たとえば、{% raw %}`{{`{% endraw %} を HTML エンティティの {% raw %}`{{`{% endraw %} に置換しても、ブラウザが `<template>` を解析するときには保持されていないため、正常に機能しません。

対応策としては、{% raw %}`{{`{% endraw %} のような文字列を別の文字に置換する方法や、ユーザー作成コンテンツからすべて削除する方法などがあります。

## 検証 <a name="validation-1"></a>

AMP 検証ツール仕様の [amp-mustache ルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/validator-amp-mustache.protoascii)をご覧ください。
