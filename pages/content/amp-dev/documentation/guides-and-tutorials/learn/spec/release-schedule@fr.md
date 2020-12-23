---
"$title": Calendrier de publication AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Canaux de publication"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

A new release of AMP is pushed to all AMP pages every week on Tuesday. **Once a change in AMP is merged into the master branch of the amphtml repository, it will typically take 1-2 weeks for the change to be live for all users.**

## Canaux de publication <a name="release-channels"></a>

Le runtime et les extensions AMP sont fournies à travers divers *canaux de publication* différents. Chaque canal a une utilité pour les développeurs et pour le projet AMP HTML en soi. Voir la section [Cadence de publication](#release-cadence) pour plus de détails sur comment et quand le code du référentiel [`ampproject/amphtml`](https://github.com/ampproject/amphtml) est intégré dans les versions publiées.

Pour déterminer si un PR a été inclus dans l'un des canaux de publication suivants, recherchez les libellés GitHub *PR Use: In Canary* , *PR Use: In Production* , ou *PR Use: In LTS* (voir la section sur la [Comment déterminer si une version comporte votre modification](#determining-if-your-change-is-in-a-release) pour plus de détails).

### Nocturne <a name="nightly"></a>

Le canal de publication **nocturne** est mis à jour (comme son nom l'indique) toutes les nuits. Ce processus est automatisé et il n'y a aucune garantie qu'une version nocturne donnée soit exempte de bogues ou d'autres problèmes. Chaque nuit après minuit (heure du Pacifique), la dernière version soumise « verte » du jour est sélectionnée comme point de coupure de la publication. Une version verte indique que tous les tests automatisés ont été effectués avec succès sur cette version.

La publication nocturne fournit un mécanisme pour détecter et résoudre les problèmes rapidement et avant qu'ils n'atteignent les canaux de publication *hebdomadaires* les plus chargés en trafic. Il sert également à réduire le nombre d'utilisateurs affectés par les nouveaux problèmes.

Il est possible d'activer le canal **nocturne** pour tester les demandes de tirage qui ont été fusionnées au cours des derniers jours. Voir la section [activer](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) dans [DEVELOPING.md] pour plus de détails.

### Hebdomadaire <a name="weekly"></a>

Les canaux de publication *hebdomadaires* sont considérés comme les principaux canaux de diffusion « persistants ». Chaque semaine, la version **bêta** de la semaine précédente est devient le canal de publication **stable**, et la dernière version **nocturne** de la semaine précédente se transforme en canaux de publication **expérimental** et **bêta** (voir le [calendrier détaillé](#detailed-schedule)).

Il existe deux ensembles de configurations utilisés pour créer des builds de versions: la configuration *Canary* et la configuration de *production*. Les canaux de publication **expérimentale** et **bêta** sont construits à partir de la même version soumise. Cependant, le canal **expérimental** utilise la configuration *Canary* tandis que le canal **bêta** utilise la configuration de *production*. La configuration *Canary* permet des composants et des fonctionnalités expérimentaux qui peuvent être désactivés en *production*. Il est possible d'activer les canaux **expérimental** ou **bêta** via la [page des tests](https://cdn.ampproject.org/experiments.html).

Le canal de publication **stable** est créé avec la configuration de *production* et diffusé sur la plupart du trafic AMP. Étant donné que le canal de version **bêta** est également créé à partir de la configuration de *production*, il représente la version exacte qui deviendra **stable** la semaine suivante (avec des possibilités de cherry-pick pour résoudre les problèmes de dernière minute; voir le [Contribution au code](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Canal bêta et canal expérimental <a name="beta-and-experimental-channels"></a>

Les canaux *bêta* et *expérimental* sont des candidats à la pré-publication de la prochaine version stable d'AMP. Chaque mardi (à l'exception des semaines où il y a un [gel de publication](#release-freezes), la version **nocturne** de la semaine précédente est envoyés dans les canaux d'activation **bêta** et **expérimental** des développeurs. Après une période d'un jour au cours de laquelle nous vérifions qu'aucune fonction ou régression de performance n'a été introduite dans ces canaux, nous publions cette version le mercredi sur une petite partie du trafic. Cette même version est ensuite publiée sur le canal **stable** le mardi de la semaine suivante.

Il est possible d'activer ces canaux. Voir la section [activer](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) dans [DEVELOPING.md] pour plus de détails.

L'activation de la *chaîne bêta* est destinée à:

- tester et jouer avec la version du runtime AMP qui sortira bientôt
- une utilisation dans l'Assurance Qualité (QA) pour vous assurer que votre site est compatible avec la prochaine version d'AMP

Le *canal expérimental* est destiné à:

- tester et jouer avec de nouvelles fonctionnalités qui ne sont pas encore disponibles pour tous les utilisateurs
- une utilisation dans l'Assurance qualité (QA) pour vous assurer que votre site est compatible avec les futures fonctionnalités AMP qui sont encore en cours de développement

Le *canal expérimental* **peut être moins stable** et contenir des fonctionnalités qui ne sont pas encore disponibles pour tous les utilisateurs.

### Stable à long terme (lts) <a name="long-term-stable-lts"></a>

Le canal de version **lts** fournit une version **stable** précédente pour des intervalles d'un mois. Le deuxième lundi de chaque mois, la version **stable** actuelle est devient la version **lts**. Ce canal n'est pas recommandé pour tous les éditeurs AMP. Il est prévu pour que les éditeurs qui souhaitent effectuer un cycle d'assurance qualité sur leur site Web moins fréquemment puissent le faire en activant des pages Web spécifiques dans le canal **lts** (voir le <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">readme **lts**</a>).

If the second Monday of the month falls on a holiday, the promotion will be performed after the end of the [release freeze](#release-freezes).

Important: les éditeurs utilisant le canal de publication **lts** ne doivent pas utiliser les fonctionnalités nouvellement introduites. En raison du cycle plus long, la version **lts** peut accuser jusqu'à sept semaines de retard sur la `HEAD` de [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Consultez la section [Comment déterminer si une version comporte votre modification](#determining-if-your-change-is-in-a-release) pour valider si une modification sera prête avec le cycle de publication choisi.

## Comment déterminer si une version comporte votre modification <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) are used to track the status of current and past releases; from the initial cut, to testing via **experimental**/**beta** channels, to eventual release via the **stable** and **lts** channels. Announcements about releases are made on the [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([sign up for Slack](https://bit.ly/amp-slack-signup)).

Vous pouvez déterminer les modifications apportées à une version donnée en utilisant l'une des méthodes suivantes:

- [Les tickets GitHub *Type: publication*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) pour chaque build de version comprendront un lien vers la [page de version](https://github.com/ampproject/amphtml/releases) spécifique répertoriant les modifications contenues dans cette version.
- Les étiquettes [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) et [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) sont ajoutées aux PR lorsqu'ils deviennent des builds *hebdomadaire* ou **lts**. Il peut y avoir un certain décalage entre la date de création du build et la date d'ajout de l'étiquette.

## Rythme de publication <a name="release-cadence"></a>

Nous faisons très attention à notre rythme de publication.

Pour déterminer à quelle fréquence publier de nouvelles versions d'AMP, nous devons peser de nombreux facteurs, notamment:

- la stabilité pour les millions de sites/milliards de pages créés avec AMP
- cache-busting that might happen when we push a new version
- le désir de sortir rapidement de nouvelles fonctionnalités

Après avoir examiné tous ces facteurs, nous sommes arrivés à un cycle de publication de 1 à 2 semaines. Jusqu'à présent, ce cycle constitue pour nous un compromis raisonnable, mais nous continuerons d'évaluer tous ces facteurs et pourrons peut-être apporter des changements à l'avenir.

### Calendrier détaillé <a name="detailed-schedule"></a>

Nous essayons de respecter ce calendrier aussi étroitement que possible, même si certaines complications entraînent souvent des retards. Vous pouvez suivre le dernier statut de n'importe quelle publication dans les [tickets GitHub*Type: Release*](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) et le [canal AMP Slack #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([s'inscrire sur Slack](https://bit.ly/amp-slack-signup)).

- Tuesday @ [11am Pacific](https://www.google.com/search?q=11am+pacific+in+current+time+zone): new **experimental** and **beta** release builds are created from the [latest master build that passes all of our tests](https://travis-ci.com/ampproject/amphtml/branches) and are pushed to users who opted into the [AMP Experimental Channel](#amp-experimental-and-beta-channels) or [AMP Beta Channel](#amp-experimental-and-beta-channels), respectively.
- Mercredi: nous examinons les rapports de bogues des utilisateurs du *canal expérimental* et du *canal bêta* et si tout est en ordre, nous publions la version **bêta** sur 1% des pages AMP
- Jeudi-lundi: nous continuons à surveiller les taux d'erreur et les rapports de bogues pour les utilisateurs du *canal expérimental* et du *canal bêta* et le 1% de pages dotées des versions **expérimentale** ou **bêta**
- Mardi de la semaine suivante: la version **bêta** est entièrement transformée en version  **stable** (c'est-à-dire que toutes les pages AMP utiliseront désormais cette version)

### Gels de publication <a name="release-freezes"></a>

Il y a des occasions où nous sautons une version d'AMP en production; cela est connu sous le nom de gel de publication.

Si un gel de publication d'une semaine est annoncé pour la semaine N:

- La version publiée la semaine précédente reste en version **expérimentale** ou **bêta** pendant une semaine supplémentaire, c'est-à-dire que la version coupée à la semaine N-1 n'est pas transformée en version **stable** pendant la semaine N comme ce serait normalement le cas. Elle ne devient version **stable** qu'au cours de la semaine N+1.
- *Aucune* nouvelle version n'est créée pendant la semaine de gel (semaine N).
- Le calendrier  normal reprendra à la semaine N+1, c'est-à-dire que les versions **expérimentale** ou **bêta** sont coupées à la semaine N+1 et transformées en version **stable** à la semaine N+2.
- Si la version **stable** promue pendant la semaine N-1 devait initialement être transformée en version **lts** pendant la semaine N, elle deviendra version **lts** le lundi de la semaine N+1.
- Les publications **nocturnes**continuent d'être générées et transformées, car elle sont totalement automatiques.

Un gel des publication peut se produire en raison de:

- Times when there are not enough people available to push the AMP release to **stable** and monitor it. Currently, most of the people performing AMP releases are based in the United States, so this will usually be the weeks of the major US holidays of Independence Day (July 4), Thanksgiving (fourth Thursday in November), Christmas (25 December), and New Year's Eve/Day (December 31/January 1).
- Une situation d'urgence, telle qu'un problème de sécurité ou de confidentialité tel que déterminé par le [Comité de pilotage technique (TSC)](https://github.com/ampproject/meta-tsc) ou les personnes effectuant la publication.
- Other situations when the stability of the codebase is deemed to be particularly important as determined by the TSC.

In all cases, except emergencies, the release freezes will be announced at least one month in advance.

Notez que sauf indication contraire, un gel de publication n'implique pas un gel du code. Le code peut encore être écrit, révisé et fusionné pendant un gel de publication.
