---
'$title': Zabezpieczenie przed atakami stron trzecich
$order: 7
description: Podejmij działania mające na celu ochronę stron AMP i użytkowników przed lukami w zabezpieczeniach w Internecie
formats:
  - websites
author: CrystalOnScript
---

Podejmij działania mające na celu ochronę swojej witryny i użytkowników przed lukami bezpieczeństwa w Internecie. Jednym z najbardziej złowrogich jest atak [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS to usterka zabezpieczeń, która może pozwolić napastnikowi na wstrzyknięcie złośliwego kodu do stron HTML wyświetlanych użytkownikom.

Chroń strony przed tego typu atakami poprzez przyjęcie standardu [Content Security Policy (CSP)](https://csp.withgoogle.com/docs/index.html). Serwery buforujące AMP, takie jak Google AMP Cache, już dodają CSP do Twoich stron! Jeśli nie dodasz własnego CSP, stronom zabraknie jednak tej dodatkowej warstwy ochrony, gdy użytkownicy ominą wersję buforowaną.

# Implementacja CSP AMP

Aby zaimplementować CSP, dodaj odpowiedni znacznik meta do nagłówka strony. Poniżej znajduje się kod CSP AMP, który umożliwia wstrzyknięcie do strony jedynie skryptów AMP:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://ampjs.org/v0.js https://ampjs.org/v0/ https://ampjs.org/viewer/ https://ampjs.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://ampjs.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Pełny przykład można zobaczyć tutaj](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] Dowiedz się więcej o [ochronie luk w zabezpieczeniach i CSP tutaj](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
