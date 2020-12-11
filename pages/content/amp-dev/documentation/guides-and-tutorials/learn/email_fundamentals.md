---
$title: AMP for Email Fundamentals
$order: 1
description: 'Everything you need to know to get started writing valid AMP Emails.'
author: CrystalOnScript
formats:
  - email
---

If you're familiar with AMP, great news! AMP for Emails is just a subset of the AMP HTML library. If you're unfamiliar with AMP, also great news! This guide will give you everything you need to know to get started writing valid AMP Emails!

## Required Markup

AMP Emails look like classic HTML emails, but with a few differences. Below is the minimum amount of markup required to make an email a valid AMP email.

```html
<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body>
  Hello, AMP4EMAIL world.
</body>
</html>
```

Email providers who support AMP Emails have set up security checks to ensure users get a delightful and safe experience. An email build with AMP must meet all requirements:

*   Start with the `<!doctype html>` doctype. This is also standard for HTML.
*   Contain a top-level a `<html amp4email>` tag, or an `<html ⚡4email>` tag if your email is extra cool. This identifies the document as an AMP Email so it can be treated as such.
*   Define both `<head>` and `<body>` tags. This is optional in HTML, but AMP keeps things pristine!
*   Include a `<meta charset="utf-8>` tag as the first child of the `<head>` tag. This identifies the encoding for the page.
*   The AMP library is imported through a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag placed in the `<head>`. Without it, none of the awesome and dynamic functionality gained through AMP will work! As a best practice, this should be included as early as possible in the `<head>`, directly under the `<meta charset="utf-8">` tag.
*   Initially hide the email content until the AMP library is loaded by placing the AMP for Email boilerplate in the `<head>`.

```html
<head>
...
  <style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
```

### AMP Specific Tag Replacements

Since the AMP for Email library is a subset of the AMP HTML library, many of the same rules apply; AMP specific tags replace resource heavy HTML tags and require a defined width and height. This allows the AMP boilerplate to hide content until it has an idea of how it looks on the user's device.


#### Images

To paint the page effectively, all `<img>` tags are replaced with [`<amp-img>`](../../../documentation/components/reference/amp-img.md). The `<amp-img>` tag requires a defined width and height and supports [AMP's layout system](amp-html-layout/index.md)


```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

The `<amp-img>` tag comes with powerful, built-in ways to control responsive design and set fallbacks.

[tip type="note"]
    Read more about using the AMP [layout and media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) and how to set [image fallbacks](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).
[/tip]

#### GIFs

AMP has created [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), a specific tag for GIF images that allows the AMP runtime to reduce CPU usage when the animation is off-screen. Similar to `<amp-img>` the width and height is defined and the element must include a closing tag.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Additionally, it supports an optional `placeholder` child to display while the `src` file is loading, and supports the AMP layout system.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Emails, with style <a name="emails-with-style"></a>

Like all email clients, AMP allows for inline `style` attributes, but also supports CSS within the `<style amp-custom>` tag inside the head of the email.

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

Like HTML emails, AMP for Email supports a limited subset of CSS selectors and properties.

See [AMP for Email Supported CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)
for a full list of CSS allowed across email clients that support AMP.

[tip type="important"]
    AMP enforces a size limit of 75,000 bytes for styling.
[/tip]

## Allowed AMP Components

The dynamic, visual, and interactivity features of AMP components is what takes AMP Emails into the future of email.

The full [list of supported components in AMP for Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)
is available as part of the AMP for Email spec.

## Authenticating requests

Dynamic personalized email content often requires authenticating the user. However, to protect user data all HTTP requests made from inside AMP emails may be proxied and stripped of cookies.

To authenticate requests made from AMP emails, you may use access tokens.

### Access tokens

You can use access tokens to authenticate the user. Access tokens are supplied and checked by the email sender. The sender uses the tokens to ensure that only those with access to the AMP email can make the requests contained within that email. Access tokens must be cryptographically secure and time- and scope-limited. They are included within the URL of the request.

This example demonstrates using `<amp-list>` to display authenticated data:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache">
    ...
  </template>
</amp-list>
```

Similarly when using `<amp-form>`, place your access token in the `action-xhr` URL.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Example

The following example considers a hypothetical note-taking service that lets logged-in users to add notes to their account and view them later. The service wants to send an email to a user, `jane@example.com`, that includes a list of notes they previously took. The list of the current user's notes is available at the endpoint `https://example.com/personal-notes` in JSON format.

Before sending the email, the service generates a cryptographically secure limited-use access token for `jane@example.com: A3a4roX9x`. The access token is included in the field name `exampletoken` inside the URL query:

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

The endpoint `https://example.com/personal-notes` is responsible for validating the exampletoken parameter and finding the user associated with the token.

### Limited Use Access Tokens

Limited-Use Access Tokens provide protection from request spoofing and [replay attacks](https://en.wikipedia.org/wiki/Replay_attack), ensuring that the action is performed by the user the message was sent to. Protection is achieved by adding a unique token parameter to the request parameters and verifying it when the action is invoked.

The token parameter should be generated as a key that can only be used for a specific action and a specific user. Before the requested action is performed, you should check that the token is valid and matches the one you generated for the user. If the token matches then the action can be performed and the token becomes invalid for future requests.

Access tokens should be sent to the user as part of the url property of the HttpActionHandler. For instance, if your application handles approval requests at `http://www.example.com/approve?requestId=123`, you should consider including an additional `accessToken` parameter to it and listen to requests sent to `http://www.example.com/approve?requestId=123&accessToken=xyz`.

The combination `requestId=123` and `accessToken=xyz` is the one that you have to generate in advance, making sure that the `accessToken` cannot be deduced from the `requestId`. Any approval request with `requestId=123` and no `accessToken` or with a `accessToken` not equal to `xyz` should be rejected. Once this request gets through, any future request with the same id and access token should be rejected too.

## Testing in different email clients

Email clients that support AMP for Email provide their own documentation and testing tools to help you with your integration.

See [Testing AMP Emails](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)
for more information and links to email client-specific documentation.
