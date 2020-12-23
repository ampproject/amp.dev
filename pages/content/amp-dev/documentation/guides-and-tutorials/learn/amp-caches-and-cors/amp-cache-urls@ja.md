---
"$title": AMP キャッシュ URL 形式とリクエスト処理
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

このドキュメントでは、AMP キャッシュの URL 形式とリクエストの処理方法について学習します。

## URL 形式

Google AMP キャッシュは、可能な場合、各 AMP ドキュメントのドメインを [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) から UTF-8 に変換して、サブドメインを作成します。キャッシュは、すべての `-`（ダッシュ）を `--`（2 つのダッシュ）に置き換え、すべての `.`（ドット）を `-`（ダッシュ）に置き換えます。たとえば、`pub.com` は、`pub-com.cdn.ampproject.org` にマッピングします。

この URL 換算式を使用することで、URL を AMP キャッシュバージョンに変換することができます。

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) モジュールを使用すると、URL をオリジンから AMP キャッシュの URL 形式に変換することができます。 [/tip]

このドキュメントでは、以下の内容を説明します。

- AMP キャッシュの URL 構造。
- URL が AMP キャッシュでどのように表示されるかを予測する方法。
- AMP キャッシュのオリジンのヘッダーを反転して、サイト運営者のドメインが何であったかを判定する方法。

## ドメイン名プロトコル

AMP キャッシュのすべてのドキュメントは、https プロトコルを使用します。

## ドメイン名接尾辞

すべての AMP キャッシュは JSON ファイルで登録されており、[AMPHTML リポジトリ](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json)にあります。このファイルで使用されるサンプルのキャッシュレコードは、以下のようになっています。

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

AMP キャッシュは、`cacheDomain` に指定されたドメインに関するレコードを提供します。この場合、ドメインは `cdn.ampproject.org` です。

このドキュメントは、例として `cdn.ampproject.org` の付いた URL を使用しますが、ほかのキャッシュは通常似たような URL 構造を使用しています。

## ドメイン名接頭辞

AMP キャッシュは、`example-com.cdn.ampproject.org` のように変更された URL でドキュメントを提供します。この例の元のドメイン名の最初のドット付きのコンポーネント `example.com` は `example-com` に変換されます。このドキュメントでは、このドットを使用していない文字列 `example-com` を「ドメイン接頭辞」と呼びます。この変換を実行するアルゴリズムについては、以下を参照してください。

以下に示す https（TLS）証明書 [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1) の制限により、この接頭辞には、`example.com.cdn.ampproject.org` のように複数のドット付きコンポーネントが使用されません。

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

サイト運営者のドメインには 255 文字まで使用でき、各ドメイン接頭辞は 63 文字までに制限されています。これは、以下に示す [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) で定められています。

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

すべてのサイト運営者のドメインは、一意のドメイン接頭辞にマッピングされています。これを行うアルゴリズムによって、人間が解読できるマッピングが作られようとしますが、それが長すぎる場合、また以下に示される内容に該当する場合には、サイト運営者のドメインのマッピングは安全なハッシングに戻されます。

### 基本的なアルゴリズム

サイト運営者のドメインをドメイン接頭辞に変換する基本的なアルゴリズムは、以下の通りです。

