---
"$title": Grundlagen zu AMP für E-Mail
"$order": '1'
description: Alles, was du wissen musst, um mit der Erstellung gültiger AMP E-Mails zu beginnen.
author: CrystalOnScript
formats:
- email
---

Gute Neuigkeiten für alle, die schon mit AMP vertraut sind: AMP für E-Mails ist nur eine Untergruppe der AMP HTML Bibliothek. Gute Neuigkeiten für alle, die noch nicht mit AMP vertraut sind: In diesem Leitfaden findest du alles, was du brauchst, um mit der Erstellung gültiger AMP E-Mails beginnen zu können!

## Erforderliches Markup

AMP E-Mails sehen aus wie klassische HTML E-Mails, weisen jedoch einige Unterschiede auf. Nachfolgend findest du das mindestens erforderliche Markup, der erforderlich ist, um eine normale E-Mail in eine gültige AMP E-Mail zu verwandeln.

```html
<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body>
  Hello, AMP4EMAIL world.
</body>
</html>
```

E-Mail Anbieter, die AMP E-Mails unterstützen, haben Sicherheitsüberprüfungen eingerichtet, um eine angenehme und sichere Benutzererfahrung zu gewährleisten. Eine E-Mail, die mit AMP erstellt wird, muss alle folgenden Anforderungen erfüllen:

- Sie muss mit dem Doctype `<!doctype html>` beginnen. Das ist auch bei HTML Standard.
- Sie muss das Top-Level Tag `<html amp4email>` enthalten (oder das Tag `<html ⚡4email>`, wenn deine E-Mail besonders cool ist). Dadurch wird das Dokument als AMP E-Mail identifiziert und dementsprechend behandelt.
- Sowohl das Tag `<head>` als auch das Tag `<body>` müssen definiert sein. Das ist in HTML optional, aber AMP strebt eine tadellose Struktur an!
- Das Tag `<meta charset="utf-8>` muss als erstes untergeordnetes Element des Tags `<head>` enthalten sein. Damit wird die Zeichencodierung der Seite festgelegt.
- Die AMP Bibliothek wird über das Tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` importiert, welches im Tag `<head>` platziert wird. Ohne sie können die fantastischen und dynamischen Funktionen, die AMP bietet, nicht funktionieren! Als Best Practice sollte sie so früh wie möglich im Tag `<head>`, am besten direkt unter dem Tag `<meta charset="utf-8">` platziert werden.
- Der Inhalt der E-Mail muss ausgeblendet sein, solange die AMP Bibliothek geladen wird. Dazu wird die Boilerplate für AMP für E-Mail im Tag `<head>` platziert.

```html
<head>
...
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
```

### AMP spezifische Alternativen für Tags

Da die Bibliothek für AMP für E-Mail eine Untergruppe der AMP HTML Bibliothek ist, sind viele der Regeln gleich. AMP spezifische Tags ersetzen ressourcenintensive HTML Tags und erfordern eine definierte Breite und Höhe. Auf diese Weise kann die AMP Boilerplate Inhalte ausblenden, bis ermittelt wurde, wie diese auf dem Gerät der Benutzer aussehen werden.

#### Bilder

Um die Seite effektiv aufzubauen, werden alle Tags vom Typ `<img>` mit [`<amp-img>`](../../../documentation/components/reference/amp-img.md) ersetzt. Das Tag `<amp-img>` erfordert eine definierte Breite und Höhe und unterstützt das [Layoutsystem von AMP](amp-html-layout/index.md).

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

Das Tag `<amp-img>` bietet mächtige, integrierte Funktionen zur Steuerung von Responsive Design und zur Angabe von Fallbacks.

[tip type="note"] Sieh dir gerne weiterführende Informationen zur Verwendung der [Layout und Media Queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) von AMP und der Einrichtung von [Fallbacks für Bilder ](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) an. [/tip]

#### GIFs

AMP hat <[`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email) eingeführt, ein spezielles Tag für GIF Bilder, mit dem die AMP Runtime die Auslastung der CPU reduziert, wenn die Animation außerhalb des sichtbaren Bildbereichs abläuft. Ähnlich wie bei `<amp-img>` auch hier Breite und Höhe definiert werden, und das Element erfordert ein schließendes Tag.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Darüber hinaus unterstützt das Tag das AMP Layoutsystem sowie das optionale untergeordnete Element `placeholder`, welches angezeigt wird, während die Datei in `src` geladen wird.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## E-Mails mit Stil <a name="emails-with-style"></a>

Wie alle E-Mail Clients erlaubt auch AMP Inline Attribute vom Typ `style` und unterstützt darüber hinaus CSS innerhalb des Tags `<style amp-custom>` im Kopf der E-Mail.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Genau wie HTML E-Mails unterstützt AMP für E-Mail eine begrenzte Auswahl an CSS Selektoren und Eigenschaften.

Im Abschnitt [In AMP für E-Mail unterstütztes CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) findest du eine vollständige Liste der CSS Ausdrücke, die AMP fähige E-Mail Clients erlauben.

[tip type="important"] AMP erzwingt eine Größenbeschränkung von 75.000 Byte für Styling. [/tip]

