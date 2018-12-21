---
$title: Preparazione della pagina per il rilevamento e la distribuzione
---

In alcuni casi potresti aver necessità di una versione AMP e non AMP della stessa pagina, ad esempio per un comunicato stampa. Considera quanto segue: Se Ricerca Google trova la versione non AMP di quella pagina, *come fa a sapere che ne esiste anche una versione AMP*?

## Collegamente delle pagine con &lt;link>

Per risolvere questo problema aggiungiamo delle informazioni sulla pagina AMP alla pagina non AMP e viceversa, sotto forma di tag `<link>` in `<head>`.

Aggiungi quanto segue nella pagina non AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Aggiungi questo nella pagina AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Cosa succede in caso di pagine in un solo formato?

Se la tua pagina è in un solo formato e stai usando una pagina AMP, devi comunque aggiungervi il link tradizionale, che a questo punto rimanda semplicemente a sé stesso:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Precedente</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Prossimo</span></a>
</div>
