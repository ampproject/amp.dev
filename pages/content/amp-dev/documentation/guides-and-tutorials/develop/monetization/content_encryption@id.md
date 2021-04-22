---
formats:
  - websites
'$title': Melindungi konten langganan Anda dengan enkripsi pihak klien
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Selesaikan masalah enkripsi konten ini dengan menerapkan validasi pelanggan premium dan dekripsi konten pada pihak atau sisi klien. Dengan solusi ini, pengguna dengan akses premium akan dapat mendekripsi konten tanpa perlu memuat halaman baru atau menunggu backend untuk menanggapi!
author: CrystalOnScript
---

Jika Anda melakukan publikasi online, Anda mungkin mengandalkan pelanggan untuk memperoleh pendapatan. Anda dapat memblokir konten premium di belakang paywall pada klien dengan menggunakan pengaburan [CSS obfuscation](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Sayangnya, orang yang pintar teknologi dapat mengakali hal ini.

Sebaliknya, Anda dapat memperlihatkan dokumen yang benar-benar kekurangan konten premium kepada pengguna! Menyajikan halaman yang sepenuhnya baru setelah backend Anda mengesahkan pengguna. Meskipun lebih aman, metode ini mengorbankan waktu, sumber daya, dan kebahagiaan pengguna.

Selesaikan kedua masalah ini dengan menerapkan validasi pelanggan premium dan dekripsi konten pada pihak atau sisi klien. Dengan solusi ini, pengguna dengan akses premium akan dapat mendekripsi konten tanpa perlu memuat halaman baru atau menunggu backend untuk menanggapi!

# Gambaran umum penyiapan

Untuk menerapkan dekripsi pihak klien, Anda akan menggabungkan kriptografi kunci publik dan kunci simetris dengan cara berikut ini:

1. Buat kunci simetris acak untuk setiap dokumen, dan berikan setiap dokumen kunci yang _unik_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Enkripsi konten premium dengan kunci simetris dokumennya. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} Kunci ini simetris untuk memungkinkan kunci yang sama mengenkripsi dan mendekripsi konten. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Enkripsi kunci dokumen dengan kunci publik, dengan menggunakan protokol [enkripsi hibrida ](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)untuk mengenkripsi kunci simetris. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. Dengan menggunakan komponen [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) dan/atau [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites), simpan kunci dokumen yang dienkripsi di dalam dokumen AMP, bersama konten premium yang dienkripsi. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

Dokumen AMP menyimpan kunci yang dienkripsi di dalam dokumen AMP sendiri. Ini mencegah penguraian dokumen yang dienkripsi dengan kunci yang mendekodenya.

# Bagaimana cara kerjanya?

