---
formats:
  - websites
'$title': حماية محتوى الاشتراك لديك من خلال التشفير من جانب العميل
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: حل مشاكل تشفير المحتوى من خلال تنفيذ عملية التحقق من صحة المشترك المتميز وفك تشفير المحتوى من جانب العميل. إذ سيتمكن المستخدمون الذين يتمتعون بإمكانية الوصول المتميز مع هذا الحل من فك تشفير المحتوى دون الحاجة إلى تحميل صفحة جديدة أو انتظار استجابة خلفية!
author: CrystalOnScript
---

إذا كنت ناشرًا عبر الإنترنت، فعلى الأرجح أنك تعتمد على المشتركين لتحقيق إيراد. يمكنك حظر المحتوى المتميز خلف جدار الدفع من أجل الوصول عن العميل باستخدام [تشويش CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='محتوى متميز مخفي حتى تتم مصادقة المستخدمين.') }}

لسوء الحظ، يمكن للكثير من البارعين في مجال التكنولوجيا حل هذا الأمر

بدلاً من ذلك، قد تعرض على المستخدمين مستندًا يفتقر تمامًا إلى المحتوى المتميز! مقدمًا صفحة جديدة تمامًا بمجرد أن تتحقق الخلفية الخاصة بك من صحة المستخدم. وفي حين أن هذه الطريقة أكثر أمانًا، إلا أنها تكلف الوقت والموارد وتؤثر على رضاء المستخدم.

قم بحل هاتين المشكلتين من خلال تطبيق التحقق من صحة المشترك المتميز وفك تشفير المحتوى من جانب العميل. مع هذا الحل، سيتمكن المستخدمون الذين يتمتعون بصلاحية الوصول المتميز من فك تشفير المحتوى دون الحاجة إلى تحميل صفحة جديدة أو انتظار استجابة خلفية!

# نظرة عامة على الإعداد

لتنفيذ فك التشفير من جانب العميل، ستقوم بدمج كل من تشفير المفتاح المماثل والمفتاح العام على النحو التالي:

1. قم بإنشاء مفتاح مماثل عشوائي لكل مستند، مع منح كل مستند مفتاحًا _فريدًا_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='مفاتيح فريدة لكل مستند فريد.') }}
2. قم بتشفير المحتوى المتميز باستخدام مفتاح مماثل للمستند. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='استخدم مفتاح المستند لتشفير المحتوى المتميز.') }} المفتاح مماثل للسماح لنفس المفتاح بتشفير وفك تشفير المحتوى. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='يقوم المفتاح نفسه الذي يشفر المستند بفك تشفيره أيضًا.') }}
3. قم بتشفير مفتاح المستند بمفتاح عام باستخدام بروتوكول [تشفير هجين ](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)لتشفير المفاتيح المماثلة. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='يقوم بروتوكول التشفير الهجين بتشفير المفتاح المماثل بمفتاح عام.') }}
4. باستخدام المكون (المكونات) [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) و/أو [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites)، قم بتخزين مفتاح المستند المشفر داخل مستند AMP، إلى جانب المحتوى المتميز المشفر. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='يتم تخزين كلا المفتاحين داخل مستند AMP.') }}

يخزن مستند AMP المفتاح المشفر في حد ذاته. وهذا يمنع فك ارتباط المستند المشفر بالمفتاح الذي يقوم بفك ترميزه.

# طريقة العمل؟

1. يوزع AMP المفتاح من المحتوى المشفر في المستند الذي يهبط إليه المستخدم. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='تشفير المفتاح العام والمماثل.') }}
2. أثناء تقديم المحتوى المتميز، يرسل AMP المفتاح المماثل المشفر من المستند إلى مسؤول التفويض كجزء من إحضار استحقاقات المستخدم {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='يرسل AMP المفتاح المماثل المشفر من المستند إلى مسؤول التفويض كجزء من إحضار استحقاقات المستخدم.') }}
3. يقرر مسؤول التفويض ما إذا كان المستخدم لديه الأذونات الصحيحة أم لا. إذا كانت الإجابة نعم، يقوم مسؤول التفويض بفك تشفير المفتاح المماثل للمستند باستخدام المفتاح الخاص لمسؤول التفويض من زوج المفاتيح العام/الخاص. ثم يعيد مسؤول التفويض مفتاح المستند إلى [منطق مكون amp-subscriptions](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='يفك منطق AMP تشفير المفاتيح.') }}
4. يقوم AMP بفك تشفير المحتوى المتميز باستخدام مفتاح المستند وإظهاره للمستخدم! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='يقوم AMP بفك تشفير المحتوى المتميز باستخدام مفتاح المستند وإظهاره للمستخدم.') }}

