---
$title: Zadbaj o wykrywalność strony
---

[TOC]

W niektórych przypadkach dobrze jest posiadać jedną stronę, na przykład artykuł wiadomości, zarówno w wersji AMP, jaki i zwykłej. Zastanów się nad tym: jeśli wyszukiwarka Google znajdzie zwykłą wersję strony, skąd ma wiedzieć, że istnieje ona również w wersji AMP?

### Łączenie stron za pomocą tagu `<link>`

Aby rozwiązać ten problem, do zwykłej strony dodaje się informację o stronie AMP i odwrotnie. Służą do tego tagi `<link>` w sekcji `<head>`.

Do zwykłej strony dodaj następujący kod:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

A ten kod dodaj do wersji AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Co zrobić, jeśli mam tylko jedną stronę?

Jeśli masz tylko jedną stronę w wersji AMP i tak trzeba dodać do niej link kanoniczny, który będzie wskazywał samą siebie.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Integracja z platformami zewnętrznymi poprzez dodatkowe metadane

Czasami witryny zewnętrzne (zawierające Twoją stronę AMP lub linki do niej) muszą mieć więcej informacji o stronie. Sam fakt, że jest to strona AMP, nie wystarczy. Pytania, jakie mogłaby Ci zadać platforma na temat strony, to np. „Czy to artykuł wiadomości?”, „A może to film?” lub „Masz do niej zrzut ekranu albo krótki opis?”.

Dotyczy to wszystkich stron internetowych, nie tylko stron AMP. Niektóre platformy traktują te metadane jako informacje dodatkowe, dla innych są one obowiązkowe, co oznacza, że **w przypadku braku odpowiednich metadanych nie wyświetlą one linków do Twoich treści**. Pamiętaj o umieszczeniu odpowiednich metadanych wymaganych przez platformy, na których ma pojawiać się Twoja treść.

### Wykorzystanie Schema.org do optymalizacji z większością wyszukiwarek

[Schema.org](http://schema.org/) oferuje otwarte słowniki umożliwiające dodawanie metadanych do przeróżnych typów stron. W przypadku AMP właściwości mające sens w kontekście obejmują określone rodzaje treści (tj. „artykuł wiadomości”), nagłówek, datę publikacji i powiązane obrazy używane w podglądzie.

Przykład:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Więcej przykładów, w tym alternatywną składnię atrybutów HTML, zawiera [folder z przykładami ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples).

Uwaga: ta definicja Schema.org jest warunkiem koniecznym do wyświetlania treści w demonstracyjnej wersji [karuzeli wiadomości wyszukiwarki Google (wypróbuj na telefonie)](https://g.co/ampdemo).
Zobacz też [najważniejsze artykuły o AMP](https://developers.google.com/structured-data/carousels/top-stories) oraz [narzędzie do testowania danych strukturalnych](https://developers.google.com/structured-data/testing-tool/).

### Inne metadane dla jeszcze większej liczby platform

Przeczytaj [przewodnik Social Discovery w Podstawach tworzenia witryn](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/), by poznać różne sposoby przygotowania treści pod kątem wykrywalności oraz dystrybucji.
