---
'$title': AMP dla poczty e-mail — najlepsze praktyki
$order: 1
'$category': Develop
formats:
  - email
---

AMP umożliwia stosowanie nowych, ekscytujących i angażujących treści w poczcie elektronicznej! Projektując pocztę elektroniczną, należy pamiętać o następujących najlepszych praktykach, aby zapewnić jej wydajność, niezawodność na różnych platformach i działanie zgodną z oczekiwaniami użytkowników.

#Szybkość

W przypadku używania składnika [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) do dynamicznego pobierania zawartości należy umieścić w nim atrybut placeholder, aby zachować integralność struktury składników. Placeholder powinien mieć układ jak najbardziej zbliżony do dokumentu po zwróceniu żądanych danych. Dzięki temu nie zmieni się znacząco rozmiar wiadomości ani układ.

#Użyteczność i dostępność

- W razie stosowania składnika [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email) należy ustawić atrybut `controls`. Umożliwi to nawigację w karuzeli użytkownikom urządzeń z ekranem dotykowym, takich jak smartfony.
- W razie stosowania składnika [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) należy pamiętać, że w systemie iOS nie są obsługiwane wszystkie typy danych wejściowych. Więcej informacji na ten temat można znaleźć w sekcji [Supported Input Values](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) (Obsługiwane wartości wejściowe) w witrynie Safari HTML Reference.
- Nie wszystkie [wartości atrybutów `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) są obsługiwane przez różne aplikacje i przeglądarki. Zakładaj, że atrybut autocomplete jest niedostępny dla użytkowników i twórz krótkie formularze.

#Stylizacja

- Upewnij się, że w wiadomości e-mail używany jest tylko [CSS obsługiwany AMP dla poczty e-mail](../learn/email-spec/amp-email-css.md?format=email)
- Unikaj używania jednostek okienek ekranu (`vw`, `vh`, `vmin` i `vmax`) w kodzie CSS i HTML. Wiadomości e-mail AMP są renderowane w ramkach iframe, więc okienko ekranu wiadomości e-mail nie pasuje do okienek ekranu przeglądarki.
- Różne przeglądarki mają różną domyślną stylizację CSS. Używaj biblioteki CSS, która w razie potrzeby normalizuje style. Więcej informacji na temat domyślnych stylów, normalizacji stylów i listę dostępnych bibliotek zawiera artykuł w języku angielskim [Reboot, Resets, and Reasoning](https://css-tricks.com/reboot-resets-reasoning/).
- Uważaj ze stosowaniem właściwości overflow do marginesów w CSS: mogą nie być renderowane z powodu [ograniczenia układu AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Urządzenia mobilne

Upewnij się, że wiadomość wygląda dobrze na ekranach o wszystkich rozmiarach, stosując [zmienne CSS media query](style_and_layout/control_layout.md?format=email) do identyfikacji urządzeń. Wiadomości należy testować na urządzeniach mobilnych, aby upewnić się, że ich układ jest prawidłowy, a składniki działają zgodnie z oczekiwaniami.

#Inne nieintuicyjne konstrukcje

Podczas pracy z AMP dla poczty e-mail należy pamiętać o następujących poradach i wskazówkach:

- Plac zabaw AMP dla poczty e-mail nie wykonuje buforowania proxy obiektów XHR, ale niektórzy dostawcy poczty elektronicznej tak.
- Część MIME AMP powinna znajdować się przed częścią MIME HTML w wiadomości e-mail, aby zapewnić maksymalną kompatybilność między klientami poczty elektronicznej.
- Znacznika atrybutu `src` składnika [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) składnika [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), `src` składnika [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) ani atrybutu href `<a>` nie może zmieniać składnik [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Wiadomości powinny zawierać statyczną wersję HTML w przypadku, gdy użytkownik przejdzie do wiadomości w wersji HTML lub przekaże wiadomość dalej.
