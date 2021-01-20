---
formats:
- websites
"$title": Spraw, by Twoje strony można było odnaleźć
"$titles":
  teaser: Make your pages discoverable
"$order": '5'
description: 'W niektórych przypadkach można serwować zarówno wersję tej samej strony bez AMP jak i z AMP, na przykład artykuł informacyjny. Rozważ to: jeśli wyszukiwarka Google...'
teaser:
  icon: odnajdź
  text: Dowiedz się, jak wyszukiwarki internetowe dowiadują się, że istnieje wersja AMP witryny.
  label: Dowiedz się więcej
---

W niektórych przypadkach można serwować zarówno wersję tej samej strony bez AMP jak i z AMP, na przykład artykuł informacyjny. Rozważ to: jeśli wyszukiwarka Google znajdzie wersję tej strony bez AMP, skąd ma wiedzieć, że istnieje wersja AMP?

### Powiązywanie stron znacznikami <link>

Aby rozwiązać ten problem, dodajemy informację o stronie AMP do strony bez AMP i odwrotnie za pomocą znaczników `<link>` w sekcji `<head>`.

Do strony bez AMP dodaj:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Do strony AMP dodaj to:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Co zrobić, jeśli mam tylko jedną stronę?

Jeśli masz tylko jedną stronę i jest to strona AMP, musisz dodać do niej link kanoniczny, wskazujący sam na siebie:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o tym, jak Google znajduje strony AMP w [wytycznych wyszukiwarki Google dotyczących stron AMP)](https://support.google.com/webmasters/answer/6340290). [/tip]

## Integracja z platformami stron trzecich poprzez dodatkowe metadane <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Czasami witryna strony trzeciej (która osadza Twoją stronę AMP lub zawiera linki do niej) musi wiedzieć o Twojej stronie więcej niż tylko to, że jest to strona AMP. Pytania, które platforma może zadać na temat Twojej strony, to na przykład: „czy jesteś artykułem informacyjnym?", „czy masz zrzut ekranu i krótki opis?”.

Dotyczy to nie tylko stron AMP, ale wszystkich stron internetowych. Dla niektórych platform są to dodatkowe metadane, dla innych jest to wymóg, co znaczy, że **nie pokażą one linków do Twojej zawartości, jeśli nie dodasz odpowiednich metadanych**. Dodawaj właściwe metadane dla platform, na których ma być wyświetlana Twoja treść.

### Używanie Schema.org dla większości wyszukiwarek

[Schema.org](http://schema.org/) oferuje otwarte słowniki, umożliwiające dodawanie metadanych do wszystkiego. W przypadku AMP właściwości, które mają sens w kontekście, obejmują określony typ treści (np. „news article”), nagłówek, datę publikacji i powiązane obrazy podglądu.

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

Więcej przykładów można znaleźć w [folderze ampproject examples](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), włącznie z alternatywną składnią atrybutu HTML).

[tip type="read-on"] Odwiedź te zasoby, aby uzyskać więcej informacji na temat danych strukturalnych:

- Dowiedz się, jak [uporządkować swoją zawartość tak, aby pojawiła się w bogatych wynikach wyszukiwania Google](https://developers.google.com/search/docs/guides/mark-up-content) (np. karuzela z najważniejszymi relacjami, karty z przepisami, itd.).
- Przetestuj swoje dane strukturalne za pomocą [narzędzia Google do testowania danych uporządkowanych](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Inne metadane dla jeszcze większej liczby platform

Udaj się do [przewodnika Social Discovery w Web Fundamentals](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/), aby dowiedzieć się więcej o wszystkich innych sposobach przygotowania zawartości do odnajdywania i rozpowszechniania.
