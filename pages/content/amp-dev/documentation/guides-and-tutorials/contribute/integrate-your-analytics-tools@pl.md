---
"$title": Zintegruj swoje narzędzie analityczne z AMP
order: '1'
formats:
- websites
- stories
teaser:
  text: " Omówienie"
toc: 'true'
---

## Omówienie <a name="overview"></a>

Jeśli używasz narzędzia typu „oprogramowanie jako usługa” dla wydawców, aby lepiej zrozumieć ich ruch i osoby odwiedzające, być może zechcesz zintegrować swoją usługę ze składnikiem `amp-anaytics`. Umożliwi to Twoim klientom przeglądanie wzorców ruchu na ich stronach AMP HTML.

## Zanim rozpoczniesz <a name="before-you-begin"></a>

Aby móc dodać swoją usługę analityczną do środowiska uruchomieniowego AMP HTML, być może trzeba będzie:

- Zidentyfikować rodzaje [zmiennych](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) i [żądań](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests), których będziesz potrzebować w dokumencie AMP HTML swojej usługi analitycznej.
- Określić, czy funkcja wtyczki dozującej jest wymagana do skonstruowania ostatecznego adresu URL, jeśli stosowane są żądania wymagające dzielenia danych na partie.
- Zidentyfikować wyzwalacze powodujące wysyłanie żądań analitycznych ze strony reprezentatywnej dla danego serwisu.
- Zastanowić się, czy i jak będziesz [śledzić użytkowników](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) w kontekstach AMP strony pierwszej i stron trzecich.
- Określić, w jaki sposób Twój pulpit nawigacyjny analityki obsługuje ruch AMP.
- Zidentyfikować ewentualne brakujące funkcje w składniku `amp-analytics` oraz [złożyć wnioski](https://github.com/ampproject/amphtml/issues/new) o opracowanie potrzebnych funkcji.
- AMP Analytics wysyła swoje zmienne do wstępnie skonfigurowanego punktu końcowego. Jeśli nie masz jeszcze istniejącego punktu końcowego, sprawdź [ten przykład](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample), aby dowiedzieć się, jak go utworzyć.
    - W przypadku wszystkich typów transportu z wyjątkiem ramek `iframe` zmienne są wysyłane jako parametry ciągu zapytania w żądaniu HTTPS.
    - W przypadku typu transportu `iframe` tworzona jest ramka iframe i zmienne są do niej wysyłane za pomocą metody `window.postMessage`. W tym przypadku, komunikat nie musi być adresem URL. Opcja ta jest dostępna tylko dla dostawców posiadających akredytację MRC.
- Zastanowić się, w jaki sposób integracja ze składnikiem `amp-analytics` może wpłynąć na Twoje polityki (w szczególności politykę prywatności) lub umowy.

## Dodawanie konfiguracji do środowiska uruchomieniowego AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Utwórz [zgłoszenie zamiaru wprowadzenia](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) stwierdzające, że będziesz dodawać konfigurację usługi analitycznej do środowiska uruchomieniowego AMP HTML. W opisie umieść wzmiankę **cc @ampproject/wg-analytics**.
2. Opracuj poprawkę implementującą co następuje:
    1. Nowy plik konfiguracyjny json `${vendorName}.json` w [folderze ](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) dostawców, zawierający wszystkie powyższe i wykraczające poza domyślne opcje, np:
        1. `"vars": {}` — dodatkowe opcje domyślne.
        2. `"requests": {}` — żądania, których będzie używać serwis.
        3. W razie potrzeby `"optout":`. Obecnie nie mamy świetnego systemu rezygnacji, więc skontaktuj się z nami, aby pomóc nam zaprojektować taki, którego działanie będzie Ci odpowiadać.
        4. W razie potrzeby `"warningMessage":`. Wyświetla informacje ostrzegawcze od dostawcy (takie jak wycofanie lub migracja) w konsoli.
    2. Jeśli używasz transportu iframe, dodj nowy wiersz również do sekcji ANALYTICS_IFRAME_TRANSPORT_CONFIG w pliku iframe-transport-vendors.js, zawierający zmienne `"*vendor-name*": "*url*"`
    3. Przykład w materiale referencyjnym [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
    4. Test w pliku [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
    5. Dodaj swoją usługę analityczną do obsługiwanej listy dostawców w pliku [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). Podaj typ, opis i link do dokumentacji użytkowania.
3. W razie potrzeby nowa wtyczka dozująca. Instrukcje zawiera artykuł [Dodawanie wtyczki dozującej](#add-batch-plugin).
4. Przetestuj nowy przykład, zamieszczony na stronie [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html), aby upewnić się, że trafienia z przykładu działają zgodnie z oczekiwaniami. Na przykład, potrzebne dane są zbierane i wyświetlane w panelu nawigacyjnym analityki.
5. Wyślij z tą poprawką żądanie ściągnięcia, odwołujące się do zgłoszenia zamiaru wprowadzenia.
6. Zaktualizuj dokumentację użytkowania usługi i poinformuj swoich klientów.
7. Zdecydowanie zalecane jest trzymanie [testu integracji poza repozytorium AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Menedżery tagów <a name="tag-managers"></a>

Usługi zarządzania tagami mają dwie opcje integracji z AMP Analytics:

- **Podejście oparte na punktach końcowych:** działanie jako dodatkowy punkt końcowy składnika `amp-analytics` i prowadzenie zarządzania marketingowego na zapleczu.
- **Podejście konfiguracyjne:** prowadzenie zarządzania tagami za pomocą dynamicznie generowanego pliku konfiguracyjnego JSON, unikalnego dla każdego wydawcy.

Podejście oparte na punktach końcowych jest takie samo jak podejście standardowe, opisane w poprzedniej sekcji. Podejście konfiguracyjne polega na utworzeniu unikalnej konfiguracji składnika amp-analytics, która jest specyficzna dla każdego wydawcy i zawiera wszystkie ich kompatybilne pakiety analityczne. Wydawca włącza taką konfigurację, używając składni takiej jak ta:

[sourcecode:html]
<amp-analytics
  config="https://my-awesome-tag-manager.example.com/user-id.json"
></amp-analytics>
[/sourcecode]

Aby przyjąć takie podejście, należy zapoznać się z dokumentacją dotyczącą integracji wydawców z AMP Analytics.

## Dodatkowe zasoby <a name="further-resources"></a>

- Głębokie wody: [Dlaczego po prostu nie użyć iframe?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Głębokie wody: [Zarządzanie stanem użytkownika nieuwierzytelnionego za pomocą AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [Przykład kodu amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Dokumentacja referencyjna [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Dokumentacja referencyjna [zmiennych amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
