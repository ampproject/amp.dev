---
$title: AMP Sayfalarını Doğrulama
---

AMP'nin temel gücü sadece sayfalarınızı hızlandırması değil, aynı zamanda sayfalarınızı *doğrulanabilecek* bir şekilde hızlandırmasıdır. Böylece, Twitter, Instagram veya Google Arama gibi üçüncü taraflar, AMP sayfalarını gittikçe daha ilginç şekillerde okuyucularına sunmayı isteyebilirler.

## Sayfamın geçerli bir AMP olup olmadığını nasıl kontrol edebilirim?

Bir AMP dokümanını doğrulamanın çeşitli yolları vardır. Bu yolların tümü tam olarak aynı sonucu verir. Bu yüzden, geliştirme stiliniz için en uygun yolu kullanın.

AMP'nin geçerliliğine ek olarak, AMP dokümanınızın üçüncü taraf platformları için [bulunabilirliğini](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) de onaylamak isteyebilirsiniz.

### Tarayıcı Developer Console.

AMP Doğrulayıcı, AMP JS kitaplığıyla aynı pakette gelir, dolayısıyla her AMP sayfasında kullanılmak için hazırdır. Doğrulama yapmak için:

1. AMP sayfanızı tarayıcıda açın
1. URL'nin sonuna "`#development=1`" parametresini ekleyin. Örneğin, `http://localhost:8000/released.amp.html#development=1`.
1. [Chrome DevTools konsolunu](https://developers.google.com/web/tools/chrome-devtools/debug/console/) açın ve doğrulama hatalarını kontrol edin.

Developer Console hataları aşağıdaki gibi görünür:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Chrome Developer Console&#39;daki AMP Doğrulayıcı hatalarının ekran görüntüsü" layout="responsive"></amp-img>

### Web Arayüzü

AMP Doğrulayıcı, [validator.ampproject.org](https://validator.ampproject.org/) adresindeki bir web arayüzü gibi kullanılabilir. Bu arayüzde, sayfanın HTML kaynağıyla birlikte hatalar satır içinde görüntülenir.
Arayüz etkileşimli bir düzenleyicidir: HTML kaynağında yapılan değişiklikler etkileşimli  bir şekilde yeniden doğrulamaya neden olur.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Hata örneklerinin bulunduğu validator.ampproject.org web sitesinin ekran görüntüsü." layout="responsive"></amp-img>

### Tarayıcı Uzantısı

AMP Doğrulayıcı'ya, bir tarayıcı uzantısı aracılığıyla doğrudan tarayıcınızın araç çubuğundan erişebilirsiniz. Siz göz atarken Doğrulayıcı da ziyaret ettiğiniz her AMP sayfasını otomatik olarak doğrular ve sayfanın geçerliliğinin görsel göstergesi olarak renkli bir simge gösterir.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Geçersiz AMP dokümanını belirten kırmızı AMP simgesi." layout="fixed"></amp-img>

    </td>
    <td>AMP sayfasında hatalar olduğunda, uzantı simgesi kırmızı renkte görünür ve karşılaşılan hataların sayısını gösterir.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Geçerli AMP dokümanını belirten yeşil AMP simgesi." layout="fixed"></amp-img>

    </td>
    <td>AMP sayfasında hata yoksa simge yeşil renkte görünür ve varsa uyarıların sayısını gösterir.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Tıklandığında AMP HTML varyantını belirten mavi AMP simgesi." layout="fixed"></amp-img>

    </td>
    <td>Sayfanın AMP olmadığı, ancak bir AMP sürümünün bulunduğunu belirttiği durumlarda simge, bir bağlantı simgesiyle mavi renkte gösterilir ve uzantı tıklandığında tarayıcı AMP sürümüne yönlendirilir.
    </td>
  </tr>
</table>

AMP Doğrulayıcı Uzantısı, [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) ve [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/) tarayıcılarında çalışır.

### Komut Satırı Aracı

Bir önkoşul olarak, [sisteminize `npm` paket yöneticisiyle birlikte Node.js dosyasını](https://docs.npmjs.com/getting-started/installing-node) da yüklemeniz gerekebilir.

[AMP HTML doğrulayıcı komut satırı aracını](https://www.npmjs.com/package/amphtml-validator) yüklemek için `npm install -g amphtml-validator` yazın.

Şimdi gerçek bir AMP HTML sayfasını doğrulayalım.

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Bu sayfanın geçerli bir AMP HTML sayfası olması şaşırtıcı değildir. Şimdi geçerli olmayan bir sayfayı deneyelim:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). `amphtml-validator` komutunu çalıştırmak için sayfanın URL'sini veya bir yerel dosya adını sağlayabilirsiniz. [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) dosyasını indirin ve bir dosyaya kaydedin, ardından Doğrulayıcı'yı çalıştırın:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Hata iletileri bir dosya adı, satır, sütun ve iletiden oluşur ve genellikle, bunların ardından AMP HTML referansının bağlantısı verilir. Aralarında Emacs'in de (derleme komutu ve derleme modunu arama) bulunduğu bazı düzenleyiciler bu biçimi yorumlayabilir ve orijinal dosyada hatalara gidebilmenizi sağlayabilir.

Kendi AMP sayfanızı yapmaya [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) dosyasını kullanarak başlayabilirsiniz:

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Komut satırı aracı; rengin kapatılması, JSON çıktısının yazdırılması veya doğrulayıcı Javascript'inin belirli bir sürümünün çalıştırılması (varsayılan olarak en son yayınlanan komut dosyasını çalıştırır) gibi ek özellikler sunar.

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Sayfam geçerli değilse ne olur?

AMP Doğrulayıcı, yalnızca geliştirme sırasında size kolaylık sağlayan bir araç değildir. Ayrıca, AMP sayfalarını içeriklerine ve arama sonuçlarına entegre eden Twitter veya Google gibi platformlar tarafından da kullanılır. Dahası, bu platformlar sayfaları doğrudan sunucunuzdan istemeyip Google AMP Önbelleği'nden yararlanır. Google AMP Önbelleği, sayfalarınızı önbelleğe alan ve daha da hızlı yüklenebilmeleri için bunları dünyada herkesin kullanımına sunan ücretsiz bir hizmettir.

AMP doğrulama hizmeti sayfanızla ilgili bir sorun tespit ederse sayfanız üçüncü taraf web siteleri tarafından bulunup dağıtılmaz ve Google AMP Önbelleği'nde görünmez. Dolayısıyla, sadece önbelleğin hız avantajlarını kaybetmekle kalmazsınız, muhtemelen sayfanız da birçok yerde görülmez! Bu büyük bir kayıp olur, bu yüzden böyle bir şeyin olmayacağından emin olalım.

## Doğrulama hatalarını nasıl düzeltirim?

Çoğu doğrulama hatası kolayca ele alınıp düzeltilebilir. Şu HTML etiketi bir AMP doğrulama hatasına neden olur:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

AMP doğrulama hatasının farklı araçlardaki gösterimi şu şekilde olur:

* Tarayıcı Developer Console
<amp-img alt="AMP hatası: &quot;img&quot; etiketi yalnızca &quot;noscript&quot; etiketinin bir alt öğesi olarak görünebilir.Şunu mu demek istediniz: &quot;amp-img&quot;?11. satır, 2. sütun" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

* Web Arayüzü
<amp-img alt="AMP hatası: &quot;img&quot; etiketi yalnızca &quot;noscript&quot; etiketinin bir alt öğesi olarak görünebilir.Şunu mu demek istediniz: &quot;amp-img&quot;?11. satır, 2. sütun" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

* Tarayıcı Uzantısı
<amp-img alt="AMP hatası: &quot;img&quot; etiketi yalnızca &quot;noscript&quot; etiketinin bir alt öğesi olarak görünebilir.Şunu mu demek istediniz: &quot;amp-img&quot;?11. satır, 2. sütun" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Her araç çeşitli bilgiler sağlar:

1. HTML dokümanında, hatanın ortaya çıktığı konum (satır ve sütun) bazı arayüzlerde ilgili konumun vurgulanması için tıklanabilir. Bu örnekte, sorun 11. satır, 2. sütunda ortaya çıkmıştır.
1. Hatayı açıklayan bir metin satırı. Bu örnekte, metin `<img>` etiketi kullandığımızı, ancak onun yerine bir [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) etiketi kullanmış olmamız gerektiğini belirtmektedir.
1. Hatayla ilgili bir dokümanın bağlantısı. Bu örnekte, [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) etiketine ilişkin dokümanlar. Tüm hatalarda doküman bağlantıları oluşturulmaz.

Bu spesifikasyonu dikkatlice yeniden okuduğumuzda, [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) etiketi kullanmamız gerekirken bir `<img>` etiketi kullandığımızı fark ederiz.

Potansiyel hataların tam listesini daha iyi anlamak için [AMP Doğrulama Hataları kılavuzuna](validation_errors.md) bakın.
Dikkatli bir değerlendirmeden sonra ilerleme kaydedemezseniz [bir soru sorun](http://stackoverflow.com/questions/tagged/amp-html), size yardımcı olmaya çalışalım.
