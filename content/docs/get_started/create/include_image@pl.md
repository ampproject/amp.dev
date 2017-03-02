---
$title: Dołączanie obrazów
---

Większość tagów HTML może być używanych bezpośrednio w kodzie AMP HTML, ale niektóre z nich, na przykład znacznik `<img>`, są zastępowane przez równoważne lub nieznacznie rozszerzone, niestandardowe tagi AMP HTML (a kilka problematycznych znaczników zostało zdecydowanie wykluczonych, zobacz [Tagi HTML w specyfikacji](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Przedstawiony poniżej kod wymagany do umieszczenia obrazu na stronie demonstruje wygląd tych dodatkowych znaczników:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Uzasadnienie zamiany znaczników w rodzaju `<img>` na `<amp-img>` oraz informacje o liczbie dostępnych znaczników znajdziesz w części [Dołączanie ramek iframe i multimediów](/docs/guides/amp_replacements.html).

<a class="go-button button" href="/pl/docs/get_started/create/presentation_layout.html">Przejdź do kroku 3</a>
