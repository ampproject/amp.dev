---
'$title': Azioni ed eventi nelle e-mail AMP
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] Questa documentazione descrive azioni ed eventi relativi al formato delle e-mail AMP. Leggi anche il documento [Azioni ed eventi](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md) per siti web, storie e annunci. [/tip]

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
    <td>Sì</td>
    <td>Questo è l'id DOM dell'elemento, oppure un <a href="#special-targets">target speciale</a> predefinito su cui occorre eseguire un'azione in risposta all'evento. Nel seguente esempio, il <code>targetId</code> è l'id DOM del target <code>amp-lightbox</code>, <code>photo-slides</code>.<pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Show Images&lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>no</td>
    <td>Questo si riferisce ad elementi con azioni predefinite.<p>Si tratta del metodo esposto dall'elemento target (referenziato da <code>targetId</code>) che deve essere eseguito all'attivazione dell'evento.</p> <p>L'AMP prevede il concetto di azioni predefinite che possono essere implementate dagli elementi. Perciò omettendo <code>methodName</code>, l'AMP eseguirà il metodo predefinito.</p>
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

Si possono leggere più eventi su un elemento separando gli eventi con un punto e virgola `;`.

Esempio: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Azioni multiple per un evento <a name="multiple-actions-for-one-event"></a>

È possibile eseguire più azioni in sequenza per lo stesso evento separando le azioni con una virgola ",".

Esempio: `on="tap:target1.actionA,target2.actionB"`

## Eventi e azioni definiti a livello globale <a name="globally-defined-events-and-actions"></a>

AMP permette di definire un evento `tap` globale che può essere ricevuto su qualsiasi elemento HTML (inclusi gli elementi AMP).

AMP permette inoltre di definire le azioni globali `hide`, `show` e `toggleVisibility` che possono essere attivate su qualsiasi elemento HTML.

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
    <th width="20%">Evento</th>
    <th width="30%">Descrizione</th>
    <th width="40%">Elementi</th>
    <th>Dati</th>
  </tr>
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
  <tr>
    <td><code>input-debounced</code></td>
    <td>Attivazione quando il valore dell'elemento viene modificato. È simile all'evento <code>change</code> standard, ma si attiva solo quando sono trascorsi 300 ms senza che il valore dell'input subisca variazioni.</td>
    <td>Elementi che attivano l'evento <code>input</code>.</td>
    <td>Gli stessi dati dell'evento <code>change</code>.</td>
  </tr>
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
    <td><pre>// Numero diapositiva.<br>event.index</pre></td>
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
    <td><pre>// Valore dell'attributo "option" dell'elemento target. <code>event.targetOption</code><br>// Array di valori degli attributi "option" di tutti gli elementi selezionati. <code>event.selectedOptions</code></pre></td>
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

### amp-state <a name="amp-state"></a>

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

### form <a name="form"></a>

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
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Attivazione quando la risposta all'invio del modulo è un errore.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Attivazione quando il modulo è valido.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Attivazione quando il modulo non è valido.</td>
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
    <td>Nasconde l'elemento target.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Mostra l'elemento target. Se un <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">elemento <code>autofocus</code></a> diventa visibile di conseguenza, la sua messa a fuoco aumenta.</td>
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
    <td><code>focus</code></td>
    <td>Aumenta la messa a fuoco dell'elemento target. Per ridurre la messa a fuoco, attivare il <code>focus</code> su un altro elemento (di solito l'elemento genitore). Sconsigliamo di ridurre la messa a fuoco di un elemento, attivando il focus sull'elemento <code>body</code>/<code>documentElement</code> per motivi di accessibilità.</td>
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
    <td>Avanza nella sequenza fino alla diapositiva che occupa la posizione dell'indice specificato.</td>
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

### amp-list <a name="amp-list"></a>

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
    <td>None</td>
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

### form <a name="form-1"></a>

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
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Richiede <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Aggiunge il valore letterale di un oggetto allo stato associabile.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup>In caso di utilizzo con <a href="#multiple-actions-for-one-event">azioni multiple</a>, le azioni successive attenderanno il completamento di <code>setState()</code> prima della chiamata. Per ogni evento è consentita una sola chiamata di <code>setState()</code>.
