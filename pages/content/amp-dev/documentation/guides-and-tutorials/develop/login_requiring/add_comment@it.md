---
"$title": Aggiunta di un commento
"$order": '2'
description: "A questo punto, l'utente può aggiungere un commento utilizzando la libreria amp-form. Si noti come la presenza del modulo sia condizionale, a seconda dello stato del componente amp-access ..."
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

A questo punto, l'utente può aggiungere un commento utilizzando la libreria [`amp-form`](../../../../documentation/components/reference/amp-form.md). Si noti come la presenza del modulo sia condizionale, a seconda dello stato del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Specifichiamo un metodo POST e un'azione XHR, poiché le azioni non XHR non sono consentite con i metodi POST in AMP. Poiché questo è un demo, non consentiamo commenti permanenti, ma è possibile aggiungere solo un commento alla volta; ogni volta che viene aggiunto un commento, il server AMPByExample restituisce una risposta JSON contenente il testo inserito con alcune aggiunte, come il timestamp, un avatar e un nome per l'utente.

Ecco l'esempio di una risposta JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Il componente modulo mostrerà semplicemente quei valori all'interno della pagina usando il modello [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

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

In questo esempio, ci limitiamo a controllare che il valore del commento non sia vuoto; se il valore è vuoto, restituiamo un errore che causa l'esecuzione del codice seguente

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

In più, aggiungiamo anche l'attributo `required` per forzare la presenza del testo di commento prima di consentirne l'invio:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Aggiungendo un commento e facendo clic sul pulsante Invia, si dovrebbe vedere qualcosa di simile al seguente screenshot:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
