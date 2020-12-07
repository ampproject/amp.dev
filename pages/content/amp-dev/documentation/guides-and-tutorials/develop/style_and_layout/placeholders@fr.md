---
"$title": Caractères de remplacement et solutions de secours
"$order": '3'
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
<amp-anim src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
  layout="responsive"
  width="400"
  height="300">
  <amp-img placeholder
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
    layout="fill">
  </amp-img>
</amp-anim>
```
[/example]

Par défaut, le caractère de remplacement est immédiatement affiché pour l'élément AMP, même si les ressources de l'élément AMP n'ont pas été téléchargées ou initialisées. Une fois prêt, l'élément AMP masque généralement son caractère de remplacement et affiche le contenu.

[tip type="note"] **NOTE –**  The placeholder doesn’t have to be an AMP element; any HTML element can act as the placeholder. [/tip]

## Solutions de secours <a name="fallbacks"></a>

Vous pouvez spécifier l'attribut `fallback` sur un élément pour indiquer le comportement de secours:

- for any element the browser doesn’t support
- if the content fails to load (e.g., Tweet deleted)
- if the image type is unsupported (e.g., WebP isn't supported in all browsers)

Vous pouvez définir l'attribut `fallback` sur *n'importe quel* élément HTML, pas uniquement sur les éléments AMP. S'il est spécifié, l'élément `fallback` doit être un enfant direct de l'élément AMP.

##### Exemple: fonctionnalité non prise en charge

In the following example, we use the `fallback` attribute to communicate to the user that the browser doesn’t support a particular feature:

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

In the following example, we use the `fallback` attribute to tell the browser to use the JPEG file if the WebP format is unsupported.

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

## Interaction des caractères de remplacement et des solutions de secours

For AMP components that rely on dynamic content (e.g., [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md), [`amp-list`](../../../../documentation/components/reference/amp-list.md)), the interaction of fallbacks and placeholders operates as follows:

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

Many AMP elements are allowlisted to show a "loading indicator", which is a basic animation that shows that the element has not yet fully loaded. Elements can opt out of this behavior by adding the `noloading` attribute.
