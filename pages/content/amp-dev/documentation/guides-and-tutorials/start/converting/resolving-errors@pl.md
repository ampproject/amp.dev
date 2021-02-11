---
'$title': Rozwiązywanie błędów walidacji
$order: 2
description: W tej sekcji przeanalizujemy i rozwiążemy błędy walidacji naszej strony AMP. Pamiętaj, że w Twojej konsoli błędy mogą być wyświetlane w innej kolejności.
---

W tej sekcji przeanalizujemy i rozwiążemy błędy walidacji naszej strony AMP. Pamiętaj, że w Twojej konsoli błędy mogą być wyświetlane w innej kolejności.

## Dodanie zestawu znaków

Zaczniemy od naprawienia następującego błędu:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Aby poprawnie wyświetlać tekst, AMP wymaga określenia zestawu znaków strony. Informacja meta o zestawie znaków musi być również pierwszym elementem podrzędnym znacznika `<head> `. Powodem, dla którego ten znacznik musi być pierwszy, jest uniknięcie ponownego interpretowania treści dodanej przed znacznikiem meta zestawu znaków.

**Dodaj** następujący kod jako pierwszy wiersz sekcji `<head>`:

```html
<meta charset="utf-8" />
```

**Zapisz** plik i ponownie załaduj stronę. Sprawdź, czy błąd zestawu znaków już się nie pojawia.

## Dodanie linku kanonicznego

Spójrzmy teraz na następujący błąd:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Każdy dokument AMP musi zawierać link odwołujący się do „kanonicznej” wersji tegoż dokumentu. Dowiemy się więcej o tym, czym są strony kanoniczne i jakie są różne podejścia do linkowania kanonicznego w kroku [Sprawianie, aby można było odnaleźć stronę](discoverable.md)[ w tym samouczku.](discoverable.md)

W tym samouczku użyjemy oryginalnego artykułu HTML, który przekonwertujemy na stronę kanoniczną.

**Dodaj** pod znacznikiem `<meta charset="utf-8" />` następujący kod:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Możesz utworzyć samodzielną stronę kanoniczną AMP. Link kanoniczny będzie nadal wymagany, ale powinien wskazywać na sam artykuł AMP:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

**Załaduj ponownie stronę**. Mimo że jest jeszcze wiele błędów do naprawienia, błąd linku kanonicznego nie jest już obecny.

## Określenie atrybutu AMP

AMP wymaga podania atrybutu w głównym elemencie `<html>` strony, w celu zadeklarowania strony jako dokumentu AMP.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Powyższe błędy można rozwiązać poprzez proste dodanie atrybutu `⚡ `do sekcji `<html>` w następujący sposób:

```html
<html ⚡ lang="en"></html>
```

Załaduj ponownie stronę i sprawdź, czy oba błędy zniknęły.

[tip type="note"] Podanie atrybutu `⚡` jest podejściem zalecanym, ale można też użyć atrybutu `amp`, zamiast atrybutu `⚡`, tak jak tu:

```html
<html amp lang="en"></html>
```

[/tip]

## Określenie okienka na ekranie

Następnie zajmijmy się tym błędem:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

AMP wymaga definicji atrybutów `width` i `minimum-scale` okienka na ekranie. Należy podać odpowiednio wartości `device-width` i `1`. Okienko na ekranie definiuje się za pomocą zwykłego znacznika w sekcji `<head>` strony HTML.

Aby rozwiązać błąd dotyczący okienka na ekranie, dodaj do sekcji `<head>` następujący fragment kodu HTML:

```html
<meta name="viewport" content="width=device-width" />
```

