---
formats:
  - websites
'$title': クライアント側暗号化でサブスクリプションコンテンツを保護する
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: プレミアムサブスクライバ認証とコンテンツ解読をクライアント側に実装することで、コンテンツ暗号化の問題を解決します。このソリューションでは、プレミアムアクセスを持つユーザーが、新しいページの読み込みやバックエンドの応答を待機することなく、コンテンツを解読できるようになります。
author: CrystalOnScript
---

オンライン出版者は、サブスクライバを獲得することで収入を得ているため、[CSS 難読化](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce)（`display:none`）を使用して、ペイウォールの後ろにあるコンテンツをクライアントにブロックしている可能性があります。

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='ユーザーが認証されるまで、プレミアムコンテンツは非表示となる。') }}

残念ながら、これを回避するには、技術的な知識が必要です。

代わりに、プレミアムコンテンツを完全になくしたドキュメントをユーザーに表示するとどうでしょうか！バックエンドでユーザーを認証したら、新しいページ全体を配信するのです。より安全な方法ではありますが、これには時間、リソース、そしてユーザー満足度への悪影響があります。

そこで、これらの両方の問題を解決するために、プレミアムサブスクライバ認証とコンテンツ解読をクライアント側に実装しましょう。このソリューションでは、プレミアムアクセスを持つユーザーが、新しいページの読み込みやバックエンドの応答を待機することなく、コンテンツを解読できるようになります。

# セットアップの概要

クライアント側暗号化を実装するには、対称鍵と公開鍵の暗号を次のように組み合わせます。

1. 各ドキュメントに対してランダムな対称鍵を作成します。ドキュメントに*一意*の鍵を指定してください。{{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='ドキュメントごとに一意の鍵') }}
2. ドキュメントの対称鍵を使用してプレミアムコンテンツを暗号化します。 {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='ドキュメントの鍵を使用してプレミアムコンテンツを暗号化する。') }} この鍵は、同一の鍵で暗号と解読を行えるように、対称化されています。 {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='ドキュメントを暗号化する鍵で解読もできる。') }}
3. 対称鍵を暗号化する[ハイブリッド暗号化](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)プロトコルを使用して、公開鍵でドキュメントの鍵を暗号化します。 {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='ハイブリッド暗号化プロトコルは、公開鍵で対称鍵を暗号化する。') }}
4. [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) や [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) コンポーネントを使用して、AMP ドキュメントに暗号化されたドキュメント鍵と暗号化されたプレミアムコンテンツを保存します。 {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='AMP ドキュメント内に両方の鍵を保存する。') }}

AMP ドキュメントは、暗号化された鍵をそのドキュメント内に保存します。このため、暗号化ドキュメントとそれを解読する鍵が切り離されることはありません。

# その仕組みは？