1. AMP menguraikan kunci dari konten yang dienkripsi pada dokumen tempat pengguna tiba. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. Sambil menyajikan konten premium, AMP mengirimkan kunci simetris yang dienkripsi dari dokumen ke pengesah (authorizer) sebagai bagian dari pengambilan hak pengguna. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. Pengesah memutuskan apakah pengguna mempunyai izin yang benar. Jika benar, pengesah mendekripsi kunci simetris dokumen dengan kunci pribadi pengesah dari pasangan kunci publik/pribadi mereka. Lalu, pengesah mengembalikan kunci dokumen ke [logika komponen amp-subscriptions](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. AMP mendekripsi konten premium dengan kunci dokumen dan memperlihatkannya kepada pengguna! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Langkah-langkah penerapan

Ikuti langkah-langkah di bawah ini untuk mengintegrasikan penanganan enkripsi AMP dengan server hak internal Anda.

## Langkah ke-1: Membuat pasangan kunci publik/pribadi

Untuk mengenkripsi kunci simetris dokumen, Anda perlu mempunyai pasangan kunci publik/pribadi sendiri. Enkripsi kunci publik adalah protokol [enkripsi hibrida](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), terutama metode enkripsi asimetris ECIES [Kurva Eliptis P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) dengan metode enkripsi simetris [AES-GCM](https://tools.ietf.org/html/rfc5288) (128 bit).

Penanganan kunci publik harus dilakukan dengan [Tink](https://github.com/google/tink) menggunakan [menggunakan jenis kunci asimetris ini](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Untuk membuat pasangan kunci pribadi-publik Anda, gunakan salah satu dari yang berikut ini:

- Kelas [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (alat utilitas kunci Tink)

Keduanya mendukung rotasi kunci. Menerapkan rotasi kunci membatasi kerawanan kunci pribadi yang telah rusak.

Untuk membantu Anda memulai pembuatan kunci asimetris, kami telah membuat [skrip ini](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Skrip ini:

1. Membuat ECIES baru dengan kunci AEAD.
2. Mengeluarkan output kunci publik dalam teks polos ke berkas output
3. Mengeluarkan output kunci pribadi ke berkas output lain.
4. Mengenkripsi kunci pribadi yang dihasilkan dengan menggunakan kunci yang dikelola di Google Cloud (GCP) sebelum menulis ke berkas output, (biasa dirujuk sebagai [Enkripsi Amplop](https://cloud.google.com/kms/docs/envelope-encryption)).

Kami mewajibkan penyimpanan/publikasi [Keyset Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) publik Anda dalam [format JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Ini memungkinkan alat lain yang disediakan AMP berfungsi dengan lancar. Skrip kami sudah membuat output kunci publik di dalam format ini.

## Langkah ke-2: Mengenkripsi artikel

Putuskan apakah Anda ingin mengenkripsi konten premium secara manual, atau mengenkripsi konten premium secara otomatis.

### Mengenkripsi secara manual

Kita membutuhkan metode simetris [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) dengan menggunakan Tink untuk mengenkripsi konten premium. Kunci dokumen simetris yang digunakan untuk mengenkripsi konten premium harus unik untuk setiap dokumen. Tambahkan kunci dokumen ke objek JSON yang berisi kunci dalam teks polos yang dikodekan dengan base64, serta SKU yang diperlukan untuk mengakses konten dokumen yang dienkripsi.

Objek JSON di bawah ini berisi contoh kunci dalam teks polos yang dikodekan dengan base64 dan SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Enkripsi objek JSON di atas dengan menggunakan kunci publik yang dibuat di Membuat Pasangan Kunci Publik/Pribadi.

Tambahkan hasil yang dienkripsi sebagai nilai pada kunci `"local"`. Tempatkan pasangan kunci-nilai di dalam objek JSON yang dibungkus di dalam tag `<script type="application/json" cryptokeys="">`. Tempatkan tag di bagian atas (head) dokumen.

```
<head>
...
<script type="application/json" cryptokeys="">
{
  "local": ['y0^r$t^ff'], // This is for your environment
  "google.com": ['g00g|e$t^ff'], // This is for Google's environment
}
</script>
…
</head>
```

Anda harus mengenkripsi kunci dokumen dengan lingkungan lokal dan [kunci publik Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Menyertakan kunci publik Google memungkinkan cache AMP Google untuk menyajikan dokumen Anda. Anda harus memberikan contoh kepada [Keyset Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) untuk menerima kunci publik Google dari URL-nya:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Kunci publik Google adalah [Keyset Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) dalam [format JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Lihat [di sini](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) untuk mengetahui contoh menggunakan keyset atau rangkaian kunci ini.

Bacalah: [Melihat contoh dokumen AMP yang dienkripsi yang berhasil.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Enkripsi Otomatis

Enkripsi dokumen dengan menggunakan [skrip](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt) kami. Skrip ini menerima dokumen HTML dan mengenkripsi semua konten di dalam tag `<section subscriptions-section="content" encrypted>`. Dengan menggunakan kunci publik yang berlokasi di URL yang diteruskan kepadanya, skrip ini mengenkripsi kunci dokumen yang dibuat oleh skrip. Menggunakan skrip ini memastikan bahwa semua konten dikodekan dan diformat dengan benar untuk penyajian. Lihat [di sini](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) untuk mengetahui instruksi lebih lanjut dalam menggunakan skrip ini.

## Langkah ke-3: Mengintegrasikan pengesah

Anda perlu memperbarui pengesah Anda untuk mendekripsi kunci dokumen saat seorang pengguna mempunyai hak yang benar. Komponen amp-subscriptions secara otomatis mengirimkan kunci dokumen yang dienkripsi ke pengesah `"local"` melalui sebuah parameter URL [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Parameter ini melakukan:

1. Penguraian kunci dokumen dari bidang kunci JSON `"local"`.
2. Dekripsi dokumen.

Anda harus menggunakan Tink untuk mendekripsi kunci dokumen di pengesah Anda. Untuk mendekripsi dengan Tink, berikan contoh kepada klien [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) dengan menggunakan kunci pribadi yang dihasilkan di bagian Membuat Pasangan Kunci Publik/Pribadi. Lakukan ini saat server dinyalakan untuk menghasilkan kinerja optimum.

Penggunaan HybridDecrypt/Pengesah Anda harus cocok dengan jadwal rotasi kunci Anda. Ini menciptakan ketersediaan semua kunci yang dihasilkan untuk klien HybridDecrypt.

Tink mempunyai [dokumentasi](https://github.com/google/tink/tree/master/docs) yang ekstensif dan [contoh-contoh](https://github.com/google/tink/tree/master/examples) dalam C++, Java, Go, dan JavaScript untuk membantu Anda memulai penerapan di sisi server Anda.

### Manajemen permintaan

Saat sebuah permintaan sampai di pengesah Anda:

1. Uraikan URL pingback hak untuk parameter “crypt=”.
2. Dekode nilai parameter "crypt=” dengan base64. Nilai yang disimpan di parameter URL adalah berdasarkan objek JSON yang dienkripsi yang dikodekan dengan base64.
3. Setelah kunci yang dienkripsi berada dalam bentuk byte mentah, gunakan fungsi dekripsi HybridDecrypt untuk mendekripsi kunci tersebut dengan menggunakan kunci pribadi Anda.
4. Jika dekripsi berhasil, uraikan hasilnya ke dalam objek JSON.
5. Verifikasi akses pengguna ke salah satu dari hak yang tercantum pada bidang JSON AccessRequirements.
6. Hasilkan kunci dokumen dari bidang “Kunci” objek JSON yang didekripsi di dalam tanggapan hak. Tambahkan kunci dokumen yang didekripsi di dalam bidang baru berjudul “decryptedDocumentKey” di dalam tanggapan hak. Ini memberikan akses ke kerangka kerja AMP.

Sampel di bawah ini adalah snippet kode semu yang menguraikan langkah-langkah deskripsi di atas:

```js
string decryptDocumentKey(string encryptedKey, List < string > usersEntitlements,
    HybridDecrypt hybridDecrypter) {
    // 1. Base64 decode the input encrypted key.
    bytes encryptedKeyBytes = base64.decode(encryptedKey);
    // 2. Try to decrypt the encrypted key.
    bytes decryptedKeyBytes;
    try {
        decryptedKeyBytes = hybridDecrypter.decrypt(
            encryptedKeyBytes, null /* contextInfo */ );
    } catch (error e) {
        // Decryption error occurred. Handle it how you want.
        LOG("Error occurred decrypting: ", e);
        return "";
    }
    // 3. Parse the decrypted text into a JSON object.
    string decryptedKey = new string(decryptedKeyBytes, UTF_8);
    json::object decryptedParsedJson = JsonParser.parse(decryptedKey);
    // 4. Check to see if the requesting user has the entitlements specified in
    //    the AccessRequirements section of the JSON object.
    for (entitlement in usersEntitlements) {
        if (decryptedParsedJson["AccessRequirements"]
            .contains(entitlement)) {
            // 5. Return the document key if the user has entitlements.
            return decryptedParsedJson["Key"];
        }
    }
    // User doesn't have correct requirements, return empty string.
    return "";
}

JsonResponse getEntitlements(string requestUri) {
    // Do normal handling of entitlements here…
    List < string > usersEntitlements = getUsersEntitlementInfo();

    // Check if request URI has "crypt" parameter.
    String documentCrypt = requestUri.getQueryParameters().getFirst("crypt");

    // If URI has "crypt" param, try to decrypt it.
    string documentKey;
    if (documentCrypt != null) {
        documentKey = decryptDocumentKey(
            documentCrypt,
            usersEntitlements,
            this.hybridDecrypter_);
    }

    // Construct JSON response.
    JsonResponse response = JsonResponse {
        signedEntitlements: getSignedEntitlements(),
        isReadyToPay: getIsReadyToPay(),
    };
    if (!documentKey.empty()) {
        response.decryptedDocumentKey = documentKey;
    }
    return response;
}
```

# Sumber daya terkait

Kunjungi dokumentasi dan contoh-contoh yang ditemukan di [Halaman Tink Github](https://github.com/google/tink).

Semua skrip pembantu ada di [subscriptions-project/encryption Github repo](https://github.com/subscriptions-project/encryption).

# Dukungan lebih lanjut

Jika ada pertanyaan, komentar, atau masalah apa pun silakan ajukan [Masalah Github](https://github.com/subscriptions-project/encryption/issues).
