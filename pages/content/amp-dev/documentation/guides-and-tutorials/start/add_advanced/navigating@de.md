---
'$title': Navigation auf deiner Website
$order: 5
description: Die meisten mobilen Websites enthalten ein Navigationsmenü. Solche Menüs können ganz unterschiedlich aussehen. In diesem Tutorial testen wir …
---

Die meisten mobilen Websites enthalten ein Navigationsmenü. Solche Menüs können ganz unterschiedlich aussehen. In diesem Tutorial testen wir die folgenden Beispiele für die Darstellung der Navigation auf AMP Seiten:

- ein Link zurück zu deiner Homepage; das ist die einfachste Option.
- eine Navigationsrandleiste mithilfe der Komponente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md)

## Link zur Homepage

Leite deine Benutzer einfach zurück auf deine Homepage, wenn du ihnen auf unkomplizierte Weise die regulären Navigationsoptionen deiner Website verfügbar machen möchtest.

**Ersetze** dazu dein Tag `<header>` durch diese Version, die einen Link enthält:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

**Füge** diese Styleregeln zu deinem Inline CSS hinzu:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

**Aktualisiere** nun die Seite. In der oberen linken Ecke der Seite sollte ein Link zu `homepage.html` zu sehen sein. Wenn du auf das Home Symbol klickst, wirst du feststellen, dass es nirgendwohin führt (da wir die Datei `homepage.html` nicht haben).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Navigation via Home Symbol') }}

Du kannst diesen Link durch die URL der Homepage deiner Website ersetzen, damit deine Benutzer über die Navigation deiner vorhandenen Website zu anderen Elementen deiner Website navigieren können.

Das ist der einfachste Weg, um die Navigation deiner vorhandenen Website zu nutzen. Als Nächstes untersuchen wir eine beliebte Navigationsoption für Websites.

## Navigiere via Randleiste

Häufig wird zur Navigation ein Menüsymbol hinzugefügt: Ein Klick darauf blendet eine Reihe von Navigationslinks ein (aus der Randleiste der Seite). In AMP können wird eine solche Navigation mit der Komponente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) erstellen.

Zuerst müssen wir das JavaScript der Komponente <a><code>amp-sidebar</code></a> zum Tag `<head>` <strong>hinzufügen</strong>:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

Als Nächstes wollen wir ein Menüsymbol anzeigen. Wenn du auf das Symbol tippst, wird die Randleiste geöffnet. **Ersetze** den `<header>` durch den folgenden Code, um anstelle eines Home Symbols das Symbol ["Hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) anzuzeigen:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

Im oben gezeigten Code schalten wir die Randleiste mithilfe von `toggle` im Aktionsattribut [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) um, das für das Element [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) gilt. Dieses ist durch die ID `sidebar1` gekennzeichnet. Fügen wir die Seitenleiste hinzu.

**Füge** den folgenden HTML Code direkt nach dem `</header>` hinzu:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Die Randleiste wird ausgeblendet, aber wenn Benutzer auf das Hamburgersymbol tippen, erscheint das Menü im linken Bildschirmbereich. Um das Menü zu schließen, können Benutzer auf das Symbol X tippen.

**Füge** zum Abschluss diese Styleregeln zu deinem Inline CSS hinzu:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Sehen wir uns die Randleiste mal an. **Aktualisiere** deine AMP Seite und lade sie neu. Sie sollte in etwa so aussehen:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navigation via Randleistenmenü') }}

Unsere Seite sieht großartig aus! Fügen wir nun eine benutzerdefinierte Schriftart hinzu, um ihr den letzten Schliff zu geben.
