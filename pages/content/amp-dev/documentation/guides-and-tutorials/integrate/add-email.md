---
$title: Add AMP to existing emails
$order: 1
author: CrystalOnScript
formats:
  - email
---

The AMP for Email format is embedded as a new MIME part. If your email is sent to a provider that supports AMP for Email, it will be displayed - if not, don't worry! The provider will display your HTML or plain text fallback. Use this guide to include AMP in your emails.


# Include the AMP MIME part

Email is structured as a [MIME tree](https://en.wikipedia.org/wiki/MIME), which contains the email message body and any attachments. To include AMP in your emails, you will need to add a new MIME part with the content type of `text/x-amp-html`.

The AMP MIME part must be nested under a `multipart/alternative` node and live alongside the existing `text/html` or `text/plain` parts. This ensures that the email message will render on all clients.


```html
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://ampjs.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae--
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae

```
[tip type="important"]
    Some email clients will only render the last MIME part. To ensure an email is rendered, place the `text/x-amp-html` MIME part _before_ the `text/html` MIME part.
[/tip]

# What happens when recipients forward or reply to an AMP Email?

When a user forwards or replies to an AMP Email, the `text/x-amp-html` part of the MIME tree is removed. This is why providing alternative content in the HTML part is important, even when sending AMP emails to clients that support the MIME type.
