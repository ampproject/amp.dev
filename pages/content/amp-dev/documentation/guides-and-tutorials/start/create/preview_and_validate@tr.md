---
$title: Önizleyin ve Doğrulayın
---

AMP sayfasını diğer statik HTML sitelerinde olduğu gibi önizleyin. Derleme ya da önizleme gerekli değildir. Ya:

  - **Doğrudan dosya sistemindeki tarayıcıda açın** (XMLHttpRequests hatasından dolayı belli ögeler çalışmayabilir).
  - **Apache 2 veya Nginx gibi yerel bir web sunucusu kullanın**.
    *(İpucu: Hızlı bir web sunucusu için,`python -m SimpleHTTPServer` çalıştırın.)*

Ardından, AMP sayfanızın **gerçekten geçerli bir AMP olduğundan** ya da Google Arama gibi üçüncü şahıs platformlar tarafından bulunup dağıtılmayacağından emin olun. Doğrulamak için:

  1. Sayfanızı tarayıcınızda açın.
  1. URL›ye "`#development=1`" ekleyin; örneğin, `http://localhost:8000/released.amp.html#development=1`.
  1. [Chrome DevTools konsolu](https://developers.google.com/web/tools/chrome-devtools/debug/console/) açın ve doğrulama hataları olup olmadığına göz atın.

[Doğrulama hakkında daha fazla bilgi](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) ve hata aldığınızda ne yapacağınızı öğrenin.
