---
$title: Więcej o analityce AMP
toc: true
---
[TOC]


Ten przewodnik zawiera szczegółowe omówienie
[komponentu amp-analytics](/docs/reference/extended/amp-analytics.html),
dzieląc przykładową konfigurację z elementem `amp-analytics` na następujące kluczowe bloki:

Podstawą przewodnika jest przykładowa konfiguracja,
która monitoruje wyświetlenia strony i kliknięcia linków przez użytkownika
oraz wysyła dane analityczne do niezależnego dostawcy
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

[sourcecode:html]
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
[/sourcecode]

**Uwaga:** Powyższy kod przykładowy ma za zadanie pomoc w nauce, ale nie jest on w żadnym razie przykładem realistycznym. W przypadku współpracy z dostawcami usług analitycznych prawdopodobne jest, że powyższy przykład nie ma sensu; konfiguracje dostawców eliminują złożoność. Sprawdź informacje na temat przykładowych konfiguracji w dokumentacji dostawcy.

## Gdzie wysyłać dane analityczne: atrybut type

AMP zaprojektowano do obsługi dwóch typowych wzorców gromadzenia danych:

* Przyswajanie w należącym do wydawcy punkcie końcowym na potrzeby wewnętrznych systemów analitycznych.
* Przyswajanie w punkcie końcowym należącym do dostawcy w celu zapewnienia współdziałania z rozwiązaniem dostawcy
(na przykład [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

W celu wysłania danych analitycznych do dostawcy usług analitycznych
dołącz atrybut `type` w znaczniku `amp-analytics` i ustaw jego wartość,
aby odpowiadała konkretnemu dostawcy, zgodnie z definicją w
[specyfikacji elementu amp-analytics](/docs/reference/extended/amp-analytics.html).

Na przykład element `<amp-analytics type="googleanalytics">` wysyła dane analityczne
do niezależnego dostawcy usług analitycznych Google Analytics.
Aby wysłać dane do punktu końcowego należącego do wydawcy,
wystarczy po prostu nie dołączać atrybutu `type`;
dane analityczne będą wysyłane do punktów końcowych zdefiniowanych dla każdego
[żądania](/pl/docs/guides/analytics/deep_dive_analytics.html#dane-do-wysłania:-atrybut-requests).

Konfiguracje dostawców usług analitycznych stanowią szybką metodę
rozpoczęcia korzystania z elementu `amp-analytics`.
Dodatkowych informacji należy szukać w dokumentacji dostawcy
i zasobach pomocy.
Jak wspomniano wcześniej,
listę dostawców, którzy już zintegrowali swoje systemy z AMP, a także linki
do ich dokumentacji, można znaleźć w
[specyfikacji elementu amp-analytics](/docs/reference/extended/amp-analytics.html).

Dostawcy usług analitycznych mogą
dowiedzieć się więcej o
[integracji własnej konfiguracji analitycznej z AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Ładowanie konfiguracji zdalnej: atrybut config

Nie ma potrzeby dołączania całej konfiguracji
elementu `amp-analytics` na stronie AMP.
Zamiast tego można wywołać zdalny adres URL
z całą konfiguracją lub jej częścią.

Umożliwia to na przykład zmienianie konfiguracji
w zależności od konkretnego żądania.
Jeśli jesteś wydawcą i masz kontrolę nad plikiem zdalnym,
możesz wykonać dowolne przetwarzanie po stronie serwera niezbędne
do skonstruowania danych konfiguracji.

Pierwszy krok do załadowania zdalnych konfiguracji
to dołączenie atrybutu config do znacznika `amp-analytics`:

[sourcecode:html]
<amp-analytics config="https://example.com/analytics.account.config.json">
[/sourcecode]

Następny krok to utworzenie treści JSON funkcjonującej pod zdalnym adresem URL.
W tym prostym przykładzie
konfiguracja zawarta w obiekcie JSON to tylko wartość zmiennej dla konta analitycznego.

Przykładowa treść w obiekcie `https://example.com/analytics.account.config.json`:

[sourcecode:html]
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
[/sourcecode]

Ostatni krok to upewnienie się, które dane z pliku zdalnego są wyciągane
do odpowiedniego miejsca w konfiguracji elementu `amp-analytics`.
W obu żądaniach `pageview` i `event`
wartości zmiennej`account` jest automatycznie nadawana
wartość konta w zdalnym adresie URL (`"account": "UA-XXXXX-Y"`):

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

**Ważne:** AMP nie sprawdza poprawności dla wielu wystąpień tej samej zmiennej.
Wartości są zapełniane zgodnie z preferowaną kolejnością podstawiania zmiennych,
a wartości w zdalnych adresach URL są na początku tej kolejności
(zobacz [Kolejność podstawiania zmiennych](/pl/docs/guides/analytics/deep_dive_analytics.html#kolejność-podstawiania-zmiennych)).

## Żądania, wyzwalacze i transporty

Atrybut `requests` definiuje wysyłane dane
(na przykład `pageviews`, `events`)
oraz miejsce docelowe dla wysyłanych danych (adresy URL używane do transmisji danych).

Atrybut `triggers` określa moment wysłania danych analitycznych,
na przykład kiedy użytkownik wyświetli stronę lub kiedy kliknie link.

Atrybut `transport` określa sposób wysłania żądania,
a dokładniej — protokół.

Czytaj dalej, aby dowiedzieć się więcej o tych konfiguracjach.
(O tych konfiguracjach możesz także przeczytać w części
[Informacje uzupełniające o elemencie amp-analytics](/docs/reference/extended/amp-analytics.html).)

### Dane do wysłania: atrybut requests

Atrybut `request-name` jest używany w konfiguracji wyzwalania do określania,
które żądanie powinno zostać wysłane w odpowiedzi na konkretne zdarzenie.
Atrybut `request-value` to adres URL w protokole `https`.
Te wartości mogą zawierać tokeny zmiennej,
które mogą odwoływać się do innych żądań lub zmiennych.

[sourcecode:html]
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
[/sourcecode]

Niektórzy dostawcy usług analitycznych (w tym Google Analytics)
już udostępnili konfigurację,
której używa się za pośrednictwem atrybutu `type`.
W przypadku korzystania z dostawcy usług analitycznych
dołączanie informacji `requests` może nie być konieczne.
Informacje o tym, czy konfigurowanie atrybutu
`requests` jest konieczne, można znaleźć w dokumentacji dostawcy.

#### Dołączanie adresu URL żądania: Dodatkowe parametry adresu URL

Atrybut [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
określa dodatkowe parametry dołączane do ciągu znaków zapytania adresu URL żądania przy użyciu zwykłej konwencji „&foo=baz”.

Przykład z elementem `amp-analytics` wprowadza dodatkowy parametr <code>cd1</code>
w żądaniu i nadaje mu wartość „AMP”:

[sourcecode:html]
  "extraUrlParams": {
    "cd1": "AMP"
  }
[/sourcecode]

### Moment wysłania danych: atrybut triggers

Atrybut `triggers` określa moment, w którym ma zostać wysłane żądanie analityczne.
Zawiera on parę klucz-wartość z nazwą wyzwalacza i konfiguracją wyzwalacza.
Nazwa wyzwalacza może być dowolnym łańcuchem
znaków alfanumerycznych (a-z A-Z 0-9).

Na przykład
następujący element `amp-analytics` jest skonfigurowany do wysyłania żądania na adres
`https://example.com/analytics`, kiedy dokument jest ładowany po raz pierwszy,
i za każdym razem, kiedy zostanie kliknięty znacznik `a`:

[sourcecode:html]
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
[/sourcecode]

AMP obsługuje następujące konfiguracje wyzwalacza:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Konfiguracja wyzwalacza</th>
      <th data-th="Description">Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (wymagane)</td>
      <td data-th="Description">Nasłuchiwane zdarzenie. Poprawne wartości to <code>click</code>, <code>scroll</code>, <code>timer</code> i <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (wymagane)</td>
      <td data-th="Description">Nazwa żądania do wysłania (określona atrybutem <a href="/pl/docs/guides/analytics/deep_dive_analytics.html#dane-do-wysłania:-atrybut-requests">requests</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Obiekt zawierający pary klucz-wartość używany do zastąpienia deklaracji <code>vars</code> w konfiguracji najwyższego poziomu lub do określenia deklaracji <code>vars</code> właściwej tylko dla tego wyzwalacza (zobacz też <a href="/pl/docs/guides/analytics/deep_dive_analytics.html#kolejność-podstawiania-zmiennych">Kolejność podstawiania zmiennych</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (wymagane, gdy parametr <code>on</code> ma wartość <code>click</code>)</td>
      <td data-th="Description">Selektor CSS używany do precyzowania elementów, które mają być monitorowane. Użyj wartości <code>*</code>, aby monitorować wszystkie elementy. Ta konfiguracja jest używana w połączeniu z wyzwalaczem <code>click</code>. Dowiedz się, jak używać selektora do <a href="/pl/docs/guides/analytics/use_cases.html#monitorowanie-kliknięć-na-stronie">monitorowania kliknięć na stronie</a> oraz <a href="/pl/docs/guides/analytics/use_cases.html#monitorowanie-interakcji-społecznościowych">interakcji społecznościowych</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (wymagane, gdy parametr <code>on</code> ma wartość <code>scroll</code>)</td>
      <td data-th="Description">Steruje okolicznościami wyzwolenia zdarzenia <code>scroll</code> podczas przewijania strony. Ten obiekt może zawierać właściwości <code>verticalBoundaries</code> i <code>horizontalBoundaries</code>. Co najmniej jedna z nich jest wymagana do wyzwolenia zdarzenia <code>scroll</code>. Wartości obydwu właściwości powinny być tablicami liczb zawierającymi granice, po przekroczeniu których generowane jest zdarzenie przewijania. Zobacz przykład dotyczący <a href="/pl/docs/guides/analytics/use_cases.html#monitorowanie-przewijania">monitorowania przewijania</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (wymagane, gdy parametr <code>on</code> ma wartość <code>timer</code>)</td>
      <td data-th="Description">Steruje momentem wyzwolenia zdarzenia <code>timer</code>. Licznik czasu zostanie wyzwolony natychmiast, a następnie będzie wyzwalany z określonym interwałem. Ta konfiguracja jest używana w połączeniu z wyzwalaczem <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Ważne:** Wyzwalacze z konfiguracji o niższym priorytecie są przesłaniane
przez wyzwalacze o tych samych nazwach z konfiguracji o wyższym priorytecie
(zobacz [Kolejność podstawiania zmiennych](/pl/docs/guides/analytics/deep_dive_analytics.html#kolejność-podstawiania-zmiennych)).

### Sposób wysyłania danych: atrybut transport

Atrybut `transport` określa sposób wysłania żądania.
Domyślnie są włączone trzy następujące metody:

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
      <td data-th="Description">Wskazuje możliwość użycia metody <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> do transmisji żądania. Spowoduje to wysłanie żądania <code>POST</code> z danymi logowania i pustą treścią.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Wskazuje możliwość użycia żądania <code>XMLHttpRequest</code> do transmisji żądania. Spowoduje to wysłanie żądania <code>POST</code> z danymi logowania i pustą treścią.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Wskazuje możliwość wysłania żądania przez wygenerowanie znacznika <code>Image</code>. Spowoduje to wysłanie żądania <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Używana jest tylko jedna metoda transportu:
ta z najwyższym priorytetem
, która jest włączona, dozwolona i dostępna.
Priorytet jest następujący `beacon` > `xhrpost` > `image`.
Jeśli agent użytkownika klienta nie obsługuje metody,
używana jest następna włączona metoda o najwyższym priorytecie.

Atrybut `transport` należy dołączać do swojej konfiguracji
tylko wtedy, gdy chce się ograniczyć opcje transportu,
w przeciwnym razie można zatrzymać żądania.

W przykładzie powyżej
metody `beacon` i `xhrpost` mają wartość false,
więc nie będą używane, pomimo że mają wyższy priorytet niż metoda `image`.
Jeśli agent użytkownika klienta obsługuje metodę `image`,
zostanie ona użyta. W przeciwnym razie żadne żądanie nie zostanie wysłane.

[sourcecode:html]
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
[/sourcecode]

## Kolejność podstawiania zmiennych

AMP podstawia wartości za zmienne w następującej kolejności:

1. Konfiguracje zdalne (atrybut `config`).
2. Deklaracje `vars` zagnieżdżone wewnątrz wyzwalacza w atrybucie `triggers`.
3. Deklaracje `vars` na najwyższym poziomie zagnieżdżone w elemencie `amp-analytics`.
4. Wartości podane przez platformę.

W tym przykładzie występuje konfiguracja zdalna,
zmienne zdefiniowane na najwyższym poziomie, w wyzwalaczach i na poziomie platformy:

[sourcecode:html]
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
[/sourcecode]

Gdy ten sam element `var` jest zdefiniowany w wielu miejscach,
pierwszeństwo zmiennych powoduje, że jego wartość jest ustawiana tylko raz.
Oznacza to, że jeśli w konfiguracji zdalnej element `account` zdefiniowano jako UA-XXXXX-Y w przykładzie powyżej,
wartości różnych elementów var będą następujące:

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
      <td data-th="Defined By">Platforma</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Wyzwalacz</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Konfiguracja zdalna</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Wyzwalacz</td>
    </tr>
  </tbody>
</table>
