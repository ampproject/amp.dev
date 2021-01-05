---
"$title": Signed Exchange を使った AMP の配信
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP は、キャッシュやプリロードのテクニックを使用して、AMP 形式が提供する以上の高速化を提供していますが、このようなメリットには、[AMP ビューア](https://developers.google.com/search/docs/guides/about-amp)に埋め込まれた場合にほかの URL が表示されるといった[欠点](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/)があります。Signed Exchange を使って AMP コンテンツを配信することで、このような欠点を克服する新しいウェブプラットフォーム機能を使用することができます。

[Signed Exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges) は、有効な AMP ドキュメントとコンテンツの元の URL で構成されています。この情報は、ドキュメントとその所有を主張する URL を安全に結びつける電子署名によって保護されています。このため、ブラウザは URL バーに、ブラウザにバイトを配信したマシンのホスト名の代わりに元の URL を安全に表示することができます。

Signed AMP コンテンツは、通常の AMP コンテンツと*ともに*（代わりにではなく）、配信されます。

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] この機能は、現在のところ Chrome でのみサポートされていますが、ほかのブラウザでの実装も予定されています。 [/tip]

# 私のコンテンツでも Signed Exchange は機能しますか？

Signed Exchange を実装するには、以下の要件を満たす必要があります。

