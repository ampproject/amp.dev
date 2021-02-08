---
'$title': AMP HTML validieren
$order: 8
description: Immer, wenn du eine AMP Seite erstellst, solltest du unbedingt prüfen, ob dein AMP HTML korrekt ist. Es gibt [mehrere Methoden, mit denen du deine AMP Seite validieren kannst …
author: bpaduch
---

Da Web Storys mit AMP erstellt werden, solltest du immer überprüfen, ob dein AMP HTML korrekt ist. Es gibt [mehrere Methoden, mit denen du AMP Seiten validieren kannst](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). In diesem Tutorial aktivieren wir den AMP Validator, indem wir den Entwicklermodus aktivieren. Um den Entwicklermodus zu aktivieren, füge deiner URL die folgende Fragment ID hinzu und lade die Seite neu:

```text
#development=1
```

Zum Beispiel:

```text
http://localhost:8000/pets.html#development=1
```

Öffne die [Entwicklerkonsole](https://developer.chrome.com/devtools/docs/console) in Chrome (oder deinem bevorzugten Browser) und stelle sicher, dass keine AMP Fehler vorliegen. Möglicherweise musst du deinen Browser aktualisieren, um Validierungsmeldungen anzuzeigen. Wenn deine Seite fehlerfrei ist, sollte die folgende Meldung angezeigt werden:

```text
 AMP validation successful.
```
