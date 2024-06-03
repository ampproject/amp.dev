---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Rappresenta un controllo che apre un menu di opzioni e permette all'utente di scegliere quelle più adeguate.
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



Rappresenta un controllo che apre un menu di opzioni e permette all'utente di scegliere quelle più adeguate.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>Tutti</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi l'<a href="https://ampbyexample.com/components/amp-selector/">esempio di amp-selector</a> del sito AMP By Example.</td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

Il selettore AMP è un controllo che apre un elenco di opzioni e consente all'utente di sceglierne una o più; i contenuti delle opzioni non si limitano al solo testo.

* `amp-selector` può contenere elementi HTML o componenti AMP di qualsiasi tipo, ad esempio, `amp-carousel`, `amp-img` e così via.
* `amp-selector` non può contenere alcun controllo `amp-selector` nidificato.
* Le opzioni selezionabili possono essere impostate aggiungendo l'attributo `option` all'elemento e assegnando un valore all'attributo, ad esempio, `<li option='value'></li>`.
* Le opzioni disattivate possono essere impostate aggiungendo l'attributo `disabled` all'elemento, ad esempio, `<li option='d' disabled></li>`.
* Le opzioni preselezionate possono essere impostate aggiungendo l'attributo `selected` all'elemento, ad esempio, `<li option='b' selected></li>`.
* Per consentire di selezionare più opzioni, aggiungi l'attributo `multiple` all'elemento `amp-selector`.  Per impostazione predefinita, `amp-selector` consente una sola selezione alla volta.
* Per disattivare l'intero `amp-selector`, aggiungi l'attributo `disabled` all'elemento `amp-selector`.
* Quando un `amp-selector` contiene un attributo `name` e `amp-selector` si trova all'interno di un tag `form`, se nel modulo si verifica un evento di invio, `amp-selector` si comporta come un gruppo di pulsanti di opzione/caselle di controllo e invia i valori selezionati (quelli assegnati all'opzione) al nome dell'`amp-selector`.

Esempio:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">Nessuna delle precedenti</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Annullare le selezioni <a name="clearing-selections"></a>

Per fare in modo che tutte le selezioni vengano annullate quando l'utente fa clic o tocca un elemento, imposta l'attributo di azione [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) sull'attributo e specifica l'`id` del selettore AMP con il metodo di azione `clear`.

Esempio:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="[tip type="success"]
guarda le demo dal vivo sul sito [AMP By Example](https://ampbyexample.com/components/amp-selector/).
[/tip]

## Attributi <a name="attributes"></a>

### Attributi di `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Questi attributi si comportano come quando utilizzati in un elemento HTML standard<code>select</code> [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>L'attributo <code>keyboard-select-mode</code> determina il comportamento della navigazione tramite tastiera per le opzioni all'interno di <code>amp-selector</code>.

    <ul><li><code>none</code> (valore predefinito): il tasto TAB permette di spostare lo stato attivo da un elemento all'altro all'interno di <code>amp-selector</code>. L'utente deve premere Invio o Spazio per modificare la selezione. I tasti freccia sono disattivati. </li><li>
    <code>focus</code>: il tasto TAB imposta lo stato attivo su <code>amp-selector</code>. L'utente naviga tra gli elementi utilizzando i tasti freccia. È necessario premere Spazio o Invio per modificare la selezione.</li><li>
    <code>select</code>: Il tasto TAB imposta lo stato attivo su <code>amp-selector</code>. La selezione cambia quando l'utente naviga tra gli elementi utilizzando i tasti freccia. </li></ul></td>
      </tr>
    </table>

### Attributi delle opzioni `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Indica che l'opzione è selezionabile.  Se viene specificato un valore, i contenuti di tale valore vengono inviati insieme al modulo.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Questi attributi si comportano allo stesso modo di quando vengono utilizzati in un elemento HTML standard [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## Eventi <a name="events"></a>

Gli eventi possono attivare delle azioni in altri componenti AMP utilizzando l'attributo `on`,
ad esempio `on="select: my-tab.show"`

Ulteriori informazioni su [azioni ed eventi AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code> attiva l'evento <code>select</code> quando l'utente seleziona un'opzione.
        I selettori multipli e singoli lo utilizzano quando si selezionano o deselezionano delle opzioni.
        L'evento <code>select</code> non si attiva quando vengono toccate le opzioni disattivate.
        <ul>
        <li>
          <code>event.targetOption</code> contiene il valore dell'attributo <code>option</code> relativo all'elemento selezionato.</li>
          <li>
            <code>event.selectedOptions</code> contiene un array dei valori relativi all'attributo <code>option</code> di tutti gli elementi selezionati.
          </li>
        </ul></td>
      </tr>

    </table>

## Convalida <a name="validation"></a>

Consulta le [regole di amp-selector](https://github.com/ampproject/amphtml/blob/main/extensions/amp-selector/validator-amp-selector.protoascii) nelle specifiche dello strumento di convalida AMP.
