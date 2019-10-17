---
$title: Integrar AMP para publicar anuncios de display
---

En esta guía se exponen los pasos que se deben seguir para integrar redes publicitarias en AMP y así publicar anuncios de display en páginas AMP.

## Descripción general

Como servidor de anuncios, puedes integrar AMP para publicar anuncios HTML tradicionales en páginas AMP, así como publicar anuncios [AMP HTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### ¿Quieres publicar anuncios HTML tradicionales?

1.  [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### ¿Quieres publicar anuncios AMP HTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (es decir, si todavía no has creado ninguna para publicar anuncios HTML tradicionales).
2. [Crea una integración Fast Fetch para publicar anuncios AMP HTML](#creating-a-fast-fetch-integration).

## Crear una implementación `amp-ad` <a name="creating-an-amp-ad"></a>

Como servidor de anuncios, los editores admitidos incluyen una biblioteca JavaScript proporcionada por ti (el servidor) y colocan distintos "fragmentos de anuncios" que se basan en la biblioteca JavaScript para obtener anuncios y renderizarlos en el sitio web del editor. Dado que AMP no permite que los editores ejecuten JavaScript de forma arbitraria, deberás aportar el código AMP (de código abierto) para permitir que la etiqueta [`amp-ad`](../../../documentation/components/reference/amp-ad.md) solicite anuncios de tu servidor de anuncios.

[tip type="note"]
Puedes utilizar esta implementación [`amp-ad`](../../../documentation/components/reference/amp-ad.md)  para mostrar anuncios HTML tradicionales **y** anuncios AMP HTML.
[/tip]

Por ejemplo, se puede invocar el servidor A9 de Amazon con esta sintaxis:

'''html
<amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
'''

En este código, el atributo "type" especifica la red publicitaria, que en este caso es A9. Los atributos "data-*" dependen de los parámetros que el servidor A9 de Amazon espera para publicar un anuncio. El archivo ['a9.js'](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) te muestra cómo se asignan los parámetros para hacer una llamada JavaScript a la URL del servidor A9. Los parámetros correspondientes dados por la etiqueta [`amp-ad`](../../../documentation/components/reference/amp-ad.md) se añaden a la URL para devolver un anuncio.

Para obtener más información sobre cómo crear una integración [`amp-ad`](../../../documentation/components/reference/amp-ad.md), consulta [Integrar redes publicitarias a AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Crear una integración Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) es un mecanismo AMP que separa la solicitud de anuncio de la respuesta de anuncio, lo que permite que las solicitudes de anuncios se produzcan antes en el ciclo de vida de la página y solo se rendericen los anuncios cuando es probable que los usuarios los vean. Fast Fetch ofrece un trato preferencial a los anuncios AMP HTML verificados por delante de los anuncios HTML tradicionales. En Fast Fetch, si un anuncio no pasa la validación, se incluye en un iframe multidominio para enviarlo a la zona de pruebas y separarlo del resto del documento AMP. En cambio, un anuncio AMP HTML que pasa la validación se incluye directamente en la página. Fast Fetch gestiona tanto anuncios AMP como anuncios no AMP; los anuncios que no pasan la validación no requieren solicitudes de anuncios adicionales.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Flujo de integración de Fast Fetch', caption='Flujo de integración de Fast Fetch' ) }}

Para publicar anuncios AMP HTML desde tu servidor de anuncios, debes proporcionar una integración Fast Fetch que incluya lo siguiente:

1.  Comunicación de red compatible con SSL.
1.  JavaScript para crear la solicitud de anuncio (implementaciones de ejemplo: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) y [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
1.  Creatividad validada y firmada con un servicio de validación. [Cloudflare](https://blog.cloudflare.com/firebolt/) proporciona un servicio de verificación de anuncios AMP, que permite que cualquier proveedor de anuncios independiente publique anuncios más atractivos de forma más rápida y ligera.

## Recursos relacionados

*   [Directorio GitHub de todas las extensiones amp-ad](https://github.com/ampproject/amphtml/tree/master/ads)
*   [Lista de los proveedores de anuncios compatibles](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
*   [Entrada de blog que describe el lanzamiento de Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
