---
'$title': Azioni ed eventi
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md.
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

[tip type="note"] Questa documentazione descrive azioni ed eventi per siti web, storie e annunci AMP. Leggere il documento [Azioni ed eventi nelle email AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md) per il formato delle email AMP.[/tip]

L'attributo `on` viene utilizzato per installare i gestori di eventi sugli elementi. Gli eventi supportati dipendono dall'elemento.

Il valore per la sintassi è un semplice linguaggio specifico del dominio del modulo:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Consultare la tabella seguente per le descrizioni di ciascun elemento della sintassi.

<table>
  <tr>
    <th width="30%">Sintassi</th>
    <th width="18%">Obbligatorio?</th>
    <th width="42%">Descrizione</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>sì</td>
    <td>Questo è il nome dell'evento esposto da un elemento.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>sì</td>
    <td>Questo è l'id DOM dell'elemento, oppure un <a href="#special-targets">target speciale</a> predefinito su cui occorre eseguire un'azione in risposta all'evento. Nel seguente esempio, il <code>targetId</code> è l'id DOM del target <code>amp-lightbox</code>, <code>photo-slides</code>.<pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Show Images&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>no</td>
    <td>Questo si applica ad elementi con azioni predefinite.<p>Si tratta del metodo esposto dall'elemento target (referenziato da <code>targetId</code>) che deve essere eseguito all'attivazione dell'evento.</p> <p>L'AMP prevede il concetto di azioni predefinite che possono essere implementate dagli elementi. Perciò omettendo <code>methodName</code>, l'AMP eseguirà il metodo predefinito.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>no</td>
    <td>Alcune azioni, se documentate, possono accettare argomenti. Gli argomenti sono definiti tra parentesi nella notazione <code>key=value</code>. I valori accettati sono: <ul> <li>stringhe semplici senza virgolette: <code>simple-value</code> </li> <li>stringhe con virgolette: <code>"string value"</code> oppure <code>'string value'</code> </li> <li>valori booleani: <code>true</code> o <code>false</code> </li> <li>numeri: <code>11</code> o <code>1.1</code> </li> <li>dati con sintassi puntata riferiti ad eventi: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## Gestione di più eventi <a name="handling-multiple-events"></a>

È possibile ricevere più eventi su un elemento separando gli eventi con un punto e virgola `;`.

Esempio: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Azioni multiple per un evento <a name="multiple-actions-for-one-event"></a>

È possibile eseguire più azioni in sequenza per lo stesso evento separando le azioni con una virgola ",".

Esempio: `on="tap:target1.actionA,target2.actionB"`

## Eventi e azioni definiti a livello globale <a name="globally-defined-events-and-actions"></a>

AMP permette di definire un evento `tap` globale che può essere ricevuto su qualsiasi elemento HTML (inclusi gli elementi AMP).

AMP permette inoltre di definire le azioni globali `hide`, `show` e `toggleVisibility` che possno essere attivate su qualsiasi elemento HTML.

[tip type="note"]

Un elemento può essere mostrato solo se in precedenza era stato nascosto da un'azione `hide` o `toggleVisibility`, oppure usando l'attributo [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). L'azione `show` non supporta elementi nascosti dall'attributo CSS `display:none` o dall'attributo AMP `layout=nodisplay`.

Ad esempio, in AMP è possibile la seguente struttura:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Eventi specifici di un elemento <a name="element-specific-events"></a>

### \* - tutti gli elementi <a name="---all-elements"></a>

<table>
  <tr>
    <th>Evento</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Attivazione facendo clic o toccando l'elemento.</td>
  </tr>
</table>

