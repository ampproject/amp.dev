---
"$title": Walidacja stron AMP
"$order": '0'
description: Obejrzyj nasz film o różnych opcjach walidacji. Kluczową zaletą AMP jest nie tylko to, że sprawia, że Twoje strony są szybkie, ale także to, że Twoje strony są....
formats:
- websites
- stories
- ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Watch our video about the various validation options.']

Kluczową zaletą AMP jest nie tylko to, że sprawia, że Twoje strony są szybkie, ale także to, że strony są szybkie w sposób, który można *zwalidować*. Dzięki temu strony trzecie, takie jak Twitter, Instagram czy wyszukiwarka Google mogą czuć się świetnie, serwując czytelnikom strony AMP w coraz bardziej interesujący sposób.

## Jak sprawdzić, czy moja strona AMP jest prawidłowa?

Dostępnych jest kilka sposobów walidacji dokumentu AMP. Wszystkie one dają dokładnie taki sam wynik, więc użyj tego z nich, który najbardziej pasuje do Twojego stylu programowania.

Oprócz prawidłowości kodu AMP możesz również sprawdzić, czy Twój dokument AMP jest [możliwy do odnalezienia](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) na platformach stron trzecich.

### Konsola programistyczna przeglądarki

Walidator AMP jest dostarczany w pakiecie z biblioteką JS AMP, dzięki czemu jest dostępny od razu na każdej stronie AMP. W celu walidacji:

1. Otwórz stronę AMP w przeglądarce.
2. Dodaj ciąg "`#development=[1,actions,amp,amp4ads,amp4email]`" do adresu URL, na przykład, `http://localhost:8000/released.amp.html#development=1` to starsza metoda walidacji formatu `AMP`. Następujący adres URL, `http://localhost:8000/released.amp.html#development=amp4email` umożliwia walidację dokumentu za pomocą specyfikacji AMP dla poczty e-mail.
3. Otwórz [konsolę Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) i sprawdź, czy nie ma błędów walidacji.

Błędy w konsoli programistycznej będą wyglądały podobnie do tego:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### Interfejs internetowy

Walidator AMP może być używany jako interfejs internetowy pod adresem <a href="https://validator.ampproject.org/">validator.ampproject.org</a>. Interfejs ten pokazuje błędy wyświetlane inline obok źródła HTML strony. Interfejs jest interaktywnym edytorem: zmiany w źródłowym kodzie html powodują interaktywną ponowną walidację.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### Rozszerzenie przeglądarki

Dostęp do walidatora AMP można uzyskać bezpośrednio z paska narzędzi przeglądarki przy użyciu rozszerzenia przeglądarki. Podczas przeglądania automatycznie zatwierdza on każdą odwiedzoną stronę AMP i wizualnie wskazuje jej prawidłowość za pomocą kolorowej ikony.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>W razie znalezienia błędów na stronie AMP ikona rozszerzenia jest wyświetlana w kolorze czerwonym i wskazuje liczbę napotkanych błędów.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>Jeśli na stronie AMP nie ma żadnych błędów, ikona jest wyświetlana w kolorze zielonym i wyświetla liczbę ewentualnych ostrzeżeń.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>Gdy strona nie zawiera kodu AMP, ale wskazuje, że dostępna jest wersja AMP, ikona jest wyświetlana w kolorze niebieskim z ikoną linku, a kliknięcie rozszerzenia przekierowuje przeglądarkę do wersji AMP.</td>
  </tr>
</table>

Rozszerzenie AMP Validator do przeglądarki [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) i [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Pakiety NPM do CI

W ramach tworzenia i testowania potoków można zintegrować walidację AMP za pomocą pakietów NPM walidatora AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) lub [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (wtyczka gulp). Można na przykład użyć pakietu NPM walidatora AMP do testów integracji lub w zaplanowanym zadaniu weryfikacji produkcyjnych stron AMP.

##### Przykład: walidacja pliku AMP HTML

W tym przykładzie, sprawdzamy poprawność pliku AMP HTML używając pakietu NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator). Status walidacji jest wyprowadzany do konsoli.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

##### Przykład: użycie zadania gulp do walidacji AMP HTML

