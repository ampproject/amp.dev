---
$title: amp-iframe
$category@: layout
teaser:
  text: Bir iframe görüntüler.
---


<!--
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



Bir iframe görüntüler.


<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">amp-iframe için ek açıklamalı kod örneği</a></td>
  </tr>
</table>

# Davranış <a name="behavior"></a>

`amp-iframe` öğesinin, vanilla iframe'e göre kendisini daha güvenli hale getirmek ve tek bir iframe tarafından yönetilen AMP dosyalarından kaçınmak için tasarlanmış bazı önemli farklılıkları vardır:

* `amp-iframe`, ([aşağıda](#iframe-with-placeholder) açıklandığı gibi `placeholder` öğesini kullanan iframe'ler haricinde) dokümanın üst kısmına yakın görünmeyebilir. iframe en üst kısımdan 600 piksel uzaklıkta olmalı veya üst kısma kaydırıldığında, görüntü alanının ilk %75'inde yer almamalıdır (hangisi daha küçükse).
* Varsayılan olarak, bir amp-iframe korumalı alanda yer alır ([ayrıntılara](#sandbox) bakın).
* Bir `amp-iframe`, kaynakları yalnızca HTTPS aracılığıyla, bir veri URI'sından veya `srcdoc` özelliği ile istemelidir.
* `sandbox` özelliğinde `allow-same-origin` değerine izin verilmedikçe, `amp-iframe` öğesi, kapsayıcıyla aynı kaynakta olmamalıdır. iframe'ler için izin verilen kaynaklarla ilgili daha fazla ayrıntı için ["iframe kaynak politikası"](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md) dokümanına bakın.

*Örnek: Bir amp-iframe içine yerleştirilmiş Google Haritası*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Şu şekilde oluşturulur:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
Daha fazla `amp-iframe` demosu için [Örneklerle AMP](https://ampbyexample.com/components/amp-iframe/) sitesini ziyaret edin.
[/tip]

# amp-iframe öğesinin reklamcılık için kullanımı <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe`, reklam görüntülemenin birincil amacı için **kullanılmamalıdır**. `amp-iframe`, reklamların bir parçası olan videoların görüntülenmesi amacıyla kullanılabilir. Bu AMP politikası, ilgili iframe'lerin oluşturulmamasıyla uygulanabilir.

Reklamcılık kullanım alanları, bunun yerine [`amp-ad`](amp-ad.md) öğesini kullanmalıdır.

Bu politikanın gerekçileri şunlardır:

* `amp-iframe` korumalı alanı uygular ve korumalı alan, alt iframe'lere de uygulanır. Bu, reklamın kendisi çalışıyor görünse bile açılış sayfalarının bozuk olabileceği anlamına gelir.
* `amp-iframe`, yapılandırmayı iframe'e geçirecek herhangi bir mekanizma sağlamaz.
* `amp-iframe`, iframe tarafından tam olarak kontrol edilen yeniden boyutlandırma mekanizmasına sahip değildir.
* Görüntülenebilirlik bilgileri `amp-iframe` tarafından kullanılamaz.

# Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>src</code> özelliği, bir istisna dışında genellikle standart bir iframe'de olduğu gibi davranır: Kaynak dokümanların AMP bağlamı içine yerleştirildiğini bilmesi için URL'ye <code>#amp=1</code> parçası eklenir. Bu parça, yalnızca <code>src</code> tarafından belirtilen URL'nin halihazırda bir parçasının olmadığı durumlarda eklenir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
    <td>Bu özelliklerin tamamı standart iframe'lerde olduğu gibi davranmalıdır.
      <br>
        <code>frameborder</code> belirtilmezse varsayılan olarak <code>0</code> değerine ayarlanır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td><code>amp-iframe</code> tarafından oluşturulan iframe'lerde <code>sandbox</code> özelliği her zaman tanımlı olur. Varsayılan olarak değer boştur; diğer bir deyişle, "maksimum korumalı alan uygulanmış"tır. " <code>sandbox</code> değerlerini ayarlayarak iframe'e daha az korumalı alan uygulanmasını sağlayabilirsiniz. Tarayıcılar tarafından desteklenen tüm değerlere izin verilir. Örneğin <code>sandbox="allow-scripts"</code> değerinin ayarlanması, iframe'in JavaScript'i çalıştırmasına veya <code>sandbox="allow-scripts allow-same-origin"</code> değeri, iframe'in JavaScript çalıştırmasına, CORS olmayan XHR'ler yapmasına ve çerezleri okumasına/yazmasına olanak tanır.
          <br><br>
            Özel olarak korumalı alan oluşturma düşünülerek oluşturulmamış bir dokümanı iframe içine yerleştiriyorsanız büyük olasılıkla <code>sandbox</code> özelliğine <code>allow-scripts allow-same-origin</code> değerini eklemeniz gerekir ve ek özelliklere izin vermeniz gerekebilir.
            <br><br>
              Korumalı alanın, korumalı alandaki bir iframe'den açılan tüm pencerelere uygulandığını da unutmayın. Bu, <code>target=_blank</code> içeren bir bağlantı tarafından oluşturulan yeni pencereleri de içerir (bunun olmasına izin vermek için <code>allow-popups</code> özelliğini ekleyin). <code>sandbox</code> özelliğine <code>allow-popups-to-escape-sandbox</code> eklenmesi, bu yeni pencerelerin korumalı alanda olmayan yeni pencereler gibi davranmasını sağlar. Bu, büyük olasılıkla istediğiniz ve beklediğiniz durumdur. Ne yazık ki, bu yazı hazırlandığı sırada, <code>allow-popups-to-escape-sandbox</code> yalnızca Chrome tarafından destekleniyordu.
              <br><br>
                Korumalı alan özelliği hakkında daha ayrıntılı bilgi için <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">MDN'deki dokümanlara</a> bakın.</td>
              </tr>
              <tr>
                <td width="40%"><strong>common attributes</strong></td>
                <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">ortak özellikleri</a> içerir.</td>
              </tr>
            </table>

# Yer tutucu içeren iframe <a name="iframe-with-placeholder"></a>

`amp-iframe`, aşağıdaki örnekte gösterildiği gibi bir `placeholder` öğesi içerdiğinde, `amp-iframe` öğesinin dokümanın üst kısmında görünmesi mümkündür.

* `amp-iframe`, iframe görüntülenmeye hazır olana kadar bir yer tutucu olarak oluşturulacak `placeholder` özelliğine sahip bir öğe (örneğin, bir `amp-img` öğesi) içermelidir.
* iframe'in hazır olması, iframe'in `onload` özelliği veya iframe dokümanı tarafından gönderilecek bir `embed-ready` `postMessage` dinlenerek (hangisi önce gelirse) bilinebilir.

*Örnek: Bir yer tutucu içeren iframe*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Örnek: iframe yerleştirme özellikli istek*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# iframe'i yeniden boyutlandırma <a name="iframe-resizing"></a>

`amp-iframe` öğesinin, diğer AMP öğelerinde olduğu gibi tanımlı statik bir düzeni olmalıdır. Bununla birlikte, çalışma zamanında bir `amp-iframe` öğesini yeniden boyutlandırmak mümkündür. Bunu yapmak için:

1. `amp-iframe` , `resizable` özelliğiyle tanımlanmalıdır.
1. `amp-iframe`, bir `overflow` alt öğesine sahip olmalıdır.
1. `amp-iframe`, `allow-same-origin` korumalı alan özelliğini ayarlamalıdır.
1. Iframe dokümanı, `embed-size` isteğini bir pencere mesajı olarak göndermelidir.
1. İstek yüksekliği belirli bir eşikten azsa (100px) `embed-size` isteği reddedilir.

`resizable` değerinin, `scrolling` öğesinin `no` değerini geçersiz kıldığını unutmayın.

*Örnek: `overflow` öğesine sahip `amp-iframe`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Örnek: iframe yeniden boyutlandırma isteği*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Bu mesaj alındıktan sonra AMP çalışma zamanı, isteği olabildiğince erken yerine getirmeye çalışır ancak okuyucunun şu anda okumakta olduğu yeri, kaydırmanın devam edip etmediğini ve diğer herhangi kullanıcı deneyimlerini ya da performans faktörlerini göz önünde bulundurur. Çalışma zamanı yeniden boyutlandırma isteğini karşılayamazsa `amp-iframe` bir `overflow` öğesi gösterir. `overflow` öğesinin tıklanması, bir kullanıcı işlemi tarafından tetiklendiğinden `amp-iframe` öğesini hemen yeniden boyutlandırır.

Yeniden boyutlandırmanın ne kadar hızlı yürütüleceğini etkileyen bazı faktörleri burada görebilirsiniz:

* Yeniden boyutlandırmanın kullanıcı işlemi tarafından tetiklenip tetiklenmediği.
* Yeniden boyutlandırmanın şu anda etkin olan bir iframe için istenip istenmediği.
* Yeniden boyutlandırmanın görüntü alanının altında veya üstünde bulunan bir iframe için istenip istenmediği.

# iframe görüntülenebilirliği <a name="iframe-viewability"></a>

iframe'ler, iframe'in üst görüntü alanıyla kesişiminin IntersectionObserver stil [değişiklik kayıtlarını](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) almaya başlaması için üst öğelerine bir `send-intersections` mesajı gönderebilir.

*Not: Aşağıdaki örneklerde, komut dosyasının oluşturulan iframe'de içinde yer aldığı ve `window.parent` öğesinin üst pencere olduğu kabul edilmektedir. Komut dosyası iç içe yerleştirilmiş bir iframe'deyse `window.parent` öğesini üstteki AMP penceresi olarak değiştirin.*

*Örnek: iframe `send-intersections` isteği*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

Iframe, kesişim verilerini almak için üst pencereden gelen bir `intersection` mesajını dinleyebilir.

*Örnek: iframe `send-intersections` isteği*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

Kesişim mesajı, iframe kaydırıldığında veya yeniden boyutlandırıldığında görüntü alanının içine veya dışına taşındığında (veya kısmen göründüğünde) iframe'e üst öğe tarafından gönderilir.

# İzleme/analiz iframe'leri <a name="trackinganalytics-iframes"></a>

Analiz yapmayı amaçladığınızda [`amp-analytics`](amp-analytics.md) öğesini kullanmanızı önemle tavsiye ederiz. Bu öğe, çok çeşitli analiz tedarikçi firması için yapılandırılabilen çok daha güçlü, eksiksiz ve etkili bir çözümdür.

AMP, her sayfada analiz ve izleme amacıyla yalnızca tek bir iframe'in kullanılmasına izin verir. Kaynaklardan tasarruf etmek için bu iframe'ler yüklendikten 5 saniye sonra DOM'dan kaldırılır. Bu süre, yapılması gereken işlerin tamamlanması için yeterli bir zamandır.

iframe'ler, görünmez veya küçük olmaları gibi kullanıcıya yönelik doğrudan bir amaca hizmet etmiyorlarsa izleme/analiz iframe'leri olarak tanımlanır.

# Yönerge: amp-iframe üzerinde mevcut AMP bileşenlerini kullanma <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

Gerekli kullanıcı deneyimi AMP'deki diğer araçlarla mümkün değilse yani kullanım alanı için halihazırda mevcut bir [AMP bileşeni](../../../documentation/components/index.html) yoksa `amp-iframe` bileşeni, bir yedek olarak kabul edilmelidir. Bunun nedeni, belirli bir kullanım alanı için uyarlanmış bir AMP bileşenini kullanmanın birçok yararının olmasıdır. Örneğin:

* Daha iyi kaynak yönetimi ve performans
* Özel bileşenler, bazı durumlarda yerleşik yer tutucu resimler sağlayabilir. Bu, örneğin video yüklenmeden önce doğru video küçük resminin alınması anlamına gelir ve manuel olarak yer tutucu eklemek için yapılan kodlama çalışmasını azaltır.
* Yerleşik yeniden boyutlandırma. Bu, öngörülemeyen boyuta sahip iframe içeriğinin kullanıcıya, kaydırılabilir bir çerçeve yerine sayfanın kendi içindeymiş gibi görünebileceği anlamına gelir
* Başka ek özellikler de oluşturulabilir (örneğin, video oynatıcılar için otomatik oynatma)

# Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonunda [amp-iframe kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii) bakın.
