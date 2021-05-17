---
$title: Rendere rilevabile la propria pagina
---

In alcuni casi, potresti voler avere sia una versione non AMP sia una versione AMP della stessa pagina, ad esempio di un articolo. Se la Ricerca Google trova la versione non AMP della pagina, come fa a sapere che esiste una versione AMP?

### Collegare pagine con i tag `link`

Per risolvere questo problema, aggiungiamo informazioni sulla pagina AMP alla pagina non AMP e viceversa inserendo tag `<link>` nella sezione `<head>`.

Aggiungi il codice seguente alla pagina non AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

E questo codice alla pagina AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Che cosa devo fare se ho soltanto una pagina?

Se hai soltanto una pagina, che è una pagina AMP, devi comunque aggiungervi l'elemento link canonical, che rimanderà poi semplicemente a se stesso:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Integrare con piattaforme di terze parti utilizzando metadati aggiuntivi <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

A volte un sito di terze parti (in cui è incorporata la tua pagina AMP o che include link che rimandano alla tua pagina) ha bisogno di avere ulteriori informazioni sulla tua pagina oltre a sapere che si tratta di una pagina AMP. Una piattaforma potrebbe porre diverse domande sulla tua pagina, ad esempio per sapere se si tratta di un articolo, di un video oppure se esistono uno screenshot e una breve descrizione.

Questo non è pertinente soltanto per le pagine AMP, ma per tutte le pagine web. Per alcune piattaforme, questi metadati sono informazioni aggiuntive, mentre per altre sono obbligatori. Se sono obbligatori, le piattaforme **non mostreranno link che rimandano ai tuoi contenuti se non includi i metadati corretti**. Assicurati di includere i metadati corretti per le piattaforme su cui vuoi che vengano visualizzati i tuoi contenuti.

### Utilizzare Schema.org per la maggior parte dei motori di ricerca

[Schema.org](http://schema.org/) offre vocabolari aperti in cui è possibile aggiungere metadati per qualsiasi cosa. Nel caso di AMP, le proprietà appropriate per il contesto includono il tipo di contenuti specifico (ad esempio "articolo"), il titolo, la data di pubblicazione e le immagini di anteprima associate.

Esempio:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Puoi trovare altri esempi nella [cartella di esempi ampproject](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples), inclusa la sintassi alternativa degli attributi HTML.

Nota. Questa definizione di Schema.org è un requisito per rendere idonei i tuoi contenuti alla visualizzazione nella demo del [carousel di notizie della Ricerca Google (prova su dispositivo mobile)](https://g.co/ampdemo).
Visita anche le pagine [Top Stories con AMP](https://developers.google.com/structured-data/carousels/top-stories) e [Strumento di test per i dati strutturati](https://developers.google.com/structured-data/testing-tool/).

### Altri metadati per un numero maggiore di piattaforme

Visita la [guida Social Discovery sul sito Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) per scoprire tutti gli altri metodi per preparare i tuoi contenuti affinché possano essere rilevati e distribuiti.
