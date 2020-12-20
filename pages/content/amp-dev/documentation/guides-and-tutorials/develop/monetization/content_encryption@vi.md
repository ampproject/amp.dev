---
formats:
- websites
"$title": Bảo vệ nội dung trả phí của bạn với mã hóa phía máy khách
"$titles":
  teaser: Protect your subscription content with client-side encryption.
"$order": '10'
description: Giải các vấn đề mã hóa nội dung bằng cách triển khai xác thực thuê bao cao cấp và giải mã nội dung phía máy khách. Với giải pháp này, người dùng có quyền truy cập cao cấp sẽ có thể giải mã nội dung mà không cần tải một trang mới hoặc chờ backend hồi đáp!
author: CrystalOnScript
---

Nếu bạn là một tờ báo trực tuyến, doanh thu của bạn có thể phụ thuộc vào các thuê bao. Bạn có thể chặn nội dung cao cấp đằng sau một bức tường thanh toán trên máy khách sử dụng [Che CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Tiếc là, những người thạo công nghệ có thể vượt qua lớp che này.

Thay vào đó, bạn sẽ hiển thị cho người dùng một tài liệu hoàn toàn không có nội dung cao cấp! Phục vụ một trang hoàn toàn mới sau khi backend của bạn đã xác thực cho người dùng. Tuy phương thức này bảo mật hơn, nhưng nó cũng tốn nhiều thời gian, tài nguyên và khiến người dùng không hài lòng.

Giải quyết cả hai vấn đề này bằng cách triển khai xác thực thuê bao cao cấp và giải mã nội dung phía máy khách. Với giải pháp này, người dùng có quyền truy cập cao cấp sẽ có thể giải mã nội dung mà không cần tải một trang mới hoặc chờ backend hồi đáp!

# Tổng quan về thiết lập

Để triển khai việc giải mã phía máy khách, bạn sẽ kết hợp cả mã hóa symmetric-key (khóa đối xứng) và public-key (khóa công khai) như sau:

1. Tạo một khóa đối xứng cho mỗi tài liệu, mỗi khóa này sẽ cấp cho tài liệu một khóa <em>độc đáo</em>. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Mã hóa nội dung cao cấp với khóa đối xứng của tài liệu đó. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} Khóa này có tính đối xứng để cho phép nó vừa mã hóa vừa giải mã nội dung. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Mã hóa khóa của tài liệu bằng khóa công khai, sử dụng giao thức <a class="" href="https://en.wikipedia.org/wiki/Hybrid_cryptosystem">mã hóa lai</a> để mã hóa các khóa đối xứng. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. Sử dụng các thành phần [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) và/hoặc [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites), lưu trữ khóa mã hóa của tài liệu vào trong tài liệu AMP, cùng với nội dung cao cấp đã được mã hóa. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

Tài liệu AMP sẽ lưu trữ khóa mã hóa trong nội dung của nó. Việc này ngăn chặn khả năng tách rời tài liệu được mã hóa với khóa giải mã cho nó.

# Nguyên lý hoạt động là gì?

1. AMP đọc khóa này từ nội dung được mã hóa trên tài liệu mà người dùng truy cập. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. Khi phục vụ nội dung cao cấp, AMP sẽ gửi khóa đối xứng được mã hóa từ tài liệu đến bộ xác thực như một phần trong quy trình truy xuất quyền lợi của người dùng. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. Bộ xác thực quyết định là liệu người dùng có quyền phù hợp hay chưa. Nếu có, bộ xác thực sẽ giải mã khóa đối xứng của tài liệu bằng khóa riêng tư của bộ xác thực từ cặp khóa công khai/riêng tư của nó. Sau đó, bộ xác thực sẽ trả khóa tài liệu về cho [lôgic thành phần amp-subscriptions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. AMP giải mã nội dung cao cấp bằng khóa tài liệu này và hiển thị nó cho người dùng! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Các bước triển khai

Làm theo các bước dưới đây để tích hợp việc xử lý mã hóa AMP vào máy chủ quyền lợi nội bộ của bạn.

## Bước 1: Tạo một cặp khóa công khai/riêng tư

Để mã hóa khóa đối xứng của tài liệu, bạn cần có cặp khóa công khai/riêng tư của mình. Mã hóa cho khóa công khai là một giao thức [mã hóa lai](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), cụ thể là phương pháp mã hóa bất đối xứng [P-256 Elliptic Curve](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)) ECIES với một phương pháp mã hóa đối xứng [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bit).

