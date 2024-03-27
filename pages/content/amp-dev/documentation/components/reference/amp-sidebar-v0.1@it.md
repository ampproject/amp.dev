---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    consente di visualizzare meta contenuti destinati all'accesso temporaneo come navigazione, link, pulsanti, menu.
toc: true
$title: amp-sidebar
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




<table>
  <tr>
    <td width="40%"><strong>Descrizione</strong></td>
    <td>
      Una barra laterale consente di visualizzare meta contenuti destinati all'accesso temporaneo (link di navigazione, pulsanti, menu e così via). La barra laterale può essere visualizzata toccando un pulsante, mentre i contenuti principali rimangono visibili al di sotto.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://ampjs.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td>Vedi <a href="https://ampbyexample.com/components/amp-sidebar/">l'esempio di amp-sidebar</a> sul sito AMP By Example.</td>
  </tr>
</table>

## Panoramica <a name="overview"></a>

`<amp-sidebar>` nasconde meta contenuti destinati all'accesso temporaneo (link di navigazione, pulsanti, menu e così via). `<amp-sidebar>` può essere aperta e chiusa toccando pulsanti e toccando all'esterno dell'amp-sidebar.
Tuttavia, gli attributi facoltativi che accettano le media query possono essere utilizzati per visualizzare meta contenuti in altre parti del sito. Gli elementi secondari `<nav toolbar="(media query)" toolbar-target="elementID">` consentono di visualizzare i contenuti della barra laterale in altre parti dei contenuti principali.

## Comportamento <a name="behavior"></a>

* `<amp-sidebar>` deve essere un elemento secondario diretto di `<body>`.
* La barra laterale può essere visualizzata solo sul lato sinistro o destro di una pagina.
* `<amp-sidebar>` può contenere qualsiasi elemento HTML valido (supportato da AMP).
* `<amp-sidebar>` può contenere uno dei seguenti elementi AMP:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* L'altezza massima della barra laterale è 100 vh. Se l'altezza supera 100 vh viene visualizzata una barra di scorrimento verticale. L'altezza predefinita è impostata su 100 vh in CSS ed è sovrascrivibile in CSS.
* La larghezza della barra laterale può essere impostata e regolata tramite CSS (la larghezza minima è 45 px).
* Touch zoom è disattivato nella `amp-sidebar` ed è nascosto quando la sidebar è aperta.

*Esempio*

Nel seguente esempio, utilizziamo `amp-sidebar` come contenitore degli elementi di navigazione. Tuttavia, il secondo e il quarto elemento, Nav Item 2 e Nav Item 4, vengono assegnati all'id elemento presente nella pagina. Utilizzando l'attributo [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md), possiamo scorrere facilmente fino all'elemento, utilizzando il relativo id e `scrollTo`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Apertura e chiusura della barra laterale <a name="opening-and-closing-the-sidebar"></a>

Per attivare/disattivare, aprire o chiudere la barra laterale quando un elemento viene toccato o cliccato, imposta l'attributo di azione [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) sull'elemento e specifica uno dei seguenti metodi di azione:

<table>
  <tr>
    <th>Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td>apertura (predefinito)</td>
    <td>Apre la barra laterale</td>
  </tr>
  <tr>
    <td>chiusura</td>
    <td>Chiude la barra laterale</td>
  </tr>
  <tr>
    <td>attivazione/disattivazione</td>
    <td>Attiva o disattiva lo stato della barra laterale</td>
  </tr>
</table>

Se l'utente tocca nuovamente l'area del contenuto principale parzialmente visibile, la barra laterale viene chiusa.

In alternativa, la barra laterale viene chiusa anche premendo il tasto Esc sulla tastiera.

*Esempio*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Barra degli strumenti <a name="toolbar"></a>

Puoi creare un elemento `toolbar` visualizzato in `<body>` specificando l'attributo `toolbar` con una media query e un attributo `toolbar-target` con un id elemento su un elemento `<nav>` secondario di `<amp-sidebar>`. La `toolbar` duplica l'elemento `<nav>` e i relativi elementi secondari e lo aggiunge all'elemento `toolbar-target`.

