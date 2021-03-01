---
'$title': Anúnciese en las historias de AMP
$order: 3
description: Las historias de AMP son una experiencia que puede percibirse en pantalla completa y permite introducir a los lectores en el contenido. Publicitarse mediante anuncios en las historias de AMP permite una integración perfecta y sin interrupciones ...
formats:
  - stories
author: CrystalOnScript
---

Las Historias web son una experiencia táctil en pantalla completa que sumerge a los lectores en el contenido. La publicidad con anuncios Web Story permite una integración perfecta y sin interrupciones en el viaje del usuario, manteniéndolos comprometidos y encantados con la plataforma.

## Colocación de anuncios

Las Historias web utilizan un solo componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) para determinar la cantidad y la ubicación de los anuncios.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) es un resumen del componente [`amp-ad`](../../../documentation/components/reference/amp-ad.md) . Inserta dinámicamente uno o varios anuncios mientras el usuario consume el contenido de la historia. Para garantizar la mejor experiencia de usuario:

1. Los anuncios se renderizan previamente por el tiempo de ejecución de las historias de AMP y luego se insertan. Esto garantiza que a los usuarios nunca se les mostrará un anuncio en blanco o sin descargar.

2. La densidad de anuncios se optimiza con la proporción de contenido para evitar la sobresaturación. El componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) decide cuándo y dónde insertar anuncios a medida que avanza el usuario.

Una historia web coloca el primer anuncio en algún momento después de las dos primeras páginas con el objetivo de optimizar los ingresos por monetización y la experiencia del usuario.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type = "note"] **NOTA -** Una historia web más larga normalmente creará más oportunidades para la colocación de anuncios. La ubicación exacta del algoritmo de anuncios seguirá optimizándose con el tiempo. [/propina]

## La interacción del usuario

Los usuarios pueden avanzar anuncios anteriores de la misma manera que las páginas de historias normales; tocando los dos tercios derechos de la pantalla.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='En la imagen se muestra el área que pueden tocar los usuarios para omitir un anuncio', caption='Los usuarios pueden adelantar los anuncios anteriores tocando dos tercios del lado derecho de la pantalla.', align='' ) }}

Los usuarios interactúan directamente con el anuncio al tocar el botón de [llamada a la acción](story_ads_best_practices.md#call-to-action-button-text-enum) representado por el sistema que aparece en el tercio inferior de todos los anuncios de Web Story. El botón se puede configurar para enviar al usuario a una URL arbitraria (o a la tienda de aplicaciones correspondiente).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Imagen que muestre a los usuarios que están siendo redirigidos a una página de destino para anuncios, pero pueden regresar a la historia.', caption='Los usuarios son redirigidos a una página de destino para anuncios, pero pueden regresar a la historia.', align='' ) }}

## Configurar una historia web para anuncios

Web Stories no puede admitir un [`amp-ad`](../../../documentation/components/reference/amp-ad.md) directamente en la página. En cambio, todos los anuncios se obtienen y se muestran mediante el componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) . El componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) debe colocarse como un elemento secundario directo de [`amp-story`](../../../documentation/components/reference/amp-story.md) .

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

A diferencia de un [`amp-ad`](../../../documentation/components/reference/amp-ad.md) normal, no se requiere `<fallback>` o `<placeholder>` , ya que los anuncios de Web Story solo se muestran una vez que se procesan por completo.

## Empezando con Story Ads

La forma más sencilla de incluir anuncios en su historia web es publicando anuncios desde un servidor de anuncios compatible.

Plataformas publicitarias que actualmente admiten anuncios de historias web:

- El administrador de anuncios de Google <a name="google-ad-manager"></a>
  - [Anuncios de venta directa](https://support.google.com/admanager/answer/9038178)
  - [Anuncios programáticos](https://support.google.com/admanager/answer/9416436)
- Google AdSense próximamente
- Se pueden integrar otras plataformas publicitarias (contáctenos para [obtener más detalles a través de Github](https://github.com/ampproject/amphtml/issues/30769) )

Si usted es un anunciante a publicar sus anuncios dentro Historias web, por favor [extender la mano](mailto:story-ads-wg@google.com) para obtener más información.

Los editores también pueden colocar anuncios personalizados si configuran su propio servidor de anuncios. [El proceso para hacerlo se explica detalladamente aquí](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Lea el artículo [Tráfico de los creativos personalizados en las historias web](https://support.google.com/admanager/answer/9038178) para obtener información sobre cómo subir anuncios al Administrador de anuncios de Google y consulte nuestra guía sobre las [Prácticas recomendadas para crear anuncios en las historias de AMP](story_ads_best_practices.md). [/tip]
