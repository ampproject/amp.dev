---
"$title": Tworzenie strony AMP wymagającej zalogowania
"$order": '0'
description: Niektóre interakcje użytkownika z daną stroną, takie jak pozostawienie komentarza, mogą być uwarunkowane przez przepływ logowania. Możesz zaimplementować przepływ logowania...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

Niektóre interakcje użytkownika z daną stroną, takie jak pozostawienie komentarza, mogą być uwarunkowane przez przepływ logowania. Możesz zaimplementować przepływ logowania za pomocą AMP, stosując składnik [`amp-access`](../../../../documentation/components/reference/amp-access.md) w połączeniu ze składnikiem [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **PORADA —** aby zobaczyć przykładową implementację, odwiedź [przykład sekcji komentarzy](../../../../documentation/examples/documentation/Comment_Section.html) w witrynie internetowej [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

[Próbka sekcji komentarzy](../../../../documentation/examples/documentation/Comment_Section.html) łączy w sobie składniki [`amp-access`](../../../../documentation/components/reference/amp-access.md) i [`amp-form`](../../../../documentation/components/reference/amp-form.md) w celu utworzenia sekcji komentarzy, która jest uaktywniana dopiero po zalogowaniu się przez użytkownika. Aby wyjaśnić jak działa ta próbka kodu, przejdźmy do zestawu działań, które zostaną wykonane po wylądowaniu na stronie.
