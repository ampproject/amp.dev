---
"$title": Attivazione di animazioni e transizioni CSS
"$order": '1'
description: "L'attivazione delle animazioni CSS sulle pagine si basa sull'aggiunta e la rimozione di classi, eseguita tramite JavaScript. Lo stesso risultato può essere ottenuto sulle pagine AMP utilizzando l'azione toggleClass ..."
formats:
- websites
- ads
---

Le animazioni CSS consentono agli elementi web di passare da una configurazione di stile CSS all'altra. Il browser può avviare animazioni definite al caricamento, ma le animazioni CSS attivate da eventi si [basano sull'aggiunta e sulla rimozione di classi](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP supporta entrambi i tipi di animazione.

L'uso di oggetti CSS è preferibile in caso di animazioni più piccole e limitate che non richiedono temporizzazioni precise.

## Definizione di CSS e fotogrammi chiave

Le definizioni CSS possono essere inserite in AMP nei seguenti modi:

[filter formats="websites, stories"]

- All'interno di tag `<style amp-custom>` contenuti nell'intestazione del documento. Tali elementi sono limitati a 75.000 byte.
- Stili inline. Ogni istanza di uno stile inline ha un limite di 1.000 byte. Gli stili inline sono conteggiati nel limite di 75.000 byte definito per i componenti `<style amp-custom>`.
- All'interno di tag `<style amp-keyframes>` contenuti nell'intestazione del documento. Tali elementi sono limitati a 500.000 byte e soggetti alle restrizioni delle proprietà dei fotogrammi principali.

[/filter]

[filter formats="ads"]

- All'interno di tag `<style amp-custom>` contenuti nell'intestazione del documento. Tali elementi sono limitati a 20.000 byte.
- Stili inline. Ogni istanza di uno stile inline ha un limite di 1.000 byte. Gli stili inline sono conteggiati nel limite di 20.000 byte definito per i componenti `<style amp-custom>`.
- All'interno di tag `<style amp-keyframes>` contenuti nell'intestazione del documento. Tali elementi sono limitati a 500.000 byte e soggetti alle restrizioni delle proprietà dei fotogrammi principali.

[/filter]

[tip type="read-on"] Ulteriori informazioni sull'utilizzo dei contenuti CSS in AMP sono disponibili nella sezione [Stili e layout](../style_and_layout/index.md). [/tip]

[filter format="websites, stories"] Per mantenere le pagine agili e veloci, AMP applica un limite di 75.000 byte agli elementi CSS nel tag `<amp style-custom>`. Sebbene sia possibile utilizzarli per definire gli stili di animazione, il limite di 500.000 byte all'interno del tag `<amp style-keyframes>` consente animazioni più ricche che non porteranno via preziose risorse di stile nella definizione del sito. [/filter]

[filter format="ads"] Per mantenere gli annunci agili e veloci, AMP applica un limite di 20.000 byte agli elementi CSS nel tag `<amp style-custom>`. Sebbene sia possibile utilizzarli per definire gli stili di animazione, il limite di 500.000 byte all'interno del tag `<amp style-keyframes>` consente animazioni più ricche che non porteranno via preziose risorse di stile nella definizione del sito. [/filter]

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

## Aggiunta, rimozione e attivazione/disattivazione di classi

L'azione AMP `toggleClass` consente l'aggiunta e la rimozione di classi da elementi definiti.

```js
elementName.toggleClass(class="className")
```

Puoi attivare o disattivare una classe sullo stesso elemento con cui desideri che gli utenti interagiscano, ad esempio un menu animato per la scelta di hamburger.

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">
```

L'azione `toggleClass` può essere applicata anche ad altri elementi e permette di passare da una classe all'altra aggiungendo l'attributo `force`.

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

Se è necessario rimuovere una classe ed impedirne altre applicazioni, occorre aggiungere l'attributo `force` con un valore `false`. Se è necessario aggiungere una classe ed impedirne la rimozione, occorre aggiungere l'attributo `force` con un valore `true` .

## Animazioni con elementi CSS e stati

Si possono aggiungere e rimuovere tutte le classi CSS con stati che occorre, utilizzando [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
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
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
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
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

Per pefinire più animazioni di classe, occorre aggiungere dapprima un elenco delle classi CSS all'interno del tag `<style amp-custom>` nella sezione `head` del documento:

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

Quindi occorre abbinare ogni classe a uno stato:

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

E collegare l'elemento con le classi:

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

Gli stati sono cambiati da azioni o eventi AMP collegati. L'esempio seguente cambia lo stato a seguito dell'interazione utente:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

L'uso di [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) in questo modo imposta esplicitamente la classe su quella definita. Non sarà necessario indicare la rimozione di altre classi.
