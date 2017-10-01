---
$title: Iniciar Sesión
$order: 0
---

La primera vez que aterrizas en la página, puedes ver 2 comentarios y un botón de inicio de sesión.

<amp-img src="/static/img/login-button.png" alt="Botón de inicio de sesión" height="290" width="300"></amp-img>

Si busca el botón de inicio de sesión en el código, encontrará:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

El comportamiento de los atributos relacionados con el `amp-access` depende de una configuración de toda la página para el `amp-access`, en nuestro caso, éste:

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

El punto final de autorización se implementa como parte de AMPByExample. Es responsabilidad del editor de la página proporcionar este punto final. En este caso de ejemplo, por simplicidad, implementamos lógica básica para que cuando se reciba esta solicitud, el servidor lea el valor de una cookie denominada `ABE_LOGGED_IN`. Si la cookie no está allí, devolveremos una respuesta JSON que contenga `loggedIn = false`. Como resultado, la primera vez que un usuario aterriza en la página, esta solicitud devolverá `loggedIn = false` y se mostrará el botón de inicio de sesión.

Observando nuevamente el código HTML del botón, usando `on="tap:amp-access.login-sign-in"`, especificamos que una vez que el usuario toque en el botón, se debe usar la URL especificada en el JSON anterior:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

{% call callout('Note', type='success') %}
Tenga en cuenta que es posible definir diferentes URL dentro del nodo de inicio de sesión, en este caso estamos definiendo `sign-in`, y más tarde definiremos el `sign-out`.
{% endcall %}

La página de inicio de sesión es una página que no es AMP en la que rellenamos los valores de inicio de sesión y contraseña por motivos de simplicidad. Observe el uso de `returnURL` como tipo de entrada oculto, que se rellena por el servidor AMPByExample a través de plantillas de servidor. El servidor lee este valor de un parámetro llamado `return`, agregado automáticamente por la biblioteca AMP a la URL de inicio de sesión.

En el ejemplo siguiente, el valor del parámetro `return` se agrega a la solicitud una vez que haga clic en el botón de inicio de sesión. Puede explorar este valor utilizando la consola de Chrome DevTools y navegando hasta la pestaña Network.

<amp-img src="/static/img/return-parameter.png" alt="Parámetro Return" height="150" width="600"></amp-img>

Una vez que el servidor AMPByExample recibe la solicitud POST desde la página de inicio de sesión y el inicio de sesión y la contraseña son correctos, redirecciona la solicitud a la `returnURL` que mencionamos anteriormente y agrega el parámetro `#success=true`. El tiempo de ejecución AMP ahora puede autorizar la página y finalmente le permite agregar un comentario.

Es importante entender lo que hace el tiempo de ejecución de AMP y lo que el servidor debe hacer, ya que la implementación del servidor es responsabilidad del editor de la página.

Como repaso rápido:

- El tiempo de ejecución de AMP agrega automáticamente el parámetro de retorno a la solicitud de inicio de sesión especificada dentro del objeto de inicio de sesión JSON
- El tiempo de ejecución de AMP cierra la página de inicio de sesión y redirige a la página especificada por el parámetro URL de retorno
- El servidor debe orquestar la respuesta una vez que el usuario haga clic en el botón de inicio de sesión

{% call callout('Tip', type='success') %}
Una explicación más detallada sobre este flujo también se puede encontrar en la documentación de [amp-access documentation](https://www.ampproject.org/docs/reference/components/amp-access#login-flow).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/login_requiring.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/login_requiring/add_comment.html"><span class="arrow-next">Próximo</span></a>
</div>
