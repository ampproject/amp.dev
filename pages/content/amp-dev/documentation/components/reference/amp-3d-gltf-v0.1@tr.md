---
$title: amp-3d-gltf
$category@: media
teaser:
  text: GL İletim Biçimi (glTF) 3D modellerini görüntüler.
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



GL İletim Biçimi (glTF) 3D modellerini görüntüler.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-3d-gltf" src="https://cdn.ampproject.org/v0/amp-3d-gltf-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, responsive</td>
  </tr>
  <tr>
    <td><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-3d-gltf/">amp-3d-gltf örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Kullanım <a name="usage"></a>

`amp-3d-gltf` bileşeni, glTF biçimindeki 3D modelleri görüntüler.

**Not**: Bu modelleri görüntülemek için WebGL özellikli bir tarayıcı gerekir.

### Örnek <a name="example"></a>

```html
<amp-3d-gltf
    layout="responsive"
    width="320"
    height="240"
    alpha="true"
    antialiasing="true"
    src="path/to/model.glb"></amp-3d-gltf>
```

### Sınırlamalar <a name="limitations"></a>

Şu anda yalnızca glTF 2.0 ile çalışmaktadır.

Desteklenmeyen özellikler:

- yerleşik kameralar
- animasyon

### CORS <a name="cors"></a>

`amp-3d-gltf`, kaynak `https://<random>.ampproject.net` adresinden bir `getirme` isteğinde bulunur. Bu nedenle, `src` olarak belirtilen uç noktanın yanıt üstbilgisinde `access-control-allow-origin: *.ampproject.net` değeri ayarlanmalıdır. Kaynakta joker karakter için rastgele bir alt alan bileşeni olduğundan bu karakter gereklidir.

## Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src [gerekli]</strong></td>
    <td>gltf dosyasının URL'sini belirten gerekli bir özellik.</td>
  </tr>
  <tr>
    <td width="40%"><strong>alpha [isteğe bağlı]</strong></td>
    <td>Zemindeki boş alanın şeffaf olup olmayacağını belirten bir Boole özelliği. Varsayılan olarak boş alan siyah renkle doldurulur.
        Varsayılan değer <code>false</code> (yanlış) değeridir.</td>
    </tr>
    <tr>
      <td width="40%"><strong>antialiasing [isteğe bağlı]</strong></td>
      <td>Düzeltmenin açılıp açılmayacağını belirten bir Boole özelliği. Varsayılan değer <code>false</code> (yanlış) değeridir.</td>
    </tr>
    <tr>
      <td width="40%"><strong>clearColor [isteğe bağlı]</strong></td>
      <td>Zemindeki boş alanı doldurmak için kullanılacak geçerli CSS rengini içermesi gereken bir dize.</td>
    </tr>
    <tr>
      <td width="40%"><strong>maxPixelRatio [isteğe bağlı]</strong></td>
      <td>pixelRatio oluşturma seçeneğinin üst sınırını belirten bir sayısal değer. Varsayılan değer <code>window.devicePixelRatio</code>'dur.</td>
    </tr>
    <tr>
      <td width="40%"><strong>autoRotate [isteğe bağlı]</strong></td>
      <td>Kameranın modelin merkezi çevresinde otomatik olarak döndürülüp döndürülmeyeceğini belirten bir Boole özelliğidir. Varsayılan değer <code>false</code> (yanlış) değeridir.</td>
    </tr>
    <tr>
      <td width="40%"><strong>enableZoom [isteğe bağlı]</strong></td>
      <td>Yakınlaştırmanın açılıp açılmayacağını belirten bir Boole özelliğidir. Varsayılan değer, <code>true</code> (doğru) değeridir.</td>
    </tr>
  </table>

## İşlemler <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong>setModelRotation(x, y, z, xMin, xMax, yMin, yMax, zMin, zMax)</strong></td>
    <td>model döndürmesini ayarlar; döndürme sırası ZYX şeklindedir
      <ul>
        <li>x/y/z - sayı 0..1, varsayılan olarak model döndürmesinin önceki değerine ayarlanır.</li>
        <li>min/max - radyan cinsinden açı, varsayılan olarak 0 / pi * 2'dir; hedef aralığı tanımlar</li>
      </ul>
      örneğin, <code>setModelRotation(x=0.5, xMin=0, xMax=3.14)</code>, döndürmenin <code>x</code> bileşenini <code>1.57</code> değerine ayarlar.</td>
    </tr>
  </table>

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-3d-gltf kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-3d-gltf/validator-amp-3d-gltf.protoascii) bakın.
