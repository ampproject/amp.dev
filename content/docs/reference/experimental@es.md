---
$title: Componentes experimentales
$order: 5
---

[Los componentes experimentales de AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments) 
son funciones que no están listas para usarse de forma generalizada; de ahí que se califiquen como experimentales 
para que quienes las utilicen estén sobre aviso.

Los desarrolladores y los usuarios pueden habilitar el uso de estas funciones antes de que se publiquen
definitivamente, pero deben usarlas con precaución, ya que pueden contener errores o efectos secundarios que no se 
habían previsto.

## Habilitar el canal para desarrolladores de AMP

El canal para desarrolladores de AMP permite habilitar un navegador para que se utilice en él una versión más reciente de las bibliotecas AMP JS.

La versión del canal para desarrolladores de AMP **puede ser menos estable** y contener funciones que no están disponibles para todos los usuarios. Habilita esta opción si para colaborar quieres probar versiones nuevas de AMP, notificar errores o generar documentos en una nueva función que aún no está disponible para todos.

Habilitar el canal para desarrolladores es perfecto para:

- Probar y jugar con funciones nuevas que todavía no están disponibles para todos los usuarios.
- Utilizarlo en tu proceso de control de calidad y así asegurarte de que tu sitio web es compatible con la próxima versión de AMP.

Si detectas un problema que parece exclusivo de la versión del canal para desarrolladores de AMP, [registra el problema](https://github.com/ampproject/amphtml/issues/new) con su descripción. Recuerda incluir siempre una URL de la página que reproduce el problema.

Para habilitar el canal para desarrolladores de AMP en tu navegador, ve a [la página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) y activa el experimento "AMP Dev Channel". Para recibir notificaciones sobre cambios importantes o de última hora sobre AMP, suscríbete a la lista de correo [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce).

## Habilitar un componente experimental

Si el contenido se ha publicado desde [https://cdn.ampproject.org](https://cdn.ampproject.org), 
accede a la [página de experimentos de AMP](https://cdn.ampproject.org/experiments.html) 
y habilita los componentes experimentales activándolos, o inhabilítalos desactivándolos si es lo que quieres. Al habilitar esta opción, se creará una cookie en tu navegador que habilitará el experimento en todas las páginas AMP que se publiquen a través de Google AMP Cache.

Si el contenido se ha publicado desde cualquier otro dominio, los experimentos se podrán activar desde la consola DevTools cuando el modo de desarrollo se haya habilitado mediante:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Los archivos de AMP que incluyan funciones experimentales no superarán
[la validación de AMP](/es/docs/guides/validate.html). 
Retira estos componentes experimentales de los documentos de AMP listos para producirse.

