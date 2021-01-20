---
$title: AMP 検証エラー
---

<!---
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

有効な AMP ドキュメントを作成するには、検証エラーが 1 つもない状態にする必要があります。
このドキュメントの目的は、
[AMP ページを検証する](validate_amp.md)ときに見つかった検証エラーを
正しく理解して修正できるようにすることです。
検証エラーの概要については、
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)をご覧ください。

## AMP HTML タグと属性のエラー

### 必須タグがない

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>必須の HTML タグを追加（または修正）します。</td>
  </tr>
</table>

以下のタグは、すべての AMP ドキュメントで必ず必要です。

* <a name="doctype"></a>`<! doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

<a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">AMP 検証ツールの仕様</a>では、上記の必須タグには `mandatory: true` フィールドが含まれています。
また、[AMP 仕様](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)にも必須タグについての説明があります。

### あるタグで必要な別のタグがない

<table>
  </tr>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>必要な HTML タグを追加（または修正）します。</td>
  </tr>
</table>

検証ツールで `TAG_REQUIRED_BY_MISSING` エラーが返されるのは、
AMP ドキュメント内に拡張コンポーネントが見つかったものの、
それに相当する `<script>` が見つからない場合です。

[拡張コンポーネント](../../../../documentation/components/index.html)は、
カスタム要素として明示的に AMP ドキュメントに含める必要があります。
このエラーを修正するには、拡張コンポーネントのリファレンス ページに移動して、
必要なスクリプトをコピーし、AMP ドキュメントの `<head>` に貼り付けます。

### タグが許可されていない

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DISALLOWED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>許可されていないタグを削除します。</td>
  </tr>
</table>

タグはホワイトリストに登録されているため、許可されていないタグを網羅したリストはありません。
ただし、[AMP 仕様](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)では
許可されていないタグを大まかに定義しています。

### カスタム JavaScript が使用されている

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>javascript タグを削除します。</td>
  </tr>
</table>

AMP 形式では、AMP プロジェクトが提供している JavaScript ファイルを除いて、ページにカスタムの JavaScript を
追加することはできません。JavaScript の一般的な用法の多くは、
AMP HTML ライブラリに対応する実装があります。AMP HTML ページの
拡張に使用できるコンポーネントについては、[AMP コンポーネント](../../../../documentation/components/index.html)
をご覧ください。

ご自分の使用例が取り上げられていない場合は、AMP プロジェクトに
新しいコンポーネントを提案することもできます。詳しくは、AMP プロジェクトの
[貢献](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md)
に関するドキュメントをご覧ください。

### 必須属性がない

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>タグに必須属性を追加します。</td>
  </tr>
</table>

AMP タグに必須の属性は、
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)に定義されています。
タグを検索し、
列記されている属性を見て、
`mandatory: true` の記述があるかどうか確認します。
各 AMP タグの必須属性は、
そのタグの仕様内にも定義されています。

### 属性値が無効

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>属性値を有効な値に修正します。</td>
  </tr>
</table>

このエラーは、HTML タグに指定されている属性の属性名は正しいものの、
値が無効であることを表しています。
たとえば、このエラーの原因としてよくあるのが、無効な URL 値です。
すべての URL の値（`href` 属性と `src` 属性内）は、
[指定可能な属性値](http://www.w3schools.com/tags/att_a_href.asp)のいずれかに一致する必要があります。

<strong>重要:</strong> AMP で使用する URL 値の多くは HTTPS であることが必要です。
このエラーが発生して、その原因がわからない場合は、
該当する AMP タグの仕様を調べて
属性を HTTPS にする必要がないかどうかを確認してください。

### 属性が許可されていない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DISALLOWED_ATTR</td>
  </tr>
    </tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
    </tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>HTML タグから属性を削除します。</td>
  </tr>
</table>

属性はホワイトリストに登録されているため、許可されていない属性を網羅したリストはありません。
各タグでサポートされている属性を確認するには、
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)で HTML タグを検索してから、
`attrs` を検索します。

どの AMP タグも、各タグごとのホワイトリストに登録された属性に加えて、
`$GLOBAL_ATTRS` 以下のホワイトリストにある属性を使用できます。
また、`"data-"` で始まる属性もすべてホワイトリストに登録されています。

### 必須のテキストがない、または正しくない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>タグ内の必須のテキストを追加するか、または修正します。</td>
  </tr>
</table>

CDATA は、HTML の開始タグと終了タグの間に記述するコンテンツ データで、
現在のところ、ホワイトリストとブラックリストの両方を使って評価されます。
必須の CDATA が含まれるタグは次のとおりです。

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

次のタグも該当します。

[sourcecode:html]
<style amp-custom>
[/sourcecode]

この場合に表示される詳細なメッセージは次のいずれかです。

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed &#64;charset in CSS"
* "Disallowed &#64;import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### タグ内のテキストが許可されていない

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>許可されていないテキストを削除します。</td>
  </tr>
</table>

重要な CSS AMP ルールを評価するため、
特定の CSS データはブラックリストに登録されています。

ブラックリストに登録されている CSS データは以下のとおりです
（[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)内の `disallowed_cdata_regex` もご覧ください）。

* `"\\.i?-amp-"`（「CSS クラス名接頭辞 -amp-」）
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### タグの属性内のプロパティが許可されていない

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>指定された属性内の許可されていないプロパティを削除します。</td>
  </tr>
</table>

このエラーは、属性内のプロパティ名が許可されていない場合に発生します。
この文脈における「プロパティ」という用語は、属性内の構造化された Key-Value データを意味します。
たとえば、
`<meta name="viewport content="width=device-width;minimum-scale=1">` 内では、
`width` と `minimum-scale` がプロパティ名です。

