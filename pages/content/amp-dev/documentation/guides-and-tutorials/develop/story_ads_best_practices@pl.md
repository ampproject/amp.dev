---
'$title': Najlepsze praktyki tworzenia reklam fabularnych Web
$order: 16
description: Relacje Web to interaktywne, pełnoekranowe materiały, angażujące czytelników w treść. Reklamy wyświetlane w relacjach Web powinny być spójne z relacjami Web.
formats:
  - ads
  - stories
---

Relacje Web to interaktywne, pełnoekranowe materiały, angażujące czytelników w treść. Reklamy wyświetlane w relacjach Web powinny być spójne z relacjami Web. Zapobiega to irytowaniu użytkowników lub zakłócaniu ich wrażeń. Ten przewodnik pokazuje, jak stworzyć reklamę fabularną Web.

## Zasady dotyczące reklam fabularnych

AMP Obecnie stosowane formaty reklam, takie jak banery i boksy, nie integrują się dobrze z formatem AMP Story. Klasyczne reklamy są w relacjach powolne, irytujące i nie na miejscu.

Reklamy fabularne Web muszą być zgodne z następującymi zasadami:

- Prawidłowa reklama AMPHTML: zgodna z tą samą specyfikacją techniczną, co klasyczna reklama [AMPHTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md).
- Po pierwsze grafika: zachęcająca, śmiała, zależna od kontekstu.
- Natywna: strona reklamowa musi mieć takie same wymiary, jak organiczna strona relacji.
- Ten sam model interakcji: użytkownik może przejść do następnego ekranu tak, jak z organicznej strony relacji.
- Szybka: reklama nigdy nie jest wyświetlana użytkownikowi załadowana do połowy.

Aby zachować zgodność z tymi zasadami, środowisko uruchomieniowe relacji Web określa właściwe umieszczenie strony z reklamą w relacji Web. Więcej informacji o mechanice umieszczania reklam zawiera artykuł [Reklama w relacjach internetowych](advertise_amp_stories.md).

## Przekładowa reklama fabularna

Reklamy fabularne AMP są reklamami AMPHTML, ale mają wymagane tagi meta, spełniają wymogi określonych specyfikacji układu i mają wymagane elementy UI. Reklama fabularna Web zawsze będzie zawierać przycisk wezwania do działania (CTA) oraz etykietę reklamy, wyświetlaną jako zastrzeżenie tekstowe u góry strony.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Przykład reklamy fabularnej AMP', caption='Przykład reklamy fabularnej AMP', align='' ) }}

Aby zapewnić spójność wrażeń użytkowników, za renderowanie etykiety reklamy i przycisku CTA odpowiada środowisko uruchomieniowe relacji Web.

[tip type="important"] **WAŻNE — ** w reklamie fabularnej Web można kliknąć tylko przycisk CTA, więc pamiętaj o tym podczas tworzenia swojej kreacji. [/tip]

## Dane tagów meta

Dane tagów meta określają, że reklama ma format Web Story, ustawiają wyliczenie tekstów przycisku CTA, określają stronę docelową przycisku i jej typ.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://ampjs.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Zalecane jest wybranie z dostępnych opcji tekstu przycisku CTA tagu amp-cta-type. W razie potrzeby AMP automatycznie zlokalizuje predefiniowane opcje.

Niestandardowy tekst jest dozwolony, ale trzeba będzie zaimplementować własną lokalizację.

## Wyliczenie tekstów przycisku wezwania do działania <a name="call-to-action-button-text-enum"></a>

Przycisk wezwania do działania można skonfigurować przy użyciu predefiniowanego zestawu opcji:

- `APPLY_NOW`: „Zastosuj teraz”
- `BOOK_NOW`: „Zarezerwuj”
- `BUY_TICKETS`: „Kup bilety”
- `DOWNLOAD`: „Pobierz”
- `EXPLORE`: „Sprawdź teraz”
- `GET_NOW`: „Uzyskaj teraz”
- `INSTALL`: „Zainstaluj teraz”
- `LISTEN`: „Posłuchaj teraz”
- `MORE`: „Więcej”
- `OPEN_APP`: „Otwórz aplikację”
- `ORDER_NOW`: „Zamów teraz”
- `PLAY`: „Zagraj”
- `READ`: „Przeczytaj teraz”
- `SHOP`: „Kup teraz”
- `SHOWTIMES`: „Godziny pokazów”
- `SIGN_UP`: „Zarejestruj się”
- `SUBSCRIBE`: „Subskrybuj teraz”
- `USE_APP`: „Użyj aplikacji”
- `VIEW`: „Wyświetl”
- `WATCH`: „Obejrzyj”
- `WATCH_EPISODE`: „Obejrzyj odcinek”

[tip type="note"] **UWAGA —** głębokie linki do aplikacji nie są obsługiwane, ale linki do strony App Store lub strony sklepu Google Play są obsługiwane przy użyciu protokołu http/https. Wyliczenie tekstów przycisku CTA jest określone w ładunku odpowiedzi na reklamę. [/tip]

