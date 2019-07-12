---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!---
       Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

# amp-form

<table>
  <tr>
    <td width="40%"><strong>Deskripsi</strong></td>
    <td>Memungkinkan Anda membuat tag <code>input</code> dan <code>form</code>.</td>
  </tr>
  <tr>
    <td><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="https://www.ampproject.org/docs/design/responsive/control_layout.html#the-layout-attribute">Tata Letak yang Didukung</a></strong></td>
    <td>T/A</td>
  </tr>
  <tr>
    <td><strong>Contoh</strong></td>
    <td>Lihat contoh <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> di AMP By Example.</td>
  </tr>
</table>


# Perilaku

Ekstensi `amp-form` memungkinkan Anda membuat formulir (`<form>`) untuk mengirimkan kolom input dalam dokumen AMP. Ekstensi `amp-form` juga menyediakan [polyfill](#polyfills) untuk beberapa perilaku yang tidak ada di browser.

[tip type="important"]
Jika Anda mengirimkan data menggunakan formulir, endpoint server Anda harus mengimplementasikan persyaratan [keamanan CORS](https://www.ampproject.org/docs/fundamentals/amp-cors-requests#cors-security-in-amp).
[/tip]

Sebelum membuat `<form>`, Anda harus menyertakan skrip yang diperlukan untuk ekstensi `<amp-form>`; jika tidak, dokumen akan menjadi tidak valid. Jika menggunakan tag `input` untuk keperluan selain mengirimkan nilainya (misalnya, input yang tidak berada dalam `<form>`), Anda tidak perlu memuat ekstensi `amp-form`.

Berikut adalah contoh formulir dasar:

<!-- embedded sample that is rendered on ampproject.org -->

<div>
  <amp-iframe height="671" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampform.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Atribut

# target

Menunjukkan tempat untuk menampilkan respons formulir setelah mengirimkan formulir. Nilainya harus `_blank` atau `_top`.

# action

Menentukan endpoint server untuk menangani input formulir. Nilainya harus berupa URL `https` (absolut atau relatif) dan tidak boleh berupa link ke CDN.

* Untuk `method=GET`: gunakan atribut ini atau [`action-xhr`](#action-xhr).
* Untuk `method=POST`: gunakan atribut [`action-xhr`](#action-xhr).

[tip type="note"]
Atribut `target` dan `action` hanya digunakan untuk permintaan GET non-xhr. AMP runtime akan menggunakan `action-xhr` untuk membuat permintaan dan akan mengabaikan `action` dan `target`. Jika `action-xhr` tidak ditentukan, AMP akan membuat permintaan GET ke endpoint `action` dan menggunakan `target` untuk membuka jendela baru (jika `_blank`). AMP runtime mungkin juga kembali menggunakan `action` dan `target` jika ekstensi `amp-form` gagal dimuat.
[/tip]

# action-xhr

Menentukan endpoint server untuk menangani input formulir dan mengirimkan formulir melalui XMLHttpRequest (XHR). Permintaan XHR (terkadang disebut permintaan AJAX) adalah tempat browser akan membuat permintaan tanpa memuat halaman secara penuh atau membuka halaman baru. Browser akan mengirimkan permintaan di latar belakang menggunakan [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) jika tersedia, dan kembali ke [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) untuk browser lama.

[tip type="important"]
Endpoint XHR Anda harus mengimplementasikan persyaratan [keamanan CORS](https://www.ampproject.org/docs/fundamentals/amp-cors-requests#cors-security-in-amp).
[/tip]

Atribut ini wajib untuk `method=POST`, dan opsional untuk `method=GET`.

Nilai untuk `action-xhr` dapat berupa endpoint yang sama atau berbeda dari `action` dan memiliki persyaratan `action` yang sama seperti di atas.

Untuk mempelajari cara mengalihkan pengguna setelah berhasil mengirimkan formulir, lihat bagian [Mengalihkan setelah mengirim](#redirecting-after-a-submission) di bawah.

# Atribut formulir lainnya

Semua [atribut formulir](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) lainnya bersifat opsional.

# custom-validation-reporting

Ini adalah atribut opsional yang mengaktifkan dan memilih strategi pelaporan validasi kustom. Nilai yang valid adalah salah satu dari: `show-first-on-submit`, `show-all-on-submit`, atau `as-you-go`.

Lihat bagian [Validasi Kustom](#custom-validations) untuk penjelasan selengkapnya.

# Input dan kolom

**Diizinkan**:

* Elemen terkait formulir lainnya, meliputi: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>`, dan seterusnya.
* `<input type=password>` dan `<input type=file>` di dalam `<form method=POST action-xhr>`.
* [`amp-selector`](https://www.ampproject.org/docs/reference/components/amp-selector)

**Tidak diizinkan**:

* `<input type=button>`, `<input type=image>`
* Sebagian besar atribut terkait formulir pada input, yang meliputi: `form`, `formaction`, `formtarget`, `formmethod`, dan sebagainya.

(Penyesuaian pada beberapa aturan ini dapat dipertimbangkan kembali di masa mendatang - [harap beri tahu kami](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#suggestions-and-feature-requests) jika Anda memerlukannya dan berikan kasus penggunaan).

Untuk detail tentang input dan kolom yang valid, lihat [aturan amp-form](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) dalam spesifikasi validator AMP.

# Tindakan

Elemen `amp-form` memperlihatkan tindakan berikut:

| Tindakan | Deskripsi |
|--------|-------------|
| `submit` | Memungkinkan Anda memicu pengiriman formulir saat tindakan tertentu dilakukan, misalnya, menge-tap link, atau [mengirimkan formulir tentang perubahan input](#input-events). |
| `clear` | Mengosongkan nilai dari setiap input dalam formulir. Dengan tindakan ini, pengguna dapat melengkapi formulir dengan cepat untuk kedua kalinya. |

[tip type="read-on"]
Pelajari [Tindakan dan Peristiwa di AMP](https://www.ampproject.org/docs/interaction_dynamic/amp-actions-and-events.html) lebih lanjut.
[/tip]

# Peristiwa

`amp-form` memperlihatkan peristiwa berikut:

| Peristiwa | Diaktifkan ketika |
|-------|-------------|
| `submit` | Formulir terkirim dan sebelum pengiriman selesai. |
| `submit-success` | Pengiriman formulir selesai dan responsnya adalah berhasil. |
| `submit-error` | Pengiriman formulir selesai dan responsnya adalah error. |
| `verify` | Verifikasi asinkron dimulai. |
| `verify-error` | Verifikasi asinkron selesai dan responsnya adalah error. |
| `valid` | Status validasi formulir berubah menjadi "valid" (sesuai dengan [strategi pelaporannya](#reporting-strategies)). |
| `invalid` | Status validasi formulir berubah menjadi "tidak valid" (sesuai dengan [strategi pelaporannya](#reporting-strategies)). |

Peristiwa ini dapat digunakan melalui [atribut `on`](https://www.ampproject.org/docs/fundamentals/spec#on).

Misalnya, berikut berikut mendeteksi peristiwa `submit-success` dan juga `submit-error` serta menampilkan lightbox berbeda tergantung peristiwanya:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Lihat [contoh lengkapnya di sini](../../examples/forms.amp.html).

# Peristiwa input

AMP memperlihatkan peristiwa `change` dan `input-debounced` pada elemen `<input>` turunan. Dengan tindakan ini, Anda dapat menggunakan [atribut `on`](https://www.ampproject.org/docs/fundamentals/spec#on) untuk menjalankan tindakan pada elemen apa pun saat nilai input berubah.

Misalnya, salah satu kasus penggunaan umum adalah mengirimkan formulir saat terjadi perubahan input (memilih tombol pilihan untuk menjawab polling, memilih bahasa dari input `select` untuk menerjemahkan halaman, dll.).

<!-- embedded sample that is rendered on ampproject.org -->

<div>
  <amp-iframe height="450" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampform.inputevent.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Lihat [contoh lengkapnya di sini](../../examples/forms.amp.html).

# Pemicu analisis

Ekstensi `amp-form` memicu peristiwa berikut yang dapat Anda pantau dalam konfigurasi [amp-analytics](https://www.ampproject.org/docs/reference/components/amp-analytics):

| Peristiwa                     | Diaktifkan ketika                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Permintaan formulir dimulai.      |
| `amp-form-submit-success` | Respons yang diterima menunjukkan tindakan berhasil (respons memiliki status `2XX`). |
| `amp-form-submit-error`   | Respons yang diterima menunjukkan tindakan tidak berhasil (respons tidak memiliki status `2XX`). |

Anda dapat mengonfigurasi analisis untuk mengirimkan peristiwa ini seperti dalam contoh berikut:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Ketiga peristiwa tersebut menghasilkan kumpulan variabel yang terkait dengan formulir tertentu dan kolom dalam formulir tersebut. Variabel ini dapat digunakan untuk analisis.

Misalnya, formulir berikut memiliki satu kolom:

```html

<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Komentar">
    </form>

```

Saat peristiwa `amp-form-submit`, `amp-form-submit-success`, atau `amp-form-submit-error` diaktifkan, peristiwa tersebut akan menghasilkan variabel berikut yang berisi nilai yang telah ditentukan dalam formulir:

  * `formId`
  * `formFields[comment]`
# Rendering respons berhasil/error

Anda dapat merender respons berhasil atau error dalam formulir menggunakan [template yang diperluas](https://www.ampproject.org/docs/fundamentals/spec#extended-templates), seperti [amp-mustache](https://www.ampproject.org/docs/reference/components/amp-mustache), atau respons berhasil melalui data binding dengan [amp-bind](https://www.ampproject.org/docs/reference/components/amp-bind) dan atribut respons berikut:

| Atribut respons | Deskripsi |
|-----------|---------------------|
| `submit-success` | Dapat digunakan untuk menampilkan pesan berhasil jika responsnya adalah berhasil (artinya, menampilkan status `2XX`). |
| `submit-error` | Dapat digunakan untuk menampilkan error pengiriman jika responsnya adalah tidak berhasil (artinya, tidak menampilkan status `2XX`).  |
| `submitting` | Dapat digunakan untuk menampilkan pesan saat formulir sedang dikirimkan. Template untuk atribut ini memiliki akses ke kolom input formulir untuk segala keperluan tampilan. Silakan lihat [contoh formulir lengkap di bawah](#example-submitting) untuk cara menggunakan atribut `submitting`. |

# Untuk merender respons dengan template:

  * Terapkan atribut respons ke *semua turunan langsung* elemen `<form>`.
  * Render respons dalam elemen turunan dengan menyertakan template melalui tag `<template></template>` atau `<script type="text/plain"></script>` di dalamnya, atau dengan merujuk template dengan atribut `template="id_of_other_template"`.
  * Sediakan objek JSON yang valid untuk respons atas `submit-success` dan `submit-error`. Baik respons error maupun berhasil harus memiliki header `Content-Type: application/json`.

<a id="example-submitting"></a>

# Contoh: Formulir menampilkan pesan berhasil, error, dan sedang mengirim

Pada contoh berikut, respons dirender dalam template inline yang berada di dalam formulir.

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        Ada kesalahan dalam formulir!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Mengirim formulir... Terima kasih telah menunggu, {{name}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Berhasil! Terima kasih telah berlangganan, {{name}}! Pastikan untuk memeriksa email Anda {{email}}
    untuk mengonfirmasi! Setelah itu, kami akan mulai mengirim artikel mingguan tentang {{#interests}}<b>{{name}}</b> {{/interests}}.
  </template>
</div>
<div submit-error="">
  <template type="amp-mustache">
    Maaf! {{name}}, {{message}}.
  </template>
</div>
</form>
{% endraw %}
```
Endpoint `action-xhr` penayang menampilkan respons JSON berikut:

Jika berhasil:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

Jika error:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

Anda dapat merender respons dalam template yang dirujuk yang ditentukan sebelumnya dalam dokumen dengan menggunakan ID template sebagai nilai atribut `template`, yang ditetapkan pada elemen dengan atribut `submit-success` dan `submit-error`.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Berhasil! Terima kasih telah berlangganan, {{name}}! Pastikan untuk memeriksa email Anda {{email}}
untuk mengonfirmasi! Setelah itu, kami akan mulai mengirim artikel mingguan tentang {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Oops! {{name}}, {{message}}.
</template>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```
Lihat [contoh lengkapnya di sini](../../examples/forms.amp.html).

# Untuk merender respons berhasil dengan data binding

* Gunakan [atribut on](https://www.ampproject.org/docs/interaction_dynamic/amp-actions-and-events) untuk mengikat atribut *submit-success* formulir ke [`AMP.setState()`](https://www.ampproject.org/docs/reference/components/amp-bind#updating-state-with-amp.setstate%28%29).
* Gunakan properti `event` untuk mengambil data respons.
* Tambahkan atribut status ke elemen yang diinginkan untuk mengikat respons formulir.

Contoh berikut menunjukkan respons `submit-success` formulir dengan [`amp-bind`](https://www.ampproject.org/docs/reference/components/amp-bind):
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```
Jika formulir berhasil dikirim, respons JSON yang serupa dengan berikut akan ditampilkan:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
Kemudian `amp-bind` mengupdate teks elemen `<p>` agar cocok dengan status `subscibe`:

```html
...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```
# Mengalihkan setelah mengirimkan

Anda dapat mengalihkan pengguna ke halaman baru setelah pengiriman formulir yang berhasil dengan menetapkan header respons `AMP-Redirect-To` dan menentukan URL pengalihan. URL pengalihan harus berupa URL HTTPS; jika tidak, AMP akan memunculkan error dan pengalihan tidak akan terjadi.  Header respons HTTP dikonfigurasi melalui server Anda.

Pastikan memperbarui header respons `Access-Control-Expose-Headers` Anda untuk menyertakan `AMP-Redirect-To` ke daftar header yang diizinkan.  Pelajari lebih lanjut header ini di [Keamanan CORS di AMP](https://www.ampproject.org/docs/fundamentals/amp-cors-requests#cors-security-in-amp).

*Contoh respons header:*

```text
  AMP-Redirect-To: https://example.com/forms/thank-you
  Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
    Periksa [Pengiriman Formulir dengan Update](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) dan [Halaman Produk](https://ampbyexample.com/samples_templates/product_page/#product-page) di AMP By Example yang menunjukkan cara menggunakan pengalihan setelah pengiriman formulir.
    [/tip]

# Validasi kustom

Ekstensi `amp-form` memungkinkan Anda membuat UI validasi kustom sendiri dengan menggunakan atribut `custom-validation-reporting` bersama salah satu strategi pelaporan berikut: `show-first-on-submit`, `show-all-on-submit`, atau `as-you-go`.

Untuk menentukan validasi kustom pada formulir:

1. Tetapkan atribut `custom-validation-reporting` pada `form` Anda ke salah satu [strategi pelaporan validasi](#reporting-strategies).
1. Sediakan UI validasi Anda sendiri yang ditandai dengan atribut khusus. AMP akan menemukan atribut khusus dan melaporkannya pada waktu yang tepat bergantung pada strategi pelaporan yang Anda tentukan.

Berikut contohnya:

<!-- embedded sample that is rendered on ampproject.org -->

<div>
  <amp-iframe height="748" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampform.customval.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Untuk contoh lainnya, lihat [examples/forms.amp.html](../../examples/forms.amp.html).

Untuk pesan validasi, jika elemen Anda tidak berisi konten teks, AMP akan mengisinya dengan pesan validasi default browser. Pada contoh di atas, jika input `name5` kosong dan validasi dimulai (artinya, pengguna mencoba mengirimkan formulir), AMP akan mengisi `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` dengan pesan validasi browser dan menampilkan `span` tersebut kepada pengguna.

[tip type="important"]
Anda harus menyediakan UI validasi sendiri untuk setiap jenis status tidak valid yang dapat dimiliki input. Jika UI validasi tidak ada, pengguna tidak akan melihat `custom-validation-reporting` apa pun untuk status error yang tidak ada. Status validitas dapat ditemukan dalam [dokumentasi pelaporan validasi HTML W3C resmi](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# Strategi pelaporan

Tentukan salah satu opsi pelaporan berikut untuk atribut `custom-validation-reporting`:

# Show First on Submit

Opsi pelaporan `show-first-on-submit` akan meniru perilaku default browser saat validasi default dimulai. Opsi ini akan menampilkan error validasi pertama yang ditemukan dan berhenti di sana.

# Show All on Submit

Opsi pelaporan `show-all-on-submit` menampilkan semua error validasi atas semua input yang tidak valid saat formulir dikirimkan. Opsi ini berguna jika Anda ingin menampilkan ringkasan validasi.

# As You Go

Opsi pelaporan `as-you-go` memungkinkan pengguna melihat pesan validasi saat mereka berinteraksi dengan input. Misalnya, jika mengetik alamat email yang tidak valid, pengguna akan langsung melihat error tersebut.  Setelah mereka mengoreksi nilainya, error tersebut akan hilang.

# Interact and Submit

Opsi pelaporan `interact-and-submit` menggabungkan perilaku `show-all-on-submit` dan `as-you-go`. Masing-masing kolom akan menampilkan error segera setelah interaksi, dan pada saat dikirim, formulir akan menampilkan error pada semua kolom yang tidak valid.

# Verifikasi

Validasi HTML5 memberikan masukan hanya berdasarkan informasi yang tersedia di halaman, seperti apakah nilai cocok dengan pola tertentu. Dengan verifikasi `amp-form`, Anda dapat memberikan masukan kepada pengguna yang tidak dapat dilakukan dengan validasi HTML5 saja. Misalnya, formulir dapat menggunakan verifikasi untuk memeriksa apakah alamat email telah terdaftar. Kasus penggunaan lainnya adalah memverifikasi bahwa kolom kota dan kolom kode pos cocok satu sama lain.

Berikut ini contohnya:
```html

{% raw %}<h4>Contoh verifikasi</h4>

<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post" target="_blank">
<fieldset>
<label>
  <span>Email</span>
  <input type="text" name="email" required="">
  </label>
  <label>
    <span>Kode Pos</span>
    <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
    </label>
    <label>
      <span>Kota</span>
      <input type="text" name="city" required="">
      </label>
      <label>
        <span>Dokumen</span>
        <input type="file" name="document" no-verify="">
        </label>
        <div class="spinner"></div>
        <input type="submit" value="Kirim">
        </fieldset>
        <div submit-success="">
          <template type="amp-mustache">
            <p>Selamat! Anda terdaftar dengan alamat email {{email}}</p>
          </template>
        </div>
        <div submit-error="">
          <template type="amp-mustache">
            {{#verifyErrors}}
          <p>{{message}}</p>
          {{/verifyErrors}}
        {{^verifyErrors}}
      <p>Terjadi masalah. Coba lagi nanti?</p>
      {{/verifyErrors}}
  </template>
</div>
</form>
{% endraw %}
```
Formulir ini akan mengirimkan kolom `__amp_form_verify` sebagai bagian dari data formulir sebagai petunjuk ke server bahwa permintaan tersebut adalah permintaan verifikasi dan bukan permintaan pengiriman formal.
Informasi ini berguna agar server tidak menyimpan permintaan verifikasi jika endpoint yang sama digunakan untuk verifikasi dan pengiriman.

Berikut adalah tampilan respons error untuk verifikasi:
```json
{
  "verifyErrors": [
    {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

Untuk menghapus kolom dari permintaan `verify-xhr`, tambahkan atribut `no-verify` ke elemen input.

Untuk contoh lainnya, lihat [examples/forms.amp.html](../../examples/forms.amp.html).

# Substitusi variabel

Ekstensi `amp-form` memungkinkan [substitusi variabel platform]( ../../spec/amp-var-substitutions.md) untuk input yang tersembunyi dan yang memiliki atribut `data-amp-replace`. Pada setiap pengiriman formulir, `amp-form` akan menemukan semua `input[type=hidden][data-amp-replace]` di dalam formulir dan menerapkan substitusi variabel ke atribut `value`-nya dan menggantinya dengan hasil dari substitusi tersebut.

Anda harus menyediakan variabel yang digunakan untuk setiap substitusi pada setiap input dengan menentukan string dipisahkan-spasi dari variabel yang digunakan dalam `data-amp-replace` (lihat contoh di bawah). AMP tidak akan mengganti variabel yang tidak ditentukan secara eksplisit.

Berikut adalah contoh keadaan input sebelum dan sesudah substitusi (perhatikan bahwa Anda harus menggunakan sintaks platform untuk substitusi variabel, bukan substitusi analisis):
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Setelah pengguna mencoba mengirim formulir, AMP akan mencoba menetapkan variabel dan memperbarui atribut `value` kolom untuk semua kolom dengan substitusi yang sesuai. Untuk pengiriman XHR, semua variabel kemungkinan akan disubstitusi dan ditetapkan. Namun, pada pengiriman GET non-XHR, nilai yang memerlukan penyelesaian asinkron mungkin tidak tersedia karena belum ditetapkan sebelumnya. `CLIENT_ID`, misalnya, tidak akan ditetapkan jika tidak ditetapkan dan di-cache sebelumnya.

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Perhatikan bahwa `CANONICAL_HOSTNAME` di atas tidak diganti karena tidak tercantum dalam daftar diizinkan melalui atribut `data-amp-replace` di kolom pertama.

Substitusi akan terjadi pada setiap pengiriman berikutnya. Baca selengkapnya tentang [substitusi variabel di AMP]( ../../spec/amp-var-substitutions.md).

# Polyfill

Ekstensi `amp-form` menyediakan polyfill untuk perilaku dan fungsionalitas yang tidak ada pada beberapa browser atau yang diimplementasikan dalam CSS versi berikutnya.

# Pemblokiran pengiriman tidak valid dan balon pesan validasi

Browser yang menggunakan mesin berbasis webkit saat ini (per Agustus 2016) tidak mendukung pengiriman formulir yang tidak valid. Browser ini meliputi Safari pada semua platform, dan semua browser iOS. Ekstensi `amp-form` mem-polyfill perilaku ini untuk memblokir setiap pengiriman yang tidak valid dan menampilkan balon pesan validasi pada input yang tidak valid.

# Pseudo-class interaksi pengguna

Pseudo-class `:user-invalid` dan `:user-valid` adalah bagian dari [spesifikasi CSS Selectors 4 mendatang](https://drafts.csswg.org/selectors-4/#user-pseudos) dan diperkenalkan untuk mendukung hook yang lebih baik guna menata gaya kolom valid/tidak valid berdasarkan beberapa kriteria.

Salah satu perbedaan utama antara class `:invalid` dan `:user-invalid` adalah kapan keduanya diterapkan ke elemen. Class `:user-invalid` diterapkan setelah interaksi yang signifikan dari pengguna dengan kolom (misalnya, jenis pengguna dalam kolom, atau blur dari kolom).

Ekstensi `amp-form` menyediakan [class](#classes-and-css-hooks) untuk mem-polyfill pseudo-class ini. Ekstensi `amp-form` juga menyebarkan pseudo-class ini ke elemen `fieldset` dan `form` ancestor.

# Validasi `<textarea>`

Pencocokan ekspresi reguler adalah fitur validasi umum yang didukung secara native pada sebagian besar elemen input, kecuali untuk `<textarea>`. Kami mem-polyfill fungsionalitas ini dan mendukung atribut `pattern` pada elemen `<textarea>`.

Formulir AMP menyediakan atribut `autoexpand` ke elemen `<textarea>`. Hal ini memungkinkan textarea meluas dan menyusut untuk mengakomodasi baris input pengguna, hingga ukuran maksimum kolom. Jika pengguna mengubah ukuran kolom secara manual, perilaku perluasan otomatis akan dihapus.

```html
<textarea autoexpand></textarea>
```
# Penataan gaya

# Class dan hook CSS

Ekstensi `amp-form` menyediakan class dan hook CSS yang dapat dimanfaatkan penayang untuk menata gaya formulir dan input mereka.

Class berikut dapat digunakan untuk menunjukkan status pengiriman formulir:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Class berikut adalah [polyfill untuk pseudo-class interaksi pengguna](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

Penayang dapat menggunakan class ini untuk menata gaya input dan kolom mereka agar responsif terhadap tindakan pengguna (misalnya, menyoroti input yang tidak valid dengan batas merah setelah pengguna memburamkannya).

Lihat [contoh lengkapnya di sini](../../examples/forms.amp.html) tentang cara menggunakannya.

[tip type="success"]
Kunjungi [AMP Start](https://ampstart.com/components#form-elements) untuk melihat elemen formulir AMP responsif dan telah ditata gayanya yang dapat Anda gunakan di halaman AMP.
[/tip]

# Pertimbangan Keamanan

# Melindungi dari serangan XSRF

Selain mengikuti detail dalam [spesifikasi CORP AMP](https://www.ampproject.org/docs/fundamentals/amp-cors-requests.html), harap perhatikan lebih lanjut bagian [“Memproses permintaan yang mengubah status”](https://www.ampproject.org/docs/fundamentals/amp-cors-requests.html#processing-state-changing-requests) untuk melindungi dari [serangan XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) di mana penyerang dapat menjalankan perintah yang tidak sah menggunakan sesi pengguna aktif tanpa sepengetahuan mereka.

Secara umum, perhatikan hal-hal berikut ketika menerima input dari pengguna:

* Gunakan POST hanya untuk permintaan yang mengubah status.
* Gunakan GET non-XHR untuk keperluan navigasi saja (misalnya, Penelusuran).
    * Permintaan GET non-XHR tidak akan menerima origin/header yang akurat, dan backend tidak akan dapat memberikan perlindungan dari serangan XSRF dengan mekanisme di atas.
    * Secara umum, gunakan permintaan GET XHR/non-XHR untuk pengambilan informasi atau navigasi saja.</li>
* Permintaan POST non-XHR tidak diizinkan dalam dokumen AMP. Hal ini karena adanya inkonsistensi setelan header `Origin` pada permintaan ini di seluruh browser. Dan komplikasi yang mendukungnya akan memperkenalkan perlindungan dari serangan XSRF. Hal ini dapat dipertimbangkan kembali dan diperkenalkan nanti. Silakan laporkan masalah jika Anda yakin hal ini diperlukan.
