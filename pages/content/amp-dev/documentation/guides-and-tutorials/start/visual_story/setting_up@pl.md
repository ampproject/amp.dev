---
"$title": Konfigurowanie
"$order": '1'
description: Skonfiguruj swoje środowisko programistyczne Krok 1. Pobierz kod. Pobierz przykładowy kod samouczka w postaci pliku ZIP lub poprzez git...
author: bpaduch
---

## Wymagania wstępne

Do rozpoczęcia tego samouczka potrzebne są:

- Podstawowa wiedza o HTML, CSS i JavaScript
- Podstawowa wiedza o głównych koncepcjach AMP (patrz samouczek [Konwertowanie HTML na AMP](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- Wybrana przez Ciebie przeglądarka
- Wybrany przez Ciebie edytor tekstów

## Przygotowanie środowiska programistycznego

#### Krok 1. Pobierz kod

1. Pobierz skompresowany jako plik zip kod samouczka z poniższego adresu URL: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Wyodrębnij zawartość pliku zip. W katalogu **amp-pets-story** znajdują się pliki obrazów, wideo, audio i danych, których będziemy używać do utworzenia naszej relacji. Plik **pets.html** jest naszym punktem wyjścia dla relacji. Gotową wersję relacji można znaleźć w pliku [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Krok 2. Uruchom przykładową stronę

Aby przetestować naszą przykładową relację internetową, musimy uzyskać dostęp do plików z serwera WWW. Tymczasowy lokalny serwer WWW do celów testowania można utworzyć na kilka sposobów.  Oto kilka opcji, wybierz najlepszą dla Ciebie:

- [Aplikacja Google Chrome o nazwie Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Lokalny serwer HTTP w języku Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Po skonfigurowaniu lokalnego serwera WWW spójrz, jak będzie wyglądać nasza ukończona relacja internetowa pod koniec tego samouczka, przechodząc do następującego adresu <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **WAŻNE —** upewnij się, że adres URL jest serwowany z hosta `localhost`, w przeciwnym razie relacja internetowa może nie zostać załadowana prawidłowo i napotkasz błędy takie jak `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Przeklikaj ukończoną relację i zobacz, co będziemy tworzyć.
