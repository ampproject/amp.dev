---
'$title': Podstawy poczty elektronicznej AMP
$order: 1
description: Wszystko, co musisz wiedzieć, aby rozpocząć pisanie prawidłowych wiadomości e-mail AMP.
author: CrystalOnScript
formats:
  - email
---

Jeśli znasz AMP, to świetna wiadomość! AMP dla poczty e-mail jest po prostu podzbiorem biblioteki AMP HTML. Jeśli nie znasz AMP, to też świetna wiadomość! Ten przewodnik da Ci wszystko, co musisz wiedzieć, aby rozpocząć pisanie prawidłowych wiadomości e-mail AMP!

## Wymagane znaczniki

Wiadomości e-mail AMP wyglądają jak klasyczne wiadomości HTML, ale z kilkoma różnicami. Poniżej znajduje się minimalna ilość znaczników wymagana do tego, aby wiadomość e-mail była prawidłową wiadomością e-mail AMP.

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
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

Dostawcy usług poczty elektronicznej, którzy obsługują pocztę elektroniczną AMP, utworzyli kontrole bezpieczeństwa, zapewniające użytkownikom przyjemne i bezpieczne jej użytkowanie. Wiadomości e-mail utworzone za pomocą AMP muszą spełniać wszystkie wymagania:

- Zaczynać się od znacznika typu dokumentu `<!doctype html>`. Jest to również standard w przypadku HTML.
- Zawierać znacznik najwyższego poziomu `<html amp4email>` albo znacznik `<html ⚡4email>`, jeśli dana wiadomość jest wyjątkowo rozbudowana. Identyfikują one dokument jako wiadomość e-mail AMP, dzięki czemu może być odpowiednio przetwarzana.
- Definiować zarówno znaczniki `<head>`, jak i `<body>`. Jest to opcjonalne w HTML, ale AMP utrzymuje nieskazitelną czystość spraw!
- Zawierać znacznik `<meta charset="utf-8>` jako pierwszy element podrzędny znacznika `<head>`. Identyfikuje on kodowanie strony.
- Biblioteka AMP jest importowana za pomocą znacznika `<script async src="https://cdn.ampproject.org/v0.js"></script>` umieszczonego w sekcji `<head>`. Bez niego żadna ze wspaniałych i dynamicznych funkcjonalności uzyskiwanych dzięki AMP nie będzie działać! Zgodnie z najlepszą praktyką należy go umieścić jak najwcześniej w sekcji `<head>`, bezpośrednio pod znacznikiem `<meta charset="utf-8">`.
- Początkowo należy ukryć zawartość wiadomości e-mail do chwili załadowania biblioteki AMP, umieszczając kod standardowy AMP dla poczty e-mail w sekcji `<head>`.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### Specyficzne dla AMP zastąpienia znaczników

Jako że biblioteka AMP dla poczty e-mail jest podzbiorem biblioteki AMP HTML, zastosowanie ma wiele tych samych zasad; specyficzne znaczniki AMP zastępują obciążające zasoby znaczniki HTML i wymagają określonej szerokości i wysokości. Pozwala to kodowi standardowemu AMP ukryć zawartość do chwili, gdy uzyska on wyobrażenie o tym, jak wygląda ta zawartość na urządzeniu użytkownika.

#### Obrazy

