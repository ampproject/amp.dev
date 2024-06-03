---
'$title': Karmaşık animasyonlara giriş
$order: 2
description: '"Sınıflar ekleyerek ve kaldırarak yönetilemeyen animasyonlar için AMP, animasyona özgü birkaç bileşen sunar. Bu bileşenler, AMP''nin ilkelerini animasyonlara uygular: bunlar hızlı, verimli ve kullanıcı önceliğidir."'
formats:
  - websites
  - ads
author: CrystalOnScript
---

[Sınıflar ekleyerek ve kaldırarak](triggering_css_animations.md) yönetilemeyen animasyonlar için AMP, animasyona özgü birkaç bileşen sunar. Bu bileşenler, AMP'nin ilkelerini animasyonlara uygular: bunlar hızlı, verimli ve kullanıcı önceliklidir. AMP, ana kareler içinde izin verilen CSS özelliklerine kısıtlama getirir, ancak ince ayar kontrolü, kusursuz animasyonlar ve fazladan çalışma gerektirmeden tarayıcılar arası uyumluluk gibi faydalar sağlar.

Oynatmayı sıkı bir şekilde kontrol etmeniz gerekiyorsa amp-animation kullanın ve aynı anda birden fazla öğe animasyonuyla doğru zamanlamaya sahip olun.

## Temel AMP animasyonu oluşturma

[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) bileşeni, AMP'de [Web Animation API](https://www.w3.org/TR/web-animations/)'sinin kullanılmasına izin verir.

Temel bir [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md), aşağıdaki önemli parçalardan oluşan bir JSON nesnesidir:

- Bileşenin animasyon uyguladığı öğe veya `selector`.
- [Timing Properties](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframes](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- [Trigger](/content/amp-dev/documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Seçici

CSS'ye çok benzer şekilde, [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) bileşeni, `"selector"` alanında öğenin etiket adını, sınıfını veya kimliğini bildirerek animasyon özelliklerini öğeye bağlar. Bileşen, bildirilen etiket türü veya sınıf adıyla her öğeyi canlandırır. Tek bir öğeyi canlandırdığınızdan emin olmak için bir kimlik kullanın.

### Zamanlama özelliği

[Zamanlama özelliği](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties), bir animasyonun ne kadar süreceğini, kaç kere oynatılacağını ve anahtar karenin hangi yönde yürütüleceğini kontrol eder.

Zamanlama özelliği gerekli değildir, ancak `duration` ve `fill` gibi zaman ve görüntü ile ilgili özellikler eksikse animasyon çalışmayabilir.

### Anahtar kareler

CSS, geçişler yoluyla bir durumdan diğerine geçiş yapmanıza izin verirken, [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) canlandırabilen GPU hızlandırmalı özelliklerle [hangi anahtar kare özelliklerinin kullanılabileceğini kısıtlar](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Bu, animasyonların AMP'ye ve tarayıcının [oluşturma sürecine](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) müdahale etmesini önler.

[tip type="note"] Anahtar kareler, doğrudan bir [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes) okuyun. [/tip]

### Tetikleyici

Tetikleyici animasyon sekansını başlatır. [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) eklentisi, `<body>` sayfada görünür hale geldiğinde veya onu bir [AMP eylemine veya olayına](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) bağlandığında başlar.

`<body>` görünürlüğünün tetiklenmesi, animasyonun "ekranın üst kısmında" görünmesi nedeniyle sayfa yüklenir yüklenmez veya sayfanın ilk görünüm alanında çalışması gerektiğinde kullanışlıdır. Animasyonlar, bileşene bir öznitelik olarak `trigger="visibility"` ekleyerek görünürlük yoluyla tetiklenir.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animasyon, [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) bileşenine bir `id` atayarak ve bu `id` bir düğmeye basmak gibi istenen olay tetikleyicisine bağlayarak bir eyleme veya olaya bağlanır.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Karmaşık animasyonlar oluşturma

[`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) içinde bir animasyon oluşturmak, bir animasyonu başlatmanın ve durdurmanın ötesine geçen ayrıntılı kontrole olanak tanır: Ayrıca belirli bir noktayı duraklatabilir, tersine çevirebilir ve yönlendirebilir. Hatta birden fazla animasyonu birbirine bağlayabilir ve bir sekanstaki öğeleri canlandırabilirsiniz.

### Alt hedefler

Aynı etiketin veya sınıfın öğeleri belirli zamanlama özelliklerine sahip olabilir ve üst düzey animasyonda tanımlanan değişkenlerin değerlerini geçersiz kılabilir.

[example preview="top-frame" playground="true" imports="amp-animation"]

```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### Zincirleme animasyonlar

Birden fazla animasyon, büyük bir sekans oluşturmak için birbirine bağlanabilir. [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) bileşeni içindeki `animations` dizisine animasyonlar yazarak, bir videodaki kaplamalar gibi zamanlanmış efektler oluşturabilirsiniz.

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Bu kurulum, her animasyonu bir sırayla 3 saniye boyunca oynatır.

Daha büyük animasyonlar için, `animations` dizisi içindeki animasyonlar diğer [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) bileşenlerine başvurabilir.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Bilinmeyen sayıda öğeyi canlandırma

[CSS eklentileriyle](/content/amp-dev/documentation/components/reference/amp-animation.md) kullanarak, herhangi bir sayıda öğeyle çalışan karmaşık ve zamanlanmış animasyonlar yazabilirsiniz. Bu, dinamik ve kullanıcı tarafından oluşturulan verilerin kolaylıkla ve akışkanlıkla canlandırılmasını sağlar.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
          {"transform": "translate3d(0px, 0px, 0px)"},
          {"transform": "translate3d(50%, 0px, 100px)"},
          {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
          {"transform": "translate3d(50%, 0px, -100px)"},
          {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example]

- Bir değişkeni `--duration` olarak bildirir ve iki saniyelik bir değer verir.
- `duration` değerini var `--duration` değerine ayarlar.
- `.card` seçicisine karşılık gelen her öğeye uygulanan gecikmeyi hesaplar.
  1. [`length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension>), kaç tane `.card` öğesinin seçildiğini hesaplar
  2. Uzunluk daha sonra her `.card`'in [index(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension>) çıkarır
  3. Elde edilen değer var `--duration` ile çarpılır
  4. Son toplam, bu öğenin gecikmesine saniyeler içinde uygulanır
- Animasyon, her bir öğeye ayrı ayrı uygulanır. Böylece kartlar aynı anda değil, birbiri ardına karıştırılır.

AMP oyun alanında animasyonu açın ve bu davranışı test etmek için daha fazla [`amp-img`](../../../../documentation/components/reference/amp-img) öğesi ekleyin.

### Her yerde harika görünme

Animasyonlar, özelleştirilmiş efektlere izin veren [`koşullar`](/content/amp-dev/documentation/components/reference/amp-animation.md#supports-condition) etkinleştirerek geriye dönük tarayıcı uyumluluğunu destekler.

[example preview="top-frame" playground="true"]

```html
<head>
  <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
</head>
<body>
  <amp-animation id="mediaAnimation" layout="nodisplay">
    <script type="application/json">
      {
        "duration": "1s",
        "iterations": "4",
        "fill": "both",
        "direction": "alternate",
        "animations": [
          {
            "media": "(min-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(50vw)"
            }
          },
          {
            "media": "(min-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-50vw)"
            }
          }
        ]
      }
    </script>
  </amp-animation>

  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```

[/example]
