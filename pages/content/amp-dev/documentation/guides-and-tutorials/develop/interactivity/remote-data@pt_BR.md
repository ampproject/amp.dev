---
$title: Como trabalhar com dados remotos
---

E se os dados vinculáveis forem muito grandes ou complexos de recuperar no carregamento de página? E se levar muito tempo para pesquisar o preço de cada SKU? Não vale a pena pesquisar preços de SKUs para itens não visualizados.

[tip type="success"]

[`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state) oferece suporte à busca de dados remotos por meio do atributo [`src`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#attributes)

Também é possível vincular o atributo `src` do elemento [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state). Assim, uma ação do usuário poderá acionar uma busca dos dados remotos JSON no estado vinculável da página.

[/tip]

## Buscar os tamanhos disponíveis de uma camiseta

Vamos fazer uso da capacidade de busca de dados remotos para pesquisar os preços dos SKUs no exemplo. O servidor de desenvolvimento Express.js em `app.js` já tem um ponto de extremidade `/shirts/sizesAndPrices?shirt=<sku>` que, ao receber o SKU de uma camiseta, retorna os tamanhos disponíveis e o preço de cada tamanho. A resposta é enviada com um atraso artificial de um segundo, para simular a latência da rede.

|  Solicitação                              |  Resposta |
|---------------------------------------|-----------|
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

Assim como os dados JSON nos elementos [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state), os dados remotos retornados por essas buscas são mesclados e disponibilizados no atributo `id` do elemento. Por exemplo, os dados retornados do exemplo de resposta acima podem ser acessados em uma expressão:

|  Expressão                  |  Resultado |
|------------------------------|---------|
| `shirts['1001'].sizes['XS']` | `8.99`  |

### Vincular os dados

Agora, aplique isso ao exemplo de comércio eletrônico. Primeiro, busque os dados da camiseta quando um novo SKU for selecionado. Adicione um vínculo `[src]` ao elemento `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Indicar os tamanhos indisponíveis

Em seguida, marque claramente os tamanhos indisponíveis de um determinado SKU. A classe CSS `"unavailable"` adicionará uma linha diagonal por meio de um elemento. É possível incluí-la nos elementos de `[`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}) name="size"]`, correspondentes aos tamanhos indisponíveis:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Agora, atualize a página e faça um teste. Selecionar um novo SKU (cor da camiseta) fará com que os tamanhos indisponíveis sejam riscados (após um pequeno atraso).

### Especificar os estados iniciais

No entanto, há um pequeno problema: e a camiseta preta, a cor padrão selecionada?  Será necessário adicionar os dados de tamanho e preço da camiseta preta a `amp-state#shirts`, porque [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) é executado somente em resposta à ação explícita do usuário:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Também será necessário atualizar o estado padrão dos elementos relevantes:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Observação: [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) não é executado no carregamento de página, mas somente em resposta a uma ação explícita do usuário. Isso garante que o carregamento de página inicial sempre seja rápido em todas as páginas, independentemente do uso de [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

## Preços variáveis da camiseta

Agora que os tamanhos disponíveis são exibidos corretamente, você precisa garantir que o preço correto também seja exibido.

A loja AMPPAREL é peculiar, porque o preço da camiseta é específico em relação à cor E ao tamanho. Isso significa que uma nova variável é necessária para rastrear o tamanho selecionado pelo usuário. Adicione uma nova ação ao tamanho do elemento [`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

O valor de `selectedSize` não é inicializado por meio do elemento `amp-state#selected`. Isso ocorre porque o tamanho padrão selecionado não é fornecido. Fazemos isso intencionalmente para que o usuário seja obrigado a escolher um tamanho.

Dica: `AMP.setState()` pode ser usado para definir novas variáveis, além de modificar as existentes. As expressões avaliarão as variáveis indefinidas como `null`.

Adicione um novo elemento `<span>` que contenha a etiqueta de preço e altere o texto padrão para "---", já que não há seleção de tamanho padrão.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Agora os preços estão corretos. Faça um teste.

## Botão ativado condicionalmente

Estamos quase terminando. Desative o botão "Adicionar ao carrinho" quando o tamanho selecionado estiver indisponível:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Faça um teste**: se você selecionar um tamanho indisponível, não será possível adicioná-lo ao carrinho.
