---
"$title": Calendario con los lanzamientos de AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Canales para los lanzamientos"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Canales para los lanzamientos](#release-channels)
    - [Nocturnos](#nightly)
    - [Semanales](#weekly)
        - [Canales Beta y Experimental](#beta-and-experimental-channels)
    - [Estabilidad a largo plazo (lts)](#long-term-stable-lts)
- [Cómo determinar si su modificación se encuentra en un lanzamiento](#determining-if-your-change-is-in-a-release)
- [Cadencia de los lanzamientos](#release-cadence)
    - [ Calendario detallado ](#detailed-schedule)
    - [Congelar el lanzamiento](#release-freezes)

Cada martes un nuevo lanzamiento se envía a todas las páginas de AMP. **Una vez que un cambio en AMP se fusiona con la rama principal del repositorio AMPHTML, generalmente tomará entre 1 y 2 semanas para que la modificación esté activa para todos los usuarios.**

## Canales para los lanzamientos <a name="release-channels"></a>

Las extensiones y el tiempo de ejecución de AMP se proporcionan a través de diferentes *canales de lanzamientos*. Cada canal tiene un objetivo para los desarrolladores y para el propio proyecto AMP HTML. Consulte la [sección cadencia de los lanzamientos](#release-cadence) para obtener un desglose más detallado sobre cómo y cuándo el código del repositorio [`ampproject/amphtml`](https://github.com/ampproject/amphtml) se convierte en validaciones automáticas para los lanzamientos.

Para determinar si las Relaciones públicas (RP) se incluyeron en alguno de los siguientes canales de lanzamientos, busque las etiquetas de GitHub *Uso de RP: en Canary*, *Uso de RP: en production*, o *Uso de RP: en LTS* (para obtener más información, consulte la sección [Cómo determinar si su modificación se encuentra en un lanzamiento](#determining-if-your-change-is-in-a-release)).

### Nocturnos <a name="nightly"></a>

El canal de lanzamientos **nocturnos** se actualiza (como su nombre lo indica) cada noche entre semana. Este proceso es automatizado y no hay garantía de que un lanzamiento nocturno específico esté libre de errores u otros problemas. Todos los días después de la medianoche (hora del Pacífico), se selecciona el último compromiso “verde” del día para que sea el punto límite del lanzamiento. Una estructura verde es el indicador de que todas las pruebas automatizadas pasaron por esa compilación.

Los lanzamientos nocturnos proporcionan un mecanismo para detectar y solucionar problemas rápidamente, y todo esto antes de que lleguen a los canales para los lanzamientos *semanales* con mayor tráfico. También sirven para reducir el número de usuarios que resultan afectados por problemas que aparecieron recientemente.

Es posible inclinarse por el canal **nocturno** para probar las solicitudes de extracción que se fusionaron en los últimos días. Para obtener más información, consulte la [sección de suscripción](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) en [DEVELOPING.md].

### Semanales <a name="weekly"></a>

Los canales de lanzamientos *semanales* se consideran los principales canales “siempre verdes”. Cada semana, el lanzamiento **Beta** de la semana anterior se promociona en el canal para lanzamientos **estables**, y el último lanzamiento **nocturno** de la semana anterior es promovido por los canales **Experimental** y **Beta** (consulte el [calendario detallado](#detailed-schedule)).

En la configuración de las compilaciones existen dos conjuntos de validaciones que se utilizan con la finalidad de crear validaciones automáticas para el lanzamiento: la configuración *canary* y la configuración*production*. Los canales de lanzamientos **Experimental** y **Beta** se construyen a partir del mismo compromiso. Sin embargo, el canal **Experimental** utiliza la configuración *canary* mientras que el canal **Beta** usa la configuración  *production*. La configuración *canary* activa componentes y funciones experimentales que pueden desactivarse en *production*. Es posible elegir los canales **Experimental** o **Beta** mediante la [página de experimentos](https://cdn.ampproject.org/experiments.html).

El canal de lanzamientos **estable** se crea con la configuración *production* y se utiliza para la mayoría del tráfico de AMP. Dado que el canal **Beta** también se construye a partir de la configuración *production*, representa la estructura exacta que será **estable** la siguiente semana (con la posibilidad de pasar por selecciones cuidadosas para reparar los problemas que surjan en el último momento, consulte el [Código de contribución](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Canales Beta y Experimental <a name="beta-and-experimental-channels"></a>

Los *canales Beta* y *Experimental* son versiones preliminares de los candidatos para el próximo lanzamiento estable de AMP. Cada martes (con excepción de las semanas en las que hay algún [lanzamiento congelado](#release-freezes))), en la última semana el lanzamiento **nocturno** es promocionado por los canales de suscripción del desarrollador **Beta** y **Experimental**. Cuando concluye el periodo de 1 día en el que verificamos que no se introdujeron retrocesos en las funciones o en el desempeño de estos canales, posteriormente promocionamos este lanzamiento el miércoles aprovechando un pequeño porcentaje del tráfico. Este mismo lanzamiento después se promociona en el canal **estable** el martes de la siguiente semana.

Es posible elegir estos canales. Para obtener más información, consulte la [sección de suscripción](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) en [DEVELOPING.md].

La suscripción en el *canal Beta* tiene la finalidad de:

- Probar y reproducir la versión del tiempo de ejecución de AMP, cuyo lanzamiento se realizará pronto.
- Utilizar el Control de calidad (QA) para garantizar que su sitio sea compatible con la siguiente versión de AMP.

El *canal Experimental* tiene la finalidad de:

- Probar y reproducir nuevas funciones que aún no están disponibles para todos los usuarios.
- Utilizar el Control de calidad (QA) para garantizar que su sitio sea compatible con las próximas funciones de AMP que aún están en desarrollo.

El *canal Experimental* **puede ser poco estable** e incluir funciones que aún no están disponibles para todos los usuarios.

### Estabilidad a largo plazo (lts) <a name="long-term-stable-lts"></a>

En el canal de lanzamiento **lts** se proporciona una validación automática **estable** previa en intervalos de un mes. El segundo lunes de cada mes, el lanzamiento **estable** actual se promueve a **lts**. Este canal no es recomendable para todos los editores de AMP. Este se proporciona para que los editores que quieran llevar a cabo un proceso de control de calidad (QA) con menos frecuencia en su sitio web pueden hacerlo seleccionando páginas web específicas en el canal **lts** (consulte el archivo <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">Léame sobre **lts**</a>).

En caso de que el segundo lunes del mes sea un día no laboral, la promoción se realizará una vez que finalice la [congelación del lanzamiento](#release-freezes).

Importante: los editores que utilicen el canal de lanzamiento **lts** no deben utilizar funciones que se hayan introducido recientemente. Debido a que implican un proceso más largo, el lanzamiento **lts** puede retrasarse hasta siete semanas en el `HEAD` de [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Consulte la sección sobre [Cómo determinar si su modificación se encuentra en un lanzamiento](#determining-if-your-change-is-in-a-release) para confirmar si un cambio estará listo con el proceso de lanzamiento que seleccionó.

## Cómo determinar si su modificación se encuentra en un lanzamiento <a name="determining-if-your-change-is-in-a-release"></a>

[*Tipo:* problemas con el lanzamiento de GitHub](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) se utilizan para llevar un seguimiento del estado de los lanzamientos actuales y anteriores, desde la primera versión, hasta las pruebas utilizando los canales **Experimental** o **Beta**, para eventualmente hacer el lanzamiento mediante los canales **estable** y **lts**. Los anuncios sobre los lanzamientos se realizan en el [Slack de AMP #canal de lanzamientos](https://amphtml.slack.com/messages/C4NVAR0H3/) ([regístrese en Slack](https://bit.ly/amp-slack-signup)).

Puede determinar qué cambios habrá en una compilación determinada utilizando alguna de las siguientes opciones:

- En el [*Tipo:* problemas con el lanzamiento de GitHub](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) por cada lanzamiento de una validación automática se incluirá un enlace específico para la [página de lanzamiento](https://github.com/ampproject/amphtml/releases), en la cual se registran todas las modificaciones que se incluyen en ese lanzamiento.
- Las etiquetas [*Uso de RP: en Beta/Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*Uso de RP: en Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22), y [*Uso de RP: en LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) se agregan a las relaciones públicas cuando se convierten a una validación de tipo *semanal* o **lts**. Puede haber un retraso entre el momento en que se crea la validación y el momento en que se agrega la etiqueta.

## Cadencia de los lanzamientos <a name="release-cadence"></a>

Deliberadamente somos muy prudentes con la cadencia de nuestros lanzamientos.

Para determinar con qué frecuencia debemos promover nuevas versiones de AMP para todo el mundo, debemos analizar muchos factores, incluidos:

- Si serán estables para los millones de sitios o para los miles de millones de páginas que se crearon usando AMP.
- La necesidad de suprimir el caché que podría producirse cuando impulsamos una nueva versión.
- El deseo de obtener nuevas funciones rápidamente.

Después de considerar todos estos factores, llegamos al proceso de promoción que toma de 1 a 2 semanas. Hasta ahora, hemos encontrado que este es un compromiso razonable, pero continuaremos evaluando todos estos factores y es posible que hagamos cambios en el futuro.

### Calendario detallado <a name="detailed-schedule"></a>

Tratamos de ajustarnos a este calendario lo más estrictamente posible, aunque ciertas complicaciones podrían causar retrasos. Puede llevar un seguimiento del estado más reciente de cualquier lanzamiento en el artículo [*Tipo:* Problemas con el lanzamiento de GitHub](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) y [Slack de AMP #canal de lanzamientos](https://amphtml.slack.com/messages/C4NVAR0H3/) ([regístrese en Slack](https://bit.ly/amp-slack-signup)).

- Martes @ [11 a. m. hora del Pacífico](https://www.google.com/search?q=11am+pacific+in+current+time+zone): se lanzan las nuevas compilaciones **Experimental** y **Beta** a partir de la [última validación maestra que pasó todas nuestras pruebas](https://travis-ci.org/ampproject/amphtml/branches) y se promocionan con los usuarios de AMP que eligieron el [canal Experimental AMP](#amp-experimental-and-beta-channels) o el [canal Beta de AMP](#amp-experimental-and-beta-channels), respectivamente.
- Miércoles: revisamos los informes sobre errores para los usuarios del *canal Experimental* y el *canal Beta* y, si todo luce bien, promocionaremos la versión **Beta** en el 1% de las páginas de AMP.
- Del jueves a lunes: continuamos supervisando los porcentajes de error y los informes sobre errores para los usuarios del *canal Experimental* y el *canal Beta*, y el 1% de las páginas con validación **Experimental** o **Beta**.
- El martes de la siguiente semana: la validación **Beta** se promociona completamente para **estable** (es decir, todas las páginas de AMP ahora utilizarán esta compilación).

### Congelar el lanzamiento <a name="release-freezes"></a>

Hay ocasiones en las que omitiremos un lanzamiento de la producción de AMP, lo cual se conoce como "congelar el lanzamiento".

Si alguna semana se anuncia la congelación de un lanzamiento para la Semana N:

- La validación del lanzamiento de la semana anterior permanece en la fase **Experimental** o **Beta** durante una semana más, es decir, la anulación del lanzamiento en la semana N-1 no se promocionará como **estable** en la semana N, como se haría normalmente. Más bien, se promocionará como **estable** en la semana N+1.
- Durante la semana en que ocurre la congelación del lanzamiento (semana N), *no* se realiza una nueva validación del lanzamiento.
- El programa normal se reanudará en la semana N+1, es decir, las fases **Experimental** o **Beta** se detienen en la semana N+1 y se promueve a **estable** durante la semana N+2.
- Si el lanzamiento de la versión **Estable** se promocionó durante la semana N-1 estaba programada originalmente para promocionarse como **lts** durante la semana N, esta ahora promoverá a **lts** el lunes de la semana N+1.
- Se seguirán generando y promocionando los lanzamientos **nocturnos**, ya que están completamente automatizados.

La congelación de un lanzamiento puede ocurrir debido a que:

- Existen momentos en los que no se cuenta con suficientes personas que estén disponibles para impulsar el lanzamiento de la versión **estable** de AMP y supervisar que todo se haga correctamente. Actualmente, la mayoría de las personas que realizan lanzamientos en AMP se encuentran en los Estados Unidos, por lo que generalmente los harán durante las semanas en que ocurren los días festivos más importantes para los Estados Unidos, como el Día de la independencia (4 de julio), el Día de acción de gracias (el cuarto jueves de noviembre), Navidad (25 de diciembre), la víspera del Año Nuevo y el Año Nuevo (31 de diciembre y 1 de enero, respectivamente).
- Ocurrió alguna situación de emergencia, como un problema con la seguridad o la privacidad, según lo determine el [Comité Directivo Técnico (TSC)](https://github.com/ampproject/meta-tsc) o las personas que llevan a cabo el lanzamiento.
- Hubo otras situaciones donde la estabilidad del código base se considera especialmente importante según lo determinado por el TSC.

En todos los casos, excepto en las situaciones de emergencia, la congelación de los lanzamientos se anunciará por lo menos con un mes de anticipación.

Tenga en cuenta que, a menos que se anuncie lo contrario, la congelación de un lanzamiento no implica la congelación del código. Por lo tanto, durante la congelación de un lanzamiento el código todavía puede escribirse, revisarse y fusionarse.
