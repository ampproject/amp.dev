---
layout: page
title: Kullanım Durumları
order: 2
locale: tr
---

Bu kılavuzda kullanıcı katılımını izlemek için bir dizi yaygın kullanım durumu verilmiştir:

{% include toc.html %}

Bir kullanım durumu eklemek istiyor musunuz? 
[Bize bildirin.](https://github.com/ampproject/docs/issues/new)

Kendi kullanım durumlarınızla da katkı da bulunabilirsiniz;
bkz. [Katkı Sağlama](https://www.ampproject.org/docs/support/contribute.html).

## Sayfa görünümlerini izleme

`amp-pixel` ve `amp-analytics` kullanarak sayfa görünümlerini nasıl izleyeceğinizi öğrenin. 

### Amp-piksel kullanma


[amp-piksel](/docs/reference/amp-pixel.html) kullanarak belli bir URL›ye sayfa görüntüleme verilerini gönderin:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### Amp-analitik kullanma - satıcısız


[amp-analitik](/docs/reference/extended/amp-analytics.html)kullanarak belli bir URL›ye sayfa görüntüleme verilerini gönderin:

{% highlight html %}
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
{% endhighlight %}

### Amp-analitik kullanma - googleanalytics

Sayfa görüntüleme verilerini Google Analytics›e gönderin 
(ayrıca bkz. [Google Analytics›de sayfa izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

{% highlight html %}
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
{% endhighlight %}

## Sayfa tıklamalarını izleme


[amp-analitik](/docs/reference/extended/amp-analytics.html) kullanarak,
etkinlik verilerini 
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) ya da bir URL›ye göndererek sayfa tıklamalarını nasıl izleyeceğinizi öğrenin.

### Verileri belli bir URL›ye gönderme

Aşağıdaki örnekte kullanıcı bir bağlantıya her tıkladığında (`<a href>`) belirlenen URL›ye bir `click` etkinliği
 göndermek için `selector` özelliği kullanılmıştır:

{% highlight html %}
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
{% endhighlight %}

### Verileri Google Analytics›e gönderme

Aşağıdaki örnekte, özel bir ögeye tıklandığında Google Analytics›e bir `click` etkinliği göndermek için `trigger`
 özniteliği için `selector` kullanılmıştır
 (ayrıca bkz.
[Google Analytics›de AMP etkinliği izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

{% highlight html %}
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
{% endhighlight %}

## Kaydırmayı izleme

[Amp-analitik](/docs/reference/extended/amp-analytics.html) kullanarak sayfa kaydırmayı izleyin.
Aşağıdaki örnekte, sayfa %25, %50 ve %90 oranında dikey olarak kaydırıldığında, belirlenen URL›ye bir `scroll` etkinliği
 göndermek için `scrollspec` özelliği kullanılmıştır:
Etkinlik aynı zamanda sayfa, `scroll` genişliğinin %90 oranında yatay olarak
kaydırıldığında da uyarı verir:

{% highlight html %}
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
{% endhighlight %}

## Sosyal medya etkileşimlerini izleme


[Amp-analitik](/docs/reference/extended/amp-analytics.html) kullanarak,
etkinlik verilerini 
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) ya da bir URL›ye göndererek sosyal medya etkileşimlerini nasıl izleyeceğinizi öğrenin.

### Verileri belli bir URL›ye gönderme

Aşağıdaki örnekte, kullanıcı bir tweet›e (`#tweet bağlantısı`) her tıkladığında, belirlenen URL›ye bir `click` etkinliği
 göndermek için `selector` özelliği kullanılmıştır:

{% highlight html %}
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
{% endhighlight %}

### Verileri Google Analytics›e gönderme

Aşağıdaki örnekte, özel bir sosyal medya düğmesine tıklandığında, bir etkinlik göndermek için `trigger`
 özelliği için `selector` kullanılmıştır
 (ayrıca bkz.
[Google Analytics›de AMP sosyal medya etkileşimlerini izleme](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

{% highlight html %}
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
{% endhighlight %}
