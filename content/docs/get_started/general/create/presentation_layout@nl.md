---
$title: Presentatie en opmaak aanpassen
---

## De presentatie aanpassen

AMP's zijn webpagina's. Als u de stijl van de pagina en de pagina-elementen wilt bewerken, moet u hiervoor algemene CSS-eigenschappen gebruiken. Stijlelementen die klasse- of elementselectors gebruiken in een ingebouwde stylesheet in de `<head>`, ook wel `<style amp-custom>` genoemd:

[sourcecode:html]
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
[/sourcecode]

Elke AMP-pagina kan maar één ingebouwde stylesheet bevatten en er zijn bepaalde selectors die u niet mag gebruiken. [Meer informatie over stijl](/docs/guides/responsive/style_pages.html).

## De opmaak bewerken

AMP volgt strengere regels wat de opmaak van elementen op de pagina betreft. Op een normale HTML-pagina gebruikt u vrijwel uitsluitend CSS voor de opmaak van elementen. Maar met het oog op de prestaties moet in AMP voor alle elementen vanaf het begin een expliciet formaat worden ingesteld.

Ontdek hoe AMP een pagina weergeeft en opmaakt, en hoe u de opmaak kunt aanpassen in [De opmaak bewerken](/docs/guides/responsive/control_layout.html).

<a class="go-button button" href="/nl/docs/get_started/general/create/preview_and_validate.html">Doorgaan naar stap 4</a>
