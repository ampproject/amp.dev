---
"$title": Introduction aux annonces AMPHTML
"$order": '1'
description: Les annonces AMPHTML sont un moyen plus rapide, plus léger et plus sûr de faire de la publicité sur le Web. Bien que les pages AMP prennent en charge les annonces HTML traditionnelles, ces annonces peuvent être lentes à charger.
formats:
- ads
---

## Qu'est-ce qu'une annonce AMPHTML?

Les annonces AMPHTML sont un moyen plus rapide, plus léger et plus sûr de faire de la publicité sur le Web. Bien que les pages AMP prennent en charge les annonces HTML traditionnelles, ces annonces peuvent être lentes à charger. Pour rendre les annonces aussi rapides que le reste de la page AMP, vous pouvez créer des annonces en AMPHTML. Les annonces AMPHTML ne sont diffusées qu'après avoir été validées, garantissant ainsi la sécurité et la performance des annonces. Surtout, ces annonces peuvent être diffusées n'importe où sur le Web, *pas seulement sur les pages AMP*.

Les annonces AMPHTML sont rédigées en HTML AMPconformément aux [spécifications pour annonces AMPHTML](a4a_spec.md) (une variante de HTML AMP + CSS). Cela signifie que les annonces n'ont plus la capacité d'exécuter du JavaScript arbitraire, qui est traditionnellement la première cause des mauvaises performances publicitaires. Par conséquent, tout comme l'AMP de base, les cas d'utilisation JavaScript des annonces de base sont intégrés directement dans le projet AMP Open Source qui garantit un bon comportement des publicités.

### Avantages

Pourquoi les annonces AMPHTML sont-elles meilleures que les annonces traditionnelles?

