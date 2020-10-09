---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Insere anúncios em páginas AMP de maneira dinâmica usando um arquivo de configuração veiculado remotamente.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Insere anúncios em páginas AMP de maneira dinâmica usando um arquivo de configuração veiculado remotamente.

<table>
  <tr>
    <td class="col-fourty"><strong>Disponibilidade</strong></td>
    <td>Experimental</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td>
    <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
    </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Layouts compatíveis
          </a>
        </strong>
      </td>
      <td>N/A</td>
    </tr>
  </table>


## Comportamento

Considerando um número suficiente de colocações válidas (fornecidas na configuração), o `amp-auto-ads` tenta inserir anúncios adicionais obedecendo ao conjunto de restrições especificado pela rede de publicidade. Essas restrições se limitam:

* ao número total de anúncios que podem ser inseridos;
* à distância mínima que precisa haver entre os anúncios adjacentes.

Além disso, os anúncios só são inseridos em locais na página que não causem um novo fluxo inaceitável (conforme determinado por attemptChangeSize).

A tag `<amp-auto-ads>` precisa ser colocada como o primeiro filho de `<body>`.

O tipo de rede de publicidade e qualquer outra informação (exigida pela rede) precisam ser especificados na tag.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Redes de publicidade compatíveis <a name="supported-ad-networks"></a>

