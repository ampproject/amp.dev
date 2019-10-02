---
$title: Berintegrasi dengan AMP untuk menayangkan iklan display
---

Panduan ini diperuntukkan bagi jaringan iklan yang ingin berintegrasi dengan AMP untuk menayangkan iklan display ke halaman AMP.

## Ringkasan

Sebagai server iklan, Anda dapat berintegrasi dengan AMP untuk menayangkan iklan HTML biasa ke halaman AMP, serta menayangkan iklan [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Ingin menayangkan iklan HTML biasa?

1.  [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Ingin menayangkan iklan AMPHTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (misalnya jika Anda belum membuat implementasi untuk menayangkan iklan HTML biasa)
2. [Buat integrasi Fast Fetch untuk menayangkan iklan AMPHTML](#creating-a-fast-fetch-integration).

## Membuat implementasi `amp-ad` <a name="creating-an-amp-ad"></a>

Sebagai server iklan, penayang yang Anda dukung menyertakan library JavaScript yang Anda sediakan dan menempatkan berbagai "cuplikan iklan" yang mengandalkan library JavaScript untuk mengambil iklan dan merendernya di situs penayang. Karena AMP tidak mengizinkan penayang untuk menjalankan JavaScript arbitrer, Anda harus berkontribusi pada kode open-source AMP untuk mengizinkan tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) meminta iklan dari server iklan.

[tip type="note"]
Anda dapat menggunakan implementasi [`amp-ad`](../../../documentation/components/reference/amp-ad.md)  ini untuk menampilkan iklan HTML biasa **dan** iklan AMPHTML.
[/tip]

Misalnya, server Amazon A9 dapat dijalankan dengan menggunakan sintaks berikut:

```html
<amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

Dalam kode di atas, atribut `type` menentukan jaringan iklan, dalam hal ini A9. Atribut `data-*` bergantung pada parameter yang diharapkan oleh server Amazon A9 untuk menayangkan iklan. File [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) menunjukkan bagaimana parameter dipetakan untuk membuat panggilan JavaScript ke URL server A9. Parameter terkait yang diteruskan oleh tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md)  ditambahkan ke akhir URL untuk menampilkan iklan.

Untuk mempelajari cara membuat integrasi [`amp-ad`](../../../documentation/components/reference/amp-ad.md), lihat [Mengintegrasikan jaringan iklan ke dalam AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Membuat integrasi Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) adalah mekanisme AMP yang memisahkan permintaan iklan dari respons iklan, sehingga permintaan iklan dapat muncul lebih awal dalam siklus proses halaman, dan hanya merender iklan yang kemungkinan akan dilihat oleh pengguna. Fast Fetch memberikan perlakuan khusus pada iklan AMPHTML terverifikasi, dibandingkan pada iklan HTML biasa. Dalam Fast Fetch, jika gagal dalam validasi, iklan akan digabungkan dalam iframe lintas-domain untuk membatasi aksesnya dari elemen lain dalam dokumen AMP. Sebaliknya, iklan AMPHTML yang lolos validasi langsung ditulis ke halaman. Fast Fetch menangani iklan AMP dan non-AMP; tidak ada permintaan iklan tambahan yang dibutuhkan untuk iklan yang gagal validasi.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Alur Integrasi Fast Fetch' ) }}

Untuk menampilkan iklan AMPHTML dari server iklan, Anda harus memberikan integrasi Fast Fetch yang:

1.  Mendukung komunikasi jaringan SSL.
1.  Menyediakan JavaScript untuk membuat permintaan iklan (contoh implementasi: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
1.  Memvalidasi dan menandatangani materi iklan melalui layanan validasi. [Cloudflare](https://blog.cloudflare.com/firebolt/) menyediakan layanan verifikasi iklan AMP, sehingga penyedia iklan independen dapat menayangkan iklan yang lebih cepat, lebih ringan, dan lebih menarik.

Untuk mempelajari cara membuat integrasi Fast Fetch, lihat [Panduan Implementasi Jaringan Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).

## Referensi terkait

*   [Direktori GitHub untuk semua ekstensi amp-ad](https://github.com/ampproject/amphtml/tree/master/ads)
*   [Daftar vendor iklan yang didukung](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
*   [Postingan blog yang menjelaskan peluncuran Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
