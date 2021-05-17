---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: Um pixel de rastreamento usado para contar visualizações de páginas.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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




<table>
  <tr>
    <td class="col-fourty"><strong>Descrição</strong></td>
    <td>Pode ser usado como um pixel de rastreamento típico para contar visualizações de páginas.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td>Veja um exemplo de <a href="https://ampbyexample.com/components/amp-pixel/">amp-pixel</a> no site AMP By Example.</td>
  </tr>
</table>

## Comportamento <a name="behavior"></a>

O componente `amp-pixel` se comporta como um pixel de rastreamento simples `img`. Ele usa um único URL, mas fornece variáveis que podem ser substituídas pelo componente na string de URL ao fazer a solicitação. Consulte a [seção de substituições](#substitutions) para ver mais detalhes.

Neste exemplo básico, o `amp-pixel` emite uma solicitação GET simples para o URL fornecido e ignora o resultado.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
ao processar URLs de AMP no cabeçalho do referenciador das solicitações de análise, remova ou ignore o parâmetro `usqp`. Esse parâmetro é usado pelo Google para acionar experimentos para o Google AMP Cache.
[/tip]

## Atributos <a name="attributes"></a>

##### src (obrigatório) <a name="src-required"></a>

Um URL simples para um endpoint remoto que precisa ser o protocolo `https`.

##### referrerpolicy (opcional) <a name="referrerpolicy-optional"></a>

Este atributo é semelhante ao atributo `referrerpolicy` em `<img>`. No entanto, `no-referrer` é o único valor aceito. Se `referrerpolicy=no-referrer` for especificado, o cabeçalho de `referrer` será removido da solicitação HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (opcional) <a name="allow-ssr-img-optional"></a>

Este atributo usado em anúncios AMP4ADS indica que, como parte da transformação de pós-validação, um elemento img pode ser colocado diretamente no elemento amp-pixel, permitindo que o ping seja enviado em paralelo com a busca/execução do ambiente de tempo de execução de AMP.
Isso significa que as macros no URL NÃO serão expandidas, então use-as somente se elas não estiverem presentes no src.

##### common attributes <a name="common-attributes"></a>

Este elemento inclui [atributos comuns](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estendidos a componentes de AMP.

## Substituições <a name="substitutions"></a>

O `amp-pixel` permite todas as substituições de variáveis de URL padrão.
Consulte o [Guia de substituições](https://github.com/ampproject/amphtml/blob/main/extensions/spec/amp-var-substitutions.md) (em inglês) para ver mais informações.

No exemplo a seguir, uma solicitação pode ser feita para algo como `https://foo.com/pixel?0.8390278471201`, em que o valor ALEATÓRIO é gerado de forma aleatória em cada impressão.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Estilo <a name="styling"></a>

`amp-pixel` não deve ser estilizado.

## Validação <a name="validation"></a>

Veja as [regras do amp-pixel](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) (link em inglês) nas especificações do validador de AMP.
