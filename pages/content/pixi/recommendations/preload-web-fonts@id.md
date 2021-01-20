---
$title: Memuat font web terlebih dahulu
$order: 140
tags:
- lcp
---

Pramuat memungkinkan Anda memberi tahu browser tentang sumber daya penting yang ingin Anda muat secepatnya. Bahkan sebelum mereka ditemukan dalam HTML! Ini sangat bagus untuk sumber daya yang digunakan di viewport pertama dan di seluruh halaman, seperti font. Lakukan dengan menambahkan atribut `rel="preload"` ke sumber daya ini, seperti berikut ini:

```
<link href="font.woff2" rel="preload">
```