### Elementi di input <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Event</th>
    <th width="30%">Descrizione</th>
    <th width="40%">Elementi</th>
    <th>Dati</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Attivazione quando il valore dell'elemento viene modificato e confermato. <p>Le proprietà dei dati rispecchiano quelle in <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> e <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Attivazione quando il valore dell'elemento viene modificato. È simile all'evento <code>change</code> standard, ma si attiva solo quando sono trascorsi 300 ms senza che il valore dell'input subisca altre variazioni.</td>
    <td>Elementi che attivano l'evento <code>input</code>.</td>
    <td>Gli stessi dati dell'evento  <code>change</code>.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Attivazione quando il valore dell'elemento viene modificato. È simile all'evento <code>change</code> standard, ma può essere attivato al massimo una volta ogni 100 ms mentre il valore dell'input cambia.</td>
    <td>Elementi che attivano l'evento <code>input</code>.</td>
    <td>Gli stessi dati dell'evento <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Attivazione all'espansione di una sezione a soffietto.</td>
    <td>Nessuno.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Attivazione alla compressione di una sezione a soffietto.</td>
    <td>Nessuno.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Attivazione quando cambia la diapositiva corrente di una sequenza.</td>
    <td><pre>//Numero di diapositiva.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Attivazione quando il lightbox è completamente visibile.</td>
    <td>Nessuno</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Attivazione quando il lightbox è completamente chiuso.</td>
    <td>Nessuno</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Aggiorna il layout di <code>amp-list</code> a <code>layout="CONTAINTER"</code> per consentire <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">il ridimensionamento dinamico</a>.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(bassa affidabilità)</td>
    <td>Attivazione quando il recupero dei dati non riesce.</td>
    <td>Nessuno</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Attivazione quando un'opzione è selezionata o deselezionata.</td>
    <td><pre>// Valore dell'attributo "option" dell'elemento target. <code>event.targetOption</code><br/>// Array di valori degli attributi "option" di tutti gli elementi selezionati. <code>event.selectedOptions</code>Option<br></pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Attivazione quando la barra laterale è completamente aperta al termine della transizione.</td>
    <td>Nessuno</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Attivazione quando la barra laterale è completamente chiusa al termine della transizione.</td>
    <td>Nessuno</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(bassa affidabilità)</td>
    <td>Attivazione quando il recupero dei dati non riesce.</td>
    <td>Nessuno</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(bassa affidabilità)</td>
    <td>Attivazione alla prima riproduzione del video da parte dell'utente. L'attivazione sui video a riproduzione automatica avviene non appena l'utente interagisce con il video. Questo evento è a bassa affidabilità, il che implica che non può attivare la maggior parte delle azioni; possono essere eseguite solo azioni a bassa affidabilità, quali le azioni <code>amp-animation</code>.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(bassa affidabilità)</td>
    <td>Attivazione quando la posizione di riproduzione di un video cambia. La frequenza dell'evento è controllata da AMP ed è attualmente impostata a intervalli di 1 secondo. Questo evento è a bassa affidabilità, per cui non può attivare la maggior parte delle azioni; possono essere eseguite solo azioni a bassa affidabilità quali le azioni <code>amp-animation</code>.</td>
    <td>
<code>{time, percent}</code> <code>time</code> indica l'orario attuale in secondi, <code>percent</code> è un numero compreso tra 0 e 1 e indica la posizione attuale in termini percentuali sul tempo totale.</td>
  </tr>
</table>

### moduli <a name="form"></a>

<table>
  <tr>
    <th width="25%">Evento</th>
    <th width="35%">Descrizione</th>
    <th width="40%">Dati</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Attivazione all'invio del modulo.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Attivazione quando la risposta all'invio del modulo ha successo.</td>
    <td><pre>//Risposta JSON.<br>       event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Attivazione quando la risposta all'invio del modulo è un errore.</td>
    <td><pre>// Risposta JSON.<br>       event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Attivazione quando il modulo è valido.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Fired when the form is invalid.</td>
    <td></td>
  </tr>
</table>

## Azioni specifiche di un elemento <a name="element-specific-actions"></a>

