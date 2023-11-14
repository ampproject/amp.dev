---
'$title': Kemudahan akses offline dan peningkatan kinerja
$order: 11
description: Pekerja Layanan (Service Worker) adalah proksi sisi klien yang berada di antara halaman Anda dan server, dan digunakan untuk membangun pengalaman offline yang fantastis, pemuatan cepat ....
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Pekerja layanan](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) memungkinkan pengalaman offline yang kaya dan pengalaman pengguna yang konsisten di berbagai kekuatan jaringan. Dengan menyimpan sumber daya di dalam browser, aplikasi web dapat menyediakan data, aset, dan halaman offline kepada pengguna agar mereka tetap terlibat dan mendapatkan informasi.

Ingat: Service Worker tidak akan dapat berinteraksi dengan versi halaman yang tersimpan dalam cache AMP. Gunakan untuk melanjutkan perjalanan berikutnya ke halaman asli.

## Menambahkan Manifes Aplikasi Web

Ketika pengguna membuka [Examples](../../../documentation/examples/index.html) dari platform yang mendukung AMP lalu lanjut mengklik ke situs yang sama, mereka keluar dari Cache AMP ke halaman asli. Tentunya situs masih menggunakan koleksi AMP, namun karena saat ini ditayangkan di halaman asli, situs dapat menggunakan service worker, meminta penginstalan, dan lain-lain.

[tip type="tip"] **TIP –** Pelajari lebih lanjut tentang [Manifes Aplikasi Web di WebFundamentals](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/). [/tip]

Menambahkan [Manifes Aplikasi Web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) ke halaman AMP memastikan bahwa pengguna dapat menambahkan situs Anda ke layar utama perangkat mereka. Tidak ada yang istimewa tentang manifes Aplikasi Web di AMP.

Kemudian, tautkan manifes dari `<head>` halaman AMP:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Kemudian, tambahkan komponen berikut ini di tempat lain dalam `<body>` Anda (ubah agar mengarah ke Pekerja Layanan Anda yang sebenarnya):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Catatan: Jika konsep Service Worker merupakan hal baru bagi Anda, baca pendahuluan di WebFundamentals.<br>Service Worker adalah proxy sisi-klien yang berada di antara halaman da[n server, serta dapat digunaka](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)n untuk menciptakan pengalaman akses offline yang memuaskan, skenario pemuatan app shell yang cepat, dan mengirimkan notifikasi push.

## Pekerja Layanan AMP

Service Worker perlu didaftarkan pada halaman tertentu, karena jika tidak, browser tidak akan menemukan atau menjalankannya. Secara default, tindakan ini dilakukan dengan bantuan [sedikit JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Pada Halaman AMP, Anda menggunakan komponen [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) untuk melakukan hal yang sama.

[tip type="default"] **KIAT –** Pelajari tutorial kami untuk mengetahui cara menggunakan [Pekerja Layanan AMP di PWA Anda](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Menginstal Pekerja Layanan AMP

Untuk melakukannya, sertakan komponen [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) terlebih dahulu melalui skripnya pada `<head>` halaman Anda:

- [sourcecode:js] importScripts('https://ampjs.org/sw/amp-sw.js'); [/sourcecode]

- [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Selesai.

### Penyimpanan ke Cache Secara Otomatis

Pekerja Layanan AMP secara otomatis menyimpan berkas skrip AMP dan dokumen AMP di dalam cache. Dengan menyimpan berkas skrip AMP di dalam cache, berkas-berkas ini langsung tersedia untuk browser pengguna yang memungkinkan fungsionalitas saat offline dan halaman yang lebih cepat di jaringan yang tidak stabil.

Jika aplikasi Anda memerlukan jenis tertentu dari penyimpanan di cache untuk dokumen, Pekerja Layanan AMP memungkinkan penyesuaian. Seperti menambahkan daftar tolak untuk dokumen yang harus selalu diminta dari jaringan. Dalam contoh berikut ini, ganti `Array<RegExp>` dengan susunan ekspresi reguler yang mewakili dokumen yang tidak ingin Anda simpan di dalam cache.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Baca selengkapnya tentang [menyesuaikan penyimpanan dokumen di dalam cache di sini](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

### Mengoptimalkan Pekerja Layanan AMP

Untuk menggunakan Pekerja Layanan AMP secara maksimal, kolom opsional harus dikonfigurasi untuk menyimpan aset yang diperlukan di cache dan untuk mengambil tautan sebelumnya.

Aset yang mendorong kunjungan pengguna ke suatu halaman, seperti video, gambar penting, atau PDF yang dapat diunduh, harus disimpan di dalam cache sehingga dapat diakses kembali jika pengguna sedang offline.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Anda dapat menyesuaikan strategi penyimpanan di dalam cache dan menentukan daftar tolak.

Tautan ke halaman yang mungkin perlu dikunjungi pengguna Anda dapat diambil terlebih dahulu, sehingga memungkinkan untuk diakses saat offline. Ini dilakukan dengan menambahkan atribut `data-prefetch` ke tautan tag.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Pengalaman Offline

Sampaikan kepada pengguna bahwa mereka telah offline, dan harus mencoba memuat ulang situs ketika kembali online, dengan memasukkan halaman offline. Pekerja Layanan AMP dapat menyimpan halaman dan asetnya ke dalam cache.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

Halaman offline yang berhasil tampak seperti bagian dari situs Anda dengan memiliki UI yang konsisten terhadap bagian lain aplikasi.

### Pembaruan Paksa

Tim kami sedang bekerja untuk menerapkan fitur pembaruan/penghapusan paksa jika Pekerja Layanan AMP Anda perlu dinonaktifkan atau diubah jika ada kesalahan saat melakukan penerapan pada pengguna.

Agar dapat mengelola pekerja server secara efektif, Anda harus memahami bagaimana [cache HTTP standar memengaruhi cara JavaScript pekerja layanan Anda tetap diperbarui](https://developers.google.com/web/updates/2018/06/fresher-sw). Pekerja layanan yang diberikan arahan yang sesuai untuk penyimpanan HTTP di cache dapat menyelesaikan perbaikan bug kecil dengan membuat perubahan yang sesuai dan menerapkan ulang pekerja layanan Anda ke lingkungan pengelola Anda. Jika Anda perlu untuk menghapus pekerja layanan, baik untuk menyimpan berkas pekerja layanan yang sederhana, [no-op](https://en.wikipedia.org/wiki/NOP) (tidak operasional) yang berguna, seperti berikut ini:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [Bacalah lebih lanjut](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) tentang mengelola pekerja layanan yang digunakan. [/tip]

## Meluaskan Halaman AMP melalui Service Worker

Anda dapat menggunakan teknik di atas untuk mengaktifkan akses offline ke situs web AMP, serta meluaskan halaman **segera setelah ditayangkan dari asalnya**. Hal ini terjadi karena Anda dapat mengubah respons melalui peristiwa `fetch` Pekerja Layanan, dan menghasilkan respons apa pun yang Anda inginkan:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Ubah respons di sini sebelum hilang..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Dengan menggunakan teknik ini, Anda dapat mengubah Halaman AMP dengan segala fungsi tambahan yang perlu dilakukan agar tidak menggagalkan [validasi AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), misalnya:

- Fitur dinamis yang memerlukan JS kustom.
- Komponen yang disesuaikan/hanya relevan untuk situs Anda.
