---
"$title": Konfigurowanie analityki
"$order": '5'
"$hidden": 'true'
description: Jeśli korzystasz z Google Analytics jako dostawcy usług analityki, dowiedz się jak skonfigurować podstawową usługę Google Analytics dla AMP i jak łączyć treści AMP z treściami bez AMP za pomocą identyfikatora klienta.
formats:
- websites
- stories
---

[tip] **PORADA —** jeśli korzystasz z Google Analytics jako dostawcy usług analityki, dowiedz się [jak skonfigurować podstawową usługę Google Analytics dla AMP](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) i [jak łączyć treści AMP z treściami bez AMP za pomocą identyfikatora klienta](https://support.google.com/analytics/answer/7486764). [/tip]

## Zadecyduj, zanim zaczniesz

Wszystkie rozwiązania analityczne opierają się na wiedzy o tym, jakich danych potrzebujesz i jak zamierzasz je analizować. Zanim zaczniesz, zadecyduj:

- Czy do analizy zaangażowania użytkowników będziesz używać narzędzi analitycznych innych firm, czy też własnego rozwiązania?
- Jakie zachowania użytkowników będziesz mierzyć, aby zrozumieć zaangażowanie użytkowników?

### Wysyłać dane do dostawcy czy do siebie?

Jeśli masz własne, autorskie rozwiązanie do pomiaru zaangażowania użytkowników, jedyną rzeczą, jakiej będziesz potrzebował, aby zintegrować analitykę AMP z tym rozwiązaniem, jest adres URL. To właśnie tam będziesz wysyłać dane. Możesz również wysyłać dane na różne adresy URL. Możesz na przykład wysyłać dane o odsłonach stron do jednego adresu URL, a dane o zaangażowaniu społecznościowym do innego adresu URL.

Analityka AMP jest specjalnie zaprojektowana tak, aby mierzyć raz i raportować do wielu. Jeśli pracujesz już z jednym lub kilkoma dostawcami rozwiązań analitycznych, sprawdź listę [Dostawcy usług analityki](analytics-vendors.md), aby sprawdzić, czy zintegrowali oni swoje rozwiązanie z AMP. Jeśli tak, przejrzyj szczegóły ich konfiguracji i postępuj zgodnie z instrukcjami.

Jeśli dostawca usług analitycznych nie jest zintegrowany z AMP, zwróć się do niego z prośbą o pomoc techniczną. Zachęcamy również do [zgłoszenia w AMP Project problemu](https://github.com/ampproject/amphtml/issues/new) z prośbą o dodanie dostawcy usług. Zobacz również artykuł [Integrowanie narzędzi analitycznych w AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Jakich danych potrzebujesz?

Jakie dane o Twoich użytkownikach będziesz rejestrować w celu pomiaru zaangażowania? Musisz zidentyfikować te dane, aby móc je skonfigurować.

Kluczowe punkty danych do rozważenia:

- Czy będziesz śledzić tylko odsłony stron, czy również dodatkowe wzorce zaangażowania użytkowników (patrz też [amp-pixel lub amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Które rodzaje danych dotyczących użytkowników, treści, urządzenia lub przeglądarki będziesz rejestrować (patrz też [Podstawianie zmiennych](analytics_basics.md#variable-substitution))?
- Jak będziesz identyfikować użytkowników (patrz też [Identyfikacja użytkowników](analytics_basics.md#user-identification))?

Dowiedz się więcej: kontynuuj naukę o analityce w artykule [Analityka: podstawy](analytics_basics.md).
