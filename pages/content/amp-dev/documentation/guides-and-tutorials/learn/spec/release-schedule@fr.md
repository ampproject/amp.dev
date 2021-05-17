---
'$title': Calendrier de publication AMP
$order: 10
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '- Canaux de publication'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Canaux de publication ](#release-channels)
  - [Nocturne ](#nightly)
  - [Hebdomadaire ](#weekly)
    - [Canal bêta et canal expérimental ](#experimental-and-beta-channels)
  - [Stable à long terme (lts) ](#long-term-stable-lts)
- [Comment déterminer si une version comporte votre modification ](#determining-if-your-change-is-in-a-release)
- [Rythme de publication ](#release-cadence)
  - [Calendrier détaillé ](#detailed-schedule)
  - [Gels de publication ](#release-freezes)

Une nouvelle version d'AMP est diffusée sur toutes les pages AMP chaque mardi. **Une fois qu'une modification d'AMP est fusionnée dans la branche principale du référentiel amphtml, il faudra généralement 1 à 2 semaines pour que la modification soit active pour tous les utilisateurs.**

## Canaux de publication <a name="release-channels"></a>

Le runtime et les extensions AMP sont fournies à travers divers _canaux de publication_ différents. Chaque canal a une utilité pour les développeurs et pour le projet AMP HTML en soi. Voir la section [Cadence de publication](#release-cadence) pour plus de détails sur comment et quand le code du référentiel [`ampproject/amphtml`](https://github.com/ampproject/amphtml) est intégré dans les versions publiées.

Pour déterminer si un PR a été inclus dans l'un des canaux de publication suivants, recherchez les libellés GitHub _PR Use: In Canary_ , _PR Use: In Production_ , ou _PR Use: In LTS_ (voir la section sur la [Comment déterminer si une version comporte votre modification](#determining-if-your-change-is-in-a-release) pour plus de détails).

### Nocturne <a name="nightly"></a>

Le canal de publication **nocturne** est mis à jour (comme son nom l'indique) toutes les nuits. Ce processus est automatisé et il n'y a aucune garantie qu'une version nocturne donnée soit exempte de bogues ou d'autres problèmes. Chaque nuit après minuit (heure du Pacifique), la dernière version soumise « verte » du jour est sélectionnée comme point de coupure de la publication. Une version verte indique que tous les tests automatisés ont été effectués avec succès sur cette version.

La publication nocturne fournit un mécanisme pour détecter et résoudre les problèmes rapidement et avant qu'ils n'atteignent les canaux de publication _hebdomadaires_ les plus chargés en trafic. Il sert également à réduire le nombre d'utilisateurs affectés par les nouveaux problèmes.

Il est possible d'activer le canal **nocturne** pour tester les demandes de tirage qui ont été fusionnées au cours des derniers jours. Voir la section [activer](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels) dans [DEVELOPING.md] pour plus de détails.

### Hebdomadaire <a name="weekly"></a>

Les canaux de publication _hebdomadaires_ sont considérés comme les principaux canaux de diffusion « persistants ». Chaque semaine, la version **bêta** de la semaine précédente est devient le canal de publication **stable**, et la dernière version **nocturne** de la semaine précédente se transforme en canaux de publication **expérimental** et **bêta** (voir le [calendrier détaillé](#detailed-schedule)).

Il existe deux ensembles de configurations utilisés pour créer des builds de versions: la configuration _Canary_ et la configuration de _production_. Les canaux de publication **expérimentale** et **bêta** sont construits à partir de la même version soumise. Cependant, le canal **expérimental** utilise la configuration _Canary_ tandis que le canal **bêta** utilise la configuration de _production_. La configuration _Canary_ permet des composants et des fonctionnalités expérimentaux qui peuvent être désactivés en _production_. Il est possible d'activer les canaux **expérimental** ou **bêta** via la [page des tests](https://cdn.ampproject.org/experiments.html).

Le canal de publication **stable** est créé avec la configuration de _production_ et diffusé sur la plupart du trafic AMP. Étant donné que le canal de version **bêta** est également créé à partir de la configuration de _production_, il représente la version exacte qui deviendra **stable** la semaine suivante (avec des possibilités de cherry-pick pour résoudre les problèmes de dernière minute; voir le [Contribution au code](https://github.com/ampproject/amphtml/blob/main/docs/contributing-code.md#Cherry-picks)).

#### Canal bêta et canal expérimental <a name="beta-and-experimental-channels"></a>

Les canaux _bêta_ et _expérimental_ sont des candidats à la pré-publication de la prochaine version stable d'AMP. Chaque mardi (à l'exception des semaines où il y a un [gel de publication](#release-freezes), la version **nocturne** de la semaine précédente est envoyés dans les canaux d'activation **bêta** et **expérimental** des développeurs. Après une période d'un jour au cours de laquelle nous vérifions qu'aucune fonction ou régression de performance n'a été introduite dans ces canaux, nous publions cette version le mercredi sur une petite partie du trafic. Cette même version est ensuite publiée sur le canal **stable** le mardi de la semaine suivante.

Il est possible d'activer ces canaux. Voir la section [activer](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels) dans [DEVELOPING.md] pour plus de détails.

L'activation de la _chaîne bêta_ est destinée à:

- tester et jouer avec la version du runtime AMP qui sortira bientôt
- une utilisation dans l'Assurance Qualité (QA) pour vous assurer que votre site est compatible avec la prochaine version d'AMP

Le _canal expérimental_ est destiné à:

- tester et jouer avec de nouvelles fonctionnalités qui ne sont pas encore disponibles pour tous les utilisateurs
- une utilisation dans l'Assurance qualité (QA) pour vous assurer que votre site est compatible avec les futures fonctionnalités AMP qui sont encore en cours de développement

Le _canal expérimental_ **peut être moins stable** et contenir des fonctionnalités qui ne sont pas encore disponibles pour tous les utilisateurs.

### Stable à long terme (lts) <a name="long-term-stable-lts"></a>

Le canal de version **lts** fournit une version **stable** précédente pour des intervalles d'un mois. Le deuxième lundi de chaque mois, la version **stable** actuelle est devient la version **lts**. Ce canal n'est pas recommandé pour tous les éditeurs AMP. Il est prévu pour que les éditeurs qui souhaitent effectuer un cycle d'assurance qualité sur leur site Web moins fréquemment puissent le faire en activant des pages Web spécifiques dans le canal **lts** (voir le <a href="https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md" data-md-type="link">readme **lts**</a>).

Dans le cas où le deuxième lundi du mois tombe un jour férié, la promotion sera effectuée après la fin du [gel de publication](#release-freezes).

Important: les éditeurs utilisant le canal de publication **lts** ne doivent pas utiliser les fonctionnalités nouvellement introduites. En raison du cycle plus long, la version **lts** peut accuser jusqu'à sept semaines de retard sur la `HEAD` de [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Consultez la section [Comment déterminer si une version comporte votre modification](#determining-if-your-change-is-in-a-release) pour valider si une modification sera prête avec le cycle de publication choisi.

## Comment déterminer si une version comporte votre modification <a name="determining-if-your-change-is-in-a-release"></a>

[ Les tickets GitHub _Type: publication_](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) sont utilisés pour suivre le statut des versions actuelles et passées; de la coupe initiale au testage via les canaux **expérimental**/**bêta** à l'éventuelle publication via les canaux **stable** et **lts**. Les annonces de publication se font sur le [canal AMP Slack "release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([s'inscrire sur Slack](https://bit.ly/amp-slack-signup)).

Vous pouvez déterminer les modifications apportées à une version donnée en utilisant l'une des méthodes suivantes:

- [Les tickets GitHub _Type: publication_](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) pour chaque build de version comprendront un lien vers la [page de version](https://github.com/ampproject/amphtml/releases) spécifique répertoriant les modifications contenues dans cette version.
- Les étiquettes [_PR Use: In Beta / Experimental_](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [_PR Use: In Stable_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) et [_PR Use: In LTS_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) sont ajoutées aux PR lorsqu'ils deviennent des builds _hebdomadaire_ ou **lts**. Il peut y avoir un certain décalage entre la date de création du build et la date d'ajout de l'étiquette.

## Rythme de publication <a name="release-cadence"></a>

Nous faisons très attention à notre rythme de publication.

Pour déterminer à quelle fréquence publier de nouvelles versions d'AMP, nous devons peser de nombreux facteurs, notamment:

- la stabilité pour les millions de sites/milliards de pages créés avec AMP
- les accidents de cache qui peuvent se produire lorsque nous publions une nouvelle version
- le désir de sortir rapidement de nouvelles fonctionnalités

Après avoir examiné tous ces facteurs, nous sommes arrivés à un cycle de publication de 1 à 2 semaines. Jusqu'à présent, ce cycle constitue pour nous un compromis raisonnable, mais nous continuerons d'évaluer tous ces facteurs et pourrons peut-être apporter des changements à l'avenir.

### Calendrier détaillé <a name="detailed-schedule"></a>

Nous essayons de respecter ce calendrier aussi étroitement que possible, même si certaines complications entraînent souvent des retards. Vous pouvez suivre le dernier statut de n'importe quelle publication dans les [tickets GitHub*Type: Release*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) et le [canal AMP Slack #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([s'inscrire sur Slack](https://bit.ly/amp-slack-signup)).

- Mardi @ [11h Pacifique](https://www.google.com/search?q=11am+pacific+in+current+time+zone): de nouvelles versions **expérimentales** et **bêta** sont créées à partir de la [dernière version principale qui a réussi tous nos tests](https://travis-ci.com/ampproject/amphtml/branches) et sont transmises aux utilisateurs AMP qui ont activé le [canal expérimental AMP](#amp-experimental-and-beta-channels) ou [le canal AMP bêta](#amp-experimental-and-beta-channels), respectivement.
- Mercredi: nous examinons les rapports de bogues des utilisateurs du _canal expérimental_ et du _canal bêta_ et si tout est en ordre, nous publions la version **bêta** sur 1% des pages AMP
- Jeudi-lundi: nous continuons à surveiller les taux d'erreur et les rapports de bogues pour les utilisateurs du _canal expérimental_ et du _canal bêta_ et le 1% de pages dotées des versions **expérimentale** ou **bêta**
- Mardi de la semaine suivante: la version **bêta** est entièrement transformée en version **stable** (c'est-à-dire que toutes les pages AMP utiliseront désormais cette version)

### Gels de publication <a name="release-freezes"></a>

Il y a des occasions où nous sautons une version d'AMP en production; cela est connu sous le nom de gel de publication.

Si un gel de publication d'une semaine est annoncé pour la semaine N:

- La version publiée la semaine précédente reste en version **expérimentale** ou **bêta** pendant une semaine supplémentaire, c'est-à-dire que la version coupée à la semaine N-1 n'est pas transformée en version **stable** pendant la semaine N comme ce serait normalement le cas. Elle ne devient version **stable** qu'au cours de la semaine N+1.
- _Aucune_ nouvelle version n'est créée pendant la semaine de gel (semaine N).
- Le calendrier normal reprendra à la semaine N+1, c'est-à-dire que les versions **expérimentale** ou **bêta** sont coupées à la semaine N+1 et transformées en version **stable** à la semaine N+2.
- Si la version **stable** promue pendant la semaine N-1 devait initialement être transformée en version **lts** pendant la semaine N, elle deviendra version **lts** le lundi de la semaine N+1.
- Les publications **nocturnes**continuent d'être générées et transformées, car elle sont totalement automatiques.

Un gel des publication peut se produire en raison de:

- un manque de personnes disponibles pour transformer la version AMP en version **stable** et la surveiller. Actuellement, la plupart des personnes qui exécutent des publications AMP sont basées aux États-Unis, ce sont donc généralement les semaines des principales fêtes américaines: Independence Day (4 juillet), Thanksgiving (quatrième jeudi de novembre), Noël (25 décembre) et Saint-Sylvestre/jour de l'an (31 décembre/1er janvier).
- Une situation d'urgence, telle qu'un problème de sécurité ou de confidentialité tel que déterminé par le [Comité de pilotage technique (TSC)](https://github.com/ampproject/meta-tsc) ou les personnes effectuant la publication.
- D'autres situations où la stabilité de la base de code est considérée comme particulièrement importante, tel que déterminé par le TSC.

Dans tous les cas, sauf en cas d'urgence, le gel de publication sera annoncé au moins un mois à l'avance.

Notez que sauf indication contraire, un gel de publication n'implique pas un gel du code. Le code peut encore être écrit, révisé et fusionné pendant un gel de publication.
