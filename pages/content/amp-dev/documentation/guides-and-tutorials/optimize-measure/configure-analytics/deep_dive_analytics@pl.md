---
"$title": Głębokie zanurzenie w analitykę AMP
"$order": '1'
description: Ten przewodnik zanurza się głęboko w składnik amp-analytics, rozkładając jego przykładową konfigurację na kluczowe elementy konstrukcyjne.
formats:
- websites
- stories
---

Ten przewodnik zanurza się głęboko w składnik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), rozkładając jego przykładową konfigurację na kluczowe elementy konstrukcyjne.[](../../../../documentation/components/reference/amp-analytics.md)``

W pozostałej części tego przewodnika używana jest ta próbka konfiguracji, śledząca odsłony stron i kliknięcia linków przez użytkownika, a następnie wysyłająca dane analityczne do usługodawcy zewnętrznego, [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

Powyższy przykładowy kod ma pomóc w nauce, ale w żadnym wypadku nie jest to realistyczna próbka. Jeśli pracujesz z dostawcami usług analityki, jest prawdopodobne, że powyższa próbka nie będzie miała sensu; konfiguracje usługodawców usuwają złożoność. Zapoznaj się z konfiguracjami próbek w [dokumentacji dostawcy usług analityki](analytics-vendors.md).

## Dokąd mają być wysyłane dane analityczne: atrybut type

AMP is designed to support two common patterns of data collection:

- Przyjęcie przez należący do wydawcy punkt końcowy wewnętrznych systemów analitycznych.
- Ingestion by a vendor-owned endpoint for interoperability with a vendor solution (for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

To send analytics data to an analytics provider, include the `type` attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag and set its value to the appropriate vendor, as defind in the [Analytics Vendors](analytics-vendors.md) list.

For example: `<amp-analytics type="googleanalytics">` sends analytics data to the third-party analytics provider, Google Analytics. To send data to a publisher-owned endpoint, simply don’t include the `type` attribute; the analytics data is sent to the defined endpoints for each [request](deep_dive_analytics.md).

Analytics vendor configurations are a quick way to get started with [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). You should consult your vendor’s documentation and help resources for further guidance. As previously mentioned, the list of vendors who’ve already integrated with AMP, as well as links to their specific documentation can be found in the [Analytics Vendors](analytics-vendors.md) list.

If you’re an analytics vendor, learn more about [integrating your own analytics configuration into AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Ładowanie konfiguracji zdalnej: atrybut config

Nie musisz dodawać całej konfiguracji składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) jedynie na stronie AMP. Można zamiast tego wywoływać zdalny adres URL całości lub części konfiguracji.

Pozwala to na przykład na zmianę konfiguracji odpowiednio do danego żądania. Jeśli jako wydawca masz kontrolę nad plikiem zdalnym, możesz wykonać dowolne przetwarzanie po stronie serwera niezbędne do skonstruowania danych konfiguracyjnych.

Pierwszym krokiem do ładowania konfiguracji zdalnych jest umieszczenie atrybutu config w znaczniku [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Następnym krokiem jest utworzenie zawartości JSON, która znajduje się w zdalnym adresie URL. W tym prostym przykładzie, konfiguracja zawarta w obiekcie JSON jest tylko wartością zmiennej konta analityki.

Przykładowa zawartość w pliku `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Ostatnim krokiem jest upewnienie się, że to, co znajduje się w pliku zdalnym, zostanie wciągnięte w odpowiednie miejsce konfiguracji składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Tutaj, zarówno w żądaniu `pageview` i `event`, automatycznie ustawiana jest wartość zmiennej `account` równa wartości account w zdalnym adresie URL (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"] **WAŻNE —** AMP nie wykonuje walidacji wielokrotnego użycia tej samej zmiennej. Wartości są zapełniane zgodnie z wybraną kolejnością podstawiania zmiennych, a wartości w zdalnych adresach URL są na początku tej kolejności (patrz [Kolejność podstawiania zmiennych](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Żądania, wyzwalacze i transporty <a name="requests-triggers--transports"></a>

Atrybut `requests` definiuje „które dane są wysyłane” (na przykład `pageviews`, `events`) i dokąd dane te są wysyłane (adresy URL używane do przesłania danych).

Atrybut `triggers` opisuje, kiedy dane analityczne mają być wysyłane, na przykład, gdy użytkownik wyświetli stronę, gdy użytkownik kliknie link.

Atrybut `transport` określa sposób wysyłania żądania, a dokładniej — protokół.

Czytaj dalej, aby dowiedzieć się więcej o tych konfiguracjach. (Możesz również przeczytać o tych konfiguracjach w [dokumentacji referencyjnej składnika `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

### Wysyłane dane: atrybut requests <a name="what-data-gets-sent-requests-attribute"></a>

Wartość atrybutu `request-name` jest używana w konfiguracji wyzwalacza w celu określenia żądania, które ma zostać wysłane w odpowiedzi na dane zdarzenie. Wartością atrybutu `request-value` jest adres URL protokołu `https`. Wartości te mogą zawierać tokeny zastępcze, które mogą odnosić się do innych żądań lub zmiennych.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Niektórzy dostawcy usług analityki (w tym Google Analytics) dostarczyli już konfigurację, której używasz za pomocą atrybutu `type`. Jeśli korzystasz z usług dostawcy usług analityki, dodanie atrybutu `requests` może nie być konieczne. Sprawdź w dokumentacji dostawcy czy atrybuty `requests` muszą być skonfigurowane i w jaki sposób.

#### Dołączanie adresu URL żądania: dodatkowe parametry adresu URL

Atrybut [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params) określa dodatkowe parametry, które należy dołączyć do ciągu znaków żądania w adresie URL zgłoszenia, w zwykłej konwencji "&foo=baz".

Przykładowy składnik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) dodaje dodatkowy parametr `cd1` do żądania i ustawia wartość parametru równą „AMP”:

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Moment wysyłania danych: atrybut triggers

Atrybut `triggers` opisuje, kiedy należy wysłać zapytanie analityczne. Zawiera on parę klucz-wartość nazwy wyzwalacza i konfiguracji wyzwalacza. Nazwa wyzwalacza może być dowolnym ciągiem znaków alfanumerycznych (a-zA-Z0-9).

Na przykład następujący element [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) jest skonfigurowany do wysyłania żądania do `https://example.com/analytics` po pierwszym załadowaniu dokumentu i po każdym kliknięciu znacznika `a`:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
  "trackAnchorClicks": {
    "on": "click",
    "selector": "a",
    "request": "event",
    "vars": {
      "eventId": "42",
      "eventLabel": "clicked on a link"
    }
  }
}
```

[tip type="important"] **WAŻNE —** powyższe podejście jest zalecane tylko w przypadku stron AMP, a nie reklam AMPHTML. Priorytet analityki jest niższy w porównaniu z treścią na stronie, więc zalecane jest śledzenie kliknięć przy użyciu przekierowania przeglądarki, aby uniknąć utraty kliknięć. [/tip]

AMP obsługuje następujące konfiguracje wyzwalaczy:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Konfiguracja wyzwalacza</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"> <code>on</code> (wymagany)</td>
      <td data-th="Description">Zdarzenie do nasłuchiwania. Prawidłowe są wartości <code>click</code>, <code>scroll</code>, <code>timer</code> i <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>request</code> (wymagany)</td>
      <td data-th="Description">Nazwa żądania do wysłania (określona w atrybucie <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">requests</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Obiekt zawierający pary klucz-wartość służące do zastępowania zmiennych z sekcji <code>vars</code> zdefiniowanych w konfiguracji górnego poziomu lub do określania zmiennych z sekcji <code>vars</code> unikalnej dla danego wyzwalacza (patrz też <a href="deep_dive_analytics.md#variable-substitution-ordering">Kolejność podstawiania zmiennych</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>selector</code> (wymagany, gdy <code>on</code> ma ustawienie <code>click</code>)</td>
      <td data-th="Description">Selektor CSS używany do zawężania wyboru elementów, które mają być śledzone. Aby śledzić wszystkie elementy, użyj wartości <code>*</code>. Ta konfiguracja jest używana w połączeniu z wyzwalaczem <code>click</code>. Dowiedz się, jak używać selektora do <a href="use_cases.md#tracking-page-clicks">śledzenia kliknięć stron</a> i <a href="use_cases.md#tracking-social-interactions">interakcji społecznościowych</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>scrollSpec</code> (wymagany, gdy <code>on</code> ma ustawienie <code>scroll</code>)</td>
      <td data-th="Description">Kontroluje, w jakich warunkach po przewinięciu strony następuje wygenerowanie zdarzenia <code>scroll</code>. Ten obiekt może zawierać właściwości <code>verticalBoundaries</code> i <code>horizontalBoundaries</code>. Do wygenerowania zdarzenia <code>scroll</code> wymagana jest co najmniej jedna z tych dwóch właściwości. Wartościami obu właściwości powinny być tablice liczb zawierające granice, na których generowane jest zdarzenie przewijania. Zobacz ten przykład <a href="use_cases.md#tracking-scrolling">śledzenia przewijania</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"> <code>timerSpec</code> (wymagany, gdy <code>on</code> ma ustawienie <code>timer</code>)</td>
      <td data-th="Description">Kontroluje moment generowania zdarzenia <code>timer</code>. Zdarzenie timer jest generowane natychmiast, a następnie w określonych odstępach czasu. Ta konfiguracja jest używana w połączeniu z wyzwalaczem <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

[tip type="important"] **WAŻNE —** wyzwalacze z konfiguracji o niższym priorytecie są zastępowane przez wyzwalacze o tych samych nazwach z konfiguracji o wyższym priorytecie (patrz [Kolejność podstawiania zmiennych](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

### Jak są wysyłane dane: atrybut transport

Atrybut `transport` określa sposób wysyłania żądania. Domyślnie włączone są następujące trzy metody:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Metoda transportu</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Wskazuje, że do przesłania żądania można użyć metody <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a>. Wysyłanie jest wówczas żądanie <code>POST</code> z poświadczeniami i pustą treścią.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Wskazuje, że do przesłania żądania można użyć metody <code>XMLHttpRequest</code>. Wysyłanie jest wówczas żądanie <code>POST</code> z poświadczeniami i pustą treścią.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Wskazuje, że żądanie można wysłać, generując znacznik <code>Image</code>. Wysyłanie jest wówczas żądanie <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Używany jest tylko jeden sposób transportu i jest to ten o najwyższym priorytecie, który jest włączony, dozwolony i dostępny. Pierwszeństwo: `beacon` > `xhrpost` > `image`. Jeśli program użytkownika klienta nie obsługuje danej metody, używana jest następna włączona metoda o najwyższym priorytecie.

Atrybut `transport` dodaj do konfiguracji tylko wtedy, gdy chcesz ograniczyć opcje transportu, w przeciwnym razie możesz zatrzymać żądania.

W poniższym przykładzie meotdy `beacon` i `xhrpost` mają ustawienie false, więc nie będą one używane, mimo że mają wyższy priorytet niż metoda `image`. Jeśli program użytkownika klienta obsługuje metodę `image`, zostanie ona użyta; w przeciwnym razie nie zostanie wysłane żadne żądanie.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Kolejność podstawiania zmiennych <a name="variable-substitution-ordering"></a>

AMP wypełnia zmienne wartościami w kolejności ich pierwszeństwa:

1. Konfiguracje zdalne (za pomocą elementu `config`).
2. Zmienne `vars` osadzone w wyzwalaczu w atrybucie `triggers`.
3. Zmienne `vars` na najwyższym poziomie zagnieżdżone w elemencie [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Wartości dostarczone przez platformę.

Ten przykład zawiera konfigurację zdalną, zmienne zdefiniowane na najwyższym poziomie, w wyzwalaczach i na poziomie platformy:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

When the same `var` is defined in multiple locations, the variable order of precedence sets its value once. Thus, if the remote configuration defined `account` as UA-XXXXX-Y in the example above, the values of various vars will be as follows:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Wartość</th>
      <th data-th="Defined By" class="col-thirty">Definiowana przez</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Platformę</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Wyzwalacz</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Konfigurację zdalną</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Wyzwalacz</td>
    </tr>
  </tbody>
</table>
