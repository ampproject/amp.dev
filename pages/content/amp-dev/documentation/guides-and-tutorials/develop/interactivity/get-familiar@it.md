---
'$title': Acquisire dimestichezza con il codice di avvio
$order: 1
description: Una pagina AMP è una pagina HTML con alcune limitazioni per garantire prestazioni affidabili. Le pagine AMP hanno elementi di markup speciali che le identificano come tali.
---

## Boilerplate AMP

Una pagina AMP è una pagina HTML con alcune limitazioni per garantire prestazioni affidabili. Le pagine AMP hanno elementi di markup speciali che le identificano come tali.

Una pagina AMP essenziale ha il seguente aspetto:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] Si può utilizzare il [generatore boilerplate](https://amp.dev/boilerplate) per definire rapidamente la struttura di base per le pagine AMP. Tale strumento fornisce anche frammenti per dati strutturati, per creare PWA (progressive web app) e molto altro! [/tip]

## Componenti AMP

Il codice di avvio nell'esercitazione ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) si basa sulla struttura essenziale di una pagina AMP con il suo contenuto (immagini, testo, ecc.) e include anche alcuni componenti AMP:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://ampjs.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://ampjs.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://ampjs.org/v0/amp-selector-0.1.js"
></script>
```

I componenti AMP offrono funzionalità aggiuntive e componenti dell'interfaccia utente che aggiungono una ricca interattività alle pagine AMP. Il codice di avvio utilizza i seguenti componenti AMP:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): una sequenza di immagini che mostra più visualizzazioni di un prodotto.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): un sistema di modelli per il rendering delle risposte del server a componenti amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): aggiunge funzionalità speciali per gli elementi `<form>` richieste dalle pagine AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): offre uno strumento semantico per selezionare uno o più elementi da un gruppo. Può essere utilizzato come sorgente di input per amp-form.

## Interattività di base

Il codice di avvio offre alcuni elementi per interattività di base:

- La sequenza di immagini (un componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) ) mostra più visualizzazioni di un prodotto.
- I prodotti possono essere aggiunti al carrello dell'utente (tramite componenti [`amp-form`](../../../../documentation/components/reference/amp-form.md)), toccando il pulsante "Aggiungi al carrello" in fondo alla pagina.

**Fai una prova**: fai scorrere la sequenza di immagini e tocca il pulsante "Aggiungi al carrello".
