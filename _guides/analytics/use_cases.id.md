---
layout: page
title: Kasus Penggunaan
order: 2
locale: id
---

Panduan ini memberikan satu set kasus penggunaan umum untuk melacak keterlibatan pengguna:

{% include toc.html %}

Ingin menambahkan kasus penggunaan? 
[Beri tahu kami.](https://github.com/ampproject/docs/issues/new)

Anda juga bisa berkontribusi pada kasus penggunaan Anda sendiri;
lihat [Cara Berkontribusi](https://www.ampproject.org/docs/support/contribute.html).

## Melacak tampilan halaman

Ketahui cara melacak tampilan halaman menggunakan `amp-pixel` dan `amp-analytics`. 

### Menggunakan amp-pixel

Mengirim data penayangan ke URL yang ditetapkan memakai
[amp-pixel](/docs/reference/amp-pixel.html):

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### Menggunakan amp-analytics - tanpa vendor

Mengirim data penayangan ke URL yang ditetapkan memakai
[amp-analytics](/docs/reference/extended/amp-analytics.html):

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

### Menggunakan amp-analytics - googleanalytics

Mengirim data penayangan ke Google Analytics
(lihat juga [Pelacakan halaman dalam Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

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

## Melacak klik halaman

Mengetahui cara melacak klik halaman memakai
[amp-analytics](/docs/reference/extended/amp-analytics.html),
mengirim data kejadian ke URL yang ditetapkan, dan
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditetapkan

Contoh berikut menggunakan atribut `selector` untuk mengirim kejadian `click`
ke URL yang ditetapkan setiap kali pengguna mengeklik tautan (`<a href>`):

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

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` dari `trigger`
untuk mengirim kejadian `click` ke Google Analytics ketika elemen tertentu diklik
(lihat juga
(lihat juga [Pelacakan kejadian AMP dalam Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Melacak pengguliran

Melacak pengguliran halaman menggunakan [amp-analytics](/docs/reference/extended/amp-analytics.html).
Contoh berikut menggunakan atribut `scrollspec` untuk mengirim kejadian `scroll`
ke URL yang ditetapkan ketika halaman digulirkan secara vertikal sebesar 25%, 50%, dan 90%.
Kejadian ini juga dipicu ketika halaman digulirkan secara horizontal
ke 90% lebar `scroll`:

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

## Melacak interaksi sosial

Ketahui cara melacak interaksi sosial menggunakan
[amp-analytics](/docs/reference/extended/amp-analytics.html),
mengirim data kejadian ke URL yang ditetapkan, dan ke 
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditetapkan

Contoh berikut menggunakan atribut `selector` untuk mengirim kejadian `click`
ke URL yang ditetapkan setiap kali pengguna mengeklik tweet (`#tweet-link`):

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

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` dari `trigger`
untuk mengirim kejadian ketika tombol sosial tertentu diklik
(lihat juga
[pelacakan interaksi sosial AMP dalam Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
