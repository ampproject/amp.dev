---
'$title': Integración con AMP para publicar anuncios de display
$order: 5
description: En esta guía se muestran los pasos que se deben seguir para integrar AMP y publicar anuncios de display en páginas AMP.
formats:
  - ads
---

En esta guía se muestran los pasos que se deben seguir para integrar AMP y publicar anuncios de display en páginas AMP.

## Descripción general

Como servidor de anuncios, puede integrar AMP para publicar anuncios HTML tradicionales en páginas AMP, y también publicar anuncios [AMP HTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### ¿Desea publicar anuncios HTML tradicionales?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### ¿Desea publicar anuncios AMP HTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (es decir, si todavía no ha creado ninguno para publicar anuncios HTML tradicionales).
2. [Cree una integración Fast Fetch para publicar anuncios AMP HTML](#creating-a-fast-fetch-integration).

## Creación de un `amp-ad` <a name="creating-an-amp-ad"></a>

Como servidor de anuncios, los editores admitidos incluyen una biblioteca JavaScript proporcionada por usted (el servidor) y colocan distintos "fragmentos de anuncios" que se basan en la biblioteca JavaScript para obtener anuncios y renderizarlos en el sitio web del editor. Dado que AMP no permite que los editores ejecuten JavaScript de forma arbitraria, debe aportar el código AMP (de código abierto) para permitir que la etiqueta [`amp-ad`](../../../documentation/components/reference/amp-ad.md) solicite anuncios de su servidor de anuncios.

[tip type="tip"] <strong>NOTA:</strong> Puede utilizar esta implementación [`amp-ad`](../../../documentation/components/reference/amp-ad.md) para mostrar anuncios HTML tradicionales **y** anuncios AMP HTML. [/tip]

Por ejemplo, puede invocar el servidor A9 de Amazon con esta sintaxis:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

En este código, el atributo `type` especifica la red publicitaria, que en este caso es A9. Los atributos `data-*` dependen de los parámetros que el servidor A9 de Amazon espera para publicar un anuncio. El archivo [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) muestra cómo se asignan los parámetros para hacer una llamada JavaScript a la URL del servidor A9. Los parámetros correspondientes dados por la etiqueta [`amp-ad`](../../../documentation/components/reference/amp-ad.md) se agregan a la URL para devolver un anuncio.

Para obtener más información sobre cómo crear una integración [<code>amp-ad</code>](https://github.com/ampproject/amphtml/blob/master/ads/a9.js), consulte <a>Cómo integrar redes publicitarias a AMP</a>.

## Creación de una integración Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](../../../documentation/components/reference/amp-ad.md) es un mecanismo AMP que separa la solicitud de anuncio de la respuesta de anuncio, lo que permite que las solicitudes de anuncios se produzcan antes en el ciclo de vida de la página y solo se rendericen los anuncios cuando es probable que los usuarios los vean. Fast Fetch ofrece un trato preferencial a los anuncios AMP HTML verificados por delante de los anuncios HTML tradicionales. En Fast Fetch, si un anuncio no pasa la validación, se incluye en un iframe multidominio para enviarlo a la zona de pruebas y separarlo del resto del documento AMP. En cambio, un anuncio AMP HTML que pasa la validación se incluye directamente en la página. Fast Fetch administra tanto anuncios AMP como anuncios no AMP. Los anuncios que no pasan la validación no requieren solicitudes de anuncios adicionales.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Flujo de integración de Fast Fetch', caption='Flujo de integración de Fast Fetch' ) }}

Para publicar anuncios AMPHTML desde su servidor de anuncios, debe proporcionar una integración Fast Fetch que incluya lo siguiente:

1. Comunicación de red compatible con SSL.
2. JavaScript para crear la solicitud de anuncio (ejemplos de implementaciones: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) y [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Creatividad validada y firmada con un servicio de validación. [Cloudflare](https://blog.cloudflare.com/firebolt/) proporciona un servicio de verificación de anuncios AMP, que permite que cualquier proveedor de anuncios independiente publique anuncios más atractivos de forma más rápida y ligera.

Para obtener instrucciones sobre la creación de una integración Fast Fetch, consulte la <a>Guía de Implementación de la Red Fast Fetch</a>.

## Recursos relacionados

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Lista de proveedores de anuncios compatibles](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Entrada de blog que describe el lanzamiento de Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
