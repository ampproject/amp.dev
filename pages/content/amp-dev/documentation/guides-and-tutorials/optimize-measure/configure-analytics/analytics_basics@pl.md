---
'$title': 'Analityka: podstawy'
$order: 0
description: 'AMP oferuje dwa składniki spełniające potrzeby analityczne i pomiarowe: amp-pixel i amp-analytics. Obie opcje wysyłają dane analityczne do zdefiniowanego punktu końcowego.'
formats:
  - websites
  - stories
---

Zacznij tutaj, aby poznać podstawy analityki AMP.

## Używać składnika amp-pixel czy amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP oferuje dwa składniki spełniające potrzeby analityczne i pomiarowe: amp-pixel i amp-analytics. Obie opcje wysyłają dane analityczne do zdefiniowanego punktu końcowego.

Jeśli szukasz sposobu działania takiego jak zwykły [piksel śledzący](https://en.wikipedia.org/wiki/Web_beacon#Implementation), składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) zapewnia podstawowe śledzenie odsłon; dane odsłon są wysyłane do zdefiniowanego adresu URL. Niektóre integracje z usługodawcą mogą wymagać tego składnika, w takim przypadku usługodawca określa dokładny punkt końcowy adresu URL.

W przypadku większości rozwiązań analitycznych należy stosować składnik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Śledzenie odsłon strony działa również w składniku [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Możesz jednak również śledzić zaangażowanie użytkowników w dowolny typ zawartości strony, włącznie z kliknięciami linków i przycisków. [filter formats="websites"] Można też mierzyć, jak daleko przewinął stronę użytkownik, czy angażował się w media społecznościowe itd. [/filter] [filter formats="stories"] Można też mierzyć, jak daleko w relacji zaszedł użytkownik i czy angażował się w elementy interaktywne. [/filter]

[tip type="read-on"] Zobacz artykuł [Głębokie zanurzenie w analitykę AMP](deep_dive_analytics.md). [/tip]

W ramach integracji z platformą AMP dostawcy zaoferowali wstępnie zdefiniowane konfiguracje składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), aby ułatwić rejestrowanie i przesyłanie danych do ich narzędzi śledzących. Przejdź do dokumentacji usługodawcy z listy [Dostawcy usług analityki](analytics-vendors.md).

Na stronach można stosować zarówno składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), jak i [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md): składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) do prostego śledzenia odsłon, a [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) do wszystkiego innego. Możesz również wiele razy dodać każdy ze znaczników. Jeśli pracujesz z wieloma dostawcami usług analityki, będziesz potrzebować jednego znacznika na każde rozwiązanie. Pamiętaj, że prostsze strony AMP są lepsze dla użytkowników, więc jeśli nie potrzebujesz dodatkowych znaczników, nie używaj ich.

## Tworzenie prostej konfiguracji analityki

Dowiedz się jak utworzyć prostą konfigurację składników [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) i [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Prosta konfiguracja składnika `amp-pixel`

Aby utworzyć prostą konfigurację składnika [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), wstaw do sekcji body strony AMP coś w rodzaju poniższego kodu:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

W tym przykładzie dane odsłony strony są wysyłane do zdefiniowanego adresu URL wraz z przypadkową liczbą. Zmienna `RANDOM` jest jedną z wielu [zmiennych podstawianych na platformie AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md). Dowiedz się więcej o [podstawianiu zmiennych](analytics_basics.md#variable-substitution) tutaj.

Składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) jest wbudowany, więc nie będzie potrzebna deklaracja włączenia, jak w przypadku rozszerzonych składników AMP, takich jak [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Znacznik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) należy jednak umieścić jak najbliżej początku sekcji `<body>`. Piksel śledzący będzie uruchamiany tylko wtedy, gdy w widoku znajdzie się sam znacznik. Jeśli składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) znajduje się w pobliżu dolnej części strony, może nie zostać uruchomiony.

### Prosta konfiguracja składnika `amp-analytics`

Aby utworzyć prostą konfigurację składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), musisz najpierw dodać tę deklarację `custom-element` w sekcji `<head>` dokumentu AMP (patrz też [Deklaracja włączenia składnika](../../../../documentation/components/index.html)):

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

