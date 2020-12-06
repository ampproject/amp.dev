---
"$title": Çıkış yapma
"$order": '3'
description: '"Giriş düğmesine benzer şekilde, çıkış düğmesinin varlığı amp-access bileşeninin durumuna koşullu olarak bağlıdır:"'
---

Giriş düğmesine benzer şekilde, çıkış düğmesinin varlığı [`amp-access`](../../../../documentation/components/reference/amp-access.md) bileşeninin durumuna koşullu olarak bağlıdır:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Çıkış düğmesini tıkladığınızda, giriş yapma nesnesinin bir parçası olarak [`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON yapılandırmasında belirttiğiniz URL'ye yönlendirilirsiniz:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Girişe benzer şekilde, AMPByExample sunucusu bir çıkış isteği aldığında, AMP kitaplığı tarafından otomatik olarak eklenen dönüş URL'si sorgu parametresini kullanır ve buna yönlendirme yaparak <code>#success=true</code> kodunu ekler. Bu an itibarıyla ilk sayfaya geri dönersiniz; daha önce giriş sayfası için oluşturulan AMPByExample çerezi (`ABE_LOGGED_IN` olarak adlandırılır) bu noktada temizlenir.
