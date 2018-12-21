---
$title: Prácticas recomendadas para crear historias de AMP
---

[TOC]

En esta guía se indican algunas prácticas recomendadas que deberías seguir al crear [historias de AMP](/es/docs/reference/components/amp-story.html).


## Color de fondo  

Te recomendamos que selecciones un color de fondo para usarlo en las páginas de tu historia de AMP. De este modo, proporcionas a los usuarios una buena experiencia aunque no puedan descargar algún elemento de imagen o de vídeo debido a su conexión de red.

*   El color de fondo debería ser representativo del color dominante del elemento de fondo de la página.
*   Elige un color que permita una transición fluida con la propia imagen o página. Puedes optar por una de las siguientes opciones:
    *   Elegir un color dominante representativo de la imagen o el vídeo.
    *   Utilizar el mismo color de tema en todas las páginas de la historia. 
*   El color de fondo debe ser distinto al color de fuente para que el texto se pueda leer incluso antes de que se cargue la página.

## Texto 

### Asegurarse de que el texto sea legible

Comprueba que las superposiciones de texto de las páginas sean legibles:

* Elige un color de fuente que contraste con la imagen y el color de fondo.
* Añade una superposición con gradiente entre la imagen y el texto para hacer que contrasten.

### Texto breve   

Las historias de AMP están diseñadas para ofrecer una experiencia visual; por tanto, incluye bloques de texto pequeños en las páginas (de una o dos frases como máximo). Si crees que sería conveniente poner más texto en una página, plantéate con detenimiento tus objetivos y el flujo de lectura.

## Vídeo  

### Incluir imágenes de póster 

El atributo `poster` sirve para mostrar una imagen en la interfaz hasta que se descargue el vídeo correspondiente. Suele tratarse del primer fotograma del vídeo, aunque puede ser cualquier imagen.  No obstante, te recomendamos que selecciones una imagen que sea representativa del vídeo y que permita una transición fluida. Si optas por utilizar el primer fotograma del vídeo, asegúrate de que no sea un fotograma temporal en blanco. 

Se recomienda que la imagen de póster tenga las siguientes dimensiones: 720p (720x1280).

*Ejemplo: Definir una imagen de póster*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### Diferencias entre `<source>` y `src` 

Al indicar la fuente de un componente [amp-video](/es/docs/reference/components/amp-video.html), utiliza los elementos secundarios `<source>` en lugar del atributo `src`, ya que con `<source>` puedes especificar el tipo de vídeo y añadir más fuentes. En los elementos `<source>`, el tipo de MIME se define con `type`. Si se trata de vídeos HLS, debes indicar los tipos MIME `application/x-mpegurl` o `application/vnd.apple.mpegurl`. En el resto, incluye el prefijo `video/` seguido del formato (p. ej., `video/mp4`).

*Ejemplo: Especificar varias fuentes*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Tamaño y duración de vídeo

*   Para obtener un rendimiento óptimo, intenta usar vídeos que no ocupen más de 4 MB.
*   Si tienes vídeos largos, trata de dividirlos en varias páginas.
*   Procura no incluir vídeos especialmente grandes en la portada.

### Formatos de vídeo

Si solo puedes ofrecer un solo formato de vídeo, que sea **MP4**.  Sin embargo, cuando sea posible, utiliza vídeos **HLS** e incluye una versión MP4 como respaldo para que se muestre en los navegadores que todavía no admiten los vídeos HLS. HLS realiza streaming con una tasa de bits flexible que permite adaptar la calidad de vídeo a la conexión de red de los usuarios.

[tip type="note"]

El formato de vídeo HLS no se admite en el navegador de escritorio Chrome (ni siquiera mediante simulación), por lo que es obligatorio proporcionar un vídeo de respaldo en formato MP4 para que se muestre a todo el tráfico de ordenadores de tu página. Para depurar vídeos HLS, tienes que usar un dispositivo móvil real a través de la depuración por USB.

[/tip]

### Resolución de vídeo

Los vídeos de una historia de AMP siempre son verticales (es decir, vista vertical), con una proporción esperada de 16:9. Utiliza la resolución recomendada según el tipo de streaming de vídeo: 

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


[tip type="note"]

En el caso de los dispositivos móviles que tengan una proporción distinta a 16:9, los vídeos pueden recortarse horizontal o verticalmente para adaptarlos al viewport.

[/tip]


### Códecs de vídeo

1.  MP4: `H.264`
1.  WEBM: `VP9`
1.  HLS o DASH: `H.264`


### Calidad de vídeo

#### Optimizaciones de transcodificación

A continuación se indican varias herramientas con las que se pueden codificar vídeos y ajustar su calidad mientras se codifican:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### Tamaño de segmentos HLS

Por lo general, los segmentos HLS no deben durar más de 10 segundos.

### Avanzar a la siguiente página al finalizar el vídeo

Si quieres que la historia de AMP avance automáticamente de una página a otra cuando un vídeo termine de reproducirse, incluye el ID del vídeo en el atributo `auto-advance-after` de `<amp-story-page>`, no la duración esperada. Es decir, utiliza

```html
<amp-story-page auto-advance-after="myvideo">
```

no

```html
<amp-story-page auto-advance-after="9s">
```

Te recomendamos que lo hagas de este modo porque es posible que el vídeo no empiece a reproducirse en el mismo instante en que se muestra la página, o puede que la duración introducida no sea la correcta. En ambos casos, la duración esperada y la real no coinciden, lo que puede hacer que el vídeo se reproduzca en bucle y distraer a los usuarios.
 
