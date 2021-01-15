---
"$title": El código reutilizable en AMP
order: '9'
formats:
- websites
- stories
teaser:
  text: " head > style[amp-boilerplate] and noscript > style[amp-boilerplate]"
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

##  <code>head > style[amp-boilerplate]</code> y <code>noscript > style[amp-boilerplate]</code>

Los documentos AMP HTML deben incluir el siguiente código reutilizable en su etiqueta `head`. Actualmente, la validación se lleva a cabo con expresiones regulares, de modo que es importante mantener el menor número de mutaciones como sea posible. Actualmente, las mutaciones permitidas son:

1. Insertar espacios en blanco de forma arbitraria inmediatamente después de que se abra la etiqueta `style` y justo antes de que se cierre.
2. Reemplazar cualquier espacio en el fragmento de abajo con espacios en blanco colocados de manera arbitraria.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Puede utilizar el [generador de código reutilizable](https://amp.dev/boilerplate) para configurar rápidamente una estructura básica para su página de AMP. ¡También proporciona fragmentos del código fuente para datos estructurados, para crear una PWA y muchas cosas más! [/tip]
