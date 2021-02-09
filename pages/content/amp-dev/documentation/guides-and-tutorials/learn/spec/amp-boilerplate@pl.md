---
'$title': Kod standardowy AMP
$order: 9
formats:
  - websites
  - stories
teaser:
  text: ' head > style[amp-boilerplate] i noscript > style[amp-boilerplate]'
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

## <code>head > style[amp-boilerplate]</code> i <code>noscript > style[amp-boilerplate]</code>

Dokumenty AMP HTML muszą zawierać następujący kod standardowy w sekcji `head`. Walidacja jest obecnie przeprowadzana za pomocą wyrażeń regularnych, więc ważne jest, aby utrzymać modyfikacje na jak najniższym poziomie. Obecnie dozwolone są następujące modyfikacje:

1. Wstawianie dowolnego odstępu bezpośrednio po otwarciu znacznika `style` i bezpośrednio przed jego zamknięciem
2. Zastąpienie dowolnej spacji w poniższym fragmencie dowolnym odstępem.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] W celu szybkiego utworzenia podstawowego szkieletu strony AMP można użyć [generatora kodu standardowego](https://amp.dev/boilerplate). Dostarcza on również fragmenty kodu danych strukturalnych, umożliwiające utworzenie PWA itd.! [/tip]
