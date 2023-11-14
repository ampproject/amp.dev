---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Permettre aux éditeurs de s'intégrer facilement à la plate-forme de micropaiement LaterPay.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Ce composant permet aux éditeurs de s'intégrer facilement à la plate-forme de micropaiement [LaterPay](https://www.laterpay.net). `amp-access-laterpay` est basé sur [AMP Access](amp-access.md) et requiert cette extension.

<table>
  <tr>
    <td class="col-fourty"><strong>Scripts requis</strong></td>
    <td>
      <small>Notez que vous avez besoin de scripts pour "amp-access-laterpay", "amp-access" et "amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://ampjs.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-access-laterpay/">exemple de composant amp-access-laterpay annoté</a> sur AMP By Example.</td>
  </tr>
</table>


## Comportement <a name="behavior"></a>

[LaterPay](https://laterpay.net) est une plate-forme de micropaiement qui permet aux utilisateurs d'acheter du contenu en ligne en seulement deux clics, puis d'y accéder immédiatement, sans inscription initiale, sans fournir de données à caractère personnel et sans effectuer de paiement. Les utilisateurs paient uniquement lorsque le montant de leurs achats atteint un total de 5 $ ou 5 € sur l'ensemble des sites Web. Les fournisseurs de contenu peuvent vendre des articles individuels ou des forfaits au temps, ce qui permet un accès forfaitaire au contenu ou un accès limité dans le temps.

Si vous intégrez LaterPay à l'aide du [script Connector](https://docs.laterpay.net/connector/), vous ne pourrez pas utiliser cette intégration sur les pages AMP. Le composant `amp-access-laterpay` est comparable au script Connector, en ce sens qu'il offre un ensemble de fonctionnalités équivalent, mais conçu pour les pages AMP.

Il est également possible de vendre du contenu via LaterPay en utilisant simplement `amp-access-laterpay` comme unique méthode d'intégration.

Le composant `amp-access-laterpay` utilise AMP Access en interne pour fournir un comportement semblable à cette extension, mais adapté à une utilisation avec le service LaterPay.

Si vous souhaitez utiliser votre propre service de paywall avec AMP Access et avec LaterPay sur la même page, sachez que [cela est également possible](#using-amp-access-laterpay-together-with-amp-access).

Le composant `amp-access-laterpay` ne nécessite pas de configuration d'autorisation ou de pingback, car il est préconfiguré pour fonctionner avec le service LaterPay. De plus, il n'est pas nécessaire de configurer manuellement des liens de connexion.

Les différentes options d'achat peuvent être configurées sur le compte LaterPay de l'éditeur. Le composant récupérera alors la configuration et créera une liste des options d'achat disponibles.

Pour savoir comment configurer les options d'achat, reportez-vous à la documentation relative à la configuration du script [LaterPay Connector](https://docs.laterpay.net/connector/configuration/), l'intégration au frontal de LaterPay.

La liste générée peut être mise en forme et présentée selon les préférences de l'éditeur.

Ce composant utilise également le [balisage de contenu accessible](amp-access.md#access-content-markup) pour afficher et masquer le contenu.

## Configuration <a name="configuration"></a>

La configuration est semblable à celle d'AMP Access, si ce n'est qu'aucune autorisation, aucun pingback et aucun lien de connexion ne sont nécessaires.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Les valeurs suivantes peuvent être définies dans l'objet de configuration `laterpay` :

<table>
  <tr>
    <th class="col-fourty">Propriété</th>
    <th class="col-twenty">Valeurs</th>
    <th class="col-fourty">Description</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Sélecteur CSS <strong>requis</strong></td>
    <td>Sélecteur CSS qui détermine l'élément de la page où se trouve le titre de l'article. De cette manière, la page présentée en vue de l'achat de l'article contiendra ce titre, de sorte que l'utilisateur sache ce qu'il achète.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Liste d'identifiants séparés par des virgules</td>
    <td>Par défaut, l'URL d'un article est utilisée pour l'associer à une option d'achat. Cependant, au lieu de spécifier un chemin d'URL pour une option d'achat, vous pouvez définir un ID d'article dans l'interface utilisateur de LaterPay Connector, puis utiliser la propriété <code>articleId</code> pour faire correspondre l'article à l'option d'achat.
      <br>
        Cela s'avère nécessaire lorsque la mise en correspondance d'une option d'achat en fonction de l'URL d'un article n'offre pas une flexibilité suffisante. Consultez la <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">page de configuration de LaterPay Connector()</a> pour passer en revue quelques exemples d'utilisation de cette propriété.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Jeton JWT pour une configuration dynamique des paiements</td>
        <td>Cette option vous permet de spécifier un jeton Web JSON signé avec une configuration pour le contenu payant disponible. Cela signifie que vous pouvez fournir une configuration intégrée, générée de façon automatisée dans vos pages, au lieu de la spécifier manuellement dans l'interface d'administration de Connector du service LaterPay. Cela peut s'avérer particulièrement utile lorsque vous configurez des achats uniques pour de nombreux articles différents.
          <br>
            Pour plus d'informations sur la création de ce jeton et sur le contenu qui peut y être spécifié, consultez la documentation de l'<a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">API JWT Paid Content</a> de LaterPay relative à l'intégration du script Connector.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>chaîne</td>
          <td>Définit le style de mise en forme du prix approprié aux paramètres régionaux.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>objet</td>
          <td>Permet à l'éditeur de personnaliser ou de localiser le texte figurant dans la liste des options d'achat qui a été générée. Pour plus d'informations à ce sujet, consultez la section <a href="#localization">Localisation</a>.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>valeur booléenne</td>
          <td>Si la valeur est définie sur true, cette propriété fait défiler la page vers le haut une fois le processus d'autorisation terminé. Cela peut s'avérer utile si l'emplacement d'affichage de la boîte de dialogue se trouve plus bas sur la page et que, de retour sur la page, l'utilisateur risque d'être perturbé par sa position de défilement actuelle.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>chaîne</td>
          <td>Indiquez la <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">région LaterPay</a> dans laquelle vous vous trouvez : <code>eu</code> ou <code>us</code>.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>valeur booléenne</td>
          <td>Cette propriété n'est nécessaire que si vous utilisez le mode bac à sable pour tester la configuration de votre serveur. Vous devez également utiliser le <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">mode de développement</a> d'AMP.</td>
        </tr>
      </table>

## Utiliser le balisage du contenu accessible et afficher la liste d'achats <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Vous devez utiliser le balisage du contenu accessible de la même manière qu'avec AMP Access.

L'élément associé à l'identifiant `amp-access-laterpay-dialog` affiche une liste d'options d'achat lorsque l'utilisateur n'a pas accès à l'article. Cette liste présente des styles rudimentaires et peut être personnalisée afin de mieux l'intégrer dans la page de l'éditeur.

Veillez à ajouter la classe `amp-access-laterpay` si vous souhaitez utiliser les styles par défaut.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Désolé… Une erreur s'est produite.
</section>

<div amp-access="access" amp-access-hide="">
  <p>…contenu de l'article…</p>
</div>

```

## Application d'un style <a name="styling"></a>

Plusieurs classes sont appliquées à certains éléments du balisage généré. Les éléments ne comportant aucune classe peuvent être référencés sans équivoque au moyen de sélecteurs d'éléments CSS.

Il existe déjà une feuille de style avec une disposition de base, mais il est conseillé aux éditeurs de lui appliquer un style propre afin de l'adapter à l'apparence de leurs pages.

La structure créée pour la boîte de dialogue se présente comme suit :

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Facultatif. S'affiche si le message des paramètres locaux de l'en-tête est défini.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Titre de l'option d'achat</span>
              <p class="amp-access-laterpay-description">Description de l'option d'achat</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0,15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- … plus d'éléments de liste pour d'autres options d'achat … -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Acheter</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="...">J'ai déjà acheté cet article.</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Facultatif. S'affiche si le message des paramètres locaux du pied de page est défini.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Fourni par <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Localisation <a name="localization"></a>

Le texte affiché pour les options d'achat dans la boîte de dialogue est défini par l'éditeur dans l'interface utilisateur de LaterPay Connector.

Le texte restant fait partie du composant étendu. Vous pouvez le modifier et le localiser au moyen des options de configuration comme suit :

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

Les clés de message suivantes peuvent être traduites ou personnalisées. Sachez cependant qu'elles doivent conserver leur signification et leur intention d'origine.

<table>
  <tr>
    <th class="col-fourty">Clé</th>
    <th class="col-fourty">Description</th>
    <th>Valeur par défaut</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Texte affiché sur le bouton d'achat pour les articles qui peuvent être payés ultérieurement.</td>
    <td>'Buy Now, Pay Later' (Acheter maintenant, payer plus tard)</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Texte affiché sur le bouton d'achat pour les articles qui doivent être payés au moment de l'achat.</td>
    <td>'Buy Now' (Acheter maintenant)</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Texte par défaut affiché sur le bouton d'achat avant la sélection d'une quelconque option.</td>
    <td>'Buy Now' (Acheter maintenant)</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Si l'utilisateur a déjà acheté l'article, mais qu'il a perdu ses cookies (ou utilise un autre appareil), il peut utiliser ce lien pour se connecter à LaterPay et récupérer ses achats.</td>
    <td>'I already bought this' (J'ai déjà acheté cet article)</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Texte d'en-tête facultatif.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Texte de pied de page facultatif.</td>
    <td></td>
  </tr>
</table>

## Analyse <a name="analytics"></a>

Le composant `amp-access-laterpay` est basé sur `amp-access`. Il accepte donc tous les [événements d'analyse](amp-access.md#integration-with-amp-analytics) envoyés par `amp-access`.

Tous les exemples disponibles à l'adresse [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) sont configurés de manière à envoyer ces événements d'analyse, afin que vous disposiez d'un exemple d'utilisation pratique plus complet.

## Utiliser AMP Access LaterPay avec AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Si un système d'abonnement est déjà actif et que vous souhaitez utiliser LaterPay uniquement pour certaines ventes d'articles, vous pouvez faire en sorte que les deux méthodes de vente coexistent sur la même page en utilisant conjointement AMP Access et AMP Access LaterPay.

Veuillez d'abord consulter la documentation d'[AMP Access](amp-access.md) pour savoir comment configurer AMP Access avec votre paywall existant.

La section relative à des [fournisseurs multiples](amp-access.md#multiple-access-providers) explique comment configurer plusieurs fournisseurs avec des espaces de noms.

En cas d'utilisation avec LaterPay et une intégration de paywall existante, la configuration nécessaire peut se présenter comme suit :

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

Par contre, le balisage d'accès au contenu peut se présenter comme suit :

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Connectez-vous ici pour accéder à votre abonnement PublisherName.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Désolé… Une erreur s'est produite.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>…contenu de l'article…</p>
</div>

```

Pour un exemple plus complet, rendez-vous à l'adresse suivante : [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html).

## Documentation associée <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: How we do MicroPayments](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) (semblable à AMP Access LaterPay, mais pour les pages non AMP).

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-access-laterpay](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) dans les spécifications du validateur AMP.
