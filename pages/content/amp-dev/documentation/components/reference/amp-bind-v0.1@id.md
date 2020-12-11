---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: Allows elements to mutate in response to user actions or data changes via data binding and simple JS-like expressions.
---



Menambahkan interaktivitas kustom dengan data binding dan ekspresi.


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


<table>
  <tr>
    <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Contoh kode pengantar dengan anotasi</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Contoh carousel gambar tertaut dengan anotasi</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Contoh halaman produk e-commerce dengan anotasi</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Tutorial</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Membuat halaman AMP yang interaktif</a></td>
  </tr>
</table>

# Ringkasan <a name="overview"></a>

Komponen `amp-bind` memungkinkan Anda untuk menambahkan interaktivitas stateful kustom ke halaman AMP melalui data binding dan ekspresi yang mirip JS.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Tonton video ini untuk mengenal amp-bind.</figcaption></figure>

# Contoh sederhana <a name="a-simple-example"></a>

Pada contoh berikut, menge-tap tombol akan mengubah teks elemen `<p>` dari "Hello World" menjadi "Hello amp-bind".

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
Untuk menjaga performa dan menghindari risiko loncatan konten, `amp-bind` tidak mengevaluasi ekspresi saat halaman dimuat. Ini berarti elemen visual harus diberi status default dan tidak mengandalkan `amp-bind` untuk render awal.
[/tip]

### Bagaimana cara kerjanya? <a name="how-does-it-work"></a>

`amp-bind` memiliki tiga komponen utama:

