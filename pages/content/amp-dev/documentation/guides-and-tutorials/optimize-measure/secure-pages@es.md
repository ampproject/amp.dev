---
$title: Cómo protegerse contra los ataques de terceros
$order: 7
description: Adopte las medidas que sean necesarias para proteger sus páginas AMP y a sus usuarios de las vulnerabilidades de seguridad que se encuentran en la web.
author: CrystalOnScript
---

Adopte las medidas que sean necesarias para proteger su sitio y a sus usuarios de las vulnerabilidades de seguridad que se encuentran en la web. Una de las más catastróficas es [la secuencia de comandos en sitios cruzados o Cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (XSS). La XSS es un error en la seguridad que puede permitirle a un atacante introducir un código malicioso en las páginas HTML que son visibles para los usuarios.

Para protegerse contra este tipo de ataques adopte una [Política de Seguridad en el Contenido (CSP)](https://csp.withgoogle.com/docs/index.html). ¡Los Cachés de AMP como el caché AMP de Google ya incluyeron la CSP en sus páginas! Sin embargo, las páginas carecen de esta capa adicional de protección cuando los usuarios evitan utilizar la versión que se almacena en el caché. Si este no es su caso, agregue su propia CSP.

# Cómo implementar la CSP de AMP

Puede implementar una CSP al agregar la metaetiqueta apropiada en el encabezado de sus páginas. A continuación, se muestra la CSP de AMP, la cual permite que solamente los scripts de AMP se introduzcan en su página:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Puede consultar el ejemplo completo aquí](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] Obtenga más información sobre [cómo protegerse contra las vulnerabilidades en la seguridad y la CSP, aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
