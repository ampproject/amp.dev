---
'$title': Schriftarten hinzufügen
$order: 6
description: 'Benutzerdefinierte Schriftarten kannst du auf zwei Arten in deine AMP Seite einbetten: 1. Über das Tag <link>: nur für zugelassene Schriftartenanbieter. 2. Mithilfe …'
---

Damit die Ladezeiten von Dokumenten so kurz wie möglich bleiben, kannst du in AMP keine externen Stylesheets einbinden. Die einzige Ausnahme sind **Schriftarten**.

Benutzerdefinierte Schriftarten kannst du auf zwei Arten in deine AMP Seite einbetten:

1. Über das Tag `<link>`: nur für zugelassene Schriftartenanbieter.
2. Mithilfe der CSS Regel `@font-face`: Hier gibt es keine Einschränkungen, alle Schriftarten sind zugelassen.

In diesem Tutorial verwenden wir das Tag `<link>`, um Schriftarten zu unserer Seite hinzuzufügen. **Füge** im `<head>` einen Stylesheet Link hinzu, um die Schriftart "Raleway" anzufordern:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

**Aktualisiere** dann deinen CSS Selektor für `body`, um auf Raleway zu verweisen:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Aktualisiere** deine Seite und sieh sie dir an. Überprüfe auch die Ausgabe des AMP Validators. Es sollten keine Fehler für diese externe Stylesheet Anforderung auftreten.

[tip type="note"] Webschriftarten können selbst auf einer ansonsten schnellen AMP Website die Leistung der Website beeinträchtigen. Verwende die CSS Eigenschaft [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display), um das Ladeverhalten deiner Schriftarten zu optimieren. [/tip]

Dein AMP Artikel ist nun fertig! Er sollte so aussehen:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Fertiger Nachrichtenartikel') }}
