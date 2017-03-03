---
$title: Weryfikacja stron AMP
---

Główną zaletą AMP nie jest to, że dzięki niemu strony działają szybciej, tylko to, że tę szybkość uzyskujemy za pomocą standardu, który można *weryfikować*. W ten sposób serwisy takie jak Twitter, Instagram czy wyszukiwarka Google, mogą w coraz bardziej interesujący sposób oferować użytkownikom swoje treści.

## Jak mogę sprawdzić, czy moja strona AMP jest prawidłowa?

Dokument AMP można sprawdzić na kilka sposobów. Każdy z nich da ten sam efekt, możesz więc korzystać z tego, który najbardziej Ci odpowiada.

Poza przeprowadzeniem weryfikacji AMP warto też upewnić się, czy Twój dokument AMP jest [wykrywalny](/docs/guides/discovery.html) na platformach zewnętrznych.

### Developer Console w przeglądarce

Narzędzie do weryfikacji stron AMP jest dołączane do biblioteki AMP JS, jest więc dostępne na każdej stronie AMP. Aby przeprowadzić weryfikację:

  * Otwórz stronę AMP w przeglądarce.
  * Dołącz do adresu URL atrybut „`#development=1`”, na przykład `http://localhost:8000/released.amp.html#development=1`
  * Otwórz [konsolę Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) i sprawdź błędy weryfikacji.

Błędy Developer Console będą wyglądać mniej więcej tak:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Zrzut ekranu narzędzia do weryfikacji stron AMP w konsoli chrome" layout="responsive"></amp-img>


### Interfejs internetowy

