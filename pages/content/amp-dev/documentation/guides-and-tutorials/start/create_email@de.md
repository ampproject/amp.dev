---
'$title': Erstelle deine erste AMP E-Mail
$order: 0
description: Erstelle deine erste AMP E-Mail und finde heraus, was AMP E-Mails so besonders macht.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

Mit AMP für E-Mail können E-Mail Absender AMP in ihren E-Mail Nachrichten verwenden, um eine ganze Reihe neuer Funktionen zu unterstützen. Mit AMP verfasste E-Mails können interaktive Elemente wie Bilderkarussells oder Akkordeons enthalten. Ihr Inhalt wird in der Nachricht auf dem neuesten Stand gehalten und Empfänger können diverse Aktionen ausführen (z. B. ein Formular beantworten), ohne ihren Posteingang zu verlassen.

AMP für E-Mail ist mit bestehenden E-Mails kompatibel. Die AMP Version der Nachricht wird zusätzlich zu HTML und Klartext als neuer MIME Teil in die E-Mail eingebettet, um die Kompatibilität zwischen allen E-Mail Clients zu gewährleisten.

Tipp: Eine Liste der E-Mail Plattformen (ESPs), Clients und Anbieter, die AMP für E-Mail unterstützen, findest du in den häufig gestellten Fragen unter [Unterstützte E-Mail Plattformen](../../../support/faq/email-support.md).

In diesem Tutorial lernst du, deine erste dynamische AMP E-Mail zu erstellen und zu senden. Den fertigen Code kannst du dir [hier](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73) ansehen.

# Beginne mit der AMP E-Mail Boilerplate

