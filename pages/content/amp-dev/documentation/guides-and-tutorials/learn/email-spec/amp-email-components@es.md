---
'$title': Componentes que son compatibles con AMP for Email
$order: 3
formats:
  - email
teaser:
  text: 'A continuación, se muestra la lista de componentes de AMP que actualmente son compatibles con los mensajes de correo electrónico de AMP. Los componentes se agrupan en las siguientes categorías:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

A continuación, se muestra la lista de [componentes de AMP](https://amp.dev/documentation/components/?format=email) que actualmente son compatibles con los mensajes de correo electrónico de AMP. Los componentes se agrupan en las siguientes categorías:

- [Contenido dinámico](#dynamic-content)
- [Diseño](#layout)
- [Medios](#media)

## Contenido dinámico <a name="dynamic-content"></a>

| Elemento                                                                                                                                                                      | Descripción                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                             | Es un elemento del formulario. El atributo action-xhr debe utilizarse en lugar del atributo "action" que se utiliza de forma habitual. Puede utilizarse en combinación con `<template type="amp-mustache">` para renderizar una respuesta. <br><br>**Nota:** no se permite [el redireccionamiento después del envío](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission).               |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                     | Es un widget de selección múltiple que puede usarse dentro de un formulario.                                                                                                                                                                                                                                                                                                                                           |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) y [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Es un lenguaje para generar scripts sencillos en AMP, el cual permite la manipulación de una máquina de estados que permite regular las interacciones entre los elementos. Además, puede utilizarse para agregar comportamientos en ciertos eventos.<br><br>**Nota:** está prohibido crear enlaces para `[href]` o `[src]`. También está prohibido utilizar las acciones `AMP.print`, `AMP.navigateTo` y `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                              | `<amp-state>` sirve para definir el estado inicial que se utilizó en `amp-bind`.<br><br>**Nota:** actualmente no es compatible con el atributo `src`.                                                                                                                                                                                                                                                                  |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                             | Obtiene datos JSON de forma remota, los cuales serán renderizados por un [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Nota:** No se permite crear enlaces con el atributo `[src]`. También está prohibido incluir identificaciones de usuario mediante `credentials="include"`.                                                                                                 |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                     | Es una etiqueta en la plantilla Mustache que permite renderizar los resultados cuando se llama a `amp-list`.                                                                                                                                                                                                                                                                                                           |

## Diseño <a name="layout"></a>

| Elemento                                                                                                        | Descripción                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Atributos layout](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | El comportamiento del diseño está determinado por el atributo "layout".                      |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                     | Es un elemento en la interfaz del usuario que facilita mostrar/ocultar diferentes secciones. |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                       | Es un componente del carrusel en la interfaz del usuario.                                    |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                       | Es un componente auxiliar para ajustar el texto dentro de un área determinada.               |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                           | Es un contenedor que puede tener un diseño adaptable basado en relaciones con el aspecto.    |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                         | Es una barra lateral cuyo propósito es de navegación.                                        |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                         | Proporciona una forma conveniente para renderizar los registros del tiempo.                  |

## Medios <a name="media"></a>

| Elemento                                                          | Descripción                                                                                                |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Es un componente de AMP que reemplaza a `<img>`.<br><br>**Nota:** no se permite crear enlaces con `[src]`. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Incorpora archivos de tipo GIF.<br><br>**Nota:** no se permite crear enlaces con `[src]`.                  |
