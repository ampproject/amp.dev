---
'$title': Suivre les vues des annonces
$order: 2
description: "Dans les annonces AMPHTML, vous pouvez suivre les métriques à l'aide des composants amp-pixel ou amp-analytics. Dans notre exemple basique, nous ajouterons la possibilité de suivre les visites de pages ..."
---

Dans les annonces AMPHTML, vous pouvez suivre les métriques à l'aide des composants [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) ou [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Dans notre exemple basique, nous ajouterons la possibilité de suivre les visites de pages à l'aide du composant [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) et de pointer vers une URL qui enregistre les visites de pages (dans ce cas, une URL fictive):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

Voilà, vous avez créé votre annonce AMPHTML!

Avant de télécharger votre annonce sur votre serveur publicitaire, vous devez effectuer une dernière étape: vous assurer que votre syntaxe est valide.
