---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: Conteneur permettant de diffuser une annonce.
---



Il s'agit d'un conteneur permettant de diffuser une annonce. `amp-embed` est un alias de la balise `amp-ad`, dont toutes les fonctionnalités sont obtenues avec un nom de balise différent. Utilisez `amp-embed` lorsque cela s'avère plus précis d'un point de vue sémantique. Les documents AMP acceptent uniquement les annonces/éléments intégrés diffusés via HTTPS.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
La spécification du composant `amp-ad`/`amp-embed` est susceptible d'évoluer considérablement au fil du temps. La méthode actuelle consiste à amorcer le format pour qu'il soit possible de diffuser des annonces.
[/tip]


<!--
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

<table>
  <tr>
    <td class="col-fourty"><strong>Description</strong></td>
    <td>Il s'agit d'un conteneur permettant de diffuser une annonce. <code>amp-embed</code> est un alias de la balise <code>amp-ad</code>, dont toutes les fonctionnalités sont obtenues avec un nom de balise différent. Utilisez <code>amp-embed</code> lorsque cela s'avère plus précis d'un point de vue sémantique. Les documents AMP acceptent uniquement les annonces/éléments intégrés diffusés via HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://ampjs.org/v0/amp-ad-0.1.js">&lt;</code><br>Remarque : amp-ad peut fonctionner sans ce script, mais son utilisation est vivement conseillée pour une compatibilité future.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-ad/">exemple de composant amp-ad</a> sur AMP By Example.</td>
  </tr>
</table>

## Comportement <a name="behavior"></a>

Les annonces sont chargées comme toutes les autres ressources dans les documents AMP, avec un élément personnalisé spécial appelé `<amp-ad>`. Aucun code JavaScript fourni par un réseau publicitaire ne peut être exécuté dans le document AMP. À la place, l'exécution AMP charge un iFrame d'une autre origine (via le bac à sable iFrame) et exécute le code JavaScript du réseau publicitaire dans ce bac à sable iFrame.

L'élément `<amp-ad>` exige que les valeurs de hauteur et de largeur soient spécifiées conformément à la [règle](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) relative à son type de mise en page. Il nécessite un argument `type` qui sélectionne le réseau publicitaire à afficher. Tous les attributs `data-*` de la balise sont automatiquement transmis, en tant qu'arguments, au code qui diffuse finalement l'annonce. Les attributs `data-` requis pour un type de réseau publicitaire donné dépendent de ce dernier et doivent être documentés avec celui-ci.

