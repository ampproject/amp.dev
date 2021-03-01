---
'$title': Depuración de problemas en el caché de AMP
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: ' ¿Por qué mi documento se dañó en un caché de AMP?'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## ¿Por qué mi documento se dañó en un caché de AMP? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Los documentos válidos de AMP generalmente aparecen y se comportan de la misma forma que las memorias caché de AMP lo hacen en su origen. Sin embargo, hay algunos componentes y configuraciones del servidor que pueden ser problemáticos.

Si un documento en particular aparece y se comporta según lo esperado por su origen, pero no cuando se visualiza mediante el caché ([Cómo mapear el origen de las URL para el caché AMP de Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), intente lo siguiente:

1. Abra la consola de herramientas para reparar errores o el desarrollador de su navegador y solucione cualquier error o advertencia que aparezca.
2. Ejecute el documento mediante [AMPBench](https://ampbench.appspot.com/) y solucione cualquier error o advertencia que aparezca de manera inesperada.

Si continúa teniendo problemas después de seguir estos pasos, consulte la siguiente tabla.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Síntoma</th>
      <th width="30%">Problema</th>
      <th width="40%">Solución</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Las fuentes web no aparecen (se utilizan fuentes de reserva).</td>
      <td>El caché de AMP no se encuentra en la lista blanca elaborada por el proveedor de las fuentes.</td>
      <td>Póngase en contacto con el proveedor de las fuentes y pídale que agregue <a href="https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests#cors-security-in-amp">todos los cachés</a> en la lista de fuentes permitidas.</td>
    </tr>
    <tr>
      <td>Los recursos (por ejemplo, las fuentes e imágenes) no aparecen (<strong>solo aquellos cuyo origen es HTTP</strong>).</td>
      <td>El documento utiliza un protocolo relacionado con las URL.</td>
      <td>Cambie a URL absolutas (es decir, utilice <code>http://www.site.com/doc/amp</code> y no escriba la URL de la siguiente manera <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">No aparecen los recursos (por ejemplo, las fuentes e imágenes).</td>
      <td>Los recursos se proporcionan con el tipo de MIME incorrecto.</td>
      <td>Defina un <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">tipo de MIME que sea adecuado</a>.</td>
    </tr>
    <tr>
      <td>El caché de AMP no puede acceder a los recursos.</td>
      <td>Asegúrese de que el caché de AMP tiene acceso a sus recursos y que no esté bloqueado por una dirección IP, un agente de usuario, etc. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Consulte la Lista de agentes de usuario que utiliza el rastreador de Google</a>).</td>
    </tr>
    <tr>
      <td>Los elementos dinámicos como  <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code>, no se comportan como estaba previsto.</td>
      <td>Faltan encabezados CORS o están rotos.</td>
      <td>Estos componentes realizan solicitudes de origen cruzado desde el caché de AMP hacia su origen. De forma predeterminada, los navegadores bloquean estas solicitudes. Para permitir estas solicitudes, emita <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">encabezados CORS</a> que agreguen <a href="https://amp.dev/documentation/guides-and-tutorials/amp-cors-requests.html">todos los cachés</a> en la lista permitida.</td>
    </tr>
    <tr>
      <td>El contenido que se proporciona debe retirarse debido a una notificación de eliminación por incumplimiento legal.</td>
      <td>El caché de AMP aún no retiró la notificación de eliminación.</td>
      <td>Siga los lineamientos de cada caché de AMP para actualizar el contenido. En el caso del caché AMP de Google, consulte el artículo <a href="https://developers.google.com/amp/cache/update-cache">Cómo actualizar el contenido de AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>
