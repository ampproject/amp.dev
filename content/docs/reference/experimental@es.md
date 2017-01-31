---
$title: Componentes experimentales
---

Los [componentes experimentales de AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) son funciones que no están listas para usarse de forma generalizada; de ahí que se protejan con el estado de "experimentales".

Los desarrolladores y los usuarios pueden habilitar el uso de estas funciones antes de que se publiquen definitivamente,
pero deben usarlas con precaución, ya que pueden contener errores o efectos secundarios inesperados.

## Habilitar el canal para desarrolladores de AMP

El canal de la consola para desarrolladores de AMP es una forma de habilitar un navegador para que utilice una versión más reciente de las bibliotecas JavaScript de AMP.

Para habilitar tu navegador en el canal para desarrolladores de AMP, ve a la [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) y activa el experimento "Canal para desarrolladores de AMP".

## Habilitar un componente experimental

En el caso de contenido publicado desde [https://cdn.ampproject.org](https://cdn.ampproject.org), ve a la [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) y habilita (o inhabilita) los componentes experimentales activándolos (o desactivándolos). Al habilitar esta opción, se definirá una cookie en el navegador que habilitará el experimento en todas las páginas de AMP que se publiquen a través de Google AMP Cache.

En el caso de contenido publicado desde cualquier otro dominio, los experimentos se podrán activar desde la consola DevTools cuando el modo de desarrollo se haya habilitado mediante:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Los archivos de AMP que incluyan funciones experimentales no superarán la [validación de AMP](/docs/guides/validate.html).
Quita estos componentes experimentales de los documentos de AMP listos para la producción.
