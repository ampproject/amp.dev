---
'$title': Introduzione alle animazioni complesse
$order: 2
description: AMP offre diversi componenti specifici per le animazioni che non possono essere gestite aggiungendo e rimuovendo classi. Tali componenti applicano i principi dei contenuti AMP alle animazioni ...
formats:
  - websites
  - ads
author: CrystalOnScript
---

AMP offre diversi componenti specifici per le animazioni che non possono essere gestite [aggiungendo e rimuovendo classi](triggering_css_animations.md). Tali componenti applicano i principi dei contenuti AMP alle animazioni: sono veloci, efficienti e privilegiano la qualità dell'esperienza utente. AMP limita le proprietà CSS consentite all'interno dei fotogrammi principali, ma garantisce vantaggi quali controllo fine, animazioni senza interruzioni e compatibilità su numerosi browser senza necessità di adattamenti aggiuntivi.

Il componente amp-animation può essere usato per controllare strettamente la riproduzione, oltre a consentire una precisa sincronizzazione nei casi in cui più elementi si animano allo stesso tempo.

## Creazione di semplici animazioni AMP

Il componente [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) consente l'utilizzo [dell'API Web Animation](https://www.w3.org/TR/web-animations/) in AMP.

Un componente [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) è un semplice oggetto JSON composto dalle seguenti parti principali:

- L'elemento che il componente sta animando o l'elemento `selector`.
- [Proprietà di temporizzazione](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [Fotogrammi principali](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- [Trigger](/content/amp-dev/documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //seleziona l'elemento da animare
 "duration": "1s", //proprietà di temporizzazione
 "iterations": 2, //proprietà di temporizzazione
 "fill": "both", //proprietà di temporizzazione
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Selettore

Analogamente agli elementi CSS, il componente [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) permette di collegare le proprietà dell'animazione all'elemento, dichiarando il nome del tag, la classe o l'ID dell'elemento nel campo `"selector"`. Il componente anima ogni elemento che presenta la dichiarazione del tipo di tag o del nome della classe. L'uso di un ID assicura la possibilità di animare i singoli elementi.

### Proprietà di temporizzazione

Le [proprietà di temporizzazione](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties) controllano la durata di un'animazione, il numero di volte in cui viene riprodotta e in quale ordine vengono eseguiti i fotogrammi principali.

Nessuna proprietà di temporizzazione è obbligatoria, ma un'animazione potrebbe non essere eseguita correttamente senza la definizione di proprietà relative ai tempi e alla visualizzazione, come `duration` e `fill`.

### Fotogrammi principali

Così come gli oggetti CSS permettono di definire il passaggio da uno stato all'altro delle animazioni tramite transizioni, in AMP occorre dichiarare le proprietà dell'animazione sotto forma di fotogrammi principali da implementare con [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) utilizzabili alle proprietà accelerate GPU che non richiedono una ridefinizione dei layout e sono in grado di effettuare animazioni sul [thread del programma di composizione](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). In tal modo le animazioni non interferiranno con i componenti AMP e con il [processo di rendering](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) del browser.

[tip type="note"] I fotogrammi principali vengono definiti direttamente in [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Trigger

Il trigger è l'elemento che avvia la sequenza di animazione. L'estensione [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) viene avviata quando la sezione `<body>` diventa visibile sulla pagina o collegandola a [un'azione o a un evento AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

L'attivazione basata sulla visibilità della sezione `<body>` è utile quando l'animazione deve essere eseguita non appena la pagina viene caricata perché appare "above the fold" o all'interno della prima finestra di visualizzazione della pagina. Per attivare le animazioni in base alla visibilità, occorre aggiungere l'attributo `trigger="visibility"` al componente.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Le animazioni si collegano a un'azione o a un evento assegnando al componente [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) un `id` e collegando tale `id` al trigger dell'evento desiderato, ad esempio il tocco di un pulsante.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Creazione di animazioni complesse

La realizzazione di animazioni tramite [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) consente un controllo fine delle stesse che non si limita all'avvio e all'arresto dell'animazione: essa potrà anche essere messa in pausa, invertita e diretta in un punto specifico. Si possono persino concatenare più animazioni insieme e animare elementi in sequenza.

### Target secondari

Gli elementi dello stesso tag o classe possono avere proprietà di temporizzazione specificate e sovrascrivere i valori di variabili definite nell'animazione principale.

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
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
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
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### Animazioni concatenate

Si possono collegare numerose animazioni per formare una sequenza più grande. In tal modo è possibile creare effetti temporizzati, ad esempio sovrimpressioni su video, inserendo le animazioni nell'array `animations` all'interno del componente [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md).

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

Questa configurazione riproduce ogni animazione per 3 secondi in sequenza.

Per creare animazioni più grandi, è possibile fare in modo che le animazioni all'interno dell'array `animations` facciano riferimento ad altri componenti [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md).

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

### Animazione di un numero sconosciuto di elementi

L'uso delle [espressioni `var(/content/amp-dev/documentation/components/reference/amp-animation.md#css-extensions) permette di scrivere animazioni complesse e temporizzate che funzionano con un numero qualsiasi di elementi. Ciò consente di animare con facilità e fluidità dati dinamici e generati dagli utenti.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
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
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example]

- Dichiara una variabile `--duration` e le assegna il valore di due secondi.
- Imposta la `duration` al valore della variabile `--duration`.
- Calcola il ritardo applicato a ciascun elemento in modo da soddisfare il selettore `.card`.
  1. L'[estensione `length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension>) calcola quanti elementi `.card` sono stati selezionati
  2. Alla lunghezza viene poi sottratto il valore [index(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension>) di ciascun elemento `.card`
  3. Il valore risultante viene moltiplicato per la variabile `--duration`
  4. Il totale finale viene applicato in secondi come ritardo per l'elemento in questione
- L'animazione viene applicata a ogni singolo elemento in modo che le carte vengano mescolate una dopo l'altra invece che tutte contemporaneamente.

Aprire l'animazione nel playground AMP e aggiungere altri elementi [`amp-img`](../../../../documentation/components/reference/amp-img) per verificare il comportamento dell'esempio.

### Fai sempre le cose in grande

Le animazioni possono comprendere attributi [`conditions`](/content/amp-dev/documentation/components/reference/amp-animation.md#animation-switch-statement).

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
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
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
