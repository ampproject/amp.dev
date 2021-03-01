---
'$title': "Attributs d'élément communs"
$order: 1
description: "AMP fournit un ensemble d'attributs communs qui sont étendus à de nombreux composants AMP (et éléments HTML). Ce document décrit chacun des attributs communs."
toc: 'true'
---

AMP fournit un ensemble d'attributs communs qui sont étendus à de nombreux composants AMP (et éléments HTML). Ce document décrit chacun des attributs communs.

## fallback

Une alternative est une convention qui permet à l'élément de communiquer au lecteur que le navigateur ne prend pas en charge l'élément ou que le chargement de la ressource sous-jacente a échoué. L'attribut `fallback` peut être placé sur n'importe quel élément HTML qui est un enfant direct d'un élément AMP qui prend en charge les alternatives. Le comportement exact par rapport à l'alternative dépend de l'implémentation de l'élément, mais en général, l'alternative est affichée à la place de l'élément normal.

Souvent utilisé avec: images, animations, audios et vidéos

Exemple:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Pour plus d'informations, consultez la section [Caractères de remplacement et solutions de secours](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Tous les éléments AMP qui prennent en charge la mise en page `responsive`, prennent également en charge l'attribut `heights`. La valeur de cet attribut est une expression de tailles basée sur des expressions de médias, similaire à [ l'attribut de tailles sur les balises `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) mais avec deux différences essentielles:

1. La valeur s'applique à la hauteur et non à la largeur de l'élément.
2. Les valeurs en pourcentage sont autorisées. Une valeur en pourcentage indique le pourcentage de la largeur de l'élément. Par exemple, une valeur de `80%` indique que la hauteur de l'élément correspondra à 80% de la largeur de l'élément.

Remarque: lorsque l'attribut `heights` est spécifié avec la `width` et la `height` , la `layout` est définie par défaut sur `responsive` .

Exemple:

```html
<amp-img
  src="amp.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

Pour plus d'informations, consultez la section [Direction artistique avec srcset, tailles et hauteurs](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP fournit un ensemble de [mises en page](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) qui spécifient le comportement d'un composant AMP dans la mise en page du document. Vous pouvez spécifier une mise en page pour un composant en ajoutant l'attribut `layout` avec l'une des valeurs de mise en page prises en charge pour l'élément (voir la documentation de l'élément pour connaître les valeurs prises en charge).

Exemple:

```html
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
>
</amp-img>
```

Pour plus d'informations, consultez la section [Requêtes de mise en page et de média](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) et [Spécifications de mise en page](amp-html-layout/index.md).

## media <a name="media"></a>

La plupart des éléments AMP prennent en charge l'attribut `media`. La valeur du `media` est une requête multimédia. Si la requête ne correspond pas, l'élément n'est pas rendu: ses ressources et potentiellement ses ressources enfants ne seront pas récupérées. Si la fenêtre du navigateur change de taille ou d'orientation, les requêtes multimédias sont réévaluées et les éléments sont masqués et affichés en fonction des nouveaux résultats.

Exemple:

```html
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
```

Pour plus d'informations, consultez la section [Requêtes de mises en page et multimédia](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

L'attribut `noloading` indique si « l'indicateur de chargement » doit être **désactivé** pour cet élément. De nombreux éléments AMP affichent un « indicateur de chargement », généralement une animation de base qui montre que l'élément n'est pas encore complètement chargé.

Souvent utilisé avec: images, animations, vidéos et annonces

Exemple:

```html
<amp-img src="card.jpg" noloading height="190" width="297" layout="responsive">
</amp-img>
```

## on

L'attribut `on` est utilisé pour installer des gestionnaires d'événements sur des éléments. Les événements pris en charge dépendent de l'élément.

Souvent utilisé avec: lightbox, barres latérales, listes dynamiques et formulaires

Syntaxe:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Exemple:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay"> ... </amp-lightbox>
```

Pour plus d'informations, consultez la section [Actions et événements dans AMP](amp-actions-and-events.md).

## placeholder

L'attribut `placeholder` indique que l'élément marqué avec cet attribut agit comme caractère de remplacement pour l'élément AMP parent. L'attribut peut être placé sur n'importe quel élément HTML qui est un enfant direct d'un élément AMP prenant en charge les caractères de replacement. Par défaut, le caractère de remplacement est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ou initialisées. Une fois prêt, l'élément AMP masque généralement son caractère de remplacement et affiche le contenu. Le comportement exact par rapport au caractère de remplacement dépend de l'implémentation de l'élément.

Souvent utilisé avec: images, animations, vidéos et annonces

Exemple:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Pour plus d'informations, consultez la section [Caractères de remplacement et solutions de secours](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Tous les éléments AMP qui prennent en charge la mise en page `responsive` prennent également en charge l'attribut `sizes`. La valeur de l'attribut AMP `sizes` est une expression de taille qui sélectionne la taille définie correspondant à la requête de multimédia sur la base de la taille actuelle de la fenêtre. <strong>De plus, l'AMP définit un style intégré pour <code>width</code> sur l'élément </strong>.

Exemple:

```html
<amp-img
  src="amp.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
```

Donnera la balise imbriquée `img ` suivante:

```html
<img
  decoding="async"
  src="amp.png"
  sizes="(min-width: 320px) 320px, 100vw"
  class="i-amphtml-fill-content i-amphtml-replaced-content"
/>
```

Pour plus d'informations, consultez la section [Direction artistique avec srcset, tailles et hauteurs](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width et height

Pour certaines [mises en page](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), les composants AMP doivent avoir un attribut `width` et `height` contenant une valeur de pixel entière.

Exemple:

```html
<amp-anim width="245" height="300" src="/img/cat.gif" alt="cat animation">
</amp-anim>
```

Pour plus d'informations, consultez la section [Requêtes de mise en page et de média](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) et [Spécifications de mise en page](amp-html-layout/index.md).
