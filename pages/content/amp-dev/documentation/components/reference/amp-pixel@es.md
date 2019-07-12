---
$category@: ads-analytics
formats:
- websites
- ads
- stories
teaser:
  text: Píxel de seguimiento para contar las páginas vistas.
---



<!---
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
# amp-pixel


<table>
  <tr>
    <td class="col-fourty"><strong>Descripción</strong></td>
    <td>Se puede utilizar como un píxel de seguimiento típico para contar las páginas vistas.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Diseños admitidos</a></strong></td>
    <td>fixed y nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-pixel/">ejemplo de amp-pixel</a> de AMP By Example.</td>
  </tr>
</table>

## Comportamiento

El componente `amp-pixel` se comporta como un simple píxel de seguimiento `img`. Solo se necesita una URL, pero proporciona variables que puede sustituir el componente de la cadena de URL al hacer la solicitud. Para obtener más información, consulta la sección [Sustituciones](#substitutions).

En este ejemplo básico, `amp-pixel` envía una solicitud GET simple a la URL especificada e ignora el resultado.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
Al procesar URL de AMP en el encabezado de URL referente de las solicitudes de analíticas, elimina o ignora el parámetro `usqp`. Google utiliza este parámetro para activar experimentos de Google AMP Cache.
[/tip]

## Atributos

##### src (obligatorio)

URL que dirige a un punto de conexión remoto; debe comenzar por el protocolo `https`.

##### referrerpolicy (opcional)

Es similar al atributo `referrerpolicy` de `<img>`, pero el único valor aceptado en este caso es `no-referrer`. Si se define `referrerpolicy=no-referrer`, el encabezado `referrer` se elimina de la solicitud HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (opcional)

Este atributo se utiliza en las creatividades AMP4ADS, e indica que, como parte de la transformación posterior a la validación, puede insertarse un elemento img dentro del elemento amp-pixel. Esto permite que se envíe el ping en paralelo a la ejecución o recuperación del tiempo de ejecución de AMP.
Ten en cuenta que, como consecuencia, no se expandirán las macros que contenga la URL, así que usa este atributo solo si no están presentes en el archivo src.

##### atributos comunes

Este elemento incluye [atributos comunes](https://www.ampproject.org/docs/reference/common_attributes) que se aplican a los componentes de AMP.

## Sustituciones

El componente `amp-pixel` admite todas las sustituciones estándar de variables de URL.
Para obtener más información, consulta la [guía de sustituciones](../spec/amp-var-substitutions.md).

En el siguiente ejemplo, se puede hacer una solicitud a algo similar a `https://foo.com/pixel?0.8390278471201`. Es decir, se genera un valor RANDOM de forma aleatoria al producirse cada impresión.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Estilo

No se debe aplicar ningún estilo a `amp-pixel`.

## Validación

Consulta las [reglas de amp-pixel](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) en la especificación de la herramienta de validación de AMP.
