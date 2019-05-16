---
$title: Multiple examples in one file
$order: 12
---

First

<!-- xexample 
     preview="inline" 
     playground="true" 
-->

Import

```html
<script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
```

Hidden style

```html-hidden
<style amp-custom>
    h4: color:red;
</style>
```

Body

<!-- preview 
<amp-accordion class="sample">
  <section expanded>
    <h4>Section 1</h4>
    <div>Content 1.</div>
  </section>
  <section>
    <h4>Section 2</h4>
    <div>Content 2.</div>
  </section>
</amp-accordion>
-->

```html
<amp-accordion class="sample">
  <section expanded>
    <h4>Section 1</h4>
    <p>Content 1.</p>
  </section>
  <section>
    <h4>Section 2</h4>
    <div>Content 2.</div>
  </section>
</amp-accordion>
```
<!-- /preview -->

[/example]


Second

<!-- xexample  
     preview="inline"
     playground="false" 
     import="amp-accordion" -->

CSS

```css
amp-accordion section[expanded] .show-more {
  display: none;
}
amp-accordion section:not([expanded]) .show-less {
  display: none;
}
```

HTML

<!-- preview

<amp-accordion class="sample" disable-session-states>
  <section>
    <h4><span class="show-more">Show more</span> <span class="show-less">Show less</span></h4>
    <p>Expanded content</p>
  </section>
</amp-accordion>

-->

```html
<amp-accordion class="sample" disable-session-states>
  <section>
    <h4><span class="show-more">Show more</span> <span class="show-less">Show less</span></h4>
    <p>Expanded content</p>
  </section>
</amp-accordion>
```
<!-- /preview -->
[/example]

End
