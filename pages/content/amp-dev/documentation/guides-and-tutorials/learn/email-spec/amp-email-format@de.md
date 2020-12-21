---
"$title": Das Format AMP für E-Mail
order: '1'
formats:
- email
teaser:
  text: " Required markup"
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
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

Die AMP Technologie ist bekannt für die Entwicklung superschneller Webseiten auf mobilen Clients. AMP besteht aus einer Reihe von HTML Tags, die von JavaScript unterstützt werden und auf einfache Weise Funktionen ermöglichen, die zusätzlich auf Leistung und Sicherheit achten. [AMP Komponenten](https://amp.dev/documentation/components/) gibt es für alles: von Karussells über responsive Formularelemente bis hin zum Abruf neuer Inhalte von Remote Endpoints.

The AMP for Email format provides [a subset of AMP components](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md) that you can use in email messages. Recipients of AMP emails can view and interact with the AMP components directly in the email.

## Required markup <a name="required-markup"></a>

The following code represents the minimum amount of markup that makes up a valid AMP email message:

[sourcecode:html]
<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

An AMP email message MUST

- <a name="dctp"></a>mit dem Doctype `<!doctype html>` beginnen, [🔗](#dctp)
- <a name="ampd"></a>das Tag `<html ⚡4email>` der obersten Ebene enthalten (`<html amp4email>` wird ebenfalls akzeptiert), [🔗](#ampd)
- <a name="crps"></a>die Tags `<head>` und `<body>` enthalten (diese sind in HTML optional), [🔗](#crps)
- <a name="chrs"></a>das Tag `<meta charset="utf-8">` als erstes untergeordnetes Element ihres Head Tags enthalten, [🔗](#chrs)
- <a name="scrpt"></a>das Tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` in ihrem Head Tag enthalten, [🔗](#scrpt)
- <a name="boilerplate"></a>ein amp4email Boilerplate (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) in ihrem Head Tag enthalten, um den Inhalt auszublenden, bis AMP JS geladen wird. [🔗](#boilerplate)

The entire AMPHTML markup must not exceed 200,000 bytes.

## Structure and rendering <a name="structure-and-rendering"></a>

AMP für E-Mail basiert auf dem standardmäßigen `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) Untertyp, definiert in [RFC 1521, Abschnitt 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

*For more information, see [Structure and rendering of AMP emails](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md).*

## Supported AMP components <a name="supported-amp-components"></a>

*See [AMP for Email Supported Components](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md).*

## HTML requirements <a name="html-requirements"></a>

*Siehe [AMP für E-Mail: Unterstütztes HTML](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md).*

## CSS requirements <a name="css-requirements"></a>

### Supported selectors and properties <a name="supported-selectors-and-properties"></a>

*Siehe [AMP für E-Mail: Unterstütztes CSS](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md).*

### Angabe von CSS in einem AMP Dokument <a name="specifying-css-in-an-amp-document"></a>

Das gesamte CSS in einem AMP Dokument muss im Tag `<style amp-custom>` im Header enthalten sein oder als `style` Inline Attribute vorliegen.

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

Hinweis: Das gesamte Tag `<style>` darf 50.000 Byte nicht überschreiten. Der Validator überprüft dies.

## Document dimensions <a name="document-dimensions"></a>

- **Optimal width**: 800px or less (any wider and content may be unexpectedly truncated on some clients).

- **Höhe**: variabel, der Client erlaubt dem Benutzer, durch den Inhalt zu scrollen.

## Validation <a name="validation"></a>

To ensure your email messages meet the strict criteria for the AMP for Email format, you can use AMP's existing validation tools.

Mehr Informationen findest du in [Validierung von AMP E-Mails](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/).

## Privacy and Security <a name="privacy-and-security"></a>

### Das Öffnen von E-Mails und die Interaktion verfolgen <a></a>

AMPHTML ermöglicht es, das Öffnen von E-Mails durch Pixel Tracking Techniken zu verfolgen, genau wie gewöhnliche HTML E-Mails. Auch alle vom Benutzer initiierten Anforderungen für Daten von externen Diensten zeigen an, dass der Benutzer mit der Nachricht interagiert. E-Mail Clients können ihren Benutzern erlauben, das Laden von Remotebildern und andere externe Anforderungen zu deaktivieren.

### AMP-spezifisches Analytics <a name="amp-specific-analytics"></a>

Die folgenden AMP-spezifischen Analytics Techniken werden nicht unterstützt:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [AMP Variable Substitution](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Component-specific considerations <a name="component-specific-considerations"></a>

Requests for images inside [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) or [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) can indicate to the sender that the user is interacting with the message.

Redirects in [`<amp-form>`](https://amp.dev/documentation/components/amp-form) are disallowed at runtime.

## Feedback & Support <a name="feedback--support"></a>

Verwende bitte den folgenden Kanal für Support und Feedback zu AMP für E-Mail: [ongoing-participation](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
