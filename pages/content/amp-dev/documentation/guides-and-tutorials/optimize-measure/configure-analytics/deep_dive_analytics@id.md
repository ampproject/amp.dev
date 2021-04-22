---
'$title': Mendalami analitik AMP
$order: 1
description: Panduan ini membahas lebih dalam tentang komponen amp-analytics, membagi sampel konfigurasi amp-analytics ke dalam blok-blok penyusun utama ini.
formats:
  - websites
  - stories
---

Panduan ini membahas lebih dalam tentang komponen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), membagi sampel konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ke dalam blok-blok penyusun utama ini:

Bagian lain di dalam panduan ini menggunakan sampel konfigurasi ini, yang melacak jumlah penayangan halaman dan klik pengguna pada tautan serta mengirimkan data analitik ke penyedia pihak ketiga, [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics
  type="googleanalytics"
  config="https://example.com/analytics.account.config.json"
>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
      },
      "vars": {
        "account": "ABC123"
      },
      "extraUrlParams": {
        "cd1": "AMP"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        },
        "trackAnchorClicks": {
          "on": "click",
          "selector": "a",
          "request": "event",
          "vars": {
            "eventId": "42",
            "eventLabel": "clicked on a link"
          }
        }
      },
      "transport": {
        "beacon": false,
        "xhrpost": false,
        "image": true
      }
    }
  </script>
</amp-analytics>
```

Kode contoh di atas adalah untuk membantu Anda belajar, tetapi ini sama sekali bukan contoh yang realistis. Jika Anda bekerja dengan penyedia analitik, sampel di atas mungkin tidak masuk akal; konfigurasi penyedia menghilangkan kerumitan. Kunjungi [dokumentasi penyedia analitik](analytics-vendors.md) Anda untuk melihat konfigurasi sampel.

## Ke mana data analisis dikirimkan: atribut type (jenis)

AMP is designed to support two common patterns of data collection:

- Penyerapan data oleh endpoint milik penayang untuk sistem analitik internal.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Untuk mengirim data analisis ke penyedia analisis, sertakan atribut `type` ke dalam tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dan tetapkan nilainya ke vendor yang sesuai, seperti dijelaskan pada daftar [Vendor Analisis](analytics-vendors.md).

Misalnya: `<amp-analytics type="googleanalytics">` mengirim data analisis ke penyedia analisis pihak ketiga, Google Analytics. Untuk mengirim data ke endpoint milik penayang, jangan sertakan atribut `type`; data analisis dikirim ke endpoint yang ditentukan untuk masing-masing [permintaan](deep_dive_analytics.md#what-data-gets-sent-requests-attribute).

Konfigurasi vendor analisis adalah cara cepat untuk mulai menggunakan [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Sebaiknya Anda pelajari dokumentasi vendor dan referensi bantuan untuk mendapatkan panduan lebih lanjut. Seperti disebutkan sebelumnya, daftar vendor yang telah berintegrasi dengan AMP, serta link ke dokumentasi spesifik mereka, dapat ditemukan di daftar [Vendor Analisis](analytics-vendors.md).

Jika Anda adalah vendor analisis, pelajari lebih lanjut cara [mengintegrasikan konfigurasi analisis Anda ke AMP HTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md).

## Memuat konfigurasi jarak jauh: atribut config (konfigurasi)

Anda tidak perlu menyertakan semua konfigurasi untuk [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sepenuhnya di halaman AMP Anda. Sebagai gantinya, Anda dapat memanggil URL jarak jauh untuk semua atau sebagian konfigurasi tersebut.

Dengan begitu, Anda dapat melakukan beberapa hal, seperti memvariasikan konfigurasi berdasarkan permintaan yang spesifik. Jika Anda sebagai penayang memiliki kontrol atas berkas jarak jauh, Anda dapat melakukan semua pemrosesan sisi server yang diperlukan untuk menyusun konfigurasi data.

Langkah pertama untuk memuat konfigurasi jarak jauh adalah dengan menyertakan atribut "config" ke dalam tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics
  config="https://example.com/analytics.account.config.json"
></amp-analytics>
```

Langkah selanjutnya adalah membuat konten JSON yang berada di URL jarak jauh. Dalam contoh sederhana ini, konfigurasi yang berada dalam objek JSON hanya berupa nilai variabel untuk akun analitik.

