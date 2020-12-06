---
"$title": Koltuk planı oluşturma
"$order": '104'
description: "Koltuk planları, bilet sağlayıcısı web uygulamalarının önemli bir parçasıdır. Ancak AMP'de uygulanması zor olabilir. AMP'de bir koltuk planının nasıl uygulayacağını öğrenmek için okumaya devam edin"
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Koltuk planları, bilet sağlayıcısı web uygulamalarının önemli parçalarıdır. Ancak AMP'de uygulanması zor olabilir. Mevcut AMP bileşenlerinin bir kombinasyonunu kullanarak AMP'de bir koltuk planının nasıl uygulanacağını öğrenmek için okumaya devam edin.

[tip] Aşağıda açıklanan uygulamaları uygulayan canlı bir örnek [burada](../../../documentation/examples/documentation/SeatMap.html) mevcuttur. [/tip]

## AMP Bileşenleri gerekli

Gerekli bileşenleri gözden geçirerek başlayalım:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md), içeriği çift dokunma ve sıkıştırma yoluyla yakınlaştırmaya ve kaydırmaya izin verir. Bu bileşen, koltuk planının uygulaması için temel görevi görür.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md), içeriği bir CORS JSON uç noktasından dinamik olarak alır ve sağlanan bir şablonu kullanarak görselleştirir. Mevcut koltuk planı kullanılabilirliğini getirmek için kullanılır, böylece kullanıcılar her zaman en son verileri alır.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md), sayfaya etkileşim ekler. Kaç koltuk seçildiğini takip etmek için burada gereklidir.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md), bir seçenekler menüsü sunan ve kullanıcının oradan seçim yapmasına izin veren bir denetimi temsil eder. Koltuk planının tamamı, her koltuğun bir seçenek olduğu bir seçenekler menüsü olarak düşünülebilir. Bu, CSS ifadelerini kullanmanıza izin vererek seçilen koltuk durumunu şekillendirmeyi çok daha kolay hale getirir. Örneğin, aşağıdaki ifade, seçildikten sonra bir koltuğu turuncu renkle doldurur.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Gereksinimler

1. SVG olarak, her koltuğun bir `rect` elemanı ile temsil edildiği bir yerleşim planı çizmek için, her koltuk hakkında bilgiye ihtiyacınız vardır: `x` ve `y` konumu, `width` ve `height` ve muhtemelen dikdörtgenlerin köşelerini yuvarlamak için `rx` ve `ry`.
2. Rezervasyon yapmak için kullanılabilecek her koltuk için benzersiz bir tanımlayıcı.
3. `viewbox` özniteliğinde kullanılacak koltuk planının tüm genişliğinin ve yüksekliğinin bir ölçüsü.

## Koltuk planının çizilmesi

Koltuk planı, [`amp-list`](../../../documentation/components/reference/amp-list.md) ve [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md) ile işlenir. Verileri [`amp-list`](../../../documentation/components/reference/amp-list.md) çağrısından aldıktan sonra, koltuklarda yineleme yapmak için söz konusu verileri kullanabilirsiniz:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Kullanılamayan koltukların biçimlendirilmesi

Yukarıdaki örnekte, `{% raw %}{{unavailable}}{% endraw %}`, JSON uç noktası tarafından döndürülen ve kullanılamayan bir koltuğu biçimlendirmek için kullanılan alanın değeridir. Bu yaklaşım, şablon tüm sayfaların `<html>` öğesini saramayacağından, bir koltuk kullanılamıyorsa `option="{{id}}"` gibi öznitelikleri kaldırmanıza izin vermez.

Alternatif ve daha ayrıntılı bir yaklaşım, etiketleri aşağıdaki gibi tekrar etmektir:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Koltuk planınızı boyutlandırma

Koltuk planınızın boyutu sabitlenmedikçe, koltuk haritasını içeren [`amp-list`](../../../documentation/components/reference/amp-list.md) boyutlandırmak zordur. [`amp-list`](../../../documentation/components/reference/amp-list.md), ya sabit boyutlara ihtiyaç duyar ya da `layout="fill"` (ana kapsayıcının kullanılabilir alanını kullanmak için) kullanır. Bu sorunu çözmenin iki yolu vardır:

1. Üstbilgi ve altbilgi gibi diğer bileşenlerin kullandığı alanı öğrendikten sonra sayfadaki kullanılabilir alanı hesaplayın. Bu hesaplama, CSS'de `calc` ifadesini kullanarak ve [`amp-list`](../../../documentation/components/reference/amp-list.md) bir ana div öğesine `min-height` atayarak yapılabilir.
2. Sayfa yerleşiminin yüksekliğini bildiğinizde esnek bir yerleşim kullanın.

## amp-pan-zoom biçimlendirme

Önceki bölümde açıklanan yaklaşımı kullanıyorsanız, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) da `layout="fill"` kullanmalıdır.

[tip type="tip"] **İPUCU –** Koltuk planının çevresinde biraz beyaz boşluk bırakmak ve yine de onu sıkıştırma ve yakınlaştırma alanının bir parçası yapmak için:

- Svg için saracak bir div ekleyin
- padding ekleyin

Bir saracak div öğeniz yoksa ve bunun yerine SVG'ye kenar boşluğu eklerseniz, bu kenar boşluklarını sıkıştırma ve yakınlaştırma alanının parçası yapmaz. [/tip]

## İşleme durumu

Kullanıcılar farklı koltuklara tıkladığında, bir değişkendeki seçili koltuk `id`'lerini `amp-state` kullanarak takip etmek mümkündür:

- Seçili koltuğu bir listeye eklerken her koltuk için bir [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ifadesi ekleyin
- Veya seçilen tüm koltukların bir listeye eklenmesi için `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` eylemiyle [`amp-selector`](../../../documentation/components/reference/amp-selector.md) kullanın

İlk yaklaşım, [`amp-selector`](../../../documentation/components/reference/amp-selector.md) ek bileşenini gerektirmese de, koltuk planını çok yavaş hale getirebilir. Çünkü her [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ifadesi her koltuk seçiminde/seçimin kaldırılmasında değerlendirilecektir.

İkinci yaklaşım ayrıca, şablon tarafından oluşturulacak her koltuk için [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ifadesinin yinelenmesini azaltmanıza da olanak tanır.

## Son HTML yapısı

Referans için, koltuk planının son HTML'sini burada bulabilirsiniz:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
