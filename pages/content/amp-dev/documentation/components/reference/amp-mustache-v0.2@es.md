---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Permite el renderizado de las plantillas Mustache.js
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



Permite el renderizado de las plantillas [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-mustache/">ejemplo comentado de amp-mustache</a> de AMP By Example.</td>
  </tr>
</table>


## Notas de la versión <a name="version-notes"></a>

| Versión | Descripción |
|-------|-----|
| 0.2 | Se ha incluido la compatibilidad con los elementos `<svg>`; se ha reducido el tamaño del bundle a 12,2 KB (previamente 20,5 KB) y comprimido en formato gzip.Migra a una biblioteca de depuración HTML más moderna (antes Caja, ahora DOMPurify). Esto puede provocar pequeños puntos de ruptura debido a las diferencias en la inclusión en la lista blanca de atributos y etiquetas. Te recomendamos que pruebes primero las páginas antes de pasar a la fase de producción para asegurarte de que los cambios en el marcado generado no afectan a su funcionamiento. |
| 0.1 | Implementación inicial. |

## Sintaxis <a name="syntax"></a>

Mustache es una sintaxis de plantilla "sin lógica". Consulta la [documentación de Mustache.js](https://github.com/janl/mustache.js/) para obtener más información. Algunas de las etiquetas principales de Mustache son:

* {% raw %}`{{variable}}`{% endraw %}: etiqueta de variable. Genera el valor de una variable con formato de escape de HTML.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: etiqueta de sección. Puede comprobar la existencia de una variable y repetir la lógica si se trata de una matriz.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: etiqueta invertida. Puede comprobar la no existencia de una variable.
* {% raw %}`{{{unescaped}}}`{% endraw %}: HTML sin escape. Se aplican restricciones al marcado que puede generar (consulta la sección "Restricciones", que aparece más abajo).

## Uso <a name="usage"></a>

La plantilla de `amp-mustache` debe definirse y utilizarse de acuerdo con las [especificaciones de plantillas de AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

En primer lugar, `amp-mustache` debe declararse o cargarse de la siguiente manera:

```html

<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

A continuación, las plantillas de Mustache se pueden definir mediante una etiqueta `script` o `template` de la siguiente manera:

[sourcecode:html]
{% raw %}<!-- Con la etiqueta `template`. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]
o

<!-- Con la etiqueta `script`. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

Utiliza la etiqueta `template` siempre que sea posible, ya que la herramienta de validación de AMP proporciona sugerencias útiles de dev-x. Utiliza la plantilla `script` para casos especiales y cuando hay problemas al generar plantillas a partir de tablas. Consulta la sección "Tablas" que aparece más abajo.

El elemento AMP que utiliza esta plantilla para renderizar su contenido (por ejemplo, [amp-list](amp-list.md), [amp-form](amp-form.md), etc.) decide cómo se descubren las plantillas, cuándo se renderizan y cómo se proporcionan los datos.

## Restricciones <a name="restrictions"></a>

### Validación <a name="validation"></a>

Como todas las plantillas de AMP, las de `amp-mustache` deben ser fragmentos DOM y tener el formato correcto. Esto quiere decir, entre otras cosas, que no puedes usar `amp-mustache` para:

* Obtener un nombre de etiqueta; por ejemplo, no se admite el uso de {% raw %}`<{{tagName}}>`{% endraw %}.
* Obtener un nombre de atributo; por ejemplo, no se admite el uso de {% raw %}`<div {{attrName}}=something>`{% endraw %}.

El resultado de "triple-mustache" se ha depurado para que solo admita las siguientes etiquetas: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u` y `ul`.

### Depuración <a name="sanitization"></a>

Las plantillas de Mustache generadas se depuran por motivos de seguridad y para que se puedan utilizar con AMP. Esto puede provocar que ciertos elementos y atributos se eliminen sin avisar.

## Problemas <a name="pitfalls"></a>

### Plantillas anidadas <a name="nested-templates"></a>

De acuerdo con la validación de AMP, los elementos `<template>` no deben ser secundarios de otros elementos `<template>`. Esto puede ocurrir al anidar dos componentes que utilizan plantillas, como `amp-list` y `amp-form`.

Para solucionar este problema, se puede hacer referencia a un elemento `<template>` incluyendo su `id` en el atributo `template` del componente. Por ejemplo:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

También se puede representar como:

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Tablas <a name="tables"></a>

Dado que las cadenas de las plantillas de AMP deben especificarse en elementos `<template>`, el navegador puede funcionar de manera inesperada debido al análisis que lleva a cabo. Por ejemplo, los elementos `<table>` pueden causar [foster parenting](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) del texto. En el siguiente ejemplo:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</template>
{% endraw %}[/sourcecode]

El navegador hará un "foster parent" de los nodos de texto {% raw %}`{{#foo}}`{% endraw %} y {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}

<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Para solucionar este problema, se pueden encapsular las secciones de Mustache en comentarios HTML, como {% raw %}`<!-- {{#bar}} -->`{% endraw %}; utilizar elementos que no sean de tabla para definir las plantillas, como `<div>`; o usar la etiqueta `<script type="text/plain">`.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
  </tr>
</table>
</script>
{% endraw %}[/sourcecode]

### Comillas de escape <a name="quote-escaping"></a>

Cuando se utiliza `amp-mustache` para calcular valores de atributo, las comillas de escape pueden dar problemas. Por ejemplo:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
</template></p><!-- A double-quote (") in foo will cause malformed HTML. -->
<amp-img alt="{{foo}}" src="example.jpg" width="100" height="100"></amp-img>

<!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
<button on="tap:AMP.setState({foo: &#39;{{bar}}&#39;})">Click me</button>
</template>
{% endraw %}[/sourcecode]

Utilizar códigos de carácter de HTML en las variables {% raw %}`{{foo}}`{% endraw %} o {% raw %}`{{bar}}`{% endraw %} no funcionará, ya que Mustache hará un escape HTML de los caracteres `&amp;` (p. ej., `&quot;` -&gt; `&amp;quot;`). Una solución es utilizar caracteres similares, como ′ (`&prime;`) y ″ (`&Prime;`).

Hay una [propuesta abierta](https://github.com/ampproject/amphtml/issues/8395) para que se lleve a cabo esta sustitución en `amp-mustache`. Si te gusta la idea y quieres apoyarla, puedes dejar un comentario.

### Entidades HTML <a name="html-entities"></a>

Las entidades HTML no se conservan en los elementos `<template>`.

Esto puede dar problemas si quieres que el servidor renderice una plantilla `<template>` que contiene texto generado por el usuario, porque si este contiene {% raw %}`{{`, `}}`, `{{{` o `}}}`{% endraw %}, se le tratará como una sección de Mustache. Por ejemplo, sustituir {% raw %}`{{`{% endraw %} por las entidades HTML `&lcub;&lcub;` no servirá, porque no se conservan cuando el navegador analiza `<template>`.

Entre las soluciones posibles está reemplazar las cadenas como {% raw %}`{{`{% endraw %} por caracteres diferentes o eliminarlas directamente del contenido generado por los usuarios.

## Validación <a name="validation-1"></a>

Consulta las [reglas de amp-mustache](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/validator-amp-mustache.protoascii) en la especificación de la herramienta de validación de AMP.
