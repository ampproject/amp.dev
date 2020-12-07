---
"$title": Système de mise en page AMPHTML
order: '1'
formats:
- websites
- email
- stories
- ads
teaser:
  text: " Overview"
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

## Overview <a name="overview"></a>

The main goal of the layout system is to ensure that AMP elements can express their layout so that the runtime is able to infer sizing of elements before any remote resources, such as JavaScript and data calls, have been completed. This is important since this significantly reduces rendering and scrolling jank.

With this in mind, the AMP Layout System is designed to support few but flexible layouts that provide good performance guarantees. This system relies on a set of attributes such as `layout`, `width`, `height`, `sizes` and `heights` to express the element's layout and sizing needs.

## Comportement <a name="behavior"></a>

A non-container AMP element (i.e., `layout != container`) starts up in the unresolved/unbuilt mode in which all of its children are hidden except for a placeholder (see `placeholder` attribute). The JavaScript and data payload necessary to fully construct the element may still be downloading and initializing, but the AMP runtime already knows how to size and lay out the element only relying on CSS classes and `layout`, `width`, `height` and `media` attributes. In most cases, a `placeholder`, if specified, is sized and positioned to take all of the element's space.

The `placeholder` is hidden as soon as the element is built and its first layout complete. At this point, the element is expected to have all of its children properly built and positioned and ready to be displayed and to accept a reader's input. This is the default behavior. Each element can override to, e.g., hide `placeholder` faster or keep it around longer.

The element is sized and displayed based on the `layout`, `width`, `height` and `media` attributes by the runtime. All of the layout rules are implemented via CSS internally. The element is said to "define size" if its size is inferable via CSS styles and does not change based on its children: available immediately or inserted dynamically. This does not mean that this element's size cannot change. The layout could be fully responsive as is the case with `responsive`, `fixed-height`, `fill` and `flex-item` layouts. It simply means that the size does not change without an explicit user action, e.g. during rendering or scrolling or post download.

If the element has been configured incorrectly, in PROD it will not be rendered at all and in DEV mode the runtime will render the element in the error state. Possible errors include invalid or unsupported values of `layout`, `width` and `height` attributes.

## Attributs de mise en page <a name="layout-attributes"></a>

### `width` et `height` <a name="width-and-height"></a>

En fonction de la valeur de l'attribut `layout`, les éléments du composant AMP doivent avoir un attribut `width` et `height` qui contient une valeur de pixel entière. Le comportement de mise en page réel est déterminé par l'attribut `layout` comme décrit ci-dessous.

In a few cases, if `width` or `height` are not specified, the AMP runtime can default these values as follows:

- `amp-pixel` : `width` et `height` sont réglés par défaut sur 0.
- `amp-audio` : les valeurs par défaut de `width` et `height` sont déduites du navigateur.

### `layout` <a name="layout"></a>

AMP provides a set of layouts that specify how an AMP component behaves in the document layout. You can specify a layout for a component by adding the `layout` attribute with one of the values specified in the table below.

**Exemple** : une image adaptative simple, où la largeur et la hauteur sont utilisées pour déterminer le rapport hauteur/largeur.

[sourcecode:html]
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
></amp-img>
[/sourcecode]

Valeurs prises en charge pour l'attribut `layout` :

