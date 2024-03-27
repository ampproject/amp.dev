---
'$title': Füge iframes hinzu
$order: 10
description: Erfahre, wie du Medieninhalte auf deinen Seiten anzeigst und wie du mithilfe von iframes erweiterte Inhalte jenseits der AMP Einschränkungen anzeigst.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Grundlagen

Mit dem Element [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) kannst du auf deiner Seite ein iframe anzeigen.

In AMP eignen sich iframes besonders dazu, Inhalte anzuzeigen, die im Hauptseitenkontext nicht unterstützt werden, z. B. Inhalte, die vom Benutzer erstelltes JavaScript erfordern.

### Anforderungen für `amp-iframe`

- Mindestens **600px** oder **75 %** des ersten Viewports vom oberen Rand entfernt (außer für iframes, die einen [`placeholder`](#using-placeholders) verwenden)
- Ressourcen können nur über HTTPS angefordert werden und müssen einen anderen Ursprung haben als der Container, es sei denn, "allow-same-origin" ist bei ihnen nicht angegeben.

[tip type="read-on"] **ERFAHRE MEHR:** Mehr Infos findest du in der [vollständigen Spezifikation für `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Binde das Skript ein

Um ein [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) zu deiner Seite hinzuzufügen, binde zuerst das folgende Skript in `<head>` ein, um den zusätzlichen Code für die erweiterte Komponente zu laden:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Schreibe das Markup

Im folgenden Beispiel haben wir ein responsives [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) erstellt, um eine Google Map über die [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide) einzubetten:

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Verwendung von Platzhaltern <a name="using-placeholders"></a>

Du kannst ein [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) am Anfang des Dokuments anzeigen, vorausgesetzt, das [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) enthält ein Element mit dem Attribut `placeholder` (z. B. ein [`amp-img`](../../../../documentation/components/reference/amp-img.md) Element), das als Platzhalter gerendert wird, bis das iframe zur Anzeige bereit ist.

[tip type="read-on"] **ERFAHRE MEHR:** Mehr Infos über Platzhalter findest du in [iframe mit Platzhalter](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Beispiel mit Platzhalter:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Wird gerendert als:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Beispiele

Komplexere Beispiele für [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) findest du bei [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html).
