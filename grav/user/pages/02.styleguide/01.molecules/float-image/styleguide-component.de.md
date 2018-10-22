---
title: 'Float Image'
media_order: 'amp-img-01.png,amp-img-02.png'
---
[section name="howToUse"]
Zwei übereinander schwebende Bilder können über den Shortcode `[raw][float-image][/raw]` eingefügt werden, die zwei Bildtags umschließen.
```markdown
[raw]
[float-image]
![](amp-img-01.png)
![](amp-img-02.png)
[/float-image]
[/raw]
```

Dieser Shortcode rendert dann das folgende Template
```twig
<div class="ad-o-container">
  <div class="ad-m-float-image col-full">
    {% set staticImage = images.0 %}
    <div class="ad-a-img ad-a-img-static">
      <amp-img src="{{ staticImage.src }}" layout="responsive" width="{{staticImage.width}}" height="{{staticImage.width}}" alt="{{ staticImage.alt}}"></amp-img>
    </div>

    {% set parallaxImage = images.1 %}
    <div class="ad-a-img ad-a-img-shadow-static ad-a-img-parallax">
      {% do assets.addAmpComponent('amp-fx-collection') %}
      <amp-img src="{{ parallaxImage.src }}" layout="fill" width="{{parallaxImage.width}}" height="{{parallaxImage.width}}" alt="{{ parallaxImage.alt}}" amp-fx="parallax"
		  data-parallax-factor="1.1"></amp-img>
    </div>
  </div>
</div>
```
[/section]

[section name="demo"]
Der Shortcode `[raw][float-image][/raw]` sieht auf der Seite eingebunden dann so aus
[float-image]
![](amp-img-01.png)
![](amp-img-02.png)
[/float-image]
[/section]
