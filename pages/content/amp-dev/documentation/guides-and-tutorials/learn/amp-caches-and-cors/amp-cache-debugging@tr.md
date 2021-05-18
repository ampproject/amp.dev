---
'$title': Hata Ayıklama AMP Önbellek sorunları
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: Belgem neden AMP önbelleğinde bozuk?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Belgem neden AMP önbelleğinde bozuk? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Geçerli AMP belgeleri genellikle AMP Önbelleklerinde orijinalinde olduğu gibi görünür ve aynı şekilde davranır. Ancak, sorunlu olabilecek bazı bileşenler ve sunucu yapılandırmaları vardır.

Belirli bir belge orijinalinde beklendiği gibi görünüyorsa ve davranıyorsa, ancak önbellek aracılığıyla görüntülenemiyorsa ([orijininal URL'leri Google'ın AMP önbelleğine nasıl eşleştirirsiniz](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), aşağıdakileri deneyin:

1. Tarayıcınızın geliştirici/hata araçları konsolunu açın ve ortaya çıkan hataları veya uyarıları giderin.
2. Belgeyi [AMPBench](https://ampbench.appspot.com/) ile çalıştırın ve beklenmeyen hataları veya uyarıları giderin.

Bu adımları izledikten sonra hala bir sorun varsa, aşağıdaki tabloya bakın.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Belirti</th>
      <th width="30%">Sorun</th>
      <th width="40%">Çözüm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Web yazı tipleri görünmüyor (alternatif yazı tipleri kullanılmış)</td>
      <td>AMP önbelleği, yazı tipi sağlayıcısı tarafından beyaz listede değil.</td>
      <td>Yazı tipi sağlayıcısına başvurun ve izin verilen listesindeki <a href="amp-cors-requests.md#cors-security-in-amp">tüm önbellekleri</a> isteyin.</td>
    </tr>
    <tr>
      <td>Varlıklar (örneğin, yazı tipleri ve resimler) görünmüyor  (<strong>Yalnızca HTTP kökenliler</strong>)</td>
      <td>Belge protokolle ilgili URL'leri kullanır.</td>
      <td>Mutlak URL'lere geçin (yani, <code>http://www.site.com/doc/amp</code>, <code>//www.site.com/doc/amp</code> değil).</td>
    </tr>
    <tr>
      <td rowspan="2">Varlıklar (örneğin, yazı tipleri ve resimler) görünmüyor</td>
      <td>Varlıklar, yanlış MIME türüyle sunulur.</td>
      <td>
<a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">Kabul edilebilir bir MIME türü</a> belirtin.</td>
    </tr>
    <tr>
      <td>AMP önbelleği varlıklara erişemiyor.</td>
      <td>AMP önbelleğinin varlıklarınıza erişebildiğinden ve bir IP adresi veya bir kullanıcı aracısı vb. tarafından engellenmediğinden emin olun. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Google'ın tarayıcısı tarafından kullanılan kullanıcı aracılarının listesi</a>).</td>
    </tr>
    <tr>
      <td>
<code><amp-form></amp-form></code>, <code><amp-list></amp-list></code> gibi dinamik öğeler beklendiği gibi davranmıyor.</td>
      <td>Kırık veya eksik CORS başlıkları.</td>
      <td>Bu bileşenler, AMP Önbelleğinden kaynağınıza çapraz kaynak isteklerinde bulunur. Varsayılan olarak, tarayıcılar bu istekleri engeller. Bu isteklere izin vermek için, <a href="amp-cors-requests.md">tüm önbellekleri</a> listelemeye izin veren <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS başlıklarını</a> yayınlayın.</td>
    </tr>
    <tr>
      <td>Yasal bir yayından kaldırma bildirimi nedeniyle kaldırılması gereken içerik sunuluyor.</td>
      <td>AMP Önbelleği henüz kaldırma işlemini almadı.</td>
      <td>İçeriği yenilemek için her AMP Önbelleğinin yönergelerini izleyin. Google AMP Önbelleği için <a href="https://developers.google.com/amp/cache/update-cache">AMP İçeriğini Güncelleme</a> konusuna bakın.</td>
    </tr>
</tbody>
</table>

</table>
