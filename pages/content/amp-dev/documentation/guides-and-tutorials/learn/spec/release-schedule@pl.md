---
"$title": Harmonogram wydawania AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- Kanały wydawania"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Kanały wydań](#release-channels)
    - [Conocne](#nightly)
    - [Cotygodniowe](#weekly)
        - [Kanały eksperymentalne i beta](#beta-and-experimental-channels)
    - [Stabilne długookresowe (lts)](#long-term-stable-lts)
- [Ustalanie, czy Twoja zmiana jest w danej wersji](#determining-if-your-change-is-in-a-release)
- [Kadencja wydawnicza](#release-cadence)
    - [Szczegółowy harmonogram](#detailed-schedule)
    - [Zamrożenia wersji](#release-freezes)

Nowa wersja AMP jest wypychana na wszystkie strony AMP co tydzień we wtorek. **Gdy zmiana w AMP zostanie scalona z główną gałęzią repozytorium amphtml, zazwyczaj po 1–2 tygodniach staje się dostępna dla wszystkich użytkowników.**

## Kanały wydań <a name="release-channels"></a>

Środowisko uruchomieniowe i rozszerzenia AMP są dostarczane przez różne *kanały wydań*. Każdy kanał służy programistom oraz samemu projektowi AMP HTML. Zobacz sekcję [kadencja wydawnicza](#release-cadence), aby dowiedzieć się więcej o tym, jak i kiedy kod z repozytorium [`ampproject/amphtml`](https://github.com/ampproject/amphtml) zmienia się w kompilacje wersji.

Aby określić, czy PR włączono do któregokolwiek z poniższych kanałów wydań, należy poszukać etykiet GitHub *PR Use: In Canary*, *PR Use: In Production* lub *PR Use: In LTS* (więcej szczegółów znajdziesz w sekcji na temat [ustalania, czy Twoja zmiana jest w danej wersji](#determining-if-your-change-is-in-a-release)).

### Conocne <a name="nightly"></a>

Kanał wydań **conocnych** jest aktualizowany (jak wskazuje jego nazwa) w każdą noc tygodnia. Proces ten jest zautomatyzowany i nie ma gwarancji, że dane wydanie conocne jest wolne od błędów i innych problemów. Każdej nocy po północy (czasu pacyficznego), ostatnia zatwierdzona wersja „zielona” z dnia jest wybierana jako punkt graniczny wydania. Kompilacja jest „zielona”, gdy przejdzie pomyślnie wszystkie zautomatyzowane testy.

Wydanie conocne zapewnia mechanizm pozwalający na szybkie wykrycie i rozwiązanie problemów, zanim dotrą one do kanałów wydania *cotygodniowego* o większym ruchu. Służy również do zmniejszenia liczby użytkowników, których dotkną nowo wprowadzone problemy.

Możliwe jest dołączenie do kanału **conocnego**, aby testować żądania ściągnięcia, które zostały scalone w ciągu ostatnich kilku dni. Szczegóły zawiera [sekcja dotycząca dołączania](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) w pliku [DEVELOPING.md].

### Cotygodniowe <a name="weekly"></a>

Kanały wydania *cotygodniowego* są uważane za podstawowe kanały wersji „wiecznie zielonych”. Co tydzień wersja **beta** z poprzedniego tygodnia jest promowana na wersję **stabilną**, a ostatnia wersja **conocna** z poprzedniego tygodnia jest promowana na wersję **eksperymentalną** i **beta** (patrz [szczegółowy harmonogram](#detailed-schedule)).

Są dwa zestawy konfiguracji używanych do tworzenia kompilacji wersji: konfiguracja *canary* oraz konfiguracja *production*. Kanały wersji **eksperymentalnych** i **beta** są kompilowane z tego samego zatwierdzenia. Kanał **eksperymentalny** wykorzystuje jednak konfigurację *canary*, a kanał **beta** wykorzystuje konfigurację *production*. Konfiguracja *canary* umożliwia korzystanie z eksperymentalnych składników i funkcji, które mogą być wyłączone w konfiguracji *production*. Kanały **eksperymentalny** lub **beta** można wybrać poprzez [stronę eksperymentów](https://cdn.ampproject.org/experiments.html).

Kanał wydania **stabilnego** jest kompilowany w konfiguracji *production* i serwowany większości ruchu AMP. Kanał wydania **beta** jest również kompilowany z konfiguracji *production*, reprezentuje więc dokładnie tę kompilację, która stanie się **stabilna** w następnym tygodniu (z możliwością wybiórczego rozwiązywania problemów w ostatniej chwili; patrz [Dodawanie kodu](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### Kanały eksperymentalne i beta <a name="beta-and-experimental-channels"></a>

Kanały *beta* i *ekperymentalne* są kandydatami na wersję wstępną następnego stabilnego wydania AMP. W każdy wtorek (z wyjątkiem tygodni, w których jest [zamrożenie wydania](#release-freezes)) zeszłotygodniowa **wersja conocna** jest promowana na wersję **beta** i **eksperymentalną** wybraną przez programistę. Po 1-dniowym okresie, w którym sprawdzamy, czy w tych kanałach nie wprowadzono żadnych regresji funkcji lub wydajności, wystawiamy to wydanie w środę na niewielką część ruchu. Ta sama wersja jest następnie promowana na wersję **stabilną** we wtorek w następnym tygodniu.

Możliwe jest dołączenie do tych kanałów. Szczegóły zawiera <a>sekcja dotycząca dołączania</a> w pliku [DEVELOPING.md].

Dołączenie do *kanału beta* umożliwia:

- testowanie i zabawy z wersją środowiska uruchomieniowego AMP, która zostanie wkrótce wydana;
- stosowanie do zapewnienia jakości (QA) w celu upewnienia się, że witryna jest zgodna z następną wersją AMP.

*Kanał eksperymentalny* umożliwia:

- testowanie i zabawę nowymi funkcjami, które nie są jeszcze dostępne dla wszystkich użytkowników;
- stosowanie do zapewnienia jakości (QA) w celu upewnienia się, że witryna jest zgodna z nadchodzącymi funkcjami AMP, które są jeszcze w trakcie opracowywania.

Kanał *eksperymentalny* **może być mniej stabilny** i może zawierać funkcje, które nie są jeszcze dostępne dla wszystkich użytkowników.

### Stabilne długookresowe (lts) <a name="long-term-stable-lts"></a>

Kanał wydawania **lts** zapewnia poprzednią **stabilną ** kompilację w odstępach jednomiesięcznych. W drugi poniedziałek każdego miesiąca bieżące wydanie **stabilne** jest promowane na wersję **lts**. Ten kanał nie jest zalecany dla wszystkich wydawców AMP. Jest on zapewniany, aby wydawcy, którzy chcą rzadziej przeprowadzać cykl QA na swojej stronie internetowej, mogli to zrobić poprzez podłączenie żądanych stron internetowych do kanału **lts** (patrz readme do <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">**lts**</a>).

W przypadku, gdy drugi poniedziałek miesiąca wypada w święto, promocja zostanie przeprowadzona po zakończeniu [zamrożenia wydania](#release-freezes).

Ważne: wydawcy korzystający z kanału wydania **lts** nie powinni używać nowo wprowadzonych funkcji. Ze względu na dłuższy cykl wydanie **lts** może być nawet siedem tygodni za `HEAD` z [`ampproject/amphtml`](https://github.com/ampproject/amphtml). Zobacz sekcję [Ustalanie, czy Twoja zmiana jest w danej wersji](#determining-if-your-change-is-in-a-release), aby sprawdzić, czy zmiana będzie gotowa z wybranym cyklem wydania.

## Ustalanie, czy Twoja zmiana jest w danej wersji <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) są używane do śledzenia statusu bieżących i przeszłych wersji; od początkowego odcięcia, do testowania przez kanały **eksperymantalny**/**beta**, do ostatecznego wydania przez kanały **stabilny** i **lts**. Zapowiedzi wersji są ogłaszane na [kanale AMP Slack #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([zarejestruj się w usłudze Slack](https://bit.ly/amp-slack-signup)).

Zmiany obecne w danej kompilacji można ustalić na jeden z poniższych sposobów:

- [*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) dotyczące każdego wydania będą zawierać link do [strony danego wydania](https://github.com/ampproject/amphtml/releases) z listą zmian zawartych w tym wydaniu.
- Etykiety [*PR Use: In Beta / Experimental*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [*PR Use: In Stable*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) i [*PR Use: In LTS*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) są dodawane do żądań PR wdrożonych w kompilacji *cotygodniowej* lub **lts**. Między utworzeniem kompilacji, a dodaniem etykiety może wystąpić opóźnienie.

## Kadencja wydawnicza <a name="release-cadence"></a>

Jesteśmy celowo ostrożni z naszą kadencją wydawniczą.

Określając, jak często powinniśmy wypychać nowe wersje AMP do wszystkich, musimy brać pod uwagę wiele czynników, takich jak:

- stabilność milionów witryn / miliardów stron utworzonych przy użyciu AMP
- dodanie wersji do adresu URL, do którego może dojść podczas wypychania nowej wersji
- pragnienie szybkiego wprowadzenia nowych funkcji

Po uwzględnieniu wszystkich tych czynników doszliśmy do 1–2 tygodniowego cyklu wypychania. Jak dotąd jest to rozsądny kompromis, ale będziemy nadal oceniać wszystkie te czynniki i w przyszłości możemy wprowadzić zmiany.

### Szczegółowy harmonogram <a name="detailed-schedule"></a>

Staramy się trzymać tego harmonogramu tak ściśle, jak to możliwe, ale komplikacje mogą skutkować opóźnieniami. Możesz śledzić najnowszy status każdego wydania w sekcji [*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) i na [kanale AMP Slack #release](https://amphtml.slack.com/messages/C4NVAR0H3/) ([zarejestruj się w usłudze Slack](https://bit.ly/amp-slack-signup)).

- Wtorek o godzinie [11 czasu pacyficznego](https://www.google.com/search?q=11am+pacific+in+current+time+zone): tworzone są nowe kompilacje **eksperymentalne** i **beta** wersji z [najnowszej kompilacji głównej, która przeszła wszystkie nasze testy](https://travis-ci.org/ampproject/amphtml/branches) i są wypychane do użytkowników AMP, którzy wybrali odpowiednio [kanał eksperymentalny AMP](#beta-and-experimental-channels) lub [kanał beta AMP](#beta-and-experimental-channels).
- Środa: sprawdzamy zgłoszenia usterek użytkowników *kanału eksperymentalnego* i *kanału beta*, a jeśli wszystko wygląda dobrze, wypychamy wersję **beta** do 1% stron AMP.
- Czwartek–poniedziałek: nadal monitorujemy wskaźniki błędów i zgłoszenia usterek użytkowników *kanału eksperymentalnego* i *kanału beta* oraz 1% stron z kompilacjami **eksperymentalnymi**/**beta**.
- Wtorek w następnym tygodniu: kompilacja **beta** jest w pełni promowana na **stabilną** (tzn. wszystkie strony AMP będą odtąd używać tej kompilacji).

### Zamrożenia wersji <a name="release-freezes"></a>

Zdarzają się sytuacje, w których pomijamy wydanie AMP do produkcji, znane jako zamrożenie wersji.

W przypadku ogłoszenia tygodniowego zamrożenia wersji na tydzień N:

- Kompilacja wersji z poprzedniego tygodnia pozostaje w kanale **eksperymentalnym**/**beta** przez dodatkowy tydzień, tzn. odcięcie wersji w tygodniu N-1 nie jest jak zwykle wypychane do kanału **stabilnego** w tygodniu N. Zamiast tego, zostanie ona wypchnięta do kanału **stabilnego** w tygodniu N+1.
- Nowa kompilacja wersji *nie* jest wykonywana w tygodniu zamrożenia (tygodniu N).
- Normalny harmonogram zostanie wznowiony w tygodniu N+1, tzn. wersje **eksperymentalna**/**beta** zostaną odcięte w tygodniu N+1 i awansują do wersji **stabilnej** w tygodniu N+2.
- Jeśli promocja wersji **stabilnej** promowanej podczas tygodnia N-1 była pierwotnie zaplanowana jako pormocja do wersji **lts** podczas tygodnia N, teraz zostanie awansowana do wersji **lts** w poniedziałek tygodnia N+1.
- Wersje **conocne** są nadal generowane i promowane, ponieważ są w pełni zautomatyzowane.

Do zamrożenia wersji może dojść w następujących sytuacjach:

- Gdy nie ma wystarczającej liczby osób, dla których można wypchnąć wydanie AMP do kanału **stabilnego** i monitorować ją. Obecnie większość osób wykonujących wydania AMP przebywa w Stanach Zjednoczonych, więc zazwyczaj będą to tygodnie największych amerykańskich świąt — Dnia Niepodległości (4 lipca), Święta Dziękczynienia (czwarty czwartek listopada), Bożego Narodzenia (25 grudnia) i Sylwestra/Nowego Roku (31 grudnia/1 stycznia).
- W sytuacjach nagłych, takich jak problem dotyczący zabezpieczeń lub prywatności, określonych przez [techniczny komitet sterujący (TSC)](https://github.com/ampproject/meta-tsc) lub osoby dokonujące wydania.
- W innych sytuacjach, w których stabilność bazy kodu jest uważana za szczególnie ważną według TSC.

We wszystkich przypadkach z wyjątkiem sytuacji nagłych zamrożenia wersji są zapowiadane z co najmniej jednomiesięcznym wyprzedzeniem.

Należy pamiętać, że o ile nie ogłoszono inaczej, zamrożenie wersji nie oznacza zamrożenia kodu. Podczas zamrożenia wersji kod można nadal pisać, sprawdzać i scalać.