Konten contoh di `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Langkah terakhir adalah memastikan data apa di dalam berkas jarak jauh yang ditarik ke tempat yang sesuai dalam konfigurasi <a><code>amp-analytics</code></a>. Dalam kedua permintaan <code>pageview</code> dan <code>event</code> di sini, nilai variabel <code>account</code> otomatis ditetapkan ke nilai akun pada URL jarak jauh (<code>"account": "UA-XXXXX-Y"</code>):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] **PENTING –** AMP tidak memvalidasi beberapa penggunaan variabel yang sama. Nilai diisi mengikuti urutan penggantian variabel preferensi, dan nilai dalam URL jarak jauh berada di urutan teratas (kunjungi [Pengaturan urutan penggantian variabel](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Atribut requests, triggers, & transport <a name="requests-triggers--transports"></a>

Atribut `requests` menetapkan ‘data apa yang dikirimkan’ (misalnya, `pageviews`, `events`), dan ke mana data tersebut dikirimkan (URL yang digunakan untuk mengirimkan data).

Atribut `triggers` menjelaskan kapan data analitik harus dikirimkan, misalnya, saat pengguna melihat halaman, saat pengguna mengeklik suatu tautan.

Atribut <code>transport</code> menentukan cara mengirimkan permintaan, lebih tepatnya, protokol pengirimannya.

Baca terus untuk mengetahui lebih lanjut tentang konfigurasi ini. (Anda juga dapat membaca tentang konfigurasi ini di [referensi `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

### Data apa yang dikirimkan: atribut requests <a name="what-data-gets-sent-requests-attribute"></a>

Atribut `request-name` digunakan di dalam konfigurasi pemicu untuk menentukan permintaan apa yang harus dikirimkan sebagai respons atas peristiwa tertentu. Atribut `request-value` berupa URL `https`. Nilai ini dapat mencakup token bakal tempat yang dapat merujuk ke permintaan atau variabel lain.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Beberapa penyedia analitik (termasuk Google Analytics) telah menyediakan konfigurasi, ini Anda gunakan melalui atribut `type`. Jika menggunakan penyedia analitik, Anda mungkin tidak perlu menyertakan informasi `requests`. Lihat dokumentasi vendor Anda untuk mencari tahu perlu tidaknya mengonfigurasi atribut `requests` dan cara melakukannya.

#### Menambahkan URL permintaan: Parameter URL Tambahan

Atribut [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) menentukan parameter tambahan untuk ditambahkan ke untai kueri dari URL permintaan melalui konvensi "& foo=baz" biasa.

Contoh [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) menambahkan parameter tambahan `cd1` ke permintaan dan menetapkan nilai parameter ke "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Kapan data dikirimkan: atribut triggers

Atribut `triggers` menjelaskan kapan permintaan analitik harus dikirimkan. Atribut ini berisi pasangan kunci nilai, yaitu nama pemicu dan konfigurasi pemicu. Nama pemicu dapat berupa untai apa saja yang terdiri dari karakter alfanumerik (a-zA-Z0-9).

