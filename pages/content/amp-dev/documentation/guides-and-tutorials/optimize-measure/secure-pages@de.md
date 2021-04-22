---
'$title': Sicher vor Angriffen Dritter
$order: 7
description: Schütze deine AMP Seiten und Benutzer vor Sicherheitslücken im Web
formats:
  - websites
author: CrystalOnScript
---

Schütze deine AMP Seiten und Benutzer vor Sicherheitslücken im Web. Eine solche Lücke, die zu den problematischsten überhaupt gehört, ist [Cross-Site Scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS ist ein Sicherheitsfehler, der Angreifern ermöglicht, schädlichen Code in die HTML Seiten einzufügen, die den Benutzern angezeigt werden.

Schütze dich vor solchen Angriffen, indem du eine [Inhaltssicherheitsrichtlinie (Content Security Policy, CSP) festlegst](https://csp.withgoogle.com/docs/index.html). AMP Caches wie der Google AMP Cache statten deine Seiten bereits mit CSP aus! Allerdings fehlt den Seiten diese zusätzliche Schutzschicht, wenn Benutzer die Cache Version umgehen und du keine eigene CSP implementierst.

# Implementiere die CSP von AMP

Implementiere eine CSP, indem du im Kopf deiner Seiten das entsprechende Meta Tag hinzufügst. Im Folgenden findest du die CSP von AMP, die außer AMP Skripten keine anderen Skripte auf deiner Seite erlaubt:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Das vollständige Beispiel findest du hier](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] Weitere Informationen zum [Schutz vor Sicherheitslücken und zu CSPs findest du hier](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
