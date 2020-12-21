---
"$title": Add AMP to existing emails
"$order": '1'
author: CrystalOnScript
formats:
- email
---

Das Format AMP für E-Mail wird als neuer MIME Teil eingebettet. Wenn deine E-Mail an einen Provider gesendet wird, der AMP für E-Mail unterstützt, wird sie angezeigt. Wenn nicht – keine Sorge! Der Provider zeigt dein HTML oder ein Nur-Text Fallback an. Verwende diesen Leitfaden, um AMP in deine E-Mails aufzunehmen.

# Include the AMP MIME part

Email is structured as a [MIME tree](https://en.wikipedia.org/wiki/MIME), which contains the email message body and any attachments. To include AMP in your emails, you will need to add a new MIME part with the content type of `text/x-amp-html`.

Der AMP MIME Teil muss im Knoten `multipart/alternative` geschachtelt sein und den vorhandenen Teilen `text/html` bzw. `text/plain` gleichgestellt sein. Dadurch wird sichergestellt, dass die E-Mail Nachricht auf allen Clients gerendert wird.

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
  <script async src="https://cdn.ampproject.org/v0.js"></script>
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

[tip type="important"] Some email clients will only render the last MIME part. To ensure an email is rendered, place the `text/x-amp-html` MIME part _before _the `text/html` MIME part. [/tip]

# What happens when recipients forward or reply to an AMP Email?

Wenn Benutzer eine AMP E-Mail weiterleiten oder beantworten, wird der Teil `text/x-amp-html` der MIME Struktur entfernt. Deshalb ist es wichtig, alternative Inhalte im HTML Teil bereitzustellen, selbst wenn AMP E-Mails an Clients gesendet werden, die den MIME Typ unterstützen.
