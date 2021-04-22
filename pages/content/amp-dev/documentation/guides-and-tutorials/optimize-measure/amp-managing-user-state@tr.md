---
'$title': Kimliği doğrulanmamış kullanıcı durumunu AMP ile yönetme
$order: 2
formats:
  - websites
teaser:
  text: '**İçindekiler**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

**İçindekiler**

- [Arka plan](#background)
- [Uygulama kılavuzu](#implementation-guide)
  - [Başlamadan önce](#before-getting-started)
  - [1. Görev: Yayıncı kaynağındaki AMP olmayan sayfalar için bir tanımlayıcı belirleme ve analiz ping'leri gönderme](#task1)
  - [2. Görev: AMP sayfaları için bir tanımlayıcı belirleme ve amp-analytics ping'lerine İstemci Kimliği değişimini ekleyerek analiz ping'leri gönderme](#task2)
  - [3. Görev: Yayıncı kaynağındaki sayfalardan analiz ping'lerini işleme](#task3)
  - [4. Görev: AMP önbelleğinden veya AMP görüntüleyici ekran bağlamlarından gelen analiz ping'lerini işleme ve tanımlayıcı eşleşmeleri oluşturma (gerekirse)](#task4)
  - [5. Görev: Bağlantı vermede ve form gönderiminde İstemci Kimliği kullanma](#task5)
- [Kesinlikle önerilen uygulamalar](#strongly-recommended-practices)

Kullanıcı durumu, günümüz web dünyasında önemli bir kavramdır. Kullanıcı durumu yönetilerek etkinleştirilen aşağıdaki kullanım durumlarını göz önünde bulundurun:

- Bir satıcı, bir kullanıcıya, haftalar önce ilk ziyaretinde sepete eklediği ürünleri ikinci ziyaretinde gösteren yararlı bir **alışveriş sepeti** oluşturuyor. Böyle bir deneyim, kullanıcının geçmişte satın almayı düşündüğü öğenin farkında olmasını sağlayarak o öğeyi satın alma şansını artırır.
- **Önerilen makaleleri** okuyucunun yayıncı makalelerine tekrar tekrar yaptığı ziyaretleri temel alarak okuyucuya özel olarak hazırlayan bir haber yayıncısı, okuyucunun ilgisini canlı tutmayı ve daha fazla içerik keşfetmesini sağlamayı başarır.
- Herhangi bir siteyi işleten bir web sitesi geliştiricisi, iki sayfa görüntülemesinin iki sayfa gören tek bir kişiye mi, yoksa her biri tek bir sayfa gören iki farklı kişiye mi ait olduğunu anlayabilen **analizler** topluyor. Bu içgörüye sahip olmak, sitenin nasıl performans gösterdiğini ve nihayetinde nasıl iyileştirileceğini öğrenmenize yardımcı olur.

Bu makale, **AMP'de kimliği doğrulanmamış kullanıcı durumunu yönetmede** daha başarılı olmanıza yardımcı olmak için tasarlanmıştır; bu, kullanıcı, oturum açma gibi bir amaçla kimliğini sağlamak için herhangi bir işlem yapmamış olsa bile sorunsuz bir kullanıcı yolculuğu sağlamanın bir yoludur. Bu kılavuz, bu konuyu ele alırken karşılaşılan zorlukları ve dikkate alınması gereken hususları gözden geçirdikten sonra, kullanıcı durumunun AMP tarafından nasıl desteklendiğini özetliyor ve teknik bir uygulamaya nasıl yaklaşabileceğinize dair öneriler sunuyor.

## Arka plan <a name="background"></a>

AMP sayfaları, web sitenizde, Google Arama'da veya bir üçüncü taraf uygulamasında olduğu gibi birden çok bağlamda gösterilebildiğinden, kullanıcı durumu konusu AMP'de özel ilgiyi hak ediyor. Bu durum, kullanıcılar ilgili sayfalar arasında gezinirken kullanıcı durumunu yönetmede zorluklar ortaya çıkarır.

### AMP sayfaları için ekran bağlamları <a name="display-contexts-for-amp-pages"></a>

AMP'yi, içeriğin her yerde hızlı bir şekilde yüklenmesini sağlayan taşınabilir bir içerik formatı olarak düşünebilirsiniz. AMP belgeleri üç önemli bağlamda görüntülenebilir:

- Yayıncı kaynağı
- AMP önbelleği
- AMP görüntüleyici

<table>
  <tr>
    <th width="20%">Bağlam</th>
    <th width="20%">AMP olmayan sayfalar buradan sunulabilir mi?</th>
    <th width="20%">AMP sayfaları buradan sunulabilir mi?</th>
    <th>Örnek URL</th>
  </tr>
  <tr>
    <td>Yayıncı kaynağı</td>
    <td>Evet</td>
    <td>Evet</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP önbelleği</td>
    <td>Hayır</td>
    <td>Evet</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>AMP görüntüleyici</td>
    <td>Hayır</td>
    <td>Evet</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Bu durumların her birini daha yakından inceleyelim.

**Bağlam #1: Yayıncı kaynağı.** AMP sayfaları, asıl olarak yayıncının sitesinde barındırılmaları ve bu siteden erişilebilmeleri için dağıtılır, örneğin `https://example.com` sitesinde `https://example.com/article.amp.html` sayfası bulunabilir.

Yayıncılar, yalnızca AMP'de yayın yapmayı veya içeriğin iki sürümünü (yani AMP içeriği ile "eşleştirilmiş" AMP olmayan içerik) yayınlamayı tercih edebilir. "Eşleştirilmiş" model, sayfaların AMP sürümlerinin arama motorları, sosyal medya siteleri ve diğer platformlar tarafından keşfedilebilir olmasını sağlamak için bazı [özel adımlar](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) gerektirir. Her iki yayın yaklaşımı da tam olarak desteklenmektedir; Hangi yaklaşımın uygulanacağına karar vermek yayıncıya bağlıdır.

> **NOT:**
> Yukarıda açıklanan "eşleştirilmiş" yayınlama modeli nedeniyle, yayıncı kaynağı (yukarıdaki örnekte `https://example.com`), **hem AMP hem de AMP olmayan içeriğe erişilebilen** bir bağlamdır. Aslında, aşağıda açıklanan AMP önbellekleri ve AMP görüntüleyicileri yalnızca geçerli AMP içeriği sunduğu için bunun olabileceği tek bağlam budur.

**Bağlam #2: AMP önbelleği.** AMP dosyaları, içeriğin bir kullanıcının mobil cihazına ulaşma süresini azaltmak için üçüncü taraf bir önbellek tarafından bulutta önbelleğe alınabilir.

İçerik üreticileri AMP biçimini kullanarak AMP dosyalarındaki içeriği üçüncü taraflarca önbelleğe alınmak üzere kullanılabilir hale getiriyor. Bu tür bir çerçeve altında, yayıncılar içeriklerini kontrol etmeye devam eder (yukarıda ayrıntılı olarak belirtildiği gibi kaynaklarında yayın yaparak), ancak platformlar, kullanıcılara en uygun teslimat hızı için içeriği önbelleğe alabilir veya yansıtabilir.

Geleneksel olarak, bu şekilde sunulan içerik farklı bir etki alanından gelir. Örneğin, [Google AMP Önbelleği](https://developers.google.com/amp/cache/overview) içerik sunmak için `https://cdn.ampproject.org` kullanır, örneğin `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Bağlam #3: AMP görüntüleyici.** AMP biçimi, üçüncü taraf AMP görüntüleyicilerinin içine yerleştirmeyi desteklemek için oluşturulmuştur. Bu durum, AMP dosyası ile izleyici deneyimi arasında yüksek derecede işbirliğine olanak tanır; bunun faydaları arasında şunlar vardır: içeriğin akıllı ve güvenli bir şekilde önceden yüklenmesi ve önceden oluşturulması ve tam AMP sayfaları arasında kaydırma gibi yenilikçi olanaklar.

Tıpkı AMP önbellek durumu gibi, bir AMP görüntüleyicinin alan adının da yayıncı kaynağından farklı olması beklenir. Örneğin, Google Arama görüntüleyicisi `https://google.com` sitesinde barındırılır ve yayıncı içeriğini Google AMP Önbelleğinden isteyen bir iframe yerleştirir.

### Birden çok bağlam, birden çok durum yönetimi anlamına gelir <a name="multiple-contexts-means-multiple-state-management"></a>

Yayıncılar, her erkan bağlamı için kullanıcı durumunu ayrı ayrı yönetmeye hazırlıklı olmalıdır. Durumunu sürdürmek için çerezlerden veya yerel depolamadan yararlanan AMP'nin [İstemci Kimliği](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#client-id) özelliği, AMP sayfalarının kullanıcı için kararlı ve takma adlı bir tanımlayıcıya sahip olması için gerekli desteği sağlar. Uygulama açısından, çerezler veya yerel depolama kullanılır ve AMP, ekran bağlamına bağlı olarak hangisinin kullanılacağına karar verir. Bu seçim, yüzlerce veya binlerce yayıncıya ölçeklenmiş bu durumu yönetmenin teknik fizibilitesinden etkilenir.

Bununla birlikte, AMP sayfalarının yayıncıları, birden çok bağlamı içeren kullanıcı gezintilerini kolayca (farkında olmadan) tasarlayabilir. Alışveriş sepeti kullanım senaryosuna önceki bakışımızı tekrar gözden geçirelim ve tam bir **kullanıcı hikayesi** oluşturmak için ona biraz daha ayrıntı ekleyelim:

> _1. günde, kullanıcı Google Arama aracılığıyla Example Inc.'e ait bir AMP sayfası keşfeder. Google Arama, AMP sayfalarını bir AMP görüntüleyicide yükler. Sayfayı görüntülerken, kullanıcı alışveriş sepetine dört ürün ekler ancak satın alma işlemini tamamlamaz. İki hafta sonra, 15. günde, kullanıcı satın almayı düşündüğü dört ürünü hatırlar ve şimdi satın alma zamanının geldiğine karar verir. Example Inc.'in ana sayfasına `https://example.com` doğrudan erişir (bu, AMP olmayan bir ana sayfadır) ve dört ürünün hala alışveriş sepetinde kayıtlı olduğunu görür._

Bu senaryoda, kullanıcı, AMP görüntüleyici bağlamından yayıncı kaynak bağlamına geçmesine ve bu etkinlikler arasında bir süre geçmesine rağmen tutarlı bir alışveriş sepeti deneyimi yaşar. Bu deneyim çok makuldür ve eğer bir alışveriş deneyimi tasarlıyorsanız, böyle bir deneyimi desteklemeniz gerekir, peki bunu nasıl gerçekleştirebilirsiniz?

**Bunu ve kullanıcı durumunu içeren herhangi bir deneyimi etkinleştirmek için, kullanıcının geçtiği tüm bağlamların ayrı ayrı tutulan durumlarını birbirleriyle paylaşması gerekir.** Çerez değerlerini bu bağlamsal sınırlar boyunca kullanıcı tanımlayıcılarla paylaşma fikrini düşünüp "Mükemmel!" diyeceksinizdir. Ama bir pürüz var: Bu bağlamların her biri aynı yayıncının kontrolündeki içeriği görüntülese de, her biri diğerini üçüncü taraf olarak görüyor çünkü her bağlam farklı etki alanında barındırılıyor.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="AMP'nin birçok bağlamda görüntülenebilme yeteneği, bu bağlamların her birinin tanımlayıcılar için kendi depolamasına sahip olduğu anlamına gelir" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Aşağıdaki tartışmada göreceğiniz gibi, çerezlerle etkileşim kurarken üçüncü taraf konumunda olmak, kullanıcının tarayıcı ayarlarının nasıl yapılandırıldığına bağlı olarak zorluklara neden olabilir. Özellikle, üçüncü taraf çerezleri belirli bir durumda engellenirse, bilgiler bağlamlar arasında paylaşılamayacaktır. Öte yandan, üçüncü taraf çerez işlemlerine izin verilirse, bilgiler paylaşılabilecektir.

## Uygulama kılavuzu <a name="implementation-guide"></a>

Bu bölüm, kullanıcı durumunu yönetmeye yönelik öneriler sunuyor. Aşağıdaki görevler bir sıralı dizi olarak sunulmuştur, ancak büyük ölçüde iki öbek halinde görülebilir:

**Öbek #1: Temel uygulama:** 1-4. Görevler, temel öğelerin çalışması için gereklidir. İşi kısmen halletmek için gereken minimum bir dizi özelliğe dayanırlar: AMP'nin İstemci Kimliği değişikliği, çerezleri okuma ve yazma ve bir arka uç eşleştirme tablosunu yönetme. Neden "kısmen"? Bu görevlerde iletilen adımlar çerezleri okuma ve yazmaya dayandığından ve tarayıcının çerez ayarları belirli durumlarda bunu engelleyebileceğinden, bu görevler kümesi tüm senaryolarda kullanıcı durumunu tam olarak yönetmek için muhtemelen yetersiz olacaktır.

Temeli oluşturduktan sonra, daha dar bir kullanım alanı yelpazesine sahip ancak bu kullanım durumları için eksiksiz bir çözüm sunan bir konuyu ziyaret ediyoruz.

**Öbek #2: Bağlantı verme ve form göndermede İstemci Kimliğini kullanma:** 5. Görev'de, kullanıcının bir sayfadan doğrudan bir başkasına geçiş yaptığı bağlamsal sınırlar boyunca AMP İstemci Kimliği bilgilerini geçirmek için bağlantı geçişinden ve/veya form gönderiminden yararlanmayı öğreneceksiniz.

> **DİKKAT:**
> Aşağıdaki uygulama kılavuzu, çerezlerin kullanımını ve bunlarla çalışılmasını tavsiye eder. Unutulmaması gereken önemli öneriler için [kesinlikle önerilen uygulamalar](#strongly-recommended-practices) bölümüne başvurduğunuzdan emin olun.

### Başlamadan önce <a name="before-getting-started"></a>

Aşağıdaki teknik kılavuzu incelerken, **kullanıcı durumunu**, kullanıcıyı temsil eden kararlı bir **tanımlayıcıya** bağlayacağınızı varsayalım. Örneğin, tanımlayıcı `n34ic982n2386n30` şeklinde görünebilir. Ardından, sunucu tarafında, `n34ic982n2386n30` tanımlayıcısını alışveriş sepeti içeriği, önceden okunan makalelerin listesi veya kullanım durumuna bağlı olarak diğer veriler gibi herhangi bir kullanıcı durumu bilgisi kümesiyle ilişkilendirirsiniz.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Birçok kullanım durumunda kullanıcı durumunu yönetmek için tek bir tanımlayıcı kullanılabilir" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Bu belgenin geri kalanında netlik sağlamak için, önünde dolar işareti (`$`) bulunan, daha okunabilir adlara sahip tanımlayıcılardan oluşan çeşitli karakter dizilerini çağıracağız:

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Kullanım örneğimiz:** Bu kılavuz boyunca, mümkün olan en doğru kullanıcı sayımına ulaşmak istediğimiz basit sayfa görüntüleme takibi (yani analiz) elde etmek için tasarlanmış bir örnek üzerinde çalışacağız. Bu, kullanıcı belirli bir yayıncının içeriğine farklı bağlamlardan erişiyor olsa bile (AMP ve AMP olmayan sayfalar arasında geçişler dahil), bu ziyaretlerin, kullanıcı tıpkı ilgili yayıncının geleneksel AMP olmayan sayfalarında geziniyormuş gibi tek bir kullanıcı anlayışıyla sayılmasını istiyoruz.

**Kararlı çerez değerlerinin kullanılabilirliği hakkında varsayım:** Çerez değerlerinin korunmasını ve kullanıcının oturumları boyunca zaman içinde kullanılabilir kalmasını sağlamak için kullanıcının aynı cihazı, tarayıcıyı ve gizli/görünmez olmayan göz atmayı kullandığını da varsayıyoruz. Durum böyle değilse, bu tekniklerin işe yaraması beklenmemelidir. Bu gerekliyse, kullanıcı durumunu kullanıcının giriş yapmış (yani oturum açmış) kimliğine göre yönetmeye çalışın.

**Aşağıda sunulan kavramlar diğer kullanım durumlarına da uygulanabilir:** Yalnızca analiz amaçlı kullanım senaryosuna odaklanmamıza rağmen, aşağıda iletilen kavramlar, bağlamlar arasında kullanıcı durumu yönetimini gerektiren diğer kullanım durumları için de kullanılacak şekilde ayarlanabilir.

<a id="task1"></a>

### 1. Görev: Yayıncı kaynağındaki AMP olmayan sayfalar için bir tanımlayıcı belirleme ve analiz ping gönderme <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Yayıncı kaynağından sunulan AMP olmayan sayfalar için analizleri yapılandırarak başlayalım. Bu işlem, Google Analytics veya Adobe Analytics gibi bir analiz paketi kullanmak veya özel bir uygulama yazmak dahil olmak üzere birçok yolla başarılabilir.

Bir tedarikçiden bir analiz paketi kullanıyorsanız, bu paketin yapılandırma kodu ve API'leri aracılığıyla hem çerezlerin ayarlanmasıyla hem de ping'lerin iletmesiyle ilgileniyor olması muhtemeldir. Durum böyleyse, analitik yaklaşımınızla uyumlu olduklarından emin olmak için aşağıdaki adımları okumalısınız, ancak bu görevi tamamlamanın bir parçası olarak herhangi bir değişiklik yapmanız gerekmeyecektir.

Bu görevin geri kalanı, kendi analiz yaklaşımınızı ayarlamak istiyorsanız size kılavuzluk edecektir.

##### Birinci taraf çerezleri kullanarak bir tanımlayıcı oluşturma <a name="set-up-an-identifier-using-first-party-cookies"></a>

Yayıncı kaynağınızdan sunulan AMP olmayan sayfalarınız varsa, bu sayfalarda kullanılmak üzere kalıcı ve kararlı bir tanımlayıcı ayarlayın. Bu genellikle [birinci taraf çerezleriyle uygulanır](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Örneğimizin amaçları doğrultusunda, bir kullanıcının ilk ziyaretinde oluşturulacak `uid` ("kullanıcı tanımlayıcı") adında bir çerez ayarladığınızı varsayalım. Kullanıcının ilk ziyareti değilse, daha önce ilk ziyarette ayarlanmış olan değeri okuyun.

Yani, yayıncı kaynağında AMP olmayan sayfaların durumuna ilişkin iki durum olur:

**Durum #1: İlk ziyaret.** AMP olmayan sayfaya ilk kez girildiğinde, çerez olmayacaktır. Çerezi içeriği ayarlanmadan önce kontrol ettiyseniz, içinde `uid` tanımlayıcısına karşılık gelen hiçbir değer ayarlanmadığını görürsünüz:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

İlk yükleme içinde bir zamanda çerez ayarlanmalıdır; bunu, sayfa yüklendiği anda yaparsanız, bir değerin ayarlandığını göreceksiniz:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Durum #2: İlk ziyaret değil.** Ayarlı bir çerez olacaktır. Dolayısıyla, sayfada geliştirici konsolunu açarsanız şunu görürsünüz:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Analiz ping'leri gönderme <a name="send-analytics-pings"></a>

Bir tanımlayıcı oluşturduktan sonra, onu artık sayfa görüntülemelerini izlemeye başlamak için analiz ping'lerine dahil edebilirsiniz.

Detaylı uygulama, istediğiniz yapılandırmaya bağlı olacaktır, ancak genellikle, analiz sunucunuza, isteğin kendi URL'sinde yararlı veriler içeren pingl'er (istekler) göndermek isteyeceksiniz. Çerez değerinizi isteğe nasıl dahil edeceğinizi de gösteren bir örnek aşağıda verilmiştir:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Yukarıdaki örnekte, kullanıcı tanımlayıcısının belirli bir sorgu parametresi olan `user_id` belirtildiğini göz önünde bulundurun:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

Buradaki "`user_id`" kullanımı, analiz sunucunuzun işlemeyi beklediği içerikle belirlenmelidir ve tanımlayıcıyı yerel olarak depolayan çerez denen şeye özel olarak bağlı değildir.

<a id="task2"></a>

### 2. Görev: AMP sayfaları için bir tanımlayıcı belirleme ve amp-analytics ping'lerine İstemci Kimliği değişimini ekleyerek analiz ping'leri gönderme <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Şimdi AMP sayfalarına dönersek, analiz için bir tanımlayıcıyı nasıl oluşturup iletebileceğinize bakalım. Bu işlem, AMP sayfasının sunulduğu bağlamdan bağımsız olarak geçerli olacaktır, dolayısıyla yayıncı kaynağındaki, bir AMP önbelleği aracılığıyla sunulan veya AMP görüntüleyicide görüntülenen herhangi bir AMP sayfasını kapsar.

İstemci Kimliği gerektiren özelliklerin kullanılması yoluyla, AMP, istemci kimliği değerlerini oluşturmak ve depolamak ve bunları gerektiren özelliklerde harekete geçirmek için "arka plan" çalışmasını yapacaktır. AMP'nin İstemci Kimliğini kullanabilen temel özelliklerden biri, analiz kullanım durumu örneğimizi uygulamak için tam olarak ihtiyaç duyduğumuz şey olan [amp-analytics'tir](https://amp.dev/documentation/components/amp-analytics) .

AMP sayfalarında, İstemci Kimliğini içeren bir amp-analytics ping'i oluşturun:

<table>
  <tr>
    <td width="40%"><strong>amp-analytics yapılandırması şuna benzer:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Ağ üzerinden giden şuna benzer:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>Bu durumda, <code>${clientId(uid)}</code>, AMP'nin o anda ürettiği gerçek bir değerle değiştirilir veya kullanıcının tarayıcısının yerel olarak zaten depoladığı değere bağlı şekilde çıktı olarak döndürülür.</em></p>
</td>
  </tr>
</table>

İstemci Kimliği değişikliğinde aktarılan parametrenin, `${clientId(uid)`, `uid` olduğuna dikkat edin. Bu [1. Görevde](#task1) açıklandığı gibi yayıncı kaynağında kullanılan çerez adının aynısıyla eşleşme sağlayan bilinçli bir seçimdi. En sorunsuz entegrasyon için aynı tekniği uygulamalısınız.

amp-analytics uygulamasının geri kalanıyla ilgili olarak, amp-analytics isteklerini nasıl ayarlayacağınız veya analiz tedarikçilerinin istekleri üzerinde nasıl değişiklik yapabileceğiniz hakkında daha fazla ayrıntı için [amp-analytics yapılandırmasına](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) yönelik belgelere bakın. Ping, doğrudan veya diğer [AMP değişikliklerinden](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) yararlanarak tanımladığınız ek verileri taşımak için daha da değiştirilebilir.

> **Faydalı bilgi:**
> İstemci Kimliği özelliğine geçirilen parametre için neden `uid` adını kullandık? Kapsamı tanımlamak için `clientId(...)` değişikliğinin aldığı parametre kullanılır. İstemci Kimliği özelliği aslında birçok kullanım durumu için kullanabilir ve sonuç olarak birçok istemci kimliği oluşturabilirsiniz. Parametre, bu kullanım durumları arasında farklılık gösterir ve bu nedenle, onu İstemci Kimliğini hangi kullanım durumu için istediğinizi belirtmek için kullanırsınız. Örneğin, bir reklamveren gibi üçüncü taraflara farklı tanımlayıcılar göndermek isteyebilir ve bunu başarmak için "kapsam" parametresini kullanabilirsiniz.

Yayıncı kaynağında, "kapsamı" çerez olarak adlandırdığınız şey olarak düşünmek en kolayıdır. Burada [2. Görevde](#task2) İstemci Kimliği parametresi için bir `uid` değeri önererek, [1. Görevdeki](#task1) `uid` adlı bir çerez kullanma seçimiyle uyumluyuz.

<a id="task3"></a>

### 3. Görev: Yayıncı kaynağındaki sayfalardan analiz ping'lerini işleme <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

1. ve 2. Görev'de gerçekleştirilen kurulum nedeniyle, bir kullanıcı yayıncı kaynağında AMP olmayan sürüme veya AMP sürümüne (herhangi bir bağlamdan) eriştiğinde, analiz ping'i aynı tanımlayıcıyı kullanacaktır. AMP, [1. Görev'de](#task2) kullandığınız çerezin adıyla aynı ada sahip bir İstemci Kimliği "kapsamı" seçmek için [2. Görevdeki](#task1) yönergeyi izleyerek, aynı çerezi yeniden kullanır.

Bu, aşağıdaki tabloda gösterilmektedir:

<table>
  <tr>
    <td width="40%">
<strong>Yayıncı kaynağındaki AMP olmayan bir sayfadan </strong> gelen bir analiz ping'i şuna benzer:</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>
<strong>Yayıncı kaynağındaki bir AMP sayfasından </strong> gelen bir analiz ping'i şuna benzer</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>Bu durumda aynıdır! Bir <code>uid</code> kapsam değeri seçilerek, <code>uid</code> çerezinin temel değeri olan <code>$publisher_origin_identifier</code> kullanılır.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### 4. Görev: AMP önbelleğinden veya AMP görüntüleyici ekran bağlamlarından gelen analiz ping'lerini işleme ve tanımlayıcı eşleşmeleri oluşturma (gerekirse) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

AMP önbelleğinde veya AMP görüntüleyicide görüntülenen AMP sayfalarından veri iletmek için [2. Görevde](#task2) analiz ping'leri ayarladığımızda, ayrıca bir sorun yarattık. Daha önce tartışıldığı gibi, AMP önbelleği ve AMP görüntüleyici bağlamları, yayıncının kaynak bağlamından farklıdır ve bu da beraberinde, tanımlayıcıların çalışmaya devam etmesini sağlamak için farklı bir yolu gelir. Kullanıcıları fazla saymak gibi sorunları önleyecek şekilde bu ping'leri işlemek adına bazı [adımlar atacağız](#implementation-steps) ve tanımlayıcıları olabildiğince sık şekilde uzlaştırmayı deneyeceğiz.

Attığımız adımları açıklamaya yardımcı olmak için, önce fazla sayma sorununun tam olarak nasıl ortaya çıktığını yeniden düşünmek faydalı olacaktır.

#### Sorunu gözden geçirme <a name="reviewing-the-problem"></a>

Aşağıdaki akışa göz atın:

1. Bir kullanıcı, `https://google.com/amp/s/example.com/article.amp.html` gibi **AMP görüntüleyici ekran bağlamında AMP sayfasını** ziyaret eder. AMP görüntüleyicinin yayıncı kaynağındaki `uid` çerezine erişimi olmadığından, kullanıcıyı tanımlamak için rastgele bir `$amp_client_id` değeri oluşturulur.
2. Daha sonra aynı kullanıcı, **yayıncı kaynağındaki bir sayfayı `https://example.com `** ziyaret eder. [3. Görevde](#task3) açıklandığı gibi, kullanıcı `$publisher_origin_identifier ` ile tanımlanır.

Burada (1) ve (2) farklı kaynaklarda (veya bağlamlarda) gerçekleşir. Bu nedenle, paylaşılan bir durum yoktur ve `$amp_client_id`, `$publisher_origin_identifier` öğesinden farklıdır. Öyleyse, bunun etkisi nedir? (1) tek bir kullanıcıya benzeyen tek bir sayfa görüntüleme oturumu iken (2) başka bir kullanıcıdan geliyor gibi görünen başka bir tek sayfa görüntüleme oturumudur. **Temel olarak, kullanıcı `https://example.com` içeriğiyle ilgilenmiş olsa bile, kullanıcıları fazla sayarız ve (1)'deki kullanıcı bir hemen çıkma (tek bir sayfa ziyareti) gibi görünür.**

#### Çözüm stratejisi <a name="solution-strategy"></a>

Fazla sayma sorununu çözmek için, kuvveti, üçüncü taraf çerezlerinin okunmasına veya yazılmasına izin verilip verilmediğine bağlı olan aşağıdaki stratejiyi uygulamalısınız:

- **Anında tanımlayıcı uzlaşması: Yayıncının kaynak çerezlerine erişebilir veya bunları değiştirebilirseniz**, yayıncı kaynak tanımlayıcısını kullanın veya oluşturun ve analiz isteğindeki herhangi bir tanımlayıcıyı yok sayın. İki bağlam arasındaki etkinliği başarılı bir şekilde bağlayabileceksiniz.
- **Gecikmeli tanımlayıcı uzlaşması: Yayıncı kaynak tanımlayıcısına (yani çerezlere) erişemez veya onu değiştiremezseniz**, analiz isteğiyle birlikte gelen AMP İstemci Kimliğine geri dönün. Bu tanımlayıcıyı, üçüncü taraf çerez engellemesi nedeniyle zaten yapamayacağınız yeni bir yayıncı kaynak tanımlayıcı (çerez) kullanma veya oluşturma yerine bir "**takma ad**" olarak kullanın ve takma adı bir **eşleştirme tablosuna** ekleyin. Etkinliği iki bağlam arasında anında bağlamada başarısız olursunuz, ancak bir eşleştirme tablosu kullanarak AMP İstemci Kimliği değerini, kullanıcının ilerideki bir ziyaretinde yayıncı kaynak tanımlayıcısına bağlayabilirsiniz. Bu gerçekleştiğinde, etkinliği bağlamak ve farklı bağlamlardaki sayfa ziyaretlerinin aynı kullanıcıdan geldiği konusunda uzlaşmak için gerekli bilgilere sahip olacaksınız. 5. Görev, kullanıcının hemen bir sayfadan diğerine geçtiği belirli senaryolarda eksiksiz bir çözüme nasıl ulaşılacağını açıklıyor.

#### Uygulama adımları <a name="implementation-steps"></a>

Sunucuda mevcut bir yayıncı kaynak tanımlayıcısı var mı diye kontrol edin

Analiz isteğinin bir parçası olarak gönderilen çerezleri okuyun. Örneğimizde bu, example.com'dan `uid` çerezini kontrol etmek anlamına geliyor.

- `uid` değeri başarıyla okunursa, bunu analiz verilerini kaydetmek için kullanın (**analiz kaydı tanımlayıcısı**). [1. Görev](#task1) sayesinde, bu tanımlayıcının değerinin `$publisher_origin_identifier` olduğunu biliyoruz. Bir analiz kaydı tanımlayıcısı belirlendikten sonra [Veri depolama](#data-storage) bölümüne atlayabiliriz.
- `uid` değeri başarıyla okunmazsa, eşleştirme tablosunu içeren aşağıdaki adımlarla devam edin.

##### Eşleştirme tablosu <a name="mapping-table"></a>

Eşleştirme tablomuz, analiz ping'lerinde görülen AMP İstemci Kimliği değerlerini yayıncı kaynak tanımlayıcılarıyla aşağıdaki şekilde ilişkilendirir:

<table>
  <tr>
    <th width="50%"><strong>Yayıncı kaynağındaki kullanıcı kimliği</strong></th>
    <th width="50%"><strong>AMP sayfasındaki yayıncı kaynaklı olmayan kullanıcı kimliği ("takma ad")</strong></th>
  </tr>
  <tr>
    <td>Yayıncı kaynak tanımlayıcısından gelir veya yayıncı kaynak tanımlayıcısına erişilemiyorsa olası bir değer olarak oluşturulur.</td>
    <td>AMP İstemci Kimliğinden gelir</td>
  </tr>
</table>

Yayıncı kaynak tanımlayıcısını okumada başarısız olduğunuzu belirledikten hemen sonra, analiz ping'inde yer alan AMP İstemci Kimliğinin bir eşleştirmede zaten kullanılıp kullanılmadığını kontrol edin. Bunu yapmak için önce İstemci Kimliği değerini almak üzere gelen amp-analytics isteğine başvurun. Örneğin, bu şu istekten:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

AMP İstemci Kimliğine karşılık gelen koyu renkli bölümü çıkarıyoruz: `$amp_client_id`.

Ardından, "takma ad" sütununda aynı değeri bulmaya çalışmak için eşleştirme tablosunu inceleyin:

<table>
  <tr>
    <th width="50%"><strong>Yayıncı kaynağındaki kullanıcı kimliği</strong></th>
    <th width="50%"><strong>AMP sayfasındaki yayıncı kaynaklı olmayan kullanıcı kimliği ("takma ad")</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Yukarıdaki örnekte, zaten var olan bir kaydı bulduk. AMP İstemci Kimliği ile eşleştirilmiş bulduğumuz değer, analiz kaydı tanımlayıcısı olur. İşte bu, `$existing_publisher_origin_identifier`'dır. Bir analiz kaydı tanımlayıcısı oluşturulduktan sonra [Veri depolama](#data-storage) bölümüne geçebiliriz.

Aksi takdirde, AMP İstemci Kimliği bir eşleştirmede bulunmazsa, bir eşleştirme oluşturmamız gerekir:

1. Potansiyel bir **yayıncı kaynak tanımlayıcısı oluşturun**. Aşağıdaki örneklerde bunu `$prospective_identifier` olarak adlandıralım. Bu değer, yukarıdaki [1. Görev'de](#task1) açıklandığı gibi, yayıncı kaynağında değeri ayarlama şeklinize göre oluşturulmalıdır.
2. Ardından, muhtemel yayıncı kaynak tanımlayıcısını yayıncı kaynağı üzerinde bir çerez olarak [ayarlamayı](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) deneyin. Bu işlem, üçüncü taraf tanımlama bilgileri yazılabilirse başarılı olur, aksi takdirde başarısız olur.
3. Ardından, {olası yayıncı kaynak tanımlayıcısı, AMP İstemci Kimliği} çiftini kaydedin.

Oluşturduğumuz eşleştirme şu şekilde görünüyor:

<table>
  <tr>
    <th><strong>Yayıncı kaynağındaki kullanıcı kimliği</strong></th>
    <th><strong>AMP sayfasındaki yayıncı kaynaklı olmayan kullanıcı kimliği ("takma ad")</strong></th>
  </tr>
  <tr>
    <td>
<code>$prospective_identifier</code> (analiz ping</td>
    <td> <code>$amp_client_id</code> (analiz ping</td>
  </tr>
</table>

Olası yayıncı kaynak tanımlayıcısını analiz kaydı tanımlayıcısı olarak kullanacağız çünkü bu, yayıncı kaynağındaki durumla ilişkili değerdir. Bu durumda, ilgili `$prospective_identifier`, aşağıdaki [Veri depolama](#data-storage) bölümünde devreye girecektir.

##### Veri depolama <a name="data-storage"></a>

Artık analiz kaydı tanımlayıcısını anladığınıza göre, bu tanımlayıcı tarafından girilen kullanıcı durum bilgilerini (bu durumda analiz verileri) gerçek anlamda depolayabilirsiniz:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### 5. Görev: Bağlantı vermede ve form gönderiminde İstemci Kimliği kullanma <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

Genel olarak, üçüncü taraf çerezlerinin okunmasına ve yazılmasına izin verilmediğinde, kullanıcı durumunu yönetmenin tam etkinlikle yapılmasının imkansız olduğu durumlar olacaktır. Görev 1-4'te, attığımız adımlar iki şekilde yardımcı olacaktır: (1) Üçüncü taraf çerezlerini okurken ve yazarken tamamen etkili bir çözüm sağlarlar ve (2) sistemimizi, tarayıcının çerez ayarları nedeniyle hemen uzlaşma imkansızsa, bağlamlar arası tanımlayıcıları uzlaştırmak için olası herhangi bir fırsattan yararlanacak şekilde ayarlarlar.

Bu görevde, kullanıcı **bağlantı veya form gönderimleri yoluyla** bir sayfadan diğerine bağlamlar arasında gezinirken yardımcı olan ek bir optimizasyonu ele alacağız. Bu durumlarda ve aşağıda açıklanan uygulama çalışmasıyla, bağlamlar arasında kullanıcı durumunu yönetmek için tamamen etkili bir şema kurmak mümkündür.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Bağlantılar, bir bağlamın tanımlayıcı bilgilerini başka bir (bağlantılı) bağlama geçirmek için kullanılabilir." src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Değiştirme özelliklerini kullanma <a name="using-substitution-features"></a>

Yaklaşımımız iki tür [AMP değişken değiştirmesinden](https://github.com/ampproject/amphtml/blob/main/spec/./amp-var-substitutions.md) yararlanacaktır.

**Giden bağlantıları bir İstemci Kimliği değiştirmesi kullanmak üzere güncellemek için:**URL içinde görünecek ve **kullanıcı için kaynak bağlam tanımlayıcısını belirtecek** yeni bir sorgu parametresi, `ref_id` ("yönlendiren kimliği") tanımlayın. Bu sorgu parametresini AMP’nin İstemci Kimliği değişikliğinin değerine eşit olacak şekilde ayarlayın:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**İstemci Kimliğini dışarı giden bağlantılara geçirmek için alternatif çözüm:** `data-amp-addparams` veri özniteliğinin bir parçası olarak `ref_id` yeni sorgu parametresini tanımlayın ve parametre değişikliğine ihtiyaç duyan sorgular için bu ayrıntıları `data-amp-replace` parçası olarak sunun. Bu yaklaşımla, URL temiz görünür ve `data-amp-addparams` üzerinde belirtilen parametreler dinamik olarak eklenir

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

code0}data-amp-addparams yoluyla birden fazla sorgu parametresi geçirirken bunları şu şekilde `&` ile ayırın:

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**İstemci Kimliği değişikliği kullanmak adına form girişlerini güncellemek için:** Giriş alanı için `orig_user_id` gibi bir ad tanımlayın. Form alanının `default-value` değerini, AMP İstemci Kimliği değişikliğinin değeri olacak şekilde belirtin:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Bu adımları uygulayarak, İstemci Kimliği, hedef sunucu tarafından kullanılabilir ve/veya kullanıcının bağlantı tıklaması veya form gönderimi ( **hedef bağlam**) sonrasında girdiği sayfada bir URL parametresi olarak kullanılabilir. İsim (veya "anahtar") `ref_id` olacaktır çünkü yukarıdaki uygulamalarda onu böyle tanımlamıştık ve İstemci Kimliğine eşit bir ilişkili değere sahip olacaktır. Örneğin, yukarıda tanımlanan bağlantıyı (`<a>` etiketi) izleyerek, kullanıcı şu URL'ye gidecektir:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="AMP görüntüleyici bağlamındaki bir tanımlayıcının bağlantı yoluyla bir yayıncı kaynak bağlamına nasıl geçirilebileceğine ilişkin örnek" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Kullanıcı, URL parametresi olarak veya başlık içinde bir `ref_id` değeri bulunan bir sayfaya geldiğinde, `ref_id` tanımlayıcısını sayfa aracılığıyla gösterilen tanımlayıcı (yani bir çerez değeri) ile birlikte işleme şansımız olur. Analiz sunucunuz her ikisini de bir analiz ping'ine dahil ederek her iki değerle aynı anda çalışabilir ve birbirleriyle ilişkili olduklarını bilerek bu ilişkiyi arka ucunuza yansıtabilir. Bir sonraki adım, bunun nasıl yapılacağına dair ayrıntıları sunuyor.

##### URL sorgu parametrelerini çıkarma <a name="extracting-url-query-parameters"></a>

Değiştirme özelliklerini kullanarak, bilgileri, bilhassa İstemci Kimliğini hedef sunucuya gösteren ve/veya kullanıcı gezinmeyi tamamladığında istemcide okunabilen bir URL parametresi olarak yansıtan bir bağlantı gezinme akışı veya form gönderme akışı oluşturuyoruz.

Bilgi yalnızca sunucuya, örneğin bir POST formu aracılığıyla, gösterilmişse, bilgileri işlemeye ve sonuçta ortaya çıkan sayfayı oluşturmaya devam edebilirsiniz. Bu tür verileri işlerken, lütfen aşağıda ayrıntıları verilen [Parametre doğrulama](#parameter-validation) ile ilgili adımları göz önünde bulundurun.

Bilgiler URL aracılığıyla mevcutsa ve onları işlemek istiyorsanız, kullanabileceğiniz birkaç yaklaşım vardır:

- Yeniden yönlendirme sırasında işleme (sunucu tarafında işleme)
- Açılış sayfasında işleme (istemci tarafında işleme)

**Yeniden yönlendirme sırasında işleme (sunucu tarafında işleme)**

Yeniden yönlendirme sırasında işlemek için, sunucudaki isteği gerçekleştirin ve ilgili parametreleri çıkartın. Lütfen aşağıda ayrıntıları verilen [Parametre doğrulama](#parameter-validation) ilgili ilgili adımları göz önünde bulundurun. Diğer ilgili tanımlayıcıları içeren çerez değerleriyle birlikte verileri işleyin ve ardından parametreleri içermeyen bir URL'ye yönlendirin.

**Açılış sayfasında işleme (istemci tarafında işleme)**

Açılış sayfasında işlemek için yaklaşım, söz konusu sayfanın bir AMP sayfası veya AMP olmayan bir sayfa olmasına bağlı olarak değişecektir.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="URL aracılığıyla sağlanan önceki bağlamdan bir tanımlayıcı ve geçerli bağlamdan bir tanımlayıcı içeren bir analiz pinginin nasıl oluşturulacağına ilişkin örnek" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_AMP sayfasında yapılan güncellemeler:_ URL içindeki `ref_id` tanımlayıcı değerini almak için amp-analytics yapılandırmanızdaki Sorgu Parametresi değiştirme özelliğini kullanın. Sorgu Parametresi özelliği, URL'de istenen anahtar/değer çiftinin "anahtarını" belirten bir parametre alır ve karşılık gelen değeri yanıt olarak döndürür. AMP sayfa bağlamı tanımlayıcısını almak için yaptığımız gibi İstemci Kimliği özelliğini kullanın.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Bu, ağ üzerinden iletildiğinde, gerçek değerler değiştirilecektir:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Yukarıdaki örneklerimizi takip edersek, elimizde şu var:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

öyleyse ping aslında:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Aşağıdaki [Parametre doğrulama](#parameter-validation) bölümünde açıklanan adımları kullanarak sorgu parametresi değerlerinin gerçekliğini doğrulamanızı öneririz.

_AMP olmayan sayfada yapılan güncellemeler: _ Benzer şekilde, yayıncınızın kaynağından sunulan AMP olmayan bir sayfada, URL'de bulunan `ref_id` değerini çıkarın ve iletin. Aşağıdaki [Parametre doğrulama](#parameter-validation) bölümünde belirtilen adımları izleyerek değerin gerçekliğini doğrulayın. Ardından, hem `ref_id`'den türetilen bir `orig_user_id` hem de birinci taraf çerez tanımlayıcısının değerine göre bir `user_id` içerecek analiz ping'leri oluşturun.

<blockquote>
<p><strong>ÖNEMLİ:</strong></p>
<p>Açılış sayfasında parametreleri istemci tarafında işlemeyi seçerseniz, açılış sayfası, tanımlayıcı yakalanabildiği anda tanımlayıcı bilgilerini URL'lerden kaldırmalıdır.</p>
<p>Parametreleri kaldırmadan önce, onları okumak için çalıştırılması gereken diğer kodun şu durumda olduğundan emin olun:</p>
<ul>
  <li>Kaldırma işlemi gerçekleşmeden önce çalışıyor olmak; veya</li>
  <li>Parametreleri okuyan ve kaldıran kodun verileri depoladığı bir yere erişebilmek</li>
</ul>
<p>Bunu AMP olmayan sayfanızda yapmak için, tüm sorgu parametrelerini URL'den kaldıracak aşağıdaki JavaScript'i ekleyin:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Daha az sorgu parametresini kaldırmak için bunu gerektiği şekilde uyarlayın.</p>
</blockquote>

##### Bir analiz ping'inde birden çok tanımlayıcıyı işleme <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

Analiz ping'ini yalnızca bir tanımlayıcı değeri içerecek şekilde yapılandırdığımız [4. Görevden](#task4) farklı olarak, 5. Görevde şu ana kadar attığımız adımlar sayesinde artık iki tane tanımlayıcı var: `orig_user_id` ve `user_id`. Aşağıda, gelen analiz ping'inin parçası olan bu iki tanımlayıcının nasıl işleneceğini ele alacağız.

Devam etmeden önce, aşağıdaki [Parametre doğrulama](#parameter-validation) bölümünde açıklanan adımları hesaba kattığınızdan ve `orig_user_id` ve `user_id` ile belirtilen değerlerin her ikisine de güvenmeye hazır olduğunuzdan emin olun.

Eşleştirme tablonuzda, karşılık gelen değerlerden herhangi birinin olup olmadığını kontrol edin. Yukarıdaki örneğimizde, ilk sayfa görüntüleme, yayıncı kaynağında OLMAYAN bir AMP sayfasında gerçekleşir ve ardından, yayıncı kaynağında gerçekleşen ikinci sayfa görüntüleme gelir. Sonuç olarak, analiz ping sorgu parametrelerinin değerleri şöyle görünecektir:

**Durum #1: Analiz ping'i yayıncı kaynağındaki sayfadan gönderildiğinde tanımlayıcı düzenlemesi**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>Yayıncı kaynağındaki kullanıcı kimliği</strong></th>
    <th width="40%"><strong>AMP sayfasındaki yayıncı kaynaklı olmayan kullanıcı kimliği ("takma ad")</strong></th>
  </tr>
  <tr>
    <td><strong>Analiz ping'inde ifade şekli</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parametre anahtarı</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Parametre değeri</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Yukarıdaki örnek akışımızın nasıl yapılandırıldığına göre, ilk sayfa görüntülemeden gelen tanımlayıcının en sağdaki sütunda ve ikinci sayfa görüntülemeden gelen tanımlayıcının orta sütunda olduğuna lütfen dikkat edin.

Bunun yerine, kullanıcı yayıncı kaynağından sunulan bir sayfada başlar ve daha sonra yayıncı kaynağında OLMAYAN bir AMP sayfasına giderse, bu durumda parametrelerin anahtarları tersine çevrilecektir, ancak değerlere referans verme yöntemimiz çevrilmeyecektir (yani, `$amp_client_id` her zaman, bir AMP sayfasında saklanan ve yayıncı kaynağında OLMAYAN bir tanımlayıcıya referans verecektir):

**Örnek #2: Analiz ping'i yayıncı kaynağında OLMAYAN bir AMP sayfasından gönderildiğinde tanımlayıcı düzenlemesi**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>Yayıncı kaynağındaki kullanıcı kimliği</strong></th>
    <th width="40%"><strong>AMP sayfasındaki yayıncı kaynaklı olmayan kullanıcı kimliği ("takma ad")</strong></th>
  </tr>
  <tr>
    <td><strong>Analiz ping'inde ifade şekli</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parametre anahtarı</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Parametre değeri</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Eşleştirme tablosunda arama yaparken, hangi durumun geçerli olduğuna dikkat edin ve görünmelerini beklediğiniz eşleştirme tablosu sütunlarında değerleri arayın. Örneğin, analiz ping'i yayıncı kaynağındaki bir sayfadan gönderiliyorsa (Durum #1), "Yayıncı kaynağında Kullanıcı Kimliği" eşleştirme tablosu sütununda `user_id` ile anahtarlanan değerleri ve "AMP sayfasındaki yayıncı kaynaklı OLMAYAN kullanıcı kimliği ('takma ad')" sütununda `orig_user_id` ile anahtarlanan değerleri kontrol edin.

Eşleştirme tablonuzda kullanılan tanımlayıcı değerlerinden herhangi birini bulamazsanız, yeni bir eşleştirme oluşturun:

- Analiz isteği yayıncınızın kaynağındakş bir sayfadan geliyorsa, analiz kaydı tanımlayıcısı olarak `uid`'e karşılık gelen değeri seçmelisiniz; ayrıca `orig_uid` değerini "takma ad" olarak seçin.
- Analiz isteği yayıncınızın kaynağındaki bir sayfadan gelmiyorsa, `uid`'e karşılık gelen değeri, eşleştirme tablosunda bir "takma ad" değeri olarak seçmelisiniz. Ardından, muhtemel bir yayıncı kaynağı tanımlayıcısı oluşturmak için [4. Görevdeki](#task4) kalan talimatlarla devam edin ve bu değeri kaynakta çerez olarak ayarlamayı deneyin.

##### Parametre doğrulama <a name="parameter-validation"></a>

Bir URL'de bulunan değerler kötü niyetle değiştirilebilir, hatalı biçimlendirilebilir veya bunlar bir şekilde orada olmasını beklediğiniz değerler olmayabilir. Buna siteler arası istek sahteciliği adı verilir. Analiz sunucunuzun aldığı analiz ping'lerinin, analiz ping'leri göndermesini beklediğiniz sayfalardan gelmesini sağlamanın önemli olması gibi, URL'nin bir parçası olan değerleri "iletirken" bu değerlere güvenebilmenizi sağlamak için yönlendireni doğruladığınızdan emin olun.

Örneğin, yukarıdaki adımlarda, kullanıcının tıklayıp ilgili sayfaya gitmesi için aşağıdaki URL'yi oluşturduk:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Ancak, kullanıcının veya bir saldırganın bu URL'yi şu şekilde değiştirmesi de mümkündür:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Sadece `$amp_client_id` örneklerini işlediğinizden emin olmak `$malicious_value` örneklerini kullanmaktan kaçınmak isteyeceksinizdir.

**URL sorgu parametreleri aracılığıyla alınan değerleri doğrulamak için önerilen adımlar:** Açılış sayfasını yönlendirenin, görmeyi beklediğiniz bir URL ile eşleştiğini onaylayın. Bu tipik olarak, geçerli bir CORS isteğinde, önceden görülmüş bir tanımlayıcı değeri taşıdığını gördüğünüz bir değer olmalıdır. Yalnızca bu tür bilinen tanımlayıcıları kabul etmenizi öneririz.

AMP olmayan bir sayfada, doğrudan istemci tarafında `document.referrer` öğesini kontrol edin veya sunucu tarafında doğrulama yapabilmek için, değeri analiz ping'inin bir parçası olarak iletin. Yönlendiren değeri güvenebileceğiniz bir değer ise, yukarıdaki örnekte `orig_user_id` gibi açılış sayfasının URL'sinden kaynaklanan değerleri kabul edebilir ve işleyebilirsiniz.

Bir AMP sayfasında, analiz ping'inin bir parçası olarak yönlendiren değerini iletmek için [Belge Yönlendirici](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#document-referrer) değişiklik değişkenini kullanın. Sunucu tarafı işleme, mevcut tek seçenektir. Örnek olarak, (1) geçerli sayfanın İstemci Kimliğini, (2) yönlendiren sayfada İstemci Kimliği olarak ayarladığımız URL yoluyla aktarılan bir değeri ve (3) (2)'deki değeri doğrulamak için yönlendirenin kendi bilgisini içeren ve açılış sayfasının gönderebileceği analiz ping'i burada verilmiştir: `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Yönlendirene güvenemiyorsanız, URL parametreleri aracılığıyla sağlanan tüm değerleri reddedin ve kullanmayın.

## Kesinlikle önerilen uygulamalar <a name="strongly-recommended-practices"></a>

### Yalnızca tek bir ilişkilendirme tutun <a name="keep-just-one-association"></a>

**Herhangi iki bağlamdan tanımlayıcılar arasında yalnızca bir ilişkilendirme tutulmalıdır.** Önceden sizin tarafınızdan verilen bir çerez veya diğer kullanıcı tanımlayıcısı ile ilişkilendirdiğiniz bir AMP İstemci Kimliği, çıkardığınız yeni bir çerez veya kullanıcı tanımlayıcısı ile birlikte görülürse, önceki çerez ve kullanıcı tanımlayıcısına karşı tuttuğunuz tüm durumu silmeniz gerekir.

Bu adımlar, kullanıcıların gizlilik beklentileriyle uyumu sağlamaya yardımcı olacaktır. Önceki bölümlerde ayrıntılı olarak açıklandığı gibi, AMP'de kullanıcı durumunun yönetilmesi genellikle farklı tanımlayıcıların AMP içeriğinin görüntülendiği birden çok bağlamda depolanmasını ve ilişkilendirilmesini gerektirir. **Bu durum, örneğin kullanıcı sitelerinizin çerezlerini sildikten sonra, beklemediği veya ona açıkça açıklamadığınız şekilde, verileri yeniden oluşturmak veya izleme gerçekleştirmek için asla kötüye kullanılmamalıdır.**

### Çerezlere ve yerel depolamada silme işlemlerine saygı gösterin <a name="respect-cookie-and-local-storage-deletions"></a>

**Tüm çerezleri ve yerel depolamayı silme olanağı oluşturan bu tür kontroller dahil olmak üzere, kullanıcının kullanımına sunulan tüm geçerli gizlilik kontrollerine saygı göstermelisiniz.**AMP İstemci Kimliği veya AMP altyapısı kullanıcı bir tanımlayıcı ilişkisinin bir tarafını açıkça sildikten sonra [silinmiş bir tanımlayıcıyı yeniden oluşturmak için](https://en.wikipedia.org/wiki/Zombie_cookie) hiçbir zaman kullanılmamalıdır.

### Yerel yasalara ve düzenlemelere uyun <a name="comply-with-local-laws-and-regulations"></a>

**İki veya daha fazla etki alanından çerezleri ve/veya tanımlayıcıları ilişkilendirmek, gizlilik politikanızı güncellemenizi, ek kullanıcı açıklamaları sunmanızı veya bazı yasal konularda son kullanıcı izni almanızı gerektirebilir.** Kararlı bir tanımlayıcı sunmak için kalıcı depolama aracı olarak çerezleri veya yerel depolamayı kullanan AMP İstemci Kimliğinin kullanımı veri toplama, depolama, işleme ve kullanıcıya bildirim hakkındaki tüm geçerli yasalar ve düzenlemeler açısından her yayıncı tarafından analiz edilmelidir.
