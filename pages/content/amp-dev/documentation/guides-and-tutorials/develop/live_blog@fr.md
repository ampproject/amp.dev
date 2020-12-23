---
"$title": Créer un blog en direct
"$order": '102'
description: "Les blogs en direct sont des pages Web qui sont fréquemment mises à jour tout au long d'un événement en cours, tel qu'un événement sportif ou une élection. Dans AMP, vous pouvez implémenter un blog en direct en utilisant ..."
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

Les blogs en direct sont des pages Web qui sont fréquemment mises à jour tout au long d'un événement en cours, tel qu'un événement sportif ou une élection. Dans AMP, vous pouvez implémenter un blog en direct en utilisant le composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Ce tutoriel fournit un bref aperçu du composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) et se concentre sur certains détails d'implémentation pour les blogs en direct, tels que la [pagination](#pagination) et [les liens profonds](#deeplinking). Nous utiliserons l'exemple de [blog en direct](live_blog.md) AMP By Example pour illustrer l'implémentation de blogs en direct dans AMP.

[tip type="tip"] **CONSEIL–** Utilisez le langage de métadonnées [LiveBlogPosting](http://schema.org/LiveBlogPosting) afin de pouvoir intégrer des fonctionnalités de plateformes tierces à votre blog. [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Présentation de `amp-live-list`

Le composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) interroge régulièrement le document hôte pour trouver du nouveau contenu et met à jour le navigateur de l'utilisateur à mesure que de nouveaux éléments deviennent disponibles. Ainsi, chaque fois qu'un nouveau billet de blog doit être ajouté, le document hôte doit être mis à jour par le CMS pour inclure la mise à jour à la fois dans le corps et dans la section [métadonnées](../../../documentation/examples/documentation/Live_Blog.html#metadata) de la page.

Voici à quoi pourrait ressembler le code initial du blog:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Examinons ce code:

Chaque composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) nécessite un identifiant unique car il peut y en avoir plusieurs sur une page. Dans cet exemple, nous avons spécifié `my-live-list` comme identifiant unique.

L'attribut `data-poll-interval` spécifie la fréquence à laquelle les interrogations doivent avoir lieu; si le document hôte est mis à jour, la mise à jour doit être disponible pour l'utilisateur après le prochain intervalle de temps.

Chaque fois qu'un nouvel élément est ajouté au document hôte, l'élément `<button update on="tap:my-live-list.update">` affiche un bouton « Vous avez des mises à jour » qui, lorsque vous cliquez dessus, déclenche l'affichage des dernières publications sur la page.

Les blogs en direct peuvent se développer et rendre la page trop longue. Vous pouvez utiliser l'attribut `data-max-items-per-page` pour spécifier le nombre d'éléments pouvant être ajoutés au blog en direct. Si le nombre d'éléments ajoutés après une mise à jour dépasse `data-max-items-per-page`, les mises à jour les plus anciennes dépassant ce nombre sont supprimées. Par exemple, si la page contient actuellement 9 éléments et que `data-max-items-per-page` est défini sur 10, et que 3 nouveaux éléments arrivent dans la dernière mise à jour, les deux éléments les plus anciens sont supprimés de la page lors de la dernière mise à jour.

Tous les articles de blog dans [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) doivent être des éléments enfants de `<div items></div>`. En faisant référence à chaque publication comme un élément, chaque élément doit avoir un `id` unique et un `data-sort-time`.

## Détails d'implémentation

Maintenant que vous êtes familiarisé avec le composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), voyons comment implémenter un blog en direct plus complexe. Lisez la suite pour en savoir plus sur l'implémentation de la pagination et le fonctionnement des liens profonds.

### Pagination <a name="pagination"></a>

Les blogs longs peuvent utiliser la pagination pour améliorer les performances en limitant le nombre d'éléments de blog à afficher sur une page. Pour implémenter la pagination, dans le composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), ajoutez l'attribut `<div pagination></div>`, puis insérez le balisage dont vous avez besoin pour la pagination (par exemple, un numéro de page ou un lien vers la page suivante et précédente).

Avec la pagination, le code simple que nous avons utilisé précédemment devient:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Il est de votre responsabilité de remplir correctement les éléments de navigation en mettant à jour la page hébergée. Par exemple, dans [l'exemple de blog en direct](live_blog.md), nous affichons la page via un modèle côté serveur et nous utilisons un paramètre de requête pour spécifier quel doit être le premier élément de blog de la page. Nous limitons la taille de la page à 5 éléments, de sorte que si le serveur a généré plus de 5 éléments, un utilisateur se rendant sur la page principale verra l'élément « Suivant » dans la zone de navigation. Voir [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) pour plus de détails.

Une fois que la taille des articles de blog a dépassé le nombre maximal d'éléments spécifié par `data-max-items-per-page`, les anciens éléments de blog sont affichés dans les pages « Suivant », par exemple à la page 2. Étant donné que le composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) interroge le serveur à intervalles pour voir s'il y a un changement dans les éléments, il n'est pas nécessaire d'interroger le serveur si l'utilisateur n'est pas sur la première page.

Vous pouvez ajouter l'attribut désactivé à la page hébergée pour empêcher le mécanisme d'interrogation. Dans l'exemple de blog en direct, nous exécutons ce comportement dans un modèle côté serveur; lorsque la page demandée n'est pas la première, nous ajoutons l'attribut désactivé au composant [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

### Deeplinking <a name="deeplinking"></a>

Lorsque vous publiez un article de blog, il est important de pouvoir créer un lien profond vers l'article pour activer des fonctionnalités telles que le partage. Avec [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), vous pouvez créer des liens profonds en utilisant simplement l'`id` de l'élément de blog. Par exemple, [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) vous permet de naviguer directement vers l'article de blog avec l'identifiant `post3`.

AMP By Example utilise un cookie dans [l'exemple de blog en direct](live_blog.md) pour générer du nouveau contenu. Par conséquent, si vous atterrissez sur la page pour la première fois, la publication avec l'ID « post3 » peut ne pas être disponible, dans ce cas, vous êtes redirigé vers la première publication.

## Ressources

Plus de détails dans ces ressources:

- documentation de référence [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [Exemple de blog en direct AMP BY Example](live_blog.md)
