---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: 共有トラッキング機能を開発中です。
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



ソーシャル共有ボタンを表示します。


<table>
  <tr>
    <td class="col-fourty"><strong>必須のスクリプト</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>container、fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>例</strong></td>
    <td>AMP By Example の <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share サンプル</a>をご覧ください。</td>
  </tr>
</table>

## 概要 <a name="overview"></a>

`amp-social-share` コンポーネントは、さまざまなソーシャル プラットフォーム プロバイダに対応するソーシャル共有ボタンを表示します。

## 例 <a name="examples"></a>

**例: 基本的なソーシャル共有ボタン**

事前設定済みのプロバイダの場合、共有ボタンは、推測に基づいて一部のデフォルト値を設定します。その際、現在のドキュメントの正規 URL が、共有する URL として想定され、そのページタイトルが、共有するテキストとして想定されます。

```html
<amp-social-share type="twitter"></amp-social-share>
```

**例: パラメータを渡す**

パラメータを共有エンドポイントに渡す場合、その共有エンドポイントに付加する `data-param-<attribute>` を指定できます。
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn は事前設定済みプロバイダの 1 つであるため、`data-share-endpoint` 属性を指定する必要はありません。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type（必須）</strong></td>
    <td>プロバイダのタイプを選択します。この属性は、事前設定済みプロバイダの場合でも、未設定プロバイダの場合でも必須です。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>ターゲットをどこに開くのかを指定します。デフォルトは <code>&#95;blank</code> ですが、iOS 上のメールと SMS の場合に限り、例外的に <code>&#95;top</code> がデフォルトになります。
        メールの場合に限り、この属性を使用してオーバーライドすることをおすすめします。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td><strong>未設定プロバイダの場合、この属性は必須</strong>です。
        <br>広く利用されている一部のプロバイダの場合は、共有エンドポイントが事前に設定済みになっています。詳細については、<a href="#pre-configured-providers">事前設定済みプロバイダ</a>をご覧ください。未設定プロバイダの場合は、共有エンドポイントを指定する必要があります。</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td><code>data-param-*</code> というサフィックスの付いた属性はすべて URL パラメータに変換され、共有エンドポイントに渡されます。</td>
        </tr>
      </table>

## 事前設定済みプロバイダ <a name="pre-configured-providers"></a>

`amp-social-share` コンポーネントには、[さまざまな事前設定済みプロバイダ](0.1/amp-social-share-config.js)が用意されており、共有エンドポイントや一部のデフォルト パラメータがあらかじめ設定されています。

<table>
  <tr>
    <th class="col-twenty">プロバイダ</th>
    <th class="col-twenty">タイプ</th>
    <th>パラメータ</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Share API</a>（OS 共有ダイアログをトリガー）</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: （省略可）デフォルトは現在のページタイトル。</li>
        <li><code>data-mode</code>: （省略可）<code>replace</code> に設定すると、他の共有オプションはすべて削除されます。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>メール</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: （省略可）デフォルトは現在のページタイトル。</li>
        <li><code>data-param-body</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-recipient</code>: （省略可）デフォルトは「」（空の文字列）。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: （<strong>必須</strong>）デフォルトはなし。このパラメータは Facebook の <code>app_id</code> です。<a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">Facebook シェア ダイアログ</a>に必須です。</li>
        <li><code>data-param-href</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-quote</code>: （省略可）引用やテキストの共有に使用できます。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: （省略可、ただし強く推奨）デフォルトはなし。Pinterest で共有するメディアの URL。設定しなかった場合、Pinterest からエンドユーザーに、メディアをアップロードするようにリクエストがあります。</li>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-description</code>: （省略可）デフォルトは現在のページタイトル。</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Google+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-text</code>: （省略可）デフォルトは現在のページタイトル。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-text</code>: （省略可）デフォルトは現在のページタイトル。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: （省略可）デフォルトは「現在のページタイトル - 現在のページ URL」。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: （省略可）デフォルトは「<code>rel=canonical</code> URL」。</li>
        <li><code>data-param-text</code>: （省略可）デフォルトは現在のページタイトル。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: （省略可）デフォルトは「<code>rel=title - rel=canonical</code> URL」。</li></ul>
      </td>
    </tr>
  </table>

## 未設定プロバイダ <a name="non-configured-providers"></a>

事前設定済みプロバイダ以外でも、`amp-social-share` コンポーネント内に追加の属性を指定することで、未設定プロバイダを使用することができます。

**例: 未設定プロバイダ用の共有ボタンを作成する**

以下の例では、Facebook Messenger 用の共有ボタンを作成するため、`data-share-endpoint` 属性に対して Facebook Messenger カスタム プロトコル用の適切なエンドポイントを設定しています。

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

未設定プロバイダは事前に設定されていないため、各プロバイダに適したボタンの画像とスタイルを作成する必要があります。

## スタイル <a name="styles"></a>

### デフォルト スタイル <a name="default-styles"></a>

`amp-social-share` には、広く利用されているプロバイダ用の設定が、デフォルト値としてあらかじめ用意されています。事前設定済みプロバイダ用のボタンは、そのプロバイダの正式な色とロゴでスタイルが設定されています。デフォルトの幅は 60 ピクセル、デフォルトの高さは 44 ピクセルです。

[tip type="success"]
AMP ページ内で使用できるスタイル設定済みのレスポンシブ共有リンクについては、[AMP Start](https://ampstart.com/components#links-and-sharing) をご覧ください。
[/tip]

### カスタム スタイル <a name="custom-styles"></a>

独自のスタイルを指定したい場合、次のように指定するだけで、事前定義済みのスタイル設定をオーバーライドできます。
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## 変数の置換 <a name="variable-substitution"></a>

`<amp-social-share>` 要素内で [AMP 変数グローバル置換](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)を使用することができます。以下の例の場合、`TITLE` がページタイトルに置換され、`CANONICAL_URL` がドキュメントの正規 URL に置換されます。

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-social-share ルール](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii)をご覧ください。
