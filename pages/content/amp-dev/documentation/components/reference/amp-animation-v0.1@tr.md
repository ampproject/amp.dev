---
$title: amp-animation
$category@: presentation
teaser:
  text: Bir animasyon tanımlar ve görüntüler.
---


<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Animasyonları tanımlar ve çalıştırır.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>



## Genel Bakış <a name="overview"></a>

AMP Animasyonları, AMP dokümanlarındaki animasyonları tanımlamak ve çalıştırmak için [Web Animasyonları API'sini](https://www.w3.org/TR/web-animations/) kullanır.

## Biçim <a name="format"></a>

Bir `amp-animation` öğesi, böyle bir animasyonu JSON yapısı olarak tanımlar.

### Üst düzey animasyon spesifikasyonu <a name="top-level-animation-specification"></a>

Üst düzey nesne, bir `animations` dizisi olarak tanımlanmış rastgele sayıda animasyon bileşeninden oluşan genel animasyon sürecini tanımlar:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### DOM'da yerleşim <a name="placement-in-dom"></a>

`<amp-animation>` öğesinin, `<body>` öğesinin doğrudan alt öğesi olarak yerleştirilmesine yalnızca `trigger="visibility"` değeri kullanılırsa izin verilir. `trigger` belirtilmediyse ve animasyonun oynatılması, işlemleri aracılığıyla programlı olarak kontrol ediliyorsa DOM'da herhangi bir yere yerleştirilebilir.

### Animasyon bileşeni <a name="animation-component"></a>

Her animasyon bileşeni bir [animasyon karesi efektidir](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) ve şunlardan oluşur:

- Bir seçicinin başvurduğu hedef öğeler
- Koşullar: medya sorgusu ve destek koşulu
- Zamanlama özellikleri
- Animasyon kareleri

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Koşullar <a name="conditions"></a>

Koşullar, bu animasyon bileşeninin nihai animasyona dahil edilip edilmeyeceğini belirtebilir.

#### Medya sorgusu <a name="media-query"></a>

Medya sorgusu, `media` özelliği kullanılarak belirtilebilir. Bu özellik, [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API'si için izin verilen herhangi bir ifadeyi içerebilir ve `@media` CSS kuralına karşılık gelir.

Bir animasyon bileşeni için değer belirtilirse animasyon bileşeni, yalnızca medya sorgusunun geçerli ortamla eşleşmesi durumunda dahil edilir.

#### Destek koşulu <a name="supports-condition"></a>

Destek koşulu, `supports` özelliği kullanılarak belirtilebilir. Bu özellik, [CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) API'si için izin verilen herhangi bir ifadeyi içerebilir ve `@supports` CSS kuralına karşılık gelir.

Bir animasyon bileşeni için değer belirtilirse animasyon bileşeni, yalnızca destek koşulunun geçerli ortamla eşleşmesi durumunda dahil edilir.

### Animasyon `switch` deyimi <a name="animation-switch-statement"></a>

Bazı durumlarda, birden çok [koşullu animasyonu](#conditions) isteğe bağlı bir varsayılan değerle tek bir animasyonda birleştirmek kullanışlı olur. Bu işlem, `switch` animasyon deyiminin şu biçimde kullanılmasıyla yapılabilir:

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

`switch` animasyonunda, adaylar tanımlanan sırada değerlendirilir ve [koşullu deyimlerle](#conditions) eşleşen ilk animasyon yürütülür ve geri kalanlar yoksayılır.

Örneğin, bu animasyon, destekleniyorsa hareket yolu animasyonunu çalıştırır ve dönüştürmeyi devreye alır:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Değişkenler <a name="variables"></a>

Bir animasyon bileşeni, zamanlama ve animasyon karelerinin değerleri için kullanılacak CSS değişkenlerini `var()` ifadeleriyle bildirebilir. `var()` ifadeleri, geçerli hedef bağlamı kullanılarak değerlendirilir. Animasyon bileşenlerinde belirtilen CSS değişkenleri, iç içe yerleştirilmiş animasyonlara yayılır, animasyon hedeflerine uygulanır ve böylece, nihai animasyonlarda kullanılan CSS değişkenlerini geçersiz kılar.

Örneğin:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

Bu örnekte:

- `--delay`, iç içe yerleştirilmiş animasyonlara yayılır ve `#target1` animasyonunun gecikmesi olarak kullanılır.
- `--x`, iç içe yerleştirilmiş animasyonlara yayılır ancak `#target1` animasyonu tarafından geçersiz kılınır ve daha sonra, `transform` özelliği için kullanılır.
- `--y`, `<amp-animation>` öğesinin herhangi bir yerinde belirtilmez ve bu nedenle, `#target1` öğesinde sorgulanır. CSS'de de tanımlanmamışsa varsayılan olarak `0px` değerine ayarlanır.

`var()` hakkında daha fazla bilgi için [`var()` ve `calc()` bölümüne](#var-and-calc-expressions) bakın.

### Zamanlama özellikleri <a name="timing-properties"></a>

Üst düzey animasyon ve animasyon bileşenleri, zamanlama özellikleri içerebilir. Bu özellikler, Web Animasyonu spesifikasyonunun [AnimasyonEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) bölümünde ayrıntılı olarak tanımlanmıştır. Burada izin verilen özellik grubu şunları içerir:

<table>
  <tr>
    <th class="col-twenty">Mülk</th>
    <th class="col-twenty">Tür</th>
    <th class="col-twenty">Varsayılan</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>saat</td>
    <td>0</td>
    <td>Animasyon süresi. Milisaniye cinsinden bir sayısal değer veya bir CSS zaman değeri (ör. `2s`).</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>saat</td>
    <td>0</td>
    <td>Animasyonun yürütülmeye başlanmasından önceki gecikme. Milisaniye cinsinden bir sayısal değer veya bir CSS zaman değeri (ör. `2s`).</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>saat</td>
    <td>0</td>
    <td>Animasyonun tamamlanmasından sonraki ve gerçekte tamamlanmış olarak kabul edilmesinden önceki gecikme. Milisaniye cinsinden bir sayısal değer veya bir CSS zaman değeri (ör. `2s`).</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>sayı veya<br>"Infinity" ya da<br>"infinite"</td>
    <td>1</td>
    <td>Animasyon efektinin tekrarlanma sayısı.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>sayı/CSS</td>
    <td>0</td>
    <td>Efektin animasyona başladığı zaman farkı.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>dize</td>
    <td>"linear"</td>
    <td>Yumuşak geçiş efektleri oluşturmak üzere zamanı ölçeklendirmek için kullanılan <a href="https://www.w3.org/TR/web-animations/#timing-function">zamanlama işlevi</a>.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>dize</td>
    <td>"normal" </td>
    <td>"normal", "reverse", "alternate" veya "alternate-reverse" değerlerinden biri.</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>dize</td>
    <td>"none"</td>
    <td>"none", "forwards", "backwards", "both", "auto" değerlerinden biri.</td>
  </tr>
</table>

Tüm zamanlama özellikleri, bir doğrudan sayısal değere/dize değerine veya CSS değerlerine izin verir. Örneğin, "duration" değeri `1000` veya `1s` ya da `1000ms` şeklinde belirtilebilir. Buna ek olarak, `calc()` ve `var()` ile diğer CSS ifadelerine de izin verilir.

JSON'daki zamanlama özelliklerine bir örnek:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

Animasyon bileşenleri, üst düzey animasyon için belirtilen zamanlama özelliklerini devralır.

### Alt hedefler <a name="subtargets"></a>

`selector` öğesinin belirtilebileceği her yerde, `subtargets: []` değerinin belirtilmesi de mümkündür. Alt hedefler, bir dizin veya CSS seçici aracılığıyla belirtilen belirli alt hedefler için animasyonda tanımlanan zamanlama özelliklerini veya değişkenleri geçersiz kılabilir.

Örneğin:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

Bu örnekte, varsayılan olarak ".target" ile eşleşen tüm hedefler 100 ms gecikmeli ve 100 pikselin "--y" değerindedir. Bununla birlikte, ilk hedef (`index: 0`) 200 ms gecikmeli ve tek hedefler, 200 piksel "--y" değerine sahip olacak şekilde geçersiz kılınır.

Birden çok alt hedefin bir hedef öğeyle eşleşebileceğine dikkat edin.

### Animasyon kareleri <a name="keyframes"></a>

Animasyon kareleri, Web Animasyonları spesifikasyonunun [animasyon kareleri bölümünde](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) açıklanan çeşitli şekillerde veya CSS'de `@keyframes` adına bir dize yönlendirmesi olarak belirtilebilir.

Animasyon karesi tanımlarının bazı tipik örnekleri aşağıda gösterilmektedir.

Kısayol nesnesi biçimi "to" biçimi %100'deki son durumu belirtir:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

Kısayol nesnesi biçimi "from-to" biçimi %0 ve 100'deki başlangıç ve son durumları belirtir:
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

Kısayol nesnesi biçimi "value-array" biçimi, başlangıç, son durumlar ve birden çok (eşit aralıklı) ofseti belirtir:
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

Dizi biçimi, animasyon karelerini belirtilir. Ofsetler %0 ve 100 konumlarına otomatik olarak atanır ve eşit aralıklıdır:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Dizi biçimi, "offset" özelliğini açık bir şekilde de içerebilir:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

Dizi biçimi "easing" öğesini de içerebilir:
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Ek animasyon karesi biçimleri için [Web Animasyonları spesifikasyonuna](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) bakın.

Özellik değerleri, aralarında `calc()`, `var()` ve diğer CSS ifadelerinin de bulunduğu geçerli CSS değerlerine izin verir.

#### CSS'den animasyon kareleri <a name="keyframes-from-css"></a>

Animasyon karelerini belirtmenin bir başka yolu, bunları dokümanın stil sayfasında (`<style>` etiketi) `@keyframes` CSS kuralı olarak belirtmektir. Örneğin:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

CSS `@keyframes`, [Web Animasyonları spesifikasyonu](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) uyarınca çoğunlukla animasyon karelerini JSON'da satır içine yerleştirmeye eşdeğerdir. Bununla birlikte, bazı küçük farklar söz konusudur:

- Geniş platform desteği için `@-ms-keyframes {}` veya `-moz-transform` gibi tedarikçi firma önekleri gerekebilir. Tedarikçi firma öneklerine gerek yoktur ve JSON biçiminde bunlara izin verilmez ancak CSS'de gerekli olabilir.
- Animasyon kareleri CSS'de belirtildiğinde, `calc()` ve `var()` yöntemlerini desteklemeyen platformlar, `amp-animation` çoklu dolgularından yararlanamaz. Dolayısıyla, yedek değerlerin her zaman CSS'ye eklenmesi tavsiye edilir.
- [`width()`, `height()`, `num()`, `rand()`, `index()` ve `length()`](#css-extensions) gibi CSS uzantıları CSS'de kullanılamaz.

#### Animasyon kareleri için beyaz listedeki özellikler <a name="allow-listed-properties-for-keyframes"></a>

Tüm CSS özellikleri animasyon karelerinde kullanılamaz. Yalnızca modern tarayıcıların optimize edip hızlı bir şekilde canlandırabildiği CSS özellikleri beyaz listeye eklenir. İyi performans sağladığı onaylanan özelliklerin sayısı arttıkça bu liste de genişleyecektir. Şu anda liste şu özellikleri içermektedir:
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

Tedarikçi firma önekli CSS özelliklerinin kullanılmasına gerek olmadığına veya bunlara izin verilmediğine dikkat edin.

### Animasyon yapılandırmasının kısaltılmış biçimleri <a name="abbreviated-forms-of-animation-configuration"></a>

Animasyon yalnızca tek bir öğe içeriyorsa ve tek bir animasyon karesi efekti yeterliyse yapılandırma, yalnızca bu bir animasyon bileşenine indirgenebilir. Örneğin:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Animasyon bir bileşen listesinden oluşuyorsa ancak üst düzey animasyona sahip değilse yapılandırma, bir bileşen dizisine indirgenebilir. Örneğin:
  ```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": 1000,
      "keyframes": {"opacity": 1}
    },
    {
      "selector": ".target-class",
      "duration": 600,
      "delay": 400,
      "keyframes": {"transform": "scale(2)"}
    }
  ]
  </script>
  </amp-animation>
```

### Animasyon düzeni <a name="animation-composition"></a>

Animasyonlar, diğer animasyonlara başvuruda bulunabilir ve böylece, çeşitli `amp-animation` bildirimleri tek bir nihai animasyonda birleştirebilir. Animasyona başka bir animasyondan başvurmak iç içe yerleştirmeyle büyük ölçüde aynıdır. Bir kişinin animasyonları farklı öğelere bölmek istemesinin nedeni, aynı animasyonu çeşitli yerlerden yeniden kullanmak veya her animasyon bildirimini daha küçük ve daha yönetilebilir yapmaktır.

Örneğin:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Bu örnek animasyon, "anim2" animasyonu, "anim1" animasyonunun bir parçası olarak birleştirir. "anim2", bir hedef (`selector`) olmadan eklenir. Böyle bir durumda, eklenen animasyonun kendi hedefine başvurması beklenir.

Başka bir biçim, hedefi veya birden çok hedefi sağlamak için animasyonun eklenmesine olanak tanır. Bu durumda, eklenen animasyon her eşleşen hedef için yürütülür. Örneğin:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Burada, ".target-class" parametresi bir veya birden fazla öğeyle eşleşirse ya da hiçbir öğeyle eşleşmezse "anim2", eşleşen her bir hedef için yürütülür.

Çağrıyı yapan animasyonunda belirtilen değişkenler ve zamanlama özellikleri de eklenen animasyona geçirilir.

### `var()` ve `calc()` ifadeleri <a name="var-and-calc-expressions"></a>

`amp-animation`, zamanlama ve animasyon karesi değerleri için `var()` ve `calc()` ifadelerinin kullanılmasına izin verir.

Örneğin:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

`var()` ve `calc()` ifadelerine, kendilerini doğrudan desteklemeyen platformlarda çoklu dolgu yapılır. `var()` özellikleri, karşılık gelen hedef öğelerinden ayıklanır. Ancak, `var()` ifadesinin tam olarak çoklu doldurabilmesi mümkün değildir. Bu nedenle, uyumluluğun önemli olduğu yerlerde, `var()` ifadelerine varsayılan değerlerin eklenmesi önemle tavsiye edilir. Örneğin:
  ```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": "4s",
      "delay": "var(--delay, 100ms)"
    }
  ]
  </script>
  </amp-animation>
```

Animasyon bileşenleri kendi değişkenlerini `--var-name` alanları olarak belirtebilir. Bu değişkenler, iç içe yerleştirilmiş animasyonlara yayılır ve stil sayfası (`<style>` etiketi) aracılığıyla belirtilen hedef öğelerin değişkenlerini geçersiz kılar. `var()` ifadeleri, önce animasyonlarda belirtilenleri ve ardından, hedef stilleri sorgulayarak değişken değerlerini çözümlemeye çalışır.

### CSS uzantıları <a name="css-extensions"></a>

`amp-animation`, tipik animasyon gereksinimleri için çeşitli CSS uzantıları sağlar: `rand()`, `num()`, `width()` ve `height()`. Bu işlevler, zamanlama ve animasyon karesi değerleri dahil olmak üzere CSS değerlerinin `amp-animation` içinde kullanılabildiği her yerde kullanılabilir.

#### CSS `index()` uzantısı <a name="css-index-extension"></a>

`index()` işlevi, animasyon efektindeki geçerli hedef öğesinin bir dizinini döndürür. Bu en çok birden fazla hedefin `selector` özelliği kullanılarak aynı efektle canlandırıldığı durumlarla alakalıdır. Seçici tarafından eşleştirilen ilk hedef dizin `0` , ikincisi dizin `1` değerine sahip olur ve diğer hedeflerin değerleri bu düzende devam eder.

Diğer özelliklerin yanı sıra, bu özellik `calc()` ifadeleriyle birleştirilebilir ve kademeli efekt oluşturmak için kullanılabilir. Örneğin:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### CSS `length()` uzantısı <a name="css-length-extension"></a>

`length()` işlevi, animasyon efektindeki hedef öğe sayısını döndürür. Bu uzantı, en çok `index()` ile birleştirildiği durumlarla alakalıdır:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### CSS `rand()` uzantısı <a name="css-rand-extension"></a>

`rand()` işlevi rastgele bir CSS değeri döndürür. İki biçimi vardır.

Bağımsız değişken kullanılmayan biçim 0 ile 1 arasındaki rastgele bir sayı döndürür.
```
{
  "delay": "calc(10s * rand())"
  }
```

İkinci biçim iki bağımsız değişken içerir ve bu iki bağımsız değişken arasındaki rastgele değeri döndürür.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### CSS `width()` ve `height()` uzantıları <a name="css-width-and-height-extensions"></a>

`width()` ve `height()` uzantıları, animasyonlu öğenin veya seçici tarafından belirtilen öğenin genişliğini/yüksekliğini döndürür. Döndürülen değer piksel cinsindendir (ör. `100px`).

Şu biçimler desteklenir:
- `width()` ve `height()` - canlandırılan öğenin genişliği/yüksekliği.
- `width('.selector')` ve `height('.selector')` - seçici tarafından belirtilen öğenin genişliği/yüksekliği. Herhangi bir CSS seçici kullanılabilir. Örneğin, `width('#container &gt; li')`.
- `width(closest('.selector'))` ve `height(closest('.selector'))` - en yakın seçici tarafından belirtilen öğenin genişliği/yüksekliği.

`width()` ve `height()`, özellikle dönüşümler için yararlıdır. Animasyonları kapsayıcı boyutuyla orantılı olarak ifade etmek için `%` değerleri kullanabilen `left`, `top` ve benzer CSS özellikleri. Bununla birlikte, `transform` özelliği, `%` değerlerini farklı bir şekilde, seçilen öğenin bir yüzdesi olarak yorumlar. Bu nedenle, dönüşüm animasyonlarını kapsayıcı öğeler ve benzerleri açısından ifade etmek için `width()` ve `height()` kullanılabilir.

Bu işlevler `calc()`, `var()` ve diğer CSS ifadeleriyle birleştirilebilir. Örneğin:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### CSS `num()` uzantısı <a name="css-num-extension"></a>

`num()` işlevi, bir CSS değeri için sayı gösterimini döndürür. Örneğin:

- `num(11px)`, `11` sonucunu verir;
- `num(110ms)`, `110` sonucunu verir;
- vb.

Örneğin, aşağıdaki ifade gecikmeyi, öğenin genişliği ile orantılı olarak saniye cinsinden hesaplar:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### SVG animasyonları <a name="svg-animations"></a>

SVG'ler harikadır ve bunların animasyonlar için kullanılmasını kesinlikle öneririz!

SVG animasyonları, bazı küçük farklarla [Animasyon kareleri için beyaz listedeki özellikler](#allow-listed-properties-for-keyframes) bölümünde açıklanan CSS özellikleri aracılığıyla desteklenir:

* IE/Edge SVG öğeleri [CSS `transform` özelliklerini desteklemez](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). `Transform` animasyonunun kendisi çok dolguludur. Bununla birlikte, bir stil sayfasında tanımlanan başlangıç durumu uygulanmaz. İlk dönüştürülmüş durum IE/Edge için önemliyse [SVG `transform` özelliği](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform) aracılığıyla yinelenmesi önerilir.
* `transform` CSS'sine IE/Edge için çoklu dolgu yapılırken, ne yazık ki `transform-origin` için çoklu dolgu yapmak mümkün değildir. Dolayısıyla, IE/Edge ile uyumluluk istendiğinde, yalnızca varsayılan `transform-origin` öğesinin kullanılması önerilir.
* Tarayıcıların çoğu, şu anda `transform-origin` CSS'sini doğru şekilde yorumlama konusunda sorun yaşamaktadır. [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) ve [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340) ile ilgili sorunlara bakın. Bu karışıklığın büyük bir kısmı, [CSS `transform-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box) uygulandığında çözülür. `transform-origin` öğesinin önemli olduğu durumlarda, gelecekte uyumlu olması için istenen `transform-box` CSS'sinin de eklenmesi önerilir.

## Animasyonu tetikleme <a name="triggering-animation"></a>

Animasyon, bir `trigger` özelliği veya bir `on` işlemi aracılığıyla tetiklenebilir.

### `trigger` özelliği <a name="trigger-attribute"></a>

Şu anda, `trigger` özelliği için kullanılabilen tek değer `visibility` değeridir. `visibility`, temel doküman veya yerleştirme (görüntü alanında) görünür olduğunda tetiklenir.

Örneğin:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### `on` işlemi aracılığıyla tetikleme <a name="triggering-via-on-action"></a>

Örneğin:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## `on` işlemleri <a name="on-actions"></a>

`amp-animation` öğesi aşağıdaki işlemleri dışa aktarır:

* `start` - Halihazırda çalıştırılmamışsa animasyonu başlatır. Zamanlama özellikleri ve değişkenleri, işlem bağımsız değişkenleri olarak belirtilebilir. Ör. `anim1.start(delay=-100, --scale=2)`.
* `restart` - Animasyonu başlatır veya şu anda çalıştırılan animasyonu yeniden başlatır. Zamanlama özellikleri ve değişkenleri, işlem bağımsız değişkenleri olarak belirtilebilir. Ör. `anim1.start(delay=-100, --scale=2)`.
* `pause` - Şu anda çalıştırılan animasyonu duraklatır.
* `resume` - Şu anda çalıştırılan animasyonu devam ettirir.
* `togglePause` - Duraklat/devam ettir işlemleri arasından geçiş gerçekleştirir.
* `seekTo` - Animasyonu duraklatır ve `time` bağımsız değişkeni tarafından milisaniye cinsinden veya `percent` bağımsız değişkeni tarafından zaman çizelgesinde bir yüzde noktası olarak belirtilen belirli bir noktayı arar.
* `reverse` - Animasyonu tersine çevirir.
* `finish` - Animasyonu bitirir.
* `cancel` - Animasyonu iptal eder.
