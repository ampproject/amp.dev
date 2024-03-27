---
$title: amp-addthis
$category@: social
teaser:
  text: Bir AddThis web sitesi araçları yerleştirmesi görüntüler.
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



Bir [AddThis](https://www.addthis.com) web sitesi araçları yerleştirmesi görüntüler.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>


## Neden AddThis? <a name="why-addthis"></a>

`amp-addthis` bileşeni güzel, basit paylaşım düğmeleri sağlar. Web sitesi ziyaretçilerinizin; Messenger, WhatsApp, Facebook, Twitter, Pinterest ve daha pek çok uygulama dahil 200'ü aşkın sosyal medya kanalında içerik paylaşmasını kolaylaştırın.

AddThis'e, altmıştan fazla dilde, dünyanın her yerinden içerik paylaşan, 2 milyarın üzerinde benzersiz kullanıcısı olan 15.000.000'dan fazla web sitesi güvenmektedir.

## Paylaşım Düğmeleri <a name="share-buttons"></a>

### Kayan <a name="floating"></a>

Sayfanızın yanlarına, üst kısmına veya alt kısmına yerleştirilir, görünümü kaydırdıkça okuyucunuzu takip eder. Çok fazla rahatsız etmeden paylaşımı teşvik etmenin harika bir yolu.

Örnek:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### Satır içi <a name="inline"></a>

Paylaşım düğmelerini, kesintisiz bir paylaşım deneyimi için içeriğinize entegre edin.

Örnek:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>AddThis yayıncı kimliğini, giriş yaptıktan sonra <a href="https://addthis.com/dashboard">AddThis kontrol panelindeki</a> URL'de bulabilirsiniz. Örneğin, <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code> URL'sinin <code>ra-5c191331410932ff</code> kısmı yayıncı kimliğini belirtir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>Görüntülenecek aracın AddThis widget kimliği de <a href="https://addthis.com/dashboard">AddThis kontrol panelinde</a> bulunur. Belirli bir araca ilişkin widget kimliği, söz konusu aracın AddThis kontrol panelinde açılması ve URL'nin son kısmının kopyalanmasıyla bulunabilir. Örneğin, <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code> URL'sinin <code>957l</code> kısmı widget kimliğini belirtir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Widget'ın türünü açıklayan özellik.
      <ul>
        <li>Kayan: <code>data-widget-type="floating"</code></li>
        <li>Satır içi: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>İsteğe bağlıdır. Ayarlanırsa, paylaşım gerçekleştiğinde AddThis aracı bu başlığı paylaşmaya çalışır. Ayarlanmazsa, <code>amp-addthis</code> etiketini içeren dokümanın başlığı kullanılır.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>İsteğe bağlıdır. Ayarlanırsa, paylaşım gerçekleştiğinde AddThis aracı bu URL'yi paylaşmaya çalışır. Ayarlanmazsa, <code>amp-addthis</code> etiketini içeren dokümanın <code>location.href</code> özelliği kullanılır.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>İsteğe bağlıdır. Ayarlanırsa, paylaşım gerçekleştiğinde AddThis aracının paylaşmaya çalışacağı medya parçasının (ör. resim veya video) URL'sidir. Ayarlanmazsa, tanımlanmamış olarak kalır.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>İsteğe bağlıdır. Ayarlanırsa, paylaşım gerçekleştiğinde AddThis aracı bu sayfa açıklamasını paylaşmaya çalışır. Ayarlanmazsa, tanımlanmamış olarak kalır.</td>
    </tr>
  </table>

## Uygulama Dokümanları <a name="implementation-documentation"></a>

1. Henüz yapmadıysanız [https://www.addthis.com/register](https://www.addthis.com/register) adresinden bir AddThis hesabı oluşturmanız gerekir. Bir AddThis hesabı oluşturmak tamamen ücretsizdir ve sitenizin sosyal trafiğini daha iyi anlamak için ayrıntılı analiz raporlarımızın yanı sıra web sitesi araçlarımızın tamamına erişmenize olanak tanır.
1. [Kontrol panelinize](https://addthis.com/dashboard) gidin ve Paylaşım Düğmelerinizi özelleştirin (AMP şu anda yalnızca Kayan ve Satır İçi Paylaşım Düğmelerini desteklemektedir).
1. Paylaşma düğmelerinizi istediğiniz gibi özelleştirin ve ardından, "aracı etkinleştir"i tıklayın. Bu işlem, sizi Kodu Edinme sayfamıza yönlendirir.
1. Son ama çok önemli noktalardan birisi de, satır içi kodu kopyalayıp sayfanızın gövde bölümüne, paylaş düğmelerinin görünmesini istediğiniz yere yapıştırmanızdır. Kayan Paylaş Düğmeleri, araç ayarlarında belirlediğiniz konuma göre otomatik olarak ekranınızın sol veya sağ tarafında görüneceği için bu kodu gövdenin herhangi bir yerine yerleştirebilirsiniz.

Hepsi bu kadar! Paylaş düğmelerini sayfanızda görmeniz gerekir!

Adım adım talimatlar için [YouTube videomuza](https://www.youtube.com/watch?v=BSkuAB4er2o) göz atın:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-addthis kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii) bakın.

## Gizlilik <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

AddThis Araçları, Yayıncı Siteler ile etkileşimde bulunmak için Son Kullanıcının ve AddThis Araç Çubuğu, AddThis Araç Çubuğu ile etkileşimde bulunmak için Araç Çubuğu Kullanıcısının kullandığı cihazdan bilgi ("AddThis Verileri") toplar.

AddThis Verileri aşağıdakilerden oluşabilir:

* İnternet Protokolü (IP) adresi, Mobil Reklamcılık Kimliği (MAID) (mobil uygulama geliştiricilerinin, mobil uygulamalarını kimlerin kullandığını belirlemelerine olanak tanır), mobil uygulama kimliği, tarayıcı türü, tarayıcı dili, işletim sistemi türü ve Son Kullanıcının bir Yayıncı Sitesini veya Araç Çubuğunu ziyaret ettiği tarih ve saat
* Araç Çubuğunu kullanan kullanıcı;
* Son Kullanıcının Yayıncı Sitesini ne süreyle ziyaret ettiği, Son Kullanıcının bir Yayıncı Sitesindeki içeriği paylaşma davranışları ve bir Son Kullanıcının bir Yayıncı Sitesindeki kaydırma davranışı gibi bir Yayıncı Sitesindeki davranışlar;
* Son Kullanıcının bir Yayıncı Sitesini bulmak ve bu siteye gitmek için kullandığı yönlendiren URL ve web araması;
* AddThis Araç Çubuğu arama işlevine girilen anahtar kelimeler ve Araç Çubuğu Kullanıcısının, AddThis Araç Çubuğunu indirip indirmediği, yükleyip yüklemediği, yüklemesini kaldırıp kaldırmadığı ve bunları yapma zamanı;
* Bir Son Kullanıcının AddThis Araçlarını ne sıklıkta kullandığı ve bir Araç Çubuğu Kullanıcısının AddThis Araç Çubuğunu ne sıklıkta kullandığıyla ilgili bilgiler ve
* Bir Son Kullanıcının ve Araç Çubuğu Kullanıcısının IP adresinden alınan coğrafi konum verileri.

AddThis Verileri, geçerli yasa kapsamında gereken ölçüde kişisel bilgi olarak değerlendirilir. Yayıncılar, AddThis Hizmet Şartları uyarınca gerekli tüm Son Kullanıcı izinlerini ve yetkilendirmelerini almalı ve Son Kullanıcılardan toplanan AddThis Verilerinin Oracle'a sağlanması için gereken bildirimleri sağlamalıdır.

## Destek <a name="support"></a>

Herhangi bir sorunuz varsa veya AMP'de AddThis uygulaması konusunda yardıma ihtiyacınız olursa lütfen [burada](https://www.addthis.com/support/) bir destek kaydı oluşturarak veya [help@addthis.com](mailto%3ahelp@addthis.com) adresine e-posta göndererek muhteşem destek ekibimizle iletişime geçin.
