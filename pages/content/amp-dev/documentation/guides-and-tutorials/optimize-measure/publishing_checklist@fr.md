---
'$title': Liste de contrôle de publication AMP
$order: 0
description: "La conception Web interactive consiste à créer des pages Web fluides qui répondent aux besoins de vos utilisateurs, des pages adaptées à la taille et à l'orientation de l'écran de leur appareil. Vous pouvez y parvenir ..."
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Suivez cette liste de contrôle pour offrir à votre site l'expérience AMP la plus complète!

# Assurer la validation des spécifications AMP

AMP est livré avec une tonne d'avantages intégrés, tels que la réduction du temps d'attente des utilisateurs en préchargeant le contenu à partir des caches AMP. Pour bénéficier de ces avantages, les pages doivent être des documents AMP valides. Les pages publiées contenant des erreurs signalées par le validateur AMP ne peuvent pas être indexées par les caches AMP et peuvent éventuellement être diffusées comme des pages erronées.

Ne publiez plus jamais une page AMP non valide grâce à ces outils:

- [Valider les pages AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [Le validateur AMP](https://validator.ampproject.org/)
- [Testeur AMP de Google](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Outils AMP](../../../documentation/tools.html?format=websites)

# Accorder l'accès au serveur des pages AMP en cache

Bonne nouvelle, les pages AMP valides s'inscrivent automatiquement dans tous les caches AMP existants! Cela signifie que vos utilisateurs bénéficient d'un contenu qui se charge efficacement et en toute sécurité. Ces types d'optimisations sont excellents, mais s'accompagnent d'un petit problème. Certains utilisateurs recevront des pages AMP provenant de domaines qui ne correspondent pas au vôtre. Cela peut entraîner la perte d'accès des pages aux données du site lors de l'utilisation de composants AMP dynamiques tels que [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) ou [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Ces types d'erreurs sont sont appelés Cross-Origin Resource Sharing, ou CORS. Travaillez avec la sécurité, pas contre elle, en activant les requêtes CORS à partir de tous les [caches AMP](https://cdn.ampproject.org/caches.json) disponibles! Si vous utilisez Node.js dans votre back-end, vous pouvez utiliser [middleware amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Pour plus de détails sur l'octroi de l'accès au serveur:

- [Comment les pages AMP sont mises en cache ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [Les CORS dans AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Middleware AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) pour Node.js

# Contenu sûr et partageable avec échanges signés

Conservez l'URL de votre domaine et simplifiez les analyses lors du partage de contenu via des échanges signés (SXG). En diffusant des pages AMP avec SXG, les signatures numériques protègent vos informations en liant le document à son URL revendiquée. Ce comportement traite les sessions utilisateur et les cookies comme des données propriétaires, comblant d'éventuelles lacunes d'analyse. La mise en œuvre de SXG fournit du contenu AMP signé en plus, plutôt qu'à la place du contenu AMP normal.

Pour plus de détails sur la mise en œuvre des échanges signés:

- [Fournir AMP à l'aide d'échanges signés](signed-exchange.md?format=websites)
- [Échanges HTTP signés](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [URL réelle Cloudflare AMP](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Des échanges signés pour de meilleures URL AMP et des analyses plus faciles (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Tester les pages mises en cache

Les caches AMP stockent des images, des polices et le contenu des pages pour fournir votre contenu aux utilisateurs dès qu'ils le souhaitent. Il est donc important de vérifier que vos pages AMP offrent l'aspect et le fonctionnement prévus lorsqu'elles sont diffusées à partir d'un cache AMP.

Lorsque vous ajoutez des pages AMP à un cache AMP, vérifiez à l'aide des [outils de développement de votre navigateur](https://developers.google.com/web/tools/chrome-devtools/) que toutes les ressources externes peuvent être chargées. Voici une liste à garde à l'esprit:

- images
- vidéos
- points de terminaison amp-analytics
- points de terminaison amp-pixel
- polices personnalisées
- iframes

En savoir plus sur les caches AMP:

- [Utilisation de Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP sur Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Déboguer les problèmes de cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Format d'URL du cache AMP et traitement des demandes](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# S'assurer que vos fichiers AMP sont détectables par les moteurs de recherche

Les pages créées uniquement en AMP (AMP-first) et les pages avec une doublure AMP double (AMP apparié) doivent toutes être détectables! Toutes les pages AMP doivent avoir `<link rel="canonical" href="$SOME_URL">` dans la section `<head>`. Les pages AMP-first doivent créer un lien vers elles-mêmes et les pages AMP appariées à une page non AMP devront créer un lien entre elles.

Assurez-vous que vos métadonnées [Schema.org](https://schema.org/) ajoutent des informations utiles! D'autres sites et moteurs de recherche peuvent en avoir besoin pour partager votre contenu.

Les robots, wanderers, crawlers ou spiders, sont tous des noms de programmes d'exploration de contenu. Ils parcourent le Web, aidant les moteurs de recherche à indexer le contenu Web afin que les requêtes des utilisateurs puissent afficher les bons résultats! Assurez-vous que vos utilisateurs peuvent trouver votre site en incluant les instructions appropriées dans le fichier `robots.txt` et en configurant les en-têtes appropriés.

N'excluez PAS les robots d'exploration via votre fichier [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

N'ajoutez PAS une balise meta de robots `noindex` dans vos fichiers AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

N'incluez PAS `noindex` comme en-tête HTTP X-Robots-Tag dans vos fichiers AMP.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Comment rendre vos pages détectables:

- [Rendre votre page détectable](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Spécifications de la balise meta de robots et de l'en-tête HTTP X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [FAQ sur l'indexation AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Mesurer le trafic et les parcours des utilisateurs

La collecte de mesures correctes est essentielle à des analyses utiles. Lorsque vous testez l'impact de l'introduction d'AMP dans votre site sur les utilisateurs, assurez-vous de mesurer les bons éléments. Des faux négatifs, des faux positifs ou des résultats non pertinents peuvent survenir si les analyses ne tiennent pas compte des différences qu'AMP peut créer. Assurez-vous de comprendre ce qu'il faut rechercher et comment le mesurer!

En savoir plus sur la configuration des analyses appropriées pour AMP:

- [Donc votre test AMP ne fonctionne pas, que faire?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Analyse cache vs. non-cache](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Mesurer les parcours des utilisateurs dans le cache AMP et sur votre site Web](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Mesurer le succès: quoi de neuf dans l'analyse et les expériences AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Des échanges signés pour de meilleures URL AMP et des analyses plus faciles (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
