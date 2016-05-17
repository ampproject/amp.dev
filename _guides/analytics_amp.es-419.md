---
layout: page
title: Configurar Analytics
order: 5
folder: analytics
locale: es-419
---

## Decide antes de comenzar

Todas las soluciones de análisis se crean en función de los datos que necesitas
y de cómo quieres analizar esos datos. Decide antes de comenzar:

* Para analizar la captación de usuarios, ¿usarás herramientas de análisis de terceros
o una solución propia?
* ¿Qué comportamientos de los usuarios medirás para comprender la captación de estos?

### ¿Enviarás datos al proveedor o te los enviarás a ti mismo?

Si tienes una solución propia para medir la captación de usuarios,
lo único que necesitarás para integrar el análisis de AMP a esa solución es una URL.
Allí enviarás los datos.
También puedes enviar datos a varias direcciones URL.
Por ejemplo, puedes enviar datos de visualización de la página a una URL
y datos de captación de redes sociales a otra.

El análisis de AMP se diseñó específicamente para realizar mediciones una vez y enviar varios informes.
Si ya trabajas con uno o más proveedores de herramientas de análisis,
consulta la
[especificación de amp-analytics](/docs/reference/extended/amp-analytics.html)
para averiguar si integraron su solución con AMP.
Si lo hicieron, simplemente establece un vínculo con sus documentos desde la especificación
y comienza a seguir las instrucciones.

Si el proveedor de herramientas de análisis no estableció una integración con AMP,
comunícate con él para solicitarle soporte.
También te recomendamos [reportar un asunto en el proyecto de AMP](https://github.com/ampproject/amphtml/issues/new)
para solicitar la adición del proveedor.
Consulta también
[Integración de tus herramientas de análisis en AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### ¿Qué datos necesitas?

¿Qué datos acerca de los usuarios recopilarás para medir la captación?
Debes identificar esos datos para poder configurarlos.

Puntos de datos claves que debes considerar:

* ¿Realizarás un seguimiento solo de las vistas de la página o de otros patrones de captación de usuarios?
(Consulta también la sección [¿amp-pixel o amp-analytics?](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics)).
* ¿Qué tipos de datos puedes capturar acerca de tus usuarios, tu contenido,
el dispositivo o el navegador (consulta también la sección sobre [sustitución de variables](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* ¿Cómo identificarás a tus usuarios (consulta también [Identificación de usuarios](/docs/guides/analytics/analytics_basics.html#user-identification))?
