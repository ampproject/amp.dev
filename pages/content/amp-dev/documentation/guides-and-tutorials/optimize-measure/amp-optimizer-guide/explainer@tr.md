---
'$title': AMP Optimizer nasıl çalışır?
$order: 1
description: 'AMP Optimizer, girdi olarak geçerli bir AMPHTML belgesini alır ve "elle" yapılması zahmetli olacak ek optimizasyonları uygulayarak onu optimize edilmiş bir sürüme dönüştürür. Bu kılavuz, AMP Optimizer''ın nasıl çalıştığını ayrıntılı olarak açıklıyor.'
formats:
  - websites
  - stories
author: sebastianbenz
---

Bir AMP Optimizer, girdi olarak geçerli bir AMPHTML belgesini alır ve "elle" yapılması zahmetli olacak ek optimizasyonları uygulayarak onu optimize edilmiş bir sürüme dönüştürür. Sonuçta ortaya çıkan "**dönüştürülmüş AMP**" öğesini şu `dönüştürülmüş` öznitelik aracılığıyla `html` öğesinde tanıyabilirsiniz:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self">
```

Not: AMP önbellekleri farklı bir dönüştürülmüş bayrak kullanır; örneğin, Google AMP önbellekleri `transformed=google;v=1` ekler.

AMP Optimizer'lar, bir AMP belgesinde sunucu tarafı oluşturma düzenlerinden görüntü optimizasyonuna kadar çeşitli optimizasyonlar gerçekleştirir. Burada, bir AMP sayfası ile optimize edilmiş sürümü arasındaki farkları gösteren bir örnek yer alıyor ([daha büyük bir sürüm için tıklayın](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Bu kılavuzun geri kalanında, bu optimizasyonları daha ayrıntılı olarak tanıtacağız.

### Sunucu tarafında AMP Yerleşimlerini oluşturma

Sunucu tarafında AMP yerleşimlerini oluşturma, AMP sayfanızın yükleme performansını iyileştirmek için en büyük potansiyele sahiptir. İçerik atlamalarını önlemek için AMP, web sitelerinin başlığa [AMP standart metnini](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) eklemesini gerektirir. AMP standart metni, sayfa gövdesinin opaklığını 0'a ayarlayarak sayfa içeriğini gizler. AMP yüklendikten sonra sayfanın yerleşimini hesaplayabilir. Bundan sonra AMP, gövdenin opaklığını 1'e ayarlar ve sayfa içeriğini görünür hale getirir. Ne yazık ki, bu yaklaşımın sayfayı oluşturmadan önce AMP çerçevesini indirmesi gerekir.

Bunu iyileştirmek için, `responsive` veya `fixed-height` yerleşimi gibi AMP yerleşimleri, sayfayı kullanıcı aracısına sunmadan önce sunucu tarafında oluşturulabilir. Bu şekilde, bir yandan sayfa yükleme sırasında [içerik kaymalarından](https://web.dev/cls/) kaçınırken AMP standart metnini kaldırmak mümkün hale gelir.

Sunucu tarafında oluşturma şu üç şeyi yapar:

⁣ ** 1. AMP standart metnini kaldırır: **AMP yerleşimini kullanan her öğe için yerleşime özel biçimlendirme enjekte edilir.

⁣** 2. Satır içi AMP'ye dahil CSS stilleri: **AMP standart metni, [AMP çalışma zamanı CSS stilleri](https://cdn.ampproject.org/v0.css) ile değiştirilir: `<style amp-runtime>...</style>`. Sunucu tarafında oluşturulmamış belgeler için, AMP bu stilleri çalışma zamanında ekler. Ancak, sunucu tarafında oluşturulan AMP sayfaları, AMP yerleşimlerinin AMP yüklenmeden önce çalışması için bunları gerekli kılar. Olası sürüm çakışmalarını önlemek için, çalışma zamanında AMP, i-amphtml-version="011905222334000" içinde belirtilen sürümün mevcut AMP sürümünden farklı olup olmadığını kontrol edecek ve değilse CSS'yi en son sürümle güncelleyecektir.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣ ** 3. Sunucu tarafında oluşturulan AMP yerleşimleri: **AMP yerleşimi kullanan her öğe için yerleşime özgü boyutlandırma öğeleri enjekte edilir.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Uyarı: AMP standart metni her zaman kaldırılamaz. `i-amphtml-no-boilerplate` özniteliğinin `html` öğesinde mevcut olup olmadığını kontrol ederek standart metnin kaldırılıp kaldırılmadığını öğrenebilirsiniz. Örneğin, `amp-experiment` bileşeni, çalışma zamanında sayfa içeriğini değiştirir. İçerik kaymalarından kaçınmak için, bir sayfada `amp-experiment` kullanılıyorsa, AMP standart metin kodunun mevcut olması gerekir.

### Hero Görüntü Optimizasyonu

AMP Optimizer, ilk görüntü alanında görüntüleri oluşturmak için gereken süreyi önemli ölçüde iyileştirebilir. Bu, [Hayati Ana Web Değerlerini](https://web.dev/lcp/) karşılamak [LCP zamanlarını](https://web.dev/vitals) optimize ederken son derece önemlidir.

AMP'de, hero görüntüleri, bir `amp-img` bileşenine `data-hero` özniteliği eklenerek açıkça belirtilebilir.

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

AMP Optimizer'ları, diğer kritik kaynakların bant genişliğini engellemekten kaçınmak için bir sayfada en fazla iki hero görüntüsünü destekler. Bu sınır sizin için uygun değilse, [lütfen bize bildirin](https://github.com/ampproject/amp-toolbox/issues).

AMP Optimizer'ları ayrıca `amp-img`, `amp-iframe` , `amp-video` veya `amp-video-iframe` öğeleri için hero görüntülerini otomatik olarak algılar ve görüntü `src` alanı için `link rel=preload` parçasını otomatik olarak enjekte eder. Otomatik algılama, ilk görünüm alanındaki büyük görüntüleri algılamak için HTML biçimlendirmesini ve görüntü yerleşimlerini analiz ederek çalışır.

`amp-img` olduğunda, AMP Optimizer'lar, `img` etiketini `amp-img` içinde sunucu tarafında da oluşturur. Bu işlem, tarayıcının görüntüyü AMP çalışma zamanı gerekmeden hemen oluşturmasını sağlar.

### Görüntü Optimizasyonu

AMP Optimizer'lar, AMP Yerleşimine özgü `srcset` öznitelikleri oluşturarak optimize edilmiş duyarlı görüntüler sunmanıza yardımcı olabilir. Örneğin, aşağıdaki `amp-img` bildirimi:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

aşağıdaki `srcset` tanımıyla geliştirilmiştir:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Bunun çalışması için, derleme/barındırma ortamınızın görüntüleri yeniden boyutlandırmayı/optimize etmeyi desteklemesi gerekir. Görüntü optimizasyonunun en iyi şekilde nasıl entegre edileceğine dair tek tek optimizer kılavuzlarına göz atın.

### AMP Modül Derlemesi (Yakında)

AMP Çalışma Zamanının daha küçük bir sürümü ve kullanıcıların bir AMP sayfasını görüntülerken daha az JavaScript indirmesini gerektiren [JavaScript Modüllerine](https://v8.dev/features/modules#browser) dayalı bileşenler mevcuttur. AMP Optimizer'lar, AMP Modülü derlemesini varsayılan olarak etkinleştirmek için aşağıdaki dönüşümü yaparlar:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

aşağıdaki hale dönüştürülür:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

`type="module"` öğesini anlayan tarayıcılar, `nomodule` özniteliğine sahip betikleri yok sayar. Bu, modern tarayıcılara sahip kullanıcıların daha küçük çalışma zamanı paketlerinden yararlanacağı, eski tarayıcılardaki kullanıcıların ise AMP çalışma zamanının modül olmayan sürümüne geri döneceği anlamına gelir.

Not: AMP Modül Derlemesi, AMP Çalışma Zamanı CSS'sinin satır içine alınmasını gerektirdiğinden yalnızca dönüştürülmüş AMP için kullanılabilir.
