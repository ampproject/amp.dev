---
$title: "Analtik: Dasar-Dasar"
---

Mulailah dari sini untuk mempelajari dasar-dasar terkait analitik AMP.

## Menggunakan amp-pixel atau amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP menyediakan 2 komponen untuk memenuhi kebutuhan analitik dan pengukuran Anda: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Kedua opsi akan mengirim data analitik ke titik akhir yang telah ditentukan.

Jika Anda mencari perilaku seperti [piksel pelacakan sederhana](https://en.wikipedia.org/wiki/Web_beacon#Implementation), komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) memberikan pelacakan tampilan halaman dasar; data tampilan halaman akan dikirim ke URL yang telah ditentukan. Sebagian integrasi dengan vendor mungkin memerlukan komponen ini, yang mana integrasi tersebut akan menetapkan titik akhir URL yang tepat.

Untuk sebagian besar solusi analitik, gunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Pelacakan tampilan halaman juga dapat berfungsi di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Namun, Anda juga dapat melacak interaksi pengguna dengan jenis konten halaman apa pun, termasuk klik pada link dan tombol. Selain itu, Anda dapat mengukur seberapa jauh halaman yang di-scroll oleh pengguna, apakah pengguna berinteraksi dengan media sosial atau tidak, dan aktivitas lainnya.

Pelajari lebih lanjut: Lihat [Mendalami Analitik AMP](deep_dive_analytics.md).

Sebagai bagian dari proses integrasi dengan platform AMP, penyedia telah menawarkan konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
yang telah ditentukan sehingga mempermudah pengambilan dan pemrosesan data ke fitur pelacakannya. Buka dokumentasi vendor dari daftar [Vendor Analitik](analytics-vendors.md).

Anda dapat menggunakan [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
di halaman Anda: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) untuk pelacakan tampilan halaman sederhana, dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) untuk pelacakan lainnya. Anda juga dapat menambahkan beberapa konfigurasi untuk setiap tag. Jika bekerja sama dengan beberapa penyedia analitik, Anda memerlukan 1 tag untuk setiap solusi. Perlu diperhatikan bahwa halaman AMP yang lebih sederhana lebih disarankan untuk pengguna, sehingga apabila Anda tidak memerlukan tag tambahan, jangan gunakan tag tersebut.

## Membuat konfigurasi analitik sederhana

