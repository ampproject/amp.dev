---
$title: Mengaktifkan fitur Progressive Web App untuk halaman AMP
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample memicu permintaan "Tambahkan ke Layar Utama".') }}

Banyak situs yang tidak akan memerlukan apa pun di luar batas AMP. [Examples](../../../documentation/examples/index.html), misalnya, yang merupakan AMP sekaligus Progressive Web App:

1. AMPbyExample memiliki [Manifes Aplikasi Web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), yang meminta banner “Tambahkan ke Layar Utama”.
1. AMPbyExample memiliki [Service Worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers), sehingga memungkinkan akses offline dan lain sebagainya.

Ketika pengguna membuka [Examples](../../../documentation/examples/index.html) dari platform yang mendukung AMP lalu lanjut mengklik ke situs yang sama, mereka keluar dari Cache AMP ke halaman asli. Tentunya situs masih menggunakan koleksi AMP, namun karena saat ini ditayangkan di halaman asli, situs dapat menggunakan service worker, meminta penginstalan, dan lain-lain.

Ingat: Service Worker tidak akan dapat berinteraksi dengan versi halaman yang tersimpan dalam cache AMP. Gunakan untuk melanjutkan perjalanan berikutnya ke halaman asli.

## Menambahkan Manifes Aplikasi Web

Menambahkan [Manifes Aplikasi Web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) ke halaman AMP memastikan bahwa pengguna dapat menambahkan situs Anda ke layar utama perangkat mereka. Tidak ada yang istimewa tentang manifes Aplikasi Web di AMP.

Pertama, buat manifes:

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

Kemudian, tautkan manifes dari `<head>` halaman AMP:

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

[tip type="tip"]
**TIP –** Pelajari lebih lanjut tentang [Manifes Aplikasi Web di WebFundamentals](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/).
[/tip]

## Menginstal Service Worker untuk mengaktifkan akses offline

Service Worker adalah proxy sisi-klien yang berada di antara halaman dan server, serta dapat digunakan untuk menciptakan pengalaman akses offline yang memuaskan, skenario pemuatan app shell yang cepat, dan mengirimkan notifikasi push.

Catatan: Jika konsep Service Worker merupakan hal baru bagi Anda, baca [pendahuluan di WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers).

Service Worker perlu didaftarkan pada halaman tertentu, karena jika tidak, browser tidak akan menemukan atau menjalankannya. Secara default, tindakan ini dilakukan dengan bantuan [sedikit JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Pada Halaman AMP, Anda menggunakan komponen [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) untuk melakukan hal yang sama.

Untuk melakukannya, sertakan komponen [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) terlebih dahulu melalui skripnya pada `<head>` halaman Anda:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Kemudian, tambahkan parameter berikut di tempat lain dalam `<body>` (ubah agar mengarah ke Service Worker sebenarnya):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Jika pengguna membuka halaman AMP di halaman asli (bukan klik pertama, yang biasanya ditayangkan dari Cache AMP), Service Worker akan mengambil alih dan dapat melakukan [banyak hal keren](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Meluaskan Halaman AMP melalui Service Worker

Anda dapat menggunakan teknik di atas untuk mengaktifkan akses offline ke situs AMP, serta meluaskan halaman **segera setelah situs ditayangkan dari halaman aslinya**. Hal ini terjadi karena Anda dapat mengubah respons melalui kejadian `fetch` Service Worker, dan mengembalikan respons apa pun yang diinginkan:

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

Dengan menggunakan teknik ini, Anda dapat mengubah Halaman AMP dengan segala fungsi
tambahan yang sebaliknya akan menggagalkan [validasi AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), misalnya:

* Fitur dinamis yang memerlukan JS kustom.
* Komponen yang disesuaikan/hanya relevan untuk situs Anda.
