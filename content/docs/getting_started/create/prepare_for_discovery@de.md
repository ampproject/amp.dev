---
$title: Seite für die Auffindbarkeit und Bereitstellung vorbereiten
---

Vielleicht gibt es bei Ihnen in manchen Fällen von der gleichen Seite, zum Beispiel einem Nachrichtenartikel, sowohl eine Nicht-AMP-Version als auch eine AMP-Version. Wenn die Google-Suche nun die Nicht-AMP-Version der Seite findet, *woher weiß sie, dass es auch noch eine AMP-Version gibt?*

## Seiten mit `<link>` verknüpfen

Um dieses Problem zu lösen, fügen wir Informationen zur AMP-Seite auf der Nicht-AMP-Seite ein und umgekehrt. Dies geschieht in Form von `<link>`-Tags im `<head>`-Element.

Fügen Sie Ihrer Nicht-AMP-Seite den folgenden Code hinzu:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Und diesen der AMP-Seite:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Was ist, wenn ich nur eine Seite habe?

Wenn Sie nur eine Seite haben und es sich dabei um eine AMP-Seite handelt, müssen Sie trotzdem den kanonischen Link hinzufügen. Dieser verweist dann einfach auf sich selbst:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="/de/docs/tutorials/create/preview_and_validate.html"><span class="arrow-prev">Bisherige</span></a>
  <a class="button next-button" href="/de/docs/tutorials/create/publish.html"><span class="arrow-next">Nächster</span></a>
</div>
