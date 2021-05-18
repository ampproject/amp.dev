---
$title: Anuncios AMP HTML
---

## ¿Qué es un anuncio AMP HTML?

Los anuncios AMP HTML son la forma más rápida, ligera y segura de anunciarse en Internet. Aunque las páginas AMP los admiten, los anuncios HTML tradicionales pueden tardar más en cargarse. Para que los anuncios se carguen a la misma velocidad que el resto de la página AMP, puedes crearlos en formato AMP HTML. Los anuncios AMP HTML no se publican hasta que no se han validado para garantizar que son seguros y ofrecen un buen rendimiento. Y lo más importante: estos anuncios pueden publicarse en cualquier lugar de la Web, _no solo en páginas AMP_.

Los anuncios AMP HTML se escriben en lenguaje AMP HTML, de acuerdo con las [especificaciones de anuncios AMP HTML](a4a_spec.md), (una variante de AMP HTML y CSS). Esto significa que los anuncios ya no pueden ejecutar JavaScript de forma arbitraria, que suele ser la causa principal de que los anuncios ofrezcan un rendimiento deficiente. En consecuencia, los casos prácticos principales de anuncios JavaScript, al igual que los AMP más importantes, se desarrollan en el proyecto de software libre de AMP, lo que garantiza el buen rendimiento de los anuncios.

### Ventajas

¿Por qué los anuncios AMP HTML son mejores que los tradicionales?

