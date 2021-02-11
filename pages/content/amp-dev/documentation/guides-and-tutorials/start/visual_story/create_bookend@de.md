---
'$title': Ein Bookend erstellen
$order: 7
description: 'Da du nun alle Seiten hinzugefügt hast, können wir uns die letzte Seite der Story ansehen: das Bookend. Diese letzte Seite schließt die Story ab …'
author: bpaduch
---

Da du nun alle Seiten hinzugefügt hast, können wir uns die letzte Seite der Story ansehen: das Bookend. Diese letzte Seite schließt die Story ab. Hier kannst du Social Share Buttons und sonstige relevante Links bereitstellen, damit die Benutzer deine Story teilen und tiefer in andere Inhalte auf deiner Website eintauchen.

Die Informationen auf der Bookend Seite stammen aus einer JSON Datei, die im Tag `<amp-story-bookend>` angegeben wird. Für unser Tutorial haben wir bereits eine JSON Datei ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) angelegt, welche die Bookend Daten enthält.

Das Tag `<amp-story-bookend>` muss das letzte Tag in [`<amp-story>`](../../../../documentation/components/reference/amp-story.md) sein. **Fügen** wir also `<amp-story-bookend></amp-story-bookend>` kurz vor dem abschließenden Tag [`</amp-story>`](../../../../documentation/components/reference/amp-story.md) hinzu. Im Tag `amp-story-bookend` muss das Attribut `src` auf die Datei `bookend.json` verweisen. Außerdem benötigst du das Attribut `layout="nodisplay"`:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Wenn du den Inhalt in deinem Browser aktualisierst und zur letzten Story Seite wechselst, wird das folgende Bookend angezeigt:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Sehen wir uns die JSON Datei an. Öffne die Datei [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) in deinem Texteditor.

Jede Seite des Bookends benötigt die Angabe von `bookendVersion`. In diesem Tutorial ist das `v1.0`:

```json
"bookendVersion": "v1.0",
```

Mithilfe der Social Share Buttons können Leser deine Inhalte auf sozialen Plattformen wie Twitter, Facebook, Pinterest usw. teilen. Gib die Social Share Anbieter im Objekt "shareProviders" an und erstelle ein Array mit [Typnamen](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) für jede der sozialen Plattformen.

Für dieses Tutorial haben wir Facebook, Twitter und E-Mail als Anbieter von Social Share Buttons ausgewählt:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

Der Rest der Bookend Seite ist relevanten Links vorbehalten. Alle relevanten Inhalte befinden sich im Objekt `components`.

Es gibt verschiedene Komponenten, mit denen du relevante Inhalte und Links anzeigen kannst. Jede Komponente enthält das Attribut "type". Sehen wir uns die verfügbaren Komponenten an:

<table>
<thead><tr>
  <th width="20%">Art</th>
  <th>Beschreibung</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Ermöglicht die Angabe von Links zu relevanten Artikeln samt einem kleinen zugehörigen Bild.   <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>Ermöglicht die Angabe von Links zu relevanten Artikeln samt einem kleinen zugehörigen Bild.   <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>Ermöglicht die Angabe von Links zu Artikeln oder anderen Inhalten wie Videos. Das dazugehörige Bild ist größer und im Querformat.   <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>Ermöglicht die Angabe von Links zu Storys und anderen Inhalten. Das dazugehörige Bild ist größer und im Hochformat.    <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>Ermöglicht die Angabe von Links mit einem "Call to Action", die als Buttons angezeigt werden (z. B. "Mehr dazu", "Abonnieren").   <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

Damit sind die Informationen zur Bookend Komponente noch nicht erschöpft. Weitere Informationen findest du in der Referenzdokumentation zu [`amp-story`](../../../../documentation/components/reference/amp-story.md).

Unsere Story ist fast fertig. Bevor wir unseren Content veröffentlichen können, müssen wir überprüfen, ob unser AMP HTML gültig ist.
