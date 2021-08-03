---
'$title': Risoluzione degli errori di convalida
$order: 2
description: '"In questa sezione esamineremo e risolveremo gli errori di convalida della nostra pagina AMP. Nota: gli errori potrebbero essere visualizzati in un ordine diverso a seconda della console."'
---

In questa sezione esamineremo e risolveremo gli errori di convalida della nostra pagina AMP. Nota: gli errori potrebbero essere visualizzati in un ordine diverso a seconda della console.

## Inclusione di set di caratteri

Inizieremo correggendo il seguente errore:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Per visualizzare correttamente il testo, AMP richiede di specificare il set di caratteri per la pagina. Le metainformazioni sul set di caratteri devono essere il primo elemento figlio del tag `<head>`. Questo permette di non dover reinterpretare eventuali contenuti aggiunti prima del tag meta charset.

**Aggiungere** il codice seguente come prima riga del tag `<head>`:

```html
<meta charset="utf-8" />
```

**Salvare** il file e ricaricare la pagina. Controllare che l'errore sul set di caratteri non sia più visualizzato.

## Inclusione di collegamenti canonici

Ora, esaminiamo il seguente errore:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Ogni documento AMP deve avere un collegamento che faccia riferimento alla versione "canonica" di quel documento. La sezione [Rendi la tua pagina individuabile](discoverable.md) di questa esercitazione descriverà in maggior dettaglio le pagine canoniche e i diversi approcci di collegamento alla versione canonica.

Ai fini di questa esercitazione, considereremo come versione canonica della pagina l'articolo HTML originale che stiamo convertendo.

**Aggiungere** il seguente codice sotto il tag `<meta charset="utf-8"/>`:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Si può creare una pagina AMP canonica senza versione HTML standard. Il collegamento canonico è ancora obbligatorio, ma in questo caso dovrà puntare all'articolo AMP stesso:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Ora possiamo **ricaricare** la pagina. Sebbene ci siano ancora altri errori da correggere, l'errore del collegamento canonico non è più presente.

## Indicazione dell'attributo AMP

Le pagine AMP richiedono un attributo nell'elemento `<html>` radice per dichiarare che la pagina è un documento AMP.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Gli errori precedenti possono essere risolti semplicemente aggiungendo l'attributo `⚡` al tag `<html>` in questo modo:

```html
<html ⚡ lang="en"></html>
```

Ora ricaricando la pagina, entrambi gli errori saranno scomparsi.

[tip type="note"] Anche se l'indicazione dell'attributo `⚡` è l'approccio consigliato, è anche possibile utilizzare l'attributo `amp` al posto di `⚡`, come di seguito indicato:

```html
<html amp lang="en"></html>
```

[/tip]

## Indicazione di una porta di visualizzazione

Ora, occupiamoci del seguente errore:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

La sintassi AMP richiede la definizione degli attributi `width` e `minimum-scale` per la finestra di visualizzazione. Questi valori devono essere rispettivamente pari a `device-width` e `1`. Viewport è un tag comune incluso nella sezione `<head>` di una pagina HTML.

Per risolvere l'errore di visualizzazione, aggiungere il seguente frammento HTML al tag `<head>`:

```html
<meta name="viewport" content="width=device-width" />
```

