---
'$title': Intégrer AMP à votre application
$order: 2
description: "Ce guide est destiné aux développeurs d'applications mobiles et Web qui souhaitent intégrer et créer des liens vers des pages AMP. Par exemple, considérons une application de messagerie mobile ..."
formats:
  - websites
---

Ce guide est destiné aux développeurs d'applications mobiles et Web qui souhaitent intégrer et créer des liens vers des pages AMP. Par exemple, considérons une application de messagerie mobile qui charge la version AMP d'une URL partagée pour offrir une expérience plus rapide aux utilisateurs.

## Transformer les liens en AMP

Avec AMP, il est possible d'afficher presque instantanément des sites Web externes dans votre application Web native ou mobile. Vous pouvez y parvenir en faisant correspondre les URL de votre contenu à leurs URL AMP correspondantes (le cas échéant) et en ouvrant la version AMP au lieu de la version d'origine. Vous pouvez utiliser des outils tels que [l'API d'URL AMP de Google](https://developers.google.com/amp/cache/use-amp-url) pour vous aider.

Par exemple, le message suivant peut être transformé pour afficher les versions AMP en remplaçant toutes les URL par leurs versions AMP correspondantes (si elles existent). Pour réduire le temps de chargement et garantir la diffusion d'une page AMP valide, vous devez créer un lien vers les pages AMP mises en cache dans le cache AMP.

Message d'origine:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Message transformé:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **CONSEIL -** Pensez à offrir aux utilisateurs la possibilité d'afficher la version non AMP au lieu de la version AMP via les paramètres de préférence de votre application. [/tip]

### Comment transformer les liens

Il existe trois façons de transformer des liens par programmation:

1. **Heure d'écriture côté serveur (de préférence)**: récupérez l'URL AMP via l'API d'URL AMP de Google au moment de l'écriture d'une URL et stockez les URL AMP côté serveur. Transmettez les deux URL au client car l'URL d'origine peut être nécessaire pour le partage. C'est l'approche recommandée car il y a moins de requêtes réseau côté client. Lorsque vous adoptez cette approche, il est important d'analyser régulièrement (par exemple quotidiennement) les liens pour les versions AMP, car les sites Internet adoptent de plus en plus le format AMP.
2. **Heure de lecture côté serveur (certaines utilisations)**: récupérez l'URL AMP via l'API d'URL AMP de Google avant de transmettre le contenu à votre client. Comme mentionné ci-dessus, transmettez les deux URL (AMP et non AMP) au client car l'URL d'origine peut être nécessaire pour le partage. Cette méthode peut être utile pour les services à faible diffusion.
3. **Côté client (si impossible côté serveur)**: récupérez l'URL AMP via l'API d'URL AMP de Google à partir du client. Utilisez cette approche si la transformation d'URL côté serveur n'est pas possible (par exemple, pour les applications de messagerie utilisant un chiffrement de bout en bout). Assurez-vous de déclencher la transformation d'URL dès que le contenu est disponible, avant toute interaction de l'utilisateur.

[tip type="important"] **IMPORTANT -** Ne demandez jamais d'URL AMP via l'API AMP de Google à la suite d'une interaction de l'utilisateur, car cela dégrade les performances de votre application en introduisant une requête réseau supplémentaire. Utilisez plutôt l'une des trois approches décrites ci-dessus. [/tip]

#### API d'URL AMP de Google

Google fournit l'API d'URL AMP pour récupérer les URL HTML AMP correspondantes pour une liste d'URL donnée ( [documentation officielle](https://developers.google.com/amp/cache/use-amp-url) / [démo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html). Les URL n'ont pas besoin d'être les versions canoniques. S'il existe une version AMP, la réponse comprend l'URL AMP d'origine et l'URL de la page AMP mise en cache dans le Google AMP Cache.

Par exemple, pour une liste d'URL donnée:

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

Le corps de la réponse contient le mappage d'URL AMP au format JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **REMARQUE -** les URL des pages AMP mises en cache sur des caches AMP non Google ne peuvent pas être récupérées via l'API d'URL AMP. Cependant, vous pouvez facilement dériver l'URL mise en cache à partir de l'URL AMP renvoyée (ampURL). [/tip]

## Utilisation des caches AMP

Un [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) est un réseau de distribution de contenu (CDN) basé sur un proxy pour la diffusion de documents AMP valides. Les caches AMP sont conçus pour:

- Diffuser uniquement des pages AMP valides.
- Permettre aux pages AMP d'être préchargées efficacement et en toute sécurité.
- Effectuer des optimisations supplémentaires des performances du contenu, avantageuses pour l'utilisateur.

Actuellement, il existe deux fournisseurs de cache AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Cela donne deux choix pour afficher un fichier AMP dans une application en utilisant soit:

1. la version hébergée par l'éditeur
2. la version hébergée dans un cache AMP

Nous vous recommandons d'utiliser le cache AMP pour les raisons suivantes:

- Meilleure expérience utilisateur grâce à un temps de chargement plus rapide et une faible latence (temps de chargement plus rapide > 1s).
- Avantages en termes de performances et de bande passante grâce à la mise en cache supplémentaire des artefacts dépendants du client, par exemple la mise en cache de différentes versions de la même image en fonction de la taille de la fenêtre d'affichage du client.
- Le fichier AMP d'origine peut ne plus être un fichier AMP valide, ce qui peut entraîner une mauvaise expérience utilisateur. Dans ce cas, le cache AMP sert la dernière version valide du fichier AMP.
- Un éditeur peu intègre peut servir deux documents différents à un robot d'exploration de cache AMP et à vos utilisateurs. L'utilisation d'un cache AMP garantit que les utilisateurs voient toujours le même fichier AMP que le cache.

[tip type="important"] **IMPORTANT -** Lors de la diffusion de pages AMP via le cache AMP, offrez une expérience de visualisation qui montre clairement l'origine du fichier AMP et offre la possibilité aux utilisateurs de partager l'URL canonique (voir également les deux sections suivantes pour en savoir plus à ce sujet). [/tip]

## Implémentation d'une visionneuse AMP

Le runtime AMP fournit une API de visionneuse, qui fournit un protocole pour envoyer et recevoir des messages entre le runtime AMP et la visionneuse. Cela permet de contrôler le pré-affichage des documents AMP, le basculement entre les articles et l'instrumentalisation du runtime AMP. Vous pouvez en savoir plus sur l'API de visionneuse AMP dans le guide [Connecter des visionneuses AMP avec des pages AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) . Les implémentations de visionneuse pour le [Web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) et [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) sont disponibles sur [GitHub](https://github.com/ampproject/amp-viewer). Une visionneuse Android n'est pas encore disponible, consultez [cette réponse](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) sur Stack Overflow pour savoir comment configurer au mieux une visionneuse Web pour afficher les pages AMP.

Voici quelques bonnes pratiques générales pour implémenter une visionneuse AMP:

- Diffusez la page AMP à partir d'un cache AMP (temps de chargement plus rapide > 1s).
- Affichez l'origine de l'éditeur de l'article (par exemple, dans un en-tête réductible).
- Fournissez une action de partage (voir également la section « [Partage de contenu AMP](#sharing-amp-content) » ci-dessous).
- Dans les visionneuses basées sur WebView, activez les cookies tiers.
- Définissez un référent pour votre plate-forme/application.

### Partage de contenu AMP <a name="sharing-amp-content"></a>

Lors du partage d'un document AMP à partir de la visionneuse AMP d'une plate-forme, la plateforme doit partager l'URL canonique lorsque cela est techniquement possible. Par exemple, si la plateforme fournit un bouton de partage, ce bouton doit partager l'URL canonique.

La philosophie du Projet AMP est que les plateformes puissent choisir quelle version d'un document elles présentent à l'utilisateur. Pour cette raison, il est plus logique de partager la version canonique (par opposition à la version AMP) lors du partage sur une plateforme différente, puis de laisser la plateforme cible faire le bon choix.