Poniższy przykład jest podobny do [przykładu `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Za każdym razem, gdy strona jest widoczna, uruchamiane jest zdarzenie wyzwalające, które wysyła dane odsłony strony do zdefiniowanego adresu URL wraz z losowym identyfikatorem:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://foo.com/pixel?RANDOM"
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
```

W powyższym przykładzie zdefiniowaliśmy żądanie o nazwie pageview jako `https://foo.com/pixel?RANDOM`. Jak wspomniano wcześniej, zmienna RANDOM jest zastępowana liczbą losową, więc żądanie będzie wyglądać mniej więcej tak: `https://foo.com/pixel?0.23479283687235653498734`.

Gdy strona staje się widoczna (jak określono poprzez użycie słowa kluczowego wyzwalacza `visible`), następuje wyzwolenie zdarzenia i wysłanie żądania `pageview`. Atrybut wyzwalacza określa moment uruchomienia żądania odsłony strony. Dowiedz się więcej o [żądaniach i wyzwalaczach](deep_dive_analytics.md).

[filter formats="stories"]

## Konfiguracja domyślna relacji AMP

Typowa podróż użytkownika po witrynie internetowej bardzo różni się od relacji internetowych. W witrynie internetowej użytkownik może przeczytać nagłówek, przewinąć stronę do dołu, wejść w interakcję z formularzem przed kliknięciem linku do następnej strony. Relacje zajmują całe okienko na ekranie, a użytkownicy nie przewijają ekranu, tylko go dotykają, aby przejść do przodu.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

Wiele osób chcie mierzyć każdy nowy znacznik [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) w relacji jako nową odsłonę strony, ponieważ zawartość poszczególnych ekranów znacznie się różni. Strona jest jednak tylko pojedynczym elementem w pełnej relacji, a użytkownik zwykle musi wyświetlić wiele stron relacji, aby w pełni ją zrozumieć. Pytanie o to, jak liczymy coś tak prostego jak odsłona, ma więc ogromne znaczenie dla naszego podejścia analitycznego.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

Analityka AMP ułatwia implementację powyższego przy użyciu dowolnego dostawcy usług analityki. Na przykład z [globalnym tagiem witryny](https://developers.google.com/gtagjs/) usługi Google Analytics będzie wyglądać jak poniższy fragment kodu.

```html
<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
    {
      "vars": {
        "gtag_id": "YOUR_GOOGLE_ANALYTICS_ID",
        "config": {
          "YOUR_GOOGLE_ANALYTICS_ID": {
            "groups": "default"
          }
        }
      },
      "triggers": {
        "storyProgress": {
          "on": "story-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_progress",
            "event_category": "${title}",
            "event_label": "${storyPageId}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        },
        "storyEnd": {
          "on": "story-last-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_complete",
            "event_category": "${title}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Ta konfiguracja domyślna powinna zapewnić Ci pełną konfigurację roboczą dla relacji AMP.

Jeśli interesuje Cię wyjście poza to, co może dać Ci konfiguracja domyślna, przeczytaj artykuł [Analityka relacji AMP](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg), przedstawiający bardziej zaawansowane przypadki użycia z usługą Google Analytics.

[/filter]

## Podstawianie zmiennych <a name="variable-substitution"></a>

Zarówno składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), jak i [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) zezwalają na wszystkie standardowe podstawienia zmiennych w adresach URL (patrz [Podstawianie zmiennych AMP HTML](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)). W poniższym przykładzie żądanie odsłony strony jest wysyłane na adres URL wraz z kanonicznym adresem URL bieżącego dokumentu AMP, jego tytułem i [identyfikatorem klienta](analytics_basics.md#user-identification):

```html
<amp-pixel
  src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"
></amp-pixel>
```

Ze względu na swoją prostotę znacznik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) może zawierać tylko zmienne zdefiniowane przez platformę lub takie, które może przetworzyć ze strony AMP środowisko uruchomieniowe AMP. W powyższym przykładzie platforma wypełnia wartości zarówno właściwości `canonicalURL`, jak i `clientId(site-user-id)`. Znacznik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) może zawierać te same zmienne, co [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), jak również zmienne unikalnie zdefiniowane wewnątrz konfiguracji znacznika.

Użyj formatu `${varName}` w ciągu znaków żądania strony lub zmiennej zdefiniowanej przez platformę. Znacznik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) zastąpi szablon jego rzeczywistą wartością w momencie konstruowania żądania usługi analityki (zobacz także [Zmienne obsługiwane w składniku `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

W poniższym przykładzie użycia składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) żądanie odsłony strony jest wysyłane na adres URL z dodatkowymi danymi pobranymi z podstawień zmiennych, z których jedne dostarcza platforma, a inne są definiowane inline w konfiguracji składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account": "ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

W powyższym przykładzie zmienne, `account` oraz `title` są zdefiniowane w konfiguracji składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Zmienne `canonicalUrl` i `clientId` nie są zdefiniowane w konfiguracji, więc ich wartości są podstawiane przez platformę.

[tip type="important"] **WAŻNE —** podstawianie zmiennych jest elastyczne; możesz mieć te same zmienne zdefiniowane w różnych lokalizacjach, a środowisko uruchomieniowe AMP przetworzy wartości w kolejności według pierwszeństwa (patrz [Kolejność podstawiania zmiennych](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Identyfikacja użytkownika <a name="user-identification"></a>

Witryny internetowe używają plików cookie do przechowywania w przeglądarce informacji specyficznych dla danego użytkownika. Pliki cookie mogą być używane do stwierdzenia, czy użytkownik odwiedził już daną witrynę. W AMP strony mogą być serwowane albo z witryny wydawcy, albo z serwera buforującego (np. serwera Google AMP Cache). Witryna internetowa wydawcy i serwer buforujący zazwyczaj będą mieć różne domeny. Ze względów bezpieczeństwa przeglądarki mogą (i często będą) ograniczać dostęp do plików cookie innej domeny (patrz również [Śledzenie użytkowników w różnych źródłach](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)).

Domyślnie AMP zarządza dostarczaniem identyfikatora klienta niezależnie od tego, czy strona jest pobierana ze źródła wydawcy, czy z serwera buforującego. Identyfikator klienta generowany przez AMP ma wartość `"amp-"`, po której następuje losowy szyfrowany ciąg znaków `base64`. Pozostaje on taki sam dla użytkownika, jeśli ten sam użytkownik ponownie odwiedzi stronę.

AMP zarządza odczytem i zapisem identyfikatora klienta we wszystkich przypadkach. Jest to szczególnie istotne w przypadku, gdy strona jest serwowana z serwera buforującego lub w inny sposób wyświetlana jest poza kontekstem wyświetlania oryginalnej witryny wydawcy. W tej sytuacji dostęp do plików cookie witryny wydawcy jest niemożliwy.

Gdy strona AMP jest serwowana z witryny wydawcy, platforma identyfikacji klienta, której używa AMP może być informowana o rezerwowym pliku cookie, który należy wyszukać i użyć. W tym przypadku jako nazwa pliku cookie jest interpretowany argument `cid-scope-cookie-fallback-name` zmiennej `clientId`. Formatowanie moze mieć postać `CLIENT_ID(cid-scope-cookie-fallback-name)` albo `${clientId(cid-scope-cookie-fallback-name)}`.

Na przykład:

```html
<amp-pixel
  src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"
></amp-pixel>
```

Jeśli AMP stwierdzi, że ten plik cookie został ustawiony, podstawienie identyfikatora klienta zwróci wartość pliku cookie. Jeśli AMP stwierdzi, że ten plik cookie nie jest ustawiony, wygeneruje wartość o postaci `amp-`, po której następować będzie losowy łańcuch znaków szyfrowany za pomocą kodowania base64.

Dowiedz się więcej na temat podstawiania identyfikatora klienta, w tym jak dodać opcjonalny identyfikator powiadomienia użytkownika, z artykułu [Zmienne obsługiwane w analityce AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md).

Dowiedz się więcej: kontynuuj naukę o analityce w artykułach [Głębokie zanurzenie w analitykę AMP](deep_dive_analytics.md) i [Przypadki użycia](use_cases.md).
