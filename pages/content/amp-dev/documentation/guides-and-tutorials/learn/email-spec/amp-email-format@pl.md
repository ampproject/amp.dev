---
'$title': Format AMP dla poczty e-mail
$order: 1
formats:
  - email
teaser:
  text: 'Wymagane znaczniki '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

AMP to technologia znana z tworzenia superszybkich stron internetowych na klientów mobilnych. AMP jest zestawem znaczników HTML obsługiwanych przez JavaScript, który w prosty sposób umożliwia tworzenie funkcjonalności z dodatkowym naciskiem na wydajność i bezpieczeństwo. Dostępne są składniki [AMP](https://amp.dev/documentation/components/) do wszystkiego, od karuzel, przez responsywne elementy formularzy, po pobieranie nowej zawartości ze zdalnych punktów końcowych.

Format AMP dla poczty e-mail zawiera [podzbiór składników AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md), które można stosować w wiadomościach e-mail. Odbiorcy wiadomości e-mail AMP mogą wyświetlać składniki AMP i wchodzić w interakcję z nimi bezpośrednio w wiadomości e-mail.

## Wymagane znaczniki

Poniższy kod zawiera minimalną ilość znaczników, niezbędnych w prawidłowej wiadomości e-mail AMP:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Wiadomość e-mail AMP musi

- <a name="dctp"></a>Zaczynać się od deklaracji `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>Zawierać znacznik najwyższego poziomu `<html ⚡4email>` (albo `<html amp4email>`). [🔗](#ampd)
- <a name="crps"></a>Zawierać znaczniki `<head>` oraz `<body>` (w HTML są one opcjonalne). [🔗](#crps)
- <a name="chrs"></a>Zawierać znacznik `<meta charset="utf-8">` jako pierwszy element podrzędny w sekcji head. [🔗](#chrs)
- <a name="scrpt"></a>Zawierać znacznik `<script async src="https://ampjs.org/v0.js"></script>` w sekcji head. [🔗](#scrpt)
- <a name="boilerplate"></a>Zawierać kod standardowy amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) w sekcji head, początkowo ukrywający zawartość do chwili załadowania JS AMP. [🔗](#boilerplate)

Rozmiar wszystkich znaczników AMPHTML nie może przekraczać 200 000 bajtów.

## Struktura i renderowanie <a name="structure-and-rendering"></a>

AMP dla poczty e-mail opiera się na standardowym podtypie <a>MIME</a> <code>multipart/alternative</code>, zdefiniowanym w [dokumencie RFC 1521, sekcja 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Więcej informacji zawiera artykuł [Struktura i renderowanie wiadomości e-mail AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md)._

## Obsługiwane składniki AMP <a name="supported-amp-components"></a>

_Patrz [Obsługiwane składniki AMP dla poczty e-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md)._

## Wymagania dotyczące HTML <a name="html-requirements"></a>

_Patrz [Kod HTML obsługiwany w AMP dla poczty e-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-html.md)._

## Wymagania dotyczące CSS <a name="css-requirements"></a>

### Obsługiwane selektory i właściwości <a name="supported-selectors-and-properties"></a>

_Patrz [Kod CSS obsługiwany w AMP dla poczty e-mail](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-css.md)._

### Określanie CSS w dokumencie AMP <a name="specifying-css-in-an-amp-document"></a>

Cały kod CSS w dowolnym dokumencie AMP musi być zawarty w znaczniku `<style amp-custom>` w nagłówku lub jako atrybuty inline `style`.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Uwaga: rozmiar całego znacznika `<style>` nie może przekraczać 50 000 bajtów. Sprawdzi to walidator.

## Wymiary dokumentu <a name="document-dimensions"></a>

- **Optymalna szerokość**: 800px lub mniejsza (przy większej szerokości zawartość może nieoczekiwanie zostać obcięta na niektórych klientach).

- **Wysokość**: zmiennej, klient zezwala użytkownikowi na przewijanie zawartości.

## Walidacja <a name="validation"></a>

Aby upewnić się, że wiadomości e-mail spełniają ścisłe kryteria formatu AMP dla poczty e-mail, można użyć istniejących narzędzi walidacji AMP.

Więcej informacji zawiera artykuł [Walidacja wiadomości e-mail AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/).

## Prywatność i bezpieczeństwo <a name="privacy-and-security"></a>

### Śledzenie otwarć wiadomości e-mail i interakcji <a name="tracking-email-opens-and-interaction"></a>

AMPHTML pozwala śledzić otwarcia wiadomości e-mail za pomocą technik śledzenia pikseli, tak jak w przypadku zwykłych wiadomości HTML. Każde zainicjowane przez użytkownika żądanie danych z usług zewnętrznych będzie również wskazywać na to, że użytkownik wchodzi w interakcję z wiadomością. Programy pocztowe mogą oferować swoim użytkownikom możliwość wyłączenia ładowania zdalnych obrazów i innych żądań zasobów zewnętrznych.

### Analityka specyficzna dla AMP <a name="amp-specific-analytics"></a>

Nie są obsługiwane następujące techniki analityczne specyficzne dla AMP:

- [AMP `CLIENT_ID</a>`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Podstawianie zmiennych AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Kwestie zależne od składników <a name="component-specific-considerations"></a>

Żądania obrazów ze znaczników [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) lub [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) mogą wskazać nadawcy, że użytkownik wchodzi w interakcję z wiadomością.

Przekierowania w znaczniku [`<amp-form>`](https://amp.dev/documentation/components/amp-form) są niedozwolone w środowisku uruchomieniowym.

## Informacje zwrotne i pomoc techniczna <a name="feedback--support"></a>

W celu uzyskania pomocy technicznej i przekazania informacji zwrotnych na temat AMP dla poczty e-mail należy użyć następującego kanału: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#ongoing-participation)
