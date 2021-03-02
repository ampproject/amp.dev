---
'$title': Dodawanie czcionek
$order: 6
description: 'Niestandardowe czcionki można osadzić w stronie AMP na dwa sposoby: 1. Za pomocą znacznika <link>: tylko czcionki z listy dozwolonych dostawców czcionek. 2. Poprzez użycie ...'
---

W AMP, aby maksymalnie skrócić czas ładowania dokumentów, nie można dołączać zewnętrznych arkuszy stylów. Jest jednak jeden wyjątek od tej reguły — **czcionki**.

Niestandardowe czcionki można osadzić w stronie AMP na dwa sposoby:

1. Za pomocą znacznika `<link>` (tylko dostawcy czcionek z listy dozwolonych).
2. Poprzez użycie reguły CSS `@font-face`: nie ma żadnych ograniczeń, dozwolone są wszystkie czcionki.

W tym samouczku użyjemy znacznika `<link>`, aby dodać czcionki do naszej strony. **Dodaj ** link do arkusza stylów w sekcji `<head>`, aby zażądać czcionki Raleway:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Teraz **zaktualizuj** selektor CSS `body`, aby dodać odnośnik do czcionki Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Odśwież** stronę i sprawdź jej nowy wygląd. Ponadto należy sprawdzić wynik walidatora AMP. Nie powinno być żadnych błędów dotyczących tego żądania zewnętrznego arkusza stylów.

[tip type="note"] Czcionki internetowe mogą mieć negatywny wpływ na działanie witryny internetowej, nawet w przypadku ogólnie szybkich witryn AMP. Użyj właściwości CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) w celu zoptymalizowania sposobu ładowania czcionek. [/tip]

Twój artykuł informacyjny AMP jest gotowy! Oto, jak powinien wyglądać:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
