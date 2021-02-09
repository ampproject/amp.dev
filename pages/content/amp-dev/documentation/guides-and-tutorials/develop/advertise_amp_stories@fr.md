---
'$title': Annonces dans les stories Web
$order: 3
description: "Les stories Web s'affichent en plein écran et plongent les lecteurs dans le contenu. La diffusion de stories publicitaires permet une intégration fluide et sans interruption ..."
formats:
  - stories
author: CrystalOnScript
---

Les stories Web s'affichent en plein écran et plongent les lecteurs dans le contenu. La diffusion de stories publicitaires AMP permet une intégration fluide et sans interruption dans le parcours utilisateur, tout en assurant l'engagement et l'attraction de ce dernier vis-à-vis de la plateforme.

## Placement des annonces

Les stories Web utilisent un seul composant [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) pour déterminer la quantité et le placement des annonces.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) est un wrapper placé autour du composant [`amp-ad`](../../../documentation/components/reference/amp-ad.md). Il insère de façon dynamique une ou plusieurs annonces pendant que l'utilisateur consomme le contenu de la story. Pour garantir la meilleure expérience utilisateur:

1. Les annonces sont pré-affichées par le runtime Web Stories, avant d'être insérées. Cela garantit que les utilisateurs ne verront jamais une annonce vierge ou non chargée.

2. La densité des annonces est optimisée avec le rapport de contenu pour éviter la sursaturation. Le composant [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) décide quand et où insérer des annonces à mesure que l'utilisateur progresse.

Une story Web place la première annonce après les deux premières pages dans le but d'optimiser les revenus de monétisation et l'expérience utilisateur.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **NOTE –** Une story Web plus longue offre plus d'opportunités de placement publicitaire. Le placement exact de l'algorithme publicitaire continuera à être optimisé au fil du temps. [/tip]

## Interaction utilisateur

Les utilisateurs peuvent passer les annonces de la même manière que sur les pages de story normales: en touchant les deux tiers droits de l'écran.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Users can progress past ads by tapping the right two thirds of the screen.', align='' ) }}

Les utilisateurs interagissent directement avec l'annonce en appuyant sur le bouton [d'appel à l'action](story_ads_best_practices.md#call-to-action-button-text-enum) affiché par le système qui apparaît dans le tiers inférieur de toutes les annonces stories publicitaires Web. Le bouton peut être configuré pour envoyer l'utilisateur vers une URL arbitraire (ou vers l'App Store concerné).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Users are redirected to an ad landing destination, but can return to the story.', align='' ) }}

## Configurer une story Web pour les annonces

Les stories Web ne peuvent pas prendre en charge un attribut [`amp-ad`](../../../documentation/components/reference/amp-ad.md) directement sur la page. Au lieu de cela, toutes les annonces sont récupérées et affichées par l'extension [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). Le composant [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) doit être placé en tant qu'élément enfant direct de [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

Contrairement à une annonce [`amp-ad`](../../../documentation/components/reference/amp-ad.md) normale, aucun `<fallback>` ou `<placeholder>` n'est requis, car les stories publicitaires Web ne sont affichées qu'une fois qu'elles sont entièrement générées.

## Premiers pas avec les stories publicitaires

Le moyen le plus simple d'inclure des annonces dans votre story Web Story consiste à diffuser des annonces à partir d'un serveur publicitaire compatible.

Les serveurs publicitaires qui prennent actuellement en charge les annonces Web Story sont:

- Google Ad Manager <a name="google-ad-manager"></a>
  - [Annonces à vente directe](https://support.google.com/admanager/answer/9038178)
  - [Annonces programmatiques](https://support.google.com/admanager/answer/9416436)
- Google AdSense bientôt disponible
- Possibilité d'intégrer d'autres plateformes (contactez-nous pour plus de [détails via Github](https://github.com/ampproject/amphtml/issues/30769))

Si vous êtes un annonceur et souhaitez diffuser vos annonces dans les stories Web, veuillez nous [contacter](mailto:story-ads-wg@google.com) pour plus d'informations.

Les éditeurs peuvent également placer des annonces personnalisées s'ils configurent leur propre serveur publicitaire. [Vous trouverez ici une procédure détaillée à cet effet](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Consultez la section [Trafic des créations personnalisées dans les stories Web](https://support.google.com/admanager/answer/9038178) pour plus d'informations sur l'importation d'annonces dans Google Ad Manager et consultez notre guide sur les [bonnes pratiques pour créer une story publicitaire AMP](story_ads_best_practices.md). [/tip]
