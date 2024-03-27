---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Represents a control that presents a menu of options and lets the user choose from it.
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



Mewakili kontrol yang menampilkan menu opsi dan memungkinkan pengguna memilih dari menu tersebut.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Skrip yang Diperlukan</strong></td>
  <td><code>&lt;script async custom-element="amp-selector" src="https://ampjs.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>Semua</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-selector/">contoh amp-selector</a> di AMP By Example</td>
  </tr>
</table>


## Perilaku <a name="behavior"></a>

AMP selector adalah kontrol yang menampilkan daftar opsi dan memungkinkan pengguna memilih satu atau beberapa opsi. Isi opsi tidak terbatas pada teks.

* `amp-selector` dapat berisi sembarang elemen HTML atau komponen AMP (misalnya `amp-carousel`, `amp-img`, dll.).
* Sebuah `amp-selector` tidak boleh berisi kontrol `amp-selector` bertingkat.
* Opsi yang dapat dipilih bisa ditetapkan dengan menambahkan atribut `option` ke elemen dan menetapkan nilai ke atribut (misalnya `<li option='value'></li>`).
* Opsi yang dinonaktifkan dapat ditetapkan dengan menambahkan atribut `disabled` ke elemen (misalnya `<li option='d' disabled></li>`).
* Opsi yang dipilih sebelumnya dapat ditetapkan dengan menambahkan atribut `selected` ke elemen (misalnya `<li option='b' selected></li>`).
* Untuk mengizinkan beberapa pilihan, tambahkan atribut `multiple` ke elemen `amp-selector`.  Secara default, `amp-selector` memungkinkan satu pilihan pada satu waktu.
* Untuk menonaktifkan seluruh `amp-selector`, tambahkan atribut `disabled` ke elemen `amp-selector`.
* Apabila `amp-selector` berisi atribut `name`, dan `amp-selector` berada di dalam tag `form`, maka jika peristiwa kirim terjadi pada formulir, `amp-selector` akan berperilaku seperti grup tombol pilihan/kotak centang dan mengirim nilai yang dipilih (yang ditetapkan untuk opsi itu) ke nama `amp-selector`.

Contoh:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">None of the Above</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Menghapus pilihan <a name="clearing-selections"></a>

Untuk menghapus semua pilihan saat sebuah elemen di-tap atau diklik, tetapkan atribut tindakan [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) pada elemen tersebut, dan tentukan `id` AMP Selector dengan metode tindakan `clear`.

Contoh:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
Lihat demo langsung di [AMP By Example](https://ampbyexample.com/components/amp-selector/)
[/tip]

## Atribut <a name="attributes"></a>

### Atribut pada `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Atribut di atas berperilaku dengan cara yang sama seperti pada HTML standar <code>select</code> element [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>Atribut <code>keyboard-select-mode</code> menentukan perilaku navigasi keyboard untuk opsi di dalam <code>amp-selector</code>.

    <ul><li><code>none</code>  (default): Tombol tab mengubah fokus antar-item dalam <code>amp-selector</code>. Pengguna harus menekan Enter atau spasi untuk mengubah pilihan. Tombol panah dinonaktifkan.</li>
    <li><code>focus</code>: Tombol tab memberikan fokus pada <code>amp-selector</code>. Pengguna berpindah-pindah item menggunakan tombol panah. Harus menekan spasi atau Enter untuk mengubah pilihan.</li><li>
    <code>select</code>: Tombol tab memberikan fokus pada <code>amp-selector</code>. Pilihan berubah saat pengguna berpindah-pindah opsi menggunakan tombol panah.</li></ul></td>
  </tr>
    </table>

### Atribut pada opsi `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Menunjukkan bahwa opsi dapat dipilih.  Jika ada nilai yang ditentukan, isi nilai tersebut akan dikirim bersama formulir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Atribut di atas berperilaku dengan cara yang sama seperti pada elemen HTML standar [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) .</td>
  </tr>
</table>

## Peristiwa <a name="events"></a>

Peristiwa dapat memicu tindakan pada komponen AMP lain yang menggunakan atribut `on`.
Misalnya `on="select: my-tab.show"`

Baca lebih lanjut tentang [Tindakan dan Peristiwa AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code> memicu peristiwa <code>select</code> saat pengguna memilih sebuah opsi.
    Multi-selector dan single-selector mengaktifkan peristiwa tersebut saat pengguna memilih atau batal memilih opsi.
    Menge-tap opsi yang dinonaktifkan tidak akan memicu peristiwa <code>select</code>.
    <ul>
    <li>
      <code>event.targetOption</code> berisi nilai atribut <code>option</code> dari elemen yang dipilih.</li>
      <li>
    <code>event.selectedOptions</code> berisi array nilai atribut <code>option</code> dari semua elemen yang dipilih.
      </li>
      </ul></td>
    </tr>

  </table>

## Validasi <a name="validation"></a>

Lihat [aturan amp-selector](https://github.com/ampproject/amphtml/blob/main/extensions/amp-selector/validator-amp-selector.protoascii) dalam spesifikasi validator AMP.