Der AMP Playground unterstützt das Format "AMP für E-Mail" und erlaubt dir, deine AMP E-Mails zu entwickeln, zu testen und zu validieren. Öffne den [AMP Playground](https://playground.amp.dev/?runtime=amp4email) und stelle sicher, dass als Format in der linken oberen Ecke `AMP for Email` angegeben ist. Du solltest den folgenden Code sehen:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Er enthält das erforderliche Markup und das Grundgerüst einer gültigen AMP E-Mail. Sieh dir gerne auch die zahlreichen Beispiele für gültige E-Mail Templates in der Liste oben rechts im Dropdown Menü an.

Werfen wir einen kurzen Blick auf einige relevante Unterschiede zu klassischen HTML E-Mails:

- AMP E-Mails müssen sich als solche identifizieren, indem sie `⚡4email` oder `amp4email` im HTML Tag enthalten.
- Das Tag `<head>` muss auch das Tag `<script>` enthalten, welches die AMP Runtime lädt. `<script async src="https://ampjs.org/v0.js"></script>`
- Eine CSS Boilerplate wird benötigt, die den Inhalt zunächst ausblendet, bis AMP geladen ist. `<style amp4email-boilerplate>body{visibility:hidden}</style>`

Wenn du schon mit E-Mails gearbeitet hast, lässt der Gedanke, ein Skript in einer E-Mail zu platzieren, womöglich alle Alarmglocken in deinem Kopf schrillen. Keine Sorge: E-Mail Anbieter, die AMP E-Mails unterstützen, haben sehr strenge Sicherheitsüberprüfungen eingerichtet, um sicherzustellen, dass nur geprüfte AMP Skripte auf ihren Clients ausgeführt werden. Auf diese Weise können dynamische und interaktive Features direkt in den Posteingängen der Empfänger eingesetzt werden, ohne dass dadurch Sicherheitslücken entstehen. Weitere Informationen zum erforderlichen Markup für AMP E-Mails findest du hier.

[tip type="important"] AMP E-Mails können nur die AMP Skripte [unterstützter Komponenten](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) enthalten. [/tip]

# Füge ein Bild hinzu

Die meisten HTML Tags, die in E-Mails verwendet werden, können auch in AMP E-Mails verwendet werden. Allerdings werden einige Tags wie z. B. `<img>` durch das AMP Äquivalent [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md) ersetzt.

Das Tag `<amp-img>` erfordert die Angabe der Breite und Höhe des Bildes. Im Gegensatz zu `<img>` muss `<amp-img>` explizit mit `</amp-img>` geschlossen werden.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Zusätzlich dazu werden GIF Dateien mittels [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md) unterstützt.

Da E-Mails nicht auf deinem Server gehostet werden, müssen URLs in AMP E-Mails absolute Pfade und HTTPS verwenden.

[Placekitten](https://placekitten.com/) ist eine Website, die Katzenbilder als Platzhalter verwendet. Hier kannst du die Bildgröße direkt in der URL bestimmen!

Verwenden wir ein solches Bild in unserer ersten E-Mail, indem wir den folgenden Code hinzufügen:

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Responsives Layout

E-Mails werden auf einer Vielzahl von Geräten und Bildschirmgrößen angezeigt. Zum Glück verfügt AMP über ein integriertes Layoutsystem! Das System [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) und die Medienabfragen machen die Implementierung responsiver E-Mails ganz einfach. Um die Größe unseres verwendeten Katzenbildes an die entsprechenden Bildschirme anzupassen, füge das Attribut `layout="responsive"` im Abschnitt `<amp-image>` hinzu.

[tip type="read-on"] [Erfahre mehr darüber, wie AMP mit Layout und Medienabfragen umgeht](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Vergrößere und verkleinere das Browserfenster, um zu sehen, wie sich die Bildgröße ändert! [Hier findest du eine Liste der unterstützten layoutspezifischen Komponenten](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Bearbeite Präsentation und Layout

Ein Bild ist schön und gut, aber was, wenn wir noch mehr anzeigen möchten? AMP für E-Mail unterstützt Layoutelemente wie Akkordeons und Seitenleisten.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

In diesem Tutorial verwenden wir [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md), um Fotos von Katzen anzuzeigen, die zur Adoption stehen.

Füge das Skript für `amp-carousel` im Abschnitt "head" deiner E-Mail hinzu.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Umschließe dann das erste Bild mit den Tags `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Vielleicht ist dir aufgefallen, dass sich nichts geändert hat, und das ist gut so! Unser Karussell hat das Attribut `type=slides` erhalten, was bedeutet, dass immer jeweils ein Foto angezeigt wird. Da wir nur ein Foto innerhalb der Tags platziert haben, sehen die Benutzer keine Pfeile zum Blättern.

Ersetze als Nächstes das Platzhalterbild in `<amp-carousel>` durch unsere AMP Katzen, die adoptiert werden können.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Jetzt solltest du in der Lage sein, zwischen den Fotos zu wechseln, indem du auf die Navigationspfeile auf der linken oder rechten Seite des Karussells klickst.

## Versende mit Stil

AMP ermöglicht die Stildefinition im Kopf des Dokuments innerhalb der Tags `<style amp-custom>`. Darüber hinaus können bislang verbotene CSS Klassen und Pseudoklassen jetzt verwendet werden. [Hier findest du die gesamte Liste](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Ersetzen wir jetzt `Hello, AMP4EMAIL world` mit unserem eigentlichen Titel.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Nun können wir den Abschnitt "head" um folgendes Styling erweitern:

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Implementiere dynamische Funktionen

Klassische E-Mails erlauben nur statischen Inhalt. Dank AMP eröffnen sich der E-Mail Welt völlig neue Möglichkeiten! Benutzer können jetzt auf [Formulare](/content/amp-dev/documentation/components/reference/amp-form.md) antworten, [dynamisch aktualisierte Inhalte](/content/amp-dev/documentation/components/reference/amp-list.md) sehen und mit Inhalten interagieren.

In diesem Tutorial verwenden wir [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md), um den Namen unserer Katze und ihre Beschreibung anzuzeigen, wenn der Benutzer im Karussell zu dieser Katze blättert. Füge zunächst das Skript für `amp-bind` im Abschnitt "head" deiner E-Mail ein.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Als Nächstes deklarieren wir für AMP Bind die Variable "myState" als JSON String innerhalb des Tags [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Da wir vier Katzenfotos haben, geben wir den Status für alle vier an.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[AMP Aktionen und Events](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) lösen verschiedene Statuswerte aus. In unserem Fall wollen wir den Status aktualisieren, wenn Benutzer auf die Navigationspfeile des Karussells klicken. Das Element "amp-carousel" löst das Event [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) aus, bei dem wir die Variable `currentCat` mit `AMP.setState` aktualisieren.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Dieser Code sorgt dafür, dass der Status von `currentCat` mit dem Katzenfoto des aktuellen Karussellindex übereinstimmt. Wenn wir uns also beim Bild mit `event.index=2` befinden, wird der Status dem Element mit Index 2 des Arrays zugeordnet.

Jetzt müssen wir nur noch den Namen und die Beschreibungen unserer Katze anzeigen. Füge den folgenden Code unterhalb des schließenden Tags von `amp-carousel` hinzu.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

Die Erweiterung `amp-bind` verwendet [Ausdrücke](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) und [Bindungen](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings), um Inhalte dynamisch zu verändern. Im obigen Codebeispiel wird die Bindung `[text]` dazu verwendet, den Text innerhalb des Tags `<span>` bei jeder Statusänderung zu aktualisieren, indem der Ausdruck `"myState.cats[currentCat].name"` ausgewertet wird.

[tip type="note"] Um die Leistung zu steigern und das Risiko unerwarteter Sprünge im Inhalt zu vermeiden, wertet amp-bind keine Ausdrücke beim Laden der Seite aus. Das bedeutet, dass die visuellen Elemente einen Standardstatus haben sollten und sich beim ersten Rendern nicht auf amp-bind verlassen dürfen. [/tip]

Vergiss nicht, die Katzenbeschreibungen nach dem Tag `</div>` hinzuzufügen!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Wenn du jetzt zu einem anderen Katzenfoto im Karussell wechselst, sollten auch der Name und die Beschreibung aktualisiert werden.

# Sende deine AMP E-Mail

Informationen dazu, wie du deine E-Mail an deinen Posteingang sendest, [findest du im Abschnitt über das Testen von AMP E-Mails](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md).

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Glückwunsch! Du hast deine erste AMP E-Mail gesendet!

Sieh dir für weitere Schritte [die Grundlagen zu AMP für E-Mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md) an.