<table>
  <thead>
    <tr>
      <th width="30%">Valeur</th>
      <th>Comportement et exigences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Absente</td>
      <td>If no value is specified, the layout for the component is inferred as follows:         <ul>           <li>If <code>height</code> is present and <code>width</code> is absent or is set to <code>auto</code>, a <code>fixed-height</code> layout is assumed.</li>           <li>If <code>width</code> and <code>height</code> are present along with a <code>sizes</code> or <code>heights</code> attribute, a <code>responsive</code> layout is assumed.</li>           <li>If <code>width</code> and <code>height</code> are present, a  <code>fixed</code> layout is assumed.</li>           <li> if <code>width</code> and <code>height</code> are absent, a <code>container</code> layout is assumed.</li>         </ul>       </td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>The element lets its children define its size, much like a normal HTML <code>div</code>. The component is assumed to not have specific layout itself but only act as a container; its children are rendered immediately.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>The element takes the space available to it—both width and height. In other words, the layout and size of a <code>fill</code> element matches its parent. For an element to fill its parent container, specify the "fill" layout, and ensure the parent container specifies <code>position:relative</code> or <code>position:absolute</code>. </td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>L'élément a une largeur et une hauteur fixes sans prise en charge de la réactivité. Les attributs <code>width</code> et <code>height</code> doivent être présents. Les seules exceptions sont les composants <code>amp-pixel</code> et <code>amp-audio</code>.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>L'élément prend l'espace dont il dispose mais garde la hauteur inchangée. Cette mise en page fonctionne bien pour des éléments tels que <code>amp-carousel</code> qui impliquent un contenu positionné horizontalement. L'attribut <code>height</code> doit être présent. L'attribut <code>width</code> ne doit pas être présent ou doit être égal à <code>auto</code>.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>L'élément et les autres éléments de son parent avec le type de mise en page <code>flex-item</code> prennent l'espace restant du conteneur parent lorsque le parent est un conteneur flexible (<code>display: flex</code>). Les attributs <code>width</code> et <code>height</code> ne sont pas obligatoires.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>L'élément prend l'espace dont il dispose et redimensionne automatiquement sa hauteur au rapport hauteur/largeur donné par les attributs <code>width</code> et <code>height</code> <em>jusqu'à</em> ce qu'il atteigne la taille d'élément définie par les attributs width et height transmis à <code>amp-img</code>, ou atteigne une contrainte CSS, telle que max-width. Les attributs width et height doivent être présents. Cette mise en page fonctionne très bien pour la plupart des éléments AMP, y compris <code>amp-img</code>, <code>amp-carousel</code>, etc. L'espace disponible dépend de l'élément parent et peut également être personnalisé à l'aide du CSS <code>max-width</code>. Cette mise en page diffère de <code>responsive</code> par sa hauteur et sa largeur intrinsèques. Cela est plus évident dans un élément flottant où une mise en page <code>responsive</code> rendra 0x0 et une mise en page <code>intrinsic</code> gonflera jusqu'à la plus petite valeur de sa taille naturelle ou de toute contrainte CSS.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>The element isn't displayed, and takes up zero space on the screen as if its display style was <code>none</code>. This layout can be applied to every AMP element.  It’s assumed that the element can display itself on user action (e.g., <code>amp-lightbox</code>). The <code>width</code> and <code>height</code> attributes are not required.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>L’élément prend l’espace disponible et redimensionne automatiquement sa hauteur au rapport d’aspect donné par les attributs <code>width</code> et <code>height</code>. Cette mise en page fonctionne très bien pour la plupart des éléments AMP, y compris <code>amp-img</code>, <code>amp-video</code>, etc. L’espace disponible dépend de l’élément parent et peut également être personnalisé à l’aide du CSS <code>max-width</code>. Les attributs <code>width</code> et <code>height</code> doivent être présents.<p><strong>Remarque</strong> : les éléments avec <code>"layout=responsive"</code> n’ont pas de taille intrinsèque. La taille de l’élément est déterminée à partir de son élément conteneur. Pour garantir que votre élément AMP s’affiche, vous devez spécifier une largeur et une hauteur pour l’élément contenant. Ne spécifiez pas <code>"display:table"</code> sur l’élément contenant, car cela remplace l’affichage de l’élément AMP, et rend l’élément AMP invisible.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

