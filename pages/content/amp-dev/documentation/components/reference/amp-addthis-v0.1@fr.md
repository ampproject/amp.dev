---
$title: amp-addthis
$category@: social
teaser:
  text: Afficher un élément intégré Outils Web AddThis.
---


<!--
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



Ce composant affiche un élément intégré Outils Web [AddThis](https://www.addthis.com).

<table>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
</table>



## Pourquoi utiliser AddThis ? <a name="why-addthis"></a>

Le composant `amp-addthis` propose des boutons de partage particulièrement élégants et faciles à utiliser. Faites en sorte que les visiteurs de votre site Web puissent partager facilement du contenu sur plus de 200 réseaux sociaux, dont Messenger, WhatsApp, Facebook, Twitter, Pinterest et bien d'autres.

AddThis est utilisé par plus de 15 millions de sites Web qui enregistrent plus de deux milliards d'utilisateurs uniques et partagent du contenu dans le monde entier dans plus de soixante langues.

## Boutons "Partager" <a name="share-buttons"></a>

### Barre flottante <a name="floating"></a>

La barre flottante s'affiche sur les côtés, en bas ou en haut de la page. Elle suit le lecteur lorsque l'utilisateur fait défiler la page. Il s'agit là d'un excellent moyen de promouvoir le partage sans gêner la lecture.

Exemple :
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
width="320"
height="92"
layout="responsive"
data-pub-id="ra-5c191331410932ff"
data-widget-id="957l"
data-widget-type="floating">
</amp-addthis>
```

### Inline <a name="inline"></a>

Intégrez des boutons "Partager" dans votre propre contenu pour offrir une expérience de partage fluide.

Exemple :
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
width="320"
height="92"
data-pub-id="ra-5c191331410932ff"
data-widget-id="mv93"
data-widget-type="inline">
</amp-addthis>
```

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>ID d'éditeur AddThis renseigné dans l'URL du <a href="https://addthis.com/dashboard">tableau de bord AddThis</a> une fois la connexion établie. Par exemple, dans l'URL <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>, <code>ra-5c191331410932ff</code>  est l'ID d'éditeur.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>ID de widget AddThis de l'outil à afficher, également disponible dans le <a href="https://addthis.com/dashboard">tableau de bord AddThis</a>. Vous pouvez également afficher l'ID de widget d'un outil spécifique en ouvrant cet outil dans le tableau de bord AddThis, puis en copiant la dernière partie de l'URL. Par exemple, dans l'URL  <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>, <code>957l</code> est l'ID de widget.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Attribut décrivant le type de widget.
      <ul>
        <li>Barre flottante : <code>data-widget-type="floating"</code></li>
        <li>Inline : <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>Facultatif. Si cet attribut est défini, il s'agit du titre que l'outil AddThis essaie de partager. Dans le cas contraire, le titre du document contenant la balise <code>amp-addthis</code> est utilisé.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>Facultatif. Si cet attribut est défini, il s'agit de l'URL que l'outil AddThis essaie de partager. Dans le cas contraire, la propriété <code>location.href</code> du document contenant la balise <code>amp-addthis</code> est utilisée.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>Facultatif. Si cet attribut est défini, il s'agit de l'URL d'un élément multimédia (une image ou une vidéo, par exemple) que l'outil AddThis essaie de partager. Dans le cas contraire, cet attribut reste dans l'état "non défini".</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>Facultatif. Si cet attribut est défini, il s'agit de la description de la page que l'outil AddThis essaie de partager. Dans le cas contraire, cet attribut reste dans l'état "non défini".</td>
    </tr>
  </table>

## Documentation de mise en œuvre <a name="implementation-documentation"></a>

1. Si vous ne l'avez pas encore fait, vous devez créer un compte AddThis à l'adresse [https://www.addthis.com/register](https://www.addthis.com/register). Cette procédure est entièrement gratuite. Un compte AddThis vous permet d'accéder à notre suite complète d'outils Web, ainsi qu'à nos rapports d'analyse détaillés pour mieux comprendre le trafic issu des réseaux sociaux sur votre site Web.
1. Accédez à votre [tableau de bord](https://addthis.com/dashboard) et personnalisez vos boutons "Partager" (pour le moment, AMP accepte uniquement les boutons de partage de type "Barre flottante" et "Inline").
1. Personnalisez vos boutons de partage et appuyez ensuite sur "activate tool" (activer l'outil). Vous êtes alors redirigé vers la page "Get The Code" (Obtenir le code).
1. Pour terminer, copiez et collez le code intégré dans la section "body" de la page où doivent figurer les boutons de partage. Dans le cas d'un bouton de partage de type "Barre flottante", vous pouvez placer ce code n'importe où dans la section "body". En effet, il sera affiché sur le côté gauche ou droit de votre écran en fonction de l'endroit où vous l'avez défini dans les paramètres de l'outil.

Voilà, c'est fait ! Les boutons de partage doivent à présent être affichés sur votre page.

Visionnez cette [vidéo YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) pour obtenir des instructions détaillées :
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-addthis](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii) dans les spécifications du validateur AMP.

## Vie privée <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

Les outils AddThis et la barre d'outils AddThis recueillent des informations à partir de l'appareil employé par l'utilisateur final pour interagir avec les sites de l'éditeur ou par l'utilisateur de la barre d'outils pour interagir avec la barre d'outils AddThis ("Données AddThis").

Les données AddThis peuvent se composer des éléments suivants :

* Adresse IP (Internet Protocol), identifiant publicitaire pour mobile (MAID) (un identifiant qui permet aux développeurs d'applications mobiles d'identifier les utilisateurs de leurs applications), identifiant d'application mobile, type de navigateur, langue du navigateur, type de système d'exploitation, et date et heure auxquelles l'utilisateur final a visité le site d'un éditeur ou une barre d'outils.
* Internaute qui a utilisé la barre d'outils.
* Comportement sur le site d'un éditeur : durée de la visite sur le site d'un éditeur, manière dont l'utilisateur final a partagé le contenu sur le site et comportement de défilement adopté par l'utilisateur.
* URL de provenance et type de recherche sur le Web que l'utilisateur final a employée pour rechercher le site d'un éditeur et y accéder.
* Mots clés saisis dans la fonctionnalité de recherche de la barre d'outils AddThis, et informations relatives au téléchargement, à l'installation ou à la désinstallation de la barre d'outils AddThis.
* Informations sur la fréquence à laquelle un utilisateur final se sert des outils AddThis et sur la fréquence à laquelle un utilisateur de la barre d'outils utilise la barre d'outils AddThis.
* Données de géolocalisation déduites de l'adresse IP d'un utilisateur final et d'un utilisateur de la barre d'outils.

Les données AddThis seront traitées comme des informations à caractère personnel dans la mesure requise par la loi applicable. Conformément aux conditions d'utilisation d'AddThis, les éditeurs sont tenus d'obtenir toutes les autorisations et tous les consentements nécessaires de la part des utilisateurs finaux, et de fournir toutes les notifications requises pour transmettre à Oracle les données AddThis collectées auprès des utilisateurs finaux.

## Assistance <a name="support"></a>

Si vous avez des questions ou avez besoin d'aide pour mettre en œuvre AddThis sur AMP, contactez notre extraordinaire équipe de support en envoyant une demande d'assistance [ici](https://www.addthis.com/support/) ou en envoyant un e-mail à l'adresse [help@addthis.com](mailto%3ahelp@addthis.com).
