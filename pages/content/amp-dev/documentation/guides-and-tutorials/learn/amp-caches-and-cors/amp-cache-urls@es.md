---
"$title": Administración de las solicitudes y el formato URL para el caché de AMP
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

En este documento aprenderá sobre el formato URL para el caché de AMP y cómo administrar las solicitudes.

## Formato URL

Cuando sea posible, en el caché de AMP de Google se creará un subdominio para el dominio de cada documento de AMP el cual primero convertirá de [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) a UTF-8. En los cachés se reemplaza cada `-` (guión) con `--` (2 guiones) y se reemplaza cada `.` (punto) con `-` (guión). Por ejemplo, `pub.com` se asignará a `pub-com.cdn.ampproject.org`.

Puede utilizar esta calculadora de URL para convertir una URL en una versión del caché de AMP:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Utilice el módulo [Node.js](https://nodejs.org) de [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url)  para traducir una URL desde su origen al formato URL para el caché de AMP. [/tip]

En este documento se describe:

- La estructura de la URL en un caché de AMP.
- La predicción de cómo aparecerán sus URL en un caché de AMP.
- Cómo modificar un encabezado de AMP Cache Origin para determinar cuál era el dominio del editor.

## Protocolo del nombre de dominio

Todos los documentos utilizan el protocolo https en los cachés de AMP.

## Sufijo para el nombre de dominio

Todos los cachés de AMP se registran en un archivo JSON, que se encuentra en línea en el [repositorio AMPHTML](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). Un ejemplo del registro de caché en este archivo se verá de la siguiente manera:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Un caché de AMP presenta los registros del dominio específicos hechos por `cacheDomain`. En este caso, el dominio es  `cdn.ampproject.org`.

Este documento utiliza como ejemplo la URL `cdn.ampproject.org` pero otros cachés normalmente utilizan una estructura URL similar.

## Prefijo del nombre de dominio

Un caché de AMP presenta los documentos en una URL modificada, como `example-com.cdn.ampproject.org`. Por ejemplo, el primer componente con puntos en el nombre de dominio original,  `example.com`, se convierte en `example-com`. Este documento se refiere a esta cadena sin puntos, `example-com`, como el “prefijo de dominio”. A continuación, consulte el algoritmo que realiza esta transformación.

No se utilizan varios componentes con puntos en este prefijo, como  `example.com.cdn.ampproject.org`, debido a la restricción de los certificados https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Los dominios de los editores pueden tener hasta 255 caracteres de longitud, mientras que cada prefijo de dominio está limitado a 63 caracteres, de acuerdo al [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11) en el que se lee:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Todos los dominios de los editores se asignan a un prefijo de dominio único. En el algoritmo se intenta que la asignación sea legible por humanos. Sin embargo, la asignación vuelve a utilizar un hash seguro para los dominios de los editores si son demasiado largos y en los casos que se describen a continuación:

### Algoritmo básico

El algoritmo básico para convertir un dominio del editor en un prefijo de dominio es el siguiente:

1. Punycode decodifica el dominio del editor. Consulte [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Reemplace cualquier carácter "`-`" (guión) en la salida del paso 1 con "`--`" (dos guiones).
3. Reemplace cualquier carácter "`.`" (punto) en la salida del paso 2 con "`-`" (guión).
4. Si la salida del paso 3 tiene un "`-`" (guión) en las posiciones 3 y 4, entonces en la salida del paso 3 agregue un prefijo "`0-`" y agregue un sufijo "`-0`". Consulte el [#26205](https://github.com/ampproject/amphtml/issues/26205) para conocer los antecedentes.
5. Punycode codifica la salida del paso 3. Consulte  [RFC 3492](https://tools.ietf.org/html/rfc3492).

Estos son algunos ejemplos del algoritmo básico:

<table>
  <tr>
   <td>
<strong>Dominio del editor</strong>
   </td>
   <td>
<strong>Prefijo del dominio</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Después de ejecutar el algoritmo básico, si y solo si el prefijo de dominio no es una etiqueta DNS válida, ejecutaremos el algoritmo alternativo que se describe a continuación.

Un prefijo de dominio no es una etiqueta DNS válida si tiene más de 63 caracteres de longitud.

### Algoritmo alternativo

El algoritmo alternativo para convertir un dominio del editor en un prefijo de dominio es el siguiente:

1. Ponga un hash en el dominio del editor mediante SHA256.
2. Evite la Base32 en la salida del paso 1.
3. Elimine los últimos 4 caracteres en la salida del paso 2, que siempre son caracteres `=` (igual).

En el algoritmo alternativo se producirá una cadena de 52 caracteres como la siguiente sin `-` (guión): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Algoritmo combinado

El algoritmo combinado es:

1. Ejecute el algoritmo básico. Si la salida es una etiqueta DNS válida, adjunte el sufijo de dominio del caché y lo que devuelve, por ejemplo, `example-com.cdn.ampproject.org`. De lo contrario, continúe con el paso 2.
2. Ejecute el algoritmo alternativo. Adjunte el sufijo del dominio de caché y lo devuelve, por ejemplo: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Ruta de la URL

La “ruta” de una URL en el caché de AMP siempre está constituida por uno o más directorios de prefijos, como `/c`, seguido de un infijo `/s` solo si la URL del editor es http `s`, seguida de la URL del documento del editor sin el protocolo.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

Los directorios de prefijos, como `/c` corresponden a diferentes tipos de publicaciones que puede realizar un caché de AMP. Diferentes cachés de AMP pueden ser compatibles con diferentes tipos de publicaciones, esta no es una lista exhaustiva:

- `/c` - <strong>C</strong>ontenido: este es un documento AMP que funciona como una página independiente a la que puede enlazarse directamente en algunas interfaces.
- `/v` - <strong>V</strong>isor: también es un documento AMP, pero funciona en un [Visor de AMP](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) que es un marco en el entorno que se muestra en un documento de AMP en el contexto de una página para buscar resultados u otra interfaz.
- `/wp` - <strong>P</strong>aquete <strong>W</strong>eb: este es un documento de AMP que se utiliza como un [Intercabio de claves o firmas](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), una tecnología del Paquete Web. Estas URL se ejecutan como redireccionamientos al origen del propio editor.
- `/cert` - <strong>Cert</strong>ificado: este es un certificado público para utilizarse con un [Intercabio de claves o firmas](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>magen: esta es una imagen que proporciona el caché de AMP, generalmente como un recurso secundario de un documento.
- `/ii` - <strong>I</strong>magen: esta también es una imagen que proporciona el caché de AMP, pero normalmente se puede combinar con otros parámetros en la configuración del caché como `/ii/w800` en la cual se expresa un ancho máximo que se solicita en el documento. En el caché se pueden producir imágenes con una escala diferente para ahorrar ancho de banda para un navegador.

Además, en el caché de AMP se puede elegir anexar parámetros especiales de consulta para la URL del documento que no forman parte de la consulta del documento del editor. Por ejemplo, en [`<amp-live-list>`](../../../components/reference/amp-live-list.md) se llevan a cabo solicitudes de actualización al buscar un documento con el parámetro `amp_latest_update_time<`. Estos parámetros no se adoptan en el origen cuando se rastrea el documento, pero están estrictamente presentes para configurar la solicitud en el caché de AMP.

## Orígenes de CORS

Muchos editores utilizan solicitudes de CORS desde su documento de AMP para recuperar datos adicionales. Las solicitudes de CORS funcionan enviando un encabezado HTTP `Origin:` a la solicitud en la que se especifica el origen del documento que lleva a cabo la solicitud. Como se mencionó anteriormente, el origen del documento es diferente en un caché de AMP comparado con el documento original. En las secciones de nombres de dominio anteriores, puede encontrar el algoritmo para determinar el origen de una URL en el caché de AMP proporcionada por una URL del editor. A continuación, especificamos el algoritmo inverso para descifrar una solicitud que regresa desde el encabezado `Origin:` de CORS a un dominio del editor original.

### Desde el origen del caché de AMP al dominio del editor

Un valor del encabezado para el origen del caché de AMP se verá como uno de los siguientes ejemplos:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

En primer lugar, elimine el prefijo del protocolo (`https://`) y el sufijo del dominio para el caché de AMP, por ejemplo `.cdn.ampproject.org`. El sufijo puede ser cualquiera de los cachés que se muestran en la lista de los [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). La cadena restante será el “prefijo del dominio”. En el caso de los dos ejemplos anteriores, el “prefijo del dominio” es:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

En seguida, verifique si el “prefijo del dominio” incluye al menos un ‘`-`’ (guion). Si uno o más guiones son, cuando mucho, el caso más común. Si el “prefijo del dominio” no incluye al menos un ‘`-`’ (guion), el origen del caché de AMP no puede modificarse directamente. En cambio, si conoce el conjunto de posibles dominios del editor, puede crear el conjunto de orígenes del caché de AMP utilizando el algoritmo con el nombre del dominio que se encuentra más arriba en este documento. A continuación, puede validar contra el conjunto fijo.

En el resto del algoritmo se asume que el “prefijo del dominio” incluye al menos un ‘`-`’ (guion).

1. Si el prefijo del dominio comienza con `xn--`, punycode decodifica el “prefijo del dominio”. Por ejemplo `xn---com-p33b41770a` se convierte en `⚡😊-com`. Consulte el [RFC 3492](https://tools.ietf.org/html/rfc3492) para punycode.
2. Si el prefijo del dominio comienza con "`0-`" y termina con "`-0`", elimine tanto el prefijo "`0-`" como el sufijo "-0".
3. Itere a través de los caracteres generados en orden en el Paso 2, emítalos como los encuentre. Cuando encuentre un "`-`" (guion), dé un vistazo al siguiente carácter. Si el siguiente carácter también es un "`-`" (hyphen), (guion), omita ambos caracteres de la entrada y emita un solo "`-`" (guion). Si el siguiente carácter es cualquier otro carácter, omita solo el actual "`-`" (guion) y emita un "`.`" (punto). Por ejemplo, `a--b-example-com` se convierte en `a-b.example.com`.
4. Punycode codifica el resultado del paso 3. Consulte el [RFC 3492](https://tools.ietf.org/html/rfc3492) para punycode.

El resultado del paso 4 será el dominio del editor. El protocolo no está disponible en el propio dominio, ya sea `http` o `https`. El puerto siempre está predeterminado para el protocolo.

## Redireccionamiento y administración de errores

Más adelante, se muestran algunos ejemplos de cómo el caché de AMP administra los redireccionamientos y los errores:

**Redireccionamientos**

El caché de AMP continúa con los redireccionamientos después de reparar las URL de AMP. Por ejemplo, si una URL redirige a otra URL AMP:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Después, el caché de AMP devolverá el contenido del redireccionamiento reparado para la URL original.

Ejemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Importante: si cambia la ubicación de los archivos de AMP en su servidor, asegúrese de configurar redireccionamientos desde la ubicación anterior a la nueva.

**No encontrado**

Cuando una página no se encuentra en el caché de AMP, se mostrará una página de error y devolverá un estado 404.

Ejemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**AMP no válido**

Cuando una página de AMP no es válida, el caché de AMP lo redirigirá a la página canónica.

Ejemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Errores del servidor**

Si una URL devuelve un error en el servidor 5XX, el caché de AMP devolverá un estado 404.

Ejemplo: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
