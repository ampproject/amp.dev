---
'$title': Tworzenie strony AMP HTML
$order: 1
description: 'Użyj protokołu HTTPS: podczas tworzenia stron i treści AMP należy zdecydowanie rozważyć użycie protokołu HTTPS (zamiast HTTP). Chociaż protokół HTTPS nie jest wymagany dla samego dokumentu AMP...'
author: pbakaus
contributors:
  - bpaduch
---

Poniższy kod ze znacznikami to przyzwoity punkt startowy lub kod standardowy. Skopiuj go i zapisz w pliku z rozszerzeniem .html.

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Zawartość w sekcji body jak na razie jest dość prosta. W sekcji head strony znajduje się jednak sporo dodatkowego kodu, który może nie być od razu oczywisty. Zdekonstruujmy wymagane znaczniki.

Użyj protokołu HTTPS: podczas tworzenia stron i treści AMP należy zdecydowanie rozważyć użycie protokołu HTTPS (zamiast HTTP). Chociaż protokół HTTPS nie jest wymagany dla samego dokumentu AMP ani obrazów i czcionek, wiele funkcji AMP wymaga protokołu HTTPS (np. wideo, ramki iframe itd.). Aby strony AMP w pełni wykorzystywały wszystkie funkcje AMP, należy użyć protokołu HTTPS. Więcej o protokole HTTPS można dowiedzieć się z artykułu [Why HTTPS Matters](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] Użyj [generatora kodu standardowego AMP](/boilerplate), aby szybko zacząć tworzyć nowe strony AMP. [/tip]

## Wymagane znaczniki

Dokumenty AMP HTML muszą:

| Zasada                                                                                                                                                                                     | Opis                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zaczynać się od deklaracji `<!doctype html>`.                                                                                                                                              | Standard w przypadku HTML.                                                                                                                                                                                                                                           |
| Zawierać znacznik najwyższego poziomu `<html ⚡>` <br>(albo `<html amp>`).                                                                                                                 | Identyfikuje stronę jako treść AMP.                                                                                                                                                                                                                                  |
| Zawierać znaczniki `<head>` i `<body>`.                                                                                                                                                    | Opcjonalnie w HTML, ale nie w AMP.                                                                                                                                                                                                                                   |
| Zawierać znacznik `<meta charset="utf-8>` jako pierwszy element podrzędny znacznika `<head>`.                                                                                              | Identyfikuje kodowanie strony.                                                                                                                                                                                                                                       |
| Zawierać znacznik `<script async src="https://cdn.ampproject.org/v0.js"></script>` w sekcji `<head>`. Zgodnie z najlepszą praktyką należy dodać skrypt jak najwcześniej w sekcji `<head>`. | Zawiera i ładuje bibliotekę JS AMP.                                                                                                                                                                                                                                  |
| Zawierać znacznik `<link rel="canonical" href="$SOME_URL">` w sekcji `<head>`.                                                                                                             | Wskazuje na zwykłą wersję HTML dokumentu AMP HTML lub na samą siebie, jeśli taka wersja HTML nie istnieje. Dowiedz się więcej z artykułu [Spraw, by Twoje strony można było odnaleźć](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). |
| Zawierać znacznik `<meta name="viewport" content="width=device-width">st dodanie również właściwości `initial-scale=1`.                                                                    | Określa responsywne okienko na ekranie. Dowiedz się więcej z artykułu [Tworzenie responsywnych stron AMP](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).                                                             |
| Zawierać [kod standardowy AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) w sekcji `<head>`.                                                            | Kod standardowy CSS początkowo ma ukrywać zawartość do momentu załadowania JS AMP.                                                                                                                                                                                   |

## Opcjonalne metadane

Oprócz wymaganego kodu nasza próbka zawiera w sekcji head również definicję Schema.org, która nie jest ścisłym wymogiem w przypadku AMP, ale jest niezbędna, aby treści mogły być dystrybuowane w niektórych miejscach (na przykład w karuzeli Top Stories wyszukiwarki Google).

[tip type="read-on"] Odwiedź te zasoby, aby uzyskać więcej informacji:

- [Rozpoczęcie pracy z AMP w wyszukiwarce Google](https://developers.google.com/amp/docs) — naucz się przygotowywać strony AMP do wyszukiwania w Google.
- [Próbki metadanych](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) — dowiedz się więcej o wszystkich metadanych, których będziesz potrzebować w różnych innych miejscach (takich jak Twitter). [/tip]

<hr>

Dobre wieści! To już wszystko, czego potrzebujemy, aby utworzyć naszą pierwszą stronę AMP, ale oczywiście w sekcji body nie dzieje się jeszcze zbyt wiele. W następnej części zajmiemy się tym, jak dodać podstawowe elementy, takie jak obrazy, niestandardowe elementy AMP, jak stylizować stronę i opracować układ responsywny.
