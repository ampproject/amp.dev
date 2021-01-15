---
"$title": Erstelle ein Gerüst für die Ad
"$order": '0'
description: 'Erstelle mit deinem bevorzugten Texteditor eine HTML Datei mit dem Namen my-amphtml-ad.html. Kopiere das folgende HTML Markup in diese Datei: …'
---

Der [für eine AMPHTML Ad erforderliche HTML Code](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) ist eine Variante des [AMPHTML Codes für AMP Seiten](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Erstellen wir das Gerüst der AMPHTML Ad, um den erforderlichen Code kennenzulernen.

Erstelle mit deinem bevorzugten Texteditor eine HTML Datei mit dem Namen **`my-amphtml-ad.html`**. Kopiere das folgende HTML Markup in diese Datei:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

Dieses Markup gilt für eine einfache, gültige HTML Datei. Beachte, dass wir das Ansichtsfenstertag `meta` eingefügt haben, um das [Ansichtsfenster responsiv](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport) zu machen.

Jetzt können wir den HTML Code abändern und in eine AMPHTML Ad verwandeln.

Füge im Tag `<html>` das Attribut `⚡4ads` hinzu, um das Dokument als AMPHTML Ad zu kennzeichnen. Alternativ kannst du das ebenfalls gültige Attribut `amp4ads` angeben.

```html
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"] **HINWEIS:** Im Gegensatz zu AMP Seiten [benötigen AMPHTML Ads das Tag `<link rel="canonical">` nicht](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Für AMPHTML Ads ist eine eigene Version der AMP Runtime erforderlich. Füge daher das folgende Tag `<script>` im Abschnitt `<head>` deines Dokuments hinzu:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

AMPHTML Ad Creatives erfordern eine andere, wesentlich einfachere [Zeile für Boilerplate Stil](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) als AMP Seiten. Füge im Abschnitt `<head>` den folgenden Code hinzu:

```html
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

Um den Stil deiner AMPHTML Ad festzulegen, muss dein CSS mithilfe der Tags <code><style amp-custom></style></code> im Abschnitt <code><head></code> inline in das AMPHTML Dokument eingebettet werden. Da wir eine einfache Ad rendern, die aus einem Bild besteht, benötigen wir kein CSS und werden diese Tags daher nicht hinzufügen.

[tip type="note"] **HINWEIS:** Bei AMPHTML Ads beträgt die maximale Größe für ein Inline Stylesheet *20 Kilobyte*. Weitere Informationen zu [den Anforderungen an CSS findest du in der Spezifikation für AMPHTML Ads](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Nachfolgend findest du den vollständigen Code für deine HTML Datei:

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

Jetzt hast du eine gültige AMPHTML Ad, wenn auch eine ziemlich leere. Erstellen wir nun die Bildanzeige.
