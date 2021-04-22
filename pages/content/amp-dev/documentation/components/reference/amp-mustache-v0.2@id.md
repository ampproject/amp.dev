---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Allows rendering of Mustache.js templates.
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



Memungkinkan rendering [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td>Lihat contoh <a href="https://ampbyexample.com/components/amp-mustache/">amp-mustache beranotasi</a> di AMP By Example.</td>
  </tr>
</table>



## Catatan versi <a name="version-notes"></a>

| Versi | Deskripsi |
|-------|-----|
| 0.2 | Dukungan untuk elemen `svg` dan ukuran paket yang lebih kecil (12,2 KB vs 20,5 KB, kompresi gzip).<br><br>Bermigrasi ke library sanitizer HTML yang lebih modern (dari Caja ke DOMPurify). Ada potensi terjadinya perubahan yang dapat menyebabkan gangguan minor akibat perbedaan persetujuan atribut dan tag. Sebaiknya uji halaman Anda terlebih dahulu sebelum mengirim ke produksi untuk memastikan perubahan pada markup yang dihasilkan tidak memengaruhi fungsionalitas. |
| 0.1 | Implementasi awal. |

## Sintaks <a name="syntax"></a>

Mustache adalah sintaks template tanpa logika. Lihat [dokumen Mustache.js](https://github.com/janl/mustache.js/) untuk penjelasan selengkapnya. Sebagian tag Mustache inti:

* {% raw %}`{{variable}}`{% endraw %}: Tag variabel. Meng-output nilai HTML yang di-escape dari suatu variabel.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %} : Tag bagian. Dapat menguji keberadaan variabel dan menjalankan iterasi jika tag berupa array.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: Tag terbalik. Dapat menguji ketidakberadaan suatu variabel.
* {% raw %}`{{{unescaped}}}`{% endraw %}: HTML yang tidak di-escape. Dibatasi dalam markup yang dapat di-output (lihat "Pembatasan" di bawah).

## Penggunaan <a name="usage"></a>

Template `amp-mustache` harus ditentukan dan digunakan sesuai dengan [Spesifikasi Template AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md).

Pertama, `amp-mustache` harus dinyatakan/dimuat seperti ini:

[sourcecode:html]
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
[/sourcecode]


Kemudian, template Mustache dapat ditentukan dalam tag` script` atau `template` seperti ini:

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]

atau

<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]


Gunakan tag `template` jika memungkinkan, karena validasi AMP memberikan petunjuk dev-x yang berguna. Gunakan template `script` untuk kasus dan masalah ekstrem terkait penerapan template dalam konteks tabel. Lihat bagian "Tabel" di bawah.

Bagaimana template ditemukan, kapan template dirender, dan bagaimana data disediakan, semuanya ditentukan oleh elemen AMP target yang menggunakan template ini untuk merender kontennya (misalnya, dalam [amp-list](amp-list.md), [amp-form](amp-form.md), dll.).

## Batasan <a name="restrictions"></a>

### Validasi <a name="validation"></a>

Seperti semua template AMP, template `amp-mustache` harus berupa fragmen DOM dengan format yang tepat. Hal ini berarti, antara lain, Anda tidak dapat menggunakan `amp-mustache` untuk:

* Menghitung nama tag. Misalnya, {% raw %}`<{{tagName}}>`{% endraw %} tidak diizinkan.
* Menghitung nama atribut. Misalnya, {% raw %}`<div {{attrName}}=something>`{% endraw %} tidak diizinkan.

Output "triple-mustache" disanitasi untuk hanya mengizinkan tag berikut: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Sanitasi <a name="sanitization"></a>

Output Mustache disanitasi karena alasan keamanan dan guna menjaga validitas AMP. Akibat proses ini, elemen dan atribut tertentu dapat terhapus tanpa diketahui.

## Tantangan <a name="pitfalls"></a>

### Template bertingkat <a name="nested-templates"></a>

Sesuai Validasi AMP, elemen `<template>` tidak boleh berupa turunan dari elemen `<template>` lain. Hal ini dapat terjadi saat dua komponen yang menggunakan template disusun bertingkat, misalnya `amp-list` dan `amp-form`.

Sebagai solusi, elemen `<template>` juga dapat direferensikan oleh `id` melalui atribut `template` pada komponen tersebut. Contoh:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Dapat juga ditampilkan sebagai:

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]


### Tabel <a name="tables"></a>

Karena string template AMP harus ditetapkan dalam elemen `<template>`, perilaku yang tidak diharapkan mungkin terjadi akibat penguraian oleh browser. Misalnya, elemen `<table>` dapat menyebabkan [foster parenting](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) teks. Dalam contoh berikut:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</template>
{% endraw %}[/sourcecode]

Browser akan mem-foster parent node teks {% raw %}`{{#foo}}`{% endraw %} dan {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}

<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Solusinya meliputi penggabungan bagian Mustache dalam komentar HTML (misalnya  {% raw %}`<!-- {{#bar}} -->`{% endraw %} ), penggunaan elemen non-tabel seperti `<div>` atau penggunaan `<script type="text/plain">` untuk menentukan template Anda.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</script>
{% endraw %}[/sourcecode]


### Penghilangan tanda kutip <a name="quote-escaping"></a>

Saat menggunakan `amp-mustache` untuk menghitung nilai atribut, penghilangan tanda kutip dapat menjadi masalah. Contoh:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
<!-- A double-quote (") in foo will cause malformed HTML. -->
<amp-img alt="{{foo}}" src="example.jpg" width="100" height="100"></amp-img>

<!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
<button on="tap:AMP.setState({foo: &#39;{{bar}}&#39;})">Klik saya</button>
</template>
{% endraw %}[/sourcecode]

Penggunaan kode karakter HTML dalam variabel {% raw %}`{{foo}}`{% endraw %} atau {% raw %}`{{bar}}`{% endraw %} tidak akan membantu karena Mustache akan meng-escape HTML `&amp;` karakter (mis. `&quot;` -&gt; `&amp;quot;`). Salah satu solusinya adalah menggunakan karakter faksimile, misalnya ′ (`&prime;`) dan ″ (`&Prime;`).

Ada [usulan terbuka](https://github.com/ampproject/amphtml/issues/8395) untuk melakukan penggantian ini pada `amp-mustache` saja. Berikan komentar Anda tentang masalah ini jika ingin memberikan dukungan.

### Entity HTML <a name="html-entities"></a>

Entity HTML tidak dipertahankan dalam elemen `<template>`.

Hal ini dapat menjadi masalah jika Anda ingin merender sistem server `<template>` yang berisi teks buatan pengguna, karena teks buatan pengguna yang berisi {% raw %}`{{`, `}}`, `{{{`, `}}}`{% endraw %} akan diperlakukan sebagai bagian Mustache. Misalnya, penggantian {% raw %}`{{`{% endraw %} dengan entity HTML `&lcub;&lcub;` tidak akan berfungsi karena entity tersebut tidak dipertahankan saat browser mengurai `<template>`.

Solusinya meliputi mengganti string seperti {% raw %}`{{`{% endraw %} dengan karakter lain atau menghapusnya langsung dari konten buatan pengguna.

## Validasi <a name="validation-1"></a>

Lihat [aturan amp-mustache](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii) dalam spesifikasi validator AMP.
