---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Bir seçenek menüsü sunan ve kullanıcının bu menüden seçim yapmasına olanak tanıyan bir kontrolü temsil eder.
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



Bir seçenek menüsü sunan ve kullanıcının bu menüden seçim yapmasına olanak tanıyan bir kontrolü temsil eder.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://ampjs.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>Tümü</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-selector/">amp-selector örneği</a> sayfasına bakın.</td>
  </tr>
</table>


## Davranış <a name="behavior"></a>

AMP seçici, seçeneklerin bir listesini sunan ve kullanıcının bir veya daha fazla seçenek belirlemesine olanak tanıyan bir kontroldür; seçeneklerin içeriği yalnızca metinle sınırlı değildir.

* `amp-selector`, rastgele HTML öğeleri veya AMP bileşenleri içerebilir (ör. `amp-carousel`, `amp-img` vb.).
* `amp-selector`, iç içe yerleştirilmiş `amp-selector` kontrolleri içeremez.
* Belirlenebilir seçenekler, öğeye `option` özelliği eklenerek ve özelliğe bir değer atanarak ayarlanabilir (ör. `<li option='value'></li>`).
* Devre dışı bırakılan seçenekler, öğeye `disabled` özniteliği eklenerek ayarlanabilir. (ör. `<li option='d' disabled></li>`).
* Önceden belirlenmiş seçenekler, öğeye `selected` özelliği eklenerek ayarlanabilir (ör. `<li option='b' selected></li>`).
* Birden çok seçime izin vermek için `amp-selector` öğesine `multiple` özelliği ekleyin.  Varsayılan olarak `amp-selector`, bir defada bir seçim yapılmasına izin verir.
* `amp-selector` öğesini tamamıyla devre dışı bırakmak için `amp-selector` öğesine `disabled` özelliğini ekleyin.
* Bir `amp-selector`, bir `name` özelliği içerdiğinde ve `amp-selector`, bir `form` etiketinin içinde olduğunda, formda bir gönderme etkinliği gerçekleşirse `amp-selector`, bir radyo düğmesi/onay kutusu gibi davranır ve seçili değerleri (seçeneğe atanan değerler) `amp-selector` adıyla gönderir.

Örnek:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">Yukarıdakilerin Hiçbiri</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Seçimleri temizleme <a name="clearing-selections"></a>

Bir öğeye dokunulduğunda veya bir öğe tıklandığında tüm seçimleri temizlemek için öğede [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) işlem özelliğini ayarlayın ve AMP Seçici `id` bilgisini `clear` işlem yöntemiyle belirtin.

Örnek:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
[Örneklerle AMP](https://ampbyexample.com/components/amp-selector/) sayfasında canlı demoları görebilirsiniz.
[/tip]

## Özellikler <a name="attributes"></a>

### `<amp-selector>` ile ilgili özellikler <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Bu özellikler, standart HTML öğesi gibi davranır.<code>select</code>[](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td><code>keyboard-select-mode</code> özelliği, <code>amp-selector</code> içindeki seçeneklerin klavye gezinme davranışını belirtir.

    <ul><li><code>none</code> (varsayılan): Sekme tuşu, odağı <code>amp-selector</code> içindeki öğeler arasında değiştirir. Kullanıcı, seçimi değiştirmek için Enter veya boşluk tuşuna basmalıdır. Ok tuşları devre dışıdır. </li><li>
    <code>focus</code>: Sekme tuşu, odağı <code>amp-selector</code> öğesine verir. Kullanıcı, ok tuşlarını kullanarak öğeler arasında gezinir. Seçimi değiştirmek için boşluk veya Enter tuşuna basılmalıdır.</li><li>
    <code>select</code>: Sekme tuşu, odağı <code>amp-selector</code> öğesine verir. Kullanıcı, ok tuşları ile seçeneklerde gezindikçe seçim değişir. </li></ul></td>
      </tr>
    </table>

### `<amp-selector>` seçenekleriyle ilgili özellikler <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Seçeneğin belirlenebilir olduğunu gösterir.  Bir değer belirtilirse değerin içeriği formla birlikte gönderilir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Bu özellikler, standart HTML öğesi gibi davranır.[<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## Etkinlikler <a name="events"></a>

Etkinlikler, `on` özelliğini kullanan diğer AMP bileşenlerinde işlemleri tetikleyebilir.
Ör. `on="select: my-tab.show"`

[AMP İşlemleri ve Etkinlikler](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) hakkında daha fazla bilgi edinin.

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code>, kullanıcı bir seçenek belirlediğinde <code>select</code> etkinliğini tetikler.
        Çoklu ve tekli seçiciler, seçenekler belirlenirken veya seçimler kaldırılırken bunu tetikler.
        Devre dışı seçeneklere dokunulması <code>select</code> etkinliğini tetiklemez.
        <ul>
        <li>
          `<code>event.targetOption</code>, seçili öğenin <code>option</code> özellik değerini içerir.</li>
          <li>
            <code>event.selectedOptions</code>, tüm seçili öğelerin bir <code>option</code> özellik değerleri dizisini içerir.
          </li>
        </ul></td>
      </tr>

    </table>

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-selector kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-selector/validator-amp-selector.protoascii) bakın.
