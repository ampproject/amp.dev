---
'$title': Obsługiwane CSS
description: Jak wszystkie strony internetowe, strony AMP są stylizowane za pomocą CSS, ale nie można odwoływać się do zewnętrznych arkuszy stylów, z wyjątkiem czcionek niestandardowych. Niedozwolone są również niektóre style...
formats:
  - websites
  - email
  - ads
  - stories
author: Meggin
contributors:
  - pbakaus
  - CrystalOnScript
  - bpaduch
  - choumx
---

[filter formats="email"] Uwaga: AMP dla poczty e-mail określa dodatkowe ograniczenia CSS, które są opisane w artykule [CSS obsługiwane przez AMP dla poczty e-mail](../../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md). [/filter]

Jak wszystkie strony internetowe, strony AMP są stylizowane za pomocą CSS, ale nie można odwoływać się do zewnętrznych arkuszy stylów (z wyjątkiem [czcionek niestandardowych](#the-custom-fonts-exception)). Niedozwolone są również niektóre style ze względu na skutki dla wydajności.

Style można umieszczać w nagłówku dokumentu lub jako atrybuty inline `style` (patrz [Dodawanie stylów do strony](index.md#add-styles-to-a-page)). Można jednak użyć preprocesorów CSS i szablonów w celu utworzenia stron statycznych, aby lepiej zarządzać swoją zawartością.

[tip type="note"] **UWAGA —** składniki AMP mają domyślne style, dzięki czemu pisanie responsywnych stron jest dość łatwe. Style te są zdefiniowane w [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css). [/tip]

## Disallowed styles

Następujące style są niedozwolone na stronach AMP:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Banned style</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style"> Kwalifikator <br> <code>!important</code>
</td>
      <td data-th="Description">Użycie kwalifikatora <code>!important</code> i odwołanie do niego jest niedozwolone. Jest to niezbędne, aby umożliwić AMP wymuszanie zasad określania rozmiarów jego elementów.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code><link rel=”stylesheet”></code></td>
      <td data-th="Description">Niedozwolone, z wyjątkiem <a href="#the-custom-fonts-exception">czcionek niestandardowych</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Nazwy klas <code>i-amphtml-</code> i znaczników <code>i-amphtml-</code>.</td>
      <td data-th="Description">Walidator odrzuca nazwy klas i znaczników z następującym wyrażeniem regularnym `(^|\W)i-amphtml-`. Są one zarezerwowane do użytku wewnętrznego przez framework AMP. Wynika to z tego, że arkusz stylów użytkownika nie może odwoływać się do selektorów CSS klas i znaczników <code>i-amphtml-</code>.</td>
    </tr>
  </tbody>
</table>

## Zalecenia dotyczące wydajności

Aby można było uzyskać optymalną wydajność, te dozwolone style powinny ograniczać wartości do podanych poniżej:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Ograniczony styl</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">Właściwość <code>transition</code>
</td>
      <td data-th="Description">Tylko właściwości akcelerowane przez GPU (obecnie <code>opacity</code>, <code>transform</code> i <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description">Tylko właściwości akcelerowane przez GPU (obecnie <code>opacity</code>, <code>transform</code> i <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## Wyjątek dotyczący czcionek niestandardowych <a name="the-custom-fonts-exception"></a>

Strony AMP nie mogą zawierać zewnętrznych arkuszy stylów, z wyjątkiem czcionek niestandardowych.

[tip type="read-on"] **CZYTAJ DALEJ —** Dowiedz się więcej [o czcionkach niestandardowych w AMP](custom_fonts.md). [/tip]

## Używanie preprocesorów CSS <a name="using-css-preprocessors"></a>

Dane wyjściowe generowane przez preprocesory działają w AMP tak samo dobrze, jak każda inna strona internetowa. Na przykład strona [amp.dev](https://amp.dev/) używa [Sass](http://sass-lang.com/). (Używamy [Grow](http://grow.io/) do tworzenia statycznych stron AMP, które składają się na stronę [amp.dev](https://amp.dev/)).

W razie używania preprocesorów zwróć szczególną uwagę na to, co dodajesz; ładuj tylko to, czego używasz na swoich stronach. Na przykład, plik [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) zawiera wszystkie wymagane znaczniki AMP oraz kod inline CSS z plików źródłowych `*.scss`. Zawiera także (między innymi) niestandardowy skrypt elementu [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), dzięki czemu wiele stron w całej witrynie może zawierać wbudowane filmy z YouTube.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
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
{% endraw %}[/sourcecode]

Aby sprawdzić, jak powyższe przekłada się na sformatowany kod AMP HTML, zobacz źródło dowolnej strony na [amp.dev](https://amp.dev/). (W Chrome, kliknij prawy przyciskiem myszy i wybierz polecenie `Wyświetl źródło strony`).
