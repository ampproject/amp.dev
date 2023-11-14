---
$title: amp-animation
$category@: presentation
teaser:
  text: Définir et afficher une animation.
---


<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Ce composant définit et exécute des animations.

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://ampjs.org/v0/amp-animation-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Aperçu <a name="overview"></a>

Les animations AMP utilisent l'[API Web Animations](https://www.w3.org/TR/web-animations/) pour définir et exécuter des animations dans les documents AMP.

## Format <a name="format"></a>

Un élément `amp-animation` définit une animation de ce type sous la forme d'une structure JSON.

### Spécification d'animation de niveau supérieur <a name="top-level-animation-specification"></a>

L'objet de niveau supérieur définit un processus d'animation global qui comporte un nombre arbitraire de composants d'animation définis sous la forme d'un tableau
 `animations` :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### Position dans le DOM <a name="placement-in-dom"></a>

`<amp-animation>` peut uniquement être utilisé comme enfant direct de l'élément `<body>` si `trigger="visibility"`. Si `trigger` n'est pas spécifié et que la lecture de l'animation est contrôlée de façon automatisée par le biais de ses actions, l'élément peut être placé n'importe où dans le DOM.

### Composant d'animation <a name="animation-component"></a>

Chaque composant d'animation est un [effet d'image clé](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) et comprend les éléments suivants :

- Élément(s) cible(s) référencé(s) par un sélecteur
- Conditions : requête média et condition d'acceptation
- Propriétés de minutage
- Images clés

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Conditions <a name="conditions"></a>

Les conditions peuvent spécifier si ce composant d'animation est inclus ou non dans l'animation finale.

#### Requête média <a name="media-query"></a>

La requête média peut être spécifiée à l'aide de la propriété `media`. Cette propriété peut contenir toute expression autorisée pour l'API [Window.matchMedia](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia). Elle correspond à la règle CSS `@media`.

Si une valeur est spécifiée pour un composant d'animation, ce dernier n'est inclus que si la requête média correspond à l'environnement actuel.

#### Condition d'acceptation <a name="supports-condition"></a>

La condition d'acceptation peut être spécifiée à l'aide de la propriété `supports`. Cette propriété peut contenir toute expression autorisée pour l'API [CSS.supports](https://developer.mozilla.org/fr/docs/Web/API/CSS/supports). Elle correspond à la règle CSS `@supports`.

Si une valeur est spécifiée pour un composant d'animation, ce dernier n'est inclus que si la condition d'acceptation correspond à l'environnement actuel.

### Instruction `switch` de l'animation <a name="animation-switch-statement"></a>

Dans certains cas, il est pratique d'associer plusieurs [animations conditionnelles](#conditions) à un paramètre par défaut facultatif au sein d'une seule animation. Pour ce faire, utilisez l'instruction d'animation `switch` au format suivant :

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