#### Comportamento <a name="behavior-1"></a>

* La barra laterale può implementare le barre degli strumenti aggiungendo elementi nav con gli attributi `toolbar` e `toolbar-target`.
* L'elemento nav deve essere un elemento secondario di `<amp-sidebar>` e avere il seguente formato: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Ad esempio, questo è un uso valido dell'attributo toolbar: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* L'elemento nav contenente l'attributo toolbar deve contenere solo un singolo elemento `<ul>`, che a sua volta contiene elementi `<li>`.
    * Gli elementi `<li>` possono contenere qualsiasi elemento HTML valido (supportato da AMP) o qualsiasi elemento AMP supportato da `<amp-sidebar>`.</li>
* Il comportamento della barra degli strumenti viene applicato solo mentre la media query dell'attributo `toolbar` è valida. Inoltre, per poter applicare la barra degli strumenti, nella pagina deve essere presente un elemento con id attributo `toolbar-target`.

*Esempio: barra degli strumenti di base*

Nel seguente esempio, viene visualizzata una `toolbar` se la larghezza della finestra è inferiore o uguale a 767 px. La `toolbar` contiene un elemento di input di ricerca. L'elemento `toolbar` verrà aggiunto all'elemento `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Cerca..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## Stile della barra degli strumenti <a name="styling-toolbar"></a>

All'elemento `toolbar` all'interno dell'elemento `<amp-sidebar>` verranno applicate classi a seconda che l'elemento `toolbar-target` sia visualizzato o nascosto. Questa funzione è utile per applicare stili diversi all'elemento `toolbar` e quindi all'elemento `toolbar-target`. Le classi sono `amp-sidebar-toolbar-target-shown` e `amp-sidebar-toolbar-target-hidden`. La classe `amp-sidebar-toolbar-target-shown` viene applicata all'elemento `toolbar` quando l'elemento `toolbar-target` è visualizzato. La classe `amp-sidebar-toolbar-target-hidden` viene applicata all'elemento `toolbar` quando l'elemento `toolbar-target` è nascosto.

*Esempio: classi di stato della barra degli strumenti*

Nel seguente esempio, viene visualizzata una `toolbar` se la larghezza della finestra è inferiore o uguale a 767 px. La `toolbar` contiene un elemento di input di ricerca. L'elemento `toolbar` verrà aggiunto all'elemento `<div id="target-element">`. Tuttavia, abbiamo aggiunto alcuni stili personalizzati per nascondere l'elemento `toolbar` quando è visualizzato l'elemento `<div id="toolbar-target">`.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Cerca..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>


```