Tous les éléments AMP qui prennent en charge la mise en page `responsive` prennent également en charge l’attribut `sizes`. La valeur de cet attribut est une expression de tailles décrite dans [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mais étendue à tous les éléments, pas seulement aux images. En bref, l’attribut `sizes` décrit comment la largeur de l’élément est calculée en fonction des conditions du média.

When the `sizes` attribute is specified along with `width` and `height`, the `layout` is defaulted to `responsive`.

**Exemple** : utilisation de l'attribut `sizes`

Dans l'exemple suivant, si la fenêtre est plus large que `320px`, l'image aura une largeur de 320px, sinon elle aura une largeur de 100vw (100 % de la largeur de la fenêtre).

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

L'attribut `sizes` définira un style intégré `width` sur l'élément. Lors de l'association de `disable-inline-width` avec `sizes`, l'élément AMP propage la valeur `sizes` vers la balise sous-jacente de l'élément, comme avec `img` imbriqué dans un `amp-img`, **sans** définir la valeur de `width` intégrée comme `sizes` le fait généralement dans AMP.

**Exemple** : utilisation de l'attribut `disable-inline-width`

Dans l'exemple suivant, la largeur de l'élément `<amp-img>` n'est pas affectée et l'attribut `sizes` n'est utilisé que pour sélectionner l'une des sources du `srcset`.

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

Tous les éléments AMP qui prennent en charge la mise en page `responsive` prennent également en charge l'attribut `heights`. La valeur de cet attribut est une expression des tailles basée sur des expressions de média similaires à l'attribut [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), mais avec deux différences clés :

1. Elle s'applique à la hauteur et non à la largeur de l'élément.
2. Les valeurs en pourcentage sont autorisées, par exemple `86%`. Si une valeur de pourcentage est utilisée, elle indique le pourcentage de la largeur de l'élément.

Lorsque l'attribut `heights` est spécifié avec `width` et `height`, `layout` est défini par défaut sur `responsive`.

**Exemple** : utilisation de l'attribut `heights`

Dans l'exemple suivant, la hauteur de l'image sera fixée par défaut à 80 % de la largeur, mais si la fenêtre est plus large que `500px`, la hauteur sera limitée à `200px`. Étant donné que l'attribut `heights` est spécifié avec `width` et `height`, la mise en page sera par défaut `responsive`.

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

Most AMP elements support the `media` attribute. The value of `media` is a media query. If the query does not match, the element is not rendered at all and its resources and potentially its child resources will not be fetched. If the browser window changes size or orientation, the media queries are re-evaluated and elements are hidden and shown based on the new results.

**Exemple** : utilisation de l'attribut `media`

In the following example, we have 2 images with mutually exclusive media queries. Depending on the screen width, one of the two images will be fetched and rendered. The `media` attribute is available on all AMP elements, so it can be used with non-image elements, such as ads.

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

The `placeholder` attribute can be set on any HTML element, not just AMP elements. The `placeholder` attribute indicates that the element marked with this attribute acts as a placeholder for the parent AMP element. If specified, a placeholder element must be a direct child of the AMP element. By default, the placeholder is immediately shown for the AMP element, even if the AMP element's resources have not been downloaded or initialized. Once ready, the AMP element typically hides its placeholder and shows the content. The exact behavior with respect to the placeholder is up to the element's implementation.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

The `fallback` attribute can be set on any HTML element, not just AMP elements. A fallback is a convention that allows the element to communicate to the reader that the browser does not support the element. If specified, a fallback element must be a direct child of the AMP element. The exact behavior with respect to the fallback is up to the element's implementation.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

L'attribut `noloading` indique si l'indicateur de chargement doit être désactivé pour cet élément. De nombreux éléments AMP sont autorisés à afficher un indicateur de chargement, qui est une animation de base indiquant que l'élément n'est pas encore complètement chargé. Les éléments peuvent désactiver ce comportement en ajoutant cet attribut.

## (tl;dr) Résumé des exigences et des comportements de mise en page <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Le tableau suivant décrit les paramètres acceptables, les classes CSS et les styles utilisés pour l'attribut `layout`. Notez que :

1. Toute classe CSS marquée avec le préfixe `-amp-` et tout élément avec le préfixe `i-amp-` sont considérés comme internes à AMP et leur utilisation dans les feuilles de style des utilisateurs n'est pas autorisée. Ils sont présentés ici simplement à titre informatif.
2. Même si `width` et `height` sont spécifiés dans le tableau selon les besoins, les règles par défaut peuvent s'appliquer comme c'est le cas avec `amp-pixel` et `amp-audio`.

<table>
  <thead>
    <tr>
      <th width="21%">Mise en page</th>
      <th width="20%">Largeur/ <br> hauteur requise ?</th>
      <th width="20%">Définit la taille ?</th>
      <th width="20%">Éléments supplémentaires</th>
      <th width="19%">Affichage CSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Non</td>
      <td>Oui, la taille des parents.</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Oui</td>
      <td>Oui, spécifié par <code>width</code> et <code>height</code>.</td>
      <td>Non</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>
<code>height</code> seulement ; <code>width</code> peut être <code>auto</code>
</td>
      <td>Oui, spécifié par le conteneur parent et <code>height</code>.</td>
      <td>Non</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Oui, en fonction du conteneur parent.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Oui</td>
      <td>Oui, en fonction du conteneur parent et du rapport largeur/hauteur <code>width:height</code>.</td>
      <td>Oui, <code>i-amphtml-sizer</code>.</td>
      <td>
<code>block</code> (se comporte comme un <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">élément remplacé</a>)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Non</td>
      <td>Non</td>
      <td>Non</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Oui</td>
      <td>Oui, en fonction du conteneur parent et du rapport largeur/hauteur <code>width:height</code>.</td>
      <td>Oui, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
