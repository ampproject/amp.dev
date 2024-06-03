---
'$title': Nawigacja w witrynie
$order: 5
description: Większość mobilnych witryn internetowych ma menu nawigacyjne. Menu te mogą przybierać różne formy. W tym samouczku wypróbujemy następujące przykłady...
---

Większość mobilnych witryn internetowych ma menu nawigacyjne. Menu te mogą przybierać różne formy. W tym samouczku wypróbujemy do prezentacji nawigacji na stronach AMP następujące przykłady:

- Link powrotu do strony głównej — najprostsza opcja.
- Boczny pasek nawigacyjny przy użyciu składnika [`{amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Link powrotu do strony głównej

Najprostszym sposobem zapewnienia użytkownikom dostępu do zwykłych opcji nawigacji witryny jest po prostu przeniesienie ich z powrotem na stronę główną!

Spróbuj **zastąpić** znacznik `<header>` tą wersją, zawierającą odpowiedni link:

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

**Dodaj** tez te reguły stylu do kodu CSS inline:

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

Teraz **odśwież** stronę. W lewym górnym rogu strony powinien być wyświetlany link do pliku `homepage.html`. Jeśli klikniesz ikonę strony głównej, szybko odkryjesz, że nie prowadzi ona donikąd (ponieważ nie mamy pliku `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Ten link można zastąpić adresem URL strony głównej Twojej witryny internetowej, aby umożliwić użytkownikom nawigację do innych części witryny za pomocą istniejącej nawigacji Twojej witryny internetowej.

Jest to najprostsze podejście, które wykorzystuje istniejącą nawigację witryny internetowej. Następnie zbadamy popularną opcję nawigacji witryny internetowej.

## Nawigacja na pasku bocznym

Powszechnie stosowaną techniką nawigacji jest dodanie ikony menu, która po kliknięciu odsłania zestaw linków nawigacyjnych (z boku strony). W AMP możemy utworzyć taką nawigację za pomocą składnika [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Najpierw musimy **dodać** JavaScript składnika [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) do sekcji `<head>`:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

Następnie chcemy wyświetlić ikonę menu. Po dotknięciu ikony otworzy się pasek boczny. **Zastąp** sekcję `<header>` następującym kodem, aby wyświetlić ikonę [„hamburger”](https://en.wikipedia.org/wiki/Hamburger_button), zamiast ikony z domkiem:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

W powyższym kodzie przełączamy pasek boczny za pomocą działania `toggle` atrybutu [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) w elemencie [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), identyfikowanego za pomocą identyfikatora `sidebar1`. Dodajmy pasek boczny.

**Dodaj** następujący kod HTML tuż za znacznikiem `</header>`:

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

Nasz pasek boczny będzie ukryty, ale gdy użytkownik dotknie ikony hamburgera, z lewej strony ekranu pojawi się menu. Aby zamknąć menu, użytkownik może dotknąć ikony X.

Na koniec **dodaj** te reguły stylu do swojego CSS inline:

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

Sprawdźmy nasz pasek boczny. Odśwież i ponownie załaduj stronę AMP. Powinna wyglądać mniej więcej tak:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Nasza strona wygląda świetnie! Dodajmy finalny akcent — czcionkę niestandardową.
