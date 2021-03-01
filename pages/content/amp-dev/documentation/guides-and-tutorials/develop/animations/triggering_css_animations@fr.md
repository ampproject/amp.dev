---
'$title': Déclencher des animations et des transitions CSS
$order: 1
description: "Le déclenchement d'animations CSS sur les pages repose sur l'ajout et la suppression de classes, via JavaScript. Vous pouvez obtenir le même comportement sur les pages AMP en utilisant l'action toggleClass ..."
formats:
  - websites
  - ads
---

Les animations CSS permettent aux éléments Web de passer d'une configuration de style CSS à une autre. Le navigateur peut démarrer des animations définies lors du chargement, mais les animations CSS déclenchées par un événement [reposent sur l'ajout et la suppression de classes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP prend en charge les deux types d'animation.

Utilisez CSS lorsque vous avez une animation plus petite et contenue qui n'a pas besoin d'être chronométrée avec précision.

## Définition du CSS et des images clés

Vous pouvez définir le CSS dans AMP des manières suivantes:

[filter formats="websites, stories"]

- Dans la balise `<style amp-custom>` dans l'en-tête du document. Limite de 75 000 octets.
- Styles intégrés. Chaque instance d'un style intégré a une limite de 1 000 octets. Les styles intégrés sont pris en compte dans la limite de 75 000 octets `<style amp-custom>`.
- Dans la balise `<style amp-keyframes>` de l'en-tête du document. Limite de 500 000 octets. Limité aux propriétés des images clés.

[/filter]

[filter formats="ads"]

- Dans la balise `<style amp-custom>` de l'en-tête du document. Limite de 20 000 octets.
- Styles en ligne. Chaque instance d'un style intégré a une limite de 1 000 octets. Les styles intégrés sont pris en compte dans la limite de 20 000 octets `<style amp-custom>`.
- Dans la balise `<style amp-keyframes>` de l'en-tête du document. Limite de 500 000 octets. Limité aux propriétés des images clés.

[/filter]

[tip type="read-on"] Vous trouverez plus de détails sur l'utilisation de CSS dans AMP dans la section [Style et mise en page](../style_and_layout/index.md). [/tip]

[filter formats="websites, stories"] Pour alléger et accélérer vos pages, AMP a appliqué une limite CSS de 75 000 octets dans la balise `<amp style-custom>`. Bien que vous puissiez l'utiliser pour définir des styles d'animation, la limite de 500 000 octets à l'intérieur de la balise `<amp style-keyframes>` permet des animations plus détaillées qui ne retireront pas les précieuses ressources de style du site. [/filter]

[filter formats="ads"] Pour alléger et accélérer vos annonces, AMP a appliqué une limite CSS de 20 000 octets dans la balise `<amp style-custom>`. Bien que vous puissiez l'utiliser pour définir des styles d'animation, la limite de 500 000 octets à l'intérieur de la balise `<amp style-keyframes>` permet des animations plus détaillées qui ne retireront pas les précieuses ressources de style du site. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Ajout, suppression et changement de classes

L'action AMP `toggleClass` permet l'ajout et la suppression de classes aux éléments définis.

```js
elementName.toggleClass(class="className")
```

Vous pouvez changer une classe sur le même élément avec lequel vous souhaitez que les utilisateurs interagissent, comme un menu de hamburger animé.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

L'action `toggleClass` peut également s'appliquer à d'autres éléments et basculer entre deux classes en ajoutant l'attribut `force`.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Si vous devez supprimer une classe et interdire qu'elle applique de nouveau, ajoutez l'attribut `force` avec la valeur `false`. Si vous devez ajouter une classe et interdire la suppression, ajoutez `force` avec la valeur `true`.

## Animation avec CSS et état

Vous pouvez ajouter et supprimer le nombre de classes CSS que vous souhaitez avec des états à l'aide de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Définissez plusieurs animations de classe en ajoutant d'abord une liste de classes CSS dans la balise `<style amp-custom>` dans l'en- `head` du document:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Ensuite, associez chaque classe à un état:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

Et liez l'élément aux classes:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Les états changent à partir d'une action ou d'un événement AMP lié. L'exemple suivant modifie l'état à partir de l'interaction de l'utilisateur:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

En utilisant [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) de cette manière, définissez explicitement la classe sur la classe définie. Vous n'aurez pas à lui dire de supprimer d'autres classes.
