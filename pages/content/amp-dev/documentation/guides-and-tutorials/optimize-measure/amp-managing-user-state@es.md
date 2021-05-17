---
'$title': Cómo administrar el estado del usuario cuando no se autenticó con AMP
$order: 2
formats:
  - websites
teaser:
  text: '**Contenido**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

**Contenido**

- [Antecedentes](#background)
- [Guía de implementación](#implementation-guide)
  - [Antes de comenzar](#before-getting-started)
  - [Tarea 1: configure un identificador y envíe pings analíticos en las páginas sin AMP del editor de origen](#task1)
  - [Tarea 2: configure un identificador y envíe pings analíticos, incluyendo el reemplazo de ID de cliente en los pings amp-analytics, para las páginas AMP](#task2)
  - [Tarea 3: procesar pings analíticos en las páginas del origen del editor](#task3)
  - [Tarea 4: procesar pings analíticos desde el caché de AMP o los contextos de visualización del visor AMP y establecer asignaciones en los identificadores (si es necesario)](#task4)
  - [Tarea 5: utilizar el ID de cliente para vincular y enviar formularios](#task5)
- [Las mejores prácticas recomendadas](#strongly-recommended-practices)

El estado de usuario es un concepto importante en la web actual. Considere los siguientes casos de uso que se habilitan cuando se administra el estado de usuario:

- Durante su segunda visita, un distribuidor crea un **carrito de compras** útil que muestra al usuario los mismos artículos que había agregado al carrito durante su primera visita hace varias semanas antes. Esta experiencia aumenta las posibilidades de que el usuario compre ese artículo al asegurarse de que esté al tanto del artículo que consideró comprar en el pasado.
- Un editor de noticias puede ajustar los **artículos recomendados** a un lector basado en las visitas repetidas que efectúe el lector sobre los artículos del editor, lo que ayuda a mantener la participación del lector y a descubrir más contenido.
- Un desarrollador de sitios web que ejecuta cualquier tipo de sitio recopila **análisis** que pueden indicar si dos vistas de páginas pertenecen a la misma persona que vio dos páginas, o a dos personas diferentes que vieron una sola página. Tener esta información ayuda a saber cómo se está desempeñando el sitio y, en última instancia, cómo mejorarlo.

Este artículo está diseñado para ayudarlo a ser más exitoso para **administrar el estado de usuario sin autenticar en AMP**, una forma de proporcionar una experiencia de usuario perfectamente integrada, incluso si el usuario no llevó a cabo ninguna acción para proporcionar su identidad como iniciar sesión. Después de revisar algunos de los desafíos y consideraciones para abordar este tema, en esta guía se describen las formas en las que AMP es compatible con el estado del usuario y ofrece recomendaciones sobre cómo abordar una implementación técnica.

## Antecedentes <a name="background"></a>

El tema del estado del usuario merece una mención aparte en AMP porque las páginas AMP pueden mostrarse en varios contextos, como su sitio web, en Google Search o en una aplicación de terceros. Esto plantea desafíos en la administración para el estado del usuario cuando navegan entre estos.

### Mostrar contextos para páginas AMP <a name="display-contexts-for-amp-pages"></a>

Puede pensar en AMP como un formato de contenido portátil el cual permite que el contenido se cargue rápidamente en cualquier lugar. Los documentos AMP se pueden mostrar a través de tres contextos destacados:

- El origen del editor
- Un caché de AMP
- Un Visor AMP

<table>
  <tr>
    <th width="20%">Contexto</th>
    <th width="20%">¿Se pueden alojar páginas sin AMP desde aquí?</th>
    <th width="20%">¿Se pueden alojar páginas AMP desde aquí?</th>
    <th>URL de muestra</th>
  </tr>
  <tr>
    <td>El origen del editor</td>
    <td>Sí</td>
    <td>Sí</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Caché de AMP</td>
    <td>No</td>
    <td>Sí</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Visor AMP</td>
    <td>No</td>
    <td>Sí</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Examinemos cada una de estas situaciones más de cerca.

**Contexto #1: el origen del editor.** Las páginas AMP se implementan para que estén alojadas de forma original y sean accesibles a través del sitio del editor, por ejemplo. en `https://example.com` podría contener `https://example.com/article.amp.html`.

Los editores elegirían publicar de forma exclusiva en AMP o publicar dos versiones de contenido (es decir, contenido de AMP “emparejado” con contenido sin AMP). El modelo “emparejado” requiere algunos [pasos particulares](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) para garantizar que las versiones AMP de las páginas se puedan encontrar por los motores de búsqueda, los sitios de las redes sociales y otras plataformas. Ambos enfoques de publicación son totalmente compatibles, depende del editor decidir qué enfoque seguir.

> **NOTA:**
> Debido al modelo de publicación “emparejado” que se acaba de describir, el origen del editor (en el ejemplo anterior, `https://example.com`) es un contexto en el que **se puede acceder tanto al contenido AMP como sin AMP**. De hecho, es el único contexto en el que esto puede suceder porque las memorias caché de AMP y los visores AMP, que se describen a continuación, solo ofrecen contenido AMP válido.

**Contexto #2: un caché de AMP.** Los archivos de AMP se pueden almacenar en el caché de la nube mediante un caché de terceros para disminuir el tiempo real que tarda en llegar el contenido al dispositivo móvil de un usuario.

Al utilizar el formato AMP, el contenido de los archivos AMP está disponible para que terceros lo almacenen en el caché gracias a los productores de contenido. En este tipo de contexto, los editores continúan controlando su contenido (al publicar en su origen como se especificó anteriormente), pero las plataformas pueden almacenarlo en el caché o duplicar el contenido para que los usuarios alcancen una velocidad de entrega óptima.

Tradicionalmente, el contenido que se almacena de esta manera se origina en un dominio diferente. Por ejemplo, [el caché AMP de Google](https://developers.google.com/amp/cache/overview) utiliza `https://cdn.ampproject.org ` para entregar contenido, por ejemplo `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Contexto #3: un visor AMP.** El formato AMP está diseñado para ser compatible con la inserción en visores AMP de terceros. Esto habilita un alto grado de cooperación entre el archivo AMP y la experiencia del espectador, cuyos beneficios incluyen: la precarga y la renderización previa inteligente y segura del contenido y aspectos innovadores como deslizarse entre páginas AMP completas.

Al igual que en el caso del caché de AMP, se espera que el dominio de un visor AMP también sea diferente al editor de origen. Por ejemplo, el visor de Google Search está alojado en `https://google.com` e inserta un iframe que solicita el contenido del editor en el caché AMP de Google.

### Varios contextos significa administrar varios estados <a name="multiple-contexts-means-multiple-state-management"></a>

Los editores deben estar preparados para administrar el estado de usuario para cada contexto de visualización por separado. La característica [ID de cliente](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#client-id) de AMP, que aprovecha las cookies o el almacenamiento local que persisten en el estado, proporciona la compatibilidad necesaria para que las páginas AMP tengan un identificador estable y un seudónimo para el usuario. Desde el punto de vista de la implementación, se utilizan cookies o almacenamiento local, y en AMP se decide cuál utilizar según el contexto de visualización. Esta elección está influida por la viabilidad técnica para administrar la escala del estado en cientos o miles de editores.

Sin embargo, los editores de páginas AMP (de forma involuntaria) acabarían fácilmente diseñando la experiencia de usuario que involucra varios contextos. Revisemos nuestra observación previa del caso de uso para el carrito de compras y agreguemos más especificaciones para crear una **historia de usuario** completa:

> _El día 1, el usuario encuentra una página AMP de Example Inc. a través de Google Search, ya que carga las páginas AMP en un visor AMP. Mientras observa la página, el usuario agrega cuatro artículos a su carrito de compras, pero no concuerdan. Dos semanas después, el día 15, el usuario recuerda los cuatro artículos que estaba considerando comprar y decide que ahora es el momento de comprar. Accede a la página de inicio de Example Inc. directamente en `https://example.com` (es una página de inicio sin AMP) y descubre que sus cuatro artículos todavía están guardados en el carrito de compras._

En este escenario, el usuario recibe una experiencia uniforme en el carrito de compras a pesar de que pasó del contexto para un visor AMP a un contexto para editor de origen, y con el tiempo que transcurre entre estos eventos. Esta experiencia es muy razonable y, si está diseñando una experiencia de compra, debe esperar a que sea compatible, entonces, ¿cómo le hace para que ocurra?

**Para habilitar esta y cualquier experiencia que involucre el estado de usuario, en todos los contextos por los que pase el usuario debe compartir su estado de administración que esté separado de otros.** “¡Perfecto!”, se menciona con la idea de compartir los valores de las cookies con identificadores de usuario mediante límites en los contextos. Indicación: aunque cada uno de estos contextos muestre contenido controlado por el mismo editor, cada uno ve al otro como un tercero porque cada contexto reside en dominios diferentes.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="La capacidad de AMP para mostrarse en muchos contextos significa que cada uno de esos contextos tiene su propio almacenamiento para identificadores" src="https://github.com/ampproject/amphtml/raw/main/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Como podrá ver en la siguiente discusión, estar en la posición de un tercero cuando se interactúa con las cookies puede presentar desafíos, dependiendo de cómo se ajuste la configuración en el navegador del usuario. En particular, si las cookies de terceros se bloquean en una situación particular, entonces impedirá que la información se comparta entre los contextos. Por otro lado, si se permiten las operaciones de cookies de terceros, la información se puede compartir.

## Guía de implementación <a name="implementation-guide"></a>

En esta sección se le proporcionan recomendaciones para administrar el estado del usuario. Las siguientes tareas se presentan como un adelanto, pero en gran medida se pueden ver en dos partes:

**Fragmento #1: implementación básica:** las tareas 1 a 4 son esenciales para que las características básicas funcionen. Dependen de un conjunto mínimo de características necesarias para realizar tareas de forma parcial: sustitución en el ID de cliente de AMP, lectura y escritura de cookies y mantenimiento de una tabla de asignación backend. ¿Por qué “parcialmente”? Debido a que los pasos que se dan en estas tareas se basan en la lectura y escritura de cookies y debido a que la configuración de cookies del navegador pueden evitar esto en ciertas circunstancias, es probable que este conjunto de tareas sea insuficiente para administrar completamente el estado del usuario en todos los escenarios.

Después de sentar las bases, consultamos un tema con una variedad más limitada de casos de uso, pero que ofrezca una solución completa para esos casos de uso.

**Fragmento #2: uso del ID de cliente en los enlaces y el envío de formularios:** En la Tarea 5 aprenderá a aprovechar los enlaces secundarios y/o el envío de formularios para dar la información sobre el ID de cliente de AMP en el contexto de los límites donde el usuario pasa desde una página directamente a otra.

> **PRECAUCIÓN:**
> En la siguiente guía de implementación se aconseja usar y trabajar con cookies. Asegúrese de consultar la sección [Las mejores prácticas recomendadas](#strongly-recommended-practices) para obtener sugerencias importantes sobre que debe tener en cuenta.

### Antes de comenzar <a name="before-getting-started"></a>

Al recorrer la guía técnica que se presenta a continuación, supongamos que vinculará el **estado de usuario** con un **identificador** estable que representa al usuario. Por ejemplo, el identificador podría verse como `n34ic982n2386n30`. Después asocie `n34ic982n2386n30` a cualquier conjunto de información que se encuentra en el estado del usuario, en el lado del servidor, ya sea el contenido del carrito de compras, una lista de artículos leídos anteriormente u otros datos, según el caso de uso.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Se podría usar un único identificador para administrar el estado del usuario para muchos casos de uso" src="https://github.com/ampproject/amphtml/raw/main/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

Para obtener mayor claridad en el resto de este documento, nombraremos varias cadenas de caracteres con un signo de dólar (`$`) previo ya que son identificadores con nombres más legibles:

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Nuestro caso de uso:** a lo largo de esta guía, trabajaremos en un ejemplo diseñado para lograr un seguimiento simple para vistas de páginas (es decir un análisis) con el cual deseamos producir el recuento de usuarios que sea lo más preciso posible. Esto significa que incluso si el usuario accede al contenido de un editor en particular desde diferentes contextos (incluyendo pasar entre páginas AMP y sin AMP), queremos que estas visitas se cuenten para comprender de forma particular al usuario, eso es igual a que si el usuario estuvo navegando solo en las páginas tradicionales sin AMP de dicho editor.

**Suposición sobre la disponibilidad de valores de cookies estables:** también suponemos que el usuario utiliza el mismo dispositivo, navegador y navegación sin privacidad/de incógnito, para asegurar que los valores de las cookies se conserven y estén disponibles a través de todas las sesiones del usuario a lo largo del tiempo. Si este no es el caso, no se debe esperar que estas técnicas funcionen. Si es necesario, busque administrar el estado del usuario basándose de la autenticación de la identidad del usuario (es decir, que inició sesión).

**Los conceptos que se presentan a continuación se pueden extender a otros casos de uso:** aunque nos enfocamos solo en el caso de uso de los análisis, los conceptos que se presentan a continuación se pueden reutilizar para otros casos de uso en los que se necesita administrar el estado del usuario en distintos contextos.

<a id="task1"></a>

### Tarea 1: configure un identificador y envíe pings analíticos en las páginas sin AMP del editor de origen <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Comencemos configurando los análisis para las páginas sin AMP alojadas fuera del origen del editor. Esto se puede lograr de muchas maneras, ya sea incluyendo el uso de un paquete de análisis como Google Analytics o Adobe Analytics,o al escribir una implementación personalizada.

Si está utilizando un paquete con un software para realizar análisis de un proveedor, es probable que ese paquete se encargue tanto de configurar las cookies como de transmitir pings a través de su código de configuración y de las API. Si este es el caso, debe leer los siguientes pasos para asegurarse de que coincidan con su enfoque de análisis, aunque esperamos que no necesite realizar ningún cambio para completar esta tarea.

En el resto de esta tarea se ofrece orientación si desea configurar sus propios análisis.

##### Cómo configurar un identificador mediante cookies de origen <a name="set-up-an-identifier-using-first-party-cookies"></a>

Si tiene páginas sin AMP que se alojan desde el origen de su editor, configure un identificador persistente y estable que se utilizará en estas páginas. Esto normalmente se [implementa con cookies de origen](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking).

Para el fin de nuestro ejemplo, supongamos que configuró una cookie llamada `uid` (“identificador de usuario”) que se creará en la primera visita de un usuario. Si no es la primera visita del usuario, entonces se leerá el valor que se estableció previamente en la primera visita.

Esto significa que hay dos casos para el estado de las páginas sin AMP en el origen del editor:

**Caso #1: visita inicial.** Al acceder por primera vez a la página sin AMP, no habrá ninguna cookie. Si marcó la cookie antes de que se estableciera una, no verá valores establecidos en la cookie que correspondan al `uid`:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

En algún momento de la carga inicial, se debe configurar la cookie, de modo que si hace esto una vez que se cargue la página, verá que se estableció un valor:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Caso # 2: Sin una visita inicial.** Habrá un conjunto de cookies. Por lo tanto, si abre la consola para desarrolladores en la página, verá:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Cómo enviar pings analíticos <a name="send-analytics-pings"></a>

Una vez que haya configurado un identificador, ahora puede incorporarlo en los pings analíticos para comenzar a rastrear las vistas de página.

La implementación específica dependerá de la configuración que desee, pero en general buscará enviar pings (solicitudes) a su servidor de análisis, las cuales incluyen datos útiles propios dentro de la URL de la solicitud. A continuación, se muestra un ejemplo en el que también se indica cómo se incluiría el valor de su cookie dentro de la solicitud:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Tenga en cuenta que en el ejemplo anterior, el identificador del usuario se señala mediante un parámetro de consulta específico, `user_id`:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

En este caso, el uso de “`user_id`” debe establecerse por lo que su servidor de análisis se espera para procesar y no se vincula específicamente a lo que llama cookie, que almacena al identificador de manera local.

<a id="task2"></a>

### Tarea 2: configure un identificador y envíe pings analíticos, incluyendo el reemplazo de ID de cliente en los pings amp-analytics, para las páginas AMP <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

En cuanto a las páginas de AMP, veamos cómo puede establecer y enviar un identificador analítico. Esto se implementará independientemente del contexto en el que se presente la página AMP, por lo que abarca cualquier página AMP que se encuentre en el origen del editor, que se aloje mediante un caché de AMP o se muestre en el Visor AMP.

Mediante el uso de funciones que requieren un ID de cliente, AMP hará el trabajo “con muchas más opciones” para generar y almacenar valores ID de cliente y hará que se aparezcan las funciones que requieran. Una de las principales características que puede utilizar el ID de cliente de AMP es [amp-analytics](https://amp.dev/documentation/components/amp-analytics), que resulta ser exactamente lo que necesitaremos para implementar nuestro ejemplo para el caso de uso de análisis.

En las páginas de AMP, construya un ping amp-analytics que contenga el ID de cliente:

<table>
  <tr>
    <td width="40%"><strong>La configuración de amp-analytics se ve así:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>Lo que pasa por la red se ve así:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>En este caso, <code>${clientId(uid)}</code> se reemplaza por un valor real que AMP genera en ese momento o lo devolverá dependiendo lo que el navegador del usuario ya haya almacenado de forma local.</em></p>
</td>
  </tr>
</table>

Tenga en cuenta el hecho de que el parámetro `uid` se convirtió en la sustitución del ID de cliente,`${clientId(uid)`. Esta fue una elección deliberada que coincide con el mismo nombre que la cookie utilizó en el origen del editor, como se describe en la [Tarea 1](#task1). Para llevar a cabo una integración más continua, debe implementar la misma técnica.

En cuanto al resto de la implementación de amp-analytics, consulte la documentación para la [configuración de amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/) y obtenga más información sobre cómo configurar las solicitudes de amp-analytics o modificar las de su proveedor de análisis. El ping se puede modificar aún más para enviar datos adicionales que defina directamente o aprovechar otras [sustituciones de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md).

> **Es bueno saber:**
> ¿Por qué usamos el nombre `uid` para el parámetro que se convierte en la característica ID de cliente? El parámetro que toma la sustitución `clientId(...)` se utiliza para definir el objetivo. De hecho, puede utilizar la característica ID de cliente para muchos casos de uso y, como resultado, generar muchas ID de cliente. El parámetro diferencia entre estos casos de uso y, por lo tanto, lo utiliza para especificar qué caso de uso le gustaría un ID de cliente. Por ejemplo, es posible que desee enviar diferentes identificadores a terceros, como un anunciante, y podría utilizar el parámetro “focus” para lograrlo.

En cuanto al origen del editor, es más fácil imaginar a “focus” como lo que llama a la cookie. Cuando sugiera un valor `uid` para el parámetro ID de cliente en la [Tarea 2](#task2), nos ajustaremos con la opción de utilizar una cookie llamada `uid` en la [Tarea 1](#task1).

<a id="task3"></a>

### Tarea 3: procesar pings analíticos en las páginas del origen del editor <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

Debido a la configuración que se llevó a cabo en las Tareas 1 y 2, cuando alguien accede a la versión AMP (desde cualquier contexto) o la versión sin AMP en el origen del editor, el ping analítico utilizará el mismo identificador. Al seguir la guía de la [Tarea 2](#task2) para elegir un “focus” en el ID de cliente que era el mismo nombre que el de la cookie que utilizó en la [Tarea 1](#task1), AMP reutiliza la misma cookie.

Esto se ejemplifica en la siguiente tabla:

<table>
  <tr>
    <td width="40%">Un ping analítico procedente de una  <strong>página sin AMP en el origen del editor</strong> tiene el siguiente aspecto</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Un ping analítico procedente de una <strong>Página AMP en el origen del editor </strong> tiene el siguiente aspecto</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>En este caso, ¡es lo mismo! Al elegir un valor focus de <code>uid</code>, se utiliza el valor subyacente de la cookie <code>uid</code>, que es <code>$publisher_origin_identifier</code>.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Tarea 4: procesar pings analíticos desde el caché de AMP o los contextos de visualización del visor AMP y establecer asignaciones en los identificadores (si es necesario) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Cuando configuramos los pings analíticos en la [Tarea 2](#task2) para transmitir los datos de las páginas AMP que se muestran en el caché de AMP o en el visor AMP, también generamos un problema. Como se señaló anteriormente, los contextos del caché de AMP y del visor AMP son diferentes del contexto de origen del editor, y al mismo tiempo incluyen una forma diferente de mantener los identificadores. Para procesar estos pings y evitar problemas como el exceso de usuarios, llevaremos a cabo algunos [pasos](#implementation-steps) para intentar reconciliar los identificadores tan frecuentemente como podamos.

Para ayudar a explicar los pasos que estamos dando, es útil reconsiderar primero exactamente cómo surge el problema del conteo excesivo.

#### Cómo examinar el problema <a name="reviewing-the-problem"></a>

Considere la siguiente secuencia:

1. Un usuario visita la **página AMP en el contexto que se muestra en el visor AMP**, como `https://google.com/amp/s/example.com/article.amp.html`. Dado que el visor AMP no tiene acceso a la cookie `uid` en el origen del editor, se genera un valor aleatorio en `$amp_client_id` para identificar al usuario.
2. A continuación, el mismo usuario visita **una página en el origen del editor `https://example.com`**. Como se describe en la [Tarea 3](#task3), el usuario se identifica con `$publisher_origin_identifier`.

En este caso (1) y (2) ocurren en diferentes orígenes (o contextos). Debido a esto, no hay un estado compartido y `$amp_client_id` es diferente de `$publisher_origin_identifier`. Entonces, ¿cuál es el impacto? (1) es una sesión única de la vista de página que es similar a un usuario y (2) es otra sesión única de la vista de página que es similar a la llegada de otro usuario. **Básicamente, aunque el usuario se mantuvo participando en el contenido de `https://example.com` contamos un exceso de usuarios parece que se devolvió el usuario en (1, una sola visita de página).**

#### Estrategia de solución <a name="solution-strategy"></a>

Para abordar el problema del conteo excesivo, debería emplear la siguiente estrategia, cuya potencia depende de si se permite la lectura o la escritura en cookies de terceros:

- **Reconciliación inmediata de los identificadores: Si puede acceder o cambiar las cookies en el origen del editor**, utilice o genere el identificador de origen del editor e ignore cualquier identificador dentro de la solicitud para realizar análisis. Podrá vincular con éxito la actividad entre los dos contextos.
- **Retraso en la reconciliación de los identificadores: Si no puede acceder o cambiar el identificador en el origen del editor (es decir, las cookies)**, entonces recurra al ID de cliente de AMP que se encuentra dentro de la propia solicitud de análisis. Utilice este identificador como “**alias**”, en vez de utilizar o crear un nuevo identificador de origen del editor (cookie), lo cual no puede hacer (debido al que se bloquearon las cookies de terceros), y agregue el alias a una **tabla de asignación**. No podrá vincular inmediatamente la actividad entre los dos contextos, pero al utilizar una tabla de asignación podrá vincular el valor del ID de cliente de AMP con el identificador de origen del editor cuando el usuario lleve a cabo una visita en el futuro. Cuando esto ocurra, dispondrá de la información necesaria para vincular la actividad y reconciliar que las visitas a la página en los diferentes contextos que provienen del mismo usuario. En la tarea 5 se describe cómo lograr una solución completa para escenarios específicos en los que el usuario pasa inmediatamente de una página a otra.

#### Implementación de pasos <a name="implementation-steps"></a>

Verifique si existe un identificador para el origen del editor en el servidor.

Lea las cookies enviadas como parte de la solicitud de análisis. En nuestro ejemplo, esto significa verificar la cookie `uid` de example.com.

- Si el valor de `uid` se lee correctamente, utilícelo para registrar datos analíticos (**identificador de registro analítico**). Gracias a la [Tarea 1](#task1), sabemos que el valor de este identificador es $ `$publisher_origin_identifier`. Con un identificador de registro analítico establecido, podemos ir directamente a la sección [Almacenamiento de datos](#data-storage).
- Si el valor de `uid` no se lee correctamente, lleve a cabo los siguientes pasos relacionados con la tabla de asignación.

##### Tabla de asignación <a name="mapping-table"></a>

Nuestra tabla de asignación asociará los valores ID del cliente de AMP que se encuentran en los pings analíticos con los identificadores de origen en los editores de la siguiente manera:

<table>
  <tr>
    <th width="50%"><strong>ID de usuario en el origen del editor</strong></th>
    <th width="50%"><strong>El ID de usuario en la página de AMP que NO está en el origen del editor (“alias”)</strong></th>
  </tr>
  <tr>
    <td>Se incluye en el identificador de origen del editor o se genera como un valor prospectivo si no se puede acceder al identificador de origen del editor.</td>
    <td>Se incluye en el ID de cliente de AMP</td>
  </tr>
</table>

Inmediatamente después de determinar que no pudo leer el identificador de origen del editor, verifique si el ID de cliente AMP incluido en el ping analítico ya se utiliza en una asignación. Para hacer esto, primero consulte la solicitud de entrada de amp-analytics para obtener el valor ID de cliente. Por ejemplo, en esta solicitud:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

extraemos la porción que se encuentra en negritas que corresponde al ID de cliente de AMP: `$amp_client_id`.

En seguida, examine la tabla de asignación para tratar de encontrar el mismo valor en la columna “alias”:

<table>
  <tr>
    <th width="50%"><strong>ID de usuario en el origen del editor</strong></th>
    <th width="50%"><strong>El ID de usuario en la página de AMP que NO está en el origen del editor (“alias”)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

En el ejemplo anterior, encontramos un registro que ya existe. El valor que encontramos emparejado con el ID de cliente de AMP se convierte en el identificador del registro de análisis, en este caso es `$existing_publisher_origin_identifier`. Con un identificador del registro de análisis establecido, podemos ir directo a la sección Almacenamiento de datos.

De lo contrario, si el ID de cliente de AMP no se encuentra en una asignación necesitaremos crear una:

1. Genere un **identificador del origen para el editor prospectivo**. Al que llamaremos `$prospective_identifier` en los siguientes ejemplos. Este valor debe generarse con base en la forma en que se configura el valor en el origen del editor, como se describió en la [Tarea 1](#task1) anterior.
2. A continuación, intente [establecer](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) el identificador de origen para el editor potencial como una cookie en el origen del editor. Esto ocurrirá si se pueden escribir cookies de terceros, de lo contrario fallará.
3. Posteriormente, almacene el par {identificador de origen del editor potencial, ID de cliente AMP}.

Al final, la asignación que creamos se parecerá a esto:

<table>
  <tr>
    <th><strong>ID de usuario en el origen del editor</strong></th>
    <th><strong>El ID de usuario en la página de AMP que NO está en el origen del editor (“alias”)</strong></th>
  </tr>
  <tr>
    <td> <code>$prospective_identifier</code> (generado justo a tiempo, cuando se recibe el ping analítico)</td>
    <td>
<code>$amp_client_id</code> (se incluye en el ping analítico)</td>
  </tr>
</table>

Utilizaremos el identificador de origen del editor potencial como identificador del registro de análisis, ya que es el valor asociado al estado del origen del editor. En este caso es `$prospective_identifier`, que se pondrá en marcha en la siguiente sección [Almacenamiento de datos](#data-storage).

##### Almacenamiento de datos <a name="data-storage"></a>

Ahora que encontró el identificador del registro de análisis, puede almacenar la información del estado del usuario (en ese caso, datos de análisis), que se codifica con ese identificador:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Tarea 5: utilizar el ID de cliente para vincular y enviar formularios <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

En general, cuando no se permite la lectura y escritura de cookies de terceros, habrá situaciones en las que será imposible realizar de forma totalmente eficaz la administración del estado de usuario. Los pasos que llevamos a cabo en las Tareas 1 a 4 nos ayudan de dos maneras: (1) proporcionan una solución totalmente efectiva para permitir leer y escribir cookies de terceros, y (2) se configura nuestro sistema para aprovechar cualquier posible oportunidad para reconciliar los identificadores de contexto cruzado si la reconciliación inmediata es imposible debido a la configuración de las cookies del navegador.

En esta tarea, se abarcará una optimización adicional que ayuda cuando el usuario navega a través de los contextos de una página a otra, ya sea **mediante enlaces o envíos de formularios**. En estas situaciones, y con el trabajo de implementación que se describe a continuación, es posible establecer un esquema totalmente efectivo para administrar el estado del usuario en todos los contextos.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Los enlaces se pueden utilizar para pasar la información del identificador de un contexto a otro contexto (vinculado)" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

##### Cómo utilizar las características de sustitución <a name="using-substitution-features"></a>

En nuestro enfoque se aprovecharán dos tipos de [sustituciones de variables AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-var-substitutions.md).

**Cómo actualizar los enlaces de salida que se utilizan en una sustitución ID de cliente:** Defina un nuevo parámetro de consulta, `ref_id` (“ID de referencia”), que aparecerá dentro de la URL y se indicará el **identificador del contexto de origen** para el usuario. Configure este parámetro de consulta para que sea igual al valor de sustitución ID de cliente de AMP:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Solución alternativa para pasar del ID de cliente a los enlaces de salida:** defina el nuevo parámetro de consulta `ref_id` como parte de los atributos para datos `data-amp-addparams` y para las consultas que necesiten sustituciones de parámetros, proporcione esos detalles como parte de `data-amp-replace`. Con este enfoque, la URL se verá libre y los parámetros que se especificaron en `data-amp-addparams` se agregarán de forma dinámica.

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

Para cambiar varios parámetros de consulta mediante los `data-amp-addparams` separe esos `&` como

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Cómo actualizar las entradas del formulario para utilizar una sustitución ID de cliente:** defina un nombre para el campo de entrada, como `orig_user_id`. Especifique `default-value` en el campo de formulario para que sea el valor de sustitución ID de cliente de AMP:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Al seguir estos pasos, el ID de cliente estará disponible para el servidor de destino y/o como un parámetro URL en la página a la que el usuario accede después de hacer clic en el enlace o de enviar el formulario (el **contexto de destino**). El nombre (o “clave”) será `ref_id` porque así se definió en las implementaciones anteriores y tendrá un valor asociado igual al ID de cliente. Por ejemplo, al seguir el enlace (etiqueta `<a>`) que se definió previamente, el usuario navegará a esta URL:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Ejemplo de cómo un identificador en un contexto de visor de AMP se puede pasar a través de un enlace a un contexto de origen de editor" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Cuando el usuario llega a una página que contiene un valor `ref_id` ya sea un parámetro URL o en el encabezado, tenemos la oportunidad de coprocesar el identificador `ref_id` junto con el identificador que se muestre a través de la propia página (es decir, el valor de una cookie). Al incluir ambos en un ping analítico, su servidor de análisis puede trabajar con ambos valores de forma simultánea y, si sabe que están relacionados, reflejar esta relación en su backend. En el siguiente paso se proporcionan los detalles sobre cómo llevar a cabo esto.

##### Cómo extraer parámetros para consulta de URL <a name="extracting-url-query-parameters"></a>

Mediante el uso de características de sustitución, establecemos un flujo de navegación para enlaces o un flujo de envío de formularios en los que se exhibe la información, específicamente el ID de cliente, al servidor de destino y/o como un parámetro URL que puede leerse en el cliente una vez que el usuario concluya la navegación.

Si solo se le mostró la información al servidor, por ejemplo mediante un formulario POST, posteriormente puede dirigirse a procesar la información y renderizar la página que se haya generado. Al procesar dichos datos, tenga en cuenta los pasos relacionados con la [validación de parámetros](#parameter-validation) que se explica a continuación.

Si la información está disponible a través de una URL y desea procesarla, hay un par de enfoques que puede utilizar:

- Proceso durante la redirección (manejo del lado del servidor)
- Proceso en la página de destino (manejo del lado del cliente)

**Proceso durante la redirección (manejo del lado del servidor)**

Para procesar durante la redirección, maneje la solicitud en el servidor y extraiga los parámetros relevantes. Tenga en cuenta los pasos relacionados con la [validación de parámetros](#parameter-validation) que se explican a continuación. Procesar los datos, combinados con valores de cookies que contengan otros identificadores relevantes, y después redirigirlos a una URL que no contenga los parámetros.

**Proceso en la página de destino (manejo del lado del cliente)**

Para procesar la página de destino, el enfoque variará dependiendo de si es una página AMP o una página sin AMP.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Ejemplo de cómo construir un ping analítico que contiene un identificador del contexto anterior proporcionado a través de una URL y un identificador del contexto actual" src="https://github.com/ampproject/amphtml/raw/main/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

_Actualizaciones de la página AMP:_ Utilice la característica de sustitución de parámetros de consulta en su configuración amp-analytics para obtener el valor de identificación `ref_id` dentro de la URL. La característica parámetros de consulta toma un parámetro que indica la “clave” del par clave-valor deseado en la URL y devuelve el valor correspondiente. Utilice la característica del ID de cliente como lo hicimos para obtener el identificador en el contexto de la página AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Cuando esto se transmita a través de la red, los valores reales serán reemplazados:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Para seguir con nuestros ejemplos anteriores, tenemos:

[sourcecode:text] $referrer_page_identifier is $amp_client_id $current_page_identifier is $publisher_origin_id [/sourcecode]

así que el ping es en realidad:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Recomendamos validar la autenticidad de los valores en los parámetros de la consulta siguiendo los pasos indicados en la sección de [validación de parámetros](#parameter-validation) que se muestra a continuación.

_Actualizaciones de la página sin AMP:_ Del mismo modo, en una página sin AMP alojada en el origen de su editor, extraiga y transmita el valor `ref_id` que se encuentra en la URL. Valide la autenticidad del valor siguiendo los pasos indicados en la sección [validación de parámetros](#parameter-validation) que se muestra a continuación. Después, genere pings analíticos que incluyan tanto un `orig_user_id` derivado de `ref_id` como un `user_id` basado en el valor del identificador de la cookie de la primera parte.

<blockquote>
<p><strong>IMPORTANTE:</strong></p>
<p>Si elige procesar los parámetros del lado del cliente en la página de destino, esta debe eliminar la información del identificador en las URL tan pronto como se pueda captar el identificador.</p>
<p>Antes de eliminar los parámetros, asegúrese de que el otro código que necesita ejecutarse para leerlos pueda:</p>
<ul>
  <li>Ejecutarse antes de que ocurra la eliminación, o</li>
  <li>Pueda acceder a una ubicación donde el código que leyó y eliminó los parámetros que almacenaron los datos</li>
</ul>
<p>Para hacer esto su página sin AMP debe incluir el siguiente JavaScript que eliminará todos los parámetros de consulta de la URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Adapte esto según sea necesario para eliminar la menor cantidad de parámetros de consulta.</p>
</blockquote>

##### Cómo procesar varios identificadores en un ping analítico

A diferencia de la [Tarea 4](#task4), donde configuramos el ping analítico para que contenga un solo valor de identificación, con los pasos que hemos dado hasta ahora en la Tarea 5 tenemos dos - `orig_user_id` y `user_id`. Más adelante observaremos cómo procesar estos dos identificadores que conforman el ping analítico de entrada.

Antes de continuar, asegúrese de tomar en cuenta los pasos descritos en los [Parámetros de validación](#parameter-validation) a continuación y de que está dispuesto a confiar en los dos valores indicados por `orig_user_id` y `user_id`.

Verifique si alguno de los valores correspondientes está presente en su tabla de asignación. En nuestro ejemplo anterior, la primera vista de página ocurre en una página AMP que NO está en el origen del editor, seguida de la segunda vista de página que se encuentra en el origen del editor. Como resultado, los valores de los parámetros de consulta del ping analítico se verán así:

**Caso # 1: organización del identificador cuando el ping analítico se envía desde la página en el origen del editor**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>ID de usuario en el origen del editor</strong></th>
    <th width="40%"><strong>El ID de usuario en la página de AMP que NO está en el origen del editor (“alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Cómo se expresa en el ping analítico</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parámetro clave</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valor del parámetro</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Tenga en cuenta que el identificador que proviene de la vista de página corresponde a la columna que se encuentra a la derecha y el identificador que proviene de la segunda vista de página corresponde con la columna central, de acuerdo con cómo se construyó nuestro flujo en el ejemplo anterior.

En cambio, si el usuario comienza en una página alojada en el origen del editor y posteriormente navega a una página de AMP que NO está en el origen del editor, entonces las claves de los parámetros se invertirán, pero no será la forma en la que se relacionan los valores ( es decir, `$amp_client_id` siempre se refiere a un identificador almacenado en una página AMP que NO está en el origen del editor):

**Caso # 2: organización del identificador cuando el ping analítico se envía desde una página AMP que NO está en el origen del editor**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>ID de usuario en el origen del editor</strong></th>
    <th width="40%"><strong>El ID de usuario en la página de AMP que NO está en el origen del editor (“alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Cómo se expresa en el ping analítico</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Parámetro clave</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Valor del parámetro</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Cuando busque en la tabla de asignación, tome nota de qué situación se implementa y busque valores que estén dentro de las columnas de la tabla de asignación, donde espera que aparezcan. Por ejemplo, si el ping analítico se envía desde una página en el origen del editor (Caso # 1), verifique los valores clave de `user_id` en la columna de la tabla de asignación “ID de usuario en el origen del editor” y verifique los valores clave de `orig_user_id` en la columna “ID de usuario que se encuentra en la página AMP que NO está en el origen del editor (‘alias’)”.

Si no puede localizar ninguno de los valores de identificación que se utilizan en su tabla de asignación, establezca una nueva asignación:

- Si la solicitud de análisis proviene de la página de origen de su editor, entonces debe elegir el valor correspondiente a `uid` para que sea el identificador en el registro de análisis, elija el valor de `orig_uid` para que sea el “alias”.
- Si la solicitud de análisis no proviene de una página en el origen de su editor, entonces debe elegir el valor correspondiente a `uid` para que sea un valor de "alias" en la tabla de asignación. Después, continúe con las instrucciones restantes de la [Tarea 4](#task4) para crear un identificador para posible el origen del editor e intente establecer este valor como una cookie en el origen.

##### Parámetros de validación <a name="parameter-validation"></a>

Los valores incluidos en una URL pueden modificarse maliciosamente, tener un formato incorrecto o, de alguna manera, que no sean los valores esperados para ese lugar. De la misma manera que es importante asegurarse de que los ping analítico que recibe su servidor de análisis provienen de las páginas esperadas para que le envíen pings analíticos, cuando “envíe” valores que formaban parte de la URL, asegúrese de validar el remitente para asegurarse de que puede confiar en estos valores.

Por ejemplo, en los pasos anteriores, construimos la siguiente URL, destinada a que el usuario haga clic y navegue hacia la página correspondiente:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Sin embargo, es posible que el usuario o algún atacante cambie esta URL para que sea:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Desea asegurarse de que se procesen solo instancias `$amp_client_id` y evitar el uso de instancias `$malicious_value`.

**Pasos sugeridos para validar los valores recibidos a través de los parámetros de consulta de la URL:** Confirmar que el remitente de la página de destino coincida con la URL que espera ver. Generalmente, esta debería ser una que haya observado llevando el valor de un identificador previamente visto en una solicitud CORS válida. Le recomendamos que solo acepte tales identificadores conocidos.

En una página sin AMP, verifique directamente `document.referrer` en el lado del cliente o adopte el valor como parte del ping analítico para que se pueda validar en el lado del servidor. Si puede confiar en el valor de referencia, entonces puede aceptar y procesar los valores que se originaron en la URL de la página de destino, como `orig_user_id` que se mostró en el ejemplo anterior.

En una página AMP, utilice la variable de sustitución que se encuentra en el [documento del remitente](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#document-referrer) para aprobar el valor de referencia como parte del ping analítico. El procesamiento del lado del servidor es la única opción disponible. Como ejemplo, aquí puede ver un ping analítico que la página de destino puede enviar el cual contiene (1) el valor ID de cliente de la página actual, (2) un valor que se adopta mediante la URL que configuramos para que sea el valor ID de cliente en la página del remitente, y (3) la propia información del emisor para validar el valor que se adoptó en (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Si no puede confiar en el remitente, entonces rechace cualquier valor proporcionado mediante los parámetros de la URL y no los utilice.

## Las mejores prácticas recomendadas <a name="strongly-recommended-practices"></a>

### Mantenga una sola asociación <a name="keep-just-one-association"></a>

**Solo debe mantenerse una asociación entre los identificadores de cualquiera de los dos contextos.** Si un ID de cliente de AMP que asoció previamente con una cookie u otro identificador de usuario se observó con una nueva cookie o un nuevo identificador de usuario que haya emitido, debe eliminar todos los estados que almacenó en la cookie y el identificador de usuario anteriores.

Estos pasos le ayudarán a asegurar que se ajuste con las expectativas de privacidad de los usuarios. Como se explicó en las secciones anteriores, administrar el estado de usuario en AMP con frecuencia implicará el almacenamiento y la asociación de diferentes identificadores en varios contextos en los que se muestra el contenido de AMP. **Esta situación nunca debe utilizarse indebidamente para reconstituir datos o realizar un seguimiento que el usuario no esperaría o que no se le dio a conocer claramente, por ejemplo después de que el usuario haya eliminado las cookies para sus sitios.**

### Cómo respetar la eliminación de las cookies y el almacenamiento local <a name="respect-cookie-and-local-storage-deletions"></a>

**Debe respetar todos los controles de privacidad correspondientes que se pongan a disposición del usuario, incluyendo cualquier control de este tipo que genere la posibilidad de eliminar todas las cookies y el almacenamiento local.** En ningún momento se debe utilizar el ID de cliente de AMP o la infraestructura de AMP [para reconstituir un identificador eliminado](https://en.wikipedia.org/wiki/Zombie_cookie) después de que un usuario elimine específicamente una relación de identificación unilateral.

### Cómo cumplir con las leyes y reglamentos locales <a name="comply-with-local-laws-and-regulations"></a>

**La asociación de cookies y/o identificadores de dos o más dominios podría requerir la actualización de su política de privacidad, proporcionar información adicional a los usuarios, u obtener el consentimiento del usuario final en algunas jurisdicciones.** Utilizar el ID de cliente de AMP, que utiliza cookies o almacenamiento local como medio de almacenamiento continuo para ofrecer un identificador estable, debe analizarse por cada editor basándose en todas las leyes y reglamentos aplicables con respecto a la recopilación, almacenamiento, procesamientos y avisos para los usuarios.
