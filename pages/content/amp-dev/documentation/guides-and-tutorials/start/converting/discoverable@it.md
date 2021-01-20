---
"$title": Rendi la tua pagina individuabile
"$order": '3'
description: È necessario impostare il seguente collegamento bidirezionale in modo che i motori di ricerca individuino la relazione tra il normale documento HTML e la corrispondente versione AMP.
---

Ora che abbiamo realizzato un articolo di notizie in AMP, assicuriamoci che gli utenti siano in grado di trovare e scoprire tali contenuti.

## Collegamenti ai contenuti AMP

Il sito web può essere composto da sole pagine AMP, oppure da alcune pagine AMP e altre no, o ancora solo da pagine normali. Questa parte dell'esercitazione spiegherà come incorporare contenuti AMP nella struttura di un sito web.

Il collegamento canonico nelle normali pagine HTML è una tecnica comunemente utilizzata per indicare qual è la pagina preferita, quando più pagine hanno lo stesso contenuto.

Un approccio comunemente adottato per aggiungere contenuti AMP a un sito web, consiste nel generare versioni AMP delle tradizionali pagine HTML non AMP. Entrambe le versioni hanno generalmente lo stesso contenuto (ad esempio il testo di un articolo) ma possono avere presentazioni diverse. In questo scenario, le pagine HTML tradizionali saranno le pagine "canoniche" e le pagine AMP dovranno essere accoppiate a quelle HTML corrispondenti.

Se possibile, occorre utilizzare la libreria AMP come qualsiasi altra libreria JavaScript per creare il sito, ignorando il collegamento alla versione canonica. L'utilizzo di AMP per creare un intero sito web riduce notevolmente le attività di manutenzione.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Ai fini di questa esercitazione, ci concentreremo sul caso in cui la pagina in questione ha una versione AMP e una non AMP. In questo esempio il nostro sito web include un articolo di notizie contenuto in una pagina HTML normale (`article.html`) e in una pagina AMP corrispondente (`article.amp.html`). Abbineremo queste pagine tramite l'uso di `link`.

Abbiamo già implementato il primo passo a questo scopo, includendo un tag di collegamento per tornare alla pagina canonica nella sezione `<head>` del documento AMP:

```html
<link rel="canonical" href="/article.html">
```

Il prossimo passo consiste nel collegare l'articolo canonico alla pagina AMP. A questo scopo, occorre includere un tag `<link rel="amphtml">` nella sezione `<head>` della versione canonica dell'articolo.

Nel file `article.html`, **aggiungere** il seguente codice alla sezione `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

Il diagramma seguente illustra le direzioni dei tag di collegamento:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

È necessario impostare il seguente collegamento bidirezionale in modo che i motori di ricerca individuino la relazione tra il normale documento HTML e la corrispondente versione AMP. Se non venissero forniti collegamenti, non necessariamente il crawler potrebbe individuare quali sono le "versioni AMP" corrispondenti ai normali documenti HTML di un articolo. Fornendo esplicitamente questi collegamenti ci assicuriamo che non vi siano ambiguità!

## Aggiunta di dati strutturati

Le pagine AMP valide non richiedono dati strutturati di [schema.org](http://schema.org/), ma alcune piattaforme come Google Search potrebbero averne bisogno per consentire l'accesso a determinate esperienze, quali le sequenze di storie principali. In genere è una buona idea includere dati strutturati. I dati strutturati aiutano i motori di ricerca ad analizzare meglio le pagine web e consentono agli utenti di visualizzare meglio i contenuti delle pagine trovate dai motori di ricerca (ad esempio nei frammenti strutturati). I dati strutturati sono inclusi nel tag `<head>` della pagina AMP tramite un tag script di tipo `application/ld+json`.

Per il nostro articolo di notizie, **aggiungere** i seguenti dati strutturati in fondo alla sezione `<head>` del documento AMP:

```html

<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
 },
 "headline": "My First AMP Article",
 "image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
 },
 "datePublished": "2015-02-05T08:00:00+08:00",
 "dateModified": "2015-02-05T09:20:00+08:00",
 "author": {
   "@type": "Person",
   "name": "John Doe"
 },
 "publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
 },
 "description": "My first experience in an AMPlified world"
}
</script>
```

[tip type="note"] **NOTA:** Il contenuto dovrebbe essere sempre lo stesso. Per gli articoli di notizie, specificare il tipo "NewsArticle". L'intestazione dovrebbe corrispondere al titolo dell'articolo. L'oggetto di tipo immagine si riferisce all'immagine principale dell'articolo. [/tip]

**Ricaricare** la pagina nel browser e verificare che non siano stati introdotti errori di convalida AMP.

[tip type="note"] Oltre al formato dei dati strutturati di schema.org, ci sono altri formati supportati dai motori di ricerca e dai social media. Consultare la documentazione supportata:

- [Tag meta delle schede Twitter](https://dev.twitter.com/cards/overview)
- [Tag meta di Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Convalida dei dati strutturati

Per verificare la correttezza dei dati strutturati, molte piattaforme forniscono strumenti di convalida. In questa esercitazione useremo lo [strumento Google di convalida dei dati strutturati](https://developers.google.com/structured-data/testing-tool/).

1. In una nuova finestra del browser, aprire lo [strumento Google di convalida dei dati strutturati](https://developers.google.com/structured-data/testing-tool/).
2. Selezionare la scheda **Frammenti di codice**.
3. Copiare il codice sorgente completo dalla pagina AMP nel pannello dell'editor di testo dello strumento di convalida.
4. Fare clic su **Esegui test**.

Se i dati strutturati sono validi, il sistema mostrerà le indicazioni **0 errors** e **0 warnings**.

[tip type="read-on"] **CONTINUA A LEGGERE-** Per ulteriori informazioni sulla ricerca delle pagine, consultare la guida [Rendi la tua pagina individuabile](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Bel lavoro! Hai completato il tuo articolo di notizie AMP.
