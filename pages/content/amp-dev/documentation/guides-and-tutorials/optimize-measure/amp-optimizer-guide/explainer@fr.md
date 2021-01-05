---
"$title": Comment fonctionne un optimiseur AMP
"$order": '1'
description: "Un optimiseur AMP prend un document AMPHTML valide en entrée et le transforme en une version optimisée en appliquant des optimisations supplémentaires qu'il serait fastidieux de faire \"à la main\". Ce guide explique en détail le fonctionnement de l'optimiseur AMP."
formats:
- websites
- stories
author: sebastianbenz
---

Un optimiseur AMP prend un document AMPHTML valide en entrée et le transforme en une version optimisée en appliquant des optimisations supplémentaires qu'il serait fastidieux de faire "à la main". Vous pouvez reconnaître le résultat "**AMP transformé**" dans l'élément `html` via l'attribut `transformed` :

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Remarque : les caches AMP utilisent un indicateur transformé différent, par exemple, les caches Google AMP ajoutent `transformed=google;v=1`.

Les optimiseurs AMP effectuent diverses optimisations sur un document AMP allant des mises en page de rendu côté serveur jusqu'à l'optimisation d'image. Voici un exemple montrant les différences entre une page AMP et sa version optimisée ([cliquez pour visualiser une version en plus grande taille](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Dans la suite de ce guide, nous présenterons ces optimisations plus en détail.

### Mises en page AMP de rendu côté serveur

Les mises en page AMP de rendu côté serveur ont le plus grand potentiel pour améliorer les performances de chargement de votre page AMP. Pour éviter les sauts de contenu, AMP exige que les sites Internet ajoutent le [code standard AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) dans l'en-tête. Le modèle AMP masque le contenu de la page en définissant l'opacité du corps de la page sur 0. Une fois AMP chargé, il est capable de calculer la mise en page de la page. Après cela, AMP définit l'opacité du corps sur 1, ce qui rend le contenu de la page visible. Malheureusement, cette approche doit télécharger le framework AMP avant de pouvoir afficher la page.

Pour améliorer cela, les mises en page AMP, telles que la mise en page `responsive` ou `fixed-height`, peuvent être rendues côté serveur avant de diffuser la page à l'agent utilisateur. De cette façon, il devient possible de supprimer le modèle passe-partout AMP tout en évitant [les changements de contenu](https://web.dev/cls/) pendant le chargement de la page.

Le rendu côté serveur fait trois choses :

⁣ **1. Supprimer le modèle passe-partout AMP : ** pour chaque élément utilisant une disposition AMP, le balisage spécifique à la disposition est injecté.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: <style amp-runtime>...</style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣ ** 3. Mises en page AMP diffusées côté serveur : ** pour chaque élément utilisant une mise en page AMP, les éléments de dimensionnement spécifiques à la mise en page sont injectés.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Attention : le passe-partout AMP ne peut pas toujours être retiré. Vous pouvez savoir si le passe-partout a été supprimé en vérifiant si l'`i-amphtml-no-boilerplate` est présent sur l'élément `html`. Par exemple, le composant `amp-experiment` modifie le contenu de la page lors de l'exécution. Pour éviter les changements de contenu, le code standard AMP doit être présent si `amp-experiment` est utilisé sur une page.

### Optimisation d'image de héros

Un optimiseur AMP peut considérablement améliorer le temps nécessaire à la diffusion des images dans la première fenêtre. Ceci est essentiel lors de l'optimisation des [temps LCP](https://web.dev/lcp/) pour répondre aux [Core Web Vitals](https://web.dev/vitals).

Dans AMP, les images de héros peuvent être explicitement déclarées en annotant une balise `amp-img` avec l'attribut `data-hero` :

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Les optimiseurs AMP prennent en charge un maximum de deux images de héros par page pour éviter de bloquer la bande passante pour d'autres ressources critiques. Si cette limite ne fonctionne pas pour vous, [veuillez nous en informer](https://github.com/ampproject/amp-toolbox/issues).

Les optimiseurs AMP détecteront également automatiquement les images de héros pour les éléments `amp-img`, `amp-iframe`, `amp-video` ou `amp-video-iframe` et injecteront `link rel=preload` pour l'image `src`. La détection automatique fonctionne en analysant le balisage HTML et les mises en page des images pour détecter les grandes images dans la première fenêtre.

Dans le cas de `amp-img`, les optimiseurs AMP diffuseront également côté serveur la balise `img` à l'intérieur de `amp-img`. Cela permettra au navigateur de restituer l'image immédiatement sans que le moteur d'exécution AMP ne soit nécessaire.

### Optimisation d'image

Les optimiseurs AMP peuvent vous aider à diffuser des images réactives optimisées en générant des attributs `srcset` spécifiques à la mise en page AMP. Par exemple, la déclaration `amp-img` :

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

est améliorée avec la définition `srcset` suivante :

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Pour que cela fonctionne, votre environnement de création/d'hébergement doit prendre en charge le redimensionnement/l'optimisation des images. Consultez les guides d'optimisation individuels pour savoir comment intégrer au mieux l'optimisation d'image.

### Version de module AMP (à venir)

Il existe une version plus petite du runtime AMP et des composants disponibles basés sur [des modules JavaScript](https://v8.dev/features/modules#browser) qui obligent les utilisateurs à télécharger moins de JavaScript lors de la visualisation d'une page AMP. Les optimiseurs AMP activent la version de module AMP par défaut, en transformant :

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

en :

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Les navigateurs qui comprennent `type="module"` ignorent les scripts avec un attribut `nomodule`. Cela signifie que les utilisateurs dotés de navigateurs modernes bénéficieront des plus petits ensembles d'exécution, tandis que les utilisateurs utilisant d'anciens navigateurs reviendront à la version sans module du runtime AMP.

Remarque : la version de module AMP n'est disponible que pour l'AMP transformé car elle nécessite que le CSS du runtime AMP soit intégré.