W tym przykładzie mamy zadanie gulp, które sprawdza poprawność wszystkich plików AMP HTML.  W przypadku wystąpienia błędu walidacji AMP zadanie kończy się z kodem błędu (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### Narzędzie wiersza polecenia

Walidację plików AMP HTML można wykonać za pomocą narzędzia [wiersza polecenia walidatora AMP HTML](https://www.npmjs.com/package/amphtml-validator).

Rozpoczęcie:

1. Upewnij się, że masz w systemie [Node.js z menedżerem pakietów „npm”](https://docs.npmjs.com/getting-started/installing-node).
2. Zainstaluj [narzędzie wiersza polecenia walidatora AMP HTML](https://www.npmjs.com/package/amphtml-validator), wykonując następujące polecenie: `npm install -g amphtml-validator`.

Teraz wykonajmy walidację rzeczywistej strony AMP HTML:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Co nie dziwi, strona ta jest prawidłową stroną AMP HTML. Wypróbujmy stronę, która nie jest prawidłowa: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Aby uruchomić polecenie `amphtml-validator`, możesz podać adres URL strony lub nazwę pliku lokalnego. Pobierz i zapisz stronę [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) do pliku, a następnie uruchom polecenie:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Format komunikatów o błędach składa się z nazwy pliku, wiersza, kolumny i komunikatu, po których często następuje link do dokumentacji referencyjnej AMP HTML. Niektóre edytory, takie jak Emacs, mogą zinterpretować ten format i pozwolić użytkownikowi przejść do błędów w oryginalnym pliku.

Jako dobry punkt wyjścia do tworzenia własnej strony AMP należy rozważyć stronę [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Narzędzie wiersza polecenia oferuje dodatkowe funkcje, takie jak wyłączanie koloru, drukowanie danych wyjściowych JSON lub uruchamianie określonej wersji walidatora JavaScript (domyślnie uruchamiany jest najnowszy opublikowany skrypt).

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

## Co się dzieje, jeśli strona jest nieprawidłowa?

Walidator AMP nie jest jedynie udogodnieniem dla Ciebie podczas programowania. Jest również używany przez takie platformy jak Twitter czy Google, które integrują strony AMP z treścią i wynikami wyszukiwania. Co więcej, zazwyczaj nie żądają one stron bezpośrednio z Twojego serwera, tylko korzystają z Google AMP Cache, bezpłatnej usługi, która buforuje strony i udostępnia je na całym świecie, dzięki czemu są one ładowane jeszcze szybciej.

Jeśli usługa walidacji AMP wykrywa błędy w kodzie strony, nie będzie ona odnajdywana i rozpowszechniana przez witryny internetowe stron trzecich i nie pojawi się na serwerze buforującym Google AMP Cache. Nie tylko tracisz wówczas korzyści związane z szybkością działania usługi buforowania, ale prawdopodobnie Twoja strona w wielu miejscach nie będzie widoczna! To byłby wstyd, więc upewnijmy się, że do tego nie dojdzie.

## Jak naprawić błędy walidacji?

Większość błędów walidacja łatwa jest usunąć i naprawić. Spójrz na ten znacznik HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Generuje on ten błąd walidacji AMP, pokazywany w tych różnych narzędziach:

- Konsola programistyczna przeglądarki {amp-img0}{/amp-img0}



- Interfejs internetowy {amp-img0}{/amp-img0}



- Rozszerzenie przeglądarki {amp-img0}{/amp-img0}



Każde z narzędzi podaje kilka informacji:

1. Położenie (wiersz i kolumna) w dokumencie HTML, w którym wystąpił błąd, w niektórych interfejsach klikalne w celu wyróżnienia odpowiedniego miejsca. W tym przypadku problem występuje w wierszu 11, kolumna 2.
2. Wiersz tekstu opisującego błąd. W tym przypadku tekst wskazuje, że używamy znacznika `<img>`, a należy użyć znacznika [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
3. Link do odpowiedniego dokumentu na temat błędu. W tym przypadku jest to dokumentacja znacznika [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Nie wszystkie błędy generują linki do dokumentacji.

Uważnie czytając ponownie [specyfikację](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md), zdajemy sobie sprawę, że używamy znacznika `<img>`, a należało użyć znacznika [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Aby lepiej zrozumieć pełną listę możliwych błędów, sprawdź [przewodnik po błędach walidacji AMP](validation_errors.md). Jeśli po dokładnej ocenie nadal tkwisz w miejscu, [zadaj pytanie](validation_errors.md), a my postaramy się pomóc.
