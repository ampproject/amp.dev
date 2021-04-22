---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: リモートで提供される設定ファイルを使用して、AMP ページに広告を動的に挿入します。
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



リモートで提供される設定ファイルを使用して、AMP ページに広告を動的に挿入します。

<table>
  <tr>
    <td class="col-fourty"><strong>提供状況</strong></td>
    <td>試験運用版</td>
  </tr>
  <tr>
    <td width="40%"><strong>必要なスクリプト</strong></td>
    <td>
    <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
    </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a>
        </strong>
      </td>
      <td>なし</td>
    </tr>
  </table>



## 動作

`amp-auto-ads` は、十分な数の有効なプレースメントが設定で指定されている場合、広告ネットワークで指定された一連の制約を遵守しながら、追加の広告を挿入しようとします。こうした制約により、以下が制限されます。

* 挿入可能な広告の総数
* 隣接する広告間の最小距離

また、広告が挿入される場所は、attemptChangeSize で定められているとおり、許容できないリフローを生じさせないページだけです。

`<amp-auto-ads>` タグは `<body>` の最初の子要素として配置する必要があります。

広告ネットワークのタイプと（広告ネットワークで必要な）その他の情報は、タグで指定する必要があります。
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## サポートされている広告ネットワーク <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [DoubleClick（試験運用版）](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)

## 属性

<table>
  <tr>
    <td width="40%"><strong>type（必須）</strong></td>
    <td>広告ネットワークの識別子。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>ほとんどの広告ネットワークには詳細な設定が必要です。この設定は、HTML の <code>data-</code> 属性を使用してネットワークに渡すことができます。パラメータ名は標準的なデータ属性に従い、キャメルケース変換されます。たとえば「data-foo-bar」は、広告に送信されると「fooBar」として設定されます。属性を使用できる<a href="#supported-ad-networks">広告ネットワーク</a>に関するドキュメントをご覧ください。</td>
  </tr>
  <tr>
    <td width="40%"><strong>共通の属性</strong></td>
    <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
  </tr>
</table>

## 設定の仕様

