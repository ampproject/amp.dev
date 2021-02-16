---
"$title": Verzögerung bei Berührung deaktivieren
"$order": '50'
tags:
- fid
---

Stelle die Breite des Ansichtsfensters so ein, dass sie der Gerätebreite entspricht, um die Berührungsverzögerung zu deaktivieren. Das kann die FID erhöhen. Um diese Verzögerung von 300–350 ms zu entfernen, ändere die Deklaration im Abschnitt `<head>` deiner Seite zu:

```
<meta name="viewport" content="width=device-width">
```

Das stellt die Breite des Ansichtsfensters so ein, dass sie der Breite des Geräts entspricht, was generell als Best Practice für mobiloptimierte Websites gilt. [Mehr über die Deaktivierung der Verzögerung bei Berührung findest du auf web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
