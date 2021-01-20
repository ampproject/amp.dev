---
"$title": "Suivi de l'engagement grâce aux analyses"
"$order": '4'
description: "Les plateformes d'analyse sont généralement intégrées aux sites Internet via des extraits de code JavaScript intégrés et des appels de fonction, qui déclenchent des événements qui sont renvoyés au système d'analyse."
---

Les plateformes d'analyse sont généralement intégrées aux sites Internet via des extraits de code JavaScript intégrés et des appels de fonction, qui déclenchent des événements qui sont renvoyés au système d'analyse. AMP fournit une syntaxe de configuration JSON flexible pour répliquer ce processus pour plusieurs partenaires d'analyse.

Voici un exemple de suivi Google Analytics traditionnel basé sur JavaScript. Nous allons réécrire cela dans le format JSON [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), mais d'abord, regardons l'approche traditionnelle :

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Ce JavaScript est assez simple. Il envoie une notification pour suivre l'événement de vue de page.

Pour répliquer cette fonctionnalité dans AMP, nous devons d'abord **inclure** la bibliothèque de composants [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dans la section `<head>` de notre document :

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Ensuite, **ajoutons** le composant [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) à la fin de la section `body` du document :

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

Tout comme pour l'exemple JavaScript en haut de cette page, cet extrait de code [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) enverra une notification à Google Analytics indiquant qu'une page a été consultée.

Pour spécifier cela, nous avons défini le `type` sur `googleanalytics`, puis dans le JSON, nous avons créé un déclencheur que nous avons appelé "page vue par défaut". Ce déclencheur s'activera lorsque la page sera visible (en raison de la balise `"on": "visible"`) et lorsqu'il se déclenchera, nous enverrons une demande d'analyse `pageview` à Google Analytics avec les valeurs `vars` que nous avons spécifiées.

Le JSON utilisé pour configurer [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) est un format très flexible pour décrire quelles données analytiques envoyer et quand les envoyer. L'[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) a des détails complets sur le format.

En nous basant sur l'exemple ci-dessus, nous pouvons **ajouter** un autre déclencheur nommé `"click on #header trigger"` :

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

Comme vous pouvez le deviner d'après le nom de ce nouveau déclencheur, il se déclenchera lorsque l'on cliquera sur l'élément ayant l'ID `"header"` (spécifié par `"on": "click"` et `"selector": "#header"`). Lorsque ce déclencheur est activé, nous envoyons la demande `event` à notre fournisseur d'analyse, en spécifiant quelques variables à inclure dans la demande.

Si vous disposez d'une plateforme de suivi personnalisée que vous souhaitez intégrer, vous pouvez toujours utiliser [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) et définir vos propres points de terminaison d'URL personnalisés auxquels des données de suivi seront envoyées. Pour en savoir plus, consultez la documentation de référence du composant [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **REMARQUE -** `“UA-YYYY-Y”` est un exemple de compte Google Analytics. Il doit être remplacé par le code de suivi Google Analytics de votre propre site Web si vous utilisez cet exemple sur votre site. [/tip]

[tip type="tip"] **CONSEIL -** Si vous êtes intéressé(e) par un système de suivi plus simple, vous pourriez peut-être jeter un œil à [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Si vous avez seulement besoin de suivre les pages vues, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) est une solution plus légère qu'[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) car elle vise uniquement à répondre aux exigences du suivi des pixels traditionnel. Pour en savoir plus, consultez [Analytics : le guide des bases](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
