---
"$title": Esplorazione dei siti
"$order": '5'
description: La maggior parte dei siti web per dispositivi mobili comprende un menu di navigazione. Questi menu possono assumere molte forme diverse. In questa esercitazione, proveremo i seguenti esempi ...
---

La maggior parte dei siti web per dispositivi mobili comprende un menu di navigazione. Questi menu possono assumere molte forme diverse. In questa esercitazione, proveremo i seguenti esempi per offrire opzioni di navigazione nelle pagine AMP:

- Un collegamento alla pagina iniziale: l'opzione più semplice.
- Una barra di navigazione laterale che utilizza il componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Collegamento alla pagina iniziale

Il modo più semplice per consentire agli utenti di accedere alle normali opzioni di navigazione del proprio sito web è reindirizzarli alla pagina iniziale!

Prova a **sostituire** il tag `<header>` con questa versione che include un link:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
 <div class="site-name">News Site</div>
</header>
```

Poi, **aggiungere** queste regole di stile al proprio codice CSS inline:

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

Ora **aggiorniamo** la pagina. Dovrebbe apparire un collegamento nell'angolo in alto a sinistra della pagina che punta a `homepage.html`. Cliccando sull'icona home, scoprirai che non porta da nessuna parte (perché non abbiamo creato un file `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Questo collegamento può essere sostituito con l'URL della pagina iniziale del proprio sito web per consentire agli utenti di esplorare altre parti del sito attraverso le opzioni di navigazione esistenti.

Questo è l'approccio più semplice che sfrutta le opzioni di navigazione del sito già esistenti. Successivamente, esploreremo un'altra opzione popolare per la navigazione dei siti.

## Navigazione con una barra laterale

Una tecnica di esplorazione comunemente adottata consiste nell'aggiungere un'icona di menu che, se cliccata, propone una serie di collegamenti (sul lato della pagina). In AMP, possiamo creare tale menu con il componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Innanzitutto, dobbiamo **aggiungere** il codice JavaScript del componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) al tag `<head>`:

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

Successivamente, vogliamo visualizzare l'icona di un menu. Quando l'icona viene toccata, la barra laterale si apre. **Sostituiamo** la sezione `<header>` con il seguente codice per visualizzare un'icona ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) invece di un'icona home:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

Il precedente codice attiva la barra laterale con l'elemento `toggle` tramite l'attributo dell'azione [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) sull'elemento [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) identificato dall'ID `sidebar1`. Poi aggiungiamo la barra laterale.

**Aggiungere** il seguente codice HTML dopo la sezione `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

La nostra barra laterale sarà nascosta, ma quando l'utente tocca l'icona a forma di hamburger, il menu apparirà sul lato sinistro dello schermo. Per chiudere il menu, l'utente può toccare l'icona X.

Infine, **aggiungere** queste regole di stile al proprio codice CSS inline:

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
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Fatto. Ora vediamo la nostra barra laterale. **Aggiornare** e ricaricare la pagina AMP. Dovrebbe apparire qualcosa di questo tipo:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

La nostra pagina ha un bell'aspetto! Aggiungiamo un ultimo tocco: i caratteri personalizzati.
