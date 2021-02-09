---
'$title': AMP Boilerplate Code
$order: 9
formats:
  - websites
  - stories
teaser:
  text: head > style[amp-boilerplate] und noscript > style[amp-boilerplate]
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

## `head > style[amp-boilerplate]` und `noscript > style[amp-boilerplate]` <a name="head--styleamp-boilerplate-and-noscript--styleamp-boilerplate"></a>

AMP HTML Dokumente müssen das folgende Boilerplate in ihrem `head` Tag enthalten. Die Validierung erfolgt derzeit mit regulären Ausdrücken. Darum ist es wichtig, Mutationen so gering wie möglich zu halten. Derzeit sind folgende Mutationen zulässig:

1. Einfügen eines beliebigen Leerzeichens direkt nach dem Öffnen des `style` Tags und direkt vor dem Schließen
2. Ersetzen eines beliebigen Leerzeichens im folgenden Snippet durch ein arbiträres Leerzeichen.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Mit dem [Boilerplate Generator](https://amp.dev/boilerplate) kannst du schnell ein Grundgerüst für deine AMP Seite anlegen. Dieser bietet auch Snippets für strukturierte Daten, um unter anderem eine PWA zu erstellen! [/tip]
