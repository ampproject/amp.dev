---
formats:
  - websites
'$title': 利用客户端加密保护订阅内容
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: 要解决内容加密问题，可以在客户端实现付费订阅者验证和内容解密。借助此解决方案，具有付费内容访问权限的用户无需加载新页面或等待后端响应即可解密内容！
author: CrystalOnScript
---

如果您是在线发布商，可能会依赖订阅者来获得收入。您可能会使用 [CSS 混淆](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`) 在客户端上屏蔽付费墙后面的付费内容。

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='只有在用户经过身份认证后，才会显示付费内容。') }}

遗憾的是，越来越多技术娴熟的人可以绕过这一技术。

您向用户展示的文档反而可能完全没有付费内容！在您的后端验证用户后提供全新页面。这种方法虽然较为安全，但却耗费时间和资源，并且会降低用户好感。

要解决这些问题，可以在客户端实现付费订阅者验证和内容解密。借助此解决方案，具有付费内容访问权限的用户无需加载新页面或等待后端响应即可解密内容！

# 设置概述

要实现客户端解密，可按以下方式将对称密钥和公钥加密结合使用：

1. 为每个文档创建一个随机对称密钥，即为每个文档授予*唯一*密钥。{{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='每个特定文档对应一个唯一的密钥。') }}
2. 使用文档的对称密钥加密付费内容。{{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='使用文档密钥加密付费内容。') }} 采用对称密钥有助于使用相同的密钥对内容进行加密和解密。{{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='文档的加密密钥也用于解密文档。') }}
3. 使用公钥加密文档密钥，也就是使用[混合加密](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)协议加密对称密钥。{{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='混合加密协议使用公钥加密对称密钥。') }}
4. 使用 [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) 和/或 [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) 组件将加密的文档密钥连同加密的付费内容一起存储在 AMP 文档内部。{{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='两种密钥均存储在 AMP 文档内部。') }}

AMP 文档将加密密钥存储在文档内部。这样可以防止加密文档与对其进行解码的密钥分离。

# 工作原理

1. AMP 解析用户访问的文档中加密内容的密钥。{{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='公钥和对称密钥加密。') }}
2. 提供付费内容时，AMP 在获取用户授权的过程中将加密的对称密钥从文档发送给授权者。{{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP 在获取用户授权的过程中将加密的对称密钥从文档发送给授权者。') }}
3. 授权者确定用户是否具有相应的权限。如果用户具有权限，授权者将使用公钥/私钥对中的私钥解密文档的对称密钥，然后将文档密钥返回给 [amp-subscriptions 组件逻辑](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264)。{{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP 逻辑解密密钥。') }}
4. AMP 使用文档密钥解密付费内容，并向用户显示该内容！{{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP 使用文档密钥解密付费内容，并向用户显示该内容。') }}

# 实现步骤

按照以下步骤操作，将 AMP 加密处理与内部授权服务器集成。

## 第 1 步：创建公钥/私钥对

要加密文档的对称密钥，您需要具有自己的公钥/私钥对。公钥加密采用[混合加密](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)协议，尤其是混合使用 [P-256 椭圆曲线](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) ECIES 不对称加密方法与 [AES-GCM](https://tools.ietf.org/html/rfc5288)（128 位）对称加密方法。

我们要求使用 [Tink](https://github.com/google/tink) 和[此非对称密钥类型](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32)来处理公钥。要创建您自己的公钥-私钥对，请使用以下任一项：

- Tink 的 [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) 类
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md)（Tink 的密钥实用工具）

二者均支持密钥轮换。实现密钥轮换后，只有在私钥被盗用时才会出现漏洞。

为了帮助您开始创建非对称密钥，我们创建了[此脚本](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen)，其作用如下：

1. 使用 AEAD 密钥创建新的 ECIES。
2. 以纯文本形式将公钥输出到输出文件中。
3. 将私钥输出到另一个输出文件中。
4. 使用在 Google Cloud (GCP) 上托管的密钥加密生成的私钥，然后再将其写入输出文件（通常称为[信封加密](https://cloud.google.com/kms/docs/envelope-encryption)）。

我们要求以 [JSON 格式](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go)存储/发布公共 [Tink 密钥集](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)。这样，AMP 提供的其他工具便可无缝工作。我们的脚本已采用此格式输出公钥。

## 第 2 步：加密文章

确定您是手动加密付费内容，还是自动加密付费内容。

### 手动加密

我们要求 [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) 对称方法，该方法使用 Tink 加密付费内容。用于加密付费内容的文档对称密钥对每个文档来说应当唯一。将文档密钥添加到 JSON 对象中，该对象包含以 base64 编码的纯文本形式的密钥，还包含在访问文档的加密内容时所需的 SKU。

以下 JSON 对象包含以 base64 编码的纯文本形式的密钥以及 SKU 的示例。

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

使用在“创建公钥/私钥对”中生成的公钥加密上述 JSON 对象。

将加密结果以值的形式添加到 `"local"` 键中。将键-值对放到封装在 `<script type="application/json" cryptokeys="">` 标记内的 JSON 对象中。将该标记放在文档的 head 中。

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

您需要使用本地环境和 [Google 公钥](https://news.google.com/swg/encryption/keys/prod/tink/public_key)来加密文档密钥。通过添加 Google 公钥，Google AMP 缓存可以提供您的文档。您必须实例化 [Tink 密钥集](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md)才能从其网址获取 Google 公钥：

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Google 的公钥是 [JSON 格式](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go)的 [Tink 密钥集](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)。有关使用此密钥集的示例，请点击[此处](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83)。

延伸阅读：[了解 AMP 加密文档的应用示例](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)。

### 自动加密

使用我们的[脚本](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt)加密文档。该脚本接受 HTML 文档，并且可以加密 `<section subscriptions-section="content" encrypted>` 标记内的所有内容。脚本使用传递的网址中的公钥来加密脚本创建的文档密钥。使用此脚本可确保所有内容均经过编码并且格式正确，可以提供给用户。有关使用此脚本的进一步说明，请点击[此处](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md)。

## 第 3 步：整合授权者

您需要更新授权者，在用户具有相应权利时解密文档密钥。amp-subscriptions 组件借助 [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70) 网址参数自动将加密的文档密钥发送给 `"local"` 授权者。该组件执行以下操作：

1. 解析 `"local"` JSON 密钥字段中的文档密钥。
2. 解密文档。

您必须使用 Tink 来解密授权者中的文档密钥。要使用 Tink 进行解密，请使用在“创建公钥/私钥对”部分中生成的私钥实例化 [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) 客户端。为了实现最佳性能，请在服务器启动时执行此操作。

您的 HybridDecrypt/Authorizer 部署应当大致符合密钥轮换时间表。这样，生成的所有密钥都可供 HybridDecrypt 客户端使用。

C++、Java、Go 和 Javascript 中提供了大量有关 Tink 的[文档](https://github.com/google/tink/tree/master/docs)和[示例](https://github.com/google/tink/tree/master/examples)，有助于您开始在服务器端实现。

### 请求管理

向授权者发出请求时，将执行以下操作：

1. 解析 “crypt=” 参数的授权回 ping 网址。
2. 使用 base64 解码 "crypt=” 参数值。网址参数中存储的值是以 base64 编码的加密 JSON 对象。
3. 在加密密钥恢复为其原始字节形式后，使用 HybridDecrypt 的解密函数以及私钥对该密钥解密。
4. 如果解密成功，则将结果解析为 JSON 对象。
5. 验证用户是否有权访问 AccessRequirements JSON 字段中列出的授权之一。
6. 在授权响应中，返回解密 JSON 对象的“Key”字段中的文档密钥。在授权响应中，将解密的文档密钥添加到名为“decryptedDocumentKey”的新字段中。这样便可授予对 AMP 框架的访问权限。

下面的示例是伪代码段，概述了以上说明步骤：

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

# 相关资源

查阅 [Tink Github 页面](https://github.com/google/tink)上的文档和示例。

所有辅助脚本均位于 [subscriptions-project/encryption Github 仓库](https://github.com/subscriptions-project/encryption)中。

# 更多支持

如有任何问题、意见或顾虑，请提出 [Github 问题](https://github.com/subscriptions-project/encryption/issues)。