Jeśli potrzebna jest pomoc dotycząca wyliczania tekstów nowego przycisku CTA, otwórz [problem na GitHub](https://github.com/ampproject/amphtml/issues/new).

## Strona docelowa reklamy

Można określić jedną z trzech opcji strony docelowej reklamy fabularnej Web.

- `STORY`: strona docelowa to [relacja sponsorowana](story_ads_best_practices.md#sponsored-story).
- `AMP`: strona docelowa to prawidłowa strona AMP.
- `NONAMP`: każdy inny typ strony internetowej

## Układ

Relacje AMP są poziome i pełnoekranowe. Reklamy fabularne muszą być dopasowane do tego formatu, aby zapewnić spójne wrażenia użytkownika.

## Wymiary nakładki

Etykieta reklamy nakładana jest na pasek z ciemnym gradientem na całej szerokości reklamy i rozciąga się od góry do 46 px w dół.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstracja nakładki reklamowej', caption='Nakładka reklamy znajduje się na górze', align='' ) }}

Przycisk CTA znajduje się 32 px od dołu i jest wyśrodkowany w poziomie. Ma wymiary 120 px na 36 px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstracja przycisku CTA', caption='Przycisk CTA znajduje się blisko dołu', align='' ) }}

## Obrazy i filmy

Obrazy i filmy zawarte w reklamie fabularnej AMP powinny być w standardzie pełnoekranowym 4:3. Reklamy zawierające filmy powinny mieć [plakat](../../../documentation/components/reference/amp-video.md#poster). Zalecane wymiary obrazu plakatu to 720p (720 szer. x 1280 wys.) .

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Obrazy

Obrazy tła można skalować do pełnego ekranu. Poniższy CSS to skuteczna metoda kadrowania i środkowania filmów oraz obrazów.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Wideo

#### Określ `<source>` vs `src`

Podczas określania źródła dla [`amp-video`](../../../documentation/components/reference/amp-video.md)

Przykład: określanie wielu plików źródłowych

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Rozmiar i długość filmu

W celu zapewnienia optymalnej wydajności należy dążyć do stosowania filmów o rozmiarze nie większym niż 4 MB. Mniejsze rozmiary plików pozwalają na szybsze pobieranie, więc należy stosować jak najmniejsze rozmiary.

#### Formaty wideo

Jeśli możesz podać tylko jeden format wideo, użyj formatu **MP4**. Jeśli jednak jest to możliwe, należy użyć protokołu **HLS** i określić MP4 jako ustawienie rezerwowe dla przeglądarek, które nie obsługują jeszcze protokołu HLS. Serwer HLS wykonuje transmisje strumieniowe z adaptacyjną szybkością transmisji bitów, w których jakość sygnału wideo można zmienić, aby jak najlepiej odpowiadała połączeniu sieciowemu użytkownika.

[tip type="note"] **UWAGA —** format wideo HLS nie jest obsługiwany w przeglądarce Chrome dla komputerów (nawet poprzez emulację), dlatego też dla ruchu z komputerów na stronie wymagane jest podanie rezerwowego formatu MP4. Aby debugować filmy HLS, należy użyć rzeczywistego urządzenia przenośnego i funkcji debugowania przez USB. [/tip]

#### Rozdzielczość wideo

Filmy w relacjach Web są zawsze wyświetlane w widoku pionowym, z oczekiwanym współczynnikiem proporcji 16:9. Należy stosować rozdzielczość zalecaną dla danego typu strumieniowej transmisji wideo:

<table>
  <thead>
    <tr>
     <th>Typ transmisji strumieniowej wideo</th>
     <th>Rozdzielczość</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Nieadaptacyjna</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptacyjna</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **UWAGA —** w przypadku urządzeń przenośnych, które mają współczynnik proporcji inny niż 16:9, obraz może być przycięty w poziomie lub pionie w celu dopasowania go do okienka. [/tip]

#### Kodek wideo

1. Do MP4 używaj kodeka `H.264`.
2. Do WEBM używaj kodeka `VP9`.
3. Do HLS lub DASH używaj kodeka `H.264`.

#### Jakość wideo

##### Optymalizacje transkodowania

Do kodowania filmów i dostosowywania jakości wideo podczas kodowania można używać różnych narzędzi. Oto tylko kilka z nich:

<table>
  <thead>
    <tr>
     <th>Narzędzie</th>
     <th>Uwagi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Zalecane optymalizacje:       <ul>         <li>Do MP4 używaj <code>-crf 23</code>.</li>         <li>Do WEBM używaj <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Zalecane optymalizacje:       <ul>         <li>Do MP4 używaj <code>-crf 23</code>.</li>         <li>Do WEBM używaj <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Koder, który może również generować wideo w formacie HLS, z listą odtwarzania włącznie.</td>
    </tr>
  </tbody>
</table>

##### Rozmiar segmentu HLS

Upewnij się, że rozmiar segmentów HLS zazwyczaj nie przekracza 10 sekund czasu trwania.

## Animacja

Animacji w relacjach dotyczy kilka zastrzeżeń, takich jak koncepcja „widoczności”. Na przykład na naszym „3-okienkowym” pulpicie kreacja może być widoczna na stronie, ale nie jest jeszcze w centrum uwagi. Może sprawiać problemy, jeśli żądanym efektem jest uruchamianie animacji, gdy strona znajduje się w centrum uwagi.

Aby w tym pomóc, AMP doda specjalny atrybut `amp-story-visible` do treści kreacji, gdy będzie ona punktem centralnym we wszystkich kontekstach serwowania reklam. Zalecane jest uruchamianie animacji na podstawie tego sygnału.

Przykład: animacja ta zostanie uruchomiona, gdy strona uzyska fokus, a następnie ponownie zostanie uruchomiona, gdy użytkownik kliknie inną stronę relacji i powróci.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Relacja sponsorowana <a name="sponsored-story"></a>

Relacja sponsorowana istnieje jako adres URL w Internecie, umożliwiający kierowanie ruchu użytkowników do relacji sponsorowanej za pomocą przycisku wezwania do akcji w reklamie fabularnej AMP. Relacja sponsorowana to relacja AMP, ale z naciskiem na wciągające, ekspansywne wrażenia z reklamy.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='Przycisk CTA kieruje do relacji sponsorowanej', caption='Przycisk CTA kieruje do relacji sponsorowanej', align='' ) }}

Dowiedz się więcej o tworzeniu [relacji Web tutaj](../start/create_successful_stories.md).
