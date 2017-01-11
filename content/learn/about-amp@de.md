---
$title: Was ist AMP?
---

[TOC]

<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP ist eine Methode, Webseiten für statische Inhalte zu erstellen, die schnell dargestellt werden.
AMP besteht aus drei Teilen:

**AMP-HTML** ist HTML mit einigen Einschränkungen für eine zuverlässige Leistung und einigen Erweiterungen für die Erstellung ansprechender Inhalte, die über einfaches HTML hinausgehen. Die **AMP-JS-Bibliothek** sorgt dafür, dass AMP-HTML-Seiten schnell aufgebaut werden.
Über den **AMP-Cache von Google** können AMP-HTML-Seiten aus dem Cache bereitgestellt werden.

## AMP-HTML

AMP-HTML ist im Grunde HTML, das um benutzerdefinierte AMP-Eigenschaften erweitert wurde.
Die einfachste Version einer AMP-HTML-Datei sieht so aus:

[sourcecode:html]
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
[/sourcecode]

Die meisten Tags einer AMP-HTML-Seite sind normale HTML-Tags, einige werden aber durch AMP-spezifische Tags ersetzt. Mehr über HTML-Tags [erfahren Sie auch in der AMP-Spezifikation](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).
Diese AMP-spezifischen und benutzerdefinierten Elemente, AMP-HTML-Komponenten genannt, ermöglichen eine einfache und effiziente Implementierung von gängigen Mustern.

Das Tag [`amp-img`](/docs/reference/amp-img.html) beispielsweise bietet selbst in Browsern, die dies noch nicht unterstützen, vollständigen `srcset`-Support.
[Lesen Sie hier, wie Sie eine AMP-Seite erstellen.](/docs/get_started/create.html)

## AMP-JS

Die [AMP-JS-Bibliothek](https://github.com/ampproject/amphtml/tree/master/src) hat mehrere Funktionen, die gemeinsam für ein schnelles Rendering Ihrer Seite sorgen: Alle [Best Practices zur AMP-Leistung](/docs/get_started/technical_overview.html) werden implementiert, das Laden von Ressourcen wird verwaltet und die oben erwähnten benutzerdefinierten Tags werden bereitgestellt.

Zu den größten Optimierungen gehört, dass alles, was aus externen Ressourcen stammt, asynchron bereitgestellt wird. So kann kein Seitenelement die Darstellung eines anderen blockieren.

Weitere Technologien für eine verbesserte Leistung sind Sandbox-Verfahren für alle iFrames, die Vorberechnung des Layouts aller Seitenelemente, bevor Ressourcen geladen werden, und die Deaktivierung langsamer CSS-Selektoren.

Weitere Informationen sowohl zu den [Optimierungen](/docs/get_started/technical_overview.html) als auch den Beschränkungen [finden Sie in der AMP-HTML-Spezifikation](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## AMP-Cache von Google

Der [AMP-Cache von Google](https://developers.google.com/amp/cache/) ist ein proxybasiertes Content Delivery Network (CDN) zum Bereitstellen aller gültigen AMP-Dokumente.
AMP-HTML-Seiten werden abgerufen, im Cache gespeichert und die Seitenleistung wird automatisch verbessert.
Bei der Verwendung des AMP-Cache von Google werden das Dokument, alle JS-Dateien und alle Bilder aus derselben Quelle geladen, die [HTTP 2.0](https://http2.github.io/) für maximale Effizienz nutzt.

In den Cache ist außerdem ein [Validierungssystem](https://github.com/ampproject/amphtml/tree/master/validator) integriert, über das bestätigt wird, dass die Seite funktioniert und nicht von externen Ressourcen abhängig ist.
Das Validierungssystem führt eine Reihe von Assertionen aus, um zu prüfen, ob das Markup der Seite die AMP-HTML-Spezifikation erfüllt.

Eine weitere Version des Validierungstools ist Teil jeder AMP-Seite. Diese Version kann Validierungsfehler beim Darstellen der Seite direkt in der Browserkonsole protokollieren. So können Sie sehen, wie komplexe Änderungen in Ihrem Code sich auf die Leistung und Nutzererfahrung auswirken.

[Lesen Sie hier, wie Sie Ihre AMP-HTML-Seiten testen.](/docs/guides/validate.html)
