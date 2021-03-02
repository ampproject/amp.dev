---
'$title': 'AMP für E-Mail: Unterstützte Komponenten'
$order: 3
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

- [Dynamischer Inhalt ](#dynamic-content)
- [Layout](#layout)
- [Medien ](#media)

## Dynamischer Inhalt <a name="dynamic-content"></a>

| Element                                                                                                                                                                         | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                               | Formularelement. Das Attribut "action-xhr" muss anstelle des regulären Attributs "action" verwendet werden. Kann in Verbindung mit `<template type="amp-mustache">` verwendet werden, um eine Antwort zu rendern. <br><br>**Hinweis:** [Weiterleitung nach der Übermittlung](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) ist nicht zulässig.           |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                       | Ein Mehrfachauswahlwidget zur Verwendung in einem Formular.                                                                                                                                                                                                                                                                                                                                   |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) und [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Einfache Skriptsprache in AMP, die die Manipulation einer Zustandsmaschine für Interaktionen zwischen Elementen ermöglicht. Kann auch verwendet werden, um Verhalten zu bestimmten Ereignissen hinzuzufügen.<br><br>**Hinweis:** Darf nicht mit `[href]` oder `[src]` verbunden werden. Es ist auch nicht zulässig, die Aktionen `AMP.print`, `AMP.navigateTo` und `AMP.goBack` zu verwenden. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                                | `<amp-state>` wird verwendet, um den Anfangszustand zu definieren, der von `amp-bind` verwendet wird.<br><br>**Hinweis:** Das Attribut `src` wird derzeit nicht unterstützt.                                                                                                                                                                                                                  |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                               | Ruft per Remotezugriff JSON Daten ab, die von [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache) gerendert werden.<br><br>**Hinweis:** Bindung an das Attribut `[src]` ist nicht zulässig. Auch das Aufnehmen von Benutzeranmeldedaten mit `credentials="include"` ist nicht zulässig.                                                                                 |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                       | Ein Mustache Template Markup zum Rendern der Ergebnisse eines `amp-list` Aufrufs.                                                                                                                                                                                                                                                                                                             |

## Layout <a name="layout"></a>

| Element                                                                                                        | Beschreibung                                                                             |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Layoutattribute](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Das Layoutverhalten wird durch das Attribut "layout" bestimmt.                           |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                    | Ein UI Element, das das Einblenden/Ausblenden verschiedener Abschnitte erleichtert.      |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                      | Die UI Komponente Karussell.                                                             |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                      | Eine Hilfskomponente zum Anpassen von Text in einem bestimmten Bereich.                  |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                          | Ein Container, der responsive Layouts haben kann, die auf dem Seitenverhältnis basieren. |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                        | Eine Seitenleiste für Navigationszwecke.                                                 |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                        | Bietet eine bequeme Möglichkeit, um Zeitstempel zu rendern.                              |

## Medien <a name="media"></a>

| Element                                                           | Beschreibung                                                                                         |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Eine AMP Komponente, die `<img>` ersetzt.<br><br>**Hinweis:** Bindung an `[src]` ist nicht zulässig. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Bettet GIF Dateien ein.<br><br>**Hinweis:** Bindung an `[src]` ist nicht zulässig.                   |
