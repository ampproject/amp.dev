---
'$title': Zintegruj swoją technologię z AMP
$order: 0
'$hidden': 'true'
description: Jeśli jesteś dostawcą technologii dla wydawców lub reklamodawców w Internecie, zachęcamy do dodania obsługi AMP, aby Twoi klienci mogli nadal wykorzystywać Twoją technologię i ...
formats:
  - websites
  - ads
  - stories
  - email
---

Dziękujemy za zainteresowanie udziałem w AMP Project! Ucieszy nas Twój wkład w uczynienie z Internetu platformy rozwijanej przez użytkowników.

Wydawcy utworzyli ponad 1,4 miliarda dokumentów AMP, umieszczonych na serwerach ponad 750 tysięcy unikalnych domen. Taki wzrost jest możliwy tylko dzięki wsparciu ponad 100 zewnętrznych firm technologicznych już zintegrowanych z AMP.

Jeśli jesteś dostawcą technologii dla wydawców lub reklamodawców w Internecie, zapraszamy do dodania obsługi AMP! Twoi klienci mogą nadal wykorzystywać Twoją technologię, jednocześnie pracując nad realizacją naszej wizji stworzenia lepszego Internetu.

Niniejszy dokument przedstawia w zarysie oczekiwania AMP wobec stron trzecich i określa poziomy wkładu.

# Wytyczne dotyczące wnoszenia wkładu

Wszystkie ogólne wkłady podlegają [uniwersalnym wytycznym AMPHTML ze strony CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md). Oczekujemy, że strona trzecia będzie w różnym stopniu testować, prowadzić i aktualizować swój wkład.

Aby kwalifikować się do włączenia, wszystkie poziomy wkładu muszą:

