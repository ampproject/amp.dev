---
'$title': Wprowadzenie do reklam AMPHTML
$order: 1
description: Reklamy AMPHTML to szybszy, wymagający przesyłania mniejszej ilości danych i bezpieczniejszy sposób serwowania reklam w sieci. Chociaż strony AMP obsługują tradycyjne reklamy HTML, ładowanie tych reklam może być powolne.
formats:
  - ads
---

## Co to jest reklama AMPHTML?

Reklamy AMPHTML to szybszy, wymagający przesyłania mniejszej ilości danych i bezpieczniejszy sposób serwowania reklam w sieci. Chociaż strony AMP obsługują tradycyjne reklamy HTML, ładowanie tych reklam może być powolne. Aby reklamy były równie szybkie, jak reszta strony AMP, możesz tworzyć reklamy w AMPHTML. Reklamy AMPHTML są dostarczane dopiero po walidacji zapewniającej, że są bezpieczne i wydajne. Przede wszystkim reklamy te można dostarczać w dowolnym miejscu w sieci, a _nie tylko na stronach AMP_.

Reklamy AMPHTML są napisane w AMP HTML zgodnie ze [specyfikacją reklam AMPHTML](a4a_spec.md) (odmianie AMP HTML + CSS). Oznacza to, że reklamy nie mają już możliwości uruchamiania dowolnego kodu JavaScript, co tradycyjnie jest główną przyczyną słabej wydajności reklam. Dlatego też, podobnie jak w przypadku podstawowego kodu AMP, podstawowy kod JavaScript reklam jest wbudowany bezpośrednio w projekt AMP Open Source, co gwarantuje prawidłowy sposób działania reklam.

### Korzyści

Dlaczego reklamy AMPHTML są lepsze od reklam tradycyjnych?