# خطوات التنفيذ

اتبع الخطوات أدناه لدمج معالجة تشفير AMP مع خادم الاستحقاقات الداخلية لديك.

## الخطوة 1: إنشاء زوج مفاتيح عام/خاص

لتشفير المفتاح المماثل للمستند، تحتاج إلى الحصول على زوج خاص بك من المفاتيح عام/خاص. حيث إن تشفير المفتاح العام عبارة عن بروتوكول [تشفير هجين](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)، وخاصة طريقة التشفير غير المماثل [P-256 Elliptic Curve](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) ECIES مع طريقة التشفير المماثل [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bit).

وإننا نطلب إتمام معالجة المفتاح العام عن طريق [Tink](https://github.com/google/tink) باستخدام [نوع المفتاح غير المماثل هذا](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). ولإنشاء زوج المفاتيح الخاص والعام، استخدم أيًا مما يلي:

- فئة [مدير لوحة المفاتيح](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) الخاصة بـ Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (الأداة المساعدة لمفتاح Tink)

كلاهما يدعم دوران المفتاح. إذ يؤدي تنفيذ تدوير المفتاح إلى الحد من التعرض للمفتاح الخاص المخترق.

لمساعدتك على البدء في إنشاء مفاتيح مماثلة، قمنا بإنشاء [هذا النص البرمجي](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). حيث:

1. يقوم بإنشاء ECIES جديد باستخدام مفتاح AEAD.
2. يقوم بإخراج المفتاح العام بنص عادي إلى ملف الإخراج.
3. يقوم بإخراج المفتاح الخاص إلى ملف إخراج آخر.
4. يقوم بتشفير المفتاح الخاص الذي تم إنشاؤه باستخدام مفتاح مستضاف على Google Cloud (GCP) قبل الكتابة إلى ملف الإخراج، (يشار إليه عادةً باسم [تشفير المغلف](https://cloud.google.com/kms/docs/envelope-encryption)).

إننا نطلب تخزين/نشر [لوحة مفاتيح Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) لديك بـ [تنسيق JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). حيث يسمح هذا الأمر لأدوات AMP الأخرى بالعمل بسلاسة. فيما يقوم البرنامج النصي لدينا بالفعل بإخراج المفتاح العام بهذا التنسيق.

## الخطوة 2: تشفير الملفات

حدد ما إذا كنت ستقوم بتشفير المحتوى المتميز يدويًا أم تلقائيًا.

### التشفير اليدوي

إننا نطلب طريقة [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) المماثلة باستخدام Tink لتشفير المحتوى المتميز. يجب أن يكون المفتاح المماثل للمستند المستخدم لتشفير المحتوى المتميز فريدًا لكل مستند. أضف مفتاح المستند إلى كائن JSON يحتوي على المفتاح في نص عادي مشفر باستخدام base64، بالإضافة إلى وحدات حفظ المخزون المطلوبة للوصول إلى محتوى المستند المشفر.

يحتوي كائن JSON أدناه على مثال لمفتاح في نص عادي مشفر باستخدام base64 ووحدة حفظ المخزون.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

قم بتشفير كائن JSON أعلاه باستخدام المفتاح العام الذي تم إنشاؤه في إنشاء زوج مفتاح عام/خاص.

أضف النتيجة المشفرة كقيمة للمفتاح `"local"`. وضع الزوج مفتاح-قيمة ضمن كائن JSON ملتف داخل العلامة `<script type="application/json" cryptokeys="">`. وضع العلامة في رأس المستند.

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

أنت مطالب بتشفير مفتاح المستند مع البيئة المحلية و[المفتاح العام لـ Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). حيث يسمح تضمين المفتاح العام لـ Google لذاكرة التخزين المؤقت لـ Google AMP بتقديم المستند الخاص بك. وعليك إنشاء [لوحة مفاتيح Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) لقبول المفتاح العام لـ Google من عنوان URL الخاص به:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

إن المفتاح العام لـ Google عبارة عن [لوحة مفاتيح Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) في [تنسيق JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). راجع [هنا](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) للعثور على مثال على العمل مع لوحة المفاتيح هذه.

تابع القراءة: [راجع مثالًا على مستند AMP مشفر قيد العمل.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### تشفير تلقائي

قم بتشفير مستند باستخدام [النص البرمجي](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt) الخاص بنا. حيث يقبل النص البرمجي مستند HTML ويقوم بتشفير كل المحتوى الموجود داخل العلامات `<section subscriptions-section="content" encrypted>`. باستخدام المفاتيح العامة الموجودة في عناوين URL التي تم تمريرها إليها، يقوم البرنامج النصي بتشفير مفتاح المستند الذي تم إنشاؤه بواسطة البرنامج النصي. ويضمن استخدام هذا النص البرمجي أن كل المحتوى مشفر ومنسق بشكل صحيح للعرض. راجع [هنا](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) لمزيد من التعليمات حول استخدام هذا النص البرمجي.

## الخطوة 3: دمج مسؤول التفويض

تحتاج إلى تحديث مسؤول التفويض لديك لفك تشفير مفاتيح المستند عند حصول مستخدم على الاستحقاقات الصحيحة. حيث يرسل المكون amp-subscriptions مفتاح المستند المشفر تلقائيًا إلى مسؤول التفويض `"local"` من خلال معلمة عنوان URL [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). التي بدورها تقوم بتنفيذ:

1. توزيع مفتاح المستند من حقل مفتاح JSON `"local"`.
2. فك تشفير المستند.

يجب عليك استخدام Tink لفك تشفير مفاتيح المستند في مسؤول التفويض لديك. لإجراء عملية فك التشفير باستخدام Tink، قم بإنشاء مثيل لعميل [فك التشفير الهجين](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) باستخدام المفاتيح الخاصة التي تم إنشاؤها في قسم إنشاء زوج مفاتيح عام/خاص. قم بذلك عند بدء تشغيل الخادم للحصول على الأداء الأمثل.

يجب أن يتطابق نشر فك التشفير الهجين/مسؤول التفويض لديك مع جدول تدوير المفاتيح تطابقًا تامًا. إذ يؤدي هذا الأمر إلى إتاحة جميع المفاتيح التي تم إنشاؤها لعميل فك التشفير الهجين.

يحتوي Tink على [مستندات](https://github.com/google/tink/tree/master/docs) و[أمثلة](https://github.com/google/tink/tree/master/examples) سريعة الاستجابة في C++، وJava، وGo، وJavascript لمساعدتك في البدء في التنفيذ من جانب العميل

### إدارة الطلب

عندما يأتي طلب إلى مسؤول التفويض:

1. وزع عنوان URL لرسائل تنبيه الاستحقاقات للمعلمة “crypt=”.
2. فك ترميز قيمة المعلمة "crypt =" باستخدام base64. إذ تكون القيمة المخزنة في معلمة عنوان URL عبارة عن كائن JSON المشفر باستخدام base64.
3. بمجرد أن يصبح المفتاح المشفر بصيغة بايت بسيط، استخدم وظيفة فك التشفير "HybridDecrypt" لفك تشفير المفتاح باستخدام مفتاحك الخاص.
4. إذا نجح فك التشفير، وزع النتيجة في كائن JSON.
5. تحقق من وصول المستخدم إلى أحد الاستحقاقات المدرجة في حقل AccessRequirements JSON.
6. أعد مفتاح المستند من الحقل "مفتاح" لكائن JSON الذي تم فك تشفيره في استجابة الاستحقاقات. وأضف مفتاح المستند الذي تم فك تشفيره في حقل جديد بعنوان "decryptedDocumentKey" في استجابة الاستحقاقات. فهذا يمنح صلاحية وصول إلى إطار عمل AMP.

النموذج أدناه عبارة عن مقتطف لغة رمزية يوضح خطوات الوصف أعلاه:

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

# موارد ذات صلة

تحقق من المستندات والأمثلة الموجودة في [صفحة Tink Github](https://github.com/google/tink).

جميع البرامج النصية المساعدة موجودة في [Github repo لتشفير/مشروع الاشتراكات](https://github.com/subscriptions-project/encryption).

# المزيد من الدعم

لطرح أي سؤال أو إرسال تعليق أو استفسار، يرجى تقديمها إلى [مشكلة Github](https://github.com/subscriptions-project/encryption/issues).
