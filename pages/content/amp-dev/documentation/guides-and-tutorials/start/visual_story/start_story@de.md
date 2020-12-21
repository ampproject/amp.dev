---
"$title": Der Beginn unserer Story
"$order": '3'
description: Die Web Story wird in ihrer Gesamtheit durch die Komponente "amp-story" repräsentiert, welche als Container für alle Seiten der Story dient. Die Komponente amp-story ist außerdem verantwortlich für …
author: bpaduch
---

An entire Web Story is represented by the [`amp-story`](../../../../documentation/components/reference/amp-story.md) component, which serves as a container for all the pages in a story.  The [`amp-story`](../../../../documentation/components/reference/amp-story.md) component is also responsible for creating the UI shell, including handling gestures and navigation.

Die Komponente [`amp-story`](../../../../documentation/components/reference/amp-story.md) ist eine benutzerdefinierte AMP Komponente, und wie bei allen anderen benutzerdefinierten Komponenten musst du auch hier das zugehörige Skript für die Komponente zum AMP Dokument hinzufügen.

**Öffne** die Datei `pets.html` in deinem Texteditor und **füge** im Abschnitt `<head>` das folgende Skript hinzu:

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

**Füge** das Element `<amp-story>` zum `<body>` deines Dokuments hinzu und gib das obligatorische Attribut `standalone` wie folgt an:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Beachte unbedingt, dass das Element `<body>` in einer gültigen AMP Story nur ein einziges untergeordnetes Element haben darf: die Komponente [`amp-story`](../../../../documentation/components/reference/amp-story.md). Alle anderen Elemente sind in der Komponente [`amp-story`](../../../../documentation/components/reference/amp-story.md) enthalten.

## Bereitstellung von Metainformationen

Damit Storys im Web entdeckt werden können, sind bestimmte Metadaten erforderlich, die Kurzinfos zur Story bereitstellen, z. B.:

- Titel der Story, angegeben mit dem Attribut `title` (z. B. "Joy of Pets").
- Name des Publishers, angegeben mit dem Attribut `publisher` (z. B. "AMP Tutorials").
- Logo des Publishers, angegeben mit dem Attribut `publisher-logo-src`. Das ist die URL zum quadratischen Bild des Logos mit einem Seitenverhältnis von 1x1.
- Posterbild der Story, angegeben mit dem Attribut `poster-portrait-src`. Das ist die URL zum Poster, dessen Bild im Hochformat mit einem Seitenverhältnis von 3x4 vorliegen muss.

Fügen wir diese Attribute zu unserem Tag [`amp-story`](../../../../documentation/components/reference/amp-story.md) hinzu:

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Zusätzlich zu diesen obligatorischen Attributen kannst du noch weitere Attribute anwenden. Weitere Informationen findest du im Abschnitt [Attribute](../../../../documentation/components/reference/amp-story.md#attributes) in der Referenzdokumentation zu [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **HINWEIS:** Diese Metadatenattribute ergänzen die strukturierten Daten (z. B. JSON-LD) auf der Seite, ersetzen sie aber nicht. Um sicherzustellen, dass deine Web Storys plattformübergreifend erkannt werden, solltest du all deinen AMP Seiten [strukturierte Daten](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) hinzufügen – einschließlich AMP Storys. [/tip]

Jetzt haben wir das Gerüst einer Story ohne jeglichen Inhalt. Erstellen wir nun eine Seite.
