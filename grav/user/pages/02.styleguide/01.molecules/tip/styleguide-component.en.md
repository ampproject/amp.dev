---
title: Tip
---

[section name="howToUse"]
A tip is a paragraph that needs special attention and therefore is surrounded by a neat little border. It is ideally used with a fourth-level headline and a simple paragraph.
```markdown
[raw]
[tip type="tip|read-on|important|note"]
#### Headline
A little bit of text.
[/tip]
[/raw]
```

This shortcode renders the following twig template.
```twig
<div class="ad-m-tip-container ad-m-tip-{{ type }}-container">
  <div class="ad-m-tip ad-m-tip-{{ type }}">
    {{ content|raw }}
  </div>
</div>
```
[/section]

[section name="demo"]
Using the shortcode `[raw][tip type="important"][/raw]` for example looks something like this
[tip type="important"]
#### Quis platea fringilla
Massa in sociosqu ultrices hendrerit cum, nullam hendrerit per ultricies dis at, venenatis hymenaeos sapien molestie a. Turpis egestas etiam pretium cum, platea montes quis potenti.
[/tip]

With the type `[raw][tip type="tip"][/raw]` it creates the following
[tip type="tip"]
#### Quis platea fringilla
Massa in sociosqu ultrices hendrerit cum, nullam hendrerit per ultricies dis at, venenatis hymenaeos sapien molestie a. Turpis egestas etiam pretium cum, platea montes quis potenti.
[/tip]

The shortcode `[raw][tip type="read-on"][/raw]` renders something similiar to
[tip type="read-on"]
#### Quis platea fringilla
Massa in sociosqu ultrices hendrerit cum, nullam hendrerit per ultricies dis at, venenatis hymenaeos sapien molestie a. Turpis egestas etiam pretium cum, platea montes quis potenti.
[/tip]
[/section]
