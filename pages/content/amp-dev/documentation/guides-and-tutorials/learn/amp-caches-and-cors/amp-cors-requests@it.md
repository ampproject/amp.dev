---
'$title': CORS in AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Molti componenti ed estensioni AMP sfruttano gli endpoint remoti utilizzando
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

Molti componenti ed estensioni AMP sfruttano gli endpoint remoti utilizzando le richieste Cross-Origin Resource Sharing (CORS, Condivisione di risorse tra le origini). Questo documento spiega gli aspetti fondamentali dell'uso di strumenti CORS in AMP. Per ulteriori informazioni sugli strumenti CORS, consultare la [Specifica W3 CORS](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">A cosa servono gli strumenti CORS per la mia origine?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Utilizzo dei cookie per le richieste CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Sicurezza CORS in AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Verifica delle richieste CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Consentire richieste per origini CORS specifiche</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Consentire richieste della stessa origine</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Invio intestazioni di risposta CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Elaborazione delle richieste di modifica dello stato</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Procedura dettagliata di esempio: consegna di richieste e risposte CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Test di strumenti CORS in AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## A cosa servono gli strumenti CORS per la mia origine?<a name="why-do-i-need-cors-for-my-own-origin"></a>

Cerchiamo di approfondire i motivi per cui può servire l'utilizzo di strumenti CORS per le richieste inviate all'origine.

I componenti AMP che recuperano dati dinamici (ad es. amp-form, amp-list e simili) effettuano richieste CORS agli endpoint remoti per recuperare i dati. Se una pagina AMP include tali componenti, le richieste CORS dovranno essere gestire in modo che possano avere buon esito.

Illustriamo il tutto con un esempio:

Supponiamo di avere una pagina AMP con un elenco di prodotti e i relativi prezzi. Per aggiornare i prezzi sulla pagina, l'utente può cliccare un pulsante, che recupera i prezzi più recenti da un endpoint JSON (tramite il componente amp-list). L'elemento JSON si trova nel nostro dominio.

Benissimo, quindi la pagina è _nel nostro dominio_ e il JSON è _nel nostro dominio_. Non dovrebbero esserci problemi!

Un momento, non è detto: come sono arrivati gli utenti alla nostra pagina AMP? Accedono a una pagina memorizzata in una cache? È molto probabile che gli utenti non accedano direttamente alla nostra pagina AMP, ma che l'abbiano invece trovata tramite un'altra piattaforma. Ad esempio, Google Search utilizza la cache AMP Google per eseguire rapidamente il rendering delle pagine AMP; si tratta di pagine memorizzate nella cache AMP Google, che si trova in un dominio _diverso_ dal nostro. Quando l'utente fa clic sul pulsante per aggiornare i prezzi della nostra pagina, la pagina AMP memorizzata nella cache invia una richiesta al nostro dominio di origine per ottenere i prezzi, il che determina una mancata corrispondenza tra le origini (cache -> dominio di origine). Per consentire tali richieste tra origini diverse, è necessario gestire strumenti CORS, altrimenti l'operazione non riesce.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS e cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Va bene, cosa dobbiamo fare allora?**

