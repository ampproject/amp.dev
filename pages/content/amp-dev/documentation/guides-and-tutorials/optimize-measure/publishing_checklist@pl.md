---
"$title": Lista kontrolna publikowania AMP
"$order": '0'
description: Projektowanie responsywnych stron internetowych polega na budowaniu płynnie działających stron internetowych, które reagują na potrzeby użytkownika — stron dopasowanych do wielkości i orientacji ekranu urządzenia. Możesz osiągnąć...
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

Postępuj zgodnie z tą listą kontrolną, aby zapewnić najpełniejsze doświadczenie AMP w witrynie!

# Zapewnianie walidacji specyfikacji AMP

AMP ma mnóstwo wbudowanych zalet, takich jak skrócenie czasu oczekiwania użytkownika poprzez wstępne ładowanie treści z serwerów buforujących AMP. Aby móc korzystać z tych zalet, strony muszą być prawidłowymi dokumentami AMP. Strony opublikowane z błędami zgłaszanymi przez walidator AMP nie są indeksowalne przez serwer buforujący AMP i mogą być serwowane jako strony błędów.

Aby nigdy więcej nie opublikować nieprawidłowej strony AMP, użyj tych narzędzi:

- [Walidacja stron AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [AMP Validator ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Narzędzia AMP](../../../documentation/tools.html?format=websites)

# Udzielanie dostępu do serwerów buforowanym stronom AMP

Świetna wiadomość, prawidłowe strony AMP automatycznie mogą być buforowane na wszystkich istniejących serwerach buforujących AMP! Dzięki temu ładowanie treści na urządzeniach użytkowników przebiega wydajnie i bezpiecznie. Tego typu optymalizacje są świetne, ale mają mały haczyk. Niektórym użytkownikom strony AMP będą serwowane z domen innych niż Twoje własne. Może to spowodować, że strony stracą dostęp do danych witryny podczas korzystania z dynamicznych składników AMP, takich jak [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) lub [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Tego typu błędy to problemy CORS. Pracuj z zabezpieczeniami, a nie przeciw nim, poprzez włączenie obsługi żądań CORS ze wszystkich dostępnych [serwerów buforujących AMP](https://cdn.ampproject.org/caches.json)! Jeśli używasz Node.js w swoim zapleczu, możesz użyć składnika [amp-cors middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Dowiedz się więcej o udzielaniu dostępu do serwera:

- [Jak są buforowane strony AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS w AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Oprogramowanie pośredniczące AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) dla Node.js

# Bezpieczna i nadająca się do udostępniana zawartość dzięki podpisanej wymianie

Zachowaj adres URL swojej domeny i uprość analitykę podczas udostępniania zawartości poprzez podpisane wymiany (SXG). Gdy serwujesz strony AMP z SXG, podpisy cyfrowe chronią Twoje informacje poprzez powiązanie dokumentu z jego deklarowanym adresem URL. Taki sposób działania traktuje sesje użytkowników i pliki cookie jako stronę pierwszą, zamykając ewentualne luki analityczne. Implementacja SXG dostarcza podpisaną zawartość AMP oprócz, a nie zamiast zwykłej zawartości AMP.

Dowiedz się więcej o implementacji podpisanych wymian:

- [Serwowanie AMP za pomocą podpisanych wymian](signed-exchange.md?format=websites)
- [Podpisane wymiany HTTP](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Rzeczywisty adres URL AMP Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Podpisane wymiany zapewniające lepsze adresy URL AMP i upraszczające analitykę (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Testowanie buforowanych stron

Serwery buforujące AMP przechowują obrazy, czcionki i zawartość strony, aby umożliwić użytkownikom korzystanie z nich od razu, gdy tylko zechcą. Dlatego ważne jest, aby sprawdzać, czy strony AMP wyglądają i działają zgodnie z oczekiwaniami, gdy są serwowane z serwera buforującego AMP.

Podczas dodawania stron AMP do serwera buforującego AMP sprawdź za pomocą [narzędzi programistycznych](https://developers.google.com/web/tools/chrome-devtools/) przeglądarki, czy można załadować wszystkie zasoby zewnętrzne. Oto lista:

- obrazy
- filmy
- punkty końcowe składnika amp-analytics
- punkty końcowe składnika amp-pixel
- czcionki niestandardowe
- ramki iframe

Więcej informacji o serwerach buforujących AMP:

- [Używanie usługi Google AMP Cache](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP w Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Debugowanie problemów z usługą buforowania AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Format adresu URL serwera buforującego AMP i obsługa żądań](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Upewnianie się, że pliki AMP są odnajdywane przez wyszukiwarki

Strony tylko w AMP (najpierw AMP) i strony z repliką AMP (sparowane AMP) muszą być odnajdywane! Wszystkie strony AMP wymagały znacznika `<link rel="canonical" href="$SOME_URL">` w sekcji `<head>`. Strony najpierw AMP muszą zawierać link do samych siebie, a strony AMP sparowane ze stroną bez AMP muszą zawierać linki do siebie nawzajem.

Upewnij się, że metadane [Schema.org](https://schema.org/) zawierają użyteczne informacje! Inne strony i wyszukiwarki internetowe mogą tego wymagać do udostępnienia Twoich treści.

Roboty internetowe, roboty indeksujące lub pająki to nazwy programów, które szukają treści. Przemierzają one sieć, pozwalając wyszukiwarkom indeksować zawartość stron internetowych, aby zapytania użytkownika skutkowały zwróceniem właściwych wyników! Upewnij się, że można znaleźć Twoją stronę w wyszukiwarce, umieszczając odpowiednie instrukcje w pliku `robots.txt` i ustawiając odpowiednie nagłówki.

NIE wykluczaj robotów indeksujących za pomocą pliku [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

NIE dodawaj do plików AMP HTML znacznika meta robots `noindex`.

```
<meta name="robots" content="noindex" />   <= don't!
```

NIE wstawiaj znacznika `noindex` jako nagłówka HTTP X-Robots-Tag dla plików AMP.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Dowiedz się jak sprawić, aby Twoje strony można było odnaleźć

- [Spraw, by Twoje strony można było odnaleźć](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Specyfikacje znacznika meta robots i nagłówka HTTP X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [Często zadawane pytania dotyczące indeksowania AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Mierzenie ruchu i przejść użytkowników

Zgromadzenie prawidłowych metryk jest niezbędne do użytecznej analizy. Podczas testowania wpływu wprowadzenia AMP do witryny na użytkowników upewnij się, że mierzysz to, co trzeba. Fałszywe wyniki negatywne, pozytywne lub nietrafne mogą pojawić się, jeśli analitycy nie uwzględnią różnic, jakie może tworzyć AMP. Upewnij się, że rozumiesz, czego szukać i jak to mierzyć!

Dowiedz się więcej o konfigurowaniu odpowiedniej analityki dla AMP:

- [Twój test AMP nie działa, co dalej?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Analiza z buforowaniem i bez](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Pomiar działań użytkowników na serwerze buforującym AMP i w Twojej witrynie internetowej](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Mierzenie sukcesu: co nowego w analityce i eksperymentach AMP? (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Podpisane wymiany zapewniające lepsze adresy URL AMP i upraszczające analitykę (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