### \* (tutti gli elementi) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Hides the target element.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Shows the target element. If an     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> element</a> becomes visible as a     result, it gains focus.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Attiva e disattiva la visibilità dell'elemento target. Se un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento <code>autofocus</code></a> diventa visibile di conseguenza, esso diventa attivo.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Alterna le classi dell'elemento target. L'attributo <code>force</code> è opzionale e, se definito, garantisce che la classe sia solo aggiunta ma non rimossa, se l'opzione è impostata su <code>true</code>, e che essa sia solo rimossa ma non aggiunta, se l'opzione è impostata su <code>false</code>.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Permette di scorrere un elemento nella visualizzazione con un'animazione fluida. L'attributo <br> <code>duration</code> è opzionale. Indica la lunghezza dell'animazione in millisecondi. Se non specificato, viene utilizzato un valore relativo alla differenza di scorrimento minore o uguale a 500 millisecondi. L'attributo <br> <code>position</code> è opzionale. Può assumere uno dei valori <code>top</code>, <code>center</code> o <code>bottom</code> (valore predefinito <code>top</code>). Indica la posizione dell'elemento rispetto alla finestra di visualizzazione dopo lo scorrimento. <br> Per favorire l'accessibilità, abbinarlo a una chiamata a <code>focus()</code> per evidenziare l'elemento in scorrimento.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Aumenta la messa a fuoco dell'elemento target. Per ridurre la messa a fuoco, attivare il <code>focus</code> su un altro elemento (di solito l'elemento genitore). Sconsigliamo di ridurre la messa a fuoco di un elemento, attivando il focus sull'elemento <code>body</code>/<code>documentElement</code> per motivi di accessibilità.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Riproduce l'audio. Sarà un no-op se l'elemento <code><amp-audio></code> è un discendente di un elemento <code><amp-story></code>.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Riproduce l'audio. Sarà un no-op se l'elemento <code><amp-audio></code> è un discendente di un elemento <code><amp-story></code>.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Riproduce l'animazione.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Mette in pausa l'animazione.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Arresta l'animazione.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Imposta il parametro currentTime dell'animazione sul valore specificato e la mette in pausa.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Usa il valore percentuale specificato per determinare il valore corrispondente del parametro currentTime dell'animazione e la mette in pausa.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Alterna gli stati <code>expanded</code> e <code>collapsed</code> delle sezioni <code>amp-accordion</code>. Quando l'azione è richiamata senza argomenti, essa alterna tutte le sezioni del pannello a soffietto. Per attivare una sezione specifica occorre fornire l'id della sezione: <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Espande le sezioni del pannello a soffietto. Se una sezione è già espansa, rimane espansa. Quando l'azione è richiamata senza argomenti, essa espande tutte le sezioni del pannello a soffietto. Per attivare una sezione specifica occorre fornire l'id della sezione: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Comprime le sezioni del pannello a soffietto. Se una sezione è già compressa, rimane compressa. Quando l'azione è richiamata senza argomenti, essa comprime tutte le sezioni del pannello a soffietto. Per attivare una sezione specifica occorre fornire l'id della sezione: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Avanza nella sequenza fino alla diapositiva che occupa la posizione dell'indice specificato</td>
  </tr>
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Attiva e disattiva lo stato di riproduzione automatica della sequenza. <code>toggleOn</code> è opzionale.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Apre il lightbox dell'immagine con l'immagine sorgente che ha attivato l'azione.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Apre il lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Chiude il lightbox.</td>
  </tr>
</table>

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Apre la raccolta di lightbox. Può essere attivata toccando un altro elemento, indicando l'id immagine: `on =" tap: amp-lightbox-gallery.open (id = 'image-id') "'.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Aggiorna i dati dall'elemento <code>src</code> ed esegue di nuovo il rendering dell'elenco.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Aggiorna gli elementi DOM per mostrare il contenuto aggiornato.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Cancella tutte le selezioni da un elemento <code>amp-selector</code> definito.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Sposta la selezione verso l'alto del valore indicato dal parametro 'delta'. Il valore predefinito di 'delta' è -1. Se non sono selezionate opzioni, lo stato selezionato diventerà il valore dell'ultima opzione.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Sposta la selezione verso il basso del valore indicato dal parametro 'delta'. Il valore predefinito di 'delta' è -1. Se non sono selezionate opzioni, lo stato selezionato diventerà il valore della prima opzione.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Attiva o disattiva l'applicazione dell'elemento 'selezionato'. Se l'attributo select è assente, questa azione lo aggiunge. Se l'attributo select è presente, questa azione lo rimuove. Per forzare un'aggiunta o una rimozione, occorre includere un valore booleano nell'argomento 'value'. Un valore "true" forzerà l'aggiunta dell'attributo 'selected' e non lo rimuoverà se già presente. Un valore 'false' rimuoverà l'attributo, ma non lo aggiungerà se è assente.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Apre la barra laterale.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Chiude la barra laterale.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Alterna gli stati della barra laterale.</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Recupera di nuovo i dati dall'attributo `src` ignorando la cache del browser.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Nasconde l'elemento di notifica dell'utente referenziato.</td>
  </tr>
