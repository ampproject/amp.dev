---
'$title': Erweiterte AMP Komponenten hinzufügen
$order: 2
description: 'Mit dem AMP Komponentensystem kannst du schnell und mit minimalem Aufwand effiziente und responsive Features in deine Artikel integrieren. Die AMP HTML Bibliothek verfügt über drei Klassifizierungen für AMP Komponenten: ...'
---

Mit dem AMP Komponentensystem kannst du schnell und mit minimalem Aufwand effiziente und responsive Features in deine Artikel integrieren. Die AMP HTML Bibliothek verfügt über drei Klassifizierungen für AMP Komponenten:

- <strong>built-in</strong> (integriert): Das sind Komponenten, die in der AMP JavaScript Basisbibliothek enthalten sind (im Tag `<head>` definiert), z. B. [`amp-img`](../../../../documentation/components/reference/amp-img.md) und [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Diese Komponenten können sofort in einem AMP Dokument verwendet werden.

- **extended** (erweitert): Das sind Erweiterungen der Basisbibliothek, die explizit als benutzerdefinierte Elemente in das Dokument aufgenommen werden müssen. Benutzerdefinierte Elemente erfordern bestimmte Skripte, die im Abschnitt `<head>` hinzugefügt werden (z. B. `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **experimental** (experimentell): Das sind Komponenten, die veröffentlicht wurden, aber noch nicht für den breiten Einsatz geeignet sind. Entwickler können sich dafür entscheiden, diese Funktionen schon vor ihrem endgültigen Release zu verwenden. Weitere Informationen dazu findest du unter [Experimentelle Funktionen](../../../../documentation/guides-and-tutorials/learn/experimental.md).

In unserem Beispiel wird bereits eine integrierte Komponente verwendet: [`amp-img`](../../../../documentation/components/reference/amp-img.md). Im Tutorial ["HTML zu AMP konvertieren"](../../../../documentation/guides-and-tutorials/start/converting/index.md) haben wir besprochen, wie sich diese Komponente im AMP Layoutsystem verhält. Fügen wir unserem Nachrichtenartikel nun einige gängige **erweiterte** AMP Komponenten hinzu.

## Monetarisierung mit Ads

Ads werden in AMP mithilfe der Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) erstellt. Mithilfe der Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) kannst du Ads auf verschiedene Arten konfigurieren und z. B. deren Breite, Höhe und Layoutmodus anpassen. Viele Ad Plattformen erfordern jedoch noch weitere Einstellungen, z. B. eine Konto ID für das Werbenetzwerk, die Angabe der spezifischen Ad, die bereitgestellt werden soll, oder Optionen für die Zielgruppe der Ad. Solche Optionen können mithilfe von HTML Attributen mühelos in der Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) angegeben werden.

Sieh dir dieses Beispiel eines **DoubleClick** Ads an:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Wie du siehst, ist das eine sehr einfache Konfiguration. Beachte das Attribut `type`, das der Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) die Ad Plattform mitteilt, die wir verwenden wollen. In diesem Fall möchten wir die Plattform [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) verwenden und haben deshalb als Wert `doubleclick` angegeben.

Das Attribut `data-slot` ist etwas spezieller. In [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) sind alle Attribute, die mit `data-` beginnen, anbieterspezifische Attribute. Das bedeutet, dass nicht alle Anbieter dieses Attribut benötigen und bei seiner Angabe auch nicht unbedingt reagieren werden. Vergleiche das obige **DoubleClick** Beispiel mit der folgenden Testanzeige der Plattform [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Zu Testzwecken kannst du beide oben genannten Beispiele direkt nach dem Tag `<header>` in deinem Artikel **hinzufügen**.

Denke daran, dass nicht alle Komponenten in der JavaScript Datei mit der AMP Kernbibliothek enthalten sind. Wir müssen eine zusätzliche JavaScript Anforderung für die Ad Komponente einbinden.

**Füge** dem Tag `<head>` das folgende Skript hinzu:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

**Aktualisiere** die Seite. Jetzt sollten zwei Testanzeigen sichtbar sein:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **WICHTIG:** Möglicherweise zeigt deine Entwicklerkonsole einige Fehler an, z. B. `Mixed Content` oder `XMLHttpRequest cannot load`. Der erstgenannte Fehler hängt wahrscheinlich mit dem A9 Ad zusammen, da nicht alle geladenen Inhalte sicher sind. Das ist eine wichtige Voraussetzung für alle mit AMP bereitsgestellten Ads. [/tip]

Die beiden folgenden [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) Abschnitte sind ein Beispiel für die Flexibilität, die [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zur Unterstützung der Funktionen von Ad Plattformen bietet. In diesem Fall haben wir (mithilfe des Dashboards von DoubleClick) zwei DoubleClick Testanzeigen so konfiguriert, dass sie nur in bestimmten Ländern angezeigt werden: die erste nur in Großbritannien, die zweite nur in den USA. Du kannst diese beiden Geotargeting Konfigurationen im AMP Dokument unterhalb der bereits hinzugefügten Ads **hinzufügen**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Aktualisiere** die Seite und sieh sie dir an. Der folgende Screenshot wurde in Kanada aufgenommen und zeigt, dass keine der beiden Ads lädt:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **HINWEIS:** Vielleicht ist dir aufgefallen, dass diese [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) Tags zusätzliche `div` Tags mit dem Attribut `fallback` enthalten. Kannst du dir denken, was das Attribut `fallback` hier angibt? Es informiert das Ladesystem von AMP, den Inhalt dieses Elements nur dann anzuzeigen, wenn das übergeordnete Element nicht erfolgreich geladen werden kann. Weitere Informationen dazu findest du [Platzhalter & Fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **ERFAHRE MEHR:** Die aktuell unterstützten Werbenetzwerke findest du in der Referenzdokumentation für die Komponente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **HINWEIS:** Innerhalb des AMP Dokuments darf kein vom Werbenetzwerk bereitgestelltes JavaScript ausgeführt werden. Stattdessen lädt die AMP Runtime ein iframe aus einer anderen Quelle (über die iframe Sandbox) und führt das JS des Werbenetzwerks in dieser iframe Sandbox aus. [/tip]

Unser AMP Dokument enthält jetzt Text, ein Bild und eine auf der Seite eingebettete Ad. All das brauchst du, um deine Story zu erzählen und deinen Content zu monetarisieren. Moderne Websites bieten jedoch in der Regel mehr Funktionen als nur Bilder und Text.

Wir können unser AMP Dokument noch interessanter gestalten und die folgenden fortgeschrittenen Webfunktionen implementieren, die in Nachrichtenartikeln weit verbreitet sind:

- YouTube Videos
- Tweets
- Zitate aus Artikeln

## YouTube Video einbetten

Versuchen wir, ein YouTube Video in das Dokument einzubetten. **Füge** dazu den folgenden Code direkt nach `<header>` in deinem AMP Dokument ein (oberhalb der soeben hinzugefügten Abschnitte [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Aktualisiere** die Seite. Anstelle des Videos wird folgender Text angezeigt: _"The video could not be loaded."_

Du erhältst diesen Fehler, selbst wenn dein Browser YouTube Videos ohne Probleme anzeigen kann. Warum? Schuld ist nicht das Video, das nicht geladen werden konnte, sondern das Fehlschlagen der Komponente selbst.

Denke daran, dass nicht alle Komponenten in der JavaScript Datei mit der AMP Kernbibliothek enthalten sind. Wir müssen eine zusätzliche JavaScript Anforderung für die YouTube Komponente einbinden.

[tip type="note"] **HINWEIS:** Wenn deine Entwicklerkonsole noch geöffnet ist und deine URL `#development=1` enthält, wird an dieser Stelle ein AMP Validierungsfehler angezeigt, der dich daran erinnert, den JavaScript Code für [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) hinzuzufügen. Außerdem siehst du einen Link zur Dokumentation, die erklärt, welches `script` Tag verwendet werden soll. [/tip]

**Füge** im Tag `<head>` das folgende Skript ein:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
></script>
```

**Aktualisiere** die Seite. Jetzt solltest du das YouTube Video sehen:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Eingebettetes Youtube Video') }}

Wie bei den anderen Elementen auf der Seite haben wir `width` und `height` des Videos festgelegt, damit das AMP Layoutsystem das Seitenverhältnis berechnen kann. Außerdem geben wir `layout` den Wert `responsive`, damit das Video die Breite des übergeordneten Elements ausfüllt.

Weitere Informationen zum Einbetten von YouTube Videos findest du in der Dokumentation zur Komponente [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Weitere Video- und Medienkomponenten findest du in der [Liste der AMP Medienkomponenten](../../../../documentation/components/index.html#media).

[tip type="tip"] **TIPP:** Verwende das Attribut [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks), um Benutzer mitzuteilen, dass eine bestimmte Komponente nicht geladen werden kann oder nicht von ihrem Browser unterstützt wird. [/tip]

## Einen Tweet anzeigen

Die Einbettung vorformatierter Tweets von Twitter ist ein verbreitetes Feature in Nachrichtenartikeln. Die Komponente [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) kann diese Funktionalität problemlos bereitstellen.

Füge zunächst zum Tag `<head>` deines Dokuments die folgende JavaScript Anforderung hinzu:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

Nun kannst du in deinem Artikel den folgenden Code **hinzufügen**, um den Tweet einzubetten:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

Das Attribut `data-tweetid` ist ein weiteres Beispiel für ein benutzerdefiniertes Attribut, das von einer bestimmten Plattform benötigt wird. In diesem Fall ordnet Twitter den Wert des Attributs `data-tweetid` einem bestimmten Tweet zu.

**Aktualisiere** deinen Browser und sieh die die Seite an. Der Tweet sollte nun angezeigt werden:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Weitere Informationen zum Einbetten von Twitter Tweets findest du in der Dokumentation zur Komponente [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **TIPP:** AMP stellt noch weitere Komponenten zum Einbetten von Social Media Content zur Verfügung. Sieh dir die neuesten [Social AMP Komponenten](../../../../documentation/components/index.html#social) an. [/tip]

## Zitat im Artikel hervorheben

Ein häufig verwendetes Feature in Nachrichtenartikeln ist das Hervorheben besonderer Textausschnitte. So kann z. B. ein Zitat aus einer bestimmten Quelle oder eine wichtige Passage in einer größeren Schrift wiederholt werden, um die Aufmerksamkeit des Lesers auf sich zu ziehen.

Allerdings enthalten nicht alle Textausschnitte immer die gleiche Zeichenanzahl, was es schwierig macht, die gewünschte Schriftgröße mit dem Platzbedarf des Texts auf der Seite in Einklang zu bringen.

AMP bietet eine weitere Komponente, die speziell für diese Art von Situation entwickelt wurde: Die Komponente [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Mit [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) kannst du ein Element mit fester Breite und Höhe sowie eine maximale Schriftgröße definieren. Die Komponente skaliert die Schriftgröße auf intelligente Weise, um den Text an die verfügbare Breite und Höhe **anzupassen**.

Testen wir das. **Füge** zunächst die Bibliothek der Komponente zum Tag `<head>` hinzu:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

Füge deiner Seite Folgendes hinzu:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Aktualisiere** die Seite und sieh dir das Ergebnis an.

Experimentiere gerne noch weiter. Was passiert, wenn das Zitat viel kürzer ist?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Und wenn es länger ist?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

Zum Schluss kannst du versuchen, mit [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) ein kurzes Textstück wie "Hallo" mit einer viel größeren Höhe (z. B. einem Wert von 400) zu erstellen und als Attributwert von "max-font-size" 42 beizubehalten. Wie wird die resultierende Seite aussehen? Ist der Text vertikal zentriert? Oder verkleinert sich die Höhe des Tags [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), um sich an die maximale Schriftgröße anzupassen? Versuche, mithilfe deines Wissens über das AMP Layoutsystem diese Fragen zu beantworten, bevor du den Code testest!

Weitere Informationen über [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) findest du in der [Live Demo von AMP by Example](../../../../documentation/examples/documentation/amp-fit-text.html).
