---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: ページビューをカウントするトラッキング ピクセルです。
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




<table>
  <tr>
    <td class="col-fourty"><strong>説明</strong></td>
    <td>ページビューをカウントする一般的なトラッキング ピクセルとして使用できます。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fixed、nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-pixel/">amp-pixel サンプル</a>をご覧ください。</td>
  </tr>
</table>

## 動作 <a name="behavior"></a>

`amp-pixel` コンポーネントは、シンプルなトラッキング ピクセル `img` と同じように機能します。単一の URL を取りますが、リクエストの作成時に URL 文字列内のコンポーネントで置き換えられる変数を備えています。詳細については、[置換](#substitutions)をご覧ください。

以下の基本的な例の場合、`amp-pixel` は、指定 URL に対してシンプルな GET リクエストを発行し、結果を無視します。

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

  [tip type="note"]
アナリティクス リクエストのリファラー ヘッダー内の AMP URL を処理する際は、`usqp` パラメータを削除するか無視します。このパラメータは、Google が Google AMP キャッシュのテストをトリガーする際に使用されます。
[/tip]

## 属性 <a name="attributes"></a>

##### src（必須） <a name="src-required"></a>

リモート エンドポイントへのシンプルな URL。`https` プロトコルの必要があります。

##### referrerpolicy（省略可） <a name="referrerpolicy-optional"></a>

この属性は、`<img>` の `referrerpolicy` 属性と似ていますが、使用できる値は `no-referrer` だけに限られています。`referrerpolicy=no-referrer` が指定されている場合、HTTP リクエストから `referrer` ヘッダーが削除されます。

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img（省略可） <a name="allow-ssr-img-optional"></a>

AMP4ADS クリエイティブ内で使用されるこの属性は、検証後の変換の一環として、img 要素を amp-pixel 要素内に直接配置し、AMP ランタイム フェッチ / 実行と並行して ping を送信できるようにします。つまり、URL 内のマクロは展開されません。src 内にマクロが存在しない場合に限り、この属性を使用するようにしてください。

##### 共通の属性 <a name="common-attributes"></a>

この要素には、AMP コンポーネントに拡張された[共通の属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)が含まれます。

## 置換 <a name="substitutions"></a>

`amp-pixel` では、標準的な URL 変数置換がすべて許可されています。詳細については、[置換ガイド](https://github.com/ampproject/amphtml/blob/master/extensions/spec/amp-var-substitutions.md)をご覧ください。

以下の例の場合、インプレッションごとに RANDOM 値がランダムに生成され、`https://foo.com/pixel?0.8390278471201` といった URL に対してリクエストが作成されます。

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## スタイル設定 <a name="styling"></a>

`amp-pixel` にはスタイルを設定しないでください。

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-pixel ルール](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)をご覧ください。
