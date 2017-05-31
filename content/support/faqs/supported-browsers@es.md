---
$title: Navegadores Soportados
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title: Próximo FAQ
  link_text@: AMP Overview
  link_url: /content/support/faqs/overview.md

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

En general, apoyamos las 2 últimas versiones de los principales navegadores como Chrome, Firefox, Edge, Safari y Opera. Soportamos las versiones de escritorio, el teléfono, y la versión en tableta de estos browsers.

Más allá de eso, la biblioteca principal de AMP y los elementos integrados deben apuntar a un soporte de navegador muy amplio y aceptamos correcciones para todos los navegadores con cuota de mercado superior al 1 por ciento.

En particular, tratamos de mantener un soporte "puede que no sea perfecto, pero no está roto" para el navegador del sistema Android 4.0 y Chrome 28+ en los teléfonos.