Dans l'animation `switch`, les candidats sont évalués dans l'ordre défini et la première animation qui correspond aux [instructions conditionnelles](#conditions) est exécutée, tandis que les autres sont ignorées.

Dans l'exemple suivant, une trajectoire d'animation est exécutée (sous réserve de compatibilité) et l'animation revient ensuite à la transformation :
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Variables <a name="variables"></a>

Un composant d'animation peut déclarer des variables CSS qui seront utilisées pour les valeurs d'images clés et de minutage au moyen d'expressions `var()`. Les expressions `var()` sont évaluées à l'aide du contexte cible actuel. Les variables CSS spécifiées dans les composants d'animation sont propagées aux animations imbriquées et appliquées aux cibles d'animation. Elles remplacent ainsi les variables CSS utilisées dans les animations finales.

Par exemple :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

Dans cet exemple :
- `--delay` est propagé dans les animations imbriquées et utilisé comme délai pour l'animation `#target1`.
- `--x` est propagé dans les animations imbriquées, mais remplacé par l'animation `#target1` et utilisé par la suite pour la propriété `transform`.
- `--y` n'est spécifié nulle part dans l'élément `<amp-animation>` et fait donc l'objet d'une requête sur l'élément `#target1`. La valeur `0px` lui est attribuée par défaut s'il n'est pas défini non plus dans les feuilles de style (CSS).

Pour en savoir plus sur `var()`, consultez la [section `var()` et `calc()`](#var-and-calc-expressions).

### Propriétés de minutage <a name="timing-properties"></a>

Les composants d'animation et l'animation de niveau supérieur peuvent contenir des propriétés de minutage. Ces propriétés sont décrites en détail dans la section [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) de la spécification Web Animations. Les propriétés autorisées ici sont les suivantes :

<table>
  <tr>
    <th class="col-twenty">Propriété</th>
    <th class="col-twenty">Type</th>
    <th class="col-twenty">Valeur par défaut</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>durée</td>
    <td>0</td>
    <td>Durée de l'animation. Il peut s'agir d'une valeur numérique exprimée en millisecondes ou d'une valeur temporelle CSS (`2s`, par exemple).</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>durée</td>
    <td>0</td>
    <td>Délai avant le lancement de l'animation. Il peut s'agir d'une valeur numérique exprimée en millisecondes ou d'une valeur temporelle CSS (`2s`, par exemple).</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>durée</td>
    <td>0</td>
    <td>Délai écoulé après l'exécution de l'animation et avant que celle-ci ne soit considérée comme terminée. Il peut s'agir d'une valeur numérique exprimée en millisecondes ou d'une valeur temporelle CSS (`2s`, par exemple).</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>nombre ou<br>"Nombre infini" ou<br>"infini"</td>
    <td>1</td>
    <td>Nombre de répétitions de l'effet d'animation.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>nombre/CSS</td>
    <td>0</td>
    <td>Moment auquel commence l'animation de l'effet.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>chaîne</td>
    <td>"linear"</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">Fonction de minutage</a> utilisée pour graduer le temps afin de générer des effets de lissage de vitesse.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>chaîne</td>
    <td>"normal" </td>
    <td>Les valeurs possibles sont les suivantes : "normal", "reverse", "alternate" et "alternate-reverse".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>chaîne</td>
    <td>"none"</td>
    <td>Les valeurs possibles sont les suivantes : "none", "forwards", "backwards", "both" et "auto".</td>
  </tr>
</table>

Toutes les propriétés de minutage autorisent soit des valeurs de chaîne/numériques directes, soit des valeurs CSS. Pour la propriété "duration", par exemple, la valeur spécifiée peut être `1000`, `1s` ou `1000ms`. `calc()`, `var()` et d'autres expressions CSS sont également autorisées.

Exemple de propriétés de minutage au format JSON :
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

Les composants d'animation héritent des propriétés de minutage spécifiées pour l'animation de niveau supérieur.

### Cibles secondaires <a name="subtargets"></a>

Il est possible de spécifier des cibles secondaires (`subtargets: []`) partout où des propriétés `selector` peuvent être définies. Les cibles secondaires peuvent remplacer les variables ou propriétés de minutage définies dans l'animation par des cibles secondaires spécifiques indiquées au moyen d'un index ou d'un sélecteur CSS.

Par exemple :
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

Dans cet exemple, toutes les cibles correspondant à ".target" ont, par défaut, un délai de 100 ms et une valeur "--y" de 100 px. Cependant, dans la première cible (`index: 0`), le délai est remplacé par 200 ms, tandis que la valeur "--y" des cibles impaires est remplacée par 200 px.

Notez que plusieurs cibles secondaires peuvent correspondre à un seul élément cible.

### Images clés <a name="keyframes"></a>

Les images clés peuvent être spécifiées de différentes manières, décrites dans la [section keyframes](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) de la spécification Web Animations, ou sous la forme d'une chaîne faisant référence au nom `@keyframes` dans la feuille de style.

Vous trouverez, ci-dessous, quelques exemples de définitions d'images clés.

Le format de notation d'objet "to" abrégé spécifie l'état final à 100 % :
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

Le format de notation d'objet "from-to" abrégé spécifie les états de début et de fin à 0 % et à 100 % :
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

Le format de notation d'objet "value-array" abrégé spécifie plusieurs valeurs pour les états de début et de fin, ainsi que plusieurs décalages (équidistants) :
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

La forme de tableau spécifie des images clés. Les décalages sont attribués automatiquement à 0 % et 100 %, et placés à intervalles réguliers entre ces valeurs :
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

La forme de tableau peut également inclure explicitement la propriété "offset" :
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

La forme de tableau peut également inclure la propriété "easing" :
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Pour consulter d'autres formats d'images clés, reportez-vous à la [spécification Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

Les valeurs de propriété acceptent toutes les valeurs CSS valides, y compris `calc()`, `var()` et d'autres expressions CSS.

#### Images clés de la feuille de style <a name="keyframes-from-css"></a>

Vous pouvez également spécifier des images clés dans la feuille de style du document (balise `<style>`) sous la forme d'une règle CSS `@keyframes`. Par exemple :
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

Pour l'essentiel, utiliser des `@keyframes` CSS revient à intégrer la définition d'images clés dans le fichier JSON conformément à la [spécification Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument). Il existe toutefois quelques nuances :

  - Pour une compatibilité multiplate-forme, des préfixes de fournisseur (`@-ms-keyframes {}` ou `-moz-transform`, par exemple) peuvent s'avérer nécessaires. Ces préfixes ne sont ni requis ni autorisés au format JSON, mais ils peuvent être nécessaires dans les feuilles de style.
  - Les plates-formes qui n'acceptent pas les expressions `calc()` et `var()` ne peuvent pas tirer parti des polyfills `amp-animation` lorsque des images clés sont spécifiées dans les feuilles de style. Il est donc recommandé d'inclure systématiquement des valeurs de basculement dans les fichiers CSS.
  - Les extensions CSS telles que [`width()`, `height()`, `num()`, `rand()`, `index()` et `length()`](#css-extensions) ne peuvent pas être utilisées dans les feuilles de style.

#### Propriétés sur liste blanche pour les images clés <a name="allow-listed-properties-for-keyframes"></a>

Certaines propriétés CSS ne peuvent pas être utilisées dans les images clés. Seules les propriétés CSS que les navigateurs les plus récents peuvent optimiser et animer rapidement figurent sur la liste blanche. De nouvelles propriétés seront ajoutées à cette liste à mesure que leurs performances seront confirmées. La liste comprend actuellement les propriétés suivantes :
- [`opacity`](https://developer.mozilla.org/fr/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/fr/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/fr/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/fr/docs/Web/CSS/offset-distance)

Notez que l'utilisation des propriétés CSS avec le préfixe de fournisseur n'est ni nécessaire ni autorisée.

### Formes abrégées de la configuration d'animation <a name="abbreviated-forms-of-animation-configuration"></a>

Si l'animation ne concerne qu'un seul élément et qu'un seul effet d'image clé est suffisant, la configuration peut se limiter à ce seul composant d'animation. Par exemple :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Si l'animation est constituée d'une liste de composants, mais qu'elle ne comporte pas d'animation de niveau supérieur, la configuration peut être réduite à un tableau de composants. Par exemple :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### Composition de l'animation <a name="animation-composition"></a>

Les animations peuvent faire référence à d'autres animations et combiner ainsi plusieurs déclarations `amp-animation` dans une seule animation finale. Le référencement d'une animation à partir d'une autre est pratiquement identique à l'imbrication. Il peut être intéressant de scinder des animations en plusieurs éléments afin de réutiliser la même animation depuis plusieurs emplacements ou simplement de réduire la taille de chaque déclaration d'animation et de permettre ainsi une gestion plus aisée.

Par exemple :
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Cet exemple d'animation associe l'animation "anim2" dans "anim1". L'animation "anim2" est incluse sans cible (`selector`). Dans ce cas, l'animation incluse est censée faire référence à sa propre cible.

Une autre forme permet à l'animation conteneur de fournir une ou plusieurs cibles. Dans ce cas, l'animation incluse est exécutée pour chaque cible correspondante. Par exemple :
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Dans le cas présent, "anim2" "est exécutée pour chaque cible correspondante et ce, que ".target-class" corresponde à un seul élément, à plusieurs ou à aucun.

Les variables et les propriétés de minutage spécifiées dans l'animation de l'appelant sont transmises également à l'animation incluse.

### Expressions `var()` et `calc()` <a name="var-and-calc-expressions"></a>

`amp-animation` permet d'utiliser les expressions `var()` et `calc()` pour les valeurs de minutage et d'images clés.

Par exemple :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

Les propriétés `var()` et `calc()` sont émulées sur les plates-formes avec lesquelles elles ne sont pas directement compatibles. Les propriétés `var()` sont extraites des éléments cibles correspondants. Cependant, il est malheureusement impossible d'émuler complètement `var()`. Par conséquent, si la compatibilité est un critère important, il est vivement conseillé d'inclure des valeurs par défaut dans les expressions `var()`. Par exemple :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay, 100ms)",
  }
]
</script>
</amp-animation>
```

Les composants d'animation peuvent spécifier leurs propres variables en tant que champs `--var-name`. Ces variables sont propagées dans des animations imbriquées et remplacent les variables d'éléments cibles spécifiées au moyen de la feuille de style (balise `<style>`). Les expressions `var()` tentent d'abord de résoudre les valeurs des variables spécifiées dans les animations, puis interrogent les styles cibles.

### Extensions CSS <a name="css-extensions"></a>

`amp-animation` fournit plusieurs extensions CSS pour répondre aux besoins habituels des animations : `rand()`, `num()`, `width()` et `height()`. Ces fonctions peuvent être utilisées partout où les valeurs CSS sont acceptées dans un élément `amp-animation`, y compris les valeurs de minutage et d'images clés.

#### Extension CSS `index()` <a name="css-index-extension"></a>

La fonction `index()` renvoie un index de l'élément cible en cours dans l'effet d'animation. Cela s'avère particulièrement utile lorsque plusieurs cibles sont animées avec le même effet à l'aide de la propriété `selector`. La première cible correspondant au sélecteur se verra attribuer l'index `0`, la deuxième, l'index `1` et ainsi de suite.

Cette propriété peut, entre autres, être associée à des expressions `calc()` et être utilisée pour créer un effet décalé. Par exemple :
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### Extension CSS `length()` <a name="css-length-extension"></a>

La fonction `length()` renvoie le nombre d'éléments cibles dans l'effet d'animation. Cela s'avère particulièrement utile lorsqu'elle est associée à `index()` :

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Extension CSS `rand()` <a name="css-rand-extension"></a>

La fonction `rand()` renvoie une valeur CSS aléatoire. Il en existe deux formes.

La forme sans arguments renvoie simplement un nombre aléatoire compris entre 0 et 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

La deuxième forme comporte deux arguments et renvoie la valeur aléatoire comprise entre ces deux arguments.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Extensions CSS `width()` et `height()` <a name="css-width-and-height-extensions"></a>

Les extensions `width()` et `height()` renvoient la largeur/hauteur de l'élément animé ou de l'élément spécifié par le sélecteur. La valeur renvoyée est indiquée en pixels ; par exemple `100px` .

Les formats suivants sont acceptés :

- `width()` et `height()` : largeur/hauteur de l'élément animé.
- `width('.selector')` et `height('.selector')` : largeur/hauteur de l'élément spécifié par le sélecteur. N'importe quel sélecteur CSS peut être utilisé (`width('#container &gt; li')`, par exemple).
- `width(closest('.selector'))` et `height(closest('.selector'))` : largeur/hauteur de l'élément spécifié par le sélecteur le plus proche.

Les extensions `width()` et `height()` s'avèrent particulièrement utiles pour les transformations. `left`, `top` et les propriétés CSS du même type peuvent utiliser des valeurs `%` pour exprimer des animations proportionnellement à la taille du conteneur. Cependant, la propriété `transform` interprète différemment les valeurs `%` ; à savoir, sous la forme d'un pourcentage de l'élément sélectionné. Par conséquent, les extensions `width()` et `height()` peuvent être utilisées pour exprimer les animations de transformation en termes d'éléments de conteneur et d'éléments semblables.

Ces fonctions peuvent être associées à `calc()`, à `var()` et à d'autres expressions CSS. Par exemple :
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Extension CSS `num()` <a name="css-num-extension"></a>

La fonction `num()` renvoie une représentation numérique d'une valeur CSS. Par exemple :

- `num(11px)` donne `11` ;
- `num(110ms)` donne `110` ;
- etc.

Par exemple, l'expression suivante calcule le délai en secondes proportionnellement à la largeur de l'élément :
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Animations SVG <a name="svg-animations"></a>

Les fichiers SVG sont formidables et leur utilisation est vivement recommandée pour les animations.

Les animations SVG sont acceptées en utilisant les mêmes propriétés CSS que celles décrites dans la section [Propriétés sur liste blanche pour les images clés](#allow-listed-properties-for-keyframes), avec toutefois quelques nuances :

* Les éléments SVG IE et Edge [ne sont pas compatibles avec les propriétés CSS `transform`](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). L'animation `transform` proprement dite est émulée. Toutefois, l'état initial défini dans une feuille de style n'est pas appliqué. Si l'état transformé initial est important dans IE ou Edge, il est recommandé de le dupliquer au moyen de l'[attribut SVG `transform`](https://developer.mozilla.org/fr/docs/Web/SVG/Attribute/transform).
* Bien que l'animation CSS `transform` soit émulée pour IE et Edge, il est malheureusement impossible d'émuler `transform-origin`. Par conséquent, si l'on souhaite bénéficier d'une compatibilité avec IE et Edge, il est recommandé de n'utiliser que l'élément `transform-origin` par défaut.
* Actuellement, la plupart des navigateurs ont des difficultés à interpréter correctement le code CSS `transform-origin`. Consultez les problèmes relatifs à [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) et [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). Ce problème devrait être résolu en grande partie une fois que [CSS `transform-box`](https://developer.mozilla.org/fr/docs/Web/CSS/transform-box) aura été mis en œuvre. Si `transform-origin` constitue un élément important, il est recommandé d'inclure également le code CSS `transform-box` souhaité en vue d'une compatibilité future.

## Déclencher l'animation <a name="triggering-animation"></a>

L'animation peut être déclenchée au moyen d'un attribut `trigger` ou d'une action `on`.

### Attribut `trigger` <a name="trigger-attribute"></a>

Actuellement, `visibility` est la seule valeur disponible pour l'attribut `trigger`. La valeur `visibility` se déclenche lorsque le document sous-jacent ou l'élément intégré sont visibles (dans la fenêtre d'affichage).

Par exemple :
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### Déclenchement via l'action `on` <a name="triggering-via-on-action"></a>

Par exemple :

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Actions `on` <a name="on-actions"></a>

L'élément `amp-animation` exporte les actions suivantes :

* `start` : lance l'exécution de l'animation, s'il y a lieu. Les variables et propriétés de minutage peuvent être spécifiées en tant qu'arguments d'action. Par exemple :
 `anim1.start(delay=-100, --scale=2)`.
* `restart` : démarre l'animation ou relance celle en cours d'exécution. Les variables et propriétés de minutage peuvent être spécifiées en tant qu'arguments d'action. Par exemple : `anim1.start(delay=-100, --scale=2)`.
* `pause` : suspend la lecture de l'animation en cours.
* `resume` : reprend la lecture de l'animation en cours.
* `togglePause` : permet de suspendre/reprendre l'exécution des actions.
* `seekTo` : suspend la lecture de l'animation et recherche le repère temporel spécifié par l'argument `time` en millisecondes ou l'argument `percent` sous la forme d'un pourcentage dans la chronologie.
* `reverse` : inverse l'animation.
* `finish` : met fin à l'animation.
* `cancel` : annule l'animation.
