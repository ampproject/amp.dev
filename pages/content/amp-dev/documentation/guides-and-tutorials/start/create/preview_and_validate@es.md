---
'$title': Versión preliminar y validación
$order: 5
description: Obtenga una vista previa de la página AMP tal como lo haría con cualquier otro sitio HTML estático. No se requiere ningún paso de construcción o de preprocesamiento. Puede elegir...
author: pbakaus
contributors:
  - bpaduch
---

## Vista previa

Obtenga una vista previa de la página AMP tal como lo haría con cualquier otro sitio HTML estático. No se requiere ningún paso de construcción o de preprocesamiento. Puede elegir:

- **Abrir la página directamente en el navegador desde el sistema de archivos** (es posible que algunos elementos no funcionen debido a errores en XMLHttpRequests).
- **Utilizar un servidor web local como Apache 2 o Nginx**. _(Sugerencia: Para acceder a un servidor web rápido, ejecute `python -m SimpleHTTPServer`)_.

## Validación

A continuación, asegúrese de que su página AMP **sea válida**, de lo contrario, no podrá detectarse ni distribuirse mediante plataformas de terceros como Google Search. Para la validación:

1. Abra la página en su navegador.
2. Agregue “`#development=1`” a la URL, por ejemplo, `http://localhost:8000/released.amp.html#development=1`.
3. Abra la [consola DevTools de Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) y busque errores de validación.

[tip type="read-on"] <strong>LEER MÁS:</strong> [Obtenga más información sobre la validación](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) y lo que debe hacer cuando encuentre errores.[/tip]
