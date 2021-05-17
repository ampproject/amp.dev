---
'$title': Intégrez vos technologies publicitaires dans AMP
$order: 3
formats:
  - ads
teaser:
  text: Si vous êtes un fournisseur de technologie publicitaire et souhaitez une intégration du format HTML AMP, veuillez consulter les consignes ci-dessous.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Si vous êtes un fournisseur de technologie publicitaire et souhaitez une intégration du format HTML AMP, veuillez consulter les consignes ci-dessous. Pour optimiser la qualité et le temps de latence, veuillez suivre les instructions répertoriées [ici](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads) avant de soumettre une demande de tirage au projet open source AMP. Pour obtenir des conseils généraux sur les premiers pas en tant que contributeur AMP, veuillez consulter le fichier [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/ads/../docs/contributing.md) .

## Serveur publicitaire <a name="ad-server"></a>

_Exemples : DFP, A9_

En tant que serveur publicitaire, les éditeurs que vous prenez en charge contiennent une bibliothèque JavaScript fournie par vos soins et placent divers « extraits d'annonces » qui s'appuient sur la bibliothèque JavaScript pour récupérer les annonces et les diffuser sur le site Internet de l'éditeur.

Étant donné qu'AMP n'autorise pas les éditeurs à exécuter n'importe quel JavaScript, vous devrez contribuer au code open source AMP pour permettre à la balise `amp-ad` de demander des annonces à votre serveur publicitaire.

Par exemple: le serveur Amazon A9 peut être appelé à l'aide de la syntaxe suivante:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Notez que chacun des attributs qui suivent le `type` dépend des paramètres attendus par le serveur A9 d'Amazon pour diffuser une annonce. Le fichier [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) vous montre comment les paramètres sont mappés pour effectuer un appel JavaScript qui ouvre le serveur A9 via l'URL `https://c.amazon-adsystem.com/aax2/assoc.js`. Les paramètres correspondants transmis par la balise publicitaire AMP sont ajoutés à l'URL pour renvoyer une annonce.

Pour plus d'informations sur l'intégration de votre réseau publicitaire dans AMP, consultez la section [Intégration de réseaux publicitaires dans AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Supply Side Platform (SSP) ou Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Exemples: Rubicon, Criteo OU Appnexus, Ad-Exchange_

Si vous êtes une plate-forme côté vente qui souhaite être ouverte directement à partir de la page Web d'un éditeur, vous devrez suivre les mêmes instructions que celles répertoriées ci-dessus pour l'intégration à un serveur publicitaire. L'ajout de votre propre valeur `type` à la balise amp-ad vous permet d'envoyer votre balise directement à l'éditeur, afin qu'il puisse insérer vos balises directement dans ses pages AMP.

Plus généralement, les SSP collaborent avec l'éditeur pour insérer les balises publicitaires de la SSP sur leur serveur publicitaire. Dans ce cas, assurez-vous que tous les éléments chargés par votre script dans la création du serveur publicitaire sont effectués via HTTPS. Il existe certaines restrictions concernant certains formats d'annonces, tels que les formats extensibles. Nous vous recommandons donc de tester les formats de création les plus courants avec vos éditeurs.

## Agence publicitaire <a name="ad-agency"></a>

_Exemples : Essence, Omnicom_

Collaborez avec votre éditeur pour vous assurer que les créations que vous développez sont compatibles AMP. Étant donné que toutes les créations sont placées dans des iframes dont la taille est déterminée à l'ouverture de l'annonce, assurez-vous que votre création n'essaie pas de modifier la taille de l'iframe.

Assurez-vous que tous les éléments qui font partie de la création sont demandés via HTTPS. Certains formats d'annonces ne sont pas entièrement pris en charge pour le moment et nous vous recommandons de tester les créations dans un environnement AMP. Voici quelques exemples: éléments extensibles Rich Media, interstitiels, annonces au niveau de la page.

## Lecteur vidéo <a name="video-player"></a>

_Exemples : Brightcove, Ooyala_

Un lecteur vidéo qui fonctionne sur des pages HTML normales ne fonctionnera pas sur AMP et il faut donc créer une balise spécifique qui permet au Runtime AMP de charger votre lecteur. Brightcove a créé une balise [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md) personnalisée qui permet le lire des fichiers multimédia et des annonces sur des pages AMP.

Le code suivant permet d'ouvrir un lecteur Brightcove:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Pour obtenir des instructions sur comment développer une balise amp telle que Brightcove, consultez [cette demande de tirage](https://github.com/ampproject/amphtml/pull/1052) .

## Réseau publicitaire vidéo <a name="video-ad-network"></a>

_Exemples : Tremor, Brightroll_

Si vous êtes un réseau publicitaire vidéo, veuillez collaborer avec votre éditeur pour vous assurer que:

- Tous les éléments vidéo sont diffusés via HTTPS
- Le lecteur vidéo de l'éditeur prend en charge AMP

## Plateforme de gestion des données (DMP) <a name="data-management-platform-dmp"></a>

_Exemples : KRUX, Bluekai_

Voir [comment améliorer la configuration des annonces personnalisées](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Vous pouvez utiliser une approche similaire pour enrichir l'ouverture d'annonce en insérant les segments d'audience que vous obtenez du cookie de l'utilisateur dans l'ouverture d'annonce.

## Fournisseur de visibilité <a name="viewability-provider"></a>

_Exemples: MOAT, Integral Ad Science_

Les fournisseurs de visibilité s'intègrent généralement aux éditeurs via les wrappers de création du serveur publicitaire. Si tel est le cas, assurez-vous que le wrapper de création charge tous les éléments via HTTPS.

Par exemple, pour MOAT, assurez-vous que `http://js.moatads.com` devient `https://z.moatads.com`

Voir également l'approche en utilisant le [modèle d'observateur d'intersection](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## Plateforme de recommandation de contenu <a name="content-recommendation-platform"></a>

_Exemples : Taboola, Outbrain_

Utile si vous avez du JavaScript intégré sur le site Web de l'éditeur aujourd'hui, mais que l'approche ne fonctionne pas sur les pages AMP. Si vous souhaitez recommander du contenu sur une page AMP, nous vous suggérons d'utiliser [l'extension `amp-embed`](https://amp.dev/documentation/components/amp-ad) pour demander les détails du contenu. Veuillez consulter l'exemple [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
