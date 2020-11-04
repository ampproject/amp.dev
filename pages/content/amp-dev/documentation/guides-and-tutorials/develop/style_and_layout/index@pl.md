---
$path: /documentation/guides-and-tutorials/develop/style_and_layout/index.html
$localization:
  path: /{locale}/documentation/guides-and-tutorials/develop/style_and_layout/index.html
$title: Styl i układ
$order: 0
description: Określanie stylów i układ na stronach AMP HTML jest bardzo podobne jak w przypadku zwykłych stron HTML — w obu przypadkach będziesz używać CSS.
$hidden: true
author: pbakaus
contributors:
- Meggin
---

Określanie stylów i układ na stronach AMP HTML jest bardzo podobne jak w przypadku zwykłych stron HTML — w obu przypadkach będziesz używać CSS.

Ze względu na wydajność i użyteczność, AMP [ogranicza niektóre style CSS](style_pages.md) i całkowitą liczbę bajtów do 75 000 na jedną stronę. AMP rozszerza jednak możliwości responsywnego projektowania o funkcje takie jak: [symbole zastępcze i zasoby rezerwowe](placeholders.md), [zaawansowane sterowanie grafiką przy użyciu atrybutu srcset](art_direction.md) oraz [atrybut layout](control_layout.md) zwiększający kontrolę nad sposobem wyświetlania elementów.

[tip type="tip"] **PORADA —** w AMP bardzo łatwo jest tworzyć elementy responsywne. Wystarczy umieścić w nich `layout="responsive"`. Aby dowiedzieć się więcej o projektowaniu elementów responsywnych w AMP, przejdź do artykułu [Tworzenie responsywnych stron AMP](responsive_design.md). [/tip]

## Dodaj style do strony <a name="add-styles-to-a-page"></a>

Każda strona AMP ma limit 75 000 bajtów kodu CSS. Style zdefiniowane w nagłówku dokumentu i inline liczą się do tego limitu.

### Definiowanie stylów w sekcji head

Zdefiniuj CSS w znaczniku `<style amp-custom>` w sekcji head dokumentu. W każdej stronie AMP dozwolony jest tylko jeden znacznik `<style amp-custom>`.

[sourcecode:html] <!doctype html>

       ...     <style amp-custom=""><br>      /* any custom styles go here. */<br>      body {<br>        background-color: white;<br>      }<br>      amp-img {<br>        border: 5px solid black;<br>      }<br></style>

```
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>
...
```

   [/sourcecode]

Składniki AMP i elementy HTML można stylizować za pomocą klas lub selektorów przy użyciu typowych właściwości CSS:

[sourcecode:html]

   <p>Hello, Kitty.</p>   {amp-img1}   {/amp-img1}  [/sourcecode]

### Definiowanie stylów  inline

W AMP można stosować style inline:

[sourcecode:html]

   <p style="color:pink;margin-left:30px;">Hello, Kitty.</p>  [/sourcecode]

Każde wystąpienie stylu inline ma limit 1000 bajtów. Style inline liczą się do całkowitego limitu 75 000 bajtów.

## Responsywne rozmieszczanie elementów

Określ rozmiar i położenie wszystkich widocznych elementów AMP poprzez podanie atrybutów `width` i ` height`. Atrybuty te określają współczynnik proporcji elementu, który można następnie skalować wraz z kontenerem.

Ustaw układ jako responsywny. Rozmiar elementu jest wskutek tego dopasowany do szerokości elementu jego kontenera i automatycznie zmienia jego wysokość zgodnie z współczynnikiem proporcji podanym za pomocą atrybutów width i height.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o [układach obsługiwanych w AMP](control_layout.md) [/tip]

## Stosowanie symboli zastępczych i zasobów rezerwowych

Wbudowana obsługa symboli zastępczych i zasobów rezerwowych oznacza, że użytkownicy nigdy więcej nie będą musieli wpatrywać się w pusty ekran.

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o [symbolach zastępczych zasobach rezerwowych](placeholders.md) [/tip]

## Kontrola zasobów obrazów

AMP obsługuje zarówno atrybuty `srcset` jak i `sizes `, aby dać Ci szczegółową kontrolę nad obrazami, które mają być ładowane w poszczególnych scenariuszach.

[tip type="read-on"] <strong>CZYTAJ DALEJ —</strong> dowiedz się więcej o <a>kontrolowaniu grafiki za pomocą atrybutów srcset i sizes</a> [/tip]

## Walidacja stylów i układu

Użyj walidatora AMP do testowania wartości CSS i układu strony.

Walidator sprawdza, czy CSS strony nie przekracza limitu 75 000 bajtów, czy strona zawiera niedozwolone style i czy układ strony jest obsługiwany oraz poprawnie sformatowany. Zobacz również pełną listę [Błędy stylu i układu strony](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#style-and-layout-errors).

Przykładowy błąd w konsoli, dotyczący strony z kodem CSS, który przekracza limit 75 000 bajtów:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

[tip type="read-on"] **CZYTAJ DALEJ —** dowiedz się więcej o [walidacji i naprawie stron AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) [/tip]
