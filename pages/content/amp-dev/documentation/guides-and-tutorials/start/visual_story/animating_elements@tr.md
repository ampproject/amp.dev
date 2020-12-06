---
"$title": Öğeleri canlandırma
"$order": '6'
description: Bir sayfadaki öğelere animasyon girişleri uygulayarak bir Web Hikayesini daha da geliştirebilirsiniz. Örneğin, başlığınızın...
components:
- anim
author: bpaduch
---

Bir sayfadaki öğelere animasyon girişleri uygulayarak bir Web Hikayesini daha da geliştirebilirsiniz. Örneğin, başlığınızın soldan içeri girmesini sayfaya düşmesini ya da belirmesini vb. sağlayabilirsiniz. AMP hikaye çerçevesi, bir Web Hikayesinde kullanılmak üzere aşağıdaki önceden ayarlanmış animasyonları sağlar:

<table>
<thead><tr>
  <th width="50%">Animasyon ön ayarı</th>
  <th width="25%">Varsayılan süre (msn)</th>
  <th width="25%">Varsayılan gecikme (msn)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Bir öğeye animasyon girişi uygulamak için animasyon ön ayar değerlerinden biriyle <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> özniteliğini ayarlamalısınız. Örneğin, sayfaya bir metnin düşmesini sağlamak için metin öğesine `animate-in="drop"` özniteliğini ekleyin:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Hikaye sayfalarınızdaki öğelere `animate-in="<animation preset>"` özniteliğini ekleyerek farklı animasyon efektlerini keşfedin. [/tip]

## Animasyon zamanlaması

Her animasyon ön ayarının aşağıdakiler için kurulu bir varsayılan zaman değeri vardır:

- **gecikme**: Animasyonun başlamasını geciktirmek için geçen süredir. Örneğin, 0,3 saniye gecikme, animasyonun sayfaya 0,3 saniye sonra gireceği anlamına gelir. 0 saniyelik bir gecikme animasyonu hemen başlatır.
- **süre** : Animasyonun gerçekleştiği süredir. Örneğin, baştan sona belirme animasyonu 500 ms sürer.

`animate-in-delay` ve `animate-in-duration` öznitelikleri aracılığıyla gecikmeyi veya süreyi değiştirerek bir animasyonun zamanlamasını özelleştirebilirsiniz. Aşağıdaki örnekte, `my-element`, sayfanın solundan 0,3 saniye sonra uçararak girer ve 0,5 saniye boyunca uçuşu tamamen gerçekleştirir:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Son sayfamızı canlandırma

Son Web Hikayesi sayfamız iki katmandan oluşur: ilk katman, hayvan resimlerinden oluşan bir kolaj ve ikinci katman bazı başlık metinlerini görüntüler. Bu sayfayı oluşturmak için, aşağıdaki kodu önceki hikaye sayfanızın hemen sonrasına **ekleyin**:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Tarayıcınızda AMP hikayesini yeniden yükleyin ve sayfanın doğru şekilde oluşturulduğunu ve şuna benzediğini doğrulayın:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Harika görünüyor ama her şey statik! Haydi canlandıralım!

Banner metninin girişini canlandırarak başlayacağız ve sayfanın sağından "çığlık atacağız". `animate-in="whoosh-in-right"` öğesini `<p>` öğesine şu şekilde ekleyin:

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Hikaye sayfanızı tarayıcınıza yeniden yükleyin ve başlığın hızla içeri girebildiğini doğrulayın.

Şimdi tüm resimlerin belirmesini sağlayalım. Her bir [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğesine `animate-in="fade-in"` özniteliği ekleyin ve kodun şöyle görünmesini sağlayın:

```html
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

Sayfayı yeniler ve yeniden yüklerseniz, görsellerin her biri belirerek gelir. Bu harika, ancak etkiyi zar zor fark edebilirsiniz çünkü tüm görüntüler aynı anda belirir! Bu animasyonların zamanlamasını değiştirerek görsel efekti iyileştirebiliriz.

İlk resmin girişini geciktirelim, böylelikle metin başlığı girişini tamamladığında yaklaşsın, 0,4 saniye diyelim. Kalan üç görüntü, önceki görüntünün girişinden 0,2 saniye sonra gelebilir. [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğelerinin her biri için, uygun süre gecikmesi değeriyle `animate-in-delay=""` özniteliğini ekleyin. Kodunuz şöyle görünmelidir:

```html
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>
```

Hikayenizi yenileyin ve yeniden yükleyin. Son sayfanız şöyle görünmelidir:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Web Hikayelerinde animasyonlarla ilgili birçok olasılık vardır (örneğin, animasyonları birleştirmek, animasyonları zincirlemek gibi) ve bu öğretici sadece yüzeyde gezinmektedir. Animasyonlar hakkında daha fazla bilgi edinmek için [`amp-story`](../../../../documentation/components/reference/amp-story.md) referans belgelerine bakın.
