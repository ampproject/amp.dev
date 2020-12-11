---
$title: Formattazione di guide ed esercitazioni
description: Requisiti di formattazione dei file per amp.dev
---

Guide ed esercitazioni possono essere inviate sul sito [Markdown](https://www.markdownguide.org/), con una formattazione aggiuntiva per frontmatter e codici brevi.

## Posizione della documentazione

I contenuti su amp.dev provengono da due archivi, [amp.dev](https://github.com/ampproject/amp.dev) e [AMPHTML](https://github.com/ampproject/amphtml). Tutta la documentazione di riferimento per i componenti proviene dagli elementi integrati o dalle estensioni di AMPHTML.

- [Componenti integrati](https://github.com/ampproject/amphtml/tree/master/builtins)
- [Componenti](https://github.com/ampproject/amphtml/tree/master/extensions)
- [Corsi](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [Esempi](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [Guide ed esercitazioni](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

Ci sono altri documenti che possono essere importati in amp.dev da AMPHTML. Tali documenti [sono elencati in questo file](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Non aggiornare tali documenti nell'archivio amp.dev: le modifiche applicate saranno sovrascritte nei successivi build!

## Frontmatter

C'è un frontmatter in cima a tutte le guide ed esercitazioni.

Esempio:

```yaml
$title: Inclusione di JavaScript personalizzati in pagine AMP
$order: 7
formats:
  - sitiweb
author: CrystalOnScript
contributors:
  - fstanis
description: Per esperienze web che richiedono numerose personalizzazioni, AMP ha creato amp-script, un componente che permette l'uso di qualunque JavaScript sulle pagine AMP, senza conseguenze sulle prestazioni globali delle pagine stesse.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>Titolo del documento che apparirà nell'indice. Scrivere in maiuscolo la prima lettera della prima parola e il resto in minuscolo. Fanno eccezione "AMP" e altri nomi propri. Usare la e commerciale `&` invece della parola `e`.</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Definisce la posizione dell'indice in cui visualizzare il documento. Potrebbe essere necessario modificare il campo `$ order` in altri documenti per visualizzarlo nella posizione corretta.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>Elenca le esperienze AMP per cui il documento è rilevante. Se il  documento è relativo a siti web e storie AMP, ma non ad annunci o e-mail AMP, il frontmatter dovrebbe riportare quanto segue: "yaml formats: - siti web - storie "</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>L'autore sei tu! Usa il tuo nome utente GitHub.</td>
  </tr>
  <tr>
   <td>
<code>contributi di</code>
   </td>
   <td>Elencare chiunque abbia contribuito al documento. Questo campo è facoltativo</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Scrivere una breve descrizione della guida o esercitazione. Questo permette l'ottimizzazione con i motori di ricerca, rendendo il lavoro rintracciabile a chi ne ha bisogno!</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Aggiungere `tutorial: true` al frontmatter del sito web per aggiungere l'icona dell'esercitazione accanto ad esso. Le esercitazioni sono elencate in fondo alla loro sezione nell'indice.</td>
  </tr>
</table>

# Codici brevi

Un elenco dei codici brevi e alcune informazioni sul loro uso sono disponibili alla pagina [documentation.md su GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## Immagini

amp.dev è realizzato con AMP! Perciò le nostre immagini devono rispettare i criteri di [`amp-img`](../../../../documentation/components/reference/amp-img.md). Il processo di building fa uso della seguente sintassi per convertire le immagini nel corretto formato `amp-img`.

<div class="ap-m-code-snippet">
<pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Immagine dell\'app di avvio dell\'esercitazione per script amp di base') }}</pre>
</div>

## Filtro delle sezioni

Alcuni documenti potrebbero essere rilevanti per più formati AMP, ma alcuni formati potrebbero richiedere ulteriori spiegazioni o informazioni non richieste da altri. Queste sezioni possono essere filtrate racchiudendole nel seguente codice breve.

<div class="ap-m-code-snippet">
<pre>&lsqb;filter formats="websites"]<br>Questo è visibile solo per i [siti web](?format=websites).<br>&lsqb;/filter]</pre>
</div>

[filter formats="websites"] Questo è visibile solo per [siti web](?format=websites). [/filter]

[filter formats="websites, email"] Questo è visibile per [siti web](?format=websites) ed [e-mail](?format=email). [/filter]

[filter formats="stories"] Questo è visibile per le [storie](?format=stories). [/filter]




## Suggerimenti

Si possono aggiungere suggerimenti e richiami, racchiudendo il testo nel seguente codice breve:

<div class="ap-m-code-snippet">
<pre>&lsqb;tip type="default"]<br>Suggerimento predefinito<br>&lsqb;/tip]</pre>
</div>

[tip type="important"] Importante [/tip]

[tip type="note"] Nota [/tip]

[tip type="read-on"] Continua a leggere [/tip]




## Frammenti di codice

I frammenti di codice possono essere inseriti all'interno di blocchi di tre apici inversi, indicando il linguaggio alla fine del primo blocco di apici.

<div class="ap-m-code-snippet">
<pre>```html<br>  // esempio di codice<br>```</pre>
</div>

```css
  // esempio di codice
```

```js
  // esempio di codice
```





Se il codice contiene doppie parentesi graffe, come spesso accade usando modelli [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites), occorre racchiudere nelle parentesi la porzione di codice:

<div class="ap-m-code-snippet">
<pre>```html<br>{% raw	%}<br>  // codice con doppie parentesi graffe <br>{% endraw	%}<br>```</pre>
</div>

### Frammenti di codice in elenchi

Python-Markdown ha alcune limitazioni. Utilizzare la sintassi seguente quando si includono i frammenti di codice in elenchi:

<div class="ap-m-code-snippet">
<pre>1. Primo:<br>    &lsqb;sourcecode:html]<br>      <br>        <p>Contenuto allineato.</p><br>      <br>    &lsqb;/sourcecode]<br>  2. Secondo<br>  3. Terzo</pre>
</div>

## Anteprima di esempi di codice

Gli esempi di codice possono contenere un'anteprima e/o un collegamento a una versione [AMP Playground](https://playground.amp.dev/).

<div class="ap-m-code-snippet">
  <pre>  &lsqb;example preview="default: none|inline|top-frame"<br>          playground="default: true|false"<br>          imports="<custom-element-1>,<custom-element-2>,..."           template="<custom-template>"]   ```html     // esempio di codice   ```   &lsqb;/example]   </custom-template></custom-element-2></custom-element-1></pre>
</div>

Nota: l'anteprima verrà automaticamente trasformata nel formato attualmente selezionato all'apertura del playground 🤯!

Usare l'attributo `preview` per definire la generazione dell'anteprima:

- **none**: Non saranno generate anteprime

- **inline**: L'anteprima di esempio appare sopra al codice sorgente. Un'anteprima inline è possibile solo per esempi di siti web normali il cui codice non contiene elementi  `head`. Usare questa opzione per piccoli esempi che non richiedono alcuno stile o elementi `head` (gli elementi importati non devono essere considerati poiché sono indicati tramite l'attributo `imports`).

- **top-frame**: l'anteprima di esempio appare al di sopra del codice in un iframe. L'orientamento può essere scelto tra le modalità `portrait` e `landscape`. L'orientamento può essere predefinito usando l'attributo aggiuntivo:

- **orientation**: `default: landscape|portrait`

Se occorrono elementi personalizzati, indicarli nell'atributo `imports` tramite un elenco di elementi separati da virgola, in cui il none del componente è seguito dai due punti e dalla versione. Se il codice fa uso di [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) indicare la dipendenza nell'attributo `template`.

Per contenuti e-mail con collegamenti a risorse, usare nel sorgente il segnaposto <code>{{server_for_email}}</code>.

### Esempio Inline

Ecco un semplice esempio di codice incorporato inline. Il CSS può essere definito tramite stili inline:

<div class="ap-m-code-snippet">
<pre>  [example preview="inline" playground="true"]<br>    ```html<br>    <div style="background: red; width: 200px; height: 200px;">Ciao Mondo</div><br>    ```<br>  [/example]<br>  [/example]</pre>
</div>

Questo è il suo aspetto:

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Ciao Mondo</div>
```

[/example]

Avvertenza: i campioni inline sono incorporati direttamente nella pagina. Ciò potrebbe causare conflitti se i componenti sono già utilizzati nella pagina (ad es. `amp-consent`).

### Anteprima riquadro in primo piano (top-frame)

Utilizzare l'anteprima top-frame se occorre specificare elementi di intestazione o definire stili globali in `<style amp-custom>` .

Importante: non aggiungere alcun codice boilerplate AMP all'intestazione poiché verrà aggiunto automaticamente, in base al formato AMP. Aggiungere all'intestazione solo elementi richiesti dall'esempio!

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><br>      <style amp-custom><br>        body {<br>          background: red;<br>        }<br>      </style><br>    </head><br>    <body><br>      <h1>Hello AMP</h1><br>      <amp-youtube width="480"<br>        height="270"<br>        layout="responsive"<br>        data-videoid="lBTCB7yLs8Y"><br>      </amp-youtube><br>    </body><br>    ```<br>  [/example]</pre>
</div>

Questo è il suo aspetto:

[example preview="top-frame" playground="true"]

```html
<head>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Ciao AMP</h1>
  <amp-youtube width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y">
  </amp-youtube>
</body>
```

[/example]

### Storie AMP

Per l'anteprima delle storie AMP, usare le opzioni `preview="top-frame"` e `orientation="portrait"`.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         orientation="portrait"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-story"<br>          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script><br>      <style amp-custom><br>        body {<br>          font-family: 'Roboto', sans-serif;<br>        }<br>        amp-story-page {<br>          background: white;<br>        }<br>      </style><br>    </head><br>    <body><br>      <amp-story standalone><br>        <amp-story-page id="cover"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>Hello World</h1><br>            <p>This is the cover page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>        <amp-story-page id="page-1"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>First Page</h1><br>            <p>This is the first page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>      </amp-story><br>    </body><br>    ```<br>  [/example]</pre>
</div>

Questo è il suo aspetto:

[example preview="top-frame" orientation="portrait" playground="true"]

```html
  <head>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
      body {
        font-family: 'Roboto', sans-serif;
      }
      amp-story-page {
        background: white;
      }
    </style>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="cover">
        <amp-story-grid-layer template="vertical">
          <h1>Ciao Mondo</h1>
          <p>Questa è la copertina della storia.</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="vertical">
          <h1>Prima pagina</h1>
          <p>Questa è la prima pagina della storia.</p>
        </amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
```

[/example]

### URL assoluti per e-mail AMP

Notare l'utilizzo di <code>{{server_for_email}}</code> per rendere assoluto l'URL dell'endpoint incorporato all'interno di un'e-mail AMP.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame" playground="true"]<br>    ```html<br>    <div class="resp-img">       <amp-img alt="flowers" src="%7B%7Bserver_for_email%7D%7D/static/inline-examples/images/flowers.jpg" layout="responsive" width="640" height="427"></amp-img>     </div><br>    ```<br>  [/example]</pre>
</div>

Questo è il suo aspetto:

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"></amp-img>
</div>
```

[/example]

### Salto di modelli mustache

Ecco un esempio di codice `top-frame` che fa uso di un endpoint remoto. I modelli Mustache possono essere saltati nel codice usando le opzioni <code>{% raw %}</code> e <code>{% endraw %}</code>:

<div class="ap-m-code-snippet">
  <pre>&#91;example preview=&quot;top-frame&quot;<br>        playground=&quot;true&quot;<br>        imports=&quot;amp-list:0.1&quot;<br>        template=&quot;amp-mustache:0.2&quot;]<br>    ```html<br>    &lt;amp-list width=&quot;auto&quot; height=&quot;100&quot; layout=&quot;fixed-height&quot;<br>      src=&quot;&#123;&#123;server_for_email}}/static/inline-examples/data/amp-list-urls.json&quot;&gt;<br>      &lt;template type=&quot;amp-mustache&quot;&gt;&#123;% raw %}<br>        &lt;div class=&quot;url-entry&quot;&gt;<br>          &lt;a href=&quot;&#123;&#123;url}}&quot;&gt;&#123;&#123;title}}&lt;/a&gt;<br>        &lt;/div&gt;<br>      &#123;% endraw %}<br>      &lt;/template&gt;<br>    &lt;/amp-list&gt;<br>    ```<br>[/example]</pre>
</div>

Questo è il suo aspetto:

[example preview="top-frame" playground="true" imports="amp-list:0.1" template="amp-mustache:0.2"]

```html
<amp-list width="auto" height="100" layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## Collegamenti

Per collegarsi ad altre pagine, è possibile usare la sintassi del collegamento markdown standard:

```md
 [link](../../../courses/beginning-course/index.md)
```

Il riferimento utilizzato per il collegamento a un'altra pagina su amp.dev, sarà un percorso relativo al file di destinazione.

### Ancoraggi

I collegamenti a sezioni specifiche di un documento sono realizzati tramite ancoraggi:

```md
[collegamento a sezione di esempio](#example-section)
```

Per effettuare collegamenti a una sezione, occorre creare in essa la destinazione di ancoraggio tramite l'opzione `<a name="#anchor-name></a>`. Un buon posto per tale definizione è al termine del titolo della sezione:

```html
## Sezione di esempio <a name="example-section"></a>
```

Per definire un ancoraggio, si possono utilizzare solo lettere, cifre, trattini e sottolineature. Gli ancoraggi devono avere brevi nomi in inglese corrispondenti al titolo o descrittivi della sezione. Assicurarsi che il nome dell'ancoraggio sia unico all'interno del documento.

Quando una pagina viene tradotta, i nomi dei suoi ancoraggi non devono essere modificati ma rimanere in inglese.

Quando si crea un ancoraggio che verrà utilizzato in un collegamento da un'altra pagina, è necessario creare lo stesso ancoraggio in tutte le traduzioni.

### Filtri per formato AMP

Documenti dei componenti, guide, esercitazioni ed esempi possono essere filtrati in base ai formati AMP, quali siti web o storie AMP. Quando si effettua il collegamento a tali pagine, è necessario specificare esplicitamente un formato supportato dalla destinazione, aggiungendo il parametro di formato alla fine del collegamento:

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

Solo avendo la certezza che la destinazione supporta **tutti** i formati della pagina, è possibile omettere il parametro.

### Riferimenti a componenti

Se si omette l'indicazione della versione, i collegamenti alla documentazione di riferimento di un componente puntano automaticamente all'ultima versione. Se si intende puntare a una versione specifica, occorre indicare il nome completo:

```md
 [ultima versione](../../../components/reference/amp-carousel.md?format=websites)
 [versione specifica](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## Struttura dei documenti

### Titoli, intestazioni e sottotitoli

La prima lettera della prima parola di titoli, intestazioni e sottotitoli è in maiuscolo, il resto è minuscolo. Fanno eccezione il termine AMP e altri nomi propri. Nessuna intestazione ha come titolo `Introduction`, poiché le introduzioni seguono il titolo del documento.

### Nomi dei documenti

Assegnare ai documenti un nome con l'utilizzo del trattino per separare le parole.

<table>
  <tr>
   <td>
<strong>Sì</strong>
   </td>
   <td>
<strong>No</strong>
   </td>
  </tr>
  <tr>
   <td>esercitazione-ciao-mondo.md</td>
   <td>esercitazione_ciao_mondo.md</td>
  </tr>
  <tr>
   <td>Fondamenti-dei-siti-web.md</td>
   <td>Fondamenti_dei_siti_web.md</td>
  </tr>
  <tr>
   <td>azioni-ed-eventi.md</td>
   <td>azioniedeventi.md</td>
  </tr>
</table>
