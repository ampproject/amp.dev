---
$title: Crea la tua pagina HTML AMP
---

Il seguente markup costituisce un discreto punto di inizio o boilerplate.
Copialo e salvalo in un file con estensione .html.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Il contenuto del corpo della pagina, fin qui, è piuttosto lineare. Nell’intestazione della pagina però è presente una buona porzione di codice supplementare che potrebbe non risultare immediatamente ovvio. Proviamo a scomporre il markup obbligatorio.

## Markup obbligatorio

I documenti HTML AMP DEVONO:

  - Iniziare con il doctype `<!doctype html>`.
  - Contenere un tag di primo livello `<html ⚡>` (`<html amp>` è ugualmente accettato).
  - Contenere i tag `<head>` e `<body>` (questi sono opzionali in HTML).
  - Contenere un tag `<link rel="canonical" href="$SOME_URL">` all’interno dell’intestazione che faccia riferimento alla normale versione HTML del documento HTML AMP o a sé stesso se non esiste tale versione HTML.
  - Contenere un tag `<meta charset="utf-8">` in quanto primo tag secondario del tag dell’intestazione.
  - Contenere un tag `<meta name="viewport" content="width=device-width">tazione. Si consiglia anche di includere initial-scale=1.
  - Contenere un tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` in quanto ultimo elemento dell’intestazione (ciò comprende e carica la libreria AMP JS).
  - Contenere quanto segue nei tag `<head>`:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Metadati opzionali

Oltre ai requisiti di base, il nostro campione nell’intestazione comprende anche una definizione Schema.org, che non è un requisito essenziale per AMP, ma è un requisito per la distribuzione del contenuto in alcuni luoghi, ad esempio nella [demo del carosello di notizie di Ricerca Google (provala sul tuo telefono)](https://g.co/ampdemo).

Per ulteriori informazioni su tutti i metadati che ti serviranno i svariate altre situazioni, come Twitter, [esamina i nostri campioni](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples). Per informazioni dettagliate su AMP in Ricerca Google, vai alla sezione [Top Stories con AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Buone notizie! Questo è tutto ciò che ci serve per creare la nostra prima pagina AMP, ma naturalmente il corpo della pagina non comprende ancora molte informazioni. Nella prossima sezione parleremo di come aggiungere componenti di base come immagini ed elementi AMP personalizzati, di come applicare uno stile alla pagina e di come definire un layout reattivo.
