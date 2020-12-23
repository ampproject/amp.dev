---
"$title": "Créer l'annonce illustrée"
"$order": '1'
description: 'Notre annonce est une simple image avec un lien hypertexte vers le site en question. Nous afficherons l''image à l''aide de la balise amp-img. Voici le code: ...'
---

Dans la section `<body>` de votre document d'annonce AMPHTML, vous pouvez inclure des balises HTML et AMP; cependant, toutes les balises ne sont pas autorisées. Reportez-vous aux [spécifications d'annonce AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) pour obtenir la liste des balises autorisées.

Notre annonce est une simple image avec un lien hypertexte vers le site en question. Nous afficherons l'image à l'aide de la balise [`amp-img`](../../../../documentation/components/reference/amp-img.md). Voici le code:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Si vous ouvrez votre fichier html dans votre navigateur, vous devriez voir l'image suivante:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Si vous cliquez sur l'annonce illustrée, vous accédez au site en question (c'est-à-dire au site du Projet AMP).
