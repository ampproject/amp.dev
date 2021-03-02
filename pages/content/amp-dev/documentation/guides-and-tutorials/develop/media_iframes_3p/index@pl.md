---
'$title': Dodawanie obrazów i filmów
$order: 8
description: Podobnie jak na zwykłej stronie HTML, AMP pozwala na osadzanie obrazów, filmów i treści audio. Dowiedz się, czym różnią się odpowiedniki AMP i dowiedz się, jak...
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Podobnie jak na zwykłej stronie HTML, AMP pozwala na osadzanie **obrazów**, **filmów** i treści **audio**. Dowiedz się, czym różnią się odpowiedniki AMP i jak umieszczać je w swoich stronach.

## Dlaczego nie `<img>`, `<video>` i `<audio>`?

AMP nie obsługuje w celu wyświetlania multimediów domyślnych odpowiedników HTML, takich jak `<img>`. Zapewniamy równoważne składniki z następujących powodów:

- Musimy zrozumieć układ strony przed załadowaniem zasobów, co jest kluczowe dla [obsługi wstępnego ładowania pierwszego okienka na stronie](../../../../about/how-amp-works.html#size-all-resources-statically).
- Musimy kontrolować żądania sieci, aby [leniwie ładować zasoby i skutecznie nadawać im priorytety](../../../../about/how-amp-works.html#prioritize-resource-loading)

Przestroga: chociaż nie są obsługiwane, _będą_ one renderować, ale AMP nie będzie wykonywać [walidacji Twoich stron](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) i nie osiągniesz wszystkich korzyści, jakie zapewnia AMP.

## Obrazy

Umieść obraz na swojej stronie, używając elementu [`amp-img`](../../../../documentation/components/reference/amp-img.md):

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

W tym najprostszym przykładzie obraz będzie wyświetlany z określoną stałą wysokością i szerokością. Należy jawnie ustawić co najmniej szerokość i wysokość.

#### Wyświetlanie obrazów przy wyłączonej obsłudze JavaScript

Składnik [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) jest zależny od kodu JavaScript, więc jeśli użytkownik wyłączy skrypty, obrazy nie będą wyświetlane. W tym przypadku należy zapewnić zasoby rezerwowe obrazu za pomocą znaczników `<img>` i `<noscript>`:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Układy zaawansowane

AMP znacznie ułatwia tworzenie w pełni responsywnych obrazów w porównaniu do standardowego CSS/HTML. W jego najbardziej podstawowej formie wszystko, co musisz zrobić, to dodać atrybut `layout="responsive"`:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o [zaawansowanych technikach generowania układu](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Sposób działania i elementy zastępcze

Środowisko uruchomieniowe AMP HTML może efektywnie zarządzać zasobami obrazów, wybierając opóźnienie lub nadanie priorytetów ładowania zasobów w zależności od położenie okienka na stronie, zasobów systemowych, przepustowości łącza lub innych czynników.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się jak [zapewnić zasoby rezerwowe i elementy zastępcze obrazów](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Obrazy animowane

Element [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) jest bardzo podobny do elementu [`amp-img`](../../../../documentation/components/reference/amp-img.md) i zapewnia dodatkowe funkcje zarządzania ładowaniem i odtwarzaniem obrazów animowanych, takich jak pliki GIF.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] **UWAGA —** aby użyć tego składnika, dodaj kod `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` w sekcji head strony. [/tip]

## Wideo

Aby dodać film do strony, użyj elementu [`amp-video`](../../../../documentation/components/reference/amp-video.md).

Użyj tego elementu tylko do bezpośredniego osadzania plików wideo HTML5. Element ten ładuje zasób wideo określony przez atrybut `src` leniwie, w czasie określonym przez AMP.

Dodaj element zastępczy wyświetlany przed uruchomieniem wideo, a także zasoby rezerwowe na wypadek, gdy przeglądarka nie obsługuje wideo w formacie HTML5, na przykład:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## Audio

Aby dodać dźwięk do strony, użyj elementu [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

Użyj tego elementu tylko do bezpośredniego osadzania plików audio HTML5. Element ten ładuje zasób audio określony przez atrybut `src` leniwie, w czasie określonym przez AMP.

Dodaj element zastępczy wyświetlany przed uruchomieniem audio, a także zasoby rezerwowe na wypadek, gdy przeglądarka nie obsługuje audio w formacie HTML5, na przykład:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] **UWAGA —** aby użyć tego składnika, dodaj kod `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` w sekcji head strony. [/tip]
