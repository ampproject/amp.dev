---
'$title': AMPHTML Yerleşim Sistemi
$order: 1
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: 'Genel bakış '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

## Genel bakış

Düzen sisteminin temel amacı, AMP öğelerinin düzenlerini ifade edebilmelerini sağlamaktır. Böylece çalışma zamanı, JavaScript ve veri çağrıları gibi herhangi bir uzak kaynak tamamlanmadan önce öğelerin boyutlandırılmasını sağlayabilir. Bu, jank'ın oluşturulmasını ve kaydırılmasını önemli ölçüde azalttığı için önemlidir.

Bu düşünceyle, AMP Yerleşim Sisteminin iyi performans garantisi sunan birkaç ama esnek yerleşim desteklemek için tasarlanmıştır. Bu sistem, öğenin düzenini ve boyutlandırma ihtiyaçlarını ifade etmek için {`layout`, `width`, `height`, `sizes` ve `heights` gibi bir dizi özniteliğe dayanır.

## Davranış <a name="behavior"></a>

Kapsayıcı olmayan bir AMP öğesi (yani, `layout != container`), bir yer tutucu haricinde tüm alt öğelerinin gizlendiği çözümlenmemiş/oluşturulmamış modda başlar (`yer tutucu` özelliğine bakın). Öğeyi tam olarak oluşturmak için gereken JavaScript ve veri yükü hâlâ indiriliyor ve başlatılıyor olabilir, ancak AMP çalışma zamanı yalnızca CSS sınıflarına ve `layout`, `width`, `height` ve `media` özelliklerine dayanarak öğenin nasıl boyutlandırılacağını ve yerleştirileceğini zaten biliyor. Çoğu durumda, bir `placeholder`, belirtilmişse, öğenin tüm alanını alacak şekilde boyutlandırılır ve konumlandırılır.

`placeholder`, öğe oluşturulur ve ilk düzeni tamamlanır tamamlanmaz gizlenir. Bu noktada, öğenin tüm alt öğelerinin uygun şekilde inşa edilmesi ve konumlandırılması ve görüntülenmeye ve okuyucunun girişini kabul etmeye hazır olması beklenir. Bu, varsayılan davranıştır. Her öğe, örneğin `placeholder` daha hızlı gizlemek veya daha uzun süre tutmak için geçersiz kılabilir.

Öğe, çalışma zamanına göre `layout` , `width` , `height` ve `media` niteliklerine göre boyutlandırılır ve görüntülenir. Tüm yerleşim kuralları, CSS aracılığıyla dahili olarak uygulanır. Boyutu CSS stilleri aracılığıyla anlaşılabiliyorsa ve alt öğelerine göre değişmiyorsa öğenin "boyutu tanımladığı" söylenir: hemen kullanılabilir veya dinamik olarak eklenir. Bu, bu öğenin boyutunun değişemeyeceği anlamına gelmez. Yerleşim; `responsive` , `fixed-height` , `fill` ve `flex-item` öğe yerleşimlerinde olduğu gibi tamamen duyarlı olabilir. Bu sadece boyutun açık bir kullanıcı eylemi olmadan değişmediği anlamına gelir, örneğin işleme, kaydırma veya indirme işlemi sırasında.

Öğe yanlış yapılandırılmışsa, PROD'da hiç oluşturulmaz ve DEV modunda çalışma zamanı öğeyi hata durumunda oluşturur. Olası hatalar, `layout`, `width` ve `height` özniteliklerinin geçersiz veya desteklenmeyen değerlerini içerir.

## Yerleşim Öznitelikleri <a name="layout-attributes"></a>

### `width` ve `height` <a name="width-and-height"></a>

`layout` özniteliğinin değerine bağlı olarak, amp bileşen öğelerinin bir tamsayı piksel değeri içeren bir `width` ve `height` özniteliğine sahip olması gerekir. Gerçek yerleşim davranışı, aşağıda açıklandığı gibi `layout` özniteliği tarafından belirlenir.

Bazı durumlarda, `width` veya `height` belirtilmemişse, AMP çalışma zamanı bu değerleri aşağıdaki gibi varsayılan olarak ayarlayabilir:

- `amp-pixel`: Hem `width` hem de `height` varsayılan olarak 0'dır.
- `amp-audio`: Varsayılan `width` ve `height` tarayıcıdan çıkarılır.

### `layout` <a name="layout"></a>

AMP, bir AMP bileşeninin belge düzeninde nasıl davrandığını belirten bir dizi yerleşim sağlar. Aşağıdaki tabloda belirtilen değerlerden biriyle `layout` niteliği ekleyerek bir bileşen için bir yerleşim belirtebilirsiniz.

**Örnek**: En boy oranını belirlemek için genişlik ve yüksekliğin kullanıldığı basit, duyarlı bir resim.

[sourcecode:html]
<amp-img
src="/img/amp.jpg"
width="1080"
height="610"
layout="responsive"
alt="an image"

> </amp-img>
> [/sourcecode]

`layout` özelliği için desteklenen değerler:

<table>
  <thead>
    <tr>
      <th width="30%">Değer</th>
      <th>Davranış ve Gereksinimler</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mevcut değil</td>
      <td>Değer belirtilmezse, bileşenin yerleşimi şu şekilde çıkarılır:<br><ul>           <li>
<code>height</code> mevcutsa ve <code>width</code> yoksa veya <code>auto</code>, otomatik olarak ayarlanmışsa,<code>fixed-height</code> yerleşimi varsayılır.</li>   <li> <code>sizes</code> veya <code>heights</code> özellikleriyle birlikte <code>width</code> ve <code>height</code> mevcutsa, <code>responsive</code> yerleşim varsayılır.</li>
<br><li>
<code>width</code> ve <code>height</code> varsa, <code>fixed</code> yerleşim varsayılır.</li>    <li> <code>width</code> ve <code>height</code> yoksa, <code>container</code> yerleşimi varsayılır.</li>         </ul>
</td>
    </tr>
    <tr>
      <td><code>container</code></td>
      <td>Öğe, normal bir HTML <code>div</code> gibi alt öğelerinin boyutunu tanımlamasına izin verir. Bileşenin belirli bir yerleşime sahip olmadığı, yalnızca bir kapsayıcı görevi gördüğü varsayılır; altındakiler hemen işlenir.</td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Öğe, hem genişlik hem de yükseklik olarak kullanabileceği alanı kaplar. Başka bir deyişle, bir <code>fill</code> öğesinin düzeni ve boyutu, üst öğesiyle eşleşir. Bir öğenin üst kabını doldurması için, "doldurma" yerleşimini belirtin ve ana kapsayıcının <code>position:relative</code> veya <code>position:absolute</code> değerini belirttiğinden emin olun.</td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Öğe, yanıt verme desteklenmeyen sabit bir genişliğe ve yüksekliğe sahiptir. <code>width</code> ve <code>height</code> özellikleri mevcut olmalıdır. Tek istisna, <code>amp-pixel</code> ve <code>amp-audio</code> bileşenleridir.</td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>Öğe, kullanabileceği alanı alır ancak yüksekliği değiştirmeden tutar. Bu yerleşim, yatay olarak konumlandırılmış içeriği içeren <code>amp-carousel</code> gibi öğeler için iyi çalışır. <code>height</code> özelliği mevcut olmalıdır. <code>width</code> özelliği mevcut olmamalı veya <code>auto</code> ile eşit olmalıdır.</td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>
<code>flex-item</code> yerleşim türüne sahip üst öğesindeki öğe ve diğer öğeler, ana esnek bir kapsayıcı olduğunda (yani, <code>display: flex</code>) üst kapsayıcının kalan alanını alır. <code>width</code> ve <code>height</code> nitelikleri gerekli değildir.</td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Öğe, kullanabileceği alanı alır ve <code>amp-img</code>'ye aktarılan <code>width</code> ve <code>height</code> özellikleriyle tanımlanan öğenin boyutuna ulaşana veya erişene <em>kadar</em> yüksekliğini `width` ve `height` özelliklerinin verdiği en boy oranına otomatik olarak yeniden boyutlandırır. `max-width` gibi bir CSS kısıtlaması. Genişlik ve yükseklik özellikleri mevcut olmalıdır. Bu düzen, <code>amp-img</code>, <code>amp-carousel</code> vb. dahil çoğu AMP öğesi için çok iyi çalışır. Kullanılabilir alan ana öğeye bağlıdır ve ayrıca <code>max-width</code> CSS kullanılarak özelleştirilebilir. Bu yerleşim, kendine özgü bir yükseklik ve genişliğe sahip olmasıyla <code>responsive</code>'dan farklıdır. Bu, <code>responsive</code> yerleşimin 0x0 oluşturacağı ve <code>intrinsic</code> yerleşimin doğal boyutunun veya herhangi bir CSS kısıtlamasının daha küçük olmasına neden olacağı yüzen bir öğenin içinde en belirgindir.</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Öğe görüntülenmez ve ekran stili <code>none</code> gibi ekranda sıfır yer kaplar. Bu düzen her AMP elemanına uygulanabilir. Öğenin kendisini kullanıcı eyleminde gösterebileceği varsayılmaktadır (örneğin, <code>amp-lightbox</code>). <code>width</code> ve <code>height</code> öznitelikleri gerekli değildir.</td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Öğe, kullanabileceği alanı alır ve yüksekliğini otomatik olarak <code>width</code> ve <code>height</code> özelliklerinin verdiği en boy oranına yeniden boyutlandırır. Bu düzen, <code>amp-img</code>, <code>amp-video</code> vb. dahil çoğu AMP öğesi için çok iyi çalışır. Kullanılabilir alan ana öğeye bağlıdır ve ayrıca <code>max-width</code> CSS kullanılarak özelleştirilebilir. <code>width</code> ve <code>height</code> özellikleri mevcut olmalıdır.<br><br><p><strong>Not</strong>: <code>"layout=responsive"</code> özelliğine sahip öğelerin gerçek boyutu yoktur. Elemanın boyutu, kapsayıcı elemanı ile belirlenir. AMP öğenizin görüntülendiğinden emin olmak için, içeren öğe için bir genişlik ve yükseklik belirtmelisiniz. AMP öğesinin görünümünü geçersiz kılarak AMP öğesini görünmez hale getireceğinden, içeren öğede <code>"display:table"</code> belirtmeyin.</p>
</td>
    </tr>
  </tbody>
</table>

### `sizes` <a name="sizes"></a>

`responsive` yerleşimi destekleyen tüm AMP öğeleri, aynı zamanda `sizes` özelliğini de destekler. Bu özniteliğin değeri, [img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)'da açıklandığı gibi bir boyut ifadesidir. Ancak yalnızca resimleri değil tüm öğeleri kapsar. Kısacası, `sizes` özelliği, ortam koşullarına bağlı olarak öğenin genişliğinin nasıl hesaplandığını açıklar.

`sizes` özelliği `width` ve `height` ile birlikte belirtildiğinde, `layout` varsayılan olarak `responsive` olacak şekilde ayarlanır.

**Örnek**: `sizes` özniteliğini kullanma

Aşağıdaki örnekte, görüntü alanı `320px`'den daha genişse, görüntü 320 piksel genişliğinde olacaktır, aksi takdirde 100vw genişliğinde olacaktır (görüntü alanı genişliğinin %100'ü).

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"

