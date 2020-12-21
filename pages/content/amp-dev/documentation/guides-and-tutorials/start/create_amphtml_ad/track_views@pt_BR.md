---
"$title": Restreie visualizações dos anúncios
"$order": '2'
description: Dentro de anúncios AMPHTML, você pode fazer rastreamento de métricas usando os componentes amp-pixel ou amp-analytics components. No nosso exemplo básico, adicionaremos a capacidade de rastrear pageviews  ...
---

Dentro de anúncios AMPHTML, você pode fazer rastreamento de métricas usando os componentes [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) ou [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) components. No nosso exemplo básico, adicionaremos a capacidade de rastrear pageviews com o componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e apontar para uma URL que registra os pageviews (neste caso, uma URL fictícia):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

É isso, você criou o seu anúncio AMPHTML!

Antes de subir seu anúncio ao servidor de anúncios, há uma última etapa que você deve realizar: garantir que sua sintaxe esteja válida.