</table>

### Elementi video <a name="video-elements"></a>

Le azioni riportate di seguito sono supportate dai seguenti elementi video AMP: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Riproduce il video.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Mette in pausa il video.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Disattiva l'audio del video.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Riattiva l'audio del video.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Espande il video a schermo intero.</td>
  </tr>
</table>

### modulo <a name="form-1"></a>

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Cancella tutti i valori nei campi di input del modulo.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Invia il modulo.</td>
  </tr>
</table>

## Target speciali <a name="special-targets"></a>

Di seguito sono riportati i target forniti dal sistema AMP con requisiti speciali:

### Target: AMP <a name="target-amp"></a>

Il target `AMP` è fornito dal sistema di runtime AMP e implementa azioni di primo livello che si applicano all'intero documento.

<table>
  <tr>
    <th width="40%">Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Permette di esplorare nella finestra corrente l'URL dato, portandola al target specificato, se indicato (attualmente sono supportati solo i valori <code>_top</code> e <code>_blank </code>). Il parametro opzionale <code>opener</code> può essere indicato se si usa un target di tipo <code>_blank</code> per consentire alla pagina appena aperta di accedere all'elemento <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener<code></code></code></a>. Supporta <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">sostituzioni di URL standard</a>.</p>
      <p><strong>Attenzione:</strong> L'utilizzo di normali <code>&lt;a&gt;</code> collegamenti è consigliato ove possibile poiché <code>AMP.navigateTo</code> non viene riconosciuto dai crawler web.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Prova a chiudere la finestra se consentito, altrimenti permette di esplorare in modo simile all'azione <code>navigateTo</code>. Utile per i casi d'uso in cui un pulsante "Indietro" potrebbe tentare di chiudere la finestra se essa era stata aperta in una nuova finestra dalla pagina precedente o per proseguire l'esplorazione se la finestra non era stata aperta.</p>
      <p><strong>Attenzione:</strong> L'utilizzo di normali <code>&lt;a&gt;</code> collegamenti è consigliato ove possibile poiché <code>AMP.closeOrNavigateTo</code> non viene riconosciuto dai crawler web.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Torna indietro nella cronologia.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Apre la finestra di dialogo Stampa per stampare la pagina corrente.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Scorre fino all'ID dell'elemento fornito nella pagina corrente.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Disattiva la generazione dell'ID client per tutti gli ambiti.</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Richiede <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Aggiunge il valore letterale di un oggetto allo stato associabile.</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Richiede <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>.</p>
      <p>Aggiunge il valore letterale di un oggetto allo stato associabile e inserisce un nuovo elemento nello stack della cronologia del browser. La visualizzazione dell'elemento ripristinerà i precedenti valori delle variabili (in questo esempio, <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup>In caso di utilizzo con <a href="#multiple-actions-for-one-event">azioni multiple</a>, le azioni successive attenderanno il completamento di <code>setState()</code> o <code>pushState()</code> prima della chiamata. Per ogni evento è consentita una sola chiamata di <code>setState()</code> o <code>pushState()</code>.

### Target: amp-access <a name="target-amp-access"></a>

Il target `amp-access` è fornito dal componente [amp-access](https://amp.dev/documentation/components/amp-access.html).

Il target `amp-access` è speciale per i seguenti motivi:

1. Non è possibile assegnare un ID arbitrario a questo target. Il target è sempre `amp-access`.
2. Le azioni per `amp-access` sono dinamiche a seconda della struttura della [configurazione di accesso AMP](https://amp.dev/documentation/components/amp-access#configuration).

Consultare i [dettagli](https://amp.dev/documentation/components/amp-access#login-link) sull'utilizzo del target `amp-access`.