1. AMP は、ユーザーがたどり着くドキュメントで暗号化されたコンテンツの鍵を解析します。 {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='公開鍵と対称鍵の暗号化。') }}
2. プレミアムコンテンツを配信しながら、AMP は、ユーザーの視覚情報のフェッチの一環として、ドキュメントから認証者（authorizer<br>）に暗号化された対称鍵を送信します。 {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP は、ユーザーの視覚情報のフェッチの一環として、ドキュメントから認証者に暗号化された対称鍵を送信する。') }}
3. 認証者は、ユーザーに適切な権限があるかどうかを判定し、ある場合は、認証者の公開/秘密鍵ペアの秘密鍵を使って、ドキュメントの対称鍵を解読し、[amp-subscriptions コンポーネントのロジック](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264)にドキュメント鍵を返します。 {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP ロジックによって鍵が解読される。') }}
4. AMP は、ドキュメント鍵を使ってプレミアムコンテンツを解読し、ユーザーに表示します。 {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP はドキュメント鍵を使ってプレミアムコンテンツを解読し、ユーザーに表示する。') }}

# 実装手順

以下の手順に従って、内部資格サーバーに AMP 暗号化処理を統合します。

## 手順 1: 公開鍵/秘密鍵ペアを作成する

ドキュメントの対称鍵を暗号化するには、独自の公開鍵/秘密鍵のペアが必要です。公開鍵暗号化は [ハイブリッド暗号化](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)プロトコルで、具体的には、[AES-GCM](https://tools.ietf.org/html/rfc5288) （128 ビット）対称暗号化方式を使用した [P-256 楕円曲線](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) <br> ECIES 非対称暗号化方式です。

公開鍵の処理は、[この非対称鍵タイプ](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32)を使って、[Tink](https://github.com/google/tink) で行う必要があります。秘密鍵/公開鍵ペアを作成するには、次のいずれかを使用します。

- Tink の [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) クラス
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md)（Tink の鍵ユーティリティツール）

上記の両方では、鍵のローテーションがサポートされています。鍵のローテーションを実装することで、秘密鍵が改ざんされた場合の脆弱性を抑制することができます。

非対称鍵の作成を始めやすくするために、[スクリプト](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen)を用意しました。このスクリプトは、以下の項目を行います。

1. AEAD 鍵を使って新しい ECIES を作成する。
2. プレーンテキストで、公開鍵を出力ファイルに出力する。
3. 秘密鍵を別の出力ファイルに出力する。
4. 出力ファイル（一般的に[エンベロープ暗号化](https://cloud.google.com/kms/docs/envelope-encryption)と呼ばれる）に書き込む前に、Google Cloud（GCP）にホストされた鍵を使用して、生成された秘密鍵を暗号化する。

公開 [Tink 鍵セット](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)を [JSON 形式](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go)で保存/公開する必要があります。こうすることで、AMP が提供するほかのツールをシームレスに機能させることができるようになります。このスクリプトは、すでにこの形式で公開鍵を出力しています。

## 手順 2: 記事を暗号化する

プレミアムコンテンツを手動で暗号化するか自動的に暗号化するかを決定します。

### 手動暗号化

プレミアムコンテンツを暗号化するには、Tink を使用した [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) 対称方式が必要です。プレミアムコンテンツの暗号化に使用される対称ドキュメント鍵は、ドキュメントごとに一意である必要があります。base64 で暗号化されたプレーンテキストの鍵と、ドキュメントの暗号化されたコンテンツにアクセスするために必要な SKU を含む JSON オブジェクトにドキュメント鍵を追加します。

以下の JSON オブジェクトには、base64 で暗号化されたプレーンテキストと SKU の鍵の例が含まれます。

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

「公開鍵/秘密鍵ペアを作成する」で生成された公開鍵を使用して、上記の JSON オブジェクトを暗号化します。

暗号化された結果を値として `"local"` に追加します。`<script type="application/json" cryptokeys="">` タグで囲まれた JSON オブジェクト内に鍵と値のペアを配置します。このタグをドキュメントの head に配置します。

```
<head>
...
<script type="application/json" cryptokeys="">
{
  "local": ['y0^r$t^ff'], // This is for your environment
  "google.com": ['g00g|e$t^ff'], // This is for Google's environment
}
</script>
…
</head>
```

ローカル環境と [Google の公開鍵](https://news.google.com/swg/encryption/keys/prod/tink/public_key)でドキュメント鍵を暗号化する必要があります。 Google の公開鍵を含めると、Google AMP キャッシュでドキュメントを提供できます。[Tink 鍵セット](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md)をインスタンス化して、その URL から Google 公開鍵を受け入れる必要があります。

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Google の公開鍵は、[JSON 形式](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go)の [Tink 鍵セット](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)です。この鍵セットの使用例については、[こちら](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83)をご覧ください。

参考: [暗号化された AMP ドキュメントの使用例を参照してください。](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### 自動暗号化

[スクリプト](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt)を使用してドキュメントを暗号化します。このスクリプトは HTML ドキュメントを受け入れ、`<section subscriptions-section="content" encrypted>` タグ内のすべてのコンテンツを暗号化します。渡された URL にある公開鍵を使用して、スクリプトが作成したドキュメント鍵を暗号化します。このスクリプトを使用すると、このコンテンツを確実に暗号化し、配信できるように正しく書式設定することができます。このスクリプトの使用に関する詳細は、[こちら](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md)をご覧ください。

## 手順 3: 認証者を統合する

ユーザーが適切な資格を有している場合にドキュメント鍵を解読できるよう、認証者を更新する必要があります。amp-subscriptions コンポーネントは、[“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70) URL パラメータを使用して、暗号化されたドキュメント鍵を自動的に `"local"` 認証者に送信します。このコンポーネントは、以下の項目を実行します。

1. `"local"` JSON 鍵フィールドのドキュメント鍵の解読。
2. ドキュメントの解読。

認証者でドキュメント鍵を解読するには、Tink を使用する必要があります。Tink を使用して解読するには、「公開鍵/秘密鍵ペアを作成する」セクションで生成された秘密鍵を使用して、[HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) クライアントをインスタンス化すします。これは、サーバーの起動時に実行することで、最適なパフォーマンスを得られます。

HybridDecrypt/Authorizer デプロイメントは、おおまかに鍵のローテーションスケジュールに一致している必要があります。こうすることで、生成されたすべての鍵が HybridDecrypt クライアントで使用できるようになります。

Tink には、詳細な[ドキュメント](https://github.com/google/tink/tree/master/docs)と、C++、Java、Go、および JavaScript による[例](https://github.com/google/tink/tree/master/examples)が提供されているため、サーバー側実装の開始に役立てられます。

### リクエストの管理

リクエストが認証者に届くと、以下の項目が行われます。

1. “crypt=” パラメータの資格ピンバック URL を解析します。
2. base64 で "crypt=” パラメータの値を解読します。URL パラメータに格納されているこの値は、base64 でエンコーディングされた暗号化済みの JSON オブジェクトです。
3. 暗号化鍵が生のバイト形態にされたら、HybridDecrypt の解読機能を利用して、秘密鍵を使って鍵を解読します。
4. 解読に成功したら、結果を JSON オブジェクトに解析します。
5. AccessRequirements JSON フィールドに記載された資格の 1 つに対してユーザーのアクセスを検証します。
6. 資格のレスポンスで、解読された JSON オブジェクトの “Key” フィールドのドキュメント鍵を返します。資格レスポンスの新しい “decryptedDocumentKey” フィールドに解読されたドキュメント鍵を追加します。これにより、AMP フレームワークへのアクセス権が付与されます。

以下のサンプルは、上記に説明した手順を概説する疑似コードスニペットです。

```js
string decryptDocumentKey(string encryptedKey, List < string > usersEntitlements,
    HybridDecrypt hybridDecrypter) {
    // 1. Base64 decode the input encrypted key.
    bytes encryptedKeyBytes = base64.decode(encryptedKey);
    // 2. Try to decrypt the encrypted key.
    bytes decryptedKeyBytes;
    try {
        decryptedKeyBytes = hybridDecrypter.decrypt(
            encryptedKeyBytes, null /* contextInfo */ );
    } catch (error e) {
        // Decryption error occurred. Handle it how you want.
        LOG("Error occurred decrypting: ", e);
        return "";
    }
    // 3. Parse the decrypted text into a JSON object.
    string decryptedKey = new string(decryptedKeyBytes, UTF_8);
    json::object decryptedParsedJson = JsonParser.parse(decryptedKey);
    // 4. Check to see if the requesting user has the entitlements specified in
    //    the AccessRequirements section of the JSON object.
    for (entitlement in usersEntitlements) {
        if (decryptedParsedJson["AccessRequirements"]
            .contains(entitlement)) {
            // 5. Return the document key if the user has entitlements.
            return decryptedParsedJson["Key"];
        }
    }
    // User doesn't have correct requirements, return empty string.
    return "";
}

JsonResponse getEntitlements(string requestUri) {
    // Do normal handling of entitlements here…
    List < string > usersEntitlements = getUsersEntitlementInfo();

    // Check if request URI has "crypt" parameter.
    String documentCrypt = requestUri.getQueryParameters().getFirst("crypt");

    // If URI has "crypt" param, try to decrypt it.
    string documentKey;
    if (documentCrypt != null) {
        documentKey = decryptDocumentKey(
            documentCrypt,
            usersEntitlements,
            this.hybridDecrypter_);
    }

    // Construct JSON response.
    JsonResponse response = JsonResponse {
        signedEntitlements: getSignedEntitlements(),
        isReadyToPay: getIsReadyToPay(),
    };
    if (!documentKey.empty()) {
        response.decryptedDocumentKey = documentKey;
    }
    return response;
}
```

# 関連リソース

[Tink Github ページ](https://github.com/google/tink)にあるドキュメントと例をご覧ください。

すべてのヘルパースクリプトは、[subscriptions-project/encryption Github リポ/a0}にあります。](https://github.com/subscriptions-project/encryption)

# 今後のサポート

ご質問、コメント、または懸念事項については、[Github 課題](https://github.com/subscriptions-project/encryption/issues)を提出してください。
