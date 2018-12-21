---
$title: Mendalami analisis AMP
---
[TOC]

Panduan ini menjelaskan lebih jauh tentang
[komponen amp-analytics](/id/docs/reference/components/amp-analytics.html),
dengan memecah sampel konfigurasi `amp-analytics` ke dalam elemen-elemen penyusun berikut:

Bagian lain dalam panduan ini menggunakan sampel konfigurasi ini,
yang melacak jumlah kunjungan halaman dan klik pengguna pada link
serta mengirim data analisis ke penyedia pihak ketiga,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
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
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

[tip type="note"]

Contoh kode di atas hanya digunakan untuk membantu Anda belajar, bukan sampel kode sebenarnya. Jika Anda bekerja dengan penyedia analisis, sampel di atas kemungkinan tidak akan digunakan; konfigurasi penyedia menghilangkan kerumitan. Lihat [dokumentasi penyedia analisis](/id/docs/analytics/analytics-vendors.html) untuk mengetahui sampel konfigurasi.
[/tip]

## Ke mana data analisis dikirim: atribut type

AMP dirancang untuk mendukung dua pola pengumpulan data yang umum:

* Penyerapan data oleh endpoint milik penayang untuk sistem analisis internal.
* Penyerapan data oleh endpoint milik vendor untuk interoperabilitas dengan solusi vendor
(misalnya, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Untuk mengirim data analisis ke penyedia analisis,
sertakan atribut `type` ke dalam tag `amp-analytics` dan tetapkan nilainya
ke vendor yang sesuai, seperti dijelaskan pada
daftar [Vendor Analisis](/id/docs/analytics/analytics-vendors.html).

Misalnya: `<amp-analytics type="googleanalytics">` mengirim data analisis
ke penyedia analisis pihak ketiga, Google Analytics.
Untuk mengirim data ke endpoint milik penayang,
jangan sertakan atribut `type`;
data analisis dikirim ke endpoint yang ditentukan untuk masing-masing
[permintaan](/id/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute).

Konfigurasi vendor analisis adalah cara cepat
untuk mulai menggunakan `amp-analytics`.
Sebaiknya Anda pelajari dokumentasi vendor dan
referensi bantuan untuk mendapatkan panduan lebih lanjut.
Seperti disebutkan sebelumnya,
daftar vendor yang telah berintegrasi dengan AMP, serta link
ke dokumentasi spesifik mereka, dapat ditemukan di
daftar [Vendor Analisis](/id/docs/analytics/analytics-vendors.html).

Jika Anda adalah vendor analisis,
pelajari lebih lanjut cara
[mengintegrasikan konfigurasi analisis Anda ke AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Memuat konfigurasi jarak jauh: atribut config

Anda tidak perlu menyertakan semua konfigurasi
untuk `amp-analytics` seluruhnya di halaman AMP.
Sebagai gantinya, Anda dapat memanggil URL jarak jauh
untuk semua atau sebagian konfigurasi tersebut.

Dengan begitu Anda dapat melakukan beberapa hal seperti memvariasikan konfigurasi
berdasarkan permintaan spesifik.
Jika Anda sebagai penayang memiliki kontrol atas file jarak jauh,
Anda dapat melakukan semua pemrosesan sisi server yang diperlukan
untuk menyusun konfigurasi data.

Langkah pertama untuk memuat konfigurasi jarak jauh adalah
dengan menyertakan atribut config ke dalam tag `amp-analytics`:

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Langkah selanjutnya adalah membuat konten JSON yang berada di URL jarak jauh.
Dalam contoh sederhana ini,
konfigurasi yang berada dalam objek JSON hanya berupa nilai variabel untuk akun analisis.

Contoh konten di `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Ganti dengan ID properti Anda.
  }
}
```

Langkah terakhir adalah memastikan data apa dalam file jarak jauh yang ditarik
ke tempat yang sesuai dalam konfigurasi `amp-analytics`.
Dalam kedua permintaan `pageview` dan `event` di sini,
nilai variabel `account` otomatis ditetapkan
ke nilai akun pada URL jarak jauh (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```


[tip type="important"]

AMP tidak memvalidasi penggunaan ganda dari variabel yang sama.
Nilai diisikan sesuai urutan preferensi substitusi variabel,
dan nilai dalam URL jarak jauh menempati urutan teratas (lihat [Pengurutan substitusi variabel](/id/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

[/tip]

## Atribut requests, triggers & transport

Atribut `requests` menetapkan ‘data apa yang dikirim’
(misalnya, `pageviews`, `events`),
dan ke mana data tersebut dikirim (URL yang digunakan untuk mengirim data).

Atribut `triggers` menjelaskan kapan data analisis harus dikirim,
misalnya, saat pengguna melihat halaman, saat pengguna mengklik link.

Atribut `transport` menentukan cara mengirim permintaan,
lebih tepatnya, protokol pengirimannya.

Baca terus untuk mempelajari lebih lanjut tentang konfigurasi ini.
(Anda juga bisa membaca tentang konfigurasi ini di
[referensi amp-analytics](/id/docs/reference/components/amp-analytics.html).)

### Data apa yang dikirim: atribut requests

Atribut `request-name` digunakan dalam konfigurasi pemicu untuk menentukan
permintaan apa yang harus dikirim sebagai respons atas peristiwa tertentu.
Atribut `request-value` berupa URL `https`.
Nilai ini dapat mencakup token placeholder
yang dapat merujuk ke permintaan atau variabel lain.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Beberapa penyedia analisis (termasuk Google Analytics)
telah menyediakan konfigurasi,
yang Anda gunakan melalui atribut `type`.
Jika menggunakan penyedia analisis,
Anda mungkin tidak perlu menyertakan informasi `requests`.
Lihat dokumentasi vendor Anda untuk mencari tahu
perlu tidaknya mengonfigurasi atribut `requests` dan cara melakukannya.

#### Menambahkan URL permintaan: Parameter URL Tambahan

Atribut [extraUrlParams](/id/docs/reference/components/amp-analytics.html#extra-url-params)
menentukan parameter tambahan yang akan ditambahkan ke akhir string kueri URL permintaan melalui konvensi "&foo=baz" biasa.

Contoh `amp-analytics` menambahkan parameter tambahan `cd1`
ke permintaan dan menetapkan nilai parameter ke "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Kapan data dikirim: atribut triggers

Atribut `triggers` menjelaskan kapan permintaan analisis harus dikirim.
Atribut ini berisi key-value pair yaitu nama pemicu dan konfigurasi pemicu.
Nama pemicu dapat berupa string apa saja yang terdiri
dari karakter alfanumerik (a-zA-Z0-9).

Misalnya,
elemen `amp-analytics` berikut dikonfigurasi untuk mengirim permintaan ke
`https://example.com/analytics` saat dokumen pertama kali dimuat,
dan setiap kali tag `a` diklik:

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

[tip type="important"]
 Pendekatan di atas hanya direkomendasikan untuk halaman AMP dan bukan untuk iklan AMPHTML. Karena prioritas analisis lebih rendah dibandingkan konten pada halaman, direkomendasikan untuk melacak klik menggunakan pengalihan browser untuk menghindari kehilangan klik. 
[/tip]

AMP mendukung konfigurasi pemicu berikut:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Konfigurasi Pemicu</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (wajib)</td>
      <td data-th="Description">Peristiwa yang perlu dideteksi. Nilai yang valid meliputi <code>click</code>, <code>scroll</code>, <code>timer</code>, dan <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (wajib)</td>
      <td data-th="Description">Nama permintaan yang akan dikirim (seperti ditentukan dalam <a href="/id/docs/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute">permintaan</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Objek yang berisi key-value pair yang digunakan untuk menggantikan <code>vars</code> yang ditetapkan dalam konfigurasi level teratas, atau untuk menentukan <code>vars</code> yang unik bagi pemicu ini (lihat juga <a href="/id/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering">Pengurutan substitusi variabel</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (wajib jika <code>on</code> ditetapkan ke <code>click</code>)</td>
      <td data-th="Description">Selektor CSS yang digunakan untuk menyaring elemen mana yang harus dilacak. Gunakan nilai <code>*</code> untuk melacak semua elemen. Konfigurasi ini digunakan bersamaan dengan pemicu <code>click</code>. Pelajari cara menggunakan selektor untuk <a href="/id/docs/analytics/use_cases.html#tracking-page-clicks">melacak klik halaman</a> dan <a href="/id/docs/analytics/use_cases.html#tracking-social-interactions">interaksi sosial</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (wajib jika <code>on</code> ditetapkan ke <code>scroll</code>)</td>
      <td data-th="Description">Mengontrol dalam kondisi apa peristiwa <code>scroll</code> akan diaktifkan saat halaman di-scroll. Objek ini dapat berisi <code>verticalBoundaries</code> dan <code>horizontalBoundaries</code>. Setidaknya satu dari dua properti tersebut diperlukan untuk mengaktifkan peristiwa <code>scroll</code>. Nilai untuk kedua properti harus berupa array angka yang berisi batasan kapan peristiwa scroll akan dibuat. Lihat contoh ini di <a href="/id/docs/analytics/use_cases.html#tracking-scrolling">melacak scroll</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (wajib jika <code>on</code> ditetapkan ke <code>timer</code>)</td>
      <td data-th="Description">Mengontrol kapan peristiwa <code>timer</code> diaktifkan. Timer akan segera dipicu, dan dipicu lagi pada interval tertentu setelahnya. Konfigurasi ini digunakan bersamaan dengan pemicu <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"]

Pemicu dari konfigurasi yang prioritasnya lebih rendah akan digantikan oleh pemicu dengan nama yang sama dari konfigurasi yang prioritasnya lebih tinggi (lihat [Pengurutan substitusi variabel](/id/docs/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

[/tip]

### Bagaimana data dikirim: atribut transport

Atribut `transport` menentukan cara mengirim permintaan.
Tiga metode berikut diaktifkan secara default:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Metode Transport</th>
      <th data-th="Description">Deskripsi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Menunjukkan bahwa <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> dapat digunakan untuk mengirim permintaan. Ini akan mengirimkan permintaan <code>POST</code>, beserta kredensial, dan bagian utama halaman yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Menunjukkan bahwa <code>XMLHttpRequest</code> dapat digunakan untuk mengirim permintaan. Ini akan mengirimkan permintaan <code>POST</code>, beserta kredensial, dan bagian utama halaman yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Menunjukkan bahwa permintaan dapat dikirim dengan membuat tag <code>Image</code>. Ini akan mengirim permintaan <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Hanya satu metode transport yang digunakan,
yaitu metode dengan prioritas paling tinggi
yang diaktifkan, diizinkan, dan tersedia.
Urutan prioritasnya adalah `beacon` > `xhrpost` > `image`.
Jika agen pengguna klien tidak mendukung salah satu metode,
maka metode aktif dengan prioritas tertinggi berikutnya yang akan digunakan.

Sertakan atribut `transport` dalam konfigurasi
hanya jika Anda ingin membatasi opsi transport;
jika tidak, Anda bisa menghentikan permintaan.

Pada contoh di bawah ini,
`beacon` dan `xhrpost` ditetapkan ke false,
sehingga keduanya tidak akan digunakan meskipun memiliki prioritas yang lebih tinggi daripada `image`.
Jika agen pengguna klien mendukung metode `image`,
maka metode tersebut akan digunakan; jika tidak, tidak ada permintaan yang dikirim.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Pengurutan substitusi variabel

AMP mengisi variabel dengan nilai dalam urutan prioritas:

1. Konfigurasi jarak jauh (melalui `config`).
2. `vars` yang disarangkan di dalam pemicu dalam `triggers`.
3. `vars` di level teratas yang disarangkan dalam `amp-analytics`.
4. Nilai yang disediakan platform.

Dalam contoh ini, terdapat konfigurasi jarak jauh,
variabel yang ditentukan di level teratas, pada pemicu, dan di tingkat platform:

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

Saat `var` yang sama ditentukan di beberapa lokasi,
urutan prioritas variabel menetapkan nilainya satu kali.
Sehingga, jika konfigurasi jarak jauh menetapkan `account` sebagai UA-XXXXX-Y pada contoh di atas,
maka nilai dari berbagai variabelnya adalah sebagai berikut:

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
 
