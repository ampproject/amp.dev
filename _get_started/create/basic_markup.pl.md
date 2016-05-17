---
layout: page
title: Tworzenie strony AMP HTML
order: 0
locale: pl
---

Poniższy znacznik stanowi doskonały punkt wyjścia lub szablon.
Skopiuj go i zapisz w pliku z rozszerzeniem .html.

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

Zawartość sekcji body jest na razie całkiem prosta. Jednak sekcja head strony zawiera wiele dodatkowego kodu, którego znaczenie nie jest od razu oczywiste. Zajmijmy się teraz analizą wymaganych znaczników.

## Wymagane znaczniki

Dokumenty AMP HTML MUSZĄ:

  - Zaczynać się od deklaracji doctype `<!doctype html>`.
  - Zawierać znacznik `<html ⚡>` najwyższego poziomu (akceptowany jest również znacznik `<html amp>`).
  - Zawierać znaczniki `<head>` i `<body>` (w języku HTML są one opcjonalne).
  - Zawierać w sekcji head znacznik `<link rel="canonical" href="$SOME_URL" />` wskazujący wersję dokumentu AMP HTML w zwykłym HTML lub ten sam dokument, jeśli taka wersja HTML nie istnieje.
  - Zawierać znacznik `<meta charset="utf-8">` jako pierwszy element podrzędny znacznika head.
  - Zawierać znacznik `<meta name="viewport" content="width=device-width,minimum-scale=1">` wewnątrz znacznika head. Zalecane jest także dodanie atrybutu initial-scale=1.
  - Zawierać znacznik `<script async src="https://cdn.ampproject.org/v0.js"></script>` jako ostatni element w sekcji head (służy do dołączenia i ładowania biblioteki AMP JS).
  - Zawierać następujące dane w znaczniku `<head>`:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Opcjonalne metadane

Oprócz elementów zgodnych z podstawowymi wymaganiami przykład zawiera także definicję Schema.org w sekcji head, która nie jest wymagana przez AMP, ale jest niezbędna, aby treści były rozpowszechniane w niektórych miejscach, na przykład w [demonstracyjnej wersji karuzeli wiadomości aplikacji Szukaj w Google (wypróbuj na swoim telefonie)](https://g.co/ampdemo).

Aby dowiedzieć się więcej o wszystkich metadanych potrzebnych w różnych innych miejscach, np. na Twitterze, [zapoznaj się z przykładami](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Aby poznać w szczególności zastosowanie AMP w aplikacji Szukaj w Google, zobacz [Najlepsze historie z AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Dobra wiadomość! To wszystko, co potrzebne do utworzenia pierwszej strony AMP, przy czym oczywiście niewiele dzieje się na razie w sekcji body. W następnej części zostanie opisane dodawanie podstawowych elementów, takich jak obrazy, dodawanie niestandardowych elementów AMP, nadawanie stronie stylu i opracowanie przyjaznego w obsłudze układu.

{% include button.html title="Przejdź do kroku 2" link="/docs/get_started/create/include_image.pl.html" %}
