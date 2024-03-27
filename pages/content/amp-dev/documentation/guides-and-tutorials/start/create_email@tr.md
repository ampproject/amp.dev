---
'$title': İlk AMP e-postanızı oluşturun
$order: 0
description: İlk e-postanızı oluşturarak AMP e-postalarının neyin farklı kıldığını öğrenin.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

E-posta için AMP, e-posta gönderenlerin bir dizi yeni özelliği desteklemek için e-posta mesajlarında AMP kullanmasına izin verir. AMP ile yazılan e-postalar, resim döngüleri veya akordeonları gibi etkileşimli öğeler içerebilir, içerik mesajda güncel kalır ve alıcıların gelen kutularını terk etmeden bir forma yanıt vermek gibi eylemler gerçekleştirme yeteneği olabilir.

E-posta için AMP mevcut e-postalarla uyumludur. Mesajın AMP sürümü, HTML ve düz metne ek olarak, tüm e-posta istemcilerinde uyumluluk sağlayan yeni bir MIME parçası olarak e-postaya gömülür.

İpucu: E-posta için AMP'yi destekleyen e-posta platformlarının (ESP'ler), istemcilerin ve sağlayıcıların listesi için SSS bölümündeki [Desteklenen E-posta Platformlarına](../../../support/faq/email-support.md) göz atın.

AMP tarafından desteklenen ilk dinamik e-postanızı oluşturmak ve göndermek için bu öğreticiyi izleyin. Bitmiş kodu [buradan](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73) görüntüleyebilirsiniz.

# AMP e-posta standart metniyle başlayın

