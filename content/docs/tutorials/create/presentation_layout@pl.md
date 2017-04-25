---
$title: Modyfikowanie prezentacji i układu
---

## Modyfikowanie prezentacji

Strony AMP to strony internetowe; nadawanie stylu stronie i jej elementom odbywa się przy użyciu typowych właściwości CSS. Można nadawać elementom styl przy użyciu selektorów klas lub elementów w arkuszu stylów wstawionym w sekcji `<head>` nazywanym `<style amp-custom>`:

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

Każda strona AMP może mieć tylko jeden umieszczony arkusz stylów, a niektórych selektorów nie można używać. [Dowiedz się więcej o stosowaniu stylów](/pl/docs/guides/author-develop/responsive/style_pages.html.

## Sterowanie układem

W kwestii rozmieszczania elementów na stronie w AMP obowiązują bardziej rygorystyczne reguły. Na normalnej stronie HTML do rozmieszczania elementów używa się niemal wyłącznie CSS. Jednak ze względu na wydajność AMP wymaga, aby wszystkie elementy miały od początku ustawiony jawny rozmiar.

Wszystkie informacje na temat sposobu renderowania stron AMP i układów strony oraz możliwości modyfikacji układu można znaleźć w części [Jak sterować układem](/pl/docs/guides/author-develop/responsive/control_layout.html).

<a class="go-button button" href="/pl/docs/tutorials/create/preview_and_validate.html">Przejdź do kroku 4</a>