> </amp-img>
> [/sourcecode]

### `disable-inline-width` <a name="disable-inline-width"></a>

`sizes` özelliği kendi başına öğede satır içi `width` stilini ayarlar. `disable-inline-width` ile `sizes` eşleştirirken, AMP öğesi, `sizes` değerini, bir `amp-img` içinde yuvalanmış `img`'de olduğu gibi, <code>sizes</code> değerini genellikle AMP'de kendi başına yaptığı şekilde satır içi `width` <strong>ayarlamadan</strong> öğenin temelindeki etikete yayar.

**Örnek**: `disable-inline-width` özniteliğini kullanma

Aşağıdaki örnekte, `<amp-img>` öğesinin genişliği etkilenmez ve `sizes` yalnızca `srcset` kaynaklarından birini seçmek için kullanılır.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="400"
height="300"
layout="responsive"
sizes="(min-width: 320px) 320px, 100vw"
disable-inline-width

> </amp-img>
> [/sourcecode]

### `heights` <a name="heights"></a>

`responsive` yerleşimi destekleyen tüm AMP öğeleri, aynı zamanda `heights` özelliğini de destekler. Bu özelliğin değeri, [img sizes özelliğine](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) benzer şekilde medya ifadelerine dayalı, ancak iki temel farkla birlikte bir boyut ifadesidir:

