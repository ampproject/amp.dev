---
formats:
  - websites
'$title': So werden deine Seiten gefunden
'$titles':
  teaser: Make your pages discoverable
$order: 5
description: In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel. Aber woher weiß die Google Suche …
teaser:
  icon: auffinden
  text: Finde heraus, wie Suchmaschinen feststellen, ob eine AMP Version deiner Website existiert.
  label: Mehr erfahren
---

In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel. Aber woher weiß die Google Suche nach dem Fund deiner traditionellen Seite eigentlich, dass eine AMP Version davon existiert?

### Seiten verlinken mit &lt;link&gt;

Um dieses Problem zu lösen, fügen wir der traditionellen Seite Informationen über die AMP Seite hinzu und umgekehrt. Dazu verwenden wir die Tags `<link>` im Abschnitt `<head>`.

Füge deiner Seite ohne AMP Folgendes hinzu:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Deiner AMP Seite fügst du dies hinzu:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Und wenn ich nur eine einzige Seite habe?

Auch wenn du nur eine einzige Seite hast, die eine AMP Seite ist, musst du den kanonischen Link hinzufügen, der in diesem Fall auf sich selbst verweist:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **ERFAHRE MEHR:** Erfahre mehr darüber, wie Google AMP Seiten findet, unter [Richtlinien für AMP-Seiten (Accelerated Mobile Pages) in der Google-Suche](https://support.google.com/webmasters/answer/6340290) [/tip]

## Integration von Plattformen von Drittanbietern mithilfe zusätzlicher Metadaten <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Manchmal brauchen Websites von Drittanbietern (die deine AMP Seite einbetten oder auf sie verlinken) mehr Informationen zu deiner Seite als nur den Hinweis, ob es sich dabei um eine AMP Seite handelt. Plattformen könnten zum Beispiel fragen: "Ist das ein Nachrichtenartikel?", "Ist das ein Video?" oder "Gibt es einen Screenshot und eine kurze Beschreibung?"

Das ist nicht nur für AMP Seiten relevant, sondern für alle Webseiten. Auf einigen Plattformen sind solche Metadaten optional, auf anderen obligatorisch, was bedeutet, dass sie **keine Links zu deinen Inhalten anzeigen, wenn du nicht die richtigen Metadaten mitgeliefert hast**. Stelle also sicher, dass du für die Plattformen, auf denen deine Inhalte angezeigt werden sollen, die jeweils erforderlichen Metadaten bereitstellst.

### Verwende Schema.org für die meisten Suchmaschinen

[Schema.org](http://schema.org/) bietet frei verfügbare Vokabulare für Metadaten in allen möglichen Szenarien. Im Fall von AMP sind die folgenden Eigenschaften sinnvoll im Kontext: die konkrete Art des Inhalts (z. B. "Nachrichtenartikel"), die Überschrift, das Veröffentlichungsdatum und die zugehörigen Vorschaubilder.

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

Weitere Beispiele findest du im [Ordner "examples" in ampproject](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) (einschließlich der alternativen Syntax für HTML Attribute).

[tip type="read-on"] Weitere Informationen zu strukturierten Daten findest du in diesen Ressourcen:

- Erfahre, wie du [deine Inhalte so strukturierst, dass sie in den Rich-Suchergebnissen der Google Suche angezeigt werden](https://developers.google.com/search/docs/guides/mark-up-content) (z. B. Top Story Karussell, Rezeptkarten usw.).
- Teste deine strukturierten Daten mit dem [Google Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Andere Metadaten für noch mehr Plattformen

Der [Leitfaden zum Thema Social Discovery bei Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) gibt dir einen Einblick in die verschiedenen Methoden, wie du deinen Content vorbereiten kannst, damit er gefunden und weiterverbreitet wird.
