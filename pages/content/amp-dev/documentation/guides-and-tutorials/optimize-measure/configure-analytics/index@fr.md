---
'$title': Configurer les analyses
$order: 5
'$hidden': 'true'
description: "Si vous utilisez Google Analytics comme fournisseur d'analyse, découvrez comment configurer Google Analytics de base pour AMP et comment associer du contenu AMP et non AMP à l'aide de l'ID client."
formats:
  - websites
  - stories
---

[tip] **CONSEIL -** Si vous utilisez Google Analytics comme fournisseur d'analyse, découvrez [comment configurer Google Analytics de base pour AMP](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) et [comment associer du contenu AMP et non AMP à l'aide de l'ID client](https://support.google.com/analytics/answer/7486764). [/tip]

## Décidez avant de commencer

Toutes les solutions d'analyse reposent sur la connaissance des données dont vous avez besoin et sur la manière dont vous comptez analyser ces données. Décidez avant de commencer:

- Utiliserez-vous des outils d'analyse tiers pour analyser l'engagement des utilisateurs ou votre propre solution interne?
- Quels comportements des utilisateurs allez-vous mesurer pour comprendre l'engagement des utilisateurs ?

### Transmettre les données au fournisseur ou vous les envoyer à vous-même ?

Si vous disposez de votre propre solution interne pour mesurer l'engagement des utilisateurs, la seule chose dont vous aurez besoin pour intégrer l'analyse AMP à cette solution est une URL. C'est ici que vous enverrez les données. Vous pouvez également envoyer des données à différentes URL. Par exemple, vous pouvez envoyer les données sur les pages visitées une URL et les données sur l'engagement social à une autre URL.

L'analyse AMP est spécialement conçue pour mesurer une fois et émettre plusieurs rapports. Si vous travaillez déjà avec un ou plusieurs fournisseurs d'analyse, consultez la liste des [fournisseurs d'analyse](analytics-vendors.md) pour voir s'ils ont intégré leur solution à AMP. Si tel est le cas, examinez les détails de leur configuration et suivez les instructions.

Si le fournisseur d'analyse n'a pas intégré sa solution à AMP, contactez le fournisseur pour lui demander son assistance. Nous vous encourageons également à [soulever un problème dans le projet AMP](https://github.com/ampproject/amphtml/issues/new) afin de demander l'ajout du fournisseur. Voir également [Intégration de vos outils d'analyse dans HTML AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md).

### De quelles données avez-vous besoin?

Quelles données sur vos utilisateurs allez-vous enregistrer afin de mesurer l'engagement? Vous devez identifier ces données avant de pouvoir les configurer.

Points de données clés à considérer:

- Allez-vous suivre uniquement les vues de page ou d'autres tendances sur l'engagement des utilisateurs (voir également [amp-pixel ou amp-analytics](../../../../documentation/components/reference/amp-pixel.md#use-amp-pixel-or-amp-analytics))?
- Quels types de données allez-vous enregistrer sur vos utilisateurs, votre contenu, le périphérique ou le navigateur (voir également [Substitution de variables](analytics_basics.md#variable-substitution))?
- Comment allez-vous identifier vos utilisateurs (voir également [Identification des utilisateurs](analytics_basics.md#user-identification)) ?

En savoir plus: plus de détails sur l'analyse dans [Analytics: principes de base](analytics_basics.md).
