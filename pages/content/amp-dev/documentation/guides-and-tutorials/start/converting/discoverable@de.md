---
"$title": Stelle die Auffindbarkeit deiner Seiten sicher
"$order": '3'
description: Diese bidirektionale Verknüpfung ist erforderlich, damit Suchmaschinen die Beziehung zwischen unserem kanonischen Dokument in regulärem HTML und unserem AMP Dokument verstehen.
---

Nachdem du nun einen Artikel in AMP erstellt hast, müssen wir sicherstellen, dass Benutzer deine Inhalte finden und entdecken können.

## Link AMP content

Deine Website kann entweder nur aus AMP Seiten bestehen, einige AMP Seiten enthalten oder gar keine AMP Seiten haben. In diesem Teil des Tutorials erfährst du, wie du AMP in die Struktur deiner Website integrierst.

In regulären HTML Seiten ist eine kanonische Verknüpfung üblich, um die bevorzugte Seite zu deklarieren, falls mehrere Seiten den gleichen Inhalt bieten.

One common approach when adding AMP to a website is to generate AMP versions of traditional non-AMP HTML pages.  Both versions have generally the same content (e.g. the text of an article) but they may have different presentations.  In this scenario you should treat the traditional HTML pages as the “canonical” pages and pair the AMP pages with those HTML pages.

Wenn möglich, verwende AMP wie jede andere JavaScript Bibliothek, um deine Website zu erstellen und nicht mehr an die kanonische Verknüpfung zu denken. Wenn du deine gesamte Website mit AMP erstellst, reduziert sich dein Wartungsaufwand erheblich.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Wir gehen in diesem Tutorial davon aus, dass es eine AMP und eine nicht-AMP Version deiner Seite gibt: Unsere Website enthält einen Nachrichtenartikel mit einer nicht-AMP HTML Seite (`article.html`) und einer AMP Version der Seite (`article.amp.html`). Diese Seiten koppeln wir über das Tag `link`.

Im ersten Schritt haben wir in unserem AMP Dokument im `<head>` ein Linktag zurück zur kanonischen Seite eingefügt:

```html
<link rel="canonical" href="/article.html">
```

Beim nächsten Schritt wird der kanonische Artikel mit der AMP Seite verknüpft. Dazu fügen wir das Tag `<link rel="amphtml">` im Abschnitt `<head>` des kanonischen Artikels ein.

In the `article.html` file, **add** the following code into the `<head>` section:

```html
<link rel="amphtml" href="/article.amp.html">
```

The following diagram illustrates the directions of link tags:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

Diese bidirektionale Verknüpfung ist erforderlich, damit Suchmaschinen die Beziehung zwischen unserem kanonischen Dokument in regulärem HTML und unserem AMP Dokument verstehen. Ohne diese Links wäre dem Crawler nicht unbedingt klar, welche Artikel die "AMP Versionen" der regulären HTML Dokumente sind. Durch die explizite Angabe dieser Links werden solche Unklarheiten vermieden.

## Add structured data

Für gültige AMP Seiten sind keine strukturierten Daten von [schema.org](http://schema.org/) erforderlich. Einige Plattformen wie die Google-Suche benötigen diese Daten jedoch für bestimmte Darstellungen wie das Schlagzeilenkarussell. Generell ist es ratsam, strukturierte Daten einzubeziehen. Strukturierte Daten helfen Suchmaschinen, deine Webseite besser zu verstehen und deine Inhalte auf den Ergebnisseiten der Suchmaschinen besser anzuzeigen (z. B. in Rich Snippets). Die strukturierten Daten werden über ein Skripttag vom Typ `application/ld+json` im Tag <code><head></code> deiner AMP Seite eingebunden.

For our news article, **add** the following structured data to the bottom of the `<head>` section of your AMP document:

```html

<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
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

**Reload** the page in your browser and verify that no AMP Validation errors were introduced.

[tip type="note"] In addition to the schema.org structured data format, there are other formats supported by search engines and social media networks. See the supported documentation:

- [Twitter Cards meta tags](https://dev.twitter.com/cards/overview)
- [Facebook Open Graph meta tags](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Validate the structured data

Um zu überprüfen, ob deine strukturierten Daten korrekt sind, bieten viele Plattformen Validierungstools an. In diesem Tutorial validieren wir unsere strukturierten Daten mit dem [Google Testtool für strukturierte Daten](https://developers.google.com/structured-data/testing-tool/).

1. In a new browser window, open the [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/).
2. Select the **Code Snippet** tab.
3. Copy and paste the full source code from your AMP page into the text editor panel of the validation tool.
4. Klicke auf **Test durchführen**.

If your structured data is valid, you should see **0 errors**, and **0 warnings**.

[tip type="read-on"] **ERFAHRE MEHR:** Weitere Informationen zur Erkennbarkeit von Seiten findest du im Leitfaden [So werden deine Seiten gefunden](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Awesome work!  You've completed your AMP news article.
