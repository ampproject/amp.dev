---
"$title": Konfigurowanie
"$order": '0'
description: Skonfiguruj swoje środowisko programistyczne Krok 1. Pobierz kod. Pobierz przykładowy kod samouczka w postaci pliku ZIP lub poprzez git...
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## Wymagania wstępne

**Do rozpoczęcia** tego samouczka potrzebne są:

- Podstawowa wiedza o HTML, CSS i JavaScript
- Wybrana przez Ciebie przeglądarka, która może sprawdzać dane w konsoli JavaScript
- Wybrany przez Ciebie edytor tekstów

## Przygotowanie środowiska programistycznego

### Krok 1. Pobierz kod

Pobierz przykładowy kod samouczka albo jako [plik ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip), albo przez git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Rozpakuj plik archiwum (w razie potrzeby) i przejdź do katalogu projektu na komputerze za pomocą wiersza polecenia:

```shell
cd accelerated-mobile-pages-foundations
```

Katalog projektu zawiera kilka przykładowych plików zasobów oraz początkową stronę [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html).

### Krok 2. Uruchom przykładową stronę

Aby przetestować naszą przykładową stronę, musimy uzyskać dostęp do plików z serwera WWW. Tymczasowy lokalny serwer WWW do celów testowania można utworzyć na kilka sposobów.  Oto kilka opcji, wybierz najlepszą dla Ciebie:

- [Aplikacja Google Chrome o nazwie Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Lokalny serwer HTTP w języku Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **UWAGA —** zdecydowanie zalecane jest stosowanie w środowiskach produkcyjnych protokołu HTTPS. HTTPS ma kilka zalet oprócz bezpieczeństwa, w tym SEO. Możesz przeczytać więcej na ten temat w tym [wpisie na blogu Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Po skonfigurowaniu lokalnego serwera WWW przejdź do przykładowego artykułu w przeglądarce pod [tym adresem URL](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```
