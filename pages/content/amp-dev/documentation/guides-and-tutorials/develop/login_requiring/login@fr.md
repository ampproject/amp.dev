---
'$title': Connexion
$order: 1
description: La première fois que vous atterrissez sur la page, vous voyez 2 commentaires et un bouton de connexion. Si vous recherchez le bouton de connexion dans le code, vous trouverez ...
---

La première fois que vous atterrissez sur la [page](../../../../documentation/examples/previews/Comment_Section.html) , vous voyez 2 commentaires et un bouton de connexion.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Si vous recherchez le bouton de connexion dans le code, vous trouverez:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Le comportement des attributs liés à [`amp-access`](../../../../documentation/components/reference/amp-access.md) dépend la configuration apportée sur toute la page pour [`amp-access`](../../../../documentation/components/reference/amp-access.md), soit la suivante dans notre cas:

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

Le point de terminaison pour l'autorisation est déployé dans AMPByExemple. Il est de la responsabilité de l'éditeur de la première page de fournir ce point de terminaison. Dans ce cas d'exemple, par souci de simplicité, nous avons implémenté une logique de base de sorte que lorsque cette demande est reçue, le serveur lit la valeur d'un cookie nommé `ABE_LOGGED_IN`. Si le cookie est absent, nous renvoyons une réponse JSON contenant `loggedIn = false`. Par conséquent, la première fois qu'un utilisateur accède à la page, cette demande renvoie `loggedIn = false` et le bouton de connexion s'affiche.

En observant à nouveau le code HTML du bouton, nous utilisons `on="tap:amp-access.login-sign-in"` pour spécifier qu'une fois que l'utilisateur appuie sur le bouton, l'URL spécifiée dans le JSON ci-dessus doit être utilisée:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **REMARQUE -** Notez qu'il est possible de définir des URL différentes à l' intérieur du nœud de connexion. Dans notre cas , nous définissons `sign-in`, et plus tard, nous définirons `sign-out` . [/tip]

La page de connexion est une page non-AMP dans laquelle nous remplissons les valeurs d'identifiant et de mot de passe par souci de simplicité. Notez l'utilisation du type d'entrée masqué `returnURL`, qui est renseigné par le serveur AMPByExample via la création de modèles côté serveur. Le serveur lit cette valeur à partir d'un paramètre appelé `return` qui est automatiquement ajouté par la bibliothèque AMP à l'URL de connexion.

Dans l'exemple ci-dessous, la valeur du paramètre `return` est ajoutée à la demande une fois que vous cliquez sur le bouton de connexion. Vous pouvez explorer cette valeur en utilisant la console Chrome DevTools et en accédant à l'onglet Réseau.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Une fois que le serveur AMPByExample reçoit la demande POST de la page de connexion et que l'identifiant et le mot de passe sont corrects, il redirige la demande vers `returnURL` que nous avons mentionné plus haut et ajoute le paramètre `#success=true`. Le runtime AMP peut désormais autoriser la page et enfin vous permettre d'ajouter un commentaire.

Il est important de comprendre ce que fait le runtime AMP et ce que le serveur doit faire, car la mise en œuvre du serveur incombe à l'éditeur de la page.

Résumons brièvement:

- Le runtime AMP ajoute automatiquement le paramètre de retour à la demande de connexion spécifiée dans l'objet JSON de connexion
- Le runtime AMP ferme la page de connexion et redirige vers la page spécifiée par le paramètre d'URL de retour
- Le serveur doit orchestrer la réponse une fois que l'utilisateur clique sur le bouton de connexion

[tip type="tip"] **CONSEIL –** Une explication plus détaillée de ce processus est également disponible dans [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
