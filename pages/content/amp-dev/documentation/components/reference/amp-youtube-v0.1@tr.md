---
$title: amp-youtube
$category@: media
teaser:
  text: Bir YouTube videosu görüntüler.
---



<!--
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



Bir [YouTube](https://www.youtube.com/) videosu görüntüler.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">amp-youtube için ek açıklamalı kod örneği</a></td>
  </tr>
</table>

[İçindekiler]

## Örnek <a name="example"></a>

Duyarlı düzenle, örnekteki genişlik ve yükseklik, 16:9 en boy oranlı videolar için doğru düzenler sağlamalıdır:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Bu özellik mevcutsa ve tarayıcı otomatik oynatmayı destekliyorsa:
      <ul>
        <li>otomatik oynatma başlamadan önce videonun sesi otomatik olarak kapatılır
        </li>
        <li>video görünüm alanının dışında kaldığında video duraklatılır
        </li>
        <li>video görünüm alanına tekrar girdiğinde video oynatılmaya devam eder
        </li>
        <li>kullanıcı videoya dokunduğunda videonun sesi açılır
        </li>
        <li>kullanıcı videoyla etkileşime geçtiyse (ör. sesi kapatma/açma, duraklatma/devam ettirme vb.) ve video görünüm alanının dışında kaldıysa veya görünüm alanına girdiyse videonun durumu, kullanıcının bıraktığı şekilde kalır. Örneğin, kullanıcı videoyu duraklattıktan sonra videoyu görünüm alanının dışına çıkarır ve ardından, videoya geri dönerse video duraklatılmış olarak kalır.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>YouTube video kimliği, her YouTube video sayfası URL'sinde bulunur.
          Örneğin, https://www.youtube.com/watch?v=Z1q71gFeRqM URL'sinde <code>Z1q71gFeRqM</code> kısmı, video kimliğidir.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>Sabit bir canlı yayın url'si sağlayan YouTube kanal kimliği. Örneğin, https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q URL'sinde <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> kısmı, kanal kimliğidir. Bir video yerine canlı yayın için sabit bir url yerleştirmek isterseniz <code>data-videoid</code> özelliği yerine bir <code>data-live-channelid</code> özelliği sağlayabilirsiniz. Kanallar, varsayılan yer tutucularla birlikte sağlanmaz. Video için yukarıdaki 2. örnekte olduğu gibi bir yer tutucu sağlayabilirsiniz.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Tüm <code>data-param-*</code> özellikleri, YouTube iframe src'ye sorgu parametresi olarak eklenir. Bu, kontrollerin gösterilip gösterilmeyeceği gibi özel değerlerin YouTube eklentilerine geçirilmesi için kullanılabilir.
            Anahtarlar ve değerler URI kodlu olur. Anahtarlarda büyük/küçük harf karışık kullanılır.
            <ul>
            <li>`data-param-controls=1`, `&amp;controls=1` olur</li>
          </ul>
          YouTube ile ilgili daha fazla parametre seçeneği için <a href="https://developers.google.com/youtube/player_parameters">YouTube Yerleşik Oynatıcı Parametreleri</a> konusuna bakın.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong><code>amp-video-docking</code> uzantısını gerektirir.</strong> Bu özellik mevcutsa ve video manuel olarak oynatılıyorsa kullanıcı, video bileşeninin görsel alanını görünüm alanının dışına kaydırdığında video “küçültülür” ve bir köşeye veya bir öğeye sabitlenir.
            Daha ayrıntılı bilgi için <a href="amp-video-docking.md">yuvaya yerleştirme uzantısının kendisiyle ilgili dokümanlara</a> bakın.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (isteğe bağlı)</strong></td>
          <td><a href="https://fetch.spec.whatwg.org/">Getirme API'si</a> tarafından belirtildiği şekliyle bir <code>credentials</code> seçeneğini tanımlar.
            <ul>
              <li>Desteklenen değerler: `omit`, `include`</li>
              <li>Varsayılan: `include`</li>
            </ul>
            <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">YouTube oynatıcısının gelişmiş gizlilik modunda</a> kullanmak istiyorsanız <code>omit</code> değerini geçirin.
                YouTube genellikle çerezlerini oynatıcı yüklenirken ayarlar. Gelişmiş gizlilik modunda çerezler, kullanıcı oynatıcıyı tıkladığında ayarlanır.</td>
            </tr>
            <tr>
              <td width="40%"><strong>common attributes</strong></td>
              <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">ortak özellikleri</a> içerir.</td>
            </tr>
          </table>

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-youtube kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) bakın.
