---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Veri bağlama ve basit JS benzeri ifadeler aracılığıyla kullanıcı işlemlerine veya veri değişikliklerine yanıt olarak öğelerin değişmesine olanak tanır.
---



Veri bağlama ve ifadelerle özel etkileşim özelliği ekler.


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
    <td class="col-fourty"><strong>Zorunlu Komut Dosyası</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Ek açıklamalar içeren tanıtıcı kod örneği</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Ek açıklamalar içeren bağlantılı resim bantları örneği</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Ek açıklamalar içeren e-ticaret ürün sayfası örneği</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Eğiticiler</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Etkileşimli AMP sayfaları oluşturma</a></td>
  </tr>
</table>

# Genel Bakış <a name="overview"></a>

`amp-bind` bileşeni, veri bağlama ve JS benzeri ifadeler aracılığıyla AMP sayfalarınıza özel durum bilgili etkileşim özelliği eklemenize olanak tanır.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>amp-bind tanıtımı için bu videoyu izleyin.</figcaption></figure>

# Basit bir örnek <a name="a-simple-example"></a>

Aşağıdaki örnekte düğmeye dokunduğunuzda, `<p>` öğesinin "Hello World" olan metni "Hello amp-bind" olarak değişir.

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
Yüksek performans elde etmek ve beklenmeyen içerik atlaması riskini önlemek için `amp-bind` öğesi, sayfa yüklemede ifadeleri değerlendirmez. Bu, görsel öğelere bir varsayılan durum verilmesi ve ilk oluşturma için `amp-bind` öğesine güvenilmemesi gerektiği anlamına gelir.
[/tip]

### İşleyiş şekli <a name="how-does-it-work"></a>

`amp-bind` üç ana bileşene sahiptir:

