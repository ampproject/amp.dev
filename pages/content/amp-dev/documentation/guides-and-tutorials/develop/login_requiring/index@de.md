---
'$title': Erstelle eine AMP Seite mit obligatorischer Anmeldung
$order: 0
description: Einige Benutzerinteraktionen mit einer Seite, z. B. das Schreiben eines Kommentars, können mit einer Anmeldung verbunden sein. Du kannst einen Anmeldeprozess …
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

Einige Benutzerinteraktionen mit einer Seite, z. B. das Schreiben eines Kommentars, können mit einer Anmeldung verbunden sein. Du kannst einen Anmeldeprozess mit AMP implementieren, indem du die Komponente [`amp-access`](../../../../documentation/components/reference/amp-access.md) mit der Komponente [`amp-form`](../../../../documentation/components/reference/amp-form.md) kombinierst.

[tip type="tip"] **TIPP:** Ein Implementierungsbeispiel findest du im [Beispiel für den Kommentarbereich](../../../../documentation/examples/documentation/Comment_Section.html) auf [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

Im [Beispiel für den Kommentarbereich](../../../../documentation/examples/documentation/Comment_Section.html) werden [`amp-access`](../../../../documentation/components/reference/amp-access.md) und [`amp-form`](../../../../documentation/components/reference/amp-form.md) kombiniert, um einen Kommentarbereich zu erstellen, der nur aktiviert wird, wenn der Benutzer angemeldet ist. Sehen wir uns die Abfolge der Aktionen an, die nach der Landung auf der Seite ausgeführt werden, um zu verstehen, wie dieses Beispiel funktioniert.
