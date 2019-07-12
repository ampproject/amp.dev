---
$category@: layout
formats:
- websites
- email
- ads
teaser:
  text: Yatay eksen boyunca birden çok benzer içerik parçası görüntüler.
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

# amp-carousel

Bir yatay eksen boyunca birden çok benzer içerik parçasını görüntülemek için genel bir bant; son derece eksek ve yüksek performanslı olması amaçlanmıştır.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>
      <ul>
        <li>bant: fixed, fixed-height, and nodisplay.</li>
        <li>slaytlar: fill, fixed, fixed-height, flex-item, nodisplay, and responsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">amp-carousel örneği</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">amp-carousel içeren resim galerileri</a></li></ul></td>
    </tr>
  </table>

# Davranış

`amp-carousel` bileşeninin en yakın alt öğelerinin her biri, banttaki bir öğe olarak kabul edilir. Bu düğümlerin her birinde rastgele HTML alt öğeleri de olabilir.

Bant, rastgele sayıda öğeden ve tek bir öğe ileri veya geri gitmek için isteğe bağlı gezinme oklarından oluşur.

Kullanıcı kaydırırsa, ok tuşlarını kullanırsa veya isteğe bağlı bir gezinme okunu tıklarsa bant ilerler.

<!--yerleşik örnek - ampproject.org'da görüntülenir -->

<div>
  <amp-iframe height="313" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Belirli bir slayda ilerleme

Bir öğede `on` özelliğinin yönteminin `tap:carousel-id.goToSlide(index=N)` olarak ayarlanması, kullanıcı dokunduğunda veya tıkladığında "carousel-id" kimliğine sahip bir bandı index=N konumundaki slayda ilerletir (ilk slayt index=0, ikinci slayt index=1 konumundadır ve diğer slaytların konum değeri bu düzenle devam eder).

Aşağıdaki örnekte, bandın altında önizleme düğmeleri olan, üç resimden oluşan bir bant vardır. Kullanıcı düğmelerden birini tıkladığında ilgili bant öğesi görüntülenir.

<!--yerleşik örnek - ampproject.org'da görüntülenir -->

<div>
  <amp-iframe height="878" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.advance-slide.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Özellikler

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Bant öğeleri için görüntüleme türünü belirtir. Bu türler şunlar olabilir:
      <ul>
        <li><code>carousel</code>  (varsayılan): Tüm slaytlar gösterilir ve yatay olarak kaydırılabilir. Bu tür yalnızca şu düzenleri destekler: <code>fixed</code>, <code>fixed-height</code> ve <code>nodisplay</code>.</li>
        <li><code>slides</code>: Her defasında tek bir slayt gösterir. Bu tür şu düzenleri destekler: <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> ve <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (zorunlu)</strong></td>
      <td>Bandın yüksekliğini piksel cinsinden belirtir.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (isteğe bağlı)</strong></td>
      <td>Kullanıcının mobil cihazlarda bant öğelerinde gezinmesi için kalıcı olarak sol ve sağ oklar görüntüler.
          Varsayılan olarak, mobil cihazlarda gezinme okları birkaç saniye sonra kaybolur.
          Okların görünürlüğü şekillendirme aracılığıyla da kontrol edilebilir ve okları yalnızca belirli ekran genişliklerinde görüntülemek için bir medya sorgusu kullanılabilir. Masaüstünde, sadece tek bir alt öğe olmadığı sürece oklar her zaman görüntülenir.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (isteğe bağlı)</strong></td>
        <td><code>amp-carousel-button-next</code> için aria etiketini ayarlar. Herhangi bir değer verilmezse aria etiketi, varsayılan olarak "Banttaki bir sonraki öğe"' değerine ayarlanır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (isteğe bağlı)</strong></td>
        <td><code>amp-carousel-button-prev</code> için aria etiketini ayarlar. Herhangi bir verilmezse aria etiketi, varsayılan olarak "Banttaki bir önceki öğe" değerine ayarlanır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (isteğe bağlı)</strong></td>
        <td><code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code> için aria etiketinin son eki olarak kullanılan <code>(%s of %s)</code> gibi görünen bir biçim dizesi. Bu, ekran okuyucusu kullanan kullanıcılara banttaki ilerlemeleri hakkında bilgi sağlar. Herhangi bir değer verilmezse bu öğe varsayılan olarak "(%s of %s)" değerine ayarlanır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (isteğe bağlı)</strong></td>
        <td>Slaydı, kullanıcı etkileşimi olmadan bir sonraki slayda ilerletir.<br>
          Bir değer olmadan mevcutsa:
          <ul>
            <li>Varsayılan olarak, 5000 milisaniyelik (5 saniye) aralıklarda bir slayt ilerler; bu süre, <code>delay</code> özelliğiyle geçersiz kılınabilir.</li>
            <li><code>loop</code> özelliği önceden mevcut değilse <code>loop</code> özelliğini <code>amp-carousel</code> öğesine ekler.</li>
            <li>Otomatik oynatmanın gerçekleşmesi için en az 2 slayt gerekir.</li>
            <li>Yalnızca <code>type=slides</code> değerine sahip bantlara uygulanır.</li>
          </ul>
          Bir değerle mevcutsa:
          <ul>
            <li><code>loop</code>özelliği önceden mevcut değilse <code>loop</code> özelliğini  <code>amp-carousel</code> öğesine ekler.</li>
            <li>Gerekli sayıda döngü yapıldıktan sonra <code>loop</code> özelliğini kaldırır.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (isteğe bağlı)</strong></td>
          <td><code>autoplay</code> etkinleştirildiğinde sonraki slayda ilerlemenin geciktirileceği süreyi (milisaniye cinsinden) belirtir. <code>delay</code> özelliği yalnızca <code>type=slides</code> değerine sahip bantlar için geçerlidir.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (isteğe bağlı)</strong></td>
          <td>Kullanıcının, ilk öğeyi veya son öğeyi geçmesine olanak tanır. Döngünün gerçekleşmesi için en az 3 slayt olmalıdır. <code>loop</code> özelliği yalnızca <code>type=slides</code> değerine sahip bantlar için geçerlidir.
            <em>Örnek: Kontroller, döngü oluşturma ve gecikmeli otomatik oynatmayı içeren bir slayt bandı görüntüler</em>
            <!--yerleşik örnek - ampproject.org'da görüntülenir -->
            <div>
              <amp-iframe height="446" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.controls.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
                <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
                <div placeholder=""></div>
              </amp-iframe>
            </div></td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="https://www.ampproject.org/docs/reference/common_attributes">ortak özellikleri</a> içerir.</td>
          </tr>
        </table>

# Stil

* `amp-carousel` öğe seçicisini serbest bir şekilde biçimlendirmek için kullanabilirsiniz.
* Bant öğelerini hedeflemek için `.amp-carousel-slide` sınıf seçicisini kullanabilirsiniz.
* Bir `amp-carousel` düğmesi devre dışı bırakıldığında görsel olarak gizlenir.
* Varsayılan olarak `.amp-carousel-button`, düğmelerin arka plan resmi olarak satır içi SVG kullanır. Aşağıdaki örnekte olduğu gibi bunu kendi SVG'niz veya resminizle geçersiz kılabilirsiniz.

*Örnek: Varsayılan `.amp-carousel-button` satır içi SVG'si*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Örnek: Varsayılan `.amp-carousel-button` satır içi SVG'sini geçersiz kılma*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Doğrulama

AMP doğrulayıcı spesifikasyonunda [amp-carousel kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii) bakın.
