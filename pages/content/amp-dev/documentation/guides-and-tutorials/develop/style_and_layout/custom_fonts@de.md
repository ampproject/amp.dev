---
'$title': Füge benutzerdefinierte Schriftarten hinzu
$order: 6
description: AMP Seiten dürfen keine externen Stylesheets enthalten, mit Ausnahme von benutzerdefinierten Schriftarten. Es gibt zwei Möglichkeiten, …
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

AMP Seiten dürfen keine externen Stylesheets enthalten, mit Ausnahme von benutzerdefinierten Schriftarten. Es gibt zwei Möglichkeiten, benutzerdefinierte Schriftarten in deine Seite einzubetten:

1. Über das Tag `<link>` (nur zugelassene Schriftartenanbieter)
2. Über `@font-face` (uneingeschränkt, alle Schriftarten erlaubt)

### 1. Verwendung von `<link>`

Verwende das Tag `<link>` (normalerweise im Head deiner Seite) wie folgt:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Die folgenden Quellen sind zulässig und für das Bereitstellen von Schriftarten über Linktags erlaubt:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Verwendung von `@font-face`

Alternativ kannst du [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) in deinem AMP Stylesheet verwenden:

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

[tip type="note"] **HINWEIS:** Schriftarten, die via `@font-face` eingebunden werden, müssen über das HTTP oder HTTPS Schema abgerufen werden. [/tip]
