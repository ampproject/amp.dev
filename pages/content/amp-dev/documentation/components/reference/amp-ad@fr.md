---
$category@: ads-analytics
formats:
- websites
teaser:
  text: Conteneur permettant de diffuser une annonce.
---

# amp-ad/amp-embed

Il s'agit d'un conteneur permettant de diffuser une annonce. `amp-embed` est un alias de la balise `amp-ad`, dont toutes les fonctionnalités sont obtenues avec un nom de balise différent. Utilisez `amp-embed` lorsque cela s'avère plus précis d'un point de vue sémantique. Les documents AMP acceptent uniquement les annonces/éléments intégrés diffusés via HTTPS.

# `amp-ad` / `amp-embed`


[tip type="note"]
La spécification du composant `amp-ad`/`amp-embed` est susceptible d'évoluer considérablement au fil du temps. La méthode actuelle consiste à amorcer le format pour qu'il soit possible de diffuser des annonces.
[/tip]


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

<table>
  <tr>
    <td class="col-fourty"><strong>Description</strong></td>
    <td>Il s'agit d'un conteneur permettant de diffuser une annonce. <code>amp-embed</code> est un alias de la balise <code>amp-ad</code>, dont toutes les fonctionnalités sont obtenues avec un nom de balise différent. Utilisez <code>amp-embed</code> lorsque cela s'avère plus précis d'un point de vue sémantique. Les documents AMP acceptent uniquement les annonces/éléments intégrés diffusés via HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script requis</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;</code><br>Remarque : amp-ad peut fonctionner sans ce script, mais son utilisation est vivement conseillée pour une compatibilité future.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Mises en page compatibles</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemples</strong></td>
    <td>Consultez l'<a href="https://ampbyexample.com/components/amp-ad/">exemple de composant amp-ad</a> sur AMP By Example.</td>
  </tr>
</table>

## Comportement

Les annonces sont chargées comme toutes les autres ressources dans les documents AMP, avec un élément personnalisé spécial appelé `<amp-ad>`. Aucun code JavaScript fourni par un réseau publicitaire ne peut être exécuté dans le document AMP. À la place, l'exécution AMP charge un iFrame d'une autre origine (via le bac à sable iFrame) et exécute le code JavaScript du réseau publicitaire dans ce bac à sable iFrame.

L'élément `<amp-ad>` exige que les valeurs de hauteur et de largeur soient spécifiées conformément à la [règle](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) relative à son type de mise en page. Il nécessite un argument `type` qui sélectionne le réseau publicitaire à afficher. Tous les attributs `data-*` de la balise sont automatiquement transmis, en tant qu'arguments, au code qui diffuse finalement l'annonce. Les attributs `data-` requis pour un type de réseau publicitaire donné dépendent de ce dernier et doivent être documentés avec celui-ci.

#### Exemple : Diffusion de quelques annonces

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Plus" overflow="" tabindex="0" role="button">Afficher l'intégralité du code</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Attributs

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
    <td>Les attributs commençant par <code>data-vars-</code> sont réservés pour les <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">variables <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (facultatif)</strong></td>
    <td>Utilisez cet attribut pour transmettre une configuration à l'annonce en tant qu'objet JSON arbitraire complexe. L'objet est transmis à l'annonce en l'état, sans aucune modification au niveau des noms.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (facultatif)</strong></td>
    <td>Si cet attribut est fourni, le composant <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> doit être confirmé avec l'identifiant HTML donné jusqu'à ce que l'identifiant client AMP de l'utilisateur (semblable à un cookie) soit transmis à l'annonce. Cela signifie que le rendu de l'annonce est retardé jusqu'à ce que l'utilisateur confirme la notification.</td>
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
    <td>Cet élément inclut des <a href="https://www.ampproject.org/docs/reference/common_attributes">attributs communs</a> étendus aux composants AMP.</td>
  </tr>
</table>

## Espace réservé

Le composant `amp-ad` peut, si nécessaire, accepter un élément enfant avec l'attribut `placeholder`. Si le réseau publicitaire le permet, cet élément reste affiché jusqu'à ce que l'annonce soit disponible pour consultation. Pour en savoir plus, consultez la section [Espaces réservés et créations de remplacement](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Aucune annonce disponible

Si aucune annonce n'est disponible pour l'espace publicitaire, AMP tente de réduire l'élément `amp-ad` (c'est-à-dire de définir `display: none`). AMP détermine que cette opération peut être effectuée sans affecter la position de défilement de l'utilisateur. Si l'annonce se trouve dans la fenêtre d'affichage ouverte, elle n'est pas réduite, car cela affecterait la position de défilement de l'utilisateur. En revanche, elle est réduite si elle se trouve en dehors de cette fenêtre.

Si la tentative de réduction échoue, le composant `amp-ad` accepte un élément enfant avec l'attribut `fallback`. Si un élément de remplacement personnalisé est présent, il est affiché. Dans le cas contraire, AMP applique une création de remplacement par défaut.

