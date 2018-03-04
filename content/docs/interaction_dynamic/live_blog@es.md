---
$title: Crear un blog en directo
---
[TOC]

Los blogs en directo son páginas web que se actualizan con frecuencia durante el transcurso de un evento, como la Super Bowl.

 Un blog en directo se puede implementar en una AMP mediante el componente `amp-live-list` si se utilizan etiquetas LiveBlogPosting. Para ver una implementación de ejemplo que puedes utilizar como punto de partida, consulta el [ejemplo de blog en directo](https://www.ampbyexample.com/samples_templates/live_blog/)  que se encuentra en [ampbyexample.com](https://www.ampbyexample.com).

En este tutorial se ofrece una breve descripción general del componente `amp-live-list` y nos centramos en detalles de la implementación, como la paginación y los enlaces profundos, usando el ejemplo de blog en directo como muestra.

## Descripción general de amp-live-list

El componente `amp-live-list` sondea regularmente el documento del host en busca de contenido actualizado y, a medida que van apareciendo nuevos elementos, actualiza el navegador del usuario final. Esto significa que cada vez que se debe añadir una publicación en un blog, el CMS tiene que actualizar el documento del host para incluir la actualización en el cuerpo y en la sección de metadatos.

Este es el aspecto que podría tener un blog inicial:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">¡Nuevas actualizaciones!</button>
    <div items></div>
</amp-live-list>
[/sourcecode]

El atributo `data-poll-interval` permite determinar la frecuencia con la que se realizan los sondeos; si se actualiza el documento del host, el usuario debe poder acceder a la actualización tras el siguiente intervalo de tiempo.

Cada vez que se añade un elemento nuevo al documento del host, el elemento `<button update on="tap:my-live-list.update">` muestra un botón. Al hacer clic en él, la página se activa y muestra las entradas más recientes.

Añadir demasiados blogs en directo puede hacer que la página sea demasiado larga; el atributo `data-max-items-per-page` permite determinar la cantidad de elementos que se pueden añadir a la página del blog en directo. Si, tras una actualización, el número de elementos supera los determinados en `data-max-items-per-page`, se eliminarán las actualizaciones más antiguas hasta que se deje de superar este número. Por ejemplo, si la página ahora contiene nueve elementos, `data-max-items-per-page` es diez y llegan tres nuevos elementos en la última actualización, los dos elementos más antiguos se eliminarán de la página cuando se realice la actualización.

`amp-live-list` requiere que todas las entradas sean elementos secundarios de la etiqueta `<div items></div>`. Al hacer referencia a cada entrada como si se tratara de un elemento, cada uno de ellos debe tener un `id` y un `data-sort-time` únicos.

## Detalles de la implementación de blogs en directo

Ahora que ya conoces el componente `amp-live-list`, vamos a aprender a implementar un blog en directo más complejo. Sigue leyendo para obtener más información sobre cómo implementar la paginación y conocer el funcionamiento de los enlaces profundos.

## Paginación

Los blogs largos pueden utilizar la paginación para mejorar su rendimiento limitando el número de elementos del blog que se pueden mostrar en una misma página. Para implementar la paginación, añade el elemento `<div pagination></div>` al componente `amp-live-list`; a continuación, inserta las etiquetas que sean necesarias (por ejemplo, un número de página o enlaces a la página anterior y a la siguiente).

Al utilizar la paginación, el código simple que hemos utilizado anteriormente pasa a tener el siguiente aspecto:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
    <button update on="tap:my-live-list.update">¡Nuevas actualizaciones!</button>
    <div items></div>
    <div pagination>
    <nav>
        <ul>
            <li>1</li>
            <li>Próximamente</li>
        </ul>
    </nav>
   </div>
</amp-live-list>
[/sourcecode]

Es responsabilidad tuya actualizar la página alojada para que se rellenen correctamente los elementos de navegación. Por ejemplo, en el [ejemplo de blog en directo](https://www.ampbyexample.com/samples_templates/live_blog/) renderizamos la página mediante una plantilla del servidor y empleamos un parámetro de consulta para determinar cuál debe ser el primer elemento del blog de la página. Limitamos el tamaño de la página a cinco elementos, de modo que si el servidor ha generado más de cinco elementos, cuando un usuario accede a la página principal, debe aparecer en el área de navegación el elemento Siguiente.

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

Cuando el tamaño de las entradas del blog supera el número máximo de elementos determinados en `data-max-items-per-page`, los elementos más antiguos del blog aparecerán en las páginas "Siguiente", en la página 2, por ejemplo. Dado que `amp-live-list` sondea el servidor regularmente para ver si se ha producido algún cambio en los elementos, no es necesario comprobarlo si el usuario no se encuentra en la primera página.

Puedes añadir el atributo disabled a la página alojada para evitar que la sondee. En el ejemplo de blog en directo, realizamos este procedimiento en una plantilla del servidor; si la página solicitada no es la primera, añadimos el atributo disabled al componente amp-live-list.

## Enlaces profundos

Al publicar una entrada de blog, es importante realizar un enlace profundo con la entrada para permitir que se comparta, entre otras funciones. Con `amp-live-list`, los enlaces profundos se pueden habilitar simplemente utilizando el ID de cada elemento del blog. Por ejemplo, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3) permite que te desplaces directamente hasta la entrada de blog con el ID "post3".

En el [ejemplo de blog en directo](https://www.ampbyexample.com/samples_templates/live_blog/) empleamos una técnica que se basa en una cookie para generar contenido nuevo (consulta la sección Más información sobre los blogs en directo para obtener más datos sobre este tema), así que si se trata de la primera vez que accedes a la página, es posible que la entrada con el ID "post3" no esté disponible; en tal caso, te redirigiremos a la primera entrada.