次のコードは DISALLOWED_PROPERTY_IN_ATTR_VALUE エラーになります。

`<meta name="viewport content="width=device-width;invalidfoo=1">`

別の例として、
次のコードもエラーになります。

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

正しくは、`<meta http-equiv="X-UA-Compatible" content="ie=edge">` です。

### プロパティ値が無効

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>無効なプロパティ値を修正します。</td>
  </tr>
</table>

このエラーは、属性内のプロパティ値が無効である場合に発生します。
この文脈における「プロパティ」という用語は、属性内の構造化された Key-Value データを意味します。
たとえば、
`<meta name="viewport content="width=device-width;minimum-scale=1">` 内では、
`device-width` と `1` がプロパティ値です。

次のコードは INVALID_PROPERTY_VALUE_IN_ATTR_VALUE エラーになります。

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

注: 値のない属性を出力しようとしているのに（たとえば、[`amp-video`](../../../../documentation/components/reference/amp-video.md) コンポーネントの `autoplay`、`controls`、`loop` など）、HTML のビルドプロセスで `true` などのデフォルト値（しかし無効な値）が生成される場合は（たとえば、React では、[デフォルトで](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true) `<amp-video autoplay="true" ...>` と生成されます）、回避策として、属性の名前を値として出力してください。たとえば、`<amp-video autoplay="autoplay" ...>` のようになります。

### URL が指定されていない

<table>
    </tr>
    <td class="col-thirty"><strong>コード</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>形式</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>修正方法</strong></td>
    <td>有効な URL を追加します。</td>
  </tr>
</table>

このエラーは、`href` 属性や `src` 属性など、
URL の指定が必要な属性で URL が指定されていない場合に発生します。

### URL が無効

<table>
    </tr>
    <td class="col-thirty"><strong>コード</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>形式</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>修正方法</strong></td>
    <td>無効な URL を修正します。</td>
  </tr>
</table>

このエラーは、属性に指定されている URL が
無効である場合に発生します。

### URL プロトコルが無効

<table>
    </tr>
    <td class="col-thirty"><strong>コード</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>形式</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>修正方法</strong></td>
    <td>有効なプロトコルに（たとえば `http` を `https` に）変更します。</td>
  </tr>
</table>

このエラーは、タグ内の `href` または `src` で
特定のプロトコルに設定する必要がある場合に発生します。
たとえば、多くのタグでは `https` が必要です。

### 属性値に必須のプロパティがない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>欠落しているプロパティを追加します。</td>
  </tr>
