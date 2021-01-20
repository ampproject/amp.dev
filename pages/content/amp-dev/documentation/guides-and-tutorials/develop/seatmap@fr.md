---
"$title": Créer un plan de siège
"$order": '104'
description: Les plans de siège sont des éléments importants des applications Web de distributeurs de billets, mais la mise en œuvre dans AMP peut être difficile. Lisez la suite pour savoir comment implémenter un plan de siège dans AMP en
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Les plans de siège sont des éléments importants des applications Web des distributeurs de billets, mais la mise en œuvre dans AMP peut être difficile. Lisez la suite pour savoir comment implémenter un plan de siège dans AMP en utilisant une combinaison de composants AMP disponibles.

[tip] Un exemple en direct mettant en œuvre les pratiques décrites ci-dessous est disponible [ici](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Composants AMP nécessaires

Commençons par passer en revue les composants nécessaires:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) permet d'avoir une vue agrandie et panoramique du contenu en appuyant deux fois et en pinçant le contenu. Ce composant sert de base à l'implémentation du plan de siège.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) récupère le contenu de manière dynamique à partir d'un point de terminaison CORS JSON et le diffuse à l'aide d'un modèle fourni. Il est utilisé pour récupérer la disponibilité actuelle du plan de siège, afin que les utilisateurs obtiennent toujours les dernières données.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) ajoute de l'interactivité à la page. Il est nécessaire ici pour garder une trace du nombre de sièges sélectionnés.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) représente un contrôle qui présente un menu d'options et permet à l'utilisateur de faire son choix. La carte de sièges entière peut être considérée comme un menu d'options où chaque siège est une option. Cela facilite considérablement le style à appliquer à l'état du siège sélectionné en vous permettant d'utiliser des expressions CSS. Par exemple, l'expression suivante applique une couleur orange à un siège une fois sélectionné.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Exigences

1. Pour dessiner un plan de siège sous forme de SVG où chaque siège est représenté par un élément `rect`, vous avez besoin d'informations sur chaque siège: position `x` et `y`, largeur `width` et hauteur `height` et éventuellement `rx` et `ry` pour arrondir les coins des rectangles.
2. Un identifiant unique pour chaque siège qui peut être utilisé pour effectuer la réservation.
3. Une mesure de la largeur et de la hauteur entières du plan de siège à utiliser dans l'attribut `viewbox`.

## Dessiner le plan de siège

Le plan de siège est rendu via [`amp-list`](../../../documentation/components/reference/amp-list.md) et [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Après avoir reçu les données de l'appel [`amp-list`](../../../documentation/components/reference/amp-list.md), vous pouvez utiliser ces données pour parcourir les sièges:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Style des sièges indisponibles

Dans l'exemple ci-dessus, `{% raw %}{{unavailable}}{% endraw %}` est la valeur d'un champ renvoyé par le point de terminaison JSON et utilisé pour styliser un siège indisponible. Cette approche ne vous permet pas de supprimer des attributs tels que `option="{{id}}"` au cas où un siège ne serait pas disponible, car le modèle ne peut pas envelopper l'élément `<html>` des pages entières.

Une autre approche plus détaillée consiste à répéter les balises comme suit:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Dimensionner votre plan de siège

À moins que la taille de votre plan de siège ne soit fixe, il est difficile de dimensionner le composant [`amp-list`](../../../documentation/components/reference/amp-list.md) contenant le plan de siège. [`amp-list`](../../../documentation/components/reference/amp-list.md) nécessite des dimensions fixes ou utilise `layout="fill"` (pour utiliser l'espace disponible du conteneur parent). Il existe deux façons de résoudre ce problème:

1. Calculez l'espace disponible sur la page une fois que vous connaissez l'espace utilisé par d'autres composants tels que les en-têtes et les pieds de page. Ce calcul peut être effectué en CSS en utilisant l'expression `calc` et en l'attribuant comme `min-height` d'un div parent de du composant [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Utilisez une mise en page flexible lorsque vous connaissez la hauteur de la mise en page.

## Styles pour amp-pan-zoom

Si vous utilisez l'approche décrite dans la section précédente, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) doit également utiliser `layout="fill"`.

[tip type="tip"] **CONSEIL -** Pour conserver un espace blanc autour du plan de siège tout en l'intégrant à la zone de pincement et de zoom:

- Ajoutez un div d'habillage pour le svg
- Ajoutez du remplissage

Si vous n'avez pas de div d'habillage et que vous ajoutez plutôt une marge au SVG, les marges ne feront pas partie de la zone de pincement et de zoom. [/tip]

## Traitement de l'état

Lorsque les utilisateurs cliquent sur différents sièges, il est possible de suivre les `id` des sièges sélectionnés dans une variable en utilisant `amp-state`, soit:

- En ajoutant une expression [`amp-bind`](../../../documentation/components/reference/amp-bind.md) pour chaque siège pour ajouter le siège sélectionné à une liste
- Ou en utilisant [`amp-selector`](../../../documentation/components/reference/amp-selector.md) avec l'action `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` afin que tous les sièges sélectionnés soient ajoutés à une liste

Bien que la première approche ne nécessite pas le composant supplémentaire [`amp-selector`](../../../documentation/components/reference/amp-selector.md), elle peut rendre le plan de siège très lent car chaque expression [`amp-bind`](../../../documentation/components/reference/amp-bind.md) sera évaluée à chaque sélection/désélection de siège.

La deuxième approche vous permet également de réduire la duplication de l'expression [`amp-bind`](../../../documentation/components/reference/amp-bind.md) pour chaque siège qui sera affiché par le modèle.

## Structure HTML finale

Pour référence, voici la structure HTML finale du plan de siège:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
