---
$category@: layout
formats:
- websites
- ads
teaser:
  text: Öğeleri tam görüntü alanı "lightbox" kalıcı iletişim kutusunda görüntüler.
---



<!---
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

# amp-lightbox

<table>
  <tr>
    <td width="40%"><strong>Açıklama</strong></td>
    <td>Öğeleri tam görüntü alanı "lightbox" kalıcı iletişim kutusunda görüntüler.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> örneklerine bakın.</td>
  </tr>
</table>


## Davranış

`amp-lightbox` bileşeni, tam görüntü alanı yer paylaşımı/kalıcı iletişim kutusunda görüntülenen alt öğeleri tanımlar. Kullanıcı bir öğeye (ör. bir düğme) dokunduğunda veya tıkladığında, tıklanan öğenin `on` özelliğinde referans alınan `amp-lightbox` kimliği, lightbox'ın tam görüntü alanını kaplamasını tetikler ve `amp-lightbox` alt öğelerini görüntüler.

Klavyedeki çıkış tuşuna basıldığında lightbox kapanır. Alternatif olarak, lightbox içinde bir veya daha fazla öğede `on` özelliği ayarlanır ve `close` yöntemi belirlenirse öğeye dokunulduğunda veya öğe tıklandığında lightbox kapatılır.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
Lightbox'ta resimleri göstermek için [`<amp-image-lightbox>`](https://www.ampproject.org/docs/reference/components/amp-image-lightbox) bileşeni de vardır.
[/tip]

## Özellikler

<table>
  <tr>
    <td width="40%"><strong>animate-in (isteğe bağlı)</strong></td>
    <td>Lightbox'ın açılış animasyonu stilini tanımlar. Varsayılan olarak bu özellik <code>fade-in</code> değerine ayarlanır. Geçerli değerler şunlardır: <code>fade-in</code>, <code>fly-in-bottom</code> ve <code>fly-in-top</code>.
      <br><br>
        <strong>Not</strong>: <code>fly-in-*</code> animasyonu hazır ayarları, <code>amp-lightbox</code> öğesinin <code>transform</code> özelliğini değiştirir. <code>amp-lightbox</code> öğesini doğrudan dönüştürmeyin. Bir dönüşüm uygulamanız gerekiyorsa bunu, iç içe yerleştirilmiş bir öğede ayarlayın.</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button (AMPHTML reklamlarında gerekir)</strong></td>
        <td>Lightbox'ın üst kısmında bir kapat düğmesi başlığı oluşturur. Bu özellik yalnızca <a href="#a4a">AMPHTML Reklamları</a> ile kullanım için gerekli ve geçerlidir.</td>
      </tr>
      <tr>
        <td width="40%"><strong>id (gerekli)</strong></td>
        <td>Lightbox için benzersiz bir tanımlayıcı.</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout (gerekli)</strong></td>
        <td><code>nodisplay</code> değerine ayarlanmalıdır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable (isteğe bağlı)</strong></td>
        <td><code>scrollable</code> özelliği mevcutsa, lightbox içeriğinin lightbox yüksekliğinden taştığı durumlarda içerik kaydırılabilir.
          <br><br>
            <strong>Not</strong>: AMPHTML reklamının içinde <code><amp-lightbox></code> kullanılırken <code>scrollable</code> özelliğine izin verilmez. Ayrıntılar için <a href="#a4a">AMPHTML reklamları amp-lightbox özelliğini kullanma</a> konusunu okuyun.</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable (isteğe bağlı)</strong></td>
            <td></td>
          </tr>
        </table>

## Stil

`amp-lightbox` özelliğini standart CSS ile şekillendirebilirsiniz.

## İşlemler

