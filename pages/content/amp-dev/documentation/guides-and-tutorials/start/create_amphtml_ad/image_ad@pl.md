---
"$title": Tworzenie reklamy graficznej
"$order": '1'
description: Nasza reklama to prosty obraz z hiperlinkiem do reklamowanej witryny. Wyświetlamy go za pomocą znacznika amp-img. Oto kod...
---

W sekcji `<body>` dokumentu reklamy AMPHTML można zawrzeć znaczniki HTML i AMP, ale nie wszystkie znaczniki są dozwolone. Listę dozwolonych znaczników przedstawia [specyfikacja reklamy AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins).

Nasza reklama to prosty obraz z hiperlinkiem do reklamowanej witryny. Wyświetlamy go za pomocą znacznika [`amp-img`](../../../../documentation/components/reference/amp-img.md). Oto kod:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Gdy otworzysz ten plik html w przeglądarce, zobaczysz następujący obraz:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Jeśli klikniesz reklamę graficzną, przejdziesz do reklamowanej witryny (tj. witryny AMP Project).
