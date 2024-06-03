---
$title: amp-3d-gltf
$category@: media
teaser:
  text: Displays GL Transmission Format (glTF) 3D models.
---
<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



Menampilkan model 3D GL Transmission Format (glTF).

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code&gt;</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>Contoh</strong></td>
    <td>Lihat contoh <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf</a> di AMP By Example.</td>
  </tr>
</table>

## Penggunaan <a name="usage"></a>

Komponen `amp-3d-gltf` menampilkan model 3D dalam format glTF.

**Catatan**: Browser berkemampuan WebGL diperlukan untuk menampilkan model ini.

### Contoh <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Batasan <a name="limitations"></a>

Saat ini, hanya berfungsi dengan glTF 2.0.
Fitur yang tidak didukung:

- kamera tersemat
- animasi

### CORS <a name="cors"></a>

`amp-3d-gltf` membuat permintaan `fetch` dari `https://<random>.ampproject.net` asal sehingga `access-control-allow-origin: *.ampproject.net` harus ditetapkan pada header respons endpoint yang ditetapkan sebagai `src`. Karakter pengganti diperlukan karena asal memiliki komponen sub-domain acak.

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [wajib]</strong></td>
    <td>Atribut wajib yang menentukan URL ke file gltf.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [opsional]</strong></td>
    <td>Atribut Boolean yang menentukan apakah ruang kosong pada kanvas terlihat transparan atau tidak. Secara default, ruang kosong diisi warna hitam.
        Nilai defaultnya adalah <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [opsional]</strong></td>
      <td>Atribut Boolean yang menentukan apakah antialiasing diaktifkan atau tidak. Nilai defaultnya adalah <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [opsional]</strong></td>
      <td>String yang harus berisi warna CSS yang valid, yang akan digunakan untuk mengisi ruang kosong pada kanvas.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [opsional]</strong></td>
      <td>Nilai numerik yang menentukan batas atas untuk opsi render pixelRatio. Nilai defaultnya adalah <code>window.devicePixelRatio</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [opsional]</strong></td>
      <td>Atribut Boolean yang menentukan apakah kamera akan otomatis diputar di sekitar pusat model atau tidak. Nilai defaultnya adalah <code>false</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [opsional]</strong></td>
      <td>Atribut Boolean yang menentukan apakah zoom akan diaktifkan atau tidak. Nilai default adalah <code>true</code>.</td>
    </tr>
  </table>

## Tindakan <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>menyetel rotasi model. Urutan rotasi adalah ZYX
      <ul>
        <li>x/y/z - angka 0..1, didefaultkan ke nilai rotasi model sebelumnya.</li>
        <li>min/max - sudut dalam radian, didefaultkan ke 0/pi * 2, menentukan rentang target</li>
      </ul>
      misalnya <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code> akan mengubah komponen <code>x</code> rotasi menjadi <code>1.57</code>.</td>
    </tr>
  </table>

## Validasi <a name="validation"></a>

Lihat [aturan amp-3d-gltf](https://github.com/ampproject/amphtml/blob/main/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) dalam spesifikasi validator AMP.
