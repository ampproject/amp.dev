---
"$title": Comment générer rentabiliser votre page AMP avec des publicités
"$order": '0'
description: Ce guide fournit des instructions et des bonnes pratiques pour afficher des annonces sur vos pages AMP. Ainsi, pour afficher des publicités dans AMP, vous devez ajouter le composant amp-ad personnalisé...
formats:
- websites
---

Ce guide fournit des instructions et des bonnes pratiques pour afficher des annonces sur vos pages AMP.

## Comment ajouter des annonces à votre page

Avec les pages non AMP (HTML traditionnel), si vous souhaitez afficher des annonces sur votre page, vous devez inclure un extrait de code JavaScript pour diffuser des annonces à partir de votre réseau publicitaire. Pour des raisons de performances et de sécurité, vous ne pouvez pas ajouter du JavaScript tiers sur les pages AMP. Par conséquent, pour afficher des annonces dans AMP, vous devez ajouter le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) personnalisé à votre page AMP.

[tip type="tip"] **CONSEIL –** Voir [AMP par l'exemple pour une démo en direct](../../../../documentation/components/reference/amp-ad.md) qui montre comment ajouter une balise amp-ad à une page AMP. [/tip]

Passons en revue les étapes d'ajout du composant afin de vous permettre d'afficher des annonces sur votre page AMP.

### Étape 1: ajoutez le script amp-ad

Le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) est une extension d'annonce personnalisée de la bibliothèque AMP. Sous [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) se cache du JavaScript personnalisé soigneusement conçu pour optimiser les performances. Pour exécuter le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), vous devez ajouter le JavaScript requis pour ce composant dans la section `head` de votre page AMP:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Étape 2: ajoutez le tag amp-ad à votre page AMP

Plus de 100 [serveurs et réseaux publicitaires](ads_vendors.md) offrent des intégrations intégrées avec AMP. Pour ajouter une annonce pour un réseau publicitaire donné, ajoutez la balise [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) et spécifiez le réseau dans l'attribut `type`.

Dans cet exemple, nous ajoutons un espace publicitaire pour diffuser des annonces depuis le réseau a9:

```html
<amp-ad type="a9">
</amp-ad>
```

### Étape 3: spécifiez la taille du bloc d'annonce

