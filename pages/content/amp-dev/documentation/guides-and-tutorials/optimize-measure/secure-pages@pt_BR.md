---
"$title": Proteja-se de ataques de terceiros
"$order": '7'
description: Aja para proteger suas páginas AMP e usuários contra vulnerabilidades de segurança na web
formats:
- websites
author: CrystalOnScript
---

Aja para proteger suas páginas AMP e usuários contra vulnerabilidades de segurança na web. Um dos mais sinistros é o [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS é um bug de segurança que pode permitir que um invasor injete um código malicioso nas páginas HTML exibidas aos usuários.

Proteja-se contra esses tipos de ataques adotando uma [Política de Segurança de Conteúdo (CSP - Content Security Policy)](https://csp.withgoogle.com/docs/index.html). Caches de AMP, como o Cache de AMP do Google, já adicionam CSP às suas páginas! No entanto, as páginas não têm essa camada adicional de proteção quando os usuários driblam a versão em cache, se você não adicionar sua própria CSP.

# Implemente o CSP do AMP

Implemente uma CSP adicionando a meta tag apropriada ao cabeçalho de suas páginas. Abaixo está a CSP do AMP, permitindo que apenas scripts de AMP sejam injetados em sua página:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Você pode ver o exemplo completo aqui](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

[tip type="read-on"] Saiba mais sobre [proteção contra vulnerabilidades de segurança e CSPs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