設定では、`<amp-auto-ads>` によって広告を配置できるページ上の場所を定義します。設定は、`ad-network-config.js` で定義されている URL の第三者広告ネットワークから取得されます。また、下記の [`ConfigObj`](#configobj) の定義と一致する、シリアル化された JSON オブジェクトである必要があります。

### 設定の例

以下の例では、ページの 3 番目の `<DIV id='domId'>` 内にあるすべての `<P class='paragraph'>` 要素の直後に広告を配置する必要があることが示されています。これらの位置のいずれかに配置された広告には、タイプ: BANNER、上の余白: 4 ピクセル、下の余白: 10 ピクセルを指定します。

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### オブジェクトの定義

#### ConfigObj <a name="configobj"></a>

設定オブジェクトで指定するフィールドは次のとおりです。

<table>
  <tr>
    <th class="col-thirty">フィールド名</th>
    <th class="col-thirty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>配列&lt;!PlacementObj&gt;</td>
    <td>広告を挿入できるページ上の場所を示す<strong>必須</strong>フィールド。</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>オブジェクト&lt;文字列, 文字列&gt;</td>
    <td>属性名から、この設定を使用して挿入されたすべての <code>&lt;amp-ad&gt;</code> 要素に適用する属性値へのマッピングを指定するオプション<em></em> フィールド。以下の属性名のみを指定できます。<ul>
      <li>type</li>
      <li>layout</li>
      <li>data-&ast;（任意のデータ属性）</li>
    </ul>
  </td>
</tr>
<tr>
  <td><code>adConstraints</code></td>
  <td>AdConstraintsObj</td>
  <td>ページ上に広告を掲載する場合に使用する必要がある制約を指定するオプション<em></em> フィールド。このフィールドを指定しないと、<code>amp-auto-ads</code> は、[ad-network-config.js]（0.1/ad-network-config.js）で指定されているデフォルトの制約を使用しようとします。
  </td>
</tr>
</table>

#### PlacementObj

`placements` 設定オブジェクトで指定するフィールドは次のとおりです。

<table>
  <tr>
    <th class="col-thirty">フィールド名</th>
    <th class="col-thirty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>プレースメントの位置が固定されているページでの要素の検索に使用する情報を提供する<strong>必須</strong>フィールド。
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>アンカー要素に対するプレースメントの相対的な位置を示す<strong>必須</strong>フィールド。</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>プレースメントのタイプを示す<strong>必須</strong>フィールド。</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>このプレースメントの位置に挿入された広告に適用する必要があるスタイル設定を示すオプション<em></em> フィールド。
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>オブジェクト<文字列, 文字列></td>
    <td>属性名から、このプレースメントを使用して挿入されたすべての <code>&lt;amp-ad&gt;</code> 要素に適用する属性の値へのマッピングを指定するオプション<em></em> フィールド。ここで指定した属性により、親の <code>ConfigObj</code> でも指定されている同じ名前の属性がすべてオーバーライドされます。以下の属性名のみを指定できます。<ul>
      <li>type</li>
      <li>layout</li>
      <li>data-&ast;（任意のデータ属性）</li>
    </ul>
  </td>
</tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

`anchor` 設定オブジェクトで指定するフィールドは次のとおりです。

<table>
  <tr>
    <th class="col-thirty">フィールド名</th>
    <th class="col-thirty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>文字列</td>
    <td>このレベルのアンカー定義で要素を選択するように CSS セレクタを定義する<strong>必須</strong>フィールド。
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>数値</td>
    <td>セレクタで選択された要素のインデックスを指定するオプション<em></em> フィールド。このレベルのアンカー定義はこのインデックスに制限されます。デフォルトでは、値は 0 に設定されます（<code>all</code> フィールドが false の場合）。</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>ブール値</td>
    <td><code>index</code> フィールドが指定されている場合は無視されます。<code>true</code> は、セレクタで選択されたすべての要素を含める必要があることを示します。そうでない場合は <code>false</code> に設定します。
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>数値</td>
    <td>要素に追加する textContent プロパティの最小長を指定するオプション<em></em> フィールド。デフォルト値は 0 です。</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>このレベルのアンカー定義で選択した任意の要素内で要素を選択する再帰 <code>AnchorObj</code> を指定するオプション<em></em> フィールド。
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

`style` 設定オブジェクトで指定するフィールドは次のとおりです。

<table>
  <tr>
    <th class="col-twenty">フィールド名</th>
    <th class="col-twenty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>数値</td>
    <td>この位置に挿入された広告に必要な上余白をピクセル数で指定するオプション<em></em> フィールド。デフォルト値は 0 です。
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>数値</td>
    <td>この位置に挿入された広告に必要な下余白をピクセル数で指定するオプション<em></em> フィールド。デフォルト値は 0 です。
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

`placements` 設定オブジェクトの `pos` フィールド用の ENUM 値は次のとおりです。

<table>
  <tr>
    <th class="col-fourty">名前</th>
    <th class="col-twenty">値</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>広告をアンカーの直前に兄弟として挿入する必要があります。</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>広告をアンカーの最初の子要素として挿入する必要があります。</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>広告をアンカーの最後の子要素として挿入する必要があります。</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>広告をアンカーの直後に兄弟として挿入する必要があります。</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

`placements` 設定オブジェクトの `type` フィールド用の ENUM 値は次のとおりです。

<table>
  <tr>
    <th class="col-fourty">名前</th>
    <th class="col-twenty">値</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>プレースメントによってバナー広告の位置を記述します。</td>
  </tr>
</table>

#### AdConstraintsObj

`adConstraints` 設定オブジェクトで指定するフィールドは次のとおりです。

<table>
  <tr>
    <th class="col-twenty">フィールド名</th>
    <th class="col-twenty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>文字列</td>
    <td>広告を挿入する際の、ページ上の既存の広告（手動で掲載した広告、または amp-auto-ads によって前に掲載された広告）との最小距離を示す<strong>必須</strong>フィールド。値は単位のプレフィックス付きの数値で表されます。たとえば、「10px」は 10 ピクセルを、「0.5vp」はビューポートの半分の高さを表します。負の値は無効です。サポートされている単位は次のとおりです。<ul>
      <li>px - ピクセル</li>
      <li>vp - ビューポートの高さの倍数</li>
    </ul>この値は、ページ上の既存の広告数が subsequentMinSpacing フィールドで指定された <code>adCount</code> マッチャーより少ない場合にのみ適用されます。
  </td>
</tr>
<tr>
  <td><code>subsequentMinSpacing</code></td>
  <td>配列&lt;!SubsequentMinSpacingObj&gt;</td>
  <td>ページ上の既存の広告数に基づいて広告の挿入時に適用する必要がある広告の間隔を指定するオプション<em></em> フィールド。
  </td>
</tr>
<tr>
  <td><code>maxAdCount</code></td>
  <td>数値</td>
  <td><code>amp-auto-ads</code> を使用した場合にページ上に表示できる広告の最大数を指定する<strong>必須</strong>フィールド。手動で掲載した広告と、<code>amp-auto-ads</code> によって掲載された広告の両方がカウントされます。たとえば、このフィールドが 5 に設定されていて、ページに手動で掲載した広告が 3 つある場合、<code>amp-auto-ads</code> によって 2 つの広告をさらに掲載できます。
  </td>
</tr>
</table>

#### SubsequentMinSpacingObj

`subsequentMinSpacing` 設定オブジェクトで指定するフィールド。`subsequentMinSpacing` のエントリを使用すると、追加の広告間に必要な間隔を、ページ上の既存の広告数に基づいて変更できます。例として、次のシナリオについて考えてみましょう。

* ページ上に既存の広告が 2 つある
* subsequentMinSpacing フィールドが次のように設定されている
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

初めは、ページ上の既存の広告数が 2 つのため、合致するマッピングはありません。そのため、最小間隔がデフォルトで `AdConstraints` オブジェクトの initialMinSpacing に設定されます。
`amp-auto-ads` は、`adContraints` の制約を破らずに使用できるプレースメントを使い果たすまで、広告を再帰的に掲載しようとします。`amp-auto-ads` が 1 つ目の広告を掲載した後、ページ上の広告は 3 つになります。`subsequentMinSpacing` に広告数が 3 つ（またはそれ以上）の場合のマッピングが設定されているため、最小間隔が 500 ピクセルになります。ページ上の広告数が 5 つになるまではこのマッピングが適用されます（広告数が 5 つの場合のルールも設定されているため）。6 つ目以降の広告を挿入する場合、他の広告との間隔を 1000 ピクセル以上にする必要があります。

<table>
  <tr>
    <th class="col-twenty">フィールド名</th>
    <th class="col-twenty">型</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>数値</td>
    <td><strong>必須</strong>フィールドです。ルールの適用のきっかけとなるページ上の広告数（より適合するルールが他にないことが前提）。詳しくは、上記の説明をご覧ください。
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>文字列</td>
    <td>このルールに合致する場合に <code>adCount</code> に基づいて適用される広告の最小間隔を指定する<strong>必須</strong>フィールド。値は単位のプレフィックス付きの数値で表されます。たとえば、「10px」は 10 ピクセルを、「0.5vp」はビューポートの半分の高さを表します。負の値は無効です。サポートされている単位は次のとおりです。<ul>
      <li>px - ピクセル</li>
      <li>vp - ビューポートの高さの倍数</li>
    </ul>
  </td>
</tr>
</table>

## 検証

AMP 検証ツールの仕様で [amp-auto-ads のルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii)をご確認ください。
