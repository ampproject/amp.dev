---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Descrizione</strong></td>
    <td>Consente di creare tag <code>form</code> e <code>input</code>.</td>
  </tr>
  <tr>
    <td><strong>Script obbligatorio</strong></td>
      <td><code>&lt;script async custom-element="amp-form" src="https://ampjs.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Layout supportati</a></strong></td>
    <td>N/D</td>
  </tr>
  <tr>
    <td><strong>Esempi</strong></td>
    <td>Vedi esempi di <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> di AMP By Example.</td>
  </tr>
</table>


# Comportamento <a name="behavior"></a>

L'estensione `amp-form` consente di creare moduli (`<form>`) per inviare campi di inserimento in un documento AMP. L'estensione `amp-form` fornisce anche il [polyfill](#polyfills) per alcuni comportamenti mancanti nei browser.

[tip type="important"]
se invii dati nel modulo, l'endpoint del server deve implementare i requisiti per la [sicurezza CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Prima di creare un `<form>`, devi includere lo script richiesto per l'estensione `<amp-form>`, altrimenti il documento non sarà valido. Se utilizzi tag `input` per scopi diversi dall'invio dei loro valori (ad esempio, gli input non all'interno di un `<form>`), non devi caricare l'estensione `amp-form`.

Ecco un esempio di un modulo di base:

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Attributi <a name="attributes"></a>

# target <a name="target"></a>

Indica dove visualizzare la risposta del modulo dopo averlo inviato. Il valore deve essere `_blank` o `_top`.

# azione <a name="action"></a>

Specifica un endpoint del server per gestire l'input del modulo. Il valore deve essere un URL `https` (assoluto o relativo) e non deve essere un link a un CDN.

