---
"$title": "Fournisseurs d'analyses"
order: '3'
formats:
- websites
- stories
- ads
teaser:
  text: "Ce document répertorie les fournisseurs d'analyse qui ont des configurations intégrées à utiliser avec le composant amp-analytics."
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vendors-list.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

Ce document répertorie les fournisseurs d'analyse qui ont des configurations intégrées à utiliser avec le composant [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics/).

Vendors that wish to integrate their service with [`<amp-analytics>`](https://amp.dev/documentation/components/amp-analytics/) should refer to the details in [Integrate your analytics tools with AMP](https://amp.dev/documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools).

### Acquia Lift <a name="acquia-lift"></a>

Valeur d'attribut de type : `acquialift`

Ajoute la prise en charge d'Acquia Lift. `decisionApiUrl`, `accountId` et `siteId` doivent être spécifiés. Pour plus d'informations sur Acquia Lift, rendez-vous sur [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics <a name="adobe-analytics"></a>

Valeur d'attribut de type : `adobeanalytics`

Ajoute la prise en charge d'Adobe Analytics. Vous trouverez plus de détails sur l'ajout de la prise en charge d'Adobe Analytics sur [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics <a name="afs-analytics"></a>

Valeur d'attribut de type : `afsanalytics`

Ajoute la prise en charge d'AFS Analytics. En outre, les variables `websiteid` et `server` doivent être spécifiées. Vous trouverez plus de détails sur l'ajout de la prise en charge d'AFS Analytics sur [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet <a name="alexa-internet"></a>

Valeur d'attribut de type : `alexametrics`

Ajoute la prise en charge d'Alexa Certified Site Metrics. Les variables `atrk_acct` et `domain` doivent être spécifiées. Pour plus d'informations, consultez [la FAQ sur Alexa's Certified Metrics](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

### Amplitude <a name="amplitude"></a>

Valeur d'attribut de type : `amplitude`

### AT Internet <a name="at-internet"></a>

Valeur d'attribut de type : `atinternet`

Ajoute la prise en charge d'AT Internet. Vous trouverez plus de détails sur l'ajout de la prise en charge d'AT Internet à l'adresse [developer.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics <a name="baidu-analytics"></a>

Valeur d'attribut de type : `baiduanalytics`

Ajoute la prise en charge de Baidu Analytics. Vous trouverez plus de détails sur l'ajout de la prise en charge de Baidu Analytics sur [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### BlueConic <a name="blueconic"></a>

Valeur d'attribut de type : `blueconic`

### Browsi <a name="browsi"></a>

Valeur d'attribut de type : `browsi`

### Burt <a name="burt"></a>

Valeur d'attribut de type : `burt`

Adds support for Burt. Additionally, the `trackingKey` variable must be specified. It's also possible to specify the optional variables `category` and `subCategory`. More details can be found at [burtcorp.com](http://burtcorp.com).

### BySide <a name="byside"></a>

Valeur d'attribut de type : `byside`

### Captain Metrics <a name="captain-metrics"></a>

Valeur d'attribut de type : `captainmetrics`

### Chartbeat <a name="chartbeat"></a>

Valeur d'attribut de type : `chartbeat`

Ajoute la prise en charge de Chartbeat. Vous trouverez plus de détails au sujet de l'ajout de la prise en charge de Chartbeat sur [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics <a name="clicky-web-analytics"></a>

Valeur d'attribut de type : `clicky`

Ajoute la prise en charge de Clicky Web Analytics. Vous trouverez plus de détails sur l'ajout de la prise en charge de Clicky sur [clicky.com](https://clicky.com/help/apps-plugins).

### comScore <a name="comscore"></a>

Valeur d'attribut de type : `comscore`

Ajoute la prise en charge du service d'analyse comScore Unified Digital Measurement™. Nécessite la définition de *var* `c2` avec l'*ID c2* fourni par comScore. Plus d'informations peuvent être trouvées sur [comscore.com](http://www.comscore.com).

### Cxense <a name="cxense"></a>

Valeur d'attribut de type : `cxense`

Ajoute la prise en charge des analyses Cxense Insight. Nécessite la définition de *var* `siteId` avec le *siteId* fourni par Cxense. Plus de détails sont disponibles sur sur [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Deep.BI <a name="deepbi"></a>

Valeur d'attribut de type : `deepbi`

### Dynatrace <a name="dynatrace"></a>

Valeur d'attribut de type : `dynatrace`

Ajoute la prise en charge de la surveillance des utilisateurs réels Dynatrace. Nécessite la définition d'une <code>app</code> <em>var</em> avec un *ID d'application* fourni par Dynatrace et un <code>tenant</code> <em>var</em> avec un *identificateur d'environnement* fourni par Dynatrace. Vous trouverez plus de détails sur l'ajout de la surveillance des utilisateurs réels Dynatrace sur [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### EPICA <a name="epica"></a>

Valeur d'attribut de type : `epica`

Ajoute la prise en charge des pages vues et des événements EPICA. Plus de détails sont disponibles dans la [documentation EPICA](https://www.epica.ai).

### Eulerian Analytics <a name="eulerian-analytics"></a>

Valeur d'attribut de type : `euleriananalytics`

Ajoute la prise en charge d'Eulerian Technologies Analytics. Nécessite la définition de *var* `analyticsHost` avec un domaine délégué Eulerian. Vous trouverez plus de détails sur [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel <a name="facebook-pixel"></a>

Valeur d'attribut de type : `facebookpixel`

Ajoute la prise en charge de [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). Dans votre configuration [`amp-analytics`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./amp-analytics.md), vous devez définir votre ID de pixel comme `pixelId: YOUR-PIXEL-ID`. Les événements pris en charge ainsi que les valeurs d'événements correspondantes pouvant être spécifiées sont détaillés dans la [documentation du développeur Facebook Pixel](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius <a name="gemius"></a>

Valeur d'attribut de type : `gemius`

Adds support for Gemius Audience/Prism analytics. Additionally, the gemius-provided `prefix` and `identifier` variables must be specified. It's also possible to specify the optional variable `extraparams` (key1=value1|key2=value2). More details can be found at [gemius.com](https://www.gemius.com).

### GfK Sensic <a name="gfk-sensic"></a>

Valeur d'attribut de type : `gfksensic`

Ajoute la prise en charge de l'analyse de l'utilisation du flux audio GfK Sensic. Veuillez consulter notre [documentation client](https://confluence-docu.gfk.com/display/SENSIC/AMP+Integration) pour plus de détails.

### Google Ads <a name="google-ads"></a>

Valeur d'attribut de type : `googleadwords`

Ajoute la prise en charge du suivi des conversions et du remarketing Google Ads. Pour en savoir plus, consultez le centre d'aide Google Ads pour le [suivi des conversions](https://support.google.com/adwords/answer/1722054?hl=en) et le [remarketing](https://support.google.com/adwords/answer/2453998?hl=en). Les deux balises peuvent être utilisées indépendamment l'une de l'autre.

### Google Analytics <a name="google-analytics"></a>

Valeur d'attribut de type : `googleanalytics`

Ajoute la prise en charge de Google Analytics. Vous trouverez plus de détails sur l'ajout de la prise en charge de Google Analytics sur [developer.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Google Tag Manager <a name="google-tag-manager"></a>

Valeur d'attribut de type : N/A

Contrairement aux autres fournisseurs d'analyses, Google Tag Manager est un service de gestion de balises, et ne nécessite pas l'attribut `type`. Google Tag Manager est [pris en charge](https://developers.google.com/google-ads/amp/landing-pages#google_tag_manager) dans AMP. Consultez la documentation Google Tag Manager pour connaître les balises [prises en charge](https://support.google.com/tagmanager/answer/6106924) et les instructions sur [l'ajout de Google Tag Manager sur vos pages AMP](https://support.google.com/tagmanager/answer/6103696).

### Ibeat Analytics <a name="ibeat-analytics"></a>

Valeur d'attribut de type : `ibeatanalytics`

Ajoute la prises en charge d'Ibeat Analytics. Vous trouverez plus de détails au sujet de l'ajout de la prise en charge d'Ibeat sur [Ibeat Integration Support](https://ibeat.indiatimes.com/support.html#h.a5rit14mwie1).

### INFOnline / IVW <a name="infonline--ivw"></a>

Valeur d'attribut de type : `infonline`

Ajoute la prise en charge d'[INFOnline](https://www.infonline.de)/[IVW](http://www.ivw.de). Nécessite une copie de [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) sur un sous-domaine différent du fichier AMP inclus ([pourquoi ?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Le fichier doit être fourni via HTTPS. Par exemple, si vos fichiers AMP sont hébergés sur `www.example.com`, `amp-analytics-infonline.html` doit se trouver sur un autre sous-domaine tel que `iframe.example.com` ou `assets.example.com`.

De plus, les variables suivantes doivent être définies :

- `st` : identifiant de l'offre
- `co` : commentaire
- `cp` : code
- `url`: HTTPS location of `amp-analytics-infonline.html`

Vous trouverez plus de détails sur l'ajout de la prise en charge d'INFOnline/IVW sur [www.infonline.de](https://www.infonline.de/).

### INFOnline anonymous <a name="infonline-anonymous"></a>

Valeur d'attribut de type : `infonline-anonymous`

Ajoute la prise en charge d'[anonymous INFOnline](https://www.infonline.de). Nécessite une copie de [infonline-anonymous.html](https://www.infonline.de/amp/infonline-anonymous.html) sur un sous-domaine différent du fichier AMP inclus ([pourquoi ?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Le fichier doit être fourni via HTTPS. Par exemple, si vos fichiers AMP sont hébergés sur `www.example.com`, `infonline-anonymous.html` doit se trouver sur un autre sous-domaine tel que `iframe.example.com` ou `assets.example.com`.

De plus, les variables suivantes doivent être définies :

- `st` : identifiant de l'offre
- `co` : commentaire
- `cp` : code
- `url` : emplacement HTTPS de `infonline-anonymous.html`
- `dn` : le nom de domaine du relais

Vous trouverez plus de détails sur l'ajout de la prise en charge d'INFOnline anonymous sur [www.infonline.de](https://www.infonline.de/).

### ip-label <a name="ip-label"></a>

Valeur d'attribut de type : `iplabel`

### Keen <a name="keen"></a>

Valeur d'attribut de type : `keen`

Ajoute la prise en charge de Keen. De plus, les `vars` suivantes doivent être définies :

- `projectId` : votre identifiant de projet
- `writeKey` : votre clé d'écriture

Utilisez `extraUrlParams` pour ajouter plus de données. Les détails de la configuration sont disponibles sur [keen.io/docs/api](https://keen.io/docs/api/).

### Kenshoo <a name="kenshoo"></a>

Valeur d'attribut de type : `kenshoo`

Ajoute la prise en charge de Kenshoo. Pour plus d'informations et de détails sur la configuration, consultez [helpcenter.kenshoo.com](https://helpcenter.kenshoo.com/hc/en-us/articles/360025260592).

### Krux <a name="krux"></a>

Valeur d'attribut de type : `krux`

Ajoute la prise en charge de Krux. Les détails de configuration sont disponibles sur [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse <a name="linkpulse"></a>

Valeur d'attribut de type : `linkpulse`

Ajoute la prise en charge de Linkpulse. Les détails de la configuration sont disponibles sur [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame <a name="lotame"></a>

Valeur d'attribut de type : `lotame`

Ajoute la prise en charge de Lotame. Plus d'informations et de détails de configuration sont disponibles sur [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Mapp Intelligence <a name="mapp-intelligence"></a>

Valeur d'attribut de type : `mapp_intelligence`

Ajoute la prise en charge du suivi Mapp Intelligence. Vous trouverez plus d'informations et de détails de configuration sur [docs.mapp.com](https://docs.mapp.com/pages/viewpage.action?pageId=10027966).

### Marin Software <a name="marin-software"></a>

Valeur d'attribut de type : `marinsoftware`

### Médiamétrie <a name="m%C3%A9diam%C3%A9trie"></a>

Valeur d'attribut de type : `mediametrie`

Ajoute la prise en charge des pages de suivi Médiamétrie. Nécessite la définition de *var* `serial`. Les variables `level1` à `level4` sont facultatives. Vous trouverez plus d'informations sur [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics <a name="mediarithmics"></a>

Valeur d'attribut de type : `mediarithmics`

Ajoute la prise en charge de mediarithmics. Plus d'informations et de détails de configuration sont disponibles sur `https://developer.mediarithmics.com`.

### Memo <a name="memo"></a>

Valeur d'attribut de type : `memo`

### Metrika <a name="metrika"></a>

Valeur d'attribut de type : `metrika`

### Moat Analytics <a name="moat-analytics"></a>

Valeur d'attribut de type : `moat`

Ajoute la prise en charge de Moat. Veuillez contacter votre représentant Moat pour obtenir plus de détails concernant la configuration. Vous trouverez d'autres informations au sujet de Moat sur [moat.com/analytics](https://moat.com/analytics).

### Mobify <a name="mobify"></a>

Valeur d'attribut de type : `mobify`

Ajoute la prise en charge de Mobify. D'autres détails concernant l'ajout de la prise en charge de Mobidy sont disponibles sur [docs.mobify.com](https://docs.mobify.com/amp-sdk/latest/guides/amp-analytics/).

### MoEngage <a name="moengage"></a>

Valeur d'attribut de type : `moengage`

### mParticle <a name="mparticle"></a>

Valeur d'attribut de type : `mparticle`

Ajoute la prise en charge de mParticle. D'autres détails concernant l'ajout de la prise en charge de mParticle sont disponibles sur [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Navegg <a name="navegg"></a>

Valeur d'attribut de type : `navegg`

### New Relic <a name="new-relic"></a>

Valeur d'attribut de type : `newrelic`

Ajoute la prise en charge de New Relic Browser pour mesurer le débit et les performances AMP. En ajoutant la valeur d'attribut `newrelic{/ code0}, vous devrez ajouter votre <code data-md-type="codespan">app ID` et votre `license key` de votre compte New Relic Browser pour commencer à capturer des données. Vous trouverez plus de détails sur la page de documentation AMP de New Relic Browser à l'adresse [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen <a name="nielsen"></a>

Valeur d'attribut de type : `nielsen`

Adds support for Nielsen DCR. Please contact your Nielsen representative to get set up with your `apid` as well as assist in defining the remaining parameters in the `vars` section. For more information, see [Nielsen's support documentation](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud <a name="nielsen-marketing-cloud"></a>

Valeur d'attribut de type : `nielsen-marketing-cloud`

Ajoute la prise en charge de Nielsen Marketing Cloud. Plus de détails peuvent être consultés sur [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA <a name="oewa"></a>

Valeur d'attribut de type : `oewa`

Ajoute la prise en charge de `[OEWA](https://www.oewa.at)`. Nécessite une copie de [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) sur un sous-domaine différent du fichier AMP inclus ([pourquoi ?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). Le fichier doit être fourni via HTTPS. Par exemple, si vos fichiers AMP sont hébergés sur `www.example.com`, alors `amp-analytics-oewa.html` doit se trouver sur un autre sous-domaine tel que `oewa-amp.example.com`. Vous trouverez plus de détails sur l'ajout de la prise en charge d'OEWA [ici](http://www.oewa.at/Implementierung).

De plus, les variables suivantes doivent être définies :

Dans la section `vars` :

- `s` : offre
- `cp` : chemin de catégorie

Dans la section des `requests` :

- `url` : emplacement HTTPS de `amp-analytics-oewa.html`

[tip type="note"] **REMARQUE -** Il existe une variante nommée `oewadirect` qui n'utilise pas la solution iframe-ping et a une meilleure détection de client en utilisant `AMP CLIENT_ID`. Ceci est actuellement EXPÉRIMENTAL et interdit par l'OEWA car il n'utilise pas `oewa2.js`. [/tip]

### Oracle Infinity Analytics <a name="oracle-infinity-analytics"></a>

Valeur d'attribut de type : `oracleInfinityAnalytics`

### Parsely <a name="parsely"></a>

Valeur d'attribut de type : `parsely`

Ajoute la prise en charge de Parsely. Les détails de la configuration sont disponibles sur [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Permutive <a name="permutive"></a>

Valeur d'attribut de type : `permutive`

Ajoute la prise en charge de la collecte d'événements Permutive. De plus, les `vars` suivantes doivent être définies :

- `namespace` : votre espace de noms AMP Permutive
- `key` : votre clé API publique Permutive

Utilisez `extraUrlParams` pour ajouter des propriétés d'événement supplémentaires. Les détails complets de la configuration sont disponibles sur [support.permutive.com](http://support.permutive.com).

### Pistats <a name="pistats"></a>

Valeur d'attribut de type : `piStats`

### Piano <a name="piano"></a>

Valeur d'attribut de type : `piano`

Ajoute la prise en charge de Piano. Les détails de configuration peuvent être consultés sur [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Pinpoll <a name="pinpoll"></a>

Valeur d'attribut de type : `pinpoll`

Ajoute la prise en charge de Pinpoll. Les détails de configuration peuvent être consultés sur [pinpoll.com](https://pinpoll.com/).

### Pressboard <a name="pressboard"></a>

Valeur d'attribut de type : `pressboard`

Ajoute la prise en charge de Pressboard. Les détails de configuration peuvent être consultés à [help.pressboard.ca](http://help.pressboard.ca/publisher-resources/getting-started/implementing-google-amp).

### Quantcast Measurement <a name="quantcast-measurement"></a>

Valeur d'attribut de type : `quantcast`

Ajoute la prise en charge de Quantcast Measurement. Vous trouverez plus de détails concernant l'ajout de Quantcast Measurement sur [quantcast.com](https://www.quantcast.com/help/guides/)

### Rakam <a name="rakam"></a>

Valeur d'attribut de type : `rakam`

### reppublika <a name="reppublika"></a>

Valeur d'attribut de type : `reppublika`

### Retargetly <a name="retargetly"></a>

Valeur d'attribut de type : `retargetly`

### RudderStack <a name="rudderstack"></a>

Valeur d'attribut de type : `rudderstack`

Ajoute la prise en charge des vues de page et des événements RudderStack. Pour en savoir plus sur l'implémentation, consultez notre [documentation](https://docs.rudderstack.com/sdk-integration-guide/getting-started-with-javascript-sdk/amp-analytics).

### Segment <a name="segment"></a>

Valeur d'attribut de type : `segment`

Ajoute la prise en charge des vues de page et des événements Segment. Pour voir la liste complète des champs que vous pouvez envoyer, voir [Segment Spec](https://segment.com/docs/spec/).

### ShinyStat <a name="shinystat"></a>

Valeur d'attribut de type : `shinystat`

### SOASTA mPulse <a name="soasta-mpulse"></a>

Valeur d'attribut de type : `mpulse`

Ajoute la prise en charge de [SOASTA mPulse](https://www.soasta.com/mPulse). Les détails de la configuration sont disponibles sur [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach <a name="simplereach"></a>

Valeur d'attribut de type : `simplereach`

Ajoute la prise en charge de SimpleReach. Les détails de configuration sont disponibles sur `http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation`.

### Snowplow Analytics <a name="snowplow-analytics"></a>

Valeur d'attribut de type : `snowplow`, `snowplow_v2`

Ajoute la prise en charge de Snowplow Analytics. Vous trouverez plus de détails sur l'ajout de la prise en charge de Snowplow Analytics sur [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100 <a name="ramblertop-100"></a>

Valeur d'attribut de type : `top100`

Ajoute la prise en charge de Rambler/TOP-100. Les détails de la configuration se trouvent sur [top100.rambler.ru](https://top100.rambler.ru).

### TEA Analytics <a name="tea-analytics"></a>

Valeur d'attribut de type : `teaanalytics`

Ajoute la prise en charge de TEA Analytics. Pour plus de détails concernant l'ajout de la prise en charge de TEA Analytics, vous pouvez contacter Kimberly (wuqian56@gmail.com).

### Tealium Collect <a name="tealium-collect"></a>

Valeur d'attribut de type : `tealiumcollect`

Ajoute la prise en charge de Tealium Collect. Vous trouverez plus de détails concernant l'ajout de la prise en charge de Tealium Collect sur [docs.tealium.com](https://docs.tealium.com/platforms/amp/install/).

### Top.Mail.Ru <a name="topmailru"></a>

Valeur d'attribut de type : `topmailru`

Ajoute la prise en charge de Top.Mail.Ru. Les détails de configuration peuvent être consultés dans l'[aide de Top.Mail.Ru.](https://help.mail.ru/top/amp-analytics)

### Treasure Data <a name="treasure-data"></a>

Valeur d'attribut de type : `treasuredata`

Ajoute la prise en charge de Treasure Data. Les détails de la configuration peuvent être consultés sur [Treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Umeng+ Analytics <a name="umeng-analytics"></a>

Valeur d'attribut de type : `umenganalytics`

Ajoute la prise en charge d'Umeng + Analytics. Vous trouverez plus de détails concernant l'ajout de la prise en charge d'Umeng + Analytics sur [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Upscore <a name="upscore"></a>

Valeur d'attribut de type : `upscore`

### Vpon Analytics <a name="vpon-analytics"></a>

Valeur d'attribut de type : `vponanalytics`

Ajoute la prise en charge de Vpon Vpon Analytics. Les détails de configuration peuvent être consultés sur [Vpon Analytics](https://cmp.vpadn.com/dmp/doc/amp_analytics.html).

### Webengage <a name="webengage"></a>

Attribut de type `webengage`

### Webtrekk <a name="webtrekk"></a>

La valeur d'attribut ~~`webtrekk`~~ est obsolète (a été supprimée le 31/12/2018) - utilisez plutôt `webtrekk_v2`

Ajoute la prise en charge de Webtrekk. Les détails de la configuration sont disponibles sur [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica <a name="yandex-metrica"></a>

Valeur d'attribut de type : `metrika`

Ajoute la prise en charge de Yandex Metrica. Les détails de configuration peuvent être consultés sur le [support de Yandex](https://yandex.com/support/metrica/code/install-counter-amp.xml).
