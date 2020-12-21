---
"$title": Bette Storys in Webseiten ein
"$order": '3'
description: 'Mit dem '
formats:
- websites
- stories
---

Storys sind eine beeindruckende Vollbild-Erfahrung. Sie werden im offenen Web mit ihrer eigenen URL gehostet und lassen sich deshalb problemlos freigeben. Aber was ist, wenn du Storys in deine eigene Website integrieren möchtest, z. B. in einen Blog, eine Produktbeschreibung oder einen Nachrichtenartikel?

Mit dem AMP Story Player kannst du Storys, durch die sich Benutzer tippen oder klicken können, in eine Webseite einbetten. Befolge diese Schritt-für-Schritt Anleitung, um mehr zu erfahren.

# Storys auf einer nicht-AMP Seite anzeigen

Du kannst AMP Storys in eine nicht-AMP Seite einbetten, damit Benutzer sich durch die Erfahrung tippen oder klicken können, ohne das ursprüngliche Dokument zu verlassen!

[example preview="top-frame" playground="false"]
```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```
[/example]

## AMP Story Player einbetten

Um eine AMP Story auf einer nicht-AMP Seite anzuzeigen, muss das Element [`amp-story-player`](https://github.com/ampproject/amphtml/blob/master/spec/amp-story-player.md) verwendet werden.

### Skripte importieren

Binde die beiden erforderlichen Skripte im Header deines Dokuments ein:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css">
```

Das erste Skript importiert die Logik für den Player und das zweite legt das standardmäßige Styling fest.

### Eine Story angeben

Füge das Element `<amp-story-player>` in den `body` des Dokuments ein. Gib dann die gewünschte Story an. Füge dazu das Tag `<a>` im Element `<amp-story-player>` ein. Verweise durch `href` auf den Ort der Story. Das `href` kann auf die URL einer gehosteten Story verweisen oder auf einen relativen Pfad. Platziere den Titel der Story innerhalb der `<a>` Tags.

```html
 <amp-story-player style="width: 360px; height: 600px;">
    <a
      href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/">
      Stories in AMP - Hello World
    </a>
  </amp-story-player>
```

### Player dimensionieren

`width`, `height` und andere Styles des Story Players kannst du inline definieren oder wie bei jedem anderen Element.

```html
<body>
...
  <amp-story-player style="width: 360px; height: 600px;">
...
  </amp-story-player>
...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Responsive Dimensionierung

Die Responsivität des Story Players funktioniert wie bei jedem anderen Blockelement. Verwende CSS, um die Breiten- und Höhenverhältnisse beizubehalten, wie das folgende Beispiel zeigt:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  ...
</amp-story-player>
```

### Einen Platzhalter angeben

Füge ein repräsentatives Poster Image hinzu, indem du das Tag `<img>` als untergeordnetes Element im Tag `<a>` der Story mit der nachstehenden Konfiguration verwendest. Der AMP Story Player zeigt dieses Bild an, während die gesamte Story geladen wird.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes this story.
  </a>
</amp-story-player>
```

Für eine optimale Benutzererfahrung sollte unbedingt ein Poster Image beigefügt werden. Wenn du kein Poster Image hinzufügst, zeigt der Story Player einen Wartekreisel mit grauem Hintergrund an.

## Mehrere Storys einbetten

Du kannst mehrere Storys im selben `<amp-story-player>` Element hinzufügen, indem du mehrere `<a>` Tags definierst. Der Player zeigt das Cover der zweiten Story an, nachdem der Benutzer die erste Story angesehen hat.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img src="https://www.example.com/assets/cover2.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 2.
  </a>
</amp-story-player>
```

Du kannst beliebig viele Instanzen von `<amp-story-player>` einbetten. Sie werden als individuelle Viewer angezeigt.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img src="https://www.example.com/assets/cover2.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Storys in einer AMP Seite anzeigen

Lies die Dokumentation zur [AMP Version von amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories), wenn du die Komponente `<amp-story-player>` auf AMP Seiten verwenden möchtest.
