---
$title: Uw pagina voorbereiden op ontdekking en distributie
---

In sommige gevallen wilt u mogelijk over zowel een AMP-versie als een niet-AMP-versie van dezelfde pagina beschikken, bijvoorbeeld een nieuwsbericht. Overweeg het volgende: Als Google Zoeken de niet-AMP-versie van die pagina kan vinden, hoe weet Google Zoeken dan dat er ook een AMP-versie van bestaat?

## Pagina's linken met &lt;link>

We voegen om dit probleem op te lossen informatie over de AMP-pagina toe aan de niet-AMP-pagina en omgekeerd, in de vorm van `<link>`-tags in de `<head>`.

Voeg het volgende toe aan de niet-AMP-pagina:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

En dit aan de AMP-pagina

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Wat als ik maar één pagina heb?

Als u maar één pagina heeft en die pagina een AMP-pagina is, moet u nog steeds de canonieke link naar die pagina toevoegen. Deze verwijst dan simpelweg naar zichzelf:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<a class="go-button button" href="/nl/docs/get_started/create/publish.html">Doorgaan naar stap 6</a>
