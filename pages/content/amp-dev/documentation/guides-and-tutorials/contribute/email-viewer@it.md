---
'$title': Utilizzo di AMP Viewer per il rendering di e-mail
$order: 5
author: alabiaga
formats:
  - email
---

I client di posta elettronica che intendono supportare AMP per e-mail devono utilizzare [AMP Viewer](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) per ospitare le e-mail AMP dei propri mittenti. Un visualizzatore creato con la [libreria AMP Viewer](https://github.com/ampproject/amphtml/tree/main/extensions/amp-viewer-integration) incapsula un documento AMP e abilita delle [funzionalità](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) che consentono la comunicazione bidirezionale con il documento AMP tramite postMessage. Queste funzionalità includono il controllo della visibilità delle e-mail, l'inoltro delle metriche dell'utente e la fornitura di strumenti che garantiscono la sicurezza delle richieste XHR fatte dall'e-mail.

## Intercettazione XHR del visualizzatore

La funzionalità `xhrInterceptor` della libreria AMP Viewer consente al visualizzatore di intercettare le richieste XHR in uscita. AMP Viewer può controllare la validità di una richiesta e la sua capacità di garantire la protezione e la privacy dei suoi utenti.

#### Richieste XHR

Componenti AMP quali [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) e [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email), richiedono chiamate agli endpoint per pubblicare o recuperare dati. Queste chiamate vengono classificate come richieste XHR.

#### Comunicazioni tra visualizzatore e documenti AMP

Il protocollo utilizzato per la comunicazione tra il visualizzatore e il documento AMP è ottenuto tramite [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Di seguito è riportato un semplice esempio di postMessage funzionante nel caso di intercettazioni XHR, in cui un visualizzatore gestisce il postMessage xhr inviato da un documento AMP e restituisce una risposta personalizzata.

```js
// Iframe del visualizzatore che ospita il documento amp.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Abilitazione dell'intercettazione XHR

L'intercettazione xhr può essere abilitata richiedendo il consenso all'attivazione della funzionalità xhrInterceptor in fase di inizializzazione del visualizzatore. Consultare l'esempio sul visualizzatore che esegue questa operazione e un'intercettazione xhr. Il documento AMP deve quindi consentire l'intercettazione XHR. I documenti offrono questa opzione aggiungendo l'attributo `allow-xhr-interception` al tag `<html amp4email>`. Il client di posta elettronica deve impostare questo attributo sul documento AMP prima del rendering, poiché esso è intenzionalmente definito un attributo non valido e verrà contrassegnato come tale dalla convalida del documento AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Rendering del modello sul lato server del visualizzatore

La funzionalità `viewerRenderTemplate` consente al visualizzatore di gestire il rendering dei modelli [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) e [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Quando tale opzione è abilitata, il sistema runtime AMP invia una richiesta tramite proxy contenente la chiamata XHR originale, i dati del modelli e ogni altra informazione dettagliata per il rendering dei contenuti del componente sul visualizzatore. Questo consente al visualizzatore di verificare i dati contenuti nell'endpoint e gestire il rendering dei modelli [mustache](https://mustache.github.io/) con verifica e pulizia dei dati. Se questa funzionalità è abilitata insieme all'xhrInterceptor nei componenti amp-form e amp-list, la funzionalità `viewerRenderTemplate`, la quale invia a sua volta richieste tramite proxy al visualizzatore, agirà in concorrenza con quella di xhrInterceptor.

L'esempio [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) mostra una possibile gestione del messaggio `viewerRenderTemplate` inviato dal documento AMP. In questo esempio, Viewer.prototype.processRequest\_ intercetta il messaggio `viewerRenderTemplate` e, in base al tipo di componente amp disponibile nella richiesta, restituisce il codice html da riprodurre nel seguente formato JSON.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Questo è un esempio banale in cui non vi è alcuna dipendenza dalla libreria [mustache](https://mustache.github.io/) né alcuna pulizia del contenuto.

Il diagramma seguente mostra un esempio più reale di come un documento AMP in un visualizzatore client di posta elettronica con funzionalità `viewerRenderTemplate` potrebbe gestire il rendering del modello [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Il sistema runtime AMP invierà tramite proxy la richiesta di prelievo dei dati del componente [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) al visualizzatore, che a sua volta inoltrerà questa richiesta a un server client di posta elettronica. Il server fornirà questo URL e i risultati dell'URL recuperato attraverso vari servizi, con l'eventuale controllo della validità dell'URL, il contenuto dei dati restituiti da tale URL ed eseguirà il rendering dei modelli [mustache](https://mustache.github.io/) con tali dati. Restituirà quindi il risultato del rendering di tale modello e lo rimanderà al visualizzatore nel seguente formato di risposta JSON.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>Elemento 1 elenco</div> <div class='product' role='listitem'>Elemento 2 elenco</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

Il valore html nel carico utile JSON sarà quello inserito nel documento AMP per il rendering.

La tabella seguente illustra le funzionalità e i componenti interessati:

<table>
  <thead>
    <tr>
      <th width="30%">Funzionalità visualizzatore</th>
      <th>Componenti interessati</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