1. Per le pagine AMP che recuperano dati dinamici, occorre verificare la versione della cache di tali pagine: _non basta fare un test sul nostro dominio_. (Consultare la successiva sezione [Test di richieste CORS in AMP](#testing-cors-in-amp))
2. Seguire le istruzioni riportate in questo documento per gestire le richieste e le risposte CORS.

## Utilizzo dei cookie per le richieste CORS <a name="utilizing-cookies-for-cors-requests"></a>

La maggior parte dei componenti AMP che utilizzano richieste CORS imposta automaticamente la [modalità delle credenziali](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) o consente all'autore di abilitarla facoltativamente. Ad esempio, il componente [`amp-list`](https://amp.dev/documentation/components/amp-list) recupera i contenuti dinamici da un endpoint CORS JSON e consente all'autore di impostare la modalità delle credenziali tramite l'attributo `credentials`.

_Esempio: inclusione di contenuti personalizzati in un elemento amp-list tramite cookie_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Specificando la modalità delle credenziali, l'origine può includere cookie nella richiesta CORS e impostare anche i cookie della risposta (soggetti alle [restrizioni sui cookie di terzi](#third-party-cookie-restrictions) applicabili).

### Restrizioni sui cookie di terzi <a name="third-party-cookie-restrictions"></a>

Le stesse restrizioni sui cookie di terzi specificate nel browser si applicano anche alle richieste CORS dotate di credenziali in AMP. Queste restrizioni dipendono dal browser e dalla piattaforma, ma per alcuni browser l'origine può impostare i cookie solo se l'utente ha precedentemente visitato l'origine in una finestra (principale) del proprietario dei contenuti. O, in altre parole, solo dopo che l'utente ha visitato direttamente il sito web di origine. Data questa premessa, un servizio a cui si accede tramite CORS per impostazione predefinita non sarà in grado di definire cookie.

## Sicurezza CORS in AMP <a name="cors-security-in-amp"></a>

Per garantire richieste e risposte valide e sicure per le pagine AMP, occorre:

1. [Verificare le richieste](#verify-cors-requests).
2. [Inviare le corrette intestazioni di risposta](#send-cors-response-headers).

In caso di utilizzo di Node nel proprio back-end, è possibile utilizzare il [middleware AMP CORS](https://www.npmjs.com/package/amp-toolbox-cors), che fa parte di [AMP Toolbox](https://github.com/ampproject/amp-toolbox) .

### Verifica delle richieste CORS <a name="verify-cors-requests"></a>

Quando il nostro endpoint riceve una richiesta CORS:

1. [Verificare che l'intestazione <code>Origin</code> CORS sia un'origine consentita (origine dell'editore + cache AMP)](#verify-cors-header).
2. [Se non è presente un'intestazione Origin, verificare che la richiesta provenga dalla stessa origine (tramite `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Consentire richieste per origini CORS specifiche <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Gli endpoint CORS ricevono l'origine della richiesta tramite l'intestazione HTTP `Origin`. Gli endpoint dovrebbero consentire solo richieste provenienti da: (1) l'origine dell'editore; e (2) origini di tipo `cacheDomain` elencate in [https://ampjs.org/caches.json](https://ampjs.org/caches.json).

Ad esempio, gli endpoint dovrebbero consentire richieste da:

- Sottodomini della cache AMP Google: `https://<publisher's domain>.cdn.ampproject.org` <br> (ad esempio, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Per ulteriori informazioni sui formati degli URL della cache AMP, consultare queste risorse:

- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Consentire richieste della stessa origine <a name="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

Per richieste della stessa origine in cui manca l'intestazione `Origin`, AMP imposta la seguente intestazione personalizzata:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Questa intestazione personalizzata viene inviata dal sistema runtime AMP quando viene effettuata una richiesta XHR sulla stessa origine (ad esempio, un documento fornito da un URL non memorizzato in cache). Consentire le richieste che contengono l'intestazione `AMP-Same-Origin:true`.

### Invio intestazioni di risposta CORS <a name="send-cors-response-headers"></a>

Dopo aver verificato la richiesta CORS, la risposta HTTP risultante deve contenere le seguenti intestazioni:

##### Access-Control-Allow-Origin: &lt;origin&gt; <a name="access-control-allow-origin-origin"></a>

Tale intestazione è un requisito delle <a href="https://www.w3.org/TR/cors/">Specifiche W3 CORS</a>, in cui <code>origin</code> indica l'origine della richiesta consentita tramite l'intestazione della richiesta <code>Origin</code> CORS (ad esempio, <code>"https://&lt;publisher's subdomain>.cdn.ampproject.org"</code>).

Anche se la specifica W3 CORS consente di restituire il valore <code>\*</code> nella risposta, per una maggiore sicurezza:

- Se l'intestazione `Origin` è presente, occorre convalidare e mostrare il valore dell'intestazione <code>Origin</code>.

### Elaborazione delle richieste di modifica dello stato <a name="processing-state-changing-requests"></a>

[tip type="important"] Eseguire questi controlli di convalida _prima_ di elaborare la richiesta. Questa convalida permette di fornire protezione contro gli attacchi CSRF ed evita l'elaborazione di richieste da origini non attendibili. [/tip]

Prima di elaborare le richieste che potrebbero modificare lo stato del sistema (ad esempio, un utente si iscrive o annulla l'iscrizione a una mailing list), controllare quanto segue:

**Se l'intestazione `Origin` è impostata**:

1. Se l'origine non corrisponde a uno dei seguenti valori, fermare la procedura e restituire una risposta di errore:

   - `<publisher's domain>.cdn.ampproject.org`
   - L'origine dell'editore (cioè la propria)

   dove `*` rappresenta una corrispondenza con caratteri jolly e non un asterisco effettivo (\*).

2. In caso contrario, elaborare la richiesta.

**Se l'intestazione `Origin` NON è impostata**:

1. Verificare che la richiesta contenga l'intestazione `AMP-Same-Origin: true`. Se la richiesta non contiene questa intestazione, interrompere la procedura e restituire una risposta di errore.
2. In caso contrario, elaborare la richiesta.

## Procedura dettagliata di esempio: consegna di richieste e risposte CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Esistono due scenari di cui tenere conto nelle richieste CORS all'endpoint:

1. Una richiesta dalla stessa origine.
2. Una richiesta da un'origine memorizzata in cache (una cache AMP).

Esaminiamo dettagliatamente questi scenari con un esempio. Nel nostro caso, gestiamo il sito `example.com` che ospita una pagina AMP denominata `article-amp.html.` La pagina AMP contiene un componente `amp-list` per recuperare i dati dinamici da un file `data.json` anch'esso ospitato su `example.com`. Vogliamo elaborare le richieste inviate al nostro file `data.json` provenienti dalla nostra pagina AMP. Queste richieste potrebbero provenire dalla pagina AMP sulla stessa origine (non memorizzata nella cache) o dalla pagina AMP su un'origine diversa (memorizzata nella cache).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Esempio CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Origini consentite <a name="allowed-origins"></a>

Basandoci su quello che sappiamo su CORS e AMP (descritto nella precedente sezione [Verifica di richieste CORS](#verify-cors-requests)), nel nostro esempio consentiremo le richieste dai seguenti domini:

- `example.com` --- Dominio dell'editore
- `example-com.cdn.ampproject.org` --- Sottodominio della cache AMP Google

### Intestazioni di risposta per richieste consentite <a name="response-headers-for-allowed-requests"></a>

Per le richieste dalle origini consentite, la nostra risposta conterrà le seguenti intestazioni:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Queste sono intestazioni di risposta aggiuntive che potremmo includere nella nostra risposta CORS:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Pseudo-codice per una richiesta CORS <a name="pseudo-cors-logic"></a>

La logica per la gestione delle richieste e delle risposte CORS può essere esemplificata nel seguente pseudo-codice:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Codice di esempio CORS <a name="cors-sample-code"></a>

Di seguito riportiamo una funzione JavaScript di esempio che potremmo utilizzare per gestire le richieste e le risposte CORS:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Nota**: per un esempio di codice funzionante, consultare [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Scenario 1: ricezione di richieste dalla pagina AMP sulla stessa origine <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Nel seguente scenario, la pagina `article-amp.html` richiede il file `data.json`; le origini sono le stesse.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Esempio CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Esaminando la richiesta, troveremo il seguente codice:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Poiché questa richiesta proviene dalla stessa origine, non è presente alcuna intestazione `Origin`, ma è presente l'intestazione della richiesta AMP personalizzata `AMP-Same-Origin: true`. Possiamo consentire questa richiesta poiché proviene dalla stessa origine (`https://example.com`).

Le nostre intestazioni di risposta saranno:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Scenario 2: ricezione richiesta dalla pagina AMP memorizzata nella cache <a name="scenario-2-get-request-from-cached-amp-page"></a>

Nel seguente scenario, la pagina `article-amp.html` memorizzata nella cache Google AMP richiede il file `data.json`; le origini sono diverse.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Esempio CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Esaminando la richiesta, troveremo il seguente codice:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Poiché questa richiesta contiene un'intestazione `Origin`, verificheremo che proviene da un'origine consentita. Possiamo consentire questa richiesta poiché proviene da un'origine consentita.

Le nostre intestazioni di risposta saranno:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Utilizzo di caratteri memorizzati nella cache <a name="working-with-cached-fonts"></a>

La cache AMP Google memorizza documenti, immagini e caratteri AMP HTML per ottimizzare la velocità delle pagine AMP. Oltre a velocizzare le pagine AMP, vogliamo anche fare attenzione a proteggere le risorse memorizzate nella cache. Apporteremo una modifica al modo in cui la cache AMP risponde con le risorse memorizzate, in genere per i caratteri, in base al valore del parametro `Access-Control-Allow-Origin` dell'origine.

### Vecchio comportamento (fino a ottobre 2019) <a name="past-behavior-before-october-2019"></a>

Quando una pagina AMP sta caricando `https://example.com/some/font.ttf` dall'attributo `@font-face src`, la cache AMP memorizzerà il file dei caratteri e fornirà la risorsa come indicato successivamente con `Access-Control-Allow-Origin` seguito dal carattere jolly.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Nuovo comportamento (a partire da ottobre 2019) <a name="new-behavior-october-2019-and-after"></a>

Dato che l'attuale implementazione è permissiva, ciò potrebbe portare a un utilizzo imprevisto dei caratteri da parte di siti provenienti da più origini. In questa modifica, la cache AMP inizierà a rispondere con lo stesso identico valore `Access-Control-Allow-Origin` con cui risponde il server di origine. Per caricare correttamente i caratteri dal documento AMP memorizzato nella cache, occorrerà accettare l'origine della cache AMP tramite l'intestazione.

Una possibile implementazione può essere la seguente:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Ad esempio, per caricare /some/font.ttf in `https://example.com/amp.html`, il server di origine dovrebbe rispondere con l'intestazione Access-Control-Allow-Origin come mostrato di seguito.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Esempio di carattere CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Se il file dei caratteri è accessibile da qualsiasi origine, è possibile rispondere con un `Access-Control-Allow-Origin` seguito da carattere jolly e anche la cache AMP mostrerà quel valore, cioè risponderà con `Access-Control-Allow-Origin:*`. Se questa impostazione è già definita, non è necessario modificare nulla. [/tip]

Abbiamo programmato di apportare questa modifica intorno alla metà di ottobre 2019 e ci aspettiamo che tutti gli editori AMP che utilizzano caratteri ospitati autonomamente verifichino se la modifica dà impatti.

#### Piano di lancio <a name="roll-out-plan"></a>

- 30/09/2019: il rilascio contiene un controllo più preciso sui domini a cui si applica questa modifica. Questo build dovrebbe essere implementato nel corso di questa settimana.
- 07-10-2019: i domini di prova saranno abilitati per i test manuali.
- 14/10/2019 (o a seconda di come vanno i test): la funzione verrà resa disponibile in generale.

Potremo seguire la relativa [segnalazione qui.](https://github.com/ampproject/amphtml/issues/24834)

## Test di strumenti CORS in AMP <a name="testing-cors-in-amp"></a>

Quando si esegue il test delle pagine AMP, occorre prevedere anche i test dalle versioni memorizzate nella cache di tali pagine.

### Verifica della pagina tramite l'URL della cache <a name="verify-the-page-via-the-cache-url"></a>

Per assicurarsi che la pagina AMP memorizzata nella cache venga visualizzata e funzioni correttamente:

1. Dal proprio browser, aprire l'URL che la cache AMP utilizzerà per accedere alla pagina AMP. Il formato dell'URL della cache può essere ricavato da questo [strumento di AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Per esempio:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Formato URL della cache AMP: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Aprire gli strumenti di sviluppo del proprio browser e verificare che non ci siano errori e che tutte le risorse siano state caricate correttamente.

### Verifica delle intestazioni di risposta del server <a name="verify-your-server-response-headers"></a>

È possibile utilizzare il comando `curl` per verificare che il server invii le intestazioni di risposta HTTP corrette. Nel comando `curl`, occorre fornire l'URL della richiesta e le eventuali intestazioni personalizzate che si vogliono aggiungere.

**Sintassi**: `curl <request-url> -H <custom-header> - I`

#### Test di richieste dalla stessa origine <a name="test-request-from-same-origin"></a>

In una richiesta della stessa origine, il sistema AMP aggiunge l'intestazione personalizzata `AMP-Same-Origin:true`.

Ecco il nostro comando curl per testare una richiesta da `https://ampbyexample.com` al file `examples.json` (sullo stesso dominio):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

I risultati del comando mostrano le intestazioni di risposta corrette (nota: le informazioni aggiuntive sono state tagliate):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Test di richieste da pagine AMP memorizzate nella cache <a name="test-request-from-cached-amp-page"></a>

In una richiesta CORS non proveniente dallo stesso dominio (cioè memorizzata in cache), l'intestazione `origin` fa parte della richiesta.

Ecco il nostro comando curl per testare una richiesta dalla pagina AMP memorizzata nella cache AMP Google al file `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

I risultati del comando mostrano le intestazioni di risposta corrette:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
