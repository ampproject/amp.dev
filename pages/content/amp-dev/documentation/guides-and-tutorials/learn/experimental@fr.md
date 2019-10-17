---
$title: Composants expérimentaux
---

Les [composants expérimentaux AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) désignent des nouvelles fonctionnalités qui ne sont pas encore prêtes à être utilisées par le grand public et sont donc encore à l'état expérimental.

Les développeurs et les utilisateurs peuvent choisir de tester ces fonctionnalités avant leur sortie définitive.
Toutefois, ces fonctionnalités doivent être utilisées avec prudence, car elles peuvent contenir des bugs ou avoir des effets secondaires inattendus.

## Activer la version en développement d'AMP

La version en développement d'AMP permet d'activer une nouvelle version des bibliothèques AMP JS dans votre navigateur.

Pour activer cette version, consultez la page [Composants expérimentaux AMP](https://cdn.ampproject.org/experiments.html) et activez le composant "AMP Dev Channel" (version en développement d'AMP).

## Activer un composant expérimental

Pour le contenu diffusé depuis [https://cdn.ampproject.org](https://cdn.ampproject.org), consultez la page [Composants expérimentaux AMP](https://cdn.ampproject.org/experiments.html) et activez (ou désactivez) les composants de votre choix. Lorsque vous activez un composant, un cookie est placé dans votre navigateur. Il active le composant sur toutes les pages AMP diffusées par le biais du cache AMP Google.

Pour le contenu diffusé depuis d'autres domaines, il est possible d'activer les composants expérimentaux dans la console des outils de développement en mode développement à l'aide de :

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Tout fichier AMP comprenant des fonctionnalités expérimentales échouera à la [validation AMP](validation-workflow/validate_amp.md).
Supprimez ces composants expérimentaux pour les documents AMP prêts pour la production.
