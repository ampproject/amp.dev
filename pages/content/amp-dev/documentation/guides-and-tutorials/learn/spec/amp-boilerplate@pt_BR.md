---
"$title": Código AMP Boilerplate
order: '9'
formats:
- websites
- stories
teaser:
  text: head > style[amp-boilerplate] e noscript > style[amp-boilerplate]
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md.
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

## `head > style[amp-boilerplate]` e `noscript > style[amp-boilerplate]` <a name="head--styleamp-boilerplate-and-noscript--styleamp-boilerplate"></a>

Documentos AMP HTML devem conter o seguinte código de boilerplate na tag `head`. A validação é realizada via expressões regulares, por isso é importante reduzir as mutações ao mínimo possível. Atualmente, as mutações permitidas são:

1. Inserção de um espaço em branco arbitrário logo depois que a tag `style` abrir e logo antes de fechar
2. Substituição de qualquer espaço no trecho de código abaixo por espaços em branco arbitrários.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Você pode usar o [gerador de boilerplate](https://amp.dev/boilerplate) para configurar rapidamente um esqueleto básico para sua página AMP. Ele também fornece fragmentos de código para dados estruturados, para a criação de PWAs e muito mais! [/tip]
