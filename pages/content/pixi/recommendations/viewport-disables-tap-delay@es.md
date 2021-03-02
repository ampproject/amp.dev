---
'$title': Desactivar el retraso táctil
$order: 50
tags:
  - fid
---

Configure el ancho de la ventana de visualización para que coincida con el ancho del dispositivo y se desactive el retraso táctil, lo que puede aumentar el FID. Para eliminar este retraso táctil de 300 a 350 ms, cambie la notificación de la ventana gráfica en el `<head>` de su página a:

```
<meta name="viewport" content="width=device-width">
```

Esto establece que el ancho de la ventana gráfica sea el mismo que el del dispositivo y generalmente es una práctica recomendada de los sitios optimizados para dispositivos móviles. Puede [obtener más información sobre cómo deshabilitar el retraso táctil en web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
