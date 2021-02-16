---
'$title': Cara mengonfigurasi analitik dasar untuk halaman AMP Anda
$order: 100
description: Platform analitis pada umumnya diintegrasikan ke dalam situs web melalui snippet JavaScript dan panggilan fungsi inline, ini memicu peristiwa yang dikirimkan kembali ke sistem analitis.
tutorial: 'true'
formats:
  - websites
  - stories
  - ads
---

Platform analitis pada umumnya diintegrasikan ke dalam situs web melalui snippet (cuplikan) JavaScript dan panggilan fungsi inline, ini memicu peristiwa yang dikirimkan kembali ke sistem analitis. AMP menyediakan sintaksis konfigurasi JSON yang fleksibel untuk mengulangi proses ini untuk beberapa mitra analitis.

[tip] **KIAT –** Jika Anda menggunakan Google Analytics sebagai penyedia analitis Anda, pelajari <a><code>amp-analytics</code></a>. [/tip]

## Untuk konteks: Analitis tentang halaman non-AMP

Berikut ini adalah contoh pelacakan Google Analytics yang digerakkan oleh JavaScript tradisional. Kita akan menulis ulang ini ke dalam format JSON [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), namun terlebih dahulu, mari kita melihat pendekatan tradisionalnya:

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

JavaScript ini cukup sederhana; ini mengirimkan notifikasi untuk melacak peristiwa penayangan halaman (pageview).

## Langkah ke-1: Sertakan skrip `amp-analytics`

Untuk mengulangi fungsionalitas ini di AMP, kita harus terlebih dahulu **menyertakan** perpustakaan komponen <code>amp-analytics</code> di dalam `<head>` dokumen kita:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

## Langkah ke-2: Menambahkan kode konfigurasi

Kemudian, kita **tambahkan** komponen [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) ke bagian akhir `body` dokumen:

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

Sama seperti contoh JavaScript pada bagian atas halaman ini, snippet (cuplikan) [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) ini akan mengirimkan notifikasi ke Google Analytics yang mengindikasikan bahwa sebuah halaman telah dilihat.

Untuk menentukan ini, kita telah menetapkan `type` ke `googleanalytics`, dan di JSON kita telah membuat pemicu yang kita namakan “penayangan halaman standar”. Pemicu ini akan beraksi ketika halaman dapat dilihat (karena `"on": "visible"`) dan ketika beraksi, kita akan mengirimkan permintaan analitis `pageview` ke Google Analytics dengan `vars` yang telah kita tentukan.

JSON yang digunakan untuk mengonfigurasi [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) merupakan format yang sangat fleksibel untuk menjelaskan data analitis apa yang akan dikirimkan dan kapan dikirimkan. [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) mempunyai detail lengkap tentang formatnya.

## Langkah ke-3: Menambahkan lebih banyak pemicu

Berdasarkan contoh di atas, kita dapat **menambahkan** pemicu lain bernama `"click on #header trigger"`:

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

Seperti yang bisa Anda tebak dari nama pemicu baru ini, ia akan beraksi saat elemen dengan ID `"header"` diklik (ditentukan dengan `"on": "click"` dan `"selector": "#header"`). Ketika pemicu ini beraksi, kami akan mengirimkan permintaan `event` kepada penyedia analitis kami, yang menyebutkan beberapa variabel yang perlu disertakan di dalam permintaan.

Jika Anda mempunyai platform pelacakan yang ingin Anda integrasikan, Anda masih bisa menggunakan [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) dan menentukan endpoint URL Anda yang dipersonalisasi untuk menerima data pelacakan. Pelajari selengkapnya dalam dokumentasi referensi komponen [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **CATATAN –** `“UA-YYYY-Y”` adalah contoh akun Google Analytics, ini harus diganti dengan kode pelacakan Google Analytics situs web Anda sendiri jika Anda menggunakan contoh ini pada situs Anda. [/tip]

[tip type="tip"] **KIAT –** Jika Anda tertarik dengan sistem pelacakan yang lebih sederhana, Anda mungkin ingin melihat [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). Jika Anda hanya perlu melacak penayangan halaman, [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) adalah solusi yang lebih ringan dibandingkan [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) karena hanya menargetkan untuk memenuhi persyaratan pelacakan piksel tradisional atau yang biasa. Pelajari selengkapnya dalam [Analitis: panduan dasar](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