#### Exemple : Diffusion de quelques annonces <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Attributs <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (requis)</strong></td>
    <td>Indique un identifiant pour le <a href="#supported-ad-networks">réseau publicitaire</a>. L'attribut <code>type</code> sélectionne le modèle à utiliser pour le tag d'emplacement publicitaire.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (facultatif)</strong></td>
    <td>Utilisez cet attribut afin de charger un tag de script pour le réseau publicitaire spécifié. Vous pouvez utiliser cet attribut pour les réseaux publicitaires qui nécessitent l'insertion d'un seul tag de script dans la page. La valeur <code>src</code> doit avoir un préfixe placé sur liste blanche pour le réseau publicitaire spécifié, et le protocole <code>https</code> doit être utilisé.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Pour la plupart des réseaux publicitaires, une configuration supplémentaire s'avère nécessaire. Celle-ci peut être transmise au réseau en utilisant des attributs <code>data-</code> HTML. Les noms des paramètres font l'objet d'une conversion standard des attributs de type "data" avec tiret vers le format camel case. Par exemple, "data-foo-bar" est envoyé à l'annonce sous la forme "fooBar" à des fins de configuration. Consultez la documentation pour savoir sur quel <a href="#supported-ad-networks">réseau publicitaire</a> les attributs peuvent être utilisés.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Les attributs commençant par <code>data-vars-</code> sont réservés pour les <a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">variables <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (facultatif)</strong></td>
    <td>Utilisez cet attribut pour transmettre une configuration à l'annonce en tant qu'objet JSON arbitraire complexe. L'objet est transmis à l'annonce en l'état, sans aucune modification au niveau des noms.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (facultatif)</strong></td>
    <td>Si cet attribut est fourni, le composant <a href="amp-user-notification.md">amp-user-notification</a> doit être confirmé avec l'identifiant HTML donné jusqu'à ce que l'identifiant client AMP de l'utilisateur (semblable à un cookie) soit transmis à l'annonce. Cela signifie que le rendu de l'annonce est retardé jusqu'à ce que l'utilisateur confirme la notification.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (facultatif)</strong></td>
    <td>Cet attribut indique de commencer le chargement de l'annonce lorsque celle-ci est éloignée du nombre de fenêtres d'affichage indiqué de la fenêtre d'affichage en cours. En l'absence de l'attribut <code>data-loading-strategy</code>, le nombre 3 est utilisé par défaut. Vous pouvez spécifier une valeur flottante dans la plage [0, 3]. Si la valeur n'est pas spécifiée, elle est définie sur 1,25. Utilisez une valeur inférieure pour obtenir un niveau de visibilité plus élevé (autrement dit, vous augmentez la probabilité qu'une annonce soit vue une fois qu'elle a été chargée), avec toutefois le risque de générer moins d'impressions (en d'autres termes, moins d'annonces sont chargées). Si l'attribut est spécifié, mais qu'aucune valeur n'est renseignée, le système attribue une valeur flottante, ce qui optimise la visibilité, sans que cela n'ait d'incidence significative sur les impressions. Notez également que la valeur <code>prefer-viewability-over-views</code> optimise automatiquement la visibilité.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (facultatif)</strong></td>
    <td>Indique à l'annonce l'identifiant du composant de conteneur en cas de tentative de réduction. Le composant de conteneur doit être un composant <code>&lt;amp-layout&gt;</code> parent de l'annonce. Lorsque l'attribut <code>data-ad-container-id</code> est spécifié, et qu'un composant de conteneur <code>&lt;amp-layout&gt;</code> est trouvé, l'exécution AMP tente de réduire ce dernier au lieu du composant d'annonce en cas de réponse vide du serveur. Cette fonctionnalité peut s'avérer utile lorsqu'un indicateur d'annonce est présent.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Cet élément inclut des <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributs communs</a> étendus aux composants AMP.</td>
  </tr>
</table>

## Espace réservé <a name="placeholder"></a>

Le composant `amp-ad` peut, si nécessaire, accepter un élément enfant avec l'attribut `placeholder`. Si le réseau publicitaire le permet, cet élément reste affiché jusqu'à ce que l'annonce soit disponible pour consultation. Pour en savoir plus, consultez la section [Espaces réservés et créations de remplacement](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Aucune annonce disponible <a name="no-ad-available"></a>

Si aucune annonce n'est disponible pour l'espace publicitaire, AMP tente de réduire l'élément `amp-ad` (c'est-à-dire de définir `display: none`). AMP détermine que cette opération peut être effectuée sans affecter la position de défilement de l'utilisateur. Si l'annonce se trouve dans la fenêtre d'affichage ouverte, elle n'est pas réduite, car cela affecterait la position de défilement de l'utilisateur. En revanche, elle est réduite si elle se trouve en dehors de cette fenêtre.

Si la tentative de réduction échoue, le composant `amp-ad` accepte un élément enfant avec l'attribut `fallback`. Si un élément de remplacement personnalisé est présent, il est affiché. Dans le cas contraire, AMP applique une création de remplacement par défaut.

Exemple avec création de remplacement :

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Diffuser des annonces vidéo <a name="serving-video-ads"></a>

Il existe trois méthodes permettant de monétiser des vidéos dans AMP avec des annonces vidéo :

