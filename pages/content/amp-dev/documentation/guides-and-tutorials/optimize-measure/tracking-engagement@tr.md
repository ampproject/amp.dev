---
"$title": AMP sayfalarınız için temel analiz nasıl yapılandırılır?
"$order": '100'
description: Analitik platformları, genellikle, analiz sistemine geri gönderilen olayları tetikleyen satır içi JavaScript parçacıkları ve işlev çağrıları aracılığıyla web sitelerine entegre edilir.
tutorial: 'true'
formats:
- websites
- stories
- ads
---

Analytics platformları, genellikle, analiz sistemine geri gönderilen olayları tetikleyen satır içi JavaScript parçacıkları ve işlev çağrıları aracılığıyla web sitelerine entegre edilir. AMP, bu süreci birkaç analiz iş ortağı için çoğaltmak için esnek bir JSON yapılandırma sözdizimi sağlar.

[tip] **İPUCU –** Google Analytics'i analitik sağlayıcınız olarak kullanıyorsanız, [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) öğrenin. [/tip]

## Bağlam için: AMP olmayan sayfalarda analiz

Aşağıda, geleneksel JavaScript tabanlı Google Analytics izleme örneği verilmiştir. Bunu [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) JSON biçiminde yeniden yazacağız, ancak önce geleneksel yaklaşıma bakalım:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Bu JavaScript oldukça basittir; pageview olayını izlemek için bir bildirim gönderir.

## 1. Adım: `amp-analytics` komut dosyasını dahil edin

Bu işlevi AMP'de çoğaltmak için önce[`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) bileşen kitaplığını belgemizin `<head>` bölümüne **eklemeliyiz**:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

## 2. Adım: Yapılandırma kodunu ekleyin

Ardından, [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) bileşenini belgenin `body` bölümünün sonuna **ekleyelim**:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

Bu sayfanın üst kısmındaki JavaScript örneğinde olduğu gibi, bu [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) parçacığı, Google Analytics'e bir sayfanın görüntülendiğini belirten bir bildirim gönderecektir.

Bunu belirtmek için, `type` `googleanalytics` olarak ayarladık ve ardından JSON'da "default pageview" adını verdiğimiz bir tetikleyici oluşturduk. Bu tetikleyici, sayfa görünür olduğunda (`"on": "visible"` nedeniyle) tetiklenecek ve tetiklendiğinde, `vars` ile belirttiğimiz değişkenlerle Google Analytics'e bir`pageview` analizi isteği göndereceğiz.

[`amp-analytics`](../../../documentation/components/reference/amp-analytics.md)'i yapılandırmak için kullanılan JSON, hangi analitik verilerin gönderileceğini ve ne zaman gönderileceğini açıklamak için çok esnek bir formattır. [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), formatla ilgili tüm ayrıntılara sahiptir.

## 3. Adım: Daha fazla tetikleyici ekleyin

Yukarıdaki örneğe dayanarak, `"click on #header trigger"` adlı başka bir tetikleyici **ekleyebiliriz**:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

Bu yeni tetikleyicinin adından da tahmin edebileceğiniz gibi, `"header"` kimliğine sahip öğe tıklandığında tetiklenecektir (`"on": "click"` ve `"selector": "#header"`" ile belirtilir). Bu tetikleyici etkinleştiğinde, isteğe dahil edilecek birkaç değişkeni belirterek `event` isteğini analitik sağlayıcımıza göndereceğiz.

Entegre etmek istediğiniz özel bir izleme platformunuz varsa, [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md)'i kullanabilir ve izleme verilerini göndermek için kendi kişiselleştirilmiş URL uç noktalarınızı tanımlayabilirsiniz. [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) bileşen referans belgelerinde daha fazla bilgi edinin.

[tip type="note"] **NOT –**  `“UA-YYYY-Y”`, örnek bir Google Analytics hesabıdır. Sitenizde bu örneği kullanıyorsanız, kendi web sitenizin Google Analytics izleme koduyla değiştirilmelidir. [/tip]

[tip type="tip"] <strong>İPUCU –</strong> Daha basit bir izleme sistemiyle ilgileniyorsanız, <a><code>amp-pixel</code></a>'e bir göz atmak isteyebilirsiniz. Yalnızca sayfa görüntülemelerini izlemeniz gerekiyorsa, <a><code>amp-pixel</code></a><a><code>amp-analytics</code></a>'ten daha hafif bir çözümdür, çünkü yalnızca geleneksel piksel izlemenin gereksinimlerini çözmeyi amaçlamaktadır. Analytics'te daha fazla bilgi edinin:<a>Analytics: temel bilgiler kılavuzu</a>. [/tip]
