---
$title: Templates
$view: /views/custom.j2
$path: /documentation/templates.html
$localization:
  path: /{locale}/documentation/templates/index.md
---
{% do doc.styles.addCssFile('css/components/templates/template.css') %}

<main class="ad--main ad-t-template">
  <section class="ad--stage ad--container-fluid">
    {% do doc.styles.addCssFile('css/components/organisms/stage.css') %}
    <div class="ad-o-stage ad-o-stage-websites">
      <div class="ad--container">
        <div class="ad-o-stage-content">
            <h2 class="ad-o-stage-content-subline">{{ _('How to build AMP without knowing how to code?') }}</h2>
            <h1 class="ad-o-stage-content-headline">{{ _('Easily build user first websites with our templates' ) }}</h1>
        </div>
      </div>
    </div>
  </section>
</main>
