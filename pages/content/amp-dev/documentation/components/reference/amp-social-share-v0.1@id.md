---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: The share tracking feature is under development.
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



Menampilkan tombol berbagi di platform sosial.


<table>
  <tr>
    <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-social-share/">contoh amp-social-share</a> di AMP By Example.</td>
  </tr>
</table>

## Ringkasan <a name="overview"></a>

Komponen `amp-social-share` menampilkan tombol berbagi untuk sejumlah penyedia media sosial.

## Contoh <a name="examples"></a>

**Contoh: Tombol berbagi sosial dasar**

Tombol berbagi otomatis menebak beberapa setelan default untuk sejumlah penyedia yang dikonfigurasi sebelumnya. Tombol berbagi mengasumsikan bahwa URL kanonis dokumen saat ini adalah URL yang ingin Anda bagikan, dan judul halamannya adalah teks yang ingin Anda bagikan.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Contoh: Meneruskan parameter**

Jika ingin meneruskan parameter ke endpoint berbagi, Anda dapat menentukan `data-param-<attribute>` yang akan ditambahkan ke akhir endpoint berbagi.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn adalah salah satu penyedia yang dikonfigurasi sebelumnya, sehingga Anda tidak perlu menyediakan atribut `data-share-endpoint`.

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (wajib)</strong></td>
    <td>Memilih jenis penyedia. Atribut ini wajib baik untuk penyedia yang telah maupun yang tidak dikonfigurasi sebelumnya.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Menentukan tempat di mana target akan dibuka. Defaultnya adalah <code>&#95;blank</code> untuk semua kasus selain email/SMS pada iOS, yang dalam hal ini target ditetapkan ke <code>&#95;top</code>.
        Harap perhatikan bahwa kami hanya menyarankan penggunaan penggantian ini untuk email.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Atribut ini <strong>wajib untuk penyedia yang tidak dikonfigurasi</strong>.
        <br>
          Beberapa penyedia populer memiliki endpoint berbagi yang dikonfigurasi sebelumnya. Untuk selengkapnya, baca bagian <a href="#pre-configured-providers">Penyedia yang Dikonfigurasi Sebelumnya</a>. Untuk penyedia yang tidak dikonfigurasi, Anda harus menentukan endpoint berbagi.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Semua atribut dengan prefiks <code>data-param-*</code> diubah menjadi parameter URL dan diteruskan ke endpoint berbagi.</td>
        </tr>
      </table>

## Penyedia yang dikonfigurasi sebelumnya <a name="pre-configured-providers"></a>

Komponen `amp-social-share` menyediakan [beberapa penyedia yang dikonfigurasi sebelumnya](0.1/amp-social-share-config.js) yang mengetahui endpoint berbaginya serta beberapa parameter default.

<table>
  <tr>
    <th class="col-twenty">Penyedia</th>
    <th class="col-twenty">Jenis</th>
    <th>Parameter</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Share API</a> (memicu dialog berbagi OS)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: opsional, didefaultkan ke: "Judul halaman saat ini"</li>
        <li><code>data-mode</code>: opsional, jika ditetapkan ke <code>replace</code>, semua opsi berbagi lainnya akan dihapus.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Email</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: opsional, didefaultkan ke: Judul halaman saat ini</li>
        <li><code>data-param-body</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-recipient</code>: opsional, didefaultkan ke: '' (string kosong)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>wajib</strong>, didefaultkan ke: none. Parameter ini adalah <code>app_id</code> Facebook yang diperlukan untuk <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">dialog Berbagi Facebook</a>.</li>
        <li><code>data-param-href</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-quote</code>: opsional. Dapat digunakan untuk membagikan kutipan atau teks.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: opsional (tapi sangat direkomendasikan untuk ditetapkan), didefaultkan ke: none. URL untuk media yang akan dibagikan di Pinterest. Jika tidak ditetapkan, pengguna akhir akan diminta untuk mengupload media oleh Pinterest.</li>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-description</code>: opsional, didefaultkan ke: Judul halaman saat ini</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: opsional, didefaultkan ke: Judul halaman saat ini</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: opsional, didefaultkan ke: Judul halaman saat ini</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Whatsapp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: opsional, didefaultkan ke: "Judul halaman saat ini - URL halaman saat ini"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: opsional, didefaultkan ke: URL <code>rel=canonical</code></li>
        <li><code>data-param-text</code>: opsional, didefaultkan ke: Judul halaman saat ini</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: opsional, didefaultkan ke: URL <code>rel=title - rel=canonical</code></li></ul>
      </td>
    </tr>
  </table>

## Penyedia yang tidak dikonfigurasi <a name="non-configured-providers"></a>

Selain penyedia yang dikonfigurasi sebelumnya, Anda dapat menggunakan penyedia yang tidak dikonfigurasi dengan menentukan atribut tambahan pada komponen `amp-social-share`.

**Contoh: Membuat tombol berbagi untuk penyedia yang tidak dikonfigurasi**

Contoh berikut membuat tombol berbagi melalui Facebook Messenger dengan menetapkan atribut `data-share-endpoint` ke endpoint yang benar untuk protokol kustom Facebook Messenger.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Karena penyedia ini tidak dikonfigurasi sebelumnya, Anda harus membuat gambar dan gaya tombol yang sesuai untuk penyedia tersebut.

## Gaya <a name="styles"></a>

### Gaya Default <a name="default-styles"></a>

Secara default, `amp-social-share` menyertakan beberapa penyedia populer yang dikonfigurasi sebelumnya. Tombol untuk penyedia tersebut disesuaikan dengan warna dan logo resmi penyedia. Lebar default adalah 60 piksel dan tinggi default adalah 44 piksel.

[tip type="success"]
Kunjungi [AMP Start](https://ampstart.com/components#links-and-sharing) untuk link berbagi yang responsif dan sudah diberi gaya sebelumnya, yang dapat digunakan di halaman AMP Anda.
[/tip]

### Gaya Kustom <a name="custom-styles"></a>

Terkadang Anda ingin memberikan gaya Anda sendiri. Anda dapat mengganti gaya yang disediakan dengan mudah, seperti berikut:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Penggantian Variabel <a name="variable-substitution"></a>

Anda dapat menggunakan [penggantian variabel AMP global](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) dalam elemen `<amp-social-share>`. Pada contoh di bawah, `TITLE` diganti dengan judul halaman dan `CANONICAL_URL` diganti dengan URL kanonis dokumen.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Validasi <a name="validation"></a>

Lihat [aturan amp-social-share](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii) dalam spesifikasi validator AMP.
