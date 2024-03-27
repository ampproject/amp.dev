---
'$title': Uso di AMP come fonte di dati per i contenuti PWA
$order: 1
description: "Se hai investito in AMP ma non hai ancora realizzato un'App Web progressiva, le tue pagine AMP possono semplificare notevolmente lo sviluppo della tua App Web progressiva."
formats:
  - websites
author: pbakaus
---

Se hai investito in AMP ma non hai ancora realizzato un'App Web progressiva, le tue pagine AMP possono semplificare notevolmente lo sviluppo della tua App Web progressiva. In questa guida imparerai come sfruttare contenuti AMP nelle tue App Web progressive e come utilizzare le pagine AMP esistenti come origine dei dati.

## Da JSON ad AMP

Nello scenario più comune, un'app Web progressiva è un'applicazione di una singola pagina che si collega a un'API JSON tramite Ajax. Questa API JSON restituisce quindi insiemi di dati che determinano la navigazione e il contenuto effettivo per il rendering degli articoli.

Si prosegue quindi con la conversione del contenuto grezzo in codice HTML utilizzabile e con il rendering sul client. Questo processo è costoso e spesso di difficile manutenzione. Invece, puoi riutilizzare le tue pagine AMP già esistenti come origine dei contenuti. Soprattutto, AMP rende possibile questa operazione in poche righe di codice.

## Inclusione di "Shadow AMP" nelle App Web Progressive

Il primo passo è includere una versione speciale di AMP chiamata "Shadow AMP" nella tua App Web Progressiva. Proprio così: si carica la libreria AMP nella pagina di primo livello, ma in realtà essa non controllerà il contenuto di tale livello. "Amplificherà" solo le parti della nostra pagina che gli avrai indicato.

Includere Shadow AMP nell'intestazione della pagina, nel seguente modo:

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://ampjs.org/shadow-v0.js"></script>

[/sourcecode]

### Come si fa a sapere quando l'API Shadow AMP è pronta per l'uso?

Consigliamo di caricare la libreria Shadow AMP con l'attributo `async` attivo. Ciò significa, tuttavia, che sarà necessario utilizzare un determinato approccio per capire quando la libreria è completamente caricata e pronta per essere utilizzata.

Il segnale giusto da osservare è la disponibilità della variabile globale `AMP` e a questo scopo Shadow AMP utilizza un "[approccio asincrono per il caricamento delle funzioni](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)". Consideriamo questo codice:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

Questo codice funzionerà e permetterà di attivare un qualsiasi numero di callback aggiunti in questo modo quando AMP è effettivamente disponibile. Ma vediamo come funziona.

Questo codice si traduce in:

1. "Se window.AMP non esiste, creare un array vuoto per ricavare la sua posizione"
2. "quindi inserire una funzione di callback nell'array che dovrà essere eseguita quando AMP è pronto"

La procedura funziona perché la libreria Shadow AMP, al momento del caricamento effettivo, realizzerà che esiste già una serie di callback in `window.AMP`, quindi gestirà l'intera coda. Eseguendo successivamente più volte la stessa funzione, la procedura funzionerà ancora, poiché Shadow AMP sostituisce `window.AMP` con se stesso e con un metodo `push` personalizzato che attiva semplicemente il callback in modo immediato.

[tip type="tip"] **SUGGERIMENTO:** Per realizzare in pratica l'esempio di codice sopra riportato, consigliamo di racchiuderlo in un elemento Promise e di usare sempre tale Promise prima di lavorare con l'API AMP. Consulta il nostro [codice demo di React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) a titolo di esempio. [/tip]

## Gestione della navigazione nell'App Web Progressiva

Dovrai comunque implementare questo passaggio manualmente. Dopo tutto, spetta a te scegliere come presentare i collegamenti ai contenuti secondo il tuo modello di navigazione: un elenco numerato, un gruppo di schede ecc.

Nello scenario più comune, dovrai prelevare alcuni elementi JSON che restituiscono URL ordinati con alcuni metadati. Alla fine, dovrai terminare con un callback della funzione che si attiva quando l'utente fa clic su uno dei collegamenti. Tale callback dovrebbe includere l'URL della pagina AMP richiesta. Se c'è, sei pronto per il passo finale.

## Uso dell'API AMP Shadow per il rendering di pagine inline

Infine, quando si desidera visualizzare il contenuto dopo un'azione dell'utente, è il momento di prelevare il documento AMP in questione e lasciare il controllo a Shadow AMP. Innanzitutto, puoi implementare una funzione per prelevare la pagina, simile alla seguente:

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] **IMPORTANTE:** Per semplificare l'esempio di codice sopra riportato, abbiamo saltato la gestione degli errori. In realtà devi sempre occuparti efficacemente del rilevamento e della gestione degli errori. [/tip]

Ora che abbiamo un oggetto `Document` pronto per l'uso, è il momento di lasciare il controllo ad AMP per il rendering del documento. Richiedere un riferimento all'elemento DOM che funge da contenitore per il documento AMP, quindi richiamare `AMP.attachShadowDoc()`, in questo modo:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **SUGGERIMENTO:** Prima di passare effettivamente il controllo del documento ad AMP, occorre rimuovere gli elementi della pagina che hanno senso quando si visualizza la pagina AMP in modo autonomo, ma non quando è in modalità incorporata: ad esempio piè di pagina e intestazioni. [/tip]

Ecco fatto! Il rendering della pagina AMP come elemento figlio dell'intera App Web progressiva è perfettamente riuscito.

## Fai pulizia

È probabile che l'utente passi da un contenuto AMP all'altro all'interno della tua App Web progressiva. Quando scarti l'ultima pagina AMP riprodotta, assicurati sempre di segnalarlo ad AMP, in questo modo:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Questo dirà al sistema AMP che non stai più usando il documento, liberando memoria e riducendo il carico della CPU.

## Guardalo in azione

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Puoi vedere lo schema "AMP in PWA" in azione nell'[esempio di React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) che abbiamo creato. Esso garantisce transizioni fluide durante la navigazione e viene fornito con un semplice componente React che racchiude i passi precedenti. Offre il meglio di entrambe le realtà: un codice JavaScript flessibile e personalizzato nell'app Web progressiva e l'uso di AMP per gestire i contenuti.

- Puoi trovare qui il codice sorgente: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Usa il componente React in modo autonomo tramite npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Puoi vederlo in azione qui: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (meglio sul tuo cellulare o sull'emulatore di dispositivi mobili)

Puoi anche vedere un campione di PWA e AMP usando Polymer framework. L'esempio utilizza [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) per incorporare pagine AMP.

- Puoi trovare il codice qui: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Puoi vederlo in azione qui: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
