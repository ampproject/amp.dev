---
'$title': Code du modèle AMP
$order: 9
formats:
  - websites
  - stories
teaser:
  text: head > style[amp-boilerplate] et noscript > style[amp-boilerplate]
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

## <code>head > style[amp-boilerplate]</code> et <code>noscript > style[amp-boilerplate] </code> <a></a>

Les documents HTM AMP doivent contenir le modèle suivant dans leur balise `head`. La validation est actuellement effectuée avec des expressions régulières, il est donc important de garder les mutations aussi minimes que possible. Actuellement, les mutations autorisées sont:

1. Insertion d'espaces arbitraires immédiatement après l'ouverture de la balise `style` et immédiatement avant sa fermeture
2. Remplacement de tout espace dans l'extrait ci-dessous par un espace arbitraire.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Vous pouvez utiliser le [générateur de modèle](https://amp.dev/boilerplate) pour configurer rapidement un squelette de base pour votre page AMP. Il fournit également des extraits de données structurées, pour créer une PWA et plus encore! [/tip]
