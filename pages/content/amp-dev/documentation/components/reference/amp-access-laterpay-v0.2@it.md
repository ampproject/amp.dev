---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Consente ai publisher una facile integrazione con la piattaforma di micropagamenti LaterPay.
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



Consente ai publisher una facile integrazione con la piattaforma di micropagamenti [LaterPay](https://www.laterpay.net). `amp-access-laterpay` richiede l'[Accesso AMP](amp-access.md) e si basa su di esso.

<table>
  <tr>
    <td class="col-fourty"><strong>Script obbligatori</strong></td>
    <td>
      <small>Tieni presente che hai bisogno di script per "amp-access-laterpay", "amp-access" e "amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://ampjs.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Esempi</strong></td>
    <td>Vedi l'esempio con annotazioni di <a href="https://ampbyexample.com/components/amp-access-laterpay/">amp-access-laterpay</a> di AMP By Example.</td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

[LaterPay](https://laterpay.net) è una piattaforma di micropagamento che consente agli utenti di acquistare contenuti online in pochi clic e di accedervi immediatamente, senza doversi registrare, inserire dati personali o effettuare pagamenti. Gli utenti pagano solo quando i loro acquisti hanno raggiunto un totale di $ 5 o di € 5 su vari siti web. I fornitori di contenuti possono vendere singoli articoli o abbonamenti a tempo che consentono un accesso con tariffa flat o un accesso temporaneo ai contenuti.

Se stai integrando LaterPay tramite l'[integrazione di Connector Script](https://docs.laterpay.net/connector/), non potrai utilizzare tale integrazione nelle pagine AMP. `amp-access-laterpay` è analogo a Connector Script, che fornisce un set di funzioni simile, ma sviluppato per le pagine AMP.

È anche possibile vendere contenuti tramite LaterPay semplicemente utilizzando `amp-access-laterpay` come unico metodo di integrazione.

Il componente `amp-access-laterpay` utilizza internamente l'Accesso AMP per offrire un comportamento simile a quest'ultimo, ma creato su misura per l'utilizzo con il servizio LaterPay.

Se disponi di un servizio paywall personalizzato che vuoi utilizzare con Accesso AMP e LaterPay nella stessa pagina, [puoi farlo](#using-amp-access-laterpay-together-with-amp-access).

Il componente `amp-access-laterpay` non richiede autorizzazione né configurazione di pingback perché è preconfigurato per funzionare con il servizio LaterPay. Inoltre, non richiede la configurazione manuale dei link di accesso.

Le diverse opzioni di acquisto possono essere configurate nell'account LaterPay del publisher; il componente recupererà la configurazione e creerà un elenco delle opzioni di acquisto disponibili.

Per scoprire come configurare le opzioni di acquisto, puoi consultare la documentazione sulla configurazione di [LaterPay Connector](https://docs.laterpay.net/connector/configuration/), l'integrazione front-end esistente di LaterPay.

Lo stile dell'elenco generato può essere modificato e presentato in base alle preferenze del publisher.

Questo componente si basa anche sul [Markup dei contenuti di accesso](amp-access.md#access-content-markup) per mostrare e nascondere i contenuti.

## Configurazione <a name="configuration"></a>

La configurazione è simile ad Accesso AMP, ma non sono necessari autorizzazione né link di pingback e di accesso.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Nell'oggetto di configurazione `laterpay` possono essere impostati i seguenti valori:

<table>
  <tr>
    <th class="col-fourty">Proprietà</th>
    <th class="col-twenty">Valori</th>
    <th class="col-fourty">Descrizione</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Selettore CSS <strong>richiesto</strong></td>
    <td>Selettore CSS che determina l'elemento nella pagina che contiene il titolo dell'articolo. La pagina presentata per l'acquisto dell'articolo conterrà questo titolo in modo che l'utente sia consapevole di cosa sta acquistando.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Elenco di identificatori separato da virgole</td>
    <td>Per impostazione predefinita, l'URL di un articolo viene utilizzato per abbinarlo a un'opzione di acquisto, ma invece di specificare un percorso URL per un'opzione di acquisto è possibile impostare un ID articolo nell'interfaccia di LaterPay Connector, quindi utilizzare la proprietà <code>articleId</code> in modo che corrisponda all'articolo con l'opzione di acquisto.
      <br>
        Ciò è necessario nei casi in cui la corrispondenza di un'opzione di acquisto tramite l'URL di un articolo non è sufficientemente flessibile. Consulta la <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">pagina di configurazione di LaterPay Connector()</a> per informazioni su alcuni scenari di esempio in cui potrebbe essere utile.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Token JWT per la configurazione dinamica dei pagamenti</td>
        <td>Questa opzione consente di specificare un token web JSON firmato con una configurazione dei contenuti a pagamento disponibili. Ciò significa che puoi fornire una configurazione in-page generata in modo programmatico nelle tue pagine, anziché specificarla manualmente nell'interfaccia amministratore di LaterPay Connector. Questo potrebbe essere particolarmente utile per la configurazione di acquisti singoli per molti articoli diversi.
          <br>
            Se vuoi ulteriori informazioni su come creare questo token e quali contenuti possono essere specificati al suo interno, consulta la documentazione <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">dell'API dei contenuti a pagamento JWT</a> di LaterPay per l'integrazione di Connector Script.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>stringa</td>
          <td>Definisce lo stile di formattazione del prezzo corretto per la località.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>oggetto</td>
          <td>Consente al publisher di personalizzare o localizzare il testo presente nell'elenco delle opzioni di acquisto generato. Consulta la sezione <a href="#localization">Localizzazione</a> per ulteriori informazioni.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>booleano</td>
          <td>Se vero, fa scorrere la pagina in alto dopo che il processo di autorizzazione ha avuto esito positivo. Ciò può essere utile se il punto in cui viene visualizzata la finestra di dialogo è più giù nella pagina e l'utente potrebbe essere confuso dalla posizione corrente dello scorrimento dopo il ritorno alla pagina.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>stringa</td>
          <td>Specifica in quale <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">regione LaterPay</a> ti trovi: <code>eu</code> o <code>us</code>.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>booleano</td>
          <td>Serve solo se si utilizza la modalità sandbox per testare la configurazione del server. Devi anche utilizzare la <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">modalità sviluppatore</a> di AMP.</td>
        </tr>
      </table>

## Utilizzo del Markup dei contenuti di accesso e visualizzazione elenco acquisti <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Il Markup dei contenuti di accesso deve essere utilizzato come Accesso AMP.

L'elemento con l'id `amp-access-laterpay-dialog` visualizzerà un elenco di opzioni di acquisto quando l'utente non ha accesso all'articolo. Questo elenco ha uno stile molto semplice e può essere personalizzato per essere più simile alla pagina del publisher.

Assicurati di aggiungere la classe `amp-access-laterpay` se vuoi utilizzare lo stile predefinito.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Spiacenti. Qualcosa non ha funzionato.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...contenuti dell'articolo...</p>
</div>

```

## Stili <a name="styling"></a>

Più classi vengono applicate ad alcuni elementi del markup generato. Gli elementi senza classi possono essere indirizzati in modo univoco tramite selettori di elementi CSS.

Alcuni layout CSS di base esistono già, ma è consigliabile che i publisher li abbinino in base all'aspetto delle loro pagine.

La struttura creata per la finestra di dialogo ha il seguente aspetto:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Facoltativo, viene visualizzato se viene definito il messaggio di intestazione.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Titolo opzione di acquisto</span>
              <p class="amp-access-laterpay-description">Descrizione delle opzioni di acquisto</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0,15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... altre voci di elenco per altre opzioni di acquisto ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Acquista ora</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="…">Già acquistato</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Facoltativo, viene visualizzato se viene definito il messaggio del piè di pagina.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Localizzazione <a name="localization"></a>

Il testo visualizzato nella finestra di dialogo per le opzioni di acquisto verrà definito dal publisher nell'interfaccia utente di LaterPay Connector.

Il testo rimanente fa parte del componente esteso e può essere modificato e localizzato tramite le opzioni di configurazione nel seguente modo:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

I seguenti messaggi possono essere tradotti o personalizzati, ma devono conservare significato e intenzione originali.

<table>
  <tr>
    <th class="col-fourty">Chiave</th>
    <th class="col-fourty">Descrizione</th>
    <th>Valore predefinito</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Testo visualizzato nel pulsante di acquisto per le opzioni per cui è possibile pagare in seguito.</td>
    <td>"Acquista ora, paga dopo"</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Testo visualizzato nel pulsante di acquisto per le opzioni che devono essere pagate al momento dell'acquisto.</td>
    <td>"Acquista ora"</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Testo predefinito visualizzato nel pulsante di acquisto prima di selezionare un'opzione.</td>
    <td>"Acquista ora"</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Se l'utente ha acquistato l'articolo in passato ma ha perso i cookie (o si trova in un dispositivo diverso) può utilizzare questo link per accedere a LaterPay e recuperare i propri acquisti.</td>
    <td>"Già acquistato"</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Intestazione facoltativa.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Piè di pagina facoltativo.</td>
    <td></td>
  </tr>
</table>

## Analisi <a name="analytics"></a>

Dato che `amp-access-laterpay` è basato su `amp-access`, supporta tutti gli [eventi di analisi](amp-access.md#integration-with-amp-analytics) inviati da `amp-access`.

Tutti gli esempi di [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) sono configurati per l'invio degli eventi di analisi se vuoi visualizzare un esempio più preciso di come potrebbe apparire in pratica.

## Utilizzo dell'Accesso AMP LaterPay in combinazione con l'Accesso AMP <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Se hai un sistema di abbonamento esistente e vuoi utilizzare LaterPay solo per vendere singoli articoli, è possibile combinare entrambi i metodi di vendita nella stessa pagina, utilizzando sia Accesso AMP che Accesso AMP LaterPay.

Prima di tutto, consulta la documentazione relativa all'[Accesso AMP](amp-access.md) per ulteriori informazioni su come configurare l'accesso AMP con il paywall esistente.

La sezione relativa a [più provider](amp-access.md#multiple-access-providers) illustra come configurare più provider con spazi dei nomi.

Quando lo utilizzi con LaterPay e un'integrazione paywall esistente, la configurazione necessaria può avere un aspetto simile al seguente:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

Dove il markup dell'accesso ai contenuti potrebbe risultare simile al seguente:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Esegui qui l'accesso per l'abbonamento a PublisherName.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Spiacenti. Qualcosa non ha funzionato.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...contenuti dell'articolo...</p>
</div>

```

Puoi trovare un esempio più completo su [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html)

## Documentazione correlata <a name="related-documentation"></a>

* [Accesso AMP](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: modalità di esecuzione dei MicroPayments](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) - Simile ad Accesso AMP LaterPay ma non per pagine AMP.

## Convalida <a name="validation"></a>

Consulta le [regole relative ad amp-access-laterpay](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) nella specifica dello strumento di convalida AMP.
