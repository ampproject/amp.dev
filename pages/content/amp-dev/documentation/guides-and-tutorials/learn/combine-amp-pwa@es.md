---
"$title": Cómo se relacionan entre sí AMP y PWA
"$order": '7'
description: Las aplicaciones web progresivas (PWA) y las páginas AMP funcionan muy bien en conjunto. De hecho, casi siempre se complementan de alguna manera. Descubra cómo...
formats:
- websites
components:
- youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Introducción a la combinación de páginas AMP y PWA.']

Las aplicaciones web progresivas (PWA) y las páginas AMP funcionan muy bien en conjunto. De hecho, casi siempre se complementan de alguna manera. Descubra cómo:

1. [Habilitar las funciones de las PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) en sus páginas AMP.
2. Crear una [transición muy rápida y atractiva para el usuario](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) de las páginas AMP a las PWA.
3. [Simplificar sus PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) aprovechando la potencia de la tecnología AMP.

[tip type="note"]

Consulte más información sobre las [aplicaciones web progresivas](https://developers.google.com/web/progressive-web-apps/) en Web Fundamentals.

[/tip]

## Páginas AMP con funciones de PWA

Las páginas AMP pueden aprovechar muchas de las funciones de las PWA, siempre que se publiquen desde su origen (el dominio de su sitio web) y no desde una caché de AMP. Esto significa que dichas funciones no se activarán si se accede a una página AMP desde plataformas como Google o Bing, pero se activarán si los usuarios comienzan a desplazarse por el sitio web o si navegan directamente hasta sus páginas AMP.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Descubra cómo [habilitar las funciones de las PWA](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) en sus páginas AMP.[/tip]

## Uso de páginas AMP como punto de entrada de una PWA

El atractivo más sólido de las páginas AMP es su **publicación casi instantánea**, una característica que permite optimizar la primera interacción entre el usuario y el sitio web. Las *aplicaciones web progresivas* ofrecen funciones que **mejoran la interactividad y la interacción**, pero la carga inicial se ve afectada por el hecho de que el componente service worker del sitio web y, por tanto, sus recursos y el esqueleto de la aplicación solo aceleran la publicación de las páginas a partir de la siguiente carga.

Una buena estrategia sería, por ejemplo, definir que una página AMP fuese el punto de entrada de los usuarios a su sitio web y después preparar la PWA de manera discreta y dirigirlos hacia ella durante el resto de la visita.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Descubra cómo [conectar una página AMP a una PWA](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) con [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).[/tip]

## Uso de las páginas AMP como fuente de datos de una PWA

Una de las características principales de las páginas AMP es que insertarlas es muy fácil y seguro, y, precisamente por este motivo, cada vez son más las plataformas que las distribuyen y las publican.

Si está creando una aplicación web progresiva, puede obtener los mismos beneficios y reducir de forma radical la complejidad del backend y del cliente si **reutiliza sus páginas AMP como fuente de datos de sus PWA**.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Descubra cómo [utilizar páginas AMP en una PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md).[/tip]
