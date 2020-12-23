---
"$title": AMPHTML Layout System
order: '1'
formats:
- websites
- email
- stories
- ads
teaser:
  text: 'Présentation '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

##  Présentation

L'objectif principal du système de mise en page est de garantir que les éléments AMP peuvent exprimer leur mise en page afin que le moteur d'exécution puisse déduire le dimensionnement des éléments avant que les ressources distantes, telles que JavaScript et les appels de données, ne soient terminées. Cela est important car cela réduit considérablement le rendu et améliore le défilement.

Dans cet esprit, le système de mise en page AMP est conçu pour prendre en charge des mises en page peu nombreuses mais flexibles qui offrent de bonnes garanties de performances. Ce système repose sur un ensemble d'attributs tels que `layout`, `width`, `height`, `sizes` et `heights` pour exprimer les besoins de mise en page et de dimensionnement de l'élément.

## Behavior <a name="behavior"></a>

Un élément AMP non conteneur (p. ex., `layout != container`) démarre dans le mode non résolu/non construit dans lequel tous ses enfants sont masqués à l’exception d’un caractère de remplacement (voir l'attribut `placeholder`). La charge utile de JavaScript et de données nécessaire à la construction complète de l’élément peut encore être en téléchargement et en cours d’initialisation, mais l’exécution AMP sait déjà comment dimensionner et disposer l’élément en s’appuyant uniquement sur les classes CSS et les attributs `layout`, `width`, `height` et `media`. Dans la plupart des cas, un caractère de remplacement `placeholder`, s’il est spécifié, est dimensionné et positionné pour prendre tout l’espace de l’élément.

Le `placeholder` est masqué dès que l'élément est créé et que sa première mise en page est terminée. À ce stade, l'élément doit avoir tous ses enfants correctement construits et positionnés et prêts à être affichés et à accepter l'entrée d'un lecteur. Ceci constitue le comportement par défaut. Chaque élément peut remplacer, par exemple, masquer le `placeholder` plus rapidement ou le conserver plus longtemps.

L’élément est dimensionné et affiché en fonction des attributs `layout`, `width`, `height` et `media` par le runtime. Toutes les règles de mise en page sont implémentées via CSS en interne. L’élément est considéré comme de « taille définie » si sa taille peut être déduite des styles CSS et ne change pas en fonction de ses enfants : disponibles immédiatement ou insérés dynamiquement. Cela ne signifie pas que la taille de cet élément ne peut pas changer. La mise en page peut être entièrement réactive comme c’est le cas avec les mises en page `responsive`, `fixed-height`, `fill` et `flex-item`. Cela signifie simplement que la taille ne change pas sans une action explicite de l'utilisateur, par exemple lors de l'affichage, du défilement ou du téléchargement de la publication.

Si l'élément n'a pas été configuré correctement dans PROD, il ne sera pas du tout affiché et en mode DEV, le runtime affichera l'élément avec état d'erreur. Les erreurs possibles incluent des valeurs invalides ou non prises en charge des attributs `layout`, `width` et `height`.

## Layout Attributes <a name="layout-attributes"></a>

### `width` and `height` <a name="width-and-height"></a>

Depending on the value of the `layout` attribute, AMP component elements must have a `width` and `height` attribute that contains an integer pixel value. Actual layout behavior is determined by the `layout` attribute as described below.

Dans quelques cas, si l'attribut `width` ou `height` n'est pas spécifié, le runtime AMP peut définir ces valeurs par défaut comme suit :

- `amp-pixel`: Both `width` and `height` are defaulted to 0.
- `amp-audio`: The default `width` and `height` are inferred from browser.

### `layout` <a name="layout"></a>

AMP fournit un ensemble de mises en page qui spécifient le comportement d'un composant AMP dans la mise en page du document. Vous pouvez spécifier une mise en page pour un composant en ajoutant l'attribut `layout` avec l'une des valeurs spécifiées dans le tableau ci-dessous.

**Example**: A simple responsive image, where width and height are used to determine the aspect ratio.

[sourcecode:html]
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
></amp-img>
[/sourcecode]

Supported values for the `layout` attribute:

<table>
  <thead>
    <tr>
      <th width="30%">Value</th>
      <th>Behavior  and  Requirements</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Not present</td>
      <td>Si aucune valeur n'est spécifiée, la mise en page du composant est déduite comme suit : <ul> <li>Si l'attribut <code>height</code> est présent et que <code>width</code> est absent ou défini sur <code>auto</code>, une mise en page <code>fixed-height</code> est supposée.</li> <li>Si <code>width</code> et <code>height</code> sont présents avec un attribut <code>sizes</code> ou <code>heights</code>, une mise en page <code>responsive</code> est supposé.</li> <li>Si <code>width</code> et <code>height</code> sont présents, une mise en page <code>fixed</code> est supposée.</li> <li>Si <code>width</code> et <code>height</code> sont absents, une mise en page <code>container</code> est supposée.</li> </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>L'élément laisse ses enfants définir sa taille, un peu comme un <code>div</code> HTML normal. Le composant est supposé ne pas avoir de mise en page spécifique mais uniquement agir comme un conteneur ; ses enfants sont rendus immédiatement.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>L'élément prend l'espace dont il dispose, à la fois en largeur et en hauteur. En d'autres termes, la mise en page et la taille d'un élément <code>fill</code> correspondent à son parent. Pour qu'un élément remplisse son conteneur parent, spécifiez la mise en page "fill" et assurez-vous que le conteneur parent spécifie <code>position:relative</code> ou <code>position:absolute</code>.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>The element has a fixed width and height with no responsiveness supported. The <code>width</code> and <code>height</code> attributes must be present. The only exceptions are the <code>amp-pixel</code> and <code>amp-audio</code> components. </td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>The element takes the space available to it but keeps the height unchanged. This layout works well for elements such as <code>amp-carousel</code> that involves content positioned horizontally. The <code>height</code> attribute must be present. The <code>width</code> attribute must not be present or must be equal to <code>auto</code>. </td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>The element and other elements in its parent with layout type <code>flex-item</code> take the parent container's remaining space when the parent is a flexible container (i.e., <code>display: flex</code>). The <code>width</code> and <code>height</code> attributes are not required.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>The element takes the space available to it and resizes its height automatically to the aspect ratio given by the <code>width</code> and <code>height</code> attributes <em>until</em> it reaches the element's size defined by the `width` and `height` attributes passed to the <code>amp-img</code>, or reaches a CSS constraint, such as `max-width`. The width and height attributes must be present. This layout works very well for most AMP elements, including <code>amp-img</code>, <code>amp-carousel</code>, etc. The available space depends on the parent element and can also be customized using <code>max-width</code> CSS. This layout differs from <code>responsive</code> by having an intrinsic height and width. This is most apparent inside a floated element where a <code>responsive</code> layout will render 0x0 and an <code>intrinsic</code> layout will inflate to the smaller of its natural size or any CSS constraint.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>L'élément n'est pas affiché et n'occupe aucun espace sur l'écran comme si son style d'affichage était <code>none</code>. Cette mise en page peut être appliquée à chaque élément AMP. On suppose que l'élément peut s'afficher selon l'action de l'utilisateur (par exemple, <code>amp-lightbox</code>). Les attributs <code>width</code> et <code>height</code> ne sont pas obligatoires.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>The element takes the space available to it and resizes its height automatically to the aspect ratio given by the <code>width</code> and <code>height</code> attributes. This layout works very well for most AMP elements, including <code>amp-img</code>, <code>amp-video</code>, etc.  The available space depends on the parent element and can also be customized using <code>max-width</code> CSS. The <code>width</code> and <code>height</code> attributes must be present.<p><strong>Note</strong>: Elements with <code>"layout=responsive"</code> have no intrinsic size. The size of the element is determined from its container element. To ensure your AMP element displays, you must specify a width and height for the  containing element. Do not specify <code>"display:table"</code> on the containing element as this overrides the display of the AMP element, rendering the AMP element invisible.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

All AMP elements that support the `responsive` layout, also support the `sizes` attribute. The value of this attribute is a sizes expression as described in the [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), but extended to all elements, not just images. In short, the `sizes` attribute describes how the width of the element is calculated depending on the media conditions.

Lorsque l'attribut `sizes` est spécifié avec les attributs `width` et `height`, l'attribut `layout` est défini par défaut sur `responsive`.

**Example**: Using the `sizes` attribute

In the following example, if the viewport is wider than `320px`, the image will be 320px wide, otherwise, it will be 100vw wide (100% of the viewport width).

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
[/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

The `sizes` attribute on its own will set an inline `width` style on the element. When pairing `disable-inline-width` with `sizes`, the AMP element will propagate the value of `sizes` to the element's underlying tag, as with the `img` nested inside an `amp-img`, **without** setting the inline `width` as `sizes` typically does on its own in AMP.

**Example**: Using the `disable-inline-width` attribute

In the following example, the width of the `<amp-img>` element is unaffected, and `sizes` is only used to select one of the sources from the `srcset`.

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
  disable-inline-width
>
</amp-img>
[/sourcecode]

### `heights` <a name="heights"></a>

All AMP elements that support the `responsive` layout, also support the `heights` attribute. The value of this attribute is a sizes expression based on media expressions as similar to the [img sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), but with two key differences:

1. It applies to the height, not the width of the element.
2. Percent values are allowed, e.g. `86%`. If a percent value is used, it indicates the percentage of the element's width.

When the `heights` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.

**Example**: Using the `heights` attribute

In the following example, the height of the image will default to 80% of the width, but if the viewport is wider than `500px`, the height is capped at `200px`. Because the `heights` attribute is specified along with `width` and `height`, the layout defaults to `responsive`.

[sourcecode:html]
<amp-img
  src="https://acme.org/image1.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
[/sourcecode]

### `media` <a name="media"></a>

La plupart des éléments AMP prennent en charge l'attribut `media`. La valeur de `media` est une requête multimédia. Si la requête ne correspond pas, l'élément n'est pas du tout rendu, et ses ressources et éventuellement les ressources de ses enfants ne seront pas récupérées. Si la fenêtre du navigateur change de taille ou d'orientation, les requêtes média sont réévaluées et les éléments sont masqués et affichés en fonction des nouveaux résultats.

**Example**: Using the `media` attribute

Dans l'exemple suivant, nous avons 2 images avec des requêtes médias mutuellement exclusives. En fonction de la largeur de l'écran, l'une des deux images sera récupérée et rendue. L'attribut `media` est disponible sur tous les éléments AMP, il peut donc être utilisé avec des éléments non illustrés, tels que des annonces.

[sourcecode:html]
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
[/sourcecode]

### `placeholder` <a name="placeholder"></a>

L'attribut `placeholder` peut être défini sur n'importe quel élément HTML, pas uniquement sur les éléments AMP. L'attribut `placeholder` indique que l'élément marqué avec cet attribut agit comme un caractère de remplacement pour l'élément AMP parent. S'il est spécifié, un élément d'espace réservé doit être un enfant direct de l'élément AMP. Par défaut, l'espace réservé est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ou initialisées. Une fois prêt, l'élément AMP masque généralement son espace réservé et affiche le contenu. Le comportement exact par rapport à l'espace réservé dépend de l'implémentation de l'élément.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

L'attribut `fallback` peut être défini sur n'importe quel élément HTML, pas uniquement sur les éléments AMP. Une solution de secours est une convention qui permet à l'élément de communiquer au lecteur que le navigateur ne prend pas en charge l'élément. S'il est spécifié, un élément de secours doit être un enfant direct de l'élément AMP. Le comportement exact de l'élément de secours dépend de l'implémentation de l'élément.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

The `noloading` attribute indicates whether the "loading indicator" should be turned off for this element. Many AMP elements are allow-listed to show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. The elements can opt out of this behavior by adding this attribute.

## (tl;dr) Summary of Layout Requirements & Behaviors <a name="tldr-summary-of-layout-requirements--behaviors"></a>

The following table describes the acceptable parameters, CSS classes, and styles used for the `layout` attribute. Note that:

1. Any CSS class marked prefixed with `-amp-` and elements prefixed with `i-amp-` are considered to be internal to AMP and their use in user stylesheets is not allowed. They are shown here simply for informational purposes.
2. Even though `width` and `height` are specified in the table as required, the default rules may apply as is the case with `amp-pixel` and `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Layout</th>
      <th width="20%">Width/<br>Height Required?</th>
      <th width="20%">Defines Size?</th>
      <th width="20%">Additional Elements</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>No</td>
      <td>Yes, parent's size.</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Yes</td>
      <td>Yes, specified by <code>width</code> and <code>height</code>.</td>
      <td>No</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>
<code>height</code> only; <code>width</code> can be <code>auto</code>
</td>
      <td>Yes, specified by the parent container and <code>height</code>.</td>
      <td>No</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>No</td>
      <td>No</td>
      <td>Yes, based on parent container.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Yes</td>
      <td>Yes, based on parent container and aspect ratio of <code>width:height</code>.</td>
      <td>Yes, <code>i-amphtml-sizer</code>.</td>
      <td>
<code>block</code> (behaves like a <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">replaced element</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Yes</td>
      <td>Yes, based on parent container and aspect ratio of <code>width:height</code>.</td>
      <td>Yes, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
