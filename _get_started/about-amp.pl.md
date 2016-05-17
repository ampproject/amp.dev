---
layout: page
title: Co to jest AMP?
order: 0
locale: pl
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP to sposób tworzenia szybko renderowanych stron internetowych dla statycznych treści.
W działaniu AMP składa się z trzech części:

{% include toc.html %}

**AMP HTML** to kod HTML z pewnymi ograniczeniami zapewniającymi niezawodne działanie
oraz pewnymi rozszerzeniami, które umożliwiają tworzenie zaawansowanych treści wykraczających poza podstawowy kod HTML.
Biblioteka **AMP JS** zapewnia szybkie renderowanie stron AMP HTML.
Strony AMP HTML są opcjonalnie dostarczane z **pamięci podręcznej Google AMP Cache**.

## AMP HTML

AMP HTML to w zasadzie HTML rozszerzony o niestandardowe właściwości AMP.
Najprostszy plik AMP HTML wygląda następująco:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Chociaż większość znaczników na stronie AMP HTML to zwykłe tagi HTML,
niektóre tagi HTML zostały zastąpione przez tagi właściwe dla AMP (zobacz też
[HTML Tags in the AMP spec](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md) — Tagi HTML w specyfikacji AMP).
Te niestandardowe elementy, nazywane komponentami AMP HTML,
ułatwiają efektywną implementację typowych wzorców.

Na przykład znacznik [`amp-img`](/docs/reference/amp-img.html)
udostępnia pełną obsługę atrybutu `srcset` także w przeglądarkach, które go jeszcze nie obsługują.
Dowiedz się, jak [utworzyć swoją pierwszą stronę AMP HTML](/docs/get_started/create_page.html).

## AMP JS

[Biblioteka AMP JS](https://github.com/ampproject/amphtml/tree/master/src) implementuje
wszystkie [najlepsze praktyki dotyczące wydajności AMP](/docs/get_started/technical_overview.html),
zarządza ładowaniem zasobów oraz udostępnia niestandardowe znaczniki wspomniane powyżej,
aby zapewnić jak najszybsze renderowanie strony.

Do najistotniejszych optymalizacji należy to, że wszystkie dane pochodzące z zasobów zewnętrznych są przetwarzane asynchronicznie, dzięki czemu żaden element strony nie może blokować renderowania.

Inne techniki zwiększające wydajność obejmują piaskownice dla wszystkich ramek iframe, wstępne obliczanie układu każdego elementu na stronie przed załadowaniem zasobów i wyłączanie powolnych selektorów CSS.

Aby dowiedzieć się więcej nie tylko o [optymalizacjach](/docs/get_started/technical_overview.html), ale także o ograniczeniach, [przeczytaj specyfikację AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Pamięć podręczna Google AMP Cache

Pamięć podręczna Google AMP Cache to oparta na serwerach proxy sieć dystrybucji treści,
która może dostarczać wszystkie prawidłowe dokumenty AMP.
Pobiera ona strony AMP HTML, buforuje je i automatycznie poprawia wydajność tych stron.
W przypadku korzystania z pamięci podręcznej Google AMP Cache dokument, wszystkie pliki JS i wszystkie obrazy są ładowane
z tego samego źródła, w którym używany jest protokół
[HTTP 2.0](https://http2.github.io/) w celu uzyskania maksymalnej efektywności.

Pamięć podręczna jest wyposażona we wbudowany
[system sprawdzania poprawności](https://github.com/ampproject/amphtml/tree/master/validator),
który potwierdza, że strona będzie działać oraz
że nie zależy ona od zasobów zewnętrznych.
System sprawdzania poprawności uruchamia szereg asercji,
potwierdzając, że znaczniki strony są zgodne ze specyfikacją AMP HTML.

Inna wersja modułu sprawdzania poprawności jest dostarczana w pakiecie z każdą stroną AMP. Ta wersja może rejestrować błędy sprawdzania poprawności bezpośrednio w konsoli przeglądarki podczas renderowanie strony,
co pozwala zobaczyć, w jaki sposób złożone zmiany w kodzie
negatywnie odbijają się na wydajności i wrażeniach użytkowników.

Dowiedz się więcej o [testowaniu swoich stron AMP HTML](/docs/guides/validate.html).
