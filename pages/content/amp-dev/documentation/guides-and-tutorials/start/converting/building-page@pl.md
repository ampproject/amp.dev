---
"$title": Tworzenie zwykłej strony HTML
"$order": '1'
description: W katalogu projektu znajduje się plik o nazwie article.html. Jest to artykuł informacyjny, który tworzymy jako odpowiednik AMP...
---

W katalogu projektu znajduje się plik o nazwie [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Jest to artykuł informacyjny, który tworzymy jako odpowiednik strony AMP.

1. **Skopiuj** cały kod z pliku `article.html` i wklej go do nowego pliku.
2. **Zapisz** nowy plik jako `article.amp.html`.

[tip type="note"] **UWAGA —** nie musisz nadawać plikom AMP nazwy `.amp.html`. W rzeczywistości, pliki AMP mogą mieć dowolne rozszerzenie. Często zdarza się, że wydawcy odróżniają strony AMP od ich wersji kanonicznych, stosując parametry w adresie url. Przykład:  `http://publisher.com/article.html?amp`. [/tip]

Plik `article.amp.html` powinien wyglądać tak:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Jest to celowo uproszczona strona z typowymi elementami statycznymi artykułów informacyjnych: CSS, JavaScript i znacznikiem obrazu.

Nasza wersja AMP artykułu jest w tej chwili tylko kopią oryginalnego artykułu. Przekonwertujmy ją na AMP.

Na początek dodamy plik biblioteki AMP.  Samo to nie sprawi jeszcze, że nowy plik stanie się prawidłową stroną AMP, ale zobaczymy poniżej jak biblioteka AMP może nam pomóc w ustaleniu, co musimy zrobić w tym celu.

Aby dołączyć bibliotekę AMP, **dodaj** ten wiersz na końcu sekcji `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Załaduj** nową stronę `article.amp.html` do przeglądarki pod adresem [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html), a następnie **otwórz** [konsolę programistyczną](https://developer.chrome.com/devtools/docs/console) w programie Chrome (lub preferowanej przeglądarce).

Podczas sprawdzania danych wyjściowych JavaScript w konsoli programistycznej (upewnij się, że masz wybraną zakładkę Console) powinien być widoczny następujący wpis dziennika:

```text
Powered by AMP ⚡ HTML
```

Biblioteka AMP zawiera [walidator AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), który poinformuje Cię, czy coś sprawia, że strona nie jest prawdiłowym dokumentem AMP. **Włącz** walidator AMP poprzez dodanie tego identyfikatora fragmentu do adresu URL dokumentu:

```text
#development=1
```

Przykład:

```text
http://localhost:8000/article.amp.html#development=1
```

W konsoli programistycznej powinno zostać wyświetlonych kilka błędów walidacji (konieczne może być ręczne odświeżenie strony w przeglądarce, aby je zobaczyć):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Aby uzyskać prawidłowy dokument AMP, będziemy musieli naprawić wszystkie te błędy — i właśnie to będziemy robić na tych warsztatach.

Zanim to zrobimy, **zasymulujmy** działanie strony na urządzeniach mobilnych w narzędziach programistycznych przeglądarki, ponieważ pracujemy z mobilnym artykułem informacyjnym. Na przykład w konsoli Chrome DevTools kliknij ikonę telefonu komórkowego, a następnie wybierz z menu żądane urządzenie mobilne.

W przeglądarce zostanie wyświetlona symulowana rozdzielczość telefonu komórkowego, taka jak ta:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Teraz jesteśmy gotowi do pracy! Przeanalizujmy jeden po drugim błędy walidacji i zajmijmy się tym, jak odnoszą się one do AMP.