1. サイト運営者のドメインを Punycode 変換します。[RFC 3492](https://tools.ietf.org/html/rfc3492) を参照してください。
2. 手順 1 の出力に含まれるすべての "`-`"（ハイフン）文字を "`--`"（2 つのハイフン）に置き換えます。
3. 手順 2 の出力に含まれるすべての "`.`"（ドット）文字を "`-`"（ハイフン）に置き換えます。
4. 手順 3 の出力の位置 3 と 4 の両方に "`-`"（ハイフン）が含まれる場合は、手順 3 の出力に、接頭辞 "`0-`" を追加して、接尾辞 "`-0`" を追加します。この背景については、[#26205](https://github.com/ampproject/amphtml/issues/26205) を参照してください。
5. 手順 3 の出力を Punycode 逆変換します。[RFC 3492](https://tools.ietf.org/html/rfc3492) を参照してください。

以下に、基本的なアルゴリズムの例をいくつか示します。

<table>
  <tr>
   <td>
<strong>サイト運営者のドメイン</strong>
   </td>
   <td>
<strong>ドメイン接頭辞</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)    </td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)    </td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

基本的なアルゴリズムを実行した後に、ドメイン接頭辞が有効な DNS ラベルでない場合に限り、以下に示すフォールバックアルゴリズムを実行します。

ドメイン接頭辞が 63 文字を超えている場合は、有効な DNS ラベルではありません。

### フォールバックアルゴリズム

サイト運営者のドメインをドメイン接頭辞に変換するフォールバックアルゴリズムは、以下の通りです。

1. SHA256 を使用して、サイト運営者のドメインをハッシュ化します。
2. 手順 1 の出力を Base32 でエスケープ処理します。
3. 手順 2 の出力の最後の 4 文字を削除します。これは必ず `=`（等号）文字です。

フォールバックアルゴリズムは、次のように `-`（ハイフン）を使用しない 52 文字の文字列を生成します: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

### 組み合わせたアルゴリズム

組み合わせたアルゴリズムでは、次のように行われます。

1. 基本アルゴリズムを実行します。出力が有効な DNS ラベルである場合は、`example-com.cdn.ampproject.org` のようにキャッシュドメイン接尾辞をアペンドして返します。そうでない場合は、手順 2 に進みます。
2. フォールバックアルゴリズムを実行します。`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org` のように、キャッシュドメイン接尾辞をアペンドして返します。

## URL パス

AMP キャッシュの URL の “path” は必ず、`/c` などの 1 つ以上の接頭辞ディレクトリの後に、サイト運営者の URL が http`s` である場合に限り、中置の `/s` が続き、さらにプロトコルを除いたサイト運営者ドキュメントの URL が続く構成です。

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='キャッシュの URL 形式を表示する画像') }}

`/c` などの接頭辞ディレクトリは、AMP キャッシュが実行するさまざまな配信の種類に対応します。AMP キャッシュがサポートする配信の種類はそれぞれに異なりますが、以下はその一部です。

- `/c` - コンテンツ（<strong>C</strong>ontent）: インターフェースで直接リンクされている可能性のあるスタンドアロンページとして配信される AMP ドキュメントです。
- `/v` - ビューア（<strong>V</strong>iewer）: AMP ドキュメントも含まれますが、検索結果ページやその他のインターフェースのコンテキストで AMP ドキュメントを表示するフレーム環境である [AMP ビューア](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer)に配信されます。
- `/wp` - ウェブパッケージ（<strong>W</strong>eb <strong>P</strong>ackage）: ウェブパッケージ技術の [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) として AMP ドキュメントを配信します。これらの URL はサイト運営者の独自のオリジンへのリダイレクトとして動作します。
- `/cert` - 証明書（<strong>Cert</strong>ificate）: [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) と使用する公開証明書です。
- `/i` - 画像（<strong>I</strong>mage）: 通常、ドキュメントサブリソースとして AMP キャッシュが配信する画像です。
- `/ii` - 画像（<strong>I</strong>mage）: これも AMP キャッシュが配信する画像ですが、通常、ドキュメントが要求している maximum-width を指定する `/ii/w800` などのcache-configuring パラメータと組み合わされることができます。キャッシュは、ブラウザの帯域幅を節約するために、異なるスケールの画像を生成できます。

さらに、AMP キャッシュは、サイト運営者のドキュメントクエリの一部ではない特別なクエリパラメータをドキュメント URL にアペンドすることがあります。たとえば、[`<amp-live-list>`](../../../components/reference/amp-live-list.md) は、パラメータ `amp_latest_update_time<` をしよしてドキュメントをフェッチすることで、リクエストを再読み込みします。これらのパラm-恵田は、ドキュメントがクロールされる際にオリジンに渡されませんが、AMP キャッシュへのリクエストを構成するためにのみ存在します。

## CORS オリジン

