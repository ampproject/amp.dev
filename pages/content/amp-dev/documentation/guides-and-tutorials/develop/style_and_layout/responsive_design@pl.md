---
$title: Tworzenie responsywnych stron AMP
$order: 5
description: Projektowanie responsywnych stron internetowych polega na budowaniu płynnie działających stron internetowych, które reagują na potrzeby użytkownika — stron dopasowanych do wielkości i orientacji ekranu urządzenia. Możesz osiągnąć...
components:
  - iframe
  - youtube
author: bpaduch
contributors:
  - pbakaus
---

## Wstęp

Projektowanie responsywnych stron internetowych polega na budowaniu płynnie działających stron internetowych, które reagują na potrzeby użytkownika — stron dopasowanych do wielkości i orientacji ekranu urządzenia. Możesz osiągnąć to z łatwością za pomocą AMP. AMP obsługuje wszystkie kategorie ekranów i urządzeń oraz zapewnia wbudowane składniki responsywne.

W tym przewodniku pokażemy Ci, jak możesz łatwo zastosować owe podstawy responsywności w AMP:

- [Sterowanie okienkiem na stronie](#controlling-the-viewport)
- [Tworzenie responsywnego układu](#creating-a-responsive-layout)
- [Skalowanie multimediów](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Dowiedz się z tego filmu więcej o projektowaniu responsywnym w AMP.']

## Sterowanie okienkiem na stronie <a name="controlling-the-viewport"></a>

[filter formats="websites, ads, stories"] W celu zoptymalizowania strony internetowej w taki sposób, aby jej zawartość była skalowana i mieściła się w oknie przeglądarki na dowolnym urządzeniu, należy określić element `meta` okienka na stronie. Element viewport informuje przeglądarkę o tym, jak skalować i powiększać widoczny obszar (okienko) strony internetowej.

Jakich jednak wartości użyć? W AMP już to określono za Ciebie. Jako część [wymaganego znacznika ](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) stron AMP musisz określić następujące okienko na stronie:

```html
<meta name="viewport" content="width=device-width" />
```

Są to typowe ustawienia okienka na stronie, których można użyć w przypadku stron responsywnych. Chociaż podanie wartości `initial-scale=1` nie jest wymagane w przypadku prawidłowej strony AMP, jest to zalecane, ponieważ ustawia poziom powiększenia równy 1 przy pierwszym załadowaniu strony. [/filter]

[filter formats="email"] Ta sekcja dotyczy jedynie witryn internetowych, reklam i relacji AMP. [/filter]

## <a id="creating-a-responsive-layout">Tworzenie responsywnego układu</a>

W projekcie responsywnym można użyć zapytań CSS [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), aby dostosować stylizację strony do różnych wymiarów ekranu bez konieczności zmiany jej zawartości. W AMP możesz nadal używać tych samych zapytań CSS `@media`. Dodatkowo, w celu uzyskania lepszej kontroli nad elementem AMP, możesz określić atrybut `media` w elemencie. Jest to szczególnie przydatne, gdy musisz pokazać lub ukryć element w zależności od zapytania o media. W sekcji [Kierowanie grafiką obrazu](#changing-the-art-direction-of-an-image) znajdziesz przykład użycia atrybutu `media`.

Zmiana rozmiaru każdego elementu w celu zmieszczenia go na ekranie może być trudna<sup><a href="#fn1" id="ref1">\*</a></sup>. W AMP można jednak z łatwością ustawić element jako responsywny za pomocą atrybutu `"layout=responsive"` i atrybutów `width` oraz `height`. Po zastosowaniu do elementu układu `responsive` element ten automatycznie zmieni rozmiar na szerokość elementu kontenera, a wysokość na podstawie współczynnika proporcji określonego za pomocą atrybutów `width` i `height`. Prawie wszystkie elementy AMP obsługują układ `responsive`; obsługiwane układy przedstawia dokumentacja referencyjna elementu.

Chociaż możesz z łatwością ustawić elementy jako responsywne za pomocą atrybutu `"layout=responsive"`, nadal musisz rozważyć, jak Twoje elementy będą wyglądać na wszystkich rozmiarach ekranów — w tym na komputerze i na tablecie. Częstym błędem jest zezwolenie, aby obraz był wyświetlany na całej szerokości ekranu, co powoduje, że obraz wykracza poza zamierzony rozmiar i wywiera złe wrażenie na użytkownikach urządzeń szerokoekranowych. Domyślnie, elementy z atrybutem `layout=responsponsive` zajmują całą szerokość kontenera elementu, często nieograniczoną (tzn. width=100%). Możesz poprawić sposób wyświetlania obrazów, ograniczając po prostu szerokość kontenera obrazu. Na przykład, ustawiając regułę "max-width" na "body" lub "main", możesz ograniczyć maksymalną szerokość wszystkich obrazów do określonej wartości.

##### Przykład: ograniczenie szerokości obrazów responsywnych

W poniższym przykładzie mamy obraz flowers (640 x 427 px), który chcemy wyświetlać na wszystkich rozmiarach ekranu, więc określiliśmy atrybuty `width` i `height` oraz ustawiliśmy układ `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

Chcemy jednak, aby obraz nie wykraczał poza zamierzony rozmiar, dlatego ustawiamy regułę `max-width` w kontenerze na 700 px za pomocą własnego kodu CSS:

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **CZYTAJ DALEJ —** więcej informacji o różnych układach w AMP zawiera przewodnik [Układ i zapytania o media](control_layout.md#the-layout-attribute). [/tip]

<a id="fn1"></a> [tip type="note"] **Dlaczego zmiana rozmiaru elementów w celu dopasowania ich do ekranu jest trudna, skoro mogę to łatwo zrobić za pomocą atrybutu `width=100%` style**?

Trudność polega na tym, że elementy responsywne są renderowane na stronie bez negatywnego wpływu na miary wydajności ani wrażenia użytkownika. Tak, można z łatwością uzyskać obrazy pasujące do ekranu za pomocą atrybutu "width=100%", ale czasami uderza to w wydajność. Przeglądarka musi najpierw pobrać obraz, aby uzyskać jego wymiary, następnie zmienić jego rozmiar odpowiednio do rozmiaru ekranu, a na koniec ponownie wygenerować stronę. W AMP ścieżka renderowania jest zoptymalizowana w taki sposób, aby najpierw generowany był układ strony z zachowaniem miejsc na obrazy na podstawie wymiarów podanych w składniku [`amp-img`](../../../../documentation/components/reference/amp-img.md) (przy użyciu tych liczb do ustalenia proporcji). Następnie pobierane są zasoby i generowana jest strona. Nie jest wymagana zmiana układu. [/tip]

## Skalowanie mediów do strony <a name="scaling-media-for-the-page"></a>

Prawdopodobnie najtrudniejszym aspektem projektowania responsywnego jest prawidłowe wyświetlanie multimediów na stronie w sposób odpowiedni do cech ekranu. W tej sekcji przyjrzymy się temu, w jaki sposób można osadzać responsywne filmy i obrazy na stronach AMP.

### Osadzanie filmów

Po umieszczeniu filmu na stronie internetowej chcesz mieć pewność, że użytkownik będzie widzieć jego zawartość i elementy sterujące (tzn. że nie będzie przepełniać okna). Zazwyczaj osiąga się to dzięki łączeniu zapytań CSS o media, kontenera i innego kodu CSS. W AMP wystarczy dodać element wideo do strony i określić w nim atrybut `layout=responsive` — bez dodatkowego kodu CSS.

##### Przykład: osadzanie filmu z YouTube

W poniższym przykładzie chcemy wyświetlać osadzony film z YouTube, odpowiadający rozmiarowi i orientacji ekranu danego urządzenia. Dzięki dodaniu atrybutu `"layout=responsive"` do elementu [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) rozmiar filmu jest zmieniany odpowiednio do okna, a jego proporcje są utrzymywane zgodnie z podanymi wartościami `width` i `height`.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Do stron AMP można dodać wiele typów filmów. Szczegóły znajdziesz na liście dostępnych [składników multimedialnych](../../../../documentation/components/index.html#media).

### Wyświetlanie responsywnych obrazów <a name="displaying-responsive-images"></a>

Obrazy stanowią dużą część strony internetowej (około [65% bajtów strony](http://httparchive.org/interesting.php#bytesperpage)). Obrazy powinny być widoczne co najmniej na ekranach o różnych rozmiarach i orientacjach (tzn. użytkownik nie musi przewijać, szczypać/powiększać, aby zobaczyć cały obraz). W AMP można to z łatwością zrobić za pomocą atrybutu `"layout=responsive"` (patrz [Dodawanie obrazów w AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). Poza podstawowym obrazem responsywnym, można serwować wiele zasobów obrazów, aby:

- [Wyświetlać wyraźne obrazy w odpowiedniej rozdzielczości](#serving-crisp-images-for-the-right-resolution)
- [Kierować grafiką obrazu](#changing-the-art-direction-of-an-image)
- [Zapewniać zoptymalizowane formaty obrazów](#providing-optimized-images)

#### Wyświetlanie wyraźnych obrazów w odpowiedniej rozdzielczości <a name="serving-crisp-images-for-the-right-resolution"></a>

W przypadku ekranów o wysokiej rozdzielczości (takich jak wyświetlacz Retina) należy zapewnić obrazy, które wyglądają ostro i wyraźnie; nie należy jednak używać tego samego obrazu na urządzeniach o niskiej rozdzielczości, ponieważ spowoduje to niepotrzebne dodatkowe obciążenie. Na stronach bez AMP i z AMP można wyświetlać obraz odpowiedni do gęstości pikseli ekranu za pomocą atrybutu `srcset` z deskryptorem szerokości (`w`).

[tip type="note"] **UWAGA —** działa również selektor srcset oparty na parametrze DPR (`x`); dla większej elastyczności zalecamy jednak użycie selektora `w`. Wcześniej (w starej propozycji srcset) deskryptor `w` opisywał szerokość okienka na stronie, natomiast teraz opisuje szerokość źródłowego pliku obrazu, co pozwala programowi użytkownika obliczyć efektywną gęstość pikseli każdego obrazu i wybrać odpowiedni obraz do renderowania. [/tip]

##### Przykład: wyświetlanie wyraźnego obrazu mieszczącego się na ekranie

W poniższym przykładzie mamy kilka plików graficznych, które mają ten sam współczynnik proporcji, ale różną rozdzielczość. Dzięki dostępności obrazów o różnej rozdzielczości przeglądarka może wybrać obraz najlepiej pasujący do rozdzielczości urządzenia. Dodatkowo określiliśmy rozmiar, w którym ma być renderowany obraz:

- W przypadku szerokości okienka na stronie do 400 px, renderowany ma być obraz na 100% szerokości okienka.
- W przypadku szerokości okienka na stronie do 900 px, renderowany ma być obraz na 75% szerokości okienka.
- W przypadku szerokości okienka przekraczającej 900 px renderowany ma być obraz o szerokości 600 px.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

Mamy na przykład urządzenie, na którym szerokość okienka na stronie wynosi 412 px, a parametr DPR jest równy 2,6. Powyższy kod wymusza wyświetlanie obrazu na 75% szerokości okienka na stronie, więc przeglądarka wybiera obraz zbliżony do 803 px (412*0,75 * 2,6), czyli plik `apple-800.jpg`.

[tip type="read-on"] **CZYTAJ DALEJ —** więcej informacji na temat korzystania z atrybutu srcset i rozmiarów w AMP, zapoznaj się z przewodnikiem [Responsywne obrazy z atrybutem srcset, rozmiary i wysokości](art_direction.md). [/tip]

#### <a id="changing-the-art-direction-of-an-image">Kierowanie grafiką obrazu</a>

Kierowanie grafiką odnosi się do dostosowywania cech wizualnych obrazu do określonych punktów wstrzymania. Na przykład, zamiast po prostu przeskalować obraz do zwężającego się ekranu, można wyświetlić przyciętą, zwężoną wersję obrazu lub zupełnie inne obrazy w różnych punktach wstrzymania. W języku HTML można to osiągnąć za pomocą elementu `picture`. W AMP kierowanie grafiką można osiągnąć poprzez użycie atrybutu `media`.

##### Przykład: obrazy o różnych rozmiarach dla różnych punktów wstrzymania

W poniższym przykładzie mamy 3 różne przycięte zdjęcia kota, które chcemy wyświetlać w różnych punktach wstrzymania. Tak więc, jeśli szerokość okienka na stronie wynosi:

- 670 px lub większa, wyświetlany ma być plik `cat-large.jpg` (650 x 340 px)
- 470–669 px, wyświetlany ma być plik `cat-medium.jpg` (450 x 340 px)
- 469 px lub mniej, wyświetlany ma być plik `cat-small.jpg` (226 x 340 px)

[tip type="note"] **UWAGA —** Jako że chcieliśmy, aby obrazy miały stałe rozmiary (tzn. nie były przekoszone), nie określiliśmy wartości układu, która domyślnie będzie ustawiona na <kod>layout=fixed, ponieważ ustawiliśmy szerokość i wysokość. Więcej informacji znajdziesz w artykule <a href="control_layout.md#what-if-the-layout-attribute-isnt-specified" data-md-type="link">„Co jeśli atrybut layout nie jest określony”?</a> [/tip]</kod>

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **CZYTAJ DALEJ —** więcej informacji o kierowaniu grafiką w AMP zawiera przewodnik [Kierowanie grafiką za pomocą atrybutów srcset, sizes i wysokości](art_direction.md). [/tip]

#### Zapewnianie zoptymalizowanych obrazów <a name="providing-optimized-images"></a>

Dostarczanie szybko ładowanych stron wymaga zoptymalizowanych obrazów — pod względem rozmiaru, jakości i formatu. Zawsze zmniejszaj rozmiary plików do najniższego dopuszczalnego poziomu jakości. Są różne narzędzia, które można wykorzystać do „zgniatania” obrazów (np. [ImageAlph](http://pngmini.com/lossypng.html) lub [TinyPNG](https://tinypng.com/)). Jeśli chodzi o formaty obrazów, niektóre z nich mają większe możliwości kompresji niż inne (np. WebP i JPEG XR w porównaniu do JPEG). Chcesz zapewnić użytkownikowi optymalny obraz, jak również upewnić się, że obraz jest obsługiwany przez przeglądarkę użytkownika ([nie wszystkie przeglądarki obsługują wszystkie formaty obrazów](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

W języku HTML można serwować różne formaty obrazów za pomocą znacznika `picture`. W AMP, chociaż znacznik `picture` nie jest obsługiwany, można serwować różne obrazy za pomocą atrybutu `fallback`.

[tip type="read-on"] **CZYTAJ DALEJ —** więcej informacji o zasobach rezerwowych zawiera przewodnik [Elementy zastępcze i zasoby rezerwowe](placeholders.md). [/tip]

W AMP serwowanie zoptymalizowanych obrazów można osiągnąć na dwa sposoby:

- Programiści używający formatów obrazów, które nie są powszechnie obsługiwane, takich jak WebP, mogą skonfigurować swój serwer do przetwarzania nagłówków przeglądarki `Accept` i odpowiadania za pomocą liczby bajtów obrazu i odpowiedniego nagłówka [`Contentt-Type`](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/). Pozwala to uniknąć pobierania przez przeglądarkę typów obrazów, których nie obsługuje. Przeczytaj więcej o [negocjowaniu zawaretości](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).[sourcecode:html] Accept: image/webp,image/apng,image/_,_/\*;q=0.8 [/sourcecode]
- Podaj zagnieżdżone zasoby rezerwowe obrazu, jak w poniższym przykładzie.

##### Przykład: serwowanie innych formatów obrazów

W poniższym przykładzie, jeśli przeglądarka obsługuje WebP, serwowany ma być plik mountain.webp, a w przeciwnym razie plik mountain.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

Jako miły bonus, niektóre serwery buforujące, takie jak Google AMP Cache, automatycznie skompresują i przekonwertują obrazy do formatu WebP i odpowiednich rozdzielczości, jeśli tego nie zrobisz. Nie wszystkie platformy używają jednak serwerów buforujących, więc i tak należy ręcznie zoptymalizować obrazy po swojej stronie.

[tip type="read-on"] **CZYTAJ DALEJ —** więcej informacji na temat optymalizacji obrazów, którą stosuje usługa Google AMP Cache, przedstawia wpis na blogu [„Google AMP Cache, AMP Lite, and the need for speed”](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Inspirujące przykłady

Oto kilka przykładów, które — mamy nadzieję — zainspirują Cię do stworzenia responsywnych stron AMP:

#### Produkcja

- [Getty Images „2016 in Focus” ](http://www.gettyimages.com/2016/)
- [Przewodnik po prezentach świątecznych BRIT + CO](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Made by AMP

- [Przykłady](../../../../documentation/examples/index.html)
- [Szablony](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
