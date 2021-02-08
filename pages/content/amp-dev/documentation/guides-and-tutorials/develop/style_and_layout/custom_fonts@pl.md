---
'$title': Dodawanie czcionek niestandardowych
$order: 6
description: Strony AMP nie mogą zawierać zewnętrznych arkuszy stylów, z wyjątkiem czcionek niestandardowych. Czcionki niestandardowe można osadzać na stronie na dwa sposoby...
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

Strony AMP nie mogą zawierać zewnętrznych arkuszy stylów, z wyjątkiem czcionek niestandardowych. Czcionki niestandardowe można osadzać na stronie na dwa sposoby:

1. Za pomocą znacznika `<link>` (tylko dostawcy czcionek z listy dozwolonych)
2. Za pomocą reguły `@font-face` (bez ograniczeń, dozwolone są wszystkie czcionki)

### 1. Stosowanie znacznika `<link>`

Użyj znacznika `<link>` (zwykle w nagłówku strony):

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Następujące źródła czcionek są na liście dozwolonych i dozwolone jest pobieranie z nich czcionek za pomocą znaczników link:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Stosowanie reguły `@font-face`

Można również użyć reguły [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) w arkuszu stylów AMP:

[sourcecode:html]

<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>

[/sourcecode]

[tip type="note"] **UWAGA —** czcionki dołączane za pomocą reguły `@font-face` muszą być pobierane przy użyciu schematu HTTP lub HTTPS. [/tip]