- サーバーが生成する HTTP ヘッダーを構成して制御できること。（Blogger などの最も純粋なウェブベースのホスティングソリューションは、Signed Exchange との*互換性がありません*。）
- [Go バイナリ](https://golang.org/doc/install)として、または [Docker VM](https://docs.docker.com/machine/get-started/) 内で [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) 実行するなどして AMP Signed Exchange を生成できること。
    - packager は、6 週間ごとに更新する必要があります。
- エッジ HTTP サーバーで、[Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) ヘッダーが `Accept` と `AMP-Cache-Transform` であり、同一の URL に対して異なるコンテンツを配信できること。
- `amppackager` を実行しているシステムは、以下の項目にネットワークリクエスト送信できる必要があります。
    - 証明書を発行する証明書発行機関
    - 署名する AMP ドキュメントをホストするサイト運営者のサーバー
    - AMP の現在のバージョンを取得する `cdn.ampproject.org`
- 永続的なストレージファイルシステムが、同一のデータセンターで実行している `amppackager` のインスタンス間で共有されていること。

# Signed Exchange の実装

以下は、AMP ドキュメントで Signed Exchange をサポートするために推奨される実装順です。

## サポートされている TLS 証明書を取得する

Signed Exchange を生成するには、`CanSignHttpExchanges` 拡張子の付いた TLS 証明書が必要です。2019 年 4 月現在、この拡張子の唯一のプロバイダは [DigiCert](https://www.digicert.com/) です（[詳細](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)）。

証明書を生成するために、証明書発行機関（CA）より、`openssl` で生成できる証明書署名リクエスト（CSR）が求められます。以下に、`ampbyexample.com` の CSR の例を示します。

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## 署名される URL を判断する

署名されるドキュメントを定義する URL パターンを作成する必要があります。パーソナライズされた情報などの機密コンテンツが署名されないようにし、誤解を招くまたは誤ったコンテンツを送信しないようにすることが重要です。

パフォーマンスの目的により、パッケージャには有効な AMP ドキュメントのみを入力として渡す必要があります。必要であれば無効な AMP ドキュメントが渡されることも構いませんが、すべてのトラフィックを packager を通じて送信しないようにする必要があります。

## ステージングサーバーへのパッケージャのデプロイ

本番に移行する前にセットアップが正しいことを確認するために、まず、ステージングサーバーに Signed Exchange をセットアップする必要があります。

[`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) を使用して Signed Exchange を生成することをお勧めしますが、これが本番環境に適合しない場合は、代わりにコマンドラインクライアントで [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) と [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange) を使用して、自分でコンテンツネゴシエーションと証明書管理タスクを処理することができます。

以下の手順は、`amppackager` を使用したデプロイに適用されます。

### 構成

[`amppackager`](https://github.com/ampproject/amppackager) の config ファイル（`amppkg.toml`）には **CertFile** と **KeyFile** が必要です。

**KeyFile** は秘密鍵（上記の例では `ampbyexample-packager.key`）で、以下の書式である必要があります（注意: 自分の秘密鍵を共有してはいけません。不注意に共有しないように保護してください！）

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

**CertFile** は公開証明書です。DigiCert が証明書を提供した場合は、DigiCert が提供したオリジン固有の証明書と `DigiCertCA.crt` ファイルを結合して、CertFile をさs九生することができます。

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### インストール

[サイトの `amppackager` をセットアップするには、こちら](https://github.com/ampproject/amppackager/blob/master/README.md)の手順を実行します。.

[tip type="read-on"] 必要なリクエストを `amppkg` にルーティングするために適用する必要のあるサーバー側の変更例については、[`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js)（`amp.dev` が使用）を参照してください。 [/tip]

### テスト

HTTP リクエストで使用されたときに、ステージングサイトが MIME タイプ `application/signed-exchange` のコンテンツでレスポンスするかどうかを確認します。たとえば、以下のように行います（`staging.example.com` をご利用のステージングサーバーに置き換えます）。

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

出力には、以下の行が含まれる必要があります。

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] リクエストの `v="1..100"` はプレースホルダです。まったく同じ値を使用しないでください。代わりに、[amppackager のインストール手順で説明されているように](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing)、`amp-cache-transform` ヘッダーが存在するかどうかのみを確認し、値は無視してください。 [/tip]

[tip type="important"] レスポンスに含まれる `v=b3` バージョン文字列は、2019 年 8 月現在のバージョンです。このバージョンは変化します。 [/tip]

レスポンスのバルクは、AMP ページ（プレーンテキスト）である必要があります。小さなバイナリヘッダーがあり、ページが 16 KB を超える場合は、全体に数バイトのバイナリが散りばめられます。

[`dump-signedexchange` ツール](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation)を使用すると、レスポンスを検査できます。

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

（必要な証明書は `https://example.com/` サーバー上にないため、この時点では `-verify` スイッチは機能しません。）

レスポンスに*必ず* `Vary` ヘッダーと値 `Accept,AMP-Cache-Transform` が含まれていることを確認してください（MIME タイプが `text/html`、 `application/signed-exchange`、またはほかのものであることには関係ありません）。

```sh
$ curl -si https://staging.example.com/ | less
```

この出力には、以下の行が含まれる必要があります。

```txt
vary: Accept,AMP-Cache-Transform
```

## 本番へのパッケージャのデプロイ

### インストール

本番環境に合わせて、上記のステージングデプロイ手順を調整します。

### テスト

#### コマンドラインツールを使用する

上記と同じテストを実行します。ここでは、`dump-signedexchange -verify` に成功するはずです。

#### Chrome を使用する

[ModHeader 拡張機能](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)を使って、Chrome でもテストすることができます。Chrome Webstore から拡張機能をインストールし、`Request Headers` を `google` の `Value` で `amp-cache-transform` に設定します。

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

`https://example.com/` をリクエストすると、サーバーは Signed Exchange を配信しますが、その見た目と動作は前と同じままです。Signed Exchange が正しく戻されているかどうかは、[ DevTools コンソール](https://developers.google.com/web/tools/chrome-devtools/)で確認する必要があります。

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

`Network` タブにあるドメイン名をクリックし、`Signed HTTP exchange` が `Preview` の下に表示されることを確認します。

#### Google AMP キャッシュを使用する

Signed Exchange が Google AMP キャッシュと互換していることを確認します。これは、Google 検索などの検索エンジンにおける検出可能性に関係します。

Google AMP キャッシュで Signed Exchange をテストするには、DevTools の Network タブを開き、`Preserve log` を有効化してから `https://example-com.cdn.ampproject.org/wp/s/example.com/` などの URL にアクセスします。

DevTools は、`signed-exchange` 行と、リクエストが成功した場合は `from signed-exchange` 行に `200` を示します。

失敗した場合、signed-exchange 行は表示されないか、赤色でハイライト表示されます。`warning` ヘッダーも表示される場合があり、そこで追加情報を得ることができます。

## Google 検索での Signed Exchange

AMP ページが Signed Exchange として正しく配布されている場合、検索結果には、前と同様に AMP の稲妻が表示されますが、結果を開くと、URL バーには `https://www.google.com/amp/….` で始まる URL の代わりに `https://example.com` が表示されます。また、<code>viewer</code> バーも表示されません。

DevTools コンソールの `Network` タブで、`type` 列の下に `signed-exchange` が表示されます。

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Signed Exchange サービスプロバイダ

以下は、すぐに使用できる Signed Exchange サポートを提供している CDN とホスティングプロバイダのリストです。いずれかを使用することで、Signed Exchange を簡単に使用することができます。

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) は、Signed Exchange を使って AMP を配信することで、AMP URL を改善するツールです。詳細については、[AMP ブログ](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/) をお読みください。
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/): [Cloudflare](https://www.cloudflare.com/) は、世界最大規模のネットワークです。今日、企業、非営利団体、ブロガー、およびインターネットプレゼンスのある誰もが、Cloudflare のおかげで、より高速で安全なウェブサイトとアプリの提供を実現しています。
