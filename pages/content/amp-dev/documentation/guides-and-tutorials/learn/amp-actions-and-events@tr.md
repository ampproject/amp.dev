---
'$title': Eylemler ve olaylar
$order: 0
formats:
  - websites
  - stories
  - ads
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

[tip type="note"] Bu belgeleme web siteleri, hikayeler ve reklamlar için eylemleri ve olayları kapsar. AMP e-posta biçimi için [AMP e-postasında eylemler ve olaylar](https://github.com/ampproject/amphtml/blob/main/spec/amp-email-actions-and-events.md) sayfasını okuyun. [/tip]

`on` özniteliği, öğelerde olay işleyicisi yüklemek için kullanılır. Desteklenen olaylar, öğelere bağlıdır.

Sözdiziminin değeri, formun etki alanına özgü basit bir dilidir:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Sözdiziminin her bir parçasının açıklamaları için aşağıdaki tabloya bakın.

<table>
  <tr>
    <th width="30%">Sözdizimi</th>
    <th width="18%">Gerekli mi?</th>
    <th width="42%">Açıklama</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>evet</td>
    <td>Bu, bir öğenin gösterdiği olayın adıdır.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>evet</td>
    <td>Bu, öğe için bir DOM kimliği ya da olaya yanıt olarak üzerinde bir eylem yürütmek isteyeceğiniz ön tanımlı <a href="#special-targets">özel hedeftir</a>. Aşağıdaki örnekte, <code>targetId</code> öğesi, <code>amp-lightbox</code> hedefi <code>photo-slides</code> için DOM kimliğidir. <pre>&lt;amp-lightbox id="photo-slides">&lt;/amp-lightbox> &lt;button on="tap:photo-slides">Resimleri Göster &lt;/button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>hayır</td>
    <td>Varsayılan eylemleri olan öğeler içindir.<p>Bu sözdizimi, hedef öğenin (<code>targetId</code> ile referansı verilen) gösterdiği ve bir olay tetiklendiğinde yürütmek isteyeceğiniz yöntemdir.</p> <p>AMP'nin öğelerin uygulayabileceği bir varsayılan konsepti vardır. Yani <code>methodName</code> çıkarıldığında, AMP bu varsayılan yöntemi uygulayacaktır.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>hayır</td>
    <td>Bazı eylemler belgelenmişlerse, argüman kabul edebilirler. Argümanlar, <code>key=value</code> gösterimde parantez için tanımlanır. Kabul edilen değerler: <ul> <li>tırnak içinde olmayan basit metin dizeleri: <code>simple-value</code> </li> <li>tırnak içindeki metin dizeleri: <code>"string value"</code> veya <code>'string value'</code> </li> <li>boole değerleri: <code>true</code> veya <code>false</code> </li> <li>numbers: <code>11</code> veya <code>1.1</code> </li> <li>olay verilerine dot-syntax referansı: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## Birden fazla olayı işleme <a name="handling-multiple-events"></a>

Olayları noktalı virgül `;` ile ayırarak bir öğede birden fazla olayı dinleyebilirsiniz.

Örnek: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Tek olay için birden fazla eylem <a name="multiple-actions-for-one-event"></a>

Eylemleri ',' virgül ile ayırarak aynı eylem için sıralı olarak birden fazla eylem yürütebilirsiniz.

Örnek: `on="tap:target1.actionA,target2.actionB"`

## Genel olarak tanımlı etkinlikler ve eylemler <a name="globally-defined-events-and-actions"></a>

AMPher türlü HTML öğesinde (AMP öğeleri dahil) dinleyebileceğiniz bir `tap` olayını genel olarak tanımlar.

AMP ayrıca herhangi bir HTML öğesinde tetikleyebileceğiniz `hide`, `show` ve `toggleVisibility` eylemlerini de genel olarak tanımlar.

[tip type="note"]

Bir öğe ancak önceden `hide` veya `toggleVisibility` eylemiyle gizlenmişse ya da [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) özniteliği kullanılmışsa gösterilebilir. `show` eylemi CSS `display:none` veya AMP'nin `layout=nodisplay` öğesi tarafından gizlenen öğeleri desteklemez.

Örneğin, aşağıdaki, AMP'de mümkündür:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## Öğeye özgü olaylar <a name="element-specific-events"></a>

### \* - tüm öğeler <a name="---all-elements"></a>

<table>
  <tr>
    <th>Olay</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Öğeye tıklandığında/dokunulduğunda tetiklenir.</td>
  </tr>
</table>

### Giriş öğeleri <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Olay</th>
    <th width="30%">Açıklama</th>
    <th width="40%">Öğeler</th>
    <th>Veri</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Öğe değeri değiştirildiğinde ve bu değişiklik uygulandığında tetiklenir. <p> Veri özellikleri <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> ve <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a> sayfalarındakini kopyalar.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>Öğenin değeri değiştirildiğinde tetiklenir. Bu, standart <code>change</code> olayına benzer, ancak yalnızca giriş değerinin değişmesi durduktan sonra 300msn geçtiğinde tetiklenir.</td>
    <td>
<code>input</code> olayını tetikleyen öğeler.</td>
    <td>
<code>change</code> olayı verileriyle aynı.</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>Öğenin değeri değiştirildiğinde tetiklenir. Bu standart <code>change</code> olayına benzer, ancak girişin değeri değişirken en fazla 100msn'de bir kez tetiklenir.</td>
    <td>
<code>input</code> olayını tetikleyen öğeler.</td>
    <td>
<code>change</code> olayı verileriyle aynı.</td>
  </tr>
</table>

### amp-accordion > bölüm <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Akordeon bölümü genişletildiğinde tetiklenir.</td>
    <td>Yok.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Akordeon bölümü küçültüldüğünde tetiklenir.</td>
    <td>Yok.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Döngünün geçerli slaytı değiştiğinde tetiklenir.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>lightbox tam görünür olduğunda tetiklenir.</td>
    <td>Yok</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>lightbox tam kapalı olduğunda tetiklenir.</td>
    <td>Yok</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>
<a href="https://github.com/ampproject/amphtml/blob/main/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">Dinamik yeniden boyutlandırmaya</a> izin vermek için <code>amp-list</code> yerleşimini <code>layout="CONTAINTER"</code> olarak günceller.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(düşük güven)</td>
    <td>Veri getirilemediğinde tetiklenir.</td>
    <td>Yok</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Bir seçenek seçildiğinde veya seçimi kaldırıldığında tetiklenir.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Geçiş sona erdikten sonra kenar çubuğu tamamen açıldığında tetiklenir.</td>
    <td>Yok</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Geçiş sona erdikten sonra kenar çubuğu tamamen kapatıldığında tetiklenir.</td>
    <td>Yok</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(düşük güven)</td>
    <td>Veri getirilemediğinde tetiklenir.</td>
    <td>Yok</td>
  </tr>
</table>

### amp-video, amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(düşük güven)</td>
    <td>Video, kullanıcı tarafından ilk kez oynatıldığında tetiklenir. Otomatik oynatılan videolarda, bu olay, kullanıcı videoyla etkileşime girer girmez tetiklenir. Bu olay düşük güvene sahiptir, yani çoğu eylemi tetikleyemez; yalnızca <code>amp-animation</code> eylemleri gibi düşük güvene sahip eylemleri çalıştırılabilir.</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(düşük güven)</td>
    <td>Bir videonun oynatma konumu değiştiğinde kullanılır. Olayın sıklığı AMP tarafından kontrol edilir ve şu anda 1 saniyelik aralık şeklinde ayarlanmıştır. Bu olay düşük güvene sahiptir, yani çoğu eylemi tetikleyemez; yalnızca <code>amp-animation</code> eylemleri gibi düşük güven gerektiren eylemler çalıştırılabilir.</td>
    <td>
<code>{time, percent}</code><code>time</code> geçerli zamanı saniye cinsinden gösterir, <code>percent</code> 0 ile 1 arasında bir sayıdır ve geçerli konumu toplam zamanın yüzdesi olarak gösterir.</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Olay</th>
    <th width="35%">Açıklama</th>
    <th width="40%">Veriler</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Form gönderildiğinde teslim edilir.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Form gönderme yanıtı başarılı olduğunda tetiklenir.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Form gönderme yanıtı bir hata verdiğinde tetiklenir.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Form geçerli olduğunda tetiklenir.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Form geçersiz olduğunda tetiklenir.</td>
    <td></td>
  </tr>
</table>

## Öğeye özgü eylemler <a name="element-specific-actions"></a>

### \* (tüm öğeler) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Hedef öğeyi gizler.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Hedef öğeyi gösterir. Eğer <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> öğesi</a> sonuç olarak görünür olursa, odak kazanır.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Hedef öğe görünürlüğünü açar veya kapatır. Eğer     <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> öğesi</a> sonuç olarak görünür olursa, odak kazanır.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Hedef öğenin sınıfını değiştirir. <code>force</code> isteğe bağlıdır ve tanımlanırsa, sınıfın yalnızca <code>true</code> olarak ayarlandığında eklenmesini, ancak kaldırılmamasını ve yalnızca <code>false</code> olarak ayarlandığında kaldırılmasını sağlar.</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>Bir öğeyi kaydırarak düzgün bir animasyonla görünür hale getirir. <br><code>duration</code> isteğe bağlıdır. Animasyon uzunluğu milisaniye olarak belirtilir. Belirtilmezse, 500 milisaniyenin altındaki veya ona eşit kaydırma farkına göre bir miktar kullanılır. <br> <code>position</code> isteğe bağlıdır. <code>top</code> , <code>center</code> veya <code>bottom</code> (varsayılan <code>top</code>). Kaydırma işleminden sonra öğenin görünüm penceresine göre konumunu belirtir.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Hedef öğenin odak kazanmasını sağlar. Odağı kaybetmek için başka bir öğe üzerinde <code>focus</code> ile odaklanın (genelde ana öğeye). Erişilebilirlik hususlarından ötürü <code>body</code>/<code>documentElement</code> üzerine odaklanarak odağı kaybetmemenizi tavsiye ediyoruz.</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Sesi oynatır. <code>&lt;amp-audio></code>  öğesi, <code>&lt;amp-story></code> alt öğesiyse işlem yapamaz.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Sesi duraklatır. <code>&lt;amp-audio></code>  öğesi, <code>&lt;amp-story></code> alt öğesiyse işlem yapamaz.</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Animasyonu oynatır.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Animasyonu duraklatır.</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>Animasyonu durdurur.</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>Animasyonun currentTime değerini belirtilen değere ayarlar ve animasyonu duraklatır.</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>Animasyonun currentTime değerini belirtilen değer olarak ayarlamak için verilen yüzde değerini kullanır ve animasyonu duraklatır.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>
<code>amp-accordion</code> bölümlerinin <code>expanded</code> ve <code>collapsed</code> durumlarını değiştirir. Argüman olmadan çağrıldığında, akordeonun tüm bölümlerini değiştirir. Id bölümünü belirterek belirli bir bölümü tetikler:<code>on="tap:myAccordion.toggle(section=</code>
</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Akordeonun bölümlerini genişletir. Bir bölüm zaten genişletilmişse, genişletilmiş olarak kalır. Argüman olmadan çağrıldığında, akordeonun tüm bölümlerini genişletir. Id bölümünü belirterek belirli bir bölümü tetikler:<code>on="tap:myAccordion.expand(section='section-id')"</code>
</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Akordeonun bölümlerini daraltır. Bir bölüm zaten daraltılmışsa, daraltılmış olarak kalır. Argüman olmadan çağrıldığında, akordeonun tüm bölümlerini daraltır. Id bölümünü belirterek belirli bir bölümü tetikler: <code>on="tap:myAccordion.collapse(section='section-id')"</code>
</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Döngüyü belirtilen bir slayt dizinine ilerletir.</td>
  </tr>
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>Döngünün otomatik oynatma durumunu değiştirir. <code>toggleOn</code> isteğe bağlıdır.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Kaynak görüntünün eylemi tetiklediği görüntü lightbox'ını açar.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Lightbox'ı açar.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Lightbox'ı kapatır.</td>
  </tr>
</table>

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>Lightbox-gallery'yi açar. Göründü id belirtilmişse, başka bir öğeye dokunarak tetiklenebilir: `on="tap:amp-lightbox-gallery.open(id='image-id')"`.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Verileri <code>src</code> öğesinden yeniler ve listeyi yeniden işler.</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>Güncellenmiş içeriği göstermek için DOM öğelerini günceller.</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Tanımlanmış bir <code>amp-selector</code> bileşeninden tüm seçimleri temizler.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Seçimi `delta` değeri kadar yukarı taşır. Varsayılan `delta` -1 olarak ayarlanmıştır. Hiçbir seçenek seçilmezse, seçilen durum son seçeneğin değeri olur.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Seçimi `delta` değeri kadar aşağı taşır. Varsayılan `delta` 1 olarak ayarlanır. Hiçbir seçenek seçilmezse, seçilen durum ilk seçeneğin değeri olur.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>`selected` uygulamasını değiştirir. Select özniteliği yoksa, bu eylem onu ekler. Select özniteliği mevcutsa, bu eylem onu kaldırır. `Value` argümanında bir boole değeri ekleyerek bir ekleme veya kaldırma işlemini zorlayabilir ve devam ettirebilirsiniz. `true` değeri, `selected` özniteliğini eklemeye zorlar ve zaten varsa kaldırmaz. `false` değeri özniteliği kaldırır, ancak yoksa eklemez.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Kenar çubuğunu açar.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Kenar çubuğunu kapatır.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Kenar çubuğu durumunu değiştirir.</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>Tarayıcı önbelleğini göz ardı ederken `src` özniteliğindeki verileri yeniden getirir.</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>Başvurulan kullanıcı bildirim öğesini gizler.</td>
  </tr>
</table>

### Video öğeleri <a name="video-elements"></a>

Aşağıdaki eylemler, AMP video öğelerinde desteklenir: `amp-video`, `amp-youtube`, `amp-3q-player`, `amp-brid-player`, `amp-dailymotion`, `amp-delight-player`, `amp-ima-video`.

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>Videoyu oynatır.</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>Videoyu duraklatır.</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>Videoyu sessize alır.</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>Videonun sesini açar.</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>Videoyu tam ekran yapar.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Formun girişlerindeki değerleri siler.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Formu gönderir.</td>
  </tr>
</table>

## Özel hedefler <a name="special-targets"></a>

Aşağıdakiler, AMP sistemi tarafından sağlanan ve özel gereksinimleri olan hedeflerdir:

### Hedef: AMP <a name="target-amp"></a>

`AMP` hedefi AMP çalışma zamanı tarafından sağlanır ve belgenin tamamı için geçerli olan üst düzey eylemleri uygular.

<table>
  <tr>
    <th width="40%">Eylem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>Navigates current window to given URL, to the optional specified target if given (currenly only supporting <code>_top</code> and <code>_blank </code>). The optional <code>opener</code> parameter can be specified when using a target of <code>_blank</code> to allow the newly opened page to access <a><code>window.opener</code></a>. Supports <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md">standard URL substitutions</a>.</p>
      <p><strong>Caveat:</strong> Using normal <code>&lt;a></code> links is recommended wherever possible since <code>AMP.navigateTo</code> is not recognized by web crawlers.</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>İzin veriliyorsa pencereyi kapatmaya çalışır, aksi takdirde <code> navigateTo</code> eylemine benzer şekilde hareket eder. Bir "Geri" düğmesinin, önceki sayfadan yeni bir pencerede açıldıysa pencereyi kapatmasını veya açılmamışsa hareket etmesini gerekebilecek durumlarda kullanışlıdır.</p>
      <p><strong>Caveat:</strong> Using normal <code>&lt;a></code> links is recommended wherever possible since <code>AMP.closeOrNavigateTo</code> is not recognized by web crawlers.</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>Geçmişte geri gider.</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>Geçerli sayfayı yazdırmak için Yazdır İletişim Kutusunu açar.</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>Geçerli sayfada sağlanan öğe ID'sine ilerler.</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>Tüm kapsamlar için İstemci ID oluşturmasından vazgeçer.</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p><a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a> gerektirir.</p>
      <p>Değişmez bir nesneyi bağlanabilir durumuna bağlar.</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p><a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a> gerektirir.</p>
      <p>Değişmez bir nesneyi bağlanabilir durumuna bağlar ve yeni bir girişi tarayıcı geçmiş destesine gönderir. Girişi açmak, değişkenlerin önceki değerlerini geri getirecektir (bu örnekte, <code>foo</code>).</p>
</td>
  </tr>
</table>

<sup>1</sup><a href="#multiple-actions-for-one-event">Çoklu eylemlerle</a> kullanıldığında, sonraki eylemler çağrı öncesinde tamamlanmak üzere <code>setState()</code> veya <code>pushState()</code> eylemini bekleyecektir. Olay başına sadece tek bir <code>setState()</code> veya <code>pushState()</code> eylemine izin verilir.

### Hedef: amp-access <a name="target-amp-access"></a>

`amp-access` hedef, [amp-access](https://amp.dev/documentation/components/amp-access.html) bileşeni tarafından sağlanır.

`amp-access` hedefi üç nedenden dolayı özeldir:

1. Bu hedefe rastgele bir ID veremezsiniz. Hedef her zaman `amp-access` şeklindedir.
2. `amp-access` eylemleri [AMP Access Yapılandırması](https://amp.dev/documentation/components/amp-access#configuration) yapısına bağlı olarak dinamiktir.

`amp-access` hedefinin kullanımına dair [ayrıntıları](https://amp.dev/documentation/components/amp-access#login-link) görüntüleyin.
