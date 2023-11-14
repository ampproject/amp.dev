---
'$title': Başlangıç kodunu tanıma
$order: 1
description: AMP sayfası, güvenilir performans için bazı kısıtlamalara sahip bir HTML sayfasıdır. AMP sayfaları, onu bir AMP sayfası olarak tanımlayan biraz özel işaretlemelere sahiptir.
---

## AMP standart metni

AMP sayfası, güvenilir performans için bazı kısıtlamalara sahip bir HTML sayfasıdır. AMP sayfaları, onu bir AMP sayfası olarak tanımlayan biraz özel işaretlemelere sahiptir.

Basit bir AMP sayfası şuna benzer:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
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
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] AMP sayfanız için temel bir iskeleti hızlı bir şekilde kurmak için [standart metin oluşturucuyu](https://amp.dev/boilerplate) kullanabilirsiniz. Ayrıca bir PWA ve daha fazlasını oluşturmak için yapılandırılmış veriler için parçacıklar sağlar! [/tip]

## AMP bileşenleri

Öğreticinin başlangıç kodu ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) sayfa içeriğiyle (resimler, metin vb.) ve birkaç AMP bileşeniyle iskelet AMP sayfasını oluşturur:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://ampjs.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://ampjs.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://ampjs.org/v0/amp-selector-0.1.js"
></script>
```

AMP bileşenleri, AMP sayfalarına zengin etkileşim katan ek işlevler ve UI bileşenleri sunar. Başlangıç kodu aşağıdaki AMP bileşenlerini kullanır:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): Ürünün birden çok görünümünü gösteren bir resim döngüsü.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): amp-form sunucu yanıtlarını oluşturmak için bir şablon sistemi.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): AMP sayfaları için gerekli olan `<form>` öğeleri için özel işlevsellik ekler.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): Bir grup öğenin bir veya daha fazla öğesini seçmenin anlamsal bir yolunu sunar. amp-form için bir giriş kaynağı olarak kullanılabilir.

## Temel etkileşim

Başlangıç kodu bazı temel etkileşimler sunar:

- Resim döngüsü ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) ürünün birden çok görünümünü gösterir.
- Ürün, sayfanın altındaki "Sepete ekle" düğmesine dokunularak kullanıcının sepetine ([`amp-form`](../../../../documentation/components/reference/amp-form.md) aracılığıyla) eklenebilir.

**Deneyin**: Resim döngüsünü kaydırın ve "Sepete ekle" düğmesine dokunun.
