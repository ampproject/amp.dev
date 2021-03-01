---
'$title': "Miglioramento dell'interattività"
$order: 2
description: 'Il codice di avvio fornisce un''esperienza d''uso piuttosto limitata. Ci sono un paio di modi in cui possiamo migliorarlo\: Aggiungere un indicatore che mostri ...'
---

Il codice di avvio fornisce un'esperienza d'uso piuttosto limitata. Ci sono un paio di modi in cui possiamo migliorarlo:

- Aggiungere un indicatore che mostri la diapositiva corrente e il numero totale di diapositive.
- Quando un utente seleziona un colore di magliette diverso, cambiare la sequenza di immagini per mostrare quelle con le magliette del colore selezionato.

Prima dell'introduzione del componente [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), l'aggiunta di funzionalità come queste non era possibile. Facciamo una prova pratica di utilizzo di [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) e aggiungiamo queste nuove funzionalità al nostro codice di esempio!

## Installazione del componente `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) è un componente AMP che offre interattività personalizzata tramite associazione dati ed espressioni di tipo JS. Per usare [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), occorre installarlo nella pagina.

Aprire il file [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) e aggiungere il seguente script all'elenco dei componenti AMP nella sezione `<head>` della pagina:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Aggiunta di un indicatore di diapositive

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) funziona associando gli attributi degli elementi a espressioni personalizzate. Queste espressioni possono fare riferimento allo "stato" (per dati JSON modificabili). Possiamo inizializzare questo stato tramite il componente [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) incluso in [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Inizializzazione dello stato delle diapositive

Inizializziamo una variabile di stato per tenere traccia dell'indice della diapositiva attualmente visualizzata nella sequenza di immagini. Aprire [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) e aggiungere quanto segue all'inizio della sezione `<body>` della pagina (prima della sezione `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

I dati all'interno degli elementi [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) sono accessibili tramite l'ID loro associato. Ad esempio, possiamo fare riferimento a questa variabile con l'espressione nel seguente frammento:

```javascript
selected.slide; // Vale 0.
```

### Aggiornamento di stato delle diapositive

Successivamente, aggiorniamo questa variabile quando l'utente modifica le diapositive nella sequenza, aggiungendo la seguente azione `"on"` all'elemento [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) esistente:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Ora, ogni volta che la diapositiva visualizzata per l'elemento [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) cambia, l'azione `AMP.setState` verrà richiamata con il seguente argomento:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

L'espressione `event.index` calcola il nuovo indice della diapositiva e l'azione `AMP.setState()` unisce il valore letterale di quest'oggetto allo stato corrente. Questo sostituisce il valore corrente di `selected.slide` con il valore di `event.index`.

[tip type="tip"] **SUGGERIMENTO: ** `AMP.setState()` esegue un'aggiunta completa dei valori letterali degli oggetti nidificati. Per maggiori dettagli, consultare la documentazione di [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Abbinamento degli elementi indicatori

Successivamente, utilizziamo questa variabile di stato che tiene traccia della diapositiva attualmente visualizzata e creiamo un indicatore di diapositiva. Trovare l'elemento indicatore di diapositiva (cercando la porzione di codice `<!-- TODO: "Aggiungi un indicatore di diapositiva" -->` ) e aggiungere i seguenti abbinamenti ai suoi figli:

```html
<!-- TODO: "Aggiungi un indicatore di diapositiva" -->
<p class="dots">
  <!-- L'elemento <span> corrispondente alla diapositiva visualizzata
       avrà la classe CSS 'current'. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

L'elemento `[class]` è un abbinamento che modifica l'attributo `class` e può essere usato per aggiungere o rimuovere classi CSS da qualsiasi elemento.

**Provalo**: aggiorna la pagina e cambia diapositiva!

Il cambio della diapositiva nella sequenza causerà:

1. L'attivazione dell'evento `slideChange` ...
2. che efftetua la chiamata dell'azione `AMP.setState` ...
3. che aggiorna la variabile di stato `selected.slide` ...
4. che aggiorna l'abbinamento `[class]` sugli elementi `<span>` dell'indicatore!

Benissimo! Ora abbiamo un indicatore di diapositiva funzionante.

[tip type="success"]

Verificare la possibilità di aggiungere una funzionalità che, quando un utente tocca il punto indicatore di una diapositiva, aggiorni la sequenza di immagini con l'elemento selezionato. Suggeriamo di usare l'evento `tap` e l'abbinamento `[slide]` su [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Modifica delle immagini nella sequenza

Un'applicazione utile sarebbe quella che consente di vedere immagini di magliette di diversi colori quando si cambia il colore selezionato. Con [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) possiamo ottenere tale risultato, abbinando `[src]` agli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md) all'interno di [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Inizializzazione dello stato SKU

Dapprima dobbiamo inizializzare i dati di stato con gli URL di origine dell'immagine delle magliette di ciascun colore. Per farlo usiamo un nuovo elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state):

```html
<!-- Magliette disponibili. Abbina un identificatore di stringa univoco al colore e all'URL dell'immagine. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "nero",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blu",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "marrone",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "verde scuro",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "grigio",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "grigio chiaro",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "blu marino",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "vino",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Questo elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) contiene un oggetto JSON che associa una stringa identificativa della maglietta (cioè uno SKU) al colore e all'URL dell'immagine della maglietta corrispondente. Anche un array JSON funzionerebbe, ma l'utilizzo di un oggetto ci consente di fare alcune cose più interessanti che vedremo presto.

Ora possiamo accedere all'URL dell'immagine tramite l'identificatore di una maglietta. Ad esempio, `shirts['10014'].color` vale `"verde scuro"` e `shirts['10030'].image` restituisce l'URL dell'immagine per la maglietta di colore `"vino"`.

### Tracciamento dello SKU selezionato

Se aggiungiamo un'altra variabile di stato che tiene traccia dello SKU selezionato, possiamo abbinare un'espressione agli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md) per aggiornare i loro attributi `src` quando lo SKU selezionato cambia. Aggiungiamo una nuova chiave `sku` alla struttura JSON dell'elemento `amp-state#selected` esistente:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Aggiornamento dello stato SKU

Aggiungere un'azione "on" all'elemento [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) che aggiorna la variabile `selected.sku` ogni volta che viene selezionato un nuovo colore:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **SUGGERIMENTO:** Questo risultato può essere ottenuto anche aggiungendo azioni `on="tap:AMP.setState(...)` a ciascun figlio [`amp-img`](../../../../documentation/components/reference/amp-img.md) all'interno di [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Uno dei grandi vantaggi dell'uso di [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) è che semplifica il markup come in questo caso. [/tip]

### Abbinamento degli elementi delle immagini

Quindi, aggiungiamo gli abbinamenti agli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Aggiorna gli `src` di ciascun <amp-img> quando la variabile `selected.sku`cambia. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] **NOTA:** In pratica, ogni immagine nella sequenza avrà probabilmente un `src` diverso. Questo potrebbe essere ottenuto sostituendo le singole immagini con un array di immagini. Per semplicità, l'esempio di questa esercitazione utilizza una singola immagine a diversi ingrandimenti. [/tip]

**Fai una prova**: aggiorna la pagina e seleziona un colore diverso per le magliette. Se lo fai, le immagini della sequenza saranno aggiornate per mostrare le magliette del colore selezionato.
