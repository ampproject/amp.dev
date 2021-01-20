---
$title: amp-list
$category@: dynamic-content
teaser:
  text: scarica i dati in modo dinamico e crea voci di elenco utilizzando un modello.
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



Recupera i contenuti in modo dinamico da un endpoint CORS JSON e li visualizza utilizzando un modello fornito.

<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-list/">esempio di amp-list</a> di AMP By Example</td>
  </tr>
</table>

## Utilizzo <a name="usage"></a>

Il componente `<amp-list>` recupera i contenuti dinamici da un endpoint CORS JSON. La risposta dall'endpoint contiene dati, che vengono visualizzati nel modello specificato.

[tip type="important"]
l'endpoint deve implementare i requisiti indicati nella specifica [Requisiti CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Puoi specificare un modello in uno dei due modi seguenti:

* un attributo `template` che fa riferimento a un ID di un elemento `template` o `script` esistente.
* un elemento `template` o `script` nidificato direttamente all'interno dell'elemento `amp-list`.

Per ulteriori informazioni sui modelli, consulta [Modelli HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

*Esempio: visualizzazione di un elenco dinamico*

Nel seguente esempio, vengono recuperati i dati JSON contenenti URL e titoli e vengono visualizzati i contenuti in un [modello amp-mustache](amp-mustache.md) nidificato.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Ecco il file JSON che abbiamo utilizzato:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Ecco lo stile in cui abbiamo riportato i contenuti recuperati:

```css
    amp-list div[role="list"] {
      display: grid;
      grid-gap: 0.5em;
  }
```

## Comportamento <a name="behavior"></a>

La richiesta viene sempre effettuata dal client, anche se il documento è stato pubblicato dalla cache AMP. Il caricamento viene attivato utilizzando le normali regole AMP in base alla distanza dell'elemento dall'area visibile corrente.

Se `<amp-list>` richiede più spazio dopo il caricamento, richiede al runtime AMP di aggiornarne l'altezza utilizzando il normale flusso AMP. Se il runtime AMP non riesce a soddisfare la richiesta per la nuova altezza, quando disponibile verrà visualizzato l'elemento `overflow`. Tuttavia, tieni presente che il posizionamento tipico degli elementi `<amp-list>` nella parte inferiore del documento garantisce quasi sempre che il runtime AMP possa ridimensionarli.

Per impostazione predefinita, `<amp-list>` aggiunge un ruolo ARIA `list` all'elemento elenco e un ruolo `listitem` agli elementi voce visualizzati tramite il modello.

### Gruppi di XHR <a name="xhr-batching"></a>

AMP raggruppa XMLHttpRequests (XHR) in endpoint JSON. Questo significa che puoi utilizzare una singola richiesta dati JSON come origine dati per più utenti (ad esempio più elementi `<amp-list>`) in una pagina AMP.  Ad esempio, se il tuo `<amp-list>` crea un XHR diretto a un endpoint, mentre l'XHR è in-flight, tutti gli XHR successivi diretti allo stesso endpoint non verranno attivati e restituiranno invece i risultati del primo XHR.

In `<amp-list>` puoi utilizzare l'attributo [`items`](#items-optional) per visualizzare un sottoinsieme della risposta JSON, in modo da avere più elementi `<amp-list>` che visualizzano contenuti diversi ma condividono un solo XHR.

### Specifica di un overflow <a name="specifying-an-overflow"></a>

Facoltativamente, l'elemento `<amp-list>` può contenere un elemento con un attributo `overflow`. Questo elemento viene visualizzato se il runtime AMP non può ridimensionare l'elemento `<amp-list>` come richiesto.

*Esempio: visualizzazione di un overflow quando l'elenco richiede più spazio*

Nel seguente esempio, viene visualizzato un elenco di immagini e titoli. Poiché il contenuto `<amp-list>` richiede più spazio di quello disponibile, il runtime AMP visualizza l'elemento di overflow.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Questo è il codice CSS per l' `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Segnaposto e fallback <a name="placeholder-and-fallback"></a>

Facoltativamente, `<amp-list>` supporta un segnaposto e/o un fallback.

* Un *segnaposto* è un elemento secondario con l'attributo `placeholder`. Questo elemento viene mostrato finché il caricamento `<amp-list>` non viene completato. Se viene fornito anche un fallback, il segnaposto viene nascosto quando `<amp-list>` non viene caricato.
* Un *fallback* è un elemento secondario con l'attributo `fallback`. Questo elemento viene visualizzato se `<amp-list>` non viene caricato.

Per ulteriori informazioni, consulta l'articolo relativo a [segnaposto e fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Tieni presente che un elemento secondario non può essere contemporaneamente un segnaposto e un fallback.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Aggiornamento dei dati <a name="refreshing-data"></a>

L'elemento `<amp-list>` espone un'azione `refresh` a cui gli altri elementi possono fare riferimento negli attributi `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Ridimensionamento dinamico <a name="dynamic-resizing"></a>

##### Sperimentale: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

In alcuni casi, potrebbe essere necessario il ridimensionamento di `<amp-list>` al momento dell'interazione dell'utente, ad esempio quando l'`<amp-list>` contiene un amp-accordion che un utente può toccare, quando le dimensioni dei contenuti della `<amp-list>` cambiano a causa di classi CSS associate o quando il numero di elementi all'interno di un'`<amp-list>` cambia a causa di un attributo `[src]` associato. L'azione `changeToLayoutContainer` gestisce questa situazione modificando l'amp-list in `layout="CONTAINER"` quando si attiva questa azione. Vedi l'esempio di seguito:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

Questa azione è disponibile anche in modalità sperimantale in `amp-list-resizable-children`.

## Attributi <a name="attributes"></a>

##### src (obbligatorio) <a name="src-required"></a>

L'URL dell'endpoint remoto che restituisce il JSON che verrà visualizzato in questo `<amp-list>`. Deve essere un servizio HTTP CORS. Il protocollo dell'URL deve essere HTTPS.

[tip type="important"]
l'endpoint deve implementare i requisiti indicati nella specifica [Requisiti CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

L'attributo `src` può essere omesso se è presente l'attributo `[src]`. Questa funzione è utile per il rendering di contenuti in seguito al gesto di un utente anziché come risultato del caricamento della pagina quando si utilizza [`amp-bind`](amp-bind.md).

##### credentials (facoltativo) <a name="credentials-optional"></a>

Definisce un'opzione `credentials` specificata [dall'API di recupero](https://fetch.spec.whatwg.org/).

* Valori supportati: `omit`, `include`
* Valore predefinito: `omit`

Per inviare le credenziali, passa il valore di `include`. Se questo valore è impostato, la risposta deve rispettare le [linee guida per la sicurezza CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

Ecco un esempio che specifica le credenziali di inclusione per visualizzare contenuti personalizzati in un elenco:

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (facoltativo) <a name="items-optional"></a>

Definisce l'espressione per individuare l'array da visualizzare nella risposta. Si tratta di un'espressione con notazione con punto, che naviga attraverso i campi della risposta JSON.
`<amp-list>` prevede un array per impostazione predefinita; l'attributo `single-item` può essere utilizzato per caricare i dati da un oggetto.

* Il valore predefinito è `"items"`. La risposta prevista è `{items: [...]}`.
* Se la risposta stessa è l'array desiderato, utilizzare il valore `"."`. La risposta prevista è `[...]`.
* La navigazione nidificata è consentita (ad esempio `"field1.field2"`). La risposta prevista è `{field1: {field2: [...]}}`.

Quando viene specificato `items="items"` (impostazione predefinita), la risposta deve essere un oggetto JSON contenente una proprietà array chiamata `"items"`:
```text
{
  "items": [...]
}
```

#### max-items (facoltativo) <a name="max-items-optional"></a>

Un valore intero che specifica la lunghezza massima dell'array di elementi da sottoporre a rendering.
L'array `items` viene troncato alle voci `max-items` se il valore restituito supera `max-items`.

#### single-item (facoltativo) <a name="single-item-optional"></a>

Consente ad `<amp-list>` di trattare il risultato restituito come se fosse un singolo array di elementi. Una risposta oggetto verrà aggregata in un array in modo che `{items: {...}}` si comporti come se fosse `{items: [{...}]}`.

#### reset-on-refresh (facoltativo) <a name="reset-on-refresh-optional"></a>

Visualizza di nuovo l'indicatore di caricamento e il segnaposto quando la sorgente dell'elenco viene aggiornata tramite l'azione `amp-bind` o `refresh()`.

Per impostazione predefinita, questo attributo viene attivato solo per gli aggiornamenti che causano un recupero dalla rete. Per eseguire una reimpostazione per tutti gli aggiornamenti, utilizza `reset-on-refresh="always"`.

#### [is-layout-container] (sperimentale, facoltativo) <a name="binding-optional"></a>

Si tratta di un attributo associabile, che deve sempre essere false per impostazione predefinita. Se impostato su true tramite `bind`, modifica il layout di `<amp-list>` nel layout `CONTAINER`. Questo attributo è utile per gestire il ridimensionamento dinamico per amp-list. Questo attributo non può essere true per impostazione predefinita per lo stesso motivo per cui `<amp-list>` non supporta il layout `CONTAINER`, dato che potrebbe non visualizzare correttamente i contenuti al primo caricamento. Questo attributo è disponibile in modalità sperimentale in `amp-list-resizable-children`. In alternativa, è possibile utilizzare anche l'azione `changeToLayoutContainer`.

#### binding (facoltativo) <a name="is-layout-container-optional"></a>

Per le pagine che utilizzano `<amp-list>` e `amp-bind`, determina se bloccare o meno il rendering al momento della valutazione delle associazioni (ad esempio `[text]`) negli elementi secondari sottoposti a rendering).

Ti consigliamo di utilizzare `binding="no"` o `binding="refresh"` per prestazioni più veloci.

* `binding="no"`: non blocca mai il rendering **(più veloce)**.
* `binding="refresh"`: non blocca il rendering al caricamento iniziale **(veloce)**.
* `binding="always"`: blocca sempre il rendering **(lento)**.

Se l'attributo `binding` non viene fornito, l'impostazione predefinita è `always`.

## Sperimentale: carica altro e scorrimento continuo (amp-list-load-more) <a name="common-attributes"></a>

Abbiamo introdotto l'esperimento `amp-list-load-more` come implementazione per l'impaginazione e lo scorrimento continuo in `<amp-list>`. Puoi abilitare questa funzione attivando l'esperimento 'amp-list-load-more' nella [pagina degli esperimenti](https://cdn.ampproject.org/experiments.html) e aggiungendo l'attributo `load-more` a `<amp-list>`. Si tratta di una funzione attualmente in prova di origine e le API finali potrebbero cambiare.

#### Esempi di utilizzo <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Per esempi pratici, consulta [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) e [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html).

### Attributi <a name="sample-usage"></a>

#### load-more (obbligatorio) <a name="attributes-1"></a>

Questo attributo accetta due valori: "automatico" o "manuale". Impostando il valore di questo attributo su "manuale", verrà visualizzato un pulsante "load-more" alla fine di `<amp-list>`. Impostando il valore di questo attributo su "automatico", `<amp-list>` caricherà automaticamente più elementi tre visualizzazioni più in basso per un effetto di scorrimento continuo.

#### load-more-bookmark (facoltativo) <a name="load-more-mandatory"></a>

Questo attributo specifica un nome di campo nei dati restituiti che fornirà l'URL degli elementi successivi da caricare. Se questo attributo non è specificato, `<amp-list>` prevede che il payload json avrà il campo `load-more-src`, che corrisponde al successivo URL da caricare. Nel caso in cui a questo campo venga attribuito un altro nome, puoi specificarlo tramite il campo `load-more-bookmark`. Nel seguente esempio di payload, si dovrà specificare `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Personalizzazione degli elementi load-more <a name="load-more-bookmark-optional"></a>

`<amp-list>` con l'attributo `load-more` contiene i seguenti elementi di interfaccia utente: un pulsante di caricamento di altri elementi, un programma di caricamento, un elemento di caricamento non riuscito e un'immagine statica finale facoltativa che indica la fine dell'elenco. Questi elementi possono essere personalizzati fornendo elementi `<amp-list-load-more>` come elementi secondari di `<amp-list>` con i seguenti attributi:

#### Pulsante load-more <a name="customizing-load-more-elements"></a>

Elemento `<amp-list-load-more>` con l'attributo `load-more-button`, che compare alla fine dell'elenco (per il caricamento manuale di altri elementi) se sono presenti più elementi da caricare. Se fai clic su questo elemento, viene attivato un recupero per caricare più elementi dall'URL contenuto nel campo `load-more-src` o nel campo dei dati restituiti corrispondente all'attributo `load-more-bookmark`. Questo elemento può essere personalizzato fornendo `<amp-list>` con un elemento secondario contenente l'attributo `load-more-button`.

##### Esempi: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  Può essere basato su modelli tramite `amp-mustache`.

##### Esempi: <a name="example"></a>

```html
{% raw %}
<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Questo elemento è un programma di caricamento che verrà visualizzato se l'utente raggiunge la fine dell'elenco e i contenuti sono ancora in fase di caricamento o come risultato del clic sull'elemento `load-more-button` (mentre i nuovi elementi secondari dell'`<amp-list>` sono ancora in fase di caricamento). Questo elemento può essere personalizzato fornendo `<amp-list>` con un elemento secondario che ha l'attributo `load-more-loading`. Ad esempio:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Elemento `<amp-list-load-more>` con l'attributo `load-more-failed`, che contiene un pulsante con l'attributo `load-more-clickable`, il quale verrà visualizzato nella parte inferiore dell'`<amp-list>` in caso di caricamento non riuscito. Facendo clic su questo elemento viene attivato un nuovo caricamento dell'URL non riuscito. Questo elemento può essere personalizzato fornendo `<amp-list>` con un elemento secondario che presenta l'attributo `load-more-failed`. Ad esempio:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

Nell'esempio precedente, l'intero elemento `load-more-failed` è cliccabile. Tuttavia, uno schema comune per questo elemento è un elemento generico "caricamento non riuscito" non cliccabile, che contiene un pulsante "ricarica" cliccabile. Per tenere conto di questa situazione, puoi avere un elemento generalmente non cliccabile con un pulsante che contiene l'elemento `load-more-clickable`. Ad esempio:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Questo elemento non viene fornito per impostazione predefinita, ma se un elemento `<amp-list-load-more>` contenente l'attributo `load-more-end` è associato ad `<amp-list>` come elemento secondario, questo elemento verrà visualizzato nella parte inferiore di `<amp-list>` se non vi sono altri elementi.  Questo elemento può essere basato su un modello tramite `amp-mustache`. Ad esempio:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulazioni! Sei arrivato alla fine! /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### attributi comuni <a name="load-more-end"></a>

Questo elemento include [attributi comuni](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estesi ai componenti AMP.

## Sostituzioni <a name="substitutions"></a>

`<amp-list>` consente tutte le sostituzioni di variabili URL standard.
Per ulteriori informazioni, consulta la [Guida alle sostituzioni](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

Ad esempio:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
potrebbe effettuare una richiesta di tipo `https://foo.com/list.json?0.8390278471201`, in cui il valore RANDOM è generato casualmente a ogni impressione.

## Convalida <a name="validation"></a>

Consulta le [regole amp-list](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) nella specifica dello strumento di convalida AMP.
