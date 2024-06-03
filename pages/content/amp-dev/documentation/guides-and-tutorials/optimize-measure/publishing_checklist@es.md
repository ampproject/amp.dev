---
'$title': Listas de verificación para las publicaciones de AMP
$order: 0
description: El diseño web adaptable consiste en crear páginas web fluidas que respondan a las necesidades de su usuario, es decir, páginas que se adapten al tamaño y la orientación de la pantalla de su dispositivo. Puede lograr ...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

¡Siga esta lista de verificación para darle a su sitio la experiencia más completa con AMP!

# Cómo garantizar la validación de la especificación de AMP

AMP incluye una gran cantidad de beneficios, como la reducción del tiempo de espera del usuario al cargar previamente el contenido desde los Cachés de AMP. Para obtener estos beneficios, las páginas deben ser documentos válidos de AMP. Las páginas que se hayan publicado con errores reportados por el validador AMP no pueden indexarse por los Cachés de AMP y posiblemente se presenten como páginas de error.

Nunca publique una página AMP inválida nuevamente utilizando estas herramientas:

- [Validar las páginas AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [El validador AMP](https://validator.ampproject.org/)
- [El verificador de Google AMP](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Las herramientas de AMP](../../../documentation/tools.html?format=websites)

# Cómo permitir el acceso al servidor de las páginas que se almacenaron en el Caché de AMP

Hay excelentes noticias, ¡las páginas AMP que son válidas automáticamente son elegidas por todos los Cachés de AMP actuales! Esto quiere decir que sus usuarios experimentarán un contenido que se carga de forma eficiente y segura. Este tipo de optimizaciones son geniales, pero tienen un pequeño inconveniente. Algunos usuarios se alojarán en páginas AMP de dominios que no coincidan con el suyo. Esto puede provocar que las páginas pierdan el acceso a los datos del sitio cuando utilicen componentes dinámicos de AMP como [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) o [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Este tipo de errores son problemas con el Intercambio de recursos de origen cruzado, o CORS. ¡Trabaje con seguridad, no en contra de ella, al habilitar las solicitudes CORS en todos los [Cachés de AMP](https://cdn.ampproject.org/caches.json) que estén disponibles! Si está utilizando Node.js en su backend, puede usar el [middleware amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Si desea obtener más información sobre cómo permitir el acceso al servidor, consulte los siguientes documentos:

- [Cómo se almacenan en el caché las páginas AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [El CORS en AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [El middleware de AMP en CORS ](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) para Node.js

# Contenidos seguros y que se comparten con los intercambios firmados

Conserve la URL de su dominio y simplifique los análisis cuando comparta contenido mediante intercambios firmados (SXG). Cuando se alojan en páginas AMP con SXG, las firmas digitales protegen su información al vincular el documento con la URL que lo solicitó. En este comportamiento se manejan las sesiones de usuario y las cookies como si fueran las primeras partes, cerrando de esta manera las posibles deficiencias en el análisis. Durante la implementación de los SXG el contenido de AMP se entrega como un complemento firmado, en vez del contenido habitual de AMP.

Si desea obtener más información sobre la implementación de los intercambios firmados, consulte los siguientes documentos:

- [Cómo obtener los servicios de AMP mediante intercambios firmados](signed-exchange.md?format=websites)
- [Los Intercambios firmados de HTTP](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [La URL AMP real de Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Intercambios firmados para mejores URL de AMP y análisis más sencillos (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Cómo verificar las páginas que se almacenaron en el caché

Los cachés de AMP almacenan imágenes, fuentes y contenido de la página para brindarle servicios con su contenido a los usuarios siempre que los soliciten. Por esta razón es importante verificar que sus páginas AMP puedan visualizarse y funcionen como se espera cuando proporcionan servicios desde un Caché de AMP.

Cuando agregue páginas AMP a un Caché de AMP, verifique que las [ herramientas de desarrollo de su navegador](https://developers.google.com/web/tools/chrome-devtools/) puedan cargarse para todos los recursos externos. Aquí hay una lista que debe tener presente:

- imágenes
- videos
- endpoints de amp-analytics
- endpoints de amp-pixel
- fuentes personalizadas
- iframes

Obtenga más información sobre los Cachés de AMP:

- [Cómo utilizar el caché AMP de Google](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP en Google, caché AMP de Google](https://developers.google.com/amp/cache/overview)
- [Depuración de problemas en el Caché de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Administración de solicitudes y formato URL para el caché de AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Asegúrese de que los motores de búsqueda puedan encontrar sus archivos AMP

Las páginas solo se crean en AMP (AMP first) y las páginas con doble AMP (AMP emparejado) deben garantizar que puedan encontrarse. Todas las páginas AMP necesitan el `<link rel="canonical" href="$ SOME_URL">` en su `<head>`. Las primeras páginas AMP deben vincularse a sí mismas, y las páginas AMP que estén emparejadas con una página que no sea de AMP deberán vincularse entre sí.

¡Asegúrese de que sus metadatos en [Schema.org](https://schema.org/) agreguen información útil! Otros sitios y motores de búsqueda podrían necesitar esto para compartir su contenido.

Rastreador, wanderer, indizador o araña web, son todos los nombres de los programas que se utilizan para buscar contenido. Estos recorren la web, permitiendo que los motores de búsqueda indexen el contenido de la web para que las consultas de los usuarios arrojen los resultados correctos. Asegúrese de que los buscadores puedan encontrar su sitio incluyendo las instrucciones adecuadas en el archivo `robots.txt` y configure los encabezados que sean apropiados.

NO excluya a los indizadores mediante su archivo [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

NO agregue una metaetiqueta `noindex` para los rastreadores a sus archivos AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

NO incluya `noindex` como encabezado HTTP de X-Robots-Tag para sus archivos AMP.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Aprenda cómo hacer que sus páginas sean encontradas:

- [Haga que su página pueda encontrarse](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Especificaciones de la metaetiqueta robots y el encabezado HTTP X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [Preguntas frecuentes sobre la indexación en AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Cómo medir el tráfico y la experiencia de los usuarios

Recopilar las métricas correctas es fundamental para realizar análisis que sean útiles. Cuando compruebe cómo la introducción de AMP en su sitio repercute en los usuarios, asegúrese de que está midiendo las cosas correctas. Si los análisis no toman en cuenta las diferencias que AMP puede generar, podrían surgir los falsos negativos, falsos positivos o resultados irrelevantes. ¡Asegúrese de que comprende cuáles son las cosas que busca y cómo puede medirlas!

Si desea obtener más información sobre cómo configurar los análisis adecuados para AMP, consulte los siguientes documentos:

- [Entonces su verificación de AMP no funciona... ¿qué puede hacer ahora?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Análisis del caché vs. lo que no está en el caché](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Cómo medir la experiencia de los usuarios mediante su sitio web y el caché de AMP](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Cómo medir el éxito: cuáles son las novedades en los análisis y experimentos de AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Intercambios firmados para mejores URL de AMP y análisis más sencillos (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
