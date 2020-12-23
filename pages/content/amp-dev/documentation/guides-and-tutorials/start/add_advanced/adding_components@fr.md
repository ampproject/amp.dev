---
"$title": Ajout de composants AMP étendus
"$order": '2'
description: 'AMP’s component system allows you to quickly build efficient and responsive features into your articles with minimal effort. The AMP HTML library has three classifications for AMP components: ...'
---

Le système de composants AMP vous permet d'intégrer rapidement des fonctionnalités efficaces et réactives dans vos articles avec un minimum d'effort. La bibliothèque HTML AMP comporte trois classifications pour les composants AMP :

- **intégré** : il s'agit de composants inclus dans la bibliothèque JavaScript AMP de base (spécifiée dans la section `<head>`), tels que [`amp-img`](../../../../documentation/components/reference/amp-img.md) et [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Ces composants peuvent être utilisés immédiatement dans un document AMP.

- **extended**: These are extensions to the base library that must be explicitly included in the document as custom elements.  Custom elements require specific scripts that are added to the `<head>` section (e.g., `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **expérimental** : ce sont des composants qui sont publiés mais qui ne sont pas encore prêts pour une large utilisation. Les développeurs peuvent choisir d'utiliser ces fonctionnalités avant qu'elles ne soient entièrement publiées. En savoir plus sur les [fonctionnalités expérimentales](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Our sample already uses a built-in component, [`amp-img`](../../../../documentation/components/reference/amp-img.md), and we explored how that component relates to the AMP layout system in the ["Convert your HTML to AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md) tutorial.  Now, let's add some commonly-used **extended** AMP components to our news article.

## Monétiser avec des annonces

Ads in AMP are constructed by using the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component. The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component allows you to configure ads in several ways, such as the width, height and layout mode. However, many ad platforms require additional configuration, such as the account ID for the ad network, which ad should be served, or options for targeting the advertising. These options are easily specified in the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component by using HTML attributes.

Jetez un œil à cet exemple d'annonce **DoubleClick** :

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Comme vous pouvez le voir, c'est une configuration très simple. Prenez note de l'attribut `type`, qui informe le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) de la plateforme publicitaire que nous voulons utiliser. Dans ce cas, nous souhaitons utiliser la plateforme [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md). Nous avons donc spécifié `doubleclick` comme valeur.

The `data-slot` attribute is more unique. In [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), any attributes that start with  `data-` are vendor-specific attributes. This means that not all vendors will necessarily require this particular attribute, nor will they necessarily react if it is supplied. For example, compare the **DoubleClick** example from above with the following test ad from the [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) platform:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Essayez d'**ajouter** les deux exemples ci-dessus dans votre article juste après la section `<header>`.

N'oubliez pas que tous les composants ne sont pas inclus dans le fichier JavaScript de la bibliothèque AMP principale. Nous devons inclure une demande JavaScript supplémentaire pour le composant publicitaire.

**Ajoutez** le script suivant à la section `<head>` :

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

**Actualisez** la page et vous devriez voir deux annonces de test :

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **IMPORTANT –** You might have some errors in your developer console, such as `Mixed Content` or `XMLHttpRequest cannot load`. The former error is likely related to the A9 advertisement because not all the content it loads is secure. This is a notable requirement for all ads served on AMP. [/tip]

The two [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)s below provide an example of the flexibility [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) provides for supporting ad platform features.  In this case we've configured (using DoubleClick's dashboard) two DoubleClick test ads to only show in certain countries--the first will show only in the UK and the second will show only in the US.  Try **adding** these two geotargeting ad configurations in the AMP document below the ads you added earlier:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Actualisez** la page et jetez un œil. La capture d'écran suivante a été prise depuis le Canada, aucune annonce n'est chargée :

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **NOTE –**  You might notice that inside these [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tags are additional `div` tags with an attribute named `fallback` on them. Can you guess what the `fallback` attribute denotes? It informs AMP’s loading system to only show the contents of that element when the parent element fails to load successfully. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **READ ON –** To see the latest supported ad networks, read the reference documentation for the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component. [/tip]

[tip type="note"] **NOTE –**  No ad network-provided JavaScript is allowed to run inside the AMP document. Instead, the AMP runtime loads an iframe from a different origin (via an iframe sandbox) as the AMP document and executes the ad network’s JS inside that iframe sandbox. [/tip]

Our AMP document now includes text, an image, and an advertisement embedded on the page, which are all key ingredients to telling a story and monetizing your content. However, modern websites often include more functionality than simply pictures and text.

Let’s take our AMP document to the next level and add more advanced web functionality that is commonly found on news articles, like:

- Des vidéos Youtube
- Des tweets
- Des citations d'articles

## Incorporer une vidéo YouTube

Essayons d'incorporer une vidéo YouTube dans le document. **Ajoutez** le code suivant juste après la section `<header>` dans votre document AMP (au-dessus des [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) que vous venez d'ajouter) :

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Actualisez** la page. Au lieu de la vidéo, vous verrez ce texte : *"La vidéo n'a pas pu être chargée."*

Même si votre navigateur peut afficher des vidéos YouTube sans problème, vous recevrez toujours cette erreur. Pourquoi ? Le chargement de la vidéo n'a pas échoué, mais le composant lui-même a échoué.

N'oubliez pas que tous les composants ne sont pas inclus dans le fichier JavaScript de la bibliothèque AMP principale. Nous devons inclure une demande JavaScript supplémentaire pour le composant YouTube.

[tip type="note"] **NOTE –**  If you still have your developer console open and `#development=1` in your URL, you'll see an AMP validator error at this point reminding you to add the [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) JavaScript and a link to documentation that will tell you the `script` tag to add. [/tip]

**Ajoutez** le script suivant à la section `<head>` :

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Actualisez** la page et vous devriez voir la vidéo YouTube :

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

As with the other elements on the page, we specified the `width` and `height` of the video so that the AMP layout system can calculate the aspect ratio. Also, we set the `layout` to `responsive`, so the video fills the width of its parent element.

Pour en savoir plus sur l'intégration de vidéos YouTube, lisez la documentation du composant [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Pour encore plus de composants vidéo et multimédia, consultez la [liste des composants AMP multimédias](../../../../documentation/components/index.html#media).

[tip type="tip"] **CONSEIL -** Utilisez l'attribut [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) pour informer les utilisateurs si un composant ne se charge pas ou si le composant n'est pas pris en charge dans leur navigateur. [/tip]

## Afficher un tweet

L'intégration de tweets préformatés de Twitter est une fonctionnalité courante dans les articles de presse. Le composant [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) peut fournir cette fonctionnalité avec facilité.

Commencez par ajouter la requête JavaScript suivante à la section `<head>` de votre document :

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Maintenant, dans votre article, **ajoutez** ce code pour intégrer le tweet :

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

L'attribut `data-tweetid` est un autre exemple d'attribut personnalisé requis par une plateforme particulière. Dans ce cas, Twitter met en corrélation la valeur de l'attribut `data-tweetid` avec un tweet particulier.

**Actualisez** votre navigateur et jetez un œil à la page. Vous devriez voir le tweet apparaître :

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Pour en savoir plus sur l'intégration de tweets Twitter, lisez la documentation du composant [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **CONSEIL -** AMP fournit encore plus de composants pour intégrer les contenus des réseaux sociaux. Découvrez les derniers [composants AMP sociaux](../../../../documentation/components/index.html#social). [/tip]

## Mettre en évidence une citation d'article

A common feature in news articles is to highlight particularly engaging snippets of text from the article. For example, a quotation from a particular source or an important fact might be repeated in a larger font to attract the reader's attention.

Cependant, tous les extraits de texte n'ont pas nécessairement la même longueur de caractères, ce qui peut rendre difficile l'équilibrage d'une taille de police plus grande avec la quantité d'espace que le texte utilise sur la page.

AMP fournit un autre composant spécialement conçu pour ce type de situation, il s'appelle [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Le composant [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) vous permet de définir un élément de largeur et de hauteur fixes et d'une taille de police maximale. Le composant redimensionne intelligemment la taille de la police pour **adapter** le texte dans la largeur et la hauteur disponibles.

Essayons. Tout d'abord, **ajoutez** la bibliothèque du composant à la section `<head>` :

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Ajoutez ce qui suit à votre page :

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Actualisez** la page et regardez le résultat !

Maintenant, expérimentez davantage. Que se passe-t-il si la citation est beaucoup plus courte ?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Ou, que faire si la citation est plus longue ?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

En guise de dernière expérience avec [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), essayez de créer un court texte, tel que "Bonjour", avec une hauteur beaucoup plus grande (par exemple, une valeur de 400) en conservant la valeur d'attribut max-font-size de 42. À quoi ressemblerait la page résultante ? Le texte est-il centré verticalement ? Ou bien, la hauteur de la balise [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) diminue-t-elle pour s'adapter à la taille de police maximale ? Avec ce que vous savez déjà sur le système de mise en page d'AMP, essayez de répondre à la question avant de jouer avec le code !

You can learn more about [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) from [AMP by Example's live demo](../../../../documentation/examples/documentation/amp-fit-text.html).
