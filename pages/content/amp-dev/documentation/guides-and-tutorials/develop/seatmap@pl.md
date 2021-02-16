---
'$title': Tworzenie mapy miejsc
$order: 104
description: Mapy miejsc są ważną częścią aplikacji internetowych automatów biletowych, ale ich implementacja w AMP może być trudna. Czytaj dalej, aby dowiedzieć się jak zaimplementować mapę miejsc w AMP
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

Mapy miejsc są ważną częścią aplikacji internetowych automatów biletowych, ale ich implementacja w AMP może być trudna. Czytaj dalej, aby dowiedzieć się jak zaimplementować mapę miejsc w AMP, wykorzystując kombinację dostępnych składników AMP.

[tip] Rzeczywisty przykład zastosowania opisanych poniżej praktyk dostępny jest [tutaj](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Niezbędne składniki AMP

Zacznijmy od przeglądu niezbędnych składników:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) umożliwia powiększanie i przesuwanie zawartości za pomocą podwójnego dotknięcia i gestu szczypania. Ten składnik służy jako podstawa do implementacji mapy miejsc.

### amp-list

Składnik [`amp-list`](../../../documentation/components/reference/amp-list.md) dynamicznie pobiera zawartość z punktu końcowego mechanizmu CORS JSON i renderuje ją za pomocą dostarczonego szablonu. Służy do pobierania bieżącej dostępności miejsc na mapie, dzięki czemu użytkownicy zawsze otrzymują najnowsze dane.

### amp-bind

Składnik [`amp-bind`](../../../documentation/components/reference/amp-bind.md) dodaje do strony interaktywność. Tutaj jest niezbędny do śledzenie liczby zajętych miejsc.

### amp-selector

Składnik [`amp-selector`](../../../documentation/components/reference/amp-selector.md) reprezentuje kontrolkę, która prezentuje menu opcji i pozwala użytkownikowi na wybór z tego menu. Cała mapa miejsc może być traktowana jako menu opcji, w którym każde miejsce jest opcją. Znacznie ułatwia to stylizację stanu zajętości miejsc, umożliwiając użycie wyrażeń CSS. Na przykład następujące wyrażenie po zajęciu miejsca wypełnia je kolorem pomarańczowym.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Wymagania

1. Aby rysować mapę miejsc jako SVG, w którym każde miejsce jest reprezentowane przez element <codr>rect, niezbędne są następujące informacje o każdym miejscu: pozycja <code data-md-type="codespan">x</code> i <code data-md-type="codespan">y</code>, <code data-md-type="codespan">width</code> (szerokość) i <code data-md-type="codespan">height</code> (wysokość) oraz, ewentualnie, promienie <code data-md-type="codespan">rx</code> i <code data-md-type="codespan">ry</code> w celu zaokrąglenia narożników prostokątów.</codr>
2. Niepowtarzalny identyfikator każdego miejsca, którego można użyć do dokonania rezerwacji.
3. Miara całkowitej szerokości i wysokości mapy miejsc, która zostanie użyta w atrybucie `viewbox`.

## Rysowanie mapy miejsc

Mapa miejsc jest renderowana za pomocą składników [`amp-list`](../../../documentation/components/reference/amp-list.md) oraz [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Po otrzymaniu danych z wywołania [`amp-list`](../../../documentation/components/reference/amp-list.md) można użyć owych danych do iteracji przez miejsca:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Stylizacja niedostępnych miejsc

W powyższym przykładzie `{% raw %}{{unavailable}}{% endraw %}` jest wartością pola zwróconą przez punkt końcowy JSON i używaną do stylizacji niedostępnego miejsca. Takie podejście nie pozwala na usunięcie atrybutów takich jak `option="{{id}}"` w przypadku, gdy miejsce jest niedostępne, ponieważ szablon nie może otoczyć elementu całych stron <code><html></code>.

Alternatywnym, bardziej szczegółowym podejściem jest powtarzanie znaczników w następujący sposób:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Ustawianie rozmiaru mapy miejsc

Jeśli rozmiar mapy miejsc nie jest ustalony, trudno jest ustawiać rozmiar składnika [`amp-list`](../../../documentation/components/reference/amp-list.md) zawierającego mapę miejsc. Składnik [`amp-list`](../../../documentation/components/reference/amp-list.md) wymaga albo podania ustalonych wymiarów, albo użycia właściwości `layout="fill"` (w celu wykorzystania dostępnego miejsca w kontenerze nadrzędnym). Ten problem można rozwiązać na dwa sposoby:

1. Oblicz dostępne miejsce na stronie, gdy poznasz miejsce zajmowane przez inne składniki, takie jak nagłówki i stopki. Obliczenie to można wykonać w CSS, używając wyrażenia `calc` i przypisując je jako `min-height` nadrzędnego elementu div składnika [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Znając wysokość układu strony, użyj układu flex.

## Stylizacja składnika amp-pan-zoom

W przypadku podejścia opisanego w poprzedniej sekcji w składniku [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) również należy zastosować właściwość `layout="fill"`.

[tip type="tip"] **PORADA —** aby zachować trochę białej przestrzeni wokół mapy miejsc, nadal czyniąc ją częścią obszaru szczypania i powiększania:

- Dodaj otokę div do svg
- Dodaj wypełnienie

Jeśli nie masz otoki div i zamiast tego dodasz do SVG margines, marginesy nie staną się częścią obszaru szczypania i powiększania. [/tip]

## Obsługa stanu

Gdy użytkownicy klikają różne miejsca, śledzenie `id` wybranych miejsc w zmiennej za pomocą składnika `amp-state` jest możliwe na następujące sposoby:

- Poprzez dodanie do każdego miejsca wyrażenia [`amp-bind`](../../../documentation/components/reference/amp-bind.md) w celu dodawania wybranych miejsc do listy
- Można też użyć kontrolki [`amp-selector`](../../../documentation/components/reference/amp-selector.md) z działaniem <code>on="select:AMP.setState({selectedSeats: event.selectedOptions})"</code> w celu dodawania wszystkich wybranych miejsc do listy

Pierwsze podejście nie wymaga dodatkowego składnika [`amp-selektor`](../../../documentation/components/reference/amp-selector.md), ale może bardzo spowolnić mapę miejsc, ponieważ po każdym zajęciu/zwolnieniu miejsca obliczane będzie każde wyrażenie [`amp-bind`](../../../documentation/components/reference/amp-bind.md).

Drugie podejście pozwala również ograniczyć dublowanie wyrażenia [`amp-bind`](../../../documentation/components/reference/amp-bind.md) dla każdego miejsca, które będzie renderowane przez szablon.

## Końcowa struktura HTML

Oto ostateczny poglądowy kod HTML mapy miejsc:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
<amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
<template type="amp-mustache">
<amp-pan-zoom layout="fill" class="seatmap">
<amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
<div class="svg-container">
<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>
</div>
</amp-selector>
</amp-pan-zoom>
</template>
</amp-list>

</div>{% endraw %}
[/sourcecode]