1. Öğenin genişliğine değil, yüksekliğine uygulanır.
2. Yüzde değerlerine izin verilir, ör. `86%`. Yüzde değeri kullanılıyorsa, öğenin genişliğinin yüzdesini gösterir.

`heights` özelliği `width` ve `height` ile birlikte belirtildiğinde, `layout` varsayılan olarak `responsive` ayarlanır.

**Örnek**: `heights` özniteliğini kullanma

Aşağıdaki örnekte, görüntünün yüksekliği varsayılan olarak genişliğin %80'i kadardır, ancak görüntü alanı `500px`'den daha genişse, yükseklik `200px` ile sınırlandırılır. `heights` özelliği `width` ve `height` ile birlikte belirtildiğinden, yerleşim varsayılan olarak `responsive` olur.

[sourcecode:html]
<amp-img
src="https://acme.org/image1.png"
width="320"
height="256"
heights="(min-width:500px) 200px, 80%"

> </amp-img>
> [/sourcecode]

### `media` <a name="media"></a>

Çoğu AMP öğesi, `media` özelliğini destekler. `media` değeri bir medya sorgusudur. Sorgu eşleşmezse, öğe hiç oluşturulmaz hem kaynaklar hem de potansiyel olarak alt kaynaklar getirilmez. Tarayıcı penceresinin boyutu veya yönü değişirse, medya sorguları yeniden değerlendirilir ve öğeler gizlenir ve yeni sonuçlara göre gösterilir.

