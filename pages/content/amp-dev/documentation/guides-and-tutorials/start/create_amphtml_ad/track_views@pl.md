---
"$title": Śledzenie odsłon reklamy
"$order": '2'
description: W reklamach AMPHTML można śledzić metryki za pomocą składników amp-pixel lub amp-analytics. W naszym prostym przykładzie dodamy możliwość śledzenia odsłon stron...
---

W reklamach AMPHTML można śledzić metryki za pomocą składników [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) lub [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). W naszym prostym przykładzie dodamy możliwość śledzenia odsłon strony za pomocą składnika [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) i wskażemy na adres URL rejestrujący odsłony strony (w tym przypadku fikcyjny adres URL):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
<amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

I już, reklama AMPHTML została utworzona!

Przed przesłaniem reklamy na serwer reklam należy wykonać jeszcze jeden, ostatni krok — upewnić się, że składnia jest prawidłowa.
