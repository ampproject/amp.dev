---
'$title': Prepare your page for discovery and distribution
$order: 4
description: 'In alcuni casi potresti aver necessità di una versione AMP e non AMP della stessa pagina, ad esempio per un comunicato stampa. Considera quanto segue:...'
author: pbakaus
contributors:
  - bpaduch
---

In alcuni casi potresti aver necessità di una versione AMP e non AMP della stessa pagina, ad esempio per un comunicato stampa. Considera quanto segue: Se Google Search trova la versione non AMP di quella pagina, _come fa a sapere che ne esiste anche una versione AMP_?

## Collegamento di pagine con `<link>`

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

[tip type="read-on"] **CONTINUA A LEGGERE:** Ulteriori informazioni su come Google trova le pagine AMP sono disponibili nelle [linee guida della Ricerca Google per le pagine AMP](https://support.google.com/webmasters/answer/6340290). [/tip]
