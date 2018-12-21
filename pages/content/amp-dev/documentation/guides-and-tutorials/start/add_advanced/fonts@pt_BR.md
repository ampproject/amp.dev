---
$title: Adicionar fontes
---

Nas AMP, para carregar documentos com a maior velocidade possível, não inclua folhas de estilo externas. A única exceção a essa regra são as **fontes**.

Há duas formas de incorporar fontes personalizadas à página AMP:

1. Use uma tag `<link>` (somente para provedores de fontes da lista de permissões).
2. Use a regra CSS `@font-face`. Não há restrições, todas as fontes são permitidas.

Neste tutorial, usaremos uma tag `<link>` para incluir fontes na página. **Adicione** um link de folha de estilo no `<head>` para solicitar a fonte Raleway:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
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

**Atualize** a página e confira a nova aparência. Além disso, inspecione a saída do validador de AMP.  Essa solicitação da folha de estilo externa não pode ter erros.

[tip type="note"]
Não são necessários componentes adicionais para incluir uma fonte no documento. Dito isso, há um componente chamado [`amp-font`](/pt_br/docs/reference/components/amp-font.html). Esse componente não é usado para carregar fontes da Web, mas para detectar se determinada fonte foi carregada ou não e tomar as providências necessárias se for o caso.

Você pode usar o amp-font para ocultar o texto até que a fonte seja totalmente carregada. Assim, o usuário não verá a transição da fonte temporária para a final. Caso ocorra uma falha no carregamento da fonte, você tem a opção de exibir a temporária. Afinal, pior seria se o usuário não conseguisse ver o texto. Para saber mais, leia a documentação de referência do [`amp-font`](/pt_br/docs/reference/components/amp-font.html).
[/tip]

Seu artigo de notícias AMP está pronto! Ele terá esta aparência:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Artigo de notícias concluído') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
