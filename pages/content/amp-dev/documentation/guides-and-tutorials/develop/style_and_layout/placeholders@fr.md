---
'$title': Caractères de remplacement et solutions de secours
$order: 3
descriptions: "In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible."
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

In the spirit of perceived performance and progressive enhancement, it's best practise in AMP to provide placeholders and fallbacks wherever possible.

Certains éléments vous récompenseront même si vous le faites en assouplissant les restrictions. Par exemple, si vous fournissez un caractère de remplacement pour [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder), il peut être utilisé en haut de la page (ce qui ne fonctionnera pas sans).

## Caractères de remplacement

L'élément marqué par l'attribut `placeholder` agit comme un caractère de remplacement pour l'élément AMP parent. S'il est spécifié, un élément `placeholder` doit être un enfant direct de l'élément AMP. Un élément marqué comme `placeholder` sera toujours `fill` l'élément AMP parent.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300"
>
  <amp-img
    placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill"
  >
  </amp-img>
</amp-anim>
```

[/example]

Par défaut, le caractère de remplacement est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ou initialisées. Une fois prêt, l'élément AMP masque généralement son caractère de remplacement et affiche le contenu.

[tip type="note"] **REMARQUE –** le caractère de remplacement ne doit pas nécessairement être un élément AMP; tout élément HTML peut faire office de caractère de remplacement. [/tip]

## Solutions de secours <a name="fallbacks"></a>

Vous pouvez spécifier l'attribut `fallback` sur un élément pour indiquer le comportement de secours:

- pour tout élément que le navigateur ne prend pas en charge
- si le contenu ne se charge pas (par exemple, Tweet supprimé)
- si le type d'image n'est pas pris en charge (par exemple, WebP n'est pas pris en charge sur tous les navigateurs)

Vous pouvez définir l'attribut `fallback` sur _n'importe quel_ élément HTML, pas uniquement sur les éléments AMP. S'il est spécifié, l'élément `fallback` doit être un enfant direct de l'élément AMP.

##### Exemple: fonctionnalité non prise en charge

Dans l'exemple suivant, nous utilisons l'attribut `fallback` pour communiquer à l'utilisateur que le navigateur ne prend pas en charge une fonctionnalité particulière:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

##### Exemple: diffuser différents formats d'image

Dans l'exemple suivant, nous utilisons l'attribut `fallback` pour indiquer au navigateur d'utiliser le fichier JPEG si le format WebP n'est pas pris en charge.

[example preview="inline" playground="true"]

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

## Interaction des caractères de remplacement et des solutions de secours

Pour les composants AMP qui reposent sur du contenu dynamique (par exemple, [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) et [`amp-list`](../../../../documentation/components/reference/amp-list.md)), l'interaction des solutions de secours et des caractères de remplacement fonctionne comme suit:

<ol>
  <li>Afficher le caractère de remplacement pendant le chargement du contenu.</li>
  <li>Si le contenu se charge correctement, masquer le caractère de remplacement et afficher le contenu.</li>
  <li>Si le contenu ne se charge pas: <ol>
<li> S'il existe un élément de secours, afficher ce dernier. </li>
<li> Sinon, continuer à afficher le caractère de remplacement. </li>
</ol>
</li>
</ol>

## Comment masquer les indicateurs de chargement

De nombreux éléments AMP sont autorisés à afficher un « indicateur de chargement », qui est une animation basique qui montre que l'élément n'est pas encore complètement chargé. Les éléments peuvent désactiver ce comportement en ajoutant l'attribut `noloading`.
