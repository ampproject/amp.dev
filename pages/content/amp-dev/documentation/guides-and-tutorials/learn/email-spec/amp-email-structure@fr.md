---
'$title': Structure et affichage des e-mails AMP
$order: 2
formats:
  - email
teaser:
  text: "L'e-mail est structuré comme une "
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

L'e-mail est structuré comme une arborescence MIME. Cette arborescence MIME contient le corps du message et toutes les pièces jointes à l'e-mail.

Pour intégrer AMP dans un e-mail, ajoutez une nouvelle partie MIME avec un type de contenu `text/x-amp-html` descendant de `multipart/alternative`. Il doit cohabiter avec les parties `text/html` ou `text/plain` existantes. Cela garantit que le message électronique fonctionne sur tous les clients.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP pour le diagramme des pièces MIME de courrier électronique" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Pour plus d'informations sur le sous-type `multipart/alternative`, reportez-vous à la [RFC 1521, section 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Informations supplémentaires <a name="additional-information"></a>

La partie `text/x-amp-html` doit être imbriquée sous un nœud `multipart/alternative`. Un e-mail ne peut pas avoir plus d'une partie `text/x-amp-html` dans un nœud `multipart/alternative`.

`multipart/alternative` doit contenir au moins un nœud non AMP (`text/plain` ou `text/html`) en plus du nœud `text/x-amp-html`. Cela sera affiché aux utilisateurs dont les clients de messagerie ne prennent pas en charge AMP ou qui se sont désinscrits via les paramètres de leur fournisseur de messagerie.

Remarque : certains clients de messagerie[[1]](https://openradar.appspot.com/radar?id=6054696888303616) ne renverront que la dernière partie MIME, nous vous recommandons donc de placer la partie MIME `text/x-amp-html` _avant_ la partie MIME `text/html`.

### Sémantique de réponse/transfert <a name="replyingforwarding-semantics"></a>

Le client de messagerie supprime la partie `text/x-amp-html` de l'arborescence MIME lorsqu'un utilisateur répond ou transfère un e-mail AMP.

### Expiration <a name="expiry"></a>

Le client de messagerie peut cesser d'afficher la partie AMP d'un e-mail après une période de temps définie, par exemple 30 jours. Dans ce cas, les e-mails afficheront la partie `text/html` ou `text/plain`.

## Exemple <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://ampjs.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->
