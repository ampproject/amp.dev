---
'$title': Utwórz swoją pierwszą wiadomość e-mail AMP
$order: 0
description: Dowiedz się, co odróżnia wiadomości e-mail AMP, tworząc swoją pierwszą wiadomość.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP dla poczty e-mail pozwala nadawcom wiadomości e-mail używać w ich wiadomościach e-mail AMP do obsługi całego szeregu nowych funkcji. Wiadomości e-mail pisane w AMP mogą zawierać interaktywne elementy, takie jak karuzele lub akordeony z obrazami, treść pozostaje aktualna w wiadomości, a odbiorcy mogą podejmować działania, takie jak odpowiadanie na formularz, bez opuszczania skrzynki odbiorczej.

AMP dla poczty e-mail jest zgodny z istniejącymi wiadomościami e-mail. Wersja AMP wiadomości jest osadzana w wiadomości e-mail jako nowa część MIME, dodatkowo do HTML i zwykłego tekstu, co zapewnia zgodność we wszystkich programach pocztowych.

Porada: lista platform (ESP), klientów i dostawców poczty elektronicznej, obsługujących AMP dla poczty e-mail znajduje się w artykule [Obsługiwane platformy poczty elektronicznej](../../../support/faq/email-support.md) w sekcji FAQ.

