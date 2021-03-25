---
'$title': Canlı blog oluşturma
$order: 102
description: Canlı bloglar, bir spor etkinliği veya seçim gibi devam eden bir etkinlik boyunca sık sık güncellenen web sayfalarıdır.
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - bpaduch
---

Canlı bloglar, bir spor etkinliği veya seçim gibi devam eden bir etkinlik boyunca sık sık güncellenen web sayfalarıdır. AMP'de, [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşenini kullanarak canlı bir blog oluşturabilirsiniz.

Bu öğretici, [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşenine kısa genel bir bakış sağlar ve [sayfalandırma](#pagination), [derin bağlantı](#deeplinking) gibi canlı bloglar için bazı uygulama ayrıntılarına odaklanır. AMP'de canlı blogların uygulanmasını göstermek için AMP By Examples'ın [canlı blog örneğini](live_blog.md) kullanacağız.

[tip type="tip"] **İPUCU –** Blogunuzun üçüncü taraf platform özellikleriyle entegre edilebilmesi için [LiveBlogPosting](http://schema.org/LiveBlogPosting) meta veri işaretlemesini kullanın.[/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## `amp-live-list` genel bakış

The [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşeni, ana belgeyi yeni içerik için düzenli olarak yoklar ve yeni öğeler kullanıma sunulduğunda kullanıcının tarayıcısını günceller. Bu, her yeni blog gönderisinin eklenmesi gerektiğinde, ana belgenin, güncellemeyi sayfanın hem gövde hem de [meta veri](../../../documentation/examples/documentation/Live_Blog.html#metadata) bölümüne dahil etmek için CMS tarafından güncellenmesi gerektiği anlamına gelir.

Blog için görünebilir ilk kod budur:

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Bu koda bakalım:

Her [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşeni, bir sayfada birden fazla olabileceğinden benzersiz bir kimlik gerektirir. Bu örnekte, benzersiz kimlik olarak `my-life-list` belirttik.

`data-poll-interval` özniteliği, anketlerin ne sıklıkta gerçekleşmesi gerektiğini belirtir; ana belge güncellenirse, güncelleştirme bir sonraki zaman aralığından sonra kullanıcı tarafından kullanılabilir olmalıdır.

Ana belgeye her yeni öğe eklendiğinde, `<button update on="tap:my-live-list.update">` öğesi, tıklandığında sayfayı en son gönderileri göstermek için tetikleyen bir "güncellemeleriniz var" düğmesini gösterir.

Canlı bloglar büyüyebilir ve sayfayı çok uzun yapabilir. Canlı bloga kaç öğe eklenebileceğini belirtmek için `data-max-items-per-page` özniteliğini kullanabilirsiniz. Bir güncelleştirmeden sonraki öğe sayısı `data-max-items-per-page` değerini aşarsa, bu sayıyı aşan en eski güncelleştirmeler kaldırılır. Örneğin, sayfada şu anda 9 öğe varsa ve `data-max-items-per-page` özniteliği 10 olarak ayarlanmışsa ve en son güncellemede 3 yeni öğe varsa, en eski iki öğe son güncellemeyle sayfadan kaldırılır.

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) içindeki tüm blog gönderileri `<div items></div>` öğesinin çocukları olmalıdır. Her gönderiye bir öğe olarak atıfta bulunulduğunda, her öğenin benzersiz bir `id` ve bir `data-sort-time` olması gerekir.

## Uygulama ayrıntıları

Artık [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşenine aşina olduğunuza göre, daha karmaşık bir canlı blogun nasıl uygulanacağını anlayalım. Sayfalandırmanın nasıl uygulanacağı ve derin bağlantının nasıl çalıştığı hakkında daha fazla bilgi edinmek için okumaya devam edin.

### Sayfalandırma <a name="pagination"></a>

Uzun bloglar, bir sayfada görüntülenecek blog öğelerinin sayısını sınırlayarak performansı artırmak için sayfalandırmayı kullanabilir. Sayfalandırmayı uygulamak için, [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşeninde `<div pagination></div>` ekleyin, ardından sayfalandırma için ihtiyacınız olan herhangi bir işaretlemeyi ekleyin (örneğin, bir sayfa numarası veya sonraki ve önceki sayfaya bağlantı).

Sayfalandırma ile daha önce kullandığımız basit kod şu hale gelir:

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
    </nav>
  </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Barındırılan sayfayı güncelleyerek gezinme öğelerini doğru şekilde doldurmak sizin sorumluluğunuzdadır. Örneğin, [canlı blog örneğinde](live_blog.md) sayfayı bir sunucu tarafı şablonu aracılığıyla oluşturuyoruz ve sayfanın ilk blog öğesinin ne olması gerektiğini belirtmek için bir sorgu parametresi kullanıyoruz. Sayfanın boyutunu 5 öğeyle sınırlıyoruz, bu nedenle sunucu 5'ten fazla öğe oluşturduysa, ana sayfaya gelen bir kullanıcı gezinme alanında "sonraki" öğesini görecektir. Ayrıntılar için [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bölümüne bakın.

Blog gönderilerinin boyutu `data-max-items-per-page` tarafından belirtilen maksimum öğe sayısını aştıktan sonra, eski blog öğeleri “Sonraki” sayfalarda, örneğin Sayfa 2'de görüntülenir. [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) öğelerde herhangi bir değişiklik olup olmadığını görmek için sunucuyu belirli aralıklarla sorguladığından, kullanıcı ilk sayfada değilse sunucuyu sorgulamaya gerek yoktur.

Sorgulama mekanizmasını önlemek için barındırılan sayfaya disabled özniteliğini ekleyebilirsiniz. Canlı blog örneğinde, bu davranışı sunucu tarafı şablonunda gerçekleştiriyoruz: istenen sayfa ilk değilse, disabled özniteliğini [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) bileşenine ekleriz.

### Derin bağlantı <a name="deeplinking"></a>

Bir blog gönderisini yayınladığınızda, paylaşım gibi özellikleri etkinleştirmek için gönderiye derin bağlantı verebilmeniz önemlidir. [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) ile blog öğesinin `id`'sini kullanarak derin bağlantı oluşturmak mümkündür. For example, [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) allows you to navigate directly to the blog post with the `post3` id.

AMP By Example yeni içerik oluşturmak için [canlı blog örneğinde](live_blog.md) bir çerez kullanır, bu nedenle sayfaya ilk kez girerseniz, “post3” kimliğine sahip bir gönderi mevcut olmayabilir, bu durumda ilk gönderiye yönlendirilirsiniz.

## Kaynaklar

Bu kaynaklardan daha fazla bilgi edinin:

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) referans belgeleri
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example'ın canlı blog örneği/a0}](live_blog.md)
