---
'$title': Anmeldung
$order: 1
description: Wenn du zum ersten Mal auf der Seite landest, siehst du 2 Kommentare und einen Login Button. Wenn du im Code nach dem Button suchst, …
---

Wenn du zum ersten Mal auf der [Seite](../../../../documentation/examples/previews/Comment_Section.html) landest, siehst du 2 Kommentare und einen Login Button.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Wenn du im Code nach dem Button suchst, findest du Folgendes:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Das Verhalten der Attribute, die zu [`amp-access`](../../../../documentation/components/reference/amp-access.md) gehören, hängt von einer seitenweiten Konfiguration für [`amp-access`](../../../../documentation/components/reference/amp-access.md) ab, in unserem Fall von dieser:

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

Der Autorisierungs-Endpoint wird als Teil von AMPByExample bereitgestellt. Für die Bereitstellung dieses Endpoints ist der Publisher der Seite verantwortlich. In diesem Beispiel haben wir zur Vereinfachung eine grundlegende Logik implementiert, sodass der Server beim Empfang dieser Anforderung den Wert eines Cookies namens `ABE_LOGGED_IN` ausliest. Wenn der Cookie nicht vorhanden ist, geben wir eine JSON Antwort zurück, die `loggedIn = false` enthält. Wenn ein Benutzer zum ersten Mal auf der Seite landet, gibt diese Anforderung `loggedIn = false` zurück und der Login Button wird angezeigt.

Sehen wir uns erneut den HTML Code des Buttons an: Mithilfe von `on="tap:amp-access.login-sign-in"` legen wir fest, dass die im obigen JSON angegebene URL verwendet werden muss, sobald Benutzer auf den Button tippen:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **HINWEIS:** Beachte, dass innerhalb des Login Knotens verschiedene URLs definiert werden können. In diesem Fall definieren wir `sign-in` und werden später `sign-out` definieren. [/tip]

Die Login Seite ist eine nicht-AMP Seite, auf der zur Vereinfachung die Werte für Login und Passwort ausgefüllt werden. Beachte die Verwendung des Typs für verborgene Eingabe `returnURL`, der vom AMPByExample Server über serverseitiges Templating ausgefüllt wird. Der Server liest diesen Wert aus einem Parameter namens `return`, der von der AMP Bibliothek automatisch zur Login URL hinzugefügt wird.

Im folgenden Beispiel wird der Wert für den Parameter `return` zur Anforderung hinzugefügt, sobald du auf den Login Button klickst. Du kannst dir diesen Wert in der Chrome DevTools Konsole im Tab "Network" näher ansehen.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Wenn der AMPByExample Server die POST Anforderung von der Login Seite empfängt und das Login und das Passwort korrekt sind, leitet er die Anforderung an die oben erwähnte `returnURL` weiter und hängt den Parameter `#success=true` an. Jetzt kann die AMP Runtime die Seite autorisieren und dir erlauben, einen Kommentar hinzuzufügen.

Es ist wichtig, dass du verstehst, was die AMP Runtime macht und was der Server tun sollte, da der Publisher der Seite für die Implementierung des Servers verantwortlich ist.

Eine kurze Zusammenfassung:

- Die AMP Runtime fügt den Rückgabeparameter automatisch zu der Login Anforderung hinzu, die im JSON Login Objekt angegeben ist.
- Die AMP Runtime schließt die Login Seite und leitet weiter zu der Seite, die vom URL Rückgabeparameter angegeben ist.
- Der Server sollte die Antwort koordinieren, sobald Benutzer auf den Login Button klicken.

[tip type="tip"] **TIPP:** Dieser Vorgang wird unter [`amp-access`](../../../../documentation/components/reference/amp-access.md) ausführlicher erklärt. [/tip]