Postępuj zgodnie z tym samouczkiem, aby utworzyć i wysłać pierwszą dynamiczną wiadomość e-mail w formacie AMP. Gotowy kod możesz zobaczyć [tutaj](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Zacznij od kodu standardowego AMP dla poczty e-mail

Plac zabaw AMP obsługuje format AMP dla poczty e-mail, umożliwiając tworzenie, testowanie i walidację wiadomości e-mail AMP. Otwórz [plac zabaw AMP](https://playground.amp.dev/?runtime=amp4email) i upewnij się w lewym górnym rogu, że ustawiony jest format `AMP for Email`. Wyświetlany powinien być następujący kod:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Zawiera on wszystkie wymagane znaczniki i minimum kodu niezbędnego do prawidłowości wiadomości e-mail AMP. Zwróć również uwagę na wiele innych przykładów prawidłowych szablonów wiadomości e-mail na liście rozwijanej w prawym górnym menu rozwijanym.

Poświęćmy chwilę na wyjaśnienie kilku istotnych różnic w stosunku do klasycznych wiadomości e-mail w formacie HTML:

- Wiadomości e-mail od AMP muszą się identyfikować jako takie za pomocą właściwości `⚡4email` lub `amp4email` w znaczniku html.
- Sekcja `<head>` musi również zawierać znacznik `<script>` ładujący środowisko uruchomieniowe AMP. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- Kod standardowy CSS do początkowego ukrywania zawartości do chwili załadowania AMP. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Jeśli już wcześniej zdarzyło Ci się pracować z wiadomościami e-mail, pomysł umieszczenia skryptu w wiadomości e-mail może wywołać w Twojej głowie alarm! Spokojnie, dostawcy poczty elektronicznej, którzy obsługują wiadomości AMP, wymuszają surowe kontrole zabezpieczeń, pozwalające jedynie na uruchamianie sprawdzonych skryptów AMP na swoich klientach. Dzięki temu dynamiczne i interaktywne funkcje mogą być uruchamiane bezpośrednio w skrzynkach odbiorców bez żadnych luk w zabezpieczeniach! Dowiedz się więcej o znacznikach wymaganych w wiadomościach e-mail AMP tutaj.

[tip type="important"] W wiadomościach e-mail AMP mogą być zawarte tylko skrypty AMP [obsługiwanych składników](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md). [/tip]

# Dołączanie obrazu

W wiadomościach AMP można używać większości znaczników HTML używanych w wiadomościach e-mail. Niektóre znaczniki, takie jak `<img>`, są jednak zastępowane równoważnym znacznikiem AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

Znacznik `<amp-img>` wymaga zdefiniowania szerokości i wysokości obrazu i, w odróżnieniu od znacznika `<img>`, znacznik `<amp-img>` trzeba jawnie zamknąć znacznikiem `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Ponadto, do obsługi plików GIF służą znaczniki [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Jako że wiadomości e-mail nie są przechowywane na Twoim serwerze, w adresach URL wiadomościach e-mail AMP należy stosować ścieżki bezwzględne i muszą to być adresy protokołu HTTPS.

[Placekitten](https://placekitten.com/) to witryna internetowa, która jako elementy zastępcze stosuje zdjęcia kociąt. Pozwala na wybranie rozmiaru obrazu bezpośrednio w adresie URL!

Możemy umieścić obraz w naszej pierwszej wiadomości e-mail, dodając poniższy kod.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Nadawanie responsywności

Wiadomości e-mail są przeglądane na różnych urządzeniach i ekranach o różnych rozmiarach, a AMP ma wbudowany system układów! Dzięki systemowi [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) i zapytaniom o media implementacja responswynych wiadomości e-mail jest łatwa. Aby dopasować rozmiar umieszczonego przez nas zdjęcia kociaka do odpowiednich ekranów, należy dodać atrybut `layout="responsive"` do znacznika `<amp-image>`.

[tip type="read-on"] [Dowiedz się więcej o tym, jak AMP działa z zapytaniami dotyczącymi układu i mediów](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Zwiększaj i zmniejszaj okno przeglądarki, aby oglądać zmianę rozmiaru obrazu! Zobacz [tutaj listę obsługiwanych składników w zależności od układu](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Modyfikacja prezentacji i układu

Jeden obraz to nie problem, ale co jeśli chcemy wyświetlić ich więcej? AMP dla poczty e-mail obsługuje elementy układu takie, jak akordeony i paski boczne.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

W tym samouczku użyjemy elementu [<kod><amp-carousel></kod>](/content/amp-dev/documentation/components/reference/amp-carousel.md), aby wyświetlić zdjęcia kotów do adopcji.

Dodaj skrypt `amp-carousel` do sekcji head wiadomości e-mail.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Następnie otocz nasz pierwszy obraz znacznikami `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Możesz zauważyć, że nic się nie zmieniło, a to dobrze! Nasza karuzela otrzymała atrybut `type=slides`, co znaczy, że będzie pokazywać jedno zdjęcie naraz. Jako że w znacznikach umieściliśmy tylko jedno zdjęcie, użytkownikowi nie będą wyświetlane strzałki do przesuwania.

Następnie zamień zdjęcie kociaka w znaczniku `<amp-carousel>` na nasze koty AMP do adopcji.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Teraz możliwa powinna być zmiana zdjęć kliknięciem strzałki nawigacyjnej po lewej lub prawej stronie karuzeli!

## Wysyłanie ze stylem

AMP pozwala na stylizację w znaczniku `<style amp-custom>` w sekcji head dokumentu. Ponadto można teraz używać wcześniej zakazanych klas i pseudoklas CSS. [Przeczytaj pełną listę tutaj](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Zamieńmy tytuł `Hello, AMP4EMAIL world` na faktyczny tytuł.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

A teraz dodajmy stylizację w sekcji head.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Dodawanie funkcji dynamicznych

Klasyczne wiadomości e-mail pozwalają tylko na zawartość statyczną. Dzięki AMP wiadomości e-mail są otwarte na zupełnie nowe możliwości! Użytkownicy mogą teraz odpowiadać na [formularze](/content/amp-dev/documentation/components/reference/amp-form.md), otrzymywać [dynamicznie aktualizowaną listę treści](/content/amp-dev/documentation/components/reference/amp-list.md) i wchodzić w interakcję z treścią.

W tym samouczku użyjemy elementu [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md), aby wyświetlić imię naszego kota do adopcji i opis, gdy użytkownik znajdzie się na slajdzie tego kota. Zacznij od dodania skryptu `amp-bind` do sekcji head wiadomości e-mail.

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

Następnie zadeklarujemy zmienną AMP bind "myState" jako coąg znaków JSON w znaczniku [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Mamy cztery zdjęcia kotów, dodamy więc stan wszystkich czterech.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Działania i zdarzenia AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) wyzwalają różne stany. W naszym przypadku chcemy aktualizować stan, gdy użytkownik kliknie strzałki nawigacji karuzeli. Składnik amp-carousel wygeneruje zdarzenie [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), wskutek czego zmienna `currentCat` zostanie zaktualizowana za pomocą funkcji `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Ten kod ustawia stan `currentCat`, aby dopasować zdjęcie kota w indeksie karuzeli. Jeśli więc jesteśmy na slajdzie `event.index=2`, stan jest mapowany na pozycje w indeksie 2 tablicy.

Jedyne co nam pozostało, to wyświetlenie imienia naszego kota i jego opisu. Dodaj następujący kod pod znacznikiem zamykającym `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

Rozszerzenie `amp-bind` wykorzystuje [wyrażenia](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) i [powiązania](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) do dynamicznej zmiany treści. Powyższy przykład kodu stosuje wiązanie `[text]` do aktualizacji tekstu w znaczniku `<span>` przy każdej zmianie stanu poprzez ewaluację wyrażenia `"myState.cats[currentCat].name"`.

[tip type="note"] W celu zapewnienia wydajności i uniknięcia ryzyka nieoczekiwanych skoków treści, składnik amp-bind nie ewaluuje wyrażeń podczas ładowania strony. To znaczy, że elementom wizualnym powinien zostać nadany stan domyślny i nie powinny polegać na składniku amp-bind przy wstępnym renderowaniu. [/tip]

Nie zapomnij dodać opisów naszych kotów po znaczniku `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Teraz, gdy zmienisz zdjęcie kota w karuzeli, jego imię i opis również powinny zostać zaktualizowane!

# Wysyłanie wiadomości e-mail AMP

Aby dowiedzieć się, jak wysyłać wiadomości e-mail do skrzynki odbiorczej, [przeczytaj więcej o testowaniu wiadomości e-mail AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Gratulacje! Udało Ci się wysłać Twoją pierwszą wiadomość e-mail AMP!

Następne kroki znajdziesz w artykule [Podstawy AMP dla poczty e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