- Spełniać [wymagania encyklopedyczności angielskiej wersji Wikipedii](https://en.wikipedia.org/wiki/Wikipedia:Notability).
- Utrzymywać lub przewyższać poziom usługi, jaki AMP obiecuje zarówno wydawcom, jak i użytkownikom.
- Mieć dobrą jakość.
- Stwarzać kanał rozwiązywania problemów dla ich klientów.
- Zapewniać dobre omówienie testów integracji w odniesieniu do produkcyjnych jak i testowych wersji AMP.
- Spełniać nowy cel.

Są 3 poziomy wkładu stron trzecich. Poziomy te są zależne od ilości dodanej logiki:

- Logika składników: kod, który dyktuje podstawowe funkcje i działanie składnika AMP.
- Logika stron trzecich: kod specyficzny dla strony trzeciej. Logika ta umożliwia składnikowi wykorzystanie usługi strony trzeciej.

Większa ilość kodu dodana do repozytorium AMP, zwłaszcza logiki specyficznej dla stron trzecich, podwyższa poziom wkładu. Wysoki poziom wkładu wymaga większego zaangażowania strony trzeciej.

Wkład na poziomie 1 i 2 polega na udostępnieniu składników stronom trzecim. Jeśli jakiś składnik spełnia cel podobny do celu Twojej działalności, rozważ użycie tego składnika. Wymaga to znacznie mniejszego nakładu pracy i jest to podejście długoterminowe.

Po ustaleniu poziomu wkładu odpowiadającego Twojemu przypadkowi użycia otwórz [zgłoszenie w GitHub ](https://github.com/ampproject/amphtml/issues/new), aby rozpocząć.

## Wkład na poziomie 1

Wkład poziomu 1 wykorzystuje logikę funkcji istniejących składników. Ładują one logikę specyficzną dla stron trzecich jako niestandardowy kod JavaScript w ramce iframe pobierającej zasoby z różnych domen. Na przykład, wiele sieci reklamowych dostarcza reklamy za pomocą składnika [`amp-ad`](../../../components/reference/amp-ad.md), ale kontroluje sposób wyświetlania reklam za pomocą swojej własnej logiki.

Strony trzecie dodają konfiguracje lub funkcje do istniejących rozszerzeń, używając dostarczonych interfejsów API, aby zaimplementować ich funkcje. Jeśli taki składnik nie istnieje, mogą zaproponować nowy.

Jedyną logiką specyficzną dla strony trzeciej badaną w repozytorium AMP jest konfiguracja strony trzeciej. Dodanie nowej strony trzeciej do istniejącego wkładu poziomu 1 zazwyczaj nie wymaga analizy projektu. Strony trzecie mogą postępować zgodnie z dokumentacją integracji składnika, taką jak [Integrowanie sieci reklamowych z AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

### Oczekiwania wobec stron trzecich

- Niezależne utrzymanie i obsługa niestandardowego kodu JavaScript dostawcy.
- Zapewnienie testów ich konfiguracji i reagowanie na problemy.
- Udostępnienie kanału rozwiązywania problemów dla programistów.
- Odpowiadanie na wszelkie zgłoszenia błędów związane z ich usługą.

### Przykład poziomu 1

[**amp-ad**](../../../components/reference/amp-ad.md)

Dostawcy reklam powinni przeczytać [ogólne informacje programistyczne](https://github.com/ampproject/amphtml/tree/master/ads#overview) oraz [instrukcje dla programistów.](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request), aby móc dodać Twoją obsługę do składnika [`amp-ad`](../../../components/reference/amp-ad.md). W zależności od technologii reklamy, którą oferuje Twoja firma, przydatne mogą być [te instrukcje integracji](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads).

Wielu dostawców reklamy już dodało obsługę funkcji związanych z reklamą, takich jak amp-ad. Oto [przykład żądania ściągnięcia](https://github.com/ampproject/amphtml/pull/2299) od sieci reklamowej [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md).

## Wkład poziomu 2

Wkład poziomu 2 wykorzystuje logikę funkcji istniejących składników. Cała logika jest badana w repozytorium AMP, a do ramek iframe nie można ładować żadnego niestandardowego kodu JavaScript. Na przykład dostawcy usług analitycznych dodają swoje konfiguracje do składnika [`amp-analytics`](../../../components/reference/amp-analytics.md), ale z podaniem punktu końcowego do śledzenia danych, takich jak kliknięcia użytkowników.

Strony trzecie dodają konfiguracje lub funkcje, takie jak nowe interfejsy API, do istniejących składników w celu zaimplementowania ich działania. Jeśli taki składnik nie istnieje, mogą zaproponować nowy.

Cała logika biznesowa jest badana w repozytorium AMP, ale jedyna przyjmowana specyficzna logika strony trzeciej to konfiguracja strony trzeciej. Jeśli składnik współpracuje z plikiem konfiguracyjnym dostarczonym przez stronę trzecią, analiza projektu nie jest konieczna. Jeśli konfiguracja strony trzeciej implementuje nową funkcję lub nowy składnik, musi pomyślnie przejść analizę projektu AMP.

### Oczekiwania wobec stron trzecich

- Dodanie nowej usługi strony trzeciej do istniejącego wkładu poziomu 2 zazwyczaj nie wymaga analizy projektu. Strona trzecia może postępować zgodnie z dokumentacją danego składnika.
- Propozycja nowego składnika w przypadku wkładu poziomu 2 musi mieć logikę funkcji, z której mogą korzystać usługi innych stron trzecich.

### Przykłady poziomu 2

[**amp-analytics**](../../../components/reference/amp-analytics.md)

Składnik analityczny AMP umożliwia odsyłanie zdarzeń na serwer na podstawie skonfigurowanych przez Ciebie wyzwalaczy. Napisaliśmy [przewodnik integracji analityki](../../optimize-measure/configure-analytics/index.md), ułatwiający rozpoczęcie integracji.

Jeśli musisz jedynie dodać piksel śledzący z dynamicznymi parametrami do swojego adresu URL śledzenia, sprawdź składnik [`amp-pixel`](../../../components/reference/amp-pixel.md). Udokumentuj jego stosowanie na swoich stronach obsługi dla programistów, którzy mogą chcieć użyć Twojej technologii z AMP.

Niektórzy dostawcy usług analitycznych już dodali obsługę składnika amp-analytics. Tu znajdziesz [przykład żądania ściągnięcia](https://github.com/ampproject/amphtml/pull/1595) od dostawcy usług analitycznych [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

W przypadku świadczenia usług śledzenia połączeń telefonicznych przypadek użycia może być obsługiwany za pomocą składnika [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). Składnik ten dynamicznie zastępuje numer telefonu w hiperlinku, aby umożliwić śledzenie połączeń poprzez wykonanie żądania CORS w celu zastąpienia numeru.

Aby dowiedzieć się więcej o możliwej przydatności tego składnika dla Ciebie, zapoznaj się z [dokumentacją referencyjną](../../../components/reference/amp-call-tracking.md).

## Wkład poziomu 3

Wkład poziomu 3 to wprowadzenie nowego składnika specyficznego dla strony trzeciej. Ma zastosowanie tylko w przypadku, gdy strony trzecie nie są w stanie:

- Znaleźć istniejącego składnika, odpowiedniego do ich przypadku użycia.
- Poprosić o ulepszenia funkcji w celu dostosowania ich do danego przypadku użycia.
- Zaproponować składnika mającego zastosowanie do innych usług stron trzecich.

### Oczekiwania wobec stron trzecich

- Napisz i zaproponuj analizę projektu.
- Testy muszą być w stanie wyłapać usterki kodu.
- Napraw lub poproś o pomoc, jeśli składnik ma usterki.
- Dostarcz dokładną dokumentację z próbkami kodu.
- Prowadź i aktualizuj dokumentację.
- Udostępnij kanał rozwiązywania problemów dla programistów AMP umożliwiający zażądanie pomocy.
