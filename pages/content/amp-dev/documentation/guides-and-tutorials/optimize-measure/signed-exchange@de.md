---
"$title": Stelle AMP via Signed Exchanges bereit
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP bietet Geschwindigkeitsvorteile weit über das Format hinaus. Dazu werden Methoden wie Caching und Vorladen eingesetzt. Doch diese Vorteile können auch [Nachteile](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) haben: So werden z. B. zusätzliche URLs angezeigt, wenn die Seite in einem [AMP Viewer](https://developers.google.com/search/docs/guides/about-amp) eingebettet ist. Um solche Probleme zu vermeiden, kannst du ein neues Web Plattform Feature nutzen und AMP Inhalte über Signed Exchanges bereitstellen.

Ein [Signed Exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges) besteht aus einem gültigen AMP Dokument und der ursprünglichen URL des Contents. Diese Informationen sind durch digitale Signaturen geschützt, die das Dokument auf sichere Weise an die zugehörige URL binden. Auf diese Weise können Browser die ursprüngliche URL sicher in der URL Zeile anstelle des Hostnamens des Computers anzeigen, der die Bytes an den Browser übermittelt hat.

Signierte AMP Inhalte werden *zusätzlich zu* (und nicht anstelle von) regulären AMP Inhalten bereitgestellt.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Bild einer URL mit Signed Exchange', caption=' ', align='' ) }}

[tip type="note"] Diese Funktion wird derzeit in Chrome unterstützt. Die Implementierung ist jedoch bereits für weitere Browser geplant. [/tip]

# Kann auch ich Signed Exchanges verwenden?

Um Signed Exchanges zu implementieren, musst du die folgenden Anforderungen erfüllen:

- Es muss möglich sein, die von deinem Server generierten HTTP Header zu konfigurieren und zu steuern. (Die meisten rein webbasierten Hosting Lösungen wie Blogger sind *nicht* mit Signed Exchanges kompatibel.)
- Es muss möglich sein, AMP Signed Exchanges zu generieren, z. B. durch Ausführen von [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), als [Go Binärdatei](https://golang.org/doc/install) oder innerhalb einer [Docker VM](https://docs.docker.com/machine/get-started/).
    - Der Packager muss alle sechs Wochen aktualisiert werden.
- Es muss möglich sein, [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) in den Headern `Accept` und `AMP-Cache-Transform` auf Edge HTTP Servern zu verwenden und verschiedene Inhalte für die gleiche URL zurückzugeben.
- Das System, auf dem `amppackager` ausgeführt wird, muss in der Lage sein, ausgehende Netzwerkanforderungen an die folgenden Empfänger zu stellen:
    - die Zertifizierungsstelle, die dein Zertifikat ausstellt,
    - den Publisher Server, auf dem die zu signierenden AMP Dokumente gehostet werden,
    - `cdn.ampproject.org`, um die aktuelle Version von AMP abzurufen.
- Ein permanentes Dateisystem mit gemeinsam genutztem Speicher zwischen allen Instanzen von `amppackager`, die im selben Rechenzentrum ausgeführt werden, muss vorhanden sein.

# Implementierung von Signed Exchanges

Nachfolgend findest du eine vorgeschlagene Implementierungsreihenfolge, um Signed Exchanges für deine AMP Dokumente zu unterstützen.

## Beziehe ein unterstütztes TLS Zertifikat

Um Signed Exchanges zu ermöglichen, benötigst du ein TLS Zertifikat mit der Erweiterung `CanSignHttpExchanges`. Im April 2019 war [DigiCert](https://www.digicert.com/) der einzige Anbieter dieser Erweiterung ([weitere Informationen dazu](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Um das Zertifikat zu generieren, benötigt die Certificate Authority (CA) ein Certificate Signing Request (CSR), welches mit `openssl` erzeugt werden kann. Hier ist ein Beispiel für ein CSR für `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Bestimme, welche URLs signiert werden sollen

Du musst ein URL Muster erstellen, das festlegt, welche Dokumente signiert werden sollen. Es ist wichtig, dass private Inhalte wie personalisierte Informationen nicht signiert werden, um den Versand irreführender oder falscher Inhalte zu verhindern.

Für bessere Leistung sollten dem Packager nur gültige AMP Dokumente als Eingabe übergeben werden. Die Übermittlung einiger ungültiger AMP Dokumente ist akzeptabel, falls unbedingt erforderlich, aber du solltest es vermeiden, den gesamten Datenverkehr über den Packager zu senden.

## Stelle den Packager auf einem Staging Server bereit

Zunächst solltest du Signed Exchanges auf einem Staging Server einrichten, um zu überprüfen, ob dein Setup korrekt ist, bevor du zur Produktion übergehst.

Wir empfehlen die Verwendung von [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) zur Generierung von Signed Exchanges. Wenn dies jedoch nicht zu deiner Produktionsumgebung passt, kannst du stattdessen die Befehlszeilenclients [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) und [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange) nutzen und die mit Content Negotiation und Zertifikatsverwaltung verbundenen Aufgaben selbst übernehmen.

Die folgende Anleitung gilt für Bereitstellungen mit `amppackager`.

### Konfiguration

Die Konfigurationsdatei von [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) fordert eine **CertFile** und eine **KeyFile** an.

Die **KeyFile** ist der private Schlüssel (`ampbyexample-packager.key` im obigen Beispiel) und sollte das folgende Format haben (Hinweis: Teile deinen eigenen privaten Schlüssel mit niemandem und schütze ihn vor unbeabsichtigter Veröffentlichung!):

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

Die **CertFile** ist das öffentliche Zertifikat. Wenn DigiCert das Zertifikat bereitgestellt hat, kann diese Datei durch Verketten des von DigiCert bereitgestellten ursprungsspezifischen Zertifikats und der Datei `DigiCertCA.crt` erstellt werden.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Installation

Befolge [diese Anleitung, um `amppackager` für deine Website einzurichten](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] In [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (verwendet von `amp.dev`) findest du ein Beispiel für die serverseitigen Änderungen, die du vornehmen musst, um die erforderlichen Anfragen an `amppkg` weiterzuleiten. [/tip]

### Tests

Stelle sicher, dass deine Staging Website mit Inhalt mit dem MIME Typ `application/signed-exchange` antwortet, wenn dies in der HTTP Anfrage angegeben ist. Ein Beispiel (ersetze `staging.example.com` durch deinen Staging Server):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

Die Ausgabe muss folgende Zeile enthalten:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] Das Element `v="1..100"` in der Anfrage ist ein Platzhalter. Suche nicht nach Übereinstimmungen anhand dieses konkreten Wertes. Überprüfe stattdessen (wie [in der Installationsanleitung von amppackager beschrieben](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing)), ob der Header `amp-cache-transform` vorhanden ist, und ignoriere den Wert. [/tip]

[tip type="important"] Die Versionszeichenfolge `v=b3` in der Antwort ist die Version vom August 2019. Diese Version unterliegt Änderungen. [/tip]

Der Großteil der Antwort sollte aus deiner AMP Seite bestehen (im Klartext). Sie besitzt einen kleinen binären Header und enthält hier und da noch einige Binärbytes, falls die Seite größer ist als 16 KB.

Das Tool [`dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) kann dazu verwendet werden, die Antwort zu überprüfen:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Beachte, dass der Schalter `-verify` zu diesem Zeitpunkt nicht funktioniert, da sich die erforderlichen Zertifikate nicht auf dem Server `https://example.com/` befinden.)

Stelle sicher, dass die Antwort *immer* den Header `Vary` mit dem Wert `Accept,AMP-Cache-Transform` enthält (unabhängig davon, ob der MIME Typ `text/html`, `application/signed-exchange` oder ein anderer ist):

```sh
$ curl -si https://staging.example.com/ | less
```

Die Ausgabe muss folgende Zeile enthalten:

```txt
vary: Accept,AMP-Cache-Transform
```

## Stelle den Packager in der Produktion bereit

### Installation

Passe die oben genannten Bereitstellungsschritte für Staging an deine Produktionsumgebung an.

### Tests

#### Mit Befehlszeilentools

Führe die gleichen Tests wie oben durch. `dump-signedexchange -verify` sollte jetzt erfolgreich sein.

#### Mit Chrome

Du kannst den Test auch in Chrome mithilfe der [ Erweiterung ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en) durchführen. Installiere sie aus dem Chrome Webstore und konfiguriere die `Request Headers` für `amp-cache-transform` mit `google` als `Value`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testen in Chrome mithilfe der Erweiterung ModHeader', caption=' ', align='' ) }}

Nach der Anforderung von `https://example.com/` stellt dein Server ein Signed Exchange bereit, welches jedoch genauso aussehen und sich genauso verhalten muss wie zuvor. Überprüfe über die [DevTools Konsole](https://developers.google.com/web/tools/chrome-devtools/), ob ein Signed Exchange korrekt zurückgegeben wird.

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='In der DevTools Konsole angezeigter Signed Exchange Header', caption=' ', align='' ) }}

Klicke auf dem Tab `Network` auf deinen Domänennamen und überprüfe, ob `Signed HTTP exchange` unter `Preview` angezeigt wird.

#### Mit dem Google AMP Cache

Stelle sicher, dass die Signed Exchanges mit dem Google AMP Cache kompatibel sind. Das ist für ihre Auffindbarkeit in Suchmaschinen wie der Google-Suche relevant.

Um Signed Exchanges im Google AMP Cache zu testen, öffne die Registerkarte "Network" in DevTools, aktiviere "`Preserve log`" und rufe eine URL wie `https://example-com.cdn.ampproject.org/wp/s/example.com/` auf.

DevTools zeigt eine `200` mit der Zeile `signed-exchange` sowie die Zeile `from signed-exchange` an, falls die Anfrage erfolgreich war.

Wenn dies fehlschlägt, fehlen die Zeilen "signed-exchange" oder werden rot hervorgehoben. Es kann auch sein, dass der Header `warning` mit zusätzlichen Informationen vorhanden ist.

## Signed Exchanges in der Google-Suche

Wenn deine AMP Seiten erfolgreich als Signed Exchanges verteilt wurden, wird in den Suchergebnissen wie zuvor der AMP Blitz angezeigt. Ein Antippen der Ergebnisse zeigt jedoch in der URL Zeile anstelle einer URL, die mit `https://www.google.com/amp/….` beginnt, die URL `https://example.com` an. Außerdem wird die Leiste `viewer` nicht angezeigt.

In der DevTools Konsole siehst du im Tab `network` in der Spalte `type` den Eintrag <code>signed-exchange</code>.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='In der DevTools Konsole siehst du im Tab network den Eintrag signed-exchange in der Spalte type.', caption=' ', align='' ) }}

# Anbieter von Signed Exchange Diensten

Hier ist eine Liste mit CDNs und Hosting Anbietern, die umfassende Unterstützung für Signed Exchanges bieten. Das ist die einfachste Methode für die ersten Schritte mit Signed Exchanges:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) ist ein Tool, das AMP URLs optimiert, indem AMP mithilfe von Signed Exchanges bereitgestellt wird. Erfahre mehr im [AMP Blog](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) ist eines der größten Netzwerke der Welt. Unternehmen, gemeinnützige Organisationen, Blogger und sonstige Personen mit Internetpräsenz haben heute dank Cloudflare schnellere und sicherere Websites und Apps.
