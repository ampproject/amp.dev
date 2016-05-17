---
layout: page
title: Analytics&#58; Dasar-Dasarnya
order: 0
locale: id
---

Mulailah di sini untuk mempelajari dasar-dasar analisis AMP.

{% include toc.html %}

## Menggunakan amp-pixel atau amp-analytics?

AMP menyediakan dua komponen untuk memenuhi kebutuhan analisis dan pengukuran Anda:
[amp-pixel](/docs/reference/amp-pixel.html) dan
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Kedua opsi ini mengirim data analisis ke titik akhir yang didefinisikan.

Jika Anda mencari perilaku seperti
[melacak piksel](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
komponen `amp-pixel` menyediakan pelacakan tampilan halaman dasar;
data tampilan halaman dikirim ke URL yang didefinisikan.
Sebagian integrasi dengan vendor bisa memanggil komponen ini,
yang mana dalam hal ini integrasi akan menetapkan titik akhir URL yang tepat. 

Untuk sebagian besar solusi analisis, gunakan `amp-analytics`.
Pelacakan tampilan halaman juga bekerja dalam `amp-analytics`.
Namun Anda juga bisa melacak keterlibatan pengguna dengan segala tipe materi halaman,
termasuk klik pada tautan dan tombol.
Dan Anda bisa mengukur sejauh mana pada halaman pengguna telah menggulir,
entah pengguna itu terlibat dengan media sosial atau tidak, dan lainnya
(lihat
[Mendalami AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html)).

Sebagai bagian dari pengintegrasian dengan platform,
penyedia telah menawarkan konfigurasi `amp-analytics` yang telah didefinisikan sebelumnya
sehingga mudah menangkap data dan mendorongnya ke alat pelacakan mereka.
Mengakses dokumentasi vendor akses dari 
[spesifikasi amp-analytics](/docs/reference/extended/amp-analytics.html).

Anda sama-sama bisa menggunakan `amp-pixel` maupun `amp-analytics` di halaman Anda.
`amp-pixel` untuk pelacakan tampilan halaman sederhana,
`amp-analytics` untuk semua hal lainnya.
Anda juga bisa menambahkan beberapa bagian dari setiap tag.
Jika Anda bekerja dengan beberapa bagian penyedia analisis,
Anda akan membutuhkan satu tag per solusinya.
Ingatlah bahwa halaman AMP yang lebih simpel akan lebih baik bagi pengguna,
jadi jika Anda tidak memerlukan tag ekstra, jangan gunakan tag tersebut.

## Membuat konfigurasi analisis sederhana

Ketahui cara membuat konfigurasi
[amp-pixel](/docs/reference/amp-pixel.html) dan
[amp-analytics](/docs/reference/extended/amp-analytics.html) sederhana.

### Konfigurasi amp-pixel sederhana

Untuk membuat konfigurasi `amp-pixel` sederhana,
masukkan sesuatu seperti yang berikut ke dalam badan halaman AMP Anda:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

Dalam contoh ini,
data tampilan halaman dikirim ke URL yang didefinisikan, bersama angka acak.
Variabel `RANDOM` merupakan satu dari banyak
[variabel penggantian dalam platform AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Ketahui selengkapnya tentang
[Penggantian variabel](/docs/guides/analytics/analytics_basics.html#variable-substitution) di sini.

Komponen [amp-pixel](/docs/reference/amp-pixel.html)
 adalah komponen bawaan,
jadi Anda tidak memerlukan deklarasi penyertaan seperti yang biasa dilakukan 
untuk perluasan komponen AMP, termasuk `amp-analytics`.
Namun Anda harus menempatkan tag `amp-pixel` sedekat mungkin
dengan awal `<body>`.
Piksel pelacakan hanya akan dipicu ketika tag dengan sendirinya ditampilkan.
Jika `amp-pixel` diposisikan di dekat bagian bawah halaman,
maka ia tidak akan dipicu.

### Konfigurasi amp-analytics sederhana

Untuk membuat konfigurasi
[amp-analytics](/docs/reference/extended/amp-analytics.html) sederhana,
Anda harus terlebih dahulu menyertakan deklarasi `custom-element` ini
dalam `<head>` dari dokumen AMP (lihat juga
[Deklarasi penyertaan komponen](/docs/reference/extended.html#component-inclusion-declaration)):

{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

Contoh berikut serupa dengan [contoh `amp-pixel`](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration).
Setiap kali sebuah halaman terlihat,
kejadian pemicu terjadi, dan
mengirim data penayangan ke URL yang didefinisikan bersama dengan sebuah ID acak: 

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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

Dalam contoh di atas, kita telah mendefinisikan permintaan yang disebut penayangan sebagai https://foo.com/pixel?RANDOM. Seperti yang telah didiskusikan sebelumnya, RANDOM diganti dengan sebuah angka acak, jadi permintaan itu sebenarnya akan terlihat seperti ini https://foo.com/pixel?0.23479283687235653498734.

Ketika halaman menjadi terlihat
(sebagaimana yang ditetapkan oleh penggunaan kata kunci pemicu `visible`),
sebuah kejadian terpicu dan permintaan `pageview` dikirim.
Atribut pemicu menentukan kapan permintaan penayangan dipicu.
Ketahui selengkapnya tentang [permintaan dan pemicu](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Penggantian variabel

Baik komponen [amp-pixel](/docs/reference/amp-pixel.html) maupun
komponen [amp-analytics](/docs/reference/extended/amp-analytics.html) sama-sama
memungkinkan semua penggantian variabel URL standar (lihat
[Penggantian Variabel AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
Dalam contoh berikut,
permintaan tampilan halaman dikirim ke URL,
bersama dengan URL kanonis dokumen AMP saat ini, judulnya, dan
[ID klien](/docs/guides/analytics/analytics_basics.html#user-identification):

{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

Karena kesederhanaannya,
tag `amp-pixel` bisa hanya menyertakan variabel yang didefinisikan oleh platform
atau yang bisa di-parse oleh waktu proses AMP dari halaman AMP.
Dalam contoh di atas,
platform mengisi terlebih dahulu nilai baik untuk
`canonicalURL` maupun `clientId(site-user-id)`.
Tag `amp-analytics` bisa menyertakan variabel yang sama dengan `amp-pixel`,
serta variabel yang didefinisikan secara unik di dalam konfigurasi tag.

Gunakan format `${varName}` dalam </string> permintaan untuk variabel yang didefinisikan oleh halaman
atau platform.
Tag `amp-analytics` akan mengganti template dengan nilai sebenarnya
pada saat pembentukan permintaan analisis (lihat juga
[Variabel yang didukung dalam amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

Dalam contoh `amp-analytics` berikut,
permintaan tampilan halaman dikirim ke URL,
dengan data tambahan yang diekstrak dari penggantian variabel,
sebagian disediakan oleh platform,
sebagian didefinisikan langsung pada barisnya,
di dalam konfigurasi `amp-analytics`:

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

Dalam contoh di atas,
variabel, `account` dan `title` didefinisikan
dalam konfigurasi `amp-analytics`.
Variabel `canonicalUrl` dan `clientId` tidak didefinisikan dalam konfigurasi,
sehingga nilai-nilainya diganti oleh platform.

**Penting:** Penggantian variabel fleksibel;
variabel yang sama bisa Anda definisikan di lokasi berbeda,
 dan waktu proses AMP akan mem-parse nilai-nilai dalam urutan prioritas ini
 (lihat [Pengurutan penggantian variabel] (/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## Identifikasi pengguna

Situs web menggunakan cookie untuk menyimpan informasi yang spesifik bagi pengguna dalam browser.
Cookie bisa digunakan untuk memberi tahu bahwa pengguna sebelumnya telah mengunjungi situs.
Dalam AMP,
halaman bisa disajikan baik dari situs web penerbit maupun cache
(seperti Google AMP Cache).
Situs web penerbit dan cache kemungkinan memiliki domain yang berbeda,
Demi alasan keamanan,
browser bisa (dan sering kali akan) membatasi akses ke cookie domain lain
(lihat juga
[Pelacakan pengguna di seluruh asal](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Secara default,
AMP akan mengelola penyediaan ID klien apakah halaman itu diakses dari situs web asal penerbit maupun melalui cache.
ID klien yang dihasilkan oleh AMP memiliki nilai `"amp-"`
diikuti oleh </string> acak yang dienkodekan `base64` dan tetap sama
untuk pengguna jika pengguna yang sama berkunjung kembali.

AMP mengelola pembacaan dan penulisan ID klien dalam semua hal.
Ini terutama menonjol dalam hal ketika halaman disajikan
melalui cache atau juga ketika ditampilkan di luar konteks penayangan
dari situs asal penerbit.
Dalam kondisi seperti ini, akses ke cookie situs penerbit tidak tersedia.

Ketika halaman AMP disajikan dari situs penerbit,
kerangka kerja ID klien yang digunakan AMP bisa diberi tahu mengenai cookie dukungan
yang harus dicari dan digunakan.
Dalam hal ini,
argumen `cid-scope-cookie-fallback-name` dari variabel `clientId`
ditafsirkan sebagai nama cookie.
Pemformatan bisa tampak baik sebagai 
`CLIENT_ID(cid-scope-cookie-fallback-name)` maupun
`${clientId(cid-scope-cookie-fallback-name)}`.

Misalnya:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

Jika AMP menemukan bahwa cookie ini telah diatur,
maka penggantian ID klien akan mengembalikan nilai cookie tersebut.
Jika AMP menemukan bahwa cookie ini tidak diatur,
maka AMP akan menghasilkan nilai dari bentuk `amp-` diikuti
oleh </string> acak yang dienkodekan base64.

Ketahui selengkapnya tentang penggantian ID klien
termasuk cara menambahkan ID pemberitahuan pengguna opsional, dalam
[Variabel yang didukung dalam analisis AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
