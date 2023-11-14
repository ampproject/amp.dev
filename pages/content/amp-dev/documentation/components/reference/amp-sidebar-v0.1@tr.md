---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Gezinme, bağlantılar, düğmeler, menüler gibi geçici erişime yönelik meta içeriği görüntülemenin bir yolunu sağlar.
toc: true
$title: amp-sidebar
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



<table>
  <tr>
    <td width="40%"><strong>Açıklama</strong></td>
    <td>
      Bir kenar çubuğu, geçici erişime yönelik meta içeriği (gezinme bağlantıları, düğmeler, menüler vb.) görüntülemek için bir yol sağlar. Kenar çubuğu, bir düğme dokunuşuyla gösterilirken ana içerik görsel olarak bunun altında kalabilir.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://ampjs.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-sidebar/">amp-sidebar örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Genel Bakış <a name="overview"></a>

`<amp-sidebar>`, geçici erişim için tasarlanmış meta içeriği (gezinme bağlantıları, düğmeler, menüler vb.) gizler. `<amp-sidebar>` düğme dokunuşlarıyla açılıp kapatılabilir ve amp-sidebar öğesinin dışındaki alana dokunularak kapatılabilir.
Bununla birlikte, medya sorgularını kabul eden isteğe bağlı özellikler, sitenin diğer bölümlerindeki meta içeriği görüntülemek için kullanılabilir. Alt `<nav toolbar="(media query)" toolbar-target="elementID">` öğeleri, kenar çubuğundaki içeriğin ana içeriğin diğer bölümlerinde görüntülenmesine olanak tanır.

## Davranış <a name="behavior"></a>

* `<amp-sidebar>`, `<body>` öğesinin doğrudan bir alt öğesi olmalıdır.
* Kenar çubuğu yalnızca bir sayfanın sol veya sağ tarafında görünebilir.
* `<amp-sidebar>`, (AMP tarafından desteklenir) geçerli herhangi bir HTML öğesi içerebilir.
* `<amp-sidebar>`, aşağıdaki AMP öğelerinden herhangi birini içerebilir:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* Kenar çubuğunun maksimum yüksekliği 100 vh'dir. Yükseklik 100 vh'yi geçerse bir dikey kaydırma çubuğu görünür. Varsayılan yükseklik CSS'de 100 vh olarak ayarlanır ve bu değer geçersiz kılınabilir.
* Kenar çubuğunun genişliği CSS kullanılarak belirtilebilir ve ayarlanabilir (minimum genişlik 45 pikseldir).
* `amp-sidebar` özelliğinde ve kenar çubuğu açıkken maskesinde dokunarak yakınlaştırma devre dışıdır.

*Örnek:*

Aşağıdaki örnekte gezinme öğelerini içermek için `amp-sidebar` özelliğini kullandık. Bununla birlikte, ikinci ve dördüncü öğe (Nav Item 2 ve Nav Item 4), sayfada bulunan öğe kimliğine atanmıştır. [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) özelliği sayesinde, öğe kimliğini ve `scrollTo` özelliğini kullanarak görünümü hızlı bir şekilde öğeye kaydırabiliriz.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Kenar çubuğunu açma ve kapatma <a name="opening-and-closing-the-sidebar"></a>

Bir öğeye dokunulduğunda veya bir öğe tıklandığında kenar çubuğuna geçiş yapmak, kenar çubuğunu açmak veya kapatmak için öğede [`on`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) işlem özelliğini ayarlayın ve aşağıdaki işlem yöntemlerinden birini belirtin:

<table>
  <tr>
    <th>İşlem</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td>open (varsayılan)</td>
    <td>Kenar çubuğunu açar</td>
  </tr>
  <tr>
    <td>close</td>
    <td>Kenar çubuğunu kapatır</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>Kenar çubuğu durumunu değiştirir</td>
  </tr>
</table>

Kullanıcı kısmen görünür olan ana içerik alanına geri dokunursa kenar çubuğu kapanır.

Alternatif olarak, kenar çubuğunu klavyedeki çıkış tuşuna basarak da kapatabilirsiniz.

*Örnek:*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Araç çubuğu <a name="toolbar"></a>

Bir medya sorgusuyla `toolbar` özelliğini ve `<amp-sidebar>` öğesinin alt öğesi olan bir `<nav>` öğesinde, bir öğe kimliğiyle `toolbar-target` özelliğini belirterek, `<body>` öğesinde görüntülenen bir `toolbar` öğesi oluşturabilirsiniz. `toolbar`, `<nav>` öğesini ve alt öğelerini kopyalar ve öğeyi, `toolbar-target` öğesinin sonuna ekler.

#### Davranış <a name="behavior-1"></a>

