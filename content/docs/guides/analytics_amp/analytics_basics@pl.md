---
$title: "Analityka: podstawy"
toc: true
---

Zacznij tutaj, aby poznać podstawy analityki AMP.

[TOC]

## Używać elementów amp-pixel czy amp-analytics?

AMP udostępnia dwa komponenty spełniające potrzeby w zakresie analityki i pomiarów:
[amp-pixel](/docs/reference/amp-pixel.html) i
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Oba elementy wysyłają dane analityczne do zdefiniowanego punktu końcowego.

Jeśli oczekujesz zachowania takiego jak w przypadku prostego
[piksela śledzącego](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
 komponent `amp-pixel` umożliwia podstawowe monitorowanie wyświetleń strony;
dane o wyświetleniach strony są wysyłane na zdefiniowany adres URL.
W niektórych integracjach z dostawcą ten komponent może być wywoływany,
wówczas zostaje określony dokładny punkt końcowy adresu URL.

Na potrzeby większości rozwiązań analitycznych należy używać elementu `amp-analytics`.
Także w komponencie `amp-analytics` działa monitorowanie wyświetleń stron.
Można jednak dodatkowo monitorować czynności użytkowników dla dowolnego typu treści na stronie,
w tym kliknięcia linków i przycisków.
Można również zmierzyć, jak daleko użytkownik przewinął stronę,
czy użytkownik korzystał z mediów społecznościowych i nie tylko
(zobacz
[Więcej o analityce AMP](/pl/docs/guides/analytics/deep_dive_analytics.html)).

W ramach integracji z platformą AMP
dostawcy oferują wstępnie zdefiniowane konfiguracje `amp-analytics`,
co ułatwia przechwytywanie danych i przekazywanie ich do narzędzi monitorowania.
Dokumentacja dla dostawców jest dostępna w
[specyfikacji elementu amp-analytics](/docs/reference/extended/amp-analytics.html).

Na swoich stronach można używać zarówno elementu `amp-pixel`, jak i `amp-analytics`:
`amp-pixel` do prostego śledzenia wyświetleń strony,
a `amp-analytics` do wszystkiego innego.
Każdy znacznik można dodawać wiele razy.
W przypadku korzystania z wielu dostawców usług analitycznych
potrzebny będzie jeden znacznik dla każdego rozwiązania.
Warto pamiętać, że prostsze strony AMP są lepsze dla użytkowników,
dlatego jeśli dodatkowe znaczniki nie są potrzebne, nie należy ich używać.

## Tworzenie prostej konfiguracji analitycznej

Dowiedz się, jak utworzyć prostą konfigurację z elementami
[amp-pixel](/docs/reference/amp-pixel.html) i
[amp-analytics](/docs/reference/extended/amp-analytics.html).

### Prosta konfiguracja z elementem amp-pixel

W celu utworzenia prostej konfiguracji z elementem `amp-pixel`
wstaw wiersz podobny do poniższego w treści swojej strony AMP:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

W tym przykładzie
dane o wyświetleniu strony są przesyłane na zdefiniowany adres URL wraz z losową liczbą.
Zmienna `RANDOM` to jedna z wielu
[zmiennych podstawiania na platformie AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Więcej informacji o podstawianiu zmiennych można znaleźć
[tutaj](/pl/docs/guides/analytics/analytics_basics.html#podstawianie-zmiennych).

Komponent [amp-pixel](/docs/reference/amp-pixel.html)
jest wbudowany,
dlatego nie jest potrzebna deklaracja włączenia jak w przypadku
komponentów rozszerzonych AMP, w tym `amp-analytics`.
Jednak znacznik `amp-pixel` należy umieścić możliwie blisko
początku sekcji `<body>`.
Piksel monitorowania zostanie wyzwolony tylko wtedy, gdy sam znacznik zostanie wyświetlony.
Jeśli znacznik `amp-pixel` zostanie umieszczony u dołu strony,
może nie zostać wyzwolony.

### Prosta konfiguracja z elementem amp-analytics

Aby utworzyć prostą konfigurację z elementem
[amp-analytics](/docs/reference/extended/amp-analytics.html),
należy najpierw włączyć deklarację `custom-element`
w sekcji `<head>` dokumentu AMP (zobacz też
[Deklaracja włączenia komponentu](/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

Poniższy przykład jest podobny do [przykładu z elementem `amp-pixel`](/pl/docs/guides/analytics/analytics_basics.html#prosta-konfiguracja-z-elementem-amp-pixel).
Podczas każdego wyświetlenia strony
uruchamiane jest zdarzenie wyzwalacza, które
wysyła dane o wyświetleniu strony na zdefiniowany adres URL wraz z losowym identyfikatorem:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

W przykładzie powyżej zostało zdefiniowane żądanie o nazwie pageview jako https://foo.com/pixel?RANDOM. Jak wspomniano wcześniej za zmienną RANDOM jest podstawiana losowa liczba, więc ostatecznie żądanie będzie wyglądać następująco https://foo.com/pixel?0.23479283687235653498734.

Kiedy strona stanie się widoczna
(zgodnie z użytym słowem kluczowym wyzwalacza `visible`),
zdarzenie zostanie wyzwolone i żądanie `pageview` zostanie wysłane.
Atrybut triggers określa moment wyzwolenia żądania pageview.
Dowiedz się więcej o [żądaniach i wyzwalaczach](/pl/docs/guides/analytics/deep_dive_analytics.html#żądania,-wyzwalacze-i-transporty).

## Podstawianie zmiennych

Zarówno komponent [amp-pixel](/docs/reference/amp-pixel.html), jak i
[amp-analytics](/docs/reference/extended/amp-analytics.html)
zezwalają na wszystkie standardowe podstawienia zmiennych URL (zobacz
[Podstawienia zmiennych AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
W poniższym przykładzie
żądanie pageview jest wysyłane na adres URL
wraz z bieżącym kanonicznym adresem URL dokumentu AMP, jego tytułem i
[identyfikatorem klienta](/pl/docs/guides/analytics/analytics_basics.html#identyfikacja-użytkowników):

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

Ze względu na swoją prostotę,
znacznik `amp-pixel` może zawierać tylko zmienne zdefiniowane przez platformę
lub takie, które środowisko wykonawcze AMP może zanalizować składniowo na podstawie strony AMP.
W przykładzie powyżej
platforma wypełnia wartości zmiennych
`canonicalURL` i `clientId(site-user-id)`.
Znacznik `amp-analytics` może zawierać te same zmienne co znacznik `amp-pixel`,
a także niepowtarzalnie zdefiniowane zmienne wewnątrz konfiguracji znacznika.

W przypadku zmiennej definiowanej na stronie lub na platformie
należy użyć formatu `${varName}` w ciągu znaków żądania.
Znacznik `amp-analytics` zastąpi szablon rzeczywistą wartością
w czasie konstruowania żądania analitycznego (zobacz też
[Zmienne obsługiwane w elemencie amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

W poniższym przykładzie z elementem `amp-analytics`
żądanie pageview jest wysyłane na adres URL
wraz z dodatkowymi danymi wyodrębnionymi z podstawień zmiennych,
niektórymi podanymi przez platformę,
niektórymi zdefiniowanymi
w konfiguracji elementu`amp-analytics`:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

W przykładzie powyżej
w konfiguracji elementu `amp-analytics` zdefiniowano
zmienne `account` i `title`.
Zmienne `canonicalUrl` i `clientId` nie są zdefiniowane w konfiguracji,
więc ich wartości są podstawiane przez platformę.

**Ważne:** Podstawianie zmiennych jest elastyczne;
te same zmienne mogą być zdefiniowane w różnych miejscach,
a środowisko wykonawcze AMP zanalizuje wartości w tej kolejności pierwszeństwa
(zobacz [Kolejność podstawiania zmiennych](/pl/docs/guides/analytics/deep_dive_analytics.html#kolejność-podstawiania-zmiennych)).

## Identyfikacja użytkowników

Strony internetowe używają plików cookie do przechowywania w przeglądarce informacji właściwych dla użytkownika.
Na podstawie plików cookie może powiedzieć, czy użytkownik odwiedził witrynę wcześniej.
W przypadku AMP
strony mogą być udostępniane ze strony wydawcy lub z pamięci podręcznej
(takiej jak Google AMP Cache).
Najprawdopodobniej strona wydawcy i pamięć podręczna mają różne domeny.
Ze względów bezpieczeństwa
przeglądarki mogą (i często z tego korzystają) ograniczać dostęp do plików cookie z innych domen
(zobacz też
[Monitorowanie użytkowników w różnych domenach](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Domyślnie
AMP obsłuży skonfigurowanie identyfikatora klienta niezależnie od tego, czy dostęp do strony jest uzyskiwany przez stronę wydawcy, czy przez pamięć podręczną.
Identyfikator klienta wygenerowany przez AMP ma wartość składającą się z przedrostka `"amp-"`
i losowego ciągu znaków w kodowaniu `base64` i zawsze pozostaje taki sam
dla użytkownika, jeśli ten sam użytkownik ponownie odwiedzi stronę.

AMP zarządza odczytem i zapisem identyfikatora klienta we wszystkich klasach.
Jest to szczególnie zauważalne w przypadku, gdy strona jest udostępniana
przez pamięć podręczną lub w inny sposób pokazana poza kontekstem wyświetlania
w oryginalnej witrynie wydawcy.
W tych okolicznościach dostęp do plików cookie z witryny wydawcy jest niemożliwy.

Gdy strona AMP jest udostępniana z witryny wydawcy,
używana przez AMP struktura identyfikatora klienta może uzyskać informacje o zapasowym pliku cookie
w celu znalezienia go i użycia.
W tym przypadku
argument `cid-scope-cookie-fallback-name` zmiennej `clientId`
jest interpretowany jako nazwa pliku cookie.
Możliwe są dwie opcje formatowania:
`CLIENT_ID(cid-scope-cookie-fallback-name)` lub
`${clientId(cid-scope-cookie-fallback-name)}`.

Na przykład:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

Jeśli AMP wykryje, że ten plik cookie został ustawiony,
podstawienie identyfikatora klienta spowoduje wyświetlenie wartości pliku cookie.
Jeśli AMP wykryje, że plik cookie nie został ustawiony,
AMP wygeneruje wartość złożoną z przedrostka `amp-`
i losowego ciągu znaków w kodowaniu base64.

Więcej informacji o podstawianiu identyfikatora klienta,
w tym o dodawaniu opcjonalnego identyfikatora powiadomienia użytkownika, można znaleźć w temacie
[Zmienne obsługiwane w analityce AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
