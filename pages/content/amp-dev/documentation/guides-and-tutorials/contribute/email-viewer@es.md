---
'$title': Utilizar el visor de AMP para renderizar correos electrónicos
$order: 5
author: alabiaga
formats:
  - email
---

Los clientes de correo electrónico que busquen apoyar a AMP for Email deben utilizar el [visor de AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) para alojar los correos electrónicos de AMP de sus emisores. Un visor desarrollado con la [biblioteca del visor de AMP](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) resume un documento de AMP y habilita [funciones](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md) que permiten la comunicación bidireccional con el documento AMP mediante postMessage. Estas funciones incluyen autorizar el control en la visibilidad del correo electrónico, retransmitir las métricas del usuario y facilitar los medios para garantizar la seguridad de las solicitudes XHR realizadas desde el correo electrónico.

## Interceptor del visor XHR

La función `xhrInterceptor` que se encuentra en la biblioteca del visor de AMP permite que el espectador intercepte las solicitudes de salida de XHR. En el visor de AMP se puede analizar una solicitud para determinar su validez e intención para garantizar la protección y privacidad de sus usuarios.

#### Solicitudes XHR

Los componentes de AMP, como [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) y [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email), requieren llamar a los endpoints para publicar o recuperar datos. Estas llamadas se clasifican como solicitudes XHR.

#### El visor y la comunicación con los documentos de AMP

El protocolo que se utiliza para la comunicar al visor y el documento de AMP se lleva a cabo mediante [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Lo que sigue es un ejemplo trivial de postMessage que funciona en el caso de utilizar intercepciones de XHR, donde un visor maneja el postMessage xhr enviado desde un documento de AMP y devuelve una respuesta personalizada.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Habilitar la intercepción de XHR

Habilite la intercepción de xhr al elegir al visor con la función xhrInterceptor desde el inicio. Consulte el ejemplo del visor sobre cómo se hace esto y un ejemplo sobre la intercepción de xhr. Elija en el documento de AMP la opción permitir la intercepción de XHR. Seleccione en los documentos agregar el atributo `allow-xhr-interception` en la etiqueta `<html amp4email>`. El cliente de correo electrónico debe establecer este atributo en el documento AMP antes de renderizarlo, ya que este atributo intencionalmente no es válido y se marcará como tal en la validación del documento AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Renderización de la plantilla para el lado del servidor en el visor

La función `viewerRenderTemplate` permite que el visor administre la renderización de las plantillas [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) y [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) Esto posibilita que el tiempo de ejecución de AMP envíe una solicitud del servidor proxy que contiene la llamada XHR original, los datos de la plantilla y cualquier otro detalle necesario para renderizar el contenido del componente para el visor. Además, permite que el visor haga una introspección del contenido de los datos desde el endpoint y administre la renderización del [mustache](https://mustache.github.io/) desde las plantillas para verificar y desinfectar los datos. Tenga en cuenta que si esta función está habilitada junto con xhrInterceptor, en los componentes amp-form y amp-list, la función `viewerRenderTemplate`, que también envía solicitudes desde el servidor proxy al visor, superará la del xhrInterceptor.

En el ejemplo [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) se muestra cómo `viewerRenderTemplate` podría manejar el mensaje enviado desde el documento de AMP. En ese ejemplo, mediante Viewer.prototype.processRequest\_ se captura el mensaje `viewerRenderTemplate` y, según el tipo de componente amp disponible en la solicitud, devuelve el html para que se renderice en el siguiente formato JSON.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Este es un ejemplo trivial en el que no hay dependencia de la biblioteca [mustache](https://mustache.github.io/) ni desinfección del contenido.

En el siguiente diagrama se representa un ejemplo más real sobre cómo un documento de AMP en un visor del cliente de correo electrónico con una función `viewerRenderTemplate` podría manejar la representación de la plantilla [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

El tiempo de ejecución de AMP enviaría la solicitud de recuperación de datos del componente [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) al visor, que a su vez enviaría esta solicitud a un servidor para el cliente de correo electrónico. En el servidor se introducirá esta URL y los resultados de la búsqueda de la URL a través de varios servicios, posiblemente inspeccionando la validez de la URL, el contenido de los datos devueltos desde esa URL y renderizando las plantillas de [mustache](https://mustache.github.io/) con esos datos. Después devolvería esa plantilla renderizada y la enviaría al visor en el siguiente formato de respuesta JSON.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

El valor html que se carga en JSON será lo que se introduzca en el documento de AMP para su renderización.

En la siguiente tabla se describen las funciones y los componentes afectados:

<table>
  <thead>
    <tr>
      <th width="30%">Capacidad del visor</th>
      <th>Componentes afectados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
