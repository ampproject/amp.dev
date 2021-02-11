---
'$title': Füge AMP zu vorhandenen E-Mails hinzu
$order: 1
author: CrystalOnScript
formats:
  - email
---

Das Format AMP für E-Mail wird als neuer MIME Teil eingebettet. Wenn deine E-Mail an einen Provider gesendet wird, der AMP für E-Mail unterstützt, wird sie angezeigt. Wenn nicht – keine Sorge! Der Provider zeigt dein HTML oder ein Nur-Text Fallback an. Verwende diesen Leitfaden, um AMP in deine E-Mails aufzunehmen.

# Füge den AMP MIME Teil hinzu

Eine E-Mail besitzt eine [MIME Baumstruktur](https://en.wikipedia.org/wiki/MIME), die den Nachrichtentext und alle Anhänge der E-Mail enthält. Um AMP in deine E-Mails aufzunehmen, musst du einen neuen MIME Teil mit dem Inhaltstyp `text/x-amp-html` hinzufügen.

Der AMP MIME Teil muss im Knoten `multipart/alternative` geschachtelt sein und den vorhandenen Teilen `text/html` bzw. `text/plain` gleichgestellt sein. Dadurch wird sichergestellt, dass die E-Mail Nachricht auf allen Clients gerendert wird.

```html
From: Person A
<persona@example.com>
  To: Person B
  <personb@example.com>
    Subject: An AMP email! Content-Type: multipart/alternative;
    boundary="001a114634ac3555ae05525685ae" --001a114634ac3555ae05525685ae
    Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes Hello
    World in plain text! --001a114634ac3555ae05525685ae Content-Type:
    text/x-amp-html; charset="UTF-8"

    <!DOCTYPE html>
    <html ⚡4email data-css-strict>
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
        Hello World in AMP!
      </body>
    </html>
    --001a114634ac3555ae05525685ae-- Content-Type: text/html; charset="UTF-8"

    <span>Hello World in HTML!</span>
    --001a114634ac3555ae05525685ae</personb@example.com
  ></persona@example.com
>
```

[tip type="important"] Um sicherzustellen, dass eine E-Mail gerendert wird, platziere den MIME Teil `text/x-amp-html` vor dem MIME Teil `text/html`. [/tip]

# Was passiert, wenn Empfänger eine AMP E-Mail weiterleiten oder beantworten?

Wenn Benutzer eine AMP E-Mail weiterleiten oder beantworten, wird der Teil `text/x-amp-html` der MIME Struktur entfernt. Deshalb ist es wichtig, alternative Inhalte im HTML Teil bereitzustellen, selbst wenn AMP E-Mails an Clients gesendet werden, die den MIME Typ unterstützen.
