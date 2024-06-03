---
'$title': Var olan e-postalara AMP ekleme
$order: 1
author: CrystalOnScript
formats:
  - email
---

E-posta için AMP biçimi yeni bir MIME parçası olarak eklenir. E-postanız, E-posta için AMP'yi destekleyen bir sağlayıcıya gönderilirse, görüntülenir - gönderilmezse, endişelenmeyin! Sağlayıcı HTML veya düz metin yedeklemenizi görüntüler. E-postalarınıza AMP eklemek için bu kılavuzu kullanın.

# AMP MIME bölümünü ekleme

E-posta bir [MIME ağacı](https://en.wikipedia.org/wiki/MIME) yapısına sahiptir ve e-posta mesaj gövdesini ve e-posta ekini içerir. AMP'yi e-postalarınıza eklemek için `text/x-amp-html` içerik türüyle yeni bir MIME bölümü eklemeniz gerekir.

AMP MIME bölümü, `multipart/alternative` düğümünün altına yerleştirilmeli ve var olan `text/html` veya `text/plain` bölümleriyle birlikte varlığını sürdürmelidir. Böylece e-posta mesajları tüm istemcilerde işlenebilir.

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

[tip type="important"] Bazı e-posta istemcileri sadece son MIME bölümünü işleyebilirler. Bir e-postanın işlendiğinden emin olmak için, `text/x-amp-html` MIME bölümünü `text/html` MIME bölümünden _önce_ yerleştirin. [/tip]

# Alıcılar bir AMP E-postasını başkasına ilettiğinde veya yanıtladığında ne olur?

Bir kullanıcı bir AMP E-postasını yönlendirdiğinde veya yanıtladığında `text/x-amp-html` MIME ağacı bölümü kaldırılır. Bu nedenle, MIME türünü destekleyen istemcilere bile AMP e-postaları gönderirken HTML bölümünde alternatif içerik sunmak önemlidir.