* Kenar çubuğu, `toolbar` ve `toolbar-target` özelliklerine sahip nav öğeleri ekleyerek araç çubukları uygulayabilir.
* nav öğesi, `<amp-sidebar>` bileşeninin bir alt öğesi ve şu biçimde olmalıdır: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Örneğin, şu geçerli bir araç çubuğu kullanımı olur: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* Araç çubuğu özelliğini içeren nav bileşeni, `<li>` öğelerini içeren tek bir `<ul>` öğesi içermelidir.
    * `<li>` öğeleri, geçerli herhangi bir HTML öğesini (AMP tarafından desteklenir) veya `<amp-sidebar>` özelliğinin desteklediği AMP öğelerinden herhangi birini içerebilir.</li>
* Araç çubuğu davranışı yalnızca `toolbar` özelliği medya sorgusu geçerliyken uygulanır. Ayrıca, araç çubuğunun uygulanabilmesi için sayfada `toolbar-target` özellik kimliğine sahip bir öğe bulunmalıdır.

*Örnek: Temel Araç Çubuğu*

Aşağıdaki örnekte, pencere genişliği 767 pikselden az veya bu değere eşitse bir `toolbar` görüntülenir. `toolbar`, bir arama girişi öğesi içerir. `toolbar` öğesi, `<div id="target-element">` öğesinin sonuna eklenir.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Arama..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## Araç Çubuğunu Şekillendirme <a name="styling-toolbar"></a>

`<amp-sidebar>` öğesinin içindeki `toolbar` öğesi, `toolbar-target` öğesinin gösterilmesine veya gizlenmesine bağlı olarak öğeye uygulanan sınıflara sahiptir. Bu, `toolbar` öğesinde ve ardından, `toolbar-target` öğesinde farklı stilleri uygulamak açısından faydalıdır. Sınıflar, `amp-sidebar-toolbar-target-shown` ve `amp-sidebar-toolbar-target-hidden` sınıflarıdır. `amp-sidebar-toolbar-target-shown` sınıfı, `toolbar-target` öğesi gösterildiğinde `toolbar` öğesine uygulanır. `amp-sidebar-toolbar-target-hidden` sınıfı, `toolbar-target` öğesi gizlendiğinde `toolbar` öğesine uygulanır.

*Örnek: Araç Çubuğu Durumu Sınıfları*