Podane wartości atrybutów `width` i `minimum scale` są wartościami wymaganymi w AMP. Zdefiniowanie atrybutu `initial-scale` nie jest obowiązkowe, ale jest powszechnie stosowane w programowaniu stron mobilnych i jest zalecane. Więcej informacji o okienku na ekranie i projekcie responsywnym zawiera artykuł [Konfigurowanie okienka na ekranie](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Tak jak wcześniej, **ponownie załaduj** stronę i sprawdź, czy błąd zniknął.

## Zamiana zewnętrznych arkuszy stylów

Poniższy błąd jest związany z naszym użyciem arkuszy stylów:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

W szczególności błąd ten polega dotyczy następującego znacznika linku arkusza stylów w naszej sekcji `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

Problem polega na tym, że jest to odniesienie do zewnętrznego arkusza stylów. W AMP, aby maksymalnie skrócić czas ładowania dokumentów, nie można dołączać zewnętrznych arkuszy stylów. Zamiast tego, wszystkie reguły arkuszy stylów muszą być osadzone w dokumencie AMP za pomocą znaczników `<style amp-custom></style>` lub jako style inline.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Rozwiążmy ten błąd:

1. **Usuń** znacznik `<link>` wskazujący na arkusz stylów w sekcji `<head>` i zastąpmy go znacznikiem inline `<style amp-custom></style>`. Atrybut `amp-custom` w znaczniku style jest obowiązkowy.
2. **Skopiuj** wszystkie style z pliku [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) do znaczników `<style amp-custom></style>`.

**Ponownie załaduj** stronę i sprawdź, czy błąd dotyczący arkuszy stylów zniknął.

[tip type="note"] **UWAGA —** oprócz osadzenia stylizacji wymagany jest również limit rozmiaru pliku wynoszący 50 kilobajtów na wszystkie informacje dotyczące stylów. Należy użyć preprocesorów CSS, takich jak [SASS](http://sass-lang.com/), aby zminimalizować kod CSS przed umieszczeniem go na stronach AMP. [/tip]

[tip type="important"] **WAŻNE —** możesz mieć tylko jeden znacznik style w całym dokumencie AMP. Jeśli masz kilka zewnętrznych arkuszy stylów, do których odwołują się strony AMP, trzeba będzie zebrać te arkusze stylów w jeden zestaw reguł. Aby dowiedzieć się, które reguły CSS są ważne w AMP, przeczytaj artykuł [Obsługiwane CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Wykluczenie kodu JavaScript strony trzeciej

Arkusze stylów można stosunkowo łatwo przerabiać za pomocą AMP poprzez wprowadzenie kodu CSS inline, ale w przypadku JavaScriptu jest inaczej.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

Ogólnie rzecz biorąc, skrypty w AMP są dozwolone tylko wtedy, gdy spełniają dwa główne wymagania:

1. Cały JavaScript musi być asynchroniczny (tzn. zawierać atrybut `async` w znaczniku script).
2. JavaScript jest przeznaczony dla biblioteki AMP oraz dla wszystkich składników AMP na stronie.

To skutecznie wyklucza używanie w AMP wszelkiego generowanego przez użytkownika/stronę trzecią kodu JavaScript, z wyjątkiem sytuacji opisanych poniżej.

[tip type="note"] Jedyne wyjątki od ograniczeń dotyczących skryptów tworzonych przez użytkowników / strony trzecie to następujące sytuacje:

1. Skrypt, który dodaje metadane do strony lub konfiguruje składniki AMP. Ma atrybut type `application/ld+json` lub `application/json`.
2. Skrypt zawarty w ramkach iframe. JavaScript do ramki iframe należy włączać jedynie w ostateczności. Tam, gdzie to możliwe, funkcjonalność JavaScript należy zastąpić za pomocą <a>składników AMP</a>. Nasz pierwszy składnik AMP zbadamy w następnej sekcji. [/tip]

Spróbuj otworzyć zewnętrzny plik [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js). Co widzisz? Plik powinien być pusty, bez jakiegokolwiek kodu JavaScript i zawierać tylko komentarz z informacją taką jak ta:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Biorąc pod uwagę, że ten zewnętrzny plik JavaScript nie jest składnikiem funkcjonalnym naszej witryny internetowej, możemy bezpiecznie usunąć cały odnośnik.

**Usuń** z dokumentu następujący odnośnik do zewnętrznego skryptu JavaScript:

```html
<script type="text/javascript" src="base.js"></script>
```

**Ponownie załaduj** stronę i sprawdź, czy błąd dotyczący skryptu zniknął.

## Dodawanie kodu standardowego AMP CSS

Następujące błędy odnoszą się do brakującego kodu standardowego:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Każdy dokument AMP musi zawierać następujący kod standardowy AMP:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Dodaj** kod standardowy na końcu sekcji `<head>` dokumentu.

Znacznik `<style amp-boilerplate>` początkowo ukrywa zawartość sekcji body do chwili załadowania biblioteki JavaScript AMP, a następnie zawartość jest renderowana. AMP robi to, aby zapobiec renderowaniu zawartości bez stylów, co znane jest również jako Flash Of Unstyled Content (FOUC). Pozwala to zapewnić naprawdę natychmiastowe wrażenia użytkownika, ponieważ zawartość strony pojawia się cała naraz, a wszystko powyżej treści jest renderowane razem. Drugi znacznik odwraca tę logikę, jeśli obsługa JavaScript jest wyłączona w przeglądarce.

## Zastąpienie znacznika `<img>` znacznikiem `<amp-img>`

AMP nie obsługuje w celu wyświetlania multimediów domyślnych odpowiedników HTML, co wyjaśnia następujący błąd:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

Dostępny jest składnik internetowy AMP, zaprojektowany specjalnie do zastąpienia znacznika `<img>`, a mianowicie znacznik [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Zastąp** znacznik `<img>` powyższym znacznikiem [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) i ponownie uruchom walidator. Wyświetlonych zostanie kilka nowych błędów:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Dlaczego element [`amp-img`](../../../../documentation/components/reference/amp-img.md) wywołał kolejny błąd? Ponieważ [`amp-img`](../../../../documentation/components/reference/amp-img.md) nie jest bezpośrednim substytutem tradycyjnego znacznika HTML img. Używania elementu [`amp-img`](../../../../documentation/components/reference/amp-img.md) dotyczą dodatkowe wymagania.

### System układu AMP

Błąd układu mówi nam, że element [`amp-img`](../../../../documentation/components/reference/amp-img.md) nie obsługuje typu układu `container`. Jedną z najważniejszych koncepcji w projektowaniu AMP jest skupienie się na ograniczeniu zmian układu modelu DOM wymaganych do wyrenderowania jego stron internetowych.

Aby ograniczyć zmiany układu modelu DOM, AMP zawiera system układu zapewniający, że układ strony jest znany tak wcześnie, jak to możliwe w cyklu życia pobierania i renderowania strony.

Poniższy obraz porównuje sposób, w jaki często generowany jest układ strony HTML do podejścia narzucanego przez AMP. Zauważ w podejściu po lewej stronie jak zmieniany jest układ tekstu przy każdym ładowaniu reklamy lub obrazu. Podejście AMP do układu strony zapobiega przesuwaniu tekstu — nawet jeśli załadowanie obrazów i reklam zajmuje dużo czasu.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

System układu AMP umożliwia rozmieszczanie i skalowanie elementów na stronie na różne sposoby — stałe wymiary, projekt responsywny, stała wysokość i inne.

W przypadku naszego artykułu system układu wyprowadził typ układu elementu [`amp-img`](../../../../documentation/components/reference/amp-img.md) jako typ `container`. Typ `container` ma jednak zastosowanie tylko do elementów, które zawierają elementy podrzędne. Typ `container` jest niezgodny ze znacznikiem [`amp-img`](../../../../documentation/components/reference/amp-img.md), co jest przyczyną tego błędu.

Dlaczego wyprowadzony został typ `container`? Dlatego, że nie określiliśmy atrybutu `heights` znacznika [`amp-img`](../../../../documentation/components/reference/amp-img.md). W HTML zmiany układu można ograniczyć poprzez konsekwentne określanie stałej szerokości i wysokości elementów na stronie. W AMP należy zdefiniować szerokość i wysokość elementów [`amp-img`](../../../../documentation/components/reference/amp-img.md), aby AMP mógł wstępnie określić współczynnik proporcji elementu.

**Dodaj** atrybuty `width` i `height` do znacznika [`amp-img`](../../../../documentation/components/reference/amp-img.md) w następujący sposób:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Odśwież stronę i sprawdź walidator; nie powinien już wyświetlać żadnych błędów!

Masz teraz prawidłowy dokument AMP, ale obraz nie wygląda zbyt dobrze, ponieważ jest dziwnie umieszczony na stronie. Domyślnie po określeniu wysokości i szerokości elementu [<kod>amp-img</kod>](../../../../documentation/components/reference/amp-img.md) AMP ustali podane wymiary, ale czy nie byłoby wspaniale, gdyby AMP przeskalował obraz tak, aby _responsywnie_ się rozciągał odpowiednio do rozmiaru strony bez względu na rozmiar ekranu?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Na szczęście AMP może określić współczynnik proporcji elementów na podstawie podanej szerokości i wysokości. Pozwala to systemowi układu AMP na pozycjonowanie i skalowanie elementu na różne sposoby. Atrybut `layout` informuje AMP o tym, jak element ma być umieszczany i skalowany.

**Ustawmy** atrybut layout `responsive`, aby umożliwić skalowanie i zmienianie rozmiaru obrazu:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Voila! Nasz obraz jest wyświetlany w prawidłowych proporcjach i responsywnie wypełnia szerokość ekranu.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o systemie układu AMP w [specyfikacji układu AMP ](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Sukces!

Teraz dokument AMP powinien wyglądać tak:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Odśwież stronę i sprawdź dane wyjściowe konsoli. Powinien Cię powitać następujący komunikat:

<pre class="success-text">AMP validation successful.</pre>

### Często zadawane pytania

- [Co to jest zmiana układu modelu DOM?](http://stackoverflow.com/a/27637245)
- [Co jeśli atrybut layout jest nieokreślony?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Co jeśli szerokość i wysokość są nieokreślone?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
