---
'$title': Analizle etkileşimi izleyin
$order: 4
description: Analytics platformları genellikle, analitik sistemine geri gönderilen olayları tetikleyen satır içi JavaScript parçacıkları ve işlev çağrıları aracılığıyla web sitelerine entegre edilir.
---

Analytics platformları genellikle, analitik sistemine geri gönderilen olayları tetikleyen satır içi JavaScript parçacıkları ve işlev çağrıları aracılığıyla web sitelerine entegre edilir. AMP, bu işlemi birkaç analitik iş ortağı için çoğaltmak için esnek bir JSON yapılandırma sözdizimi sağlar.

Aşağıda, geleneksel JavaScript tabanlı Google Analytics izlemenin bir örneği verilmiştir. Bunu [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) JSON biçimine yeniden yazacağız, ancak önce geleneksel yaklaşıma bakalım:

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Bu JavaScript oldukça basittir; pageview olayını izlemek için bir bildirim gönderir.

Bu işlevi AMP'de çoğaltmak için önce [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bileşen kitaplığını belgemizin `<head>` bölümüne **eklemeliyiz**:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

Ardından, [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bileşenini belgenin `body` bölümünün sonuna **ekleyelim**:

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

Bu sayfanın üst kısmındaki JavaScript örneğinde olduğu gibi, bu [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) parçacığı Google Analytics'e bir sayfanın görüntülendiğini belirten bir bildirim gönderir.

Bunu belirtmek için, `type` `googleanalytics` olarak ayarladık ve daha sonra JSON'da "default pageview" olarak adlandırdığımız bir tetikleyici oluşturduk. Bu tetikleyici, sayfa görünür olduğunda (`"on": "visible"` nedeniyle) tetiklenir ve tetiklendiğinde, belirttiğimiz `vars` ile Google Analytics'e bir `pageview` analizi isteği göndeririz.

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)'i yapılandırmak için kullanılan JSON, hangi analitik verilerin gönderileceğini ve ne zaman gönderileceğini açıklamak için çok esnek bir formattır. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), formatla ilgili tüm ayrıntılara sahiptir.

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

Bu yeni tetikleyicinin adından da tahmin edebileceğiniz gibi, <code>"header"</code> kimliğine sahip öğe tıklandığında tetiklenecektir (<code>"on": "click"</code> ve <code>"selector": "#header"</code>" ile belirtilir). Bu tetikleyici etkinleştiğinde, isteğe dahil edilecek birkaç değişkeni belirterek <code>event</code> isteğini analitik sağlayıcımıza göndereceğiz.

Entegre etmek istediğiniz özel bir izleme platformunuz varsa, [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)'i kullanabilir ve izleme verilerini göndermek için kendi kişiselleştirilmiş URL uç noktalarınızı tanımlayabilirsiniz. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bileşen referans belgelerinden daha fazla bilgi edinin.

[tip type="note"] **NOT –** `“UA-YYYY-Y”` örnek bir Google Analytics hesabıdır; bu kendi web sitenizin Google Analytics izleme koduyla değiştirilmelidir. [/tip]

[tip type="tip"] **İPUCU –** Daha basit bir izleme sistemi ile ilgileniyorsanız, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)'e bir göz atmak isteyebilirsiniz. Yalnızca sayfa görüntülemelerini izlemeniz gerekiyorsa, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)'ten daha hafif bir çözümdür, çünkü yalnızca geleneksel piksel izlemenin gereksinimlerini çözmeyi amaçlamaktadır. Daha fazla bilgi edinmek için [Analytics: temel bilgiler kılavuzu](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
