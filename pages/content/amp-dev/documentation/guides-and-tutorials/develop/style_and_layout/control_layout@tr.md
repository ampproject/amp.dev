---
$title: Desteklenen Düzenler
---

Kullandığınız öğeleri duyarlı yapın; `layout=responsive` kodunu ekleyin.

## Düzen özniteliği için desteklenen değerler <a name="the-layout-attribute"></a>

Varsayılan olarak, duyarlı düzenler kullanın.

Düzen özniteliğine ilişkin desteklenen değerlerin tam listesini aşağıda görebilirsiniz:

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Düzen türü</th>
      <th class="col-twenty" data-th="Width/height required">Gereken genişlik/yükseklik</th>
      <th data-th="Behavior">Davranış</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Hayır</td>
      <td data-th="Behavior">Öğe görüntülenmez. Bu düzen, her AMP öğesine uygulanabilir. Bileşenin görüntüleme stili yoksa ekranda hiç alan kaplamaz. Öğenin kendisini kullanıcı etkileşiminde görüntüleyebileceği varsayılır (ör. <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>).</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Evet</td>
      <td data-th="Behavior">Öğenin, duyarlılığı desteklemeyen sabit bir genişliği ve yüksekliği vardır. Bunun tek istisnası <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> ve <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a> öğeleridir.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Evet</td>
      <td data-th="Behavior">Öğe, kapsayıcı öğesinin genişliğine boyutlandırılmıştır ve yüksekliğini otomatik olarak genişlik ve yükseklik özniteliklerine göre belirlenen en boy göre oranına yeniden boyutlandırır. Bu düzen <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> gibi çoğu AMP öğesi için iyi bir şekilde çalışır. Kullanılabilir alan üst öğeye bağlıdır ve <code>max-width</code> CSS'si kullanılarak da özelleştirilebilir.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Yalnızca yükseklik</td>
      <td data-th="Behavior">Öğe, kendi kullanımına sunulan alanı kaplar ancak yüksekliğini değiştirmez. Bu düzen, yatay olarak konumlandırılmış içerik barındıran <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> gibi öğeler için iyi bir şekilde çalışır. <code>width</code> özniteliği mevcut olmamalı veya <code>auto</code> değerine ayarlanmış olmalıdır.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Hayır</td>
      <td data-th="Behavior">Öğe, hem genişlik hem yükseklik olarak kendi kullanımına sunulan alanı kaplar. Diğer bir deyişle, bir dolgu öğesinin düzeni üst öğesiyle eşleşir.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Hayır</td>
      <td data-th="Behavior">Öğe, daha çok normal bir HTML <code>div</code> öğesi gibi alt öğelerinin kendi boyutlarını tanımlamalarına izin verir. Bileşenin kendi özel düzeninin olmadığı, sadece bir kapsayıcı görevi gördüğü varsayılır. Alt öğeleri hemen oluşturulur.</td>
    </tr>
  </tbody>
</table>

### Genişlik ve yükseklik tanımlanmamışsa ne olur? <a name="what-if-width-and-height-are-undefined"></a>

Birkaç örnekte, `width` veya `height` belirtilmemişse AMP çalışma zamanı bunları aşağıdaki gibi varsayılan değerlerine ayarlayabilir:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): Genişlik ve yükseklik varsayılan olarak 0 değerine ayarlanır.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): Varsayılan genişlik ve yükseklik tarayıcıdan belirlenir.

### Düzen özniteliği tanımlanmamışsa ne olur? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Düzen davranışı aşağıdaki gibi belirlenir:

* `height` mevcutsa ve `width` yoksa veya `auto` değerine ayarlanmışsa `fixed-height` düzeni kabul edilir.
* `width` veya `height` özniteliği, `sizes` özniteliğiyle birlikte mevcutsa `responsive` düzeni kabul edilir.
* `width` veya `height` özniteliği mevcutsa `fixed` düzeni kabul edilir.
* `width` ve `height` mevcut değilse `container` düzeni kabul edilir.

## @media ve media özniteliğini kullanma

Diğer web sitelerinde olduğu gibi sayfa düzeninin nasıl görüneceğini ve nasıl davranacağını kontrol etmek için [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) öğesini kullanın.
Tarayıcı penceresinin boyutu veya yönü değiştiğinde, medya sorguları yeniden değerlendirilir ve öğeler, yeni sonuçlara göre gizlenir ve gösterilir.

[Duyarlılık için CSS medya sorguları kullanma](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=tr) konusundan medya sorguları uygulayarak düzeni kontrol etme hakkında daha fazla bilgi edinebilirsiniz.

