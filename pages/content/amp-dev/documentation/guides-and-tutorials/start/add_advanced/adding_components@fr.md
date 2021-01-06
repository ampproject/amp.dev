---
"$title": Ajout de composants AMP étendus
"$order": '2'
description: 'Le système de composants AMP vous permet d''intégrer rapidement des fonctionnalités efficaces et réactives dans vos articles avec un minimum d''effort. La bibliothèque HTML AMP a trois classifications pour les composants AMP : ...'
---

Le système de composants AMP vous permet d'intégrer rapidement des fonctionnalités efficaces et réactives dans vos articles avec un minimum d'effort. La bibliothèque HTML AMP comporte trois classifications pour les composants AMP :

- **intégré** : il s'agit de composants inclus dans la bibliothèque JavaScript AMP de base (spécifiée dans la section `<head>`), tels que [`amp-img`](../../../../documentation/components/reference/amp-img.md) et [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Ces composants peuvent être utilisés immédiatement dans un document AMP.

- **étendu** : il s'agit d'extensions de la bibliothèque de base qui doivent être explicitement incluses dans le document en tant qu'éléments personnalisés. Les éléments personnalisés nécessitent des scripts spécifiques qui sont ajoutés à la section `<head>` (p.ex., `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **expérimental** : ce sont des composants qui sont publiés mais qui ne sont pas encore prêts pour une large utilisation. Les développeurs peuvent choisir d'utiliser ces fonctionnalités avant qu'elles ne soient entièrement publiées. En savoir plus sur les [fonctionnalités expérimentales](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Notre exemple utilise déjà un composant intégré, [`amp-img`](../../../../documentation/components/reference/amp-img.md), et nous avons exploré comment ce composant est lié au système de mise en page AMP dans le tutoriel ["Convertir votre HTML en AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md). Maintenant, ajoutons quelques composants AMP **étendus** couramment utilisés à notre article de presse.

## Monétiser avec des annonces

Les annonces dans AMP sont créées à l'aide du composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) vous permet de configurer les annonces de plusieurs manières, telles que la largeur, la hauteur et le mode de mise en page. Cependant, de nombreuses plateformes publicitaires nécessitent une configuration supplémentaire, telle que l'ID de compte du réseau publicitaire, l'annonce à diffuser ou les options de ciblage de la publicité. Ces options sont facilement spécifiées dans le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) à l'aide d'attributs HTML.

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

L'attribut `data-slot` est plus spécifique. Dans [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), tous les attributs qui commencent par `data-` sont des attributs spécifiques au fournisseur. Cela signifie que tous les fournisseurs n'auront pas nécessairement besoin de cet attribut particulier, et ne réagiront nécessairement pas s'il est fourni. Par exemple, comparez l'exemple **DoubleClick** ci-dessus avec l'annonce test suivante de la plateforme [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) :

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

[tip type="important"] **IMPORTANT -** Il se peut que vous rencontriez des erreurs dans votre console de développement, telles que `Mixed Content` ou `XMLHttpRequest cannot load`. La première erreur est probablement liée à l'annonce A9 car tout le contenu qu'elle charge n'est pas sécurisé. Il s'agit d'une exigence notable pour toutes les annonces diffusées sur AMP. [/tip]

Les deux [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) ci-dessous fournissent un exemple de la flexibilité qu'offre [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) dans la prise en charge des fonctionnalités de la plateforme publicitaire. Dans ce cas, nous avons configuré (à l'aide du tableau de bord de DoubleClick) deux annonces de test DoubleClick pour qu'elles ne soient diffusées que dans certains pays, la première ne s'affichera qu'au Royaume-Uni et la seconde uniquement aux États-Unis. Essayez **d'ajouter** ces deux configurations de ciblage géographique d'annonces dans le document AMP sous les annonces que vous avez ajoutées précédemment :

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

[tip type="note"] **REMARQUE -** Vous remarquerez peut-être qu'à l'intérieur de ces balises [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) se trouvent des balises `div` supplémentaires avec un attribut nommé `fallback`. Pouvez-vous deviner ce que signifie l'attribut de `fallback` ? Il informe le système de chargement d'AMP d'afficher uniquement le contenu de cet élément lorsque l'élément parent ne parvient pas à se charger. En savoir plus sur les [caractères de remplacement et les solutions de secours](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **LIRE -** Pour voir les derniers réseaux publicitaires pris en charge, lisez la documentation de référence du composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **REMARQUE -** Aucun JavaScript fourni par le réseau publicitaire n'est autorisé à s'exécuter à l'intérieur du document AMP. Au lieu de cela, le moteur d'exécution AMP charge un iframe d'une origine différente (via un bac à sable d'iframe) en tant que document AMP et exécute le JS du réseau publicitaire dans le bac à sable de cette iframe. [/tip]

Notre document AMP comprend désormais du texte, une image et une annonce intégrée à la page, qui sont tous des ingrédients clés pour raconter une histoire et monétiser votre contenu. Cependant, les sites Web modernes incluent souvent plus de fonctionnalités que de simples images et du texte.

Faisons passer notre document AMP au niveau supérieur et ajoutons des fonctionnalités Web plus avancées que celles que l'on trouve couramment dans les articles de presse, comme :

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

[tip type="note"] **REMARQUE -** Si votre console de développement est toujours ouverte et `#development=1` se trouve dans votre URL, vous verrez une erreur de validation AMP à ce stade vous rappelant d'ajouter le JavaScript [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) et un lien à la documentation qui vous indiquera la balise de `script` à ajouter. [/tip]

**Ajoutez** le script suivant à la section `<head>` :

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Actualisez** la page et vous devriez voir la vidéo YouTube :

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Comme pour les autres éléments de la page, nous avons spécifié la largeur `width` et la hauteur `height` de la vidéo afin que le système de mise en page AMP puisse calculer les proportions. En outre, nous définissons la mise en page `layout` sur `responsive`, de sorte que la vidéo remplisse la largeur de son élément parent.

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

Une caractéristique commune dans les articles de presse est de mettre en évidence des extraits de texte particulièrement intéressants de l'article. Par exemple, une citation d'une source particulière ou un fait important peut être répété dans une police plus grande pour attirer l'attention du lecteur.

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

Vous pouvez en apprendre davantage au sujet de [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) depuis la [démonstration en direct d'AMP](../../../../documentation/examples/documentation/amp-fit-text.html).
