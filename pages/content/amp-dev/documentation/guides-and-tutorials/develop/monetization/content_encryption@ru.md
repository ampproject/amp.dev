---
formats:
  - websites
'$title': Защитите содержимое подписки с помощью шифрования на стороне клиента
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Решайте проблемы с шифрованием контента, внедряя проверку платных подписчиков и расшифровку контента на стороне клиента. Благодаря такому решению пользователи с премиальным доступом смогут расшифровывать контент, не загружая новую страницу и не ожидая ответа от бэкенда.
author: CrystalOnScript
---

Если вы — владелец интернет-издания, скорее всего, вы зарабатываете на платных подписках. Вы можете блокировать платный контент на клиенте, используя [скрытие при помощи CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

К сожалению, технически подкованные пользователи могут обойти этот вид защиты.

Вместо этого вы можете показывать пользователям документ, в котором полностью отсутствует платный контент, и выдавать совершенно новую страницу после того, как ваш бэкенд проверит пользователя. Хотя это более защищенный метод, он расходует время, ресурсы и терпение пользователей.

Чтобы решить обе этих проблемы, реализуйте проверку платных подписчиков и расшифровку контента на стороне клиента. Благодаря такому решению пользователи с платным доступом смогут расшифровывать контент, не загружая новую страницу и не ожидая ответа от бэкенда.

# Обзор установки

Чтобы реализовать дешифровку на стороне клиента, нам потребуется совмещать криптографию с симметричным ключом с криптографией с открытым ключом. Это делается следующим образом:

1. Для каждого документа создается случайный симметричный ключ, являющийся _уникальным_ для документа. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Шифрование платного контента выполняется с помощью симметричного ключа документа. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} Ключ является симметричным, чтобы обеспечить возможность шифровать и дешифровать содержимое с помощью одного и того же ключа. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Ключ документа шифруется открытым ключом с применением протокола [гибридного шифрования](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) симметричных ключей. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. С помощью компонентов [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) и/или [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) зашифрованный ключ документа сохраняется внутри документа AMP вместе с зашифрованным дополнительным контентом. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

Документ AMP сохраняет зашифрованный ключ в самом себе — это предотвращает отделение зашифрованного документа от ключа, который его дешифрует.

# Как это работает?

