---
'$title': "Comment rester à l'abri des attaques tierces"
$order: 7
description: Prenez des mesures pour protéger vos pages AMP et vos utilisateurs contre les failles de sécurité sur le Web
formats:
  - websites
author: CrystalOnScript
---

Prenez des mesures pour protéger votre site et vos utilisateurs contre les failles de sécurité sur le Web. L'une des failles les plus sinistres est le [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS est un bogue de sécurité qui peut permettre à un hacker d'injecter du code malveillant sur les pages HTML affichées aux utilisateurs.

Protégez-vous contre ces types d'attaques en adoptant une [politique de sécurité du contenu (CSP)](https://csp.withgoogle.com/docs/index.html). Les caches AMP comme Google AMP Cache ajoutent par défaut CSP à vos pages! Cependant, les pages n'ont pas cette couche de protection supplémentaire lorsque les utilisateurs contournent la version mise en cache, si vous n'ajoutez pas votre propre CSP.

# Implémenter le CSP d'AMP

Implémentez un CSP en ajoutant la balise Meta appropriée dans l'en-tête de vos pages. Vous trouverez ci-dessous le CSP d'AMP, qui permet uniquement aux scripts AMP d'être injectés dans votre page:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Vous pouvez voir l'exemple complet ici](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

[tip type="read-on"] Plus de détails sur la [protection contre les failles de sécurité et les CSP ici](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
