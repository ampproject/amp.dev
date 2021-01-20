---
"$title": CORS in AMP
order: '12'
formats:
- websites
- email
- stories
- ads
teaser:
  text: Viele AMP Komponenten und Erweiterungen nutzen Remote Endpoints mithilfe von
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Viele AMP Komponenten und Erweiterungen nutzen Remote Endpoints mithilfe von CORS Anfragen (Cross-Origin Resource Sharing). In diesem Dokument werden die wichtigsten Aspekte der Verwendung von CORS in AMP erläutert. Informationen zu CORS selbst finden Sie in der [W3 CORS Spezifikation](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">Warum brauche ich CORS für meine eigene Quelle? </a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Verwendung von Cookies für CORS Anfragen</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">CORS Sicherheit in AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">CORS Anfragen verifizieren</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Anfragen für bestimmte CORS Quellen erlauben</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Anfragen aus gleicher Quelle erlauben</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">CORS Anfrageheader senden</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a><origin></origin>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Anfragen zur Zustandsänderung verarbeiten</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Beispielanleitung: Verarbeitung von CORS Anfragen und Antworten</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">CORS in AMP testen</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Warum brauche ich CORS für meine eigene Quelle? <a name="why-do-i-need-cors-for-my-own-origin"></a>

Vielleicht wunderst du dich, warum du CORS für Anfragen an deine eigene Quelle benötigst. Sehen wir uns das an.

AMP Komponenten, die dynamische Daten abrufen (z. B. amp-form, amp-list usw.), senden CORS Anfragen an Remote Endpoints, um diese Daten abzurufen. Wenn deine AMP Seite solche Komponenten enthält, musst du mit CORS arbeiten, damit diese Anfragen nicht fehlschlagen.

Wir können das anhand eines Beispiels veranschaulichen:

Angenommen, du hast eine AMP Seite, auf der Produkte mit Preisen aufgelistet sind. Um die Preise auf der Seite zu aktualisieren, klickt der Benutzer auf einen Button, der die neuesten Preise von einem JSON Endpoint abruft (über die Komponente amp-list). Das JSON befindet sich in deiner Domäne.

Okay, die Seite ist *in meiner Domäne* und das JSON ist auch *in meiner Domäne*. Kein Problem!

Ah, aber wie hat der Benutzer deine AMP Seite erreicht? Hat er auf eine Seite im Cache zugegriffen? Es ist sehr wahrscheinlich, dass der Benutzer nicht direkt auf deine AMP Seite zugegriffen hat, sondern diese über eine andere Plattform entdeckt hat. So verwendet z. B. die Google Suche den Google AMP Cache, um AMP Seiten schnell zu rendern. Hierbei handelt es sich um zwischengespeicherte Seiten, die aus dem Google AMP Cache bereitgestellt werden – einer *anderen* Domäne. Wenn der Benutzer auf den Button klickt, um die Preise auf deiner Seite zu aktualisieren, sendet die AMP Seite im Cache eine Anfrage an deine Ursprungsdomäne, um die Preise abzurufen. Dies ist eine Nichtübereinstimmung der Quellen (Cache -> Ursprungsdomäne). Um solche Cross-Origin Anfragen zuzulassen, musst du mit CORS arbeiten. Andernfalls schlägt die Anfrage fehl.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS und Cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Okay, was soll ich tun?**

1. Stelle sicher, dass du bei AMP Seiten, die dynamische Daten abrufen, die Cache Version dieser Seiten testest. *Teste sie nicht nur auf deiner eigenen Domäne*. (Siehe Abschnitt [CORS in AMP testen](#testing-cors-in-amp) unten)
2. Befolge die Anleitung in diesem Dokument, um CORS Anfragen und Antworten zu verarbeiten.

## Verwendung von Cookies für CORS Anfragen <a name="utilizing-cookies-for-cors-requests"></a>

Die meisten AMP Komponenten, die CORS Anfragen verwenden, legen entweder automatisch den [Credentials Mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) fest oder erlauben dem Autor, ihn optional zu aktivieren. Beispielsweise ruft die Komponente [`amp-list`](https://amp.dev/documentation/components/amp-list) dynamische Inhalte von einem CORS JSON Endpoint ab und ermöglicht dem Autor, den Credentials Mode über das Attribut `credentials` festzulegen.

*Beispiel: Personalisierte Inhalte mithilfe von Cookies in amp-list einfügen*

[sourcecode:html]
<amp-list
  credentials="include"
  src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"
>
  <template type="amp-mustache">
    Your personal offer: ${% raw %}{{price}}{% endraw %}
  </template>
</amp-list>
[/sourcecode]

Durch Angabe des Credentials Mode kann die Quelle Cookies in die CORS Anfrage aufnehmen und Cookies in der Antwort platzieren (unterliegt der [Beschränkung für Drittanbieter-Cookies](#third-party-cookie-restrictions)).

### Beschränkung für Drittanbieter-Cookies <a name="third-party-cookie-restrictions"></a>

Dieselben im Browser festgelegten Beschränkungen von Drittanbieter-Cookies gelten auch für CORS Anfragen mit Credentials in AMP. Diese Einschränkungen hängen vom Browser und der Plattform ab. Bei einigen Browsern kann die Quelle jedoch nur Cookies verwenden, wenn der Benutzer die Quelle des Erstanbieters bereits in einem Hauptfenster aufgerufen hat. Mit anderen Worten: nachdem der Benutzer die eigentliche Website der Quelle direkt besucht hat. Vor diesem Hintergrund kann ein Dienst, auf den über CORS zugegriffen wird, nicht davon ausgehen, dass Cookies standardmäßig verwendet werden können.

## CORS Sicherheit in AMP <a name="cors-security-in-amp"></a>

Um gültige und sichere Anfragen und Antworten für deine AMP Seiten sicherzustellen, musst du:

1. [die Anfrage verifizieren](#verify-cors-requests),
2. [die entsprechenden Antwortheader senden](#send-cors-response-headers).

Wenn du Node in deinem Backend nutzt, kannst du die [AMP CORS Middleware](https://www.npmjs.com/package/amp-toolbox-cors) verwenden, die Teil der [AMP Toolbox](https://github.com/ampproject/amp-toolbox) ist.

### CORS Anfragen verifizieren <a name="verify-cors-requests"></a>

Wenn dein Endpoint eine CORS Anfrage erhält:

1. [Stelle sicher, dass der CORS <code>Origin</code> Header eine zulässige Quelle ist (Quelle des Publishers + AMP Caches)](#verify-cors-header).
2. [Wenn kein Origin Header vorhanden ist, überprüfe, ob die Anfrage von derselben Quelle stammt (über `AMP-Same-Origin` )](#allow-same-origin-requests).

#### 1) Erlaube Anfragen für bestimmte CORS Quellen <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

CORS Endpoints empfangen die anfragende Quelle über den `Origin` HTTP Header. Endpoints sollten nur folgende Anfragen zulassen: (1) Anfragen von der eigenen Quelle des Publishers, und (2) Anfragen von jeder unter [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json) aufgeführten `cacheDomain` Quelle.

So sollten Endpoints z. B. Anfragen zulassen von:

- der Google AMP Cache Subdomäne: `https://<publisher's domain>.cdn.ampproject.org` <br>(zum Beispiel `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Informationen zu AMP Cache URL Formaten findest du in den folgenden Ressourcen:

- [Übersicht über den Google AMP Cache](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Anfragen aus gleicher Quelle erlauben <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

Für Anfragen aus derselben Quelle, bei denen der `Origin` Header fehlt, verwendet AMP den folgenden benutzerdefinierten Header:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Dieser benutzerdefinierte Header wird von der AMP Runtime gesendet, wenn eine XHR Anfrage an dieselbe Quelle erfolgt (also ein Dokument, das von einer URL bereitgestellt wird, die nicht zum Cache gehört). Erlaube Anfragen, die den Header `AMP-Same-Origin:true` enthalten.

### CORS Anfrageheader senden <a name="send-cors-response-headers"></a>

Nach der Verifizierung der CORS Anfrage muss die resultierende HTTP Antwort die folgenden Header enthalten:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

Dieser Header wird von der <a href="https://www.w3.org/TR/cors/">W3 CORS Spezifikation</a> gefordert, wobei sich <code>origin</code> auf die anfragende Quelle bezieht, die über den CORS <code>Origin</code> Anfrageheader zugelassen wurde (z. B. <code>"https://<Subdomäne des Publishers>.cdn.ampproject.org"</code>).

Obwohl die W3 CORS Spezifikation die Rückgabe des Wertes <code>*</code> in der Antwort erlaubt, solltest du aus Sicherheitsgründen Folgendes tun:

- Falls der `Origin` Header vorhanden ist, validiere den Wert des <code>Origin</code> Headers und gib ihn mittels 'echo' aus.

### Anfragen zur Zustandsänderung verarbeiten <a name="processing-state-changing-requests"></a>

[tip type="important"] Führe diese Validierungsprüfungen durch, *bevor* du die Anfrage verarbeitest. Diese Validierung bietet Schutz vor CSRF Angriffen und verhindert die Verarbeitung von Anfragen nicht vertrauenswürdiger Quellen. [/tip]

Überprüfe Folgendes, bevor du Anfragen verarbeitest, die den Zustand deines Systems ändern könnten (z. B. wenn ein Benutzer eine Mailingliste abonniert oder abbestellt):

**Wenn der `Origin` Header angegeben wurde**:

1. Wenn die Quelle mit keinem der folgenden Werte übereinstimmt, muss der Vorgang abgebrochen und eine Fehlerantwort zurückgegeben werden:

    - `<Domäne des Publishers>.cdn.ampproject.org`
    - die Quelle des Publishers (also deine)

    Dabei steht `*` für einen Platzhalter, nicht für das eigentliche Sternchen ( * ).

2. Andernfalls soll die Anfrage verarbeitet werden.

**Wenn der `Origin` Header NICHT angegeben wurde**:

1. Stelle sicher, dass die Anfrage den Header `AMP-Same-Origin: true` enthält. Falls die Anfrage diesen Header nicht enthält, muss der Vorgang abgebrochen und eine Fehlerantwort zurückgegeben werden.
2. Andernfalls soll die Anfrage verarbeitet werden.

## Beispielanleitung: Verarbeitung von CORS Anfragen und Antworten <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

In CORS Anfragen an deinen Endpoint müssen zwei Szenarien berücksichtigt werden:

1. Eine Anfrage aus derselben Quelle
2. Eine Anfrage aus einer Quelle im Cache (aus einem AMP Cache).

Sehen wir uns diese Szenarien anhand eines Beispiels an. In unserem Beispiel verwalten wir die Website `example.com`, die eine AMP Seite mit dem Namen `article-amp.html` hostet. Die AMP Seite enthält eine `amp-list` zum Abrufen dynamischer Daten aus der Datei `data.json`, die auch auf `example.com` gehostet wird. Wir möchten Anfragen von unserer AMP Seite an unsere Datei `data.json` verarbeiten. Diese Anfragen können von der AMP Seite in derselben Quelle (nicht im Cache) oder von der AMP Seite in einer anderen Quelle (im Cache) stammen.

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="CORS Beispiel" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Zulässige Quellen <a name="allowed-origins"></a>

Unter Berücksichtigung dessen, was wir über CORS und AMP wissen (laut [CORS Anfragen verifizieren](#verify-cors-requests) weiter oben), werden wir in unserem Beispiel Anfragen aus den folgenden Domänen zulassen:

- `example.com` --- Domäne des Publishers
- `example-com.cdn.ampproject.org` --- Subdomäne von Google AMP Cache

### Antwortheader für zulässige Anfragen <a name="response-headers-for-allowed-requests"></a>

Für Anfragen aus den zulässigen Quellen enthält unsere Antwort die folgenden Header:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Es folgen zusätzliche Antwortheader, die wir in unsere CORS Antwort aufnehmen können:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Pseudo CORS Logik <a name="pseudo-cors-logic"></a>

Unsere Logik für die Verarbeitung von CORS Anfragen und Antworten kann in Form des folgenden Pseudocodes vereinfacht werden:

[sourcecode:text]
IF CORS header present
   IF origin IN allowed-origins
      allow request & send response
   ELSE
      deny request
ELSE
   IF "AMP-Same-Origin: true"
      allow request & send response
   ELSE
      deny request
[/sourcecode]

#### CORS Beispielcode <a name="cors-sample-code"></a>

Es folgt eine JavaScript Beispielfunktion, mit der wir CORS Anfragen und Antworten verarbeiten können:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
    'https://cdn.ampproject.org',
  ];
  var allowedSourceOrigin = 'https://example.com'; //publisher's origin
  // If same origin
  if (req.headers['amp-same-origin'] == 'true') {
    origin = sourceOrigin;
    // If allowed CORS origin & allowed source origin
  } else if (
    allowedOrigins.indexOf(req.headers.origin) != -1 &&
    sourceOrigin == allowedSourceOrigin
  ) {
    origin = req.headers.origin;
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Hinweis**: Ein Beispiel für einen funktionierenden Code findest du unter [amp-cors.js](https://github.com/ampproject/amphtml/blob/master/build-system/server/amp-cors.js).

### Szenario 1: Anfrage von einer AMP Seite mit derselben Quelle erhalten <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Im folgenden Szenario fordert die Seite `article-amp.html` die Datei `data.json` an. Die Quellen sind gleich.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="CORS Beispiel" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Wenn wir die Anfrage genauer ansehen, finden wir Folgendes:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Da diese Anforderung aus derselben Quelle stammt, gibt es keinen `Origin` Header, aber der benutzerdefinierte AMP Anfrageheader von `AMP-Same-Origin: true` ist vorhanden. Wir können diese Anfrage zulassen, da sie aus derselben Quelle stammt (`https://example.com`).

Unsere Antwortheader wären:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Szenario 2: Anfrage von einer AMP Seite aus dem Cache erhalten <a name="scenario-2-get-request-from-cached-amp-page"></a>

Im folgenden Szenario fordert die Seite `article-amp.html` aus dem Google AMP Cache die Datei `data.json` an. Die Quellen unterscheiden sich.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="CORS Beispiel" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Wenn wir die Anfrage genauer ansehen, finden wir Folgendes:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Da diese Anfrage einen `Origin` Header enthält, überprüfen wir, ob sie aus einer zulässigen Quelle stammt. In diesem Fall können wir die Anfrage zulassen, da sie aus einer zulässigen Quelle stammt.

Unsere Antwortheader wären:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Fonts aus dem Cache verwenden <a name="working-with-cached-fonts"></a>

Der Google AMP Cache speichert AMP HTML Dokumente, Bilder und Schriftarten im Cache, um die Geschwindigkeit der AMP Seite zu optimieren. Wir wollen die AMP Seite nicht nur schnell machen, sondern auch auf die Sicherheit der Ressourcen im Cache achten. Wir werden Änderungen an der Art und Weise vornehmen, wie der AMP Cache die Ressourcen im Cache (hauptsächlich Schriftarten) zurückgibt, indem wir den Wert `Access-Control-Allow-Origin` der Quelle berücksichtigen.

### Bisheriges Verhalten (vor Oktober 2019) <a name="past-behavior-before-october-2019"></a>

Wenn eine AMP Seite dabei war, `https://example.com/some/font.ttf` aus dem Attribut `@font-face src` zu laden, speicherte der AMP Cache die Schriftartendatei im Cache und stellt die Ressource wie unten beschrieben mit dem Platzhalter `Access-Control-Allow-Origin` bereit.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: *

### Neues Verhalten (seit Oktober 2019) <a name="new-behavior-october-2019-and-after"></a>

Die aktuelle Implementierung ist zwar permissiv, aber das kann zu einer unerwarteten Nutzung der Schriftarten von Cross-Origin Websites führen. Bei dieser Änderung wird der AMP Cache mit genau demselben Wert für `Access-Control-Allow-Origin` antworten wie der Quellserver. Um die Schriftarten ordnungsgemäß aus dem AMP Dokument im Cache zu laden, musst du die AMP Cache Quelle via Header akzeptieren.

Dies wäre eine mögliche Implementierung:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var allowedOrigins = [
    'https://example.com',
    'https://example-com.cdn.ampproject.org',
  ];
  // If allowed CORS origin
  if (allowedOrigins.indexOf(req.headers.origin) != -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.statusCode = 403;
    res.end(JSON.stringify({message: unauthorized}));
    throw unauthorized;
  }
}
[/sourcecode]

Wenn du beispielsweise /some/font.ttf in `https://example.com/amp.html` laden wolltest, sollte der Quellserver mit dem Header Access-Control-Allow-Origin antworten (wie nachfolgend angezeigt).

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Beispiel für eine CORS-Schriftart" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Wenn deine Schriftartendatei von jeder beliebigen Quelle aus zugänglich sein darf, kannst du mit einem Platzhalter für `Access-Control-Allow-Origin` antworten. Der AMP Cache wird diesen Wert ebenfalls zurückgeben, d. h. er antwortet mit `Access-Control-Allow-Origin: *`. Wenn du diese Einstellung bereits verwendest, musst du nichts ändern. [/tip]

Diese Änderung ist für Mitte Oktober 2019 geplant. Wir erwarten, dass jeder AMP Publisher, der Schriftarten selbst hostet, überprüft, ob diese betroffen sind.

#### Implementierungsplan <a name="roll-out-plan"></a>

- 30.09.2019: Das Release ermöglicht eine feinere Kontrolle darüber, für welche Domänen diese Änderung gilt. Dieser Build sollte im Laufe dieser Woche veröffentlicht werden.
- 07.10.2019: Testdomänen werden für manuelle Tests aktiviert.
- 14.10.2019: (jedoch abhängig vom Testverlauf): Das Feature wird für alle veröffentlicht.

Folge dem entsprechenden [Issue hier.](https://github.com/ampproject/amphtml/issues/24834)

## CORS in AMP testen<a name="testing-cors-in-amp"></a>

Stelle beim Testen deiner AMP Seiten sicher, dass du auch die Versionen deiner AMP Seiten im Cache testest.

### Überprüfe die Seite über die Cache URL <a name="verify-the-page-via-the-cache-url"></a>

So stellst du sicher, dass deine AMP Seite im Cache korrekt gerendert wird und ordnungsgemäß funktioniert:

1. Öffne in deinem Browser die URL, über die der AMP Cache auf deine AMP Seite zugreifen würde. Du kannst Cache URL Format mit diesem [Tool von AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/) ermitteln.

    Zum Beispiel:

    - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
    - AMP Cache URL Format: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Öffne die Entwicklertools deines Browsers und stelle sicher, dass keine Fehler vorliegen und alle Ressourcen korrekt geladen wurden.

### Überprüfe deine Server Antwortheader <a name="verify-your-server-response-headers"></a>

Mithilfe des Befehls `curl` kannst du prüfen, ob dein Server die korrekten HTTP Antwortheader sendet. Gib im Befehl `curl` die Anfrage-URL und alle benutzerdefinierten Header an, die du hinzufügen möchtest.

**Syntax**: `curl <request-url> -H <custom-header> - I`

#### Anfrage aus derselben Quelle <a name="test-request-from-same-origin"></a>

Bei einer Same-Origin Anfrage fügt das AMP System den benutzerdefinierten Header `AMP-Same-Origin:true` hinzu.

Das ist unser curl Befehl zum Testen einer Anfrage von `https://ampbyexample.com` an die Datei `examples.json` (in derselben Domäne):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Die Ergebnisse des Befehls zeigen die korrekten Antwortheader (Hinweis: Überschüssige Informationen wurden gekürzt):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Anfrage von einer AMP Seite aus dem Cache testen <a name="test-request-from-cached-amp-page"></a>

In einer CORS Anfrage, die nicht aus derselben Domäne stammt (d. h. aus dem Cache), ist der `origin` Header Teil der Anfrage.

Das ist unser curl Befehl zum Testen einer Anfrage von einer AMP Seite im Google AMP Cache an die Datei `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Die Ergebnisse des Befehls zeigen die korrekten Antwortheader:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
