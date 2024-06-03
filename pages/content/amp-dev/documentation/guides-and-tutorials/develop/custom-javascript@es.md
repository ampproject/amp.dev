---
$title: Cómo utilizar JavaScript de manera personalizada en las páginas de AMP
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: Para las experiencias web que requieren una gran cantidad de personalización AMP creó amp-script, un componente que le permite usar JavaScript de manera arbitraria en su página de AMP sin afectar el rendimiento general de la página.
---

AMP se esfuerza por brindar una fantástica experiencia a todos los usuarios de la web promoviendo el uso de componentes que cuentan con gran funcionalidad y eficiencia, y que están listos para usarse inmediatamente.

Algunas experiencias en la web requieren de una gran cantidad de personalización, la cual va más allá de la capacidad para vincularse con el estado de [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites) junto con la funcionalidad para recuperar datos dinámicos y plantillas de [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) y [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites). Para este tipo de casos aislados, AMP creó [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites), el cual es un componente que le permite usar JavaScript de manera arbitraria en su página de AMP sin afectar el rendimiento general de la página.

# Cómo insertar la personalización en JavaScript

Las páginas de AMP son compatibles con un JavaScript personalizado mediante el componente `<amp-script>`. En el siguiente ejemplo se muestra cómo utilizar `amp-script` con un archivo JavaScript que fue cargado desde una URL:

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

El componente `<amp-script>` registra un [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) para que se ejecute en un hilo que esté separado de la página principal. The Web Worker recibe su propia copia del DOM mediante `amp-script` y el uso del [Worker DOM](https://github.com/ampproject/worker-dom). Esto permite que el Web Worker utilice las librerías de JavaScript, como [React](https://reactjs.org/) y [jQuery](https://jquery.com/), sin la necesidad de modificarlas.

El componente `amp-script` envía mensajes entre el hilo del Web Worker y el hilo principal, provocando que cualquier cambio que haga el usuario en el DOM principal se refleje en el DOM falso del Web Worker. Por otra parte, el Web Worker ahora puede actualizar al DOM falso, lo cual también se refleja en el DOM principal.

## Cómo almacenar en caché los scripts personalizados

El [caché de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) funciona con los archivos JavaScript personalizados que se insertan mediante `<amp-script>` y también funciona con los scripts de los componentes de AMP, lo que asegura que ningún JavaScript personalizado disminuirá la velocidad de un documento de AMP.

El caché de AMP sustituye los archivos JavaScript y posteriormente los envía. Los usuarios esperarían tener la misma experiencia con el rendimiento de una página que usa `<amp-script>` en comparación con una página que no lo incluye.

# Cómo utilizar `<amp-script>`

Para garantizar que las páginas de AMP siempre carguen rápido y sin problemas con las interfaces de usuario, existen algunas limitaciones cuando se utiliza `<amp-script>`.

## Inicialización

El JavaScript que está dentro del Web Worker permite realizar cambios mínimos en el DOM durante la carga. Los cambios que están permitidos en esta fase son los siguientes:

- Registrar los controladores del evento.
- Dividir un nodo de texto en múltiples nodos de texto, de modo que esté disponible para los marcos de trabajo que lo requieran.

El DOM que se encuentra dentro de las etiquetas de `<amp-script>` debe ser casi idéntico antes y después de la inicialización.

Por ejemplo, si comienza con el código que se muestra a continuación:

```html
<text> Hello world </text>
```

El Worker DOM permite realizar cambios menores en la estructura pero no en el contenido:

```html
 <text>Hello </text><text>world</text>
```

## Manipulación del DOM

Por motivos relacionados con la experiencia del usuario y de seguridad, `amp-script` aplica ciertas restricciones para manipular el DOM.

### Interacción con el usuario

Cuando un usuario interactúa con elementos que estén envueltos dentro de un componente `<amp-script>`, su JavaScript personalizado debe restituir las manipulaciones en el DOM rápidamente cuando sea necesario. Por defecto, los cambios que se realicen en el DOM están permitidos **cuando estos se efectúen en menos de un segundo** a partir de la interacción inicial. Una excepción importante ocurre cuando su código debe recuperar información de la red mediante `fetch`. En este punto, pueden solicitarse los cambios en DOM una vez que la respuesta sea devuelta al usuario y posteriormente en un lapso de tiempo **menor a un segundo**. Si un script muta el DOM fuera de una ventana permitida, esto dará como resultado un error grave y el componente `<amp-script>` finalizará al Web Worker. Cuando un componente `<amp-script>` haya terminado, este no se ejecutará nuevamente.

### Cambios sin previo aviso

No se requiere interacción con el usuario para manipular el DOM si el componente `<amp-script>` tiene una altura fija.

## Tamaño del script

AMP impone un límite de 150 kilobytes para el JavaScript personalizado que se usa en cada página. Este límite se distribuye entre todos los componentes de `<amp-script>` en dicha página. Cualquier biblioteca externa de JavaScript debe importarse a cada componente de `<amp-script>` de manera individual.

## Objetivo

Cualquier elemento DOM con el que deseen interactuar los archivos JavaScript debe estar envuelto dentro de las etiquetas del componente `<amp-script>`. Esto también incluye a otros componentes de AMP. El componente `<amp-script>` considera que `document.body` es un elemento de `<amp-script>` y no el elemento `<body>` del documento.

Si llamara a `document.body.appendChild(document.createElement('span'))` dentro del script importado como parte de un elemento de `<amp-script>` en el siguiente documento:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

El resultado sería similar a este:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## Disparador de eventos

Todos los disparadores de eventos están permitidos.

## Restricciones de la API <a name="api-restrictions"></a>

En `<amp-script>` algunos métodos sincrónicos no están permitidos y son reemplazados con métodos alternos, como [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)). Debido a que `Element.getBoundingClientRect()` no pudo implementarse en un Web Worker, se proporciona una alternativa asincrónica a este, `getBoundingClientRectAsync()`. Sin embargo,`getBoundingClientRectAsync()` devuelve un [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) en vez de devolver el resultado directamente.

Consulte [esta tabla](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md) para ver todos los WorkerDOM que son compatibles con las API.
