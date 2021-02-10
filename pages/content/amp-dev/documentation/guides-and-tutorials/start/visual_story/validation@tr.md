---
'$title': "AMP HTML'nizi doğrulama"
$order: 8
description: "Web Hikayeleri AMP ile oluşturulduğundan, AMP HTML'nizin doğru olduğunu her zaman doğrulamalısınız. AMP sayfalarını doğrulamak için kullanabileceğiniz birkaç yöntem vardır."
author: bpaduch
---

Web Hikayeleri AMP ile oluşturulduğundan, AMP HTML'nizin doğru olduğunu her zaman doğrulamalısınız. [AMP sayfalarını doğrulamak için kullanabileceğiniz birkaç yöntem vardır](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Bu öğreticide, geliştirici modunu açarak AMP Doğrulayıcıyı etkinleştireceğiz. Geliştirici modunu açmak için aşağıdaki parça tanımlayıcısını URL'nize ekleyin ve sayfayı yeniden yükleyin:

```text
#development=1
```

Örneğin:

```text
http://localhost:8000/pets.html#development=1
```

[Developer Console'u](https://developer.chrome.com/devtools/docs/console) Chrome'da (veya tercih ettiğiniz tarayıcıda) açın ve AMP hatası olmadığını doğrulayın. Doğrulama mesajlarını görmek için tarayıcınızı yenilemeniz gerekebilir. Sayfanız hatasızsa, şu mesajı görmelisiniz:

```text
 AMP validation successful.
```