<a name="element-media-queries"></a>

AMP'de bulunan duyarlı tasarım için fazladan bir özellik `media` özniteliğidir.
Bu öznitelik her AMP öğesinde kullanılabilir; genel stil sayfanızdaki medya sorgularına benzer bir şekilde çalışır ancak yalnızca tek bir sayfadaki belirli bir öğeyi etkiler.

Örneğin, burada karşılıklı olarak birbirini dışlayan sorgulara sahip 2 resmimiz vardır.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

Ekran genişliğine bağlı olarak, resimlerden biri getirilip oluşturulur.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]

## srcset özniteliğini ve boyutları kullanma

Bir öğenin varlıklarını değişen medya ifadelerine dayanarak kontrol etmek için `srcset` özniteliğini kullanın.
Özellikle bunu, değişen ekran boyutlarına göre hangi resim öğelerinin kullanılacağını belirtmek üzere tüm [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketleri için kullanın.

Bu basit örnekte, `srcset` özniteliği ekran genişliğine göre hangi resmin kullanılacağını belirtir.
`w` açıklayıcısı, tarayıcıya listedeki her bir resmin genişliğini bildirir:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Not:** AMP, `w` açıklayıcısını tüm tarayıcılarda destekler.

[Duyarlı Resimler Kullanma (Şimdi)](http://alistapart.com/article/using-responsive-images-now) konusundan `srcset` özniteliğini kullanarak duyarlı resimler oluşturma hakkında daha fazla bilgi edinebilirsiniz.

Ayrıca, `srcset` özniteliğiyle birlikte `sizes` özniteliğini de kullanabilirsiniz.
`sizes` özniteliği, herhangi bir medya ifadesine dayanarak öğe boyutunun nasıl hesaplanacağını açıklar.
Kullanıcı aracısı, öğenin hesaplanan boyutuna göre `srcset` özniteliği tarafından sağlanan en göreli kaynağı seçer.

Aşağıdaki örneği inceleyin:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

Görüntü alanı 650 piksel veya daha geniş olduğunda, `sizes` özniteliği, öğenin genişliğini görüntü alanı boyutunun %50'si kadar olacak şekilde tanımlar.
Örneğin, görüntü alanı 800 piksel olursa öğenin genişliği 400 piksel değerine ayarlanır.
Tarayıcı, daha sonra cihaz piksel oranını 1 olarak kabul ederek [bu örnekte, `narrow.jpg` (320 piksel)] 400 piksel ile göreli `srcset` kaynağını seçer.

**Önemli:** sizes özniteliği width ve height ile birlikte belirtildiğinde, düzen varsayılan olarak `responsive` değerine ayarlanır.

[Srcset ve boyutlar](https://ericportis.com/posts/2014/srcset-sizes/) blog yanınından `sizes` ve `srcset` özniteliklerinin medya sorguları ile karışlaştırması hakkında daha fazla bilgi edinin.

## placeholder ve fallback özniteliklerini ekleme

### placeholder

`placeholder` özniteliğiyle işaretlenen öğe, üst AMP öğesi için bir yer tutucu görevi görür.
Bir `placeholder` öğesi belirtilirse, AMP öğesinin doğrudan alt öğesi olmalıdır.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

AMP öğesinin kaynakları indirilmemiş veya başlatılmamış olsa bile, AMP öğesine ilişkin yer tutucu varsayılan olarak hemen gösterilir.
AMP öğesi hazır olduktan sonra genellikle yer tutucusunu gizler ve içeriği gösterir.

**Not:** Yer tutucunun bir AMP öğesi olması gerekmez; herhangi bir HTML öğesi yer tutucu görevi görebilir.

### fallback

Herhangi bir öğe için tarayıcının desteklemediği yedek davranışı belirtmek amacıyla `fallback` özniteliğini kullanın.
Örneğin, tarayıcının belirli bir özelliği desteklemediğini kullanıcıya iletmek için `fallback` özniteliğini kullanın:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

`fallback` özniteliği sadece AMP öğelerinde değil, herhangi bir HTML öğesinde de ayarlanabilir.
`fallback` öğesi belirtilirse, AMP öğesinin doğrudan alt öğesi olmalıdır.

### noloading

"Yükleniyor göstergesi", öğenin henüz tam olarak yüklenmediğini gösteren temel animasyondur. "Yükleniyor göstergesi"ni göstermesi için birçok AMP öğesi beyaz listeye eklenmiştir.
Öğeler, `noloading` özniteliğini ekleyerek bu davranışı devre dışı bırakabilir.
