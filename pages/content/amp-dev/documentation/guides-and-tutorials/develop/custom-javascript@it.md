---
$title: Uso di codice JavaScript personalizzato nelle pagine AMP
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: Per le esperienze web che richiedono un elevato livello di personalizzazione, AMP ha creato amp-script, un componente che consente l'uso libero di qualunque codice JavaScript nella pagina AMP, senza compromettere le prestazioni complessive della pagina.
---

AMP cerca di fornire sempre la migliore esperienza a tutti gli utenti del web, favorendo l'uso di componenti efficienti e affidabili pronti per l'uso immediato.

Alcune esperienze web richiedono un elevato livello di personalizzazione che supera le capacità di associazione di stati del componente [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites), ma anche quelle di recupero dinamico dei dati e delle funzioni di modello dei componenti [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) e [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites). Per questi casi speciali, AMP ha creato il componente [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites), che consente l'uso libero di qualsiasi codice JavaScript sulle pagine AMP senza compromettere le prestazioni complessive della pagina.

# Inserimento di JavaScript personalizzato

Le pagine AMP supportano codice JavaScript personalizzato tramite il componente `<amp-script>`. L'esempio seguente mostra come utilizzare `amp-script` con un file JavaScript caricato da un URL:

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://ampjs.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Contenuto iniziale che può essere modificato da JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

Il componente `<amp-script>` registra un [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) da eseguire su un thread separato rispetto alla pagina principale. Il Web Worker riceve una propria copia del DOM tramite l'uso di `amp-script` del [Worker DOM](https://github.com/ampproject/worker-dom). Ciò consente al Web Worker di utilizzare le librerie JavaScript, come [React](https://reactjs.org/) e [jQuery](https://jquery.com/), senza modifiche.

Il componente `amp-script` invia messaggi tra il thread del Web Worker e il thread principale, in modo che eventuali modifiche apportate dall'utente sul DOM principale vengano riprodotte sul falso DOM del Web Worker. A sua volta, il Web Worker può poi aggiornare il falso DOM, le cui modifiche sono poi riportate sul DOM principale.

## Memorizzazione in cache di script personalizzati

La [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) gestisce file JavaScript personalizzati inseriti con `<amp-script>` nello stesso modo in cui gestisce gli script dei componenti AMP. Questo garantisce che nessun codice JavaScript personalizzato possa rallentare la velocità di un documento AMP.

La cache AMP agisce da proxy per i file JavaScript e quindi li recapita. Gli utenti riscontreranno lo stesso livello di prestazioni sia su pagine che fanno uso di `<amp-script>` che su quelle che non lo includono.

# Uso di `<amp-script>`

Per garantire che le pagine AMP vengano caricate con la stessa velocità e con interfacce utente di agevole uso, esistono delle limitazioni all'uso del componente `<amp-script>`.

## Inizializzazione

Il codice JavaScript all'interno del Web Worker consente modifiche minime al DOM durante il caricamento. Le modifiche consentite durante questa fase sono:

- Registrazione dei gestori di eventi.
- Divisione di un nodo di testo in più nodi, per consentire i framework che lo richiedono.

Il DOM all'interno dei tag `<amp-script>` dovrebbe essere quasi identico prima e dopo l'inizializzazione.

Ad esempio, se si inizia con il codice seguente:

```html
<text> Ciao mondo </text>
```

il worker DOM consente lievi modifiche alla struttura ma non al contenuto:

```html
 <text>Ciao </text><text>mondo</text>
```

## Manipolazione del DOM

Per garantire la migliore esperienza dell'utente in totale sicurezza, il componente `amp-script` applica restrizioni sulla manipolazione del DOM.

### Interazioni utente

Quando un utente interagisce con elementi racchiusi in un componente `<amp-script>`, il codice JavaScript personalizzato deve restituire rapidamente le eventuali manipolazioni del DOM. Per impostazione predefinita, le modifiche al DOM sono consentite solo **entro un secondo** dall'interazione iniziale. Un'eccezione importante è quando il codice deve recuperare i dati dalla rete tramite `fetch`. In questo caso è possibile richiedere modifiche del DOM **entro un secondo** dopo che la risposta è stata restituita all'utente. Se uno script tenta di modificare il DOM al di fuori delle finestre temporali consentite, si verificherà un errore irreversibile e il componente `<amp-script>` terminerà il Web Worker. Un componente `<amp-script>` terminato non verrà più eseguito.

### Modifiche non richieste

Non è richiesta alcuna interazione da parte dell'utente per manipolare il DOM se il componente `<amp-script>` ha un'altezza fissa.

## Dimensione script

AMP impone su ogni pagina un limite di 150 kilobyte ai codici JavaScript personalizzati. Questo limite è condiviso tra tutti i componenti `<amp-script>` su quella pagina. Qualsiasi libreria JavaScript esterna deve essere importata in ogni singolo componente `<amp-script>`.

## Scope

Qualsiasi elemento DOM con cui i file JavaScript personalizzati devono interagire deve essere racchiuso tra i tag del componente `<amp-script>`. Questo vale anche per altri componenti AMP. Il componente `<amp-script>` considera l'elemento `document.body` come parte dell'elemento `<amp-script>` e non dell'elemento `<body>` del documento.

Se occorre richiamare `document.body.appendChild(document.createElement('span'))` all'interno dello script importato in un elemento `<amp-script>` nel seguente documento:

```html
<body>
  <p>Ciao!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

il risultato sarà il seguente:

```html
<body>
  <p>Ciao!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## Trigger di eventi

Sono consentiti tutti i trigger di eventi.

## Restrizioni API <a name="api-restrictions"></a>

Alcuni metodi sincroni non sono consentiti nel componente `<amp-script>` e vanno sostituiti con alternative, quali [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Poiché `Element.getBoundingClientRect()` non può essere implementato in un Web Worker, viene fornita un'alternativa asincrona ad esso, `getBoundingClientRectAsync()`. Il metodo `getBoundingClientRectAsync()` restituisce un oggetto [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) invece di restituire direttamente il risultato.

Consultare [questo grafico](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md) per visualizzare le API supportate da WorkerDOM.
