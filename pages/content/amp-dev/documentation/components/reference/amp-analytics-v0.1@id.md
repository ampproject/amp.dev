---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Captures analytics data from an AMP document.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Mengambil data analisis dari dokumen AMP.

<table>
  <tr>
    <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"&lt;&gt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-analytics/">contoh amp-analytics</a> di AMP By Example.</td>
  </tr>
</table>


## Mengirimkan analisis ke vendor atau internal? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Sebelum mulai menggunakan Analytics AMP di situs, Anda harus memutuskan apakah akan menggunakan fitur analisis pihak ketiga atau solusi internal Anda sendiri untuk menganalisis interaksi pengguna.

[tip type="read-on"]
Pelajari semua tentang Analytics AMP di panduan [Mengonfigurasi Analytics](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md).
[/tip]

### Mengirim data ke vendor analisis <a name="analytics-vendors"></a>

Analytics AMP dirancang khusus untuk mengukur sekali dan melaporkan hasilnya ke banyak pihak. Jika Anda sudah menggunakan satu atau beberapa vendor analisis, periksa daftar [Vendor Analisis](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) untuk melihat apakah mereka telah mengintegrasikan solusinya dengan AMP.

Untuk vendor Analytics AMP terintegrasi:

1. Pada tag `<amp-analytics>`, tambahkan atribut `type` dan tetapkan nilainya ke [vendor](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) yang ditentukan.
1. Tentukan data yang ingin Anda ambil dan pantau, dan tetapkan detail tersebut dalam data konfigurasi. Lihat dokumentasi vendor untuk mengetahui cara mengambil data analisis.

