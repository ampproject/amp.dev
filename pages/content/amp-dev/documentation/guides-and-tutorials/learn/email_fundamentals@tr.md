---
'$title': E-posta için AMP Temelleri
$order: 1
description: Geçerli AMP E-postaları yazmaya başlamak için bilmeniz gereken her şey.
author: CrystalOnScript
formats:
  - email
---

AMP'ye aşinaysanız, harika haberlerimiz var! E-postalar için AMP, AMP HTML kitaplığının yalnızca bir alt kümesidir. AMP'ye aşina değilseniz bile, yine de harika bir haberimiz var! Bu kılavuz size geçerli AMP E-postaları yazmaya başlamak için bilmeniz gereken her şeyi gösterecektir!

## Gerekli İşaretleme

AMP E-postaları klasik HTML e-postaları gibi görünür, ancak birkaç farklılık vardır. Bir e-postayı geçerli bir AMP e-postası yapmak için gereken minimum işaretleme (markup) miktarı aşağıda verilmiştir.

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

AMP E-postalarını destekleyen e-posta sağlayıcıları, kullanıcıların keyifli ve güvenli bir deneyim yaşamalarını sağlamak için güvenlik kontrolleri ayarlamıştır. AMP ile oluşturulan bir e-posta tüm gereksinimleri karşılamalıdır:

- `<!doctype html>` belge türü ile başlayın. Bu aynı zamanda HTML için de standarttır.
- Üste seviye bir `<html amp4email>` etiketi ya da e-postanız ekstra havalıysa `<html ⚡4email>` etiketi koyun. Bu etiket, belgeyi AMP E-postası olarak tanımlar ve bu şekilde işlenmesini sağlar.
- Hem `<head>` hem de `<body>` etiketlerini tanımlayın. Bu, HTML'de isteğe bağlıdır ancak AMP her şeyi saf halde tutar!
- `<head>` etiketinin bir alt öğesi olarak `<meta charset="utf-8>` etiketi ekleyin. Bu etiket, sayfanın kodlamasını tanımlar.
- AMP kitaplığı, `<head>` içine yerleştirilmiş bir `<script async src="https://ampjs.org/v0.js"</script>` etiketi aracılığıyla içe aktarılır. Bu olmadan, AMP ile kazanılan harika ve dinamik işlevlerin hiçbiri çalışmayacaktır! En iyi uygulama olarak, bu öğe mümkün olduğunca erken bir zamanda, `<head>` içinde doğrudan `<meta charset="utf-8">` etiketinin altına eklenmelidir.
- E-posta için AMP standart metnini `<head>` bölümüne yerleştirerek AMP kitaplığı yüklenene kadar e-posta içeriğini başlangıçta gizleyin.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### AMP'ye Özgü Etiket Değiştirmeleri

E-posta için AMP kitaplığı, AMP HTML kitaplığının bir alt kümesi olduğundan, aynı kuralların çoğu geçerlidir; AMP'ye özgü etiketler, çok kaynak tüketen HTML etiketlerinin yerini alır ve tanımlanmış bir genişlik ve yükseklik gerektirir. Bu, AMP standart metninin, kullanıcının cihazında nasıl göründüğüne dair bir fikre sahip olana kadar içeriği gizlemesine olanak tanır.

#### Resimler

