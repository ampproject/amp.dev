---
$category@: media
formats:
- websites
- ads
- stories
teaser:
  text: HTML5 video etiketinin yerini alır.
---



<!---
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

# amp-video

HTML5 `video` etiketinin yerine gelen bir etiket; yalnızca doğrudan HTML5 video dosyası yerleştirmeleri için kullanılır.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">amp-video örneği</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">amp-video için oynatmak için tıklama yer paylaşımı</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Davranış

`amp-video` bileşeni, `src` özelliği tarafından belirtilen video kaynağını çalışma zamanı tarafından belirlenen bir zamanda gecikmeli olarak yükler. `amp-video` bileşenini, büyük ölçüde standart HTML5 `<video>` etiketiyle aynı biçimde kontrol edebilirsiniz.

`amp-video` bileşeni, alt öğe olarak en fazla dört benzersiz HTML düğümü türünü kabul eder:

* `source` etiketleri: Tıpkı HTML `<video>` etiketinde olduğu gibi, oynatmak üzere farklı kaynak medya dosyaları belirtmek için `<source>` etiketi alt öğelerini ekleyebilirsiniz.
* videoda altyazıları etkinleştirmek için `track` etiketleri. Parça, dokümandan farklı bir kaynakta barındırılıyorsa `<amp-video>` etiketine `crossorigin` özelliğini eklemeniz gerekir.
* video başlamadan önce bir yer tutucu
* tarayıcı HTML5 videoyu desteklemiyorsa bir yedek: Bir veya hemen ilk alt düğüm `fallback` özelliğine sahip olabilir. Bu düğüm ve alt öğeleri mevcutsa ve kullanıcının tarayıcısında HTML5 video desteklenmiyorsa bu düğüm ve onun alt öğeleri görüntülenen içeriği oluşturur.

#### Örnek

<!--yerleşik örnek - ampproject.org'da görüntülenir -->

<div>
  <amp-iframe height="293" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>

</div>

## Analiz

`amp-video`, ek ayar gerektirmeden analizleri destekler. Daha fazla bilgi için [video analizi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md) bölümüne bakın.

## Özellikler

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Herhangi bir <code>&lt;source&gt;</code> alt öğesi yoksa gereklidir. HTTPS olmalıdır.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>Video oynatma başlamadan önce görüntülenecek karenin resmi. Varsayılan olarak ilk kare görüntülenir.
      <br>
        Alternatif olarak, oynatmak için tıklama yer paylaşımı sunabilirsiniz. Ayrıntılar için aşağıdaki <a href="#click-to-play-overlay">Oynatmak için Tıklama yer paylaşımı</a> bölümüne bakın.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Bu özellik mevcutsa ve tarayıcı otomatik oynatmayı destekliyorsa video görünür hale gelir gelmez otomatik olarak oynatılır. Bileşenin oynatılması için <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#autoplay">AMP'de Video spesifikasyonunda ana hatlarıyla açıklandığı</a> gibi karşılaması gereken bazı koşullar vardır.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Bu özellik, HTML5 <code>video</code> öğesindeki <code>controls</code> özelliğine benzer. Bu özellik mevcutsa tarayıcı, kullanıcının video oynatmayı kontrol etmesine olanak tanıyan kontroller sunar.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>HTML5 video öğesinin <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> özelliği ile aynıdır. Yalnızca belirli tarayıcılar tarafından desteklenir. Ayrıntılar için lütfen <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a> adresine bakın.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong><code>amp-video-docking</code> uzantısını gerektirir.</strong> Bu özellik mevcutsa ve video manuel olarak oynatılıyorsa kullanıcı, video bileşeninin görsel alanını görünüm alanının dışına kaydırdığında video “küçültülür” ve bir köşeye veya bir öğeye sabitlenir.
            Daha ayrıntılı bilgi için <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-video-docking/amp-video-docking.md">yuvaya yerleştirme uzantısının kendisiyle ilgili dokümanlara</a> bakın.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>Bu özellik mevcutsa video, sona geldikten sonra otomatik olarak başa döner.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Bir <code>track</code> kaynağı, dokümandan farklı bir kaynakta barındırılıyorsa gereklidir.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Medya öğesinin, Chromecast veya AirPlay gibi uzaktan oynatma kullanıcı arayüzüne sahip olmasına izin verilip verilmediğini belirler.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (kullanım kaldırıldı)</strong></td>
          <td><code>muted</code> özelliği kullanımdan kaldırılmıştır ve artık herhangi bir etkisi yoktur. <code>autoplay</code> özelliği, sesi kapatma davranışını otomatik olarak kontrol eder.</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Videonun sesinin olmadığını belirten ek açıklamayı ekler. Bu özellik, video otomatik oynatıldığında görüntülenen ekolayzer simgesini gizler.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Video görünür durumdaysa kullanıcının cihazını yatay moda döndürmesinden sonra tam ekranda görüntülenir. Daha fazla bilgi için <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#rotate-to-fullscreen">AMP'de Video spesifikasyonuna</a> bakın.</td>
        </tr>
        <tr>
          <td width="40%"><strong>common attributes</strong></td>
          <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="https://www.ampproject.org/docs/reference/common_attributes">ortak özellikleri</a> içerir.</td>
        </tr>
      </table>

## Media Session API'si özellikleri

`amp-video` bileşeni, geliştiricilerin video dosyası hakkında daha fazla bilgi belirtmesini sağlayan [Media Session API'sini](https://developers.google.com/web/updates/2017/02/media-session) uygular. Videoyla ilgili ek bilgiler kullanıcının cihazının bildirim merkezinde (oynatma/duraklatma kontrolleri ile birlikte) görüntülenir.

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Videonun posteri olarak yayınlanan bir PNG/JPG/ICO resminin URL'sini belirtir. "artwork" özelliği mevcut değilse Media Session API yardımcısı, "schema.org" tanımındaki `image` alanını veya web sitesinin "favicon" alanını kullanır.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Video dosyasının yazarını belirtir; dize biçimindedir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Videonun alındığı albümü/koleksiyonu belirtir; dize biçimindedir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Videonun adını/başlığını belirtir; dize biçimindedir. Sağlanmadığı takdirde Media Session API yardımcısı, `aria-label` özelliğini veya sayfanın başlığını kullanır.</td>
  </tr>
</table>

Örnek:

Bu örnekte `poster` ve `artwork` özellikleri yer almaktadır. `poster`, video oynatılmadan önce yer tutucu resim olarak sunulurken `artwork`, MediaSession API'si aracılığıyla bildirimde görüntülenen resimdir.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Oynatmak için Tıklama yer paylaşımı

Oynatmak için tıklama yer paylaşımının sağlanması, web'deki video oynatıcılar için yaygın olarak kullanılan bir kullanıcı deneyimi özelliğidir.  Örneğin, kullanıcının tıklayabileceği özel bir oynatma simgesi görüntüleyebilir, ayrıca videonun başlığını, farklı boyutlarda poster resimlerini vb. ekleyebilirsiniz.  `amp-video` bileşeni standart `play` AMP işlemini desteklediğinden oynatmak için tıklamayı kolayca uygulayabilirsiniz.

Ayrıntılı bir örnek için Örneklerle AMP [amp-video ile ilgili oynatmak için tıklama yer paylaşımı](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) sayfasını ziyaret edin.

## Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-video kurallarına](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) bakın.
