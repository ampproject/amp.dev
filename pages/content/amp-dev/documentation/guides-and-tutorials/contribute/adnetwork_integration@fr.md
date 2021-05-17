---
'$title': "Intégration d'AMP pour diffuser des annonces"
$order: 5
description: Ce guide est destiné aux réseaux publicitaires qui souhaitent intégrer AMP pour diffuser des annonces sur les pages AMP.
formats:
  - ads
---

Ce guide est destiné aux réseaux publicitaires qui souhaitent intégrer AMP pour diffuser des annonces sur les pages AMP.

## Présentation

En tant que serveur publicitaire, vous pouvez intégrer AMP pour diffuser des annonces HTML traditionnelles sur les pages AMP, et pour diffuser des annonces [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Vous souhaitez diffuser des annonces HTML traditionnelles?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Vous souhaitez diffuser des annonces AMPHTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (si vous n'en avez pas encore créé une pour diffuser les annonces HTML traditionnelles).
2. [Créez une intégration Fast Fetch pour diffuser des annonces AMPHTML](#creating-a-fast-fetch-integration).

## Crétation d'une `amp-ad` <a name="creating-an-amp-ad"></a>

En tant que serveur publicitaire, les éditeurs que vous prenez en charge incluent une bibliothèque JavaScript fournie par vos soins et placent divers « extraits d'annonces » qui s'appuient sur la bibliothèque JavaScript pour récupérer les annonces et les diffuser sur le site Web de l'éditeur. Étant donné qu'AMP n'autorise pas les éditeurs à exécuter du JavaScript arbitraire, vous devrez contribuer au code open source AMP pour permettre à la balise [`amp-ad`](../../../documentation/components/reference/amp-ad.md) de demander des annonces à votre serveur publicitaire.

[tip type="note"] **REMARQUE -** Vous pouvez utiliser cette implémentation [`amp-ad`](../../../documentation/components/reference/amp-ad.md) pour afficher des annonces HTML traditionnelles **et** des annonces AMPHTML. [/tip]

Par exemple, le serveur Amazon A9 peut être appelé à l'aide de la syntaxe suivante:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Dans le code ci-dessus, l'attribut `type` spécifie le réseau publicitaire, qui dans ce cas est A9. Les attributs `data-*` dépendent des paramètres attendus du serveur A9 d'Amazon pour diffuser une annonce. Le fichier [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) vous montre comment les paramètres sont mappés pour effectuer un appel JavaScript à l'URL du serveur A9. Les paramètres correspondants transmis par la balise [`amp-ad`](../../../documentation/components/reference/amp-ad.md) sont ajoutés à l'URL pour renvoyer une annonce.

Pour obtenir des instructions sur la création d'une intégration [`amp-ad`](../../../documentation/components/reference/amp-ad.md), consultez la section [Intégration de réseaux publicitaires dans AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Créer une intégration Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) est un mécanisme AMP qui sépare la requête d'annonce de la réponse d'annonce, permettant aux requêtes d'annonce de se produire plus tôt dans le cycle de vie de la page et d'afficher les annonces uniquement lorsqu'elles sont susceptibles d'être vues par les utilisateurs. Fast Fetch offre un traitement préférentiel aux annonces AMPHTML vérifiées par rapport aux annonces HTML traditionnelles. Dans Fast Fetch, si la validation d'une annonce échoue, cette annonce est enveloppée dans une iframe interdomaine et placée dans le bas à sable, à l'écart du reste du document AMP. Inversement, une annonce AMPHTML dont la validation est réussie est écrite directement dans la page. Fast Fetch gère à la fois les publicités AMP et non AMP; aucune requête d'annonce supplémentaire n'est requise pour les annonces dont la validation échoue.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integration flow' ) }}

Pour diffuser des annonces AMPHTML à partir de votre serveur publicitaire, vous devez fournir une intégration Fast Fetch qui comprend:

1. La prise en charge de la communication réseau SSL.
2. Du JavaScript pour créer la requête d'annonce (exemples d'implémentations: [AdSense](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-adsense-impl) et [DoubleClick](https://github.com/ampproject/amphtml/tree/main/extensions/amp-ad-network-doubleclick-impl)).
3. La validation et la signature de la publicité via un service de validation. [Cloudflare](https://blog.cloudflare.com/firebolt/) fournit un service de vérification d'annonces AMP, permettant à tout fournisseur d'annonce indépendant de diffuser des publicités plus rapides, plus légères et plus attrayantes.

Pour obtenir des instructions sur la création d'une intégration Fast Fetch, consultez la section [Guide d'implémentation réseau Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## Ressources associées

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Liste des fournisseurs d'annonces pris en charge](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Entrée de blog décrivant le lancement de Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