Pelajari cara membuat konfigurasi [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sederhana.

### Konfigurasi amp-pixel sederhana

Untuk membuat konfigurasi [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sederhana, masukkan URL seperti contoh berikut ke dalam isi halaman AMP Anda:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

Pada contoh tersebut, data tampilan halaman dikirim ke URL yang ditentukan, bersama dengan nomor acak: Variabel `RANDOM`
adalah salah satu dari banyak [variabel pengganti di platform AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Pelajari lebih lanjut tentang [Penggantian variabel](analytics_basics.md#variable-substitution) di sini.

Komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) bersifat default, sehingga Anda tidak memerlukan deklarasi inklusi seperti saat membuat komponen AMP yang diluaskan, termasuk [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Namun, Anda harus menempatkan tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sedekat mungkin dengan permulaan isi `<body>` halaman AMP Anda. Piksel pelacakan hanya akan diproses jika tag terlihat dengan sendirinya. Jika [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) terletak di dekat bagian bawah halaman, tag tersebut tidak akan diproses.

### Konfigurasi amp-analytics sederhana

Untuk membuat konfigurasi[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Contoh berikut mirip dengan contoh [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Setiap kali halaman terlihat, peristiwa pemicu akan diproses, dan mengirim data pageview ke URL yang telah ditentukan bersama dengan ID acak:

```html
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
```

Pada contoh di atas, kita telah menentukan permintaan yang dinamakan pageview sebagai `https://foo.com/pixel?RANDOM`. Seperti yang telah dijelaskan di awal, RANDOM diganti dengan nomor acak, sehingga permintaan akan benar-benar terlihat seperti `https://foo.com/pixel?0.23479283687235653498734`.

Saat halaman terlihat (seperti yang telah ditetapkan oleh penggunaan kata kunci pemicu `visible`), peristiwa akan dipicu dan `permintaan` pageview akan dikirim. Atribut pemicu menentukan waktu permintaan pageview akan diproses. Pelajari lebih lanjut tentang [permintaan dan pemicu](deep_dive_analytics.md#requests-triggers--transports).

## Penggantian variabel <a name="variable-substitution"></a>

Kedua komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
mengizinkan semua penggantian variabel URL standar (lihat [Penggantian Variabel HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)
). Pada contoh berikut, permintaan tampilan halaman dikirim ke URL, bersama dengan URL kanonis dokumen AMP yang digunakan, title-nya, dan [ID klien](analytics_basics.md):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

Karena sifatnya yang sederhana, tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
hanya dapat menyertakan variabel yang ditentukan oleh platform atau jika waktu proses AMP dapat diuraikan dari halaman AMP. Pada contoh di atas, platform mengisi nilai untuk `canonicalURL` dan `clientId(site-user-id)`. Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dapat menyertakan variabel yang sama sebagai [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), serta variabel unik yang telah ditentukan di dalam konfigurasi tag tersebut.

Gunakan format `${varName}` dalam string permintaan untuk variabel yang ditentukan oleh platform atau halaman. Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
akan menggantikan template dengan nilai yang sebenarnya saat konstruksi permintaan analitik dilakukan (lihat juga [Variabel yang didukung dalam `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Pada contoh [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) berikut, permintaan tampilan halaman dikirim ke URL, dengan data tambahan yang diekstrak dari penggantian variabel, sebagian diberikan oleh platform, sebagian ditetapkan inline, dalam konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
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
```

Pada contoh di atas, variabel, `account` dan `title` ditentukan dalam konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Variabel `canonicalUrl` dan `clientId` tidak ditentukan dalam konfigurasi, jadi nilai variabel tersebut akan diganti oleh platform.

Penting: Penggantian variabel bersifat fleksibel; Anda dapat memiliki variabel yang sama yang ditentukan di lokasi yang berbeda, dan waktu proses AMP akan menguraikan nilai sesuai dengan urutan yang lebih tinggi (lihat [Urutan penggantian variabel](deep_dive_analytics.md#variable-substitution-ordering)).

## Identifikasi pengguna <a name="user-identification"></a>

Situs menggunakan cookie untuk menyimpan informasi tertentu kepada pengguna di browser. Cookie dapat digunakan untuk memberikan informasi bahwa pengguna sebelumnya sudah pernah mengunjungi situs. Di AMP, halaman dapat ditayangkan dari situs penayang atau cache (seperti Cache AMP Google). Situs penayang dan cache kemungkinan memiliki domain yang berbeda. Demi alasan keamanan, browser dapat (dan sering kali akan) membatasi akses cookie domain lain (lihat juga [Melacak pengguna di berbagai domain asal](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

Secara default, AMP akan mengelola penyediaan ID klien apakah halaman diakses dari situs asli penayang atau melalui cache. ID klien yang dibuat AMP memiliki nilai `"amp-"`
followed by a random `yang diikuti oleh string yang dienkode base64 acak` dan tetap sama bagi pengguna jika pengguna yang sama tersebut mengunjunginya lagi.

AMP mengelola pembacaan dan penulisan ID klien pada semua kasus. Hal ini biasanya terlihat saat halaman ditayangkan melalui cache, atau sebaliknya ditampilkan di luar konteks penayangan dari situs asli penayang. Jika hal ini terjadi, cookie situs penayang tidak akan dapat diakses.

Jika halaman AMP ditayangkan dari situs penayang, framework ID klien yang digunakan AMP dapat diberi tahu untuk mencari dan menggunakan cookie penggantian. Dalam kasus ini, argumen `cid-scope-cookie-fallback-name` dari variabel `clientId` akan diinterpretasikan sebagai nama cookie. Formatnya akan muncul sebagai `CLIENT_ID(cid-scope-cookie-fallback-name)`
atau` ${clientId(cid-scope-cookie-fallback-name)}`.

Misalnya:

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

Jika AMP menemukan bahwa cookie tersebut ditetapkan, penggantian ID klien akan menampilkan nilai cookie. Jika AMP menemukan bahwa cookie tersebut tidak ditetapkan, AMP akan membuat nilai dari bentuk `amp-` yang diikuti oleh string yang dienkode base64 acak.

Pelajari lebih lanjut tentang penggantian ID klien, termasuk cara menambahkan ID pemberitahuan pengguna opsional, di [Variabel yang didukung dalam analitik AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

Pelajari lebih lanjut: Lanjutkan untuk mempelajari tentang analitik dengan [Mendalami Analitik AMP](deep_dive_analytics.md) dan [Kasus Penggunaan](use_cases.md).
