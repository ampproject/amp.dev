---
$title: Melacak interaksi dengan analisis
---

Platform analisis biasanya diintegrasikan dengan situs melalui panggilan fungsi dan cuplikan JavaScript sebaris, yang akan memicu peristiwa yang dikirimkan kembali ke sistem analisis. AMP memberikan sintaks konfigurasi JSON yang fleksibel untuk membuat replika proses ini untuk beberapa partner analisis.

Berikut adalah contoh pelacakan Google Analytics berdasarkan JavaScript tradisional. Kami akan menulis ulang ini dalam format JSON [amp-analytics](/id/docs/reference/components/amp-analytics.html), namun sebelum itu, mari kita lihat pendekatan tradisional:

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

JavaScript ini cukup sederhana; JavaScript mengirimkan notifikasi untuk melacak peristiwa pageview.

Untuk meniru fungsi ini di AMP, pertama-tama kami harus **menyertakan** library komponen [amp-analytics](/id/docs/reference/components/amp-analytics.html) di `<head>` dokumen kami:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Kemudian, mari **tambahkan** komponen `amp-analytics` di bagian akhir `isi` dokumen:

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

Sama seperti contoh JavaScript di bagian atas halaman ini, cuplikan `amp-analytics` akan mengirimkan notifikasi ke Google Analytics yang menunjukkan bahwa halaman telah dilihat.

Untuk menentukan ini, kami telah menyetel `type` ke `googleanalytics` dan membuat pemicu bernama "default pageview" di JSON.  Pemicu ini akan diaktifkan ketika halaman terlihat (karena `"on": "visible"`) dan ketika diaktifkan, kami akan mengirimkan permintaan analisis `pageview` ke Google Analytics dengan `vars` yang telah ditentukan.

JSON yang digunakan untuk mengonfigurasi `amp-analytics` adalah format yang sangat fleksibel untuk menjelaskan data analisis yang akan dikirim dan waktu pengirimannya.  [amp-analytics Menentukan data konfigurasi](/id/docs/reference/components/amp-analytics.html#specifying-configuration-data) berisi detail lengkap tentang format.

Berdasarkan contoh di atas, kami dapat **menambahkan** pemicu lain yang diberi nama `"click on #header trigger"`:

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

Sesuai dengan perkiraan Anda tentang namanya, pemicu ini akan diaktifkan ketika elemen dengan ID `"header"` diklik (ditentukan dengan `"on": "click"` dan `"selector": "#header"`).  Ketika pemicu ini diaktifkan, kami akan mengirimkan permintaan `event` ke penyedia analisis kami, yang menentukan pasangan variabel yang akan disertakan dalam permintaan.

Jika memiliki platform pelacakan kustom yang ingin diintegrasikan, Anda tetap dapat menggunakan `amp-analytics` dan menentukan endpoint URL Anda yang dipersonalisasi sebagai tujuan data pelacakan dikirimkan. Pelajari lebih lanjut di dokumetasi referensi komponen [amp-analytics](/id/docs/reference/components/amp-analytics.html).

Catatan: `“UA-YYYY-Y”` adalah contoh akun Google Analytics; contoh ini akan diganti dengan kode pelacakan Google Analytics situs Anda, jika Anda menerapkan contoh ini di situs.

Tips: Jika tertarik pada sistem pelacakan yang lebih sederhana, Anda mungkin ingin melihat [amp-pixel](/id/docs/reference/components/amp-pixel.html). Jika hanya perlu melacak pageview, amp-pixel adalah solusi yang lebih sederhana daripada amp-analytics karena hanya bertujuan untuk menyelesaikan persyaratan pelacakan piksel tradisional. Pelajari lebih lanjut di [Analytics: panduan dasar-dasar]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_carousels.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
