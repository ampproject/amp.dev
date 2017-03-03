---
$title: Seite auffindbar machen
---
[TOC]

Möglicherweise gibt es bei Ihnen in manchen Fällen von der gleichen Seite, etwa einem Nachrichtenartikel, sowohl eine Nicht-AMP- als auch eine AMP-Version. Wenn die Google-Suche die Nicht-AMP-Version der Seite findet, woher weiß sie dann, dass es auch eine AMP-Version gibt?

### Seiten mit `<link>` verknüpfen

Um dieses Problem zu lösen, fügen wir Informationen zur AMP-Seite auf der Nicht-AMP-Seite ein und umgekehrt. Dies geschieht mithilfe von `link`-Tags im `<head>`-Element.

Fügen Sie der Nicht-AMP-Seite den Code

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

und der AMP-Seite den folgenden Code hinzu:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Was ist, wenn ich nur eine Seite habe?

Wenn Sie nur eine Seite haben und es sich dabei um eine AMP-Seite handelt, müssen Sie trotzdem den kanonischen Link hinzufügen. Dieser verweist dann einfach auf sich selbst:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Integration in Drittanbieterplattformen mithilfe zusätzlicher Metadaten

Manchmal muss eine Drittanbieterwebsite, in die Ihre AMP-Seite eingebettet ist oder die Links zu ihr enthält, mehr über Ihre Seite wissen als lediglich, dass es sich um eine AMP-Seite handelt. Eine Plattform könnte z. B. wissen wollen, ob es sich bei Ihrer Seite um einen Nachrichtenartikel handelt oder ob sie ein Video oder einen Screenshot und eine kurze Beschreibung enthält.

Dies ist nicht nur für AMP-Seiten, sondern für alle Webseiten relevant. Bei manchen Plattformen sind diese Metadaten optional, während sie bei anderen erforderlich sind – **in diesem Fall werden Links zu Ihren Inhalten nicht angezeigt, wenn Sie nicht die richtigen Metadaten bereitstellen.** Stellen Sie also den Plattformen, auf denen Ihre Inhalte erscheinen sollen, unbedingt die richtigen Metadaten zur Verfügung.

### Schema.org für die meisten Suchmaschinen verwenden

[Schema.org](http://schema.org/) bietet offene Vokabulare zum Hinzufügen von Metadaten für die verschiedensten Inhalte. Im Fall von AMP gehören zu den im Kontext relevanten Eigenschaften der konkrete Inhaltstyp (wie "Nachrichtenartikel"), die Überschrift, das Veröffentlichungsdatum und die zugehörigen Vorschaubilder.

Beispiel:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Weitere Beispiele einschließlich der alternativen HTML-Attributsyntax finden Sie im [Ordner für ampproject-Beispiele](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples).

Hinweis: Diese Schema.org-Definition ist erforderlich, wenn Ihre Inhalte im Demo des Nachrichtenkarussells der [Google-Suche (auf Mobilgerät ausprobieren)](https://g.co/ampdemo) erscheinen sollen.
Weitere Informationen finden Sie unter [Schlagzeilen mit AMP](https://developers.google.com/structured-data/carousels/top-stories) und [Test-Tool für strukturierte Daten](.google.com/structured-data/testing-tool/).

### Weitere Metadaten für noch mehr Plattformen

Informationen zu allen sonstigen Möglichkeiten, Ihre Inhalte auffindbar zu machen und für die Verbreitung vorzubereiten, finden Sie im [Leitfaden zur Auffindbarkeit in sozialen Netzwerken im Abschnitt über die Grundlagen der Websiteprogrammierung](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/).
