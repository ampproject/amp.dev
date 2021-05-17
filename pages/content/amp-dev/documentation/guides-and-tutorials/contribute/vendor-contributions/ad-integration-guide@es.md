---
'$title': Cómo integrar sus tecnologías para crear anuncios en AMP
$order: 3
formats:
  - ads
teaser:
  text: Si usted es un proveedor de tecnología publicitaria y busca integrarse con AMP HTML, consulte las siguientes recomendaciones.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Si usted es un proveedor de tecnología publicitaria y busca integrarse con AMP HTML, consulte las siguientes recomendaciones. Para garantizar el mínimo de latencia y mayor calidad, siga las instrucciones que se muestran [aquí](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads) antes de enviar una solicitud de validación para el proyecto con código abierto de AMP. Si desea obtener indicaciones generales sobre cómo comenzar a colaborar con AMP, consulte [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/ads/../docs/contributing.md).

## Servidor de anuncios <a name="ad-server"></a>

_Ejemplos : DFP, A9_

Al igual que un servidor de anuncios, los editores que son compatibles incluyen una biblioteca de JavaScript que usted proporcionó y colocan varios “fragmentos de anuncios”, los cuales dependen de la biblioteca de JavaScript para buscar anuncios y renderizarlos en el sitio web del editor.

Debido a que AMP no permite que los editores ejecuten JavaScript de manera arbitraria, usted deberá contribuir con el código del código abierto de AMP para permitir que la etiqueta `amp-ad` solicite anuncios desde su servidor de anuncios.

Por ejemplo: puede invocarse al servidor Amazon A9 mediante la siguiente sintaxis:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Tenga en cuenta que cada uno de los atributos que se escriban después de `type` dependen de los parámetros que el servidor A9 de Amazon espera para enviar un anuncio. En el archivo [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) se muestra cómo deben asignarse los parámetros para realizar una llamada de JavaScript que invoque al servidor A9 mediante la URL `https://c.amazon-adsystem.com/aax2/assoc.js`. Los parámetros correspondientes que son aprobados por la etiqueta del anuncio de AMP se adjuntan a la URL para devolver un anuncio.

Para obtener más información sobre cómo integrar su red de anuncios con AMP, consulte [Cómo integrar redes de anuncios en AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Plataforma del lado de la oferta (SSP) o Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Ejemplos : Rubicon, Criteo o AppNexus, Ad-Exchange_

Si tiene una plataforma del lado de la oferta que desea ser llamada directamente desde la página web de un editor, deberá seguir las mismas instrucciones que se mostraron anteriormente para la integración con un Servidor de anuncios. Cuando agrega su propio valor de `type` a la etiqueta amp-ad esto le permite distribuir su etiqueta directamente con el editor, de modo que puedan insertar sus etiquetas directamente en sus páginas de AMP

Cada vez es más frecuente que las SSP trabajen en colaboración con el editor para traficar las etiquetas con anuncios de las SSP en su servidor de anuncios. En este caso, asegúrese de que todos los activos que su script está cargando en el servidor de anuncios creativo se realizan mediante HTTPS. Existen algunas restricciones en torno a algunos formatos de anuncios, como los expandibles, de modo que le recomendamos probar los formatos creativos que se entregan más frecuentemente con sus editores.

## Agencia de publicidad <a name="ad-agency"></a>

_Ejemplos : Essence, Omnicom_

Trabaje con su editor para garantizar que los creativos que usted desarrolle sean compatibles con AMP. Debido a que todos los creativos se ofrecen en iframes cuyo tamaño se determina cuando el anuncio es llamado, asegúrese de que sus creativos no intenten modificar el tamaño del iframe.

Asegúrese de que todos los activos que son parte de los creativos se soliciten utilizando HTTPS. Por el momento, algunos formatos de anuncios no son totalmente compatibles y le recomendamos probar los creativos en un entorno de AMP. Algunos ejemplos son: Rich Media expandibles, intersticiales, anuncios a nivel de página.

## Reproductor de video <a name="video-player"></a>

_Ejemplos : Brightcove, Ooyala_

Un reproductor de video que funciona en las páginas HTML normales no funcionará en AMP y, por lo tanto, debe crearse una etiqueta específica que permita al AMP Runtime cargar su propio reproductor. Brightcove creó una etiqueta [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md) personalizada, la cual permite reproducir contenido multimedia y anuncios en las páginas de AMP.

Un reproductor de Brightcove puede invocarse mediante las siguientes líneas:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Para obtener instrucciones sobre cómo desarrollar una etiqueta de amp similar a la de Brightcove, consulte [esta solicitud de validación](https://github.com/ampproject/amphtml/pull/1052).

## Red de anuncios de video <a name="video-ad-network"></a>

_Ejemplos : Tremor, Brightroll_

Si es parte de una red de anuncios de video, trabaje en colaboración con su editor para garantizar que:

- Todos los activos de video se ofrecen mediante HTTPS
- El reproductor de video del editor es compatible con AMP

## Plataforma para la administración de datos (DMP) <a name="data-management-platform-dmp"></a>

_Ejemplos : KRUX, Bluekai_

Consulte [cómo mejorar la configuración de anuncios personalizada](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Puede utilizar un enfoque similar para mejorar las llamadas de los anuncios. Para ello, utilice la aprobación de la audiencia con los segmentos que se obtienen a partir de las cookies que generan los usuarios durante las llamadas de los anuncios.

## Proveedor de visibilidad <a name="viewability-provider"></a>

_Ejemplos : MOAT, Integral Ad Science_

Los proveedores de visibilidad generalmente se integran con los editores mediante los contenedores de creativos que se encuentran en el servidor de anuncios. Si ese es el caso, asegúrese de que el contenedor de creativos cargue todos los activos mediante HTTPS.

Por ejemplo, para MOAT, asegúrese de que `http://js.moatads.com` se haya modificado por `https://z.moatads.com`

Además, consulte el enfoque para utilizar el [patrón de observación de la intersección](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## Plataforma para recomendación de contenido <a name="content-recommendation-platform"></a>

_Ejemplos : Taboola, Outbrain_

Esta es útil si actualmente tiene alguna pieza de JavaScript incrustada en el sitio web del editor, pero el enfoque no funcionará en las páginas de AMP. Si desea recomendar contenido en una página de AMP, le sugerimos que utilice la [extensión](https://amp.dev/documentation/components/amp-ad) `amp-embed` para solicitar información sobre el contenido. Consulte el ejemplo de [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
