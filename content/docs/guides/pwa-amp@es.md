---
$title: Combina AMP con Aplicaciones Web Progresivas
$order: 9
$category: Develop
toc: true
components:
    - youtube
---
[TOC]

{{ youtube('Yllbfu3JE2Y', 480, 270, caption='Watch the intro to combining AMP and PWA.') }}

Las Aplicaciones Web Progresivas, en inglés PWA (o Progressive Web Apps) y las páginas AMP trabajan muy bien juntas. De hecho, en muchos casos, se complentan entre ellas de una forma u otra. Aprenda cómo:

1. [Habilite características PWA](/es/docs/guides/pwa-amp/amp-as-pwa.html) en su página AMP
1. Cree un [viaje para el usuario convincente y super rápido](/es/docs/guides/pwa-amp/amp-to-pwa.html) desde AMP a PWA
1. [Simplifique su PWA](/es/docs/guides/pwa-amp/amp-in-pwa.html) utilizando la potencia de AMP

{% call callout('Progressive Web App?', type='note') %}
Aprende más sobre [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) en Web Fundamentals.
{% endcall %}

## Páginas AMP con características PWA

Las páginas de AMP pueden utilizar muchas características de PWA por sí solas, siempre y cuando sean servidas desde su origen (el dominio de su sitio) en lugar de una caché de AMP. Esto significa que las características de PWA no se activarán al consumir una página de AMP dentro de una plataforma como Google o Bing, pero sí en el futuro, o si los usuarios navegan directamente a las páginas de AMP.

{% call callout('Leer más', type='read') %}
Aprenda cómo [habilitar características PWA](/es/docs/guides/pwa-amp/amp-as-pwa.html) para sus páginas AMP.
{% endcall %}

## AMP como punto de entrada en su PWA

El punto de venta único de AMP es la **entrega casi instantánea**, una característica que hace que AMP sea el ajuste perfecto para la primera interacción del usuario con su sitio. *Las aplicaciones web progresivas* permiten mucho **más interactividad y características de habilitación de compromiso**, pero su primera carga se ve obstaculizada por el hecho de que el site's Service Worker y, por lo tanto, sus activos y shell de aplicaciones, sólo aceleran la entrega en cargas posteriores.

Una buena estrategia es hacer que el punto de entrada en su sitio una página de AMP, luego preparar el PWA detrás de las escenas y cambiarse a ella para el viaje de ida.

{% call callout('Leer más', type='read') %}
Aprender más sobre cómo [conectar AMP con PWA](/es/docs/guides/pwa-amp/amp-to-pwa.html) a través del `amp-install-serviceworker`.
{% endcall %}

## AMP como fuente de datos para su PWA

Una de las características principales de las páginas de AMP es que son fáciles y seguras de integrar, por lo que un número cada vez mayor de plataformas se complace en distribuir y servir.

Si está creando una aplicación web progresiva, puede recibir los mismos beneficios y reducir drásticamente la complejidad de su backend y cliente al **volver a utilizar sus páginas AMP como fuente de datos para su PWA**.

{% call callout('Leer más', type='read') %}
Aprender más sobre cómo [consumir páginas AMP con PWA](/es/docs/guides/pwa-amp/amp-in-pwa.html).
{% endcall %}
