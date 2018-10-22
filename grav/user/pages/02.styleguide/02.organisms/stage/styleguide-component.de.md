---
title: Bühne
---
[section name="howToUse"]
Um eine Bühne im Dokument einzufügen, kann der Shortcode `[raw][stage color="blue|grey|orange"][/raw]` unter Angabe einer Farbe verwendet werden.
```markdown
[raw]
[stage color="grey"]
### Molecule
# Stage
[/stage]
[/raw]
```

Dieser Shortcode rendert dann das folgende Template
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
Der Code `[raw][stage color=blue][/raw]` zum Beispiel rendert die folgende Bühne
[stage color="blue"]
### This is a incredible
# Blue demo stage
[/stage]

Mit einer anderen Farbe wie zum Beispiel in `[raw][stage color="orange"][/raw]` sieht die Bühne so aus
[stage color="orange"]
### This is a splendid
# Orange demo stage
[/stage]
[/section]
