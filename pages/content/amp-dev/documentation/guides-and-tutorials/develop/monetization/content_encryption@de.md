---
formats:
  - websites
'$title': Schütze deine Abonnementinhalte mit clientseitiger Verschlüsselung
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Probleme bei der Inhaltsverschlüsselung lassen sich lösen, indem du die Validierung von Premiumabonnenten sowie Inhaltsentschlüsselung auf der Clientseite implementierst. Mit dieser Lösung können Benutzer mit Premiumzugriff Inhalte entschlüsseln, ohne eine neue Seite zu laden oder auf die Antwort des Backends zu warten!
author: CrystalOnScript
---

Wenn du eine Online Publikation betreibst, erzielst du wahrscheinlich Einnahmen über Abonnenten. Du kannst Premiuminhalte mithilfe von [CSS Verschleierung](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`) hinter einer Paywall auf dem Client blockieren.

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premiuminhalte werden bis zur Benutzerauthentifizierung verborgen.') }}

Leider können technisch versierte Menschen das umgehen.

Aber du kannst den Benutzern stattdessen ein Dokument zeigen, das gar keine Premiuminhalte enthält! Dafür stellst du eine völlig neue Seite bereit, sobald dein Backend den Benutzer validiert. Diese Methode ist zwar sicherer, hat aber negativen Einfluss auf Zeit, Ressourcen und Benutzerzufriedenheit.

Beide Probleme lassen sich durch die Implementierung der Validierung von Premiumabonnenten und der Inhaltsentschlüsselung auf der Clientseite lösen. Mit dieser Lösung können Benutzer mit Premiumzugriff Inhalte entschlüsseln, ohne eine neue Seite zu laden oder auf die Antwort des Backends zu warten!

# Übersicht über das Setup

Um die clientseitige Entschlüsselung zu implementieren, kombinierst du die Kryptografie mit symmetrischem Schlüssel und öffentlichem Schlüssel wie folgt:

1. Erstelle für jedes Dokument einen zufälligen symmetrischen Schlüssel und gib jedem Dokument einen _eindeutigen_ Schlüssel. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Eindeutige Schlüssel für jedes individuelle Dokument.') }}
2. Verschlüssle den Premiuminhalt mit dem symmetrischen Schlüssel des Dokuments. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Verschlüssle den Premiuminhalt mit dem Dokumentschlüssel.') }} Der Schlüssel ist symmetrisch, damit der Inhalt mit demselben Schlüssel verschlüsselt und entschlüsselt werden kann. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='Das Dokument wird vom selben Schlüssel verschlüsselt und entschlüsselt.') }}
3. Verschlüssle den Dokumentschlüssel mit einem öffentlichen Schlüssel und verwende ein Protokoll zur [hybriden Verschlüsselung](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), um die symmetrischen Schlüssel zu verschlüsseln. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='Ein Protokoll zur hybriden Verschlüsselung verschlüsselt den symmetrischen Schlüssel mit einem öffentlichen Schlüssel.') }}
4. Speichere den verschlüsselten Dokumentschlüssel neben dem verschlüsselten Premiuminhalt im AMP Dokument. Verwende dazu die Komponente(n) [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) und/oder [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites). {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Beide Schlüssel werden im AMP Dokument gespeichert.') }}

Der verschlüsselte Schlüssel wird im AMP Dokument gespeichert. Dies verhindert eine Entkopplung des verschlüsselten Dokuments von dem Schlüssel, der es entschlüsselt.

# Wie funktioniert das?

1. AMP liest den Schlüssel aus den verschlüsselten Inhalten des Dokuments aus, bei dem der Benutzer landet. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='Verschlüsselungen mit dem öffentlichen und dem symmetrischen Schlüssel.') }}
2. Während der Premiuminhalt verarbeitet wird, sendet AMP den verschlüsselten symmetrischen Schlüssel aus dem Dokument als Teil des Abrufs der Benutzerberechtigung an den Autorisierer. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sendet den verschlüsselten symmetrischen Schlüssel aus dem Dokument als Teil des Abrufs der Benutzerberechtigung an den Autorisierer.') }}
3. Der Autorisierer entscheidet, ob der Benutzer über die passenden Berechtigungen verfügt. Wenn ja, entschlüsselt der Autorisierer den symmetrischen Schlüssel des Dokuments mit seinem privaten Schlüssel aus seinem eigenen Paar aus öffentlichem/privatem Schlüssel. Dann gibt der Autorisierer den Dokumentschlüssel an die [Komponentenlogik von amp-subscriptions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264) zurück. {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='Die AMP Logik entschlüsselt die Schlüssel.') }}
4. AMP entschlüsselt den Premiuminhalt mithilfe des Dokumentschlüssels und zeigt ihn dem Benutzer an. {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP entschlüsselt den Premiuminhalt mithilfe des Dokumentschlüssels und zeigt ihn dem Benutzer an.') }}

# Implementierungsschritte

Führe die folgenden Schritte aus, um die Verarbeitung der AMP Verschlüsselung in deinen internen Berechtigungsserver zu integrieren.

## Schritt 1: Erstelle ein Paar aus öffentlichem/privatem Schlüssel

Um den symmetrischen Schlüssel des Dokuments zu verschlüsseln, benötigst du ein eigenes Paar aus öffentlichem/privatem Schlüssel. Die Verschlüsselung mit einem öffentlichen Schlüssel ist ein Protokoll zur [hybriden Verschlüsselung](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), genauer gesagt eine asymmetrische ECIES Verschlüsselungsmethode vom Typ [P-256 Elliptic Curve](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) mit einer symmetrischen [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-Bit) Verschlüsselungsmethode.

Die Handhabung öffentlicher Schlüssel muss mit [Tink](https://github.com/google/tink) unter Verwendung [dieses asymmetrischen Schlüsseltyps](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32) erfolgen. Verwende eine der folgenden Methoden, um dein Paar aus öffentlichem/privatem Schlüssel zu erstellen:

- Klasse [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) von Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (Hilfsprogramm von Tink)

Beide unterstützen die Schlüsselrotation. Die Implementierung der Schlüsselrotation reduziert das Sicherheitsrisiko, das von einem kompromittierten privaten Schlüssel ausgeht.

Um das Erstellen asymmetrischer Schlüssel zu vereinfachen, haben wir [dieses Skript](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen) erstellt:

1. Es erstellt ein neues ECIES mit AEAD Schlüssel.
2. Es gibt den öffentlichen Schlüssel als Klartext in eine Ausgabedatei aus.
3. Es gibt den privaten Schlüssel in eine andere Ausgabedatei aus.
4. Es verschlüsselt den generierten privaten Schlüssel mit einem Schlüssel, der in Google Cloud (GCP) gehostet wird, bevor er in die Ausgabedatei geschrieben wird (gewöhnlich als [Umschlagverschlüsselung](https://cloud.google.com/kms/docs/envelope-encryption) bezeichnet).

Dein öffentliches [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) muss im [JSON Format](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go) gespeichert/veröffentlicht werden. Das gewährleistet die Kompatibilität mit anderen von AMP bereitgestellten Tools. Unser Skript gibt den öffentlichen Schlüssel bereits in diesem Format aus.

## Schritt 2: Verschlüssle Artikel

Entscheide, ob du Premiuminhalte manuell oder automatisch verschlüsseln möchtest.

### Manuell verschlüsseln

Die Verschlüsselung von Premiuminhalten muss mithilfe der symmetrischen [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) Methode mit Tink erfolgen. Der symmetrische Dokumentschlüssel, mit dem der Premiuminhalt verschlüsselt wird, muss für jedes Dokument eindeutig sein. Füge den Dokumentschlüssel zu einem JSON Objekt hinzu, das sowohl den Schlüssel in base64-codiertem Klartext enthält als auch die SKUs, die für den Zugriff auf den verschlüsselten Inhalt des Dokuments erforderlich sind.

Das folgende JSON Objekt zeigt ein Beispiel für den Schlüssel in base64-codiertem Klartext und die SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Verschlüssle das obige JSON Objekt mit dem öffentlichen Schlüssel, den du im Abschnitt "Erstelle ein Paar aus öffentlichem/privatem Schlüssel" generiert hast.

Füge das verschlüsselte Ergebnis als Wert zum Schlüssel `"local"` hinzu. Platziere das Schlüssel-Wert-Paar in einem JSON Objekt, das sich innerhalb des Tags `<script type="application/json" cryptokeys="">` befindet. Platziere das Tag im Header des Dokuments.

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

Du musst den Dokumentschlüssel mit der lokalen Umgebung und dem [öffentlichen Google Schlüssel](https://news.google.com/swg/encryption/keys/prod/tink/public_key) verschlüsseln. Durch das Einbeziehen des öffentlichen Google Schlüssels kann der Google AMP Cache dein Dokument bereitstellen. Du musst ein [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) instanziieren, um den öffentlichen Google Schlüssel von seiner URL zu akzeptieren:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Der öffentliche Google Schlüssel ist ein [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) im [JSON Format](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). [Hier](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) findest du ein Beispiel für die Arbeit mit diesem Keyset.

Zum Weiterlesen: [Hier findest du ein Beispiel für ein funktionierendes verschlüsseltes AMP Dokument.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Automatisch verschlüsseln

Verschlüssle das Dokument mit unserem [Skript](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). Das Skript akzeptiert ein HTML Dokument und verschlüsselt alle Inhalte innerhalb der Tags `<section subscriptions-section="content" encrypted>`. Mithilfe der öffentlichen Schlüssel, die sich unter den weitergegebenen URLs befinden, verschlüsselt das Skript den vom Skript erstellten Dokumentschlüssel. Die Verwendung dieses Skripts gewährleistet, dass alle bereitzustellenden Inhalte korrekt codiert und formatiert werden. [Hier](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) findest du weitere Anweisungen zur Verwendung dieses Skripts.

## Schritt 3: Integriere den Autorisierer

Du musst deinen Autorisierer aktualisieren, um die Dokumentschlüssel zu entschlüsseln, wenn ein Benutzer über die richtigen Berechtigungen verfügt. Die Komponente amp-subscriptions sendet den verschlüsselten Dokumentschlüssel automatisch über den URL Parameter ["crypt="](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70) an den Autorisierer `"local"`. Dieser führt folgende Aktionen aus:

1. Auslesen des Dokumentschlüssels aus dem JSON Schlüsselfeld `"local"`
2. Entschlüsselung des Dokuments

Du musst Tink verwenden, um Dokumentschlüssel in deinem Autorisierer zu entschlüsseln. Um mit Tink zu entschlüsseln, instanziiere einen [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) Client mithilfe der privaten Schlüssel, die du im Abschnitt "Erstelle ein Paar aus öffentlichem/privatem Schlüssel" generiert hast. Tu dies beim Serverstart, um eine optimale Leistung zu erzielen.

Deine HybridDecrypt/Autorisierer Bereitstellung sollte in etwa deinem Zeitplan für die Schlüsselrotation entsprechen. Dies ermöglicht die Verfügbarkeit aller generierten Schlüssel für den HybridDecrypt Client.

Tink bietet eine umfangreiche [Dokumentation](https://github.com/google/tink/tree/master/docs) und [Beispiele](https://github.com/google/tink/tree/master/examples) für C++, Java, Go und JavaScript, um dir beim Einstieg in deine serverseitige Implementierung zu helfen.

### Anforderungsverwaltung

Wenn dein Autorisierer eine Anforderung erhält:

1. Lies die Pingback URL der Berechtigungen für den Parameter "crypt=" aus.
2. Dekodiere den "crypt =" Parameterwert mit base64. Der im URL Parameter gespeicherte Wert ist das base64-codierte verschlüsselte JSON Objekt.
3. Sobald der verschlüsselte Schlüssel in Form von Rohbytes vorliegt, verwende die Entschlüsselungsfunktion von HybridDecrypt, um den Schlüssel mit deinem privaten Schlüssel zu entschlüsseln.
4. Wenn die Entschlüsselung erfolgreich ist, verarbeite das Ergebnis zu einem JSON Objekt.
5. Überprüfe den Zugriff des Benutzers auf eine der Berechtigungen, die im JSON Feld "AccessRequirements" aufgeführt sind.
6. Gib den Dokumentschlüssel aus dem Feld "Key" des entschlüsselten JSON Objekts in der Berechtigungsantwort zurück. Füge den entschlüsselten Dokumentschlüssel in ein neues Feld mit dem Titel "decryptedDocumentKey" in der Berechtigungsantwort ein. Dies gewährt Zugriff auf das AMP Framework.

Das folgende Beispiel ist ein Snippet mit Pseudocode, das die oben beschriebenen Schritte illustriert:

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

# Relevante Ressourcen

Sieh dir die Dokumentation und die Beispiele auf der [GitHub Seite von Tink](https://github.com/google/tink) an.

Du findest sämtliche Hilfsskripte im [GitHub Repo subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Weitere Unterstützung

Wenn du Fragen, Kommentare oder Bedenken hast, erstelle bitte ein [GitHub Issue](https://github.com/subscriptions-project/encryption/issues).
