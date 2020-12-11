---
"$title": Rozpoczynanie relacji
"$order": '3'
description: Całą relację internetową reprezentuje element amp-story, który służy jako kontener na wszystkie strony relacji. Składnik amp-story odpowiada również za...
author: bpaduch
---

Całą relację internetową reprezentuje element [`amp-story`](../../../../documentation/components/reference/amp-story.md), który służy jako kontener na wszystkie strony relacji. Składnik [`amp-story`](../../../../documentation/components/reference/amp-story.md) odpowiada również za utworzenie powłoki interfejsu użytkownika, włącznie z obsługą gestów i nawigacji.

Składnik [`amp-story`](../../../../documentation/components/reference/amp-story.md) jest niestandardowym składnikiem AMP i podobnie jak w przypadku wszystkich składników niestandardowych, do dokumentu AMP należy dodać powiązany skrypt składnika.

**Otwórz** plik `pets.html` w edytorze tekstów i w sekcji `<head>`, **dodaj** następujący skrypt:

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

**Dodaj** element `<amp-story>` do sekcji `<body>` dokumentu i określ obowiązkowy atrybut `standalone`, tak jak tu:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Należy zauważyć, że aby relacja AMP była prawidłowa, element `<body>` musi mieć tylko jeden element podrzędny — składnik [`amp-story`](../../../../documentation/components/reference/amp-story.md); wszystkie inne elementy są zawarte w elemencie [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Podawanie metadanych

Aby relację można było odnaleźć w sieci, wymagane są określone metadane, niezbędne do podania drobnych szczegółów relacji, takich jak:

- Tytuł relacji, reprezentowany przez atrybut `title` (np. „Joy of Pets”).
- Nazwa wydawcy, reprezentowana przez atrybut `publisher` (np. „AMP tutorials”).
- Logotyp wydawcy, reprezentowany przez atrybut `publisher-logo-src`. Jest to adres URL obrazu logotypu, w formacie kwadratu o proporcjach 1x1.
- Obraz plakatu relacji, reprezentowany przez atrybut `poster-portret-src`. Jest to adres URL plakatu, a obraz musi mieć format pionowy o proporcjach 3x4.

Dodajmy te atrybuty do naszego znacznika [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Oprócz tych wymaganych atrybutów, są też inne atrybuty, które można zastosować. Aby dowiedzieć się więcej, zapoznaj się z sekcją dotyczącą [atrybutów ](../../../../documentation/components/reference/amp-story.md#attributes) w dokumentacji referencyjnej składnika [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **UWAGA —** te atrybuty metadanych nie zastępują żadnych danych strukturalnych (np. JSON-LD) na stronie, a jedynie je uzupełniają. Aby mieć pewność, że Twoje relacje internetowe są odnajdywane na wszystkich platformach, należy dodać [dane strukturalne](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) do wszystkich swoich stron AMP, z relacjami AMP włącznie. [/tip]

W tym momencie mamy powłokę relacji bez żadnej treści. Utwórzmy tę stronę.
