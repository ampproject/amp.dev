---
'$title': AMP メールの構造とレンダリング
$order: 2
formats:
  - email
teaser:
  text: 'メールは '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

メールは MIME ツリーとして構造化されています。この MIME ツリーにはメッセージ本文とメールの添付ファイルが含まれます。

メール内に AMP を埋め込むには、コンテンツタイプ `text/x-amp-html` の新しい MIME パートを `multipart/alternative` の子孫として追加します。既存の `text/html` または `text/plain` パートとともに存在する必要があります。こうすることで、メールメッセージがすべてのクライアントで機能するようにすることができます。

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP for Email MIMEパーツ図" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

`multipart/alternative` サブタイプについての詳細は、[RFC 1521, section 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3) を参照してください。

## 追加情報 <a name="additional-information"></a>

`text/x-amp-html` パートは、`multipart/alternative` ノードにネストされている必要があります。メールには、`multipart/alternative` ノードの `text/x-amp-html` パートを 2 つ以上含めることはできません。

`multipart/alternative` には、`text/x-amp-html` ノードのほかに、1 つ以上の非 AMP（`text/plain` または `text/html`）ノードが必要です。これは、メールクライアントが AMP をサポートしない場合、またはユーザーがメールプロバイダの設定で AMP をオプトアウトしている場合に表示されます。

注意: 一部のメールクライアント[[1]](https://openradar.appspot.com/radar?id=6054696888303616) は最後の MIME パートのみをレンダリングするため、`text/x-amp-html` MIME パートを `text/html` MIME パートの*前*に配置することをお勧めします。

### 返信/転送のセマンティック <a name="replyingforwarding-semantics"></a>

メールクライアントは、ユーザーが AMP メールメッセージに返信またはそれを転送する際に、MIME ツリーから `text/x-amp-html` を取り除きます。

### 有効期限 <a name="expiry"></a>

30 日などのある一定の期間が過ぎると、メールクライアントはメールの AMP 部分を表示しなくなることがあります。この場合、メールは`text/html` または `text/plain` パートを表示するようになります。

## 例 <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html] From:  Person A [persona@example.com](mailto:persona@example.com) To: Person B [personb@example.com](mailto:personb@example.com) Subject: An AMP email! Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>

    <meta charset="utf-8">   <style amp4email-boilerplate="">body{visibility:hidden}</style>   <script async="" src="https://cdn.ampproject.org/v0.js"></script>   Hello World in AMP!   --001a114634ac3555ae05525685ae Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span> --001a114634ac3555ae05525685ae-- [/sourcecode]

<!-- prettier-ignore-end -->
