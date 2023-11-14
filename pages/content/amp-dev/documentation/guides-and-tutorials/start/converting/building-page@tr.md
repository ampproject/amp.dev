---
'$title': Normal bir HTML sayfası oluşturma
$order: 1
description: "Proje dizininde, article.html adlı bir dosya bulacaksınız. Bu, AMP'ye eşdeğer bir sayfa oluşturduğumuz..."
---

Proje dizininde, [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) adlı bir dosya bulacaksınız. Bu, AMP'ye eşdeğer bir sayfa oluşturduğumuz haber makalesidir.

1. <code>article.html</code> dosyasındaki kodun tamamını <strong>kopyalayın</strong> ve yeni bir dosyaya yapıştırın.
2. Yeni dosyayı <code>article.amp.html</code> olarak <strong>kaydedin</strong>.

[tip type="note"] **NOT -** AMP dosyalarınızı `.amp.html` olarak adlandırmanız gerekmez. Aslında, AMP dosyaları istediğiniz herhangi bir uzantıya sahip olabilir. Yayıncıların url'deki parametreleri kullanarak AMP sayfalarını standart sürümlerinden ayırdıklarına sıkça rastlanır. Örneğin: `http://publisher.com/article.html?amp`. [/tip]

`article.amp.html` dosyanız aşağıdaki gibi görünmelidir:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

Bu, aşağıdaki genel statik haber makalesi öğelerine sahip kasıtlı olarak basitleştirilmiş bir sayfadır: CSS, JavaScript ve bir resim etiketi.

Makalenin AMP versiyonu şu anda orijinal makalenin sadece bir kopyası. Onu bir AMP'ye çevirelim.

Başlangıç olarak AMP kütüphane dosyasını ekleyeceğiz. Bu tek başına yeni dosyanızı geçerli bir AMP sayfası yapmaz, ancak aşağıda AMP kütüphanesinin bunu düzeltmek için ne yapmamız gerektiğini anlamamıza nasıl yardımcı olabileceğini göreceğiz.

AMP kütüphanesini eklemek için `<head>` etiketinin altına bu satırı **ekleyin**:

```html
<script async src="https://ampjs.org/v0.js"></script>
```

Yeni <code>article.amp.html</code> sayfasını tarayıcınıza <a>http://localhost:8000/article.amp.html</a> adresinden <strong>yükleyin</strong> ve ardından Chrome'da (veya tercih ettiğiniz tarayıcıda) <a>Geliştirici Konsolunu</a> <strong>açın</strong>.

Geliştirici Konsolunda JavaScript çıktısını incelediğinizde (Konsol sekmesinin seçili olduğundan emin olun), şu kayıt günlüğü girişini görmelisiniz:

```text
Powered by AMP ⚡ HTML
```

AMP kütüphanesi, sayfanızın geçerli bir AMP belgesi olmasını engelleyen herhangi bir şey olup olmadığını size söyleyen bir [AMP doğrulayıcı](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) içerir. Bu parça tanımlayıcısını belge URL'nize ekleyerek AMP doğrulayıcıyı **etkinleştirin**:

```text
#development=1
```

Örneğin:

```text
http://localhost:8000/article.amp.html#development=1
```

Geliştirici Konsolunda birkaç doğrulama hatası almanız gerekir (bunları görmek için tarayıcınızda sayfayı manuel olarak yenilemeniz gerekebilir):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Bunu geçerli bir AMP belgesi haline getirmek için tüm bu hataları düzeltmemiz gerekecek - bu kod laboratuvarında yapacağımız şey tam olarak bu.

Bunu yapmadan önce, bir mobil haber makalesi üzerinde çalıştığımız için tarayıcının geliştirici araçlarında bir mobil cihaz deneyimini **simüle** edelim. Örneğin, Chrome DevTools'ta cep telefonu simgesini tıklayın ve menüden bir mobil cihaz seçin.

Tarayıcınızda aşağıdaki gibi bir simüle edilmiş mobil çözünürlük görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Artık işe koyulmaya hazırız! Doğrulama hatalarını tek tek inceleyelim ve bunların AMP ile nasıl ilişkili olduğunu ele alalım.
