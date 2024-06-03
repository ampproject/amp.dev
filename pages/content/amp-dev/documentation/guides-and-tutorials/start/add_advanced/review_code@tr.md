---
'$title': Başlangıç kodunu gözden geçirme
$order: 1
description: 'Kod eklemeye başlamadan önce, aşağıdaki gibi olması gereken örnek article.amp.html sayfasını inceleyelim: ...'
---

Kod eklemeye başlamadan önce, aşağıdaki gibi olması gereken örnek [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) sayfasını inceleyelim:

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
        background: tomato;
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
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://example.com/my-article.html"
        },
        "headline": "My First AMP Article",
        "image": {
          "@type": "ImageObject",
          "url": "https://example.com/article_thumbnail1.jpg",
          "height": 800,
          "width": 800
        },
        "datePublished": "2015-02-05T08:00:00+08:00",
        "dateModified": "2015-02-05T09:20:00+08:00",
        "author": {
          "@type": "Person",
          "name": "John Doe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "⚡ AMP Times",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/amptimes_logo.jpg",
            "width": 600,
            "height": 60
          }
        },
        "description": "My first experience in an AMPlified world"
      }
    </script>
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

Bu, hem [AMP doğrulamasını](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) hem de [schema.org](http://schema.org/) yapılandırılmış veri doğrulamasını geçen basit bir AMP sayfasıdır. Bu sayfa bir haber web sitesinde dağıtılmışsa, kullanıcılar sayfayı Arama Motoru sonuç sayfalarındaki zengin deneyimler (ör. Google Arama'daki en çok okunan haberler döngüsü) aracılığıyla keşfedebilir.

## AMP Doğrulayıcısını Etkinleştirme

Sayfayı değiştirmeden önce, [AMP doğrulayıcıyı](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) etkinleştirelim, böylece geçerli AMP HTML ile çalıştığımızı biliyoruz. Bu parça tanımlayıcısını URL'nize **ekleyin**:

```text
#development=1
```

Örneğin:

```text
http://localhost:8000/article.amp.html#development=1
```

[Geliştirici Konsolunu](https://developer.chrome.com/devtools/docs/console) Chrome'da (veya tercih ettiğiniz tarayıcıda) açın ve AMP hataları olmadığından emin olun.

[tip] AMP sayfanızı doğrulamak için başka birkaç araç kullanabilirsiniz, örneğin:

- [Chrome için AMP Doğrulayıcı uzantısı](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [Opera için AMP Doğrulayıcı eklentisi](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [AMP Doğrulayıcı Web Arayüzü](https://validator.ampproject.org/)
- ... ve çok daha fazlası

[AMP sayfalarını doğrulama](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) kılavuzundan daha fazla bilgi edinin. [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Simulated on a Nexus 5X device') }}

## Mobil deneyimi simüle etme

Bu sayfayı bir mobil cihaz için tasarlıyoruz, bu yüzden tarayıcınızın geliştirici araçlarında mobil cihaz deneyimini **simüle edelim**. Örneğin, Chrome DevTools'ta cep telefonu simgesine tıklayın ve menüden bir mobil cihaz seçin.

Şimdi, sayfanın kendisi üzerinde çalışmaya başlayabiliriz. Sayfamıza bazı AMP bileşenleri ekleyelim.