1. **Plus rapide**: les annonces AMPHTML sont plus rapides car les annonces sont demandées plus tôt dans le processus de rendu de la page et affichées juste avant que l'utilisateur ne soit sur le point de voir l'annonce. La réduction de la taille de fichier des annonces AMPHTML permet également de les accélerer.
2. **Plus léger**: les annonces AMPHTML offrent des fonctionnalités d'annonces couramment utilisées, ce qui réduit la taille du fichier de l'annonce. Une fois sur la page, les annonces AMPHTML consomment également moins de ressources. Par exemple, au lieu d'avoir 10 trackers qui demandent leurs propres informations comme dans les annonces traditionnelles, les annonces AMPHTML collectent toutes les données une fois et les distribuent à un nombre illimité de trackers intéressés.
3. **Coordonné**: sur les pages AMP, le [runtime AMP](spec/amphtml.md#amp-runtime) peut coordonner les ressources limitées d'un téléphone mobile vers le bon composant au bon moment pour offrir une expérience utilisateur optimale. Par exemple, les annonces AMPHTML avec animations sont mises en pause lorsque les annonces ne sont pas dans la fenêtre d'affichage actuelle.
4. **Plus engageant**: les utilisateurs ne peuvent pas interagir avec des annonces qu'ils ne peuvent pas voir. Des annonces plus rapides conduisent à une meilleure visibilité et donc à des taux de clics plus élevés, ce qui conduit en fin de compte à de meilleures performances publicitaires.
5. **Sans logiciels malveillants**: il est impossible de propager des logiciels malveillants avec les annonces AMPHTML car elles sont vérifiées avant d'être diffusées. Ainsi, les annonceurs peuvent garantir une expérience utilisateur sûre et une image de marque positive.
6. **Plus flexible**: les annonces AMPHTML sont conçues pour fonctionner à la fois sur les pages Web AMP et non AMP, ainsi que sur n'importe quel appareil.

### Formats

Les annonces AMPHTML sont flexibles et dynamiques, permettant de nombreux formats créatifs tels que carrousel, parallaxe et lightbox, pour n'en nommer que quelques-uns. Commencez par exploiter des modèles d'annonces AMPHTML open source dans les [exemples](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carousel</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## Fonctionnement des annonces AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Les éditeurs insèrent un espace publicitaire sur leur page AMP via la balise [`amp-ad`](../../../documentation/components/reference/amp-ad.md), en spécifiant le réseau publicitaire qu'ils souhaitent utiliser.
2. Le runtime AMP envoie une demande d'annonce au réseau publicitaire spécifié pour récupérer l'annonce. Les réseaux publicitaires capables de diffuser des annonces AMPHTML fournissent une [mise en œuvre Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) qui valide et signe la création.
3. Le réseau publicitaire répond avec l'annonce AMPHTML et le runtime AMP affiche l'annonce sur la page AMP.

[tip type="note"] Aucune intégration spéciale n'est nécessaire pour diffuser des annonces AMPHTML sur des pages non AMP. Vérifiez si votre réseau publicitaire prend en charge les annonces AMPHTML. [/tip]

## Diffusion d'annonces AMPHTML

### Éditeurs

Pour diffuser vos formats d'annonces à ventre directe en AMPHTML, vous devez créer les annonces conformément aux [spécifications pour annonces AMPHTML](a4a_spec.md) et les diffuser à l'aide d'un serveur publicitaire prenant en charge la diffusion d'annonces AMPHTML. Les serveurs publicitaires qui prennent en charge les annonces AMPHTML pour le moment sont:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Pour diffuser des annonces AMPHTML via vos canaux indirects (par exemple, exchange, SSP, etc.), utilisez un réseau/serveur publicitaire compatible dans la [liste suivante](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Agences publicitaires

Si vous êtes une agence publicitaire, vous devez créer les annonces conformément aux [spécifications pour annonces AMPHTML](a4a_spec.md). Pour des modèles d'inspiration et des exemples, consultez les modèles d'annonces AMPHTML open source dans les [exemples](../../../documentation/examples/index.html). Vous pouvez également utiliser l'un des outils suivants pour créer des annonces AMPHTML:

- [Ad Creator de Celtra](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*bientôt disponible*)

### Réseaux/serveurs publicitaires

Pour diffuser des annonces AMPHTML sur des pages AMP, vous devez créer une extension [`amp-ad`](../../../documentation/components/reference/amp-ad.md) pour votre réseau (sauf si vous en avez déjà une) qui utilise la [mise en œuvre de demande d'annonce Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md). Consultez la section [Intégration à AMP pour diffuser des annonces](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) pour plus de détails. Gardez à l'esprit qu'aucune intégration spéciale n'est nécessaire pour diffuser des annonces AMPHTML sur des pages non AMP.

## Création d'annonces AMPHTML

**À partir de zéro**: les annonces AMPHTML doivent respecter les [spécifications pour annonces AMPHTML](a4a_spec.md). Pour des démonstrations et des exemples, consultez les modèles d'annonces AMPHTML open source dans les [exemples](../../../documentation/examples/documentation/amp-ad.html).

**Avec des outils**: vous pouvez utiliser l'un des outils suivants pour créer des annonces AMPHTML:

- [Ad Creator de Celtra](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*bientôt disponible*)

### Valider la syntaxe des annonces AMPHTML

Après avoir créé votre annonce AMPHTML, vous devez vous assurer que l'annonce utilise la syntaxe AMPHTML correcte. En fonction de votre environnement de développement, vous disposez de plusieurs options pour valider vos annonces AMPHTML:

- Utilisez le module [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) pour intégrer la validation dans votre CI de build.
- Utilisez le [validateur AMP](https://validator.ampproject.org/) pour des tests ponctuels.
- Associez-vous à [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) et utilisez leur point de terminaison de validation public.

[tip type="note"] **REMARQUE -** Pour afficher rapidement des annonces AMPHTML sur les pages AMP (c'est-à-dire en utilisant un rendu préférentiel dans Fast Fetch), la syntaxe doit être correcte. Si la syntaxe n'est pas valide, l'annonce sera diffusée, mais pas aussi rapidement. [/tip]

## Prise en charge des annonces AMPHTML dans RTB

Pour les SSP et les ad-exchanges qui souhaitent prendre en charge les annonces AMPHTML dans un environnement de vente en temps réel (RTB), reportez-vous au [Guide de mise en œuvre des ad-exchanges RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) pour plus de détails.

## FAQ

#### Existe-t-il des modèles d'annonces AMPHTML?

Oui. Vous trouverez de superbes modèles d'annonces AMPHTML dans les [exemples](../../../documentation/examples/documentation/amp-ad.html). Ces modèles utilisent des composants avancés dans AMP.

#### Les annonces AMPHTML prennent-elles en charge la vérification tierce et la détection de la visibilité?

Oui, les annonces prennent en charge par défaut la vérification et la détection de visibilité grâce à [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (cela permet par exemple d'intégrer ActiveView de Google). Il existe également d'autres fournisseurs comme MOAT qui implémentent activement cette prise en charge.

#### Les annonces AMPHTML prennent-elles en charge les animations basées sur la chronologie?

Oui. Voir [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### La plupart des annonces ont des cibles sélectionnables et des options de sorties configurables. Les annonces AMPHTML ont-elles un mécanisme similaire?

Oui. Voir [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Je ne trouve pas ce dont j'ai besoin, où puis-je poser des questions?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html)est notre méthode recommandée pour trouver des réponses aux questions sur AMP; étant donné que les membres de la communauté AMP Project vérifient régulièrement Stack Overflow, vous y recevrez probablement la réponse la plus rapide à vos questions.
- Rejoignez le groupe [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) pour trouver des solutions et des réponses.
- Si vous rencontrez un bogue dans AMP ou avez une demande de fonctionnalité pour AMP, consultez la section [Signaler des problèmes avec AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) pour plus d'informations sur le dépôt d'un ticket.
