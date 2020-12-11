---
"$title": Tworzenie powłoki dla reklamy
"$order": '0'
description: Za pomocą swojego ulubionego edytora tekstów utwórz plik HTML o nazwie my-amphtml-ad.html. Skopiuj do tego pliku następujący znacznik HTML...
---

[Kod HTML wymagany dla reklamy AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) jest wariantem [kodu AMPHTML wymaganego dla strony AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Zapoznajmy się z wymaganym kodem, tworząc powłokę naszej reklamy AMPHTML.

Za pomocą swojego ulubionego edytora tekstów utwórz plik HTML o nazwie **`my-amphtml-ad.html`**. Skopiuj do tego pliku następujący znacznik HTML:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

Są to znaczniki prostego, prawidłowego pliku HTML. Zauważ, że dołączyliśmy znacznik `meta` viewport, dzięki czemu mamy [responsywne okienko na ekranie](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Zmodyfikujmy teraz kod HTML, aby uczynić z niego reklamę AMPHTML.

W sekcji `<html> `dodaj atrybut `⚡4ads`, który identyfikuje dokument jako reklamę AMPHTML. Można też określić atrybut `amp4ads`, który jest również prawidłowy.

```html
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"] **UWAGA —** w odróżnieniu od stron AMP, [reklamy AMPHTML nie wymagają znacznika `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Reklamy AMPHTML wymagają własnej wersji środowiska uruchomieniowego AMP, więc dodaj następujący znacznik `<script>` do sekcji `<head>` dokumentu:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

Kreacje reklamowe AMPHTML wymagają innej i znacznie prostszej linii stylu [boilerplate](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) niż strony AMP. Dodaj następujący kod do swojej sekcji `<head>`:

```html
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

Aby nadać styl reklamie AMPHTML, kod CSS musi być osadzony w dokumencie AMPHTML przy użyciu znaczników `<style amp-custom</style>` w sekcji `<head>`. Jako że renderujemy prostą reklamę graficzną, nie wymagamy żadnego kodu CSS, więc nie będziemy dodawać tych znaczników.

[tip type="note"] **UWAGA —** w przypadku reklam AMPHTML maksymalny rozmiar arkusza stylów inline wynosi *20 kilobajtów*. Dowiedz się więcej o [wymaganiach dotyczących CSS w specyfikacji reklam AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Oto kompletny kod Twojego pliku HTML:

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

Masz teraz prawidłową reklamę AMPHTML, choć dość pustą. Utwórzmy reklamę graficzną.
