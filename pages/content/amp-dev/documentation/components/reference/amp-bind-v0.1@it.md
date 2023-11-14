---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Consente agli elementi di cambiare in base alle azioni dell'utente o alle modifiche dei dati per mezzo di associazione di dati ed espressioni semplici simili a JavaScript.
---



Aggiunge interattività personalizzata tramite associazione di dati ed espressioni.


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


<table>
  <tr>
    <td class="col-fourty"><strong>Script obbligatorio</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://ampjs.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Esempio di codice introduttivo con annotazioni</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Esempio di caroselli di immagini collegati con annotazioni</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Esempio di pagina di prodotti di e-commerce con annotazioni</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Tutorial</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Creare pagine AMP interattive</a></td>
  </tr>
</table>

# Panoramica <a name="overview"></a>

Il componente `amp-bind` ti permette di aggiungere dell'interattività stateful personalizzata alle tue pagine AMP tramite associazione di dati ed espressioni simili a JavaScript.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Guarda questo video per un'introduzione ad amp-bind.</figcaption></figure>

# Un esempio semplice <a name="a-simple-example"></a>

Nell'esempio seguente, toccando il pulsante il testo dell'elemento `<p>` cambia da "Hello World" a "Hello amp-bind".

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: &#39;amp-bind&#39;})">Say "Hello amp-bind"</button>
```

[tip type="note"]
per prestazioni ottimali e per evitare il rischio di salti inaspettati dei contenuti, `amp-bind` non valuta le espressioni al caricamento della pagina. Ciò significa che gli elementi visivi dovrebbero avere uno stato predefinito e non fare affidamento su `amp-bind` per la visualizzazione iniziale.
[/tip]

### Come funziona? <a name="how-does-it-work"></a>

`amp-bind` ha tre componenti principali:

1. [Stato](#state). Uno stato JSON mutevole orientato al documento. Nell'esempio precedente, state è vuoto prima che l'utente tocchi il pulsante.  Dopo aver toccato il pulsante, state diventa `{foo: 'amp-bind'}`.
2. [Espressioni](#expressions). Espressioni simili a JavaScript che possono fare riferimento a **state**. L'esempio precedente contiene una sola espressione, `'Hello ' + foo`, che concatena il valore letterale della stringa `'Hello '` e la variabile di stato `foo`.
All'interno di un'espressione possono essere utilizzati un massimo di 100 operandi.
3. [Associazioni](#bindings). Attributi speciali del modulo `[property]` che collegano la proprietà di un elemento a una **expression**. L'esempio precedente contiene una sola associazione, `[text]`, che aggiorna il testo dell'elemento `<p>` ogni volta che il valore dell'espressione cambia.

`amp-bind` fa tutto il possibile per garantire velocità, sicurezza e prestazioni nelle pagine AMP.

### Un esempio un po' più complesso <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>


<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<p><button on="tap:AMP.setState({currentAnimal: &#39;cat&#39;})">Set to Cat</button>
```

  Quando viene premuto il pulsante:

  1. Lo **stato** viene aggiornato con `currentAnimal`, definito come `'cat'`.
  1. Le **espressioni** che dipendono da `currentAnimal` vengono valutate:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. Le **associazioni** che dipendono dalle espressioni modificate vengono aggiornate:

    * Il testo del primo elemento `<p>` sarà "This is a cat."
    * L'attributo `class` del secondo elemento `<p>` sarà "redBackground".
    * L'elemento `amp-img` mostrerà l'immagine di un gatto.</li>

  [tip type="success"]