Aby efektywnie wyświetlać stronę, wszystkie znaczniki `<img>` zostają zastąpione znacznikami [`<amp-img>`](../../../documentation/components/reference/amp-img.md). Znacznik `<amp-img>` wymaga zdefiniowanej szerokości oraz wysokości i obsługuje system układu [AMP'a](amp-html-layout/index.md).

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

Znacznik `<amp-img>` obsługuje wydajne, wbudowane sposoby kontroli responsywności projektu i ma ustawione zasoby rezerwowe.

[tip type="note"] Dowiedz się więcej na temat korzystania z [układu i zapytań o media](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) AMP oraz ustawiania [zasobów rezerwowych obrazów](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### Pliki GIF

W AMP stworzono tag [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), specjalny znacznik obrazów GIF, który pozwala środowisku uruchomieniowemu AMP na zmniejszanie obciążenia procesora, gdy animacja nie jest widoczna na ekranie. Podobnie jak w przypadku znacznika `<amp-img>`, szerokość i wysokość muszą być zdefiniowane, a element musi zawierać znacznik zamykający.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Dodatkowo znacznik obsługuje opcjonalny element podrzędny `placeholder` do wyświetlania podczas ładowania pliku wskazanego w atrybucie `src` i obsługuje system układu AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Stylowe wiadomości e-mail <a name="emails-with-style"></a>

Podobnie jak w przypadku wszystkich klientów poczty elektronicznej, AMP umożliwia korzystanie z atrybutów inline `style`, ale obsługuje również CSS w znaczniku `<style amp-custom>` w nagłówku wiadomości.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Podobnie jak w przypadku wiadomości e-mail HTML, AMP dla poczty e-mail obsługuje ograniczony podzbiór selektorów i właściwości CSS.

Artykul [CSS obsługiwany przez AMP dla poczty e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) zawiera pełną listę CSS dozwolonych w programach pocztowych obsługujących AMP.

[tip type="important"] AMP narzuca limit rozmiaru 75 000 bajtów na stylizację. [/tip]

## Dozwolone składniki AMP

Wiadomości e-mail AMP są przyszłością poczty elektronicznej dzięki dynamice, cechom wizualnym i interaktywności składników AMP.

Pełna lista [składników obsługiwanych w AMP dla poczty e-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) jest dostępna jako część specyfikacji AMP dla poczty e-mail.

## Żądania uwierzytelnienia

Dynamicznie personalizowana treść wiadomości e-mail często wymaga uwierzytelnienia użytkownika. W celu ochrony danych użytkownika wszystkie żądania HTTP wysyłane z wiadomości e-mail AMP mogą być jednak buforowane i pozbawiane plików cookie.

Do uwierzytelniania żądań wysyłanych z wiadomości e-mail AMP można używać tokenów dostępu.

### Tokeny dostępu

Do uwierzytelnienia użytkownika można użyć tokenów dostępu. Tokeny dostępu są dostarczane i sprawdzane przez nadawcę wiadomości e-mail. Nadawca używa tokenów w celu zapewnienia, że tylko osoby mające dostęp do wiadomości e-mail AMP mogą wysyłać zawarte w niej żądania. Tokeny dostępu muszą być zabezpieczone kryptograficznie i mieć ograniczenia czasu oraz zakresu. Są one dołączane do adresu URL żądania.

Ten przykład pokazuje użycie znacznika `<amp-list>` do wyświetlania uwierzytelnionych danych:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

Podobnie, gdy używasz znacznika `<amp-form>`, umieść swój token dostępu w adresie URL atrybutu `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Przykład

Poniższy przykład dotyczy hipotetycznej usługi robienia notatek, która umożliwia zalogowanym użytkownikom dodawanie notatek do ich konta i ich późniejsze przeglądanie. Usługa chce wysłać do użytkownika, na adres `jane@example.com`, wiadomość e-mail, która zawiera listę wcześniej sporządzonych notatek. Lista notatek bieżącego użytkownika jest dostępna w punkcie końcowym `https://example.com/personal-notes` w formacie JSON.

Przed wysłaniem wiadomości e-mail usługa generuje kryptograficznie zabezpieczony token dostępu z użyciem ograniczonym do adresu `jane@example.com: A3a4roX9x`. Token dostępu znajduje się w nazwie pola `exampletoken` w zapytaniu o adres URL:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

Punkt końcowy `https://example.com/personal-notes` jest odpowiedzialny za walidację parametru exampletoken i znalezienie użytkownika powiązanego z tokenem.

### Tokeny dostępu z ograniczonym użyciem

Toeny dostępu z ograniczonym użyciem chronią przed fałszowaniem żądań oraz [atakami przez powtarzanie](https://en.wikipedia.org/wiki/Replay_attack), upewniając się, że działanie wykonuje użytkownik, do którego wiadomość została wysłana. Ochrona jest osiągana poprzez dodanie unikalnego parametru tokenu do parametrów żądania i zweryfikowanie go w chwili wywołania działania.

Parametr tokenu powinien być wygenerowany jako klucz, którego może użyć tylko określony użytkownik do określonego działania. Przed wykonaniem żądanego działania należy sprawdzić, czy token jest prawidłowy i odpowiada tokenowi wygenerowanemu dla danego użytkownika. Jeśli token jest zgodny, działanie może zostać wykonane, a token staje się nieprawidłowy dla przyszłych żądań.

Tokeny dostępu należy wysyłać do użytkownika jako część właściwości url HttpActionHandler. Jeśli na przykład aplikacja obsługuje żądania zatwierdzenia pod adresem `http://www.example.com/approve?requestId=123`, należy rozważyć dodanie do niego dodatkowego parametru `accessToken` i nasłuchiwać żądań wysyłanych na adres `http://www.example.com/approve?requestId=123&accessToken=xyz`.

Połączenie `requestId=123` i `accessToken=xyz` trzeba wygenerować z wyprzedzeniem, upewniając się, że parametru `accessToken` nie można wydedukować z identyfikatora `requestId`. Każde żądanie zatwierdzenia z `requestId=123` i bez `accessToken` lub z `accessToken` różnym od `xyz` powinno być odrzucane. Gdy to żądanie zostanie zrealizowane, każde następne żądanie z tym samym identyfikatorem i tokenem dostępu również powinno zostać odrzucone.

## Testowanie w różnych programach pocztowych

Programy pocztowe obsługujące AMP dla poczty e-mail mają własną dokumentację i narzędzia do testowania, ułatwiające integrację.

Artykuł [Testowanie wiadomości e-mail AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) zawiera więcej informacji i linki do dokumentacji poszczególnych programów pocztowych.
