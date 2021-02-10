---
'$title': Giriş yapma
$order: 1
description: Sayfaya ilk kez geldiğinizde, 2 yorum ve bir giriş düğmesi görebilirsiniz. Kodda giriş yapma düğmesini ararsanız, şunları bulacaksınız...
---

[Sayfaya](../../../../documentation/examples/previews/Comment_Section.html) ilk kez geldiğinizde, 2 yorum ve bir giriş düğmesi görebilirsiniz.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Kodda giriş yapma düğmesini ararsanız, şunları bulacaksınız:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

[`amp-access`](../../../../documentation/components/reference/amp-access.md) ilgili özniteliklerin davranışı, [`amp-access`](../../../../documentation/components/reference/amp-access.md) için sayfa genelindeki yapılandırmaya bağlıdır, bizim durumumuzda, şu şekildedir:

[sourcecode:html]

<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>

[/sourcecode]

Yetkilendirme uç noktası, AMPByExample'ın parçası olarak dağıtılır. Bu uç noktayı sağlamak sayfanın yayıncısının sorumluluğundadır. Bu örnek durumda, basit olması amacıyla, bu istek alındığında sunucunun `ABE_LOGGED_IN` adlı bir çerezin değerini okuyabilmesi için temel mantığı uyguladık. Çerez orada değilse, `loggedIn = false ` içeren bir JSON yanıtı döndürürüz. Sonuç olarak, bir kullanıcı sayfaya ilk kez geldiğinde, bu istek `loggedIn = false` yanıtı verir ve giriş düğmesi gösterilir.

Düğmenin HTML koduna tekrar baktığımızda, `on="tap: amp-access.login-sign-in"` kodunu kullanarak, kullanıcı düğmeye dokunduğunda, üstteki JSON'da belirtilen URL'nin kullanılması gerektiğini belirtiriz:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **NOT -** Giriş düğümü içinde farklı URL'ler tanımlamanın mümkün olduğuna dikkat edin, bu durumda `sign-in` tanımlıyoruz ve daha sonra `sign-out` tanımlayacağız. [/tip]

Giriş sayfası, basitlik amacıyla giriş ve şifre değerlerini doldurduğumuz AMP olmayan bir sayfadır. AMPByExample sunucusu tarafından sunucu tarafı şablon oluşturması yoluyla doldurulan `returnURL` gizli giriş türünün kullanımına dikkat edin. Sunucu bu değeri, AMP kitaplığı tarafından giriş yapma URL'sine otomatik olarak eklenen `return` adlı bir parametreden okur.

Aşağıdaki örnekte, `return` parametresinin değeri, giriş yapma düğmesine tıkladığınızda isteğe eklenir. Bu değeri, Chrome DevTools konsolunu kullanarak ve Ağ sekmesine giderek keşfedebilirsiniz.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

AMPByExample sunucusu, giriş sayfasından POST isteğini aldıktan ve giriş ve şifre doğru olduktan sonra, isteği yukarıda bahsettiğimiz `returnURL` koduna yönlendirir ve `#success=true` parametresini ekler. AMP çalışma zamanı artık sayfayı yetkilendirebilir ve sonunda bir yorum eklemenize izin verebilir.

Sunucunun uygulanması sayfanın yayıncısının sorumluluğunda olduğundan, AMP çalışma zamanının ne yaptığını ve sunucunun ne yapması gerektiğini anlamak önemlidir.

Hızlı bir özet:

- AMP çalışma zamanı, return parametresini giriş yapma JSON nesnesinde belirtilen giriş yapma isteğine otomatik olarak ekler
- AMP çalışma zamanı, giriş sayfasını kapatır ve dönüş URL parametresi tarafından belirtilen sayfaya yönlendirir
- Sunucu, kullanıcı giriş yapma düğmesine tıkladığında yanıtı düzenlemelidir

[tip type="tip"] **İPUCU –** Bu akışa dair daha ayrıntılı açıklama [`amp-access`](../../../../documentation/components/reference/amp-access.md) bölümünde de bulunabilir. [/tip]
