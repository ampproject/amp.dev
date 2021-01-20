---
"$title": AMP e-postalarının yapısı ve oluşturulması
order: '2'
formats:
- email
teaser:
  text: 'E-posta bir '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md.
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

E-posta bir MIME ağacı olarak yapılandırılmıştır. Bu MIME ağacı, mesaj gövdesini ve e-postaya ekleri içerir.

AMP'yi bir e-postaya yerleştirmek için, `multipart/alternative` alt öğesi olarak `text/x-amp-html` içerik türüne sahip yeni bir MIME bölümü ekleyin. Mevcut `text/html` veya `text/plain` bölümlerin yanında yaşamalıdır. Bu, e-posta mesajının tüm istemcilerde çalışmasını sağlar.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/master/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="E-posta için AMP MIME Parça Şeması" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

`multipart/alternative` alt türü hakkında daha fazla bilgi için bkz: [RFC 1521, bölüm 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Ek bilgi <a name="additional-information"></a>

`text/x-amp-html` kısmı `multipart/alternative` bir düğüm altında iç içe geçmiş olmalıdır. Bir e-posta, `multipart/alternative` bir düğüm içinde birden fazla `text/x-amp-html` parçasına sahip olamaz.

`multipart/alternative`, `text/x-amp-html` düğümüne ek olarak en az bir AMP (`text/plain` veya `text/html`) düğümü içermelidir. Bu, e-posta istemcileri AMP'yi desteklemeyen veya e-posta sağlayıcısının ayarları aracılığıyla devre dışı bırakan kullanıcılara gösterilecektir.

Not: Bazı e-posta istemcileri [[1]](https://openradar.appspot.com/radar?id=6054696888303616) yalnızca son MIME bölümünü oluşturacaktır, bu nedenle `text/x-amp-html` MIME bölümünü `text/html` MIME bölümünden *önce* yerleştirmenizi öneririz.

### Yanıtlama/yönlendirme semantiği <a name="replyingforwarding-semantics"></a>

E-posta istemcisi, bir kullanıcı AMP e-posta mesajını yanıtladığında veya ilettiğinde MIME ağacının `text/x-amp-html` bölümünü çıkarır.

### Sona erme <a name="expiry"></a>

E-posta istemcisi, bir e-postanın AMP bölümünü belirli bir süre sonra, örneğin 30 gün sonra görüntülemeyi durdurabilir. Bu durumda, e-postalar `text/html` veya `text/plain` kısmı gösterecektir.

## Örnek <a name="example"></a>

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
