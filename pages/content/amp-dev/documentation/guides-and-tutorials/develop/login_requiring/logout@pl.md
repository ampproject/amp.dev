---
'$title': Wylogowanie
$order: 3
description: Podobnie jak w przypadku przycisku logowania, obecność przycisku wylogowania jest warunkowo zależna od stanu składnika amp-access...
---

Podobnie jak w przypadku przycisku logowania, obecność przycisku wylogowania jest warunkowo zależna od stanu składnika [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Po kliknięciu przycisku wylogowania nastąpi przekierowanie do adresu URL podanego w konfiguracji JSON składnika [`amp-access`](../../../../documentation/components/reference/amp-access.md) jako część obiektu logowania:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
"sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
}
}
[/sourcecode]

Podobnie jak w przypadku logowania, gdy serwer AMPByExample otrzymuje żądanie wylogowania, używa parametru zapytania zwrotnego adresu URL, dodawanego automatycznie przez bibliotekę AMP i przekierowuje do niego, dodając parametr <code>#success=true</code>. W tym czasie jesteś już z powrotem na stronie początkowej; plik cookie AMPByExample utworzony wcześniej dla strony logowania (o nazwie `ABE_LOGGED_IN`) zostaje w tym momencie usunięty.
