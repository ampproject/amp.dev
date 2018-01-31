---
$title: "Analtik: Dasar-Dasar"
$order: 0
toc: true
---

Mulailah dari sini untuk mempelajari dasar-dasar terkait analitik AMP.

[TOC]

## Menggunakan amp-pixel atau amp-analytics?


AMP menyediakan 2 komponen untuk memenuhi kebutuhan analitik dan pengukuran Anda: [amp-pixel](/id/docs/reference/amp-pixel.html) 
dan [amp-analytics](/id/docs/reference/extended/amp-analytics.html). Kedua opsi akan mengirim data analitik ke titik akhir yang telah ditentukan.


Jika Anda mencari perilaku seperti [piksel pelacakan sederhana](https://en.wikipedia.org/wiki/Web_beacon#Implementation), komponen `amp-pixel` memberikan pelacakan tampilan halaman dasar; data tampilan halaman akan dikirim ke URL yang telah ditentukan. Sebagian integrasi dengan vendor mungkin memerlukan komponen ini, yang mana integrasi tersebut akan menetapkan titik akhir URL yang tepat.

Untuk sebagian besar solusi analitik, gunakan `amp-analytics`. Pelacakan tampilan halaman juga dapat berfungsi di `amp-analytics`. Namun, Anda juga dapat melacak interaksi pengguna dengan jenis konten halaman apa pun, termasuk klik pada link dan tombol. Selain itu, Anda dapat mengukur seberapa jauh halaman yang di-scroll oleh pengguna, apakah pengguna berinteraksi dengan media sosial atau tidak, dan aktivitas lainnya.

{% call callout('Pelajari lebih lanjut', type='read') %}
 Lihat [Mendalami Analitik AMP](/id/docs/guides/analytics/deep_dive_analytics.html. 
 {% endcall %}

Sebagai bagian dari proses integrasi dengan platform AMP, penyedia telah menawarkan konfigurasi `amp-analytics` 
yang telah ditentukan sehingga mempermudah pengambilan dan pemrosesan data ke fitur pelacakannya. Buka dokumentasi vendor dari daftar [Vendor Analitik](/id/docs/guides/analytics/analytics-vendors.html).

Anda dapat menggunakan `amp-pixel` dan `amp-analytics` 
di halaman Anda: `amp-pixel` untuk pelacakan tampilan halaman sederhana, dan `amp-analytics` untuk pelacakan lainnya. Anda juga dapat menambahkan beberapa konfigurasi untuk setiap tag. Jika bekerja sama dengan beberapa penyedia analitik, Anda memerlukan 1 tag untuk setiap solusi. Perlu diperhatikan bahwa halaman AMP yang lebih sederhana lebih disarankan untuk pengguna, sehingga apabila Anda tidak memerlukan tag tambahan, jangan gunakan tag tersebut.

## Membuat konfigurasi analitik sederhana


Pelajari cara membuat konfigurasi [amp-pixel](/id/docs/reference/amp-pixel.html) 
dan [amp-analytics](/id/docs/reference/extended/amp-analytics.html) sederhana.

### Konfigurasi amp-pixel sederhana

 Untuk membuat konfigurasi `amp-pixel` sederhana, masukkan URL seperti contoh berikut ke dalam isi halaman AMP Anda:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

 Pada contoh tersebut, data tampilan halaman dikirim ke URL yang ditentukan, bersama dengan nomor acak: Variabel `RANDOM` 
adalah salah satu dari banyak [variabel pengganti di platform AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Pelajari lebih lanjut tentang [Penggantian variabel](/id/docs/guides/analytics/analytics_basics.html#variable-substitution) di sini.

 Komponen [amp-pixel](/id/docs/reference/amp-pixel.html) bersifat default, sehingga Anda tidak memerlukan deklarasi inklusi seperti saat membuat komponen AMP yang diluaskan, termasuk `amp-analytics`. Namun, Anda harus menempatkan tag `amp-pixel` sedekat mungkin dengan permulaan isi `<body>` halaman AMP Anda. Piksel pelacakan hanya akan diproses jika tag terlihat dengan sendirinya. Jika `amp-pixel` terletak di dekat bagian bawah halaman, tag tersebut tidak akan diproses.

### Konfigurasi amp-analytics sederhana


Untuk membuat konfigurasi[ amp-analytics,](/id/docs/reference/extended/amp-analytics.html)  sederhana, Anda harus menyertakan deklarasi `custom-element` terlebih dahulu pada `<head>` dokumen AMP (lihat juga [Deklarasi inklusi komponen](/id/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]

<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

[/sourcecode]

 Contoh berikut mirip dengan contoh [`amp-pixel`](/id/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration). Setiap kali halaman terlihat, peristiwa pemicu akan diproses, dan mengirim data pageview ke URL yang telah ditentukan bersama dengan ID acak:

[sourcecode:html]
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
[/sourcecode]

 Pada contoh di atas, kita telah menentukan permintaan yang dinamakan pageview sebagai https://foo.com/pixel?RANDOM. Seperti yang telah dijelaskan di awal, RANDOM diganti dengan nomor acak, sehingga permintaan akan benar-benar terlihat seperti https://foo.com/pixel?0.23479283687235653498734.

 Saat halaman terlihat (seperti yang telah ditetapkan oleh penggunaan kata kunci pemicu `visible`), peristiwa akan dipicu dan `permintaan` pageview akan dikirim. Atribut pemicu menentukan waktu permintaan pageview akan diproses. Pelajari lebih lanjut tentang [permintaan dan pemicu](/id/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Penggantian variabel

 Kedua komponen [amp-pixel](/id/docs/reference/amp-pixel.html) 
dan [amp-analytics](/id/docs/reference/extended/amp-analytics.html) 
mengizinkan semua penggantian variabel URL standar (lihat [Penggantian Variabel HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)
). Pada contoh berikut, permintaan tampilan halaman dikirim ke URL, bersama dengan URL kanonis dokumen AMP yang digunakan, title-nya, dan [ID klien](/id/docs/guides/analytics/analytics_basics.html#user-identification):

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

Karena sifatnya yang sederhana, tag `amp-pixel`
hanya dapat menyertakan variabel yang ditentukan oleh platform atau jika waktu proses AMP dapat diuraikan dari halaman AMP. Pada contoh di atas, platform mengisi nilai untuk `canonicalURL` dan `clientId(site-user-id)`. Tag `amp-analytics` dapat menyertakan variabel yang sama sebagai `amp-pixel`, serta variabel unik yang telah ditentukan di dalam konfigurasi tag tersebut.

Gunakan format `${varName}` dalam string permintaan untuk variabel yang ditentukan oleh platform atau halaman. Tag `amp-analytics` 
akan menggantikan template dengan nilai yang sebenarnya saat konstruksi permintaan analitik dilakukan (lihat juga [Variabel yang didukung dalam amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

 Pada contoh `amp-analytics` berikut, permintaan tampilan halaman dikirim ke URL, dengan data tambahan yang diekstrak dari penggantian variabel, sebagian diberikan oleh platform, sebagian ditetapkan inline, dalam konfigurasi `amp-analytics`:

[sourcecode:html]
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
[/sourcecode]

Pada contoh di atas, variabel, `account` dan `title` ditentukan dalam konfigurasi `amp-analytics`. Variabel `canonicalUrl` dan `clientId` tidak ditentukan dalam konfigurasi, jadi nilai variabel tersebut akan diganti oleh platform.

{% call callout('Penting', type='caution') %}
 Penggantian variabel bersifat fleksibel; Anda dapat memiliki variabel yang sama yang ditentukan di lokasi yang berbeda, dan waktu proses AMP akan menguraikan nilai sesuai dengan urutan yang lebih tinggi (lihat [Urutan penggantian variabel](/id/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)). 
{% endcall %}

## Identifikasi pengguna


Situs menggunakan cookie untuk menyimpan informasi tertentu kepada pengguna di browser. Cookie dapat digunakan untuk memberikan informasi bahwa pengguna sebelumnya sudah pernah mengunjungi situs. Di AMP, halaman dapat ditayangkan dari situs penayang atau cache (seperti Cache AMP Google). Situs penayang dan cache kemungkinan memiliki domain yang berbeda. Demi alasan keamanan, browser dapat (dan sering kali akan) membatasi akses cookie domain lain (lihat juga [Melacak pengguna di berbagai domain asal](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

Secara default, AMP akan mengelola penyediaan ID klien apakah halaman diakses dari situs asli penayang atau melalui cache. ID klien yang dibuat AMP memiliki nilai `"amp-"`
followed by a random `yang diikuti oleh string yang dienkode base64 acak` dan tetap sama bagi pengguna jika pengguna yang sama tersebut mengunjunginya lagi.

AMP mengelola pembacaan dan penulisan ID klien pada semua kasus. Hal ini biasanya terlihat saat halaman ditayangkan melalui cache, atau sebaliknya ditampilkan di luar konteks penayangan dari situs asli penayang. Jika hal ini terjadi, cookie situs penayang tidak akan dapat diakses.

 Jika halaman AMP ditayangkan dari situs penayang, framework ID klien yang digunakan AMP dapat diberi tahu untuk mencari dan menggunakan cookie penggantian. Dalam kasus ini, argumen `cid-scope-cookie-fallback-name` dari variabel `clientId` 
akan diinterpretasikan sebagai nama cookie. Formatnya akan muncul sebagai `CLIENT_ID(cid-scope-cookie-fallback-name)` 
atau` ${clientId(cid-scope-cookie-fallback-name)}`.

Misalnya:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

 Jika AMP menemukan bahwa cookie tersebut ditetapkan, penggantian ID klien akan menampilkan nilai cookie. Jika AMP menemukan bahwa cookie tersebut tidak ditetapkan, AMP akan membuat nilai dari bentuk `amp-` yang diikuti oleh string yang dienkode base64 acak.


Pelajari lebih lanjut tentang penggantian ID klien, termasuk cara menambahkan ID pemberitahuan pengguna opsional, di [Variabel yang didukung dalam analitik AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

{% call callout('Pelajari lebih lanjut', type='read') %}
 Lanjutkan untuk mempelajari tentang analitik dengan [Mendalami Analitik AMP](/id/docs/guides/analytics/deep_dive_analytics.html) dan [Kasus Penggunaan](/id/docs/guides/analytics/use_cases.html). 
{% endcall %}

