---
layout: page
title: Zwiększanie wydajności przez AMP
order: 2
locale: pl
---

Połączenie następujących optymalizacji sprawia, że strony AMP są tak szybkie i sprawiają wrażenie, że ładują się natychmiast:

{% include toc.html %}

Jeśli wolisz słuchać niż czytać, w następującym filmie szef zespołu AMP Malte Ubl przedstawia przeglądowe informacje podobne do zamieszczonych w kolejnych akapitach.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Zezwalaj tylko na skrypty asynchroniczne

Język JavaScript ma potężne możliwości,
może zmodyfikować niemal każdy aspekt strony,
ale może także zablokować konstrukcję modelu DOM i opóźnić renderowanie stron
(zobacz też [Dodawanie interaktywności przy użyciu JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
Aby uniemożliwić skryptom JavaScript opóźnianie renderowania stron,
AMP zezwala wyłącznie na asynchroniczne skrypty JavaScript. 

Strony AMP nie mogą zawierać żadnego napisanego przez autora skryptu JavaScript.
Zamiast korzystania z języka JavaScript,
interaktywne funkcje stron są obsługiwane w niestandardowych elementach AMP.
Niestandardowe elementy AMP mogą zawierać wewnątrz skrypt JavaScript,
ale zaprojektowano je starannie w taki sposób, aby nie powodowały one pogorszenia wydajności.

Chociaż skrypty JS niezależnych podmiotów są dozwolone w ramkach iframe,
nie mogą one blokować renderowania.
Jeśli na przykład niezależny skrypt JS używa
[fatalnej dla wydajności funkcji API `document.write`](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/),
nie blokuje ona renderowania strony głównej.

## Statycznie nadaj rozmiary wszystkim zasobom

Zasoby zewnętrzne, takie jak obrazy, reklamy lub ramki iframe muszą informować o swoim rozmiarze w HTML,
dzięki czemu AMP może określić rozmiar i pozycję każdego elementu przed pobraniem zasobów.
AMP ładuje układ strony bez oczekiwania na pobranie jakichkolwiek zasobów.

AMP rozłącza układ dokumentu od układu zasobów.
Tylko jedno żądanie HTTP jest potrzebne do wyrenderowania całego dokumentu
([i czcionek](#font-triggering-must-be-efficient)).
Ponieważ AMP zoptymalizowano w celu uniknięcia kosztownego przeliczania stylów i układów w przeglądarce,
po załadowaniu zasobu nie ma żadnego ponownego rozmieszczania.

## Nie pozwól, aby mechanizmy rozszerzeń blokowały renderowanie

AMP nie pozwala, aby mechanizmy rozszerzeń blokowały renderowanie stron.
AMP obsługuje rozszerzenia dla takich obiektów jak
[ramki lightbox](/docs/reference/extended/amp-lightbox.html),
[umieszczone elementy z Instagrama](/docs/reference/extended/amp-instagram.html),
[tweety](/docs/reference/extended/amp-twitter.html) itp.
Chociaż wymagają one dodatkowych żądań HTTP,
te żądania nie blokują układu strony ani renderowania. 

Każda strona korzystająca z niestandardowego skryptu musi poinformować system AMP,
że może ona mieć niestandardowy znacznik.
Na przykład skrypt [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
informuje system, że w dokumencie wystąpi znacznik `amp-iframe`.
AMP tworzy ramkę iframe zanim otrzyma informacje, co się w niej znajdzie: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Usuń wszystkie niezależne skrypty JavaScript ze ścieżki krytycznej

Niezależne skrypty JS lubią korzystać z synchronicznego ładowania JS.
Lubią one także korzystać z funkcji `document.write` w celu tworzenia dodatkowych skryptów synchronicznych.
Jeśli na stronie jest na przykład pięć reklam i każda z nich wykonuje trzy synchroniczne operacje wczytywania
z czasem oczekiwania łącza wynoszącym 1 sekundę,
czas ładowania samych tylko skryptów JS wynosi 18 sekund. 

Strony AMP umożliwiają korzystanie z niezależnych skryptów JavaScript, ale tylko w izolowanych ramkach iframe.
Wyrzucenie tych skryptów do ramek iframe pozwala wyeliminować blokowanie wykonywania strony głównej.
Nawet jeśli wyzwalają one liczne przeliczenia stylów,
ich niewielkie ramki iframe mają bardzo mały model DOM. 

Przeliczenia stylów i układów odpowiadają rozmiarowi modelu DOM,
dlatego przeliczenia ramek iframe są bardzo szybkie w porównaniu
z przeliczaniem stylów i układów na stronie.

## Cały CSS musi być wstawiany i powiązany z rozmiarem

CSS blokuje cały rendering, blokuje ładowanie strony i ma tendencję do rozrastania się.
Na stronach AMP HTML dozwolone są tylko style wstawiane.
Pozwala to usnąć jedno, a często wiele żądań HTTP z krytycznej ścieżki renderowania
w porównaniu z większością stron internetowych.

Ponadto wstawiany arkusz stylów ma rozmiar maksymalny 50 kilobajtów.
Chociaż taki rozmiar pozwala na tworzenie bardzo wyrafinowanych stron,
wymaga on również od autora zachowania zasad „higieny CSS”.

## Wyzwalanie czcionek musi być efektywne

Czcionki internetowe są bardzo duże, dlatego
[optymalizacja czcionek internetowych](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
ma kluczowe znaczenie dla wydajności.
Na typowej stronie z kilkoma skryptami synchronicznymi i kilkoma zewnętrznymi arkuszami stylów,
przeglądarka czeka i czeka na rozpoczęcie pobierania tych olbrzymich czcionek, aż to wszystko się wydarzy.

System AMP deklaruje zero żądań HTTP, dopóki nie rozpocznie się pobieranie czcionek.
Jest to możliwe tylko dlatego, że cały kod JS w AMP ma atrybut async
i dozwolone są tylko style wstawiane;
nie ma żądań HTTP blokujących pobieranie czcionek przez przeglądarkę.

## Minimalizuj przeliczanie stylów

Podczas każdego pomiaru wyzwalane jest przeliczanie stylów, które jest kosztowne,
ponieważ przeglądarka musi rozmieścić całą stronę.
Na stronach AMP wszystkie odczyty DOM wydarzają się przed wszystkimi zapisami.
Dzięki temu na każdą ramkę przypada maksymalnie jedno przeliczenie stylów.

Dowiedz się więcej o wpływie przeliczeń stylów i układów na
[wydajność renderowania](https://developers.google.com/web/fundamentals/performance/rendering/).

## Uruchamiaj tylko animacje z akceleracją sprzętową GPU

Jedyną metodą przyspieszenia animacji jest uruchamianie ich na procesorze graficznym (GPU).
Procesor GPU ma informacje o warstwach, obsługuje wykonywanie operacji na tych warstwach,
może je przenosić, może je wygaszać, ale nie może zaktualizować układu strony;
przekaże to zadanie do przeglądarki, a to nie jest pożądane.

Reguły dla arkuszy stylów CSS powiązanych z animacjami zapewniają możliwość przyspieszania animacji przez procesor GPU.
W szczególności tylko AMP zezwala na animację i przejście dla transformacji i przezroczystości
, dzięki czemu ponowne rozmieszczenie strony nie jest wymagane.
Dowiedz się więcej o
[używaniu transformacji i przezroczystości dla zmian animacji](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Ustal priorytety ładowania zasobów

AMP steruje pobieraniem wszystkich zasobów i ustala priorytety ładowania zasobów,
ładując tylko to, co potrzebne i pobierając z wyprzedzeniem zasoby ładowane z opóźnieniem. 

Kiedy AMP pobiera zasoby, optymalizuje operacje pobierania
w taki sposób, aby najważniejsze zasoby były pobierane jako pierwsze.
Obrazy i reklamy są pobierane tylko wtedy, kiedy jest prawdopodobne, że zostaną zobaczone przez użytkownika,
w części strony widocznej na ekranie lub jeśli jest prawdopodobne, że użytkownik szybko przewinie do nich.  

AMP pobiera także z wyprzedzeniem zasoby ładowane z opóźnieniem.
Zasoby są ładowane tak późno, jak to możliwe, ale pobierane z wyprzedzeniem tak wcześnie, jak to możliwe.
Dzięki temu strony ładują się bardzo szybko, ale procesor jest używany tylko wtedy,
gdy zasoby są rzeczywiście wyświetlane dla użytkowników.

## Ładuj strony w mgnieniu oka

Nowa [funkcja API preconnect](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
jest intensywnie używana w celu zapewnienia maksymalnej możliwej szybkości żądań HTTP w momencie ich wysyłania.
Dzięki temu
strona może zostać wyrenderowana zanim jeszcze użytkownik jawnie zadeklaruje chęć przejścia do niej;
strona może być już dostępna, kiedy użytkownik rzeczywiście wybierze ją,
dzięki czemu ładowanie nastąpi błyskawicznie.

Chociaż renderowanie z wyprzedzeniem można zastosować do wszystkich treści internetowych,
może ono w znacznym stopniu wykorzystać przepustowość i czas procesora. AMP zoptymalizowano z myślą o ograniczeniu tych dwóch czynników. W ramach renderowania z wyprzedzeniem pobierane są tylko zasoby w części strony widocznej na ekranie
i nie obejmuje ono elementów, których wyrenderowanie byłoby kosztowne w aspekcie wykorzystania procesora.

Kiedy dokumenty AMP są renderowane z wyprzedzeniem w celu błyskawicznego ładowania,
faktycznie pobierane są tylko zasoby w części strony widocznej na ekranie.
Podczas renderowania z wyprzedzeniem dokumentów AMP w celu błyskawicznego ładowania
nie są pobierane zasoby, które mogłyby znacząco obciążyć procesor (jak np. ramki iframe niezależnych dostawców). 

Dowiedz się więcej,
[dlaczego AMP HTML nie wykorzystuje w pełni skanera wczytywania z wyprzedzeniem](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Pomóż przyspieszyć AMP
AMP to projekt Open Source.
Potrzebujemy Twojej pomocy, aby jeszcze bardziej przyspieszyć AMP.
Dowiedz się, [jak dodać własne materiały](/docs/support/contribute.html).