1. **Działają szybsze**: reklamy w formacie AMPHTML są szybsze, ponieważ są żądane wcześniej w procesie renderowania strony i są wyświetlane tuż przed dojściem do reklamy przez użytkownika. Mniejszy rozmiar pliku reklam AMPHTML również zwiększa szybkość.
2. **Mają mniejsze rozmiary**: reklamy AMPHTML wykorzystują wspólnie powszechnie stosowane funkcje reklam, co zmniejsza rozmiar pliku reklamy. Reklamy AMPHTML również zużywają mniej zasobów po znalezieniu się na stronie. Na przykład, zamiast 10 trackerów żądających własnych informacji w zwykłych reklamach, reklamy AMPHTML zbierają wszystkie dane raz i rozsyłają je do dowolnej liczby zainteresowanych trackerów.
3. **Są koordynowane**: na stronach AMP [środowisko uruchomieniowe AMP](spec/amphtml.md#amp-runtime) może koordynować ograniczone zasoby telefonu komórkowego, kierując je do odpowiedniego składnika we właściwym czasie, aby zapewnić największy komfort użytkownikowi. Na przykład reklamy AMPHTML z animacjami są wstrzymywane, gdy nie znajdują się w bieżącym okienku na ekranie.
4. **Są bardziej angażujące**: użytkownicy nie mogą się angażować w reklamy, których nie widzą. Szybsze reklamy prowadzą do większej widoczności, a co za tym idzie, wyższego wskaźnika klikalności, co ostatecznie prowadzi do lepszych wyników reklamy.
5. **Są zabezpieczone przed złośliwym oprogramowaniem**: nie można rozpowszechniać złośliwego oprogramowania za pomocą reklam AMPHTML, ponieważ reklamy są weryfikowane przed ich zaserwowaniem. Dzięki temu reklamodawcy mogą zapewnić bezpieczną obsługę użytkownika i pozytywne postrzeganie marki.
6. **Są elastyczniejsze**: reklamy AMPHTML są przeznaczone do działania zarówno na stronach AMP, jak i bez AMP, a także na wszystkich urządzeniach.

### Formaty

Reklamy AMPHTML są elastyczne i dynamiczne, dzięki czemu umożliwiają stosowanie wielu formatów kreacji, takich jak karuzela, paralaksa i lightbox, by wymienić tylko kilka. Zacznij od wykorzystania szablonów reklam AMPHTML o otwartym kodzie źródłowym z sekcji [Przykłady](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Karuzela</td>
    <td>Paralaksa wideo</td>
    <td>Lightbox</td>
  </tr>
</table>

## Jak działają reklamy AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serwowanie reklam AMPHTML na stronach AMP', align='' ) }}

1. Wydawcy wstawiają miejsce na reklamę na stronie AMP za pomocą znacznika [`amp-ad`](../../../documentation/components/reference/amp-ad.md), określającego sieć reklamową, której chcą używać.
2. Środowisko uruchomieniowe AMP wysyła żądanie reklamy do określonej sieci reklamowej, aby pobrać tę reklamę. Sieci reklamowe zdolne do obsługi reklam AMPHTML zapewniają implementację [Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md), walidującą i podpisującą kreację.
3. Sieć reklamowa odpowiada za pomocą reklamy AMPHTML, a środowisko uruchomieniowe AMP renderuje reklamę na stronie AMP.

[tip type="note"] Do obsługi reklam AMPHTML na stronach bez AMP nie jest potrzebna żadna specjalna integracja. Sprawdź w swojej sieci reklamowej, czy obsługuje ona reklamy AMPHTML. [/tip]

## Serwowanie reklam AMPHTML

### Wydawcy

Aby obsługiwać formaty reklam sprzedawanych bezpośrednio w AMPHTML, musisz tworzyć reklamy zgodnie ze [specyfikacją reklam AMPHTML](a4a_spec.md) i dostarczać je za pomocą serwera reklam, obsługującego serwowanie reklam AMPHTML. Obecnie reklamy w formacie AMPHTML obsługują następujące serwery reklam:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Aby dostarczać reklamy AMPHTML poprzez swoje kanały pośrednie (np. wymiany, SSP itd.), należy użyć sieci obsługującej reklamy/serwera reklam z następującej [listy](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Agencje kreatywne

Agencje kreatywne muszą tworzyć reklamy zgodnie ze [specyfikacją reklam AMPHTML](a4a_spec.md). Inspirację i przykłady można znaleźć w szablonach reklam AMPHTML o otwartym kodzie źródłowym na stronie [Przykłady ](../../../documentation/examples/index.html). Można też użyć jednego z poniższych narzędzi do tworzenia reklam AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_wkrótce_)

### Sieci reklamowe / serwery reklam

Aby dostarczać reklamy AMPHTML do stron AMP, musisz utworzyć rozszerzenie [`amp-ad`](../../../documentation/components/reference/amp-ad.md) swojej sieci (chyba że już je masz), stosującej implementację [żądania reklamy Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md). Szczegóły znajdują się w artykule [Integracja z AMP w celu serwowania wyświetlanych reklam ](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md). Należy pamiętać, że do serwowania AMPHTML na strony bez AMP nie jest potrzebna żadna specjalna integracja.

## Tworzenie reklam AMPHTML

**Od zera**: reklamy AMPHTML muszą być zgodne ze [specyfikacją reklam AMPHTML](a4a_spec.md). Dema i przykłady można znaleźć w szablonach reklam AMPHTML o otwartym kodzie źródłowym na stronie [Przykłady ](../../../documentation/examples/documentation/amp-ad.html).

{\i1}Przy użyciu narzędzi{\i0}: do tworzenia kreacji AMPHTML możesz użyć dowolnego z poniższych narzędzi:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_wkrótce_)

### Walidacja składni reklamy AMPHTML

Po utworzeniu reklamy AMPHTML należy upewnić się, że stosowana jest w niej prawidłowa składnia AMPHTML. Dostępnych jest kilka opcji walidacji reklam AMPHTML, zależnych od używanego środowiska programistycznego:

- Użyj modułu [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator), aby zintegrować walidację ze skryptem CI.
- Użyj [walidatora AMP ](https://validator.ampproject.org/) do testów jednorazowych.
- Nawiąż współpracę z [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) i użyj punktu końcowego ich publicznego walidatora.

[tip type="note"] **UWAGA —** aby móc szybko renderować reklamy AMPHTML na stronach AMP (tzn. stosować rendering preferencyjny w Fast Fetch), składnia musi być prawidłowa. Jeśli składnia nie jest prawidłowa, reklama nadal będzie renderowana, ale nie tak szybko. [/tip]

## Obsługa reklam AMPHTML w RTB

Szczegółowe informacje na temat SSP i giełd reklam, które chcą obsługiwać reklamy AMPHTML w środowisku Real-Time Bidding (RTB) zawiera artykuł [Przewodnik implementacji dla giełd reklam RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md).

## FAQ

#### Czy są jakieś próbki reklam AMPHTML?

Tak. Kilka świetnie wyglądających szablonów reklam AMPHTML można znaleźć na stronie [Przykłady](../../../documentation/examples/documentation/amp-ad.html). Próbki te używają w AMP składników zaawansowanych.

#### Czy reklamy AMPHTML obsługują weryfikację stron trzecich i wykrywanie widoczności?

Tak, dostępna jest natywna obsługa weryfikacji i wykrywania widoczności za pomocą składnika [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (np. w ten sposób integruje się usługę Google ActiveView). Są również inni dostawcy, tacy jak MOAT, którzy aktywnie wdrażają taką obsługę.

#### Czy reklamy AMPHTML obsługują animacje oparte na osi czasu?

Tak. Patrz [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Większość reklam ma wybierane dotknięciem cele i konfigurowalne wyjścia z reklam. Czy reklamy AMPHTML mają podobny mechanizm?

Tak. Patrz [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Nie mogę znaleźć tego, czego potrzebuję, gdzie mogę zadać pytania?

- Polecamy [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) jako źródło odpowiedzi na pytania dotyczące AMP; członkowie społeczności AMP Project regularnie monitorują Stack Overflow, więc prawdopodobnie najszybciej otrzymasz tam odpowiedzi na swoje pytania.
- Dołącz do kanału [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877), aby znajdować rozwiązania i odpowiedzi.
- Jeśli napotkasz błąd w AMP lub masz propozycję funkcji AMP, zobacz artykuł [Zgłaszanie problemów z AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) w celu uzyskania informacji o zgłaszaniu problemu.
