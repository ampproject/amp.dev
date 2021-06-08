---
'$title': Codice Boilerplate AMP
$order: 9
formats:
  - websites
  - stories
teaser:
  text: head > style[amp-boilerplate]
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md.
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

## head > style[amp-boilerplate] e noscript > style[amp-boilerplate]

I documenti AMP HTML devono contenere il seguente boilerplate nel loro tag `head`. La convalida viene attualmente eseguita con espressioni regolari, quindi è importante ridurre al minimo le variazioni. Attualmente, le variazioni consentite sono:

1. Inserimento di un numero qualunque di spazi bianchi immediatamente dopo l'apertura del tag `style` e immediatamente prima della sua chiusura
2. Sostituzione di qualsiasi spazio nel frammento seguente con un numero qualunque di spazi bianchi.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Si può utilizzare il [generatore boilerplate](https://amp.dev/boilerplate) per definire rapidamente la struttura di base per le pagine AMP. Tale strumento fornisce anche frammenti per dati strutturati, per creare PWA (progressive web app - applicazioni web progressive) e molto altro! [/tip]
