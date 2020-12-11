---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: このコンポーネントにより、サイト運営者は LaterPay マイクロペイメント プラットフォームと簡単に統合できます。
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



このコンポーネントにより、サイト運営者は [LaterPay](https://www.laterpay.net) マイクロペイメント プラットフォームと簡単に統合できます。`amp-access-laterpay` は [amp-access](amp-access.md) をベースとしているため、amp-access は必須です。

<table>
  <tr>
    <td class="col-fourty"><strong>必要なスクリプト</strong></td>
    <td>
      <small>「amp-access-laterpay」、「amp-access」、「amp-analytics」のスクリプトが必要です。</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>例</strong></td>
    <td>AMP By Example の<a href="https://ampbyexample.com/components/amp-access-laterpay/">アノテーション付きの amp-access-laterpay</a> の例をご覧ください。</td>
  </tr>
</table>


## 動作 <a name="behavior"></a>

[LaterPay](https://laterpay.net) は、ユーザーが 2 回クリックするだけでオンライン コンテンツを購入できるマイクロペイメント プラットフォームです。購入したコンテンツにはすぐにアクセスできます。しかも、登録、個人データの入力、支払いを事前に行う必要はありません。ウェブサイトでの合計購入額が 5 ドルまたは 5 ユーロに達したときに初めて支払い義務が生じます。コンテンツ プロバイダは、個々の商品アイテムや、コンテンツへの定額アクセスや時間制限付きのアクセスを提供する時間パスを販売できます。

[Connector Script との統合](https://docs.laterpay.net/connector/)を通じて LaterPay を統合する場合、AMP ページでの統合は使用できません。`amp-access-laterpay` は Connector Script に似ており、同じような機能セットを備えていますが、AMP ページ用に作成されたものではありません。

また、`amp-access-laterpay` を単独の統合方法として使用するだけで、LaterPay でコンテンツを販売することができます。

`amp-access-laterpay` コンポーネントは、amp-access を内部で使用することで、amp-access と同じように動作できます。しかも、LaterPay サービスと組み合わせて使用できるように調整することができます。

amp-access と組み合わせて使用したい独自のペイウォール サービスを、同じページ上で LaterPay と[同時に使用することも可能](#using-amp-access-laterpay-together-with-amp-access)です。

`amp-access-laterpay` コンポーネントは LaterPay サービスと連携できるようにあらかじめ設定されているため、承認や Pingback の設定は不要です。ログインリンクを手動で設定する必要もありません。

サイト運営者の LaterPay アカウントで各種購入オプションを設定できます。また、コンポーネントで設定を取得して、使用可能な購入オプションのリストを作成することができます。

[LaterPay Connector](https://docs.laterpay.net/connector/configuration/) の設定方法と LaterPay の既存のフロントエンド統合に関するドキュメントを参照して、購入オプションの設定方法をご確認ください。

作成したリストは、サイト運営者の好みに合わせてスタイルを設定し、表示することができます。

また、このコンポーネントで[アクセス コンテンツ マークアップ](amp-access.md#access-content-markup)を使用して、コンテンツの表示と非表示を切り替えることができます。

## 設定 <a name="configuration"></a>

設定は amp-access に似ていますが、承認、Pingback、ログインリンクは必要ありません。

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

`laterpay` 設定オブジェクトでは以下の値を設定できます。

<table>
  <tr>
    <th class="col-fourty">プロパティ</th>
    <th class="col-twenty">値</th>
    <th class="col-fourty">説明</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>CSS セレクタ（<strong>必須</strong>）</td>
    <td>ページ内の要素（記事のタイトルを含む）を決定する CSS セレクタ。このプロパティにより、記事の購入ページにタイトルが表示され、ユーザーが購入内容を把握することができます。</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>識別子のカンマ区切りのリスト</td>
    <td>デフォルトでは、購入オプションとのマッチングに記事の URL が使用されますが、購入オプションの URL パスを指定する代わりに、LaterPay Connector の UI で記事 ID を設定し、<code>articleId</code> プロパティを使用することで、記事と購入オプションをマッチングさせることができます。
      <br>このプロパティは、記事の URL による購入オプションのマッチングでは柔軟性が不十分な場合に必要になります。<a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">LaterPay Connector() の設定ページ</a>で、このプロパティが役に立つシナリオの例をご確認ください。</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>動的な支払い設定用の JWT トークン</td>
        <td>このオプションを使用すると、利用可能な有料コンテンツの設定を含む署名済みの JSON ウェブトークンを指定できます。つまり、ページはめ込みの設定は、LaterPay のコネクタ管理インターフェースで手動で指定するのではなく、ページ内でプログラムによって生成したものを提供することができます。これは、多くの記事の一括購入を設定する場合に特に役立ちます。
          <br>このトークンの作成方法や、トークンで指定できるコンテンツについて詳しくは、LaterPay の <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT 有料コンテンツ API</a> のドキュメントで Connector Script との統合についてご確認ください。
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>文字列</td>
          <td>ロケールに適した価格形式のスタイルを定義します。</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>オブジェクト</td>
          <td>サイト運営者はこのプロパティを使用することで、生成した購入オプションのリスト内のテキストをカスタマイズまたはローカライズできます。詳しくは、<a href="#localization">ローカライズ</a>をご覧ください。</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>ブール値</td>
          <td>true の場合、承認プロセスが成功すると、ページが最上部までスクロールされます。このプロパティは、ダイアログの表示位置がページ内のかなり下にあり、ページに戻った後に現在のスクロール位置のせいでユーザーが混乱する可能性がある場合に便利です。</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>文字列</td>
          <td><a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">LaterPay の地域</a>（<code>eu</code> または <code>us</code>）を指定します。</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>ブール値</td>
          <td>サンドボックス モードを使用してサーバー設定をテストする場合にのみ指定する必要があります。また、AMP の<a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">開発モード</a>を使用する必要もあります。</td>
        </tr>
      </table>

## アクセス コンテンツ マークアップを使用して購入リストを表示する <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

アクセス コンテンツ マークアップは amp-access と同じように使用する必要があります。

ID が `amp-access-laterpay-dialog` に設定された要素では、ユーザーが記事へのアクセス権を持っていない場合、購入オプションのリストがレンダリングされます。このリストはスタイル設定が非常に基本的で、サイト運営者のページに統合されているようにカスタマイズできます。

デフォルトのスタイル設定を使用する場合は、`amp-access-laterpay` クラスを追加します。

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...article content...</p>
</div>

```

## スタイル設定 <a name="styling"></a>

生成されたマークアップの要素の一部に複数のクラスが適用されます。クラスが適用されていない要素は、CSS 要素セレクタで一義的に参照できます。

基本的なレイアウト CSS はすでに存在しますが、ページのデザインと一致するようにサイト運営者がスタイル設定することをおすすめします。

ダイアログ用に作成した構造は次のようになります。

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Purchase option title</span>
              <p class="amp-access-laterpay-description">Purchase option description</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... more list items for other purchase options ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Buy Now</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="…">I already bought this</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Optional, appears if footer locale message is defined.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## ローカライズ <a name="localization"></a>

購入オプションのダイアログに表示されるテキストは、LaterPay Connector の UI でサイト運営者が定義します。

その他のテキストは拡張コンポーネントの一部であり、設定オプションを使用して次のように変更およびローカライズできます。

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

以下のメッセージキーは翻訳またはカスタマイズできますが、元の意味と目的を保持する必要があります。

<table>
  <tr>
    <th class="col-fourty">キー</th>
    <th class="col-fourty">説明</th>
    <th>デフォルト値</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>オプションの購入ボタンに表示されるテキスト。後で支払うことができます。</td>
    <td>「Buy Now, Pay Later」</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>オプションの購入ボタンに表示されるテキスト。購入時に支払う必要があります。</td>
    <td>「Buy Now」</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>オプションが選択される前に購入ボタンに表示されるデフォルトのテキスト。</td>
    <td>「Buy Now」</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>ユーザーが以前に記事を購入したが、Cookie を消去してしまった場合（または別のデバイスを使用している場合）、このリンクを使用して LaterPay にログインし、購入情報を取得できます。</td>
    <td>「I already bought this」</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>オプションのヘッダー テキスト。</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>オプションのフッター テキスト。</td>
    <td></td>
  </tr>
</table>

## アナリティクス <a name="analytics"></a>

`amp-access-laterpay` は `amp-access` をベースとしているため、`amp-access` から送信された[アナリティクス イベント](amp-access.md#integration-with-amp-analytics)をすべてサポートします。

実際のページの詳細な例については、[https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) をご覧ください。この例は、アナリティクス イベントを送信するように設定されています。

## amp-access-laterpay と amp-access を同時に使用する <a name="using-amp-access-laterpay-together-with-amp-access"></a>

既存のサブスクリプション システムがあり、LaterPay を個々の記事の販売用にのみ使用する予定の場合は、amp-access と amp-access-laterpay を同時に使用して、同一ページ内に両方の販売方法を共存させることができます。

まず、[amp-access](amp-access.md) のドキュメントを参照して、既存のペイウォールで amp-access を設定する方法を確認してください。

[複数のプロバイダ](amp-access.md#multiple-access-providers)のセクションで、名前空間を使用して複数のプロバイダを設定する方法が説明されています。

LaterPay と既存のペイウォールを統合して使用する場合、次のような設定が必要になります。

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

一方、アクセス コンテンツ マークアップは次のようになります。

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

詳細な例については、[https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html) をご覧ください。

## 関連ドキュメント <a name="related-documentation"></a>

* [amp-access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: マイクロペイメントの使用方法](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html): amp-access-laterpay に似ていますが、非 AMP ページが対象です。

## 検証 <a name="validation"></a>

AMP 検証ツールの仕様で [amp-access-laterpay のルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii)をご確認ください。
