---
layout: page
title: Konfigurowanie analityki
order: 5
folder: analytics
locale: pl
---

## Zdecyduj, zanim zaczniesz

Wszystkie rozwiązania analityczne są budowane na wiedzy o tym, jakich danych potrzebujesz
oraz jak zamierzasz analizować te dane. Zdecyduj, zanim zaczniesz:

* Zamierzasz używać narzędzi analitycznych innych firm,
czy masz własne, firmowe rozwiązanie?
* Jakie zachowania użytkowników chcesz mierzyć, aby poznać zaangażowanie użytkowników?

### Wysyłać dane do dostawcy czy do siebie?

Jeśli masz własne, firmowe rozwiązanie do mierzenia czynności użytkowników,
jedynie adres URL jest potrzebny w celu integracji analityki AMP z tym rozwiązaniem.
To tam będziesz wysyłać dane.
Możesz także wysyłać dane na różne adresy URL.
Na przykład możesz wysyłać dane o wyświetleniach strony na jeden adres URL,
a dane o interakcjach społecznościowych na inny adres URL.

Analityka AMP została specjalnie zaprojektowania pod kątem jednorazowego pomiaru i zgłaszania do wielu odbiorców.
Jeśli już pracujesz z jednym lub kilkoma dostawcami analityki,
zapoznaj się ze
[specyfikacją],(/docs/reference/extended/amp-analytics.html)
aby przekonać się, czy zintegrowali oni swoje rozwiązania z AMP.
Jeśli tak, wystarczy utworzyć link do ich dokumentów ze specyfikacji
i rozpocząć wykonywanie instrukcji.

Jeśli dostawca analityki nie zintegrował swojego rozwiązania z AMP,
skontaktuj się z dostawcą, aby poprosić o pomoc.
Zachęcamy także do [utworzenia zgłoszenia w projekcie AMP](https://github.com/ampproject/amphtml/issues/new)
z żądaniem dodania dostawcy.
Zobacz też
[Integrating your analytics tools in AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md) — Integracja narzędzi do analityki w kodzie AMP HTML.

### Jakich danych potrzebujesz?

Jakie dane o swoich użytkownikach zamierzasz przechwytywać w celu mierzenia czynności?
Musisz zidentyfikować te dane, aby móc je skonfigurować.

Kluczowe punkty danych, które trzeba wziąć pod uwagę:

* Zamierzasz monitorować tylko wyświetlenia stron, czy wzorce czynności użytkowników
(patrz także opis znaczników [amp-pixel lub amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Jakie zamierzasz przechwytywać rodzaje danych o użytkownikach, treściach,
o urządzeniu lub przeglądarce (patrz także [Podstawianie zmiennych](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* Jak zamierzasz identyfikować swoich użytkowników (patrz także [Identyfikacja użytkownika](/docs/guides/analytics/analytics_basics.html#user-identification))?