</table>

現在、このエラーは以下の必須プロパティが指定されていない場合に発生します。

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

これらは次のようなタグで使用されます。

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### 同時に指定できない属性が含まれている

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>同時に指定できない属性のいずれか 1 つを削除します。</td>
  </tr>
</table>

このエラーは、同時に指定できない 2 つの属性がどちらもタグに含まれている場合に発生します。
たとえば、次のタグではどちらか 1 つの属性しか指定できません。

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` または `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md): `data-media-id` または `data-playlist-id`

### リスト内の必須属性がない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>指定可能な属性リストの中から、欠落している必須属性を選んで追加します。</td>
  </tr>
</table>

このエラーは、複数の選択肢がある必須属性が 1 つも
指定されていない場合に発生します。
たとえば、次のタグでは 2 つの属性のうちどちらか 1 つを指定する必要があります。

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` または `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` または `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` または `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` または `data-videoid`

### 親タグが間違っている

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>正しい親タグの子にします。</td>
  </tr>
</table>

特定のタグでは、（階層が離れた祖先ではなく）直接の親タグが必要です。
以下に挙げるものが、親タグが必要なタグです
（タグ、親タグの順）。

* `!doctype` には親タグ `root` が必要
* `html` には親タグ `!doctype` が必要
* `head` には親タグ `html` が必要
* `body` には親タグ `html` が必要
* `link` には親タグ `head` が必要
* `meta` には親タグ `head` が必要
* `style amp-custom` には親タグ `head` が必要
* `style` には親タグ `boilerplate (noscript)` が必要
* `noscript` には親タグ `head` が必要
* `script` には親タグ `head` が必要
* `source` にはメディアタグ（[`amp-audio`](../../../../documentation/components/reference/amp-audio.md)、[`amp-video`](../../../../documentation/components/reference/amp-video.md) など）が必要

### 祖先にできないタグ

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>ネストが許可されてないタグを削除（または移動）します。</td>
  </tr>
</table>

このエラーは、いずれかのタグが、祖先として有効でないタグの
子孫になっている場合に発生します。
現在のところ、この唯一の例は <code>template</code> タグです。
このタグは別の <code>template</code> タグにネストすることはできません。

### 必須の祖先タグ

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>問題のタグを削除するか、または指定されたタグの子孫にします。</td>
  </tr>
</table>

必須の子孫は、
[AMP 検証ツール](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)の仕様で
`mandatory_ancestor` として定義されています。

このエラーは、以下のタグで
`mandatory_ancestor` が指定されていない場合に発生します（タグ、祖先の順）。

* `img` は必ず `noscript` の子孫にする
* `video` は必ず `noscript` の子孫にする
* `audio` は必ず `noscript` の子孫にする
* `noscript` は必ず `body` の子孫にする

### 必須の祖先タグとヒント

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>問題のタグを削除するか、指定されたタグの子孫にするか、またはヒントで提示されたタグと置き換えます。</td>
  </tr>
</table>

このエラーは、AMP ドキュメントで見つかった以下のいずれかのタグが、
必須の親タグに正しくネストされていない場合に発生します。

* `img` が親タグ `noscript` 内にない
* `video` が親タグ `noscript` 内にない
* `audio` が親タグ `noscript` 内にない
* `noscript` が親タグ `body` 内にない

### 一意のタグが重複している

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>重複しているタグのうち 1 つを AMP ドキュメントから削除します。</td>
  </tr>
</table>

このエラーは、タグのインスタンスが 1 つしか許可されていないにもかかわらず、
重複が見つかった場合に発生します。

一意のタグの一覧は次のとおりです。

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## スタイルとレイアウトのエラー <a name="style-and-layout-errors"></a>

スタイルとレイアウトのエラーの説明に移る前に、
AMP での
[スタイル](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)と
[レイアウト](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)の仕組みを理解しておくことをおすすめします。
AMP ページは HTML ページであるため、スタイルも HTML ページと非常によく似ています。
ただし、ページの読み込みを高速化するためのいくつかの制限があり、
AMP 検証ツールではそれらの制限が守られているかどうかをチェックします。

AMP ページではレイアウトのほうがより多くの制約を受けます。
ページに表示されるタグはすべて、
高さと幅を事前に定義しておく必要があります。
それによってレンダリングやスクロール パフォーマンスの低下を大幅に軽減できるためです。
ただし、これらの属性を手入力で追加する必要があるわけではありません。
特定のレイアウト タイプについては
デフォルト値を前提としているため、
AMP 検証ツールでエラーになることはありません。

各 AMP タグには `supported_layouts` の
リストがあります
（[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)で定義されています）。
検証ツールは、サポートされていないレイアウトに対してはエラーを返し、
事前定義されたレイアウトについては検証ルールをチェックします。

### スタイルシートが長すぎる

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>スタイルシートのサイズを 75,000 バイトより小さくします。</td>
  </tr>
</table>

AMP 検証ツールがこのエラーを返すのは、
`<style amp-custom>` 内にあるスタイルのコンテンツのサイズが
上限の 50,000 バイトを超えている場合です。

### CSS 構文エラー

<table>
   <tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>CSS_SYNTAX</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>CSS 構文エラーを修正します。</td>
  </tr>
</table>

このエラーは、指定されたタグに CSS 構文エラーが
あった場合に発生します。
エラーの原因がわからない場合は、
オンラインの CSS 検証ツール
（[csslint](http://csslint.net/)）などで
CSS を実行してみてください。

### 特定のルールでの CSS 構文エラー

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>指定された CSS 構文エラーを修正します。</td>
  </tr>
</table>

このエラーは、CSS 内のアットルールに関するものです。
AMP で使用できるアットルールはごくわずかです
（[AMP 仕様](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)もご覧ください）。
たとえば、<code>@import</code> は許可されていません。
検証エラーでは無効なルールが
具体的に示されるため、
該当するルールを簡単に修正できます。

### 暗黙的レイアウトが AMP タグでサポートされていない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>該当するタグに、有効なレイアウト属性を指定します。</td>
  </tr>
</table>

このエラーは、AMP タグのレイアウトが指定されておらず、
（幅、高さ、サイズを基にした）暗黙的レイアウトがサポートされていない場合に発生します。
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)で
タグの `supported_layout` の値を確認してください。

実際のレイアウトの動作は `layout` 属性によって決まります。
レイアウトが機能する仕組みについては、
[レイアウトを設定する方法](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)についての説明や
[AMP HTML レイアウト システムの仕様](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)のページをご覧ください。

**注:** レイアウトを指定せず、
`width` 値と `height` 値も指定しない場合、
レイアウトはデフォルト値の CONTAINER に設定されます。
AMP タグで CONTAINER がサポートされていないと、
検証ツールはエラーを返します。
その場合は、CONTAINER 以外のレイアウトを指定するか、
`width` 値または `height` 値、あるいはその両方を追加すればエラーは解消されます。

### 暗黙的レイアウトで属性が許可されていない

<table>
    </tr>
    <td class="col-thirty"><strong>コード</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>形式</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>修正方法</strong></td>
    <td>許可されていない属性をタグから削除するか、
      その属性を使用できるレイアウトを指定します。</td>
  </tr>
</table>

このエラーは、AMP タグのレイアウトが指定されておらず、
許可されていない属性が暗黙的レイアウトに含まれている場合に発生します。
[AMP HTML レイアウト システムの仕様](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)に、
許可されていない属性がレイアウト タイプ別に記載されています。

### 指定されたレイアウトが AMP タグでサポートされていない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>タグでサポートされているレイアウトを指定します。</td>
  </tr>
</table>

このエラーは、タグに指定されたレイアウトが
サポートされていない場合に発生します。
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)で
タグの `supported_layout` の値を確認してください。

実際のレイアウトの動作は `layout` 属性によって決まります。
レイアウトが機能する仕組みについては、
[レイアウトを設定する方法](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)についての説明や
[AMP HTML レイアウト システムの仕様](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)のページをご覧ください。

### 指定されたレイアウトで属性が許可されていない

<table>
    </tr>
    <td class="col-thirty"><strong>コード</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>形式</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>修正方法</strong></td>
    <td>許可されていない属性をタグから削除するか、
      その属性を使用できるレイアウトを指定します。</td>
  </tr>
</table>

このエラーは、AMP タグのレイアウトが指定されていて、
そのレイアウトに許可されていない属性が含まれている場合に発生します。
[AMP HTML レイアウト システムの仕様](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md)に、
許可されていない属性がレイアウト タイプ別に記載されています。

### レイアウトで必要な属性の値が無効

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>属性の値を、指定された値に設定します。</td>
  </tr>
</table>

このエラーは、指定されたレイアウトの属性値が無効である場合に発生します。
このエラーの原因を把握するには、
[各レイアウトの動作](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute)を
よく理解する必要があります。

たとえば、レイアウトを `fixed-height` に設定し、
`height` と `width` の両方に数値を指定したとします。
`fixed-height` レイアウトで必要なのは `height` の値であり、
`width` 属性については、何も指定しないか、または `auto` に設定する必要があります。
そのため、検証ツールにより ATTR_VALUE_REQUIRED_BY_LAYOUT が返されます。

### 幅と高さの単位が一致していない

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>幅と高さの単位を同じにします。</td>
  </tr>
</table>

`layout=fixed` を例外として、
幅と高さの属性には同じ単位を使用する必要があります。
単位が異なる場合にこのエラーが発生します。

たとえば、`<amp-img src="" layout="responsive" width="42px" height="42rem">` と指定すると、
次のエラー メッセージが表示されます。

「タグ「[`amp-img`](../../../../documentation/components/reference/amp-img.md) の幅と高さの単位が一致していません。幅は「px」で指定されていますが、高さは「rem」で指定されています。」

## テンプレートのエラー

AMP ページにテンプレートの構文を含めることはできません。
ただし、テンプレートを含めるために
特別に設計された AMP タグ
（たとえば [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md)）内にあるテンプレートの構文は例外です。

ソースファイルから生成された出力にテンプレートが含まれなければ、
ソースファイルにテンプレートを追加してもかまいません
（
[CSS プリプロセッサの使用](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors)についての説明もご覧ください）。

### テンプレートの構文が属性に含まれている

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>属性から Mustache テンプレートの構文を削除します。</td>
  </tr>
</table>

このエラーは、属性値内に
[Mustache テンプレートの構文](https://mustache.github.io/mustache.5.html)
が見つかった場合に発生します。

### エスケープされていないテンプレートの構文が属性に含まれている

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>Mustache テンプレートをエスケープします。</td>
  </tr>
</table>

このエラーは、属性値内に
[エスケープされていない Mustache テンプレートの構文](https://mustache.github.io/mustache.5.html)
が見つかった場合に発生します。

### テンプレートのパーシャルが属性に含まれている

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>Mustache のパーシャルを削除します。</td>
  </tr>
</table>

このエラーは、属性値内に
[Mustache のパーシャル](https://mustache.github.io/mustache.5.html)
が見つかった場合に発生します。

## サポート終了によるエラー

### サポートが終了したタグ

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DEPRECATED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>サポートが終了したタグを削除します。</td>
  </tr>
</table>

この警告は、以前有効だった AMP タグが AMP ドキュメント内で検出されたときに表示されます。
これは単なる警告であり、警告付きのままでも AMP ドキュメントは引き続き有効です。
現在のところ、サポートが終了したタグは存在しません。この警告は、今後タグのサポートを終了するときのために予約されています。

### サポートが終了した属性

<table>
    </tr>
                <td class="col-thirty"><strong>コード</strong></td>
                <td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>形式</strong></td>
                <td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>修正方法</strong></td>
                <td>サポートが終了した属性を削除することをおすすめします。</td>
  </tr>
</table>

この警告は、以前有効だった AMP 属性が AMP ドキュメント内で検出されたときに表示されます。
これは単なる警告であり、警告付きのままでも AMP ドキュメントは引き続き有効です。

各 AMP タグについて、サポートが終了した属性を確認するには、
[AMP 検証ツールの仕様](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)
で `deprecation` を検索してください。
