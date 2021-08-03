---
'$title': Stelle die Auffindbarkeit deiner Seiten sicher
$order: 3
description: Diese bidirektionale Verknüpfung ist erforderlich, damit Suchmaschinen die Beziehung zwischen unserem kanonischen Dokument in regulärem HTML und unserem AMP Dokument verstehen.
---

Nachdem du nun einen Artikel in AMP erstellt hast, müssen wir sicherstellen, dass Benutzer deine Inhalte finden und entdecken können.

## Verknüpfe AMP Inhalte

Deine Website kann entweder nur aus AMP Seiten bestehen, einige AMP Seiten enthalten oder gar keine AMP Seiten haben. In diesem Teil des Tutorials erfährst du, wie du AMP in die Struktur deiner Website integrierst.

In regulären HTML Seiten ist eine kanonische Verknüpfung üblich, um die bevorzugte Seite zu deklarieren, falls mehrere Seiten den gleichen Inhalt bieten.

Wenn AMP zu einer Website hinzugefügt wird, werden häufig AMP Versionen der traditionellen nicht-AMP HTML Seiten generiert. Beide Versionen haben generell den gleichen Inhalt (z. B. den Text eines Artikels), können aber unterschiedliche Präsentationen aufweisen. In diesem Fall solltest du die herkömmlichen HTML Seiten als "kanonische" Seiten behandeln und die AMP Seiten mit diesen HTML Seiten koppeln.

Wenn möglich, verwende AMP wie jede andere JavaScript Bibliothek, um deine Website zu erstellen und nicht mehr an die kanonische Verknüpfung zu denken. Wenn du deine gesamte Website mit AMP erstellst, reduziert sich dein Wartungsaufwand erheblich.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Verknüpfung von AMP Inhalten') }}

Wir gehen in diesem Tutorial davon aus, dass es eine AMP und eine nicht-AMP Version deiner Seite gibt: Unsere Website enthält einen Nachrichtenartikel mit einer nicht-AMP HTML Seite (`article.html`) und einer AMP Version der Seite (`article.amp.html`). Diese Seiten koppeln wir über das Tag `link`.

Im ersten Schritt haben wir in unserem AMP Dokument im `<head>` ein Linktag zurück zur kanonischen Seite eingefügt:

```html
<link rel="canonical" href="/article.html" />
```

Beim nächsten Schritt wird der kanonische Artikel mit der AMP Seite verknüpft. Dazu fügen wir das Tag `<link rel="amphtml">` im Abschnitt `<head>` des kanonischen Artikels ein.

**Füge** in der Datei `article.html` im Abschnitt `<head>` den folgenden Code ein:

```html
<link rel="amphtml" href="/article.amp.html" />
```

Das folgende Diagramm zeigt die Richtungen der Linktags:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Verknüpfung von AMP Inhalten') }}

Diese bidirektionale Verknüpfung ist erforderlich, damit Suchmaschinen die Beziehung zwischen unserem kanonischen Dokument in regulärem HTML und unserem AMP Dokument verstehen. Ohne diese Links wäre dem Crawler nicht unbedingt klar, welche Artikel die "AMP Versionen" der regulären HTML Dokumente sind. Durch die explizite Angabe dieser Links werden solche Unklarheiten vermieden.

## Füge strukturierte Daten hinzu

Für gültige AMP Seiten sind keine strukturierten Daten von [schema.org](http://schema.org/) erforderlich. Einige Plattformen wie die Google-Suche benötigen diese Daten jedoch für bestimmte Darstellungen wie das Schlagzeilenkarussell. Generell ist es ratsam, strukturierte Daten einzubeziehen. Strukturierte Daten helfen Suchmaschinen, deine Webseite besser zu verstehen und deine Inhalte auf den Ergebnisseiten der Suchmaschinen besser anzuzeigen (z. B. in Rich Snippets). Die strukturierten Daten werden über ein Skripttag vom Typ `application/ld+json` im Tag `<head>` deiner AMP Seite eingebunden.

**Füge** für unseren Nachrichtenartikel die folgenden strukturierten Daten am Ende des Abschnitts `<head>` in dein AMP Dokument ein:

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://example.com/my-article.html"
    },
    "headline": "My First AMP Article",
    "image": {
      "@type": "ImageObject",
      "url": "https://example.com/article_thumbnail1.jpg",
      "height": 800,
      "width": 800
    },
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "⚡ AMP Times",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/amptimes_logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "description": "My first experience in an AMPlified world"
  }
</script>
```

[tip type="note"] **HINWEIS:** Der Inhalt sollte immer gleich sein. Gib für Nachrichtenartikel den Typ "NewsArticle" an. Die Überschrift sollte mit dem Titel deines Artikels übereinstimmen. Das Bildobjekt bezieht sich auf das wichtigste Bild des Artikels. [/tip]

**Lade** die Seite in deinem Browser neu und stelle sicher, dass es keine AMP Validierungsfehler gibt.

[tip type="note"] Neben dem strukturierten Datenformat von schema.org werden auch weitere Formate von Suchmaschinen und sozialen Netzwerken unterstützt. Hier findest du entsprechende Dokumentationen:

- [Metatags für Twitter Cards](https://dev.twitter.com/cards/overview)
- [Metatags für Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Validiere die strukturierten Daten

Um zu überprüfen, ob deine strukturierten Daten korrekt sind, bieten viele Plattformen Validierungstools an. In diesem Tutorial validieren wir unsere strukturierten Daten mit dem [Google Testtool für strukturierte Daten](https://developers.google.com/structured-data/testing-tool/).

1. Öffne das [Google Testtool für strukturierte Daten](https://developers.google.com/structured-data/testing-tool/) in einem neuen Browserfenster.
2. Wähle die Registerkarte **Code-Snippet** aus.
3. Kopiere den vollständigen Quellcode von deiner AMP Seite und füge ihn in den Texteditorbereich des Validierungstools ein.
4. Klicke auf **Test durchführen**.

Wenn deine strukturierten Daten gültig sind, werden **0 Fehler** und **0 Warnungen** angezeigt.

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Informationen zur Erkennbarkeit von Seiten findest du im Leitfaden [So werden deine Seiten gefunden](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Gut gemacht! Dein AMP Nachrichtenartikel ist fertig.
