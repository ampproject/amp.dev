---
$title: amp-addthis
$category@: social
teaser:
  text: AddThis の埋め込みウェブサイト ツールを表示します。
---


<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



[AddThis](https://www.addthis.com) の埋め込みウェブサイト ツールを表示します。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
</table>


## AddThis を使用する理由 <a name="why-addthis"></a>

`amp-addthis` コンポーネントは、シンプルで美しい共有ボタンを実現します。これにより、ウェブサイト ユーザーは、メッセンジャーや、WhatsApp、Facebook、Twitter、Pinterest など、200 を超えるソーシャル チャネルに簡単にコンテンツを共有することができます。

AddThis は、1,500 万以上のウェブサイトで利用されている信頼できるツールであり、全世界で 20 億人以上のユニーク ユーザーが 60 以上の言語でコンテンツを共有しています。

## 共有ボタン <a name="share-buttons"></a>

### フローティング <a name="floating"></a>

ページの左右や上下に配置可能で、閲覧者が画面をスクロールすると、一緒に移動します。それほど強引にならずに、共有を促進する優れた方法です。

例:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### インライン <a name="inline"></a>

共有ボタンをコンテンツに統合することで、シームレスな共有機能を実現できます。

例:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>ログインすると、<a href="https://addthis.com/dashboard">AddThis ダッシュボード</a>の URL 内に AddThis サイト運営者 ID が表示されます。たとえば、URL が <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code> の場合、<code>ra-5c191331410932ff</code> がサイト運営者 ID になります。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>表示するツールの AddThis ウィジェット ID。<a href="https://addthis.com/dashboard">AddThis ダッシュボード</a>にも表示されます。特定のツールのウィジェット ID は、AddThis ダッシュボード内でそのツールを開き、URL の最後の部分をコピーすることで確認できます。たとえば、URL が <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code> の場合、<code>957l</code> がウィジェット ID になります。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>ウィジェットのタイプを示す属性。
      <ul>
        <li>フローティング: <code>data-widget-type="floating"</code></li>
        <li>インライン: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>（省略可）この属性を設定した場合、共有の発生時に AddThis ツールが共有を試みるタイトルになります。設定しなかった場合、<code>amp-addthis</code> タグを格納しているドキュメントのタイトルが使用されます。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>（省略可）この属性を設定した場合、共有の発生時に AddThis ツールが共有を試みる URL になります。設定しなかった場合、<code>amp-addthis</code> タグを格納しているドキュメントの <code>location.href</code> プロパティが使用されます。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>（省略可）この属性を設定した場合、共有の発生時に AddThis ツールが共有を試みるメディア（画像や動画）の URL になります。設定しなかった場合、未定義のままになります。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>（省略可）この属性を設定した場合、共有の発生時に AddThis ツールが共有を試みるページの説明になります。設定しなかった場合、未定義のままになります。</td>
    </tr>
  </table>

## 実装に関するドキュメント <a name="implementation-documentation"></a>

1. まだ AddThis アカウントを持っていない場合は、[https://www.addthis.com/register](https://www.addthis.com/register) でアカウントを作成する必要があります。AddThis アカウントの作成は完全に無料で、包括的なウェブサイト ツールや詳細な分析レポートを利用して、サイトのソーシャル トラフィックを把握することができます。
1. [ダッシュボード](https://addthis.com/dashboard)に移動して、共有ボタンをカスタマイズします（現在のところ、AMP がサポートしているのは、フローティング共有ボタンとインライン共有ボタンだけに限られます）。
1. 共有ボタンを自由にカスタマイズして、[Activate Tool] をクリックします。[Get The Code] ページにリダイレクトされます。
1. 最後に、インライン コードをコピーして、共有ボタンを表示するページの body セクションに貼り付けます。フローティング共有ボタンの場合、コードは body 内の任意の場所に配置できます（ツールの設定に応じて画面の左や右に自動的に表示されます）。

以上で設定は完了です。共有ボタンがページ上に表示されます。

詳細な手順については、[YouTube の動画](https://www.youtube.com/watch?v=BSkuAB4er2o)をご覧ください。
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-addthis ルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-addthis/validator-amp-addthis.protoascii)をご覧ください。

## プライバシー <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

AddThis ツールおよび AddThis ツールバーは、エンドユーザーがサイト運営者のサイトとインタラクションする際や、ツールバー ユーザーが AddThis ツールバーとインタラクションする際に使用するデバイスから情報（AddThis データ）を収集します。

主な AddThis データは次のとおりです。

* IP アドレス、モバイル広告 ID（MAID）（これにより、モバイルアプリ デベロッパーはモバイルアプリを使用しているユーザーを識別できます）、モバイルアプリ ID、ブラウザのタイプ、ブラウザの言語、オペレーティング システムのタイプ、エンドユーザーがサイト運営者サイトやツールバーにアクセスした日時。
* ツールバーを使用したユーザー。
* サイト運営者サイト上で行った操作（エンドユーザーがサイト運営者サイトに滞在した期間、エンドユーザーがサイト運営者サイト上で行ったコンテンツ共有操作、エンドユーザーがサイト運営者サイト上で行ったスクロール操作など」）。
* エンドユーザーがサイト運営者サイトの検索や移動に使用した参照元 URL やウェブ検索。
* ツールバー ユーザーが AddThis ツールバーの検索機能に入力したキーワード。ツールバー ユーザーが AddThis ツールバーをダウンロード、インストール、アンインストールした日時。
* エンドユーザーが AddThis ツールを使用する頻度や、ツールバー ユーザーが AddThis ツールバーを使用する頻度に関する情報。
* エンドユーザーやツールバー ユーザーの IP アドレスから取得した位置情報データ。

AddThis データは、該当する法律の求める範囲において、個人情報として扱われます。サイト運営者は、AddThis の利用規約に従い、エンドユーザーの同意と承認を取得し、エンドユーザーから Oracle に収集される AddThis データの規定に関して必要な通知を提供する必要があります。

## サポート <a name="support"></a>

AMP に AddThis を実装するうえで、ご質問がある場合やサポートが必要な場合は、[こちら](https://www.addthis.com/support/)からサポートチームへチケットをお送りいただくか、[help@addthis.com](mailto%3ahelp@addthis.com) までメールでお問い合わせください。
