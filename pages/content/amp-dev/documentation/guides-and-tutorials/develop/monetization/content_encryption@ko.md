---
formats:
  - websites
'$title': 클라이언트 측 암호화를 통해 구독 콘텐츠 보호하기
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: 프리미엄 구독자 검증 및 클라이언트 측 콘텐츠 복호화를 구현하여 콘텐츠 암호화 문제를 해결하세요. 이러한 솔루션을 활용하면 프리미엄 액세스 권한이 있는 사용자는 새 페이지를 로드하거나 백엔드 응답을 기다릴 필요 없이 콘텐츠 복호화를 실행할 수 있습니다.
author: CrystalOnScript
---

온라인 퍼블리셔의 경우 수익은 구독자에 의존할 것입니다. [CSS 난독화](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce)를 사용하여 클라이언트에 페이월을 설정하고 프리미엄 콘텐츠를 보호할 수 있습니다(`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='사용자 인증 완료 시까지 프리미엄 콘텐츠 숨김 처리.') }}

안타깝지만 기술을 잘 아는 사람들은 페이월을 우회할 수 있습니다.

대신 프리미엄 콘텐츠가 전혀 없는 문서를 사용자에게 표시할 수 있습니다! 백엔드가 사용자를 검증한 후 완전히 새로운 페이지가 제공되는 방식입니다. 이러한 방식은 안전하지만 시간, 리소스가 소모되며 사용자 만족도를 저해합니다.

프리미엄 구독자 검증 및 클라이언트 측 콘텐츠 복호화를 구현하여 두 가지 문제를 모두 해결하세요. 이러한 솔루션을 활용하면 프리미엄 액세스 권한이 있는 사용자는 새 페이지를 로드하거나 백엔드 응답을 기다릴 필요 없이 콘텐츠 복호화를 실행할 수 있습니다.

# 설정 개요

클라이언트 측 복호화를 구현하려면 다음과 같이 대칭 키와 공개 키 암호화 방식을 결합합니다.

1. 각 문서에 임의의 대칭 키를 생성하고 문서별로 _고유_ 키를 부여합니다. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='고유한 문서별 고유 키.') }}
2. 문서의 대칭 키를 사용해 프리미엄 콘텐츠를 암호화합니다. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='문서 키를 사용해 프리미엄 콘텐츠 암호화.') }} 이러한 키는 대칭을 이루며 동일한 키로 콘텐츠 암호화 및 복호화를 수행할 수 있습니다. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='문서 암호화 및 복호화를 수행하는 동일한 키.') }}
3. 대칭 키를 암호화하는 [하이브리드 암호화](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) 프로토콜을 사용하여 문서 키를 공개 키로 암호화합니다. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='하이브리드 암호화 프로토콜은 대칭 키를 공개 키로 암호화.') }}
4. [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) 및/또는 [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) 컴포넌트를 사용해 암호화된 프리미엄 콘텐츠와 함께 암호화된 문서 키를 AMP 문서에 저장합니다.{{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='두 가지 키 모두 AMP 문서에 저장.') }}

AMP 문서는 암호화된 키를 자체적으로 저장하며 암호화된 문서를 디코딩하는 키로 디커플링을 방지합니다.

# 작동 원리

1. AMP는 사용자 랜딩 문서에서 암호화된 콘텐츠의 키를 파싱합니다.{{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='공개 및 대칭 키 암호화.') }}
2. 프리미엄 콘텐츠를 제공하는 동안 AMP는 사용자 자격 정보 가져오기의 일환으로 문서에서 암호화된 대칭 키를 권한 부여자에게 전달합니다. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP는 사용자 자격 정보 가져오기의 일환으로 문서에서 암호화된 대칭 키를 권한 부여자에게 전달.') }}
3. 권한 부여자는 사용자에게 올바른 권한이 있는지 확인합니다. 권한이 있는 경우 권한 부여자는 공개/개인 키 쌍에서 권한 부여자의 개인 키를 사용하여 문서의 대칭 키를 복호화합니다. 다음으로 권한 부여자는 [amp-subscriptions 컴포넌트 로직](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264)에 문서 키를 반환합니다. {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP 로직으로 키 복호화.') }}
4. AMP는 해당 문서 키를 사용해 프리미엄 콘텐츠를 복호화하고 사용자에게 표시합니다! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP는 해당 문서 키를 사용해 프리미엄 콘텐츠를 복호화하고 사용자에게 표시.') }}

# 구현 절차

아래 절차를 따라 내부 자격 정보 서버와 AMP 암호화 처리를 통합할 수 있습니다.

## 1단계: 공개/개인 키 쌍 생성

문서의 대칭 키를 암호화하려면 고유한 공개/개인 키 쌍이 필요합니다. 공개 키 암호화는 [하이브리드 암호화](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) 프로토콜, 구체적으로는 [AES-GCM](https://tools.ietf.org/html/rfc5288)(128 비트) 대칭 암호화 방식을 사용하는 [P-256 타원 곡선](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) ECIES 비대칭 암호화 방식입니다.

공개 키 처리는 [비대칭 키 유형](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32)을 활용하여 [Tink](https://github.com/google/tink)를 통해 수행되어야 합니다. 고유한 개인-공개 키 쌍을 생성하려면 다음 방식 중 하나를 따릅니다.

- Tink의 [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) 크래스
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md)(Tink의 키 유틸리티 도구)

두 방식 모두 키 순환을 지원합니다. 키 순환 구현은 손상된 개인 키의 취약점을 제한합니다.

비대칭 키 생성을 시작하는 데 도움을 드리고자 [이 스크립트](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen)가 제작되었습니다. 해당 스크립트는,

1. AEAD 키가 포함된 신규 ECIES를 생성합니다.
2. 출력 파일에 일반 텍스트로 공개 키를 출력합니다.
3. 출력 파일에 일반 텍스트로 개인 키를 출력합니다.
4. 출력 파일에 작성하기 전 Google Cloud(GCP)에서 호스팅된 키를 사용하여 생성된 개인 키를 암호화합니다(일반적으로 [봉투 암호화](https://cloud.google.com/kms/docs/envelope-encryption)라고 부르는 방식).

공개 [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)를 [JSON 형식](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go)으로 저장/게시해야 다른 AMP 제공 도구가 원활히 작동할 수 있습니다. AMP 스크립트는 이미 해당 형식으로 공개 키를 출력합니다.

## 2단계: 게시물 암호화

프리미엄 콘텐츠의 암호화 방식을 수동 또는 자동 중 선택해야 합니다.

### 수동 암호화

프리미엄 콘텐츠 암호화에는 Tink를 사용하는 [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) 대칭 방식이 필요합니다. 프리미엄 콘텐츠 암호화 시 사용되는 대칭 문서 키는 문서별로 고유해야 합니다. Base64로 인코딩한 일반 텍스트 및 문서의 암호화된 콘텐츠 액세스에 필요한 SKU에서 키를 포함하는 JSON 객체로 문서 키를 추가합니다.

하단의 JSON 객체에는 Base64로 인코딩한 일반 텍스트 및 SKU 키 예시가 포함되어 있습니다.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

'공개/개인 키 쌍 생성'에서 생성된 공개 키를 사용해 상단의 JSON 객체를 암호화합니다.

암호화 결과를 `"local"` 키에 값으로 추가합니다. `<script type="application/json" cryptokeys="">` 태그로 감싼 JSON 객체에 키-값 쌍을 배치합니다. 문서 헤드에 태그를 배치합니다.

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

로컬 환경과 [Google의 공개 키](https://news.google.com/swg/encryption/keys/prod/tink/public_key)를 사용하여 문서 키를 암호화해야 합니다. Google의 공개 키를 포함하면 Google AMP 캐시가 문서를 제공 할 수 있습니다. URL에서 Google 공개 키를 허용하려면 [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) 인스턴스화가 필요합니다.

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Google의 공개 키는 [JSON 형식의](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go) [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131)입니다. 해당 키 집합의 작동 예시는 [여기](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83)에서 확인하실 수 있습니다.

읽어보기: [암호화된 AMP 문서 작동 예시.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### 자동 암호화

[스크립트](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt)를 사용해 문서를 암호화합니다. 해당 스크립트는 HTML 문서를 허용하고 `<section subscriptions-section="content" encrypted>` 태그의 모든 콘텐츠를 암호화합니다. 스크립트는 전달된 URL에 위치한 공개 키를 사용하여 스크립트로 생성된 문서 키를 암호화합니다. 이 스크립트를 사용하면 콘텐츠를 제공할 수 있도록 모든 콘텐츠가 적절히 암호화 및 서식 지정됩니다. 스크립트 사용과 관련한 자세한 지침은 [여기](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md)에서 확인하실 수 있습니다.

## 3단계: 권한 부여자 통합

사용자의 자격 정보가 적절한 경우 문서 키 복호화를 수행하려면 권한 부여자 업데이트가 필요합니다. amp-subscriptions 컴포넌트는 [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70) URL 매개변수를 통해 암호화된 문서 키를 `"local"` 권한 부여자에게 자동으로 전송합니다. 기능은 다음과 같습니다.

1. `"local"` JSON 키 필드의 문서 키 파싱.
2. 문서 복호화.

권한 부여자의 문서 키를 복호화하려면 Tink를 사용해야 합니다. '공개/개인 키 쌍 생성' 섹션에서 생성된 개인 키를 사용해 [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) 클라이언트를 인스턴스화합니다. 성능 최적화를 위해 이 절차를 서버 시작 시 수행하세요.

HybridDecrypt/Authorizer 배포는 키 순환 일정과 대략적으로 일치해야 HybridDecrypt 클라이언트에서 생성된 모든 키를 사용할 수 잇습니다.

Tink는 C++, Java, Go 및 Javascript로 작성된 방대한 [문서](https://github.com/google/tink/tree/master/docs) 및 [예제](https://github.com/google/tink/tree/master/examples)를 보유하여 서버 측 구현을 시작하는 데 도움이 됩니다.

### 요청 관리

권한 부여자에 요청이 전송된 경우,

1. “crypt=” 매개변수의 자격 정보 핑백 URL을 파싱합니다.
2. Base64로 "crypt=” 매개변수 값을 디코딩합니다. URL 매개변수에 저장된 값은 Base64로 인코딩한 암호화 JSON 객체입니다.
3. 암호화된 키가 원시 바이트 형식일 경우 개인 키를 통해 키를 복호화하는 HybridDecrypt 복호화 기능을 사용합니다.
4. 복호화를 성공적으로 마치면 그 결과를 JSON 객체로 파싱합니다.
5. AccessRequirements JSON 필드에 열거된 자격 정보에 대한 사용자 액세스를 검증합니다.
6. 자격 정보 응답의 복호화된 JSON 객체 "키" 필드의 문서 키를 반환합니다. 자격 정보 응답에서 “decryptedDocumentKey”로 지정된 새 필드에 복호화된 문서 키를 추가하면 AMP 프레임워크 액세스 권한이 부여됩니다.

아래 예시는 의사 코드 조각으로 상단의 설명된 단계를 요약하여 보여줍니다.

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

# 관련 리소스

[Tink Github 페이지](https://github.com/google/tink)에서 제공되는 문서 및 예제를 확인하세요.

모든 헬퍼 스크립트는 [subscriptions-project/encryption Github 저장소](https://github.com/subscriptions-project/encryption)에서 확인하실 수 있습니다.

# 추가 지원

질문, 의견 또는 우려 사항이 있을 경우 [Github 이슈](https://github.com/subscriptions-project/encryption/issues)로 작성해 주세요.
