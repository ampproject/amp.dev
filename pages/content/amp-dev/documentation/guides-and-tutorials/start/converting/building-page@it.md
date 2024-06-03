---
'$title': Realizzazione di una normale pagina HTML
$order: 1
description: "Nella directory di progetto si trova un file denominato article.html. Si tratta della pagina di articoli per cui stiamo realizzando un'equivalente pagina AMP ..."
---

Nella directory di progetto si trova un file denominato [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Si tratta della pagina di articoli per cui stiamo realizzando un'equivalente pagina AMP.

1. **Copiare** l'intero codice dal file `article.html` e incollarlo in un nuovo file.
2. **Salvare** il nuovo file col nome `article.amp.html`.

[tip type="note"] **NOTA:** Non è necessario denominare i file AMP con estensione `.amp.html`. In effetti, i file AMP possono avere qualsiasi estensione. È abbastanza comune il caso di editori che differenziano le pagine AMP dalle loro corrispondenti versioni canoniche utilizzando parametri nell'URL. Ad esempio: `http://publisher.com/article.html?amp`. [/tip]

Il file `article.amp.html` dovrebbe avere il seguente aspetto:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

La pagina realizzata è volutamente semplice. Essa contiene articoli di notizie realizzati con semplici elementi statici: codice CSS, JavaScript e un tag per immagini.

La nostra versione AMP dell'articolo è solo una copia dell'articolo originale in questo momento. Convertiamolo in AMP.

Per iniziare, aggiungeremo il file della libreria AMP. Questo da solo non basterà a rendere il nuovo file una pagina AMP valida, ma vedremo in seguito come la libreria AMP ci permette di realizzare pagine AMP valide.

Per includere la libreria AMP, **aggiungere** questa riga di codice alla fine del tag `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Caricare** la nuova pagina `article.amp.html` nel browser all'indirizzo [http://localhost: 8000/article.amp.html](http://localhost:8000/article.amp.html), quindi **aprire** la [Console per sviluppatori](https://developer.chrome.com/devtools/docs/console) in Chrome (o sul proprio browser preferito).

Controllando il risultato del codice JavaScript nella Console per sviluppatori (occorre selezionare la scheda Console), dovrebbe apparire la seguente voce di registro:

```text
Powered by AMP ⚡ HTML
```

La libreria AMP include uno strumento di [convalida AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) che dirà se ci sono errori che rendono la pagina un documento AMP non valido. **Abilitare** lo strumento di convalida AMP aggiungendo questo identificatore di frammento all'URL del documento:

```text
#development=1
```

Per esempio:

```text
http://localhost:8000/article.amp.html#development=1
```

La Console per sviluppatori dovrebbe indicare diversi errori di convalida (per vederli potrebbe essere necessario aggiornare manualmente la pagina nel browser):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Per rendere questa pagina un documento AMP valido, dovremo correggere tutti questi errori, come mostrato in questa lezione codelab.

Prima però, poiché stiamo progettando questa pagina di notizie per un dispositivo mobile, **simuliamo** l'esperienza di utilizzo di un dispositivo mobile negli strumenti di sviluppo del browser. Ad esempio, in Chrome DevTools, fare clic sull'icona del cellulare e selezionare un dispositivo mobile dal menu.

Il sistema dovrebbe mostrare una simulazione della risoluzione del dispositivo mobile nel browser come la seguente:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Adesso siamo pronti per metterci al lavoro! Esaminiamo uno alla volta gli errori di convalida e analizziamo il modo in cui si risolvono in AMP.
