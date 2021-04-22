---
'$title': AMP Standart Metin Kodu
$order: 9
formats:
  - websites
  - stories
teaser:
  text: head > style[amp-boilerplate] ve noscript > style[amp-boilerplate]
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-boilerplate.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## `head > style[amp-boilerplate]` ve `noscript > style[amp-boilerplate]` <a name="head--styleamp-boilerplate-and-noscript--styleamp-boilerplate"></a>

AMP HTML belgeleri, `head` etiketlerinde aşağıdaki standart metni içermelidir. Doğrulama şu anda normal ifadelerle yapılmaktadır, bu nedenle değişiklikleri olabildiğince az tutmak önemlidir. Şu anda izin verilen değişiklikler şunlardır:

1. `style` etiketi açıldıktan hemen sonra ve kapanmadan hemen önce rasgele boşluk ekleme
2. Aşağıdaki kod parçacığındaki herhangi bir boşluğu rastgele bir boşlukla değiştirme.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] [Standart metin oluşturucuyu](https://amp.dev/boilerplate), AMP sayfanız için hızlı bir şekilde temel bir iskelet oluşturmak için kullanabilirsiniz. Ayrıca, bir PWA oluşturmak ve daha fazlasını yapmak adına yapılandırılmış veriler için kod parçacıkları sağlar! [/tip]
