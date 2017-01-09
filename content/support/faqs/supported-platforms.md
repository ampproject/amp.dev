---
$title: Supported Platforms
$order: 3
class: who

description: The Accelerated Mobile Pages (AMP) Project is an open source initiative that makes it easy for publishers to create mobile-friendly content once and have it load instantly everywhere. – Accelerated Mobile Pages Project
---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}
An ever-growing number of platforms and vendors support AMP, either by providing an AMP component, or by offering advanced integration with AMP pages within their platforms.

<div>
  <amp-accordion>
  {% for section in who.tech_companies.sections %}
    <section {% if loop.index == 1 %}expanded{% endif %}>
      <div id="{{section.title|slug}}" class="accordion-header">
        <span class="accordion-toggle"></span>
        <h3>{{section.title}}</h3>
      </div>
      <div class="accordion-content">
      {% if section.section_images %}
        <div class="card-container">
        {% for item in section.section_images %}
          <a href="{{item.link}}" class="card">
            <amp-img width="600"
                height="310"
                layout="responsive"
                src="{{item.img}}"></amp-img>
          </a>
        {% endfor %}
        </div>
        <amp-accordion class="nested">
          <section>
            <div class="accordion-header">
              <a class="open underlined">View All ({{section.section_items|length}})</a>
              <a class="close underlined">Close X</a>
            </div>
            <section class="accordion-content">
      {% endif %}
              <ol class="item-container">
              {% for item in section.section_items | sort %}
                <li class="item">
                  {% if item.link %}
                    <a href="{{item.link}}">{{item.title}}</a>
                  {% else %}
                    {{item.title}}
                  {% endif %}
                </li>
              {% endfor %}
              </ol>
      {% if section.section_images is defined %}
            </section>
          </section>
        </amp-accordion>
      {% endif %}
      </div>
    </section>
  {% endfor %}
  </amp-accordion>
</div>

<hr>

# Supported Browsers

<div class="browser-container">
{% for item in who.browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{item.img}}"></amp-img>
    <p class="browser-title">{{item.title}}</p>
  </div>
{% endfor %}
</div>

In general we support the 2 latest versions of major browsers like Chrome, Firefox, Edge, Safari and Opera. We support desktop, phone, tablet and the web view version of these respective browsers.

Beyond that, the core AMP library and built-in elements should aim for very wide browser support and we accept fixes for all browsers with market share greater than 1 percent.

In particular, we try to maintain "it might not be perfect but isn't broken"-support for the Android 4.0 system browser and Chrome 28+ on phones.
