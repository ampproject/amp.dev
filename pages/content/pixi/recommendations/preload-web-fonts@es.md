---
$title: Cómo cargar previamente las fuentes web
$order: 140
tags:
- lcp
---

La carga previa permite indicarle al navegador cuáles son los recursos esenciales que desea cargar lo antes posible, ¡incluso antes de que sean descubiertos en HTML! Esto es particularmente útil para los recursos que se utilizan en la primera ventana de visualización y en toda la página, como las fuentes. Para ello, agregue el atributo `rel="preload"` en estos recursos, como se muestra a continuación:

```
<link href="font.woff2" rel="preload">
```
