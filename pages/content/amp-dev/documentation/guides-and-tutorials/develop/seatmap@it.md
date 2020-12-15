---
"$title": Creazione mappe di posti
"$order": '104'
description: "Le mappe dei posti a sedere sono parti importanti per le app web di vendita di biglietti, ma l'implementazione in AMP può essere difficile. Continua a leggere per imparare come implementare mappe dei posti a sedere in AMP"
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Le mappe dei posti a sedere sono parti importanti per le app web di vendita di biglietti, ma l'implementazione in AMP può essere difficile. Continua a leggere per imparare come implementare mappe dei posti a sedere in AMP usando i componenti AMP disponibili.

[tip] Un esempio reale che implementa le procedure descritte di seguito è disponibile [qui](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Componenti AMP richiesti

Iniziamo esaminando i componenti necessari:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) consente di fare zoom avanti e indietro sui contenuti con doppio tocco e allontanando e avvicinando le dita. Questo componente è la base per l'implementazione delle mappe di posti.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) recupera i contenuti in modo dinamico da un endpoint CORS JSON e li riproduce utilizzando un modello fornito. Può essere utilizzato per accedere alle attuali disponibilità di posti nella mappa, in modo che gli utenti ottengano sempre i dati più recenti.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) aggiunge interattività alla pagina. Qui è utile per tenere traccia di quanti posti sono stati selezionati.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) rappresenta un controllo che presenta un menu di opzioni tra cui l'utente può scegliere. L'intera mappa dei posti a sedere può essere considerata un menu di opzioni in cui ogni posto è un'opzione. Rende molto più semplice la definizione dello stato dei posti selezionati, consentendo l'utilizzo di espressioni CSS. Ad esempio, l'espressione seguente riempie un posto con un colore arancione una volta selezionato.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Requisiti

1. Per disegnare un mappa dei posti come SVG in cui ciascun posto è rappresentato da un elemento `rect`, sono necessarie informazioni su ogni posto: coordinate `x` ed `y` , `width`, `height` ed eventualmente i parametri `rx` e `ry` per arrotondare gli spigoli dei rettangoli.
2. Un identificatore univoco per ciascun posto che può essere utilizzato per effettuare la prenotazione.
3. Le dimensioni di larghezza e altezza dell'intera mappa dei posti da utilizzare nell'attributo `viewbox`.

## Disegno della mappa dei posti

La mappa dei posti è riprodotta tramite i componenti [`amp-list`](../../../documentation/components/reference/amp-list.md) e [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Dopo aver ricevuto i dati dalla chiamata di [`amp-list`](../../../documentation/components/reference/amp-list.md), tali dati possono essere usati per effettuare un ciclo sui posti:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Definizione dello stile dei posti non disponibili

Nell'esempio precedente, `{% raw %}{{unavailable}}{% endraw %}` è il valore di un campo restituito dall'endpoint JSON e utilizzato per realizzare lo stile dei posti non disponibili. Questo approccio non permette di rimuovere attributi quali `option="{{id}}"` in caso di posti indisponibili, poiché il modello non può contenere l'elemento `<html>` dell'intera pagina.

Un approccio alternativo che fornisce più dettagli è quello di ripetere i tag come segue:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Dimensione della mappa dei posti

A meno che le dimensioni della mappa dei posti non siano fisse, è difficile stabilire la dimensione della [`amp-list`](../../../documentation/components/reference/amp-list.md) contenente la mappa. [`amp-list`](../../../documentation/components/reference/amp-list.md) necessita di dimensioni fisse o usa l'attributo`layout="fill"` (per usare lo spazio disponibile del contenitore padre). Esistono due modi per risolvere questo problema:

1. Calcolare lo spazio disponibile sulla pagina quando è noto lo spazio utilizzato da altri componenti come intestazioni e piè di pagina. Questo calcolo può essere fatto in CSS usando l'espressione `calc` e assegnandola come `min-height` di un elemento div padre del componente [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Utilizzare un layout flessibile quando si conosce l'altezza del layout di pagina.

## Stile di amp-pan-zoom

Se si utilizza l'approccio descritto nella sezione precedente, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) deve utilizzare anche l'elemento `layout="fill"`.

[tip type="tip"] **SUGGERIMENTO:** per mantenere un po' di spazio bianco attorno alla mappa dei posti includendolo ancora nell'area di zoom e avvicinamento delle dita:

- Aggiungere un elemento div che contiene l'svg
- Aggiungere spaziatura di riempimento

Senza includere un div di contenimento e aggiungendo il margine all'SVG, non sarà possibile rendere i margini parte dell'area di zoom e avvicinamento dita. [/tip]

## Gestione dello stato dei posti

Quando gli utenti fanno clic su vari posti, è possibile tenere traccia degli `id` dei posti selezionati in una variabile, utilizzando l'elemento `amp-state` in uno dei due seguenti modi:

- Aggiungendo un'espressione [`amp-bind`](../../../documentation/components/reference/amp-bind.md) a ogni posto per aggiungere i posti selezionati a un elenco
- Oppure usando il componente [`amp-selector`](../../../documentation/components/reference/amp-selector.md) con l'azione `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` in modo che tutti i posti selezionati vengano aggiunti a un elenco

Anche se il primo approccio non richiede il componente aggiuntivo [`amp-selector`](../../../documentation/components/reference/amp-selector.md), esso può rendere la mappa dei posti molto lenta, perché ogni espressione [`amp-bind`](../../../documentation/components/reference/amp-bind.md) sarà valutata ogni volta che un posto è selezionato/deselezionato.

Il secondo approccio invece consente di ridurre la duplicazione dell'espressione [`amp-bind`](../../../documentation/components/reference/amp-bind.md) per ogni posto riprodotto nel modello.

## Struttura HTML finale

A titolo di esempio, segue la struttura dell'HTML finale per la mappa dei posti:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
