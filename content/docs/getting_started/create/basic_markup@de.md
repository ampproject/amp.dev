---
$title: AMP-HTML-Seite erstellen
---

Das folgende Markup ist eine gute Ausgangsbasis und kann als Standard-Markup verwendet werden.
Kopieren Sie es und speichern Sie es in einer Datei mit der Erweiterung ".html".

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Der Inhalt im body-Element ist bisher ziemlich einfach. Allerdings ist relativ viel zusätzlicher Code im head-Element enthalten, der etwas genauer erläutert werden sollte. Darum dekonstruieren wir nun das erforderliche Markup.

### Erforderliches Markup

AMP-HTML-Dokumente MÜSSEN:

  - mit dem Doctype `<!doctype html>` beginnen.
  - ein Top-Level-`<html ⚡>`-Tag enthalten (`<html amp>` wird auch akzeptiert).
  - die Tags `<head>` und `body` enthalten (in HTML sind sie optional).
  - im head-Element das Tag `<link rel="canonical" href="$SOME_URL">` enthalten, das auf die reguläre HTML-Version des AMP-HTML-Dokuments oder auf sich selbst verweist, falls keine reguläre HTML-Version existiert.
  - ein `<meta charset="utf-8">`-Tag als erstes untergeordnetes Element des head-Tags enthalten.
  - das Tag `<meta name="viewport" content="width=device-width,minimum-scale=1">` innerhalb des head-Tags enthalten. Außerdem wird empfohlen, "initial-scale=1" einzufügen.
  - das Tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` als letztes Element im head-Tag enthalten. Damit wird die AMP-JS-Bibliothek eingeschlossen und geladen.
  <li>Folgendes im `<head>`-Tag enthalten:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Optionale Metadaten

Neben den Basisanforderungen enthält unser Beispiel auch eine Schema.org-Definition im head-Element. Dies ist zwar keine strikte Anforderung für AMP, ist aber erforderlich, damit Inhalte an verschiedenen Stellen bereitgestellt werden können, zum Beispiel im [Nachrichtenkarussell der Google-Suche (auf dem Smartphone ausprobieren)](https://g.co/ampdemo).

Weitere Informationen zu den Metadaten, die Sie an verschiedenen anderen Stellen wie z. B. Twitter brauchen, [finden Sie in unseren Beispielen](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Mehr über AMP in der Google-Suche erfahren Sie unter [Schlagzeilen mit AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Gute Neuigkeiten! Das ist alles, was Sie zum Erstellen Ihrer ersten AMP-Seite brauchen. Aber natürlich passiert bisher noch nicht viel im HTML-Body. In den nächsten Schritten erfahren Sie, wie Sie grundlegende Komponenten wie Bilder und benutzerdefinierte AMP-Elemente hinzufügen, Ihre Seite gestalten und ein responsives Layout erstellen.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/de/docs/tutorials/create.html"><span class="arrow-prev">Bisherige</span></a>
  <a class="button next-button" href="/de/docs/tutorials/create/include_image.html"><span class="arrow-next">Nächster</span></a>
</div>
