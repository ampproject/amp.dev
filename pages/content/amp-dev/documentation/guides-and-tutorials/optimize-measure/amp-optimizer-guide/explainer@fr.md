---
"$title": Comment fonctionne un optimiseur AMP
"$order": '1'
description: An AMP Optimizer takes a valid AMPHTML document as input and transforms it into an optimized version by applying additional optimizations that would be cumbersome to do “by hand”. This guides explains in details how AMP Optimizer work.
formats:
- websites
- stories
author: sebastianbenz
---

Un optimiseur AMP prend un document AMPHTML valide en entrée et le transforme en une version optimisée en appliquant des optimisations supplémentaires qu'il serait fastidieux de faire "à la main". Vous pouvez reconnaître le résultat "**AMP transformé**" dans l'élément `html` via l'attribut `transformed` :

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self">
```

Remarque : les caches AMP utilisent un indicateur transformé différent, par exemple, les caches Google AMP ajoutent `transformed=google;v=1`.

Les optimiseurs AMP effectuent diverses optimisations sur un document AMP allant des mises en page de rendu côté serveur jusqu'à l'optimisation d'image. Voici un exemple montrant les différences entre une page AMP et sa version optimisée ([cliquez pour visualiser une version en plus grande taille](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Dans la suite de ce guide, nous présenterons ces optimisations plus en détail.

### Server-side rendering AMP Layouts

Server-side rendering AMP layouts has the biggest potential to improve the loading performance of your AMP page. To avoid content jumps, AMP requires websites to add the [AMP-boilerplate code](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) in the header. The AMP-boilerplate hides the page content by setting the page body's opacity to 0. Once AMP has been loaded, it is able to calculate the layout of the page. After that, AMP sets the body's opacity to 1 making the page content visible. Unfortunately, this approach must download the AMP framework before it can render the page.

To improve this, AMP layouts, such as the `responsive` or `fixed-height` layout, can be rendered server-side before serving the page to the user agent. This way it becomes possible to remove the AMP-boilerplate while still avoiding [content shifts](https://web.dev/cls/) during page load.

Le rendu côté serveur fait trois choses :

⁣**1. Remove the AMP boilerplate: ** for each element using an AMP layout, the layout-specific markup gets injected.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css" data-md-type="link">AMP-runtime CSS styles</a>: <style data-md-type="raw_html" amp-runtime="">...</style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Server-side rendered AMP layouts: ** for each element using an AMP layout, the layout-specific sizer elements gets injected.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Attention : le passe-partout AMP ne peut pas toujours être retiré. Vous pouvez savoir si le passe-partout a été supprimé en vérifiant si l'`i-amphtml-no-boilerplate` est présent sur l'élément `html`. Par exemple, le composant `amp-experiment` modifie le contenu de la page lors de l'exécution. Pour éviter les changements de contenu, le code standard AMP doit être présent si `amp-experiment` est utilisé sur une page.

### Optimisation d'image de héros

An AMP Optimizer can significantly improve the time it takes to render images in the first viewport. This is critical when optimizing the [LCP times](https://web.dev/lcp/) to meet the [Core Web Vitals](https://web.dev/vitals).

In AMP, hero images can be explicitly declared by annotating an `amp-img` with the `data-hero` attribute:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Les optimiseurs AMP prennent en charge un maximum de deux images de héros par page pour éviter de bloquer la bande passante pour d'autres ressources critiques. Si cette limite ne fonctionne pas pour vous, [veuillez nous en informer](https://github.com/ampproject/amp-toolbox/issues).

Les optimiseurs AMP détecteront également automatiquement les images de héros pour les éléments `amp-img`, `amp-iframe`, `amp-video` ou `amp-video-iframe` et injecteront `link rel=preload` pour l'image `src`. La détection automatique fonctionne en analysant le balisage HTML et les mises en page des images pour détecter les grandes images dans la première fenêtre.

In case of `amp-img`, AMP Optimizers will also server-side render the `img` tag inside the `amp-img`. This enables the browser to render the image straight away without the AMP runtime being required.

### Optimisation d'image

Les optimiseurs AMP peuvent vous aider à diffuser des images réactives optimisées en générant des attributs `srcset` spécifiques à la mise en page AMP. Par exemple, la déclaration `amp-img` :

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

est améliorée avec la définition `srcset` suivante :

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

For this to work, your build/hosting environment needs to support resizing / optimizing images. Checkout the individual optimizer guides on how to best integrate image optimization.

### AMP Module Build (Coming soon)

There is a smaller version of AMP Runtime and components available based on [JavaScript Modules](https://v8.dev/features/modules#browser) which requires users to download less JavaScript when viewing an AMP page. AMP Optimizers enable the AMP Module build by default, by transforming:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

en :

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Browsers that understand `type="module"` ignore scripts with a `nomodule` attribute. This means users with modern browsers will benefit from the smaller runtime bundles, whereas users on older browsers will fallback to the non-module version of the AMP runtime.

Note: the AMP Module Build is only available for transformed AMP as it requires the AMP Runtime CSS to be inlined.
