---
"$title": Abmeldung
"$order": '3'
description: Ähnlich wie beim Login Button ist das Vorhandensein des Logout Buttons vom Status der Komponente amp-access abhängig …
---

Ähnlich wie beim Login Button ist das Vorhandensein des Logout Buttons vom Status der Komponente [`amp-access`](../../../../documentation/components/reference/amp-access.md) abhängig:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Wenn du auf den Logout Button klickst, wirst du weitergeleitet zu der URL, die du in der JSON Konfiguration für [`amp-access`](../../../../documentation/components/reference/amp-access.md) als Teil des Login Objekts angegeben hast:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Es ist ähnlich wie bei der Anmeldung: Wenn der AMPByExample Server eine Abmeldeanforderung empfängt, verwendet er den von der AMP Bibliothek automatisch hinzugefügten Abfrageparameter der Rückgabe URL, leitet ihn um und fügt `#success=true` hinzu. Jetzt bist du wieder auf der Startseite. Das zuvor für die Anmeldeseite gesetzte AMPByExample Cookie (`ABE_LOGGED_IN` genannt) wird nun gelöscht.
