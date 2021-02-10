---
'$title': Dodawanie komentarza
$order: 2
description: W tym momencie użytkownik może dodać komentarz za pomocą składnika amp-form, biblioteki. Zauważ, że obecność formularza jest warunkowa, w zależności od stanu składnika amp-access...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

W tym momencie użytkownik może dodać komentarz za pomocą bilioteki składnika [`amp-form`](../../../../documentation/components/reference/amp-form.md). Zauważ, że obecność formularza jest warunkowa, w zależności od stanu składnika [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]

<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Określamy metodę POST i działanie XHR, ponieważ działania inne niż XHR są niedozwolone w przypadku metod POST w AMP. Ponieważ jest to demo, nie będą to trwałe komentarze, więc można dodać tylko jeden komentarz naraz; za każdym razem, gdy dodawany jest komentarz, serwer AMPByExample odpowiada, zwracając odpowiedź JSON zawierającą wprowadzony tekst z pewnymi dodatkami, takimi jak sygnatura czasowa, awatar i nazwa użytkownika.

Oto przykład odpowiedzi JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Składnik formularza po prostu wyświetli te wartości wewnątrz strony za pomocą szablonu [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

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

W tym przykładzie sprawdzamy tylko, czy wartość komentarza nie jest pusta; jeśli wartość jest pusta, zwracamy błąd, który powoduje wykonanie następującego kodu

[sourcecode:html]

<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Jako dodatkowy akcent, dodajemy atrybut `required`, aby wymusić obecność tekstu komentarza przed przesłaniem komentarza:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Po dodaniu komentarza i kliknięciu przycisku przesyłania, powinno teraz zostać wyświetlone coś podobnego do poniższego zrzutu ekranu:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
