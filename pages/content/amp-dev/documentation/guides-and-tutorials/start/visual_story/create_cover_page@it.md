---
$title: Creazione della copertina
$order: 4
description: "Per creare una pagina, aggiungere l''elemento <amp-story-page> come figlio di amp-story. Assegnare un ID univoco alla pagina. Per la nostra prima pagina, cioè la copertina, assegniamo un ID univoco di copertina: ..."
author: bpaduch
---

Una pagina all'interno di una storia web è rappresentata dal componente `<amp-story-page>`. All'interno di un elemento [`amp-story`](../../../../documentation/components/reference/amp-story.md), ci possono essere uno o più componenti `<amp-story-page>`, ciascuno contenente le singole schermate della storia. La prima pagina specificata nell'ordine del documento è la prima pagina che viene visualizzata nella storia web.

Per creare una pagina, **aggiungere** l'elemento `<amp-story-page>` come figlio di [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Assegnare** un ID univoco alla pagina. Per la nostra prima pagina, cioè la copertina, assegniamo un ID univoco di `cover`:

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

Ora abbiamo il contenitore della nostra copertina. Tuttavia, la nostra storia non è ancora valida. All'interno della nostra pagina, dobbiamo specificare almeno un **livello**. {{image ('/ static / img / docs / tutorials / amp_story / cover_layers.png', 416, 679, alt = 'cover page has two layers', align = 'right third')}}

## Livelli in una pagina

Come i livelli di un grafico, i livelli nelle pagine di una storia AMP permettono di creare effetti visivi. I livelli sono innestati uno sull'altro, quindi il primo livello è il livello inferiore e il livello successivo è sopra al precedente e così via.

La nostra copertina è in realtà composta da due livelli:

- **Livello 1**: un'immagine che funge da sfondo
- **Livello 2**: il titolo e le righe della storia

### Creazione del livello 1

Aggiungiamo il nostro primo livello alla copertina. Il livello contiene un'immagine che riempie lo schermo.

Creare il livello aggiungendo l'elemento `<amp-story-grid-layer>` come figlio di `<amp-story-page>`. Poiché vogliamo che l'immagine riempia lo schermo, indicare l'attributo `template="fill"` per `amp-story-grid-layer`. All'interno del livello, aggiungere un elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) per il file `cover.jpg` assicurandosi che sia reattivo (cioè con `layout="responsive"`) con un'immagine da 720 x 1280 pixel. Ecco come appare il nostro livello:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Vediamo come appare la pagina. Aprire la pagina nel browser: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Ecco come dovrebbe apparire:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Creazione del livello 2

Quindi, abbiamo il nostro sfondo, ma ora abbiamo bisogno del secondo livello, che si trova sopra lo sfondo e contiene il titolo e le righe di testo. Per aggiungere il nostro secondo livello, effettuiamo le stesse operazioni eseguite per il livello 1, ma invece di utilizzare il modello `fill`, utilizzeremo il modello **`vertical`**. Tuttavia, prima di proseguire, dobbiamo conoscere i modelli e imparare a disporre gli elementi AMP e HTML in un elemento `<amp-story-grid-layer>`.

#### Disposizione degli elementi in un modello

L'elemento `<amp-story-grid-layer>` dispone i suoi elementi figli in una griglia (basata sulla [griglia CSS](https://www.w3.org/TR/css-grid-1/)). Per indicare come disporre tali elementi, è necessario specificare uno dei seguenti modelli di layout:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Modello: fill</h5></td>
</tr>
<tr>
    <td width="65%">Il modello <strong>fill</strong> riempie lo schermo con il primo elemento figlio nel livello. Eventuali altri elementi figli nel livello non saranno visualizzati.     Tale modello funziona bene per immagini e video di sfondo.   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">   &lt;amp-img src="dog.png" width="720" height="1280" layout="responsive">   &lt;/amp-img> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Modello: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">Il modello <strong>vertical</strong> dispone gli elementi figli lungo l'asse y. Gli elementi sono allineati dalla parte alta dello schermo e occupano tutto lo schermo lungo l'asse x.     Il modello verticale funziona bene nei casi in cui si vogliono innestare verticalmente gli elementi l'uno dopo l'altro.    <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Modello: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">Il modello <strong>horizontal</strong> dispone gli elementi figli lungo l'asse x. Gli elementi sono allineati all'inizio dello schermo e lo occupano interamente lungo l'asse y. Il modello orizzontale funziona bene per innestare gli elementi orizzontalmente uno dopo l'altro.<br><code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">   &lt;p>element 1&lt;/p>   &lt;p>element 2&lt;/p>   &lt;p>element 3&lt;/p> &lt;/amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Modello: Thirds</h5></td>
</tr>
<tr>
<td width="65%">Il modello <strong>thirds</strong> divide lo schermo in tre righe delle stesse dimensioni e consente di assegnare i contenuti in ciascuna area. Si può anche indicare il nome di una <code>grid-area</code> per specificare in quale terzo dello schermo si vuole inserire un contenuto: <code>upper-third</code>, <code>middle-third</code>, o <code>lower-third</code>. Le aree della griglia con nome permettono di modificare il comportamento predefinito degli elementi e dove essi appariranno. Ad esempio, con due elementi nel livello, si può collocare il primo elemento in <code>grid-area="upper-third"</code> e il secondo elemento in <code>grid-area="lower-third"</code>. <code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">   &lt;h1 grid-area="upper-third">element 1&lt;/h1>   &lt;p grid-area="lower-third">element 2&lt;/p> &lt;/amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Completiamo la nostra copertina

Ora che abbiamo compreso i modelli con livelli, completiamo il nostro secondo livello per la copertina.

Per il livello 2, vogliamo che l'intestazione e le righe siano in alto e vogliamo che gli elementi si susseguano l'uno dopo l'altro, quindi specificheremo il modello `vertical`. Il nostro secondo elemento `amp-story-grid-layer` segue il primo, in questo modo:

```html
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Aggiorniamo il browser e rivediamo il lavoro. La nostra copertina è ora completa.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
