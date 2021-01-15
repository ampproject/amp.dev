---
"$title": Cómo utilizar un optimizador de AMP
"$order": '2'
"$hidden": 'true'
description: Los optimizadores de AMP son herramientas que le permitirán optimizar el caché de AMP para su propio sitio. Es fundamental utilizar un optimizador de AMP para crear una gran experiencia en la página y cumplir con los Elementos básicos de la web. En esta guía se explica cuál es la mejor manera de utilizar un optimizador de AMP para mejorar sus páginas de AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Los optimizadores de AMP son herramientas que le permitirán optimizar el caché de AMP para su propio sitio. Es fundamental utilizar un optimizador de AMP para crear una gran [experiencia en la página](https://developers.google.com/search/docs/guides/page-experience) y cumplir con los [Elementos básicos de la web](https://web.dev/vitals/). Si desea obtener más información sobre cómo funciona un optimizador de AMP, consulte nuestra [Guía detallada sobre las optimizaciones de AMP](explainer.md).

## ¿AMP no está listo rápidamente?

Quizás esté pensando: un momento, ¿no se supone que AMP es rápido y ya está listo para utilizarse? Y estaría en lo cierto: el tiempo de ejecución de AMP está optimizado para trabajar a gran velocidad y todas las páginas AMP válidas se cargan rápidamente. Sin embargo, existen optimizaciones adicionales para mejorar el rendimiento que puede implementar en su servidor, las cuales le ayudarán a que el navegador cargue las páginas de AMP mucho más rápido.

En un principio, los cachés de AMP se alojaban en la mayoría de las páginas de AMP. Estos cachés realizaban optimizaciones adicionales en las páginas para garantizar una experiencia sólida para el usuario. Pero, con el tiempo, las páginas de AMP se vincularon con más espacios y los desarrolladores comenzaron a crear sitios web cada vez más completos con AMP. Por esta razón, el equipo de AMP comenzó a trabajar en los optimizadores de AMP para que cualquier persona pudiera alojar las páginas de AMP junto con su caché, como si estas funcionaran desde su propio origen.

## Cómo incorporar un optimizador de AMP

Hay tres formas de utilizar un optimizador de AMP:

1. Utilizar un generador de sitios o CMS que permita una integración con el optimizador incorporado.
2. Integrar un optimizador de AMP en su sistema de compilación o servidor.
3. Integrar un optimizador de AMP en su entorno de hosting.

### El CMS y los generadores de sitios

La mejor forma de publicar un AMP optimizado es mediante un generador de sitios o CMS que sea compatible con el optimizador integrado en AMP. En este caso, sus páginas de AMP se optimizarán automáticamente. Actualmente, los siguientes generadores de sitios y CMS que pueden integrarse con un optimizador de AMP son:

- [WordPress](https://wordpress.org/) mediante el [complemento AMP para WordPress](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) mediante el [complemento eleventy-amp](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Cómo integrar servidores o una compilación personalizada

También puede integrar un optimizador de AMP usted mismo. Hay varias implementaciones de código abierto que están disponibles en el optimizador de AMP:

- [Optimizador de AMP (Node.js)](node-amp-optimizer.md): es una librería basada en Node.js para generar un AMP optimizado. Consulte aquí nuestra guía de introducción en amp.dev. El equipo de AMP mantiene la implementación.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): es un puerto en Python para el optimizador de AMP Node.

El servidor y los sitios estáticos pueden realizar diferentes integraciones en las páginas que se renderizaron de forma dinámica, por ejemplo:

1. El **tiempo de compilación**: en el caso de los sitios web estáticos, lo mejor es optimizar las páginas de AMP que forman parte de las compilaciones. Este es el enfoque ideal, ya que la optimización de las páginas de AMP no afecta el rendimiento para realizar publicaciones. Consulte [este ejemplo para obtener un optimizador de AMP más un integrador Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. El **tiempo de renderizado**: si los sitios web cuentan con propiedades más dinámicas o no pueden implementar las transformaciones de forma estática, la optimización puede realizarse después de que los documentos de AMP se rendericen en el servidor. En ese caso, para garantizar que los tiempos de publicación sean más rápidos, es mejor que las páginas transformadas se almacenen en el caché para satisfacer las solicitudes que se lleven a cabo posteriormente. El almacenamiento en el caché puede efectuarse a nivel de la CDN, en la infraestructura interna del sitio (por ejemplo, Memcached) o incluso en el servidor mismo, si el conjunto de páginas es lo suficientemente pequeño como para colocarse en la memoria. Para obtener más información sobre este enfoque, consulte[esta demostración en la que se integra el optimizador de AMP con Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integraciones con los proveedores de Hosting

Algunos proveedores de hosting permiten la ejecución de lógicas personalizadas cuando implementan o publican páginas web. Esta podría ser una excelente opción para integrar un optimizador de AMP. Algunos ejemplos de estas integraciones son los siguientes:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([próximamente](https://github.com/ampproject/amp-toolbox/issues/878))
- Una imagen de Docker con el optimizador de AMP ([próximamente](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
