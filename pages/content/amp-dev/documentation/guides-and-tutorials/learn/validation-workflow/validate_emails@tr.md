---
"$title": AMP E-postalarını Doğrulama
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP E-postaları, okuyucular için zengin etkileşimli ve dinamik deneyimler sağlamak için AMP JS kitaplığına dayanır. Bu nedenle, e-posta sağlayıcıları mesajlarınızın doğrulanmasını ister. Geçerli AMP işaretlemesi, e-postaların güvenli olduğunu ve kullanıcı deneyimi standartlarının ötesinde olduğunu garanti eder.

# E-postamın geçerli bir AMP olup olmadığını nasıl kontrol edebilirim?

Bir e-postayı geçerli bir AMP E-postası olarak doğrulamanın birkaç yolu vardır. Hepsi aynı sonucu üretir, bu nedenle geliştirme tarzınıza en uygun olanı seçin!

## Web tabanlı doğrulayıcı

AMP [web tabanlı doğrulayıcı](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) , E-posta için AMP platformunu destekler. AMP E-postanızı araca yapıştırarak web tabanlı doğrulayıcıyı kullanın. Doğrulayıcı hatalarını doğrudan satır içinde işaretleyecektir.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Komut satırı doğrulayıcısı

[AMP HTML doğrlayıcı komut satırı aracını](https://www.npmjs.com/package/amphtml-validator) kullanarak AMP E-postalarını doğrulayabilirsiniz.

### Kurulum

1. Sisteminizde ['npm' paket yöneticisine sahip Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) olduğundan emin olun.
2. Şu komutu çalıştırarak AMP HTML doğrulayıcı komut satırı aracını kurun: `npm install -g amphtml-validator`.

### Kullanım

Komut satırı aracını kurduğunuzda, `<amphtml file>` bölümünü AMP E-posta içeriğine sahip dosyanızla değiştirdikten sonra aşağıdaki komutu çalıştırın.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

E-posta geçerliyse, komut satırı aracı bir `PASS` sonucu verecektir. Geçersizse, bulduğu hatalarla geri dönüş yapacaktır.

## AMP playground

[AMP playground](https://playground.amp.dev/?runtime=amp4email) aracını kullanarak da AMP E-postalarını doğrulayabilirsiniz. Web tabanlı doğrulayıcıya benzer şekilde, AMP E-postanızı araca yapıştırın; playground, doğrulayıcı hatalarını doğrudan satır içinde işaretleyecektir.

### Teslim edilen e-postaları doğrulama

Bazen, yazdığınız e-posta işaretlemesi bu sayfada açıklanan araçlarla zaten doğrulanmış olsa bile, teslim edilen AMP E-postalarınız geçersiz olabilir. Bunun olmasının en yaygın nedeni, [ESP'nizin](https://amp.dev/support/faq/email-support/) e-posta işaretlemenizi değiştirmesi ve e-postanızı teslimat için ESP'nize gönderdikten sonra onu geçersiz kılmasıdır. Örneğin, ESP'niz SparkPost ise ve HTTPS izleme piksellerini SparkPost ile yapılandırmadıysanız, SparkPost, e-postanıza güvenli olmayan bir HTTP izleme pikseli ekleyecektir. AMP E-postaları yalnızca HTTPS resimlerine izin verdiğinden, bu durum, AMP E-postanızı geçersiz kılacaktır.

Gelen kutunuza teslim edilen bir e-postanın geçerli AMP olup olmadığını kontrol etmek için:

1. e-posta istemcinizden [AMP E-postasını `.eml` dosyası olarak indirin](https://www.codetwo.com/kb/export-email-to-file).
2. [AMP playground](https://playground.amp.dev/?runtime=amp4email) aracını açın.
3. "IMPORT EMAIL" seçeneğine tıklayın ve indirdiğiniz `.eml` dosyasını seçin.

Oyun alanı, indirdiğiniz AMP e-postasını satır içi düzenleyiciye aktaracak ve tüm doğrulama hatalarını işaretleyecektir.

# E-postam geçerli değilse ne olur?

AMP Doğrulayıcı yalnızca geliştirme sırasında kolaylık sağlayan bir araç değildir, AMP E-postalarını destekleyen e-posta sağlayıcıları, sağlanan HTML veya Düz Metin MIME türlerine otomatik olarak geri dönecektir. Bir AMP E-postası yalnızca doğrulayıcıdan geçer not alırsa gönderilmelidir.
