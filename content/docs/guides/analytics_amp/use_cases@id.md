---
$title: Kasus Penggunaan
$order: 2
toc: true
---
[TOC]

Panduan ini memberikan rangkaian kasus penggunaan umum untuk melacak keterlibatan pengguna:

{% call callout('Catatan', type='note') %} 
Ingin menambahkan kasus penggunaan? [Beri tahu kami.](https://github.com/ampproject/docs/issues/new) Anda juga dapat memberikan kasus penggunaan Anda sendiri; lihat [Cara Berkontribusi](https://www.ampproject.org/id/docs/support/contribute.html). 
{% endcall %}

## Melacak jumlah kunjungan halaman

Pelajari cara melacak jumlah kunjungan halaman menggunakan `amp-pixel` dan `amp-analytics`.

### Menggunakan amp-pixel


Kirimkan data jumlah kunjungan halaman ke URL yang ditentukan menggunakan [amp-pixel](/id/docs/reference/amp-pixel.html):

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### Menggunakan amp-analytics - tanpa vendor


Kirimkan data jumlah kunjungan halaman ke URL yang ditentukan menggunakan [amp-analytics](/id/docs/reference/extended/amp-analytics.html):

[sourcecode:html]
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
[/sourcecode]

### Menggunakan amp-analytics - googleanalytics

Kirimkan data jumlah kunjungan halaman ke Google Analytics (lihat juga [Pelacakan halaman di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

[sourcecode:html]
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
[/sourcecode]

## Melacak klik halaman

Pelajari cara melacak klik halaman menggunakan [amp-analytics](/id/docs/reference/extended/amp-analytics.html), mengirim data peristiwa ke URL yang ditentukan, dan ke [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditentukan

Contoh berikut menggunakan atribut `selector` untuk mengirim peristiwa `click` ke URL yang ditentukan setiap kali pengguna mengklik link (`<a href>`):

[sourcecode:html]
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
[/sourcecode]

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` `trigger` untuk mengirim peristiwa `click` ke Google Analytics saat elemen tertentu diklik (lihat juga [pelacakan peristiwa AMP di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

[sourcecode:html]
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
[/sourcecode]

## Melacak scroll

Lacak scroll halaman menggunakan [amp-analytics](/id/docs/reference/extended/amp-analytics.html). Contoh berikut menggunakan atribut `scrollspec` untuk mengirim peristiwa `scroll` ke URL yang ditentukan jika halaman di-scroll secara vertikal sebanyak 25%, 50%, dan 90%. Peristiwa ini juga dipicu ketika halaman di-scroll secara horizontal hingga 90% lebar `scroll`:

[sourcecode:html]
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
[/sourcecode]

## Melacak interaksi sosial

Pelajari cara melacak interaksi sosial menggunakan [amp-analytics](/id/docs/reference/extended/amp-analytics.html), mengirim data peristiwa ke URL yang ditentukan, dan ke [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Mengirim data ke URL yang ditentukan

Contoh berikut menggunakan atribut `selector` untuk mengirim peristiwa `click` ke URL yang ditentukan setiap kali pengguna mengklik tweet (`#tweet-link`):

[sourcecode:html]
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
[/sourcecode]

### Mengirim data ke Google Analytics

Contoh berikut menggunakan atribut `selector` `trigger` untuk mengirim peristiwa saat tombol sosial tertentu diklik (lihat juga [pelacakan interaksi sosial AMP di Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

[sourcecode:html]
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
[/sourcecode]