Jika vendor analisis belum terintegrasi dengan AMP, hubungi vendor untuk meminta dukungan mereka. Sebaiknya Anda juga mengajukan masalah di project AMP dan meminta agar vendor tersebut ditambahkan. Lihat juga [Mengintegrasikan fitur analisis di HTML AMP](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md). Cara lainnya, lakukan kerja sama dengan vendor untuk mengirim data ke URL yang mereka tentukan. Pelajari lebih lanjut di bagian [Mengirim data secara internal](#sending-data-in-house) di bawah.

*Contoh: Mengirim data ke penyedia analisis pihak ketiga*

Pada contoh berikut, data analisis dikirim ke Nielsen, penyedia analisis pihak ketiga yang sudah terintegrasi dengan AMP. Detail terkait mengonfigurasi data analisis untuk Nielsen dapat ditemukan dalam dokumentasi [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

```html
<amp-analytics type="nielsen">
  <script type="application/json">
    {
      "vars": {
        "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "apv": "1.0",
        "apn": "My AMP Website",
        "section": "Entertainment",
        "segA": "Music",
        "segB": "News",
        "segC": "Google AMP"
      }
      }
  </script>
</amp-analytics>
```

### Mengirim data secara internal <a name="sending-data-in-house"></a>

Jika memiliki solusi internal sendiri untuk mengukur interaksi pengguna, satu-satunya hal yang Anda perlukan untuk mengintegrasikan Analytics AMP dengan solusi tersebut adalah URL. Di sinilah Anda akan mengirim data. Anda juga dapat mengirim data ke berbagai URL. Misalnya, Anda dapat mengirim data kunjungan halaman ke satu URL, dan data interaksi sosial ke URL lain.

[tip type="note"]
Jika solusi internal Anda melibatkan kerja sama dengan vendor analisis yang belum terintegrasi dengan AMP, tentukan bersama vendor tersebut informasi konfigurasi apa saja yang diperlukan.
[/tip]

Untuk mengirim data ke URL tertentu:

1. Tentukan data yang ingin Anda ambil dan pantau, dan [tetapkan detail tersebut dalam data konfigurasi](#specifying-configuration-data).
1. Pada objek konfigurasi [`requests`](#requests), tentukan jenis permintaan yang akan dipantau (misalnya kunjungan halaman, peristiwa tertentu yang dipicu) dan URL ke mana Anda ingin mengirim data pemantauan.

[tip type="note"]
Saat memproses URL AMP di header perujuk permintaan analisis, hapus atau abaikan parameter `usqp`. Parameter ini digunakan oleh Google untuk memicu eksperimen untuk Cache AMP Google.
[/tip]

*Contoh: Mengirim data ke URL*

Berikut adalah contoh sederhana yang memantau kunjungan halaman.  Setiap kali halaman terlihat, peristiwa pemicu diaktifkan, dan data kunjungan halaman dikirim ke URL yang ditentukan beserta sebuah ID acak.

```html
<amp-analytics>
<script type="application/json">
  {
    "requests": {
      "pageview": "https://foo.com/pixel?RANDOM"
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

[tip type="success"]
Untuk beberapa kasus umum penggunaan pemantauan (misalnya, kunjungan halaman, klik halaman, scroll, dll.) Lihat [Analytics: Kasus Penggunaan](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md).
[/tip]

## Menentukan data konfigurasi <a name="specifying-configuration-data"></a>

Pada elemen `<amp-analytics>`, tentukan objek konfigurasi JSON yang berisi detail terkait apa yang diukur dan ke mana data analisis dikirim.

Objek konfigurasi untuk `<amp-analytics>` menggunakan format berikut:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Konfigurasi inline atau jarak jauh <a name="inline-or-remote-configuration"></a>

Data konfigurasi dapat ditentukan secara inline atau diambil dari jauh dengan menentukan URL dalam atribut `config`. Selain itu, konfigurasi bawaan untuk vendor analisis populer dapat dipilih menggunakan atribut `type`.

Jika data konfigurasi dari beberapa sumber digunakan, objek konfigurasi (variabel, permintaan, dan pemicu) akan digabungkan sedemikan rupa sehingga:

1. Konfigurasi jarak jauh lebih diutamakan daripada konfigurasi inline, dan
1. Konfigurasi inline lebih diutamakan daripada konfigurasi vendor.

#### Memuat konfigurasi jarak jauh <a name="loading-remote-configuration"></a>

Untuk memuat konfigurasi jarak jauh, dalam elemen `<amp-analytics>`, tentukan atribut `config` dan URL untuk data konfigurasi. URL yang ditentukan harus menggunakan skema HTTPS. URL ini dapat menyertakan [variabel URL AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Untuk mengakses cookie, lihat atribut [`data-credentials`](#data-credentials). Responsnya harus mengikuti [panduan keamanan CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Dalam contoh ini, kami menentukan atribut `config` untuk memuat data konfigurasi dari URL yang ditentukan.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Rewriter Konfigurasi <a name="configuration-rewriter"></a>

Fitur rewriter konfigurasi dirancang agar penyedia analisis dapat menulis ulang secara dinamis konfigurasi yang disediakan. Fitur ini mirip dengan konfigurasi jarak jauh, tetapi dengan tambahan konfigurasi buatan pengguna dalam permintaan yang dikirim ke sever. Untuk sekarang, tindakan ini hanya dapat diaktifkan oleh vendor analisis.

Vendor analisis menentukan properti configRewriter dengan URL server.
```js
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    },
  ...
  }
```

Runtime mengirim permintaan yang berisi konfigurasi inline, yang digabung dengan konfigurasi jarak jauh yang disediakan, ke endpoint configRewriter yang diberikan oleh vendor. Vendor menggunakan sistem server data ini untuk menyusun dan mengembalikan konfigurasi baru yang ditulis ulang.

Selanjutnya, runtime menggabungkan semua konfigurasi yang disediakan untuk menentukan konfigurasi akhir dengan urutan dari prioritas tertinggi ke terendah:

1. Konfigurasi yang Ditulis Ulang
1. Konfigurasi Inline
1. Konfigurasi yang ditentukan vendor

##### Grup Variabel <a name="variable-groups"></a>

Grup Variabel adalah fitur yang memungkinkan penyedia analisis untuk mengelompokkan sekumpulan variabel yang ditentukan sebelumnya agar dapat diaktifkan dengan mudah oleh pengguna. Variabel ini kemudian ditetapkan dan dikirim ke endpoint `configRewriter` yang ditentukan.

Penyedia analisis harus membuat objek `varGroups` baru di dalam konfigurasi `configRewriter` untuk mengaktifkan fitur ini. Selanjutnya penayang dapat menyertakan penyedia analisis bernama yang membuat `varGroups` yang ingin mereka aktifkan dalam konfigurasi analisisnya. Semua variabel yang didukung oleh [Panduan Substitusi HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) dapat digunakan. *Catatan penting*: varian ${varName} tidak akan berfungsi.

Misalnya, kami mungkin memiliki vendor yang konfigurasinya terlihat seperti ini:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
  ...
  'configRewriter': {
    'url': 'https://www.vendor.com/amp-config-rewriter',
    'varGroups' : {
      'group1': {
        'referrer': 'DOCUMENT_REFERRER',
        'source': 'SOURCE_URL',
      'group2': {
        'title': 'TITLE',
      },
    },
  },
},
  ...
}
```

Anda dapat menentukan grup variabel mana yang diaktifkan dengan menyertakan `{enabled: true}` untuk `varGroups` tertentu dalam konfigurasi `<amp-analytics>` penyedia. `enabled` adalah kata kunci yang dicadangkan, dan tidak dapat digunakan sebagai nama variabel.

Pada contoh di bawah, baik `group1` maupun `group2` telah diaktifkan. Semua grup yang belum diaktifkan secara khusus akan diabaikan. Selanjutnya, runtime akan menetapkan semua variabel yang telah diaktifkan ini, dan menggabungkannya menjadi satu objek `configRewriter.vars` yang akan dikirim ke URL rewriter konfigurasi.

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

  Dalam contoh berikut, bagian isi permintaan akan terlihat seperti ini:

```json
  /* Sent to configuration rewriter server. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
      }
    }
```

### Objek data konfigurasi <a name="configuration-data-objects"></a>

#### Permintaan <a name="requests"></a>

Objek konfigurasi `requests` menentukan URL yang digunakan untuk mengirimkan data ke platform analisis serta mengelompokkan atau melaporkan perilaku permintaan. `request-name` menentukan permintaan yang harus dikirim sebagai respons atas peristiwa tertentu (misalnya `pageview`, `event`, dll.). `request-value` berisi URL https. Nilainya dapat mencakup token placeholder yang dapat merujuk permintaan atau variabel lain. `request-value` juga dapat berupa objek yang berisi konfigurasi permintaan opsional.

##### Konfigurasi permintaan <a name="request-configs"></a>

Properti untuk menentukan permintaan ke sebuah objek adalah:

- `baseUrl`: Menentukan URL permintaan (wajib).
- `reportWindow`: Properti opsional untuk menentukan waktu (dalam detik) guna menghentikan permintaan pelaporan. Pemicu dengan `important: true` akan menggantikan batas rentang waktu laporan maksimum.

Dalam contoh ini, semua permintaan valid.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Beberapa penyedia analisis memiliki konfigurasi yang telah disediakan, yang Anda gunakan melalui atribut `type`. Jika menggunakan penyedia analisis, Anda tidak perlu menyertakan informasi permintaan. Lihat dokumentasi vendor Anda untuk mengetahui apakah permintaan perlu dikonfigurasi, dan bagaimana caranya.

##### Konfigurasi pengelompokan <a name="batching-configs"></a>

Untuk mengurangi jumlah ping permintaan, Anda dapat menentukan perilaku pengelompokan dalam konfigurasi permintaan. Semua [`extraUrlParams`](#extra-url-params) dari `triggers` yang menggunakan permintaan yang sama akan ditambahkan ke `baseUrl` permintaan.

Properti pengelompokan adalah:

- `batchInterval`: Properti ini menentukan interval waktu (dalam detik) untuk membersihkan ping permintaan dalam antrean pengelompokan. `batchInterval` dapat berupa angka atau deret angka (interval waktu minimum adalah 200 milidetik). Permintaan ini akan mempertimbangkan setiap nilai dalam deret, lalu mengulangi nilai interval terakhir (atau nilai tunggal) setelah mencapai akhir deret.

Misalnya, konfigurasi berikut akan mengirim ping permintaan tunggal setiap 2 detik, dengan satu contoh ping permintaan terlihat seperti `https://example.com/analytics?rc=1&rc=2`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

Konfigurasi berikut mengirimkan ping permintaan pertama setelah 1 detik dan kemudian mengirimkan permintaan setiap 3 detik. Ping permintaan pertama terlihat seperti `https://example.com/analytics?rc=1`, sedangkan ping permintaan kedua terlihat seperti `https://example.com/analytics?rc=2&rc=3&rc=4`.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Variabel <a name="vars"></a>

Komponen `amp-analytics` menentukan banyak variabel dasar yang dapat digunakan dalam permintaan. Daftar semua variabel tersebut tersedia di [Panduan Variabel `amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md). Selain itu, semua variabel yang didukung oleh [Panduan Substitusi HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) juga didukung.

Objek konfigurasi `vars` dapat digunakan untuk menentukan key-value pair baru atau mengganti variabel yang sudah ada yang dapat dirujuk dalam nilai `request`. Variabel baru biasanya digunakan untuk menentukan informasi khusus penayang.  Array dapat digunakan untuk menentukan daftar nilai yang harus dienkode URL secara terpisah dengan tetap mempertahankan koma pemisah.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Parameter URL Tambahan <a name="extra-url-params"></a>

Objek konfigurasi `extraUrlParams` menetapkan parameter tambahan yang akan disertakan dalam permintaan. Secara default, parameter URL tambahan ditambahkan ke string kueri URL permintaan melalui konvensi "&foo=baz" biasa.

Berikut adalah contoh yang akan menambahkan `&a=1&b=2&c=3` ke permintaan:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

`extraUrlParams` dapat dikirim melalui isi permintaan, bukan URL, jika `useBody` diaktifkan dan permintaan dikirim melalui metode transport `beacon` atau `xhrpost`. Dalam hal ini, parameternya tidak dienkodekan atau disatukan URL. Lihat [Menggunakan Isi untuk Parameter URL Tambahan](#use-body-for-extra-url-params) untuk penjelasan selengkapnya.

Atribut `extraUrlParamsReplaceMap` menentukan peta kunci dan nilai yang berfungsi sebagai parameter ke `String.replace()` untuk mempra-proses kunci dalam konfigurasi `extraUrlParams`. Misalnya, jika konfigurasi `extraUrlParams` menentukan `"page.title": "The title of my page"` dan `extraUrlParamsReplaceMap` menentukan `"page.": "_p_"`, maka `&_p_title=The%20title%20of%20my%20page%20` akan ditambahkan ke permintaan.

`extraUrlParamsReplaceMap` tidak diperlukan untuk menggunakan `extraUrlParams`. Jika `extraUrlParamsReplaceMap` tidak ditentukan, maka tidak ada substitusi string yang akan terjadi dan string yang ditentukan di `extraUrlParams` akan digunakan apa adanya.

Jika `useBody` diaktifkan dan permintaan dikirim melalui metode transport `beacon` atau `xhrpost`, substitusi string `extraUrlParamsReplaceMap` hanya akan dijalankan pada kunci level paling atas di `extraUrlParams`.

#### Pemicu <a name="triggers"></a>

Objek konfigurasi `triggers` menjelaskan kapan permintaan analisis harus dikirim. Atribut `triggers` berisi key-value pair yang terdiri dari nama pemicu dan konfigurasi pemicu. Nama pemicu dapat berupa sembarang string yang terdiri dari karakter alfanumerik (a-z, A-Z, 0-9). Pemicu dari konfigurasi yang prioritasnya lebih rendah akan digantikan oleh pemicu dengan nama yang sama dari konfigurasi yang prioritasnya lebih tinggi.

* `on` (wajib) Peristiwa yang dideteksi. Nilai yang valid adalah `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access-analytics.md), dan [`video-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md)
* `request` (wajib) Nama permintaan yang akan dikirim (seperti ditentukan dalam bagian `requests`).
* `vars` Objek yang berisi key-value pair yang digunakan untuk menggantikan `vars` yang ditetapkan dalam konfigurasi level paling atas, atau untuk menentukan variabel yang unik bagi pemicu ini.
* `important` dapat ditentukan agar berfungsi dengan permintaan yang mendukung perilaku pengelompokan atau rentang waktu laporan. Menetapkan `important` ke `true` dapat membantu membersihkan antrean permintaan yang dikelompokkan dengan beberapa pemicu tertentu. Dalam hal ini, Anda dapat mengurangi jumlah ping permintaan tanpa kehilangan peristiwa pemicu yang penting. Menetapkan `important` ke `true` juga dapat mengganti nilai `reportWindow` permintaan untuk mengirimkan ping permintaan penting dalam situasi apa pun.
* `selector` dan `selectionMethod` dapat ditentukan untuk beberapa pemicu, seperti `click` dan `visible`. Lihat [Selektor elemen](#element-selector) untuk selengkapnya.
* `scrollSpec` (wajib jika `on` ditetapkan ke `scroll`) Konfigurasi ini digunakan bersama dengan pemicu `scroll`. Harap lihat detail di bawah ini.
* `timerSpec` (wajib jika `on` ditetapkan ke `timer`) Konfigurasi ini digunakan bersama dengan pemicu `timer`. Harap lihat detail di bawah ini.
* `sampleSpec` Objek ini digunakan untuk menetapkan bagaimana permintaan dapat diambil sampelnya sebelum dikirim. Setelan ini memungkinkan pengambilan sampel berdasarkan input acak atau variabel lain yang didukung platform. Objek tersebut berisi konfigurasi untuk menentukan input yang digunakan untuk menghasilkan hash dan ambang batas yang harus dipenuhi hash.
    * `sampleOn` Template string ini diperluas dengan mengisi variabel platform dan kemudian di-hash untuk menghasilkan angka untuk keperluan logika pengambilan sampel yang dideskripsikan di bawah ambang batas di bawah.
    * `threshold` Konfigurasi ini digunakan untuk memfilter permintaan yang tidak memenuhi kriteria tertentu: Agar permintaan dapat melalui vendor analisis, logika berikut harus bernilai true `HASH(sampleOn) < threshold`.</li>
* `videoSpec` (digunakan jika `on` ditetapkan ke `video-*`) Konfigurasi ini digunakan bersama dengan pemicu [`video-*`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md).

Sebagai contoh, konfigurasi berikut dapat digunakan untuk mengambil sampel 50% permintaan berdasarkan input acak atau sebesar 1% berdasarkan ID klien.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Selektor elemen <a name="element-selector"></a>

Beberapa pemicu seperti `click` dan `visible` memungkinkan penentuan satu atau sekumpulan elemen menggunakan properti selektor. Pemicu yang berbeda dapat menerapkan batasan dan interpretasi yang berbeda pada elemen yang dipilih, seperti apakah selektor berlaku pada semua elemen yang cocok atau elemen pertama, atau elemen mana yang dapat dicocokkan: semua elemen atau hanya elemen AMP. Lihat dokumentasi setiap pemicu yang terkait untuk penjelasan selengkapnya.

Properti selektor adalah:

- `selector` Properti ini digunakan untuk menemukan satu atau sekumpulan elemen menggunakan kueri CSS/DOM. Semantik pencocokan elemen dapat diubah menggunakan metode `selectionMethod`. Nilai properti ini dapat berupa salah satu dari:
    - selektor CSS yang valid, misalnya `#ad1` atau `amp-ad`.
    - `:root` - selektor khusus yang cocok dengan root dokumen.
- `selectionMethod` Jika ditentukan, properti ini dapat memiliki salah satu dari dua nilai: `scope` atau `closest`. Nilai `scope` memungkinkan pemilihan elemen dalam elemen induk dari tag `amp-analytics`. Nilai `closest` menelusuri ancestor terdekat dari tag `amp-analytics` yang sesuai dengan selektor tertentu. Nilai defaultnya adalah `scope`.

##### Pemicu awal render sematan <a name="embed-render-start-trigger"></a>

Elemen AMP yang menyematkan dokumen lain dalam iframe (misalnya iklan) dapat melaporkan peristiwa awal render (`"on": "render-start"`). Peristiwa ini biasanya dilaporkan segera setelah sistem dapat mengonfirmasi bahwa rendering dokumen sematan telah dimulai. Pelajari dokumentasi elemen AMP tertentu untuk mengetahui apakah elemen tersebut melaporkan peristiwa ini atau tidak.

Pemicu untuk elemen sematan harus menyertakan [`selector`](#element-selector) yang mengarah ke elemen penyematan:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

Peristiwa awal render juga dilaporkan oleh dokumen itu sendiri dan dapat dikonfigurasi sebagai:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### Pemicu pemuatan awal <a name="initial-load-trigger"></a>

Peristiwa pemuatan awal (`"on": "ini-load"`) dipicu ketika konten awal dari sebuah elemen AMP atau dokumen AMP telah dimuat.

"Pemuatan awal" ditetapkan dalam hubungannya dengan container dan ukuran awalnya.
Lebih spesifiknya:

- Untuk dokumen: semua elemen di viewport pertama.
- Untuk elemen sematan: semua elemen konten dalam dokumen sematan yang diposisikan dalam ukuran awal elemen sematan itu.
- Untuk elemen AMP sederhana (misalnya `amp-img`): resource itu sendiri, seperti gambar atau video.

Pemicu untuk elemen sematan atau AMP harus menyertakan [`selector`](#element-selector) yang mengarah ke elemen itu:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

Peristiwa pemuatan awal juga dilaporkan oleh dokumen itu sendiri dan dapat dikonfigurasi sebagai:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Pemicu visibilitas halaman dan elemen <a name="page-and-element-visibility-trigger"></a>

Gunakan pemicu visibilitas halaman (`"on": "visible"`) untuk mengaktifkan permintaan saat halaman mulai terlihat. Pengaktifan pemicu ini dapat dikonfigurasi menggunakan `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

Pemicu visibilitas elemen dapat dikonfigurasi untuk setiap elemen AMP atau root dokumen menggunakan [`selector`](#element-selector). Pemicu akan diaktifkan saat elemen yang ditentukan cocok dengan parameter visibilitas yang dapat disesuaikan menggunakan `visibilitySpec`.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

Perhatikan bahwa selektor dapat digunakan hanya untuk menentukan satu elemen, bukan kumpulan elemen. Elemen ini dapat berupa [elemen AMP yang diperluas](https://github.com/ampproject/amphtml/blob/master/spec/amp-tag-addendum.md#amp-specific-tags) atau root dokumen.

Pemicu visibilitas elemen menunggu sinyal yang ditentukan oleh properti `waitFor` dalam `visibilitySpec` sebelum memantau visibilitas elemen. Jika `waitFor` tidak ditentukan, maka sinyal [`ini-load`](#initial-load-trigger) elemen akan terus ditunggu. Lihat dokumen `waitFor` untuk penjelasan selengkapnya.
Jika `reportWhen` ditentukan, pemicu akan menunggu sinyal sebelum mengirim peristiwa. Hal ini berguna, misalnya, dalam mengirimkan peristiwa analisis saat halaman ditutup.

##### Pemicu error <a name="error-trigger"></a>

Peristiwa error pengguna (`"on": "user-error"`) dipicu ketika terjadi error yang dapat diatribusikan ke penulis halaman atau ke software yang digunakan untuk memublikasikan halaman. Ini meliputi, tetapi tidak terbatas pada, kesalahan konfigurasi pada komponen AMP, iklan yang salah dikonfigurasi, atau pernyataan yang gagal. Error pengguna juga dilaporkan di konsol developer.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

CATATAN: Ada [masalah umum](https://github.com/ampproject/amphtml/issues/10891) yang masih melaporkan error dari sematan iframe A4A, yang tidak relevan dengan halaman ini.

**<a id="visibility-spec"></a>Spesifikasi Visibilitas**

`visibilitySpec` adalah kumpulan kondisi dan properti yang dapat diterapkan ke pemicu `visible` atau `hidden` untuk diubah saat diaktifkan. Jika ada lebih dari satu properti yang ditentukan, semua properti tersebut harus ditetapkan ke true agar permintaan dapat diaktifkan. Properti konfigurasi yang didukung di `visibilitySpec` adalah:

- `waitFor`: Properti ini menunjukkan bahwa pemicu visibilitas harus menunggu sinyal tertentu sebelum memantau visibilitas. Nilai yang didukung adalah `none`, `ini-load`, dan `render-start`. Jika tidak ditentukan, `waitFor` didefaultkan ke [`ini-load`](#initial-load-trigger) jika ada selektor yang ditentukan, atau ke `none` dalam kondisi sebaliknya.
- `reportWhen`: Properti ini menunjukkan bahwa pemicu visibilitas harus menunggu sinyal tertentu sebelum mengirim pemicu. Satu-satunya nilai yang didukung adalah `documentExit`. Properti `reportWhen` dan `repeat` tidak boleh digunakan secara bersamaan dalam visibilitySpec yang sama. Perhatikan bahwa jika `reportWhen` ditentukan, laporan akan dikirimkan pada waktu sinyal, meskipun persyaratan visibilitas tidak terpenuhi pada waktu itu atau belum terpenuhi sebelumnya. Setiap variabel yang relevan (`totalVisibleTime`, dll.) akan diisi sesuai dengan persyaratan visibilitas dalam `visibilitySpec` ini.- `continuousTimeMin` dan `continuousTimeMax`: Properti ini menunjukkan bahwa permintaan harus diaktifkan ketika sebuah elemen (atau bagian mana pun darinya) berada dalam viewport selama waktu yang berkesinambungan, yaitu antara waktu minimum dan maksimum yang ditentukan. Waktu dinyatakan dalam milidetik. Properti `continuousTimeMin` ditetapkan secara default ke 0 jika tidak ditentukan.
- `totalTimeMin` dan `totalTimeMax`: Properti ini menunjukkan bahwa permintaan akan diaktifkan saat sebuah elemen (atau bagian mana pun darinya) berada di dalam viewport selama total waktu yakni antara waktu minimum dan maksimum yang ditentukan. Waktu dinyatakan dalam milidetik. Properti `totalTimeMin` ditetapkan secara default ke 0 jika tidak ditentukan.
- `visiblePercentageMin` dan `visiblePercentageMax`: Properti ini menunjukkan bahwa permintaan harus diaktifkan ketika proporsi elemen yang terlihat dalam viewport berada di antara persentase minimum dan maksimum yang ditentukan. Nilai persentase yang valid adalah antara 0 dan 100. Perhatikan bahwa batas atas (`visiblePercentageMax`) bersifat inklusif. Batas bawah (`visiblePercentageMin`) bersifat eksklusif, kecuali jika kedua batas ditetapkan ke 0 atau keduanya ditetapkan ke 100. Jika kedua batas ditetapkan ke 0, maka pemicu akan diaktifkan saat elemen tidak terlihat. Jika kedua batas ditetapkan ke 100, pemicu akan diaktifkan saat elemen sepenuhnya terlihat. Ketika properti ini ditetapkan bersama dengan properti terkait waktu lainnya, hanya waktu ketika properti ini terpenuhi yang dihitung. Nilai default untuk `visiblePercentageMin` dan `visiblePercentageMax` berturut-turut adalah 0 dan 100.
- `repeat`: Jika properti ini ditetapkan ke `true`, pemicu akan diaktifkan setiap kali kondisi `visibilitySpec` terpenuhi. Dalam contoh berikut, jika elemen di-scroll hingga 51% dalam tampilan, kemudian 49%, lalu 51% lagi, pemicu akan diaktifkan dua kali. Namun, jika `repeat` ditetapkan ke `false`, pemicu akan diaktifkan satu kali. Nilai default `repeat` adalah `false`. Properti `reportWhen` dan `repeat` tidak boleh digunakan bersamaan dalam visibilitySpec yang sama.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
}
```

Properti `visiblePercentageThresholds` dapat digunakan sebagai singkatan untuk membuat beberapa instance `visibilitySpec` yang hanya berbeda dalam `visiblePercentageMin` dan `visiblePercentageMax`. Misalnya, berikut ini adalah sama:

```javascript
// Dua pemicu dengan visibilitySpecs yang berbeda hanya pada visiblePercentageMin dan visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// Pemicu tunggal yang setara dengan kedua pemicu di atas:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```
Selain kondisi di atas, `visibilitySpec` juga mengaktifkan variabel tertentu yang didokumentasikan [di sini](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#visibility-variables).

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

Selain variabel yang disediakan sebagai bagian dari pemicu, Anda juga dapat menentukan tambahan/pengganti untuk [variabel sebagai atribut data](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Jika digunakan, atribut data ini harus menjadi bagian dari elemen yang ditentukan sebagai [`selector`](#element-selector).

##### Pemicu klik <a name="click-trigger"></a>

Gunakan pemicu klik (`"on": "click"`) untuk mengaktifkan permintaan saat elemen tertentu diklik. Gunakan [`selector`](#element-selector) untuk mengontrol elemen mana yang akan menyebabkan permintaan ini diaktifkan. Pemicu tersebut akan diaktifkan untuk semua elemen yang sesuai dengan selektor yang ditentukan.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Selain variabel yang disediakan sebagai bagian dari pemicu, Anda juga dapat menentukan tambahan/pengganti untuk [variabel sebagai atribut data](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute). Jika digunakan, atribut data ini harus menjadi bagian dari elemen yang ditentukan sebagai `selector`

##### Pemicu scroll <a name="scroll-trigger"></a>

Gunakan pemicu scroll (`"on": "scroll"`) untuk mengaktifkan permintaan dalam kondisi tertentu saat halaman di-scroll. Pemicu ini menyediakan [variabel khusus](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#interaction) yang menunjukkan batas yang telah memicu dikirimnya permintaan. Gunakan `scrollSpec` untuk mengontrol waktu pengaktifan:

- `scrollSpec` Objek ini dapat berisi `verticalBoundaries` dan `horizontalBoundaries`. Setidaknya satu dari dua properti ini diperlukan agar peristiwa scroll diaktifkan. Nilai untuk kedua properti harus berupa array angka yang berisi batasan kapan peristiwa scroll akan dibuat. Misalnya, dalam cuplikan kode berikut, peristiwa scroll akan diaktifkan saat halaman di-scroll secara vertikal sebesar 25%, 50%, dan 90%. Selain itu, peristiwa tersebut juga akan diaktifkan saat halaman di-scroll secara horizontal hingga 90% lebar scroll. Untuk mempertahankan performa halaman, batas scroll dibulatkan ke kelipatan `5` terdekat.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Pemicu timer <a name="timer-trigger"></a>

Gunakan pemicu timer (`"on": "timer"`) untuk mengaktifkan permintaan pada interval waktu yang teratur. Gunakan `timerSpec` untuk mengontrol kapan peristiwa akan diaktifkan:

- `timerSpec` Spesifikasi untuk pemicu jenis `timer`. Kecuali jika `startSpec` ditentukan, timer akan segera dipicu (secara default, dapat tidak ditetapkan), dan dipicu lagi pada interval tertentu setelahnya.
    - `interval` Durasi interval timer, dalam detik.
    - `maxTimerLength`, Durasi maksimum timer akan diaktifkan, dalam detik. Permintaan tambahan akan dipicu setelah `maxTimerLength` tercapai. Nilai defaultnya adalah 2 jam. Jika `stopSpec` ada, tetapi maxTimerLength tidak ditentukan, nilai default adalah tak terbatas.
    - `immediate` memicu timer dengan segera atau tidak. Boolean, defaultnya adalah true

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Untuk mengonfigurasi timer yang menentukan waktu peristiwa pengguna, gunakan:

- `startSpec` Spesifikasi untuk memicu kapan timer dimulai. Gunakan nilai `on` dan `selector` untuk memantau peristiwa tertentu. Konfigurasi dengan `startSpec` tetapi tanpa `startSpec` hanya akan berhenti setelah `maxTimerLength` tercapai.
- `stopSpec` Spesifikasi untuk memicu kapan timer berhenti. Konfigurasi dengan `stopSpec` tetapi tanpa `startSpec` akan segera dimulai, tetapi hanya berhenti pada peristiwa yang ditentukan.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

Lihat spesifikasi [pemicu](#triggers) untuk penjelasan cara membuat pemicu timer bertingkat. Perhatikan bahwa penggunaan pemicu timer untuk memulai atau menghentikan timer tidak diizinkan.

##### Pemicu tersembunyi <a name="hidden-trigger"></a>

Gunakan pemicu tersembunyi (`"on": "hidden"`) untuk mengaktifkan permintaan saat halaman disembunyikan.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

[`visibilitySpec`](#visibility-spec) dapat disertakan sehingga permintaan hanya diaktifkan jika kondisi durasi visibilitas terpenuhi.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
Konfigurasi di atas diterjemahkan menjadi:

<blockquote>
Saat halaman disembunyikan, aktifkan permintaan jika elemen #anim-id telah terlihat (lebih dari 20% area dalam viewport) selama lebih dari 3 detik.
</blockquote>

##### Pemicu akses <a name="access-triggers"></a>

Sistem AMP Access mengeluarkan sejumlah peristiwa untuk berbagai status dalam alur akses. Untuk detail tentang pemicu akses (`"on": "access-*"`), lihat [AMP Access dan Analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access/amp-access-analytics.md).

#### Pemicu analisis video <a name="video-analytics-triggers"></a>

Analisis video menyediakan beberapa pemicu (`"on": "video-*"`) yang dapat digunakan penayang untuk memantau berbagai peristiwa yang terjadi selama siklus proses video. Detail selengkapnya tersedia di [Analytics Video AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md).

#### Transport <a name="transport"></a>

Objek konfigurasi `transport` menentukan cara mengirim permintaan. Nilai ini adalah objek dengan kolom yang menunjukkan metode transport mana yang dapat diterima.

* `beacon` Menunjukkan [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) dapat digunakan untuk mengirim permintaan. Objek ini akan mengirim permintaan POST dengan kredensial. Permintaan akan dikirim dengan bagian utama halaman yang kosong, kecuali jika `useBody` ditetapkan ke true. Lihat [Menggunakan Isi untuk Parameter URL Tambahan](#use-body-for-extra-url-params) untuk informasi selengkapnya tentang `useBody`.
* `xhrpost` Menunjukkan `XMLHttpRequest` dapat digunakan untuk mengirim permintaan. Objek ini akan mengirim permintaan POST dengan kredensial. Permintaan akan dikirim dengan bagian utama halaman yang kosong, kecuali jika `useBody` ditetapkan ke true. Lihat [Menggunakan Isi untuk Parameter URL Tambahan](#use-body-for-extra-url-params) untuk informasi selengkapnya tentang `useBody`.
* `image` Menunjukkan bahwa permintaan dapat dikirim dengan membuat tag `Image`. Objek ini akan mengirimkan permintaan GET. Untuk menyembunyikan peringatan konsol akibat respons kosong atau kegagalan permintaan, tetapkan `"image": {"suppressWarnings": true}`.

Vendor terakreditasi MRC dapat menggunakan mekanisme transport keempat, "iframe transport", dengan menambahkan string URL ke iframe-transport-vendors.js. Hal ini menunjukkan bahwa iframe harus dibuat, dengan atribut `src`-nya ditetapkan ke URL ini, dan permintaan akan dikirim ke iframe tersebut melalui `window.postMessage()`. Dalam hal ini, permintaan tidak harus berupa URL lengkap. `iframe` hanya dapat ditentukan dalam `iframe-transport-vendors.js`, bukan secara inline dalam tag `amp-analytics`, atau melalui konfigurasi jarak jauh. Selain itu, frame vendor dapat mengirim respons, yang akan digunakan oleh amp-ad-exit. Lihat [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport-remote-frame.html) dan [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html): file pertama mengirim objek JSON respons dari {'collected-data': 'abc'}; file kedua menggunakan objek tersebut untuk mengganti 'bar_' dengan 'abc' di finalUrl.

Jika lebih dari satu metode transport di atas diaktifkan, prioritasnya adalah `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`. Hanya satu metode transport yang akan digunakan, dan itu adalah metode dengan prioritas tertinggi yang diizinkan dan tersedia. Jika agen-pengguna klien tidak mendukung suatu metode, maka metode aktif dengan prioritas tertinggi berikutnya akan digunakan. Secara default, keempat metode di atas diaktifkan.

Dalam contoh di bawah, URL `iframe` tidak ditentukan, dan metode `beacon` serta `xhrpost` ditetapkan ke `false`, sehingga keduanya tidak akan digunakan meskipun memiliki prioritas yang lebih tinggi daripada `image`. Metode `image` akan ditetapkan ke `true` secara default, tetapi dinyatakan secara eksplisit di sini. Jika agen-pengguna klien mendukung metode `image`, maka metode tersebut akan digunakan; jika tidak, permintaan tidak akan dikirim.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Untuk mempelajari lebih lanjut, lihat [contoh yang menerapkan API klien transport iframe](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport-remote-frame.html) dan [halaman contoh yang menggabungkan iframe tersebut](https://github.com/ampproject/amphtml/blob/master/examples/analytics-iframe-transport.amp.html). Contoh tersebut memuat [iklan palsu](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html), yang berisi tag `amp-analytics`. Perhatikan bahwa konten iklan palsu mencakup beberapa petunjuk konfigurasi tambahan yang harus diikuti.

##### Menggunakan Isi Permintaan untuk Parameter URL Tambahan <a name="use-body-for-extra-url-params"></a>

Opsi konfigurasi `useBody` menunjukkan apakah `extraUrlParams` akan disertakan atau tidak dalam isi permintaan POST, bukan dalam URL sebagai parameter kueri berenkode URL.

`useBody` hanya tersedia untuk metode transport `beacon` dan `xhrpost`. Jika `useBody` ditetapkan ke true dan digunakan bersama dengan salah satu metode transportasi ini, `extraUrlParams` akan dikirim dalam isi permintaan POST. Jika tidak, permintaan akan dikirim dengan isi kosong dan `extraUrlParams` disertakan sebagai parameter URL.

Dengan `useBody`, Anda dapat menyertakan objek bertingkat dalam `extraUrlParams`. Namun, jika permintaan kembali ke opsi transport lain yang tidak mendukung `useBody` (misalnya `image`), maka objek bertingkat tersebut akan dirangkai menjadi URL sebagai `[object Object]`.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Kebijakan Perujuk <a name="referrer-policy"></a>

Kebijakan perujuk dapat ditetapkan sebagai kolom `referrerPolicy` dalam konfigurasi `transport`. Saat ini hanya `no-referrer` yang didukung.
Kebijakan perujuk hanya tersedia untuk transport `image`. Jika `referrerPolicy: no-referrer` ditetapkan, transport `beacon` &amp; `xhrpost` diganti ke `false`.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### Linker <a name="linkers"></a>

Fitur `linkers` digunakan untuk mengaktifkan sinkronisasi ID lintas domain. `amp-analytics` akan menggunakan [objek konfigurasi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-forwarding.md#format) untuk membuat "string linker" yang akan ditambahkan ke link keluar yang ditentukan pada halaman tersebut sebagai parameter URL. Saat pengguna mengklik salah satu link ini, halaman tujuan akan membaca string linker dari parameter URL untuk menjalankan sinkronisasi ID. Hal ini biasanya digunakan untuk menggabungkan sesi pengguna di domain proxy AMP dan domain penayang.

Detail tentang cara menyiapkan konfigurasi linker dijelaskan dalam [Penerusan ID Linker](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-forwarding.md)

Jika Anda perlu menyerap parameter ini, informasi tentang pembuatan parameter ini akan dijelaskan dalam [Penerimaan ID Linker](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md).

#### Cookie <a name="cookies"></a>

Fitur `cookies` mendukung penulisan cookie ke domain asal dengan mengekstrak informasi [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md#query-parameter) dan [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md#linker-param) dari URL dokumen. Fitur ini dapat digunakan bersama fitur `linkers` untuk menjalankan sinkronisasi ID dari domain ber-proxy AMP ke halaman AMP di domain penayang.

Detail tentang cara menyiapkan konfigurasi `cookies` dapat ditemukan di [Menerima Parameter Linker di Halaman AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)

## Validasi <a name="validation"></a>

Lihat [aturan amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/validator-amp-analytics.protoascii) dalam spesifikasi validator AMP.

### Atribut yang valid untuk `<amp-analytics>` <a name="valid-attributes-for-"></a>

Berikut adalah atribut yang valid untuk komponen `amp-analytics`:

**type**

Menentukan jenis vendor.  Untuk detailnya, lihat daftar [Vendor analisis](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md).

Contoh:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

Ini adalah atribut opsional yang dapat digunakan untuk memuat konfigurasi dari URL jarak jauh yang ditentukan. URL yang ditentukan harus menggunakan skema HTTPS. Lihat juga atribut `data-include-credentials` di bawah. URL ini dapat menyertakan [variabel URL AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). Responsnya harus mengikuti [panduan keamanan CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).

Contoh:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

Jika ditetapkan ke `include`, atribut ini akan mengaktifkan kemampuan membaca dan menulis cookie pada permintaan yang ditentukan melalui atribut `config`. Atribut ini bersifat opsional.

**data-consent-notification-id**

Jika disediakan, halaman tidak akan memproses permintaan analisis hingga [amp-user-notification](amp-user-notification.md) dengan ID elemen HTML yang ditentukan dikonfirmasi (diterima) oleh pengguna. Atribut ini bersifat opsional.

## Analisis untuk komponen AMP <a name="analytics-for-amp-components"></a>

Developer komponen AMP dapat menerapkan pengumpulan data menggunakan Analytics AMP. Untuk informasi selengkapnya, lihat bagian [Menerapkan analisis untuk komponen AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-components-analytics.md).
