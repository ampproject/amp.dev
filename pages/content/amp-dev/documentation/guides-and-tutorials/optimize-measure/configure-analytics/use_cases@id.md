---
$title: Kasus Penggunaan
---

Panduan ini memberikan rangkaian kasus penggunaan umum untuk melacak keterlibatan pengguna:

Catatan: Ingin menambahkan kasus penggunaan? [Beri tahu kami.](https://github.com/ampproject/docs/issues/new) Anda juga dapat memberikan kasus penggunaan Anda sendiri; lihat [Cara Berkontribusi](../../../../documentation/guides-and-tutorials/contribute/index.md).

## Melacak jumlah kunjungan halaman

Pelajari cara melacak jumlah kunjungan halaman menggunakan [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Menggunakan amp-pixel

Kirimkan data jumlah kunjungan halaman ke URL yang ditentukan menggunakan [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Menggunakan amp-analytics - tanpa vendor

Kirimkan data jumlah kunjungan halaman ke URL yang ditentukan menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Menggunakan `amp-analytics` - googleanalytics

Kirimkan data jumlah kunjungan halaman ke Google Analytics (lihat juga [Pelacakan halaman di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Melacak klik halaman <a name="tracking-page-clicks"></a>

Pelajari cara melacak klik halaman menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), mengirim data peristiwa ke URL yang ditentukan, dan ke [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditentukan

Contoh berikut menggunakan atribut `selector` untuk mengirim peristiwa `click` ke URL yang ditentukan setiap kali pengguna mengklik link (`<a href>`):

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

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` `trigger` untuk mengirim peristiwa `click` ke Google Analytics saat elemen tertentu diklik (lihat juga [pelacakan peristiwa AMP di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Melacak scroll <a name="tracking-scrolling"></a>

Lacak scroll halaman menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Contoh berikut menggunakan atribut `scrollspec` untuk mengirim peristiwa `scroll` ke URL yang ditentukan jika halaman di-scroll secara vertikal sebanyak 25%, 50%, dan 90%. Peristiwa ini juga dipicu ketika halaman di-scroll secara horizontal hingga 90% lebar `scroll`:

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

## Melacak interaksi sosial <a name="tracking-social-interactions"></a>

Pelajari cara melacak interaksi sosial menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), mengirim data peristiwa ke URL yang ditentukan, dan ke [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditentukan

Contoh berikut menggunakan atribut `selector` untuk mengirim peristiwa `click` ke URL yang ditentukan setiap kali pengguna mengklik tweet (`#tweet-link`):

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

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` `trigger` untuk mengirim peristiwa saat tombol sosial tertentu diklik (lihat juga [pelacakan interaksi sosial AMP di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