Aşağıdaki örnekte, pencere genişliği 767 pikselden az veya bu değere eşitse bir `toolbar` görüntülenir. `toolbar`, bir arama girişi öğesi içerir. `toolbar` öğesi, `<div id="target-element">` öğesinin sonuna eklenir. Ancak, `<div id="toolbar-target">` öğesi gösterildiğinde `toolbar` öğesini gizlemek için bazı özel stiller ekledik.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Arama..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="success"]
[Örneklerle AMP](https://ampbyexample.com/components/amp-sidebar/) sayfasında canlı demoları görebilirsiniz.
[/tip]

## Haberler için Kenar Çubuğu <a name="sidebar-for-stories"></a>

`amp-story` [bileşeni](../../../about/stories.html) içinde `amp-sidebar` kullanımı desteklenir.

### Davranış <a name="behavior-2"></a>

* `<amp-sidebar>`, `<amp-story>` öğesinin doğrudan bir alt öğesi olmalıdır.
* Kenar çubuğu, normal AMP dokümanları için varsayılan olarak "başlangıç noktası"na; diğer bir deyişle, soldan sağa diller için sağa, sağdan sola diller için sola ayarlanır.
* `<amp-sidebar>` öğesinin varsayılan arka plan rengi beyazdır ve CSS'de bu değer geçersiz kılınabilir.
* Maksimum `<amp-sidebar>` genişliği `280px` ve masaüstü deneyimleri için `320px` değerinde uygulanır.
* Haber kullanıcı arayüzünde, kenar çubuğunu açan/kapatan "hamburger" stilinde bir düğme görünür.

Haber platformu genelinde tutarlı bir kullanıcı arayüzü deneyimi sağlamak için hangi özelliklere ve detaylara izin verileceği konusunda belirli kısıtlamalar vardır. Aşağıda, `amp-story` içindeki bir `amp-sidebar` öğesinin izin verilen özellikleri ve detayları gösterilmektedir.

### İzin Verilen Özellikler <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [common attributes](#common)

*Örnek: Bir Haberde Temel Kenar Çubuğu*

Aşağıdaki örnekte, `amp-story` içindeki basit bir `amp-sidebar` gösterilmektedir.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Özellikler <a name="attributes"></a>

##### side <a name="side"></a>

Kenar çubuğunun sayfanın solundan mı (`left`) yoksa sağından mı (`right`) açılması gerektiğini belirtir.  Bir `side` değerinin belirtilmemesi durumunda, `side` değeri `body` etiketinin `dir` özelliğinden devralınır (`ltr` => `left` , `rtl` => `right`); `dir` özelliği yoksa `side` özelliği varsayılan olarak `left` değerine ayarlanır.

##### layout <a name="layout"></a>

Kenar çubuğunun görüntüleme düzenini belirtir; `nodisplay` değerinde olmalıdır.

##### open <a name="open"></a>

Bu özellik, kenar çubuğu açıkken mevcuttur.

##### data-close-button-aria-label <a name="data"></a>

Erişilebilirlik amacıyla eklenen kapat düğmesinin ARIA etiketini ayarlamak için kullanılan isteğe bağlı özellik.

##### toolbar <a name="toolbar-1"></a>

Bu özellik, alt `<nav toolbar="(media-query)" toolbar-target="elementID">` öğelerinde bulunur ve bir araç çubuğunun ne zaman gösterileceğine yönelik bir medya sorgusunu kabul eder. Araç çubuklarını kullanma hakkında daha fazla bilgi için [Araç Çubuğu](#toolbar-1) bölümüne bakın.

##### toolbar-target <a name="toolbar-target"></a>

Bu özellik, alt `<nav toolbar="(media-query)" toolbar-target="elementID">` öğesinde bulunur ve sayfadaki bir öğenin kimliğini kabul eder.  `toolbar-target` özelliği, araç çubuğunu varsayılan araç çubuğu stilini kullanmadan, sayfadaki öğenin belirtilen kimliğine yerleştirir. Araç çubuklarını kullanma hakkında daha fazla bilgi için [Araç Çubuğu](#toolbar-1) bölümüne bakın.

##### common attributes <a name="common"></a>

Bu öğe, AMP bileşenlerine genişletilmiş [ortak özellikleri](../../../documentation/guides-and-tutorials/learn/common_attributes.md) içerir.

## Stil <a name="styling"></a>

`amp-sidebar` bileşenine, standart CSS ile stil eklenebilir.

* `amp-sidebar` öğesinin `width` değeri, önceden ayarlanmış min(45px) ve max(80vw) değerleri arasına ayarlanabilir.
* `amp-sidebar` yüksekliği, gerekirse kenar çubuğunun yüksekliğine ayarlanabilir. Yükseklik 100vw değerini geçerse kenar çubuğunda bir dikey kaydırma çubuğu görünür. Kenar çubuğunun önceden ayarlanmış yüksekliği 100vw'dir ve CSS'de geçersiz kılınarak kısaltılabilir.
* Kenar çubuğunun geçerli durumu, kenar çubuğu sayfada açıkken `amp-sidebar` etiketinde ayarlanan `open` özelliği aracılığıyla gösterilir.

[tip type="success"]
AMP sayfalarınızda kullanabileceğiniz duyarlı, önceden şekillendirilmiş gezinme menüleri için [AMP Start](https://ampstart.com/components#navigation) sayfasını ziyaret edin.
[/tip]

## Taşan alanların içinde otomatik kaydırma <a name="auto-scrolling-within-overflowing-areas"></a>

`amp-sidebar`, kenar çubuğu ve araç çubuğu örneklerinde özellik olarak kullanılan `autoscroll` öğesiyle, taşan kapsayıcıyı otomatik olarak ilk öğeye kaydırabilir.

Bu özellik, uzun gezinme listeleriyle uğraşırken, sayfa yüklendiğinde kenar çubuğunun geçerli gezinme öğelerine kaydırılmasını istiyorsanız yararlı olur.

`toolbar` özelliğini kullanırken, `autoscroll` yalnızca `<nav toolbar>` öğesi `overflow: auto` veya `overflow: scroll` değerine ayarlanırsa çalışır.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

Çalışan bir örnek kod için lütfen [bu örnek dosyasına](https://github.com/ampproject/amphtml/blob/main/examples/amp-sidebar-autoscroll.amp.html) bakın.

## Kullanıcı deneyimi ile ilgili dikkat edilmesi gereken noktalar <a name="ux-considerations"></a>

`<amp-sidebar>` öğesini kullanırken, kullanıcılarınızın sayfanızı sık sık mobil cihazlarda bir AMP görüntüleyicide görüntüleyeceğini ve bu durumda, sabit konumlu bir üstbilgi gösterilebileceğini unutmayın. Buna ek olarak, tarayıcılar genellikle sayfanın üst kısmında kendi sabit üstbilgilerini görüntüler. Ekranın üst kısmına başka bir sabit konumlu öğe eklemeniz, mobil ekran alanının büyük bir kısmını kullanıcıya yeni bilgi sağlamayan içerikle kaplayacaktır.

Bu nedenle, kenar çubuğunu açmaya yönelik olanakların sabit, tam genişlikli bir üstbilgiye yerleştirilmemesini öneririz.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-sidebar kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-sidebar/validator-amp-sidebar.protoascii) bakın.
