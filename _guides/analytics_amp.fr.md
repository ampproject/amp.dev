---
layout: page
title: Configuration d'Analytics
order: 5
folder: analytics
locale: fr
---

## Décidez avant de commencer

Toutes les solutions d'analyse reposent sur la connaissance des données dont vous avez besoin
et sur la façon dont vous comptez analyser ces données. Décidez avant de commencer :

* Est-ce que pour analyser l'engagement des utilisateurs vous allez utiliser des outils d'analyse tiers
ou votre propre solution interne ?
* Quels comportements des utilisateurs allez-vous mesurer pour comprendre l'engagement des utilisateurs ?

### Transmettre les données au fournisseur ou vous les envoyer à vous-même ?

Si vous avez votre propre solution interne pour mesurer l'engagement des utilisateurs,
la seule chose dont vous aurez besoin pour intégrer les analyses AMP à cette solution est une URL.
C'est là que vous enverrez les données.
Vous pouvez également envoyer des données à différentes URL.
Par exemple, vous pouvez envoyer les données sur les vues de page à une URL
et les données d'engagement social à une autre.

Les analyses AMP sont spécialement conçues pour mesurer une seule fois et transmettre ces mesures à autant de destinataires que nécessaire.
Si vous travaillez déjà avec un ou plusieurs fournisseurs de solutions d'analyse,
consultez la
[spécification du composant amp-analytics](/docs/reference/extended/amp-analytics.html)
pour savoir s'ils ont intégré leur solution avec AMP.
Le cas échéant, il suffit de créer un lien vers leurs documents depuis la spécification
et de commencer à suivre les instructions.

Si le fournisseur de solutions d'analyse n'est pas intégré à AMP,
contactez son service de support.
Nous vous encourageons également à [créer un ticket d'incident dans le projet AMP](https://github.com/ampproject/amphtml/issues/new)
pour demander à ce que le fournisseur soit ajouté.
Voir également
[Intégration de vos outils d'analyse dans AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### De quelles données avez-vous besoin ?

Quelles données sur vos utilisateurs allez-vous capturer pour mesurer l'engagement ?
Vous devez en effet identifier ces données avant de pouvoir les configurer.

Points clés à prendre en compte concernant les données :

* Allez-vous suivre uniquement les vues de page ou d'autres tendances sur l'engagement des utilisateurs
(voir également [amp-pixel ou amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics)) ?
* Quels types de données allez-vous capturer sur vos utilisateurs, votre contenu,
le périphérique ou le navigateur (voir également [Substitution de variables](/docs/guides/analytics/analytics_basics.html#variable-substition)) ?
* Comment allez-vous identifier vos utilisateurs (voir également [Identification des utilisateurs](/docs/guides/analytics/analytics_basics.html#user-identification)) ?
