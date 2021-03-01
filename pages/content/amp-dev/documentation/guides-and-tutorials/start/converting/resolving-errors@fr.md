---
'$title': Résoudre les erreurs de validation
$order: 2
description: Dans cette section, nous allons parcourir et résoudre les erreurs de validation AMP de notre page AMP. Notez que les erreurs peuvent apparaître dans un ordre différent dans votre console.
---

Dans cette section, nous allons parcourir et résoudre les erreurs de validation AMP de notre page AMP. Notez que les erreurs peuvent apparaître dans un ordre différent dans votre console.

## Inclure le jeu de caractères

Nous allons commencer par corriger l'erreur suivante:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Pour afficher correctement le texte, AMP nécessite que vous spécifiiez le jeu de caractères de la page. Les informations du jeu de caractères meta doivent également être le premier enfant de la balise `<head>`. Cette balise doit être la première afin d'éviter de réinterpréter le contenu qui a été ajouté avant la balise du jeu de caractères meta.

**Ajoutez** le code suivant comme première ligne de la balise `<head>`:

```html
<meta charset="utf-8" />
```

**Enregistrez** le fichier et rechargez la page. Vérifiez que l'erreur de jeu de caractères n'apparaît plus.

## Inclure le lien canonique

Maintenant, regardons traitons suivante:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Chaque document AMP doit avoir un lien qui fait référence à sa version « canonique ». Nous irons en détail sur les pages canoniques et sur les différentes approches des liens canoniques dans l'étape [Rendre votre page visible](discoverable.md) de ce tutoriel.

Pour ce tutoriel, nous considérerons l'article HTML original que nous convertissons comme la page canonique.

**Ajoutez** le code suivant sous la balise `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Vous pouvez créer une page AMP canonique autonome. Le lien canonique est toujours nécessaire, mais doit pointer vers l'article AMP lui-même:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Maintenant, **rechargez** la page. Bien qu'il reste encore beaucoup d'erreurs à corriger, l'erreur de lien canonique a disparu.

## Spécifier l'attribut AMP

AMP nécessite un attribut sur l'élément racine `<html>` d'une page pour déclarer la page en tant que document AMP.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Les erreurs ci-dessus peuvent être résolues en ajoutant simplement l'attribut `⚡ `à la balise `<html>` comme ceci:

```html
<html ⚡ lang="en"></html>
```

Maintenant, rechargez la page et vérifiez que les deux erreurs ont disparu.

[tip type="note"] Bien que la spécification de l'attribut `⚡` soit l'approche recommandée, il est également possible d'utiliser l'attribut `amp` à la place de l'attribut `⚡`, comme ceci:

```html
<html amp lang="en"></html>
```

[/tip]

## Spécifier une fenêtre

Ensuite, traitons l'erreur suivante:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

AMP nécessite de définir les valeurs `width` et `minimum-scale` pour la fenêtre. Ces valeurs doivent être définies respectivement en tant que `device-width` et `1`. La fenêtre est une balise standard incluse dans la section `<head>` d'une page HTML.

Pour résoudre l'erreur de fenêtre, ajoutez l'extrait de code HTML suivant à la balise `<head>`:

```html
<meta name="viewport" content="width=device-width" />
```

Les valeurs spécifiées pour `width` et `minimum-scale` sont les valeurs requises dans AMP. La définition de `initial-scale` n'est pas obligatoire, mais elle est couramment incluse dans le développement Web mobile et elle est recommandée. Pour plus de détails sur la conception de la fenêtre et la conception interactive, consultez la section [Configurer la fenêtre](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Comme précédemment, **rechargez** la page et vérifiez si l'erreur a disparu.

## Remplacer les feuilles de style externes

L'erreur suivante est liée à notre utilisation des feuilles de style:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

Plus précisément, cette erreur concerne la balise de lien de feuille de style suivante dans notre balise `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Le problème est qu'il s'agit d'une référence de feuille de style externe. Dans AMP, pour réduire au maximum les temps de chargement des documents, vous ne pouvez pas inclure de feuilles de style externes. Au lieu de cela, toutes les règles de feuille de style doivent être intégrées dans le document AMP à l'aide de balises `<style amp-custom></style>` ou en tant que styles intégrés.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Résolvons cette erreur:

