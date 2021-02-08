---
'$title': Erstelle eine Bildanzeige
$order: 1
description: 'Unsere Ad ist ein einfaches Bild mit einem Hyperlink zur beworbenen Website. Wir zeigen das Bild mithilfe des Tags amp-img an. Hier ist der Code: …'
---

Im Abschnitt `<body>` deines AMPHTML Ad Dokuments kannst du Tags für HTML und AMP einfügen. Allerdings sind nicht alle Tags zulässig. Eine Liste der zulässigen Tags findest du in der [Spezifikation für AMPHTML Ads](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins).

Unsere Ad ist ein einfaches Bild mit einem Hyperlink zur beworbenen Website. Wir zeigen das Bild mithilfe des Tags [`amp-img`](../../../../documentation/components/reference/amp-img.md) an. Hier ist der Code:

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
</body>
```

Wenn du deine HTML Datei in deinem Browser öffnest, sollte das folgende Bild angezeigt werden:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Wenn du auf die Bildanzeige klickst, gelangst du zur beworbenen Website (d. h. zur Website des AMP Projekts).