**Örnek**: `media` özniteliğini kullanma

Aşağıdaki örnekte, birbirini dışlayan medya sorguları içeren 2 resmimiz var. Ekran genişliğine bağlı olarak, iki görüntüden biri alınacak ve işlenecektir. `media` özelliği tüm AMP öğelerinde mevcuttur, bu nedenle reklamlar gibi resim olmayan öğelerle kullanılabilir.

[sourcecode:html]
<amp-img
media="(min-width: 650px)"
src="wide.jpg"
width="466"
height="355"
layout="responsive"

> </amp-img>
> <amp-img
>   media="(max-width: 649px)"
>   src="narrow.jpg"
>   width="527"
>   height="193"
>   layout="responsive"
> </amp-img>
> [/sourcecode]

### `placeholder` <a name="placeholder"></a>

`placeholder` özelliği, yalnızca AMP öğelerinde değil, herhangi bir HTML öğesinde de ayarlanabilir. `placeholder` özelliği, bu öznitelikle işaretlenen öğenin ana AMP öğesi için bir yer tutucu görevi gördüğünü belirtir. Belirtilirse, bir yer tutucu öğe, AMP öğesinin doğrudan alt öğesi olmalıdır. Varsayılan olarak placeholder, AMP öğesinin kaynakları indirilmemiş veya başlatılmamış olsa bile, AMP öğesi için hemen gösterilir. AMP öğesi hazır olduğunda genellikle placeholder'ı gizler ve içeriği gösterir. placeholder'a göre tam davranış, öğenin uygulanmasına bağlıdır.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
<amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

### `fallback` <a name="fallback"></a>

