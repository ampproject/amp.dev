---
'$title': Структура и рендеринг AMP-писем
$order: 2
formats:
  - email
teaser:
  text: 'Сообщение электронной почты имеет структуру '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-structure.md.
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

Сообщение электронной почты имеет структуру [MIME-дерева](https://en.wikipedia.org/wiki/MIME), которое содержит тело сообщения и все вложения письма.

Чтобы встроить AMP-контент в электронное письмо, добавьте новый MIME-блок с типом контента `text/x-amp-html` в качестве потомка `multipart/alternative`. Он должен находиться рядом с существующими блоками `text/html` или `text/plain`. Это действие позволит обеспечить отображение письма на всех клиентах.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/master/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP for Email MIME Parts Diagram" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Дополнительную информацию о подтипе `multipart/alternative` см. в [RFC 1521, раздел 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Дополнительная информация <a name="additional-information"></a>

Блок `text/x-amp-html` должен быть вложен в узел `multipart/alternative`. В электронном письме не может быть более одного блока `text/x-amp-html` внутри узла `multipart/alternative`.

Помимо `text/x-amp-html`, в узле `multipart/alternative` должен быть хотя бы один не-AMP узел (`text/plain` или `text/html`). Он будет показан тем пользователям, чьи почтовые клиенты не поддерживают AMP или которые отключили отображение AMP в настройках своего почтового провайдера.

Примечание. Некоторые почтовые клиенты [[1]](https://openradar.appspot.com/radar?id=6054696888303616) отображают только последний MIME-блок, поэтому мы рекомендуем размещать MIME-блок `text/x-amp-html` _перед_ MIME-блоком `text/html`.

### Особенности операций ответа и пересылки <a name="replyingforwarding-semantics"></a>

Когда пользователь отвечает на AMP-письмо или пересылает его, почтовый клиент удаляет блок `text/x-amp-html` из дерева MIME.

### Ограничение срока действия <a name="expiry"></a>

Почтовый клиент может перестать отображать AMP-блок электронного письма по истечении заданного периода времени, например 30 дней. В этом случае при просмотре электронного письма будет показан блок `text/html` или `text/plain`.

## Пример <a name="example"></a>

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
  <script async src="https://cdn.ampproject.org/v0.js"></script>
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
