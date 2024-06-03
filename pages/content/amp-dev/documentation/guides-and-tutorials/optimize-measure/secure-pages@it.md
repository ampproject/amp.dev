---
'$title': Protezione contro attacchi di terzi
$order: 7
description: Adotta misure adeguate per proteggere le tue pagine AMP e gli utenti dalle vulnerabilità di sicurezza sul web
formats:
  - websites
author: CrystalOnScript
---

Adotta misure adeguate per proteggere le tue pagine AMP e gli utenti dalle vulnerabilità di sicurezza sul web. Uno dei peggiori attacchi è il [cross-site scripting](https://www.google.com/about/appsecurity/learning/xss/) (filtro XSS). Il bug XSS è una vulnerabilità della sicurezza che può consentire a un utente malintenzionato di inserire codice dannoso nelle pagine HTML visualizzate agli utenti.

Proteggiti da questi tipi di attacchi adottando [Criteri di sicurezza sui contenuti (CSP)](https://csp.withgoogle.com/docs/index.html). Le cache AMP quali cache AMP Google aggiungono già meccanismi CSP alle pagine! Tuttavia, le pagine non disporrano di questo ulteriore livello di protezione quando gli utenti non accedono alla versione memorizzata nella cache, senza aggiungere il proprio CSP.

# Implementazione del CSP di AMP

Implementare un meccanismo CSP aggiungendo il meta tag appropriato all'intestazione delle pagine. Di seguito è riportato il CSP di AMP, che consente di inserire solo script AMP alle pagine:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Puoi visualizzare l'esempio completo qui](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] Ulteriori informazioni sulla [protezione dalle vulnerabilità della sicurezza e sui meccanismi CSP disponibili qui](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