[prova la **demo dal vivo**](https://ampbyexample.com/components/amp-bind/) di questo esempio con annotazioni del codice.
[/tip]

# Dettagli <a name="details"></a>

# Stato <a name="state"></a>

Tutti i documenti AMP che utilizzano `amp-bind` presentano dei dati JSON mutevoli orientati al documento, detti **state**.

# Inizializzare lo stato con `amp-state` <a name="initializing-state-with-amp-state"></a>

Lo stato di `amp-bind` può essere inizializzato con il componente `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

Le [espressioni](#expressions) possono fare riferimento a variabili di stato tramite la sintassi dot. In questo esempio, `myState.foo` avrà come risultato `"bar"`.

* Un elemento secondario JSON di `<amp-state>` ha una dimensione massima di 100 kB.
* Un elemento `<amp-state>` può anche specificare un URL CORS anziché uno script JSON secondario. Per ulteriori dettagli, consulta l'[appendice](#amp-state-specification).

# Aggiornare lo stato <a name="refreshing-state"></a>

Questo componente supporta l'azione `refresh`, che può essere utilizzata per aggiornare
i contenuti dello stato.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Aggiornare lo stato con `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

L'azione [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) unisce un valore letterale oggetto allo stato. Ad esempio, quando viene premuto il pulsante in basso, `AMP.setState()` [unirà forzatamente](#deep-merge-with-ampsetstate) il valore letterale oggetto allo stato.

```html
<!-- Like JavaScript, you can reference existing
      variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

In generale, gli oggetti nidificati saranno uniti fino a una profondità massima di 10. Tutte le variabili, incluse quelle introdotte da `amp-state`, possono essere sostituite.

Quando attivato da certi eventi, `AMP.setState()` può anche accedere ai dati correlati agli eventi nella proprietà `event`.

```html
<!-- The "change" event of this <input> element contains
    a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Modificare la cronologia con `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

L'azione [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) è simile ad `AMP.setState()`, ma in aggiunta inserisce una nuova voce
nell'elenco della cronologia di navigazione. Accedendo a questa voce della cronologia, ad esempio, tornando indietro, viene ripristinato
il valore precedente delle variabili impostate da `AMP.pushState()`.

Ad esempio:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* Se tocchi il pulsante, la variabile `foo` sarà impostata su 123 e si creerà una nuova voce della cronologia.
* Se torni indietro, `foo` verrà ripristinato al suo valore precedente, "bar" (equivale a chiamare `AMP.setState({foo: 'bar'})`.

# Espressioni <a name="expressions"></a>

Le espressioni sono simili a JavaScript, con alcune differenze importanti.

# Differenze da JavaScript <a name="differences-from-javascript"></a>

* Le espressioni possono accedere solo allo [stato](#state) del documento che le contiene.
* Le espressioni **non** hanno accesso a elementi globali come `window` o `document`.
* Puoi utilizzare solo gli operatori e le [funzioni consentiti](#allow-listed-functions).
* I loop, le classi e le funzioni personalizzate in genere non sono consentiti. Le funzioni a freccia sono consentite come parametri, ad esempio, `Array.prototype.map`.
* Le variabili non definite e l'indice della matrice fuori intervallo restituiscono `null` anziché `undefined` o degli errori.
* Per garantire buone prestazioni, in una singola espressione possono attualmente essere presenti un massimo di 50 operandi. Nel caso in cui siano insufficienti per il tuo caso d'uso, [non esitare a contattarci](https://github.com/ampproject/amphtml/issues/new).

La grammatica completa e l'implementazione delle espressioni sono riportate in [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) e [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js).

# Esempi <a name="examples"></a>

Di seguito sono riportate tutte le espressioni valide:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Funzioni consentite <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Tipo di oggetto </th>
    <th>Funzioni</th>
    <th>Esempio</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>Le funzioni a freccia a parametro singolo non possono presentare parentesi. Ad esempio, utilizza `x => x + 1` anziché `(x) => x + 1`. Inoltre, `sort()` e `splice()` restituiscono copie modificate anziché operare sul posto

<sup>2</sup>Le funzioni statiche non dispongono di spazio dei nomi. Ad esempio, utilizza `abs(-1)` anziché `Math.abs(-1)`.

# Definire macro con `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

I frammenti dell'espressione `amp-bind` possono essere riutilizzati definendo una `amp-bind-macro`. L'elemento `amp-bind-macro` ti permette di definire un'espressione che accetta zero o più argomenti e fa riferimento allo stato corrente. Una macro può essere richiamata come una funzione facendo riferimento al valore del suo attributo `id` in qualunque punto del tuo documento.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro></p>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Una macro può anche chiamare altre macro <i>definite prima di essa</i>. Una macro non può chiamare se stessa in modo ricorsivo.

# Associazioni <a name="bindings"></a>

Un'**associazione** è un attributo speciale del modulo `[property]` che collega la proprietà di un elemento a un'[espressione](#expressions). Puoi anche utilizzare una sintassi alternativa compatibile con XML per mezzo di `data-amp-bind-property`.

Quando lo **stato** cambia, le espressioni vengono rivalutate e le proprietà degli elementi associati vengono aggiornate con i nuovi risultati delle espressioni.

`amp-bind` supporta le associazioni di dati in quattro tipi di stati dell'elemento:

<table>
  <tr>
    <th>Tipo</th>
    <th>Attributi</th>
    <th>Dettagli</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Supportato dalla maggior parte degli elementi di testo.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">Classi CSS</a></td>
    <td><code>[class]</code></td>
    <td>Il risultato dell'espressione deve essere una stringa delimitata da spazi.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden">L'attributo <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Deve essere un'espressione booleana.</td>
  </tr>
  <tr>
    <td>Dimensione degli <a href="../../../documentation/components/index.html">elementi AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Modifica la larghezza e/o l'altezza dell'elemento AMP.</td>
  </tr>
  <tr>
    <td>Attributi specifici degli elementi</td>
    <td><a href="#element-specific-attributes">Vari</a></td>
    <td></td>
  </tr>
</table>

Note sulle associazioni:

* Per motivi di sicurezza, le associazioni a `innerHTML` non sono consentite.
* Tutte le associazioni degli attributi sono bonificate da valori non sicuri (ad esempio, `javascript:`).
* I risultati delle espressioni booleane attivano o disattivano attributi booleani. Ad esempio, `<amp-video [controls]="expr"...>`. Quando `expr` ha come risultato `true`, l'elemento `<amp-video>` ha l'attributo `controls`. Quando `expr` ha come risultato `false`, l'attributo `controls` viene rimosso.
* I caratteri di parentesi quadre `[` e `]` nei nomi degli attributi possono essere problematici durante la scrittura di XML (ad esempio, XHTML, JSX) o di attributi tramite API DOM. In questi casi, utilizza la sintassi alternativa `data-amp-bind-x="foo"` anziché `[x]="foo"`.

# Attributi specifici degli elementi <a name="element-specific-attributes"></a>

È consentita l'associazione solo ai seguenti componenti e attributi:

<table>
  <tr>
    <th>Componente</th>
    <th>Attributi</th>
    <th>Comportamento</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Modifica il video Brightcove visualizzato.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Modifica l'indice della diapositiva attualmente visualizzata. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Vedi un esempio</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Imposta la data selezionabile meno recente.<br>
      Imposta la data selezionabile più recente.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Mostra il documento all'URL aggiornato.<br>Modifica il titolo del documento.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Modifica l'URL di origine dell'iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>Quando effettui un'associazione a <code>[src]</code>, assicurati di associare anche a <code>[srcset]</code> in modo che l'associazione funzioni su cache.<br>Vedi gli <a href="amp-img.md#attributes">attributi amp-img</a> corrispondenti.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Attiva o disattiva la visualizzazione della lightbox. Suggerimento: utilizza <code>on="lightboxClose: AMP.setState(...)"</code> per aggiornare le variabili quando la lightbox è chiusa.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Se l'espressione è una stringa, recupera e mostra JSON dall'URL della stringa.
      Se l'espressione è un oggetto o un array, mostra i dati dell'espressione.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Modifica gli elementi secondari attualmente selezionati<br>identificati dai loro valori attributo <code>option</code>. Supporta un elenco di valori separati da virgola per la selezione multipla. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Vedi un esempio</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Recupera JSON dal nuovo URL e lo unisce allo stato esistente. <em>Tieni presente che il successivo aggiornamento ignorerà gli elementi <code>&lt;amp-state&gt;</code> per impedire i cicli.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>Vedi gli <a href="amp-video.md#attributes">attributi amp-video</a> corrispondenti.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Cambia il video di YouTube visualizzato.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Cambia il link.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">attributi button</a> corrispondenti.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">attributi details</a> corrispondenti.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Attiva o disattiva fieldset.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">attributi image</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">attributi input</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">attributi options</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">attributi optgroup</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">attributi select</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">attributi source</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">attributi track</a> corrispondenti.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>Vedi gli <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">attributi textarea</a> corrispondenti.</td>
    </tr>
  </table>

  <sup>*</sup>Denota degli attributi associabili che non possiedono una controparte non associabile.

# Debug <a name="debugging"></a>

Esegui dei test in modalità sviluppatore (con il frammento dell'URL `#development=1`) per identificare avvisi ed errori durante lo sviluppo e per accedere a funzioni speciali di debug.

# Avvisi <a name="warnings"></a>

In modalità sviluppatore, `amp-bind` genererà un avviso quando il valore predefinito di un attributo associato non coincide con il risultato iniziale dell'espressione corrispondente. Ciò aiuta a prevenire cambiamenti non intenzionali causati da modifiche in altre variabili di stato. Ad esempio:

```html
<!-- Il valore di classe predefinito dell'elemento ('def') non corrisponde al risultato dell'espressione [class] ('abc'),
quindi verrà generato un avviso in modalità sviluppatore. -->

<p class="def" [class]="'abc'"></p>

```

In modalità sviluppatore, `amp-bind` genererà un avviso anche quando viene tolto il riferimento a variabili o proprietà non definite. Ciò aiuta anche a prevenire cambiamenti non intenzionali causati dai risultati `null` delle espressioni. Ad esempio:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->
<p [text]="myAmpState.bar">Some placeholder text.</p>

```

# Errori <a name="errors"></a>

Esistono diversi tipi di errori di runtime che possono verificarsi quando si utilizza `amp-bind`.

<table>
  <tr>
    <th>Tipo</th>
    <th>Messaggio</th>
    <th>Suggerimento</th>
  </tr>
  <tr>
    <td class="col-thirty">Associazione non valida</td>
    <td class="col-fourty"><em>L'associazione a [someBogusAttribute] su &lt;P> non è consentita</em>.</td>
    <td class="col-thirty">Utilizza solo <a href="#element-specific-attributes">associazioni consentite</a>.</td>
  </tr>
  <tr>
    <td>Errore di sintassi</td>
    <td><em>Errore nella compilazione dell'espressione in...</em></td>
    <td>Controlla che l'espressione non presenti errori ortografici.</td>
  </tr>
  <tr>
    <td>Funzioni non consentite</td>
    <td><em>alert non è una funzione supportata.</em></td>
    <td>Utilizza solo le <a href="#allow-listed-functions">funzioni consentite</a>.</td>
  </tr>
  <tr>
    <td>Risultato bonificato</td>
    <td><em>"javascript:alert(1)" non è un risultato valido per [href].</em></td>
    <td>Evita espressioni o protocolli URL non accettati dallo strumento di convalida AMP.</td>
  </tr>
  <tr>
    <td>Violazione CSP</td>
    <td><em>Impossibile creare un worker da 'blob:...' perché viola la seguente direttiva relativa alle norme sulla sicurezza dei contenuti...</em></td>
    <td>Aggiungi <code>default-src blob:</code> alle norme sulla sicurezza dei contenuti della tua origine. <code>amp-bind</code> delega la porzione più impegnativa dell'elaborazione a un <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">web worker dedicato</a> per garantire buone prestazioni.</td>
  </tr>
</table>

# Stato di debug <a name="debugging-state"></a>

Utilizza `AMP.printState()` per visualizzare lo stato corrente sulla console.

# Appendice <a name="appendix"></a>

# Specifica di `<amp-state>` <a name="amp-state-specification"></a>

Un elemento `amp-state` può contenere un elemento secondario `<script>` **O** un attributo `src` che contiene a sua volta un URL CORS per un endpoint JSON, ma non entrambi.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state></p>

<p><amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Gruppi di XHR <a name="xhr-batching"></a>

AMP raggruppa le XMLHttpRequests (XHR) negli endpoint JSON, ovvero puoi utilizzare una singola richiesta di dati JSON come origine dati per più consumatori (ad esempio, più elementi `amp-state`) in una pagina AMP.  Ad esempio, se l'elemento `amp-state` crea un XHR per un endpoint, mentre l'XHR è in esecuzione tutti i successivi XHR per lo stesso endpoint non si attiveranno e restituiranno invece i risultati del primo XHR.

# Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>L'URL dell'endpoint remoto che restituirà il JSON per aggiornare questo <code>amp-state</code>. Deve essere un servizio HTTP CORS.
        L'attributo <code>src</code> consente tutte le sostituzioni di variabili URL standard. Per ulteriori informazioni, consulta la <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">Guida alle sostituzioni</a>.
        [tip type="important"]
      L'endpoint deve implementare i requisiti specificati nella specifica <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">Richieste CORS in AMP</a>.
      [/tip]</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (facoltativo)</strong></td>
    <td>Definisce un'opzione <code>credentials</code> come specificato dall'<a href="https://fetch.spec.whatwg.org/">API Fetch</a>.
      <ul>
        <li>Valori supportati: `omit`, `include`</li>
        <li>Impostazione predefinita: `omit`</li>
      </ul>
      Per inviare le credenziali, trasmetti il valore di <code>include</code>. Se questo valore è impostato, la risposta deve rispettare le <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">norme sulla sicurezza AMP CORS</a>.</td>
    </tr>
  </table>

# Deep-merge con `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

Quando `AMP.setState()` viene chiamato, `amp-bind` effettua il deep-merge il valore letterale oggetto fornito con lo stato corrente. Tutte le variabili del valore letterale oggetto sono scritte direttamente nello stato, eccetto per gli oggetti nidificati, che vengono uniti in modo ricorsivo. Le primitive e gli array nello stato vengono sempre sostituite da variabili con lo stesso nome nel valore letterale oggetto.

Considera l'esempio seguente:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

Quando viene premuto il primo pulsante, lo stato cambia in:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

Quando viene premuto il secondo pulsante, `amp-bind` unisce in modo ricorsivo l'argomento letterale oggetto `{employee: {age: 64}}` nello stato esistente.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` è stato aggiornato; tuttavia, le chiavi `employee.name` ed `employee.vehicle` non sono cambiate.

Tieni presente che `amp-bind` genererà un errore se chiami `AMP.setState()` con un valore letterale oggetto che contiene riferimenti circolari.

# Rimuovere una variabile <a name="circular-references"></a>

Per rimuovere una variabile di stato esistente, imposta il suo valore su `null` in `AMP.setState()`. Partendo dallo stato dell'esempio precedente, premi:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

Lo stato verrà modificato in:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Analogamente:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

Lo stato verrà modificato in:

```javascript
{
  <!-- State is empty -->
  }
```

# Grammatica delle espressioni <a name="expression-grammar"></a>

La grammatica simile a BNF per le espressioni `amp-bind`:

```text
expr:
operation
| invocation
| member_access
| '(' expr ')'
| variable
| literal

operation:
    !' expr
    | '-' expr
    | '+' expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    | expr '&amp;&amp;' expr
    | expr '||' expr
    | expr '<=' expr
    | expr '<' expr
    | expr '>=' expr
    | expr '>' expr
    | expr '!=' expr
    | expr '==' expr
    | expr '?' expr ':' expr

  invocation:
      expr '.' NAME args

    args:
        (' ')'
        | '(' array ')'
        ;

      <p>member_access:
          expr member
          ;

        <p>member:
            .' NAME
            | '[' expr ']'

          <p>variable:
              NAME
              ;

            literal:
                STRING
                | NUMBER
                | TRUE
                | FALSE
                | NULL
                | object_literal
                | array_literal

              array_literal:
                  [' ']'
                  | '[' array ']'

                array:
                    expr
                    | array ',' expr

                  object_literal:
                      {' '}'
                      | '{' object '}'</p>

                    object:
                        key_value
                        | object ',' key_value</p>

                      key_value:
                          expr ':' expr
```
