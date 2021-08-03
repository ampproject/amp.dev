---
'$title': Doğrulama hatalarını çözme
$order: 2
description: Bu bölümde, AMP sayfamızdaki AMP doğrulama hatalarını inceleyip çözeceğiz. Konsolunuzda hataların farklı bir sırada görünebileceğini unutmayın.
---

Bu bölümde, AMP sayfamızdaki AMP doğrulama hatalarını inceleyip çözeceğiz. Konsolunuzda hataların farklı bir sırada görünebileceğini unutmayın.

## Karakter kümesi ekleme

Aşağıdaki hatayı düzelterek başlayacağız:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Metni doğru şekilde görüntülemek için AMP, sayfanın karakter kümesini belirtmenizi gerekli kılar. Meta karakter kümesi bilgisi ayrıca `<head>` etiketinin ilk alt öğesi olmalıdır. Bu etiketin ilk olmasının nedeni, meta karakter kümesi etiketinden önce eklenen içeriği yeniden yorumlamaktan kaçınmaktır.

Aşağıdaki kodu `<head>` etiketinin ilk satırı olarak <strong>ekleyin</strong>:

```html
<meta charset="utf-8" />
```

Dosyayı **kaydedin** ve sayfayı yeniden yükleyin. Karakter kümesi hatasının artık görünmediğini doğrulayın.

## Standart bağlantıyı ekleme

Şimdi şu hataya bakalım:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Her AMP belgesinin, o belgenin "standart" sürümüne referans veren bir bağlantıya sahip olması gerekir. Bu öğreticinin [Sayfanızı keşfedilebilir hale getirme](discoverable.md) adımında, standart sayfaların ne olduğu ve standart bağlantıya farklı yaklaşımlar hakkında daha fazla bilgi edineceğiz.

Bu öğretici için, standart sayfa olarak dönüştürdüğümüz orijinal HTML makalesini ele alacağız.

Devam edin ve aşağıdaki kodu <code><meta charset="utf-8" /></code> etiketinin altına <strong>ekleyin</strong>:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] Bağımsız bir standart AMP sayfası oluşturabilirsiniz. Standart bağlantı yine de gereklidir, ancak AMP makalesinin kendisine referans vermelidir:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Şimdi sayfayı **yeniden yükleyin**. Hala düzeltilmesi gereken çok sayıda hata olmasına rağmen, standart bağlantı hatası artık mevcut değil.

## AMP özniteliğini belirtme

AMP, sayfayı AMP belgesi olarak bildirmek için sayfanın kök `<html>` öğesinde bir öznitelik gerektirir.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Yukarıdaki hatalar basitçe `⚡` özniteliğini `<html>` etiketine şu şekilde ekleyerek çözülebilir:

```html
<html ⚡ lang="en"></html>
```

Şimdi devam edin, sayfayı yeniden yükleyin ve her iki hatanın da giderilip giderilmediğini kontrol edin.

[tip type="note"] `⚡` değerini belirtmek önerilen yaklaşım olsa da, aşağıdaki gibi `⚡` özniteliği yerine `amp` özniteliğini kullanmak da mümkündür:

```html
<html amp lang="en"></html>
```

[/tip]

## Görüntü alanı belirtme

Şimdi aşağıdaki hatayı ele alalım:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

AMP, görüntü alanı için bir `width` ve `minimum-scale` tanımlanmasını gerektirir. Bu değerler sırasıyla `device-width` ve `1` olarak tanımlanmalıdır. Görüntü alanı, bir HTML sayfasının `<head>` kısmında bulunan ortak bir etikettir.

Görüntü alanı hatasını çözmek için aşağıdaki HTML parçacığını `<head>` etiketine ekleyin:

```html
<meta name="viewport" content="width=device-width" />
```

`width` ve `minimum-scale` için belirtilen değerler, AMP'de gerekli değerlerdir. `initial-scale` tanımlamak zorunlu değildir, ancak genellikle mobil web geliştirmeye dahil edilir ve önerilir. [Görüntü Alanı Yapılandırma bölümünde](https://developers.google.com/speed/docs/insights/ConfigureViewport) , görüntü alanı ve duyarlı tasarım hakkında daha fazla bilgi edinebilirsiniz.

Daha önce olduğu gibi, sayfayı **yeniden yükleyin** ve hatanın kaybolup kaybolmadığını kontrol edin.

## Harici stil sayfalarını değiştirme

Aşağıdaki hata, stil sayfası kullanımımızla ilgilidir:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

Özel olarak, bu hata `<head>` etiketimizde bulunan aşağıdaki stil sayfası bağlantı etiketiyle ilgili şikayettir:

```html
<link href="base.css" rel="stylesheet" />
```

Sorun, bunun harici bir stil sayfası referansı olmasıdır. AMP'de, belgelerin yükleme sürelerini olabildiğince hızlı tutmak için harici stil sayfaları eklenmesine izin verilmez. Bunun yerine, tüm stil sayfası kuralları `<style amp-custom></style>` etiketleri kullanılarak veya satır içi stiller olarak AMP belgesine yerleştirilmelidir.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Öyleyse, hatayı çözelim:

