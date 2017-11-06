---
$title: Obsługa CSS
---

Tak jak wszystkie strony internetowe, strony AMP korzystają ze stylów CSS,
jednak nie obsługują arkuszy zewnętrznych
(z wyjątkiem [czcionek niestandardowych](#wyjątek-–-niestandardowe-czcionki)).
Niedozwolone są również określone style z powodu ograniczeń wydajnościowych;
wbudowywanie atrybutów stylów w tekst nie jest dozwolone.

Wszystkie style muszą być zawarte w nagłówku dokumentu
(przeczytaj artykuł [Dodawanie stylów do strony](/pl/docs/guides/debug/validate.html)).
Jednak by lepiej zarządzać treścią, do tworzenia stron statycznych możesz używać szablonów oraz preprocesorów CSS.

**Uwaga:**
komponenty AMP zawierają style domyślne,
ułatwiając projektowanie elastycznych stron internetowych.
Te style są definiowane w pliku
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

[TOC]

## Korzystanie z preprocesorów CSS

Obsługa preprocesorów w przypadku AMP wygląda tak samo, jak w przypadku innych stron internetowych.
Na przykład witryna [ampproject.org](https://www.ampproject.org/) korzysta z preprocesora
[Sass](http://sass-lang.com/).
(Do tworzenia statycznych stron AMP, z których składa się witryna [ampproject.org](https://www.ampproject.org/), używamy generatora [Grow](http://grow.io/).

Podczas korzystania z preprocesorów zwróć szczególną uwagę na zasoby – umieszczaj tylko te, z których korzysta strona.
Na przykład [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) zawiera wszystkie wymagane znaczniki AMP oraz wbudowane w tekst style CSS z plików źródłowych `*.scss`.
Zawiera również, między innymi, element niestandardowy skryptu dla
[`amp-youtube`](/docs/reference/extended/amp-youtube.html). Dzięki temu na wielu stronach tej witryny można umieścić filmy z YouTube.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Aby zobaczyć, jak powyższy kod przekłada się na sformatowany dokument AMP HTML, wyświetl kod źródłowy dowolnej strony w [ampproject.org](https://www.ampproject.org/).
(W Chrome kliknij prawym przyciskiem myszy i wybierz `Wyświetl źródło strony`).

## Niedozwolone style

Poniższe style nie są dozwolone na stronach AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Niedozwolony styl</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Wbudowane atrybuty stylów</td>
      <td data-th="Description">Wszystkie style muszą być zdefiniowane w sekcji <code>&lt;head&gt;</code> strony,
       wewnątrz tagu <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>ważny kwalifikator </td>
      <td data-th="Description">Użycie niedozwolone.
      Jest to niezbędny wymóg umożliwiający standardowi AMP narzucanie własnych reguł dotyczących rozmiarów elementów.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Zabroniony z wyjątkiem <a href="#wyjątek-–-niestandardowe-czcionki">czcionek niestandardowych</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (selektor uniwersalny)</td>
      <td data-th="Description">Obniża wydajność i może służyć
      do obchodzenia innych ograniczeń dotyczących selektorów.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Można go używać do symulowania selektora uniwersalnego.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudoselektory, pseudoklasy i pseudoelementy</td>
      <td data-th="Description">Pseudoselektory, pseudoklasy i pseudoelementy są dozwolone tylko
      w przypadku selektorów zawierających nazwy tagów. Nazwy te nie mogą się rozpoczynać ciągiem znaków <code>amp-</code>.
      Zapis poprawny: <code>a:hover, div:last-of-type</code>
      Zapis niepoprawny: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Klasa <code>-amp-</code> i nazwy tagów <code>i-amp-</code></td>
      <td data-th="Description">Nazwy klas w autorskich arkuszach stylów nie mogą się rozpoczynać ciągiem znaków <code>-amp-</code>. Są one zarezerwowane do użytku wewnętrznego przez standard AMP. Z tego powodu arkusze stylów użytkownika nie mogą wskazywać selektorów CSS dla klas <code>-amp-</code> ani tagów <code>i-amp</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">Korzystanie z tych właściwości nie jest dozwolone
      ze względów bezpieczeństwa.</td>
    </tr>
  </tbody>
</table>

## Dozwolone właściwości przenoszenia i animacji

Standard AMP umożliwia tylko przenoszenia oraz animacje właściwości, które można przyspieszyć w większości przeglądarek za pomocą GPU.
W projekcie AMP obecnie dozwolone są właściwości `opacity`, `transform`,
i `-vendorPrefix-transform`.

W poniższych przykładach atrybut `<property>` musi się znajdować na białej liście:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

Właściwość `overflow` (oraz `overflow-y`, `overflow-x`)
nie mogą funkcjonować jako “auto” lub “scroll”.
Żaden definiowany przez użytkownika element dokumentu AMP nie może mieć paska przewijania.

## Wyjątek – niestandardowe czcionki

Strony AMP nie mogą zawierać zewnętrznych arkuszy stylów, z wyjątkiem niestandardowych czcionek.
Dwie obsługiwane metody obsługi niestandardowych czcionek
to tagi link wskazujące dostawców dozwolonych czcionek i zastosowanie atrybutu `@font-face`.

Dostawcy czcionek mogą być na białej liście,
tylko jeśli obsługują integracje CSS i korzystają z protokołu HTTPS.
Obecnie tylko następujący dostawcy są dozwoleni
i mogą serwować czcionki za pomocą tagów linków:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Przykładowy tag link wskazujący dozwolonego dostawcę czcionek, Google Fonts:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Można też użyć atrybutu [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
Czcionki wykorzystane za pomocą atrybutu `@font-face` należy pobierać za pomocą protokołu HTTP lub HTTPS.
