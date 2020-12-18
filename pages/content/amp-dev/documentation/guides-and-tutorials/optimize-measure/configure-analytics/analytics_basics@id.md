---
"$title": 'Analitik: Dasar-Dasar'
"$order": '0'
description: 'AMP menyediakan dua komponen untuk memenuhi kebutuhan analitik dan pengukuran Anda: amp-pixel dan amp-analytics. Kedua opsi ini mengirimkan data analitik ke titik akhir (endpoint) yang ditentukan.'
formats:
- websites
- stories
---

Mulailah dari sini untuk mempelajari dasar-dasar terkait analitik AMP.

## Menggunakan amp-pixel atau amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP menyediakan dua komponen untuk memenuhi kebutuhan analitik dan pengukuran Anda: amp-pixel dan amp-analytics. Kedua opsi ini mengirimkan data analitik ke titik akhir (endpoint) yang ditentukan.

Jika Anda mencari perilaku seperti [piksel pelacakan](https://en.wikipedia.org/wiki/Web_beacon#Implementation) sederhana, komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) memberikan pelacakan tampilan halaman dasar; data tampilan halaman akan dikirimkan ke URL yang telah ditentukan. Sebagian integrasi dengan vendor mungkin memerlukan komponen ini, yang mana integrasi tersebut akan menetapkan titik akhir URL yang tepat.

Untuk sebagian besar solusi analitik, gunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Pelacakan tampilan halaman juga dapat berfungsi di [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Namun, Anda juga dapat melacak keterlibatan pengguna dengan jenis konten halaman apa pun, termasuk klik pada tautan dan tombol. [filter formats="websites"] Selain itu, Anda dapat mengukur seberapa jauh halaman yang telah digulir oleh pengguna, apakah pengguna berinteraksi dengan media sosial atau tidak, dan aktivitas lainnya. [/filter] [filter formats="stories"] Anda juga dapat mengukur sejauh apa pengguna mengetuk pada cerita, dan apakah pengguna tersebut berinteraksi dengan elemen-elemen interaktif. [/filter]

[tip type = "read-on"] Lihat [Mendalami Analitik AMP](deep_dive_analytics.md). [/tip]

Sebagai bagian dari proses integrasi dengan platform AMP, penyedia telah menawarkan konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) yang telah ditentukan sehingga mempermudah pengambilan dan pemrosesan data ke alat pelacakannya. Buka dokumentasi vendor dari daftar [Vendor Analitik](analytics-vendors.md).

Anda dapat menggunakan [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) di halaman Anda: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) untuk pelacakan tampilan halaman sederhana, dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) untuk pelacakan lainnya. Anda juga dapat menambahkan beberapa tag dari setiap jenis. Jika bekerja dengan beberapa penyedia analitik, Anda memerlukan satu tag untuk setiap solusi. Perlu diperhatikan bahwa halaman AMP yang lebih sederhana lebih disarankan untuk pengguna, sehingga apabila Anda tidak memerlukan tag tambahan, jangan gunakan tag tersebut.

## Membuat konfigurasi analitik sederhana