1. [State](#state): Bir dokümanın kapsamı, değişebilir JSON durumu. Yukarıdaki örnekte, düğmeye dokunmadan önce durum boştur.  Düğmeye dokunulduktan sonra, durum `{foo: 'amp-bind'}` olur.
2. [Expressions](#expressions): Bunlar, **state** başvurusunda bulunabilen JavaScript benzeri ifadelerdir. Yukarıdaki örnekte, dize değişmez değerini (`'Hello '`) ve durum değişkenini (`foo`) birbirine bağlayan tek bir `'Hello ' + foo` ifadesi bulunmaktadır.
Bir ifade içinde 100 işlenen kullanma sınırı vardır.
3. [Bindings](#bindings): Bunlar, bir öğenin özelliğini bir **expression** öğesine bağlayan `[property]` formunun özel özellikleridir. Yukarıdaki örnekte, `<p>` öğesinin metnini ifade değeri her değiştiğinde güncelleyen tek bir bağlama (`[text]`) bulunmaktadır.

`amp-bind`, AMP sayfalarında hız, güvenlik ve performansı sağlamaya özel önem verir.

### Biraz daha karmaşık bir örnek <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  Düğmeye basıldığında:

  1. **Durum**, `'cat'` olarak tanımlanan `currentAnimal` ile güncellenir.
  1. `currentAnimal` öğesine bağlı **ifadeler** değerlendirilir:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. Değiştirilen ifadelere bağlı olan **bağlamalar** güncellenir:

    * İlk `<p>` öğesinin metni, "This is a cat" olur.
    * İkinci `<p>` öğesinin `class` özelliği "redBackground" olur.
    * `amp-img` öğesi bir kedinin resmini gösterir.</li>

  [tip type="success"]
Kod ek açıklamalarının yer aldığı bu örnek için [**canlı demoyu** deneyin](https://ampbyexample.com/components/amp-bind/)!
[/tip]

# Ayrıntılar <a name="details"></a>

# Durum <a name="state"></a>

`amp-bind` kullanan her AMP dokümanı, doküman kapsamı değişebilir JSON verilerine veya **durum** bilgisine sahiptir.

# `amp-state` ile başlangıç durumu <a name="initializing-state-with-amp-state"></a>

`amp-bind` durumu, `amp-state` bileşeni ile başlatılabilir:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[İfadeler](#expressions), durum değişkenlerine nokta söz dizimi aracılığıyla başvurabilir. Bu örnekte, `myState.foo`, `"bar"` olarak değerlendirilir.

* Bir `<amp-state>` öğesinin alt JSON'ı en fazla 100 KB olur.
* Bir `<amp-state>` öğesi, alt JSON komut dosyası yerine bir CORS URL'si de belirtebilir. Ayrıntılar için [Ek](#amp-state-specification) bölümüne bakın.

# Durumu yenileme <a name="refreshing-state"></a>

`refresh` işlemi bu bileşen tarafından desteklenir ve durum içeriğini yenilemek için kullanılabilir.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Durumu `AMP.setState()` ile güncelleme <a name="updating-state-with-ampsetstate"></a>

[`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) işlemi, bir nesne değişmez değerini durumla birleştirir. Örneğin, aşağıdaki düğmeye basıldığında `AMP.setState()` öğesi, nesne değişmez değerini durum ile [derinden birleştirir](#deep-merge-with-ampsetstate).

```html
<!-- Like JavaScript, you can reference existing
      variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

Genel olarak, iç içe yerleştirilmiş nesneler en fazla 10 derinlikte birleştirilir. `amp-state` tarafından sunulanlar da dahil olmak üzere tüm değişkenler geçersiz kılınabilir.

Belirli etkinlikler tarafından tetiklendiğinde, `AMP.setState()`, `event` özelliğindeki etkinlikle ilgili verilere de erişebilir.

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# `AMP.pushState()` ile geçmişi değiştirme <a name="modifying-history-with-amppushstate"></a>

[`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) işlemi, tarayıcı geçmiş yığınına yeni bir giriş de aktarması haricinde `AMP.setState()` işlemine benzer. Bu geçmiş girişine dönülmesi (geri gidilerek), `AMP.pushState()` tarafından ayarlanan değişkenlerin önceki değerini geri yükler.

Örneğin:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* Düğmeye dokunulduğunda `foo` değeri 123 olarak ayarlanır ve yeni bir geçmiş girişi aktarılır.
* Geri gidildiğinde `foo` önceki değeri olan "bar" değerine geri yüklenir (`AMP.setState({foo: 'bar'})` işleminin çağrılmasıyla eşdeğerdir).

# İfadeler <a name="expressions"></a>

İfadeler, bazı önemli farklılıklarla birlikte JavaScript'e benzer.

# JavaScript'ten farklılıklar <a name="differences-from-javascript"></a>

* İfadeler yalnızca ifadeleri içeren dokümanın [durumuna](#state) erişebilir.
* İfadeler, `window` veya `document` gibi genel öğelere **erişmez**.
* Yalnızca [beyaz listedeki işlevler](#allow-listed-functions) ve operatörler kullanılabilir.
* Özel işlevlere, sınıflara ve döngülere genellikle izin verilmez. Ok işlevlerine parametre olarak izin verilir; ör. `Array.prototype.map`.
* Tanımlanmamış değişkenler ve sınırların dışındaki dizi dizini `undefined` değeri döndürmek veya hata bildirmek yerine `null` değerini döndürür.
* Performans açısından şu anda tek bir ifade 50 öğe ile sınırlanmıştır. Sizin kullanım alanınız için bu sayı yeterli değilse lütfen [bize ulaşın](https://github.com/ampproject/amphtml/issues/new).

Tam ifade dil bilgisi ve uygulaması, [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) ve [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js) içinde bulunabilir.

# Örnekler <a name="examples"></a>

Aşağıdaki ifadelerin tümü geçerlidir:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Beyaz listedeki işlevler <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Nesne türü </th>
    <th>Fonksiyonlar</th>
    <th>Örnek</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>Tek parametreli ok işlevlerinde parantez kullanılamaz; örneğin `(x) => x + 1` yerine `x => x + 1` kullanın. Ayrıca, `sort()` ve `splice()`, yerinde çalışma yerine değiştirilmiş kopyalar döndürür.

<sup>2</sup>Statik işlevler ad alanlı değildir; ör. `Math.abs(-1)` yerine `abs(-1)` işlevini kullanın.

# Makroları `amp-bind-macro` ile tanımlama <a name="defining-macros-with-amp-bind-macro"></a>

`amp-bind` ifade parçaları bir `amp-bind-macro` tanımlanarak yeniden kullanılabilir. `amp-bind-macro` öğesi, sıfır veya daha fazla bağımsız değişken alan ve geçerli duruma başvuruda bulunan bir ifade tanımlamanıza olanak tanır. Bir makro, dokümanın herhangi bir yerinden `id` özelliği değerine başvuruda bulunularak bir işlev gibi çağrılabilir.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Bir makro, <i>kendisinden önce tanımlanan</i> diğer makroları da çağırabilir. Bir makro kendini yinelemeli olarak çağıramaz.

# Bağlamalar <a name="bindings"></a>

**Bağlama**, bir öğenin özelliğini bir [ifadeye](#expressions) bağlayan `[property]` formunun özel bir özelliğidir. `data-amp-bind-property` alternatif, XML uyumlu bir söz dizimi de kullanılabilir.

**Durum** değiştiğinde, ifadeler yeniden değerlendirilir ve bağlı öğelerin özellikleri yeni ifade sonuçlarıyla güncellenir.

`amp-bind`, dört öğe durumu türünde veri bağlamalarını destekler:

<table>
  <tr>
    <th>Tür</th>
    <th>Özellikler</th>
    <th>Ayrıntılar</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Çoğu metin öğesinde desteklenir.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">CSS sınıfları</a></td>
    <td><code>[class]</code></td>
    <td>İfade sonucu, boşlukla ayrılmış bir dize olmalıdır.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden"><code>hidden</code> özelliği</a></td>
    <td><code>[hidden]</code></td>
    <td>Bir boole ifadesi olmalıdır.</td>
  </tr>
  <tr>
    <td><a href="../../../documentation/components/index.html">AMP öğelerinin</a> boyutu</td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>AMP öğesinin genişliğini ve/veya yüksekliğini değiştirir.</td>
  </tr>
  <tr>
    <td>Öğeye özel özellikler</td>
    <td><a href="#element-specific-attributes">Çeşitli</a></td>
    <td></td>
  </tr>
</table>

Bağlamalar ile ilgili notlar:

* Güvenlik nedeniyle, `innerHTML` öğesine bağlamaya izin verilmez.
* Güvenli olmayan değerler (ör. `javascript:`) tüm özellik bağlamalarından temizlenir.
* Boole ifadesi sonuçları, boole özelliklerini açar/kapatır. Örneğin: `<amp-video [controls]="expr"...>`. `expr`, `true` olarak değerlendirildiğinde, `<amp-video>` öğesi `controls` özelliğine sahip olur. `expr`, `false` olarak değerlendirildiğinde `controls` özelliği kaldırılır.
* Özellik adlarındaki köşeli parantez karakterleri `[` ve `]` XML (ör. XHTML, JSX) veya DOM API'leri aracılığıyla özellikleri yazarken soruna yol açabilir. Bu durumlarda, `[x]="foo"` yerine alternatif `data-amp-bind-x="foo"` söz dizimini kullanın.

# Öğeye özel özellikler <a name="element-specific-attributes"></a>

Yalnızca aşağıdaki bileşenlere ve özelliklere bağlamaya izin verilir:

<table>
  <tr>
    <th>Bileşen</th>
    <th>Özellikler</th>
    <th>Davranış</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Görüntülenen Brightcove videosunu değiştirir.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Şu anda görüntülenen slayt dizinini değiştirir. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Örneğe göz atın</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Seçilebilir en erken tarihi ayarlar<br>
      Seçilebilir en son tarihi ayarlar
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Güncellenen URL'deki dokümanı görüntüler.<br>Dokümanın başlığını değiştirir.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>İframe'in kaynak URL'sini değiştirir.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td><code>[src]</code> öğesine bağlanırken, bağlamanın önbellekte çalışması için <code>[srcset]</code> öğesine de bağlama yaptığınızdan emin olun.<br>İlgili <a href="amp-img.md#attributes">amp-img özelliklerine</a> bakın.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Lightbox'ın görüntülenmesini etkinleştirir/devre dışı bırakır. İpucu: Lightbox kapatıldığında değişkenleri güncellemek için <code>on="lightboxClose: AMP.setState(...)"</code> işlemini kullanın.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      İfade bir dizeyse dize URL'sinden JSON öğesini getirir ve oluşturur.
      İfade bir nesne veya diziyse ifade verilerini oluşturur.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Geçerli olarak seçilmiş,<br><code>option</code> özelliği değerlerine göre tanımlanan alt öğeleri değiştirir. Çoklu seçim için virgülle ayrılmış değer listesini destekler. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Örneğe göz atın</a></td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;/code></td>
    <td><code>[src]</code></td>
    <td>JSON değerini yeni URL'den alır ve mevcut durumla birleştirir. <em>Aşağıdaki güncellemenin döngüleri önlemek için <code><amp-state></code> öğelerini yoksayacağını unutmayın.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>İlgili <a href="amp-video.md#attributes">amp-video özelliklerine</a> bakın.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Görüntülenen YouTube videosunu değiştirir.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Bağlantıyı değiştirir.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">button özelliklerine</a> bakın.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">details özelliklerine</a> bakın.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Alan grubunu etkinleştirir veya devre dışı bırakır.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">image özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">input özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">option özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">optgroup özelliklerine</a> bakın</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">select özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">source özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">track özelliklerine</a> bakın.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>İlgili <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">textarea özelliklerine</a> bakın.</td>
    </tr>
  </table>

  <sup>*</sup>Bağlanabilir olmayan bir eşdeğeri bulunmayan bağlanabilir özellikleri belirtir.

# Hata ayıklama <a name="debugging"></a>

Geliştirme sırasında ortaya çıkan uyarıları ve hataları vurgulamak ve özel hata ayıklama işlevlerine erişmek için geliştirme modunda (#`development=1` URL parçasıyla) test yapın.

# Uyarılar <a name="warnings"></a>

Geliştirme modunda, bir bağlama özelliğinin varsayılan değeri, karşılık gelen ifadenin ilk sonucuyla eşleşmediğinde `amp-bind` bir uyarı yayınlar. Bu, diğer durum değişkenlerindeki değişikliklerin neden olduğu istenmeyen dönüşümleri önlemeye yardımcı olabilir. Örneğin:

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
so a warning will be issued in development mode. -->

<p class="def" [class]="'abc'"></p>

```

Geliştirme modunda, `amp-bind`, tanımlanmamış değişkenleri veya özellikleri başvurudan kaldırırken bir uyarı da yayınlar. Bu, aynı zamanda `null` ifade sonuçları nedeniyle istenmeyen dönüşümleri önlemeye yardımcı olabilir. Örneğin:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->
<p [text]="myAmpState.bar">Some placeholder text.</p>
```

# Hatalar <a name="errors"></a>

`amp-bind` ile çalışırken karşılaşabileceğiniz birkaç çalışma zamanı hatası türü vardır.

<table>
  <tr>
    <th>Tür</th>
    <th>Mesaj</th>
    <th>Öneri</th>
  </tr>
  <tr>
    <td class="col-thirty">Geçersiz bağlama</td>
    <td class="col-fourty"><em>&lt;P> öğesinde [someBogusAttribute] özelliğine bağlamaya izin verilmiyor</em>.</td>
    <td class="col-thirty">Yalnızca <a href="#element-specific-attributes">beyaz listedeki bağlamaları</a> kullanın.</td>
  </tr>
  <tr>
    <td>Sözdizimi hatası</td>
    <td><em>İfade derleme hatası...</em></td>
    <td>İfadede yazım hataları olmadığını doğrulayın.</td>
  </tr>
  <tr>
    <td>Beyaz listede yer almayan işlevler</td>
    <td><em>uyarı desteklenen bir işlev değildir.</em></td>
    <td>Yalnızca <a href="#allow-listed-functions">beyaz listedeki işlevleri</a> kullanın.</td>
  </tr>
  <tr>
    <td>Temizlenmiş sonuç</td>
    <td><em>"javascript:alert(1)", [href] için geçerli bir sonuç değil.</em></td>
    <td>Yasaklanmış URL protokollerini veya AMP Doğrulayıcı'da başarısız olacak ifadeleri kullanmaktan kaçının.</td>
  </tr>
  <tr>
    <td>CSP ihlali</td>
    <td><em>'blob:...' öğesinden bir işçi oluşturulması reddedildi. Aksi takdirde, şu İçerik Güvenliği Politikası kuralı ihlal edilecekti...</em></td>
    <td>Kaynağınızın İçerik Güvenliği Politikası'na <code>default-src blob:</code> öğesini ekleyin. <code>amp-bind</code>, iyi bir performans sağlamak üzere pahalı işler için <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">özel bir Web İşçisine</a> yetki verir.</td>
  </tr>
</table>

# Hata Ayıklama Durumu <a name="debugging-state"></a>

Geçerli durumu konsola yazdırmak için `AMP.printState()` kullanın.

# Ek <a name="appendix"></a>

# `<amp-state>` spesifikasyonu <a name="amp-state-specification"></a>

Bir `amp-state` öğesi, bir alt `<script>` öğesi **VEYA** uzak bir JSON uç noktasının CORS URL'sini içeren bir `src` özelliği içerebilir ancak bunların ikisini birden içeremez.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# XHR toplu işlemesi <a name="xhr-batching"></a>

AMP, XMLHttpRequest öğelerini (XHR'ler) JSON uç noktalarında toplu olarak işler; diğer bir deyişle, bir AMP sayfasında birden çok tüketici (ör. birden fazla `amp-state` öğesi) için veri kaynağı olarak tek bir JSON veri isteğini kullanabilirsiniz.  Örneğin, `amp-state` öğeniz bir uç noktaya XHR gönderirse XHR iletilirken aynı uç noktaya yapılacak sonraki XHR'lerin hiçbiri tetiklenmez ve bunun yerine, ilk XHR'nin sonuçları döndürülür.

# Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Bu <code>amp-state</code> öğesini güncelleyecek olan JSON değerini döndürecek uzak uç noktanın URL'si. Bu bir CORS HTTP hizmeti olmalıdır.
      <code>src</code> özelliği, tüm standart URL değişkeni değişikliklerine izin verir. Daha fazla bilgi için <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">Değişiklik Kılavuzu</a> dokümanına bakın.
          [tip type="important"]
        Uç nokta, <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">AMP'de CORS İstekleri</a> spesifikasyonunda belirtilen gereksinimleri uygulamalıdır.
        [/tip]</td>
    </tr>
    <tr>
      <td width="40%"><strong>credentials (isteğe bağlı)</strong></td>
      <td><a href="https://fetch.spec.whatwg.org/">Getirme API'si</a> tarafından belirtildiği şekliyle bir <code>credentials</code> seçeneğini tanımlar.
        <ul>
          <li>Desteklenen değerler: `omit`, `include`</li>
          <li>Varsayılan değer: `omit`</li>
        </ul>
        Kimlik bilgilerini göndermek için <code>include</code> değerini geçirin. Bu değer ayarlanırsa yanıt, <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">AMP CORS güvenlik yönergelerine</a> uygun olmalıdır.</td>
      </tr>
    </table>

# `AMP.setState()` ile derin birleştirme <a name="deep-merge-with-ampsetstate"></a>

`AMP.setState()` çağrıldığında, `amp-bind`, sağlanan nesneyi değişmez değerini geçerli durumla derin birleştirir. Nesne değişmez değerindeki tüm değişkenler, tekrar eden bir şekilde birleştirilen iç içe yerleştirilmiş nesneler haricinde, doğrudan duruma yazılır. Nesne değişmez değerinde bulunan, temel öğeler ve dizilerle aynı ada sahip değişkenlerin değeri her zaman bunların üzerine yazılır.

Aşağıdaki örneği inceleyin:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

İlk düğmeye basıldığında durum şu şekilde değişir:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

İkinci düğmeye basıldığında, `amp-bind` nesne değişmez değeri bağımsız değişkenini (`{employee: {age: 64}}`) yinelenen bir şekilde mevcut durumla birleştirir.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` güncellenmiş ancak `employee.name` ve `employee.vehicle` anahtarları değişmemiştir.

`AMP.setState()` işlemini döngüsel başvurular içeren bir nesne değişmez değeriyle çağırırsanız `amp-bind` öğesinin hata vereceğini lütfen unutmayın.

# Bir değişkeni kaldırma <a name="circular-references"></a>

Mevcut bir durum değişkeninin değerini `AMP.setState()` işleminde `null` olarak ayarlayarak değişkeni kaldırın. Önceki örnekteki durumla başlayarak:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

Düğmesine basıldığında durum şu şekilde değişir:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Benzer biçimde:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

Düğmesine basıldığında durum şu şekilde değişir:

```javascript
{
  <!-- State is empty -->
  }
```

# İfade dil bilgisi <a name="expression-grammar"></a>

`amp-bind` ifadeleri için BNF benzeri dil bilgisi:

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
