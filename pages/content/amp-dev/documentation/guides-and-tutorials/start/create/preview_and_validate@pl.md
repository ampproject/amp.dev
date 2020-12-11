---
"$title": Podgląd i walidacja
"$order": '5'
description: '"Podgląd strony AMP wyświetla się tak samo, jak podgląd każdej innej statycznej strony HTML. Nie jest wymagany żaden krok tworzenia ani przetwarzanie wstępne. Możesz: ..."'
author: pbakaus
contributors:
- bpaduch
---

## Podgląd

Podgląd strony AMP wyświetla się tak samo, jak podgląd każdej innej statycznej strony HTML. Nie jest wymagany żaden krok tworzenia ani przetwarzanie wstępne. Możesz:

- **Otworzyć stronę bezpośrednio w przeglądarce z systemu plików** (niektóre elementy mogą nie działać z powodu niepowodzenia obiektów XMLHttpRequest).
- **Użyć lokalnego serwera WWW, takiego jak Apache 2 lub Nginx**. *(Porada: szybki serwer WWW można uruchomić poleceniem `python -m SimpleHTTPServer`.)*

## Walidacja

Następnie upewnij się, że Twoja strona AMP **jest rzeczywiście prawidłową stroną AMP**, w przeciwnym razie nie będzie odnajdywana i rozpowszechniana przez inne platformy, takie jak wyszukiwarka Google. Aby wykonać walidację:

1. Otwórz stronę w przeglądarce.
2. Dodaj do adresu URL parametr `#development=1`, na przykład, `http://localhost:8000/released.amp.html#development=1`.
3. Otwórz [konsolę Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) i sprawdź, czy nie ma błędów walidacji.

[tip type="read-on"] **CZYTAJ DALEJ —** [dowiedz się więcej o walidacji](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) i co należy zrobić w razie wyświetlenia błędów. [/tip]
