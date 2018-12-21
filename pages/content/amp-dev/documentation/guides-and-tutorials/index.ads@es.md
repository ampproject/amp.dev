---
$title: Introducción a la publicidad en páginas AMP
---

La finalidad del proyecto AMP es ofrecer lo mejor al usuario contribuyendo a aumentar la velocidad de las páginas web. La publicidad en páginas AMP adopta ese mismo objetivo, ya que utiliza anuncios rápidos, seguros, atractivos y eficaces dirigidos a los usuarios. ¿Y cómo lo hace?  

Publicar anuncios en páginas AMP no difiere mucho de publicar anuncios tradicionales en páginas HTML:

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='publicar anuncios en páginas AMP', align='' ) }}

1.  En una página AMP, el editor crea un espacio en el que aparecerán anuncios. Antes se hacía insertando un fragmento de JavaScript, pero en el caso de las páginas AMP, los editores añaden una etiqueta ['<amp-ad>'](/es/docs/reference/components/amp-ad.html) de una red publicitaria concreta. Para obtener más información, consulta la guía [Monetizar tu página AMP con anuncios]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}}).

2.  Cuando el usuario carga una página AMP, la etiqueta '<amp-ad>' envía una solicitud de anuncio a la red publicitaria. Para devolver un anuncio a la página AMP, las redes publicitarias crean una implementación 'amp-ad'. Para obtener más información, consulta la guía [Integrar redes publicitarias en páginas AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

3.  Las redes publicitarias proporcionan creatividades creadas por los anunciantes. Los anunciantes pueden generar creatividades en el formato tradicional HTML o en el nuevo formato, [AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}). 

## Redes publicitarias compatibles

Las páginas AMP admiten una gran cantidad de [servidores de anuncios y redes publicitarias]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}}).

[tip]
¿Quieres integrar tu tecnología publicitaria con las páginas AMP? Consulta estas [directrices]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}}).
[/tip]

## Anuncios compatibles

Las páginas AMP admiten tanto anuncios tradicionales como anuncios AMP HTML, más rápidos y seguros.  Independiente de cómo se hayan creado, los anuncios de las páginas AMP son como cualquier otro recurso externo y deben cumplir las mismas [restricciones que todos los recursos de las páginas AMP](/es/learn/about-how/).   Para obtener más información sobre los requisitos que deben cumplir los anuncios para ser publicados en páginas AMP, consulta [esta guía](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints).

### Anuncios más rápidos con AMP HTML

Los anuncios AMP HTML son la manera más rápida, ligera y segura de anunciarse en Internet. Aunque las páginas AMP los admiten, los anuncios HTML tradicionales pueden tardar más en cargarse. Para que los anuncios sean tan rápidos como el resto de la página AMP, puedes crearlos en formato AMP HTML. Los anuncios AMP HTML no se publican hasta que no se han validado, con lo cual se asegura que no contienen software malicioso. Y lo más importante: estos anuncios pueden publicarse en cualquier lugar de Internet, no solo en páginas AMP.

Para obtener más información sobre los anuncios AMP HTML, consulta la guía [Anuncios AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}).


## Empezar

Consulta estos recursos sobre cómo empezar a utilizar anuncios en páginas AMP:

* [Monetizar tu página AMP con anuncios]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})
* [Integrar tu tecnología con las páginas AMP para publicar anuncios de display]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}})
* [Anuncios AMP HTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})
 