1. `<head>` içindeki stil sayfasına referans veren `<link>` etiketini <strong>kaldırın</strong> ve bunu satır içi bir `<style amp-custom></style>` etiketiyle değiştirin. Stil etiketindeki `amp-custom` özelliği zorunludur.
2. <a><code>base.css</code></a> dosyasındaki tüm stilleri `<style amp-custom></style>` etiketlerine <strong>kopyalayın</strong>.

Bir kez daha, sayfayı **yeniden yükleyin** ve stil sayfaları hatasının kaybolup kaybolmadığını doğrulayın.

[tip type="note"] **NOT -** Hem gömülü stil zorunludur, hem de tüm stil bilgileri için 50 kilobaytlık bir dosya boyutu sınırı vardır. AMP sayfalarınızda CSS'yi satır içine almadan önce CSS'nizi küçültmek için [SASS](http://sass-lang.com/) gibi CSS ön işlemcileri kullanmalısınız. [/tip]

[tip type="important"] **ÖNEMLİ -** AMP belgenizin tamamında yalnızca bir stil etiketiniz olabilir. AMP sayfalarınız tarafından referans verilen birkaç harici stil sayfanız varsa, bu stil sayfalarını tek bir kural kümesi halinde harmanlamanız gerekir. AMP'de hangi CSS kurallarının geçerli olduğunu öğrenmek için [Desteklenen CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) bölümünü okuyun. [/tip]

## Üçüncü taraf JavaScript'i kaldırma

Stil sayfaları, CSS'yi satır içine alarak AMP ile nispeten kolay bir şekilde yeniden çalışılabilirken, aynısı JavaScript için geçerli değildir.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

Genel olarak, AMP'deki betikler yalnızca iki ana gereksinimi karşıladıklarında kullanılmalarına izin verilir:

1. Tüm JavaScript eşzamansız olmalıdır (yani, betik etiketine `async` özniteliği dahil).
2. JavaScript, AMP kütüphanesi ve sayfadaki tüm AMP bileşenleri içindir.

Bu, aşağıda belirtilenler dışında, AMP'de tüm kullanıcı tarafından oluşturulan/üçüncü taraf JavaScript kullanımını etkili bir şekilde ortadan kaldırır.

[tip type="note"] Kullanıcı tarafından oluşturulan/üçüncü taraf betiklerle ilgili kısıtlamanın yegane istisnaları şunlardır:

1. Sayfaya meta veriler ekleyen veya AMP bileşenlerini yapılandıran betikler. Bunlar, `application/ld+json` veya `application/json` tür özniteliğine sahip olacaktır.
2. iframe'lere dahil edilmiş betik. JavaScript'in bir iframe'e dahil edilmesi, son çare olarak değerlendirilmelidir. Mümkün olan her yerde, JavaScript işlevselliği [AMP bileşenleri](../../../../documentation/components/index.html) kullanılarak değiştirilmelidir. Bir sonraki bölümde ilk AMP bileşenimizi inceleyeceğiz. [/tip]

Harici [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) dosyasını açmayı deneyin. Ne görüyorsunuz? Dosya, herhangi bir JavaScript kodu içermemeli ve yalnızca aşağıdaki gibi bir bilgi açıklamasını içermelidir:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Bu harici JavaScript dosyasının web sitemizin işlevsel bir bileşeni olmadığını düşünürsek, referansı tamamen güvenle kaldırabiliriz.

Aşağıdaki harici JavaScript referansını belgenizden **kaldırın** :

```html
<script type="text/javascript" src="base.js"></script>
```

Şimdi sayfayı **yeniden yükleyin** ve betik hatasının kaybolduğunu doğrulayın.

## AMP CSS standart metnini ekleme

Aşağıdaki hatalar, eksik standart metin koduna işaret eder:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Her AMP belgesi aşağıdaki AMP standart metin kodunu gerektirir:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

Belgenizin `<head>` etiketinin altına standart metin kodunu **ekleyin**.

`<style amp-boilerplate>` etiketi, başlangıçta AMP JavaScript kütüphanesi yüklenene kadar gövde içeriğini gizler, ardından içerik oluşturulur. AMP bunu, Biçimlendirilmemiş İçeriğin Görünümü (Flash Of Unstyled Content, FOUC) olarak da bilinen, stilize edilmemiş içeriğin oluşturulmasını önlemek için yapar. Bu, sayfanın içeriği bir kerede göründüğünden ve ekranın üst kısmındaki her şey birlikte oluşturulduğundan, kullanıcı deneyiminin gerçekten anındaymış gibi hissettirilmesine yardımcı olur. Tarayıcıda JavaScript devre dışı bırakılmışsa, ikinci etiket bu mantığı geri alır.

## `<img>` yerine `<amp-img>` koyma

AMP, medyayı görüntülemeye yönelik varsayılan HTML karşılıklarını desteklemez, bu da aşağıdaki hatayı açıklar:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

AMP, `<img>` etiketinin yerini alacak şekilde özel olarak tasarlanmış bir web bileşenine sahiptir, bu etiket, [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) etiketidir:

```html
<amp-img src="mountains.jpg"></amp-img>
```

`<img>` etiketini yukarıdaki [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) etiketiyle **değiştirin** ve yine doğrulayıcıyı çalıştırın. Birkaç yeni hata almanız gerekir:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

[`amp-img`](../../../../documentation/components/reference/amp-img.md) neden başka bir hatayı tetikledi? Çünkü [`amp-img`](../../../../documentation/components/reference/amp-img.md) , geleneksel HTML img etiketinin doğrudan yerine geçmez. [`amp-img`](../../../../documentation/components/reference/amp-img.md) kullanırken ek gereksinimler vardır.

### AMP yerleşim sistemi

Yerleşim hatası bize [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketinin `container` yerleşim türünü desteklemediğini söylüyor. AMP'nin tasarımındaki en önemli kavramlardan biri, web sayfalarını oluşturmak için gereken DOM yeniden akış miktarını azaltmaya odaklanmasıdır.

DOM yeniden akışını azaltmak için AMP, sayfanın yerleşiminin sayfanın indirilmesi ve oluşturulması yaşam döngüsünde olabildiğince erken bilinmesini sağlamak için bir yerleşim sistemi içerir.

Aşağıdaki resim, bir HTML sayfasının genellikle nasıl düzenlendiğini AMP'nin uyguladığı yaklaşıma kıyasla karşılaştırmaktadır. Soldaki yaklaşımda, bir reklam veya resim her yüklendiğinde metnin nasıl yeniden aktığına dikkat edin. AMP'nin yerleşim yaklaşımı, resimlerin ve reklamların yüklenmesi uzun sürse bile metnin hareket etmesini engeller.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

AMP yerleşim sistemi, bir sayfadaki öğelerin sabit boyutlar, duyarlı tasarım ve sabit yükseklik gibi çeşitli şekillerde konumlandırılmasına ve ölçeklendirilmesine olanak tanır.

Makalemizde, yerleşim sistemi [`amp-img`](../../../../documentation/components/reference/amp-img.md) için yerleşim türünü `container` türü olarak çıkardı. Ancak, `container` türü yalnızca alt öğeler içeren öğeler için geçerlidir. `container` türü, bu hatanın nedeni olan [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketiyle uyumlu değildir.

Neden `container` türü çıkarımı yapıldı? Çünkü <a><code>amp-img</code></a> etiketi için bir `height` özelliği belirtmedik. HTML'de yeniden akış, bir sayfadaki öğeler için her zaman sabit bir genişlik ve yükseklik belirtilerek azaltılabilir. AMP'de, AMP'nin öğenin en boy oranını önceden belirleyebilmesi için [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğelerinin genişliğini ve yüksekliğini tanımlamanız gerekir.

`width` ve `height` öğelerini [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketinize **ekleyin**:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Sayfayı yenileyin ve doğrulayıcıyı kontrol edin; artık herhangi bir hata görmemelisiniz!

Artık geçerli bir AMP belgeniz var, ancak sayfada garip bir şekilde konumlandırıldığı için resim o kadar harika görünmüyor. Varsayılan olarak, bir [`amp-img`](../../../../documentation/components/reference/amp-img.md) için yüksekliği ve genişliği belirttiğinizde AMP, boyutları belirttiğiniz şekilde sabitler; ancak AMP, ekran boyutu ne olursa olsun sayfayı _duyarlı bir şekilde_ uzatsa ve sayfaya sığacak şekilde ölçeklendirse harika olmaz mıydı?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Neyse ki AMP, belirlediğiniz genişlik ve yükseklikten öğelerin en boy oranını belirleyebilir. Bu, AMP düzen sisteminin öğeyi çeşitli şekillerde konumlandırmasına ve ölçeklendirmesine olanak tanır. `layout` özniteliği, öğenin nasıl konumlandırılmasını ve ölçeklendirilmesini istediğinize dair AMP'ye bilgi verir.

Görselimizin ölçeklenmesi ve yeniden boyutlandırılması için yerleşim özniteliğini <code>responsive</code> olarak <strong>ayarlayalım</strong>:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Voila! Resmimiz doğru en boy oranında ve ekran genişliğini duyarlı bir şekilde doldurur.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **OKUMAYA DEVAM EDİN -** [AMP Yerleşim Teknik Özelliklerinde](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) AMP Yerleşim Sistemi hakkında daha fazla bilgi edinin. [/tip]

## Başarılı!

Artık AMP belgeniz şunun gibi görünmelidir:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Sayfayı yenileyin ve konsol çıktısına bakın. Aşağıdaki mesajla karşılanmalısınız:

<pre class="success-text">AMP validation successful.</pre>

### Sıkça Sorulan Sorular

- [DOM yeniden akışı nedir?](http://stackoverflow.com/a/27637245)
- [Yerleşim özniteliği tanımlanmamışsa ne olur?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Genişlik ve yükseklik tanımlanmamışsa ne olur?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