Chúng ta cần việc xử lý khóa công khai được thực hiện bằng [Tink](https://github.com/google/tink) sử dụng [loại khóa bất đối xứng này](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Để tạo cặp khóa riêng tư-công khai, hãy sử dụng:

- Lớp [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) của Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (Công cụ tiện ích khóa của Tink)

Cả hai đều hỗ trợ chuyển khóa. Việc triển khai chuyển khóa sẽ giới hạn lỗ hổng bảo mật khi có một khóa riêng tư bị xâm phạm.

Để giúp bạn bắt đầu tạo các khóa bất đối xứng, chúng tôi đã tạo [kịch bản này](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Kịch bản này:

1. Tạo một ECIES mới với khóa AEAD.
2. Xuất khóa công khai dưới dạng văn bản thường ra một tập tin bên ngoài.
3. Xuất khóa riêng tư ra một tập tin bên ngoài khác.
4. Mã hóa khóa riêng tư đã tạo sử dụng một khóa được lưu trữ trên Google Cloud (GCP) trước khi ghi nó ra tập tin bên ngoài (thường được gọi là [Mã hóa Phong bì](https://cloud.google.com/kms/docs/envelope-encryption)).

Chúng tôi cần lưu trữ/phát hành [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) công khai của bạn trong [định dạng JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Điều này cho phép các công cụ AMP khác có thể hoạt động liền mạch. Kịch bản của chúng tôi đã xuất khóa công khai trong định dạng này.

## Bước 2: Mã hóa các bài viết

Hãy quyết định là bạn muốn mã hóa thủ công cho các nội dung cao cấp, hay tự động mã hóa nội dung cao cấp.

### Mã hóa Thủ công

Chúng tôi cần phương pháp đối xứng [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) với Tink để mã hóa nội dung cao cấp. Khóa tài liệu đối xứng được sử dụng để mã hóa nội dung cao cấp cần là khóa duy nhất cho mỗi tài liệu. Thêm khóa tài liệu vào một đối tượng JSON có chứa khóa trong văn bản thường mã hóa base64, cũng như các SKU cần để truy cập nội dung được mã hóa trong tài liệu.

Đối tượng JSON dưới đây chứa một ví dụ về khóa trong văn bản thường được mã hóa base64 và SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Mã hóa đối tượng JSON ở trên sử dụng khóa công khai được tạo trong phần Tạo một Cặp Khóa Công khai/Riêng tư.

Thêm kết quả mã hóa làm giá trị cho khóa `"local"` (cục bộ). Đặt cặp giá trị khóa vào trong một đối tượng JSON được bọc trong một thẻ `<script type="application/json" cryptokeys="">`. Đặt thẻ này vào đầu tài liệu.

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

Bạn cần mã hóa khóa tài liệu với môi trường cục bộ và [khóa công khai của Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Việc bao gồm khóa công khai của Google cho phép bộ nhớ đệm Google AMP có thể phục vụ tài liệu của bạn. Bạn phải tạo một [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) để chấp nhận khóa công khai Google từ URL của nó:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Khóa công khai của Google là một [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) trong [định dạng JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Xem <a class="" href="https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83">ở đây</a> để biết ví dụ về làm việc với keyset này.

Đọc tiếp: [Xem một ví dụ về một tài liệu AMP mã hóa hoạt động tốt](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html).

### Tự động Mã hóa

Mã hóa tài liệu của bạn sử dụng [kịch bản](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt) của chúng tôi. Kịch bản này chấp nhận một tài liệu HTML và mã hóa toàn bộ nội dung bên trong thẻ `<section subscriptions-section="content" encrypted>`. Sử dụng các khóa công khai trong URL được truyền đến nó, kịch bản này sẽ mã hóa khóa tài liệu được tạo bởi kịch bản. Việc sử dụng kịch bản này đảm bảo mọi nội dung đều được mã hóa và định dạng phù hợp để phục vụ. Đọc [ở đây](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) để biết hướng dẫn bổ sung về việc sử dụng kịch bản này.

## Bước 3: Tích hợp bộ xác thực

Bạn cần cập nhật bộ xác thực để giải mã các khóa tài liệu khi người dùng có quyền lợi phù hợp. Thành phần amp-subscriptions sẽ tự động gửi khóa tài liệu được mã hóa cho bộ xác thực `"local"` (cục bộ) thông qua một tham số URL [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Hoạt động của nó:

1. Đọc khóa tài liệu từ trường khóa JSON `"local"` (cục bộ).
2. Giải mã tài liệu.

Bạn phải sử dụng Tink để giải mã các khóa tài liệu trong bộ xác thực của mình. Để giải mã với Tink, hãy tạo một máy khách [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) sử dụng các khóa riêng tư được tạo trong phần Tạo một Cặp Khóa Công khai/Riêng tư. Làm việc này khi khởi động máy chủ để có hiệu năng tối ưu.

Việc triển khai HybridDecrypt/Bộ Xác thực phải gần khớp với lịch chuyển khóa của bạn. Việc này sẽ đảm bảo tình trạng sẵn có của tất cả các khóa được tạo cho máy khách HybridDecrypt.

Tink có [tài liệu](https://github.com/google/tink/tree/master/docs) và [ví dụ](https://github.com/google/tink/tree/master/examples) đầy đủ cho C++, Java, Go, và Javascript để giúp bạn bắt đầu triển khai cho phía máy chủ của mình.

### Quản lý yêu cầu

Khi một yêu cầu được gửi đến bộ xác thực của bạn:

1. Đọc URL pingbank quyền lợi để tìm tham số “crypt=”.
2. Giải mã giá trị tham số "crypt=” với base64. Giá trị được lưu trữ trong tham số URL là đối tượng JSON được mã hóa base64.
3. Sau khi khóa mã hóa đã ở trong dạng byte thô, sử dụng chức năng giải mã của HybridDecrypt để giải mã khóa này bằng khóa riêng tư của bạn.
4. Nếu việc giải mã thành công, gửi kết quả vào một đối tượng JSON.
5. Xác minh quyền truy cập của người dùng vào một quyền lợi được liệt kê trong trường JSON AccessRequirements.
6. Trả về khóa tài liệu từ trường “Key” (Khóa) của đối tượng JSON được giải mã trong hồi đáp quyền lợi. Thêm khóa tài liệu được giải mã vào một trường mới tên là “decryptedDocumentKey” trong hồi đáp quyền lợi. Việc này sẽ cho phép truy cập khung AMP.

Mẫu dưới đây là một đoạn code giả để liệt kê các bước ở trên:

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

# Các tài nguyên liên quan

Kiểm tra tài liệu và các ví dụ trên [Trang Github của Tink](https://github.com/google/tink).

Tất cả các kịch bản trợ giúp đều có trong [kho Github subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Hỗ trợ thêm

Nếu bạn có bất kỳ câu hỏi, bình luận hay thắc mắc nào, hãy gửi một [Vấn đề Github](https://github.com/subscriptions-project/encryption/issues).
