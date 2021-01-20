---
"$title": Inicio de sesión
"$order": '1'
description: La primera vez que accede a la página, nota que hay 2 comentarios y un botón de acceso. Si busca el botón de acceso en el código, encontrará...
---

La primera vez que accede a la <a>página</a>, nota que hay 2 comentarios y un botón de acceso.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Si busca el botón de acceso en el código, encontrará:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

El comportamiento de los atributos relacionados con el componente [`amp-access`](../../../../documentation/components/reference/amp-access.md) depende de cómo se haya configurado dicho componente a nivel de página. En este caso, se trata de la siguiente configuración:

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

El punto de acceso de autorización, que debe proporcionar el editor de la página, se implementa como parte de AMPByExample. Para simplificar, en este ejemplo implementamos una lógica sencilla para que el servidor, al recibir esta solicitud, lea el valor de una cookie denominada `ABE_LOGGED_IN`. Si esta cookie no está presente, devolvemos una respuesta JSON con `loggedIn = false`. Como resultado, la primera vez que un usuario accede a la página, se devuelve `loggedIn = false` y se muestra el botón para iniciar sesión.

Si nos fijamos de nuevo en el código HTML de dicho botón, podemos ver que se utiliza `on="tap:amp-access.login-sign-in"`. Con este fragmento de código indicamos que, cuando un usuario toque el botón, debe usarse la URL que hemos especificado en la respuesta JSON anterior:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="tip"] <strong>NOTA:</strong> En el nodo "login", se pueden añadir varias URL, en este caso, definimos una en `sign-in` y, más adelante, haremos lo mismo con `sign-out`. [/tip]

La página de inicio de sesión es una página que no es AMP en la que introducimos los valores de inicio de sesión y la contraseña para simplificar el proceso. Puede observar que utilizamos el tipo de entrada oculta `returnURL`, que rellena el servidor AMPByExample usando plantillas de servidor. AMPByExample obtiene el valor de "returnURL" de un parámetro denominado `return`, que la biblioteca de AMP añade automáticamente a la URL indicada en "sign-in".

En el ejemplo que se muestra a continuación, se añade el valor del parámetro `return` a la solicitud cuando se hace clic en el botón para iniciar sesión. Para explorar este valor, acceda a la pestaña Network (Red) de la consola DevTools de Chrome.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Cuando el servidor AMPByExample recibe la solicitud POST de la página de inicio de sesión, si las credenciales son correctas, se redirige la solicitud a la URL de `returnURL` que comentamos anteriormente y se le añade el parámetro `#success=true`. Una vez hecho esto, el tiempo de ejecución de AMP puede autorizar la página y por lo tanto ya puede añadir un comentario.

Es importante comprender las tareas que desempeña el tiempo de ejecución de AMP y qué debería hacer el servidor, puesto que el editor de la página debe encargarse de implementar este último.

A grandes rasgos, las funciones de ambos elementos son las siguientes:

- El tiempo de ejecución de AMP añade automáticamente el parámetro "return" a la solicitud "sign-in" indicada en el objeto JSON "login".
- El tiempo de ejecución de AMP cierra la página de inicio de sesión y redirige a los usuarios a la página que se haya especificado en el parámetro "returnURL".
- El servidor debe organizar la respuesta cuando el usuario haga clic en el botón para iniciar sesión.

[tip type="tip"] <strong>CONSEJO:</strong> Para obtener una explicación más detallada sobre este tema, consulte [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
