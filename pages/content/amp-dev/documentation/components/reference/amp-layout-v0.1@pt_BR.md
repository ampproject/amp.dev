---
$category@: layout
teaser:
  text: >-
    The amp-layout` component allows you to apply aspect-ratio based responsive
    layouts to any element. The `amp-layout` component works similarly to the
    layout.
$title: amp-layout
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
    <td width="40%"><strong>Descrição</strong></td>
    <td>Um elemento de contêiner genérico e multifuncional que permite adicionar os <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">layouts</a> avançados de AMP a qualquer elemento.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic, responsive</td>
  </tr>
</table>

## Visão geral <a name="overview"></a>

O componente `amp-layout` permite aplicar a qualquer elemento layouts responsivos com base na proporção. O componente `amp-layout` funciona de maneira semelhante ao atributo [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) em componentes AMP existentes, mas aceita qualquer marcação HTML como filha. Todos os outros layouts compatíveis funcionam com `amp-layout` (por exemplo, fixed-height, fixed etc.).

**Exemplo**

Este exemplo usa o `amp-layout` para criar um contêiner responsivo em torno de um círculo desenhado com SVG in-line.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </amp-layout>
```

## Atributos <a name="attributes"></a>

Este elemento inclui [atributos comuns](../../../documentation/guides-and-tutorials/learn/common_attributes.md) estendidos a componentes de AMP.

## Validação <a name="validation"></a>

Consulte as [regras de amp-layout](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) (link em inglês) nas especificações do validador de AMP.
