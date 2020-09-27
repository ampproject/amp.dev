---
$title: AMP for Email Format
order: 1
formats:
  - email
teaser:
  text: ' Required markup'
toc: true
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

AMP is a technology known for developing super fast web pages on mobile clients. AMP is a set of HTML tags backed by JavaScript that easily enables functionality with an added focus on performance and security. There are [AMP components](https://amp.dev/documentation/components/) for everything from carousels, to responsive form elements, to retrieving fresh content from remote endpoints.

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

- <a name="dctp"></a>start with the doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>contain a top-level `<html ⚡4email>` tag (`<html amp4email>` is accepted as well). [🔗](#ampd)
- <a name="crps"></a>contain `<head>` and `<body>` tags (They are optional in HTML). [🔗](#crps)
- <a name="chrs"></a>contain a `<meta charset="utf-8">` tag as the first child of their head tag. [🔗](#chrs)
- <a name="scrpt"></a>contain a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag inside their head tag. [🔗](#scrpt)
- <a name="boilerplate"></a>contain amp4email boilerplate (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) inside their head tag to initially hide the content until AMP JS is loaded. [🔗](#boilerplate)

The entire AMPHTML markup must not exceed 200,000 bytes.

## Structure and rendering <a name="structure-and-rendering"></a>

AMP for Email relies on the standard `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) subtype, as defined in
[RFC 1521, section 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_For more information, see [Structure and rendering of AMP emails](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md)._

## Supported AMP components <a name="supported-amp-components"></a>

_See [AMP for Email Supported Components](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)._

## HTML requirements <a name="html-requirements"></a>

_See [Supported HTML in AMP for Email](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md)._

## CSS requirements <a name="css-requirements"></a>

### Supported selectors and properties <a name="supported-selectors-and-properties"></a>

_See [Supported CSS in AMP for Email](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md)._

### Specifying CSS in an AMP document <a name="specifying-css-in-an-amp-document"></a>

All CSS in any AMP document must be included in a `<style amp-custom>` tag within the header or as inline `style` attributes.

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

Note: The entire `<style>` tag cannot exceed 50,000 bytes. The validator will check for this.

## Document dimensions <a name="document-dimensions"></a>

- **Optimal width**: 800px or less (any wider and content may be unexpectedly truncated on some clients).

- **Height**: variable, the client allows the user to scroll through the content.

## Validation <a name="validation"></a>

To ensure your email messages meet the strict criteria for the AMP for Email format, you can use AMP's existing validation tools.

See [Validate AMP Email](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) for more information.

## Privacy and Security <a name="privacy-and-security"></a>

### Tracking email opens and interaction <a name="tracking-email-opens-and-interaction"></a>

AMPHTML allows tracking email opens with pixel tracking techniques, same as regular HTML emails. Any user-initiated requests for data from external services will also indicate the user is interacting with the message. Email clients may offer their users the ability to disable loading remote images, and other external requests.

### AMP-specific analytics <a name="amp-specific-analytics"></a>

The following AMP-specific analytic techniques are not supported:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [AMP Variable Substitution](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Component-specific considerations <a name="component-specific-considerations"></a>

Requests for images inside [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) or [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)
can indicate to the sender that the user is interacting with the message.

Redirects in [`<amp-form>`](https://amp.dev/documentation/components/amp-form) are disallowed at runtime.

## Feedback & Support <a name="feedback--support"></a>

For support and feedback on AMP for Email, please use the following channel: [ongoing-participation](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)