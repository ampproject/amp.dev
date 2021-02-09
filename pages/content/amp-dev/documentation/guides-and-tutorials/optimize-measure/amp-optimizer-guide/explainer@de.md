---
'$title': So funktioniert ein AMP Optimizer
$order: 1
description: Ein AMP Optimizer nimmt ein gültiges AMPHTML Dokument als Eingabe und wandelt es in eine optimierte Version um. Dazu werden zusätzliche Optimierungen angewendet, deren manuelle Implementierung zu umständlich wäre. Dieser Leitfaden erläutert ausführlich die Funktionsweise des AMP Optimizers.
formats:
  - websites
  - stories
author: sebastianbenz
---

Ein AMP Optimizer nimmt ein gültiges AMPHTML Dokument als Eingabe und wandelt es in eine optimierte Version um. Dazu werden zusätzliche Optimierungen angewendet, deren manuelle Implementierung zu umständlich wäre. Das resultierende "**transformierte AMP**" erkennst du im `html` Element anhand des Attributs `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Hinweis: AMP Caches verwenden ein anderes Flag für Transformierungen. So fügen Google AMP Caches z. B. `transformed=google;v=1` ein.

AMP Optimizer führen verschiedene Optimierungen am AMP Dokument durch – von serverseitigen Rendering Layouts bis hin zur Bildoptimierung. Hier ist ein Beispiel, das die Unterschiede zwischen einer AMP Seite und ihrer optimierten Version zeigt ([klicke hier für eine größere Version](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Im verbleibenden Teil dieses Leitfadens stellen wir diese Optimierungen ausführlicher vor.

### Serverseitiges Rendern von AMP Layouts

Das serverseitige Rendern von AMP Layouts bietet das größte Potenzial zur Verbesserung der Ladeleistung deiner AMP Seite. Um Sprünge im Inhalt zu vermeiden, müssen Websites gemäß AMP [AMP Boilerplate Code](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) im Header einfügen. Die AMP Boilerplate verbirgt den Seiteninhalt, indem es die Deckkraft des Bodys der Seite auf 0 setzt. Sobald das AMP geladen ist, kann das Layout der Seite berechnet werden. Danach setzt AMP die Deckkraft des Bodys auf 1, wodurch der Seiteninhalt sichtbar wird. Leider muss bei diesem Ansatz das AMP Framework heruntergeladen werden, bevor dieses die Seite rendern kann.

Um dies zu verbessern, können AMP Layouts, wie z. B. das Layout `responsive` oder `fixed-height`, serverseitig gerendert werden, bevor die Seite dem User Agent bereitgestellt wird. Das macht es möglich, die AMP Boilerplate zu entfernen und trotzdem [Sprünge im Inhalt](https://web.dev/cls/) beim Laden der Seite zu vermeiden.

Das serverseitige Rendern hat drei Funktionen:

⁣ **1. AMP Boilerplate entfernen: ** Für jedes Element, das ein AMP Layout verwendet, wird das layoutspezifische Markup eingefügt.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: <style amp-runtime>...</style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

** 3. Serverseitig gerenderte AMP Layouts: ** Für jedes Element, das ein AMP Layout verwendet, werden die layoutspezifischen Elemente "sizer" eingefügt.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Warnung: Die AMP Boilerplate kann nicht immer entfernt werden. Du kannst herausfinden, ob die Boilerplate entfernt wurde, indem du prüfst, ob das Attribut `i-amphtml-no-boilerplate` im `html` Element vorhanden ist. Beispielsweise ändert die Komponente `amp-experiment` den Seiteninhalt zur Laufzeit. Wird `amp-experiment` auf einer Seite verwendet, so muss der AMP Boilerplate Code vorhanden sein, um Sprünge im Inhalt zu vermeiden.

### Optimierung des Hero Image

Ein AMP Optimizer kann die Zeit, die zum Rendern von Bildern im ersten Ansichtsfenster benötigt wird, erheblich verkürzen. Das ist wichtig, wenn du die [LCP Zeiten](https://web.dev/lcp/) optimieren willst, um die [Core Web Vitals](https://web.dev/vitals) einzuhalten.

In AMP können Hero Images explizit deklariert werden, indem das Element `amp-img` mit dem Attribut `data-hero` versehen wird:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

AMP Optimizer unterstützen maximal zwei Hero Images auf einer Seite, um zu verhindern, dass die Bandbreite für andere kritische Ressourcen blockiert wird. Wenn du diese Einschränkung nicht akzeptieren kannst, [teile uns dies bitte mit](https://github.com/ampproject/amp-toolbox/issues).

AMP Optimizer erkennen außerdem automatisch Hero Images für die Elemente `amp-img`, `amp-iframe`, `amp-video` oder `amp-video-iframe` und fügen `link rel=preload` für `src` des Bildes ein. Bei der automatischen Erkennung werden HTML Markups und Bildlayouts analysiert, um große Bilder im ersten Ansichtsfenster zu erkennen.

Bei `amp-img` rendern AMP Optimizer das Tag `img` auch serverseitig innerhalb von `amp-img`. Dadurch kann der Browser das Bild sofort rendern, ohne dass die AMP Runtime benötigt wird.

### Bildoptimierung

AMP Optimizer können dir dabei helfen, optimierte, responsive Bilder bereitzustellen, indem sie für das AMP Layout spezifische `srcset`Attribute generieren. So wird z. B. die folgende `amp-img` Deklaration

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

mithilfe der folgenden `srcset` Definition verbessert:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Damit das funktioniert, muss deine Build/Hosting Umgebung die Größenänderung/Optimierung von Bildern unterstützen. Sieh dir die Leitfäden zu den jeweiligen Optimizern an, um zu erfahren, wie du die Bildoptimierung am besten integrierst.

### AMP Module Build (kommt bald)

Es gibt eine kleinere, auf [JavaScript Modules](https://v8.dev/features/modules#browser) basierende Version der AMP Runtime und der verfügbaren Komponenten. Bei dieser Version müssen Benutzer beim Anzeigen einer AMP Seite weniger JavaScript herunterladen. AMP Optimizer aktivieren standardmäßig den AMP Module Build, indem sie

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

wie folgt transformieren:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Browser, die `type="module"` verstehen, ignorieren Skripte mit dem Attribut `nomodule`. Das bedeutet, dass Benutzer mit modernen Browsern von kleineren Runtime Paketen profitieren, während Benutzer mit älteren Browsern auf die Version der AMP Runtime ohne Modules zurückgreifen.

Hinweis: Der AMP Module Build ist nur für transformiertes AMP verfügbar, da das AMP Runtime CSS dafür inline sein muss.
