---
"$title": Introduction aux animations complexes
"$order": '2'
description: "Pour les animations qui ne peuvent pas être pilotées en ajoutant et en supprimant des classes, AMP propose plusieurs composants spécifiques. Ces composants appliquent les principes d'AMP aux animations ..."
formats:
- websites
- ads
author: CrystalOnScript
---

Pour les animations qui ne peuvent pas être pilotées [en ajoutant et en supprimant des classes](triggering_css_animations.md), AMP propose plusieurs composants spécifiques. Ces composants appliquent les principes d'AMP aux animations: ils sont rapides, efficaces et axés sur l'utilisateur. AMP limite les propriétés CSS autorisées dans les images clés, mais offre des avantages tels qu'un contrôle précis, des animations fluides et une compatibilité entre navigateurs sans travail supplémentaire.

Utilisez amp-animation si vous avez besoin de contrôler complètement la lecture et obtenir une durée précise de plusieurs éléments animés en même temps.

## Créer une animation AMP basique

Le composant [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) permet d'utiliser l' [API Web Animation](https://www.w3.org/TR/web-animations/) dans AMP.

Une [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) basique est un objet JSON composé des éléments clés suivants:

- L'élément que le composant anime, ou `selector`.
- [Propriétés de durée](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Images clés](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Déclencheur](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Sélecteur

Tout comme CSS, le composant [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) lie les propriétés d'animation à l'élément en déclarant le nom de la balise, la classe ou l'identifiant de l'élément dans le champ `« selector »`. Le composant anime chaque élément avec le type de balise ou le nom de classe déclaré. Utilisez un identifiant pour vous assurer d'animer un seul élément.

### Propriétés de durée

Les [propriétés de durée](../../../../documentation/components/reference/amp-animation.md#timing-properties) contrôlent la durée d'une animation, le nombre de fois qu'elle est lue et la direction dans laquelle les images clés s'exécutent.

Aucune propriété de durée n'est requise, mais une animation peut ne pas s'exécuter si des propriétés liées à la durée et à l'affichage sont manquantes, telles que la `duration` et `fill`.

### Images clés

Bien que le CSS vous permette de passer d'un état à un autre via des transitions, vous devez déclarer les propriétés de l'animation comme images clés pour implémenter [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ([similaire aux animations CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Pour assurer une lecture fluide et une compatibilité entre les navigateurs, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [limite les propriétés de l'image clé](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) utilisables aux propriétés accélérées par le GPU qui ne provoquent pas de rediffusion et peuvent s'animer sur le [fil du compositeur](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Cela empêche les animations d'interférer avec AMP et le [processus de diffusion](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) du navigateur.

Les images clés sont soit définies directement dans une [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) soit référencées à partir de [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) pour autant qu'elles respectent les restrictions de propriété. Plus de détails [ici sur les images clés dans `amp-animation`](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Déclencheur

Le déclencheur démarre la séquence d'animation. L'extension [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) démarre soit lorsque le `<body>` devient visible sur la page, soit en le connectant à une [action ou un événement AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

Le déclenchement de la visibilité de `<body>` est utile lorsque l'animation doit s'exécuter dès le chargement de la page car elle apparaît « au-dessus du pli », ou dans la première fenêtre de la page. Les animations se déclenchent grâce à la visibilité en ajoutant `trigger="visibility"` comme attribut au composant.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Les animations se connectent à une action ou à un événement en attribuant au composant [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) un `id` et en liant cet `id` au déclencheur d'événement désiré, tel que l'actionnement d'un bouton.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Créer des animations complexes

Créer une animation dans [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) permet un contrôle précis qui va au-delà du démarrage et de l'arrêt d'une animation: l'on peut également mettre en pause, revenir en arrière et diriger vers un point spécifique. Vous pouvez même enchaîner plusieurs animations et animer des éléments dans une séquence.

### Sous-cibles

Les éléments de la même balise ou classe peuvent avoir des propriétés de durée spécifiées et remplacer les valeurs des variables définies dans l'animation de niveau supérieur.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Animations en chaîne

Plusieurs animations peuvent se connecter pour former une grande séquence. Vous pouvez créer des effets chronométrés, tels que des superpositions sur une vidéo, en écrivant des animations dans le groupe `animations` du composant [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Cette configuration lit chaque animation pendant 3 secondes dans une séquence.

Pour des animations plus volumineuses, les animations à l'intérieur du groupe `animations` peuvent faire référence à d'autres composants [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Animation d'un nombre inconnu d'éléments

En utilisant les expressions [`var()` et `calc()`](../../../../documentation/components/reference/amp-animation.md) avec les [extensions CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), vous pouvez écrire des animations complexes et chronométrées qui fonctionnent avec n'importe quel nombre d'éléments. Cela permet une animation facile et fluide des données dynamiques et des données générées par l'utilisateur.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Déclare une variable, `--duration`, et on lui donne la valeur de deux secondes.
- Définit la `duration` sur la valeur de var `--duration`.
- Calcule le délai appliqué à chaque élément qui répond au sélecteur `.card`.
    1. L'extension [`length()`](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) calcule le nombre d'éléments `.card` sélectionnés
    2. La longueur soustrait ensuite le [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension) de chaque `.card`
    3. La valeur résultante est multipliée par la var `--duration`
    4. Le total final est appliqué en secondes au délai de cet élément
- L'animation est appliquée à chaque élément individuellement afin que les cartes soient mélangées les unes après les autres et non toutes à la fois.

Ouvrez l'animation dans le playground AMP et ajoutez d'autres éléments [`amp-img`](../../../../documentation/components/reference/amp-img) pour tester ce comportement.

### Une apparence impeccable, partout

Les animations peuvent inclure des [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) qui permettent des effets personnalisés. Les animations peuvent être adaptées à n'importe quelle taille d'écran grâce à la [condition](../../../../documentation/components/reference/amp-animation.md#media-query) `media` et permettent une rétrocompatibilité avec les navigateurs en activant la [condition](../../../../documentation/components/reference/amp-animation.md#supports-condition) `supports` dans une [déclaration](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement) `switch`.

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
