---
"$title": Integracja AMP z aplikacją
"$order": '2'
description: Niniejszy przewodnik jest przeznaczony dla twórców aplikacji mobilnych i internetowych, którzy chcą zintegrować i powiązać je ze stronami AMP. Weźmy na przykład pod uwagę mobilną aplikację do czatu...
formats:
- websites
---

Niniejszy przewodnik jest przeznaczony dla twórców aplikacji mobilnych i internetowych, którzy chcą zintegrować i powiązać je ze stronami AMP. Weźmy na przykład pod uwagę mobilną aplikację do czatu, ładującą wersję AMP współdzielonego adresu URL w celu szybszego wyświetlania zawartości użytkownikom.

## Przekształcanie linków na AMP

Dzięki AMP możliwe jest niemal natychmiastowe renderowanie zewnętrznych witryn internetowych w natywnej lub mobilnej aplikacji internetowej. Można to osiągnąć poprzez dopasowanie adresów URL w treści do odpowiadających im adresów AMP (jeśli istnieją) oraz poprzez otwieranie wersji AMP, zamiast wersji oryginalnej. Aby to sobie ułatwić, możesz użyć takich narzędzi, jak [AMP URL API Google](https://developers.google.com/amp/cache/use-amp-url).

Poniższą wiadomość na przykład można przekształcić w celu obsługi wersji AMP poprzez zastąpienie wszystkich adresów URL odpowiadającymi im wersjami AMP (jeśli istnieją). Aby skrócić czas ładowania i zagwarantować, że obsługiwane są prawidłowe wersje AMP, należy tworzyć linki do stron AMP buforowanych na serwerach buforujących AMP.

Oryginalna wiadomość:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Przekształcona wiadomość:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **PORADA —** zastanów się nad zapewnieniem użytkownikom opcji wyświetlania wersji bez AMP, zamiast wersji AMP poprzez ustawienia preferencji w aplikacji. [/tip]

### Sposoby przekształcania linków

Są trzy sposoby programistycznego przekształcania linków:

1. **Po stronie serwera w chwili zapisu (preferowane)**: pobierz adres URL AMP za pomocą interfejsu AMP URL API Google w czasie zapisu adresu URL i przechowuj adres URL AMP po stronie serwera. Przekaż oba adresy URL do klienta, ponieważ oryginalny adres URL może być niezbędny do udostępnienia. Jest to zalecane podejście, ponieważ jest mniej żądań sieciowych po stronie klienta. W razie przyjęcia takiego podejścia ważne jest, aby regularnie (np. codziennie) skanować linki w poszukiwaniu wersji AMP, ponieważ witryny internetowe coraz częściej przyjmują format AMP.
2. **Po stronie serwera w chwili odczytu (niektóre zastosowania)**: pobierz adres URL AMP za pomocą interfejsu AMP URL API Google przed przekazaniem treści do klienta. Jak wspomniano powyżej, przekaż klientowi oba adresy URL (AMP i bez AMP), ponieważ oryginalny adres URL może być niezbędny do udostępnienia. Ta metoda może być dobra w przypadku usług o małej obciążalności wyjściowej (bramek logicznych).
3. **Po stronie klienta (jeśli nie można tego zrobić po stronie serwera)**: pobierz adres URL AMP za pomocą interfejsu API AMP URL Google z klienta. Użyj tego podejścia, jeśli przekształcenie adresu URL po stronie serwera nie jest możliwe (na przykład w przypadku aplikacji do wysyłania wiadomości z wykorzystaniem szyfrowania typu end-to-end). Upewnij się, że przekształcanie adresu URL zostanie uruchomione zaraz po udostępnieniu treści, zanim dojdzie do jakiejkolwiek interakcji z użytkownikiem.

[tip type="important"] **WAŻNE —** nigdy nie żądaj adresów URL AMP za pomocą interfejsu API AMP Google w wyniku interakcji z użytkownikiem, ponieważ obniża to wydajność aplikacji, gdyż wprowadza dodatkowe żądanie sieciowe. Zamiast tego użyj jednego z trzech podejść opisanych powyżej. [/tip]

#### Interfejs AMP URL API Google

Google udostępnia interfejs AMP URL API do pobierania pasujących adresów URL AMP HTML do danej listy adresów URL ([oficjalna dokumentacja](https://developers.google.com/amp/cache/use-amp-url) / [demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)). Adresy URL nie muszą być wersjami kanonicznymi. Jeśli istnieje wersja AMP, odpowiedź zawiera oryginalny adres URL AMP oraz adres URL strony AMP zbuforowanej na serwerze Google AMP Cache.

Na przykład w przypadku danej listy adresów URL:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

Treść odpowiedzi zawiera mapowanie adresów URL AMP w formacie JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **UWAGA —** adresów URL stron AMP buforowanych na serwerach buforujących AMP innych niż firmy Google nie można pobierać za pomocą interfejsu AMP URL API. Można jednak z łatwością wyprowadzić buforowany adres URL na podstawie zwróconego adresu URL AMP (ampURL). [/tip]

## Używanie serwerów buforujących AMP

[Usługa buforowania AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) to sieć dostarczania treści (CDN) oparta na serwerach proxy i służąca do dostarczania prawidłowych dokumentów AMP. Serwery buforujące AMP są przeznaczone do następujących celów:

- Serwowania jedynie prawidłowych stron AMP.
- Umożliwiania wstępnego ładowana stron AMP w sposób wydajny i bezpieczny.
- Wykonywania dodatkowych, korzystnych dla użytkownika optymalizacji wydajności zawartości.

Obecnie jest dwóch dostawców usługi buforowania AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Daje to dwie opcje wyświetlania pliku AMP w aplikacji przy użyciu:

1. wersji z hosta wydawcy albo
2. wersji z serwera AMP Cache

Zalecamy korzystanie z usługi buforowania AMP z następujących powodów:

- Większy komfort użytkowania dzięki krótszemu czasowi ładowania i małej latencji (czas ładowania krótszy o ponad 1 s).
- Korzyści pod względem wydajności i przepustowości dzięki dodatkowemu buforowaniu artefaktów zależnych od klienta, np. buforowanie różnych wersji tego samego obrazu w zależności od wielkości okienka na stronie klienta.
- Oryginalny plik AMP może nie być już prawidłowym dokumentem AMP, co może prowadzić do złych doświadczeń użytkownika. W takim przypadku usługa buforowania AMP serwuje ostatnią prawidłową wersję pliku AMP.
- Niezbyt sprawny wydawca mógłby serwować robotowi indeksującemu usługi buforowania AMP inne dokumenty niż użytkownikom. Użycie usługi buforowania AMP gwarantuje, że użytkownicy zawsze widzą ten sam plik AMP, co serwer buforujący.

[tip type="important"] **WAŻNE —** w razie serwowania stron AMP za pośrednictwem serwera buforującego AMP należy zapewnić użytkownikom materiał, który wyraźnie pokazuje pochodzenie AMP i oferuje możliwość udostępnienia kanonicznego adresu URL (więcej informacji na ten temat znajduje się również w dwóch następnych sekcjach). [/tip]

## Implementowanie przeglądarki AMP

Środowisko uruchomieniowe AMP udostępnia interfejs API przeglądarki, zawierający protokół służący do wysyłania i odbierania wiadomości między środowiskiem uruchomieniowym AMP a przeglądarką. Umożliwia to kontrolowanie wstępnego renderowania dokumentów AMP, przechodzenie między artykułami i instrumentację środowiska uruchomieniowego AMP. Więcej informacji o interfejsie API przeglądarki AMP można znaleźć w przewodniku [Podłączanie przeglądarek AMP do stron AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Implementacje przeglądarki do [Internetu](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) i systemu [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) są dostępne na [GitHub](https://github.com/ampproject/amp-viewer). Przeglądarka dla systemu Android nie jest jeszcze dostępna, zobacz [tę odpowiedź](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) na Stack Overflow, aby dowiedzieć się, jak najlepiej skonfigurować WebView do wyświetlania stron AMP.

Oto kilka ogólnych najlepszych praktyk implementacji przeglądarki AMP:

- Serwuj stronę AMP z serwera buforującego AMP (czas ładowania krótszy o ponad 1 s).
- Wyświetlaj pochodzenie artykułu wydawcy (np. w rozwijanym nagłówku).
- Zapewnij działanie udostępniania (patrz również sekcja „[Udostępnianie treści AMP](#sharing-amp-content)” poniżej).
- W przeglądarkach opartych na technologii WebView należy włączyć obsługę plików cookie innych firm.
- Ustaw odnośnik do swojej platformy/aplikacji.

### Udostępnianie zawartości AMP <a name="sharing-amp-content"></a>

W razie udostępniania dokumentu AMP z przeglądarki AMP platformy, platforma powinna udostępniać kanoniczny adres URL, gdy jest to technicznie możliwe. Jeśli platforma udostępnia na przykład przycisk udostępniania, przycisk ten powinien udostępniać kanoniczny adres URL.

Założeniem AMP Project jest to, że platformy powinny mieć możliwość wyboru wersji dokumentu przedstawianej użytkownikowi. Z tego powodu najbardziej sensowne jest udostępnianie na innej platformie wersji kanonicznej (a nie wersji AMP), a następnie oczekiwanie, że platforma docelowa dokona właściwego wyboru.
