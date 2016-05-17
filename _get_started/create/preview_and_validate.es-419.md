---
layout: page
title: Versión preliminar y validación
order: 3
locale: es-419
---

Accede a la versión preliminar de la página AMP como lo harías con cualquier otro sitio HTML estático. No hay pasos de compilación ni procesamientos previos obligatorios. Tienes una de las siguientes opciones:

  - **Abrirla directamente en el navegador desde el sistema de archivos** (ciertos elementos podrían no funcionar debido a errores en XMLHttpRequests).
  - **Usar un servidor web local como Apache 2 o Nginx**.
    *(Sugerencia: Para acceder a un servidor web rápido, ejecuta `python -m SimpleHTTPServer`)*.

A continuación, asegúrate de que tu página AMP **sea válida**; de lo contrario, no podrá detectarse ni distribuirse mediante plataformas de terceros como la Búsqueda de Google. Para la validación:

  1. Abre tu página en el navegador.
  1. Agrega “`#development=1`” a la URL; por ejemplo, `http://localhost:8000/released.amp.html#development=1`.
  1. Abre la [consola DevTools de Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) y busca errores de validación.

[Obtén más información acerca de la validación](/docs/guides/validate.html) y de lo que debes hacer cuando encuentres errores.

{% include button.html title="Continuar con el paso 5" link="/docs/get_started/create/prepare_for_discovery.es-419.html" %}
