---
formats:
  - websites
'$title': Ochrona subskrybowanych treści za pomocą szyfrowania po stronie klienta
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Rozwiązywanie problemów z szyfrowaniem treści poprzez wdrożenie walidacji subskrybentów premium i deszyfrowania treści po stronie klienta. Dzięki temu rozwiązaniu użytkownicy z dostępem premium będą mogli odszyfrować treść bez konieczności ładowania nowej strony ani czekania na odpowiedź zaplecza!
author: CrystalOnScript
---

Jeśli jesteś wydawcą internetowym, dochody prawdopodobnie osiągasz z subskrypcji. Możesz blokować treści premium za paywallem na kliencie, stosując [zaciemnianie kodu CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Treści premium są ukrywane do momentu uwierzytelnienia użytkowników.') }}

Niestety, bardziej zaawansowani technicznie użytkownicy mogą to obejść.

Zamiast tego, można pokazywać użytkownikom dokument, który nie zawiera treści premium! Chodzi o serwowanie całkowicie nowej strony po zatwierdzeniu użytkownika przez zaplecze. Metoda ta, choć bezpieczniejsza, kosztuje czas, zasoby i zadowolenie użytkownika.

Rozwiąż oba te problemy poprzez wdrożenie walidacji subskrybentów premium i deszyfrowania treści po stronie klienta. Dzięki temu rozwiązaniu użytkownicy z dostępem premium będą mogli odszyfrować treść bez konieczności ładowania nowej strony ani czekania na odpowiedź backendu!

# Omówienie ustawień

W celu wdrożenia szyfrowania po stronie klienta należy połączyć szyfrowanie przy użyciu klucza symetrycznego z szyfrowaniem przy użyciu klucza publicznego w następujący sposób:

1. Utwórz losowy klucz symetryczny dla każdego dokumentu, przydzielając każdemu dokumentowi _unikalny_ klucz. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unikalne klucze dla każdego unikalnego dokumentu.') }}
2. Zaszyfruj treść premium za pomocą klucza symetrycznego dokumentu. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Użyj klucza dokumentu do szyfrowania treści premium.') }} Klucz jest symetryczny, aby umożliwić zaszyfrowanie i odszyfrowanie treści za pomocą tego samego klucza. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='Ten sam klucz, który szyfruje dokument, również go odszyfrowuje.') }}
3. Zaszyfruj klucz dokumentu przy użyciu klucza publicznego, używając [hybrydowego protokołu szyfrowania](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) do szyfrowania kluczy symetrycznych. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='Hybrydowy protokół szyfrowania szyfruje klucz symetryczny za pomocą klucza publicznego.') }}
4. Za pomocą składników [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) i/lub [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) zapisz zaszyfrowany klucz dokumentu w dokumencie AMP wraz z zaszyfrowaną treścią premium. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Oba klucze są przechowywane wewnątrz dokumentu AMP.') }}

Dokument AMP przechowuje zaszyfrowany klucz w sobie. Zapobiega to odłączeniu zaszyfrowanego dokumentu od klucza, który go dekoduje.

# Jak to działa?

1. AMP analizuje klucz z zaszyfrowanej treści dokumentu, w którym ląduje użytkownik. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='Szyfrowanie za pomocą klucza publicznego i symetrycznego.') }}
2. Podczas serwowania treści premium AMP wysyła zaszyfrowany klucz symetryczny z dokumentu do autoryzatora w ramach pobierania uprawnień użytkownika. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP wysyła zaszyfrowany klucz symetryczny z dokumentu do autoryzatora w ramach pobierania uprawnień użytkownika.') }}
3. Autoryzer decyduje, czy użytkownik ma odpowiednie uprawnienia. Jeśli tak, odszyfrowuje klucz symetryczny dokumentu kluczem prywatnym autoryzera z jego pary kluczy publiczny/prywatny. Następnie autoryzator zwraca klucz dokumentu do logiki składnika [amp-subscriptions](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='Logika AMP odszyfrowuje klucze.') }}
4. AMP odszyfrowuje treść premium za pomocą klucza dokumentu i pokazuje ją użytkownikowi! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP odszyfrowuje treść premium za pomocą klucza dokumentu i pokazuje ją użytkownikowi.') }}

