---
'$title': Accesso
$order: 1
description: La prima volta che si giunge alla pagina, si potranno vedere 2 commenti e un pulsante di accesso. Cercando il pulsante di accesso nel codice, sarà possibile trovare ...
---

La prima volta che si giunge alla [pagina](../../../../documentation/examples/previews/Comment_Section.html), si potranno vedere 2 commenti e un pulsante di accesso.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Cercando il pulsante di accesso nel codice, sarà possibile trovare:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Il comportamento degli attributi relativi ad [`amp-access`](../../../../documentation/components/reference/amp-access.md) dipende da una configurazione a livello di pagina per [`amp-access`](../../../../documentation/components/reference/amp-access.md) , nel nostro caso, la seguente:

[sourcecode:html]

<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>

[/sourcecode]

L'endpoint di autorizzazione è distribuito nell'ambito di AMPByExample. È compito dell'editore della pagina fornire tale endpoint. In questo esempio, per semplicità, abbiamo implementato una semplice logica per cui alla ricezione di tale richiesta, il server legge il valore di un cookie chiamato `ABE_LOGGED_IN`. Se il cookie non è presente, restituiamo una risposta JSON contenente `loggedIn = false`. Per cui, la prima volta che l'utente raggiunge questa pagina, la richiesta restituirà `loggedIn = false` e la pagina mostrerà il pulsante di accesso.

Dando ancora un'occhiata al codice HTML del pulsante, si può notare che, utilizzando `on="tap:amp-access.login-sign-in"`, specifichiamo che una volta che l'utente tocca il pulsante, deve essere utilizzato l'URL indicato nella risposta JSON di cui sopra:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **NOTA:** è possibile definire diversi URL all'interno del nodo di accesso, in questo caso stiamo definendo il `sign-in` e in seguito definiremo il `sign-out`. [/tip]

Per semplicità, la pagina di accesso è una pagina senza elementi AMP in cui inseriamo i valori di accesso e password. Notare l'utilizzo del tipo di input nascosto `returnURL`, il cui valore è inserito dal server AMPByExample tramite modelli lato server. Il server legge questo valore da un parametro chiamato `return`, che è stato aggiunto automaticamente dalla libreria AMP all'URL di accesso.

Nell'esempio seguente, il valore per il parametro `return` viene aggiunto alla richiesta dopo aver fatto clic sul pulsante di accesso. Tale valore può essere letto utilizzando la console Chrome DevTools e accedendo alla scheda Rete.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Dopo che il server AMPByExample ha ricevuto la richiesta POST dalla pagina di accesso, se il nome utente di accesso e la password sono corretti, esso reindirizza la richiesta al `returnURL` sopra menzionato e aggiunge il parametro `#success=true`. Il sistema di runtime AMP ora può autorizzare la pagina e infine consentire l'aggiunta di un commento.

È importante che sia chiaro cosa fa il sistema runtime AMP e cosa fa il server, poiché l'implementazione del server spetta all''editore della pagina.

Un breve riepilogo:

- Il sistema di runtime AMP aggiunge automaticamente il parametro di ritorno alla richiesta di accesso specificato nell'oggetto JSON di accesso
- Il sistema runtime AMP chiude la pagina di accesso e reindirizza alla pagina specificata dal parametro URL di ritorno
- Il server deve fornire la risposta dopo che l'utente fa clic sul pulsante di accesso

[tip type="tip"] **SUGGERIMENTO:** Una spiegazione più dettagliata di questo flusso si trova anche in [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
