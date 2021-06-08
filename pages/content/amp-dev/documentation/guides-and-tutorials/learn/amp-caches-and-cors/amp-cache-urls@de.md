---
'$title': URL Format und Anfragenbearbeitung im AMP Cache
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

In diesem Dokument erfährst du mehr über das URL Format des AMP Cache und über seine Verarbeitung von Anfragen.

## URL Format

Wenn möglich, erstellt der Google AMP Cache eine Subdomäne für die Domäne jedes AMP Dokuments, indem er diese zunächst von [IDN (Punycode)](https://en.wikipedia.org/wiki/Punycode) zu UTF-8 konvertiert. Die Caches ersetzen jedes Zeichen `-` (Bindestrich) durch `--` (2 Striche) und jedes Zeichen `.` (Punkt) durch `-` (Bindestrich). So wird zum Beispiel aus `pub.com` die URL `pub-com.cdn.ampproject.org`.

Mit diesem URL Rechner kannst du eine URL in eine AMP Cache Version konvertieren:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Verwende das Modul [Node.js](https://nodejs.org) von [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url), um eine Quell-URL in das AMP Cache URL Format zu konvertieren. [/tip]

Dieses Dokument beschreibt:

- die URL Struktur in einem AMP Cache
- die Methode, mit der du ableiten kannst, wie deine URLs in einem AMP Cache angezeigt werden
- die Methode, mit der du den Header der AMP Cache Quelle zurückrechnen kannst, um die Publisher Domäne zu ermitteln

## Protokoll des Domänennamens

Alle Dokumente verwenden das https Protokoll in AMP Caches.

## Suffix des Domänennamens

Alle AMP Caches sind in einer JSON Datei registriert, die online im [AMPHTML Repository](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json) verfügbar ist. Ein Cachedatensatz in dieser Datei kann z. B. folgendermaßen aussehen:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Ein AMP Cache stellt die Datensätze auf der Domäne bereit, die durch `cacheDomain` festgelegt ist. Im vorliegenden Fall ist die Domäne `cdn.ampproject.org`.

In diesem Dokument werden URLs mit `cdn.ampproject.org` als Beispiele verwendet. Andere Caches verwenden jedoch in der Regel eine ähnliche URL Struktur.

## Präfix des Domänennamens

Ein AMP Cache stellt Dokumente unter einer modifizierten URL bereit, wie z. B. `example-com.cdn.ampproject.org`. Die erste punktierte Komponente des ursprünglichen Domänennamens im Beispiel, `example.com`, wird zu `example-com`. In diesem Dokument wird diese punktlose Zeichenfolge, `example-com`, als "Domänenpräfix" bezeichnet. Nachfolgend findest du den Algorithmus, der diese Transformation durchführt.

Aufgrund der Einschränkung von https (TLS) Zertifikaten gemäß [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1) werden in diesem Präfix nicht mehrere punktierte Komponenten wie `example.com.cdn.ampproject.org` verwendet:

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Publisher Domänen können bis zu 255 Zeichen lang sein, während jedes Domänenpräfix gemäß [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) auf 63 Zeichen begrenzt ist:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Alle Publisher Domänen sind einem eindeutigen Domänenpräfix zugeordnet. Der dazu verwendete Algorithmus versucht, das Mapping für Menschen lesbar zu machen. Beim Mapping wird jedoch ein sicheres Hashing für Publisher Domänen verwendet, falls diese zu lang sind, sowie in den unten beschriebenen Fällen:

### Basisalgorithmus

Der Basisalgorithmus, mit dem eine Publisher Domäne zu einem Domänenpräfix konvertiert wird, lautet wie folgt:

1. Die Publisher Domäne wird mit Punycode dekodiert. Siehe [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Alle Zeichen "`-`" (Bindestrich) in der Ausgabe von Schritt 1 werden durch "`--`" (zwei Bindestriche) ersetzt.
3. Alle Zeichen "`.`" (Punkt) in der Ausgabe von Schritt 2 werden durch "`-`" (Bindestrich) ersetzt.
4. Wenn die Ausgabe von Schritt 3 sowohl an Position 3 als auch an Position 4 das Zeichen "`-`" (Bindestrich) besitzt, werden "`0-`" als Präfix und "`-0`" als Suffix hinzugefügt. Weitere Informationen dazu findest du unter [#26205](https://github.com/ampproject/amphtml/issues/26205).
5. Die Ausgabe von Schritt 3 wird mit Punycode kodiert. Siehe [RFC 3492](https://tools.ietf.org/html/rfc3492)

Einige Beispiele für den Basisalgorithmus:

<table>
  <tr>
   <td>
<strong>Publisher Domäne</strong>
   </td>
   <td>
<strong>Domänenpräfix</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Nach dem Ausführen des Basisalgorithmus führen wir den unten beschriebenen Fallback Algorithmus aus, aber nur, wenn das Domänenpräfix kein gültiges DNS Label ist.

Ein Domänenpräfix ist kein gültiges DNS Label, wenn es länger ist als 63 Zeichen.

### Fallback Algorithmus

Der Fallback Algorithmus, mit dem eine Publisher Domäne zu einem Domänenpräfix konvertiert wird, lautet wie folgt:

1. Die Publisher Domäne wird einem Hashvorgang mit SHA256 unterzogen.
2. Die Ausgabe von Schritt 1 wird mittels Base32 Escapesequenzen konvertiert.
3. Die letzten 4 Zeichen werden aus der Ausgabe von Schritt 2 entfernt. Diese Zeichen sind immer `=` (Gleichheitszeichen).

Der Fallback Algorithmus erzeugt eine Zeichenfolge mit 52 Zeichen ohne Bindestriche (`-`) ähnlich der folgenden: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Kombinierter Algorithmus

Der kombinierte Algorithmus lautet wie folgt:

1. Der Basisalgorithmus wird ausgeführt. Wenn es sich bei der Ausgabe um ein gültiges DNS Label handelt, wird das Cache Domänensuffix angehängt und z. B. `example-com.cdn.ampproject.org` zurückgegeben. Andernfalls wird Schritt 2 ausgeführt.
2. Der Fallback Algorithmus wird ausgeführt. Das Cache Domänensuffix wird angehängt und z. B. `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org` zurückgegeben.

## URL Pfad

Der "Pfad" einer URL im AMP Cache besteht immer aus einem oder mehreren Präfixverzeichnissen wie `/c`, gefolgt vom Infix `/s` (aber nur, wenn die Publisher URL http `s` ist), gefolgt von der URL des Publisher Dokuments ohne das Protokoll.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Bild mit URL Formaten im Cache') }}

Die Präfixverzeichnisse wie `/c` entsprechen verschiedenen Bereitstellungsarten, die ein AMP Cache ausführen kann. Verschiedene AMP Caches können verschiedene Bereitstellungsarten unterstützen. Diese Liste ist nicht erschöpfend:

- `/c` – <strong>C</strong>ontent: Das ist ein AMP Dokument, das als eigenständige Seite bereitgestellt wird und von bestimmten Schnittstellen direkt verlinkt werden kann.
- `/v` – <strong>V</strong>iewer: Das ist ebenfalls ein AMP Dokument, welches jedoch in einem [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) bereitgestellt wird. Dabei handelt es sich um eine Rahmenumgebung, die ein AMP Dokument im Kontext einer Suchergebnisseite oder einer anderen Schnittstelle anzeigt.
- `/wp` – <strong>W</strong>eb <strong>P</strong>ackage: Das ist ein AMP Dokument, das als [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), eine Web Package Technologie, bereitgestellt wird. Solche URLs fungieren als Weiterleitung zur eigenen Quelle des Publishers.
- `/cert` – <strong>Cert</strong>ificate: Das ist ein öffentliches Zertifikat, das zusammen mit einem [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) verwendet wird.
- `/i` – <strong>I</strong>mage: Das ist ein Bild, das vom AMP Cache bereitgestellt wird (in der Regel als Unterressource).
- `/ii` – <strong>I</strong>mage: Auch das ist ein Bild, das vom AMP Cache bereitgestellt wird. Dieses kann jedoch mit anderen Parametern zur Konfiguration des Cache kombiniert werden, z. B. dem Parameter `/ii/w800`, welcher die maximale Breite angibt, die das Dokument anfordert. Der Cache kann hier Bilder mit einem anderen Maßstab erzeugen, um Bandbreite für den Browser zu sparen.

Darüber hinaus können AMP Caches spezielle Abfrageparameter an die URL des Dokuments anhängen, die nicht Teil der Abfrage des Publisher Dokuments sind. Beispielsweise stellt [`<amp-live-list>`](../../../components/reference/amp-live-list.md) Aktualisierungsanfragen, indem es ein Dokument mit dem Parameter `amp_latest_update_time<` abruft. Diese Parameter werden beim Crawlen des Dokuments nicht an die Quelle übergeben, sondern dienen ausschließlich der Konfiguration der Anfrage an den AMP Cache.

## CORS Quellen

Viele Publisher verwenden CORS Anfragen für ihre AMP Dokumente, um zusätzliche Daten abzurufen. Bei CORS Anfragen wird ein HTTP Header vom Typ `Origin:` gesendet, der die Quelle des Dokuments angibt, das die Anfrage stellt. Wie du oben sehen kannst, unterscheidet sich die Quelle des Dokuments im AMP Cache vom Originaldokument. In den obigen Abschnitten zu Domänennamen findest du den Algorithmus zum Bestimmen der Quelle einer AMP Cache URL unter Angabe der Publisher URL. Nachfolgend findest du den umgekehrten Algorithmus zum Dekodieren eines CORS Anfrageheaders vom Typ `Origin:`, um die ursprüngliche Publisher Domäne zu ermitteln.

### AMP Cache Quelle zu Publisher Domäne

Der Wert des Headers einer AMP Cache Quelle sieht aus wie eines der folgenden Beispiele:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Entferne zunächst das Protokollpräfix (`https://`) und das Suffix der AMP Cache Domäne, z. B. `.cdn.ampproject.org`. Das Suffix kann zu einem beliebigen der unter [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json) aufgeführten Caches gehören. Die verbleibende Zeichenfolge ist das "Domänenpräfix". Im Fall der beiden obigen Beispiele lautet das "Domänenpräfix" wie folgt:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Überprüfe als Nächstes, ob das "Domänenpräfix" mindestens ein Zeichen '`-`' (Bindestrich) enthält. Häufig enthält es mehrere Bindestriche. Wenn das "Domänenpräfix" nicht mindestens einen Bindestrich '`-`' enthält, kann die AMP Cache Quelle nicht direkt wieder abgeleitet werden. Wenn dir die Auswahl an möglichen Publisher Domänen bekannt ist, kannst du die entsprechende Auswahl an AMP Cache Quellen mithilfe des oben in diesem Dokument beschriebenen Algorithmus für Domänennamen erstellen. Diese können dann anhand der feststehenden Auswahl validiert werden.

Der Rest des Algorithmus geht davon aus, dass das "Domänenpräfix" mindestens einen Bindestrich '`-`' enthält.

1. Wenn das Domänenpräfix mit `xn--` beginnt, dekodiere das "Domänenpräfix" mit Punycode. So wird `xn---com-p33b41770a` zum Beispiel zu `⚡😊-com`. Siehe [RFC 3492](https://tools.ietf.org/html/rfc3492) für Punycode.
2. Wenn das Domänenpräfix mit "`0-`" beginnt und mit "`-0`" endet, entferne sowohl das Präfix "`0-`" als auch das Suffix "-0".
3. Gehe die in Schritt 2 ausgegebenen Zeichen der Reihe nach durch und gib sie unverändert aus. Wenn du auf einen Bindestrich "`-`" stößt, wirf einen Blick auf das nachfolgende Zeichen. Wenn dieses auch ein Bindestrich "`-`" ist, überspringe beide eingegebenen Zeichen und gib einen einzelnen Bindestrich "`-`" aus. Wenn das nachfolgende Zeichen ein anderes Zeichen ist, überspringe nur den aktuellen einzelnen Bindestrich "`-`" und gib einen Punkt "`.`" aus. So wird z. B. `a--b-example-com` zu `a-b.example.com`.
4. Kodiere das Ergebnis von Schritt 3 mit Punycode. Siehe [RFC 3492](https://tools.ietf.org/html/rfc3492) für Punycode.

Das Ergebnis von Schritt 4 ist die Publisher Domäne. Das Protokoll lässt sich nicht aus der Domäne selbst ableiten, ist aber entweder `http` oder `https`. Der Port ist immer der Standardwert für das Protokoll.

## Weiterleitung und Fehlerbehandlung

Es folgen einige Beispiele für den Umgang des AMP Cache mit Weiterleitungen und Fehlern:

**Weiterleitungen**

Beim Auflösen von AMP URLs folgt der AMP Cache Weiterleitungen. Angenommen, eine URL leitet zu einer anderen AMP URL um:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

In diesem Fall gibt der AMP Cache den Inhalt der aufgelösten Weiterleitung für die ursprüngliche URL zurück.

Beispiel: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Wichtig: Wenn du den Speicherort der AMP Dateien auf deinem Server verschiebst, musst du eine Weiterleitung vom alten zum neuen Speicherort einrichten.

**Nicht gefunden**

Wenn eine Seite nicht im AMP Cache gefunden wird, wird eine Fehlerseite angezeigt und der Status 404 zurückgegeben.

Beispiel: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**Ungültige AMP**

Ist eine AMP Seite ungültig, leitet der AMP Cache zur kanonischen Seite weiter.

Beispiel: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Serverfehler**

Gibt eine URL einen 5XX Serverfehler zurück, so gibt der AMP Cache den Status 404 zurück.

Beispiel: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
