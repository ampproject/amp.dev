---
"$title": Создание графической рекламы
"$order": '1'
description: "Наша реклама представляет собой простое изображение с гиперссылкой на рекламируемый сайт. Изображение будет отображено с помощью тега amp-img. Вот код нашей рекламы:..."
---

В составе тега `<body>` в вашем рекламном документе AMPHTML допускается использование тегов AMPHTML и HTML, однако не все теги разрешены. Список допустимых тегов см. в [спецификации рекламы AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins).

Наша реклама представляет собой простое изображение с гиперссылкой на рекламируемый сайт. Изображение будет отображено с помощью тега [`amp-img`](../../../../documentation/components/reference/amp-img.md). Вот код нашей рекламы:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Если вы откроете свой html-файл в браузере, вы должны увидеть следующее изображение:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Нажав на изображение в рекламе, вы перейдете на рекламируемый сайт (т. е. на сайт AMP Proiect).
