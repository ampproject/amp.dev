---
'$title': Modyfikacja prezentacji i układu
$order: 3
description: 'Strony AMP są stronami internetowymi; dowolna stylizacja strony i jej elementów odbywa się za pomocą wspólnych właściwości CSS. Do stylizowania elementów służą selektory klas lub elementów...'
author: pbakaus
contributors:
  - bpaduch
---

## Modyfikowanie prezentacji

Strony AMP są stronami internetowymi; dowolna stylizacja strony i jej elementów odbywa się za pomocą wspólnych właściwości CSS. Do stylizowania elementów służą selektory klas lub elementów w arkuszu stylów osadzonym w sekcji `<head>`, o nazwie `<style amp-custom>`:

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

Każda strona AMP może mieć tylko jeden wbudowany arkusz stylów i style inline, ale niektórych selektorów nie wolno używać. [Dowiedz się wszystkiego o stylizacji](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Sterowanie układem

Przy układaniu elementów na stronie AMP stosowane są bardziej rygorystyczne zasady. Na zwykłej stronie HTML do rozmieszczania elementów używasz prawie wyłącznie CSS. Ze względu na wydajność AMP wymaga natomiast, aby wszystkie elementy miały od początku jawnie określony rozmiar.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się wszystkiego o sposobie, w jaki AMP renderuje stronę i generuje jej układ oraz o możliwościach modyfikowania układu z artykułu [Zapytania o układ i media](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]
