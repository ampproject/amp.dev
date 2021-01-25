---
"$title": Integriere AMP in deine App
"$order": '2'
description: Dieser Leitfaden richtet sich an Entwickler von mobilen Apps und Web Apps, die AMP Seiten integrieren und auf diese verweisen möchten. Stelle dir beispielsweise eine mobile Chat App vor, …
formats:
- websites
---

Dieser Leitfaden richtet sich an Entwickler von mobilen Apps und Web Apps, die AMP Seiten integrieren und auf diese verweisen möchten. Stelle dir beispielsweise eine mobile Chat App vor, die die AMP Version eines geteilten Links lädt, um Benutzern eine schnellere Erfahrung zu bieten.

## Transformiere Links zu AMP

Mit AMP ist es möglich, externe Websites in deiner nativen oder mobilen Web App nahezu sofort zu rendern. Dies erreichst du, indem du URLs in deinem Content mit den entsprechenden AMP URLs (sofern vorhanden) abgleichst und anstelle der Originalversion die AMP Version öffnest. Als Hilfsmittel kannst du Tools wie [Google AMP URL API](https://developers.google.com/amp/cache/use-amp-url) verwenden.

Die folgende Nachricht kann beispielsweise so transformiert werden, dass sie die AMP Versionen bereitstellt. Dazu werden alle URLs durch die entsprechenden AMP Versionen ersetzt (sofern vorhanden). Um die Ladezeit zu reduzieren und sicherzustellen, dass gültiges AMP bereitgestellt wird, solltest du die im AMP Cache zwischengespeicherten AMP Seiten verlinken.

Originalnachricht:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Transformierte Nachricht:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **TIPP:** Mithilfe einer Voreinstellung in deiner App kannst du deinen Benutzern ermöglichen, die nicht-AMP Version anstelle der AMP Version anzuzeigen. [/tip]

### Methoden zum Transformieren von Links

Es gibt drei Möglichkeiten, Links programmatisch zu transformieren:

1. **Serverseitig beim Schreiben (bevorzugt)**: Die AMP URL wird beim Schreiben einer URL über die Google AMP URL API abgerufen und die AMP URLs werden serverseitig gespeichert. Beide URLs werden an den Client übergeben, da die ursprüngliche URL möglicherweise zum Teilen benötigt wird. Dieser Ansatz wird empfohlen, da dabei weniger clientseitige Netzwerkanfragen erforderlich sind. Bei diesem Vorgehen ist es wichtig, die Links regelmäßig (z. B. täglich) nach AMP Versionen zu durchsuchen, da Websites zunehmend das AMP Format verwenden.
2. **Serverseitig beim Lesen (eingeschränkt verwendet)**: Die AMP URL wird über die Google AMP URL API abgerufen, bevor der Inhalt an deinen Client weitergegeben wird. Wie oben erwähnt, werden beide URLs (AMP und nicht-AMP) an den Client weitergegeben, da die ursprüngliche URL möglicherweise zum Teilen benötigt wird. Diese Methode kann sich für Low-Fan-Out Dienste eignen.
3. **Clientseitig (wenn serverseitig nicht möglich ist)**: Die AMP URL wird über die Google AMP URL API vom Client abgerufen. Verwende diesen Ansatz, wenn eine serverseitige URL Transformation nicht möglich ist (z. B. für Messenger Apps mit Ende-zu-Ende Verschlüsselung). Stelle sicher, dass die URL Umwandlung ausgelöst wird, sobald der Inhalt verfügbar ist – noch bevor eine Benutzerinteraktion stattgefunden hat.

[tip type="important"] **WICHTIG:** Fordere infolge einer Benutzerinteraktion niemals AMP URLs über die Google AMP API an. Das würde die Leistung deiner App beeinträchtigen, da eine zusätzliche Netzwerkanfrage erfolgt. Verwende stattdessen einen der drei oben beschriebenen Ansätze. [/tip]

#### Google AMP URL API

Google stellt die AMP URL API bereit, um die passenden AMP HTML URLs für eine bestimmte Liste von URLs abzurufen ([offizielle Dokumentation](https://developers.google.com/amp/cache/use-amp-url) / [Demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)). Bei den URLs muss es sich nicht um die kanonischen Versionen handeln. Wenn eine AMP Version vorhanden ist, enthält die Antwort die ursprüngliche AMP URL und die URL für die zwischengespeicherte AMP Seite im Google AMP Cache.

Ein Beispiel mit einer vorgegebenen Liste von URLs:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

Der Body der Antwort enthält die AMP URL Zuordnung im JSON Format:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **HINWEIS:** URLs für zwischengespeicherte AMP Seiten in nicht-Google AMP Caches können nicht über die AMP URL API abgerufen werden. Allerdings kann die zwischengespeicherte URL problemlos aus der zurückgegebenen AMP URL abgeleitet werden. [/tip]

## Verwendung von AMP Caches

Ein [AMP Cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) ist ein proxybasiertes Content Delivery Network (CDN) zur Bereitstellung gültiger AMP Dokumente. AMP Caches wurden entwickelt, um:

- nur gültige AMP Seiten bereitzustellen,
- AMP Seiten ein effizientes und sicheres Vorladen zu erlauben,
- Inhalte zusätzlich zu optimieren, um eine benutzerfreundliche Leistung zu erreichen.

Derzeit gibt es zwei AMP Cache Provider:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Es gibt es zwei Möglichkeiten, eine AMP Datei in einer App anzuzeigen:

1. Verwendung der vom Publisher gehosteten Version
2. Verwendung der in einem AMP Cache gehosteten Version

Wir empfehlen aus folgenden Gründen die Verwendung des AMP Cache:

- Verbesserte Benutzererfahrung durch schnellere Ladezeit und geringe Latenz (>1s schnellere Ladezeit).
- Vorteile bei Leistung und Bandbreite aufgrund der zusätzlichen Zwischenspeicherung von clientabhängigen Artefakten, z. B. Caching verschiedener Versionen desselben Bildes abhängig von der Größe des Client Viewports.
- Möglicherweise ist die ursprüngliche AMP Datei kein gültiges AMP mehr, was die Benutzererfahrung verschlechtert. In diesem Fall stellt der AMP Cache die letzte gültige Version der AMP Datei bereit.
- Ein nicht optimaler Publisher könnte einem AMP Cache Crawler und deinen Benutzern zwei verschiedene Dokumente bereitstellen. Die Verwendung eines AMP Cache garantiert, dass Benutzer immer dieselbe AMP Datei sehen wie der Cache.

[tip type="important"] **WICHTIG:** Wenn du AMP Seiten über den AMP Cache bereitstellst, sorge für eine Viewer Erfahrung, bei der die Quelle der AMP Version deutlich sichtbar ist und die den Benutzern die Möglichkeit bietet, die kanonische URL zu teilen (weitere Informationen hierzu findest du in den zwei folgenden Abschnitten). [/tip]

## Einen AMP Viewer implementieren

Die AMP Runtime bietet eine Viewer API. Diese stellt ein Protokoll zum Senden und Empfangen von Nachrichten zwischen der AMP Runtime und dem Viewer bereit. Dadurch lassen sich das Pre-Rendering von AMP Dokumenten, das Blättern zwischen Artikeln durch Wischen und die Instrumentierung der AMP Runtime steuern. Weitere Informationen zur AMP Viewer API findest du im Leitfaden [Verbindung von AMP Viewern mit AMP Seiten](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Viewer Implementierungen für [Web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) und [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) sind bei [GitHub](https://github.com/ampproject/amp-viewer) verfügbar. Ein Android Viewer ist noch nicht verfügbar. Sieh dir [diese Antwort](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) bei Stack Overflow an, um zu erfahren, wie du ein WebView am besten für die Anzeige von AMP Seiten konfigurierst.

Hier sind einige allgemeine Best Practices für die Implementierung eines AMP Viewers:

- Stelle die AMP Seite aus einem AMP Cache bereit (>1s schnellere Ladezeit).
- Zeige die Publisher Quelle des Artikels an (z. B. in einem zuklappbaren Header).
- Stelle eine Aktion zum Teilen bereit (siehe den Abschnitt "[AMP Content teilen](#sharing-amp-content)" weiter unten).
- Aktiviere in webView-basierten Viewern die Cookies von Drittanbietern.
- Lege einen Referrer für deine Plattform/App fest.

### AMP Content teilen <a name="sharing-amp-content"></a>

Wenn ein AMP Dokument aus dem AMP Viewer einer Plattform geteilt wird, sollte die Plattform die kanonische URL teilen, sofern dies technisch möglich ist. Wenn die Plattform beispielsweise einen Share Button bereitstellt, sollte dieser Button die kanonische URL teilen.

Es ist Teil der Philosophie des AMP Projekts, den Plattformen selbst die Wahl zu überlassen, welche Version eines Dokuments den Benutzern präsentiert wird. Darum ist es beim Teilen auf einer anderen Plattform am sinnvollsten, die kanonische Version (anstatt der AMP Version) zu teilen und sich darauf zu verlassen, dass die Zielplattform die richtige Wahl trifft.
