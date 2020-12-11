---
"$title": Przygotowywanie strony do odnajdywania i dystrybucji
"$order": '4'
description: 'W niektórych przypadkach można serwować zarówno wersję tej samej strony bez AMP jak i z AMP, na przykład artykuł informacyjny. Rozważ to: jeśli wyszukiwarka Google...'
author: pbakaus
contributors:
- bpaduch
---

W niektórych przypadkach można serwować zarówno wersję tej samej strony bez AMP jak i z AMP, na przykład artykuł informacyjny. Rozważ to: jeśli wyszukiwarka Google znajdzie wersję tej strony bez AMP, *skąd ma wiedzieć, że istnieje wersja AMP*?

## Powiązywanie stron znacznikami `<link>`

Aby wskazać, że strona bez AMP i strona AMP powinny być traktowane jako „sparowane”, dodajemy informację o stronie AMP do strony bez AMP i odwrotnie za pomocą znaczników `<link>` w sekcji `<head>`.

Do strony bez AMP dodaj:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Do strony AMP dodaj to:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Co zrobić, jeśli mam tylko jedną stronę?

Jeśli masz tylko jedną stronę i jest to strona AMP, musisz dodać do niej link kanoniczny, wskazujący na nią samą:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o tym, jak Google znajduje strony AMP w [wytycznych wyszukiwarki Google dotyczących stron AMP)](https://support.google.com/webmasters/answer/6340290). [/tip]
