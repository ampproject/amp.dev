---
"$title": Add a comment
"$order": '2'
description: An dieser Stelle können Benutzer mithilfe der Bibliothek amp-form einen Kommentar hinzufügen. Beachte, dass das Vorhandensein des Formulars bedingt ist und vom Status der Komponente amp-access abhängt …
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

An dieser Stelle können Benutzer mithilfe der Bibliothek [`amp-form`](../../../../documentation/components/reference/amp-form.md) einen Kommentar hinzufügen. Beachte, dass das Vorhandensein des Formulars bedingt ist und vom Status der Komponente [`amp-access`](../../../../documentation/components/reference/amp-access.md) abhängt:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

We specify a POST method and a XHR action, as non XHR actions are not allowed with POST methods in AMP. Because this is a demo, we are not persisting comments, so it’s only possible to add one comment at the time; whenever a comment is added, the AMPByExample server replies with a JSON response containing the entered text with some additions, like a timestamp, an avatar and a name for the user.

Hier ist ein Beispiel für eine JSON Antwort:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Die Formularkomponente zeigt diese Werte auf der Seite einfach mithilfe des Templates [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md) an:

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

In diesem Beispiel prüfen wir nur, ob der Wert des Kommentars nicht leer ist. Wenn der Wert leer ist, geben wir einen Fehler zurück, der die Ausführung des folgenden Codes auslöst:

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

As an extra touch, we add the `required` attribute to enforce the presence of comment text before submitting the comment:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Wenn du einen Kommentar hinzufügst und auf den Submit Button klickst, sollte das Ergebnis in etwa so aussehen wie im folgenden Screenshot:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
