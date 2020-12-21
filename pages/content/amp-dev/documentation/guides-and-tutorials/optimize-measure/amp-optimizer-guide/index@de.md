---
"$title": AMP Optimizer verwenden
"$order": '2'
"$hidden": 'true'
description: AMP Optimizer sind Tools, mit denen du die für AMP Cache typischen Optimierungen auf deiner eigenen Website implementieren kannst. Die Verwendung eines AMP Optimizers ist der Schlüssel zu einer großartigen Benutzererfahrung auf deiner Seite und zur Einhaltung der Core Web Vitals. Dieser Leitfaden zeigt dir die besten Methoden auf, mit denen du deine AMP Seiten mithilfe eines AMP Optimizers optimieren kannst.
formats:
- websites
- stories
author: sebastianbenz
---

AMP Optimizer sind Tools, mit denen du die für AMP Cache typischen Optimierungen auf deiner eigenen Website implementieren kannst. Die Verwendung eines AMP Optimizers ist der Schlüssel zu einer großartigen [Benutzererfahrung auf deiner Seite](https://developers.google.com/search/docs/guides/page-experience) und zur Einhaltung der [Core Web Vitals](https://web.dev/vitals/). Wenn du mehr über die Funktionsweise von AMP Optimizern erfahren möchtest, sieh dir unseren [ausführlichen Leitfaden zu AMP Optimization](explainer.md) an.

## Ist AMP nicht sowieso schon schnell?

Vielleicht denkst du jetzt: Sollte AMP nicht von Haus aus schnell sein? Und du hast Recht: Die AMP Runtime ist für Geschwindigkeit optimiert, und alle gültigen AMP Seiten werden schnell geladen. Es gibt jedoch noch zusätzliche Leistungsoptimierungen, die du auf deinem Server implementieren kannst, damit der Browser AMP Seiten noch schneller lädt.

Anfangs stellten AMP Caches die meisten AMP Seiten bereit. Diese Caches führten zusätzliche Optimierungen auf Seiten durch, um eine überzeugende Benutzererfahrung zu gewährleisten. Mit der Zeit begannen jedoch immer mehr Dienste, AMP Seiten zu verlinken, und Entwickler gingen dazu über, ganze Websites mit AMP zu erstellen. Aus diesem Grund hat das AMP Team begonnen, AMP Optimizer zu entwickeln, damit alle Anwender AMP Seiten mit der für AMP Cache typischen Leistung in ihren eigenen Domänen bereitstellen können.

## AMP Optimizer integrieren

Ein AMP Optimizer kann auf drei Arten eingesetzt werden:

1. Verwende einen Site Generator oder ein CMS mit integriertem Optimizer.
2. Integriere einen AMP Optimizer in dein Buildsystem oder deinen Server.
3. Integriere einen AMP Optimizer in deine Hosting Umgebung.

### CMS & Site Generators

Der beste Weg, um optimiertes AMP zu veröffentlichen, ist die Verwendung eines Site Generators oder eines CMS mit Unterstützung für integrierte AMP Optimizer. In diesem Fall werden deine AMP Seiten automatisch optimiert. Derzeit bieten die folgenden Site Generators und CMS integrierte AMP Optimizer:

- [WordPress](https://wordpress.org/) über das [AMP WordPress Plugin](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) über das [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Benutzerdefinierte Build- und Serverintegrationen

Du kannst einen AMP Optimizer auch selbst integrieren. Dir stehen mehrere Open Source Implementierungen von AMP Optimizern zur Verfügung:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): eine Bibliothek auf Node.js Basis zur Erstellung von optimiertem AMP. Lies dir dazu unseren Leitfaden für die ersten Schritte hier auf amp.dev durch. Die Implementierung wird vom AMP Team betreut.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): ein Python Port von Node AMP Optimizer.

Es gibt verschiedene Integrationen für Seiten, die dynamisch von deinem Server und von statischen Websites gerendert werden:

1. **Build-time**: Für statische Websites sollten AMP Seiten am besten als Teil des Builds optimiert werden. Dieser Ansatz ist ideal, da die Optimierung von AMP Seiten keinen Einfluss auf die Bereitstellungsleistung hat. Sieh dir [dieses Beispiel für AMP Optimizer + Gulp Integration](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp) an.
2. **Render-time**: Für Websites mit dynamischerem Charakter oder für solche, die Transformationen nicht statisch anwenden können, kann die Optimierung nach dem Rendern der AMP Dokumente auf dem Server erfolgen. In diesem Fall ist es am besten, transformierte Seiten für nachfolgende Anforderungen im Cache zwischenzuspeichern, um schnelle Bereitstellungszeiten zu gewährleisten. Das Caching kann auf CDN Ebene, in der internen Infrastruktur der Website (z. B. Memcached) oder sogar auf dem Server selbst erfolgen, wenn das Set an Seiten klein genug ist, um in den Speicher zu passen. Weitere Informationen zu diesem Ansatz findest du in [dieser Demo zur Integration eines AMP Optimizers in Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Integration mit Hosting Providern

Einige Hosting Provider erlauben die Ausführung einer eigenen Logik bei der Bereitstellung oder Übermittlung von Webseiten. Dies kann eine großartige Option für die Integration von AMP Optimizern sein. Beispiele für Integrationen:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([kommt bald](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([kommt bald](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
