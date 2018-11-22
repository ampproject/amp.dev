---
$title: Inicio rápido
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

En esta guía se ofrecen recursos clave para que puedas empezar a utilizar páginas AMP rápidamente.  Para obtener más información, consulta la [documentación sobre páginas AMP](/es/docs/) o nuestro [canal de YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw). 

<hr>

## Empezar a utilizar páginas AMP

Sigue estos pasos para empezar a utilizar páginas AMP:

1.  [Crea tus páginas AMP](#create-your-amp-pages)
2.  [Valida tus páginas AMP](#validate-and-test-amp-pages)
3.  [Haz que tu contenido sea visible](#make-your-content-discoverable)

## Usar páginas AMP de forma habitual

Saca partido a todos los recursos disponibles sobre páginas AMP para seguir fomentando su uso.

<a class="button" href="#amp-day-to-day-resources"> Ver recursos</a>

<hr>

### Crear páginas AMP

A continuación, puedes consultar las secciones relevantes sobre cómo [utilizar un CMS](#using-a-cms?), [empezar desde cero](#starting-from-scratch?) o [convertir contenido actual](#converting-existing-content?).

#### Utilizar un CMS

Las páginas AMP pueden integrarse con muchas plataformas de publicación de terceros. Consulta la documentación de tu plataforma de publicación para saber cómo se crean páginas AMP.

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### Empezar desde cero

Si creas páginas AMP o creatividades desde cero, consulta estos recursos:

*   [Tutorial: Crear tu primera página AMP](/es/docs/getting_started/create.html)
*   [Tutorial: Añadir funciones avanzadas de AMP](/es/docs/fundamentals/add_advanced.html)
*   [Especificación AMP HTML](/es/docs/fundamentals/spec.html#the-amp-html-format): *incluye una plantilla, las etiquetas necesarias y el texto HTML permitido*
*   [Formato de los anuncios AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md): *incluye detalles sobre cómo crear anuncios eficaces en páginas AMP*
*   [Vídeo de YouTube: ¿Qué se puede y qué no se puede usar en las páginas AMP?](https://youtu.be/Gv8A4CktajQ)
*   [Plantillas de AMP Start](https://www.ampstart.com/): *prueba a usar plantillas de páginas AMP predefinidas*

#### Convertir el contenido actual

Si quieres convertir páginas HTML actuales en páginas AMP HTML, consulta estos recursos:

*   [Tutorial: Convertir HTML en AMP](/es/docs/fundamentals/converting.html)
*   [Vídeo de YouTube: Usar AMP HTML en un sitio web actual](https://youtu.be/OO9oKhs80aI)

### Validar y probar páginas AMP

Antes de publicar tu contenido, comprueba que las páginas AMP sean válidas.  Puedes utilizar estos recursos:

*   [Validar páginas AMP](/es/docs/fundamentals/validate.html): *incluye una lista de herramientas de validación e instrucciones para validar las páginas*
*   [Vídeo de YouTube: Cómo validar y depurar páginas AMP](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [Probar solicitudes CORS en páginas AMP](/es/docs/fundamentals/amp-cors-requests.html#testing-cors-in-amp)

### Hacer que el contenido sea visible

Asegúrate de que los usuarios puedan encontrar tu contenido en plataformas de terceros, como Twitter, Google, Bing, etc. A continuación te indicamos algunos recursos útiles:

*   [Hacer que una página sea reconocible](/es/docs/fundamentals/discovery.html): *consejos para enlazar páginas AMP y utilizar metadatos*
*   [Directrices de AMP en la Búsqueda de Google](https://support.google.com/webmasters/answer/6340290)

<hr>

## Recursos cotidianos para utilizar páginas AMP

Estos recursos te ayudarán a gestionar el día a día de tus páginas AMP:

*   Mantén la [lista de componentes de las páginas AMP](/es/docs/reference/components.html) a mano.  En la página de referencia de cada componente se ofrece información detallada sobre cómo integrarlo y usarlo en las páginas AMP.
*   ¿Necesitas ejemplos y vídeos de demostración?  Consulta el sitio web [AMP By Example](https://ampbyexample.com/), que incluye ejemplos prácticos y permite hacer pruebas con componentes de páginas AMP.
*   ¿Necesitas inspiración?
    *   En el sitio web [AMP Start](https://www.ampstart.com/) encontrarás componentes y plantillas predefinidas que puedes usar para crear sitios web AMP desde cero.
    *   En nuestro [escaparate](/es/learn/showcases/) se muestran algunas páginas AMP destacadas.
*   ¿Necesitas ayuda? Consulta los recursos de la página [Obtener ayuda](/es/support/developer/get_support.html).
*   Estate al día de las últimas novedades sobre páginas AMP:
    *   Suscríbete a [nuestro blog](https://amphtml.wordpress.com/)
    *   Suscríbete al canal de YouTube [The AMP Channel](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)
    *   Síguenos en Twitter  [@AMPhtml](https://twitter.com/amphtml)
 
