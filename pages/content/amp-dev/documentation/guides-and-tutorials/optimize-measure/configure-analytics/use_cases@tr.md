---
$title: Kullanım Durumları
---

Bu kılavuzda kullanıcı katılımını izlemek için bir dizi yaygın kullanım durumu verilmiştir:

Bir kullanım durumu eklemek istiyor musunuz?
[Bize bildirin.](https://github.com/ampproject/docs/issues/new)

Kendi kullanım durumlarınızla da katkı da bulunabilirsiniz;
bkz. [Katkı Sağlama]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/contribute/index.md', locale=doc.locale).url.path}}).

## Sayfa görünümlerini izleme

[`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}) ve [`amp-analytics`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}}) kullanarak sayfa görünümlerini nasıl izleyeceğinizi öğrenin.

### Amp-pixel kullanma

[`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}) kullanarak belli bir URL›ye sayfa görüntüleme verilerini gönderin:

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Amp-analytics kullanma - satıcısız

[`amp-analytics`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}}) kullanarak belli bir URL›ye sayfa görüntüleme verilerini gönderin:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

### Amp-analitik kullanma - googleanalytics

Sayfa görüntüleme verilerini Google Analytics›e gönderin
(ayrıca bkz. [Google Analytics›de sayfa izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

## Sayfa tıklamalarını izleme <a name="sayfa-tıklamalarını-izleme"></a>

[`amp-analytics`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}}) kullanarak,
etkinlik verilerini
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) ya da bir URL›ye göndererek sayfa tıklamalarını nasıl izleyeceğinizi öğrenin.

### Verileri belli bir URL›ye gönderme

Aşağıdaki örnekte kullanıcı bir bağlantıya her tıkladığında (`<a href>`) belirlenen URL›ye bir `click` etkinliği
 göndermek için `selector` özelliği kullanılmıştır:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  }
}
</script>
</amp-analytics>
```

### Verileri Google Analytics›e gönderme

Aşağıdaki örnekte, özel bir ögeye tıklandığında Google Analytics›e bir `click` etkinliği göndermek için `trigger`
 özniteliği için `selector` kullanılmıştır
 (ayrıca bkz.
[Google Analytics›de AMP etkinliği izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

```html
<amp-analytics type="googleanalytics" id="analytics3">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnHeader" : {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "ui-components",
        "eventAction": "header-click"
      }
    }
  }
}
</script>
</amp-analytics>
```

## Kaydırmayı izleme <a name="kaydırmayı-izleme"></a>

[Amp-analitik]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}}) kullanarak sayfa kaydırmayı izleyin.
Aşağıdaki örnekte, sayfa %25, %50 ve %90 oranında dikey olarak kaydırıldığında, belirlenen URL›ye bir `scroll` etkinliği
 göndermek için `scrollspec` özelliği kullanılmıştır:
Etkinlik aynı zamanda sayfa, `scroll` genişliğinin %90 oranında yatay olarak
kaydırıldığında da uyarı verir:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "scrollPings": {
      "on": "scroll",
      "scrollSpec": {
        "verticalBoundaries": [25, 50, 90],
        "horizontalBoundaries": [90]
      }
    }
  }
}
</script>
</amp-analytics>
```

## Sosyal medya etkileşimlerini izleme <a name="sosyal-medya-etkileşimlerini-izleme"></a>

[Amp-analitik]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}}) kullanarak,
etkinlik verilerini
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) ya da bir URL›ye göndererek sosyal medya etkileşimlerini nasıl izleyeceğinizi öğrenin.

### Verileri belli bir URL›ye gönderme

Aşağıdaki örnekte, kullanıcı bir tweet›e (`#tweet bağlantısı`) her tıkladığında, belirlenen URL›ye bir `click` etkinliği
 göndermek için `selector` özelliği kullanılmıştır:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackClickOnTwitterLink": {
      "on": "click",
      "selector": "#tweet-link",
      "request": "event",
      "vars": {
        "eventId": "43",
        "eventLabel": "clicked on a tweet link"
      }
    }
  }
}
</script>
</amp-analytics>
```

### Verileri Google Analytics›e gönderme

Aşağıdaki örnekte, özel bir sosyal medya düğmesine tıklandığında, bir etkinlik göndermek için `trigger`
 özelliği için `selector` kullanılmıştır
 (ayrıca bkz.
[Google Analytics›de AMP sosyal medya etkileşimlerini izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

```html
<amp-analytics type="googleanalytics" id="analytics4">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y" // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnTwitterLink" : {
      "on": "click",
      "selector": "#tweet-link",
      "request": "social",
      "vars": {
          "socialNetwork": "twitter",
          "socialAction": "tweet",
          "socialTarget": "https://www.examplepetstore.com"
      }
    }
  }
}
</script>
</amp-analytics>
```
