---
'$title': Monitoraggio della visualizzazione di annunci
$order: 2
description: "All'interno degli annunci AMPHTML è possibile raccogliere dati metrici, utilizzando i componenti amp-pixel o amp-analytics. Aggiungeremo al nostro esempio di base la possibilità di monitorare le visualizzazioni di pagina ..."
---

All'interno degli annunci AMPHTML è possibile raccogliere dati metrici, utilizzando i componenti [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) o [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Aggiungeremo al nostro esempio di base la possibilità di monitorare le visualizzazioni di pagina usando il componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e di inserire il collegamento a un URL che registra le visualizzazioni (in questo caso, un URL fittizio):

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

Ecco fatto, hai creato il tuo annuncio AMPHTML!

Prima di caricare l'annuncio sul server, c'è un ultimo passaggio da compiere: assicurarsi che la sintassi sia valida.
