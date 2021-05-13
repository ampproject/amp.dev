---
'$title': Menggunakan Penampil AMP untuk merender email
$order: 5
author: alabiaga
formats:
  - email
---

Klien email yang ingin mendukung AMP untuk Email harus menggunakan [Penampil AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) untuk mengelola email AMP pengirim mereka. Penampil yang dibuat dengan [perpustakaan Penampil AMP](https://github.com/ampproject/amphtml/tree/main/extensions/amp-viewer-integration) menyelubungi dokumen AMP dan memungkinkan [kemampuan](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) yang mengizinkan komunikasi dua arah dengan dokumen AMP melalui postMessage. Kemampuan ini meliputi pemberian kontrol atas visibilitas email, penyampaian metrik pengguna, dan menyediakan alat untuk memastikan keamanan permintaan XHR yang dibuat dari email.

## Pencegatan XHR Penampil

Kemampuan `xhrInterceptor` perpustakaan Penampil AMP memungkinkan penampil mencegah permintaan XHR yang keluar. Penampil AMP dapat mengintrospeksi sebuah permintaan untuk mengetahui validitas dan niatnya untuk memastikan perlindungan dan privasi penggunanya.

#### Permintaan XHR

Komponen AMP, seperti [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) dan [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email), memerlukan panggilan ke endpoint untuk memuat atau mengambil data. Panggilan ini digolongkan sebagai permintaan XHR.

#### Komunikasi dokumen AMP dan Penampil

Protokol yang digunakan untuk komunikasi di antara penampil dan dokumen AMP dicapai melalui [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Berikut ini adalah contoh kecil tentang postMessage yang berfungsi dalam kasus penggunaan pencegatan XHR, di mana penampil menangani postMessage XHR yang dikirimkan dari dokumen AMP dan menghasilkan tanggapan kustom.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Mengaktifkan pencegatan XHR

Aktifkan pencegatan XHR dengan memilih penampil ke dalam kemampuan xhrInterceptor pada saat inisialisasi. Silakan lihat contoh penampil tentang cara melakukan ini dan contoh tentang pencegatan XHR. Dokumen AMP harus menerima untuk mengizinkan pencegatan XHR. Dokumen menerima dengan menambahkan atribut `allow-xhr-interception` ke tag `<html amp4email>`. Klien email harus memasang atribut ini pada dokumen AMP sebelum merendernya karena ini adalah atribut yang diniatkan invalid dan akan ditandai demikian dalam validasi dokumen AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Perenderan templat sisi server penampil

Kemampuan `viewerRenderTemplate` memungkinkan penampil untuk mengelola perenderan templat [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) dan [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Setelah aktif, runtime AMP mewakili permintaan yang berisi panggilan XHR asli, data templat, dan detail lain apa pun yang diperlukan untuk perenderan konten komponen ke penampil. Ini memungkinkan penampil untuk menginstropeksi konten data endpoint dan mengelola perenderan [misai (mustache)](https://mustache.github.io/) atas templat untuk memverifikasi dan mengamankan data. Harap ketahui bahwa jika kemampuan ini diaktifkan bersama xhrInterceptor, di dalam komponen amp-form dan amp-list, kemampuan `viewerRenderTemplate` yang juga mewakili permintaan ke penampil akan mengungguli xhrInterceptor.

Contoh [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) memperlihatkan bagaimana cara menangani pesan `viewerRenderTemplate` yang dikirimkan dari dokumen AMP. Di dalam contoh tersebut, Viewer.prototype.processRequest\_ menangkap pesan `viewerRenderTemplate` dan berdasarkan jenis komponen AMP yang tersedia di dalam permintaan, mengirimkan kembali HTML untuk dirender di dalam format JSON berikut ini.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Ini adalah contoh kecil di mana tidak ada ketergantungan perpustakaan [misai (mustache)](https://mustache.github.io/) atau sanitasi konten.

Diagram di bawah ini menggambarkan contoh yang lebih nyata tentang cara dokumen AMP di dalam penampil klien email dengan kemampuan `viewerRenderTemplate` dapat menangani perenderan templat [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Runtime AMP akan mewakili permintaan pengambilan data komponen [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) ke penampil, yang pada gilirannya akan meneruskan permintaan ini ke server klien email. Server akan mengumpan URL ini dan hasil pengambilan URL melalui berbagai layanan, mungkin memeriksa validitas URL, konten data yang dihasilkan dari URL itu, dan merender templat [misai (mustache)](https://mustache.github.io/) dengan data itu. Lalu, templat yang dirender akan dikembalikan dan dikirimkan kembali ke penampil di dalam format tanggapan JSON berikut ini.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

Nilai HTML dalam payload JSON adalah apa yang dimasukkan ke dalam dokumen AMP untuk perenderan.

Tabel di bawah ini menguraikan kemampuan dan komponen yang terpengaruh:

<table>
  <thead>
    <tr>
      <th width="30%">Kemampuan penampil</th>
      <th>Komponen yang terpengaruh</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