Sayfayı etkili bir şekilde boyamak için tüm `<img>` etiketleri [`<amp-img>`](../../../documentation/components/reference/amp-img.md) ile değiştirilir. `<amp-img>` etiketi, tanımlı bir genişlik ve yükseklik gerektirir ve [AMP'nin yerleşim sistemini](amp-html-layout/index.md) destekler

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

`<amp-img>` etiketi, duyarlı tasarımı kontrol etmek ve yedekleri ayarlamak için güçlü, yerleşik yöntemlerle birlikte gelir.

[tip type="note"] AMP [yerleşimini ve medya sorgularını](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) kullanma ve [yedek resimlerin](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) nasıl ayarlanacağı hakkında daha fazla bilgi edinin. [/tip]

#### GIF'ler

AMP, animasyon ekran dışındayken AMP çalışma zamanının CPU kullanımını azaltmasına olanak tanıyan GIF görüntüleri için özel bir etiket olan [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email) bileşenini oluşturmuştur. `<amp-img>` bileşenine benzer şekilde genişlik ve yükseklik tanımlanır ve öğe de bir kapanış etiketi içermelidir.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Ek olarak, `src` dosyası yüklenirken görüntülenecek isteğe bağlı bir `placeholder` alt öğesini destekler ve AMP yerleşim sistemini destekler.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Stil sahibi e-postalar <a name="emails-with-style"></a>

Tüm e-posta istemcileri gibi, AMP de satır içi `style` özniteliklerine izin verir, ancak e-postanın başlığının içindeki `<style amp-custom>` etiketi içinde de CSS'yi destekler.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

HTML e-postaları gibi, E-posta için AMP, CSS seçicilerinin ve özelliklerinin sınırlı bir alt kümesini destekler.

AMP destekleyen e-posta istemcilerinde izin verilen CSS tam listesi için [E-posta için AMP'nin Desteklediği CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) bölümüne bakın.

[tip type="important"] AMP stil için 75,000 bayt sınırını uygular. [/tip]

## İzin Verilen AMP Bileşenleri

AMP bileşenlerinin dinamik, görsel ve etkileşimli özellikleri, AMP E-postalarını e-postanın geleceğine taşıyan şeydir.

[E-posta için AMP'de desteklenen bileşenlerin tam listesi](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md), E-posta için AMP teknik özelliklerinin bir parçası olarak mevcuttur.

## İstekleri doğrulama

Dinamik kişiselleştirilmiş e-posta içeriği genellikle kullanıcının kimliğinin doğrulanmasını gerektirir. Ancak, kullanıcı verilerini korumak için AMP e-postalarının içinden yapılan tüm HTTP isteklerinin proxy'si yapılabilir ve çerezlerden arındırılabilir.

AMP e-postalarından yapılan istekleri doğrulamak için erişim belirteçlerini kullanabilirsiniz.

### Erişim belirteçleri

Kullanıcının kimliğini doğrulamak için erişim belirteçlerini kullanabilirsiniz. Erişim belirteçleri e-posta gönderen tarafından sağlanır ve kontrol edilir. Gönderen, belirteçleri yalnızca AMP e-postasına erişimi olanların bu e-postada yer alan istekleri yapabilmesini sağlamak için kullanır. Erişim belirteçleri, kriptografik olarak güvenli ve zaman ve kapsam açısından sınırlı olmalıdır. Bunlar isteğin URL'sine dahil edilirler.

Bu örnek, kimliği doğrulanmış verileri görüntülemek için `<amp-list>` kullanımını gösteriyor:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

Benzer şekilde `<amp-form>` kullanılırken, erişim belirtecinizi `action-xhr` URL'sine yerleştirin.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Örnek

Aşağıdaki örnek, oturum açmış kullanıcıların hesaplarına not eklemesine ve daha sonra görüntülemesine olanak tanıyan varsayımsal bir not alma hizmetini ele almaktadır. Hizmet, `jane@example.com` adlı bir kullanıcıya, önceden aldıkları notların listesini içeren bir e-posta göndermek istiyor. Mevcut kullanıcının notlarının listesi, JSON biçiminde `https://example.com/personal-notes` uç noktasında mevcuttur.

E-postayı göndermeden önce hizmet, `jane@example.com: A3a4roX9x` için kriptografik olarak güvenli bir sınırlı kullanım erişim belirteci oluşturur. Erişim belirteci, URL sorgusunun içindeki ` exampletoken` alan adına dahil edilir:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

Uç nokta `https://example.com/personal-notes`, exampletoken parametresini doğrulamaktan ve belirteçle ilişkili kullanıcıyı bulmaktan sorumludur.

### Sınırlı Kullanımlı Erişim Belirteçleri

Sınırlı Kullanımlı Erişim Belirteçleri, istek sahtekarlığı ve [yeniden oynatma saldırılarına karşı](https://en.wikipedia.org/wiki/Replay_attack) koruma sağlar ve işlemin mesajı gönderen kullanıcı tarafından gerçekleştirilmesini sağlar. Koruma, istek parametrelerine benzersiz bir belirteç parametresi ekleyerek ve eylem başlatıldığında bunu doğrulayarak sağlanır.

Belirteç parametresi, yalnızca belirli bir eylem ve belirli bir kullanıcı için kullanılabilen bir anahtar olarak oluşturulmalıdır. İstenen eylem gerçekleştirilmeden önce, belirtecin geçerli olup olmadığını ve kullanıcı için oluşturduğunuzla eşleşip eşleşmediğini kontrol etmelisiniz. Belirteç eşleşirse, eylem gerçekleştirilebilir ve belirteç gelecekteki istekler için geçersiz hale gelir.

Erişim belirteçleri, HttpActionHandler öğesinin url özelliğinin bir parçası olarak kullanıcıya gönderilmelidir. Örneğin, uygulamanız `http://www.example.com/approve?requestId=123` adresindeki onay isteklerini işliyorsa, buna ek bir `accessToken` parametresi eklemeyi ve `http://www.example.com/approve?requestId=123&accessToken=xyz` adresine gönderilen istekleri dinlemeyi hesaba katmalısınız.

<code>requestId=123</code> ve `accessToken=xyz` kombinasyonu, önceden oluşturmanız gereken kombinasyondur ve `accessToken` belirtecinin `requestId` kimliğinden çıkarılamayacağından emin olmalısınız. <code>requestId=123</code> içeren ve `accessToken` içermeyen veya `xyz` değerine eşit olmayan bir `accessToken` içeren tüm onay istekleri reddedilmelidir. Bu istek yerine getirildiğinde, aynı kimliğe ve erişim belirtecine sahip gelecekteki tüm istekler de reddedilmelidir.

## Farklı e-posta istemcilerinde test etme

E-posta için AMP'yi destekleyen e-posta istemcileri, entegrasyonunuzda size yardımcı olmak için kendi belgelerini ve test araçlarını sağlar.

Daha fazla bilgi ve e-posta istemcisine özel belgelere bağlantılar için [AMP E-postalarını Test Etme](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) bölümüne bakın.
