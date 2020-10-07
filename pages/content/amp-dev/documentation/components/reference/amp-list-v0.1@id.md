---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Dynamically downloads data and creates list items using a template.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Mengambil konten secara dinamis dari endpoint CORS JSON dan merendernya menggunakan template yang disediakan.

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-list/">contoh amp-list</a> di AMP By Example.</td>
  </tr>
</table>

## Penggunaan <a name="usage"></a>

Komponen `<amp-list>` mengambil konten dinamis dari endpoint CORS JSON. Respons dari endpoint berisi data, yang dirender dalam template yang ditentukan.

[tip type="important"]
Endpoint Anda harus mengimplementasikan persyaratan yang ditentukan dalam spesifikasi [Permintaan CORS di AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Anda dapat menentukan template melalui salah satu dari dua cara berikut:

* atribut `template` yang mereferensikan ID dari elemen `template` atau `script` yang sudah ada.
* elemen `template` atau `script` yang bersarang langsung di dalam elemen `amp-list`.

Untuk penjelasan selengkapnya tentang template, lihat [Template HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

*Contoh: Menampilkan daftar dinamis*

Pada contoh berikut, kami mengambil data JSON yang berisi URL dan judul, dan merender konten dalam [template amp-mustache](amp-mustache.md) bersarang.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Berikut ini file JSON yang kami gunakan:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Berikut ini cara kami menata gaya konten yang diambil:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Perilaku <a name="behavior"></a>

Permintaan ini selalu dibuat dari klien, meskipun dokumen ditayangkan dari Cache AMP. Pemuatan dipicu menggunakan aturan AMP normal, bergantung pada seberapa jauh elemen dari viewport aktif.

Jika `<amp-list>` memerlukan lebih banyak ruang setelah pemuatan, ia akan meminta AMP runtime agar memperbarui tingginya menggunakan alur AMP normal. Jika AMP runtime tidak dapat memenuhi permintaan tinggi yang baru, elemen `overflow` akan ditampilkan apabila tersedia. Namun, perhatikan bahwa penempatan standar elemen `<amp-list>` di bagian bawah dokumen hampir selalu menjamin bahwa AMP runtime dapat mengubah ukurannya.

Secara default, `<amp-list>` menambahkan peran ARIA `list` ke elemen daftar dan peran `listitem` ke elemen item yang dirender melalui template.

### Pengelompokan XHR <a name="xhr-batching"></a>

AMP mengelompokkan XMLHttpRequest (XHR) ke endpoint JSON, artinya, Anda dapat menggunakan satu permintaan data JSON sebagai sumber data untuk banyak konsumen (misalnya beberapa elemen `<amp-list>`) di sebuah halaman AMP.  Sebagai contoh, jika `<amp-list>` membuat XHR ke sebuah endpoint, sementara XHR sedang dalam periode tayang, semua XHR berikutnya ke endpoint yang sama tidak akan terpicu dan sebaliknya akan menampilkan hasil dari XHR pertama.

Dalam `<amp-list>`, Anda dapat menggunakan atribut [`items`](#items-optional) untuk merender sebagian respons JSON, yang memungkinkan Anda untuk memiliki beberapa elemen `<amp-list>` yang merender konten berbeda tetapi menggunakan satu XHR yang sama.

### Menentukan overflow <a name="specifying-an-overflow"></a>

Secara opsional, elemen `<amp-list>` dapat memuat elemen dengan atribut `overflow`. Elemen ini ditampilkan jika AMP Runtime tidak dapat mengubah ukuran elemen `<amp-list>` seperti yang diminta.

*Contoh: Menampilkan overflow saat daftar memerlukan lebih banyak ruang*

Pada contoh berikut, kami menampilkan daftar gambar dan judul. Karena konten `<amp-list>` memerlukan lebih banyak ruang dibandingkan ruang yang tersedia, AMP Runtime akan menampilkan elemen overflow.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Berikut ini CSS untuk `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Placeholder dan fallback <a name="placeholder-and-fallback"></a>

Secara opsional, `<amp-list>` mendukung placeholder dan/atau fallback.

* *Placeholder* adalah elemen turunan dengan atribut `placeholder`. Elemen ini ditampilkan hingga `<amp-list>` berhasil dimuat. Jika fallback juga disediakan, placeholder disembunyikan saat `<amp-list>` gagal dimuat.
* *Fallback* adalah elemen turunan dengan atribut `fallback`. Elemen ini ditampilkan saat `<amp-list>` gagal dimuat.

Pelajari lebih lanjut di [Placeholder &amp; Fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Perhatikan bahwa sebuah elemen turunan tidak boleh menjadi placeholder sekaligus fallback.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Memuat ulang data <a name="refreshing-data"></a>

Elemen `<amp-list>` mengekspos tindakan `refresh` yang dapat dirujuk elemen lain di atribut `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Pengubahan Ukuran Dinamis <a name="dynamic-resizing"></a>

##### Eksperimental: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

Dalam beberapa kasus, `<amp-list>` mungkin perlu berubah ukuran sesuai interaksi pengguna. Misalnya, jika `<amp-list>` memuat amp-accordion yang dapat di-tap oleh pengguna, jika konten `<amp-list>` berubah ukuran akibat class CSS terikat, atau jika sejumlah item dalam `<amp-list>` berubah akibat atribut `[src]` terikat. Tindakan `changeToLayoutContainer` menangani hal ini dengan mengubah amp list ke `layout="CONTAINER"` saat memicu tindakan ini. Lihat contoh berikut:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

Tindakan ini tersedia secara eksperimental dalam `amp-list-resizable-children`.

## Atribut <a name="attributes"></a>

##### src (wajib) <a name="src-required"></a>

URL endpoint jarak jauh yang menampilkan JSON yang akan dirender dalam `<amp-list>` ini. Harus berupa layanan HTTP CORS. Protokol URL harus berupa HTTPS.

[tip type="important"]
Endpoint Anda harus mengimplementasikan persyaratan yang ditentukan dalam spesifikasi [Permintaan CORS di AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Atribut `src` dapat dihilangkan jika atribut `[src]` ada. Hal ini berguna saat merender konten sebagai akibat dari gestur pengguna, bukan saat memuat halaman ketika bekerja dengan [`amp-bind`](amp-bind.md).

##### credentials (opsional) <a name="credentials-optional"></a>

Menentukan opsi `credentials` seperti yang ditentukan oleh [Fetch API](https://fetch.spec.whatwg.org/).

* Nilai yang didukung: `omit`, `include`
* Default: `omit`

Untuk mengirim kredensial, teruskan nilai `include`. Jika nilai ini ditetapkan, respons harus mengikuti [panduan keamanan CORS AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

Berikut ini contoh yang menentukan kredensial include untuk menampilkan konten yang dipersonalisasi dalam daftar:

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### item (opsional) <a name="items-optional"></a>

Menentukan ekspresi untuk menemukan array yang akan dirender dalam respons. Ini adalah ekspresi notasi titik yang menavigasi melalui kolom respons JSON.
Secara default, `<amp-list>` mengharapkan array, atribut `single-item` dapat digunakan untuk memuat data dari objek.

* Nilai default adalah `"items"`. Respons yang diharapkan: `{items: [...]}`.
* Jika respons tersebut adalah array yang diinginkan, gunakan nilai `"."`. Respons yang diharapkan: `[...]`.
* Navigasi bersarang diizinkan (misalnya, `"field1.field2"`). Respons yang diharapkan: `{field1: {field2: [...]}}`.

Jika `items="items"` ditentukan (yang merupakan setelan default), respons harus berupa objek JSON yang memuat properti array bernama `"items"`:
```text
{
  "items": [...]
}
```

#### max-item (opsional) <a name="max-items-optional"></a>

Nilai bilangan bulat yang menentukan panjang maksimum array item yang akan dirender.
Array `items` akan dipangkas ke entri `max-items` jika nilai yang ditampilkan melebihi nilai `max-items`.

#### single-item (opsional) <a name="single-item-optional"></a>

Menyebabkan `<amp-list>` memperlakukan hasil yang ditampilkan seolah-olah itu adalah array elemen tunggal. Respons objek akan digabungkan dalam sebuah array sehingga `{items: {...}}` akan berperilaku seolah-olah item tersebut adalah `{items: [{...}]}`.

#### reset-on-refresh (opsional) <a name="reset-on-refresh-optional"></a>

Menampilkan indikator pemuatan dan placeholder lagi saat sumber daftar di-refresh melalui `amp-bind` atau tindakan `refresh()`.

Secara default, tindakan ini hanya akan memicu refresh yang menyebabkan pengambilan jaringan. Untuk menyetel ulang setiap kali refresh dilakukan, gunakan `reset-on-refresh="always"`.

#### [is-layout-container] (eksperimental, opsional) <a name="binding-optional"></a>

Ini adalah atribut yang dapat diikat yang, secara default, akan selalu bernilai false. Jika ditetapkan ke true melalui `bind`, atribut ini akan mengubah tata letak `<amp-list>` menjadi tata letak `CONTAINER`. Atribut ini berguna untuk menangani pengubahan ukuran dinamis untuk amp-list. Atribut ini tidak dapat ditetapkan ke true secara default karena alasan yang sama dengan mengapa `<amp-list>` tidak mendukung tata letak `CONTAINER`--yaitu berpotensi menyebabkan lompatan konten saat pemuatan pertama. Atribut ini tersedia secara eksperimental dalam `amp-list-resizable-children`. Atau, Anda juga dapat menggunakan tindakan `changeToLayoutContainer`.

#### binding (opsional) <a name="is-layout-container-optional"></a>

Untuk halaman yang menggunakan `<amp-list>` dan juga `amp-bind`, atribut ini mengontrol apakah rendering akan diblokir pada evaluasi binding (misalnya `[text]`) dalam turunan yang dirender.

Sebaiknya gunakan `binding="no"` atau `binding="refresh"` untuk performa yang lebih cepat.

* `binding="no"`: Rendering tidak akan diblokir **(paling cepat)**.
* `binding="refresh"`: Rendering tidak diblokir pada pemuatan awal **(lebih cepat)**.
* `binding="always"`: Rendering selalu diblokir **(lambat)**.

Jika atribut `binding` tidak disediakan, setelan default-nya adalah `always`.

## Eksperimental: Muat Lebih Banyak dan Scroll Tanpa Batas (amp-list-load-more) <a name="common-attributes"></a>

Kami memperkenalkan eksperimen `amp-list-load-more` sebagai implementasi untuk penomoran halaman dan scroll tanpa batas di `<amp-list>`. Anda dapat menggunakan fitur ini dengan mengaktifkan eksperimen 'amp-list-load-more' di [halaman eksperimen](https://cdn.ampproject.org/experiments.html) dan menambahkan atribut `load-more` ke `<amp-list>`. Saat ini, fitur ini masih dalam uji coba, dan API akhirnya dapat berubah.

#### Contoh Penggunaan <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Untuk contoh penggunaan, silakan lihat [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) dan [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html).

### Atribut <a name="sample-usage"></a>

#### load-more (wajib) <a name="attributes-1"></a>

Atribut ini menerima dua nilai: "auto" atau "manual". Menetapkan nilai atribut ini ke "manual" akan menampilkan tombol "load-more" di akhir `<amp-list>`. Menetapkan nilai atribut ini ke "auto" akan membuat `<amp-list>` otomatis memuat elemen lain hingga tiga viewport ke bawah untuk memberikan efek scroll tanpa batas.

#### load-more-bookmark (opsional) <a name="load-more-mandatory"></a>

Atribut ini menentukan nama kolom dalam data yang ditampilkan yang akan memberikan URL untuk item berikutnya yang akan dimuat. Jika atribut ini tidak ditentukan, `<amp-list>` mengharapkan payload JSON memiliki kolom `load-more-src`, yang sesuai dengan URL berikutnya yang akan dimuat. Dalam kasus di mana kolom ini disebut dengan nama lain, Anda dapat menentukan nama kolom tersebut melalui kolom `load-more-bookmark`. Misalnya, dalam contoh payload berikut, kami akan menentukan `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Menyesuaikan elemen load-more <a name="load-more-bookmark-optional"></a>

`<amp-list>` dengan atribut `load-more` berisi elemen UI berikut: tombol load-more, pemuat, elemen load-failed, dan end-cap (opsional) yang menandai akhir daftar. Elemen ini dapat disesuaikan dengan memberikan elemen `<amp-list-load-more>` sebagai turunan dari `<amp-list>` dengan atribut berikut:

#### load-more-button <a name="customizing-load-more-elements"></a>

Elemen `<amp-list-load-more>` dengan atribut `load-more-button`, yang muncul di akhir daftar (untuk load-more manual) jika ada lebih banyak elemen untuk dimuat. Mengklik elemen ini akan memicu pengambilan untuk memuat lebih banyak elemen dari URL yang ada di kolom `load-more-src` atau kolom data yang ditampilkan yang sesuai dengan atribut `load-more-bookmark`. Elemen ini dapat disesuaikan dengan memberikan `<amp-list>` dengan elemen turunan yang memiliki atribut `load-more-button`.

##### Contoh: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  Elemen ini dapat diberi template melalui `amp-mustache`.

##### Contoh: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Klik di sini untuk melihat lainnya!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Elemen ini adalah pemuat yang akan ditampilkan jika pengguna mencapai akhir daftar sementara konten masih dimuat, atau sebagai akibat dari mengklik elemen `load-more-button` (sementara turunan baru `<amp-list>` masih dimuat). Elemen ini dapat disesuaikan dengan memberikan `<amp-list>` dengan elemen turunan yang memiliki atribut `load-more-loading`. Contohnya:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Elemen `<amp-list-load-more>` yang memuat atribut `load-more-failed` yang berisi tombol dengan atribut `load-more-clickable` yang akan ditampilkan di bawah `<amp-list>` jika pemuatan gagal. Mengklik elemen ini akan memicu pemuatan ulang URL yang gagal. Elemen ini dapat disesuaikan dengan memberikan `<amp-list>` dengan elemen turunan yang memiliki atribut `load-more-failed`. Contohnya:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

Pada contoh di atas, seluruh elemen `load-more-failed` dapat diklik. Namun, terdapat pola umum untuk elemen ini yaitu elemen "loading failed" yang umumnya tidak dapat diklik berisi tombol "reload" yang dapat diklik. Untuk menjelaskan hal ini, Anda dapat menggunakan elemen yang umumnya tidak dapat diklik dengan tombol yang berisi elemen `load-more-clickable`. Contoh:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Elemen ini tidak disediakan secara default, tetapi jika elemen `<amp-list-load-more>` yang berisi atribut `load-more-end` ditambahkan ke `<amp-list>` sebagai elemen turunan, elemen ini akan ditampilkan di bawah `<amp-list>` jika tidak ada item lainnya.  Elemen ini dapat diberi template melalui `amp-mustache`. Contohnya:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### atribut umum <a name="load-more-end"></a>

Elemen ini mencakup [atribut umum](../../../documentation/guides-and-tutorials/learn/common_attributes.md) yang diperluas ke komponen AMP.

## Substitusi <a name="substitutions"></a>

`<amp-list>` memungkinkan semua substitusi variabel URL standar.
Lihat [Panduan Substitusi](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) untuk informasi selengkapnya.

Misalnya:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
dapat membuat permintaan ke sesuatu seperti `https://foo.com/list.json?0.8390278471201` di mana nilai RANDOM dihasilkan secara acak setelah setiap tayangan.

## Validasi <a name="validation"></a>

Lihat [aturan amp-list](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) dalam spesifikasi validator AMP.
