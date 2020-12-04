---
"$title": Best practices for creating a Web Story ad
"$order": '16'
description: Web Stories are a full-screen tappable experience that immerses readers in the content. Ads that appears in Web Stories should have a consistent and cohesive design with the Web Stories UX.
formats:
- ads
- stories
---

Web Stories are a full-screen tappable experience that immerses readers in the content. Ads that appears in Web Stories should have a consistent and cohesive design with the Web Stories UX. This prevents a jarring or interruptive user experience. This guide demonstrates how to build an ad for Web Stories.

## Web Story ad principles

Current ad formats, such as banners and boxes, do not integrate well with the AMP Story format. Classic ads are slow, interruptive, and feel out of place within the Story experience.

Web Story ads conform to the following principles:

- Prawidłowa reklama AMPHTML: zgodna z tą samą specyfikacją techniczną, co klasyczna reklama [AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md).
- Po pierwsze grafika: zachęcająca, śmiała, zależna od kontekstu.
- Natywna: strona reklamowa musi mieć takie same wymiary, jak organiczna strona relacji.
- Ten sam model interakcji: użytkownik może przejść do następnego ekranu tak, jak z organicznej strony relacji.
- Szybka: reklama nigdy nie jest wyświetlana użytkownikowi załadowana do połowy.

To be consistent with these principles, the Web Story runtime determines the right placement of an ad page amidst the Web Story. Read more about ad placement mechanics in [Advertise in Web Stories](advertise_amp_stories.md).

## Sample Web Story ad

Web Story ads are AMPHTML ads, but have required meta tag data, meet defined layout specifications and required UI elements. A Web Story ad will always include a call to action(CTA) button and an ad label displayed as a text disclaimer at the top of the page.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Przykład reklamy fabularnej AMP', caption='Przykład reklamy fabularnej AMP', align='' ) }}

To keep the user experience consistent, the Web Story runtime is responsible for rendering the ad label and the CTA button.

[tip type="important"] **IMPORTANT –** Only the CTA button is clickable in an Web Story ad, so keep this in mind when developing your creative. [/tip]

## Meta tag data

Meta tag data specifies that the ad meets the Web Story format, sets the CTA button text enum, directs where the button will send the user and what type of page it is.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

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
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

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

## Ad landing page

You can specify one of three options for an Web Story ad landing page.

- `STORY`: strona docelowa to [relacja sponsorowana](story_ads_best_practices.md#sponsored-story).
- `AMP`: strona docelowa to prawidłowa strona AMP.
- `NONAMP`: każdy inny typ strony internetowej

## Layout

AMP Stories are horizontal and full-screen. Story ads are required to match this format to provide a consistent user experience.

## Overlay dimensions

The ad label overlays a dark gradient bar across the entire width of the ad and will stretch from the top to 46px down.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstracja nakładki reklamowej', caption='Nakładka reklamy znajduje się na górze', align='' ) }}

Przycisk CTA znajduje się 32 px od dołu i jest wyśrodkowany w poziomie. Ma wymiary 120 px na 36 px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstracja przycisku CTA', caption='Przycisk CTA znajduje się blisko dołu', align='' ) }}

## Images and video

Images and video included in an AMP Story ad should be 4:3 standard full-screen. Ads that include video should use a [poster](../../../documentation/components/reference/amp-video.md#poster) The recommended dimensions for a poster image are 720p (720w x 1280h) .

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

### Images

Background images can be scaled to full screen. The following CSS is a successful way to crop and center videos and images.

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

### Video

#### Specify `<source>` vs `src`

When specifying the source for an [`amp-video`](../../../documentation/components/reference/amp-video.md)

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

#### Size & length of video

For optimal performance, you should aim to provide videos that are no larger than 4 MB. Smaller file sizes allow for faster downloading, so keep things as small as possible.

#### Video formats

If you can only provide a single video format, provide **MP4**. However, where possible, use **HLS** video and specify MP4 as a fallback for browsers that do not yet support HLS video. HLS performs adaptive bitrate streaming, where the quality of the video can be altered to best suit the user's network connection.

[tip type="note"] **UWAGA —** format wideo HLS nie jest obsługiwany w przeglądarce Chrome dla komputerów (nawet poprzez emulację), dlatego też dla ruchu z komputerów na stronie wymagane jest podanie rezerwowego formatu MP4. Aby debugować filmy HLS, należy użyć rzeczywistego urządzenia przenośnego i funkcji debugowania przez USB. [/tip]

#### Video resolution

Web Story videos are always vertical (i.e., portrait view), with an expected aspect ratio of 16:9. Use the recommended resolution for the video streaming type:

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

Read more about creating an [Web Story here](../start/create_successful_stories.md).
