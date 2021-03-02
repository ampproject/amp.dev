---
'$title': Crie o anúncio de imagem
$order: 1
description: 'Nosso anúncio é uma imagem simples com um link para o site anunciado. Mostraremos a imagem usando a tag amp-img. Eis o código:'
---

Dentro do `<body>` do documento do seu anúncio AMPHTML, você pode incluir tags HTML e AMP; no entanto, nem todas as tags são permitidas. Consulte a [especificação de anúncios AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) para uma lista de tags permitidos.

Nosso anúncio é uma imagem simples com um link para o site anunciado. Mostraremos a imagem usando a tag [`amp-img`](../../../../documentation/components/reference/amp-img.md). Eis o código:

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
</body>
```

Se você abrir o arquivo html no navegador, deverá ver a seguinte imagem:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Se clicar no anúncio gráfico, você será direcionado ao site anunciado (o site do projeto AMP).
