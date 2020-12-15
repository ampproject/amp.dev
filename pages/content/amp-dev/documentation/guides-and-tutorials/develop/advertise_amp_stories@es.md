---
"$title": Anúnciese en las historias de AMP
"$order": '3'
description: Las historias de AMP son una experiencia que puede percibirse en pantalla completa y permite introducir a los lectores en el contenido. Publicitarse mediante anuncios en las historias de AMP permite una integración perfecta y sin interrupciones ...
formats:
- stories
author: CrystalOnScript
---

Las Historias web son una experiencia táctil en pantalla completa que sumerge a los lectores en el contenido. La publicidad con anuncios Web Story permite una integración perfecta y sin interrupciones en el viaje del usuario, manteniéndolos comprometidos y encantados con la plataforma.

## Colocación de anuncios

Web Stories use a single  [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component to dictate ad quantity and placement.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) is a wrapper around the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) component. It dynamically inserts one or multiple ads while the user consumes the story content. To ensure the best user experience:

1. Los anuncios se renderizan previamente por el tiempo de ejecución de las historias de AMP y luego se insertan. Esto garantiza que a los usuarios nunca se les mostrará un anuncio en blanco o sin descargar.

2. Ad density is optimised with content ratio to prevent oversaturation. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component decides when and where to insert ads as the user progresses.

Una historia web coloca el primer anuncio en algún momento después de las dos primeras páginas con el objetivo de optimizar los ingresos por monetización y la experiencia del usuario.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **NOTE –** A longer Web Story will typically create more opportunities for ad placement. The exact placement of the ad algorithm will continue to be optimized over time. [/tip]

## La interacción del usuario

Los usuarios pueden avanzar anuncios anteriores de la misma manera que las páginas de historias normales; tocando los dos tercios derechos de la pantalla.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='En la imagen se muestra el área que pueden tocar los usuarios para omitir un anuncio', caption='Los usuarios pueden adelantar los anuncios anteriores tocando dos tercios del lado derecho de la pantalla.', align='' ) }}

Users interact directly with the ad by tapping the system rendered [call to action](story_ads_best_practices.md#call-to-action-button-text-enum) button that appears in the bottom third of all Web Story ads.  The button can be configured to send the user to an arbitrary URL (or to the relevant app store).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Imagen que muestre a los usuarios que están siendo redirigidos a una página de destino para anuncios, pero pueden regresar a la historia.', caption='Los usuarios son redirigidos a una página de destino para anuncios, pero pueden regresar a la historia.', align='' ) }}

## Configurar una historia web para anuncios

Web Stories cannot support an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) directly on the page. Instead, all ads are fetched and displayed by the [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component must be placed as a direct child element of [`amp-story`](../../../documentation/components/reference/amp-story.md).

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

Unlike a normal [`amp-ad`](../../../documentation/components/reference/amp-ad.md), no `<fallback>` or `<placeholder>` is required, as Web Story ads are only displayed once fully rendered.

## Empezando con Story Ads

La forma más sencilla de incluir anuncios en su historia web es publicando anuncios desde un servidor de anuncios compatible.

Plataformas publicitarias que actualmente admiten anuncios de historias web:

- El administrador de anuncios de Google <a name="google-ad-manager"></a>
    - [Direct sold ads](https://support.google.com/admanager/answer/9038178)
    - [Programmatic ads](https://support.google.com/admanager/answer/9416436)
- Google AdSense próximamente
- Other ad platforms can integrate (contact us for [details via Github](https://github.com/ampproject/amphtml/issues/30769))

If you are an advertiser interested in running your ads inside Web Stories please [reach out](mailto:story-ads-wg@google.com) for more information.

Los editores también pueden colocar anuncios personalizados si configuran su propio servidor de anuncios. [El proceso para hacerlo se explica detalladamente aquí](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Lea el artículo [Tráfico de los creativos personalizados en las historias web](https://support.google.com/admanager/answer/9038178) para obtener información sobre cómo subir anuncios al Administrador de anuncios de Google y consulte nuestra guía sobre las [Prácticas recomendadas para crear anuncios en las historias de AMP](story_ads_best_practices.md). [/tip]