* Per `method=GET`: utilizza questo attributo o [`action-xhr`](#action-xhr).
* Per `method=POST`: utilizza l'attributo [`action-xhr`](#action-xhr).

[tip type="note"]
Gli attributi `target` e `action` vengono utilizzati solo per le richieste GET non xhr. Il runtime AMP utilizzerà `action-xhr` per effettuare la richiesta e ignorerà `action` e `target`. Quando `action-xhr` non viene fornito, AMP effettua una richiesta GET all'endpoint `action` e utilizza `target` per aprire una nuova finestra (se `_blank`). Il runtime AMP potrebbe anche eseguire una procedura di riserva utilizzando `action` e `target` nei casi in cui l'estensione `amp-form` non viene caricata.
[/tip]

# action-xhr <a name="action-xhr"></a>

Specifica un endpoint del server per gestire l'input del modulo e inviarlo tramite XMLHttpRequest (XHR). Una richiesta XHR (a volte chiamata richiesta AJAX) è quella in cui il browser effettua la richiesta senza caricare completamente la pagina o aprirne una nuova. I browser invieranno la richiesta in background utilizzando l'[API Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) quando disponibile e le procedure di riserva all'[API XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) per i browser meno recenti.

[tip type="important"]
l'endpoint XHR deve implementare i requisiti per la [sicurezza CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Questo attributo è obbligatorio per `method=POST` ed è facoltativo per `method=GET`.

Il valore di `action-xhr` può essere lo stesso o un endpoint diverso da `action` e presenta gli stessi requisiti `action` precedenti.

Per ulteriori informazioni su come reindirizzare l'utente dopo aver inviato correttamente il modulo, consulta la sezione [Reindirizzamento a seguito di un invio](#redirecting-after-a-submission).

# Altri attributi del modulo <a name="other-form-attributes"></a>

Tutti gli altri [attributi del modulo](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) sono facoltativi.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Si tratta di un attributo facoltativo che abilita e seleziona una strategia di generazione di rapporti di convalida personalizzati. I valori validi sono: `show-first-on-submit`, `show-all-on-submit` o `as-you-go`.

Per ulteriori dettagli, consulta la sezione [Convalida personalizzata](#custom-validations).

# Input e campi <a name="inputs-and-fields"></a>

**Consentiti**:

* Altri elementi relativi ai moduli, tra cui: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>` e così via.
* `<input type=password>` e `<input type=file>` all'interno di `<form method=POST action-xhr>`.
* [`amp-selector`](amp-selector.md)

**Non consentiti**:

* `<input type=button>`, `<input type=image>`
* La maggior parte degli attributi relativi ai moduli negli input, tra cui: `form`, `formaction`, `formtarget`, `formmethod` e altri.

(In futuro alcune di queste regole potrebbero essere rese più flessibili; [contattaci](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#suggestions-and-feature-requests) se ne hai bisogno fornendoci casi d'uso).

Per informazioni dettagliate su campi e input validi, consulta le [regole relative ad amp-form](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) nella specifica dello strumento di convalida AMP.

# Azioni <a name="actions"></a>

L'elemento `amp-form` espone le seguenti azioni:

| Azione | Descrizione |
|--------|-------------|
| `submit` | Consente di attivare l'invio del modulo in seguito a una determinata azione, ad esempio toccando un link o [inviando un modulo alla modifica dell'input](#input-events). |
| `clear` | Elimina i valori da ogni input nel modulo. In questo modo gli utenti possono compilare rapidamente i moduli una seconda volta. |

[tip type="read-on"]
ulteriori informazioni su [Azioni ed eventi in AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).
[/tip]

# Eventi <a name="events"></a>

`amp-form` espone i seguenti eventi:

| Evento | Attivato quando |
|-------|-------------|
| `submit` | Il modulo viene inviato e prima che l'invio sia completato. |
| `submit-success` | L'invio del modulo viene eseguito e la risposta è positiva. |
| `submit-error` | L'invio del modulo è terminato e la risposta è un errore. |
| `verify` | Viene avviata la verifica asincrona. |
| `verify-error` | La verifica asincrona viene eseguita e la risposta è un errore. |
| `valid` | Lo stato di convalida del modulo diventa "valido" (in conformità alla sua [strategia di generazione rapporti](#reporting-strategies)). |
| `invalid` | Lo stato di convalida del modulo diventa "invalido" (in conformità alla sua [strategia di generazione rapporti](#reporting-strategies)). |

Questi eventi possono essere utilizzati tramite l'[attributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

Ad esempio, quanto segue prende in considerazione gli eventi `submit-success` e `submit-error` e mostra lightbox diversi a seconda dell'evento:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Vedi l'[esempio completo qui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Eventi di input <a name="input-events"></a>

AMP espone gli eventi `change` e `input-debounced` sugli elementi `<input>` secondari. Ciò consente di utilizzare l'[attributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) per eseguire un'azione su qualsiasi elemento quando un valore di input cambia.

Ad esempio, un caso d'uso comune è inviare un modulo alla modifica dell'input (selezionare un pulsante di opzione per rispondere a un sondaggio, scegliere una lingua da un input `select` per tradurre una pagina e così via).

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

Vedi l'[esempio completo qui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Trigger di Analytics <a name="analytics-triggers"></a>

L'estensione `amp-form` attiva i seguenti eventi che puoi monitorare nella configurazione [Analytics per AMP](amp-analytics.md):

| Evento                     | Attivato quando                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Viene avviata una richiesta di modulo.      |
| `amp-form-submit-success` | Si riceve una risposta positiva (ad esempio, quando la risposta ha uno stato di `2XX`). |
| `amp-form-submit-error`   | Si riceve una risposta non riuscita (ad esempio, quando la risposta non ha uno stato di `2XX`). |

Puoi configurare Analytics per inviare questi eventi, come nel seguente esempio:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Tutti e tre gli eventi generano un insieme di variabili che corrispondono al modulo specifico e ai campi del modulo. Queste variabili possono essere utilizzate in Analytics.

Ad esempio, il seguente modulo ha un solo campo:

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Comment">
    </form>
```

Quando si attiva l'evento `amp-form-submit`, `amp-form-submit-success` o `amp-form-submit-error`, vengono generate le seguenti variabili contenenti i valori specificati nel modulo:

* `formId`
* `formFields[comment]`

# Visualizzazione di risposta positiva o di errore <a name="successerror-response-rendering"></a>

Puoi eseguire la visualizzazione delle risposte positive o di errore nel modulo utilizzando [modelli estesi](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates), ad esempio [amp-mustache](amp-mustache.md), o risposte positive tramite associazione di dati con [amp-bind](amp-bind.md) e i seguenti attributi di risposta:

| Attributo di risposta | Descrizione |
|-----------|---------------------|
| `submit-success` | Può essere utilizzato per visualizzare un messaggio di successo se la risposta ha esito positivo (ad esempio, lo stato è `2XX`). |
| `submit-error` | Può essere utilizzato per visualizzare un errore di invio se la risposta non va a buon fine (cioè non ha lo stato `2XX`).  |
| `submitting` | Può essere utilizzato per visualizzare un messaggio quando il modulo viene inviato. Il modello di questo attributo ha accesso ai campi di input del modulo per qualsiasi scopo di visualizzazione. Consulta l'[esempio di modulo completo di seguito](#example-submitting) per informazioni su come utilizzare l'attributo `submitting`. |

# Per eseguire la visualizzazione delle risposte con i modelli: <a name="to-render-responses-with-templating"></a>

* Applicare un attributo di risposta a *qualsiasi elemento secondario diretto* dell'elemento `<form>`.
* Eseguire la visualizzazione della risposta nell'elemento secondario includendo un modello tramite il tag `<template></template>` o `<script type="text/plain"></script>` oppure facendo riferimento a un modello con un attributo `template="id_of_other_template"`.
* Fornisci un oggetto JSON valido per le risposte a `submit-success` e `submit-error`. Sia le risposte di successo che quelle di errore devono avere un'intestazione `Content-Type: application/json`.

<a id="example-submitting"></a>

# Esempio: il modulo visualizza messaggi di esito positivo, errore e di invio <a name="example-form-displays-success-error-and-submitting-messages"></a>

Nel seguente esempio, le risposte vengono visualizzate in un modello incorporato all'interno del modulo.

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        C'è un errore nel modulo.
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Invio del modulo in corso... Grazie per aver aspettato {{nome}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Operazione riuscita. Grazie {{name}} per esserti iscritto. Assicurati di controllare l'email {{email}} per confermare. Dopodiché ti invieremo articoli settimanali su {{#interests}} <b>{{name}}</b> {{/interests}}.
    </template>
  </div>
  <div submit-error="">
    <template type="amp-mustache">
      Ops! {{name}}, {{message}}.
    </template>
  </div>
</form>
{% endraw %}
```

L'endpoint `action-xhr` del publisher restituisce le seguenti risposte JSON:

In caso di esito positivo:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

In caso di errore:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

È possibile eseguire la visualizzazione delle risposte in un modello di riferimento definito in precedenza nel documento utilizzando l'ID del modello come valore dell'attributo `template`, impostato sugli elementi con gli attributi `submit-success` e `submit-error`.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Iscrizione riuscita! Grazie {{name}} per esserti iscritto. Assicurati di controllare l'email {{email}} per confermare. Dopodiché ti invieremo articoli settimanali su {{#interests}} <b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Ops! {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

Vedi l'[esempio completo qui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Eseguire la visualizzazione di una risposta positiva con associazione dati <a name="to-render-a-successful-response-with-data-binding"></a>

* Utilizza l'[attributo on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) per associare l'attributo del modulo *submit-success* ad [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* Utilizza la proprietà `event` per acquisire i dati della risposta.
* Aggiungi l'attributo di stato all'elemento desiderato per associare la risposta del modulo.

Nel seguente esempio è riportata una risposta `submit-success` con modulo con [`amp-bind`](amp-bind.md):
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Quando il modulo viene inviato correttamente, viene restituita una risposta JSON simile alla seguente:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
  }
```
Quindi `amp-bind` aggiorna il testo dell'elemento `<p>` per farlo corrispondere allo stato `subscibe`:

```html
...
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# Il reindirizzamento dopo un invio <a name="redirecting-after-a-submission"></a>

Dopo che gli utenti hanno inviato correttamente il modulo puoi reindirizzarli su una nuova pagina impostando l'intestazione di risposta `AMP-Redirect-To` e specificando un URL di reindirizzamento. L'URL di reindirizzamento deve essere un URL HTTPS, altrimenti AMP genererà un errore e il reindirizzamento non si verificherà.  Le intestazioni delle risposte HTTP sono configurate tramite il server.

Assicurati di aggiornare la risposta `Access-Control-Expose-Headers` per includere `AMP-Redirect-To` nell'elenco delle intestazioni consentite.  Ulteriori informazioni sulle intestazioni in [Sicurezza CORS in AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

*Esempi di intestazioni di risposta:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
Su AMP By Example consulta [Invio di moduli con aggiornamento](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) e [Pagina del prodotto](https://ampbyexample.com/samples_templates/product_page/#product-page) per esempi in cui si utilizza il reindirizzamento dopo l'invio di un modulo.
[/tip]

# Convalide personalizzate <a name="custom-validations"></a>

L'estensione `amp-form` consente di creare una propria interfaccia utente di convalida personalizzata utilizzando l'attributo di `custom-validation-reporting` con una delle seguenti strategie di generazione di rapporti: `show-first-on-submit`, `show-all-on-submit` o `as-you-go`.

Per specificare la convalida personalizzata nel modulo, procedi nel seguente modo:

1. Imposta l'attributo di `custom-validation-reporting` nel `form` su una delle [strategie di generazione dei rapporti di convalida](#reporting-strategies).
1. Fornisci un'interfaccia utente di convalida personalizzata contrassegnata con attributi speciali. AMP rileva gli attributi speciali e li segnala al momento giusto in base alla strategia di generazione dei rapporti specificata.

Ad esempio:

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Per ulteriori esempi, consulta [esempi/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

Per i messaggi di convalida, se l'elemento non presenta contenuti di testo al suo interno, AMP lo compilerà con il messaggio di convalida predefinito del browser. Nell'esempio precedente, quando l'input `name5` è vuoto e viene attivata la convalida (ovvero, l'utente ha tentato di inviare il modulo) AMP compila `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` con il messaggio di convalida del browser e mostra quello `span` all'utente.

[tip type="important"]
devi fornire la tua interfaccia utente di convalida per ogni tipo di stato non valido che l'input potrebbe avere. Se non sono presenti, gli utenti non vedranno alcun `custom-validation-reporting` per lo stato di errore mancante. Gli stati di validità sono disponibili nella [documentazione ufficiale sui rapporti di convalida HTML del W3C](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# Strategie di generazione dei rapporti <a name="reporting-strategies"></a>

Specifica una delle seguenti opzioni di generazione dei rapporti per l'attributo `custom-validation-reporting`:

# Mostra prima al momento dell'invio <a name="show-first-on-submit"></a>

L'opzione di generazione del rapporto `show-first-on-submit` riproduce il comportamento predefinito del browser quando viene attivata la convalida predefinita. Mostra il primo errore di convalida rilevato e si ferma lì.

# Mostra tutto al momento dell'invio <a name="show-all-on-submit"></a>

L'opzione di generazione dei rapporti `show-all-on-submit` visualizza tutti gli errori di convalida di ogni input non valido quando il modulo viene inviato. Questa funzione è utile se vuoi visualizzare un riepilogo delle convalide.

# Opzione di visualizzazione durante la compilazione <a name="as-you-go"></a>

L'opzione di generazione dei rapporti `as-you-go` consente all'utente di visualizzare i messaggi di convalida mentre interagisce con l'input. Ad esempio, se l'utente digita un indirizzo email non valido visualizzerà immediatamente l'errore.  Una volta corretto il valore, l'errore scompare.

# Interazione e invio <a name="interact-and-submit"></a>

L'opzione di generazione dei rapporti `interact-and-submit` combina il comportamento di `show-all-on-submit` e `as-you-go`. I singoli campi mostreranno eventuali errori subito dopo le interazioni e, al momento dell'invio, il modulo mostrerà gli errori in tutti i campi non validi.

# Verifica <a name="verification"></a>

La convalida HTML5 fornisce feedback basati solo sulle informazioni disponibili nella pagina, ad esempio se un valore corrisponde a un determinato pattern. Con la verifica `amp-form` puoi fornire agli utenti dei feedback che la sola convalida HTML5 non sarebbe in grado di generare. Ad esempio, un modulo può utilizzare la verifica per controllare se un indirizzo email è già stato registrato. Un altro caso d'uso consiste nel verificare che un campo città e un campo codice di avviamento postale corrispondano.

Di seguito un esempio:
```html
{% raw %}<h4>Esempio di verifica</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post" target="_blank">
  <fieldset>
    <label>
      <span>Email</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>CAP</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>Città</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Documento</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Submit">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Complimenti! Ti sei registrato con {{email}}</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Errore. Riprova più tardi.</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

Il modulo invia un campo `__amp_form_verify` come parte dei dati del modulo come suggerimento
al server che la richiesta è una richiesta di verifica e non un invio formale.
Questa funzione è utile per consentire al server di non memorizzare la richiesta di verifica se lo stesso
endpoint viene utilizzato per la verifica e per l'invio.

Ecco che aspetto dovrebbe avere una risposta di errore per la verifica:
```json
{
  "verifyErrors": [
    {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

Per rimuovere un campo dalla richiesta `verify-xhr`, aggiungi l'attributo `no-verify` all'elemento input.

Per ulteriori esempi, consulta [esempi/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Sostituzioni delle variabili <a name="variable-substitutions"></a>

L'estensione `amp-form` consente la [sostituzione delle variabili di piattaforma](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) per gli input che sono nascosti e hanno l'attributo `data-amp-replace`. Per ogni invio di modulo, `amp-form` trova tutto l' `input[type=hidden][data-amp-replace]` all'interno del modulo e applica sostituzioni di variabili al relativo attributo `value` e lo sostituisce con il risultato della sostituzione.

Devi specificare le variabili che stai utilizzando per ogni sostituzione sugli input specificando una stringa separata da spazi delle variabili utilizzate in `data-amp-replace` (vedi esempio di seguito). AMP non sostituirà le variabili non esplicitamente specificate.

Di seguito un esempio dell'aspetto degli input prima e dopo le sostituzioni (nota che devi utilizzare la sintassi di piattaforma delle sostituzioni delle variabili e non di quelle di Analytics):
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Una volta che l'utente tenta di inviare il modulo, AMP proverà a risolvere le variabili e ad aggiornare l'attributo `value` di tutti i campi con le sostituzioni appropriate. Per gli invii XHR, è probabile che tutte le variabili siano sostituite e risolte. Tuttavia, negli invii GET non-XHR, i valori che richiedono la risoluzione asincrona potrebbero non essere disponibili perché non sono stati risolti in precedenza. Ad esempio, se `CLIENT_ID` non è stato risolto e memorizzato nella cache in precedenza, non viene risolto.

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Nota che `CANONICAL_HOSTNAME` non è stato sostituito perché non era incluso nella allowlist tramite l'attributo `data-amp-replace` nel primo campo.

Le sostituzioni avverranno a ogni invio successivo. Ulteriori informazioni sulle [sostituzioni di variabili in AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md).

# Polyfill <a name="polyfills"></a>

L'estensione `amp-form` fornisce polyfill per comportamenti e funzionalità mancanti in alcuni browser o implementati nella versione di CSS successiva.

# Messaggio di convalida e di blocco per invio non valido <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

I browser che utilizzano attualmente motori basati sul Webkit (a partire da agosto 2016) non supportano l'invio di moduli non validi. Uno di questi è Safari (su tutte le piattaforme) e tutti i browser iOS. L'estensione `amp-form` esegue il polyfill di questo comportamento per bloccare gli invii non validi e mostra i messaggi di convalida sugli input non validi.

# Pseudo-classi di interazione utente <a name="user-interaction-pseudo-classes"></a>

Le pseudo classi `:user-invalid` e `:user-valid` fanno parte della [futura specifica CSS Selectors 4](https://drafts.csswg.org/selectors-4/#user-pseudos) e sono state introdotte per consentire hook migliori per lo styling dei campi non validi/validi in base a determinati criteri.

Una delle principali differenze tra `:invalid` e `:user-invalid` è il momento in cui vengono applicati all'elemento. La classe `:user-invalid` viene applicata dopo un'interazione significativa da parte dell'utente con il campo (ad esempio, l'utente digita in un campo o sfoca il campo).

L'estensione `amp-form` fornisce [classi](#classes-and-css-hooks) per il polyfill di queste pseudo-classi. L'estensione `amp-form` propaga anche negli elementi predecessori `fieldset` e `form`.

# `<textarea>` convalida <a name="-validation"></a>

La corrispondenza delle espressioni regolari è una funzione di convalida comune supportata nativamente sulla maggior parte degli elementi di input, ad eccezione di `<textarea>`. Questa funzione è disponibile per il polyfill e supporta l'attributo `pattern` sugli elementi `<textarea>`.

Il modulo AMP fornisce un attributo `autoexpand` agli elementi `<textarea>`. Ciò consente all'area di testo
di rimpicciolirsi ed espandersi fino alla dimensione massima del campo per accogliere le righe di input dell'utente. Se l'utente ridimensiona manualmente il campo, il comportamento dell'espansione automatica verrà rimosso.

```html
<textarea autoexpand></textarea>
```

# Stili <a name="styling"></a>

# Classi e hook CSS <a name="classes-and-css-hooks"></a>

L'estensione `amp-form` mette a disposizione dei publisher classi e hook CSS per creare input e moduli con stili diversi.

Le seguenti classi possono essere utilizzate per indicare lo stato dell'invio del modulo:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Le seguenti classi sono un [polyfill per le pseudo classi di interazione dell'utente](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

I publisher possono utilizzare queste classi per definire gli input e i set di campi in modo che rispondano alle azioni degli utenti (ad esempio, mettendo in risalto un input non valido con un bordo rosso dopo che l'utente passa oltre).

Vedi l'[esempio completo](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html) dell'utilizzo delle classi.

[tip type="success"]
visita [AMP Start](https://ampstart.com/components#form-elements) per elementi di moduli AMP reattivi e pre-formattati che puoi utilizzare nelle tue pagine AMP.
[/tip]

# Considerazioni sulla sicurezza <a name="security-considerations"></a>

# Protezione contro XSRF <a name="protecting-against-xsrf"></a>

Oltre a seguire le istruzioni nella [specifica CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md), presta particolare attenzione alla sezione ["Elaborazione delle richieste di modifica dello stato"](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) per la protezione dagli [attacchi XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) in cui un utente malintenzionato può eseguire comandi non autorizzati utilizzando la sessione utente corrente all'insaputa di quest'ultimo.

In generale, tieni presente i seguenti punti quando accetti l'input da parte dell'utente:

* Utilizza POST solo per le richieste di modifica dello stato.
* Utilizza GET non-XHR solo per scopi di navigazione (ad esempio, Ricerca).
    * Le richieste GET non XHR non riceveranno origini/intestazioni accurate e i backend non saranno in grado di proteggere dagli XSRF con il meccanismo di cui sopra.
    * In generale, utilizza richieste XHR/non-XHR GET solo per il recupero di informazioni o per la navigazione.</li>
* Le richieste POST non-XHR non sono consentite nei documenti AMP a causa delle incongruenze di impostazione dell'intestazione `Origin` per queste richieste nei vari browser. Le complicazioni derivanti dal supporto delle richieste non-XHR POST richiederebbe un ulteriore livello di complessità per offrire la protezione da XSRF. Il team di AMP potrà rivalutare questo requisito in futuro. Se ritieni che ciò sia necessario, segnala il problema.
,false,true