1. **Supprimez** la balise `<link>` pointant vers la feuille de style de la balise `<head>` et remplacez-la par une balise `<style amp-custom></style>` intégrée. L'attribut `amp-custom` de la balise de style est obligatoire.
2. **Copiez** tous les styles du fichier [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) dans les balises `<style amp-custom></style>`.

Encore une fois, **rechargez** la page et vérifiez que l'erreur de feuille de style a disparu.

[tip type="note"] **REMARQUE -** Non seulement les styles intégrés sont requis, mais il y a une limite de taille de fichier de 50 kilo-octets pour toutes les informations de style. Vous devez utiliser des préprocesseurs CSS tels que [SASS](http://sass-lang.com/) pour minimiser votre CSS avant d'intégrer le CSS dans vos pages AMP. [/tip]

[tip type="important"] **IMPORTANT -** Vous ne pouvez avoir qu'une seule balise de style dans tout votre document AMP. Si vous avez plusieurs feuilles de style externes référencées par vos pages AMP, vous devrez les rassembler en un seul ensemble de règles. Pour savoir quelles règles CSS sont valides dans AMP, lisez [CSS pris en charge](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).[/tip]

## Exclure le JavaScript tiers

Si les feuilles de style peuvent être retravaillées de manière raltivement aisée avec AMP en intégrant le CSS, il n'en va pas de même pour JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

En général, les scripts AMP ne sont autorisés que s'ils respectent deux exigences majeures:

1. Tout le JavaScript doit être asynchrone (c'est-à-dire inclure l'attribut `async` dans la balise script).
2. Le JavaScript est pour la bibliothèque AMP et pour tous les composants AMP de la page.

Cela exclut en fait l'utilisation de tout JavaScript généré par l'utilisateur/tiers dans AMP, sauf comme indiqué ci-dessous.

[tip type="note"] Les seules exceptions à la restriction sur les scripts générés par l'utilisateur/tiers sont:

1. Tout script qui ajoute des métadonnées à la page ou qui configure les composants AMP. Ceux-ci auront l'attribut de type `application/ld+json` ou `application/json`.
2. Tout script inclus dans les iframes. L'inclusion de JavaScript dans une iframe doit être considérée comme une mesure de dernier recours. Dans la mesure du possible, la fonctionnalité JavaScript doit être remplacée par l'utilisation de [composants AMP](../../../../documentation/components/index.html). Nous explorerons notre premier composant AMP dans la section suivante. [/tip]

Essayez d'ouvrir le fichier externe [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js). Que voyez-vous? Le fichier doit être vide de tout code JavaScript et inclure uniquement un commentaire d'informations telles comme suit:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Étant donné que ce fichier JavaScript externe n'est pas un composant fonctionnel de notre site Web, nous pouvons supprimer entièrement la référence en toute sécurité.

**Supprimez** la référence JavaScript externe suivante de votre document:

```html
<script type="text/javascript" src="base.js"></script>
```

Maintenant, **rechargez** la page et vérifiez que l'erreur de script a disparu.

## Inclure le modèle CSS AMP

Les erreurs suivantes font référence à un code standard manquant:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Chaque document AMP nécessite le modèle de code AMP suivant:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Ajoutez** le modèle de code au bas de la balise `<head>` de votre document.

La balise `<style amp-boilerplate>` masque initialement le contenu du corps jusqu'à ce que la bibliothèque JavaScript AMP soit chargée, puis le contenu est affiché. AMP fait cela pour empêcher la diffusion de contenu sans style, également appelé Flash Of Unstyled Content (FOUC). Cela permet de garantir que l'expérience utilisateur est vraiment instantanée car le contenu de la page apparaît en même temps et tout ce qui se trouve au-dessus du pli est affiché ensemble. La deuxième balise annule cette logique si JavaScript est désactivé dans le navigateur.

## Remplacer `<img>` par `<amp-img>`

AMP ne prend pas en charge les équivalents HTML par défaut pour l'affichage des médias, ce qui explique l'erreur suivante:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

AMP possède un composant web spécialement conçu pour remplacer la balise `<img>`: il s'agit de la balise [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Remplacez** la balise `<img>` avec la balise [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) ci-dessus et exécutez à nouveau le validateur. Vous devriez recevoir plusieurs nouvelles erreurs:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Pourquoi la balise [`amp-img`](../../../../documentation/components/reference/amp-img.md) a-t-elle déclenché une autre erreur? Parce que [`amp-img`](../../../../documentation/components/reference/amp-img.md) n'est pas un substitut direct de la balise img HTML traditionnelle. D'autres exigences s'appliquent lors de l'utilisation de [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### Système de mise en page AMP

L'erreur de mise en page nous indique que [`amp-img`](../../../../documentation/components/reference/amp-img.md) ne prend pas en charge le type de mise en page de `container`. L'un des concepts les plus importants de la conception d'AMP est l'accent mis sur la réduction de la quantité de redistribution de DOM requise pour afficher ses pages Web.

Pour réduire la redistribution de DOM, AMP comprend un système de mise en page pour garantir que la mise en page de la page est connue le plus tôt possible dans le cycle de téléchargement et de diffusion de la page.

L'image ci-dessous compare la façon dont une page HTML est souvent mise en page par rapport à l'approche appliquée par AMP. Remarquez dans l'approche de gauche comment le texte est rediffusé à chaque fois qu'une annonce ou une image est chargée. L'approche de mise en page d'AMP empêche le texte de se déplacer, même si les images et les annonces prennent beaucoup de temps à se charger.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

Le système de mise en page AMP permet aux éléments d'une page d'être positionnés et mis à l'échelle de différentes manières: dimensions fixes, conception interactive, hauteur fixe, etc.

Dans le cas de notre article, le système de mise en page a déduit `container` comme type de mise en page pour [`amp-img`](../../../../documentation/components/reference/amp-img.md). Cependant, le type `container` n'est applicable qu'aux éléments qui contiennent des éléments enfants. Le type `container` est incompatible avec la balise [`amp-img`](../../../../documentation/components/reference/amp-img.md), ce qui explique cette erreur.

Pourquoi le type `container` a-t-il été déduit? Parce que nous n'avons pas spécifié d'attribut `height` pour la balise [`amp-img`](../../../../documentation/components/reference/amp-img.md). En HTML, la redistribution peut être réduite en spécifiant toujours une largeur et une hauteur fixes pour les éléments d'une page. Dans AMP, vous devez définir la largeur et la hauteur des éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md) afin que AMP puisse prédéterminer les proportions de l'élément.

**Ajoutez** les attributs `width` et `height` à votre balise [`amp-img`](../../../../documentation/components/reference/amp-img.md) comme suit:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Actualisez la page et vérifiez le validateur; vous ne devriez plus voir d'erreurs!

Vous avez maintenant un document AMP valide, mais l'image reste un peu moche car elle est mal positionnée sur la page. Par défaut, lorsque vous spécifiez la hauteur et la largeur de [`amp-img`](../../../../documentation/components/reference/amp-img.md), AMP fixe les dimensions aux valeurs spécifiées, mais ne serait-il pas génial si AMP redimensionnait l'image pour l'étirer et l'adapter de manière _interactive_ à la page, quelle que soit la taille de l'écran?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Heureusement, AMP peut déterminer les proportions des éléments à partir de la largeur et de la hauteur que vous spécifiez. Cela permet au système de mise en page AMP de positionner et de dimensionner l'élément de différentes manières. L'attribut `layout` informe AMP de la façon dont vous voulez que l'élément soit positionné et dimensionné.

**Définissons** l'attribut de mise en page sur `responsive` pour adapter l'échelle et les dimensions de notre image:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Voilà! Notre image est correctement dimensionnée et remplit de manière interactive la largeur de l'écran.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **LIRE –** Pour plus de détails sur le système de mise en page AMP, consultez la section [Spécifications de la mise en page AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## C'est bon!

Votre document AMP devrait maintenant ressembler à ceci:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Actualisez la page et regardez le résultat de la console. Le message suivant devrait vous accueillir:

<pre class="success-text">AMP validation successful.</pre>

### Questions fréquemment posées

- [Qu'est-ce que la redistribution de DOM?](http://stackoverflow.com/a/27637245)
- [Que faire si l'attribut de mise en page n'est pas défini](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Que faire si la largeur et la hauteur ne sont pas définies?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