I valori specificati per gli attributi `width` e `minimum-scale` sono obbligatori in AMP. La definizione `initial-scale` non è obbligatoria, ma è comunemente inclusa nello sviluppo di pagine web per dispositivi mobili. Altre informazioni sulle finestre di visualizzazione e sulle strutture reattive sono disponibili nella sezione [Configurazione della finestra di viusliazzazione](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Come fatto in precedenza, **ricaricare** la pagina e controllare che l'errore sia scomparso.

## Sostituzione di fogli di stile esterni

Il seguente errore è correlato al nostro utilizzo dei fogli di stile:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

In particolare, questo errore è relativo al seguente tag di collegamento del foglio di stile usato nel tag `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Il problema è che questo link è un riferimento a un foglio di stile esterno. Per velocizzare i tempi di caricamento dei documenti AMP, non è possibile includervi fogli di stile esterni. Tutte le regole di stile devono essere incorporate nel documento AMP utilizzando i tag `<style amp-custom></style>` o definendo stili inline.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Quindi, risolviamo l'errore:

1. **Rimuovere** il tag `<link>` che punta al foglio di stile nella sezione `<head>` e sostituirlo con un tag `<style amp-custom></style>` inline. L'attributo `amp-custom` nei tag di stile è obbligatorio.
2. **Copiare** tutti gli stili definiti nel file [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) nei tag `<style amp-custom></style>`.

Come fatto in precedenza, **ricaricare** la pagina e controllare che l'errore dei fogli di stile sia scomparso.

[tip type="note"] **NOTA:** Non solo è richiesto l'uso di stili incorporati, ma esiste anche un limite di 50 kilobyte alla dimensione del file per le informazioni di stile. Si consiglia di utilizzare dei preprocessori CSS, come [SASS](http://sass-lang.com/), per minimizzare il codice CSS prima di incorporarlo nelle pagine AMP. [/tip]

[tip type="important"] **IMPORTANTE: **Si può avere un solo tag di stile nell'intero documento AMP. Se ci sono più fogli di stile esterni referenziati dalle pagine AMP, essi dovranno essere raggruppati in un unico insieme di regole. Per sapere quali regole CSS sono valide in AMP, consultare la sezione [Contenuti CSS supportati](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Esclusione di codice JavaScript di terzi

I fogli di stile possano essere riutilizzati in modo relativamente semplice in pagine AMP incorporandone il codice CSS. Questo non si applica al codice JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

In generale, gli script in AMP sono consentiti solo se rispettano due requisiti principali:

1. Tutto il codice JavaScript deve essere asincrono (ovvero occorre includere l'attributo `async` nel tag script).
2. JavaScript può essere usato per la libreria AMP e per tutti i componenti AMP nella pagina.

Ciò permette di escludere in modo efficace tutto il codice JavaScript generato da utenti/terzi nelle pagine AMP, ad eccezione di quanto segue.

[tip type="note"] Le uniche eccezioni alla restrizione sull'uso di script generati da utenti/terzi sono:

1. Script che aggiungono metadati alla pagina o che configurano i componenti AMP. Questi avranno l'attributo type `application/ld+json` o `application/json`.
2. Script inclusi negli iframe. L'inclusione di JavaScript in iframe dovrebbe essere considerata una scelta eccezionale. Ove possibile, le funzionalità JavaScript vanno sostituite utilizzando [componenti AMP](../../../../documentation/components/index.html). Esploreremo il nostro primo componente AMP nella sezione successiva. [/tip]

Proviamo ad aprire il file esterno [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js). Come appare? Il file dovrebbe essere privo di qualsiasi codice JavaScript e includere solo un commento informativo come questo:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Considerando che questo file JavaScript esterno non è un componente funzionale del nostro sito web, possiamo rimuovere completamente il riferimento senza problemi.

**Rimuovere** il seguente riferimento JavaScript esterno dal documento:

```html
<script type="text/javascript" src="base.js"></script>
```

Come fatto in precedenza, **ricaricare** la pagina e controllare che l'errore dello script sia scomparso.

## Inclusione del boilerplate AMP CSS

I seguenti errori fanno riferimento alla mancanza di codice boilerplate:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Ogni documento AMP richiede il seguente codice boilerplate AMP:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Aggiungere** il codice boilerplate in fondo al tag `<head>` del documento.

Il tag `<style amp-boilerplate>` inizialmente nasconde il contenuto della sezione body, fino a quando non viene caricata la libreria JavaScript AMP. Solo in seguito il contenuto sarà visualizzato. In questo modo le pagine AMP impediscono il rendering di contenuti senza definizioni di stile, fenomeno anche noto come Flash Of Unstyled Content (FOUC). Ciò garantisce un'esperienza d'uso davvero veloce, poiché il rendering della pagina avviene in una sola volta, in particolare per ciò che si trova nella parte alta (above the fold). Il secondo tag ripristina questa logica se JavaScript è disabilitato nel browser.

## Sostituzione di `<img>` con `<amp-img>`

AMP non supporta i componenti HTML predefiniti per la visualizzazione di contenuti multimediali, il che spiega il seguente errore:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

AMP ha un componente web specifico per sostituire il tag `<img>`, cioè il tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Sostituire** il tag `<img>` con il precedente tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) ed eseguire di nuovo la convalida. Il sistema mostrerà alcuni nuovi errori:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Perché [`amp-img`](../../../../documentation/components/reference/amp-img.md) ha generato un altro errore? Perché [`amp-img`](../../../../documentation/components/reference/amp-img.md) non è un sostituto diretto del tradizionale tag HTML img. Ci sono requisiti aggiuntivi per usare [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### Sistema di layout AMP

L'errore di layout ci dice che [`amp-img`](../../../../documentation/components/reference/amp-img.md) non supporta il tipo di layout del `container`. Uno dei concetti più importanti nelle pagine AMP è la riduzione degli adattamenti dinamici del DOM richiesti per il rendering delle pagine web.

Per ridurre gli adattamenti dinamici del DOM, AMP include un sistema di layout per garantire che la struttura della pagina sia nota appena possibile durante il download e il rendering della pagina.

L'immagine seguente confronta il modo in cui una pagina HTML è spesso strutturata rispetto all'approccio applicato da AMP. Notare a sinistra come il testo scorre ogni volta che viene caricato un annuncio o un'immagine. L'approccio AMP al layout impedisce al testo di spostarsi, anche se il caricamento delle immagini e degli annunci richiede molto tempo.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

Il sistema di layout AMP consente di posizionare e ridimensionare gli elementi su una pagina in diversi modi: dimensioni fisse, design reattivo, altezza fissa e altro ancora.

Nel caso del nostro articolo, il sistema di layout ha dedotto che la struttura per [`amp-img`](../../../../documentation/components/reference/amp-img.md) è di tipo `container`. Tuttavia, il tipo `container` è applicabile solo agli elementi che contengono elementi figli. Il tipo `container` è incompatibile con il tag [`amp-img`](../../../../documentation/components/reference/amp-img.md), il che causa questo errore.

Cosa ha portato a dedurre un tipo `container`? Perché non abbiamo indicato l'attributo `height` nel tag [`amp-img`](../../../../documentation/components/reference/amp-img.md). In HTML, gli adattamenti dinamici possono essere ridotti indicando larghezza ed altezza fisse per gli elementi della pagina. In AMP, occorre definire gli attributi di altezza e larghezza per gli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md) in modo da rendere possibile l'individuazione anticipata delle proporzioni dell'elemento.

**Aggiungere** gli attributi `width` ed `height` al tag [`amp-img`](../../../../documentation/components/reference/amp-img.md) come segue:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Aggiornare la pagina e controllare il validatore; non si dovrebbe più vedere alcun errore!

Ora abbiamo un documento AMP valido, ma l'immagine non ha un bell'aspetto perché non è ben posizionata nella pagina. Per impostazione predefinita, indicando l'altezza e la larghezza per un elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md), il sistema AMP aggiusterà le dimensioni di conseguenza. Ma non sarebbe ancora meglio se AMP ridimensionasse l'immagine per adattarsi in modo _dinamico_ alla pagina, indipendentemente dalle dimensioni dello schermo?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Fortunatamente AMP può calcolare le proporzioni degli elementi dalla larghezza e altezza specificate. Ciò consente al sistema di layout AMP di posizionare e ridimensionare l'elemento in vari modi. L'attributo `layout` informa AMP di come posizionare e ridimensionare l'elemento.

Cerchiamo di **impostare** un attributo layout di tipo `responsive` in modo che la nostra immagini si adatti:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Ecco fatto! La nostra immagine ha le proporzioni corrette e riempie in modo dinamico la larghezza dello schermo.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **CONTINUA A LEGGERE:** Per ulteriori informazioni sul sistema di layout in AMP, consultare la sezione [Specifiche dei layout AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Ben fatto!

Ora il tuo documento AMP dovrebbe assomigliare a questo:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Aggiornare la pagina e guardare l'output della console. Si dovrebbe ricevere il seguente messaggio:

<pre class="success-text">AMP validation successful.</pre>

### Domande frequenti

- [Cosa sono gli adattamenti dinamici del DOM?](http://stackoverflow.com/a/27637245)
- [Cosa succede se l'attributo layout non è definito?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Cosa succede se larghezza e altezza non sono definite?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
