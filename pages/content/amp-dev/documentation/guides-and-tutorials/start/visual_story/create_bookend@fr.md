---
"$title": Création du serre-livre
"$order": '7'
description: Maintenant que vous avez ajouté toutes vos pages, regardons le dernier écran de la story, le serre-livre. Ce dernier écran résume la story ...
author: bpaduch
---

Maintenant que vous avez ajouté toutes vos pages, regardons le dernier écran de l'histoire, le "serre-livre". Ce dernier écran résume la story et vous permet de le partager sur les réseaux sociaux et d'ajouter des liens connexes vers votre story, afin que les utilisateurs puissent partager votre story ou découvrir davantage de contenus sur votre site.

The information on the bookend screen comes from a JSON file that's specified in the `<amp-story-bookend>` tag. For our tutorial, we already have a JSON file ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) that contains the bookend data.

La balise `<amp-story-bookend>` doit être la dernière balise dans [`<amp-story>`](../../../../documentation/components/reference/amp-story.md). Donc, **ajoutons** `<amp-story-bookend></amp-story-bookend>` juste avant la balise de fin [`</amp-story>`](../../../../documentation/components/reference/amp-story.md).  Dans la balise `amp-story-bookend`, pointez l'attribut `src` vers le fichier `bookend.json` et configurez `layout="nodisplay"` :

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

If you refresh your browser and go to the last screen, you'll see the following bookend:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Let's look at the JSON file.  Open the [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) file in your text editor.

Every bookend screen requires a `bookendVersion`, which is `v1.0` for this tutorial:

```json
"bookendVersion": "v1.0",
```

Social share buttons allow readers to share your content through social platforms, like Twitter, Facebook, Pinterest, and so on. You specify social share providers in a shareProviders object, and create an array containing [type names](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) for each of the social platforms.

For this tutorial, we chose Facebook, Twitter, and email for our share providers:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

The rest of the bookend screen is for related content.  All related content is contained in a `components` object.

There are various components that you can use to display related content and links; each component is specified with a type attribute. Let's look at the available components:

<table>
<thead><tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Vous permet de spécifier un en-tête pour regrouper des articles.   <pre class="nopreline">
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
    <td>Vous permet de créer un lien vers des articles connexes avec la possibilité d'inclure une petite image associée.   <pre class="nopreline">
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
    <td>Vous permet de créer un lien vers des articles ou d'autres contenus, tels que des vidéos. L'image associée à ce type est plus grande et au format paysage.   <pre class="nopreline">
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
    <td>Vous permet de créer des liens vers des stories ou d'autres contenus. L'image associée à ce type est plus grande et au format portrait.   <pre class="nopreline">
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
    <td>Vous permet de spécifier des liens d'appels à l'action qui s'affichent sous forme de boutons (par exemple, en savoir plus, S'abonner).   <pre class="nopreline">
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
