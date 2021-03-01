---
'$title': Working with remote data
$order: 3
description: E se seus dados vinculáveis forem grandes ou complexos demais para serem recuperados durante carregamento de página? E se demorar demais para pesquisar o preço ...
toc: 'true'
---

E se seus dados vinculáveis forem grandes ou complexos demais para serem recuperados durante carregamento de página? E se demorar demais para pesquisar o preço de cada SKU? É perda de tempo pesquisar preços de SKUs para itens que não foram visualizados.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) oferece suporte à busca de dados remotos por meio do atributo [`src`](../../../../documentation/components/reference/amp-bind.md#attributes) que recupera JSON de um endpoint CORS. Essa busca é realizada uma vez durante a carga da página e é útil para garantir que os dados estejam atuais (principalmente quando servidos a partir de um cache).

Também é possível vincular o atributo `src` para o elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Assim, uma ação do usuário poderá disparar uma busca dos dados remotos JSON para atualizar o estado vinculável da página.

[/tip]

## Buscando os tamanhos disponíveis de uma camiseta

Vamos experimentar com a capacidade de busca de dados remotos para pesquisar os preços dos SKUs no nosso exemplo. O servidor de desenvolvimento Express.js em `app.js` já tem um endpoint `/shirts/sizesAndPrices?shirt=<sku>` que, ao receber o SKU de uma camiseta, retorna os tamanhos disponíveis e o preço para cada tamanho. A resposta é enviada com um atraso artificial de um segundo, para simular a latência da rede.

| Solicitação                           | Resposta                                     |
| ------------------------------------- | -------------------------------------------- |
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

Assim como os dados JSON nos elementos [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), os dados remotos retornados por essas buscas são combinados e disponibilizados no atributo `id` do elemento. Por exemplo, os dados retornados do exemplo de resposta acima podem ser acessados em uma expressão:

| Expressão                    | Resultado |
| ---------------------------- | --------- |
| `shirts['1001'].sizes['XS']` | `8.99`    |

### Vincular os dados

Agora, aplique isto ao nosso exemplo de comércio eletrônico. Primeiro, busque os dados da camiseta quando um novo SKU for selecionado. Adicione um mapeamento `[src]` ao elemento `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state
  id="shirts"
  [src]="'/shirts/sizesAndPrices?sku=' + selected.sku"
></amp-state>
```

### Indicar os tamanhos indisponíveis

Em seguida, marque claramente os tamanhos indisponíveis de um determinado SKU. A classe CSS `"unavailable"` irá adicionar uma linha diagonal sobre um elemento. É possível incluí-la nos elementos de [`amp-selector`](../../../../documentation/components/reference/amp-selector.md), correspondentes aos tamanhos indisponíveis:

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

Agora, atualize a página e faça um teste. A seleção de um novo SKU (cor da camiseta) fará com que os tamanhos indisponíveis sejam riscados (depois de um pequeno atraso).

### Especificar os estados iniciais

No entanto, há um pequeno problema: e quanto à camiseta preta, a cor padrão selecionada? Será necessário adicionar os dados de tamanho e preço da camiseta preta a `amp-state#shirts`, porque [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) só executa em resposta à ação explícita do usuário:

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

Também será necessário atualizar o estado default dos elementos relevantes:

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
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'"
      >
        <div option="M">M</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'"
      >
        <div option="L">L</div>
      </td>
      <td
        class="unavailable"
        [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'"
      >
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] <strong>OBSERVAÇÃO –</strong> [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) não é executado no carregamento de página, mas somente em resposta a uma ação explícita do usuário. Isso garante que o carregamento de página inicial sempre seja rápido em todas as páginas, independentemente do uso de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).[/tip]

## Preços de camiseta variáveis

Agora que os tamanhos disponíveis são exibidos corretamente, você precisa garantir que o preço correto também seja exibido.

A loja AMPPAREL é peculiar, porque o preço da camiseta é específico em relação à cor E TAMBÉM em relação ao tamanho. Isto significa que uma nova variável será necessária para rastrear o tamanho selecionado pelo usuário. Adicione uma nova ação ao nosso elemento [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) de tamanho:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector
  name="size"
  on="select:AMP.setState({selectedSize: event.targetOption})"
></amp-selector>
```

O valor de `selectedSize` não está sendo inicializado por meio do elemento `amp-state#selected`. Isso ocorre porque nós intencionalmente decidimos não fornecer um tamanho default selecionado para que o usuário seja obrigado a escolher um tamanho.

[tip type="tip"] <strong>DICA –</strong> <br> `AMP.setState()` pode ser usado para definir novas variáveis, além de modificar as existentes. As expressões irão tratar as variáveis indefinidas como `null`.[/tip]

Adicione um novo elemento `<span>` que contenha a etiqueta de preço e altere o texto padrão para "---", já que não há seleção de tamanho padrão.

```html
<h6>
  PRICE :
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
<input
  type="submit"
  value="ADD TO CART"
  disabled
  class="mdl-button mdl-button--raised mdl-button--accent"
  [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]"
/>
```

**Faça um teste**: se você selecionar um tamanho indisponível, não será possível adicioná-lo ao carrinho.
