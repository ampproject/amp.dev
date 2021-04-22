---
'$title': Zarządzanie stanem użytkownika nieuwierzytelnionego za pomocą AMP
$order: 2
formats:
  - websites
teaser:
  text: '**Spis treści**'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

**Spis treści**

- [Informacje ogólne](#background)
- [Przewodnik po implementacji](#implementation-guide)
  - [Przed rozpoczęciem](#before-getting-started)
  - [Zadanie 1: dla stron bez AMP w źródle wydawcy ustaw identyfikator i wyślij analityczne pakiety ping](#task1)
  - [Zadanie 2: dla stron AMP ustaw identyfikator i wysyłaj analityczne pakiety ping, dodając zastępczy identyfikator klienta w pakietach ping składnika amp-analytics](#task2)
  - [Zadanie 3: przetwórz analityczne pakiety ping ze stron w źródle wydawcy](#task3)
  - [Zadanie 4: przetwórz analityczne pakiety ping z serwera buforującego AMP lub kontekstów wyświetlania przeglądarki AMP i określ mapowanie identyfikatorów (w razie potrzeby)](#task4)
  - [Zadanie 5: stosowanie identyfikatora klienta podczas tworzenia linków i przesyłania formularza](#task5)
- [Zdecydowanie zalecane praktyki](#strongly-recommended-practices)

Stan użytkownika jest ważną koncepcją w dzisiejszej sieci. Weź pod uwagę następujące przypadki użycia, które umożliwia zarządzanie stanem użytkownika:

- Sprzedawca tworzy użyteczny **koszyk na zakupy**, który podczas drugiej wizyty pokazuje użytkownikowi przedmioty dodane przezeń do koszyka wiele tygodni temu. Takie postępowanie zwiększa prawdopodobieństwo, że użytkownik kupi owe przedmioty dzięki przypomnieniu, że rozważał ich zakup w przeszłości.
- Wydawca wiadomości, który może dostosować **artykuły polecane czytelnikowi** na podstawie wielokrotnych wizyt czytelnika w artykułach wydawcy — ułatwia to utrzymanie zaangażowania czytelnika i zachęca do odkrywania dalszych treści.
- Twórca witryny internetowej zbierającej **dane analityczne**, który może stwierdzić, czy dwie odsłony należą do tej samej osoby, która widziała dwie strony, czy też do dwóch różnych osób, z których każda widziała jedną stronę. Takie informacje pozwalają zrozumieć jak dobrze strona spełnia swoje zadanie i co w razie potrzeby poprawić.

Ten artykuł ma pomóc Ci odnieść większy sukces w **zarządzaniu stanem użytkownika nieuwierzytelnionego w AMP**, które stanowi sposób zapewnienia bezproblemowej obsługi użytkownika, nawet jeśli użytkownik nie podjął działania w celu podanie swojej tożsamości, takiego jak zalogowanie się. Po zapoznaniu się z niektórymi wyzwaniami i kwestiami dotyczącymi podejścia do tego tematu, niniejszy przewodnik przedstawia sposoby obsługi stanu użytkownika przez AMP oraz zalecenia dotyczące podejścia do implementacji technicznej.

## Informacje ogólne <a name="background"></a>

Temat stanu użytkownika zasługuje na szczególną uwagę w AMP, ponieważ strony AMP mogą być wyświetlane w wielu kontekstach, takich jak witryna internetowa, wyszukiwarka Google lub aplikacja strony trzeciej. Wprowadza to wyzwania w zarządzaniu stanem użytkownika, gdy użytkownicy przemieszczają się między kontekstami.

### Konteksty wyświetlania stron AMP <a name="display-contexts-for-amp-pages"></a>

Można myśleć o AMP jako o przenośnym formacie zawartości, który umożliwia jej szybkie ładowanie w dowolnym miejscu. Dokumenty AMP można wyświetlać w trzech kontekstach:

- Źródło wydawcy
- Serwer buforujący AMP
- Przeglądarka AMP

<table>
  <tr>
    <th width="20%">Kontekst</th>
    <th width="20%">Czy można stąd serwować strony bez AMP?</th>
    <th width="20%">Czy można stąd serwować strony AMP?</th>
    <th>Przykład adresu URL</th>
  </tr>
  <tr>
    <td>Źródło wydawcy</td>
    <td>Tak</td>
    <td>Tak</td>
    <td><code>https://example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Serwer buforujący AMP</td>
    <td>Nie</td>
    <td>Tak</td>
    <td><code>https://example-com.cdn.ampproject.org/s/example.com/article.amp.html</code></td>
  </tr>
   <tr>
    <td>Przeglądarka AMP</td>
    <td>Nie</td>
    <td>Tak</td>
    <td><code>https://google.com/amp/s/example.com/article.amp.html</code></td>
  </tr>
</table>

Przyjrzyjmy się bliżej każdej z tych sytuacji.

**Kontekst nr 1: źródło wydawcy.** Strony AMP są rozmieszczone w taki sposób, że są one pierwotnie przechowywane i dostępne w witrynie wydawcy, np. w witrynie `https://example.com` moze znajdować się strona `https://example.com/article.amp.html`.

Wydawcy mogą zdecydować się na publikację wyłącznie w formacie AMP albo na publikację dwóch wersji treści (czyli treści AMP „sparowanych” z treściami bez AMP). Model „sparowany” wymaga pewnych [szczególnych kroków](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery) w celu zapewnienia, że wersje AMP stron są wykrywalne dla wyszukiwarek, portali społecznościowych i innych platform. Oba podejścia do publikowania są w pełni obsługiwane; do wydawcy należy decyzja, które podejście wybrać.

> **UWAGA:**
> Ze względu na właśnie opisany „parowany” model wydawniczy źródło wydawcy (w powyższym przykładzie `https://example.com`) jest kontekstem, w którym można uzyskać dostęp do **zarówno do treści AMP, jak i bez AMP**. W rzeczywistości jest to jedyny kontekst, w którym może się to zdarzyć, ponieważ serwery buforujące AMP i przeglądarki AMP opisane poniżej dostarczają tylko prawidłową zawartość AMP.

**Kontekst nr 2: serwer buforujący AMP.** Pliki AMP mogą być buforowane w chmurze przez serwer buforujący strony trzeciej w celu skrócenia czasu dotarcia treści na urządzenie mobilne użytkownika.

Korzystając z formatu AMP, producenci treści udostępniają je w plikach AMP do buforowania przez strony trzecie. W przypadku frameworku tego typu wydawcy nadal kontrolują swoje treści (publikując je w ich źródle, co opisano powyżej), ale platformy mogą buforować lub dublować treści w celu zapewnienia optymalnej szybkości dostarczania ich użytkownikom.

Treści serwowane w ten sposób tradycyjnie pochodzą z innej domeny. Usługa [Google AMP Cache](https://developers.google.com/amp/cache/overview) na przykład do dostarczania treści używa domeny `https://cdn.ampproject.org`, np. `https://example-com.cdn.ampproject.org/s/example.com/article.amp.html`.

**Kontekst nr 3: przeglądarka AMP.** Format AMP jest zbudowany do obsługi osadzania w przeglądarkach AMP stron trzecich. Umożliwia to wysoki stopień współpracy między plikiem AMP a użytkownikiem, co zapewnia korzyści takie jak: inteligentne i bezpieczne wstępne ładowanie i wstępne renderowanie zawartości oraz nowatorskie rozwiązania, takie jak przechodzenie przeciąganiem między całymi stronami AMP.

Podobnie jak w przypadku serwera buforującego AMP, domena przeglądarki AMP również będzie inna niż źródło wydawcy. Host przeglądarki wyszukiwarki Google na przykład ma domenę `https://google.com` i osadza element iframe, który żąda zawartości wydawcy z usługi Google AMP Cache.

### Wiele kontekstów wymaga zarządzania wieloma stanami <a name="multiple-contexts-means-multiple-state-management"></a>

Wydawcy muszą być przygotowani do zarządzania stanem użytkownika oddzielnie w każdym kontekście wyświetlania. Funkcja AMP [Client ID](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#client-id), która do podtrzymania stanu wykorzystuje pliki cookie lub magazyn lokalny, zapewnia niezbędną obsługę stron AMP, aby mieć stabilny i pseudonimiczny identyfikator użytkownika. Z punktu widzenia implementacji wykorzystywane są albo pliki cookie, albo magazyn lokalny, a AMP podejmuje decyzję, którego z nich użyć w zależności od kontekstu wyświetlania. Na ten wybór ma wpływ techniczna możliwość zarządzania tym stanem, skalowana do setek lub tysięcy wydawców.

Wydawcy stron AMP mogą jednak łatwo skończyć (nieświadomie), projektując obsługę użytkowników, wymagającą wielu kontekstów. Powróćmy do naszego wcześniej opisanego przykładu koszyka zakupów i dodajmy więcej szczegółów, aby tworzyć pełną **historię użytkownika**:

> _W dniu 1 użytkownik znajduje stronę AMP firmy Example Inc. za pomocą wyszukiwarki Google. Wyszukiwarka Google ładuje strony AMP w przeglądarce AMP. Podczas przeglądania strony użytkownik dodaje cztery pozycje do koszyka, ale nie przechodzi do kasy. Dwa tygodnie później, w dniu 15, użytkownik przypomina sobie cztery przedmioty, których zakup rozważał i decyduje, że przyszedł czas na ich kupienie. Uzyskuje dostęp do strony głównej Example Inc. pod adresem `https://example.com` bezpośrednio (jest to strona główna bez AMP) i stwierdza, że owe cztery przedmioty są nadal zapisane w koszyku._

W tym scenariuszu użytkownik otrzymuje spójną obsługę koszyka, mimo że przeszedł z kontekstu przeglądarki AMP do kontekstu źródła wydawcy — a między tymi zdarzeniami upływa pewien czas. Taki sposób obsługi jest bardzo rozsądny i jeśli projektujesz obsługę zakupów, chcesz go zastosować, jak więc to zrobić?

**Aby umożliwić tę i każdą inną obsługę zależną od stanu użytkownika, wszystkie konteksty, przez które przechodzą użytkownicy, muszą udostępniać sobie nawzajem swój indywidualnie utrzymywany stan.**. Powiesz „Doskonale!”, mając na myśli pomysł udostępniania wartości plików cookie z identyfikatorami użytkowników ponad tymi granicami kontekstowymi. Jest pewien drobiazg: mimo że każdy z tych kontekstów wyświetla treści kontrolowane przez tego samego wydawcę, każdy z nich postrzega drugi kontekst jako stronę trzecią, ponieważ każdy z kontekstów znajduje się w innej domenie.

<amp-img alt="AMP's ability to be displayed in many contexts means that each of those contexts has its own storage for identifiers" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png" width="1030" height="868">
  <noscript><img alt="Łącza mogą służyć do przekazywania informacji identyfikujących jeden kontekst do innego (połączonego) kontekstu" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png"></noscript></amp-img>

Jak zobaczysz w poniższym omówieniu, działanie z pozycji strony trzeciej podczas interakcji z plikami cookie może stanowić wyzwanie, w zależności od tego, jak skonfigurowane są ustawienia przeglądarki użytkownika. W szczególności, jeśli pliki cookie stron trzecich zostaną zablokowane w określonej sytuacji, uniemożliwi to udostępnianie informacji między różnymi kontekstami. Z drugiej strony, jeśli operacje z plikami cookie stron trzecich są dozwolone, informacje można udostępniać.

## Przewodnik po implementacji <a name="implementation-guide"></a>

Ta sekcja zawiera zalecenia dotyczące zarządzania stanem użytkownika. Poniższe zadania przedstawione są jako progresja, ale w większości można je obejrzeć w dwóch fragmentach:

**Fragment nr 1: implementacja podstawowa:** zadania 1–4 są niezbędne, aby podstawy zaczęły działać. Polegają one na minimalnym zestawie funkcji potrzebnych do częściowego wykonania pracy: zastąpienia identyfikatora klienta AMP, odczytu i zapisania plików cookie oraz utrzymania tablicy mapowania zaplecza. Dlaczego „częściowego”? Jako że kroki przestawione w tych zadaniach polegają na odczycie i zapisie plików cookie, a ustawienia obsługi plików cookie w przeglądarce mogą to w pewnych okolicznościach uniemożliwić, ten zestaw zadań prawdopodobnie nie będzie wystarczający do pełnego zarządzania stanem użytkownika we wszystkich scenariuszach.

Po ułożeniu fundamentów odwiedzimy temat o węższym zakresie zastosowań, ale oferujący kompletne rozwiązanie dla tych przypadków użycia.

**Fragment nr 2: użycie Client ID w tworzeniu linków i przesyłaniu formularza:** w zadaniu 5 poznasz korzyści płynące z przechodzenia linków i/lub przesyłania formularza w celu przekazania informacji o identyfikatorze klienta AMP przez granice kontekstów, gdy użytkownik przechodzi z jednej strony bezpośrednio do drugiej.

> **PRZESTROGA:**
> Poniższy przewodnik po implementacji zaleca stosowanie plików cookie i pracę z nimi. Należy zapoznać się z sekcją [Zdecydowanie zalecane praktyki](#strongly-recommended-practices), zawierającą istotne sugestie, które należy wziąć pod uwagę.

### Przed rozpoczęciem <a name="before-getting-started"></a>

Przechodząc przez poniższe wskazówki techniczne, załóżmy, że będziesz wiązać **stan użytkownika** ze stabilnym **identyfikatorem**, reprezentującym użytkownika. Identyfikator może wyglądać na przykład tak: `n34ic982n2386n30`. Po stronie serwera należy wówczas powiązać identyfikator `n34ic982n2386n30` z dowolnym zestawem informacji o stanie użytkownika, takim jak zawartość koszyka, lista wcześniej przeczytanych artykułów lub inne dane zależne od przypadku użycia.

<amp-img alt="A single identifier could be used to manage user state for many use cases" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png" width="1276" height="376">
  <noscript><img alt="Przykład tego, jak identyfikator w kontekście przeglądarki AMP można przekazać za pośrednictwem linku do kontekstu źródła wydawcy" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png"></noscript></amp-img>

Dla przejrzystości w pozostałej części tego dokumentu będziemy nazywać różne ciągi znaków, będące identyfikatorami, stosując bardziej zrozumiałe nazwy poprzedzone znakiem dolara (`$`):

[sourcecode:text]
n34ic982n2386n30 ⇒ $sample_id
[/sourcecode]

**Nasz przypadek użycia:** w całym tym przewodniku będziemy pracować nad przykładem zaprojektowanym w celu uzyskania prostego śledzenia odsłon (tj. analityki), w którym chcemy uzyskać jak najdokładniejsze zliczanie użytkowników. To znaczy, że nawet jeśli użytkownik uzyskuje dostęp do treści danego wydawcy z różnych kontekstów (w tym przechodząc między stronami AMP i bez AMP), chcemy, aby te wizyty były zliczane w taki sam sposób, jakby użytkownik przeglądał tylko tradycyjne strony (bez AMP) tego wydawcy.

**Założenie o dostępności stabilnych wartości plików cookie:** zakładamy również, że użytkownik korzysta z tego samego urządzenia, przeglądarki i przeglądania nieprywatnego / nie incognito, aby zapewnić, że wartości plików cookie są zachowane i dostępne przez cały czas trwania sesji użytkownika. Jeśli tak nie jest, nie należy oczekiwać, że te techniki zadziałają. Jeśli jest to wymagane, należy dążyć do zarządzania stanem użytkownika na podstawie jego uwierzytelnionej (tj. zalogowanej) tożsamości.

**Koncepcje przedstawione poniżej można rozciągnąć na inne przypadki użycia:** chociaż koncentrujemy się tylko na przypadku użycia analitycznego, przedstawione poniżej koncepcje mogą zostać przerobione na inne przypadki użycia, wymagające zarządzania stanem użytkownika w różnych kontekstach.

<a id="task1"></a>

### Zadanie 1: dla stron bez AMP w źródle wydawcy ustaw identyfikator i wyślij analityczne pakiety ping <a name="task-1-for-non-amp-pages-on-the-publisher-origin-set-up-an-identifier-and-send-analytics-pings"></a>

Zacznijmy od konfiguracji analityki dla stron bez AMP serwowanych z pominięciem źródła wydawcy. Można to osiągnąć na wiele sposobów, w tym za pomocą pakietu analitycznego, takiego jak Google Analytics lub Adobe Analytics, lub poprzez napisanie własnej implementacji.

Jeśli używasz pakietu analitycznego od dostawcy, prawdopodobnie pakiet ten zajmuje się zarówno konfigurowaniem plików cookie, jak i przesyłaniem pakietów ping za pomocą swojego kodu konfiguracyjnego i interfejsu API. Jeśli tak jest, przeczytaj poniższe kroki, aby upewnić się, że są one zgodne z Twoim podejściem analitycznym, ale oczekuj, że nie trzeba będzie wprowadzać żadnych zmian w ramach wykonywania tego zadania.

Pozostała część tego zadania oferuje wskazówki przydatne, jeśli chcesz skonfigurować własną analitykę.

##### Konfigurowanie identyfikatora za pomocą plików cookie strony pierwszej <a name="set-up-an-identifier-using-first-party-cookies"></a>

Jeśli masz strony bez AMP, serwowane z Twojego źródła wydawcy, ustaw stały i stabilny identyfikator, który będzie używany na tych stronach. Zazwyczaj jest on [implementowany za pomocą plików cookie strony pierwszej](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking)[.](https://en.wikipedia.org/wiki/HTTP_cookie#Tracking)

Na potrzeby naszego przykładu powiedzmy, że ustawisz plik cookie o nazwie `uid` (jak „użytkownika identyfikator”), który będzie tworzony podczas pierwszej wizyty użytkownika. Jeśli nie jest to pierwsza wizyta użytkownika, należy odczytać wartość, która została wcześniej ustawiona podczas pierwszej wizyty.

To znaczy, że są dwa przypadki stanu stron bez AMP w źródle wydawcy:

**Przypadek nr 1: pierwsze odwiedziny.** Przy pierwszym wylądowaniu na stronie bez AMP nie ma żadnego pliku cookie. Jeśli obecność pliku cookie sprawdzona została przed jego ustawieniem, w pliku cookie odpowiadającym `uid` nie zobaczysz żadnych ustawionych wartości:

[sourcecode:bash]

> document.cookie
> ""
> [/sourcecode]

Plik cookie należy ustawiać w trakcie pierwszego ładowania strony, aby po załadowaniu strony widać było, że wartość została ustawiona:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

**Przypadek nr 2: drugie i następne odwiedziny.** Plik cookie będzie ustawiony. Jeśli więc otworzysz konsolę programistyczną na stronie, zobaczysz:

[sourcecode:bash]

> document.cookie
> "uid=$publisher_origin_identifier"
> [/sourcecode]

##### Wysyłanie analitycznych pakietów ping <a name="send-analytics-pings"></a>

Po ustawieniu identyfikatora można go dołączać do analitycznych pakietów ping, aby rozpocząć śledzenie odsłon.

Konkretna implementacja będzie zależeć od żądanej konfiguracji, ale zazwyczaj należy wysyłać do serwera usług analityki pakiety ping (żądania), które zawierają przydatne dane w adresie URL samego żądania. Oto przykład, który również wskazuje, w jaki sposób umieścić wartość pliku cookie w żądaniu:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier
[/sourcecode]

Należy pamiętać, że w powyższym przykładzie identyfikator użytkownika jest wskazywany przez oddzielny parametr zapytania, `user_id`:

[sourcecode:text]
user_id=$publisher_origin_identifier
[/sourcecode]

Użycie tutaj parametru „`user_id`” powinno być określone na podstawie tego, czego oczekuje serwer usług analityki i nie należy go specjalnie wiązać z tym, co nazywasz plikiem cookie przechowującym identyfikator lokalnie.

<a id="task2"></a>

### Zadanie 2: dla stron AMP ustaw identyfikator i wysyłaj analityczne pakiety ping, dodając zastępczy identyfikator klienta w pakietach ping składnika amp-analytics <a name="task-2-for-amp-pages-set-up-an-identifier-and-send-analytics-pings-by-including-client-id-replacement-in-amp-analytics-pings"></a>

Przechodząc teraz do stron AMP, przyjrzyjmy się jak można ustalić i przesłać identyfikator do usługi analityki. Będzie to miało zastosowanie niezależnie od kontekstu, w jakim strona AMP jest prezentowana, a więc dotyczy to każdej strony AMP ze źródła wydawcy, serwowanej przez serwer buforujący AMP lub wyświetlanej w przeglądarce AMP.

Dzięki wykorzystaniu funkcji, które wymagają Client ID, AMP wykona pracę „pod maską”, aby wygenerować i zapisać wartości identyfikatorów klientów i skierować je do funkcji, które ich wymagają. Jedną z głównych funkcji, które mogą korzystać z Client ID strony AMP, jest składnik [amp-analytics](https://amp.dev/documentation/components/amp-analytics), który jest dokładnie tym, czego będziemy potrzebować, aby zaimplementować nasz przykład użycia analityki.

Na stronach AMP skonstruuj pakiet ping składnika amp-analytics, zawierający Client ID:

<table>
  <tr>
    <td width="40%"><strong>Przykładowa konfiguracja amp-analytics:</strong></td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=${clientId(uid)}</code></td>
  </tr>
  <tr>
    <td><strong>To, co idzie przez sieć:</strong></td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id</code><p><em>W tym przypadku <code>${clientId(uid)}</code> jest zastępowany rzeczywistą wartością, którą AMP albo wygeneruje w tym momencie albo zostanie zwrócona na podstawie danych zapisanych już lokalnie przez przeglądarkę użytkownika.</em></p>
</td>
  </tr>
</table>

Należy zwrócić uwagę na fakt, że parametr przekazywany do podstawienia identyfikatora klienta, `${clientId(uid)`, to `uid`. Był to świadomy wybór, który dopasowuje nazwę pliku cookie użytego w źródle jak opisano w [Zadaniu 1](#task1). Aby zapewnić bezproblemową integrację, należy zastosować tę samą technikę.

Jeśli chodzi o resztę implementacji składnika amp-analytics, zapoznaj się z dokumentacją [konfiguracji składnika amp-analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/), aby dowiedzieć się więcej o tym, jak skonfigurować żądania amp-analytics lub zmodyfikować te od dostawcy usług analityki. Pakiet ping można dodatkowo modyfikować w celu transportowania dodatkowych danych, które można zdefiniować bezpośrednio lub skorzystać z innych [podstawień AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md).

> **Warto wiedzieć:**
> Dlaczego użyliśmy nazwy `uid` dla parametru przekazywanego do funkcji Client ID? Parametr, który przyjmuje podstawienie `clientId(...)` służy do określenia zakresu. Właściwie można używać funkcji Client ID w wielu przypadkach użycia i w rezultacie generować wiele identyfikatorów klienta. Parametr rozróżnia te przypadki użycia i dlatego używasz go do określenia przypadku użycia, do którego potrzebujesz identyfikatora klienta. Możesz na przykład wysyłać różne identyfikatory do stron trzecich, takich jak reklamodawcy i używać parametru „scope”, aby to osiągnąć.

Jeśli chodzi o źródło wydawcy, najłatwiej jest myśleć o parametrze „scope” jako o tym, co nazywasz plikiem cookie. Zalecając wartość `uid` dla parametru Client ID w [Zadaniu 2](#task2), dostosowujemy się do wyboru użycia pliku cookie o nazwie `uid` w [Zadaniu 1](#task1).

<a id="task3"></a>

### Zadanie 3: przetwórz analityczne pakiety ping ze stron w źródle wydawcy <a name="task-3-process-analytics-pings-from-pages-on-the-publisher-origin"></a>

Ze względu na konfigurację wykonaną w zadaniach 1 i 2, gdy ktoś uzyska dostęp do wersji AMP (z dowolnego kontekstu) lub wersji bez AMP ze źródła wydawcy, analityczny pakiet ping będzie używać tego samego identyfikatora. Postępując zgodnie z instrukcją w [Zadaniu 2](#task2), aby wybrać Client ID „scope” taki sam, jak nazwa pliku cookie użytego w [Zadaniu 1](#task1), AMP ponownie użyje tego samego pliku cookie.

Ilustruje to poniższa tabela:

<table>
  <tr>
    <td width="40%">Analityczny pakiet ping pochodzący ze strony <strong>bez AMP w źródle wydawcy</strong> wygląda jak</td>
    <td width="60%"><code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code></td>
  </tr>
  <tr>
    <td>Analityczny pakiet ping pochodzący ze strony <strong>AMP w źródle wydawcy</strong> wygląda jak</td>
    <td>
<code>https://analytics.example.com/ping?type=pageview&user_id=$publisher_origin_identifier</code><br><em>W tym przypadku jest taki sam! Wybierając wartość zakresu <code>uid</code> wykorzystuje się wartość bazową pliku cookie <code>uid</code>, którą jest <code>$publisher_origin_identifier</code>.</em>
</td>
  </tr>
</table>

<a id="task4"></a>

### Zadanie 4: przetwórz analityczne pakiety ping z serwera buforującego AMP lub kontekstów wyświetlania przeglądarki AMP i określ mapowanie identyfikatorów (w razie potrzeby) <a name="task-4-process-analytics-pings-from-amp-cache-or-amp-viewer-display-contexts-and-establish-identifier-mappings-if-needed"></a>

Gdy ustawiliśmy analityczny pakiet ping w [Zadaniu 2](#task2) w celu przesyłania danych ze stron AMP wyświetlanych na serwerze buforującym AMP lub w przeglądarce AMP, stworzyliśmy również problem. Jak wspomniano wcześniej, konteksty serwera buforującego AMP i przeglądarki AMP różnią się od kontekstu źródła wydawcy, a wraz z tym przychodzi inny sposób utrzymywania identyfikatorów. Aby przetworzyć te pakiety ping w celu uniknięcia problemów takich, jak zliczanie nadmiernej liczby użytkowników, wykonamy kilka [kroków](#implementation-steps), aby spróbować jak najczęściej uzgadniać identyfikatory.

Aby pomóc w wyjaśnieniu kroków, które podejmujemy, warto najpierw dokładnie przemyśleć, jak powstaje problem ze zliczaniem nadmiernej liczby użytkowników.

#### Analiza problemu <a name="reviewing-the-problem"></a>

Rozważmy następujący przepływ:

1. Użytkownik odwiedza **stronę AMP w kontekście wyświetlania przeglądarki AMP**, np. `https://google.com/amp/s/example.com/article.amp.html`. Jako że przeglądarka AMP nie ma dostępu do pliku cookie `uid` w źródle wydawcy, w celu identyfikacji użytkownika generowana jest losowa wartość `$amp_client_id`.
2. Ten sam użytkownik odwiedza następnie **stronę w źródle wydawcy`https://example.com`**. Jak opisano w [Zadaniu 3](#task3), użytkownik jest identyfikowany za pomocą wartości `$publisher_origin_identifier`.

Tutaj (1) i (2) zdarzają się w różnych źródłach (lub kontekstach). Z tego powodu nie ma wspólnego stanu i wartość `$amp_client_id` różni się od wartości `$publisher_origin_identifier`. Jaki to ma wpływ? (1) jest to sesja jednej odsłony strony, wyglądająca jak jeden użytkownik, a (2) to inna sesja jednej odsłony strony, która wygląda jakby pochodziła od innego użytkownika. **Zasadniczo, mimo że użytkownik pozostawał zaangażowany w treść strony `https://example.com`, zliczamy zbyt wielu użytkowników, a użytkownik w (1) wygląda jak odbicie (wizyta na jednej stronie).**

#### Strategia rozwiązania <a name="solution-strategy"></a>

Aby rozwiązać problem zliczania nadmiernej liczby użytkowników, należy zastosować następującą strategię, której skuteczność zależy od tego, czy dozwolony jest odczyt, czy zapis plików cookie stron trzecich:

- **Natychmiastowe uzgodnienie identyfikatora: jeśli można uzyskać dostęp do plików cookie w źródle wydawcy lub je zmieniać**, użyj lub utwórz identyfikator źródła wydawcy i zignoruj każdy identyfikator w żądaniu usługi analityki. Będziesz w stanie z powodzeniem powiązać działania między tymi dwoma kontekstami.
- **Opóźnione uzgodnienie identyfikatora: jeśli nie można uzyskać dostępu lub zmienić identyfikatora w źródle wydawcy (tj. plików cookie)**, wówczas należy wrócić do identyfikatora klienta AMP, który znajduje się w samym żądaniu usługi analityki. Użyj tego identyfikatora jako „**aliasu**”, zamiast używać lub tworzyć nowy identyfikator źródła wydawcy (plik cookie), czego nie możesz zrobić (z powodu blokowania plików cookie stron trzecich), a następnie dodaj alias do **tabeli mapowania **. Natychmiastowe powiązanie działań między tymi dwoma kontekstami nie powiedzie się, ale za pomocą tabeli mapowania można powiązać wartość AMP Client ID z identyfikatorem źródła wydawcy przy następnych odwiedzinach użytkownika. Gdy to nastąpi, będziesz mieć potrzebne informacje, aby powiązać działania i uzgodnić odwiedziny strony w różnych kontekstach pochodzące od tego samego użytkownika. Zadanie 5 opisuje, jak osiągnąć kompletne rozwiązanie w konkretnych scenariuszach, w których użytkownik przechodzi od razu z jednej strony do drugiej.

#### Kroki implementacji <a name="implementation-steps"></a>

Na serwerze sprawdź, czy istnieje identyfikator źródła wydawcy

Odczytaj pliki cookie przesłane w ramach żądania usługi analityki. W naszym przykładzie będzie to sprawdzenie obecności pliku cookie `uid` z domeny example.com.

- Jeżeli wartość `uid` zostanie odczytana, należy jej użyć do rejestrowania danych analitycznych (**identyfikatora rekordu analityki**). Z [Zadania 1](#task1) wiemy, że wartość tego identyfikatora to `$publisher_origin_identifier`. Po ustaleniu identyfikatora rekordu analityki możemy przejść do sekcji [Przechowywanie danych](#data-storage).
- Jeśli wartość `uid` nie zostanie odczytana, należy wykonać poniższe kroki, wymagające tabeli mapowania.

##### Tabela mapowania <a name="mapping-table"></a>

W naszej tabeli mapowania wartości AMP Client ID, które są widoczne w analitycznych pakietach ping, są powiązane z identyfikatorami źródła wydawcy w następujący sposób:

<table>
  <tr>
    <th width="50%"><strong>Identyfikator użytkownika w źródle wydawcy</strong></th>
    <th width="50%"><strong>Identyfikator użytkownika na stronie AMP, która NIE znajduje się w źródle wydawcy („alias”)</strong></th>
  </tr>
  <tr>
    <td>Pochodzi z identyfikatora źródła wydawcy lub jest generowany jako wartość potencjalna, jeśli nie można uzyskać dostępu do identyfikatora źródła wydawcy.</td>
    <td>Pochodzi z Client ID AMP</td>
  </tr>
</table>

Natychmiast po stwierdzeniu, że nie udało się odczytać identyfikatora źródła wydawcy należy sprawdzić, czy Client ID AMP zawarty w analitycznym pakiecie ping jest już użyty w mapowaniu. W tym celu należy najpierw skonsultować się z przychodzącym żądaniem składnika amp-analytics, aby uzyskać wartość Client ID. Na przykład na podstawie tego żądania:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&user_id=$amp_client_id
[/sourcecode]

wyodrębniamy pogrubioną część odpowiadającą Client ID AMP: `$amp_client_id`.

Następnie sprawdź tabelę mapowania, aby spróbować znaleźć tę samą wartość w kolumnie „alias”:

<table>
  <tr>
    <th width="50%"><strong>Identyfikator użytkownika w źródle wydawcy</strong></th>
    <th width="50%"><strong>Identyfikator użytkownika na stronie AMP, która NIE znajduje się w źródle wydawcy („alias”)</strong></th>
  </tr>
  <tr>
    <td><code>$existing_publisher_origin_identifier</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

W powyższym przykładzie znajdujemy rekord, który już istnieje. Znaleziona wartość sparowana z Client ID AMP staje się identyfikatorem rekordu analitycznego. Tutaj jest to `$existing_publisher_origin_identifier`. Po ustaleniu identyfikatora rekordu analitycznego możemy przejść do sekcji [Przechowywanie danych ](#data-storage).

W przeciwnym razie, jeśli identyfikator klienta AMP nie znajduje się w mapowaniu, musimy utworzyć mapowanie:

1. Wygeneruj **potencjalny identyfikator źródła wydawcy**. Nazwijmy go `$prospective_identifier` w poniższych przykładach. Wartość tę należy utworzyć zgodnie z ustawieniem wartości w źródle wydawcy, opisanym w [Zadaniu 1](#task1) powyżej.
2. Następnie spróbuj [ustawić](https://en.wikipedia.org/wiki/HTTP_cookie#Setting_a_cookie) potencjalny identyfikator źródła wydawcy jako plik cookie w źródle wydawcy. Powiedzie się to, jeśli można zapisywać pliki cookie stron trzecich, w przeciwnym razie nie powiedzie się.
3. Następnie zapisz parę {potencjalny identyfikator źródła wydawcy, Client ID AMP}.

Utworzone mapowanie wygląda tak:

<table>
  <tr>
    <th><strong>Identyfikator użytkownika w źródle wydawcy</strong></th>
    <th><strong>Identyfikator użytkownika na stronie AMP, która NIE znajduje się w źródle wydawcy („alias”)</strong></th>
  </tr>
  <tr>
    <td> <code>$prospective_identifier</code>(generowany po otrzymaniu analitycznych pakietów ping)</td>
    <td> <code>$amp_client_id</code> (z analitycznego pakietu ping)</td>
  </tr>
</table>

Jako identyfikatora rekordu analitycznego użyjemy potencjalnego identyfikatora źródła wydawcy, ponieważ jest to wartość związana ze stanem w źródle wydawcy. W tym przypadku jest to `$prospective_identifier`, który wejdzie do gry w sekcji [Przechowywanie danych](#data-storage) poniżej.

##### Przechowywanie danych <a name="data-storage"></a>

Teraz, po ustaleniu identyfikatora rekordu analitycznego, można rzeczywiście zapisać informacje o stanie użytkownika (w tym przypadku dane analityczne), kluczowane przez ten identyfikator:

[sourcecode:text]
{analytics record identifier, analytics data ...}
[/sourcecode]

<a id="task5"></a>

### Zadanie 5: stosowanie identyfikatora klienta podczas tworzenia linków i przesyłania formularza <a name="task-5-using-client-id-in-linking-and-form-submission"></a>

Gdy odczytywanie i zapisywanie plików cookie stron trzecich jest niedozwolone, zazwyczaj wystąpią sytuacje, w których zarządzanie stanem użytkownika będzie niemożliwe do wykonania z pełną skutecznością. Kroki podjęte przez nas w zadaniach 1–4 przydają się na dwa sposoby: (1) zapewniają całkowicie skuteczne rozwiązanie w przypadku, gdy odczyt i zapis plików cookie stron trzecich jest dozwolony oraz (2) ustawiają nasz system w taki sposób, aby wykorzystać każdą ewentualną możliwość uzgodnienia identyfikatorów z różnych kontekstów, jeśli natychmiastowe uzgodnienie nie jest możliwe ze względu na ustawienia plików cookie w przeglądarce.

W tym zadaniu zajmiemy się dodatkową optymalizacją, która pozwala użytkownikowi przechodzić między kontekstami z jednej strony na drugą **za pomocą linków lub wysyłania formularzy**. W tych sytuacjach oraz dzięki opisanej poniżej implementacji możliwe jest utworzenie w pełni efektywnego schematu zarządzania stanem użytkownika w różnych kontekstach.

<amp-img alt="Links can be used to pass the identifier information of one context into another (linked) context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-form-identifier-forwarding.png" width="866" height="784">
  <noscript><img alt="Przykład tworzenia analitycznego polecenia ping, które zawiera identyfikator z poprzedniego kontekstu podany za pośrednictwem adresu URL i identyfikator z bieżącego kontekstu" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png"></noscript></amp-img>

##### Stosowanie funkcji podstawiania <a name="using-substitution-features"></a>

W naszym podejściu wykorzystamy dwa typy [podstawień zmiennych AMP](https://github.com/ampproject/amphtml/blob/main/spec/./amp-var-substitutions.md).

**Aby zaktualizować linki wychodzące w celu użycia zastępczego identyfikatora Client ID:** zdefiniuj nowy parametr zapytania, `ref_id` (identyfikator skierowania), który znajdzie się w adresie URL i wskaże **identyfikator kontekstu źródłowego** użytkownika. Ustaw ten parametr zapytania na wartość równą wartości podstawienia Client ID AMP:

[sourcecode:html]
<a
href="https://example.com/step2.html?ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Alternatywne rozwiązanie przekazywania Client ID do linków wychodzących:** zdefiniuj nowy parametr zapytania `ref_id` jako część atrybutu danych `data-amp-addparams`, a w przypadku zapytań wymagających podstawienia parametru podaj te dane jako część `data-amp-replace`. Przy takim podejściu adres URL będzie wyglądał czysto, a parametry określone w `data-amp-addparams` będą dodawane dynamicznie.

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

W razie przekazywania wielu parametrów zapytania przez `data-amp-addparams` są one rozdzielane znakami `&`

[sourcecode:html]
<a
href="https://example.com/step2.html"
data-amp-addparams="ref_id=CLIENT_ID(uid)&pageid=p123"
data-amp-replace="CLIENT_ID"

> </a>
> [/sourcecode]

**Aby zaktualizować dane wejściowe w formularzu, należy użyć podstawienia Client ID:** zdefiniuj nazwę pola wprowadzania danych, np. `orig_user_id`. Określ wartość `default-value` pola formularza, która ma być wartością podstawienia Client ID AMP:

[sourcecode:html]
<input
  name="ref_id"
  type="hidden"
  value="CLIENT_ID(uid)"
  data-amp-replace="CLIENT_ID"
/>
[/sourcecode]

Dzięki podjęciu tych kroków Client ID jest dostępny dla serwera docelowego i/lub jako parametr adresu URL na stronie, na której ląduje użytkownik po kliknięciu linku lub wysłaniu formularza (w **kontekście docelowym**). Nazwa (czyli „klucz”) będzie miała postać `ref_id`, ponieważ tak ją zdefiniowaliśmy w powyższych implementacjach i będzie miała powiązaną wartość równą wartości Client ID. Na przykład, klikając zdefiniowany powyżej link (znacznik `<a>`), użytkownik przejdzie do tego adresu URL:

[sourcecode:http]
https://example.com/step2.html?ref_id=$amp_client_id
[/sourcecode]

<amp-img alt="Example of how an identifier in an AMP viewer context can be passed via link into a publisher origin context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-1.png" width="1038" height="890">
  <noscript><img alt="Możliwość wyświetlania AMP w wielu kontekstach oznacza, że każdy z tych kontekstów ma własną pamięć na identyfikatory" src="https://github.com/ampproject/amphtml/raw/master/spec/img/contexts-with-different-storage.png"></noscript></amp-img>

Gdy użytkownik wyląduje na stronie zawierającej wartość `ref_id` w postaci parametru adresu URL lub w nagłówku, mamy możliwość wspólnego przetwarzania identyfikatora `ref_id` wraz z identyfikatorem wyeksponowanym za pomocą samej strony (czyli wartością pliku cookie). Dzięki zawarciu obu tych wartości w analitycznym pakiecie ping Twój serwer analityki może pracować z obiema wartościami jednocześnie, a wiedząc, że są one powiązane, odzwierciedlać tę zależność w Twoim zapleczu. W następnym kroku podano szczegóły wykonania.

##### Wyodrębnianie parametrów zapytania adresu URL <a name="extracting-url-query-parameters"></a>

Używając funkcji zastąpień, tworzymy przepływ nawigacyjny linków lub przepływ wysyłanych formularzy, który eksponuje informacje, w szczególności Client ID, na serwerze docelowym i/lub jako parametr adresu URL, który może być odczytany na kliencie po zakończeniu nawigacji przez użytkownika.

Jeśli informacje zostały wyeksponowane tylko na serwerze, np. za pomocą formularza POST, można przystąpić do ich przetworzenia i wyrenderowania wynikowej strony. Podczas przetwarzania takich danych należy zwrócić uwagę na kroki [walidacji parametrów](#parameter-validation) opisane poniżej.

Jeśli informacje są dostępne poprzez adres URL i chcesz je przetwarzać, możesz użyć kilku podejść:

- Przetwarzanie podczas przekierowania (obsługa po stronie serwera)
- Przetwarzanie na stronie docelowej (obsługa po stronie klienta)

**Przetwarzanie podczas przekierowania (obsługa po stronie serwera)**

Aby przetwarzać żądanie podczas przekierowania, należy obsłużyć je na serwerze i wyodrębnić odpowiednie parametry. Zwróć uwagę na kroki [walidacji parametrów](#parameter-validation) wyszczególnione poniżej. Przetwarzaj dane w połączeniu z wartościami plików cookie zawierających inne odpowiednie identyfikatory, a następnie wykonaj przekierowanie na adres URL, który nie zawiera tych parametrów.

**Przetwarzanie na stronie docelowej (obsługa po stronie klienta)**

W przypadku przetwarzania żądania na stronie docelowej podejście będzie się różnić w zależności od tego, czy strona ta jest stroną AMP, czy bez AMP.

<amp-img alt="Example of how to construct an analytics ping that contains an identifier from the previous context provided via URL and an identifier from the current context" layout="responsive" src="https://github.com/ampproject/amphtml/raw/master/spec/img/link-identifier-forwarding-example-2.png" width="1326" height="828">
  <noscript><img alt="Pojedynczy identyfikator może służyć do zarządzania stanem użytkownika w wielu przypadkach użycia" src="https://github.com/ampproject/amphtml/raw/master/spec/img/identifiers-for-use-cases.png"></noscript></amp-img>

_Aktualizacje strony AMP:_ w konfiguracji składnika amp-analytics użyj funkcji podstawiania parametru zapytania, aby uzyskać wartość identyfikatora `ref_id` w adresie URL. Funkcja parametru zapytania pobiera parametr, który wskazuje „klucz” żądanej pary klucz-wartość w adresie URL i zwraca odpowiednią wartość. Użyj funkcji Client ID, tak jak to robiliśmy, aby uzyskać identyfikator do kontekstu strony AMP.

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}
[/sourcecode]

Po przesłaniu przez sieć zostaną zastąpione rzeczywiste wartości:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$referrer_page_identifier&user_id=$current_page_identifier
[/sourcecode]

Podążając za naszymi powyższymi przykładami, otrzymamy:

[sourcecode:text]
$referrer_page_identifier is $amp_client_id
$current_page_identifier is $publisher_origin_id
[/sourcecode]

czyli faktyczny pakiet ping to:

[sourcecode:http]
https://analytics.example.com/ping?type=pageview&orig_user_id=$amp_client_id&user_id=$publisher_origin_id
[/sourcecode]

Zalecamy sprawdzanie autentyczności wartości parametrów zapytania za pomocą kroków przedstawionych w poniższej sekcji [Walidacja parametrów](#parameter-validation).

_Aktualizacje strony bez AMP page:_ podobnie, na stronie bez AMP serwowanej z Twojego źródła wydawcy wyodrębnij i przekaż wartość `ref_id` zawartą w adresie URL. Sprawdź autentyczność wartości, wykonując czynności opisane w sekcji [Walidacja parametrów](#parameter-validation) poniżej. Następnie skonstruuj analityczny pakiet ping, który będzie zawierać zarówno `orig_user_id` wyprowadzony z `ref_id` oraz `user_id`, oparty na wartości identyfikatora pliku cookie strony pierwszej.

<blockquote>
<p><strong>WAŻNE:</strong></p>
<p>Jeśli zdecydujesz się na przetwarzanie parametrów po stronie klienta na stronie docelowej, strona docelowa powinna usuwać informacje o identyfikatorze z adresów URL, gdy tylko zdoła przechwycić identyfikator.</p>
<p>Przed usunięciem parametrów należy upewnić się, że ma je też inny kod, który trzeba wykonać, aby je odczytać:</p>
<ul>
  <li>Zostanie wykonany, zanim dojdzie do usunięcia; lub</li>
  <li>Może uzyskać dostęp do miejsca, w którym zapisał dane kod, który odczytał i usunął parametry</li>
</ul>
<p>Aby zrobić to na stronie bez AMP, dołącz następujący kod JavaScript, który usunie wszystkie parametry zapytania z adresu URL:</p>
<pre>var href = location.href.replace(/\?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');<br>history.replaceState(null, null, href);</pre>
<p>Dostosuj go w razie potrzeby, aby usuwać mniej parametrów zapytania.</p>
</blockquote>

##### Przetwarzanie wielu identyfikatorów w analitycznym pakiecie ping <a name="processing-multiple-identifiers-in-an-analytics-ping"></a>

W przeciwieństwie do [Zadania 4](#task4), w którym skonfigurowaliśmy analityczny pakiet ping tak, aby zawierał tylko jedną wartość identyfikatora, po wykonaniu dotychczasowych kroków w Zadaniu 5 mamy dwa identyfikatory — `orig_user_id` i `user_id`. Dalej opiszemy, w jaki sposób przetwarzać te dwa identyfikatory, które są częścią przychodzącego analitycznego pakietu ping.

Zanim przejdziemy dalej, zwróć uwagę na kroki opisane w sekcji [Walidacja parametrów](#parameter-validation) poniżej i upewnij się, że można ufać obu wartościom wskazanym przez `orig_user_id` oraz `user_id`.

Sprawdź, czy któraś z odpowiadających im wartości jest obecna w Twojej tabeli mapowania. W naszym powyższym przykładzie pierwsza odsłona strony odbywa się na stronie AMP, która NIE znajduje się w źródle wydawcy, po czym następuje druga odsłona strony, w źródle wydawcy. W rezultacie wartości parametrów zapytania analitycznego pakietu ping będą wyglądały tak:

**Przypadek nr 1: identyfikatory w razie wysyłania analitycznych pakietów ping ze strony w źródle wydawcy**

<table>
  <tr>
    <th width="20%"></th>
    <th width="40%"><strong>Identyfikator użytkownika w źródle wydawcy</strong></th>
    <th width="40%"><strong>Identyfikator użytkownika na stronie AMP, która NIE znajduje się w źródle wydawcy („alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Jak wyrażony w analitycznym pakiecie ping</strong></td>
    <td><code>user_id=$publisher_origin_id</code></td>
    <td><code>orig_user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Klucz parametru</strong></td>
    <td><code>user_id</code></td>
    <td><code>orig_user_id</code></td>
  </tr>
  <tr>
    <td><strong>Wartość parametru</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Zauważ, że identyfikator pochodzący z pierwszej odsłony strony odpowiada prawej kolumnie, a identyfikator pochodzący z drugiej odsłony strony znajduje się w środkowej kolumnie, zgodnie z tym jak został skonstruowany nasz przykład powyżej.

Jeśli zamiast tego użytkownik zacznie na stronie serwowanej ze źródła wydawcy, a następnie przejdzie na stronę AMP, która NIE znajduje się w źródle wydawcy, klucze parametrów zostaną odwrócone, ale odpowiedni sposób, w jaki odnosimy się do tych wartości nie będzie odwrócony (tj. `$amp_client_id` zawsze odnosi się do identyfikatora zapisanego na stronie AMP, która NIE znajduje się w źródle wydawcy):

**Przypadek nr 2: identyfikatory w razie wysyłania analitycznych pakietów ping ze strony AMP NIE znajdującej się w źródle wydawcy**

<table>
  <tr>
    <th width="20%"> </th>
    <th width="40%"><strong>Identyfikator użytkownika w źródle wydawcy</strong></th>
    <th width="40%"><strong>Identyfikator użytkownika na stronie AMP, która NIE znajduje się w źródle wydawcy („alias”)</strong></th>
  </tr>
  <tr>
    <td><strong>Jak wyrażony w analitycznym pakiecie ping</strong></td>
    <td><code>orig_user_id=$publisher_origin_id</code></td>
    <td><code>user_id=$amp_client_id</code></td>
  </tr>
  <tr>
    <td><strong>Klucz parametru</strong></td>
    <td><code>orig_user_id</code></td>
    <td><code>user_id</code></td>
  </tr>
  <tr>
    <td><strong>Wartość parametru</strong></td>
    <td><code>$publisher_origin_id</code></td>
    <td><code>$amp_client_id</code></td>
  </tr>
</table>

Wyszukując w tabeli mapowania zwróć uwagę, która sytuacja ma zastosowanie i wyszukaj wartości w kolumnach tabeli mapowania, w których spodziewasz się ich wystąpienia. Jeśli na przykład analityczny pakiet ping jest wysyłany ze strony w źródle wydawcy (przypadek nr 1), sprawdź czy wartości oznaczone kluczem `user_id` znajdują się w kolumnie „Identyfikator użytkownika w źródle wydawcy, a w kolumnie „Identyfikator użytkownika na stronie AMP NIE znajdującej się w źródle wydawcy (alias)” znajdują się wartości oznaczone kluczem `orig_user_id`.

Jeśli w tabeli mapowania nie możesz znaleźć żadnej z używanych wartości identyfikatorów, utwórz nowe mapowanie:

- Jeśli żądanie usługi analityki pochodzi ze strony w źródle wydawcy, jako identyfikator rekordu analitycznego należy wybrać wartość odpowiadającą `uid`; wartość `orig_uid` wybierz jako „alias”.
- Jeśli żądanie usługi analityki nie pochodzi od strony w źródle wydawcy, należy wybrać wartość odpowiadającą `uid` jako wartość „alias” w tabeli mapowania. Następnie postępuj zgodnie z pozostałymi instrukcjami w [Zadaniu 4](#task4), aby utworzyć potencjalny identyfikator źródła wydawcy i spróbować ustawić tę wartość jako plik cookie w źródle.

##### Walidacja parametrów <a name="parameter-validation"></a>

Wartości zawarte w adresie URL mogą być złośliwie zmieniane, zniekształcane lub w inny sposób różnić się od wartości, które spodziewasz się tam znaleźć. Jest to czasami zwane fałszerstwem żądania międzywitrynowego. Tak jak ważne jest, aby upewniać się, że analityczne pakiety ping, otrzymywane przez Twój serwer analityki pochodzą ze stron, które mają wysyłać analityczne pakiety ping, również podczas „przesyłania dalej” wartości, które były częścią adresu URL należy wykonywać walidację strony odsyłającej, aby móc ufać tym wartościom.

Na przykład w powyższych krokach skonstruowaliśmy następujący adres URL, przeznaczony do kliknięcia przez użytkownika w celu przejścia do odpowiedniej strony:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$amp_client_id
[/sourcecode]

Jest jednak równie możliwe, że użytkownik lub jakiś napastnik zmieni ten adres URL:

[sourcecode:http]
https://example.com/step2.html?orig_user_id=$malicious_value
[/sourcecode]

Chcesz mieć pewność, że przetwarzasz tylko wystąpienia `$amp_client_id` i unikasz używania wystąpień `$malicious_value`.

**Sugerowane kroki walidacji wartości otrzymanych za pomocą parametrów zapytania URL:** upewnij się, że strona odsyłająca do strony docelowej jest zgodny z adresem URL, którego się spodziewasz. Zazwyczaj powinien to być adres zawierający wcześniej widzianą wartość identyfikatora w prawidłowym żądaniu CORS. Zalecamy akceptowanie tylko takich znanych identyfikatorów.

Na stronie bez AMP sprawdź `document.referrer` bezpośrednio po stronie klienta lub przekaż wartość w ramach analitycznych pakietów ping, aby móc wykonać walidację po stronie serwera. Jeśli możesz zaufać wartości strony odsyłającej, możesz zaakceptować i przetworzyć wartości pochodzące z adresu URL strony docelowej, takie jak `orig_user_id` w powyższym przykładzie.

Na stronie AMP użyj podstawianej zmiennej [strony odsyłającej dokumentu](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md#document-referrer), aby przekazać wartość strony odsyłającej jako część analitycznego pakietu ping. Przetwarzanie po stronie serwera jest jedyną dostępną opcją. Dla ilustracji, oto analityczny pakiet ping, który strona docelowa może wysłać, zawierający (1) wartość Client ID bieżącej strony, (2) wartość przekazywaną przez adres URL, ustawioną jako wartość Client ID na stronie odsyłającej, oraz (3) samą informację o stronie odsyłającej, aby zweryfikować wartość (2): `https://analytics.example.com/ping?type=pageview&orig_user_id=${queryParam(ref_id)}&user_id=${clientId(uid)}&referrer=${documentReferrer}`

Jeśli nie możesz ufać stronie odsyłającej, odrzuć wszelkie wartości podane za pomocą parametrów adresu URL i nie używaj ich.

## Zdecydowanie zalecane praktyki <a name="strongly-recommended-practices"></a>

### Zachowaj tylko jedno powiązanie <a name="keep-just-one-association"></a>

**Należy zachować tylko jedno powiązanie między identyfikatorami z dwóch dowolnych kontekstów.** Jeżeli Client ID AMP, który wcześniej został skojarzony z plikiem cookie lub innym identyfikatorem użytkownika wydanym przez Ciebie, jest widoczny wraz z nowym plikiem cookie lub wydanym przez Ciebie identyfikatorem użytkownika, należy usunąć wszystkie zachowane stany poprzedniego pliku cookie i identyfikatora użytkownika.

Kroki te pozwolą zapewnić zgodność z oczekiwaniami użytkowników dotyczącymi prywatności. Jak wyszczególniono w poprzednich sekcjach, zarządzanie stanem użytkownika w AMP często będzie wymagało przechowywania i powiązywania różnych identyfikatorów w wielu kontekstach, w których wyświetlana jest zawartość AMP. **Tej sytuacji nie należy nigdy nadużywać w celu odtwarzania danych lub śledzenia, którego użytkownik nie spodziewa się lub którego nie ujawniono użytkownikowi, np. po usunięciu przezeń plików cookie Twoich witryn.**

### Poszanowanie usunięcia plików cookie i danych z magazynu lokalnego <a name="respect-cookie-and-local-storage-deletions"></a>

**Należy przestrzegać wszystkich obowiązujących środków kontroli prywatności, które są dostępne dla użytkownika, włącznie z środkami kontroli umożliwiającymi usunięcie wszystkich plików cookie i danych z magazynu lokalnego.** W żadnym momencie nie należy używać Client ID AMP ani infrastruktury AMP [do odtwarzania usuniętego identyfikatora](https://en.wikipedia.org/wiki/Zombie_cookie), gdy użytkownik jawnie usunie jedną ze stron relacji identyfikatora.

### Przestrzeganie lokalnych przepisów ustawowych i wykonawczych <a name="comply-with-local-laws-and-regulations"></a>

**Powiązywanie plików cookie i/lub identyfikatorów z dwóch lub więcej domen może wymagać zaktualizowania polityki prywatności, zapewnienia dodatkowych informacji użytkownikom lub uzyskania zgody użytkownika końcowego w niektórych jurysdykcjach.** Użycie funkcji Client ID AMP, która wykorzystuje pliki cookie lub magazyn lokalny jako sposób trwałego przechowywania w celu zapewnienia stabilnego identyfikatora powinno być analizowane przez każdego wydawcę z uwzględnieniem wszystkich obowiązujących przepisów ustawowych i wykonawczych dotyczących zbierania, przechowywania i przetwarzania danych oraz informowania użytkowników.
