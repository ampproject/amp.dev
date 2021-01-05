---
"$title": Déconnexion
"$order": '3'
description: "Comme pour le bouton de connexion, la présence du bouton de déconnexion est conditionnée par l'état du composant amp-access ..."
---

Comme pour le bouton de connexion, la présence du bouton de déconnexion est conditionnées par l'état du composant [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Lorsque vous cliquez sur le bouton de déconnexion, vous êtes dirigé vers l'URL que vous avez spécifiée dans la configuration JSON <a><code>amp-access</code></a> , dans le cadre de l'objet de connexion:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Tout comme à la connexion, lorsque le serveur AMPByExample reçoit une demande de déconnexion, il utilise le paramètre de requête d'URL de retour ajouté automatiquement par la bibliothèque AMP et y redirige, en ajoutant <code>#success=true</code>. Là, vous retournez à la page initiale; le cookie AMPByExample précédemment créé pour la page de connexion (appelé `ABE_LOGGED_IN`) doit être effacé à ce stade.
