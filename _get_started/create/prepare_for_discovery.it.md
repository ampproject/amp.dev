---
layout: page
title: Preparazione della pagina per il rilevamento e la distribuzione
order: 4
locale: it
---

In alcuni casi potresti aver necessità di una versione AMP e non AMP della stessa pagina, ad esempio per un comunicato stampa. Considera quanto segue: Se Ricerca Google trova la versione non AMP di quella pagina, *come fa a sapere che ne esiste anche una versione AMP*?

## Collegamente delle pagine con &lt;link>

Per risolvere questo problema aggiungiamo delle informazioni sulla pagina AMP alla pagina non AMP e viceversa, sotto forma di tag `<link>` in `<head>`.

Aggiungi quanto segue nella pagina non AMP:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

Aggiungi questo nella pagina AMP:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## Cosa succede in caso di pagine in un solo formato?

Se la tua pagina è in un solo formato e stai usando una pagina AMP, devi comunque aggiungervi il link tradizionale, che a questo punto rimanda semplicemente a sé stesso:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Vai al Passaggio 6" link="/docs/get_started/create/publish.it.html" %}