## Zulässige AMP Komponenten

AMP E-Mails sind dank der dynamischen, visuellen und interaktiven Funktionen von AMP Komponenten die Zukunft von E-Mail.

Die vollständige [Liste der unterstützten Komponenten in AMP für Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) ist als Teil der Spezifikation für AMP für E-Mail verfügbar.

## Authentifizierung von Anfragen

Dynamische personalisierte E-Mail Inhalte erfordern häufig die Authentifizierung der Benutzer. Zum Schutz der Benutzerdaten können jedoch alle HTTP Anforderungen, die innerhalb von AMP E-Mails gestellt werden, via Proxy übertragen und von Cookies befreit werden.

Zur Authentifizierung von Anfragen aus AMP E-Mails können Zugriffstokens verwendet werden.

### Zugriffstokens

Zur Authentifizierung von Benutzern können Zugriffstokens verwendet werden. Zugriffstokens werden vom E-Mail Absender bereitgestellt und überprüft. Der Absender stellt anhand der Tokens sicher, dass nur Personen mit Zugriff auf die AMP E-Mail die in dieser E-Mail enthaltenen Anfragen stellen können. Zugriffstokens müssen kryptografisch sicher und hinsichtlich Lebensdauer und Geltungsbereich begrenzt sein. Sie sind in der URL der Anfrage enthalten.

Dieses Beispiel demonstriert die Anzeige authentifizierter Daten mithilfe von `<amp-list>`:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache">
    ...
  </template>
</amp-list>
```

Ähnlich dazu kannst du bei der Verwendung von `<amp-form>` dein Zugriffstoken in der URL `action-xhr` platzieren.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Beispiel

Im folgenden Beispiel wird ein hypothetischer Notizendienst betrachtet, mit dem angemeldete Benutzer in ihrem Konto Notizen hinzufügen und diese später ansehen können. Der Dienst möchte eine E-Mail an die Benutzerin `jane@example.com` senden. Die E-Mail soll eine Liste der bereits gespeicherten Notizen enthalten. Die Liste der Notizen der aktuellen Benutzerin ist am Endpoint `https://example.com/personal-notes` im JSON Format verfügbar.

Vor dem Senden der E-Mail generiert der Dienst ein kryptografisch sicheres Zugriffstoken mit eingeschränkter Verwendung für `jane@example.com: A3a4roX9x`. Das Zugriffstoken ist im Feldnamen `exampletoken` innerhalb der URL Anfrage enthalten:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

Der Endpoint `https://example.com/personal-notes` ist dafür verantwortlich, den Parameter "exampletoken" zu validieren und den mit dem Token verknüpften Benutzer zu finden.

### Zugriffstokens mit eingeschränkter Verwendung

Zugriffstokens mit eingeschränkter Verwendung bieten Schutz vor Request Spoofing und [Replay Angriffen](https://en.wikipedia.org/wiki/Replay_attack) und stellen sicher, dass die Aktion von dem Benutzer ausgeführt wird, an den die Nachricht gesendet wurde. Um den Schutz sicherzustellen, wird ein eindeutiger Tokenparameter zu den Parametern der Anfrage hinzugefügt und beim Aufruf der Aktion überprüft.

Der Tokenparameter sollte als Schlüssel generiert werden, der nur für eine bestimmte Aktion und einen bestimmten Benutzer verwendet werden kann. Bevor die angeforderte Aktion ausgeführt wird, solltest du überprüfen, ob das Token gültig ist und mit dem übereinstimmt, das du für den Benutzer generiert hast. Wenn die Tokens übereinstimmen, kann die Aktion ausgeführt werden und das Token verliert seine Gültigkeit für zukünftige Anfragen.

Zugriffstokens sollten Benutzern als Teil der Eigenschaft "url" der Klasse "HttpActionHandler" gesendet werden. Wenn deine Anwendung zum Beispiel Genehmigungsanfragen unter `http://www.example.com/approve?requestId=123` verarbeitet, ist es ratsam, den zusätzlichen Parameter `accessToken` hinzuzufügen und Anfragen abzuhören, die an `http://www.example.com/approve?requestId=123&accessToken=xyz` gesendet werden.

Die Kombination von `requestId=123` und `accessToken=xyz` muss im voraus generiert werden, um sicherzustellen, dass `accessToken` nicht von `requestId` abgeleitet werden kann. Genehmigungsanfragen mit `requestId=123` und keinem `accessToken` oder mit einem `accessToken` ungleich `xyz` sollten abgelehnt werden. Nach der Genehmigung dieser Anfrage sollten alle zukünftigen Anfragen mit derselben ID und demselben Zugriffstoken abgelehnt werden.

## Testen in verschiedenen E-Mail Clients

E-Mail Clients, die AMP für E-Mail unterstützen, stellen ihre eigenen Tools für Dokumentation und Tests zur Verfügung, um dir bei der Integration zu helfen.

Weitere Informationen und Links zu Dokumentation, die für bestimmte E-Mail Clients spezifisch ist, findest du unter [AMP E-Mails testen](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md).