`amp-lightbox`, [söz diziminde AMP kullanabileceğiniz aşağıdaki işlemlerin tetiklenmesini](https://www.ampproject.org/docs/reference/amp-actions-and-events) sağlar:

<table>
  <tr>
    <th width="20%">İşlem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>open</code> (varsayılan)</td>
    <td>Lightbox'ı açar.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Lightbox'ı kapatır.</td>
  </tr>
</table>

## <a id="a4a"></a> AMPHTML reklamlarında `amp-lightbox` özelliğini kullanma

[tip type="note"]
`amp-lightbox` bileşeninin AMPHTML reklamlarında kullanılması [deneme aşamasındadır](https://www.ampproject.org/docs/reference/experimental) ve etkin bir şekilde geliştirilmektedir. AMPHTML reklamlarında `amp-lightbox` özelliğini kullanmak [`amp-lightbox-a4a-proto` denemesini etkinleştirin](http://cdn.ampproject.org/experiments.html).
[/tip]

`amp-lightbox` özelliğinin normal AMP dokümanlarında kullanılması ile [AMPHTML'de yazılmış reklamlar](../amp-a4a/amp-a4a-format.md) arasında bazı farklar vardır:

### close-button gerektirir

AMPHTML reklamları için `close-button` özelliği gerekir. Bu özellik, lightbox'ınızın üst kısmında bir başlığın oluşturulmasına neden olur. Başlık, bir kapat düğmesini ve "Reklam"ı görüntüleyen bir etiketi içerir. Bu başlık aşağıdakilerin sağlanması için gereklidir:

* AMPHTML reklamları için tutarlı ve tahmin edilebilir bir kullanıcı deneyimi ayarlama.
* Lightbox için her zaman bir çıkış noktasının var olduğundan emin olma (aksi takdirde, reklam öğesi bir lightbox aracılığıyla ana makine doküman içeriğini etkili bir şekilde ele geçirebilir).

`close-button` özelliği zorunludur ve yalnızca AMPHTML reklamlarında buna izin verilir. Normal AMP dokümanlarında, `<amp-lightbox>` içeriğinin parçası olarak ihtiyaç duyduğunuz herhangi bir yerde bir kapat düğmesi oluşturabilirsiniz.

### Kaydırılabilir lightbox'lara izin verilmez

AMPHTML reklamlarında kaydırılabilir lightbox'lara izin verilmez.

### Şeffaf arka plan

AMP çalışma zamanı lightbox genişletilmeden önce reklam öğenizi yeniden boyutlandırdığı ve yeniden hizaladığı için AMPHTML reklamlarında `<amp-lightbox>` özelliğini kullandığınızda, `<body>` öğenizin arka planı şeffaf hale gelir. Bu, lightbox açılırken reklam öğesinin görsel olarak "atlanmasını" önlemek için yapılır. Reklam öğenizin bir arka plana ihtiyacı varsa bu arka planı `<body>` öğesi yerine bir ara kapsayıcıda (tam boyutlu `<div>` gibi) ayarlayın.

AMPHTML reklamı bir üçüncü taraf ortamında (örneğin, AMP olmayan bir dokümanda) yayınlandığında, reklam öğesi görüntü alanına göre ortalandıktan sonra genişletilir. Bu durum, üçüncü taraf iframe'lerinin eşzamansız olan çerçeve yeniden boyutlandırma gibi özellikler için bir postMessage API'sini kullanma gerekliliğinden kaynaklanır. Böylece, önce reklam öğesinin ortalanması görsel atlamalar olmadan yumuşak bir geçişe olanak tanır.

### AMPHTML reklamları için lightbox'ta geçiş örnekleri

Aşağıdaki örneklerde, bir güvenilir iframe ve bir üçüncü taraf iframe içindeki AMPHTML reklamları için lightbox öğesinde `animate-in="fly-in-bottom"` özelliğinin ayarlandığı bir AMPHTML reklam geçişinin nasıl göründüğü gösterilmektedir.

##### Güvenilir iframe'lerde (ör. AMP önbelleğinden gelmektedir)

<amp-img alt="güvenilir iframe içindeki lightbox reklamı" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="güvenilir iframe içindeki lightbox reklamı" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### Üçüncü taraf iframe'lerde (ör. AMP önbelleği dışındadır)

<amp-img alt="3p iframe içindeki lightbox reklamı" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="3p iframe içindeki lightbox reklamı" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-lightbox kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/validator-amp-lightbox.protoascii) bakın.
