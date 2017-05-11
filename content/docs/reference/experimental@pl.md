---
$title: Komponenty eksperymentalne
---

[Eksperymentalne komponenty AMP](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
to udostępnione funkcje, które nie są jeszcze w pełni dopracowane, więc chroni je status eksperymentu.

Programiści oraz użytkownicy mogą zgłosić chęć używania tych funkcji przed ich oficjalnym udostępnieniem.
Należy z nich korzystać ostrożnie, bo mogą zawierać błędy lub powodować niespodziewane efekty uboczne.

## Zgłoś chęć pracy na wersji deweloperskiej AMP

Wersja deweloperska konsoli AMP to sposób przestawienia przeglądarki na korzystanie z nowszej wersji bibliotek AMP JS.

Aby przestawić przeglądarkę na konsolę AMP w wersji deweloperskiej,
otwórz [stronę eksperymentów z AMP](https://cdn.ampproject.org/experiments.html)
i aktywuj eksperyment „AMP Dev Channel”.

## Włączanie składnika eksperymentalnego

Aby uzyskać dostęp do treści hostowanych pod adresem [https://cdn.ampproject.org](https://cdn.ampproject.org)
otwórz [stronę eksperymentów z AMP](https://cdn.ampproject.org/experiments.html)
i włącz (albo wyłącz) dowolne komponenty eksperymentalne. Włączenie funkcji ustawi w przeglądarce plik cookie, który będzie umożliwiał działanie funkcji eksperymentalnej w przypadku wszystkich stron AMP wyświetlanych z poziomu pamięci podręcznej AMP Google.

Treści serwowane z jakiejkolwiek innej domeny można przełączyć w konsoli narzędzi dla programistów przy włączonym trybie programisty za pomocą ciągu znaków:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Żaden plik AMP zawierający funkcje eksperymentalne nie przejdzie
[weryfikacji stron AMP](/pl/docs/guides/debug/validate.html).
W przypadku dokumentów gotowych do wdrożenia komponenty eksperymentalne należy usunąć.
