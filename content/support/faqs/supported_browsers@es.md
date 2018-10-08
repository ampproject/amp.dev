---
$title@: Navegadores compatibles
---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="browser-container">
{% for browser in who.browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{browser.img}}"></amp-img>
    <p class="browser-title">{{browser.title}}</p>
  </div>
{% endfor %}
</div>

En términos generales, se admiten las dos últimas versiones de los navegadores principales, como Chrome, Firefox, Edge, Safari, Opera y UC Browser, así como las versiones para ordenador, teléfono, tablet y web de dichos navegadores.

Además, la biblioteca principal de AMP y los elementos integrados deberían ser compatibles con la mayoría de navegadores, y se aceptan correcciones de errores en todos los navegadores cuya cuota de mercado sea superior al 1 %.

Concretamente, se intenta mantener una asistencia que funciona, aunque puede no ser perfecta, para el navegador del sistema Android 4.0 y Chrome 28+ en móviles.
 