Exemple avec création de remplacement :

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Diffuser des annonces vidéo

Il existe trois méthodes permettant de monétiser des vidéos dans AMP avec des annonces vidéo :

1. AMP est compatible, en mode natif, avec plusieurs lecteurs vidéo (BrightCove, DailyMotion, etc.) permettant de monétiser des annonces. Pour obtenir la liste complète, consultez les composants [multimédias](https://www.ampproject.org/docs/reference/components#media).

2. Utilisez le composant [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) fourni avec le SDK IMA et le lecteur vidéo HTML5 intégrés.
3. Si vous utilisez un lecteur vidéo non compatible avec AMP, vous pouvez diffuser votre lecteur personnalisé à l'aide du composant [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Si vous optez pour la méthode `amp-iframe` :

    * Assurez-vous qu'il existe un élément poster en cas de chargement du lecteur dans la première fenêtre d'affichage. [Détails](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder).
    * La vidéo et l'élément poster doivent être diffusés via HTTPS.</li>

## Diffuser des annonces à partir d'un domaine personnalisé

AMP accepte le chargement de l'iFrame d'amorce utilisé pour charger les annonces à partir d'un domaine personnalisé (votre propre domaine, par exemple).

Pour l'activer, copiez le fichier [remote.html](../../3p/remote.html) sur votre serveur Web. Ensuite, ajoutez la balise Meta suivante à votre ou vos fichiers AMP :

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  L'attribut `content` de la balise Meta correspond à l'URL absolue de votre copie du fichier remote.html sur votre serveur Web. Cette URL doit utiliser un schéma "https". Elle ne peut pas résider sur la même origine que vos fichiers AMP. Par exemple, si vous hébergez des fichiers AMP sur `www.example.com`, cette URL ne peut pas se trouver à cet emplacement `www.example.com`. En revanche, une adresse du type `something-else.example.com` est acceptée. Pour plus d'informations sur les origines autorisées pour les cadres iFrame, reportez-vous à la section traitant des [règles relatives aux origines des cadres iFrame](../../spec/amp-iframe-origin-policy.md).

### Sécurité

**Validez les données entrantes** avant de les transmettre à la fonction `draw3p`, et ce, pour vous assurer que votre iFrame effectue uniquement les actions pour lesquelles il est prévu. Cela vaut tout particulièrement pour les réseaux publicitaires qui autorisent l'injection JavaScript personnalisée.

Notez également que les cadres iFrame doivent uniquement être encadrés dans les origines pour lesquelles ils ont été prévus. Les origines sont les suivantes :

* Vos propres origines
* `https://cdn.ampproject.org` pour le cache AMP

Dans le cas du cache AMP, vous devez également vérifier que l'"origine source" (l'origine du document diffusé par cdn.ampproject.org) fait partie de vos origines.

Pour appliquer les origines, le troisième argument de la fonction `draw3p` peut être utilisé. Il convient, en outre, d'utiliser la directive [allow-from](https://developer.mozilla.org/fr/docs/Web/HTTP/X-Frame-Options) pour disposer d'une compatibilité totale avec le navigateur.

### Améliorer la configuration entrante des annonces

Cette opération est totalement facultative. Parfois, il est souhaitable d'améliorer la demande d'annonce avant de la transmettre au serveur publicitaire.

Si votre réseau publicitaire est compatible avec la [récupération rapide](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), veuillez utiliser [RTC (Real Time Config)](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (les intégrations DoubleClick et AdSense, par exemple, sont toutes deux compatibles avec la récupération rapide et RTC).

Si la récupération retardée est utilisée sur votre réseau publicitaire, vous pouvez transmettre un rappel à la fonction `draw3p` dans le fichier [remote.html](../../3p/remote.html). Le rappel reçoit la configuration entrante en tant que premier argument, puis reçoit un autre rappel en tant que deuxième argument (appelé `done` dans l'exemple ci-dessous). Ce rappel doit être appelé avec la configuration mise à jour pour que le rendu de l'annonce puisse avoir lieu.

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

## Application d'un style

Les éléments `<amp-ad>` proprement dits ne peuvent pas comporter de conteneurs dont le code CSS `position: fixed` est défini, ni être placés à l'intérieur de ces conteneurs (à l'exception de `amp-lightbox`).
Cela est dû aux implications que les annonces en superposition pleine page peuvent avoir sur l'expérience utilisateur. À l'avenir, il est possible que des formats d'annonce semblables soient autorisés à l'intérieur de conteneurs contrôlés par AMP afin de conserver certaines caractéristiques constantes de l'expérience utilisateur.

## Validation

Consultez les [règles relatives à amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) dans les spécifications du validateur AMP.

## Réseaux publicitaires compatibles

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md )
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay]( ../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Types d'éléments intégrés compatibles

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