1. AMP est compatible, en mode natif, avec plusieurs lecteurs vidéo (BrightCove, DailyMotion, etc.) permettant de monétiser des annonces. Pour obtenir la liste complète, consultez les composants [multimédias](../../../documentation/components/index.html#media).

2. Utilisez le composant [amp-ima-video](amp-ima-video.md) fourni avec le SDK IMA et le lecteur vidéo HTML5 intégrés.
3. Si vous utilisez un lecteur vidéo non compatible avec AMP, vous pouvez diffuser votre lecteur personnalisé à l'aide du composant [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Si vous optez pour la méthode `amp-iframe` :

    * Assurez-vous qu'il existe un élément poster en cas de chargement du lecteur dans la première fenêtre d'affichage. [Détails](amp-iframe.md#iframe-with-placeholder).
    * La vidéo et l'élément poster doivent être diffusés via HTTPS.</li>

## Diffuser des annonces à partir d'un domaine personnalisé <a name="running-ads-from-a-custom-domain"></a>

AMP accepte le chargement de l'iFrame d'amorce utilisé pour charger les annonces à partir d'un domaine personnalisé (votre propre domaine, par exemple).

Pour l'activer, copiez le fichier [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) sur votre serveur Web. Ensuite, ajoutez la balise Meta suivante à votre ou vos fichiers AMP :

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  L'attribut `content` de la balise Meta correspond à l'URL absolue de votre copie du fichier remote.html sur votre serveur Web. Cette URL doit utiliser un schéma "https". Elle ne peut pas résider sur la même origine que vos fichiers AMP. Par exemple, si vous hébergez des fichiers AMP sur `www.example.com`, cette URL ne peut pas se trouver à cet emplacement `www.example.com`. En revanche, une adresse du type `something-else.example.com` est acceptée. Pour plus d'informations sur les origines autorisées pour les cadres iFrame, reportez-vous à la section traitant des [règles relatives aux origines des cadres iFrame](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md).

### Sécurité <a name="security"></a>

**Validez les données entrantes** avant de les transmettre à la fonction `draw3p`, et ce, pour vous assurer que votre iFrame effectue uniquement les actions pour lesquelles il est prévu. Cela vaut tout particulièrement pour les réseaux publicitaires qui autorisent l'injection JavaScript personnalisée.

Notez également que les cadres iFrame doivent uniquement être encadrés dans les origines pour lesquelles ils ont été prévus. Les origines sont les suivantes :

* Vos propres origines
* `https://cdn.ampproject.org` pour le cache AMP

Dans le cas du cache AMP, vous devez également vérifier que l'"origine source" (l'origine du document diffusé par cdn.ampproject.org) fait partie de vos origines.

Pour appliquer les origines, le troisième argument de la fonction `draw3p` peut être utilisé. Il convient, en outre, d'utiliser la directive [allow-from](https://developer.mozilla.org/fr/docs/Web/HTTP/X-Frame-Options) pour disposer d'une compatibilité totale avec le navigateur.

### Améliorer la configuration entrante des annonces <a name="enhance-incoming-ad-configuration"></a>

Cette opération est totalement facultative. Parfois, il est souhaitable d'améliorer la demande d'annonce avant de la transmettre au serveur publicitaire.

Si votre réseau publicitaire est compatible avec la [récupération rapide](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), veuillez utiliser [RTC (Real Time Config)](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md) (les intégrations DoubleClick et AdSense, par exemple, sont toutes deux compatibles avec la récupération rapide et RTC).

Si la récupération retardée est utilisée sur votre réseau publicitaire, vous pouvez transmettre un rappel à la fonction `draw3p` dans le fichier [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html). Le rappel reçoit la configuration entrante en tant que premier argument, puis reçoit un autre rappel en tant que deuxième argument (appelé `done` dans l'exemple ci-dessous). Ce rappel doit être appelé avec la configuration mise à jour pour que le rendu de l'annonce puisse avoir lieu.

Exemple :

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## Application d'un style <a name="styling"></a>

Les éléments `<amp-ad>` proprement dits ne peuvent pas comporter de conteneurs dont le code CSS `position: fixed` est défini, ni être placés à l'intérieur de ces conteneurs (à l'exception de `amp-lightbox`).
Cela est dû aux implications que les annonces en superposition pleine page peuvent avoir sur l'expérience utilisateur. À l'avenir, il est possible que des formats d'annonce semblables soient autorisés à l'intérieur de conteneurs contrôlés par AMP afin de conserver certaines caractéristiques constantes de l'expérience utilisateur.

## Validation <a name="validation"></a>

Consultez les [règles relatives à amp-ad](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii) dans les spécifications du validateur AMP.

## Réseaux publicitaires compatibles <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md )
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay]( ../../ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## Types d'éléments intégrés compatibles <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)