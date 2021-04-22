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
    <td width="40%"><strong>Descripción</strong></td>
    <td>Elemento contenedor genérico y multipropósito que aporta <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">diseños</a> de AMP de gran utilidad</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, intrinsic y responsive</td>
  </tr>
</table>

## Descripción general <a name="overview"></a>

El componente `amp-layout` permite aplicar a cualquier elemento diseños adaptables basados en la relación de aspecto. Funciona de forma similar al atributo [layout](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) en los componentes AMP disponibles, pero admite cualquier etiqueta HTML como elemento secundario. Todos los demás diseños admitidos funcionan con `amp-layout` (por ejemplo, fixed-height, fixed, etc.).

**Ejemplo**

En este ejemplo se utiliza `amp-layout` para crear un contenedor adaptable alrededor de un círculo dibujado mediante SVG insertado.

```html
<amp-layout layout="responsive" width="1" height="1">
  <svg viewBox="0 0 100 100">
    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="3" />
      Lo sentimos, pero tu navegador no es compatible con SVG insertado.
    </svg>
  </amp-layout>
```

## Atributos <a name="attributes"></a>

Este elemento incluye [atributos comunes](../../../documentation/guides-and-tutorials/learn/common_attributes.md) que se aplican a los componentes de AMP.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-layout](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) en la especificación de la herramienta de validación de AMP.
