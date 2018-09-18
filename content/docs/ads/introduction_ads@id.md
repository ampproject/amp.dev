---
$title: Pengantar iklan di AMP
---

Project AMP bertujuan untuk melakukan upaya terbaik bagi pengguna agar halaman dapat ditampilkan dengan cepat. Iklan di AMP juga memiliki tujuan yang sama, dengan mendukung iklan yang cepat, aman, menarik, dan efektif bagi pengguna. Bagaimana cara melakukannya?  

Menayangkan iklan ke halaman AMP tidak jauh berbeda dengan menayangkan iklan tradisional pada halaman HTML:

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='menayangkan iklan ke halaman AMP', align='' ) }}

1.  Dimulai dengan halaman AMP, penayang membuat slot di halaman untuk menampilkan iklan. Secara tradisional, tindakan ini dilakukan dengan memasukkan cuplikan JavaScript, namun di AMP, penayang menambahkan tag [`<amp-ad>`](/id/docs/reference/components/amp-ad.html) ke halaman AMP-nya untuk jaringan iklan tertentu. Untuk mempelajari detailnya, lihat panduan [Memonetasi halaman AMP dengan iklan](/id/docs/ads/monetization.html).

2.  Ketika pengguna memuat halaman AMP, tag `<amp-ad>` akan mengirim permintaan iklan ke jaringan iklan. Untuk menampilkan iklan pada halaman AMP, jaringan iklan membuat implementasi `amp-ad`. Untuk mempelajari detailnya, lihat panduan [Mengintegrasikan jaringan iklan ke AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

3.  Jaringan iklan menyediakan materi iklan yang dibuat oleh pengiklan. Pengiklan dapat membuat materi iklan menggunakan HTML tradisional, atau dalam format baru, [AMPHTML](/id/docs/ads/amphtml_ads.html). 

## Jaringan iklan yang didukung

AMP mendukung sejumlah besar [server dan jaringan iklan](/id/docs/ads/ads_vendors.html).

{% call callout('Catatan', type='note') %}
Ingin mengintegrasikan teknologi iklan Anda dengan AMP? Lihat [panduan](/id/docs/ads/integration-guide.html) ini.
{% endcall %}

## Iklan yang didukung

AMP mendukung iklan tradisional serta iklan AMPHTML yang lebih cepat dan aman.  Terlepas dari cara membuatnya, iklan di halaman AMP sama seperti resource eksternal apa pun dan harus diputar dalam [batasan yang ditempatkan di semua resource di AMP](/learn/about-how/) yang sama.   Untuk mempelajari lebih lanjut persyaratan iklan di AMP, lihat [panduan ini](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints).

### Lebih cepat dengan iklan AMPHTML

Iklan AMPHTML adalah cara yang lebih cepat, ringan, dan aman untuk beriklan di internet. Meskipun halaman AMP mendukung iklan HTML tradisional, iklan ini dapat dimuat dengan lambat. Agar iklan dapat dimuat secepat halaman AMP lainnya, Anda dapat membuat iklan di AMPHTML. Iklan AMPHTML hanya ditayangkan setelah divalidasi, untuk memastikan tidak ada malware pada iklan tersebut. Yang terpenting, iklan ini dapat ditayangkan di mana pun di internet, tidak hanya di halaman AMP.

Pelajari lebih lanjut iklan AMPHTML di panduan [Iklan AMPHTML](/id/docs/ads/amphtml_ads.html).


## Mulai

Kunjungi referensi berikut untuk mulai menggunakan iklan di AMP:

* [Memonetasi halaman AMP dengan iklan](/id/docs/ads/monetization.html)
* [Mengintegrasikan dengan AMP untuk menayangkan iklan display](/id/docs/ads/adnetwork_integration.html)
* [Iklan AMPHTML](/id/docs/ads/amphtml_ads.html)
 
