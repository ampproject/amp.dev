---
$title: Tworzenie elastycznych stron AMP
---

Tworzenie elastycznych elementów AMP jest bardzo łatwe.
Wystarczy dodać do nich parametr `layout=responsive`.

[TOC]

## Tworzenie obrazów elastycznych

Wszystkie źródła wczytywane spoza strony, w tym obrazy, muszą mieć określony rozmiar i pozycję, by podczas ładowania się nie skakały po ekranie i nie zmieniały swojego układu.

Tworzenie obrazów elastycznych odbywa się poprzez określenie ich szerokości i wysokości, włączenie układu elastycznego oraz wskazanie za pomocą parametru [`srcset`](/docs/guides/responsive/style_pages.html), który plik obrazu będzie używany, zależnie od rozmiaru ekranu:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Ten element `amp-img` automatycznie
dopasowuje się do szerokości kontenera,
a jego wysokość jest ustalana automatycznie za
pomocą współczynnika proporcji określonego szerokością
i wysokością:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

Zapoznaj się również z zawartością strony [AMP by Example – amp-img](https://ampbyexample.com/components/amp-img/).

## Dodawanie stylów do strony

Wszystkie style dodaje się w tagu `<style amp-custom>`
w nagłówku dokumentu.
Na przykład:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Ważne:**
upewnij się, że na stronie jest tylko jeden tag `<style amp-custom>`,
bo standard AMP nie pozwala na więcej.

Zdefiniuj style komponentów za pomocą
selektorów klasy lub elementu,
korzystając z typowych właściwości CSS. Na przykład:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Ważne:**
sprawdź, czy standard AMP obsługuje style, których chcesz użyć.
Niektóre style nie są dozwolone ze względu na ich wydajność
(sprawdź również [obsługiwane elementy CSS](/docs/guides/responsive/style_pages.html)).

## Dobierz rozmiar i pozycje elementów

Standard AMP rozdziela układ i elementy dokumentu od ładowania zasobów,
by móc wczytać układ strony bez potrzeby czekania na ich pobranie.

Określ rozmiar i pozycję wszystkich widocznych elementów AMP,
dodając atrybuty `width` i `height`.
Te atrybuty opisują współczynnik proporcji obrazu,
który następnie podlega skalowaniu za pomocą kontenera.

Ustaw układ elastyczny.
Dzięki temu rozmiar elementu jest dopasowywany do szerokości kontenera,
a jego wysokość jest automatycznie dopasowywana do współczynnika proporcji określonego za pomocą atrybutów szerokości i wysokości.

Dowiedz się więcej na temat [układów obsługiwanych przez AMP](/docs/guides/responsive/control_layout.html).

## Zweryfikuj style i układ

Za pomocą narzędzia do weryfikacji stron AMP
przetestuj stronę pod kątem poprawności kodu CSS i układu strony.

Narzędzie to potwierdzi, że kod CSS Twojej strony nie
przekracza limitu 50 000 bajtów,
sprawdzi, czy strona nie zawiera niedozwolonych stylów,
oraz dopilnuje, by układ strony był poprawnie obsługiwany
i formatowany.
Sprawdź listę [błędów stylów i układów](/docs/reference/validation_errors.html#style-and-layout-errors).

Przykładowy błąd w konsoli dla strony z kodem CSS przekraczającym 50 000 bajtów:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Dowiedz się więcej o [weryfikacji stron AMP](/docs/guides/validate.html),
w tym o sposobie wyszukiwania i naprawy błędów stylów.
