---
'$title': Desativar atraso de toque
$order: 50
tags:
  - fid
---

Para desativar o atraso de toque, defina a largura da viewport para corresponder à largura do dispositivo, o que pode aumentar o FID. Para remover esse atraso de toque de 300-350 ms, altere a declaração da viewport no `<head>` da sua página para:

```
<meta name="viewport" content="width=device-width">
```

Isto define a largura da viewport para que seja igual à do dispositivo. Isto geralmente é uma prática recomendada para sites otimizados para celular. Você pode [ler mais sobre como desativar o atraso de toque em web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away) .
