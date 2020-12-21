---
"$title": Creating the bookend
"$order": '7'
description: "Now that you've added all of your pages, let's look at the last screen of the story, the bookend. This last screen wraps up the story ..."
author: bpaduch
---

Da du nun alle Seiten hinzugefügt hast, können wir uns die letzte Seite der Story ansehen: das Bookend. Diese letzte Seite schließt die Story ab. Hier kannst du Social Share Buttons und sonstige relevante Links bereitstellen, damit die Benutzer deine Story teilen und tiefer in andere Inhalte auf deiner Website eintauchen.

The information on the bookend screen comes from a JSON file that's specified in the `<amp-story-bookend>` tag. For our tutorial, we already have a JSON file ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) that contains the bookend data.

Das Tag `<amp-story-bookend>` muss das letzte Tag in [`<amp-story>`](../../../../documentation/components/reference/amp-story.md) sein. **Fügen** wir also `<amp-story-bookend></amp-story-bookend>` kurz vor dem abschließenden Tag [`</amp-story>`](../../../../documentation/components/reference/amp-story.md) hinzu. Im Tag `amp-story-bookend` muss das Attribut `src` auf die Datei `bookend.json` verweisen. Außerdem benötigst du das Attribut `layout="nodisplay"`:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Wenn du den Inhalt in deinem Browser aktualisierst und zur letzten Story Seite wechselst, wird das folgende Bookend angezeigt:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Let's look at the JSON file.  Open the [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) file in your text editor.

Every bookend screen requires a `bookendVersion`, which is `v1.0` for this tutorial:

```json
"bookendVersion": "v1.0",
```

Social share buttons allow readers to share your content through social platforms, like Twitter, Facebook, Pinterest, and so on. You specify social share providers in a shareProviders object, and create an array containing [type names](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) for each of the social platforms.

Für dieses Tutorial haben wir Facebook, Twitter und E-Mail als Anbieter von Social Share Buttons ausgewählt:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

The rest of the bookend screen is for related content.  All related content is contained in a `components` object.

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

There's more to learn about the bookend component. For details, see the [`amp-story`](../../../../documentation/components/reference/amp-story.md) reference documentation.

Our story is nearly complete.  Before we can publish our content, let's check that our AMP HTML is valid.