Pelajari cara membuat konfigurasi [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sederhana.

### Konfigurasi <code>amp-pixel</code> sederhana

Untuk membuat konfigurasi [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sederhana, masukkan URL seperti contoh berikut ini ke dalam badan halaman AMP Anda:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

Dalam contoh ini, data tampilan halaman dikirimkan ke URL yang telah ditentukan, bersama sebuah nomor acak: Variabel `RANDOM` adalah salah satu dari banyak [variabel pengganti di platform AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Pelajari lebih lanjut tentang [Penggantian variabel](analytics_basics.md#variable-substitution) di sini.

Komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) bersifat standar, sehingga Anda tidak memerlukan deklarasi inklusi seperti saat membuat komponen AMP yang diperluas, termasuk [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Namun, Anda harus menempatkan tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) sedekat mungkin dengan permulaan `<body>` halaman AMP Anda. Piksel pelacakan hanya akan diproses jika tag terlihat dengan sendirinya. Jika [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) diposisikan di dekat bagian bawah halaman, tag tersebut mungkin tidak akan berfungsi.

### Konfigurasi <code>amp-analytics</code> sederhana

Untuk membuat konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sederhana, Anda harus menyertakan deklarasi `custom-element` ini terlebih dahulu di `<head>` dokumen AMP (kunjungi juga [Deklarasi penyertaan komponen](../../../../documentation/components/index.html) ):

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Contoh berikut ini mirip dengan [ contoh `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Setiap kali halaman terlihat, peristiwa pemicu akan diproses, dan mengirimkan data tampilan halaman (pageview) ke URL yang telah ditentukan bersama dengan sebuah ID acak:

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

Pada contoh di atas, kita telah menentukan tampilan halaman yang dipanggil untuk menjadi `https://foo.com/pixel?RANDOM`. Seperti yang telah dijelaskan di awal, RANDOM diganti dengan nomor acak, sehingga permintaan akan terlihat seperti `https://foo.com/pixel?0.23479283687235653498734`.

Saat halaman terlihat (seperti yang telah ditetapkan dengan penggunaan kata kunci pemicu `visible`), sebuah peristiwa akan dipicu dan permintaan `pageview` akan dikirimkan. Atribut pemicu menentukan kapan permintaan tampilan halaman diproses. Pelajari lebih lanjut tentang [permintaan dan pemicu](deep_dive_analytics.md#requests-triggers--transports).

[filter format = "stories"]

## Konfigurasi standar cerita AMP

Perjalanan atau penjelajahan pengguna yang khas untuk sebuah situs web sangat berbeda dengan cerita. Di situs web, pengguna dapat membaca judulnya, menggulir ke bagian bawah halaman, berinteraksi dengan formulir sebelum mengeklik tautan ke halaman berikutnya. Cerita menempati viewport sepenuhnya dan pengguna tidak menggulir, tetapi mengetuk untuk bergerak maju.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

Banyak yang ingin mengukur setiap [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) dalam cerita sebagai tampilan halaman baru karena konten dari layar ke layar sangat berbeda. Namun, halaman tersebut hanyalah satu elemen dalam sebuah cerita lengkap — dan pengguna biasanya perlu melihat banyak halaman cerita untuk memahami cerita sepenuhnya. Jadi, pertanyaan tentang bagaimana kita menghitung sesuatu sesederhana tampilan halaman memiliki implikasi yang sangat besar untuk pendekatan analitik kita.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

Analytics AMP memudahkan penerapan di atas dengan menggunakan vendor analitik apa pun. Misalnya: dengan [Tag Situs Global](https://developers.google.com/gtagjs/) Google Analytics, akan terlihat seperti cuplikan di bawah ini.

```html
<amp-analytics type="gtag" data-credentials="include">
 <script type="application/json">
  {
    "vars": {
      "gtag_id":"YOUR_GOOGLE_ANALYTICS_ID",
      "config": {
        "YOUR_GOOGLE_ANALYTICS_ID": {
          "groups":"default"
        }
      }
    },
    "triggers": {
      "storyProgress": {
        "on":"story-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_progress",
          "event_category":"${title}",
          "event_label":"${storyPageId}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      },
      "storyEnd": {
        "on":"story-last-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_complete",
          "event_category":"${title}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      }
    }
  }
 </script>
</amp-analytics>
```

Konfigurasi default ini akan memberi Anda konfigurasi lengkap yang berfungsi untuk sebuah cerita AMP.

Jika Anda tertarik untuk mengetahui lebih dari apa yang dapat diberikan konfigurasi standar, kunjungi [Analitik untuk Cerita AMP Anda](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg) guna menemukan contoh penggunaan lebih lanjut dengan Google Analytics.

[/filter]

## Penggantian variabel <a name="variable-substitution"></a>

Baik komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) maupun [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) mengizinkan semua penggantian variabel URL standar (kunjungi [Penggantian Variabel HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) ). Di dalam contoh berikut ini, permintaan tampilan halaman dikirimkan ke URL, bersama dengan URL kanonis dokumen AMP saat ini, judulnya, dan sebuah [ID klien](analytics_basics.md#user-identification):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

Karena kesederhanaannya, tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) hanya dapat menyertakan variabel yang ditentukan oleh platform atau yang dapat diuraikan runtime AMP dari halaman AMP. Dalam contoh di atas, platform mengisi nilai untuk `canonicalURL` dan `clientId(site-user-id)`. Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dapat menyertakan variabel yang sama seperti [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), serta variabel yang ditentukan secara unik di dalam konfigurasi tag.

Gunakan format `${varName}` di dalam untai permintaan untuk halaman atau variabel yang ditentukan platform. Tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) akan mengganti templat dengan nilai sebenarnya pada saat pembuatan permintaan analitik (kunjungi juga [Variabel yang didukung dalam `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Di dalam contoh [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) berikut ini, permintaan tampilan halaman dikirimkan ke URL, dengan data tambahan yang diekstrak dari penggantian variabel, beberapa disediakan oleh platform, beberapa ditentukan inline, dalam konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account":"ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Di dalam contoh di atas, variabel-variabel, `account`, dan `title` ditentukan dalam konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Variabel `canonicalUrl` dan `clientId` tidak ditentukan dalam konfigurasi, sehingga nilainya diganti oleh platform.

[tip type="important"] **PENTING –**: Penggantian variabel bersifat fleksibel; Anda dapat memiliki variabel yang sama yang telah ditentukan di lokasi berbeda, dan runtime AMP akan menguraikan nilai sesuai dengan urutan yang lebih tinggi (kunjungi <a>Urutan penggantian variabel</a>). [/tip]

## Identifikasi pengguna <a name="user-identification"></a>

Situs web menggunakan cookie untuk menyimpan informasi tertentu terkait pengguna di browser. Cookie dapat digunakan untuk memberikan informasi bahwa seorang pengguna sebelumnya sudah pernah mengunjungi suatu situs. Di AMP, halaman dapat ditayangkan dari situs penayang atau cache (seperti Cache AMP Google). Situs web penayang dan cache kemungkinan besar memiliki domain yang berbeda. Demi keamanan, browser dapat (dan sering kali akan) membatasi akses cookie domain lain (kunjungi juga [Melacak pengguna di berbagai domain asal](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

Sebagai standar, AMP akan mengelola penyediaan ID klien, baik halaman diakses dari situs web asli penayang atau melalui cache. ID klien yang dibuat AMP memiliki nilai `"amp-"` yang diikuti oleh untai berkode `base64` yang acak dan tetap sama bagi pengguna tersebut jika pengguna yang sama tersebut mengunjunginya lagi.

AMP mengelola pembacaan dan penulisan ID klien dalam semua kasus. Hal ini terutama terlihat saat halaman ditayangkan melalui cache atau ditampilkan di luar konteks penayangan dari situs asli penayang. Jika hal ini terjadi, cookie situs penayang tidak akan tersedia.

Saat halaman AMP disajikan dari situs penayang, kerangka kerja ID klien yang digunakan AMP dapat diberi tahu tentang cookie fallback yang harus dicari dan digunakan. Dalam kasus ini, argumen `cid-scope-cookie-fallback-name` dari variabel `clientId` ditafsirkan sebagai nama cookie. Pemformatan dapat muncul sebagai `CLIENT_ID(cid-scope-cookie-fallback-name)` atau `${clientId(cid-scope-cookie-fallback-name)}`.

Contohnya:

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

Jika AMP menemukan bahwa cookie ini telah ditempatkan, penggantian ID klien akan mengembalikan nilai cookie tersebut. Jika AMP menemukan bahwa cookie ini belum ditempatkan, AMP akan menghasilkan nilai dalam bentuk `amp-` yang diikuti oleh untai berkode base64 acak.

Pelajari lebih lanjut tentang penggantian ID klien, termasuk cara menambahkan ID notifikasi pengguna opsional, di [Variabel yang didukung dalam analitik AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

Pelajari lebih lanjut: Lanjutkan mempelajari tentang analitik dengan [Mendalami Analitik AMP](deep_dive_analytics.md) dan [Contoh Penggunaan](use_cases.md).
