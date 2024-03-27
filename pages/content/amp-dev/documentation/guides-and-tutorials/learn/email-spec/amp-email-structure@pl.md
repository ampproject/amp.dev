---
'$title': 'Struktura i renderowanie wiadomości e-mail AMP '
$order: 2
formats:
  - email
teaser:
  text: Wiadomości e-mail nadawana jest struktura drzewa MIME. To drzewo MIME zawiera treść wiadomości i wszelkie załączniki do wiadomości e-mail.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
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

Wiadomości e-mail nadawana jest struktura drzewa MIME. To drzewo MIME zawiera treść wiadomości i wszelkie załączniki do wiadomości e-mail.

Aby móc osadzić AMP w wiadomości e-mail, należy dodać nową część MIME z typem zawartości `text/x-amp-html` jako elementem potomnym wezła `multipart/alternative`. Powinna ona znajdować się obok istniejących części `text/html` lub `text/plain`. To zapewni działanie wiadomości e-mail na wszystkich klientach.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="Diagram części AMP dla poczty e-mail MIME" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Więcej informacji o podtypie `multipart/alternative` zawiera [dokument RFC 1521, sekcja 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Dodatkowe informacje <a name="additional-information"></a>

Część `text/x-amp-html` musi być zagnieżdżona pod węzłem `multipart/alternative`. Wiadomość e-mail może mieć nie więcej niż jedną część `text/x-amp-html` wewnątrz węzła `multipart/alternative`.

Część `multipart/alternative` musi zawierać co najmniej jeden węzeł bez AMP (`text/plain` albo `text/html`) oprócz węzła `text/x-amp-html`. Będzie on wyświetlany użytkownikom, których programy pocztowe nie obsługują AMP lub którzy zrezygnowali z tego za pomocą ustawień swojego dostawcy poczty elektronicznej.

Uwaga: niektóre programy pocztowe[[1]](https://openradar.appspot.com/radar?id=6054696888303616) będą renderować tylko ostatnią część MIME, więc zalecamy umieszczenie części MIME `text/x-amp-html` _przed_ częścią MIME `text/html`.

### Semantyka odpowiadania / przesyłania dalej <a name="replyingforwarding-semantics"></a>

Program pocztowy usuwa część `text/x-amp-html` drzewa MIME, gdy użytkownik odpowiada na wiadomość e-mail AMP lub ją przesyła dalej.

### Wygaśnięcie <a name="expiry"></a>

Program pocztowy może przestać wyświetlać część AMP wiadomości e-mail po upływie określonego czasu, np. 30 dni. W takim przypadku wiadomości e-mail będą wyświetlać część `text/html` lub `text/plain`.

## Przykład <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
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
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->
