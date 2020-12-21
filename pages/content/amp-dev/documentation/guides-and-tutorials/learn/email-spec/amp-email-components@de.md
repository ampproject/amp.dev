---
"$title": 'AMP für E-Mail: Unterstützte Komponenten'
order: '3'
formats:
- email
teaser:
  text: 'Die folgende Liste enthält die AMP Komponenten, die derzeit in AMP E-Mail Nachrichten unterstützt werden. Die Komponenten sind in folgende Kategorien unterteilt:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
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

Die folgende Liste enthält die [AMP Komponenten](https://amp.dev/documentation/components/?format=email), die derzeit in AMP E-Mail Nachrichten unterstützt werden. Die Komponenten sind in folgende Kategorien unterteilt:

- [Dynamic Content](#dynamic-content)
- [Layout](#layout)
- [Media](#media)

## Dynamischer Inhalt <a name="dynamic-content"></a>

Element | Beschreibung
--- | ---
[`<amp-form>`](https://amp.dev/documentation/components/amp-form) | Form element. The action-xhr attribute must be used in place of the regular action attribute. Can be used in conjunction with `<template type="amp-mustache">` to render a response. <br><br>**Note:** [Redirecting after submission](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) is not allowed.
[`<amp-selector>`](https://amp.dev/documentation/components/amp-selector) | Ein Mehrfachauswahlwidget zur Verwendung in einem Formular.
[`amp-bind`](https://amp.dev/documentation/components/amp-bind) und [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Simple scripting language in AMP that allows the manipulation of a state machine for interactions between elements. Can also be used to add behavior on certain events.<br><br>**Note:** It is prohibited to bind to `[href]` or `[src]`. It is also prohibited to use the `AMP.print`, `AMP.navigateTo` and `AMP.goBack` actions.
[`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification) | `<amp-state>` wird verwendet, um den Anfangszustand zu definieren, der von `amp-bind` verwendet wird.<br><br>**Hinweis:** Das Attribut `src` wird derzeit nicht unterstützt.
[`<amp-list>`](https://amp.dev/documentation/components/amp-list) | Remotely fetches JSON data that will be rendered by an [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Note:** Binding to the `[src]` attribute is not allowed. Including user credentials with `credentials="include"` is also prohibited.
[`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache) | A Mustache template markup to render the results of an `amp-list` call.

## Layout <a name="layout"></a>

Element | Beschreibung
--- | ---
[layout attributes](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Layout behavior is determined by the layout attribute.
[`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) | Ein UI Element, das das Einblenden/Ausblenden verschiedener Abschnitte erleichtert.
[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) | A carousel UI component.
[`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text) | Eine Hilfskomponente zum Anpassen von Text in einem bestimmten Bereich.
[`<amp-layout>`](https://amp.dev/documentation/components/amp-layout) | A container that can have aspect-ratio based responsive layouts.
[`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar) | Eine Seitenleiste für Navigationszwecke.
[`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago) | Bietet eine bequeme Möglichkeit, um Zeitstempel zu rendern.

## Medien <a name="media"></a>

Element | Beschreibung
--- | ---
[`<amp-img>`](https://amp.dev/documentation/components/amp-img) | Eine AMP Komponente, die `<img>` ersetzt.<br><br>**Hinweis:** Bindung an `[src]` ist nicht zulässig.
[`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Bettet GIF Dateien ein.<br><br>**Hinweis:** Bindung an `[src]` ist nicht zulässig.