多くのサイト運営者は、AMP ドキュメントの CORS リクエストを使用して追加データを取得します。CORS リクエストは、リクエストを発行するドキュメントのオリジンを指定するリクエストの `Origin:` HTTP ヘッダーを送信することで機能します。上記に示したように、ドキュメントのオリジンは、AMP キャッシュと元のドキュメントでは異なります。上記のドメイン名セクションでは、サイト運営者の URL が指定された AMP キャッシュ URL のオリジンを判定するアルゴリズムを示しました。以下では、CORS `Origin:` リクエストヘッダーを元のサイト運営者のドメインに戻すアルゴリズムを示します。

### AMP キャッシュのオリジンからサイト運営者のドメインへの変換

AMP キャッシュの Origin ヘッダーの値は、以下のいずれかの形態です。

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

まず、プロトコル接頭辞（`https://`）と AMP キャッシュのドメイン接尾辞（`.cdn.ampproject.org` など）を取り除きます。この接尾辞は、[caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json) に記載されるキャッシュのいずれかの場合があります。残りの文字列が「ドメイン接頭辞」となりますが、上記の 2 つの例の場合の「ドメイン接頭辞」は、以下のようになります。

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

次に、「ドメイン接頭辞」に少なくとも 1 つの ‘`-`’（ハイフン）が含まれていないかを確認します。 ハイフンが 1 つ以上含まれているのが通例です。「ドメイン接頭辞」に ‘`-`’（ハイフン）が含まれていない場合、AMP キャッシュ Origin を直接逆変換できないため、その場合は、可能性のあるサイト運営者ドメインをわかっている場合は、このドキュメントの上の方で説明したドメイン名アルゴリズムを使用して、一連の AMP キャッシュ Origin を作成できます。その後で、その固定セットに照らし合わせて確認することができます。

アルゴリズムの残りの部分では、「ドメイン接頭辞」に 1 つ以上の ‘`-`’（ハイフン）が含まれていることを前提としています。

1. ドメイン接頭辞が `xn--` で始まる場合、punycode は「ドメイン接頭辞」を変換します。たとえば、`xn---com-p33b41770a` は `⚡😊-com` となります。Punycode については、[RFC 3492](https://tools.ietf.org/html/rfc3492) を参照してください。
2. ドメイン接頭辞が "`0-`" で始まり、"`-0`" で終わる場合は、"`0-`" 接頭辞と "-0" 接尾辞の両方を削除します。
3. 手順 2 で得た文字出力を順にイテレートし、見つかるたびに置き換えていきます。"`-`"（ハイフン）が見つかったら、その次の文字を確認します。それが "`-`"（ハイフン）である場合は、その両方を単一の "`-`"（ハイフン）に置き換え、ハイフン以外の文字である場合は、現在の単一の "`-`"（ハイフン）のみを "`.`"（ドット）に置き換えます。`a--b-example-com` の場合、これは、`a-b.example.com` となります。
4. 手順 3 の結果を Punycode 逆変換します。Punycode については、[RFC 3492](https://tools.ietf.org/html/rfc3492) を参照してください。

手順 4 の結果がサイト運営者のドメインとなります。プロトコルはドメイン自体からはわかりませんが、`http` か `https` のいずれかです。ポートは常にプロトコルのデフォルトです。

## リダイレクトとエラー処理

以下に、AMP キャッシュがリダイレクトとエラーをどのように処理するかの例をいくつか示します。

**リダイレクト**

AMP キャッシュは、AMP URL を解決する際にリダイレクトに従います。たとえば、URL が、以下のように、別の AMP URL にリダイレクトするとします。

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

AMP キャッシュは、元の URL で解決されたリダイレクトを返します。

例: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

重要: サーバーの AMP ファイルの場所を移動する場合は、古い場所から新しい場所へのリダイレクトを必ず設定してください。

**見つかりません**

AMP キャッシュでページが見つからない場合、エラーページを表示し、404 ステータスを返します。

例: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**無効な AMP**

ページが無効な AMP である場合、AMP キャッシュは正規のページにリダイレクトします。

例: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**サーバーエラー**

URL が 500 番台のサーバーエラーを返す場合、AMP キャッシュは 404 ステータスを返します。

例: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
