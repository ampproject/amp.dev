---
'$title': Componenti supportati da AMP per e-mail
$order: 3
formats:
  - email
teaser:
  text: "Di seguito è riportato l'elenco dei componenti AMP attualmente supportati nei messaggi e-mail AMP. Tali componenti sono raggruppati nelle seguenti categorie:"
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md.
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

Di seguito è riportato l'elenco dei [componenti AMP](https://amp.dev/documentation/components/?format=email) attualmente supportati nei messaggi e-mail AMP. Tali componenti sono raggruppati nelle seguenti categorie:

- [Contenuti dinamici](#dynamic-content)
- [Layout](#layout)
- [Contenuti multimediali](#media)

## <a id="dynamic-content">Contenuti dinamici</a>

| Elemento                                                                                                                                                                      | Descrizione                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                             | Elemento di forma. L'attributo action-xhr deve essere utilizzato al posto del normale attributo action. Può essere utilizzato insieme al componente `<template type="amp-mustache">` per visualizzare una risposta. <br><br>**Nota: il** [Reindirizzamento dopo l'invio](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) non è consentito.                          |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                     | Un widget a selezione multipla da utilizzare all'interno di moduli.                                                                                                                                                                                                                                                                                                                                    |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) e [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Semplice linguaggio per la realizzazione di script in AMP che consente la gestione di macchine a stati per le interazioni tra gli elementi. Può essere utilizzato anche per aggiungere comportamenti a determinati eventi. <br><br>**Nota:** Non è consentito eseguire associazioni a elementi`[href]` o `[src]`. È inoltre vietato utilizzare le azioni `AMP.print`, `AMP.navigateTo` e `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                              | `<amp-state>` è utilizzato per definire lo stato iniziale utilizzato da `amp-bind`. <br><br>**Nota:** l'attributo `src` non è attualmente supportato.                                                                                                                                                                                                                                                  |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                             | Questo elemento recupera dati JSON remoti il cui rendering sarà eseguito da un componente [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Nota:** L'abbinamento ad attributi `[src]` non è consentito. Anche l'inclusione delle credenziali di utente tramite `credentials="include"` non è consentita.                                                            |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                     | Il markup di un modello Moustache che permette di eseguire il rendering dei risultati di una chiamata `amp-list`.                                                                                                                                                                                                                                                                                      |

## Layout <a name="layout"></a>

| Elemento                                                                                                           | Descrizione                                                                                      |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [attributi di layout](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Il comportamento del layout è determinato dall'attributo di layout.                              |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                        | Un elemento dell'interfaccia utente che permette di mostrare/nascondere le varie sezioni.        |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                          | Un componente dell'interfaccia utente di tipo sequenza.                                          |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                          | Un componente di supporto che permette di adattare il testo all'interno di una determinata area. |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                              | Un contenitore che può avere layout reattivi basati sulle proporzioni.                           |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                            | Una barra laterale usata per facilitare la navigazione.                                          |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                            | Fornisce un utile strumento per il rendering dei timestamp.                                      |

## Contenuti multimediali <a name="media"></a>

| Elemento                                                          | Descrizione                                                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Il componente AMP che sostituisce `<img>`. <br><br>**Nota: l'**associazione a `[src]` non è consentita. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Incorpora file GIF. <br><br> **Nota: l'**associazione a `[src]` non è consentita.                       |
