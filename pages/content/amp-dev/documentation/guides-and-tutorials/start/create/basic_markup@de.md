---
"$title": Erstelle deine AMP HTML Seite
"$order": '1'
description: 'Verwende HTTPS: Wenn du AMP Seiten und Inhalte erstellst, solltest du unbedingt das HTTPS Protokoll verwenden (nicht HTTP). Obwohl HTTPS für das AMP Dokument oder für …'
author: pbakaus
contributors:
- bpaduch
---

Das folgende Markup eignet sich als Ausgangspunkt oder Boilerplate. Kopiere es und speichere es in einer Datei mit der Erweiterung .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Bisher ist der Inhalt im Abschnitt "body" relativ selbsterklärend. Aber es gibt eine Menge zusätzlichen Code im Head der Seite, der unklar sein könnte. Gehen wir das erforderliche Markup Schritt für Schritt durch.

Verwende HTTPS: Wenn du AMP Seiten und Inhalte erstellst, solltest du unbedingt das HTTPS Protokoll verwenden (nicht HTTP). Obwohl HTTPS für das AMP Dokument oder für Bilder und Schriftarten nicht erforderlich ist, gibt es viele AMP Funktionen, die HTTPS erfordern (z. B. Video und iframes). Verwende das HTTPS Protokoll, um sicherzustellen, dass deine AMP Seiten alle AMP Funktionen optimal nutzen. Weitere Informationen zu HTTPS findest du unter ["Why HTTPS Matters"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] Verwende den [AMP Boilerplate Generator](/boilerplate), um schnell mit dem Erstellen neuer AMP Seiten zu beginnen. [/tip]

## Erforderliches Markup

AMP HTML Dokumente MÜSSEN:

Regel | Beschreibung
--- | ---
Sie beginnt mit dem Doctype `<!doctype html>`. | Standard für HTML.
Ein `<html ⚡>` Tag der obersten Ebene enthalten <br>(`<html amp>` wird ebenfalls akzeptiert) | Identifiziert die Seite als AMP Inhalt.
Die Tags `<head>` und `<body>` enthalten | Optional in HTML, aber nicht in AMP.
Das Tag `<meta charset="utf-8">` als erstes untergeordnetes Element des Tags `<head>` enthalten | Identifiziert die Codierung für die Seite.
Sie enthält das Tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` in ihrem Tag `<head>`. Als Best Practice solltest du das Skript so früh wie möglich in `<head>` platzieren. | Bindet die AMP JS Bibliothek ein und lädt sie.
Das Tag `<link rel="canonical" href="$SOME_URL">` im `<head>` enthalten. | Verweist auf die reguläre HTML Version des AMP HTML Dokuments oder auf sich selbst, wenn keine solche HTML Version vorhanden ist. Weitere Informationen findest du in [So werden deine Seiten gefunden](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md).
Das Tag `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">` im <code><head></code> Tag enthalten. Es wird auch empfohlen, <code>initial-scale=1</code> aufzunehmen. | Sorgt für einen responsiven Viewport. Weitere Informationen findest du unter [Erstelle responsive AMP Seiten](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
Den [Code der AMP Boilerplate](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) im Tag `<head>` enthalten | CSS Boilerplate, um den Inhalt zu verbergen, bis AMP JS geladen ist.

## Optionale Metadaten

Neben den reinen Anforderungen enthält unser Beispiel im Head auch eine Schema.org Definition. Dies ist für AMP keine strenge Anforderung, wird aber benötigt, damit deine Inhalte in bestimmten Kontexten verfügbar sind (z. B. im Schlagzeilenkarussell der Google Suche).

[tip type="read-on"]Weitere Informationen findest du in diesen Ressourcen:

- [Erste Schritte mit AMP in der Google Suche](https://developers.google.com/amp/docs): Erfahre, wie du deine AMP Seiten für die Google Suche vorbereitest.
- [Beispiele für Metadaten](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples): Erfahre mehr über alle Metadaten, die du an verschiedenen anderen Orten benötigst (z. B. bei Twitter). [/tip]

<hr>

Gute Neuigkeiten! Mehr brauchen wir nicht, um unsere erste AMP Seite zu erstellen, aber natürlich hat der Abschnitt "body" noch nicht viel zu bieten. Im nächsten Abschnitt erfährst du, wie du Grundelemente wie Bilder und benutzerdefinierte AMP Elemente hinzufügst, den Stil deiner Seite anpasst und ein responsives Layout erstellst.
