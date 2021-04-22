---
$title: Osadzanie relacji w stronach internetowych
$order: 3
description: AMP Story Player umożliwia osadzanie w stronie internetowej relacji, które użytkownicy mogą dotykać lub klikać. Postępuj zgodnie z tym poradnikiem krok po kroku, aby dowiedzieć się jak to zrobić.
---

Relacje są pełnoekranowymi, wciągającymi materiałami. Są umieszczane na otwartej stronie internetowej z własnym adresem URL, dzięki czemu można je z łatwością udostępniać. Co jednak zrobić, jeśli chcesz zintegrować relacje z własną witryną, na przykład w blogu, opisie produktu lub artykule informacyjnym?

[AMP Story Player](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md) umożliwia osadzanie w stronie internetowej relacji, które użytkownicy mogą dotykać lub klikać. Postępuj zgodnie z tym poradnikiem krok po kroku, aby dowiedzieć się jak to zrobić.

# Wyświetlanie relacji na stronie bez AMP

Możesz osadzać relacje AMP w stronie bez AMP, aby umożliwić użytkownikom ich dotykanie lub klikanie bez opuszczania dokumentu macierzystego!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          style="--story-player-poster: url('https://amp.dev/static/samples/img/story_dog2_portrait.jpg')"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Osadzanie odtwarzacza relacji AMP

Wyświetlanie relacji AMP na stronie bez AMP wymaga użycia elementu [`{amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md).

### Import skryptów

Umieść dwa wymagane skrypty w sekcji head dokumentu:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css">
```

Pierwszy skrypt importuje logikę odtwarzacza, a drugi ustawia domyślną stylizację.

### Określanie żądanej relacji

Umieść element `<amp-story-player>` w sekcji `body` dokumentu. Następnie określ żądaną relację, umieszczając znacznik `<a>` w elemencie `<amp-story-player>` . Skieruj odsyłacz `href` do lokalizacji relacji. Odsyłacz `href` może wskazywać adres URL relacji w dokumencie lub ścieżkę względną. Umieść tytuł relacji w znacznikach <code><a></code>.

```html
 <amp-story-player style="width: 360px; height: 600px;">
    <a
      href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/">
      Stories in AMP - Hello World
    </a>
  </amp-story-player>
```

### Rozmiar odtwarzacza

Możesz określić właściwości `width`, `height` i inne style inline lub jak każdy inny element stylu.

```html
<body>
...
  <amp-story-player style="width: 360px; height: 600px;">
...
  </amp-story-player>
...
</body>
```

Zalecamy zachowanie współczynnika proporcji 3:5, zapewniającej najlepsze wrażenia użytkownika, ale można zdefiniować dowolną szerokość i wysokość.

#### Rozmiary responsywne

Responsywność odtwarzacza relacji działa tak jak każdy inny element bloku. Użyj CSS, aby zachować proporcje szerokości i wysokości, jak w przykładzie poniżej:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  ...
</amp-story-player>
```

### Podanie elementu zastępczego

Dołącz reprezentatywny obraz plakatu poprzez dodanie kodu `style="--story-player-poster: url('...');"` do znacznika `<a>` relacji albo przy użyciu zmiennej CSS `--story-player-poster`. Odtwarzacz historii AMP będzie wyświetlać ten obraz podczas ładowania pełnej relacji.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a
    href="https://www.example.com/story.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes this story.
  </a>
</amp-story-player>
```

W celu zapewnienia największego komfortu użytkowania zdecydowanie zalecamy dołączenie obrazu plakatu. Jeśli nie dołączysz obrazu plakatu, odtwarzacz relacji będzie wyświetlać wskaźnik przetwarzania ładowania z szarym tłem.

## Osadzanie wielu relacji

Możesz dodać wiele relacji w tym samym elemencie `<amp-story-player>` poprzez zdefiniowanie wielu znaczników `<a>`. Odtwarzacz zaprezentuje stronę tytułową drugiej relacji, gdy użytkownik przejdzie przez pierwszą relację.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story1.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes story 1.
  </a>
  <a
    href="https://www.example.com/story2.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover2.html');"
  >
    A title that describes story 2.
  </a>
</amp-story-player>
```

Możesz osadzić dowolną liczbę znaczników `<amp-story-player>`. Wyświetlane są one jako pojedyncze okienka.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story1.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover1.html');"
  >
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://www.example.com/story2.html"
    style="--story-player-poster: url('https://www.example.com/assets/cover2.html');"
  >
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Wyświetlanie relacji na stronie AMP

Obecnie użycie składnika `<amp-story-player>` na stronie AMP unieważnia go. Obecnie pracujemy nad obsługą tego składnika na stronie AMP! Obserwuj nasz [postęp na planie działania](https://github.com/ampproject/amphtml/issues/26308)!
