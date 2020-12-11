---
"$title": Dodawanie AMP do istniejących wiadomości e-mail
"$order": '1'
author: CrystalOnScript
formats:
- email
---

Format AMP dla poczty e-mail jest osadzany jako nowa część MIME. Jeśli wiadomość e-mail zostanie wysłana do usługodawcy, który obsługuje AMP dla poczty e-mail, zostanie ona wyświetlona — a jeśli nie, to nie martw się! Usługodawca wyświetli Twój kod HTML lub rezerwowy zwykły tekst. Użyj tego przewodnika, aby włączyć AMP do swoich wiadomości e-mail.

# Dodawanie części AMP MIME

Wiadomość e-mail ma strukturę [drzewa MIME](https://en.wikipedia.org/wiki/MIME), które zawiera treść wiadomości e-mail i załączniki. Aby móc dodać AMP do swoich wiadomości e-mail, należy dodać nową część MIME z typem zawartości `text/x-amp-html`.

Część AMP MIME musi być zagnieżdżona w węźle `multipart/alternative` obok istniejących części `text/html` lub `text/plain`. Gwarantuje to, że wiadomość email będzie renderowana na wszystkich klientach.

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

[tip type="important"] Niektóre programy pocztowe będą renderować tylko ostatnią część MIME. Aby zapewnić renderowanie waidomości e-mail, umieść część MIME `text/x-amp-html` przed częścią MIME `text/html`. [/tip]

# Co się dzieje gdy odbiorcy przesyłają dalej wiadomość e-mail AMP lub odpowiadają na nią?

Gdy użytkownik przesyła dalej wiadomość e-mail AMP lub odpowiada na nią, część drzewa MIME `text/x-amp-html` jest usuwana z wiadomości. Dlatego też zapewnienie alternatywnej treści w części HTML jest ważne, nawet w przypadku wysyłania wiadomości e-maili AMP do programów pocztowych obsługujących typ MIME.
