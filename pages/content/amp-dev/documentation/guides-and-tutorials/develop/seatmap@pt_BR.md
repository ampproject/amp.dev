---
"$title": Crie um mapa de assentos
"$order": '104'
description: Mapas de assentos são partes importantes de aplicativos Web para venda de ingressos, mas a implementação no AMP pode ser difícil. Continue lendo para aprender como implementar um mapa de assentos no AMP
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Mapas de assentos são partes importantes de aplicativos Web para venda de ingressos, mas a implementação no AMP pode ser difícil. Continue lendo para aprender como implementar um mapa de assentos no AMP usando uma combinação de componentes AMP disponíveis.

[tip] Um exemplo real que implementa as práticas descritas deste documento está disponível [aqui](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Componentes AMP necessários

Vamos iniciar revisando os componentes necessários:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) permite ampliar e mover o conteúdo com usando duplo-toque e pinça com dois dedos. Este componente serve de base para a implementação do mapa de assentos.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) busca conteúdo dinamicamente a partir de um endpoint JSON CORS e o renderiza usando um modelo fornecido. Usado para baixar a disponibilidade atual do mapa de assentos, para que os usuários sempre tenham os dados mais recentes.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) adiciona interatividade à página. É necessário nesse projeto para controlar quantos assentos foram selecionados.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) representa um controle que mostra um menu de opções e permite ao usuário escolher a partir dele. Todo o mapa de assentos pode ser considerado um menu de opções em que cada assento é uma opção. Isto facilita bastante a aplicação de um estilo no estado selecionado para os assentos, permitindo que se use expressões CSS. Por exemplo, a expressão a seguir preenche um assento com uma cor laranja depois que ele é selecionado.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Requisitos

1. Para desenhar um mapa de assentos como um SVG, em que cada assento é representado por um elemento `rect`, você precisa de informações sobre cada assento: posição `x` e `y`, largura (`width`) e altura (`height`) e possivelmente `rx` e `ry` para arredondar os cantos dos retângulos.
2. Um identificador exclusivo para cada assento que esteja disponível para reservas.
3. Uma medida de toda a largura e altura do mapa de assentos para usar no atributo `viewbox`.

## Desenhando o mapa de assentos

O mapa de assentos é renderizado via [`amp-list`](../../../documentation/components/reference/amp-list.md) e [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Depois de receber os dados da chamada [`amp-list`](../../../documentation/components/reference/amp-list.md), você pode usar esses dados para percorrer os assentos:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Aplicando estilos em assentos indisponíveis

No exemplo acima,  `{% raw %}{{unavailable}}{% endraw %}` é o valor de um campo retornado pelo endpoint JSON e usado para aplicar um estilo num assento indisponível. Essa solução não permite remover atributos como `option="{{id}}"` se um assento estiver indisponível, pois o modelo não consegue empacotar os elementos `<html>` das páginas inteiras.

Uma abordagem alternativa e mais detalhada é repetir as tags da seguinte maneira:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Redimensionando o mapa de assentos

A menos que o tamanho do seu mapa de assentos seja fixo, é difícil redimensionar o [`amp-list`](../../../documentation/components/reference/amp-list.md) que contém o mapa de assentos. O [`amp-list`](../../../documentation/components/reference/amp-list.md) ou precisa de dimensões fixas ou usar `layout="fill"` (para usar o espaço disponível do container pai). Há duas maneiras de solucionar esse problema:

1. Calcule o espaço disponível na página depois de souber quanto espaço é usado pelos outros componentes, como cabeçalhos e rodapés. Este cálculo pode ser feito em CSS usando a expressão `calc` e atribuindo-a como o valor `min-height` de um div que contém o [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Use um layout flex quando souber a altura do layout da página.

## Aplicando estilos em amp-pan-zoom

Se você estiver usando a solução descrita na seção anterior, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) também precisa usar `layout="fill"`.

[tip type="tip"] **DICA –** Para manter algum espaço em branco em volta do mapa de assentos e ainda fazer parte da área de pinça e zoom:

- Adicione uma div para conter o svg
- Add margens internas (padding)

Se você não tiver uma div externa, adicione uma margem (margin) ao SVG. Isto evitará que as margens façam parte da área de pinça e zoom. [/tip]

## Controlando o estado

Quando os usuários clicam em assentos diferentes, é possível acompanhar os `id`s de assentos selecionados em uma variável usando `amp-state` e adotando uma das duas estratégias abaixo:

- Acrescentando uma expressão [`amp-bind`](../../../documentation/components/reference/amp-bind.md) em cada assento, para adicionar o assento selecionado a uma lista
- Ou usando [`amp-selector`](../../../documentation/components/reference/amp-selector.md) com a ação `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` para que todos os assentos selecionados sejam adicionados a uma lista

Embora a primeira solução não exija o componente adicional [`amp-selector`](../../../documentation/components/reference/amp-selector.md), pode deixar o mapa de assentos muito lento, porque cada expressão [`amp-bind`](../../../documentation/components/reference/amp-bind.md) expression será avaliada cada vez que o assento for marcado/desmarcado.

A segunda alternativa também permite reduzir a duplicação da expressão [`amp-bind`](../../../documentation/components/reference/amp-bind.md) para cada assento que será renderizado pelo modelo.

## Estrutura HTML final

Para servir de referência, eis o HTML final para o mapa de assentos:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
