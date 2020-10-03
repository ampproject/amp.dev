---
$title: Tworzenie bloga na żywo
$order: 102
description: Blogi na żywo to strony internetowe, które są często aktualizowane podczas trwającego wydarzenia, np. zawodów sportowych lub wyborów. W AMP można wdrożyć blog na żywo za pomocą ...
tutorial: true
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

Blogi na żywo to strony internetowe, które są często aktualizowane podczas trwającego wydarzenia, np. zawodów sportowych lub wyborów. W AMP można wdrożyć blog na żywo za pomocą składnika [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Ten samouczek zawiera krótkie omówienie składnika [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) i skupia się na niektórych szczegółach implementacji dotyczących blogów na żywo, takich jak [paginacja](#pagination) i [ głębokie linkowanie](#deeplinking). Aby zilustrować implementację blogów na żywo w AMP, użyjemy [bloga na żywo](live_blog.md) AMP By Example.

[tip type="tip"] **PORADA —** użyj znacznika metadanych [LiveBlogPosting](http://schema.org/LiveBlogPosting), aby Twój blog można było zintegrować z funkcjami innych platform. [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Omówienie składnika `amp-live-list`

Składnik [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) regularnie sonduje główny dokument w poszukiwaniu nowej zawartości i aktualizuje przeglądarkę użytkownika w miarę pojawiania się nowych elementów. To znaczy, że za każdym razem, gdy trzeba dodać nowy wpis na blogu, dokument hosta powinien zostać zaktualizowany przez CMS, aby uwzględnić aktualizację zarówno w treści, jak i w sekcji [metadanych](../../../documentation/examples/documentation/Live_Blog.html#metadata) strony.

Początkowy kod bloga mógłby wyglądać tak:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Spójrzmy na ten kod:

Każdy składnik [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) wymaga niepowtarzalnego identyfikatora, ponieważ na stronie może znajdować się więcej niż jeden taki element.  W tym przykładzie podaliśmy niepowtarzalny identyfikator `my-live-list`.

Atrybut `data-poll-interval` określa jak często powinno być wykonywane sondowanie; jeśli dokument hosta jest aktualizowany, aktualizacja powinna być dostępna dla użytkownika po następnym interwale czasowym.

Po każdym dodaniu nowej pozycji do głównego dokumentu element `<button update on="tap:my-live-list.update">` pokazuje przycisk „Masz aktualizacje”, którego kliknięcie powoduje wyświetlenie najnowszych wpisów.

Blogi na żywo mogą rosnąć i sprawiać, że strona będzie za długa. Możesz użyć atrybutu `data-max-items-per-page`, aby określić, ile elementów można dodać do bloga na żywo. Jeśli liczba elementów po aktualizacji przekracza wartość `data-max-items-per-page`, usuwane są najstarsze aktualizacje przekraczające tę liczbę. Jeśli na przykład na stronie znajduje się obecnie 9 elementów, a atrybut `data-max-items-per-page` ustawiono na 10 i w ostatniej aktualizacji dodano 3 nowe elementy, wskutek tej aktualizacji ze strony zostaną usunięte dwa najstarsze elementy.

Wszystkie wpisy blogu w składniku [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) muszą być elementami podrzędnymi `<div items></div>`. Odnosząc się do każdego wpisu jako elementu, każdy element musi mieć niepowtarzalny <codr>id i atrybut <codr>data-sort-time.</codr></codr>

## Szczegóły implementacji

Teraz, gdy znasz już składnik [`<code data-md-type="codespan">amp-live-list`](../../../documentation/components/reference/amp-live-list.md), zastanówmy się jak zaimplementować bardziej złożony blog na żywo. Czytaj dalej, aby dowiedzieć się więcej o tym, jak zaimplementować paginację i jak działa głębokie linkowanie.

### Paginacja <a name="pagination"></a>

W długich blogach można stosować paginację w celu poprawy wydajności poprzez ograniczenie liczby wyświetlanych na stronie elementów bloga. Aby zaimplementować paginację, w składniku [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), dodaj znacznik `<div><pagination></div>`, a następnie wstaw wszelkie znaczniki  niezbędne do paginacji (np. numer strony lub link do następnej i poprzedniej strony).

Dzięki paginacji prosty kod, którego użyliśmy wcześniej, przybiera postać:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

Twoim obowiązkiem jest prawidłowe wypełnienie elementów nawigacyjnych poprzez aktualizację hostowanej strony. W przykładowym [blogu na żywo](live_blog.md) na przykład renderujemy stronę za pomocą szablonu po stronie serwera i używamy parametru zapytania, aby określić, jaki powinien być pierwszy element bloga na stronie. Ograniczamy rozmiar strony do 5 elementów, więc jeśli serwer wygeneruje więcej niż 5 elementów, użytkownik lądujący na głównej stronie zobaczy element „Następna” w obszarze nawigacji. Szczegóły — patrz [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Po przekroczeniu określonej przez atrybut `data-max-items-per-page` maksymalnej liczby wpisów na blogu starsze wpisy są wyświetlane na następnych stronach, np. na stronie 2. Biorąc pod uwagę, że składnik [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) w określonych odstępach czasu wykonuje sondowanie na serwerze, aby sprawdzić czy nie zaszły żadne zmiany w elementach, nie ma potrzeby sondowania serwera w celu sprawdzenia, czy użytkownik nie znajduje się na pierwszej stronie.

Do hostowanej strony można dodać wyłączony atrybut, zapobiegający uruchamianiu mechanizmu sondowania. W przykładowym blogu na żywo wprowadzamy ten sposób działania w szablonie po stronie serwera; gdy żądana strona bloga nie jest pierwszą, dodajemy wyłączony atrybut do składnika [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

### Głębokie linkowanie <a name="deeplinking"></a>

Gdy publikujesz wpis na blogu, ważne jest, aby mieć możliwość głębokiego linkowania do wpisu, gdyż pozwala to włączyć funkcje takie jak udostępnianie. Dzięki składnikowi [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) głębokie linkowanie jest możliwe po prostu za pomocą `id` elementu bloga. Na przykład link [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) pozwala na bezpośrednie przejście do wpisu na blogu za pomocą identyfikatora `post3`.

AMP By Example używa pliku cookie do generowania nowej treści w [przykładowym blogu na żywo](live_blog.md), więc jeśli lądujesz na stronie po raz pierwszy, wpis z id „post3” może być niedostępny, w takim przypadku następuje przekierowanie do pierwszego wpisu.

## Zasoby <a></a>

Możesz dowiedzieć się więcej z tych materiałów:

- Dokumentacja referencyjna [amp-live-list](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example's Live blog sample](live_blog.md)
