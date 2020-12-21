---
"$title": Checkliste für das AMP Publishing
"$order": '0'
description: Mit responsivem Webdesign werden flüssige Webseiten erstellt, die auf die Bedürfnisse deiner Benutzer reagieren – Seiten, die der Größe und Ausrichtung …
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

Beachte diese Checkliste, damit deine Website ein umfassendes AMP Erlebnis bietet!

# Stelle die Validierung der AMP Spezifikation sicher

AMP bietet eine Vielzahl integrierter Vorteile. Das Vorladen von Inhalten aus AMP Caches reduziert beispielsweise die Wartezeit der Benutzer. Um diese Vorteile zu nutzen, müssen Seiten gültige AMP Dokumente sein. Seiten, die veröffentlicht werden, obwohl sie von AMP Validator gemeldete Fehler enthalten, können von AMP Caches nicht indiziert werden und werden möglicherweise fehlerhaft bereitgestellt.

Veröffentliche niemals eine AMP Seite, die von den folgenden Tools als ungültig eingestuft wird:

- [Validierung von AMP Seiten](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [The AMP Validator ](https://validator.ampproject.org/)
- [Google AMP-Test](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP Tools](../../../documentation/tools.html?format=websites)

# Gewähre zwischengespeicherten AMP Seiten den Serverzugriff

Tolle Neuigkeiten: Gültige AMP Seiten werden automatisch in alle vorhandenen AMP Caches aufgenommen! Dadurch erleben deine Benutzer Inhalte, die effizient und zuverlässig geladen werden. Diese Arten von Optimierungen sind großartig, haben aber einen kleinen Haken. Manche Benutzer erhalten AMP Seiten von Domänen, die nicht mit deiner eigenen übereinstimmen. Dies kann dazu führen, dass Seiten bei Verwendung dynamischer AMP Komponenten wie [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) oder [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites) den Zugriff auf Websitedaten verlieren. Bei diesen Fehlertypen handelt es sich um CORS Probleme (Cross-Origin Resource Sharing). Sorge für Sicherheit, indem du CORS Anfragen aus allen verfügbaren [AMP Caches](https://cdn.ampproject.org/caches.json) aktivierst! Wenn du Node.js in deinem Backend verwendest, kannst du die [amp-cors middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) verwenden.

Weitere Informationen über das Gewähren des Serverzugriffs:

- [Caching von AMP Seiten ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [AMP CORS Middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) für Node.js

# Sicherer und gemeinsam nutzbarer Inhalt mit Signed Exchanges

Behalte die URL deiner Domäne bei und vereinfache die Analyse, wenn du Inhalte über Signed Exchanges (SXG) teilst. Wenn du AMP Seiten mit SXG bereitstellst, schützen digitale Signaturen deine Informationen und das Dokument wird an die angegebene URL gebunden. Dieses Verhalten behandelt Benutzersitzungen und Cookies als Erstanbieter und schließt mögliche Analyselücken. Durch die SXG Implementierung werden signierte AMP Inhalte bereitgestellt – und zwar zusätzlich zu regulären AMP Inhalten, nicht anstelle regulärer AMP Inhalte.

Weitere Informationen zum Implementieren von Signed Exchanges:

- [Stelle AMP via Signed Exchanges bereit](signed-exchange.md?format=websites)
- [Signed HTTP Exchanges](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Teste zwischengespeicherte Seiten

AMP Caches speichern Bilder, Schriftarten und Seiteninhalte, um den Benutzern deine Inhalte so schnell wie möglich bereitzustellen. Daher ist es wichtig zu testen, ob deine AMP Seiten wie erwartet aussehen und funktionieren, wenn sie aus einem AMP Cache bereitgestellt werden.

Wenn du AMP Seiten zu einem AMP Cache hinzufügst, überprüfe mit den [Entwicklertools deines Browsers](https://developers.google.com/web/tools/chrome-devtools/), ob alle externen Ressourcen geladen werden können. Hier ist eine bewährte Checkliste:

- Bilder
- Videos
- amp-analytics Endpoints
- amp-pixel Endpoints
- benutzerdefinierte Schriftarten
- iframes

Weitere Informationen über AMP Caches:

- [Verwendung von Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP bei Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Probleme mit dem AMP Cache lösen](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [URL Format und Anfragenbearbeitung im AMP Cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Stelle sicher, dass Suchmaschinen deine AMP Dateien erkennen können

Sowohl Seiten, die nur in AMP erstellt wurden (AMP first), als auch Seiten mit einem AMP Double (gekoppeltes AMP) müssen auffindbar sein! Alle AMP Seiten erfordern den `<link rel="canonical" href="$SOME_URL">` in ihrem `<head>`. Seiten, die nur in AMP erstellt wurden, müssen mit sich selbst verknüpft sein, und AMP Seiten, die mit einer Nicht-AMP Seite gekoppelt sind, müssen miteinander verknüpft sein.

Stelle sicher, dass deine [Schema.org](https://schema.org/) Metadaten nützliche Informationen hinzufügen! Andere Websites und Suchmaschinen benötigen diese möglicherweise, um deine Inhalte zu teilen.

Programme, die nach Inhalten suchen, werden Webroboter, Webwanderer, Crawler oder Spinnen genannt. Sie erforschen das Internet und unterstützen Suchmaschinen dabei, Webinhalte zu indizieren, damit Benutzeranfragen die richtigen Ergebnisse liefern! Stelle sicher, dass deine Website auffindbar ist: Nimm dazu die entsprechenden Anweisungen in die Datei `robots.txt` auf und richte die entsprechenden Header ein.

Schließe Crawler NICHT über deine [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) Datei aus.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

Füge das `noindex` Metatag eines Roboters NICHT zu deinen AMP HTML Dateien hinzu.

```
<meta name="robots" content="noindex" />   <= don't!
```

Nimm `noindex` NICHT als X-Robots-Tag HTTP Header für deine AMP Dateien auf.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Mehr Informationen darüber, wie du deine Seiten auffindbar machst:

- [So werden deine Seiten gefunden ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Spezifikationen für Robots-Meta-Tags und X-Robots-Tags HTTP Header](https://developers.google.com/search/reference/robots_meta_tag)
- [Häufige Fragen zur AMP Indizierung](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Messung des Benutzerdatenverkehrs und der User Journeys

Das Erfassen korrekter Metriken ist für brauchbare Analysen unerlässlich. Wenn du testest, wie sich die AMP Einführung auf deiner Website auf die Benutzer auswirkt, stelle sicher, dass die richtigen Dinge gemessen werden. Falsche negative, falsche positive oder irrelevante Ergebnisse können auftreten, wenn von AMP verursachte Unterschiede bei der Analyse ignoriert werden. Stelle sicher, dass du verstehst, wonach du suchst und wie es gemessen wird!

Weitere Informationen darüber, wie die Analyse für AMP richtig eingerichtet wird:

- [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Cache vs. non-cache analysis](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Messung der User Journeys vom AMP Cache zu deiner Website](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Measuring success: What's new in AMP analytics & experiments (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
