---
$title: Wstępne ładowanie czcionek internetowych
$order: 140
tags:
- lcp
---

Ładowanie wstępne pozwala na najszybsze poinformowanie przeglądarki o zasobach krytycznych, które chcesz załadować. Odbywa się to, zanim jeszcze zostaną one odkryte w kodzie HTML! Jest to szczególnie niesamowite w przypadku zasobów używanych w pierwszym okienku na ekranie i na całej stronie, takich jak czcionki. Aby to zrobić, dodaj atrybut `rel="preload"` do takich zasobów jak w następującym przykładzie:

```
<link href="font.woff2" rel="preload">
```
