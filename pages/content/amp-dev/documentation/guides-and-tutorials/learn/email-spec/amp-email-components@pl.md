---
'$title': Obsługiwane składniki AMP dla poczty e-mail
$order: 3
formats:
  - email
teaser:
  text: 'Poniżej znajduje się lista składników AMP, które są obecnie obsługiwane w wiadomościach e-mail AMP. Składniki te są pogrupowane w następujące kategorie:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md.
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

Poniżej znajduje się lista składników AMP, które są obecnie obsługiwane w wiadomościach e-mail AMP. Składniki te są pogrupowane w następujące kategorie:

- [Zawartość dynamiczna](#dynamic-content)
- [Układ](#layout)
- [Media](#media)

## Zawartość dynamiczna <a name="dynamic-content"></a>

| Element                                                                                                                                                                       | Opis                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                             | Element formularza. Zamiast zwykłego atrybutu action musi być stosowany atrybut action-xhr. Element może być stosowany w połączeniu z parametrem `<template type="amp-mustache">` do renderowania odpowiedzi. <br><br>**Uwaga:** [przekierowywanie po przesłaniu](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) jest niedozwolone.            |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                     | Widżet wielokrotnego wyboru do stosowania w formularzu.                                                                                                                                                                                                                                                                                                                            |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) i [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Prosty język skryptowy w AMP, który pozwala na manipulację automatem stanów do celów interakcji między elementami. Może być również używany do dodawania sposobu działania w przypadku określonych zdarzeń.<br><br>**Uwaga:** zabronione jest wiązanie z atrybutami `[href]` lub `[src]`. Zabronione jest również stosowanie działań `AMP.print`, `AMP.navigateTo` i `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                              | Element `<amp-state>` służy do określenia stanu początkowego składnika `amp-bind`.<br><br>**Uwaga:** atrybut `src` nie jest obecnie obsługiwany.                                                                                                                                                                                                                                   |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                             | Pobiera zdalnie dane JSON, które będą renderowane przez składnik [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**&nbsp;Uwaga:** wiązanie z atrybutem `[src]` jest niedozwolone. Niedozwolone jest także dołączanie poświadczeń użytkownika za pomocą opcji `credentials="include"`.                                                            |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                     | Znacznik szablonu Mustache, służący do renderowania wyników wywołania `amp-list`.                                                                                                                                                                                                                                                                                                  |

## Układ <a name="layout"></a>

| Element                                                                                                        | Opis                                                                                |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Atrybuty layout](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Sposób działania układu określa się za pomocą atrybutu layout.                      |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                    | Element interfejsu użytkownika, umożliwiający pokazywanie/ukrywanie różnych sekcji. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                      | Składnik interfejsu użytkownika karuzeli.                                           |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                      | Składnik pomocniczy służący do dopasowywania tekstu do określonego obszaru.         |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                          | Kontener, który może mieć układy responsywne zależne od współczynnika proporcji.    |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                        | Pasek boczny do celów nawigacji.                                                    |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                        | Zapewnia wygodny sposób renderowania sygnatur czasowych.                            |

## Media <a name="media"></a>

| Element                                                           | Opis                                                                                                          |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Składnik AMP, zastępujący znacznik `<img>`.<br><br>**Uwaga:** wiązanie z atrybutem `[src]` jest niedozwolone. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Osadza pliki GIF.<br><br>**Uwaga:** wiązanie z atrybutem `[src]` jest niedozwolone.                           |
