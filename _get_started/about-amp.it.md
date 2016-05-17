---
layout: page
title: Che cos’è AMP?
order: 0
locale: it
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP è un metodo per creare pagine web di contenuto statico con un rendering veloce.
Il formato AMP in azione è costituito da tre diversi componenti:

{% include toc.html %}

**HTML AMP** è il formato HTML con alcuni limiti per garantire l’affidabilità delle performance
e determinate estensioni per creare contenuto con formattazione più ricca rispetto all’HTML di base.
La libreria **AMP JS** assicura il rendering veloce delle pagine HTML AMP.
La **Google AMP Cache** (facoltativa) distribuisce le pagine HTML AMP.

## HTML AMP

HTML AMP è essenzialmente l’HTML esteso con proprietà AMP personalizzate.
La forma più semplice di file AMP HTML si presenta così:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Benché la maggior parte di tag in una pagina HTML AMP sia costituita da normali tag HTML,
alcuni di essi vengono sostituiti da tag HTML specifici per il formato AMP (vedi anche
[Tag HTML nella specifica AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Questi elementi personalizzati, denominati componenti HTML AMP,
facilitano l’implementazione di modelli comuni in modo efficiente.

Ad esempio, il tag [`amp-img`](/docs/reference/amp-img.html)
offre il supporto `srcset` completo anche nei browser che ancora non lo supportano.
Scopri come [creare la tua prima pagina HTML AMP](/docs/get_started/create_page.html).

## AMP JS

La [libreria AMP JS](https://github.com/ampproject/amphtml/tree/master/src) implementa
tutte le [best practice relative alle prestazioni di AMP](/docs/get_started/technical_overview.html),
gestisce il caricamento delle risorse e offre i tag personalizzati indicati sopra,
il tutto per garantire il rendering veloce della pagina.

Tra le principali ottimizzazioni ricordiamo il fatto che rende asincrono tutto ciò che proviene da risorse esterne, pertanto nella pagina non vi sono elementi che ne possano bloccare il rendering.

Altre tecniche di ottimizzazione prestazionale comprendono l’uso della modalità sandbox di tutti gli iframe, il precalcolo del layout di ogni elemento nella pagina prima del caricamento delle risorse e la disabilitazione dei selettori CSS lenti.

Per ulteriori informazioni non solo sulle [ottimizzazioni](/docs/get_started/technical_overview.html) ma anche sui limiti imposti, [leggi la specifica HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

La Google AMP Cache è una rete di distribuzione del contenuto basata su proxy
che consente la pubblicazione di tutti i documenti AMP convalidati.
Recupera le pagine HTML AMP, le memorizza nella cache e ne migliora automaticamente le prestazioni.
Quando si usa la Google AMP Cache, il documento, tutti i file JS e tutte le immagini vengono caricati
dalla stessa fonte che utilizza
[HTTP 2.0](https://http2.github.io/) per ottimizzare l’efficienza.

La cache prevede anche un
[sistema di convalida](https://github.com/ampproject/amphtml/tree/master/validator)
incorporato che conferma l’idoneità della pagina
e il fatto che non dipenda da risorse esterne.
Il sistema di convalida esegue una serie di asserzioni
per confermare che il markup della pagina sia conforme alla specifica HTML AMP.

Un’altra versione dello strumento di convalida viene fornita in dotazione con ogni pagina AMP. Questa versione è in grado di registrare gli errori di convalida direttamente nella console del browser quando viene eseguito il rendering della pagina,
per consentire di vedere in che modo eventuali modifiche complesse del codice
possono ripercuotersi sulle prestazioni e sull’esperienza utente.

Per ulteriori informazioni consulta la sezione sul [testing delle pagine HTML AMP](/docs/guides/validate.html).
