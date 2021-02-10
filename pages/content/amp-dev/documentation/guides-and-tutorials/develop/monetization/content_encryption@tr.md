---
formats:
  - websites
'$title': Abonelik içeriğinizi istemci tarafı şifrelemesiyle koruma
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: İstemci tarafında premium abone doğrulaması ve içerik şifre çözümlemesi uygulayarak içerik şifreleme sorunlarını çözün. Bu çözümle, premium erişime sahip kullanıcılar, yeni bir sayfa yüklemeye veya bir arka ucun yanıt vermesini beklemeye gerek kalmadan içeriğin şifresini çözebilecek!
author: CrystalOnScript
---

Çevrimiçi bir yayındaysanız, muhtemelen geliriniz abonelere dayanıyordur. [CSS gizleme](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`) kullanarak istemcide bir ödeme duvarının arkasındaki premium içeriği engelliyor olabilirsiniz.

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Ne yazık ki, bu sorunu genelde teknoloji bilgisi yüksek insanlar çözebilir.

Bunun yerine, kullanıcılara premium içerikten tamamen yoksun bir belge gösteriyor olabilirsiniz! Arka ucunuz kullanıcıyı doğruladığı anda tamamen yeni bir sayfa sunuyorsunuzdur. Daha güvenli olsa da, bu yöntem zamana, kaynaklara ve kullanıcı mutluluğuna mal olur.

İstemci tarafında premium abone doğrulaması ve içerik şifre çözümlemesi uygulayarak her iki sorunu çözün. Bu çözümle, premium erişime sahip kullanıcılar, yeni bir sayfa yüklemeye veya bir arka ucun yanıt vermesini beklemeye gerek kalmadan içeriğin şifresini çözebilecek!

# Kuruluma genel bakış

İstemci tarafında şifre çözmeyi uygulamak için hem simetrik anahtar hem de açık anahtar şifrelemesini aşağıdaki şekilde birleştireceksiniz:

1. Her belgeye _eşsiz_ bir anahtar vererek her belge için rastgele bir simetrik anahtar oluşturun. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Premium içeriği, belgenin simetrik anahtarıyla şifreleyin. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} Anahtar, aynı anahtarın içeriği şifrelemesine ve şifresini çözmesine izin verecek şekilde simetriktir. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Simetrik anahtarları şifrelemek için bir [karma şifreleme](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) protokolü kullanarak belge anahtarını bir genel anahtarla şifreleyin. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) ve/veya [` <amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) bileşenlerini kullanarak, şifreli belge anahtarını, şifrelenmiş premium içerik ile birlikte AMP belgesinin içinde saklayın. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

AMP belgesi, şifrelenmiş anahtarı kendi içinde depolar. Bu, şifrelenmiş belgenin şifresini çözen anahtarla ayrılmasını önler.

# Nasıl çalışır?

