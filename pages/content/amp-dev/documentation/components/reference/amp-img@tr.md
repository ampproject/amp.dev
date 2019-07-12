---
$category@: media
formats:
- websites
- email
- ads
- stories
teaser:
  text: HTML5 img etiketinin yerini alır.
---


<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

# amp-img

<table>
  <tr>
    <td class="col-fourty"><strong>Açıklama</strong></td>
    <td>HTML <code>img</code> etiketi için çalışma zamanı tarafından yönetilen bir yedek.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-img/">amp-img örneği</a> sayfasına bakın.</td>
  </tr>
</table>


# Davranış

Çalışma zamanı; görüntü alanı konumuna, sistem kaynaklarına, bağlantı bant genişliğine veya diğer faktörlere dayalı olarak kaynak yüklemesini geciktirmeyi veya öncelikli hale getirmeyi seçebilir. `amp-img` bileşenleri, çalışma zamanının resim kaynaklarını bu şekilde etkili bir şekilde yönetmesine olanak tanır.

Dışarıdan getirilen tüm AMP kaynakları gibi `amp-img` bileşenlerine de önceden açık bir boyut (`witdh`/`height` gibi) verilmelidir. Böylece, resim getirilmeden en boy oranı bilinebilir. Gerçek düzen davranışı, `layout` özniteliği tarafından belirlenir.

[tip type="read-on"]
[AMP HTML Düzeni Sistemi](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) spesifikasyonundaki düzenler [Desteklenen Düzenler](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute) hakkında daha fazla bilgi edinin.
[/tip]

# Örnek: Duyarlı bir resim gösterme

