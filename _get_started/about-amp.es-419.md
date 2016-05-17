---
layout: page
title: ¿Qué es AMP?
order: 0
locale: es-419
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP es una manera de compilar páginas web para contenido estático de representación rápida.
AMP en acción consta de tres partes diferentes:

{% include toc.html %}

**AMP HTML** es HTML con algunas restricciones para lograr un rendimiento confiable,
y con algunas extensiones para compilar contenido enriquecido más allá del formato HTML básico.
La biblioteca **AMP JS** garantiza la representación rápida de páginas AMP HTML.
El **Google AMP Cache** (opcional) proporciona las páginas AMP HTML.

## AMP HTML

AMP HTML es básicamente contenido HTML ampliado con propiedades AMP personalizadas.
El archivo en AMP HTML más sencillo tiene el siguiente aspecto:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Si bien la mayoría de las etiquetas en una página AMP HTML son etiquetas HTML comunes,
algunas etiquetas HTML se reemplazan por etiquetas específicas de AMP (consulta también la sección de
[etiquetas HTML en la especificación de AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Estos elementos personalizados, llamados componentes AMP HTML,
crean patrones comunes que pueden implementarse con buen rendimiento en forma sencilla.

Por ejemplo, la etiqueta [`amp-img`](/docs/reference/amp-img.html)
proporciona soporte completo de `srcset`, incluso en navegadores que todavía no lo admiten.
Obtén más información acerca de cómo [crear tu primera página AMP HTML](/docs/get_started/create_page.html).

## AMP JS

La [biblioteca AMP JS](https://github.com/ampproject/amphtml/tree/master/src) implementa
todas las [prácticas recomendadas de rendimiento de AMP](/docs/get_started/technical_overview.html),
administra la carga de recursos y te proporciona las etiquetas personalizadas que se mencionan arriba para
garantizar la representación rápida de tu página.

Una de las optimizaciones más importantes es que transforma en asincrónico todo lo que proviene de recursos externos, de modo que ningún elemento de la página pueda bloquear la representación.

Entre otras técnicas de rendimiento se incluyen la disposición de todos los iframes en espacios seguros, el cálculo previo del diseño de cada elemento de la página antes de que se carguen los recursos y la desactivación de selectores de CSS lentos.

Para obtener más información acerca de las [optimizaciones](/docs/get_started/technical_overview.html) y las limitaciones, [lee la especificación de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

El Google AMP Cache es una red de distribución de contenido basada en proxy
para la entrega de todos los documentos de AMP válidos.
Captura las páginas AMP HTML, las almacena en caché y mejora el rendimiento de estas automáticamente.
Al usar el Google AMP Cache, el documento, todos los archivos de JS y todas las imágenes se cargan
desde el mismo origen que usa
[HTTP 2.0](https://http2.github.io/) para lograr la máxima eficiencia.

El caché también viene con un
[sistema de validación](https://github.com/ampproject/amphtml/tree/master/validator)
integrado que confirma que se garantiza el funcionamiento de la página,
y que esta no depende de recursos externos.
El sistema de validación ejecuta una serie de aserciones
que confirman que el marcado de la página cumple con la especificación de AMP HTML.

Cada página AMP viene con otra versión del validador integrada. Esta versión puede registrar errores de validación directamente en la consola del navegador cuando se representa la página,
lo que te permite ver cómo los cambios complejos en tu código
podrían afectar el rendimiento y la experiencia del usuario.

Obtén más información acerca de [cómo probar tus páginas AMP HTML](/docs/guides/validate.html).