# Kroki implementacji

Wykonaj poniższe kroki, aby zintegrować obsługę szyfrowania AMP z wewnętrznym serwerem uprawnień.

## Krok 1: utwórz parę kluczy publiczny/prywatny

Do zaszyfrowania klucza symetrycznego dokumentu niezbędna jest własna para kluczy publiczny/prywatny. Klucz publiczny jest szyfrowany za pomocą [hybrydowego protokołu szyfrowania](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), a konkretnie metody szyfrowania asymetrycznego ECIES przy użyciu [krzywej eliptycznej P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) z metodą szyfrowania symetrycznego [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bitową).

Wymagamy obsługi klucza publicznego za pomocą [Tink](https://github.com/google/tink) przy użyciu [tego typu klucza asymetrycznego](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Aby utworzyć parę kluczy prywatny-publiczny, użyj jednego z poniższych sposobów:

- Klasy Tink [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java)
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (narzędzia Tink do obsługi kluczy)

Obie wspierają rotację klucza. Wdrożenie rotacji kluczy ogranicza podatność na złamanie klucza prywatnego.

Aby ułatwić Ci rozpoczęcie tworzenia kluczy asymetrycznych, utworzyliśmy [ten skrypt](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Służy on do:

1. Tworzenia nowych schematów ECIES za pomocą klucza AEAD.
2. Wyprowadzania klucza publicznego w postaci zwykłego tekstu do pliku wyjściowego.
3. Wyprowadzania klucza prywatnego do innego pliku wyjściowego.
4. Szyfrowania wygenerowanego klucza prywatnego za pomocą klucza umieszczonego na serwerze Google Cloud (GCP) przed zapisaniem go w pliku wyjściowym, (powszechnie zwane jest to [szyfrowaniem koperty](https://cloud.google.com/kms/docs/envelope-encryption)).

Wymagamy przechowywania/publikowania Twojego publicznego [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) w formacie [JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Pozwala to na bezproblemową pracę innych narzędzi AMP. Nasz skrypt już generuje klucz publiczny w tym formacie.

## Krok 2: zaszyfruj artykuły

Zadecyduj, czy będziesz szyfrować treści premium ręcznie, czy automatycznie.

### Szyfrowanie ręczne

Do szyfrowania treści premium wymagamy metody symetrycznej [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode), wykorzystującej Tink. Klucz symetryczny dokumentu używany do szyfrowania treści premium powinien być unikalny dla każdego dokumentu. Dodaj klucz dokumentu do obiektu JSON, który zawiera klucz w zwykłym tekście o kodowaniu base64, a także jednostki SKU wymagane do uzyskania dostępu do zaszyfrowanej zawartości dokumentu.

Poniższy obiekt JSON zawiera przykładowy klucz w prostym tekście zakodowanym w base64 oraz SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Powyższy obiekt JSON należy zaszyfrować przy użyciu klucza publicznego wygenerowanego w kroku Utwórz parę kluczy publiczny/prywatny.

Dodaj zaszyfrowany wynik jako wartość do klucza `"local"`. Umieść parę klucz-wartość w obiekcie JSON w otoce znacznika `<script type="application/json" cryptokeys="">`. Umieść znacznik w nagłówku dokumentu.

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

Musisz zaszyfrować klucz dokumentu za pomocą środowiska lokalnego i [klucza publicznego Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Dodanie klucza publicznego Google umożliwi serwerowi buforującemu Google AMP zaserwowanie dokumentu. Aby zaakceptować klucz publiczny Google z jego adresu URL, musisz utworzyć wystąpienie [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md):

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Klucz publiczny Google to [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) w [formacie JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Zobacz [tutaj](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) przykład pracy z tym zestawem kluczy.

Czytaj dalej: [zobacz przykład działającego szyfrowanego dokumentu AMP.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Automatyczne szyfrowanie

Zaszyfruj dokument za pomocą naszego [skryptu](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). Skrypt akceptuje dokument HTML i szyfruje całą zawartość wewnątrz znaczników `<section subscriptions-section="content" encrypted>`. Przy użyciu kluczy publicznych znajdujących się przekazanych do niego w adresach URL, skrypt szyfruje klucz dokumentu utworzony przez skrypt. Użycie tego skryptu zapewnia, że cała zawartość zostaje zaszyfrowana i prawidłowo sformatowana do serwowania. Dalsze instrukcje dotyczące stosowania tego skryptu znajdują się [tutaj](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md).

## Krok 3: zintegruj autoryzator

Aby móc odszyfrować klucze dokumentów, gdy użytkownik ma odpowiednie uprawnienia, musisz zaktualizować autoryzator. Składnik amp-subscriptions automatycznie wysyła zaszyfrowany klucz dokumentu do autoryzatora `"local"` poprzez parametr adresu URL ["crypt="](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70)". Wykonuje on:

1. Analizę klucza dokumentu z pola JSON klucza `"local"`.
2. Odszyfrowanie dokumentu.

Do odszyfrowywania kluczy dokumentów w swoim autoryzatorze musisz używać Tink. Aby odszyfrowywać za pomocą Tink, utwórz wystąpienie klienta [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) przy użyciu kluczy prywatnych wygenerowanych w kroku Utwórz parę kluczy publiczny/prywatny. Wykonaj to podczas uruchamiania serwera, aby uzyskać optymalną wydajność.

Wdrożenie klienta HybridDecrypt/autoryzatora powinno być z grubsza zgodne z harmonogramem rotacji kluczy. Dzięki temu wszystkie wygenerowane klucze będą dostępne dla klienta HybridDecrypt.

Tink ma rozbudowaną [dokumentację](https://github.com/google/tink/tree/master/docs) i [przykłady](https://github.com/google/tink/tree/master/examples) w językach C++, Java, Go i JavaScript, ułatwiającą rozpoczęcie implementacji po stronie serwera.

### Zarządzanie żądaniami

Gdy do autoryzatora przychodzi żądanie:

1. Przeanalizuj adres URL pingbacku uprawnień pod względem parametru "crypt=".
2. Odszyfruj wartość parametru "crypt=" za pomocą base64. Wartością zapisaną w parametrze adresu URL jest zaszyfrowany obiekt JSON zakodowany za pomocą base64.
3. Gdy klucz szyfrowany ma już postać nieprzetworzonych bajtów, użyj funkcji odszyfrowywania HybridDecrypt, aby odszyfrować klucz za pomocą klucza prywatnego.
4. Jeśli odszyfrowanie powiedzie się, przetwórz wynik na obiekt JSON.
5. Zweryfikuj dostęp użytkownika do jednego z uprawnień wymienionych w polu JSON AccessRequirements.
6. Zwróć klucz dokumentu z pola „Key” odszyfrowanego obiektu JSON w odpowiedzi z uprawnieniami. Dodaj odszyfrowany klucz dokumentu w nowym polu „decryptedDocumentKey” w odpowiedzi z uprawnieniami. Umożliwi to dostęp do frameworku AMP.

Poniższa próbka to fragment pseudokodu, ilustrujący powyższe kroki z opisu:

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

# Zasoby pokrewne

Zapoznaj się z dokumentacją i przykładami znajdującymi się na [stronie Tink na Github](https://github.com/google/tink).

Wszystkie skrypty pomocnicze znajdują się w [repozytorium Github subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Dodatkowa pomoc

W przypadku jakichkolwiek pytań, uwag lub wątpliwości wypełnij formularz [zgłoszenia do Github](https://github.com/subscriptions-project/encryption/issues).