`fallback` özniteliği, yalnızca AMP öğelerinde değil, herhangi bir HTML öğesinde de ayarlanabilir. Geri dönüş, öğenin okuyucuya tarayıcının öğeyi desteklemediğini bildirmesine olanak tanıyan bir kuraldır. Belirtilirse, yedek öğe, AMP öğesinin doğrudan alt öğesi olmalıdır. Geri dönüşle ilgili kesin davranış, öğenin uygulanmasına bağlıdır.

[sourcecode:html]
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">

  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
[/sourcecode]

### `noloading` <a name="noloading"></a>

`noloading` özelliği, bu öğe için "yükleme göstergesinin" kapatılıp kapatılmayacağını belirtir. Çoğu AMP öğesinin, öğenin henüz tam olarak yüklenmediğini gösteren temel bir animasyon olan bir "yükleme göstergesi" göstermesine izin verilir. Öğeler, bu özelliği ekleyerek bu davranışı devre dışı bırakabilir.

## (tl;dr) Yerleşim Gereksinimlerinin ve Davranışlarının Özeti <a name="tldr-summary-of-layout-requirements--behaviors"></a>

Aşağıdaki tablo, `layout` niteliği için kullanılan kabul edilebilir parametreleri, CSS sınıflarını ve stilleri açıklamaktadır. Bunları unutmayın:

1. Öneki `-amp-` ile işaretlenmiş tüm CSS sınıfları ve ön eki `i-amp-` olan öğeler, AMP'ye dahil olarak kabul edilir ve bunların kullanıcı stil sayfalarında kullanımına izin verilmez. Burada sadece bilgi amaçlı gösterilmektedir.
2. Tabloda gerektiği gibi `width` ve `height` belirtilmiş olsa da, varsayılan kurallar `amp-pixel` ve `amp-audio`'da olduğu gibi geçerli olabilir.

<table>
  <thead>
    <tr>
      <th width="21%">Yerleşim</th>
      <th width="20%">Genişlik/<br>Yükseklik gerekli mi?</th>
      <th width="20%">Boyut tanımlanır mı?</th>
      <th width="20%">Ek Öğeler</th>
      <th width="19%">CSS "display"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>container</code></td>
      <td>Hayır</td>
      <td>Hayır</td>
      <td>Hayır</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fill</code></td>
      <td>Hayır</td>
      <td>Evet, ana öğenin boyutu.</td>
      <td>Hayır</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>fixed</code></td>
      <td>Evet</td>
      <td>Evet, <code>width</code> ve <code>height</code> ile belirtilmiştir.</td>
      <td>Hayır</td>
      <td><code>inline-block</code></td>
    </tr>
    <tr>
      <td><code>fixed-height</code></td>
      <td>sadece <code>height</code>; <code>width</code>  <code>auto</code> olabilir</td>
      <td>Evet, ana kapsayıcı ve <code>height</code> tarafından belirtilir.</td>
      <td>Hayır</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>flex-item</code></td>
      <td>Hayır</td>
      <td>Hayır</td>
      <td>Evet, ana kapsayıcıya göre.</td>
      <td><code>block</code></td>
    </tr>
    <tr>
      <td><code>intrinsic</code></td>
      <td>Evet</td>
      <td>Evet, ana kapsayıcıya ve <code>width:height</code> en boy oranına bağlıdır.</td>
      <td>Evet, <code>i-amphtml-sizer</code>.</td>
      <td> <code>block</code> (<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element" rel="nofollow">değiştirilmiş öğe</a> gibi davranır)</td>
    </tr>
    <tr>
      <td><code>nodisplay</code></td>
      <td>Hayır</td>
      <td>Hayır</td>
      <td>Hayır</td>
      <td><code>none</code></td>
    </tr>
    <tr>
      <td><code>responsive</code></td>
      <td>Evet</td>
      <td>Evet, ana kapsayıcıya ve <code>width:height</code> en boy oranına bağlıdır.</td>
      <td>Evet, <code>i-amphtml-sizer</code>.</td>
      <td><code>block</code></td>
    </tr>
  </tbody>
</table>
