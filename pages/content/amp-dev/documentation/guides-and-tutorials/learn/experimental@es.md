---
$title: Funciones experimentales
---

Los [componentes AMP experimentales](https://github.com/ampproject/amphtml/tree/main/tools/experiments)
son funciones que aún no están listas para usarse de forma generalizada; por eso se marcan como **experimentales**.

Los desarrolladores y los usuarios pueden habilitar el uso de estas funciones antes de que se publiquen definitivamente,
pero deben usarlas con precaución, ya que pueden contener errores o efectos secundarios inesperados.

## Habilitar el canal para desarrolladores de AMP

El canal para desarrolladores de AMP es una forma de permitir que los navegadores utilicen una versión más reciente de las bibliotecas JavaScript de AMP.

La versión del canal para desarrolladores de AMP **puede ser poco estable** y es posible que incluya funciones que no estén disponibles para todos los usuarios. Habilita este canal si quieres ayudarnos a probar nuevas versiones de AMP, informarnos de errores o crear documentos que necesitan una función nueva que aún no está disponible para todo el mundo.

El canal para desarrolladores es perfecto para:

- Probar y jugar con nuevas funciones que aún no están disponibles para todos los usuarios.
- Utilizarlo en procesos de control de calidad para asegurarte de que tu sitio web sea compatible con la siguiente versión de AMP.

Si encuentras un problema que parece darse únicamente en la versión del canal para desarrolladores de AMP, [regístralo](https://github.com/ampproject/amphtml/issues/new) y descríbelo. Incluye siempre la URL de una página donde se pueda reproducir el problema.

Para habilitar el canal para desarrolladores de AMP en tu navegador, ve a la [página AMP Experiments] (https://cdn.ampproject.org/experiments.html) y activa el experimento "AMP Beta Channel" (Canal para desarrolladores de AMP). Si quieres recibir notificaciones sobre cambios importantes o novedades de AMP, suscríbete a la lista de distribución [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Habilitar componentes experimentales

#### Publicado desde cdn.ampproject.org

En el caso de contenido publicado desde [https://cdn.ampproject.org](https://cdn.ampproject.org), 
ve a la [página AMP Experiments](https://cdn.ampproject.org/experiments.html)
y habilita (o inhabilita) los componentes experimentales que quieras con el botón que aparece junto a ellos. Si activas un componente, se añadirá una cookie a tu navegador que habilitará el experimento en todas las páginas AMP que se publiquen a través de la caché de AMP de Google.

#### Publicado desde otros dominios

En el caso de contenido publicado desde otros dominio, los experimentos se pueden activar o desactivar desde la consola DevTools si el modo de desarrollo está habilitado mediante:

```js
AMP.toggleExperiment('experiment')
```

Los archivos de AMP que incluyan funciones experimentales no superarán la
[validación de AMP](validation-workflow/validate_amp.md).
Quita estos componentes experimentales de los documentos de AMP listos para publicarse.

## Habilitar experimentos en documentos concretos

Puedes habilitar determinados experimentos en documentos concretos. Para hacerlo, solo tienes que colocar una metaetiqueta que tenga el valor `amp-experiments-opt-in` en el atributo de nombre en el encabezado del documento HTML, antes de la secuencia de comandos de AMP (`https://cdn.ampproject.org/v0.js`). El contenido de esta metaetiqueta deben ser los ID de los experimentos que quieras habilitar, separados por comas.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

Al hacerlo, los experimentos indicados estarán habilitados para todos los visitantes del documento. Sin embargo, no todos los experimentos pueden habilitarse a nivel de documento. Para obtener una lista completa de los experimentos incluidos en la lista blanca, consulta el atributo `allow-doc-opt-in` del archivo `prod-config.json` del proyecto. Ten en cuenta que, aunque un experimento esté habilitado a nivel de documento, los usuarios pueden decidir inhabilitarlo.
 
