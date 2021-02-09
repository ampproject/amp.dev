---
'$title': Bereite deine Seite für das Auffinden und die Verteilung vor
$order: 4
description: In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel …
author: pbakaus
contributors:
  - bpaduch
---

In manchen Fällen ist es sinnvoll, sowohl eine AMP Version als auch eine Version ohne AMP derselben Seite zu haben, z. B. für einen Nachrichtenartikel. Aber woher weiß die Google Suche nach dem Fund deiner traditionellen Seite eigentlich, _dass es auch eine "gekoppelte" AMP Version gibt_?

## Verknüpfen von Seiten mit `<link>`

Um festzulegen, dass eine nicht-AMP Seite und eine AMP Seite als "gekoppelt" behandelt werden sollen, fügen wir der nicht-AMP Seite Informationen über die AMP Seite hinzu und umgekehrt. Dazu verwenden wir die Tags `<link>` im `<head>`.

Füge Folgendes zu deiner nicht-AMP Seite hinzu:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Und füge dies zu deiner AMP Seite hinzu:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Und wenn ich nur eine Seite habe?

Auch wenn du nur eine Seite hast und es eine AMP Seite ist, musst du den kanonischen Link hinzufügen, der in diesem Fall auf sich selbst verweist:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **ERFAHRE MEHR: ** In [Richtlinien für AMP Seiten (Accelerated Mobile Pages) in der Google Suche](https://support.google.com/webmasters/answer/6340290) erfährst du mehr darüber, wie Google AMP Seiten findet. [/tip]
