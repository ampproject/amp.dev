---
'$title': Wyzwalanie animacji CSS i przejść
$order: 1
description: Wyzwalanie animacji CSS na stronach polega na dodawaniu i usuwaniu klas za pomocą kodu JavaScript. Ten sam sposób działania można osiągnąć na stronach AMP za pomocą działania toggleClass...
formats:
  - websites
  - ads
---

Animacje CSS umożliwiają przejście elementów internetowych z jednej konfiguracji stylu CSS do innej. Przeglądarka może uruchamiać zdefiniowane animacje podczas ładowania, ale animacje CSS wyzwalane zdarzeniami [polegają na dodawaniu i usuwaniu klas](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP obsługuje oba typy animacji.

CSS stosuj wówczas, gdy masz mniejszą, zamkniętą animację, która nie musi być precyzyjnie ustawiona w czasie.

## Definiowanie CSS i ramek kluczowych

CSS można zdefiniować w AMP w następujący sposób:

[filter formats="websites, stories"]

- W znaczniku `<style amp-custom>` w sekcji nagłówka dokumentu. Limit wynosi 75 000 bajtów.
- Stylami inline. Każde wystąpienie stylu inline ma limit 1000 bajtów. Style inline liczą się do limitu 75 000 bajtów znacznika `<style amp-custom>`.
- W znaczniku `<style amp-keyframes>` w sekcji nagłówka dokumentu. Limit wynosi 500 000 bajtów. Ograniczony do właściwości ramek kluczowych.

[/filter]

[filter formats="ads"]

- W znaczniku `<style amp-custom>` w sekcji nagłówka dokumentu. Limit wynosi 20 000 bajtów.
- Stylami inline. Każde wystąpienie stylu inline ma limit 1000 bajtów. Style inline liczą się do limitu 20 000 bajtów znacznika `<style amp-custom>`.
- W znaczniku `<style amp-keyframes>` w sekcji nagłówka dokumentu. Limit wynosi 500 000 bajtów. Ograniczony do właściwości ramek kluczowych.

[/filter]

[tip type="read-on"] Więcej informacji o stosowaniu CSS w AMP zawiera artykuł [Styl i układ](../style_and_layout/index.md). [/tip]

[filter formats="websites, stories"] Aby strony były lekkie i szybkie, AMP narzuca limit 75 000 bajtów kodu CSS w znaczniku `<amp style-custom>`. Można go użyć do zdefiniowania stylów animacji, ale limit 500 000 bajtów wewnątrz znacznika `<amp style-keyframes>` zezwala na bardziej skomplikowane animacje, które nie przeciążą cennych zasobów stylu strony. [/filter]

[filter formats="ads"] Aby strony były lekkie i szybkie, AMP narzuca limit 20 000 bajtów kodu CSS w znaczniku `<amp style-custom>`. Można go użyć do zdefiniowania stylów animacji, ale limit 500 000 bajtów wewnątrz znacznika `<amp style-keyframes>` zezwala na bardziej skomplikowane animacje, które nie przeciążą cennych zasobów stylu strony. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Dodawanie, usuwanie i przełączanie klas

Działanie AMP `toggleClass` umożliwia dodawanie i usuwanie klas do i ze zdefiniowanych elementów.

```js
elementName.toggleClass(class="className")
```

Możesz przełączyć klasę w tym samym elemencie, z którym użytkownicy mają wchodzić w interakcję, np. animowanym menu hamburger.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

Działanie `toggleClass` można stosować również do innych elementów, a dzięki dodaniu atrybutu `force` można przełączać się między dwiema klasami.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Jeśli musisz usunąć klasę i uniemożliwić jej ponowne zastosowanie, dodaj atrybut `force` z wartością `false`. Jeśli chcesz dodać klasę i uniemożliwić jej usunięcie, dodaj atrybut `force` o wartości `true`.

## Animacja przy użyciu CSS i stanów

Można dodawać i usuwać dowolną liczbę klas CSS przy użyciu stanów i składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Zdefiniuj animacje wielu klas, dodając najpierw listę klas CSS w znaczniku `<style amp-custom>` w sekcji `head`:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Następnie sparuj każdą klasę ze stanem:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

Następnie powiąż element z klasami:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Stany zmieniają się w wyniku powiązanego działania lub zdarzenia AMP. W poniższym przykładzie stan zmienia się wskutek interakcji z użytkownikiem:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

Użycie składnika [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) w ten sposób jawnie ustawia zdefiniowaną klasę. Nie trzeba stosować instrukcji usunięcia innych klas.
