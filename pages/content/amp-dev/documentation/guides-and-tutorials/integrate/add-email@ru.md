---
'$title': Добавление AMP в существующие письма
$order: 1
author: CrystalOnScript
formats:
  - email
---

Формат AMP для писем встраивается в виде нового MIME-блока. Если ваше письмо отправляется провайдеру, который поддерживает AMP для писем, оно будет отображено — а если нет, не беспокойтесь! Провайдер отобразит ваш резервный вариант (HTML или простой текст). Используйте это руководство, чтобы включить технологию AMP в свои электронные письма.

# Добавление MIME-блока AMP

Электронная почта структурирована в виде [дерева MIME](https://en.wikipedia.org/wiki/MIME), которое содержит тело сообщения электронной почты и все его вложения. Чтобы включить поддержку AMP в свои электронные письма, вам необходимо добавить новый MIME-блок с типом содержимого `text/x-amp-html`.

MIME-блок AMP должен быть вложен в узел `multipart/alternative` и располагаться рядом с существующими блоками `text/html` или `text/plain`. Это гарантирует, что письмо будет отображаться во всех клиентах.

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

[tip type="important"] Некоторые почтовые клиенты отображают только последний MIME-блок. Чтобы гарантировать рендеринг письма, поместите MIME-блок `text/x-amp-html` _перед_ MIME-блоком `text/html`. [/tip]

# Что происходит, когда получатели пересылают AMP-письма или отвечают на них?

Когда пользователь пересылает AMP-письмо или отвечает на него, блок `text/x-amp-html` удаляется из дерева MIME. Вот почему важно включать альтернативное содержимое в HTML-блоке — даже при отправке AMP-писем клиентам, которые поддерживают MIME-тип AMP.
