---
'$title': Adding fonts
$order: 6
description: 'Há duas formas de incorporar fontes personalizadas à página AMP: 1. Use uma tag <link> (somente para provedores de fontes da lista de permissões).'
---

Nas AMP, para carregar documentos com a maior velocidade possível, não inclua folhas de estilo externas. A única exceção a essa regra são as **fontes**.

Há duas formas de incorporar fontes personalizadas à página AMP:

1. Use uma tag `<link>` (somente para provedores de fontes da lista de permissões).
2. Use a regra CSS `@font-face`. Não há restrições, todas as fontes são permitidas.

Neste tutorial, usaremos uma tag `<link>` para incluir fontes na página. **Adicione** um link de folha de estilo no `<head>` para solicitar a fonte Raleway:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Agora **atualize** o seletor CSS `body` para incluir uma referência à Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Atualize** a página e confira a nova aparência. Além disso, inspecione a saída do validador AMP. Esta solicitação da folha de estilo externa não pode ter erros.

[tip type="note"] As fontes da Web podem ser prejudiciais ao desempenho de um site, mesmo num site AMP rápido. Use a propriedade CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) para otimizar o comportamento do carregamento de suas fontes. [/tip]

Seu artigo de notícias AMP está pronto! Ele terá esta aparência:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