AMP playground, E-posta için AMP biçimini destekler ve AMP e-postalarınızı geliştirmenize, test etmenize ve doğrulamanıza olanak tanır. [AMP Playground](https://playground.amp.dev/?runtime=amp4email)'u açın ve sol üst köşesindeki biçimin `AMP for Email` olarak ayarlandığından emin olun. Aşağıdaki kodu görmelisiniz:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Bu, geçerli bir AMP e-postası olmak için gerekli tüm işaretlemeyi ve minimum kodu içerir. Ayrıca, sağ üst açılır menüdeki açılır listede yer alan diğer birçok geçerli e-posta şablonu örneğine de dikkat edin.

Klasik HTML e-postalarından bazı önemli farklılıkları aramak için bir dakikanızı ayıralım:

- AMP e-postaları, html etiketine `⚡4email` veya `amp4email` ekleyerek kendilerini bu şekilde tanımlamalıdır.
- `<head>` etiketi, AMP çalışma zamanını yükleyen bir `<script>` etiketi de içermelidir. `<script async src="https://ampjs.org/v0.js"></script>`
- Başlangıçta içeriği AMP yüklenene kadar gizlemek için bir CSS standart metni. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Daha önce e-postalarla çalıştıysanız, bir e-postaya bir komut dosyası yerleştirme fikri kafanızdaki alarm zillerini tetikleyebilir! Emin olun, AMP e-postalarını destekleyen e-posta sağlayıcıları, yalnızca doğrulanmış AMP komut dosyalarının istemcilerinde çalışmasına izin veren şiddetli güvenlik kontrolleri uygular. Bu, dinamik ve etkileşimli özelliklerin doğrudan alıcıların posta kutularında herhangi bir güvenlik açığı olmadan çalışmasına izin verir! AMP e-postaları için gerekli biçimlendirme hakkında daha fazla bilgi için buraya bakın.

[tip type="important"] AMP e-postalarına yalnızca [desteklenen bileşenler](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) için AMP komut dosyaları eklenebilir. [/tip]

# Bir resim ekleyin

E-postalarda kullanılan HTML etiketlerinin çoğu AMP e-postalarında kullanılabilir. Bununla birlikte, `<img>` etiketi gibi bazı etiketler, AMP eşdeğeri [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md) ile değiştirilir.

`<amp-img>` etiketi, görüntünün genişliğinin ve yüksekliğinin tanımlanmasını gerektirir. `<img>`'den farklı olarak `<amp-img>`, <code></amp-img></code> ile açıkça kapatılmalıdır.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Ayrıca, GIF dosyaları [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md) aracılığıyla desteklenir.

E-postalar sunucunuzda barındırılmadığından, URL'ler AMP e-postalarında mutlak yollar kullanmalı ve HTTPS olmalıdır.

[Placekitten](https://placekitten.com/), yavru kedi görüntülerini yer tutucu olarak kullanan bir web sitesidir. Bir görüntünün boyutunu doğrudan URL'de seçmenize izin veriyorlar!

Aşağıdaki kodu ekleyerek ilk e-postamıza bir resim ekleyebiliriz.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Duyarlı hale getirin

E-postalar, çeşitli cihazlarda ve ekran boyutlarında görüntülenir ve AMP yerleşik bir düzen sistemi ile birlikte gelir! [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) sistemi ve medya sorguları ile duyarlı e-postaların uygulanması kolaydır. Yerleştirilen yavru kedi resmimizi uygun ekranlara boyutlandırmak için `<amp-image>`'e `layout="responsive"` özniteliğini ekleyin.

[tip type="read-on"] [AMP'nin yerleşim ve medya sorgularıyla nasıl çalıştığı hakkında daha fazla bilgi edinin](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Görüntüyü yeniden boyutlandırmak için tarayıcı penceresini büyütün ve küçültün! [Desteklenen yerleşime özgü bileşenlerin listesini buradan](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout) görüntüleyin.

# Sunum ve yerleşimi değiştirin

Bir görüntü iyidir, peki ya daha fazlasını görüntülemek istersek? E-posta için AMP, akordiyonlar ve kenar çubukları gibi yerleşim öğelerini destekler.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

Bu eğitimde, sahiplendirmek üzere kedilerin fotoğraflarını görüntülemek için [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) kullanacağız.

E-postanızın başına `amp-carousel` komut dosyasını ekleyin.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Ardından ilk görüntümüzü `<amp-carousel>` etiketlerine yerleştirin.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Hiçbir şeyin değişmediğini fark edebilirsiniz ve bu iyi bir şeydir! Resim döngüsüne, `type=slides` özniteliği verildi, bu da bir seferde bir fotoğraf göstereceği anlamına geliyor. Etiketlere sadece bir fotoğraf yerleştirdiğimizden, kullanıcıya kaydırıcı oklar sunulmaz.

Ardından, yerleştirilen kedi yavrusu görüntüsünü, `<amp-carousel>` içinde sahiplendirmek için AMP kedilerinizle değiştirin.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Artık resim döngüsünün sol veya sağ tarafındaki gezinme oklarını tıklayarak fotoğrafları değiştirebilmelisiniz!

## Stil ile gönderin

AMP, belgenin başlığına `<style amp-custom>` etiketi içinde stil oluşturmanıza olanak tanır. Ayrıca, daha önce yasaklanmış CSS sınıfları ve sözde sınıflar artık kullanılabilir. [Buradan tam listeyi okuyun](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

`Hello, AMP4EMAIL world` öğesini gerçek bir başlıkla güncelleyelim.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Ve sonra başa biraz stil ekleyin.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Dinamik Yetenekler Ekleyin

Klasik olarak, e-postalar yalnızca durağan içeriğe izin verir. AMP sayesinde, e-postalar tamamen yeni bir olasılık dünyasına açılıyor! Kullanıcılar artık [formlara](/content/amp-dev/documentation/components/reference/amp-form.md) yanıt verebilir, [içeriği dinamik olarak listeleyebilir](/content/amp-dev/documentation/components/reference/amp-list.md) ve içerikle etkileşime girebilir.

Bu eğitimde, kullanıcı o kedinin slaytında olduğunda, sahiplendirilebilir kedimizin adını ve açıklamasını görüntülemek için [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) kullanacağız. `amp-bind` komut dosyasını e-postanızın başına ekleyerek başlayın.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Ardından, bir [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) etiketi içinde bir JSON dizesi olarak bir "myState" AMP bind değişkenini tanımlayacağız. Dört kedi fotoğrafımız olduğu için, dördü için de durum ekleyeceğiz.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[AMP eylemleri ve olayları](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) farklı durumları tetikler. Bizim durumumuzda, kullanıcı resim döngüsündeki gezinti oklarına tıkladığında durumu güncellemek istiyoruz. amp-carousel, `AMP.setState` kullanarak `currentCat` değişkenini güncelleyeceğimiz bir [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) olayını tetikler.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Bu kod, `currentCat` durumunu, resim döngüsü dizinindeki kedi fotoğrafıyla eşleşecek şekilde ayarlar. Dolayısıyla, `event.index=2` slaytındaysak, durum dizinin 2. dizinindeki öğeyle eşleşecektir.

Geriye kalan tek şey kedimizin adını ve açıklamalarını göstermektir. Kapanış `amp-carousel` etiketinin altına aşağıdaki kodu ekleyin.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

`amp-bind` eklentisi, içeriği dinamik olarak değiştirmek için [ifadeler](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) ve [bağlamalar](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) kullanır. Yukarıdaki kod örneği, `"myState.cats[currentCat].name"` ifadesini değerlendirerek durumu her değiştirdiğinizde `<span>` etiketindeki metni güncellemek için `[text]` bağlamasını kullanır.

[tip type="note"] Performans için ve beklenmedik içerik atlama riskini önlemek için, amp-bind sayfa yükündeki ifadeleri değerlendirmez. Bu, görsel öğelere varsayılan bir durum verilmesi ve ilk işleme için amp-bind güvenmemesi gerektiği anlamına gelir. [/tip]

`</div>` etiketinden sonra kedi açıklamalarımızı eklemeyi unutmayın!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Artık resim döngüsü, kedi fotoğrafını değiştirdiğinizde, isimleri ve açıklamaları da güncellenmelidir!

# AMP e-postanızı gönderin

E-postanızı gelen kutunuza nasıl göndereceğinizi öğrenmek için [AMP e-postalarını test etme hakkında daha fazla bilgi edinin](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Tebrikler! İlk AMP e-postanızı gönderdiniz!

Sonraki adımlar için, [e-posta temelleri için AMP hakkında daha fazla bilgi edinin](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
