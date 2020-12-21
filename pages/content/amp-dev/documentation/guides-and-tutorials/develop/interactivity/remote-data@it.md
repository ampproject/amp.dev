---
"$title": Lavorare con dati remoti
"$order": '3'
description: Cosa succede se i dati associabili sono troppo grandi o complessi per essere recuperati al caricamento della pagina? Oppure se ogni SKU avesse un prezzo che richiede ...
toc: 'true'
---

Cosa succede se i dati associabili sono troppo grandi o complessi per essere recuperati al caricamento della pagina? Oppure se ogni SKU avesse un prezzo che richiede troppo tempo per essere trovato? La ricerca dei prezzi per gli SKU di articoli non visualizzati è uno spreco di risorse.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) supporta il recupero di dati remoti tramite il suo attributo [`src`](../../../../documentation/components/reference/amp-bind.md#attributes), che recupera contenuti JSON da un endpoint CORS. Questo recupero viene eseguito una sola volta al caricamento della pagina ed è utile per garantire l'aggiornamento dei dati (specialmente se forniti da una cache).

Si può anche abbinare l'attributo `src` per l'elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Ciò significa che un'azione dell'utente può attivare un recupero di dati JSON remoti nello stato associabile della pagina.

[/tip]

## Recupero di taglie disponibili per le magliette

Sfruttiamo la possibilità di recuperare dati remoti per cercare i prezzi degli SKU nel nostro esempio. Il nostro server di sviluppo Express.js in `app.js` ha già un endpoint `/shirts/sizesAndPrices?shirt=<sku>` che, dato lo SKU delle magliette, restituisce le taglie disponibili e il prezzo per ciascuna taglia. Invia la risposta con un ritardo artificiale di un secondo per simulare la latenza di rete.

Richiesta | Risposta
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Analogamente ai dati JSON all'interno degli elementi [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), i dati remoti restituiti da queste operazioni sono raccolti e resi disponibili nell'attributo `id` dell'elemento. Ad esempio, è possibile accedere ai dati restituiti dalla risposta dell'esempio precedente in un'espressione:

Espressione | Risultato
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Abbinamento dei dati

Ora, applichiamo questo risultato al nostro esempio di commercio elettronico. Per prima cosa recuperiamo i dati della maglietta corrispodente quando viene selezionato un nuovo SKU. Aggiungere un'associazione `[src]` al nostro elemento `amp-state#shirts`:

```html
<!-- Quando `selected.sku` cambia, aggiorna l'attributo `src` e recupera i dati
JSON dal nuovo URL. Poi, raccoglie tali dati in `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicazione delle taglie non disponibili

Successivamente, contrassegniamo come tali le taglie non disponibili per un dato SKU. La classe CSS `"unavailable"` aggiunge una barra diagonale su un elemento: possiamo aggiungerlo agli elementi in [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) corrispondenti alle taglie non disponibili:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- Se la taglia 'XS' è disponibile per l'SKU selezionato, restituisce una stringa vuota.
           Altrimenti, restituisce 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Ora, ricaricare la pagina per fare una prova. Selezionando un nuovo SKU (colore della maglietta), le taglie non disponibili verranno sbarrate (dopo un breve ritardo).

### Specificare gli stati iniziali

C'è un piccolo problema però: che dire della maglietta nera, il colore selezionato per impostazione predefinita? Dovremo aggiungere i dati di taglia e prezzo della maglietta nera a `amp-state#shirts` perché [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) viene eseguito solo in risposta a un'azione esplicita dell'utente:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Inoltre, dovremo aggiornare lo stato predefinito degli elementi coinvolti:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- Se la taglia 'XS' è disponibile per l'SKU selezionato, restituisce una stringa vuota.
           Altrimenti restituisce 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Aggiunge la classe 'unavailable' ai prossimi tre elementi <td>
       per coerenza con le taglie disponibili per lo SKU predefinito. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **NOTA:** [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) non viene eseguito al caricamento della pagina, ma solo in risposta a un'azione esplicita dell'utente. Ciò garantisce che il caricamento della pagina iniziale sia sempre veloce allo stesso modo nelle varie pagine, indipendentemente dall'utilizzo di [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Prezzi variabili delle magliette

Ora che abbiamo visualizzato correttamente le taglie disponibili, assicuriamoci che venga visualizzato anche il prezzo corretto.

Il nostro negozio AMPPAREL è particolare in quanto il prezzo delle magliette è specifico per ciascuna coppia colore-taglia. Ciò significa che abbiamo bisogno di una nuova variabile per monitorare la taglia selezionata dall'utente. Aggiungiamo una nuova azione al nostro elemento [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) per le taglie:

```html
<!-- Quando un elemento è selezionato, imposta la variabile `selectedSize` al
     valore dell'attributo "option" dell'elemento selezionato.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Si noti che non stiamo inizializzando il valore di `selectedSize` tramite l'elemento `amp-state#selected`. Questo perché intenzionalmente non forniamo una taglia selezionata predefinita e vogliamo invece che sia l'utente a scegliere una taglia.

[tip type="tip"] **SUGGERIMENTO:** `AMP.setState()` può essere usato per definire nuove variabili oltre a modificare quelle esistenti. Le espressioni valuteranno le variabili non definite come `null`. [/tip]

Aggiungere un nuovo elemento `<span>` che racchiude l'etichetta del prezzo e modifica il testo predefinito in "---" poiché non esiste alcuna taglia selezionata predefinita.

```html
<h6>PRICE :
  <!-- Mostra il prezzo della maglietta selezionata per la taglia selezionata se disponibile.
       Altrimenti, mostra il testo segnaposto '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

E ora abbiamo anche i prezzi corretti! Fai delle prove.

## Attivazione condizionata del pulsante

Abbiamo quasi finito! Disattiviamo il pulsante "Aggiungi al carrello" quando la taglia selezionata non è disponibile:

```html
<!-- Disattivare il pulsante "AGGIUNGI AL CARRELLO" quando:
     1. Non ci sono taglie selezionate, O
     2. Le taglie disponibili per lo SKU selezionato non sono state ancora recuperate
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Fai una prova**: selezionando una taglia non disponibile, non sarà possibile aggiungerla al carrello.
