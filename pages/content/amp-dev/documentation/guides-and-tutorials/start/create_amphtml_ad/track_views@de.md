---
'$title': Verfolge die Ansichten von Ads
$order: 2
description: In AMPHTML Ads kannst du Metriken mithilfe der Komponenten amp-pixel und amp-analytics tracken. In unserem einfachen Beispiel machen wir es möglich, Seitenaufrufe zu verfolgen …
---

In AMPHTML Ads kannst du Metriken mithilfe der Komponenten [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) und [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tracken. In unserem einfachen Beispiel machen wir es möglich, Seitenaufrufe mit der Komponente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) zu verfolgen und auf eine URL zu verweisen, welche die Seitenaufrufe protokolliert (in diesem Fall eine fiktive URL):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

Das war alles: Deine AMPHTML Ad ist fertig!

Bevor du deine Ad auf deinen Ad Server hochlädst, solltest du noch einen letzten Schritt vornehmen und sicherstellen, dass deine Syntax gültig ist.
