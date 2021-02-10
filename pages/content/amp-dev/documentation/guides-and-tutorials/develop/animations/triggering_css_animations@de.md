---
'$title': Auslösen von CSS Animationen und Übergängen
$order: 1
description: Das Auslösen von CSS Animationen auf Seiten erfordert das Hinzufügen und Entfernen von Klassen über JavaScript. Du kannst dasselbe Verhalten auf AMP Seiten erzielen, indem du die Aktion toggleClass verwendest …
formats:
  - websites
  - ads
---

CSS Animationen erlauben Webelementen, von einer CSS Stylekonfiguration zu einer anderen zu wechseln. Während der Browser definierte Animationen beim Laden starten kann, sind ereignisgesteuerte CSS Animationen [vom Hinzufügen und Entfernen von Klassen abhängig](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP unterstützt beide Animationstypen.

Verwende CSS, wenn du eine kleinere eingebundene Animation hast, die keine präzise Zeitsteuerung erfordert.

## Definieren von CSS und Keyframes

CSS lässt sich in AMP wie folgt definieren:

[filter formats="websites, stories"]

- Innerhalb des Tags `<style amp-custom>` im Header des Dokuments. Limit 75.000 Byte.
- Inline Styles. Jede Instanz eines Inline Styles hat ein Limit von 1.000 Byte. Inline Styles werden auf das Limit von 75.000 Byte von `<style amp-custom>` angerechnet.
- Innerhalb des Tags `<style amp-keyframes>` im Header des Dokuments. Limit 500.000 Byte. Auf Keyframe Eigenschaften beschränkt.

[/filter]

[filter formats="ads"]

- Innerhalb des Tags `<style amp-custom>` im Header des Dokuments. Limit 20.000 Byte.
- Inline Styles. Jede Instanz eines Inline Styles hat ein Limit von 1.000 Byte. Inline Styles werden auf das Limit von 20.000 Byte von `<style amp-custom>` angerechnet.
- Innerhalb des Tags `<style amp-keyframes>` im Header des Dokuments. Limit 500.000 Byte. Auf Keyframe Eigenschaften beschränkt.

[/filter]

[tip type="read-on"] Mehr Infos über die Verwendung von CSS in AMP findest du in [Style & Layout](../style_and_layout/index.md). [/tip]

[filter formats="websites, stories"] Um deine Seiten schlank und schnell zu halten, hat AMP im Tag `<amp style-custom>` ein CSS Limit von 75.000 Byte festgelegt. Während du dies zum Definieren von Animationsstyles verwenden kannst, ermöglicht das Limit von 500.000 Byte innerhalb des Tags `<amp style-keyframes>` ausführlichere Animationen, die keine wertvollen Ressourcen für den Website Style rauben. [/filter]

[filter formats="ads"] Um deine Ads schlank und schnell zu halten, hat AMP im Tag `<amp style-custom>` ein CSS Limit von 20.000 Byte festgelegt. Während du dies zum Definieren von Animationsstyles verwenden kannst, ermöglicht das Limit von 500.000 Byte innerhalb des Tags `<amp style-keyframes>` ausführlichere Animationen, die keine wertvollen Ressourcen für den Website Style rauben. [/filter]

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

## Klassen hinzufügen, entfernen und umschalten

Die AMP Aktion `toggleClass` ermöglicht es, Klassen für definierte Elemente hinzuzufügen und zu entfernen.

```js
elementName.toggleClass(class="className")
```

Du kannst eine Klasse auf dasselbe Element umschalten, mit dem Benutzer interagieren sollen, z. B. ein animiertes Hamburgermenü.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

Die Aktion `toggleClass` kann auch auf andere Elemente angewendet werden und durch Hinzufügen des Attributs `force` zwischen zwei Klassen umschalten.

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

Wenn du eine Klasse entfernen und eine erneute Anwendung verbieten willst, füge das Attribut `force` mit dem Wert `false` hinzu. Wenn du eine Klasse hinzufügen und das Entfernen verbieten willst, füge `force` mit dem Wert `true` hinzu.

## Mit CSS und Status animieren

Mit [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) kannst du beliebig viele CSS Klassen mit Status hinzufügen und entfernen.

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

Definiere mehrere Klassenanimationen, indem du zuerst eine Liste von CSS Klassen innerhalb des Tags `<style amp-custom>` im `head` des Dokuments hinzufügst:

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

Kopple dann jede Klasse mit einem Status:

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

Verknüpfe anschließend das Element mit den Klassen:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Die Statusvarianten ändern sich bei einer verknüpften AMP Aktion oder eines verknüpften AMP Events. Das folgende Beispiel ändert den Status bei Benutzerinteraktion:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

Wenn du [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) auf diese Weise verwendest, wird die Klasse explizit auf die definierte Klasse gesetzt. Eine Anweisung zum Entfernen anderer Klassen ist nicht erforderlich.
