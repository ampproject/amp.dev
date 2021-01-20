---
$title: Template dependency
$order: 6
$sitemap:
  enabled: False
---

Start

[example
     preview="inline" playground="true"
     imports="amp-date-display:0.1"
     template="amp-mustache:0.2"]

```html
{% raw %}<amp-date-display timestamp-seconds="2147483648" layout="fixed-height" height="20">
  <template type="amp-mustache">
      <a href="https://en.wikipedia.org/wiki/Year_2038_problem">Y2K38</a> will be at {{iso}}
  </template>
</amp-date-display>{% endraw %}
```

[/example]

End
