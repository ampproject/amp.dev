---
"$title": Types de documentation
"$order": '1'
description: Types de contribution à la documentation acceptées sur amp.dev
formats:
- websites
- stories
- ads
- email
author: CrystalOnScript
toc: 'false'
---

Voici un bref aperçu des types de contributions à la documentation acceptées sur amp.dev :

- [Tutoriel d'introduction](documentation-types.md?format=websites#introductory-tutorial)
- [Tutoriel avancé](documentation-types.md?format=websites#advanced-tutorial)
- [Guide d'introduction](documentation-types.md?format=websites#introductory-guide)
- [Guide de concept](documentation-types.md?format=websites#concept-guide)
- [Documentation de référence](documentation-types.md?format=websites#reference-documentation)

## Tutoriel d'introduction <a name="introductory-tutorial"></a>

Les tutoriels d'introduction aident le développeur à comprendre l'idée générale de la technologie. Ils commencent par une introduction au codage et se terminent par un projet de base complet « Premiers pas ». Les tutoriels d'introduction montrent comment créer une fonctionnalité clé d'AMP dans un processus étape par étape. Combinez les tutoriels d'introduction à des exemples de code intégré et/ou à un échantillon téléchargeable qui nécessite un minimum d'ajustements par le développeur pour s'exécuter.

exemples amp.dev :

- [Créer votre première page AMP](../../../../documentation/guides-and-tutorials/start/create/index.md?format=websites)
- [Créer votre première story AMP](../../../../documentation/guides-and-tutorials/start/visual_story/index.md?format=stories)
- [Créer votre première pub AMPHTML](../../../../documentation/guides-and-tutorials/start/create_amphtml_ad/index.md?format=ads)

<table>
  <tr>
   <td>
<strong>À faire</strong>
   </td>
   <td>
<strong>À éviter</strong>
   </td>
  </tr>
  <tr>
   <td>Fournir des conseils avec de brèves explications et des étapes minimales.</td>
   <td>Aller en profondeur dans les nuances du projet. Il peut exister plusieurs moyens pour parvenir au résultat du tutoriel, mais le but n'est pas de montrer tous ces moyens, mais un seul qui soit bon.</td>
  </tr>
  <tr>
   <td>Fournir un environnement simplifié et des outils pour la configuration.</td>
   <td>Supposer que le développeur est maîtrise le produit et a une capacité de codage d'expert.</td>
  </tr>
  <tr>
   <td>S'assurer que l'échantillon est simpliste à vue d'œil.</td>
   <td>Compliquer pour des raisons de style, à moins que le tutoriel porte sur le style.</td>
  </tr>
  <tr>
   <td>Fournir une capture d'écran de chaque étape et de la démo finale.</td>
   <td>Fournir uniquement des exemples de code.</td>
  </tr>
  <tr>
   <td>Créer un appel à l'action. Indiquez au développeur ce qu'il doit suivre.</td>
   <td>Combiner l'exemple avec des explications supplémentaires. Envisagez d'ouvrir un ticket pour un guide ou un tutoriel si vous trouvez le suivi insuffisant.</td>
  </tr>
</table>

## Tutoriel avancé <a name="advanced-tutorial"></a>

Les tutoriels avancés aident les développeurs à accomplir une tâche spécifique. Cela suppose que le développeur maîtrise plus ou moins AMP. Ces tutoriels doivent montrer comment créer une expérience, intégrer une fonctionnalité ou effectuer des tâches de mise en œuvre.

exemples amp.dev :

- [Comment configurer des analyses basiques pour vos pages AMP](../../../../documentation/guides-and-tutorials/optimize-measure/tracking-engagement.md?format=websites)
- [Ajouter un JavaScript personnalisé aux pages AMP avec amp-script](../../../../documentation/guides-and-tutorials/develop/custom-javascript-tutorial.md?format=websites)
- [Transformer votre site AMP en PWA](../../../../documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md?format=websites)

<table>
  <tr>
   <td>
<strong>À faire</strong>
   </td>
   <td>
<strong>À éviter</strong>
   </td>
  </tr>
  <tr>
   <td>Fournir des instructions étape par étape avec un projet final clair.</td>
   <td>Fournir des détails exhaustifs et des concepts trop élaborés.</td>
  </tr>
  <tr>
   <td>Fournir des exemples de code ou un code téléchargeable pour débutant. De plus, rendez le projet final et complet téléchargeable.</td>
   <td>Fournir des exemples ou des processus alternatifs pour atteindre le résultat final.</td>
  </tr>
  <tr>
   <td>Créer un environnement plug and play.</td>
   <td>Lien vers un tutoriel de configuration. Les tutoriels doivent être autonomes.</td>
  </tr>
</table>

## Guide d'introduction <a name="introductory-guide"></a>

Un guide d'introduction donne un aperçu des informations pertinentes pour se lancer dans AMP. Il doit identifier une fonctionnalité, la décrire et dire enfin ce qu'elle fait. Les guides d'introduction présentent au développeur les exigences de base de la fonctionnalité sans lui demander de l'implémenter. Si vous parcourez un processus étape par étape avec des exemples de code, vous écrivez probablement un tutoriel. Si vous décrivez tous les éléments de programmation d'un composant AMP, vous écrivez probablement un document de référence.

exemples amp.dev :

- [E-mail AMP: fondamentaux](../../../../documentation/guides-and-tutorials/learn/email_fundamentals.md?format=email)
- [Attributs d'élément communs](../../../../documentation/guides-and-tutorials/learn/common_attributes.md?format=websites)

<table>
  <tr>
   <td>
<strong>À faire</strong>
   </td>
   <td>
<strong>À éviter</strong>
   </td>
  </tr>
  <tr>
   <td>Identifier ce dont traitera le document.</td>
   <td>Décomposer en un processus étape par étape.</td>
  </tr>
  <tr>
   <td>Présenter les fonctionnalités et les concepts. Lien vers des documents de référence pour des détails d'utilisation avancés.</td>
   <td>Décrire en détail.</td>
  </tr>
  <tr>
   <td>Fournir des exemples de code et des exemples réels.</td>
   <td>Créer une application complète. Lien vers des exemples ou des démos à la place pour une exploration plus approfondie.</td>
  </tr>
  <tr>
   <td>Énumérer les utilisations et les contraintes techniques.</td>
   <td>Énumérer toutes les utilisations techniques possibles et la manière dont elles sont réalisées.</td>
  </tr>
</table>

## Guide de concept <a name="concept-guide"></a>

Les guides de concept aident les développeurs à approfondir leur compréhension d'AMP. Un guide de concept est semblable à une carte topographique. Elle montre les différents sentiers de la région avec des détails tels que les changements d'altitude, mais il ne prescrit pas un itinéraire spécifique pour traverser la zone. Expliquez ce qu'est une fonctionnalité et comment elle fonctionne plutôt que comment en créer une.

exemples amp.dev :

- [Animation et transition](../../../../documentation/guides-and-tutorials/develop/animations/triggering_css_animations.md?format=websites)
- [Suivi de l'engagement grâce aux analyses](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md?format=websites)
- [Style et mise en page](../../../../documentation/guides-and-tutorials/develop/style_and_layout/index.md?format=websites)

<table>
  <tr>
   <td>
<strong>À faire</strong>
   </td>
   <td>
<strong>À éviter</strong>
   </td>
  </tr>
  <tr>
   <td>Fournir au développeur tous les éléments nécessaires à la construction d'une solution.</td>
   <td>Guider activement le développeur vers un état final spécifique.</td>
  </tr>
  <tr>
   <td>Couvrir tous les aspects des sujets.</td>
   <td>Concentration sur une tâche spécifique.</td>
  </tr>
  <tr>
   <td>Inclure des aides visuelles, telles que des diagrammes ou des captures d'écran.</td>
   <td>Sinon, vous pouvez demander de l'aide pour les aides visuelles auprès du [groupe de travail Outreach] (https://github.com/ampproject/wg-outreach).</td>
  </tr>
  <tr>
   <td>Fournir des exemples de code et créer des liens vers d'autres guides.</td>
   <td>Fournir un lien de téléchargement vers un projet terminé ou un sujet éloigné.</td>
  </tr>
</table>

## Documentation de référence <a name="reference-documentation"></a>

La documentation de référence répertorie tous les éléments de programmation d'un composant AMP. Elle fournit des informations comportementales détaillées et est conçue pour la numérisation. La documentation de référence doit inclure des exemples de code et démontrer les cas d'utilisation.

Les documents de référence amp.dev sont disponibles sous [le catalogue de composants AMP.](../../../../documentation/components/index.html?format=websites)

[tip type="important"] La documentation de référence AMP fait partie du [répertoire AMPHTML](https://github.com/ampproject/amphtml). [/tip]

<table>
  <tr>
   <td>
<strong>À faire</strong>
   </td>
   <td>
<strong>À éviter</strong>
   </td>
  </tr>
  <tr>
   <td>Utiliser un langage clair et concis qui explique le fonctionnement du composant.</td>
   <td>Expliquer un processus ou créer un projet.</td>
  </tr>
  <tr>
   <td>Structure avec des titres, des grands titres et des sous-titres faciles à numériser.</td>
   <td>Contenu de groupe sous des noms abstraits.</td>
  </tr>
  <tr>
   <td>Fournir des extraits de code qui illustrent l'utilisation des composants.</td>
   <td>Créer des applications de démonstration complètes.</td>
  </tr>
</table>