[tip type="success"]
guarda le demo dal vivo sul sito [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Barra laterale per le storie <a name="sidebar-for-stories"></a>

L'uso di `amp-sidebar` è supportato nel [componente](../../../about/stories.html) `amp-story`.

### Comportamento <a name="behavior-2"></a>

* `<amp-sidebar>` deve essere un elemento secondario diretto di `<amp-story>`.
* Per impostazione predefinita, la barra laterale è sul lato "start" per i normali documenti AMP, ovvero quelli redatti in lingue con scrittura da sinistra a destra e da destra a sinistra.
* Il colore di sfondo predefinito di `<amp-sidebar>` è bianco ed è sovrascrivibile in CSS.
* La larghezza massima obbligatoria della `<amp-sidebar>` è `280 px` e `320 px` per i computer desktop.
* Un pulsante "hamburger" che apre/chiude la barra laterale sarà visualizzato nell'interfaccia utente della storia.

Per fornire un'esperienza di interfaccia utente coerente sull'intera piattaforma della storia, esistono alcune restrizioni relative agli attributi e alle funzionalità consentiti. Di seguito sono riportati gli attributi e le funzionalità consentiti di un `amp-sidebar` all'interno di un `amp-story`.

### Attributi consentiti <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [attributi comuni](#common)

*Esempio: barra laterale di base in una Storia*

Il seguente esempio mostra una semplice `amp-sidebar` all'interno di un'`amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Attributi <a name="attributes"></a>

##### side <a name="side"></a>

Indica da che lato della pagina si deve aprire la barra laterale: `left` o `right`.  Se non viene specificato un `side`, il valore `side` viene ereditato dall'attributo `dir` del tag `body` (`ltr` => `left` , `rtl` => `right`). Se non esiste alcuna `dir`, il `side` predefinito è `left`.

##### layout <a name="layout"></a>

Specifica il layout di visualizzazione della barra laterale, che deve essere `nodisplay`.

##### open <a name="open"></a>

Questo attributo è presente quando la barra laterale è aperta.

##### data-close-button-aria-label <a name="data"></a>

Attributo facoltativo utilizzato per impostare l'etichetta ARIA per il pulsante di chiusura aggiunto per l'accessibilità.

##### toolbar <a name="toolbar-1"></a>

Questo attributo è presente negli elementi secondari `<nav toolbar="(media-query)" toolbar-target="elementID">` e accetta una media query relativa a quando mostrare una barra degli strumenti. Per ulteriori informazioni su come utilizzare le barre degli strumenti, consulta la sezione [Barra degli strumenti](#toolbar-1).

##### toolbar-target <a name="toolbar-target"></a>

Questo attributo è presente nell'elemento secondario `<nav toolbar="(media-query)" toolbar-target="elementID">` e accetta un ID di un elemento nella pagina.  L'attributo `toolbar-target` inserisce la barra degli strumenti nell'ID specificato dell'elemento sulla pagina, senza utilizzare lo stile predefinito della barra degli strumenti. Per ulteriori informazioni su come utilizzare le barre degli strumenti, consulta la sezione [Barra degli strumenti](#toolbar-1).

##### attributi comuni <a name="common"></a>

Questo elemento include [attributi comuni](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estesi ai componenti AMP.

## Stili <a name="styling"></a>

Il componente `amp-sidebar` può essere in stile CSS standard.

* La `width` della `amp-sidebar` può essere impostata in modo da rientrare tra i valori minimi e massimi predefiniti, rispettivamente 45 px e 80 vw.
* Se necessario, l'altezza della `amp-sidebar` può essere impostata in modo da adattare l'altezza della barra laterale. Se l'altezza supera 100 vw, la barra laterale avrà una barra di scorrimento verticale. L'altezza preimpostata della barra laterale è 100 vw e può essere ignorata in CSS per accorciarla.
* Lo stato corrente della barra laterale viene esposto tramite l'attributo `open` impostato nel tag `amp-sidebar` quando la barra laterale è aperta nella pagina.

[tip type="success"]
consulta [AMP Start](https://ampstart.com/components#navigation) per menu di navigazione reattivi e con stile predefinito, da utilizzare nelle tue pagine AMP.
[/tip]

## Scorrimento automatico all'interno delle aree in overflow <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar` può far scorrere automaticamente il contenitore in overflow al primo elemento decorato con `autoscroll` come attributo sia per la barra laterale che per la barra degli strumenti.

Questa funzione è utile quando utilizzi un elenco di navigazione lungo e vuoi che la barra laterale scorra fino agli elementi di navigazione correnti quando la pagina si carica.

Quando utilizzi la funzione `toolbar`, `autoscroll` funziona solo se l'elemento `<nav toolbar>` è impostato su `overflow: auto` o `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

Per un esempio funzionante di codice, consulta [questo file di esempio](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html).

## Considerazioni relative all'esperienza utente <a name="ux-considerations"></a>

Quando utilizzi `<amp-sidebar>`, tieni presente che gli utenti visualizzano spesso la tua pagina sui dispositivi mobili in un visualizzatore AMP, che potrebbe visualizzare un'intestazione fissa. Inoltre, spesso i browser visualizzano la propria intestazione fissa nella parte superiore della pagina. Un ulteriore elemento con posizione fissa nella parte superiore dello schermo occuperebbe molto spazio sullo schermo del dispositivo mobile, con contenuti che non forniscono all'utente nuove informazioni.

Per questo motivo, consigliamo che gli inviti ad aprire la barra laterale non siano posizionati in un'intestazione fissa a larghezza massima.

## Convalida <a name="validation"></a>

Consulta le [regole amp-sidebar](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii) nella specifica dello strumento di convalida AMP.
