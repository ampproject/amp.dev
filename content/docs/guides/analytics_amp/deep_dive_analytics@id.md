---
$title: Mendalami AMP Analytics
toc: true
---
[TOC]


Panduan ini mendalami
[komponen amp-analytics](/docs/reference/extended/amp-analytics.html),
menguraikan konfigurasi `amp-analytics` contoh ke dalam blok pembangun utama ini:

Bagian selanjutnya dari panduan ini memakai contoh konfigurasi ini,
yang melacak tampilan halaman dan klik pengguna pada tautan
dan mengirim data analisis ke penyedia pihak ketiga,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
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
[/sourcecode]

**Catatan:** Kode contoh di atas adalah untuk membantu Anda belajar, namun bukan berarti contoh itu realistis. Jika Anda bekerja dengan penyedia analisis, ada kemungkinan bahwa sampel di atas tidak masuk akal, konfigurasi penyedia akan meniadakan kerumitan. Rujuklah dokumen penyedia analisis untuk melihat konfigurasi contoh.

## Tempat mengirim data analisis: atribut tipe

AMP didesain untuk mendukung dua pola umum pengumpulan data:

* Penyerapan oleh endpoint yang dipublikasikan pemilik untuk sistem analisis internal.
* Penyerapan oleh endpoint yang dimiliki oleh vendor untuk interoperabilitas dengan solusi vendor
(misalnya, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Untuk mengirim data analisis ke penyedia analisis,
sertakan atribut `type` dalam tag `amp-analytics` dan atur nilainya
ke vendor yang sesuai, sebagaimana didefinisikan dalam
[spesifikasi amp-analytics](/docs/reference/extended/amp-analytics.html).

Misalnya: `<amp-analytics type="googleanalytics">` mengirim data analisis
ke penyedia analisis pihak ketiga, Google Analytics,
Untuk mengirim data ke endpoint yang dimiliki penerbit,
cukup jangan sertakan atribut `type`;
data analisis dikirim ke endpoint yang didefinisikan untuk masing-masing
[permintaan](/id/docs/guides/analytics/deep_dive_analytics.html#data-apa-yang-dikirimkan:-meminta-atribut).

Konfigurasi vendor Analytics merupakan cara cepat
untuk memulai `amp-analytics`.
Anda harus merujuk pada dokumentasi vendor dan
sumber daya bantuan untuk panduan lebih lanjut.
Sebagaimana yang dijelaskan sebelumnya,
daftar vendor yang sudah terintegrasi dengan AMP, serta tautan
ke dokumentasi spesifik bisa ditemukan dalam
[spesifikasi amp-analytics](/docs/reference/extended/amp-analytics.html).

Jika Anda adalah vendor analisis,
ketahui selengkapnya tentang
[mengintegrasikan konfigurasi analisis sendiri ke dalam AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Memuat konfigurasi jarak jauh: atribut config

Anda tidak harus menyertakan semua konfigurasi
untuk `amp-analytics` secara menyeluruh di halaman AMP Anda.
Sebaliknya, Anda bisa memanggil URL jarak jauh
untuk semua atau sebagian konfigurasi.

Hal ini memungkinkan Anda untuk melakukan berbagai hal seperti memvariasikan konfigurasi
berdasarkan permintaan spesifik
Jika Anda sebagai penerbit memiliki kontrol atas file jarak jauh,
Anda bisa melakukan pemrosesan sisi server yang diperlukan
untuk membuat data konfigurasi.

Langkah pertama untuk memuat konfigurasi jarak jauh adalah
menyertakan atribut config dalam tag `amp-analytics`:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

Langkah berikutnya adalah membuat materi JSON yang berada dalam URL jarak jauh.
Dalam contoh sederhana ini,
konfigurasi yang terkandung dalam objek JSON hanyalah merupakan nilai variabel untuk akun analisis.

Contoh materi dalam `https://example.com/analytics.account.config.json`:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

Langkah terakhir adalah untuk memastikan apa yang diambil dari file jarak jauh
ke dalam tempat yang sesuai dalam konfigurasi `amp-analytics`.
Baik dalam permintaan `pageview` maupun `event` di sini,
nilai variabel `account` secara otomatis diatur
ke nilai akun dalam URL jarak jauh (`"account": "UA-XXXXX-Y"`):

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Penting:** AMP tidak memvalidasi terhadap lebih dari satu penggunaan dari variabel yang sama.
Nilai-nilai diisikan mengikuti urutan prioritas penggantian variabel,
dan nilai dalam URL jarak jauh berada di prioritas teratas dari urutan tersebut
(lihat [Pengurutan penggantian variabel](/id/docs/guides/analytics/deep_dive_analytics.html#pengurutan-penggantian-variabel)).

## Permintaan, pemicu, & transport

Atribut `requests` mendefinisikan 'data apa yang dikirimkan'
(misalnya, `pageviews`, `events`),
dan tempat data tersebut dikirimkan (URL yang digunakan untuk mentransmisikan data).

Atribut `triggers` menjelaskan kapan data analisis harus dikirimkan,
misalnya, ketika pengguna melihat halaman, ketika pengguna mengeklik tautan.

Atribut `transport` menetapkan cara mengirim permintaan,
atau secara lebih spesifik lagi, protokolnya.

Teruskan membaca untuk mengetahui selengkapnya tentang konfigurasi ini.
(Anda juga bisa membaca tentang konfigurasi ini dalam
[referensi amp-analytics](/docs/reference/extended/amp-analytics.html).)

### Data apa yang dikirimkan: meminta atribut

`request-name` digunakan dalam konfigurasi pemicu untuk menetapkan
permintaan apa yang harus dikirim sebagai respons terhadap suatu kejadian tertentu.
`request-value` merupakan URL `https`.
Nilai-nilai ini bisa meliputi token placeholder
yang bisa merujuk permintaan atau variabel lain.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Beberapa penyedia analisis (termasuk Google Analytics)
sudah memberikan konfigurasi,
yang Anda gunakan lewat atribut `type`.
Jika Anda menggunakan penyedia analisis,
Anda tidak perlu menyertakan informasi `requests`.
Lihat dokumentasi vendor untuk mengetahui
jika `requests` perlu dikonfigurasi, dan cara melakukannya.

#### Menambahkan URL permintaan: Extra URL Params

Atribut [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
atribut menetapkan parameter tambahan untuk ditambahkan ke </string> kueri dari URL permintaan lewat konvensi "&foo=baz" yang biasa.

Contoh `amp-analytics` menambahkan parameter tambahan <code>cd1</code>
ke permintaan dan mengatur nilai parameter ke "AMP":

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Ketika data dikirimkan: memicu atribut

Atribut `triggers` menjelaskan kapan permintaan analisis harus dikirimkan.
Atribut ini berisi pasangan nilai-kunci dari nama pemicu dan konfigurasi pemicu.
Nama pemicu bisa berupa sembarang </string> yang terdiri
karakter alfanumerik (a-zA-Z0-9).

Misalnya,
elemen `amp-analytics` berikut dikonfigurasi untuk mengirim permintaan ke
`https://example.com/analytics` ketika dokumen dimuat pertama kali,
dan setiap kali tag `a` diklik:

[sourcecode:html]
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
[/sourcecode]

AMP mendukung konfigurasi pemicu berikut:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Konfigurasi Pemicu</th>
      <th data-th="Description">Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (diperlukan)</td>
      <td data-th="Description">Kejadian untuk pendengar. Nilai yang valid adalah <code>click</code>, <code>scroll</code>, <code>timer</code>, dan <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (diperlukan)</td>
      <td data-th="Description">Nama permintaan untuk dikirim (seperti yang ditetapkan dalam <a href="/id/docs/guides/analytics/deep_dive_analytics.html#data-apa-yang-dikirimkan:-meminta-atribut">permintaan</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Objek yang berisi pasangan nilai-kunci yang digunakan untuk mengganti <code>vars</code> didefinisikan dalam config di tingkat teratas, atau untuk menetapkan <code>vars</code> sebagai unik bagi pemicu ini (lihat juga <a href="/id/docs/guides/analytics/deep_dive_analytics.html#pengurutan-penggantian-variabel">Pengurutan penggantian variabel</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (diperlukan ketika <code>on</code> diatur ke <code>click</code>)</td>
      <td data-th="Description">Pemilih CSS digunakan untuk menyaring elemen yang harus dilacak. Gunakan nilai <code>*</code> untuk melacak semua elemen. Konfigurasi ini digunakan bersama pemicu <code>click</code>. Ketahui cara menggunakan pemilih untuk <a href="/id/docs/guides/analytics/use_cases.html#melacak-klik-halaman">melacak klik halaman</a> dan <a href="/id/docs/guides/analytics/use_cases.html#melacak-interaksi-sosial">interaksi sosial</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (diperlukan ketika <code>on</code> diatur ke <code>scroll</code>)</td>
      <td data-th="Description">Mengontrol berdasarkan kondisi ketika halaman digulirkan kejadian <code>scroll</code> akan dipicu. Objek ini bisa berisi <code>verticalBoundaries</code> dan <code>horizontalBoundaries</code>. Sekurangnya satu dari dua properti diperlukan agar kejadian <code>scroll</code> dipicu. Nilai-nilai untuk kedua properti tersebut harus larik angkat yang berisi batasan sebuah kejadian gulir akan dihasilkan. Lihat contoh ini dalam <a href="/id/docs/guides/analytics/use_cases.html#melacak-pengguliran">melacak pengguliran</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (diperlukan ketika <code>on</code> diatur ke <code>timer</code>)</td>
      <td data-th="Description">Mengontrol ketika kejadian <code>timer</code> dipicu. Timer akan langsung dipicu dan kemudian pada interval yang telah ditetapkan. Konfigurasi ini digunakan bersama pemicu <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Penting:** Pemicu dari konfigurasi yang berprioritas lebih rendah dikesampingkan
oleh pemicu dengan nama yang sama dari konfigurasi dengan prioritas lebih tinggi
(lihat [Pengurutan penggantian variabel](/id/docs/guides/analytics/deep_dive_analytics.html#pengurutan-penggantian-variabel)).

### Bagaimana data dikirimkan: atribut transport

Atribut `transport` menetapkan cara mengirim permintaan.
Ketiga metode berikut ini diaktifkan secara default:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Metode Transport</th>
      <th data-th="Description">Keterangan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Menunjukkan <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> bisa digunakan untuk mentransmisikan permintaan. Ini akan mengirimkan permintaan <code>POST</code>, dengan kredensial, dan bagian badan yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Menunjukkan <code>XMLHttpRequest</code> bisa digunakan untuk mentransmisikan permintaan tersebut. Ini akan mengirimkan permintaan <code>POST</code>, dengan kredensial, dan badan teks yang kosong.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Menunjukkan permintaan bisa dikirimkan dengan menghasilkan tag <code>Image</code>. Ini akan mengirimkan permintaan <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Hanya satu metode transport yang digunakan,
dan hanya yang memiliki prioritas lebih tinggi
yang diaktifkan, diizinkan, dan tersedia.
Prioritasnya adalah `beacon` > `xhrpost` > `image`.
Jika agen-pengguna klien tidak mendukung sebuah metode,
metode prioritas tertinggi berikutnya yang diaktifkan akan digunakan.

Sertakan atribut `transport` dalam konfigurasi Anda
hanya jika Anda ingin membatasi opsi transport,
jika tidak, Anda bisa menghentikan permintaan.

Dalam contoh di bawah ini,
`beacon` dan `xhrpost` diatur ke false,
sehingga tidak akan digunakan meski prioritasnya lebih tinggi daripada `image`.
Jika agen-pengguna klien mendukung metode `image`,
maka ia akan digunakan; jika tidak, tidak ada permintaan yang akan dikirimkan.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Pengurutan penggantian variabel

AMP mengisi variabel dengan nilai berdasarkan urutan prioritas:

1. Konfigurasi jarak jauh (lewat `config`).
2. `vars` disarangkan di dalam pemicu di dalam `triggers`.
3. `vars` di tingkat teratas disarangkan di dalam `amp-analytics`.
4. Nilai yang disediakan oleh platform.

Dalam contoh ini, ada konfigurasi jarak jauh,
variabel yang didefinisikan di tingkat teratas, dalam pemicu, dan di tingkat platform:

[sourcecode:html]
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
[/sourcecode]

Ketika `var` yang sama didefinisikan di lebih dari satu lokasi,
urutan prioritas variabel mengatur nilainya satu kali.
Sehingga jika dalam contoh di atas konfigurasi jarak jauh mendefinisikan `account` sebagai UA-XXXXX-Y,
maka nilai dari berbagai vars akan menjadi sebagai berikut:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Nilai</th>
      <th data-th="Defined By" class="col-thirty">Didefinisikan Oleh</th>
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
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Pemicu</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Konfigurasi jarak jauh</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Pemicu</td>
    </tr>
  </tbody>
</table>
