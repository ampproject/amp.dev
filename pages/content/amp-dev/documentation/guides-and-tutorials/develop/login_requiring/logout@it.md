---
"$title": Disconnessione
"$order": '3'
description: Come nel caso del pulsante di accesso, la presenza del pulsante di disconnessione dipende dallo stato del componente amp-access ...
---

Come nel caso del pulsante di accesso, la presenza del pulsante di disconnessione dipende dallo stato del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Facendo clic sul pulsante Disconnetti, l'utente viene reindirizzato all'URL specificato nella configurazione JSON di [`amp-access`](../../../../documentation/components/reference/amp-access.md), nell'ambito dell'oggetto di accesso:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Analogamente all'accesso, quando il server AMPByExample riceve una richiesta di disconnessione, utilizza il parametro di query dell'URL di ritorno aggiunto automaticamente dalla libreria AMP e reindirizza a tale URL, aggiungendo `#success=true`. A questo punto, l'utente torna alla pagina iniziale; il cookie AMPByExample precedentemente creato per la pagina di accesso (di nome `ABE_LOGGED_IN`) verrà cancellato a questo punto.