* [Google AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (experimental)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Atributos

<table>
  <tr>
    <td width="40%"><strong>type (obrigatório)</strong></td>
    <td>Um identificador para a rede de publicidade.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>A maioria das redes de publicidade exige uma configuração maior, que pode ser passada para a rede usando atributos HTML de <code>data-</code>. Os nomes de parâmetros estão sujeitos à conversão de traço para CamelCase do atributo de dados padrão. Por exemplo, "data-foo-bar" é enviado ao anúncio para configuração como "fooBar". Consulte a documentação da <a href="#supported-ad-networks">rede de publicidade</a> em que os atributos podem ser usados.</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Este elemento inclui <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comuns</a> estendidos a componentes de AMP.</td>
  </tr>
</table>

## Especificação de configuração

A configuração define o local na página em que o `<amp-auto-ads>` pode colocar anúncios. A configuração é buscada em uma rede de publicidade de terceiros no URL definido em `ad-network-config.js`. A configuração precisa ser um objeto JSON serializado que corresponda à definição de [`ConfigObj`](#configobj) descrita abaixo.

### Exemplo de configuração

O exemplo a seguir especifica que o anúncio precisa ser posicionado imediatamente após todos os elementos `<P class='paragraph'>` que estão dentro do terceiro `<DIV id='domId'>` na página. Um anúncio colocado em qualquer uma dessas posições precisa ser do tipo BANNER e ter uma margem superior de 4 px e uma inferior de 10 px.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### Definições dos objetos

#### ConfigObj <a name="configobj"></a>

Os campos a serem especificados no objeto de configuração:

<table>
  <tr>
    <th class="col-thirty">Nome do campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>Um campo <strong>obrigatório</strong> que indica os possíveis locais em que os anúncios podem ser inseridos na página.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Um campo <em>opcional</em> que especifica um mapeamento do nome do atributo para atribuir valores a serem aplicados a todos os elementos <code>&lt;amp-ad&gt;</code> injetados usando essa configuração. Somente os seguintes nomes de atributo são permitidos:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ou seja, qualquer atributo de dados)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Um campo <em>opcional</em> que especifica as restrições que precisam ser usadas ao colocar anúncios na página. Se não for especificado, o <code>amp-auto-ads</code> tentará usar as restrições padrão especificadas em [ad-network-config.js](0.1/ad-network-config.js).
    </td>
  </tr>
</table>

#### PlacementObj

Os campos a serem especificados no objeto de configuração `placements`:

<table>
  <tr>
    <th class="col-thirty">Nome do campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Um campo <strong>obrigatório</strong> que fornece informações usadas para consultar elementos na página à qual a posição da colocação está ancorada.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Um campo <strong>obrigatório</strong> que indica a posição da colocação em relação ao elemento âncora.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Um campo <strong>obrigatório</strong> que indica o tipo de colocação.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Um campo <em>opcional</em> que indica qualquer estilo que precisa ser aplicado a um anúncio inserido nessa posição de colocação.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>Um campo <em>opcional</em> para um mapa do nome do atributo para o valor dos atributos a serem aplicados a todos os elementos <code>&lt;amp-ad&gt;</code> injetados usando essa colocação. Um atributo especificado aqui modifica qualquer outro com o mesmo nome que também esteja especificado no <code>ConfigObj</code> principal. Somente os seguintes nomes de atributo são permitidos:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (ou seja, qualquer atributo de dados)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

Os campos a serem especificados no objeto de configuração `anchor`:

<table>
  <tr>
    <th class="col-thirty">Nome do campo</th>
    <th class="col-thirty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td>Um campo <strong>obrigatório</strong> que define um seletor de CSS para selecionar os elementos nesse nível de definição da âncora.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>number</td>
    <td>Um campo <em>opcional</em> para especificar o índice dos elementos selecionados pelo seletor ao qual esse nível de definição da âncora precisa se limitar. Por padrão, o valor é definido como 0 (se o campo <code>all</code> for definido como falso).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>Ignorado se o campo <code>index</code> tiver sido especificado. Se definido como <code>true</code>, todos os elementos selecionados pelo seletor precisam ser incluídos. Caso contrário, configure como <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>number</td>
    <td>Um campo <em>opcional</em> que especifica o comprimento mínimo da propriedade textContent de um elemento para que ela seja incluída. O valor padrão é 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>Um campo <em>opcional</em> que especifica um <code>AnchorObj</code> recursivo que selecionará elementos dentro de qualquer elemento selecionado nesse nível de definição da âncora.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

Os campos a serem especificados no objeto de configuração `style`:

<table>
  <tr>
    <th class="col-twenty">Nome do campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>number</td>
    <td>Um campo <em>opcional</em> que indica a margem superior em pixels que um anúncio inserido nessa posição precisa ter. Valor padrão: 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>number</td>
    <td>Um campo <em>opcional</em> que indica a margem inferior em pixels que um anúncio inserido nessa posição precisa ter. Valor padrão: 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

Os valores ENUM para o campo `pos` no objeto de configuração `placements`:

<table>
  <tr>
    <th class="col-fourty">Nome</th>
    <th class="col-twenty">Valor</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>O anúncio precisa ser inserido como irmão imediatamente antes da âncora.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>O anúncio precisa ser inserido como o primeiro filho da âncora.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>O anúncio precisa ser inserido como o último filho da âncora.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>O anúncio precisa ser inserido como irmão imediatamente depois da âncora.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

Os valores ENUM para o campo `type` no objeto de configuração `placements`:

<table>
  <tr>
    <th class="col-fourty">Nome</th>
    <th class="col-twenty">Valor</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>O canal descreve a posição de um anúncio em banner.</td>
  </tr>
</table>

#### AdConstraintsObj

Os campos a serem especificados no objeto de configuração `adConstraints`:

<table>
  <tr>
    <th class="col-twenty">Nome do campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
      Um campo <strong>obrigatório</strong> que indica a distância mínima que um anúncio precisa ter de todos os anúncios que já estão na página no momento da inserção, seja colocado manualmente ou anteriormente pelo amp-auto-ads.
      Os valores são expressos como um número com prefixo de unidade. Por exemplo, "10px" significa 10 pixels ou "0.5vp" representa a metade da altura de uma janela de visualização. Valores negativos são inválidos. As unidades aceitas são:
      <ul>
        <li>px: pixels</li>
        <li>vp: múltiplo da altura da janela de visualização</li>
      </ul>
      Esse valor se aplica somente quando o número de anúncios que já estão na página for menor do que qualquer correspondente do <code>adCount</code> especificado no campo subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Um campo <em>opcional</em> que especifica os espaços para anúncios que precisam ser aplicados com base em quantos anúncios já estão na página no momento da inserção.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>number</td>
    <td>
      Um campo <strong>obrigatório</strong> que especifica o número máximo de anúncios que o <code>amp-auto-ads</code> pode fazer com que haja em uma página. Tanto os anúncios inseridos manualmente quanto os colocados por <code>amp-auto-ads</code> são contabilizados nesse total.
      Por exemplo, se esse campo for definido como 5 e houver três anúncios inseridos manualmente na página, <code>amp-auto-ads</code> colocará um máximo de dois outros anúncios.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

Os campos a serem especificados no objeto de configuração `subsequentMinSpacing`. As entradas de `subsequentMinSpacing` podem ser usadas para alterar o espaçamento necessário entre anúncios adicionais com base no número de anúncios que já estão na página. Como um exemplo, considere este cenário:

* Dois anúncios existentes na página
* O campo subsequentMinSpacing é:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

Inicialmente, há dois anúncios existentes na página, então nenhum mapeamento corresponde.
O espaçamento mínimo, portanto, assume como padrão initialMinSpacing no objeto `AdConstraints`.
O `amp-auto-ads` tentará colocar anúncios recorrentemente até que fique sem locais que possam ser usados sem corromper os `adContraints`.
Depois que `amp-auto-ads` colocar o primeiro anúncio, haverá três anúncios na página. Considerando que há um mapeamento para três anúncios (ou mais) no `subsequentMinSpacing`, o espaçamento mínimo agora se torna 500 px.
Isso se aplica até o momento em que houver cinco anúncios na página, porque há uma regra para cinco anúncios. A inserção do sexto anúncio em diante exigiria que outros anúncios ficassem a uma distância de no mínimo 1000 px.

<table>
  <tr>
    <th class="col-twenty">Nome do campo</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-fourty">Descrição</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>number</td>
    <td>
      Um campo <strong>obrigatório</strong>.
      O número mínimo de anúncios na página que fazem com que essa regra seja aplicada (supondo que nenhuma outra regra faça uma correspondência melhor). Veja a descrição acima para uma explicação mais detalhada.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>string</td>
    <td>
      Um campo <strong>obrigatório</strong> que especifica o espaço para anúncio mínimo que se aplica quando essa regra é correspondida com base em <code>adCount</code>.
      Os valores são expressos como um número com prefixo de unidade. Por exemplo, "10px" significa 10 pixels ou "0.5vp" representa a metade da altura de uma janela de visualização. Valores negativos são inválidos. As unidades aceitas são:
      <ul>
        <li>px: pixels</li>
        <li>vp: múltiplo da altura da janela de visualização</li>
      </ul>
    </td>
  </tr>
</table>

## Validação

Consulte as [regras do amp-auto-ads rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) (link em inglês) nas especificações do validador de AMP.
