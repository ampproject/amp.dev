---
"$title": Logowanie
"$order": '1'
description: Przy pierwszym wylądowaniu na stronie widoczne są 2 komentarze i przycisk logowania. Jeśli poszukasz przycisku logowania w kodzie, znajdziesz...
---

Przy pierwszym wylądowaniu na [stronie](../../../../documentation/examples/previews/Comment_Section.html) widoczne są 2 komentarze i przycisk logowania.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Jeśli poszukasz przycisku logowania w kodzie, znajdziesz tekst:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Sposób działania atrybutów związanych ze składnikiem [`amp-access`](../../../../documentation/components/reference/amp-access.md) zależy od konfiguracji składnika [`amp-access`](../../../../documentation/components/reference/amp-access.md) dla całej strony, w naszym przypadku następującej:

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

Punkt końcowy autoryzacji jest wdrażany jako część witryny AMPByExample. Podanie tego punktu końcowego jest obowiązkiem wydawcy strony. W tym przykładowym przypadku, dla uproszczenia, zaimplementowaliśmy podstawową logikę w taki sposób, że po otrzymaniu tego żądania serwer odczytuje wartość z pliku cookie o nazwie `ABE_LOGGED_IN`. Jeśli pliku cookie nie ma, zwracamy odpowiedź JSON zawierającą wartość `loggedIn = false`. W wyniku tego, gdy użytkownik wyląduje na stronie po raz pierwszy, żądanie to zwróci wartość `loggedIn = false` i pojawi się przycisk logowania.

Patrząc ponownie na kod HTML przycisku, stosując instrukcję `on="tap:amp-access.login-sign-in"` określamy, że po dotknięciu przycisku należy użyć adresu URL określonego w kodzie JSON widniejącym powyżej:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"] **UWAGA —** zauważ, że wewnątrz węzła logowania można zdefiniować różne adresy URL, w tym przypadku definiujemy wartości `sign-in`, a następnie `sign-out`. [/tip]

Strona logowania jest stroną bez AMP, w której dla uproszczenia wypełniamy wartości loginu i hasła. Zauważ użycie ukrytego typu wejścia `returnURL`, wypełnianego przez serwer AMPByExample poprzez tworzenie szablonu po stronie serwera. Serwer odczytuje tę wartość z parametru o nazwie `return`, automatycznie dodawanego przez bibliotekę AMP do adresu URL logowania.

W poniższym przykładzie wartość parametru `return` jest dodawana do żądania po kliknięciu przycisku logowania. Możesz zbadać tę wartość, korzystając z konsoli Chrome DevTools i przechodząc do zakładki Network.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Gdy serwer AMPByExample otrzyma żądanie POST ze strony logowania, a login i hasło są prawidłowe, przekieruje żądanie do wspomnianego powyżej adresu `returnURL` i dołączy parametr `#success=true`. Środowisko uruchomieniowe AMP może teraz autoryzować stronę i w końcu zezwolić na dodanie komentarza.

Ważne jest, aby zrozumieć, co robi środowisko uruchomieniowe AMP i co powinien robić serwer, ponieważ za implementację serwera odpowiada wydawca strony.

W skrócie:

- Środowisko uruchomieniowe AMP automatycznie dodaje parametr return do żądania zalogowania określonego wewnątrz obiektu logowania JSON
- Środowisko uruchomieniowe AMP zamyka stronę logowania i przekierowuje do strony określonej przez parametr zwrotnego adresu URL.
- Serwer powinien zaaranżować odpowiedź po kliknięciu przycisku logowania przez użytkownika.

[tip type="tip"] **PORADA —** bardziej szczegółowe wyjaśnienie na temat tego przepływu można znaleźć również w artykule dotyczącym składnika [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
