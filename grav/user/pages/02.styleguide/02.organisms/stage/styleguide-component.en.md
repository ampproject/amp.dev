---
title: Stage
---
[section name="howToUse"]
To add a stage to your document use the shortcode `[raw][stage color="blue|grey|orange"][/raw]` shortcode and add any text content you like between the opening and closing tag.
```markdown
[raw]
[stage color="grey"]
### Molecule
# Stage
[/stage]
[/raw]
```

This shortcode renders the following twig template.
```twig
<section class="ad-o-stage">
  <div class="ad-o-stage-container{% if color %} ad-o-stage-container-bg-{{ color }}{% endif %}">
    <div class="ad-o-stage-content">
      {{ content|raw }}
    </div>
  </div>
</section>
```
[/section]

[section name="demo"]
For example `[raw][stage color=blue][/raw]` would render the following stage
[stage color=blue]
### This is a incredible
# Blue demo stage
[/stage]

While changing the color like in `[raw][stage color=orange][/raw]` would resolve to a stage looking like
[stage color=orange]
### This is a splendid
# Orange demo stage
[/stage]
[/section]
