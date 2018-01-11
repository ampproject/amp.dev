---
$title: Combinar AMP con aplicaciones web progresivas
$order: 9
$category: Develop
toc: true
components:
    - youtube
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='Introducción a la combinación de páginas AMP y PWA.') }}

Las aplicaciones web progresivas (PWA) y las páginas AMP se complementan muy bien. De hecho, casi siempre se mejoran mutuamente de alguna manera. Descubre cómo:

1. [Habilitar las funciones de las PWA](/es/docs/guides/pwa-amp/amp-as-pwa.html) en tus páginas AMP.
2. Crear una [transición superrápida y atractiva para el usuario](/es/docs/guides/pwa-amp/amp-to-pwa.html) de las páginas AMP a las PWA.
3. [Simplificar tus PWA](/es/docs/guides/pwa-amp/amp-in-pwa.html) aprovechando la potencia de la tecnología AMP.

{% call callout('¿Qué son las aplicaciones web progresivas?', type='note') %}
Consulta más información sobre las [aplicaciones web progresivas](https://developers.google.com/web/progressive-web-apps/) en Web Fundamentals.
{% endcall %}

## Páginas AMP con funciones de PWA

Las páginas AMP pueden aprovechar muchas de las funciones de las PWA, siempre que se publiquen desde tu origen (el dominio de tu sitio web) y no desde una caché de AMP. Esto significa que estas funciones no se activarán si se llega a una página AMP desde plataformas como Google o Bing, pero sí si los usuarios se empiezan a desplazar por el sitio web o si navegan directamente hasta tus páginas AMP.

{% call callout('Más información', type='read') %}
Descubre cómo [habilitar funciones de las PWA](/es/docs/guides/pwa-amp/amp-as-pwa.html) en tus páginas AMP.
{% endcall %}

## Usar páginas AMP como punto de entrada de una PWA

El punto fuerte de las páginas AMP es la **publicación casi instantánea**, que permite optimizar la primera interacción entre el usuario y el sitio web. Las *aplicaciones web progresivas* ofrecen funciones que **mejoran la interactividad y la interacción**, pero la carga inicial se ve perjudicada por el hecho de que el componente service worker del sitio web y, por tanto, sus recursos y el esqueleto de aplicación solo aceleran la publicación de las páginas a partir de la siguiente carga.

Una buena estrategia sería, por ejemplo, definir que una página AMP fuese el punto de entrada de los usuarios a tu sitio web y después preparar la PWA de tapadillo y dirigirlos a ella durante el resto de la visita.

{% call callout('Más información', type='read') %}
Descubre cómo [conectar una página AMP a una PWA](/es/docs/guides/pwa-amp/amp-to-pwa.html) con `amp-install-serviceworker`.
{% endcall %}

## Usar las páginas AMP como fuente de datos de una PWA

Una de las características principales de las páginas AMP es que insertarlas es fácil y seguro, y, por este motivo precisamente, cada vez son más las plataformas que las distribuyen y las publican.

Si estás creando una aplicación web progresiva, puedes obtener los mismos beneficios y reducir de forma radical la complejidad del backend y del cliente si **reutilizas tus páginas AMP como fuente de datos de tus PWA**.

{% call callout('Más información', type='read') %}
Descubre cómo [utilizar páginas AMP en una PWA](/es/docs/guides/pwa-amp/amp-in-pwa.html).
{% endcall %}
 
 