1.  **Mayor velocidad:** los anuncios AMP HTML son más rápidos porque el proceso de renderizado de la página los solicita antes, y se muestran inmediatamente, justo en el momento previo a que el usuario vaya a ver el anuncio. El tamaño reducido del archivo de los anuncios AMP HTML también incrementa la velocidad.
1.  **Menor tamaño:** los paquetes de anuncios AMP HTML agrupan funciones habituales de anuncios, lo que reduce el tamaño del archivo del anuncio. Una vez en la página, estos anuncios también consumen menos recursos. Por ejemplo, mientras que en los anuncios tradicionales se utilizan 10 registradores para solicitar su propia información, los anuncios AMP HTML recopilan todos los datos una vez y los distribuyen a todos los registradores interesados.
1.  **Coordinación:** en las páginas AMP, el [tiempo de ejecución de AMP](spec/amphtml.md#amp-runtime) puede coordinar los recursos limitados de un teléfono móvil con el componente adecuado en el momento oportuno para ofrecer la mejor experiencia de usuario. Por ejemplo, los anuncios AMP HTML con animaciones se pausan cuando los anuncios no se muestran en la ventana gráfica actual.
1.  **Mayor interacción:** los usuarios no pueden interactuar con los anuncios que no ven. Unos anuncios más rápidos generan una mayor visibilidad y, por lo tanto, unos porcentajes de clics más altos y un mejor rendimiento de los anuncios.
1.  **Protección frente a software malicioso:** es imposible que el software malicioso afecte a los anuncios AMP HTML, porque se verifican antes de servirse. Gracias a esto, los anunciantes pueden garantizar una experiencia de usuario segura y una percepción positiva de su marca.
1.  **Mayor flexibilidad:** los anuncios AMP HTML se pueden utilizar en páginas web AMP y de otro tipo, así como en cualquier dispositivo.

### Formatos

Los anuncios AMP HTML son flexibles y dinámicos, lo que te permite utilizar diversos formatos de creatividad, como carrusel, paralaje y lightbox, entre otros. Para empezar a utilizar los anuncios AMP HTML, puedes usar las plantillas de software libre de [Examples](../../../documentation/examples/documentation/amp-ad.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carrusel</td>
    <td>Paralaje de vídeo</td>
    <td>Lightbox</td>
  </tr>
</table>

## Cómo funcionan los anuncios AMP HTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Servir anuncios AMP HTML en páginas AMP', caption='Servir anuncios AMP HTML en páginas AMP', align='' ) }}

1.  Los editores insertan un espacio publicitario en su página AMP mediante la etiqueta [`amp-ad`](../../../documentation/components/reference/amp-ad.md) para especificar la red publicitaria que quieren utilizar.
1.  El tiempo de ejecución de AMP envía una solicitud de anuncio a la red publicitaria especificada para recuperar el anuncio. Las redes publicitarias que admiten el servicio de anuncios AMP HTML proporcionan una [implementación de Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md) que valida y firma la creatividad.
1.  La red publicitaria responde con el anuncio AMP HTML y el tiempo de ejecución de AMP publica el anuncio en la página AMP.

## Servir anuncios AMP HTML

### Editores

Para publicar tus formatos de anuncio de venta directa en AMP HTML, debes crear los anuncios de acuerdo con las [especificaciones de AMP HTML](a4a_spec.md) y publicarlos mediante un servidor de anuncios compatible con el servicio de anuncios AMP HTML.  Estos son los servidores de anuncios que actualmente admiten el formato AMP HTML:

*   DoubleClick for Publishers
*   TripleLift
*   Dianomi
*   Adzerk
*   Google AdSense

Para publicar anuncios AMP HTML a través de canales indirectos (por ejemplo, intercambios de anuncios o plataformas de oferta, entre otros), utiliza [una red publicitaria o un servidor de anuncios compatibles](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Agencias de creatividades

Si tienes una agencia de creatividades, debes crear los anuncios de acuerdo con las [especificaciones de anuncios AMP HTML](a4a_spec.md). Para consultar ejemplos de este tipo de anuncios, utiliza las plantillas de software libre de [Examples](../../../documentation/examples/index.html). También puedes utilizar una de las siguientes herramientas para crear anuncios AMP HTML:

*  [Creador de anuncios de Celtra](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*disponible próximamente*)

### Redes publicitarias y servidores de anuncios

Para publicar anuncios AMP HTML en páginas AMP, debes crear una extensión [`amp-ad`](../../../documentation/components/reference/amp-ad.md) para tu red (a menos que ya tengas una), que utiliza la [implementación de solicitud de anuncio de Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).  Para obtener más información, consulta el artículo [Integración de AMP para publicar anuncios de display](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md).  Ten en cuenta que no se necesita ninguna integración especial para publicar anuncios AMP HTML en páginas que no sean AMP.

## Crear anuncios AMP HTML

**Desde cero:** estos anuncios deben seguir las [especificaciones de anuncios AMP HTML](a4a_spec.md).  Para consultar demostraciones y ejemplos de este tipo de anuncios, utiliza las plantillas de software libre de [AMP by Example](../../../documentation/examples/documentation/amp-ad.html).

**Con herramientas:** puedes utilizar cualquiera de las herramientas que se incluyen a continuación para desarrollar creatividades AMP HTML.

*  [Creador de anuncios de Celtra](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*disponible próximamente*)

### Validar la sintaxis de los anuncios AMP HTML

Después de crear el anuncio AMP HTML, debes asegurarte de que utiliza la sintaxis correcta. En función de tu entorno de desarrollo, puedes usar las siguientes opciones para validar los anuncios AMP HTML:

*   Utiliza el módulo del [validador de AMP de NPM](https://www.npmjs.com/package/amphtml-validator) para validar la integración en la CI de tu versión.
*   Utiliza el [validador de AMP](https://validator.ampproject.org/) para realizar pruebas específicas.
*   Utiliza el punto de conexión al validador público de [Cloudflare](https://blog.cloudflare.com/amp-validator-api/).

[tip type="note"]

Para que los anuncios AMP HTML se publiquen rápidamente en las páginas AMP (es decir, mediante el renderizado preferencial en Fast Fetch), la sintaxis debe ser correcta.  Si esta no es válida, el anuncio se seguirá publicando, pero no tan rápido.

[/tip]

## Compatibilidad de los anuncios AMP HTML en RTB

En el caso de las plataformas de oferta y los canales de intercambio de anuncios que quieran admitir anuncios AMP HTML en un entorno de puja en tiempo real (Real Time Bidding, RTB), consulta la [guía de implementación para intercambios de anuncios en RTB](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/RTBExchangeGuide.md) para obtener más información.

## Preguntas frecuentes

#### ¿Hay algún ejemplo de anuncios AMP HTML?

Sí. Puedes consultar una serie de magníficas plantillas de anuncios AMP HTML en [Examples](../../../documentation/examples/documentation/amp-ad.html). Estos ejemplos utilizan componentes avanzados de AMP.

#### ¿Los anuncios AMP HTML admiten la verificación de terceros y la detección de visibilidad?

Sí, [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md). También existen otros proveedores, como MOAT, que están trabajando de forma activa para ofrecer compatibilidad con estas funciones.

#### ¿Los anuncios AMP HTML admiten animaciones basadas en línea de tiempo?

Sí. Consulta [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### La mayoría de anuncios cuentan con objetivos que se pueden tocar y salidas que se pueden configurar. ¿Los anuncios AMP HTML utilizan un mecanismo parecido?

Sí. Consulta [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### No encuentro lo que necesito. ¿Dónde puedo resolver mis dudas?

*   [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) es la herramienta que recomendamos para encontrar respuestas a preguntas sobre AMP. Como los miembros de la comunidad del proyecto AMP supervisan Stack Overflow con regularidad, probablemente esta sea la forma más rápida de solucionar tus dudas.
*   Únete al canal [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) para encontrar soluciones y respuestas.
*   Si encuentras un error en AMP o tienes una solicitud de funciones para AMP, consulta la sección sobre [cómo notificar problemas con AMP](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#reporting-issues-with-amp) para obtener más información.
