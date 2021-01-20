---
"$title": Walidacja AMP HTML
"$order": '8'
description: Po utworzeniu każdej strony AMP należy sprawdzić, czy kod AMP HTML jest prawidłowy. Do sprawdzenia prawidłowości stron AMP można użyć kilku metod...
author: bpaduch
---

Jako że relacje internetowe tworzone są w języku AMP, należy zawsze sprawdzać, czy kod AMP HTML jest prawidłowy. [Do sprawdzenia prawidłowości stron AMP można użyć kilku metod](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). W tym samouczku włączymy narzędzie AMP Validator poprzez włączenie trybu programistycznego. Aby włączyć tryb programistyczny, dodaj następujący identyfikator fragmentu do adresu URL, a następnie ponownie załaduj stronę:

```text
#development=1
```

Przykład:

```text
http://localhost:8000/pets.html#development=1
```

Otwórz [konsolę programistyczną](https://developer.chrome.com/devtools/docs/console) w Chrome (lub preferowanej przeglądarce) i sprawdź, czy nie ma błędów AMP. Być może trzeba będzie odświeżyć okno przeglądarki, aby zobaczyć komunikaty walidacji. Jeśli strona jest wolna od błędów, wyświetlony zostanie ten komunikat:

```text
 AMP validation successful.
```
