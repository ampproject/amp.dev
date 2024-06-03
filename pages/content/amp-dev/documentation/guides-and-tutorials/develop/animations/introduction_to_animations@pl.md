---
$title: Wprowadzenie do złożonych animacji
$order: 2
description: W przypadku animacji, które nie mogą być obsługiwane przez dodawanie i usuwanie klas, AMP oferuje kilka specjalnych składników. Składniki te stosują zasady AMP do animacji...
author: CrystalOnScript
---

W przypadku animacji, które nie mogą być obsługiwane przez [dodawanie i usuwanie klas](triggering_css_animations.md), AMP oferuje kilka specjalnych składników. Składniki te stosują zasady AMP do animacji: są szybkie, wydajne i zorientowane na użytkownika. AMP ogranicza właściwości CSS dozwolone wewnątrz ramek kluczowych, ale zapewnia korzyści takie, jak precyzyjne sterowanie, płynne animacje i zgodność z przeglądarkami bez dodatkowej pracy.

Jeśli chcesz ściśle kontrolować odtwarzanie, jak również precyzyjnie synchronizować wiele elementów animacji naraz, użyj składnika amp-animation.

## Tworzenie podstawowej animacji AMP

Składnik [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) umożliwia stosowanie interfejsu [API Web Animation](https://www.w3.org/TR/web-animations/) w AMP.

Podstawowy składnik [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) to obiekt JSON utworzony z następujących głównych części:

- Elementu animowanego przez składnik, czyli `selector`.
- [Właściwości synchronizacji](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties)
- [Ramek kluczowych](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes)
- [Wyzwalacza](/content/amp-dev/documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Pole selector

Podobnie jak CSS, składnik [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) łączy właściwości animacji z elementem poprzez zadeklarowanie nazwy znacznika elementu, klasy lub identyfikatora w polu `"selector"`. Składnik animuje każdy element z zadeklarowaną nazwą typu znacznika lub nazwą klasy. Aby zapewnić animować pojedynczy element, użyj identyfikatora.

### Właściwości synchronizacji

Właściwości [synchronizacji](/content/amp-dev/documentation/components/reference/amp-animation.md#timing-properties) sterują czasem trwania animacji, czasem jej odtwarzania oraz kierunkiem wykonywania ramek kluczowych.

Żadne właściwości synchronizacji nie są wymagane, ale animacja może nie działać, jeśli brakuje właściwości związanych z czasem i wyświetlaniem, takich jak `duration` i `fill`.

### Ramki kluczowe

Chociaż CSS zezwala na płynną zmianę jednego stanu na drugi za pomocą przejść, musisz zadeklarować właściwości animacji jako ramki kluczowe, aby zaimplementować składnik [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes), które można wykorzystać do właściwości akcelerowanych przez GPU, które nie powodują powtórnego generowania układu i mogą animować w [wątku narzędzia tworzenia kompozycji](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Zapobiega to ingerencji animacji w AMP i [proces renderowania](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) przeglądarki.

[tip type="note"] Ramki kluczowe są albo definiowane bezpośrednio w składniku [`{amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Wyzwalacz

Wyzwalacz uruchamia sekwencję animacji. Rozszerzenie [` amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) jest uruchamiane, gdy sekcja `<body>` staje się widoczna na stronie lub poprzez połączenie go z [działaniem lub zdarzeniem AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

Wyzwalanie przy widoczności sekcji `<body>` jest użyteczne, gdy animacja powinna zostać uruchomiona od razu po załadowaniu strony, ponieważ pojawia się „nad treścią” lub w pierwszym okienku ekranu na stronie. Animacje są uruchamiane przez widoczność, dzięki dodaniu do składnika atrybutu `trigger="visibility"`.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animacje łączą się z działaniem lub zdarzeniem dzięki przypisaniu składnikowi [`</a>amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) właściwości `id` i powiązaniu tego `id` z żądanym wyzwalaczem zdarzenia, takim jak dotknięcie przycisku.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Tworzenie złożonych animacji

Utworzenie animacji w składniku [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md) umożliwia szczegółowe sterowanie, wykraczające poza uruchamianie i zatrzymywanie animacji: można również wstrzymywać, odwracać i kierować do określonego punktu. Można nawet łączyć wiele animacji w łańcuchy i animować elementy w sekwencji.

### Cele cząstkowe

Elementy tego samego znacznika lub klasy mogą mieć określone właściwości synchronizacji i zastępować wartości zmiennych zdefiniowanych w animacji najwyższego poziomu.

[example preview="top-frame" playground="true" imports="amp-animation"]

```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [
          {"transform": "translateX(0px)"},
          {"transform": "translateX(50%)"}
        ],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">start</button>
</body>
```

[/example]

### Łańcuchy animacji

Wiele animacji można połączyć, aby utworzyć dużą sekwencję. Można tworzyć efekty czasowe, takie jak nakładki na film, wpisując animacje w tablicy `animations` w składniku [`amp-anmation`](/content/amp-dev/documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Ta konfiguracja powoduje odtwarzanie każdej animacji w sekwencji przez 3 sekundy.

W przypadku większych animacji, animacje w tablicy `animations` mogą odwoływać się do innych składników [`amp-animation`](/content/amp-dev/documentation/components/reference/amp-animation.md).

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Animowanie nieznanej liczby elementów

Używając wyrażeń [`var(/content/amp-dev/documentation/components/reference/amp-animation.md#css-extensions), można pisać złożone, synchronizowane animacje, które działają z dowolną liczbą elementów. Pozwala to na łatwe i płynne animowanie danych dynamicznych i generowanych przez użytkownika.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
          {"transform": "translate3d(0px, 0px, 0px)"},
          {"transform": "translate3d(50%, 0px, 100px)"},
          {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
          {"transform": "translate3d(50%, 0px, -100px)"},
          {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex="none" role="animation">
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg"
      layout="fill"
    ></amp-img>
    <amp-img
      class="card"
      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg"
      layout="fill"
    ></amp-img>
  </div>
</body>
```

[/example] Ten przykład działa poprzez:

- Zadeklarowanie zmiennej `duration` i nadanie jej wartości dwóch sekund.
- Ustawienie właściwości `duration` na wartość zmiennej `--duration`.
- Obliczenie opóźnienia zastosowanego do każdego elementu, który spełnia kryteria selektora `.card`.
  1. [Rozszerzenie `length(/content/amp-dev/documentation/components/reference/amp-animation.md#css-length()-extension) oblicza liczbę wybranych elementów `.card`
  2. Następnie length odejmuje od każdego elementu `.card` wartość [index(/content/amp-dev/documentation/components/reference/amp-animation.md#css-index()-extension)
  3. Otrzymana wartość jest mnożona przez wartość zmiennej `--duration`
  4. Końcowa wartość w sekundach jest stosowana do opóźnienia tego elementu.
- Animacja jest stosowana do każdego elementu z osobna, tak aby elementy cards były odtwarzane jeden po drugim, a nie wszystkie naraz.

Otwórz animację w placu zabaw AMP i dodaj więcej elementów [`amp-img`](../../../../documentation/components/reference/amp-img), aby przetestować ten sposób działania.

### Wyglądają wspaniale, wszędzie.

Animacje mogą zawierać warunki (/content/amp-dev/documentation/components/reference/amp-animation.md#supports-condition) w <a>instrukcji <code>switch</code></a>.

[example preview="top-frame" playground="true"]

```html
<head>
  <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script
    async
    custom-element="amp-animation"
    src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"
  ></script>
</head>
<body>
  <amp-animation id="mediaAnimation" layout="nodisplay">
    <script type="application/json">
      {
        "duration": "1s",
        "iterations": "4",
        "fill": "both",
        "direction": "alternate",
        "animations": [
          {
            "media": "(min-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".drop",
            "keyframes": {
              "transform": "translate(50vw)"
            }
          },
          {
            "media": "(min-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-100vw)"
            }
          },
          {
            "media": "(max-width: 300px)",
            "selector": ".right",
            "keyframes": {
              "transform": "translate(-50vw)"
            }
          }
        ]
      }
    </script>
  </amp-animation>

  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```

[/example]
