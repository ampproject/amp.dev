---
$title : "Empezando"
$order : 0
---

## Tres sencillos pasos para publicar anuncios en tu página de AMP

¿No sabe cómo empezar? En esta breve guía, aprenderá cómo publicar anuncios de forma rápida y sencilla en su página de AMP.

### 1. Agregar el componente `<amp-ads>` a tu página AMP:

[sourcecode:html]
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
[/sourcecode]

Al agregar el componente `amp-ads`, ha agregado el framework de anuncios a su página de AMP.

### 2. Especificar al servidor de anuncios el atributo `type`:

[sourcecode:html]
<amp-ad
      type="a9">
  </amp-ad>
[/sourcecode]

[Aquí](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks) está una lista de los servidores de anuncios soportados o aceptados.

### 3. Especificar la altura y el ancho de su anuncio:

[sourcecode:html]
<amp-ad width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302">
  </amp-ad>
[/sourcecode]

Al definir el `height` y `weight` de su anuncio, usted especifica el tamaño del anuncio en su página AMP.

{% call callout('Nota', type='note') %}
Los atributos de datos adicionales le indican a la red de anuncios que extraiga el tamaño correcto y el editor de sus servidores. Cada red de anuncios tiene diferentes atributos para enviar. [Aprende más](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks).
{% endcall %}

### 4. [OPCIONAL] Especificar un `placeholder`:

[sourcecode:html]
 <amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img placeholder src="placeholder-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

AMP admite un atributo de marcador de posición opcional. Dependiendo de la red de anuncios, puede elegir mostrar un marcador de posición hasta que el anuncio esté disponible para su visualización. Esto provee una mejor experiencia del usuario previniendo que se muestre un espacio en blanco.

{% call callout('Nota', type='note') %}
[Aprende más sobre el `placeholder`](/es/docs/guides/responsive/placeholders#placeholders).
{% endcall %}

### 5. [OPCIONAL] Especificar un atributo `fallback`:

[sourcecode:html]
<amp-ad width="300"
      height="200"
      type="doubleclick"
      data-slot="/4119129/doesnt-exist">
    <amp-img fallback src="fallback-image.jpg"></amp-img>
  </amp-ad>
[/sourcecode]

AMP admite un atributo opcional de fallback. Dependiendo de la red de anuncios, puede elegir mostrar este elemento alternativo si no hay ningún anuncio disponible para publicar.

{% call callout('Nota', type='note') %}
[Aprende más sobre el `fallback`](/es/docs/guides/responsive/placeholders#fallbacks).
{% endcall %}

### 6. ¡Felicitaciones! ¡Estás publicando anuncios en tu página AMP!