Ajoutez les attributs `width` et `height` à la balise [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Cela spécifie la taille de l'annonce sur votre page AMP:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Étape 4: définissez les paramètres du réseau publicitaire

Chaque réseau possède des attributs de données spécifiques dont il a besoin pour diffuser des annonces. Consultez la documentation [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) du réseau publicitaire et ajoutez les attributs nécessaires. Dans l'exemple suivant, le réseau a9 demande des paramètres supplémentaires pour spécifier la taille de l'annonce et d'autres détails:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Étape 5: spécifiez un caractère de remplacement (facultatif)

En fonction du réseau publicitaire, vous pouvez choisir d'afficher un caractère de remplacement jusqu'à ce que l'annonce soit disponible à la visualisation. Cela offre une meilleure expérience utilisateur en évitant les vides. Pour spécifier un caractère de remplacement, ajoutez un élément enfant avec l'attribut `placeholder`. Plus de détails dans la section [Caractères de remplacement et solutions de secours](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Étape 6: spécifiez une solution de secours (facultatif)

En fonction du réseau publicitaire, vous pouvez choisir d'afficher un élément de secours si aucune annonce n'est disponible pour être diffusée. Pour spécifier une solution de secours, ajoutez un élément enfant avec l'attribut `fallback`. Plus de détails dans la section [Caractères de remplacement et solutions de secours](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Félicitations! Vous diffusez maintenant des annonces sur votre page AMP!

## Diffusion d'annonces AMPHTML à vente directe

Le composant [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) diffuse les annonces depuis le réseau que vous spécifiez. Ces annonces peuvent être des annonces HTML standard ou des annonces AMPHTML, à condition que le réseau publicitaire prenne en charge les annonces AMPHTML. Pour diffuser vos annonces à vente directe sous forme d'annonces AMPHTML, créez l'annonce au format AMP HTML conformément aux exigences des [spécifications d'annonce AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) et utilisez un [serveur publicitaire qui diffuse des annonces](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers) AMPHTML.

## Comment augmenter les données de ciblage sur les demandes d'annonces

Dans le cadre du mécanisme de diffusion Fast Fetch, la fonctionnalité Real-Time Config (RTC) permet aux éditeurs d'augmenter les demandes d'annonces avec des informations de ciblage propriétaires et tierces qui sont récupérées au moment de l'exécution. RTC autorise jusqu'à 5 appels vers des serveurs de ciblage pour chaque espace publicitaire individuel, dont les résultats sont ajoutés à la demande d'annonce. Pour utiliser RTC sur vos annonces, le réseau publicitaire que vous utilisez doit prendre en charge RTC et Fast Fetch.

Vous trouverez plus de détails sur RTC dans cette vidéo YouTube:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Ou alors consultez les ressources RTC suivantes:

- [Guide d'implémentation de l'éditeur AMP RTC](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [Configuration AMP en temps réel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## Bonnes pratiques

Voici quelques conseils pour optimiser l'efficacité des annonces sur vos pages AMP:

### Emplacement et contrôles: optimisez l'emplacement de vos annonces

- **Placez le même nombre d'annonces** sur les pages AMP que sur vos pages non AMP pour générer un maximum de revenus par page.
- **Placez la première annonce juste en dessous de la première fenêtre** (« sous le pli ») pour offrir une expérience utilisateur optimale.
- À moins que vous utilisiez des requêtes CSS ou multimédias avancées, **assurez-vous que vos blocs d'annonces sont centrés sur la page** pour offrir à vos utilisateurs une expérience Web mobile optimale.
- Activez [les demandes d'annonces multi-tailles](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) dans votre inventaire AMP pour augmenter la pression des enchères publicitaires et générer des revenus.

### Demande et tarification: obtenez le bon prix pour vos annonces

- **Vendez des blocs d'annonces sur vos pages AMP sur tous les canaux de vente**, y compris les canaux directs et indirects, afin d'optimiser la concurrence de votre inventaire sur les pages AMP.
- **Sur les pages AMP, fixez les prix de votre inventaire publicitaire** comme vous le faites sur les pages non AMP. Surveillez les performances et ajustez les prix en conséquence.
- **Assurez-vous que tous les canaux de demande publicitaire sont en concurrence** pour l'inventaire publicitaire sur vos pages AMP afin de stimuler la concurrence.

### Types d'annonces: diffusez les meilleurs types d'annonces

- **Évitez les publicités lourdes** conformément aux [directives IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Évitez les interstitiels** ou autres formats d'annonces qui provoquent la rediffusion du contenu lors du chargement des annonces.
- **Optimisez la visibilité** en définissant la stratégie de chargement des données sur préférer la visibilité par rapport aux vues.
- **Placez des annonces dans votre contenu vidéo** via les [lecteurs pris en charge](../../../../documentation/components/index.html#media) ou [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) pour générer des revenus sur tous les types de contenu.
- **Implémentez des annonces natives** pour concurrencer les annonces graphiques à l'aide de demandes d'annonces de multi-tailles, ce qui augmente la pression de la demande tout en offrant à vos lecteurs une expérience utilisateur optimale.

### Innovation: proposez les produits publicitaires les plus attrayants

- **implémentez des publicités sur les pages AMP auxiliaires** pour générer des revenus supplémentaires:
    - [Annonces dans un carrousel](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Annonces dans une lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - ... et [plus](../../../../documentation/examples/index.html)
- **Implémentez de nouveaux formats d'annonces à vente directe** pour équiper votre équipe de vente de produits publicitaires innovants à fort impact:
    - [Annonces collantes](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Tapis volant](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Ressources supplémentaires

- [Modèles d'annonces AMPHTML](../../../../documentation/examples/index.html)
- [Démo: comment ajouter `amp-ad` à votre page AMP](../../../../documentation/components/reference/amp-ad.md)
