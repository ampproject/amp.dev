---
"$title": Comment ajouter un commentaire
"$order": '2'
description: "À ce stade, l'utilisateur peut ajouter un commentaire à l'aide de la bibliothèque amp-form. Notez que la présence de amp-form conditionnée par l'état du composant amp-access ..."
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

À ce stade, l'utilisateur peut ajouter un commentaire à l'aide de la bibliothèque [`amp-form`](../../../../documentation/components/reference/amp-form.md). Notez que la présence de amp-form est conditionnee par l'état du composant [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Nous spécifions une méthode POST et une action XHR, car les actions non XHR ne sont pas autorisées avec les méthodes POST dans AMP. Étant donné que nous somme ici dans le cadre d'une démo, nous ne mettons pas l'accent sur les commentaires, il n'est donc possible d'ajouter qu'un seul commentaire à la fois; chaque fois qu'un commentaire est ajouté, le serveur AMPByExample renvoie une réponse JSON contenant le texte saisi avec quelques ajouts, comme un horodatage, un avatar et un nom d'utilisateur.

Voici un exemple de réponse JSON:

[sourcecode:json] {"Datetime":"09:34:21", "User":"Charlie", "Text":"Hello!", "UserImg":"/img/ic_account_box_black_48dp_1x.png"} [/sourcecode]

Le composant amp-form affichera simplement ces valeurs dans la page à l'aide du modèle [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

Dans cet exemple, nous vérifions uniquement si la valeur du commentaire n'est pas vide; si la valeur est vide, nous retournons une erreur qui provoque l'exécution du code suivant

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

En guise de touche supplémentaire, nous ajoutons l'attribut `required` pour imposer la présence de texte de commentaire avant l'envoi:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Lorsque vous ajoutez un commentaire et cliquez sur le bouton d'envoi, vous voyez un écran similaire à celui-ci:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