Aşağıdaki örnekte, `layout=responsive` öğesini ayarlayarak görüntü alanının boyutuna yanıt veren bir resim görüntülenmektedir.  Resim, `width` ve `height` tarafından belirtilen en boy oranına göre uzar ve küçülür.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="read-on"]
[Duyarlı AMP Sayfaları Oluşturma](https://www.ampproject.org/docs/guides/responsive/responsive_design.html) kılavuzunda, duyarlı AMP sayfaları hakkında bilgi edinin.
[/tip]

`amp-img` bileşeni tarafından istenen kaynak yüklenemezse bir [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback) alt öğesi sağlanıncaya kadar alan boş kalır. Bir yedek yalnızca başlangıç düzeninde oluşturulur ve olaydan sonraki src değişikliklerinin (örneğin, yeniden boyutlandırma + srcset aracılığıyla) performans sonuçları için bir yedeği olmaz.

# Örnek: Bir yedek resim belirtme

Aşağıdaki örnekte, tarayıcı WebP'yi desteklemiyorsa yedek JPG resmi görüntülenir:

<div>
  <amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Yer tutucu arka plan rengi veya diğer görseller, CSS seçim aracı ve öğenin kendisinde stil belirtilerek ayarlanabilir.

Altyazılar gibi ek resim özellikleri, standart HTML ile uygulanabilir (örneğin, `figure` ve `figcaption`).

[tip type="read-on"]
Şu kaynaklardan, `amp-img` kullanma hakkında daha fazla bilgi edinin:

* [Yer tutucular ve yedekler](https://www.ampproject.org/docs/design/responsive/placeholders)
* [Resim ve Video Ekleme](https://www.ampproject.org/docs/media/amp_replacements)
[/tip]

# Özellikler

**src**

Bu özellik, `img` etiketindeki `src` özelliğine benzer. Değer, genel olarak önbelleğe alınabilir bir resim dosyasına işaret eden bir URL olmalıdır. Önbellek sağlayıcıları, AMP dosyalarını aktarırken bu URL'leri resmin önbelleğe alınmış bir sürümüne işaret edecek şekilde yeniden yazabilir.

**srcset**

`img` etiketinde `srcset` özelliği ile aynıdır. `srcset` özelliğini desteklemeyen tarayıcılarda `<amp-img>`, varsayılan olarak `src` kullanacak şekilde ayarlanır. Yalnızca `srcset` sağlanır ve herhangi bir `src` sağlanmazsa `srcset` özelliğindeki ilk url seçilir.

**sizes**

`img` etiketinde `sizes` özelliği ile aynıdır.

[tip type="read-on"]
`sizes` ve `srcset` kullanımıyla ilgili olarak [srcset, sizes ve heights özelliklerine sahip duyarlı resimler](https://www.ampproject.org/docs/design/responsive/art_direction) konusuna bakın.
[/tip]

**alt**

`img` etiketindeki `alt` özelliğine benzeyen, bir alternatif metin dizesi.

**attribution**

Resmin ilişkilendirilmesini belirten bir dizedir. Örneğin, `attribution="CC courtesy of Cats on Flicker"`

**height** ve **width**

AMP çalışma zamanı tarafından, resmi getirmeden en boy oranını belirlemek için kullanılan, resmin açık bir boyutudur.

**common attributes**

Bu öğe, AMP bileşenlerine genişletilmiş [ortak özellikleri](https://www.ampproject.org/docs/reference/common_attributes) içerirç

# Stil

`amp-img`, doğrudan CSS özellikleri aracılığıyla şekillendirilebilir. Örneğin, şu yolla gri renkli bir arka plan yer tutucu ayarlanabilir:

```css
amp-img {
  background-color: grey;
  }
```

# İpuçları ve Püf Noktaları

# Bir resmi maksimum genişliğe kadar ölçeklendirme

Pencere yeniden boyutlandırıldıkça resminizin de bir genişlik üst sınırına kadar (böylece, resim genişliğinden daha fazla uzatılmaz) ölçeklenmesini isterseniz:

1. `<amp-img>` için `layout=responsive` değerini ayarlayın.
1. Resmin kapsayıcısında, `max-width:<max width to display image>` CSS özelliğini belirtin.  Neden kapsayıcıda?  `layout=responsive` değerine sahip bir `amp-img` öğesi *blok düzeyindeyken*, `<img>` *satır içi* bir öğedir. Alternatif olarak, amp-img öğesi için CSS'nizde `display: inline-block` değerini ayarlayabilirsiniz.

# Duyarlı ve içsel düzen arasındaki fark

Hem `responsive` hem de `intrinsic` düzenler, otomatik olarak ölçeklenen resimler oluşturur.  Temel fark, `intrinsic` düzenin ölçekleme öğesi olarak bir SVG resmi kullanmasıdır.  Bu, resmin standart bir HTML resmiyle aynı şekilde davranmasını sağlarken tarayıcının, başlangıç düzenindeki resim boyutunu bilmesi avantajını korur. `intrinsic` düzenin içsel bir boyutu olur ve kayan bir `div` öğesini, doğal resim boyutuna veya `max-width` gibi bir CSS sabitine ulaşana kadar genişletir. `responsive` düzen, boyutunu, kayan hale getirildiğinde doğal boyutu olmayan üst öğeden aldığı için kayan bir `div` öğesinde 0x0 boyutuyla oluşturulur.

# Sabit boyutlu resim ayarlama

Resminizin sabit bir boyutta görüntülenmesini isterseniz:

1. `<amp-img>` için `layout=fixed` değerini ayarlayın.
1. `width` ve `height` değerlerini belirtin.

[tip type="read-on"]
`layout` özelliğini belirtmeyecekseniz [tahmin edilen düzen](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?) hakkında bilgi edinin.
[/tip]

# En boy oranını ayarlama

Duyarlı resimlerde, `width` ve `height` değerlerinin `amp-img` etiketinin genişliği ve yüksekliği ile tam olarak eşleşmesi gerekmez. Bu değerlerin aynı en boy oranıyla sonuçlanması yeterlidir.

Örneğin, `width="900"` ve `height="675"` değerlerini belirtmek yerine sadece `width="1.33"` ve `height="1"` değerlerini belirtebilirsiniz.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Farklı ekran çözünürlükleri için birden fazla kaynak dosyası ayarlama

Aynı resmin tamamında aynı en boy oranına sahip farklı çözünürlüklerini sağlamak için [`srcset`](#attributes) özelliği kullanılmalıdır. Tarayıcı, kullanıcının cihazının ekran çözünürlüğüne ve genişliğine göre en uygun dosyayı `srcset` özelliğinden otomatik olarak seçer.

Buna karşılık, [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) özelliği AMP bileşenlerini gösterir veya gizler ve duyarlı düzenler tasarlanırken kullanılmalıdır. Farklı en boy oranlarına sahip resimleri görüntülemenin uygun yolu, birden çok `<amp-img>` bileşeni kullanmak ve bu bileşenlerin her birinde, her bir örneğin gösterileceği ekran genişlikleriyle eşleşen bir `media` özelliği bulundurmaktır.

Daha ayrıntılı bilgi için [duyarlı AMP sayfaları oluşturma](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images) ile ilgili kılavuza bakın.

# Bilinmeyen boyutları olan resimler için en boy oranını koruma

AMP düzen sistemi, bir resmin en boy oranının resim getirilmeden önce bilinmesini gerektirir; ancak, bazı durumlarda resmin boyutlarını bilmiyor olabilirsiniz. Bilinmeyen boyutlara sahip resimleri görüntülemek ve en boy oranlarını korumak için [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) CSS özelliği ile AMP'nin [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) düzenini birleştirin. Daha fazla bilgi için Örneklerle AMP [Bilinmeyen boyutlara sahip resimleri destekleme](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) sayfasına bakın.

# Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-img kurallarına](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) bakın.