1. AMP извлекает ключ из зашифрованного содержимого документа, на который переходит пользователь. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. При выдаче платного контента AMP отправляет авторизатору полученный из документа зашифрованный симметричный ключ в рамках процесса получения разрешений пользователя. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. Авторизатор проверяет, есть ли у пользователя нужные разрешения. Если да, то авторизатор расшифровывает симметричный ключ документа с помощью закрытого ключа авторизатора из своей пары «открытый/закрытый ключ». Затем авторизатор возвращает ключ документа [логике компонента amp-subscriptions](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. AMP расшифровывает платный контент с помощью ключа документа и показывает его пользователю. {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Описание реализации

Чтобы интегрировать обработку шифрования AMP с вашим внутренним сервером разрешений, выполните следующие действия.

## Шаг 1. Создайте пару открытого и закрытого ключей

Для шифрования симметричного ключа документа вам необходима собственная пара из открытого и закрытого ключей. Шифрование открытым ключом представляет собой [гибридную криптосистему](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), а именно сочетание метода асимметричного шифрования по схеме ECIES ([с использованием эллиптической кривой P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>)) с методом симметричного шифрования [AES-GCM](https://tools.ietf.org/html/rfc5288) (с использованием 128-битного ключа).

Работа с открытым ключом должна выполняться посредством библиотеки [Tink](https://github.com/google/tink) с применением [указанного по ссылке типа асимметричного ключа](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Чтобы создать пару закрытого и открытого ключей, используйте один из следующих вариантов:

- Класс [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) из библиотеки Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (инструмент для работы с ключами из библиотеки Tink)

Оба средства поддерживают ротацию ключей. Ротация ключей позволяет снизить опасность уязвимости при компрометации закрытого ключа.

Чтобы помочь вам приступить к созданию асимметричных ключей, мы создали [специальный скрипт](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Он делает следующее:

1. Создает новую схему ECIES с ключом AEAD.
2. Выводит открытый ключ в виде открытого текста в выходной файл.
3. Выводит закрытый ключ в другой выходной файл.
4. Шифрует сгенерированный закрытый ключ с помощью ключа, размещенного в Google Cloud (GCP), перед записью в выходной файл (обычно такая процедура называется [шифрованием методом конвертов](https://cloud.google.com/kms/docs/envelope-encryption)).

Ваш общедоступный [набор ключей Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) должен храниться и публиковаться в [формате JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go) — это требуется для корректной работы других инструментов AMP. Наш скрипт уже использует этот формат при выводе открытого ключа.

## Шаг 2. Зашифруйте статьи

Решите, будете ли вы шифровать платный контент вручную или автоматически.

### Шифрование вручную

Для шифрования платного контента должен использоваться симметричный метод [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) с применением библиотеки Tink. Симметричный ключ документа, используемый для шифрования платного контента, должен быть уникальным для каждого документа. Добавьте ключ документа в объект JSON, который содержит ключ (в виде открытого текста в кодировке base64) и коды ресурсов, необходимые для доступа к зашифрованному содержимому документа.

Приведенный ниже объект JSON содержит пример кода ресурса и ключа, представленного в виде открытого текста в кодировке base64.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Зашифруйте указанный выше объект JSON с помощью открытого ключа, сгенерированного в разделе «Создание пары открытого и закрытого ключей».

Добавьте зашифрованный результат в качестве значения ключа `"local"`. Поместите пару «ключ — значение» в объект JSON, заключенный в тег `<script type="application/json" cryptokeys="">`. Разместите тег внутри элемента head в документе.

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

Шифрование ключа документа должно осуществляться с использованием локальной среды и [открытого ключа Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Включение открытого ключа Google позволяет Google AMP Cache выдавать ваш документ. Вы должны создать экземпляр [набора ключей Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md), чтобы принять открытый ключ Google с его URL-адреса:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Открытый ключ от Google — это [набор ключей Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) в формате [JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Пример работы с данным набором ключей см. [здесь](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83).

Для дальнейшего чтения: [ознакомьтесь с рабочим образцом зашифрованного документа AMP](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html).

### Автоматическое шифрование

Зашифруйте документ с помощью нашего [скрипта](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). Скрипт принимает HTML-документ и шифрует все содержимое внутри тегов `<section subscriptions-section="content" encrypted>`. Скрипт шифрует ключ документа, созданный скриптом, используя открытые ключи, размещенные по переданным ему URL-адресам. Применение этого скрипта гарантирует корректную кодировку и форматирование контента для выдачи. Дополнительные инструкции по использованию этого скрипта см. [по этой ссылке](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md).

## Шаг 3. Интегрируйте авторизатор

Вам необходимо внести нужные изменения в свой авторизатор, чтобы он выполнял дешифровку ключей документов при наличии у пользователя нужных разрешений. Компонент amp-subscriptions автоматически отправляет зашифрованный ключ документа `"local"`-авторизатору в параметре URL-адреса ["crypt="](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Он выполняет:

1. Извлечение ключа документа из поля `"local"` в объекте JSON.
2. Дешифровку документа.

Вы должны использовать Tink для дешифровки ключей документов в вашем авторизаторе. Чтобы выполнять дешифровку с помощью Tink, создайте экземпляр клиента [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java), используя закрытые ключи, сгенерированные в разделе «Создание пары открытого и закрытого ключей». Для обеспечения оптимальной производительности выполняйте эти действия на этапе запуска сервера.

Развертывание HybridDecrypt/авторизатора должно примерно соответствовать расписанию ротации ключей — это обеспечит доступность всех сгенерированных ключей для клиента HybridDecrypt.

У Tink есть обширная [документация](https://github.com/google/tink/tree/master/docs) и [примеры](https://github.com/google/tink/tree/master/examples) на C++, Java, Go и JavaScript, которые помогут вам приступить к реализации серверной части.

### Управление запросами

Когда к вашему авторизатору поступает запрос:

1. Извлеките значение параметра «crypt=» из URL-адреса pingback для возврата разрешений.
2. Декодируйте значение параметра «crypt=», используя base64. Значение, хранящееся в параметре URL, является зашифрованным объектом JSON в кодировке base64.
3. Как только у вас будет зашифрованный ключ в виде необработанных байтов, используйте функцию дешифрования HybridDecrypt, чтобы расшифровать ключ с помощью вашего закрытого ключа.
4. Если дешифровка прошла успешно, вставьте результат в объект JSON.
5. Проверьте, имеется ли у пользователя одно из разрешений, перечисленных в поле AccessRequirements в объекте JSON.
6. В ответе о наличии разрешений верните ключ документа из поля «Key» расшифрованного объекта JSON, добавив его в новом поле «decryptedDocumentKey». Получив ответ, автор исходного запроса получит доступ к AMP Framework.

Шаги, описанные выше, представлены в следующем фрагменте псевдокода:

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

# Ресурсы по теме

Ознакомьтесь с документацией и примерами, размещенными на [странице Tink на Github](https://github.com/google/tink).

Все вспомогательные скрипты находятся в [репозитории Github subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Дальнейшая поддержка

Чтобы задать вопрос, оставить комментарий или сообщить о проблеме, создайте [задачу на Github](https://github.com/subscriptions-project/encryption/issues).
