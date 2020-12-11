---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Verileri dinamik bir şekilde indirir ve şablon kullanarak liste öğeleri oluşturur.
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



İçeriği dinamik bir biçimde bir CORS JSON uç noktasından getirir ve sağlanan bir şablonu kullanarak oluşturur.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js">&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-list/">amp-list örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Kullanım <a name="usage"></a>

`<amp-list>` bileşeni, CORS JSON uç noktasından dinamik içerik getirir. Uç noktadan gelen yanıt, belirtilen şablonda oluşturulan verileri içerir.

[tip type="important"]
Uç noktanız, [AMP'de CORS İstekleri](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) spesifikasyonunda belirtilen gereksinimleri uygulamalıdır.
[/tip]

Bir şablonu şu iki yöntemden biriyle belirtebilirsiniz:

* mevcut bir `template` veya `script` öğesinin bir kimliğine başvuran `template` özelliği.
* doğrudan `amp-list` öğesinin içine yerleştirilmiş bir `template` veya `script` öğesi.

Şablonlar hakkında daha fazla bilgi için [AMP HTML Şablonları](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md) bölümüne bakın.

*Örnek: Dinamik liste görüntüleme*

Aşağıdaki örnekte, URL'ler ve başlıklar içeren JSON verilerini alıp içeriği, iç içe yerleştirilmiş bir [amp-mustache şablonunda](amp-mustache.md) oluşturuyoruz.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Burada, kullandığımız JSON dosyasını görebilirsiniz:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Getirilen içeriği şu şekilde biçimlendirdik:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Davranış <a name="behavior"></a>

Doküman, AMP Önbelleğinden sunulsa bile istek her zaman istemci tarafından yapılır. Yükleme, öğenin geçerli görüntü alanından ne kadar uzakta olduğuna bağlı olarak normal AMP kuralları kullanılarak tetiklenir.

Yükleme sonrasında `<amp-list>` daha fazla alana ihtiyaç duyarsa AMP çalışma zamanının, normal AMP akışını kullanarak yüksekliğini güncellemesini ister. AMP çalışma zamanı, yeni yükseklik isteğini karşılayamazsa kullanılabilir olduğunda `overflow` öğesini görüntüler. Bununla birlikte, `<amp-list>` öğelerinin dokümanın alt kısmına yerleştirilmesinin, neredeyse her zaman AMP çalışma zamanının bunları yeniden boyutlandırabilmesini garanti ettiğini unutmayın.

Varsayılan olarak `<amp-list>`, liste öğesine bir `list` ARIA rolü ve şablon aracılığıyla oluşturulan öğe öğelerine bir `listitem` rolü ekler.

### XHR toplu işlemesi <a name="xhr-batching"></a>

AMP, XMLHttpRequest öğelerini (XHR'ler) JSON uç noktalarında toplu olarak işler; diğer bir deyişle, bir AMP sayfasında birden çok tüketici (ör. birden fazla `<amp-list>` öğesi) için veri kaynağı olarak tek bir JSON veri isteğini kullanabilirsiniz.  Örneğin, `<amp-list>` öğeniz bir uç noktaya XHR gönderirse XHR iletilirken aynı uç noktaya yapılacak sonraki XHR'lerin hiçbiri tetiklenmez ve bunun yerine, ilk XHR'nin sonuçları döndürülür.

`<amp-list>` bileşeninde, JSON yanıtının bir alt kümesini oluşturmak için [`items`](#items-optional) özelliğini kullanabilir ve böylece, farklı içerikler oluşturan ancak tek bir XHR paylaşan birden fazla `<amp-list>` öğesine sahip olabilirsiniz.

### Taşma değeri belirtme <a name="specifying-an-overflow"></a>

İsteğe bağlı olarak, `<amp-list>` öğesi, `overflow` özelliğine sahip bir öğe içerebilir. Bu öğe, AMP Çalışma Zamanı `<amp-list>` öğesini istendiği gibi yeniden boyutlandıramazsa gösterilir.

*Örnek: Liste daha fazla alana ihtiyaç duyduğunda taşma görüntüleme*

Aşağıdaki örnekte, resimlerin ve başlıkların bir listesi gösterilmektedir. `<amp-list>` içeriği, kullanılabilir olandan daha fazla alan gerektirdiğinden AMP Çalışma Zamanı, taşma öğesini görüntüler.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Burada, `overflow` için CSS'yi görebilirsiniz:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Yer tutucu ve yedek <a name="placeholder-and-fallback"></a>

İsteğe bağlı olarak, `<amp-list>` bir yer tutucuyu ve/veya yedeği destekler.

* *Yer tutucu*, `placeholder` özelliğine sahip bir alt öğedir. Bu öğe, `<amp-list>` başarıyla yükleninceye kadar gösterilir. Ayrıca bir yedek sağlanmışsa `<amp-list>` yüklenemediğinde yer tutucu gizlenir.
* *Yedek*, `fallback` özelliğine sahip bir alt öğedir. Bu öğe, `<amp-list>` yüklenemezse gösterilir.

[Yer Tutucu ve Yedekler](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) hakkında daha fazla bilgi edinin. Bir alt öğenin hem yer tutucu hem de yedek olamayacağını unutmayın.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Verileri yenileme <a name="refreshing-data"></a>

`<amp-list>` öğesi, diğer öğelerin `on="tap:..."` özelliklerinde başvurabileceği bir `refresh` işlemi sunar.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Dinamik Yeniden Boyutlandırma <a name="dynamic-resizing"></a>

##### Deneme: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

Bazı durumlarda, kullanıcı etkileşiminde yeniden boyutlandırma yapmak için `<amp-list>` öğesine ihtiyaç duyabiliriz. Örneğin, `<amp-list>` kullanıcıların dokunabileceği bir amp-accordion öğesi içerdiğinde, `<amp-list>` içeriğinin boyutu bağlı CSS sınıfları nedeniyle değiştiğinde veya bir `<amp-list>` içindeki öğelerin sayısında, bağlı bir `[src]` özelliğinden dolayı değişiklik yapıldığında. `changeToLayoutContainer` işlemi, bu işlemi tetiklerken amp listesini `layout="CONTAINER"` olarak değiştirerek bu durumu çözer. Aşağıdaki örneğe bakın:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

Bu işlem, `amp-list-resizable-children` altında deneme amaçlı kullanılabilir.

## Özellikler <a name="attributes"></a>

##### src (gerekli) <a name="src-required"></a>

Bu `<amp-list>` içinde oluşturulacak JSON öğesini döndüren uzak uç noktanın URL'si. Bu bir CORS HTTP hizmeti olmalıdır. URL protokolü HTTPS olmalıdır.

[tip type="important"]
Uç noktanız, [AMP'de CORS İstekleri](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) spesifikasyonunda belirtilen gereksinimleri uygulamalıdır.
[/tip]

`[src]` özelliği mevcutsa `src` özelliği atlanabilir. Bu, [`amp-bind`](amp-bind.md) ile çalışırken sayfanın yüklenmesi yerine bir kullanıcı hareketinin sonucu olarak içerik oluşturulmasında yararlı olur.

##### credentials (isteğe bağlı) <a name="credentials-optional"></a>

[Getirme API'si](https://fetch.spec.whatwg.org/) tarafından belirtildiği şekliyle bir `credentials` seçeneğini tanımlar.

* Desteklenen değerler: `omit`, `include`
* Varsayılan değer: `omit`

Kimlik bilgilerini göndermek için `include` değerini geçirin. Bu değer ayarlanırsa yanıt, [AMP CORS güvenlik yönergelerine](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp) uygun olmalıdır.

Bir listede kişiselleştirilmiş içeriği görüntülemek için kimlik bilgilerinin içerilmesini belirten bir örneği burada bulabilirsiniz:

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (isteğe bağlı) <a name="items-optional"></a>

Yanıt içinde oluşturulacak diziyi bulacak ifadeyi tanımlar. Bu, JSON yanıtının alanları aracılığıyla geçiş yapan, noktalarla gösterilen bir ifadedir.
`<amp-list>`, varsayılan olarak bir dizi bekler. Bir nesneden veri yüklemek için `single-item` özelliği kullanılabilir.

* Varsayılan değer `"items"` değeridir. Beklenen yanıt: `{items: [...]}`.
* Yanıtın kendisi istenen diziyse `"."` değerini kullanın. Beklenen yanıt: `[...]`.
* İç içe yerleştirilmiş gezinmeye izin verilir (ör. `"field1.field2"`). Beklenen yanıt: `{field1: {field2: [...]}}`.

`items="items"` belirtildiğinde (bu varsayılan değerdir) yanıt, `"items"` adlı bir dizi özelliği içeren bir JSON nesnesi olmalıdır:
```text
{
  "items": [...]
}
```

#### max-items (isteğe bağlı) <a name="max-items-optional"></a>

Oluşturulacak öğe dizisinin maksimum uzunluğunu belirten bir tam sayı değeri.
Döndürülen değer, `max-items` değerini aşarsa `items` dizisi, `max-items` giriş sayısına kesilir.

#### single-item (isteğe bağlı) <a name="single-item-optional"></a>

`<amp-list>` öğesinin, döndürülen sonucu tek bir öğe dizisi gibi işlemesine neden olur. Bir nesne yanıtı bir dizi içine sarmalanacağından
`{items: {...}}` öğesi, `{items: [{...}]}` öğesiymiş gibi davranır.

#### reset-on-refresh (isteğe bağlı) <a name="reset-on-refresh-optional"></a>

Listenin kaynağı `amp-bind` veya `refresh()` işlemi ile yenilendiğinde tekrar bir yükleme göstergesi ve yer tutucu görüntüler.

Bu, varsayılan olarak yalnızca bir ağın getirilmesine neden olan yenilemelerde tetiklenir. Tüm yenilemelerde sıfırlamak için `reset-on-refresh="always"` öğesini kullanın.

#### [is-layout-container] (deneme amaçlı, isteğe bağlı) <a name="binding-optional"></a>

Bu, varsayılan olarak her zaman yanlış olması gereken, bağlanabilir bir özelliktir. `bind` öğesi aracılığıyla true (doğru) değerine ayarlandığında, `<amp-list>` öğesinin düzenini `CONTAINER` düzenine değiştirir. Bu özellik, amp-list için dinamik yeniden boyutlandırmanın işlenmesi için yararlıdır. `CONTAINER` düzeni, ilk yüklemede içerik atlamasına neden olabildiğinden `<amp-list>` öğesi bu düzeni desteklemez. Aynı nedenle, bu özellik varsayılan olarak true (doğru) değerine ayarlanamaz. Bu özellik, `amp-list-resizable-children` altında deneme amaçlı kullanılabilir. Alternatif olarak, `changeToLayoutContainer` işlemini de kullanabilirsiniz.

#### binding (isteğe bağlı) <a name="is-layout-container-optional"></a>

`<amp-list>` ve aynı zamanda `amp-bind` kullanan sayfalar için oluşturulan alt öğelerde bağlamaların değerlendirmesinde (ör. `[text]`) oluşturmanın engellenip engellenmeyeceğini kontrol eder.

Daha hızlı performans için `binding="no"` veya `binding="refresh"` kullanılmasını öneririz.

* `binding="no"`: Oluşturmayı hiçbir zaman engelleme **(en hızlı)**.
* `binding="refresh"`: İlk yüklemede oluşturmayı engelleme **(daha hızlı)**.
* `binding="always"`: Oluşturmayı her zaman engelle **(yavaş)**.

`binding` özelliği sağlanmazsa varsayılan olarak `always` değeri kullanılır.

## Deneme: Daha Fazla Yükleme ve Sonsuz Kaydırma (amp-list-load-more) <a name="common-attributes"></a>

`<amp-list>` öğesinde sayfalara ayırma ve sonsuz kaydırma için bir uygulama olarak `amp-list-load-more` denemesini kullanıma sunduk. [Denemeler sayfasında](https://cdn.ampproject.org/experiments.html) "amp-list-load-more" denemesini etkinleştirerek ve `<amp-list>` öğesine `load-more` özelliğini ekleyerek bu özelliği etkinleştirebilirsiniz. Bu özellik şu anda kaynak denemesindedir ve nihai API'ler değişebilir.

#### Örnek Kullanım <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Çalışan örnekler için lütfen [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) ve [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) sayfalarına bakın.

### Özellikler <a name="sample-usage"></a>

#### load-more (zorunlu) <a name="attributes-1"></a>

Bu özellik, iki değer kabul eder: "auto" veya "manual". Bu özelliğin değerini "manual" olarak ayarladığınızda, `<amp-list>` öğesinin sonunda "load more" (daha fazla yükle) düğmesi gösterilir. Bu özelliğin değeri "auto" olarak ayarlandığında, `<amp-list>` öğesi sonsuz kaydırma efekti için aşağıya doğru üç görüntü alanının öğelerini otomatik olarak yükler.

#### load-more-bookmark (isteğe bağlı) <a name="load-more-mandatory"></a>

Bu özellik, döndürülen verilerde, yüklenecek sıradaki öğelerin URL'sini veren bir alan adı belirtir. Bu özellik belirtilmezse `<amp-list>`, json yükünün `load-more-src` alanına sahip olmasını bekler. Bu alan, yüklenecek sıradaki url'ye karşılık gelir. Bu alanın başka bir şekilde adlandırıldığı durumlarda, söz konusu alanın adını `load-more-bookmark` alanı aracılığıyla belirtebilirsiniz.Örneğin, aşağıdaki örnek yükte `load-more-bookmark="next"` değerini belirttik.

```
{ "items": [...], "next": "https://url.to.load" }
```

### load-more öğelerini özelleştirme <a name="load-more-bookmark-optional"></a>

`load-more` özelliğine sahip `<amp-list>`, şu kullanıcı arayüzü öğelerini içerir: bir load-more düğmesi, bir yükleyici, bir load-failed öğesi ve isteğe bağlı olarak, listenin sonunu belirten bir end-cap öğesi. Bu öğeler, `<amp-list-load-more>` öğelerinin sağlanmasıyla, aşağıdaki özelliklere sahip `<amp-list>` alt öğeleri olarak özelleştirilebilir:

#### load-more-button <a name="customizing-load-more-elements"></a>

Yüklenecek daha fazla öğe varsa, listenin sonunda gösterilen (manuel load-more için), `load-more-button` özelliğine sahip bir `<amp-list-load-more>` öğesi. Bu öğenin tıklanması, `load-more-src` alanında veya `load-more-bookmark` özelliğine karşılık döndürülen veri alanında bulunan URL'den daha fazla öğenin yüklenmesi için bir getirme işlemini tetikler. `<amp-list>` bileşeni, `load-more-button` özelliğine sahip bir alt öğeyle sağlanarak bu öğenin özelleştirilmesi sağlanabilir.

##### Örnek: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  `amp-mustache` aracılığıyla şablonu oluşturulabilir.

##### Örnek: <a name="example"></a>

```html
{% raw %}
<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Bu öğe, kullanıcı listenin sonuna ulaşırsa ve içerik yükleme işlemi devam ediyorsa veya (yeni `<amp-list>` alt öğeleri yüklenmeye devam ederken) `load-more-button` öğesinin tıklanması sonucu görüntülenecek olan bir yükleyicidir. `<amp-list>` bileşeni, `load-more-loading` özelliğine sahip bir alt öğeyle sağlanarak bu öğenin özelleştirilmesi sağlanabilir. Aşağıda bir örnek gösterilmiştir:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Yükleme başarısız olursa `<amp-list>` öğesinin alt kısmında görüntülenecek `load-more-clickable` özelliğine sahip bir düğme içeren `load-more-failed` özelliğinin yer aldığı bir `<amp-list-load-more>` öğesi. Bu öğenin tıklanması, başarısız olan URL'nin yeniden yüklenmesini tetikler. `<amp-list>` bileşeni, `load-more-failed` özelliğine sahip bir alt öğeyle sağlanarak bu öğenin özelleştirilmesi sağlanabilir. Aşağıda bir örnek gösterilmiştir:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

Yukarıdaki örnekte, `load-more-failed` öğesinin tamamı tıklanabilir özelliktedir. Bununla birlikte, bu öğe için tıklanabilir bir "reload" (yeniden yükle) düğmesi içeren genel bir tıklanamaz "loading failed" (yükleme başarısız) öğesi yaygın şekilde kullanılır. Bunu daha açık anlatmak gerekirse, genel olarak tıklanamaz bir öğeniz ve bu öğenin, `load-more-clickable` öğesini içeren bir düğmesi olabilir. Örneğin:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Bu öğe varsayılan olarak sağlanmaz ancak `<amp-list>` öğesine, `load-more-end` özelliğini içeren bir `<amp-list-load-more>` öğesi bir alt öğe olarak eklenirse bu öğe, başka hiçbir öğenin olmaması durumunda `<amp-list>` öğesinin alt kısmında görüntülenir.  `amp-mustache` aracılığıyla bu öğenin şablonu oluşturulabilir. Aşağıda bir örnek gösterilmiştir:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### common attributes <a name="load-more-end"></a>

Bu öğe, AMP bileşenlerine genişletilmiş [ortak özellikleri](../../../documentation/guides-and-tutorials/learn/common_attributes.md) içerir.

## Değişiklikler <a name="substitutions"></a>

`<amp-list>` tüm standart URL değişkeni değişikliklerine izin verir.
Daha fazla bilgi için [Değişiklik Kılavuzu](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) dokümanına bakın.

Örneğin:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
öğesi, `https://foo.com/list.json?0.8390278471201` gibi bir istekte bulunabilir. Burada, RANDOM değeri, her gösterimden sonra rastgele oluşturulur.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-list kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) bakın.
