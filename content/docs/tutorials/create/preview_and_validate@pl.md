---
$title: Podgląd i sprawdzanie poprawności
---

Podgląd strony AMP można wyświetlić tak samo jak w przypadku dowolnej innej statycznej witryny HTML. Nie ma kroku budowania, nie jest też wymagane przetwarzanie wstępne. Można:

  - **Otworzyć stronę bezpośrednio w przeglądarce z systemu plików** (niektóre elementy mogą nie działać z powodu niepowodzenia żądań XMLHttpRequest).
  - **Użyć lokalnego serwera internetowego takiego jak Apache 2 lub Nginx**.
    *(Podpowiedź. Aby użyć prostego serwera internetowego, uruchom `python -m SimpleHTTPServer`).*

Następnie upewnij się, że dana strona AMP **jest rzeczywiście prawidłowym kodem AMP**. W przeciwnym razie strona nie będzie wykrywana i rozpowszechniana przez niezależne platformy takie jak Szukaj w Google. Aby sprawdzić poprawność:

  1. Otwórz stronę w przeglądarce.
  1. Dodaj parametr „`#development=1`” do adresu URL, na przykład `http://localhost:8000/released.amp.html#development=1`.
  1. Otwórz [konsolę DevTools w przeglądarce Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) i sprawdź, czy wystąpiły błędy sprawdzania poprawności.

[Dowiedz się o sprawdzaniu poprawności](/pl/docs/guides/debug/validate.html) i o tym, co robić, gdy wystąpią błędy.

<a class="go-button button" href="/pl/docs/tutorials/create/prepare_for_discovery.html">Przejdź do kroku 5</a>