1. [Status](#state): Status JSON lingkup dokumen yang dapat berubah. Pada contoh di atas, status masih kosong sebelum tombol di-tap.  Setelah tombol di-tap, statusnya menjadi `{foo: 'amp-bind'}`.
2. [Ekspresi](#expressions): Merupakan ekspresi mirip JavaScript yang dapat merujuk ke **state**. Contoh di atas memiliki ekspresi tunggal, `'Hello ' + foo`, yang menggabungkan literal string `'Hello '`dan variabel status `foo`.
Ada batas 100 operand yang dapat digunakan dalam sebuah ekspresi.
3. [Binding](#bindings): Merupakan atribut khusus dari bentuk `[properti]` yang menautkan properti elemen ke sebuah **expression**. Contoh di atas memiliki binding tunggal, `[text]`, yang akan mengubah `<p>` teks elemen setiap kali nilai ekspresi berubah.

`amp-bind` memerlukan penanganan khusus untuk memastikan kecepatan, keamanan, dan performa di halaman AMP.

### Contoh yang sedikit lebih rumit <a name="a-slightly-more-complex-example"></a>

```html
<!-- Store complex nested JSON data in <amp-state> elements. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<p><button on="tap:AMP.setState({currentAnimal: &#39;cat&#39;})">Set to Cat</button>
```

  Ketika tombol ditekan:

  1. **Status** diubah dengan `currentAnimal` yang ditetapkan ke `'cat'`.
  1. **Ekspresi** yang bergantung pada `currentAnimal` dievaluasi:

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. **Binding** yang bergantung pada ekspresi yang telah diubah akan diubah:

    * Teks elemen `<p>` pertama akan berbunyi "This is a cat.".
    * Atribut `class` elemen `<p>` kedua akan menjadi "redBackground".
    * Elemen `amp-img` akan menampilkan gambar seekor kucing.</li>

  [tip type="success"]
[Cobalah **demo langsung**](https://ampbyexample.com/components/amp-bind/) untuk contoh ini dengan anotasi kode.
[/tip]

# Detail <a name="details"></a>

# Status <a name="state"></a>

Setiap dokumen AMP yang menggunakan `amp-bind` memiliki data JSON lingkup dokumen yang dapat diubah, atau **status**.

# Menginisialisasi status dengan `amp-state` <a name="initializing-state-with-amp-state"></a>

Status `amp-bind` dapat diinisialisasi dengan komponen `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[Ekspresi](#expressions) dapat merujuk variabel status melalui sintaks titik. Dalam contoh ini, `myState.foo` akan mengevaluasi `"bar"`.

* JSON turunan elemen `<amp-state>` memiliki ukuran maksimal 100 KB.
* Elemen `<amp-state>` juga dapat menentukan URL CORS, bukan skrip JSON turunan. Lihat [Apendiks](#amp-state-specification) untuk mengetahui detailnya.

# Me-refresh status <a name="refreshing-state"></a>

Tindakan `refresh` didukung oleh komponen ini dan dapat digunakan untuk me-refresh konten status.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Mengubah status dengan `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

Tindakan [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) menggabungkan literal objek ke dalam status. Misalnya, saat tombol di bawah ditekan, `AMP.setState()` akan [menggabungkan secara mendalam](#deep-merge-with-ampsetstate) literal objek dengan status.

```html
<!-- Like JavaScript, you can reference existing
      variables in the values of the  object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

Secara umum, objek bertingkat akan digabungkan hingga kedalaman maksimal 10. Semua variabel, termasuk yang diperkenalkan oleh `amp-state`, dapat diganti.

Jika dipicu oleh peristiwa tertentu, `AMP.setState()` juga dapat mengakses data terkait peristiwa di properti `event`.

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
  <input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Mengubah histori dengan `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

Tindakan [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) mirip dengan `AMP.setState()` kecuali tindakan ini juga mendorong entri baru ke tumpukan histori browser. Memunculkan entri histori ini (misalnya dengan menavigasi mundur) akan memulihkan nilai variabel sebelumnya yang ditetapkan oleh `AMP.pushState()`.

Misalnya:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* Menge-tap tombol tersebut akan menetapkan variabel `foo` ke 123 dan mengirimkan entri histori baru.
* Menavigasi mundur akan memulihkan `foo` ke nilai sebelumnya, "bar" (setara dengan memanggil `AMP.setState({foo: 'bar'})`.

# Ekspresi <a name="expressions"></a>

Ekspresi mirip dengan JavaScript dengan beberapa perbedaan penting.

# Perbedaan dengan JavaScript <a name="differences-from-javascript"></a>

* Ekspresi hanya dapat mengakses [status](#state) dokumen penampungnya.
* Ekspresi **tidak** memiliki akses ke elemen global seperti `window` atau `document`.
* Hanya operator dan [fungsi yang diizinkan](#allow-listed-functions) yang dapat digunakan.
* Fungsi, class, dan loop kustom secara umum tidak diizinkan. Fungsi panah diizinkan sebagai parameter, misalnya `Array.prototype.map`.
* Indeks array melebihi batas dan variabel yang tidak ditentukan akan menampilkan `null`, bukan `undefined` atau memunculkan error.
* Ekspresi tunggal saat ini dibatasi 50 operand untuk menjaga performa. Harap [hubungi kami](https://github.com/ampproject/amphtml/issues/new) jika alokasi ini tidak memadai untuk kasus penggunaan Anda.

Implementasi dan tata bahasa lengkap ekspresi dapat dilihat di [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/master/extensions/amp-bind/0.1/bind-expr-impl.jison) dan [bind-expression.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-bind/0.1/bind-expression.js).

# Contoh <a name="examples"></a>

Berikut adalah semua ekspresi yang valid:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Fungsi yang diizinkan <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Jenis objek </th>
    <th>Fungsi</th>
    <th>Contoh</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
    <pre>// Returns [1, 2, 3].
[3, 2, 1].sort()</pre>
    <pre>// Returns [1, 3, 5].
[1, 2, 3].map((x, i) => x + i)</pre>
    <pre>// Returns 6.
[1, 2, 3].reduce((x, y) => x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
      (3.14).toFixed()</pre>
            <pre>// Returns '3.14'.
      (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                      keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                      values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>Fungsi panah parameter tunggal tidak dapat menggunakan tanda kurung, misalnya gunakan `x => x + 1` bukan `(x) => x + 1`. Selain itu, `sort()` dan `splice()` akan menampilkan salinan termodifikasi, bukan mengoperasikan in-place.
<sup>2</sup>Fungsi statis tidak di-namespace, misalnya gunakan `abs(-1)`, bukan `Math.abs(-1)`.

# Menentukan makro dengan `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

Fragmen ekspresi `amp-bind` dapat digunakan kembali dengan menentukan `amp-bind-macro`. Elemen `amp-bind-macro` memungkinkan Anda menentukan ekspresi yang memerlukan nol atau lebih argumen dan merujuk ke status saat ini. Makro dapat dipanggil seperti fungsi dengan merujuk nilai atribut `id`-nya dari mana saja dalam dokumen Anda.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Makro juga dapat memanggil makro lain yang <i>ditentukan sebelum makro itu sendiri</i>. Makro tidak dapat memanggil dirinya sendiri secara berulang.

# Binding <a name="bindings"></a>

**Binding** adalah atribut khusus dari bentuk `[property]` yang menautkan properti sebuah elemen ke sebuah [ekspresi](#expressions). Sintaks alternatif yang kompatibel dengan XML juga dapat digunakan dalam bentuk `data-amp-bind-property`.

Ketika **status** berubah, ekspresi dievaluasi ulang dan properti elemen terikat akan diubah dengan hasil ekspresi baru.

`amp-bind` mendukung data binding di empat jenis status elemen:

<table>
  <tr>
    <th>Jenis</th>
    <th>Atribut</th>
    <th>Detail</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Didukung pada sebagian besar elemen teks.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">Class CSS</a></td>
    <td><code>[class]</code></td>
    <td>Hasil ekspresi harus berupa string yang dipisahkan spasi.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden">Atribut <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Harus berupa ekspresi boolean.</td>
  </tr>
  <tr>
    <td>Ukuran <a href="../../../documentation/components/index.html">elemen AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Mengubah lebar dan/atau tinggi elemen AMP.</td>
  </tr>
  <tr>
    <td>Atribut khusus elemen</td>
    <td><a href="#element-specific-attributes">Bervariasi</a></td>
    <td></td>
  </tr>
</table>

Catatan tentang binding:

* Demi keamanan, binding ke `innerHTML` tidak diizinkan.
* Semua binding atribut dibersihkan dari nilai yang tidak aman (misalnya `javascript:`).
* Hasil ekspresi boolean mengalihkan atribut boolean. Misalnya: `<amp-video [controls]="expr"...>`. Saat `expr` dievaluasi ke `true`, elemen `<amp-video>` memiliki atribut `controls`. Saat `expr` dievaluasi ke `false`, atribut `controls` akan dihapus.
* Karakter tanda kurung `[` dan `]` dalam nama atribut dapat menyulitkan saat menulis XML (misalnya XHTML, JSX) atau menulis atribut melalui DOM API. Dalam kasus ini, gunakan sintaks alternatif `data-amp-bind-x="foo"`, bukan `[x]="foo"`.

# Atribut khusus elemen <a name="element-specific-attributes"></a>

Hanya binding ke komponen dan atribut berikut yang diizinkan:

<table>
  <tr>
    <th>Komponen</th>
    <th>Atribut</th>
    <th>Perilaku</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Mengubah video Brightcove yang ditampilkan.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Mengubah indeks slide yang sedang ditampilkan. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Lihat contoh</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Menetapkan tanggal paling awal yang dapat dipilih<br>
      Menetapkan tanggal paling akhir yang dapat dipilih
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Menampilkan dokumen pada URL yang diubah.<br>Mengubah judul dokumen.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Mengubah URL sumber iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>Saat melakukan binding ke <code>[src]</code>, pastikan Anda juga melakukannya ke <code>[srcset]</code> agar binding berfungsi pada cache.<br>Lihat <a href="amp-img.md#attributes">atribut amp-img</a> yang terkait.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Mengaktifkan tampilan lightbox. Tips: Gunakan <code>on="lightboxClose: AMP.setState(...)"</code> untuk mengubah variabel ketika lightbox ditutup.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Jika ekspresi berupa string, mengambil dan merender JSON dari URL string. Jika ekspresi berupa objek atau array, merender data ekspresi.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Mengubah elemen turunan terpilih saat ini<br>yang diidentifikasi oleh nilai atribut <code>option</code>-nya. Mendukung daftar dipisahkan koma yang memuat nilai untuk beberapa pilihan. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Lihat contoh</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Mengambil JSON dari URL baru dan menggabungkannya ke dalam status yang ada. <em>Perhatikan bahwa perubahan berikut akan mengabaikan elemen <code>&lt;amp-state&gt;</code> untuk mencegah siklus.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>Melihat <a href="amp-video.md#attributes">atribut amp-video</a> yang terkait.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Mengubah video YouTube yang ditampilkan.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Mengubah link.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">atribut tombol</a> yang terkait.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">atribut detail</a> yang terkait.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Mengaktifkan atau menonaktifkan fieldset.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">atribut gambar</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">atribut input</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">atribut opsi</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">atribut optgroup</a> yang terkait</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">atribut pilih</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">atribut sumber</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">atribut track</a> yang terkait.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>Melihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">atribut textarea</a> yang terkait.</td>
    </tr>
  </table>

  <sup>*</sup>Menunjukkan atribut yang dapat diikat yang tidak memiliki pasangan yang tidak dapat diikat.

# Debugging <a name="debugging"></a>

Jalankan pengujian dalam mode pengembangan (dengan fragmen URL `#development=1`) untuk menandai peringatan dan error selama pengembangan dan untuk mengakses fungsi debug khusus.

# Peringatan <a name="warnings"></a>

Dalam mode pengembangan, `amp-bind` akan mengeluarkan peringatan saat nilai default atribut terikat tidak cocok dengan hasil awal ekspresi yang terkait. Hal ini dapat membantu mencegah mutasi tak terduga yang disebabkan oleh perubahan pada variabel status lainnya. Contoh:

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
so a warning will be issued in development mode. -->

<p class="def" [class]="abc"></p>

```

Dalam mode pengembangan, `amp-bind` juga akan mengeluarkan peringatan saat menghilangkan referensi ke properti atau variabel yang tidak ditentukan. Hal ini juga dapat membantu mencegah mutasi tak terduga akibat hasil ekspresi `null`. Contoh:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->

<p [text]="myAmpState.bar">Some placeholder text.</p>

```

# Error <a name="errors"></a>

Ada beberapa jenis error runtime yang mungkin ditemui ketika bekerja dengan `amp-bind`.

<table>
  <tr>
    <th>Jenis</th>
    <th>Pesan</th>
    <th>Saran</th>
  </tr>
  <tr>
    <td class="col-thirty">Binding tidak valid</td>
    <td class="col-fourty"><em>Binding to [someBogusAttribute] on &lt;P> is not allowed</em>.</td>
    <td class="col-thirty">Gunakan hanya <a href="#element-specific-attributes">binding yang disetujui</a>.</td>
  </tr>
  <tr>
    <td>Error sintaks</td>
    <td><em>Expression compilation error in...</em></td>
    <td>Verifikasi ekspresi dari kesalahan ketik.</td>
  </tr>
  <tr>
    <td>Fungsi tidak diizinkan</td>
    <td><em>alert is not a supported function.</em></td>
    <td>Gunakan hanya <a href="#allow-listed-functions">fungsi yang diizinkan</a>.</td>
  </tr>
  <tr>
    <td>Hasil yang dibersihkan</td>
    <td><em>"javascript:alert(1)" is not a valid result for [href].</em></td>
    <td>Hindari protokol URL atau ekspresi dilarang yang akan menggagalkan Validator AMP.</td>
  </tr>
  <tr>
    <td>Pelanggaran CSP</td>
    <td><em>Refused to create a worker from 'blob:...' because it violates the following Content Security Policy directive...</em></td>
    <td>Tambahkan <code>default-src blob:</code> ke Kebijakan Keamanan Konten asal. <code>amp-bind</code> mendelegasikan pekerjaan penting ke <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">Pekerja Web khusus</a> untuk memastikan performa yang baik.</td>
  </tr>
</table>

# Men-debug Status <a name="debugging-state"></a>

Gunakan `AMP.printState()` untuk mencetak status saat ini ke konsol.

# Lampiran <a name="appendix"></a>

# Spesifikasi `<amp-state>` <a name="amp-state-specification"></a>

Elemen `amp-state` dapat berisi elemen `<script>` turunan **ATAU** atribut `src` yang berisi URL CORS ke endpoint JSON jarak jauh, tetapi tidak keduanya.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Pengelompokan XHR <a name="xhr-batching"></a>

AMP mengelompokkan XMLHttpRequest (XHR) ke endpoint JSON, artinya, Anda dapat menggunakan satu permintaan data JSON sebagai sumber data untuk banyak konsumen (misalnya beberapa elemen `<amp-list>`) di sebuah halaman AMP.  Sebagai contoh, jika elemen `amp-list` membuat XHR ke sebuah endpoint, sementara XHR sedang dalam periode tayang, semua XHR berikutnya ke endpoint yang sama tidak akan terpicu dan sebaliknya akan menampilkan hasil dari XHR pertama.

# Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>URL endpoint jarak jauh yang akan menampilkan JSON yang akan mengubah <code>amp-state</code>. Harus berupa layanan HTTP CORS.
        Atribut <code>src</code> memungkinkan semua substitusi variabel URL standar. Lihat <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">Panduan Substitusi</a> untuk informasi selengkapnya.
        [tip type="caution"] Endpoint harus mengimplementasikan persyaratan yang ditentukan dalam spesifikasi <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">permintaan CORS di AMP</a>.
        [/tip]</td>
    </tr>
    <tr>
      <td width="40%"><strong>credentials (opsional)</strong></td>
      <td>Menentukan opsi <code>credentials</code> seperti yang ditentukan oleh <a href="https://fetch.spec.whatwg.org/">Fetch API</a>.
        <ul>
          <li>Nilai yang didukung: `omit`, `include`</li>
          <li>Default: `omit`</li>
        </ul>
        Untuk mengirim kredensial, teruskan nilai <code>include</code>. Jika nilai ini ditetapkan, respons harus mengikuti <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">panduan keamanan CORS AMP</a>.</td>
      </tr>
    </table>

# Penggabungan mendalam dengan `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

Ketika `AMP.setState()` dipanggil, `amp-bind` akan menggabungkan secara mendalam literal objek yang disediakan dengan status saat ini. Semua variabel dari literal objek akan ditulis ke status secara langsung kecuali untuk objek bertingkat, yang akan digabung secara berulang. Primitive dan array dalam status akan selalu ditimpa oleh variabel dengan nama yang sama dalam literal objek.

Perhatikan contoh berikut:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

Saat tombol pertama ditekan, status akan berubah menjadi:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

Saat tombol kedua ditekan, `amp-bind` secara berulang akan menggabungkan argumen literal objek, `{employee: {age: 64}}`, ke dalam status yang ada.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` telah diubah, tetapi kunci `employee.name` dan `employee.vehicle` tidak berubah.

Perhatikan bahwa `amp-bind` akan memunculkan error jika Anda memanggil `AMP.setState()` dengan literal objek yang berisi referensi melingkar.

# Menghapus variabel <a name="circular-references"></a>

Hapus variabel status yang ada dengan menetapkan nilainya ke `null` di `AMP.setState()`. Dimulai dengan status dari contoh sebelumnya, menekan:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

akan mengubah status menjadi:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Demikian juga menekan:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

akan mengubah status menjadi:

```javascript
{
  <!-- State is empty -->
  }
```

# Tata bahasa ekspresi <a name="expression-grammar"></a>

Tata bahasa mirip BNF untuk ekspresi `amp-bind`:

```text
expr:
operation
| invocation
| member_access
| '(' expr ')'
| variable
| literal

operation:
    !' expr
    | '-' expr
    | '+' expr
    | expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | expr '%' expr
    | expr '&&' expr
    | expr '||' expr
    | expr '<=' expr
    | expr '<' expr
    | expr '>=' expr
    | expr '>' expr
    | expr '!=' expr
    | expr '==' expr
    | expr '?' expr ':' expr

  invocation:
      expr '.' NAME args

    args:
        (' ')'
        | '(' array ')'
        ;

      member_access:
          expr member
          ;

        member:
            .' NAME
            | '[' expr ']'

          variable:
              NAME
              ;

            literal:
                STRING
                | NUMBER
                | TRUE
                | FALSE
                | NULL
                | object_literal
                | array_literal

              array_literal:
                  [' ']'
                  | '[' array ']'

                array:
                    expr
                    | array ',' expr

                  object_literal:
                      {' '}'
                      | '{' object '}'

                    object:
                        key_value
                        | object ',' key_value

                      key_value:
                          expr ':' expr
```