1. AMP, anahtarı kullanıcının açtığı belgedeki şifrelenmiş içerikten ayrıştırır. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. Premium içeriği sunarken AMP, kullanıcının yetkilerini getirme işleminin bir parçası olarak belgeden şifrelenmiş simetrik anahtarı yetkilendiriciye gönderir. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. Yetkilendirici, kullanıcının doğru izinlere sahip olup olmadığına karar verir. Yanıt evet ise, yetkilendirici belgenin simetrik anahtarının şifresini yetkilendiricinin kendi genel/özel anahtar çiftinden aldığı özel anahtarla çözer. Ardından, yetkilendirici belge anahtarını [amp-subscriptions bileşen mantığına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264) döndürür. {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. AMP, premium içeriğin şifresini belge anahtarıyla çözer ve kullanıcıya gösterir! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Uygulama adımları

AMP şifreleme işlemini dahili yetkilendirme sunucunuza entegre etmek için aşağıdaki adımları izleyin.

## 1. Adım: Genel/özel anahtar çifti oluşturun

Belgenin simetrik anahtarını şifrelemek için kendi genel/özel anahtar çiftinize sahip olmanız gerekir. Açık anahtar şifreleme, [karma bir şifreleme](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) protokolüdür, özellikle de bir [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bit) simetrik şifreleme yöntemiyle bir [P-256 Elliptic Curve](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) ECIES asimetrik şifreleme yöntemidir.

[Bu asimetrik anahtar türü](https://github.com/google/tink) kullanılarak [Tink](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32) ile genel anahtar işlemeyi zorunlu kılıyoruz. Özel-genel anahtar çiftinizi oluşturmak için aşağıdakilerden birini kullanın:

- Tink’in [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) sınıfı
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (Tink’in anahtar aracı)

Her ikisi de anahtar rotasyonunu destekler. Anahtar rotasyonunun uygulanması, güvenliği ihlal edilmiş bir özel anahtara yönelik güvenlik açığını sınırlar.

Asimetrik anahtarlar oluşturmaya başlamanıza yardımcı olmak için [bu betiği](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen) oluşturduk. Şunları yapar:

1. AEAD anahtarı ile yeni bir ECIES oluşturur.
2. Açık anahtarı düz metin olarak bir çıktı dosyasına aktarır.
3. Özel anahtarı başka bir çıktı dosyasına aktarır.
4. Oluşturulan özel anahtarı çıktı dosyasına yazmadan önce Google Cloud'da (GCP) barındırılan bir anahtarı kullanarak şifreler (bu genellikle [Zarf Şifreleme](https://cloud.google.com/kms/docs/envelope-encryption) olarak adlandırılır).

Genel [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) anahtarınızı [JSON biçiminde](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go) depolamanızı/yayınlamanızı zorunlu kılıyoruz. Bu, AMP tarafından sağlanan diğer araçların sorunsuz çalışmasına olanak tanır. Betiğimiz zaten genel anahtarı bu biçimde çıkarır.

## 2. Adım: Makaleleri şifreleme

Premium içeriği manuel olarak mı yoksa otomatik olarak mı şifreleyeceğinize karar verin.

### Manuel Olarak Şifreleme

Premium içeriği şifrelemek için Tink kullanan [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) simetrik yöntemini gerekli kılıyoruz. Premium içeriği şifrelemek için kullanılan simetrik belge anahtarı, her belge için benzersiz olmalıdır. Belge anahtarını, base64 kodlu düz metinde anahtarın yanı sıra belgenin şifrelenmiş içeriğine erişmek için gereken SKU'ları içeren bir JSON nesnesine ekleyin.

Aşağıdaki JSON nesnesi, base64 kodlu düz metin ve SKU'daki anahtarın bir örneğini içerir.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Genel/Özel Anahtar Çifti Oluşturma bölümünde yaratılan genel anahtarı kullanarak yukarıdaki JSON nesnesini şifreleyin.

Şifrelenmiş sonucu, değer olarak `"local"` anahtarına ekleyin. Anahtar/değer çiftini bir `<script type="application/json" cryptokeys="">` etiketi içine sarılmış bir JSON nesnesinin içine yerleştirin. Etiketi belgenin başına yerleştirin.

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

Belge anahtarını yerel ortamla ve [ Google'ın genel anahtarıyla](https://news.google.com/swg/encryption/keys/prod/tink/public_key) şifrelemeniz gerekir. Google'ın genel anahtarının dahil edilmesi, Google AMP önbelleğinin belgenizi sunmasına izin verir. Google genel anahtarını URL'sinden kabul etmek için bir [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) oluşturmalısınız:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Google'ın genel anahtarı, [JSON biçiminde](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go) bir [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) şeklindedir. Bu anahtar setiyle çalışma örneği için [buraya](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) bakın.

Okumaya devam edin: [Çalışan bir şifrelenmiş AMP belgesi örneğine bakın.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Otomatik Şifreleme

[Betiğimizi](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt) kullanarak belgeyi şifreleyin. Betik bir HTML belgesini kabul eder ve `<section subscriptions-section="content" encrypted>` etiketlerinin içindeki tüm içeriği şifreler. Komut, kendisine iletilen URL'lerde bulunan ortak anahtarları kullanarak, betik tarafından oluşturulan belge anahtarını şifreler. Bu betiği kullanmak, tüm içeriğin sunum için doğru şekilde kodlanmasını ve biçimlendirilmesini sağlar. Bu betiği kullanmaya dair daha fazla talimat için [buraya](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) bakın.

## 3. Adım: Yetkilendiriciyi entegre etme

Bir kullanıcı doğru yetkilere sahip olduğunda belge anahtarlarının şifresini çözmek için yetkilendiricinizi güncellemeniz gerekir. Amp-subscriptions bileşeni, şifrelenmiş belge anahtarını otomatik olarak bir <a>"crypt ="</a> URL parametresi aracılığıyla <code>"local"</code> yetkilendiriciye gönderir. Şunları yapar:

1. Belge anahtarını `"local"` JSON anahtarı alanından ayrıştırır.
2. Belge şifresini çözer.

Yetkilendiricinizdeki belge anahtarlarının şifresini çözmek için Tink'i kullanmanız gerekir. Tink ile şifresini çözmek için, Bir Genel/Özel Anahtar Çifti Oluşturma bölümünde yaratılan özel anahtarları kullanarak bir [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) istemcisinin örneğini oluşturun. En iyi performans için bunu sunucu başlatılırken yapın.

HybridDecrypt/Authorizer dağıtımınız kabaca anahtar rotasyon programınızla eşleşmelidir. Bu, yaratılan tüm anahtarların HybridDecrypt istemcisi için kullanılabilir olmasını sağlar.

Tink, sunucu tarafı uygulamanıza başlamanıza yardımcı olacak C++, Java, Go ve Javascript'te kapsamlı [belgelere](https://github.com/google/tink/tree/master/docs) ve [örneklere](https://github.com/google/tink/tree/master/examples) sahiptir.

### İstek yönetimi

Yetkilendiricinize bir istek geldiğinde:

1. “crypt=” parametresi için yetki geri pingi URL'sini ayrıştırın.
2. "crypt=" parametre değerinin kodunu base64 ile çözün. URL parametresinde saklanan değer, base64 kodlu şifreli JSON nesnesidir.
3. Şifrelenmiş anahtar ham bayt biçiminde olduğunda, özel anahtarınızı kullanarak anahtarın şifresini çözmek için HybridDecrypt'in şifre çözme işlevini kullanın.
4. Şifre çözme başarılı olursa, sonucu bir JSON nesnesine ayrıştırın.
5. Kullanıcının AccessRequirements JSON alanında listelenen yetkilerden birine erişimini doğrulayın.
6. Yetki yanıtında şifresi çözülmüş JSON nesnesinin "Anahtar" alanından belge anahtarını döndürün. Yetkilendirmeler yanıtında "decryptedDocumentKey" adlı yeni bir alana şifresi çözülmüş belge anahtarını ekleyin. Bu, AMP çerçevesine erişim sağlar.

Aşağıdaki örnek, yukarıdaki açıklama adımlarını özetleyen sözde bir kod parçacığıdır:

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

# İlgili kaynaklar

[Tink Github sayfasında](https://github.com/google/tink) bulunan belgelere ve örneklere göz atın.

Tüm yardımcı betikler [abonelikler-proje / şifreleme Github bilgi havuzundadır](https://github.com/subscriptions-project/encryption).

# Daha fazla destek

Herhangi bir sorunuz, yorumunuz veya kuşkunuz için lütfen bir [Github Konusu](https://github.com/subscriptions-project/encryption/issues) açın.