Misalnya, elemen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) berikut ini dikonfigurasi untuk mengirimkan permintaan ke `https://example.com/analytics` saat dokumen pertama kali dimuat, dan setiap kali tag `a` diklik:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
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
```

[tip type="important"] <strong>PENTING –</strong> Pendekatan di atas hanya direkomendasikan untuk halaman AMP dan bukan untuk iklan HTML AMP. Karena prioritas analisis yang lebih rendah dibandingkan konten pada halaman, direkomendasikan untuk melacak klik dengan menggunakan browser yang dialihkan untuk menghindari kehilangan klik. [/tip]

AMP mendukung konfigurasi pemicu berikut ini:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Konfigurasi Pemicu</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code> (wajib)</td>
      <td data-th="Description">Peristiwa yang perlu dideteksi. Nilai yang valid meliputi <code>click</code>, <code>scroll</code>, <code>timer</code>, dan <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code> (wajib)</td>
      <td data-th="Description">Nama permintaan yang akan dikirimkan (seperti yang ditentukan di dalam <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">permintaan</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Objek yang berisi pasangan kunci nilai yang digunakan untuk menggantikan <code>vars</code> yang ditetapkan dalam konfigurasi tingkat teratas, atau untuk menentukan <code>vars</code> yang unik bagi pemicu ini (lihat juga <a href="deep_dive_analytics.md#variable-substitution-ordering">Pengaturan urutan penggantian variabel</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code> (wajib jika <code>on</code> ditetapkan ke <code>click</code>)</td>
      <td data-th="Description">Pemilih CSS digunakan untuk menyaring elemen mana yang harus dilacak. Gunakan nilai <code>*</code> untuk melacak semua elemen. Konfigurasi ini digunakan bersamaan dengan pemicu <code>click</code>. Pelajari cara menggunakan selektor untuk <a href="use_cases.md#tracking-page-clicks">melacak klik halaman</a> dan <a href="use_cases.md#tracking-social-interactions">interaksi sosial</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code> (wajib jika <code>on</code> ditetapkan ke <code>scroll</code>)</td>
      <td data-th="Description">Mengontrol dalam kondisi apa peristiwa <code>scroll</code> akan diaktifkan saat bergulir di halaman. Objek ini dapat berisi <code>verticalBoundaries</code> dan <code>horizontalBoundaries</code>. Minimal satu dari dua properti tersebut diperlukan untuk mengaktifkan peristiwa <code>scroll</code>. Nilai untuk kedua properti ini harus berupa susunan angka yang berisi batasan kapan peristiwa gulir akan dilakukan. Lihat contoh ini di <a href="use_cases.md#tracking-scrolling">melacak pengguliran</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code> (wajib jika <code>on</code> ditetapkan ke <code>timer</code>)</td>
      <td data-th="Description">Mengontrol kapan peristiwa <code>timer</code> diaktifkan. Timer akan segera dipicu, dan dipicu lagi pada interval tertentu setelahnya. Konfigurasi ini digunakan bersamaan dengan pemicu <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] **PENTING –** Pemicu dari konfigurasi dengan prioritas yang lebih rendah diganti oleh pemicu dengan nama yang sama dari konfigurasi dengan prioritas yang lebih tinggi (kunjungi [Pengaturan urutan penggantian variabel](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

### Bagaimana data dikirimkan: atribut transport

Atribut `transport` menentukan cara mengirimkan permintaan. Tiga metode berikut ini diaktifkan sebagai standar:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Metode Transpor</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Menunjukkan bahwa <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> dapat digunakan untuk mengirimkan permintaan. Ini akan mengirimkan permintaan <code>POST</code>, beserta kredensial, dan badan halaman yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Menunjukkan bahwa <code>XMLHttpRequest</code> dapat digunakan untuk mengirim permintaan. Ini akan mengirimkan permintaan <code>POST</code>, beserta kredensial, dan bagian utama halaman yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Menunjukkan bahwa permintaan dapat dikirimkan dengan membuat tag <code>Image</code>. Ini akan mengirimkan permintaan <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Hanya satu metode transportasi yang digunakan, dan metode dengan prioritas tertinggi yang akan diaktifkan, diizinkan, dan tersedia. Prioritasnya adalah `beacon` > `xhrpost` > `image`. Jika agen pengguna klien tidak mendukung suatu metode, metode prioritas tertinggi berikutnya yang diaktifkan yang akan digunakan.

Sertakan atribut `transport` dalam konfigurasi Anda hanya jika Anda ingin membatasi opsi transport, jika tidak, Anda dapat menghentikan permintaan.

Pada contoh di bawah ini, `beacon` dan `xhrpost` ditetapkan sebagai false (semu), jadi keduanya tidak akan digunakan meskipun memiliki prioritas yang lebih tinggi daripada `image`. Jika agen pengguna klien mendukung metode `image`, maka akan digunakan; jika tidak, tidak ada permintaan yang dikirimkan.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Pengaturan urutan penggantian variabel <a name="variable-substitution-ordering"></a>

AMP mengisi variabel dengan nilai sesuai urutan prioritas:

1. Konfigurasi jarak jauh (melalui `config`).
2. `vars` yang ditempatkan di dalam pemicu dalam `triggers`.
3. `vars` di tingkat teratas yang ditempatkan dalam [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Nilai yang disediakan platform.

Dalam contoh ini, terdapat konfigurasi jarak jauh, variabel yang ditentukan di level teratas, pada pemicu, dan di tingkat platform:

```html
<amp-analytics config="http://example.com/config.json">
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
      },
      "vars": {
        "account": "ABC123",
        "title": "Homepage"
      },
      "triggers": {
        "some-event": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage",
            "clientId": "my user"
          }
      }
    }
  </script>
</amp-analytics>
```

Saat `var` yang sama ditentukan di beberapa lokasi, urutan prioritas variabel menetapkan nilainya satu kali. Sehingga, jika konfigurasi jarak jauh menetapkan `account` sebagai UA-XXXXX-Y pada contoh di atas, maka nilai dari berbagai variabelnya adalah sebagai berikut:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Nilai</th>
      <th data-th="Defined By" class="col-thirty">Ditentukan Oleh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Platform</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">Halaman beranda saya</td>
      <td data-th="Defined By">Pemicu</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Konfigurasi jarak jauh</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">pengguna saya</td>
      <td data-th="Defined By">Pemicu</td>
    </tr>
  </tbody>
</table>