Narzędzia do weryfikacji stron AMP można użyć w postaci interfejsu internetowego
na stronie [validator.ampproject.org](https://validator.ampproject.org/). Interfejs ten pokazuje błędy wyświetlone w tekście obok źródła HTML strony.
Jest to edytor interaktywny: zmiany w źródle html powodują automatyczną, ponowną weryfikację.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Zrzut ekranu ze strony validator.ampproject.org z przykładami błędów." layout="responsive"></amp-img>


### Rozszerzenie do przeglądarki

Narzędzie do weryfikacji stron AMP można otworzyć bezpośrednio z przeglądarki za pomocą odpowiedniego rozszerzenia. Podczas przeglądania rozszerzenie automatycznie zweryfikuje każdą odwiedzoną stronę AMP, wyświetlając informacje weryfikacyjne za pomocą kolorowych ikon.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Czerwona ikona AMP informująca o nieprawidłowym dokumencie AMP." layout="fixed"></amp-img>
      
    </td>
    <td>W przypadku wykrycia błędów na stronach AMP pojawi się czerwona ikona rozszerzenia pokazująca liczbę znalezionych błędów.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Zielona ikona wskazująca poprawny dokument AMP." layout="fixed"></amp-img>
      
    </td>
    <td>Gdy rozszerzenie nie wykryje błędów na stronie AMP, ikona będzie zielona i wyświetli liczbę ostrzeżeń, jeśli jakieś będą.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Niebieska ikona wskazująca po kliknięciu wariant AMP HTML." layout="fixed"></amp-img>
      
    </td>
    <td>Gdy strona nie jest stroną AMP, ale wyświetla informację o dostępnej wersji AMP, ikona ma postać linku w kolorze niebieskim. Kliknięcie rozszerzenia spowoduje przekierowanie przeglądarki do wersji AMP.
    </td>
  </tr>
</table>

Rozszerzenie narzędzia do weryfikacji stron AMP do przeglądarek [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) i [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Narzędzie wiersza poleceń

Warunkiem wstępnym może być konieczność [zainstalowania w systemie platformy Node.js z menedżerem pakietów `npm`](https://docs.npmjs.com/getting-started/installing-node).

Aby zainstalować [narzędzie wiersza poleceń weryfikatora stron AMP HTML](https://www.npmjs.com/package/amphtml-validator), wpisz `npm install -g amphtml-validator`.

A teraz zweryfikujemy istniejącą stronę AMP HTML.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Jak można się było spodziewać, ta strona zawiera prawidłowy kod AMP HTML. Sprawdźmy zatem stronę z błędami:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Aby uruchomić polecenie `amphtml-validator`, można podać adres URL strony albo ścieżkę do pliku zapisanego lokalnie. Pobierz i zapisz do pliku stronę [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html), i uruchom:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

Format komunikatów o błędach składa się z nazwy pliku, linii, kolumny i komunikatu, po którym często następuje link do materiałów o AMP HTML. Niektóre edytory, np. Emacs (poszukaj polecenia kompilacji oraz trybu kompilacji), mogą interpretować ten format i umożliwić Ci przechodzenie bezpośrednio do błędów w pliku oryginalnym.

Dobrym punktem początkowym w tworzeniu własnej strony AMP jest [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Narzędzie wiersza polecenia oferuje dodatkowe funkcje, w tym wyłączanie koloru, wydruk składni JSON czy uruchamianie określonej wersji weryfikatora JavaScriptu (domyślnie uruchamiany jest ostatnio opublikowany skrypt).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Co się stanie, jeśli moja strona okaże się nieprawidłowa?

Narzędzie do weryfikacji stron AMP ułatwia nie tylko tworzenie kodu. Korzystają z niego również platformy takie jak Twitter czy Google, integrujące Twoje strony AMP we własnych treściach i wynikach wyszukiwania. Co więcej, takie platformy zwykle nie żądają stron bezpośrednio z Twojego serwera, tylko korzystają z pamięci podręcznej Google AMP Cache – darmowej usługi przechowującej Twoje strony w pamięci podręcznej – co umożliwia jeszcze szybsze wczytywanie ich w dowolnym miejscu świata.

Jeśli usługa weryfikacji AMP znajdzie jakąś nieprawidłowość na Twojej stronie, nie zostanie ona wykryta przez witryny firm zewnętrznych i nie będzie przez nie rozpowszechniana. Nie pojawi się również w pamięci podręcznej Google AMP Cache. W takim przypadku nie tylko utracisz korzyści płynące z korzystania z pamięci podręcznej. Prawdopodobnie Twoja strona nie wyświetli się w wielu miejscach. Byłaby to wielka szkoda, dopilnujmy więc, by tak się nie stało.

## Jak naprawić błędy wynikające ze sprawdzania poprawności kodu?

Większość błędów zgłoszonych w ramach weryfikacji można łatwo naprawić. Weźmy na przykład ten tag HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Generuje on błąd weryfikacji AMP zgłaszany przez narzędzia:

* Developer Console w przeglądarce
<amp-img alt="Błąd AMP: tag „img” może się pojawiać tylko jako element podrzędny tagu „noscript”.Czy chodziło Ci o „amp-img”?linia 11, kolumna 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

* Interfejs internetowy
<amp-img alt="Błąd AMP: tag „img” może się pojawiać tylko jako element podrzędny tagu „noscript”.Czy chodziło Ci o „amp-img”?linia 11, kolumna 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

* Rozszerzenie do przeglądarki
<amp-img alt="Błąd AMP: tag „img” może się pojawiać tylko jako element podrzędny tagu „noscript”.Czy chodziło Ci o „amp-img”?linia 11, kolumna 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Każde z tych narzędzi podaje kilka informacji:

1. Lokalizacja (linia i kolumna) w dokumencie HTML, w której wystąpił
     błąd. W niektórych interfejsach tę informację można kliknąć, by ją podświetlić w dokumencie. W tym przypadku problem pojawił się w linii 11, w kolumnie 2</li>
1. Linia tekstu opisującego błąd. W tym przypadku tekst wskazuje, że
     używamy tagu `<img>`, a powinniśmy używać tagu `<amp-img>`.</li>
1. Link do odpowiedniego dokumentu z informacjami o błędzie. W tym przypadku dokumentacja dotyczy tagu `<amp-img>`. Nie wszystkie błędy generują linki do dokumentacji.

Czytając uważnie specyfikację, zauważamy, że w kodzie znajduje się tag `<img>` zamiast tagu `<amp-img>`.

Aby poznać pełną listę potencjalnych błędów, zapoznaj się z [przewodnikiem po błędach weryfikacji AMP](https://www.ampproject.org/docs/reference/validation_errors.html).
Jeśli po dokładnym sprawdzeniu, wciąż masz problem, [zadaj pytanie](http://stackoverflow.com/questions/tagged/amp-html) – postaramy się pomóc.
