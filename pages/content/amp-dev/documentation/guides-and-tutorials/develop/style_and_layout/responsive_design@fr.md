---
"$title": Comment créer des pages AMP interactives
"$order": '5'
description: "La conception Web interactive consiste à créer des pages Web fluides qui répondent aux besoins de vos utilisateurs, des pages adaptées à la taille et à l'orientation de l'écran de leur appareil. Vous pouvez y parvenir ..."
formats:
- websites
- email
- ads
- stories
components:
- iframe
- youtube
author: bpaduch
contributors:
- pbakaus
---

## Introduction

La conception Web interactive consiste à créer des pages Web fluides qui répondent aux besoins de vos utilisateurs, des pages adaptées à la taille et à l'orientation de l'écran de leur appareil. Vous pouvez y parvenir facilement dans AMP. AMP prend en charge toutes les catégories d'écran et d'appareils et fournit des composants interactifs intégrés.

Dans ce guide, nous allons vous montrer comment vous pouvez facilement implémenter ces fondamentaux d'interactivité dans AMP:

- [Contrôle de la fenêtre](#controlling-the-viewport)
- [Création d'une mise en page interactive](#creating-a-responsive-layout)
- [Mise à l'échelle des médias](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Learn about responsive design in AMP from this video.']

## Contrôle de la fenêtre <a name="controlling-the-viewport"></a>

[filter formats="websites, ads, stories"] Pour optimiser votre page Web afin que le contenu s'adapte à la fenêtre du navigateur pour n'importe quel appareil, vous devez spécifier un élément de fenêtre `meta`. L'élément de fenêtre indique au navigateur comment mettre à l'échelle et dimensionner la zone visible (la fenêtre) de la page Web.

Mais quelles valeurs devez-vous utiliser? Eh bien, dans AMP, tout est déjà fait pour vous. Dans le cadre du [balisage requis](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) pour les pages AMP, vous devez spécifier la fenêtre suivante:

```html
<meta name="viewport" content="width=device-width" />
```

Ce sont là les paramètres de fenêtre typiques que vous utiliseriez pour un site interactif. Bien que `initial-scale=1` ne soit pas requis pour une page AMP valide, il est recommandé, car il définit le niveau de zoom sur 1 lorsque la page est chargée pour la première fois. [/filter]

[filter formats="email"] Cette section s'applique uniquement aux sites Internet, annonces et stories AMP. [/filter]

## Création d'une mise en page interactive <a name="creating-a-responsive-layout"></a>

Dans le cadre de la conception interactive, vous pouvez utiliser des requêtes CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) afin de personnaliser le style de votre page Web pour différentes dimensions d'écran sans avoir à modifier le contenu de la page. Dans AMP, vous pouvez continuer à utiliser ces mêmes requêtes CSS `@media`. De plus, pour avoir plus de contrôle sur un élément AMP, vous pouvez spécifier l'attribut `media` sur l'élément. Cela est particulièrement utile lorsque vous devez afficher ou masquer un élément sur la base d'une requête multimédia. Consultez la section [Modification de la conception d'une image](#changing-the-art-direction-of-an-image) pour un exemple qui utilise l'attribut `media`.

Le redimensionnement de chaque élément en vue de s'adapter à un écran peut être délicat<sup><a href="#fn1" id="ref1">*</a></sup>. Cependant, dans AMP, vous pouvez facilement rendre un élément interactif en spécifiant simplement l'attribut `"layout=responsive"` ainsi que les attributs `width` et `height` de l'élément. Lorsque vous appliquez l'attribut `responsive` à un élément, celui-ci se redimensionne automatiquement à la largeur de son élément conteneur, et la hauteur change en fonction des proportions spécifiées par les attributs `width` et `height` de l'élément. Presque tous les éléments AMP prennent en charge la mis een page `responsive`; consultez la documentation de référence de l'élément pour voir les mises en page prises en compte.

Même si vous pouvez facilement rendre les éléments interactifs avec `"layout=responsive"`, vous devez tout de même tenir compte de la façon dont vos éléments apparaissent sur toutes les tailles d'écran, y compris les ordinateurs de bureau et les tablettes. Une erreur courante consiste à permettre à une image de s'afficher en plein écran, ce qui étire l'image au-delà de sa taille prévue et entraîne une mauvaise expérience pour les utilisateurs d'écran large. Par défaut, les éléments avec `layout=responsive` occuperont toute la largeur du conteneur de l'élément, qui est souvent illimité en largeur (width=100%). Vous pouvez améliorer l'apparence des images en limitant simplement la largeur du conteneur de l'image. Par exemple, en définissant une règle "max-width" dans l'élément "body" ou "main", vous pouvez limiter toutes les images à une largeur maximale spécifique.

##### Exemple: restriction de la largeur des images interactives

Dans l'exemple suivant, nous avons une image de fleurs (640 x 427 px) que nous souhaitons afficher sur toutes les tailles d'écran. Nous avons donc spécifié les attributs `width` et `height`, et défini la mise en page sur `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

Cependant, nous ne voulons pas que l'image s'étire au-delà de sa taille prévue, nous définissons donc l'attribut `max-width` du conteneur à 700 px via le CSS personnalisé:

```html
<style amp-custom>
.resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **LIRE –** Pour plus de détails sur les différentes mises en page dans AMP, consultez le guide [Mise en page et requêtes multimédias](control_layout.md#the-layout-attribute). [/tip]

<a id="fn1"></a> [tip type="note"] **Pourquoi est-il délicat de faire en sorte que les éléments soient redimensionnés pour s'adapter à l'écran alors que je peux facilement le faire avec le style `width=100%`?**

La partie délicate consiste à afficher des éléments interactifs sur la page sans affecter les mesures de performance ou l'expérience utilisateur. Certes, vous pouvez facilement obtenir des images adaptées à l'écran avec "width=100%", mais tout est question de performances. Le navigateur doit d'abord télécharger l'image pour obtenir les dimensions de l'image, puis redimensionner l'image en fonction de la taille de l'écran, et enfin redisposer et repeindre la page. Dans AMP, le chemin d'affichage est optimisé pour que la page soit d'abord mise en page, en mettant de côté les caractères de remplacement des images en fonction des dimensions fournies dans [`amp-img`](../../../../documentation/components/reference/amp-img.md) (en utilisant ces nombres pour établir les proportions), puis les ressources sont téléchargées, et la page est peinte. Aucune redisposition n'est requise. [/tip]

## Mise à l'échelle des éléments multimédias pour la page <a name="scaling-media-for-the-page"></a>

L'aspect le plus difficile de la conception interactive est probablement d'afficher correctement les éléments multimédias sur la page afin qu'ils répondent aux caractéristiques de l'écran. Dans cette section, nous verrons comment vous pouvez intégrer des vidéos et des images interactives sur des pages AMP.

### Comment intégrer des vidéos

Lorsque vous incluez une vidéo dans votre page Web, vous voulez vous assurer que l'utilisateur peut voir le contenu de la vidéo et les commandes de la vidéo (sans débordement). En règle générale, vous y parviendrez en combinant des requêtes multimédias CSS, un conteneur et d'autres CSS. Dans AMP, il vous suffit d'ajouter l'élément vidéo à votre page et de spécifier `layout=responsive` sur l'élément; pas de CSS supplémentaire.

##### Exemple: intégration d'une vidéo YouTube

Dans l'exemple suivant, nous souhaitons afficher une vidéo YouTube intégrée qui répond à la taille et à l'orientation de l'écran de l'appareil. En ajoutant `"layout=responsive"` à l'élément [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), la vidéo se redimensionne pour s'adapter à la fenêtre, et ses proportions sont maintenues selon les attributs `width` et `height` spécifiés.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Il existe de nombreux types de vidéos que vous pouvez ajouter à vos pages AMP. Pour plus de détails, consultez la liste des [composants multimédias](../../../../documentation/components/index.html#media) disponibles.

### Comment afficher des images interactives <a name="displaying-responsive-images"></a>

Les images constituent une grande partie d'une page Web (environ [65% des octets de la page](http://httparchive.org/interesting.php#bytesperpage)). Au minimum, vos images doivent être visibles sur différentes tailles et orientations d'écran (c'est-à-dire que l'utilisateur n'a pas à faire défiler, pincer/zoomer pour voir l'image entière). Cela se fait facilement dans AMP via l'attribut `"layout=responsive"` (voir [Comment inclure des images dans AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md) ). En plus de l'image interactive de base, vous souhaiterez peut-être diffuser plusieurs ressources image dans le but de:

- [Diffuser des images nettes pour la bonne résolution](#serving-crisp-images-for-the-right-resolution)
- [Changer la conception artistique d'une image](#changing-the-art-direction-of-an-image)
- [Comment fournir des images optimisées](#providing-optimized-images)

#### Diffuser des images nettes pour la bonne résolution <a name="serving-crisp-images-for-the-right-resolution"></a>

Pour les écrans haute résolution (par exemple, écran Retina), vous devez fournir des images qui claires et nettes; cependant, vous ne souhaitez pas utiliser cette même image sur des appareils basse résolution, car cela entraînera un temps de chargement supplémentaire inutile. Dans les pages non AMP et AMP, vous pouvez diffuser l'image correcte pour la densité de pixels de l'écran en utilisant `srcset` avec le descripteur de largeur (`w`).

[tip type="note"] **REMARQUE –**  le sélecteur srcset basé sur le DPR (`x`) fonctionne également; toutefois, pour plus de souplesse, nous recommandons d'utiliser le sélecteur `w`. Auparavant (dans l'ancienne proposition srcset), le descripteur `w` décrivait la largeur de la fenêtre, mais aujourd'hui il décrit la largeur du fichier source de l'image, ce qui permet à l'agent utilisateur de calculer la densité de pixels effective de chaque image et de choisir la bonne image à afficher. [/tip]

##### Exemple: affichage d'une image nette qui s'adapte à l'écran

Dans l'exemple suivant, nous avons plusieurs fichiers image avec les mêmes proportions mais de résolutions différentes. En fournissant différentes résolutions d'image, le navigateur peut choisir l'image qui convient le mieux à la résolution de l'appareil. De plus, nous avons spécifié la taille d'affichage de l'image comme suit:

- Pour une largeur de fenêtre allant jusqu'à 400 px, afficher l'image à 100% de la largeur de la fenêtre.
- Pour une largeur de fenêtre allant jusqu'à 900 px, afficher l'image à 75% de la largeur de la fenêtre.
- Au-delà de 900 px, afficher l'image à une largeur de 600 px.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

Par exemple, disons que nous avons un appareil qui a une largeur de fenêtre de 412 px et un DPR de 2,6. Sur la base du code ci-dessus, l'image doit être affichée à 75% de la largeur de la fenêtre, de sorte que le navigateur choisit une image proche de 803 px (412 _ 7,5 _ 2,6), qui se trouve être `apple-800.jpg`.

[tip type="read-on"] **LIRE –** Pour plus de détails sur l'utilisation des attributs srcset et sizes dans AMP, consultez le guide [Conception avec les attributs srcset, sizes et heights](art_direction.md). [/tip]

#### Changer la conception artistique d'une image <a name="changing-the-art-direction-of-an-image"></a>

La conception artistique fait référence à l'adaptation des caractéristiques visuelles d'une image à certains points d'arrêt. Par exemple, au lieu de simplement redimensionner une image à mesure que l'écran se rétrécit, vous souhaiterez peut-être diffuser une version recadrée de l'image qui rétrécit la mise au point de l'image ou alors diffuser des images complètement différentes aux différents points d'arrêt. En HTML, vous pouvez accomplir cela en utilisant l'élément `picture`. Dans AMP, la conception artistique peut être obtenue en utilisant l'attribut `media`.

##### Exemple: images de tailles différentes pour différents points d'arrêt

Dans l'exemple suivant, nous avons 3 images recadrées différentes d'un chat que nous souhaitons afficher à différents points d'arrêt. Donc, si la largeur de la fenêtre fait:

- 670 px ou plus, afficher `cat-large.jpg` (650 x 340 px)
- 470 - 669 px, afficher `cat-medium.jpg` (450 x 340 px)
- 469 px ou moins, afficher `cat-small.jpg` (226 x 340 px)

[tip type="note"] **REMARQUE –**  Comme nous voulions que les images soient de taille fixe (sans inclinaison), nous n'avons pas spécifié de valeur de mise en page, qui sera fixée par défaut à `layout=fixed` car nous avons défini la largeur et la hauteur. Pour plus d'informations, voir [« Que faire si l'attribut layout n'est pas spécifié ? »](control_layout.md#what-if-the-layout-attribute-isnt-specified). [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **LIRE –** pour plus de détails sur la conception artistique dans AMP, consultez le guide [Conception avec les attributs srcset, sizes et heights](art_direction.md). [/tip]

#### Comment fournir des images optimisées <a name="providing-optimized-images"></a>

La création de pages à chargement rapide nécessite des images optimisées en termes de taille, de qualité et de format. Réduisez toujours la taille des fichiers au niveau de qualité acceptable le plus bas. VOus pouvez utiliser différents outils pour optimiser les images (par exemple, [ImageAlph](http://pngmini.com/lossypng.html) ou [TinyPNG](https://tinypng.com/) ). En termes de formats d'image, certains formats d'image offrent de meilleures capacités de compression que d'autres (par exemple, WebP et JPEG XR vs JPEG). Vous voudrez fournir l'image la plus optimisée pour votre utilisateur, tout en vous assurant que l'image est prise en charge par le navigateur de l'utilisateur (c'est-à-dire que [tous les navigateurs ne prennent pas en charge tous les formats d'image](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

En HTML, vous pouvez diffuser différents formats d'image en utilisant la balise `picture`. Dans AMP, bien que la balise `picture` ne soit pas prise en charge, vous pouvez diffuser différentes images à l'aide de l'attribut `fallback`.

[tip type="read-on"] **LIRE –** Pour plus de détails sur les solutions de secours, consultez le guide [Caractères de remplacement et solutions de secours](placeholders.md). [/tip]

Dans AMP, il existe deux façons de diffuser des images optimisées:

- Les développeurs qui utilisent des formats d'image qui ne sont pas largement pris en charge, comme WebP, peuvent configurer leur serveur pour traiter les en-têtes `Accept` du navigateur et répondre avec des octets d'image et [l'en-tête `Content-Type`](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/) approprié. Cela évite au navigateur de télécharger des types d'images qu'il ne prend pas en charge. Pour en savoir plus sur la  [négociation de contenu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).[sourcecode:html] Accept: image/webp,image/apng,image/<em>,</em>/*;q=0.8 [/sourcecode]
- En fournissant des images de secours imbriquées, comme dans l'exemple ci-dessous.

##### Exemple: comment diffuser différents formats d'image

Dans l'exemple suivant, si le navigateur prend en charge WebP, diffuser montagnes.webp, sinon diffuser montagnes.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

En prime, certains caches, comme Google AMP Cache, compressent et convertissent automatiquement les images au format WebP et aux bonnes résolutions si vous ne le faites pas. Cependant, toutes les plateformes n'utilisent pas de caches, vous devez donc toujours optimiser les images manuellement de votre côté.

[tip type="read-on"] **LIRE –** Pour en savoir plus sur les optimisations d'images que Google AMP Cache applique, consultez le billet de blog [« Google AMP Cache, AMP Lite et le besoin de vitesse »](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Quelques exemples pour vous inspirer

Voici quelques exemples qui, nous l'espérons, vous inspireront pour créer des pages AMP interactives:

#### Production

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Conçu par AMP

- [Exemples](../../../../documentation/examples/index.html)
- [Modèles](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
