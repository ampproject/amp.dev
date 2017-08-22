---
$title: Descripción general de Accelerated Mobile Pages

cta:
  title: Next FAQ
  link_text: Participación de plataformas y empresas tecnológicas
  link_url: /content/support/faqs/platform-involvement.md

faq:
  - title: ¿Qué es el proyecto Accelerated Mobile Pages?
    answer: |
      El proyecto Accelerated Mobile Pages ("AMP") es una iniciativa de software libre que surge de los debates entre editores y empresas tecnológicas sobre la necesidad de mejorar el ecosistema de contenido móvil en su conjunto para todos: editores, plataformas de consumidores, anunciantes, creadores y usuarios.

      Hoy en día, se espera que el contenido de las páginas web se cargue muy rápido y que la navegación sea sencilla. En realidad, sin embargo, el contenido puede tardar varios segundos en cargarse o puede no llegar a cargarse completamente porque los usuarios abandonan las páginas lentas. Las páginas Accelerated Mobile Pages son páginas web diseñadas para cargarse casi instantáneamente, en un paso más hacia una Web móvil mejor para todo el mundo.
  - title: ¿Cuáles son las ventajas de Accelerated Mobile Pages?
    answer: |
      Nos importa la velocidad; la inmediatez es el objetivo. Las investigaciones han demostrado que los porcentajes de rebote son más altos en páginas web que se cargan más lentamente. El uso del formato AMP fomentará que los usuarios consuman más contenido e interaccionen con él. Pero no solo se trata de velocidad y rendimiento. También queremos promover una distribución mejorada para que los editores y los anunciantes puedan aprovechar el potencial de la web abierta para que su contenido aparezca rápidamente en todas partes, en plataformas y aplicaciones, lo que puede generar más ingresos.
  - title: ¿Cómo funciona Accelerated Mobile Pages?
    answer: |
      Las páginas Accelerated Mobile Pages funcionan como cualquier otra página HTML, pero solo admiten un conjunto limitado de funcionalidades técnicas que se define en las especificaciones de AMP de software libre y que se rige por estas mismas especificaciones. Igual que todas las páginas web, Accelerated Mobile Pages se cargará en todos los navegadores modernos y en todas las vistas web de aplicaciones.

      Los archivos de AMP se benefician de diferentes enfoques técnicos y arquitectónicos que priorizan la velocidad para proporcionar una experiencia más rápida para los usuarios. Los desarrolladores de AMP pueden utilizar una biblioteca rica y cada vez más completa de componentes web que ofrecen la posibilidad de insertar objetos rich media, como vídeo y publicaciones en redes sociales, mostrar publicidad o recopilar análisis. El objetivo no es homogeneizar la forma en que se ve y se percibe el contenido, sino crear un núcleo técnico más común entre las páginas que acelere el tiempo de carga.

      Además, los archivos de AMP pueden almacenarse en caché en la nube, de modo que se reduce el tiempo necesario para que el contenido llegue a los dispositivos móviles de los usuarios. Al utilizar el formato AMP, los editores y los anunciantes ponen los archivos de AMP a disposición de terceros para que los almacenen en caché. En estas circunstancias, los editores siguen controlando su contenido, pero las plataformas pueden almacenar el contenido fácilmente en caché o reproducirlo para que la velocidad de publicación sea óptima para los usuarios. Google ofrece una caché que puede utilizar todo el mundo sin coste alguno, se trata de [Google AMP Cache](https://developers.google.com/amp/cache/) donde almacenamos todas las páginas AMP. Otras empresas también pueden crear su propia caché de AMP.

      En resumen, el objetivo de este proyecto es combinar una funcionalidad técnica limitada con un sistema de distribución creado en torno al almacenamiento en la memoria caché para ofrecer páginas con un mayor desarrollo de la audiencia.
  - title: ¿Por qué se utiliza software libre en el proyecto Accelerated Mobile Pages?
    answer: |
      Las empresas que participan en el proyecto quieren que la Web móvil funcione mejor para todo el mundo, no solo para una plataforma, un conjunto de tecnologías, un conjunto de editores, o un conjunto de anunciantes. Al crear el proyecto con software libre, los usuarios pueden compartir y aportar ideas y código para conseguir una Web móvil más rápida. Acabamos de iniciar este recorrido, en el que esperamos que se unan otros editores, anunciantes y empresas tecnológicas.
  - title: ¿Quién puede usar Accelerated Mobile Pages?
    answer: |
      El proyecto está abierto a todas las partes del ecosistema: editores, plataformas de consumidores, anunciantes y creadores. Para hacerte una idea de quiénes son algunas de las empresas y de los sitios web que utilizan AMP, ve a la [página Plataformas, proveedores y socios](/es/support/faqs/supported-platforms.html).
  - title: ¿Cuáles son las consecuencias de utilizar Accelerated Mobile Pages?
    answer: |
      Al utilizar el formato AMP, los creadores de contenidos ponen los archivos de AMP a disposición de terceros para que los rastreen, los indexen y los muestren (de conformidad con el protocolo de exclusión de robots) y los almacenen en caché.
  - title: ¿Qué responsabilidades tengo cuando uso páginas móviles aceleradas?
    answer: |
      Si un editor o anunciante recoge datos de usuarios que ven sus páginas de AMP, dicha recopilación de datos se rige por su política de privacidad. Es responsabilidad del editor o del anunciante divulgar su política de privacidad, idealmente incluyendo un acoplamiento a ella dentro de cada una de sus páginas de AMP.

      Además, las leyes de muchas jurisdicciones, como la de la Unión Europea, requieren un sitio web para dar a los visitantes información sobre cookies y otras formas de almacenamiento local utilizadas en el sitio (incluidas las páginas AMP). En muchos casos, estas leyes también requieren que el sitio web obtenga su consentimiento. Es responsabilidad del sitio web determinar, sobre la base de su uso de cookies, qué tipo de notificación sería apropiado. Información adicional y herramientas para generar avisos de cookies se pueden encontrar en www.cookiechoices.org. Tenga en cuenta que el componente [amp-user-notification](/docs/reference/components/amp-user-notification.html) proporciona una forma de mostrar una notificación descartable al usuario.
  - title: ¿Qué tipo de contenido funciona mejor con Accelerated Mobile Pages?
    answer: |
      El objetivo es que todo el contenido publicado, desde noticias hasta vídeos y desde blogs hasta fotos y GIFs, funcionen con Accelerated Mobile Pages.
  - title: Como editor, ¿me llevará más trabajo hacer que mi contenido funcione con Accelerated Mobile Pages?
    answer: |
      De entrada, no mucho. Como "AMP HTML" está formado en su totalidad por tecnologías web existentes, el proceso de desarrollo reproduce el que los editores y anunciantes están utilizando en la actualidad. Los editores y anunciantes pueden familiarizarse con AMP HTML en GitHub. Creemos que los que ya utilicen el proceso actual no encontrarán difícil este aprendizaje.
  - title: ¿Cómo puede un editor o anunciante generar contenido en AMP HTML?
    answer: |
      Los editores y los proveedores de sistemas de gestión de contenido (CMS) pueden desarrollar una integración para generar contenido de AMP con su CMS. Automattic ya ha publicado un [complemento de AMP para WordPress](https://wordpress.org/plugins/amp/), y esperamos que todos los sistemas de gestión de contenido ofrezcan compatibilidad con las páginas AMP HTML.
  - title: AMP ¿Es sólo para moviles?
    answer: |
      AMP fue diseñado con la capacidad de respuesta en mente, para trabajar en *todos* los tamaños de pantalla. Sin embargo, algunas funciones para plataformas de terceros (por ejemplo, Carrusel de Top Stories de Google) sólo se pueden diseñar para la experiencia móvil. Consulte con la plataforma de terceros para saber cómo utilizan AMP. Para obtener más información acerca de las páginas de AMP para dispositivos móviles y de escritorio, vea el artículo de Paul Bakaus [About that ‘mobile’ in Accelerated Mobile Pages](https://paulbakaus.com/2016/07/01/about-that-mobile-in-accelerated-mobile-pages/).
---
