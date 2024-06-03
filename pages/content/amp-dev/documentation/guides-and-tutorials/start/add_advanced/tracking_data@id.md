---
'$title': Melacak keterlibatan dengan analitik
$order: 4
description: Platform analitik pada umumnya diintegrasikan ke dalam situs web melalui panggilan fungsi dan snippet JavaScript inline, ini memicu peristiwa yang dikirimkan kembali ke sistem analitik.
---

Platform analitis pada umumnya diintegrasikan ke dalam situs web melalui snippet (cuplikan) JavaScript dan panggilan fungsi inline, ini memicu peristiwa yang dikirimkan kembali ke sistem analitis. AMP menyediakan sintaksis konfigurasi JSON yang fleksibel untuk mengulangi proses ini untuk beberapa mitra analitis.

Berikut ini adalah contoh pelacakan Google Analytics berdasarkan JavaScript tradisional. Kami akan menulis ulang ini dalam format JSON [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), namun sebelum itu, mari kita lihat pendekatan tradisional:

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

JavaScript ini cukup sederhana; JavaScript mengirimkan notifikasi untuk melacak peristiwa penayangan halaman (pageview).

Untuk meniru fungsi ini di AMP, kita harus terlebih dahulu **menyertakan** perpustakaan komponen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) di `<head>` dokumen kita:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

Kemudian, mari **tambahkan** komponen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ke bagian akhir `isi` dokumen:

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

Sama seperti contoh JavaScript di bagian atas halaman ini, cuplikan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ini akan mengirimkan notifikasi ke Google Analytics yang menunjukkan bahwa sebuah halaman telah dilihat atau ditayangkan.

Untuk menentukan ini, kita telah mengatur `type` ke `googleanalytics` dan membuat pemicu bernama "default pageview" (penayangan halaman standar) di JSON. Pemicu ini akan diaktifkan ketika halaman terlihat (karena `"on": "visible"`) dan ketika diaktifkan, kita akan mengirimkan permintaan analitik `pageview` ke Google Analytics dengan `vars` yang telah kita tentukan.

JSON yang digunakan untuk mengonfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) adalah format yang sangat fleksibel untuk menjelaskan data analitik yang akan dikirimkan dan waktu pengirimannya. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) berisi detail lengkap tentang formatnya.

Dengan menggunakan contoh di atas, kita dapat **menambahkan** pemicu lain yang diberi nama `"click on #header trigger"`:

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

Seperti yang bisa Anda perkirakan dari namanya, pemicu ini akan diaktifkan ketika elemen dengan ID `"header"` diklik (ditentukan dengan `"on": "click"` dan `"selector": "#header"`). Ketika pemicu ini diaktifkan, kita akan mengirimkan permintaan `event` ke penyedia analitik, yang menentukan beberapa variabel yang akan disertakan di dalam permintaan tersebut.

Jika Anda memiliki platform pelacakan kustom yang ingin diintegrasikan, Anda tetap dapat menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dan menentukan endpoint URL Anda yang telah dipersonalisasi sebagai tempat tujuan pengiriman data pelacakan. Pelajari lebih lanjut dalam dokumetasi referensi komponen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] <strong>CATATAN –</strong> <code>“UA-YYYY-Y”</code> adalah contoh akun Google Analytics; contoh ini akan diganti dengan kode pelacakan Google Analytics situs Anda, jika contoh ini diterapkan di situs Anda. [/tip]

[tip type="tip"] **KIAT –** Jika Anda tertarik dengan sistem pelacakan yang lebih sederhana, Anda mungkin ingin melihat [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Jika Anda hanya perlu melacak penayangan halaman, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) adalah solusi yang lebih ringan daripada [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) karena hanya bertujuan untuk menyelesaikan persyaratan pelacakan piksel tradisional. Pelajari lebih lanjut dalam [Analitik: panduan dasar](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
