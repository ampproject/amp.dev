---
$title: Tworzenie widżetu UI z użyciem własnego kodu JavaScript
$order: 101
tutorial: true
author:
- morsssss
- CrystalOnScript
description: Dla materiałów internetowych wymagających znacznego dostosowania w AMP stworzono składnik amp-script, pozwalający na użycie dowolnego kodu JavaScript na stronie AMP bez wpływu na jej wydajność.
---

W tym samouczku nauczysz się jak używać składnika `<amp-script>`, który pozwala programistom pisać własny JavaScript w AMP. Użyjesz go do utworzenia widżetu, który sprawdza zawartość pola wprowadzania hasła i zezwala na jego przesłanie tylko wtedy, gdy spełnione są określone wymagania. AMP zapewnia już tę funkcjonalność za pomocą składnika `<amp-form>`, ale składnik `<amp-script>` umożliwia utworzenie własnego skryptu.

## Niezbędne są w tym celu

- Nowoczesna przeglądarka internetowa
- Podstawowa znajomość HTML, CSS i JavaScript
- Albo
    - lokalny serwer sieciowy i edytor kodu, taki jak [SublimeText](https://www.sublimetext.com) lub [VSCode](https://code.visualstudio.com/),
    - *albo* [CodePen](https://codepen.io/), [Glitch](https://glitch.com/) lub podobny plac zabaw online

## Opis ogólny

AMP ma na celu zwiększenie szybkości i stabilności witryn internetowych z punktu widzenia użytkowników. Nadmiar kodu JavaScript może spowodować, że strona będzie powolna. Czasami jednak trzeba stworzyć funkcjonalność, której nie zapewniają składniki AMP. W takich przypadkach można użyć składnika [`<amp-script>`](../../../documentation/components/reference/amp-script.md) do napisania własnego kodu JavaScript.

Zacznijmy!

# Rozpoczęcie pracy

Aby uzyskać kod początkowy, pobierz lub sklonuj [to repozytorium github](https://github.com/ampproject/samples/tree/master/amp-script-tutorial). Gdy to zrobisz, przejdź `cd` do utworzonego katalogu. Zobaczysz dwa katalogi: `starter_code` oraz `finished_code`. Katalog `finished_code` zawiera to, co utworzysz w ramach tego samouczka. Nie patrzmy więc jeszcze na to. Zamiast tego, przejdź `cd` do katalogu `starter_code`. Zawiera on stronę internetową, implementującą nasz formularz jedynie za pomocą składnika [`<amp-form>`](../../../documentation/components/reference/amp-form.md), bez użycia składnika `<amp-script>`.

Aby wykonać to ćwiczenie, musisz uruchomić serwer WWW na swoim komputerze. Gdy już to zrobisz, w zależności od Twojej konfiguracji, będziesz w stanie przejść do początkowej strony internetowej, wpisując w przeglądarce adres URL taki jak `http://localhost/amp-script-tutorial/starter_code/index.html`.

Możesz również skonfigurować szybki serwer lokalny używając czegoś takiego jak [serve](https://www.npmjs.com/package/serve), serwer oparty na statycznej zawartości [Node.js](https://nodejs.org/). Jeśli nie masz zainstalowanego środowiska Node.js, pobierz je [stąd](https://nodejs.org/). Po zainstalowaniu Node.js wpisz `npx serve` w wierszu polecenia. Następnie będziesz w stanie przejść do swojej strony internetowej tutaj:

`http://localhost:5000/`

Możesz również skorzystać z internetowego placu zabaw, takiego jak [Glitch](https://glitch.com/) lub [CodePen ](https://codepen.io/). Zawierają one ten sam kod, co repozytorium github i możesz zacząć od nich, jeśli tak wolisz!

Gdy już to zrobisz, zobaczysz naszą początkową stronę internetową:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/starter-form.jpg', 600, 325, layout='intrinsic', alt='Formularz internetowy z polami wprowadzania adresu e-mail i hasła', align='center' ) }}

Otwórz stronę `starter_code/index.html` w ulubionym edytorze kodu. Spójrz na HTML dla tego formularza. Zauważ, że `<input>` hasła zawiera ten atrybut:

```html
on="tap:rules.show; input-debounced:rules.show"
```

Dzięki temu AMP pokazuje reguły `<div>`, gdy użytkownik dotknie lub kliknie `<input>` hasła, a także po wprowadzeniu w tym polu dowolnego znaku. Wolelibyśmy użyć zdarzenia `focus`, które uwzględnia również przypadek, w którym użytkownik przechodzi do pola klawiszem tabulacji. W chwili pisania tego samouczka AMP nie przekazuje tego zdarzenia, więc nie mamy takiej opcji. Nie martw się. Zamierzamy to naprawić za pomocą składnika `<amp-script>`!

Element `<input>` hasła zawiera kolejny interesujący atrybut:

```html
pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-z\d]).{8,}$"
```

To wyrażenie regularne łączy w sobie zestaw mniejszych wyrażeń regularnych, z których każdy wyraża jedną z naszych zasad walidacji. AMP [zezwoli na przesłanie formularza](../../../documentation/components/reference/amp-form.md#verification) dopiero po dopasowaniu zawartości pola wprowadzania. Jeśli użytkownik spróbuje, zobaczy komunikat o błędzie, który podaje kilka szczegółów:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/starter-form-error.jpg', 600, 442, layout='intrinsic', alt='Formularz internetowy pokazujący komunikat o błędzie', align='center' ) }}

[tip type="note"] Dostarczony przez nas kod nie zawiera usługi internetowej, obsługującej przesyłanie formularzy, więc wysłanie formularza nie zda się na nic. Możesz oczywiście dodać tę funkcję do własnego kodu! [/tip]

Taki sposób działania jest do przyjęcia, ale niestety AMP nie potrafi wyjaśnić, która z naszych zasad weryfikacji zwróciła błąd. Nie może tego wiedzieć, ponieważ musieliśmy stłoczyć zasady w jedno wyrażenie regularne.

Teraz użyjmy składnika `<amp-script>`, aby utworzyć funkcję bardziej przyjazną dla użytkownika!

# Utworzenie funkcji na nowo z użyciem składnika <a>amp-script</a>

Aby użyć składnika `<amp-script>`, musimy zaimportować jego własny kod JavaScript. Otwórz stronę `index.html` i dodaj sekcji `<head>` co następuje.

```html
<head>
 ...
  <script async custom-element="amp-script" src="https://ampjs.org/v0/amp-script-0.1.js"></script>
  ...
</head>
```

Składnik `<amp-script>` pozwala nam napisać własny JavaScript inline lub w pliku zewnętrznym. W tym ćwiczeniu napiszemy wystarczająco dużo kodu, aby zasłużył on na osobny plik. Utwórz nowy katalog o nazwie `js`, i dodaj do niego nowy plik o nazwie `validate.js`.

Składnik `<amp-script>` pozwala skryptowi JavaScript na manipulowanie jego podrzędnymi modelami DOM — elementami, które zawiera składnik. Kopiuje podrzędne DOM do wirtualnego DOM i udziela kodowi dostępu do tego wirtualnego modelu DOM. W tym ćwiczeniu chcemy, aby nasz kod JavaScript kontrolował `<form>` i jego zawartość. Otoczymy zatem `<form>` w składniku  `<amp-script>`, w następujący sposób:

```html
<amp-script src="js/validate.js" layout="fixed" sandbox="allow-forms" height="500" width="750">
  <form method="post" action-xhr="#" target="_top" class="card">
    ...
  </form>
</amp-script>
```

Nasz składnik `<amp-script>` zawiera atrybut `sandbox="allow-forms"`. To instruuje AMP, że skrypt może modyfikować zawartość formularza.

AMP ma na celu zagwarantowanie szybkiego, wizualnie stabilnego wrażenia użytkownika, zatem nie zezwoli naszemu kodowi JavaScript na dokonywanie w dowolnym momencie nieograniczonych zmian w modelu DOM. Twój kod JavaScript może wprowadzić więcej zmian, jeśli rozmiar składnika `<amp-script>` nie może się zmienić. Umożliwia to również bardziej znaczące zmiany po interakcji z użytkownikiem. Szczegóły można znaleźć w [dokumentacji referencyjnej](../../../documentation/components/reference/amp-script.md). Do celów tego samouczka wystarczy wiedzieć, że określiliśmy typ `layout` inny niż `container` oraz użyliśmy atrybutów HTML do zablokowania rozmiaru składnika. To znaczy, że wszelkie manipulacje modelem DOM są ograniczone do określonego obszaru strony.

Jeśli używasz rozszerzenia [AMP Validator w przeglądarce Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc), zobaczysz teraz komunikat o błędzie:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/relative-url-error.png', 600, 177, layout='intrinsic', alt='Błąd dotyczący względnego adresu URL', align='center' ) }}

[tip type="note"] Jeśli nie masz tego rozszerzenia, dodaj `#development=1` do swojego adresu URL, a AMP wyświetli błędy walidacji w Twojej konsoli. [/tip]

Co to znaczy? Jeśli składnik `<amp-script>` ładuje swój JavaScript z pliku zewnętrznego, AMP wymaga podania bezwzględnego adresu URL. Możemy to naprawić, używając skryptu `http://localhost/js/validate.js`. AMP wymaga jednak również użycia protokołu [HTTPS](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https). I tak więc otrzymamy błąd walidacji, a konfigurowanie SSL na lokalnym serwerze WWW przekracza zakres tego samouczka. Aby to zrobić, możesz wykonać instrukcje z [tego wpisu](https://timonweb.com/posts/running-expressjs-server-over-https/).

Następnie możemy usunąć z formularza atrybut `pattern` i jego wyrażenie regularne: nie będziemy go już potrzebować!

Zamierzamy również usunąć atrybut `on`, który jest obecnie używany do instruowania AMP, że ma pokazywać zasady dotyczące naszego hasła. Jak wskazano powyżej, zamiast tego użyjemy składnika `<amp-script>` do przechwycenia zdarzenia `focus` przeglądarki.

```html
pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-z\d]).{8,}$"
on="tap:rules.show; input-debounced:rules.show"
```

Teraz upewnijmy się, że nasz składnik `<amp-script>` działa. Otwórz utworzony plik `validate.js` i dodaj komunikat debugowania:

```js
console.log("Hello, amp-script!");
```

Przejdź do przeglądarki, otwórz konsolę i ponownie załaduj stronę. Upewnij się, że widzisz komunikat!

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/hello-amp-script.png', 600, 22, layout='intrinsic', alt='Komunikat Hello amp-script w konsoli', align='center' ) }}

## Gdzie jest mój JavaScript?

Składnik `<amp-script>` wykonuje JavaScript w procesie Web Worker. Procesy Web Worker nie mogą uzyskać bezpośredniego dostępu do DOM, więc składnik `<amp-script>` udziela procesowi worker dostępu do wirtualnej kopii DOM, co utrzymuje jego synchronizację z rzeczywistym DOM. Składnik `<amp-script>` zapewnia emulacje wielu popularnych interfejsów API modeli DOM, z których prawie wszystkich można w zwykły sposób użyć w swoim kodzie JavaScript.

Jeśli w dowolnym momencie konieczne okaże się debugowanie skryptu, możesz ustawić punkty przerwania w JavaScript w obiekcie Web Worker w taki sam sposób, jak to robisz z każdym kodem JavaScript. Musisz tylko wiedzieć, gdzie go znaleźć.

W Chrome DevTools otwórz kartę Sources. U dołu pojawi się długi ciąg szesnastkowy, taki jak pokazany poniżej. Rozwiń go, następnie rozwiń obszar „no domain”, a zobaczysz swój skrypt:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/script-in-sources.png', 303, 277, layout='intrinsic', alt='amp-script JavaScript w okienku DevTools Sources', align='center' ) }}

# Dodawanie naszego kodu JavaScript

Skoro już wiemy, że nasz składnik `<amp-script>` działa, napiszmy trochę kodu JavaScript!

Przede wszystkim chcemy chwycić elementy DOM, z którymi będziemy pracować i ukryć je w zmiennych globalnych. W kodzie użyjemy pola wprowadzania hasła, przycisku przesyłania oraz obszaru, w którym pokazywane są zasady wprowadzania hasła. Do skryptu `validate.js` dodaj te trzy deklaracje:

```js
const passwordBox = document.getElementById("passwordBox");
const submitButton = document.getElementById("submitButton");
const rulesArea = document.getElementById("rules");
```

Zauważ, że jesteśmy w stanie używać zwykłych metod interfejsu API modelu DOM, takich jak `getElementById()`. Chociaż nasz kod działa w procesie Worker, a procesy te nie mają bezpośredniego dostępu do DOM, składnik `<amp-script>` dostarcza wirtualną kopię DOM i emuluje niektóre popularne API, wymienione [tutaj ](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md). Te API dają nam wystarczająco dużo narzędzi do większości przypadków użycia. Należy jednak zauważyć, że obsługiwany jest tylko podzbiór interfejsów API DOM. W przeciwnym razie kod JavaScript dołączony do składnika `<amp-script>` byłby ogromny <br>i niwelowałby korzyści płynące z wydajności AMP!

Musimy dodać te identyfikatory do dwóch elementów. Otwórz plik `index.html`, znajdź element `<input>` hasła i `<button>` przesyłania, a następnie dodaj identyfikatory. Dodaj również atrybut `disabled` do elementu `<button>` przesyłania, aby uniemożliwić użytkownikowi kliknięcie go do żądanej przez nas chwili.

```html
<input type=password
       id="passwordBox"

...

<button type="submit" id="submitButton" tabindex="3" disabled>Submit</button>
```

Ponownie załaduj stronę. Możesz sprawdzić w konsoli, czy te zmienne globalne zostały ustawione poprawnie, w taki sam sposób jak przypadku JavaScriptu nie używającego procesu Worker:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/global-set.png', 563, 38, layout='intrinsic', alt='Komunikat konsoli pokazujący ustawiony submitButton', align='center' ) }}

Dodamy też identyfikatory do każdego elementu `<li>` w sekcji `<div id="rules">`. Każdy z nich zawiera indywidualną zasadę, której kolor będziemy chcieli kontrolować. Usuniemy też każde wystąpienie `class="invalid"`. Nasz nowy JavaScript doda je w razie potrzeby!

```html
<ul>
  <li id="lower">Lowercase letter</li>
  <li id="upper">Capital letter</li>
  <li id="digit">Digit</li>
  <li id="special">Special character (@$!%*?&)</li>
  <li id="eight">At least 8 characters long</li>
</ul>
```

## Implementacja sprawdzania haseł w JavaScript

Następnie rozpakujemy wyrażenia regularne z naszego atrybutu `pattern`. Każde wyrażenie regex reprezentowało jedną z zasad. U dołu skryptu `validate.js` dodajmy mapę obiektów, aby powiązać każdą zasadę ze sprawdzanym przezeń kryterium.

```js
const checkRegexes = {
  lower: /[a-z]/,
  upper: /[A-Z]/,
  digit: /\d/,
  special: /[^a-zA-Z\d]/i,
  eight: /.{8}/
};
```

Po ustawieniu tych zmiennych globalnych jesteśmy gotowi do napisania logiki, która sprawdza hasło i odpowiednio dostosuje UI. Umieścimy naszą logikę w funkcji o nazwie `initCheckPassword`, która pobiera jeden argument — element DOM hasła `<input>`. Podejście to pozwala na wygodne umieszczenie elementu DOM w zamknięciu.

```js
function initCheckPassword(element) {

}
```

Następnie wypełnijmy `initCheckPassword` funkcjami i przypisaniami odbiornika zdarzeń, które będą nam potrzebne. Po pierwsze, dodajmy małą funkcję, która zmienia kolor indywidualnej zasady `<li>` na zielony, gdy warunek zasady zostanie spełniony i drugą, która zmienia jej kolor na czerwony, gdy warunek zasady nie zostanie spełniony.

```js
function initCheckPassword(el) {
  const checkPass = (el) => {
    el.classList.remove("invalid");
    el.classList.add("valid");
  };

  const checkFail = (el) => {
    el.classList.remove("valid");
    el.classList.add("invalid");
  };
};
```

Niech te klasy `valid` i `invalid` zmieniają kolor tekst na zielony albo czerwony. Wróćmy do pliku `index.html`, i dodajmy te dwie zasady do znacznika `<style amp-custom>`:

```css
li.valid {
  color: #2d7b1f;
}

li.invalid {
  color:#c11136;
}
```

Teraz jesteśmy gotowi dodać logikę sprawdzającą zawartość pola `<input>` hasła w odniesieniu do naszych zasad. Dodaj nową funkcję o nazwie `checkPassword()` do funkcji `initCheckPassword()`, tuż przed nawiasem zamykającym:

```js
const checkPassword = () => {
  const password = element.value;
  let failed = false;

  for (const check in checkRegexes) {
    let li = document.getElementById(check);

    if (password.match(checkRegexes[check])) {
      checkPass(li);
    } else {
      checkFail(li);
      failed = true;
    }
  }

  if (!failed) {
    submitButton.removeAttribute("disabled");
  }
};
```

Funkcja ta wykonuje następujące działania:

1. Pobiera zawartość pola hasła `<input>`.
2. Tworzy flagę o nazwie `failed`, inicjowaną z wartością <code>false.</code>
3. Wykonuje iteracje przez każde z naszych wyrażeń regularnych i sprawdza każde z nich w odniesieniu do hasła:
    - Jeśli hasło nie przejdzie testu, należy wywołać funkcję `checkFail()`, aby zmienić kolor odpowiedniej zasady na czerwony. Ponadto, wartość flagi `failed` należy ustawić na `true`.
    - Jeśli hasło przejdzie test, należy wywołać funkcję `checkPass()`, aby zmienić kolor odpowiedniej zasady na zielony.
4. Wreszcie, jeśli spełnione są wszystkie zasady, hasło jest prawidłowe, więc włączamy przycisk Prześlij.

Potrzebujemy teraz jedynie kilku odbiorników zdarzeń. Pamiętasz, jak nie mogliśmy użyć zdarzenia `focus` w AMP? W składniku `<amp-script>` jest to możliwe. Gdy tylko pole hasła `<input>` odbierze zdarzenie `focus`, wyświetlimy zasady, a za każdym razem, gdy użytkownik naciśnie przycisk w tym polu wprowadzania, wywołamy funkcję `checkPassword()`.

Dodaj te dwa odbiorniki zdarzeń na końcu funkcji `initCheckPassword()`, tuż przed nawiasem zamykającym:

```js
element.addEventListener("focus", () => rulesArea.removeAttribute("hidden"));
element.addEventListener("keyup", checkPassword);
```

Wreszcie, na samym końcu skryptu `validate.js` dodaj wiersz inicjujący funkcję `initCheckPassword` za pomocą elementu DOM pola hasła `<input>`:

```js
initCheckPassword(passwordBox);
```

Nasza logika jest ukończona! Gdy hasło spełni wszystkie nasze kryteria, wszystkie zasady będą zielone, a nasz przycisk przesyłania zostanie włączony. Możliwa powinna być taka interakcja:


<figure class="alignment-wrapper margin-">   {amp-video1}     <source src="/static/img/docs/tutorials/custom-javascript-tutorial/finished-project.mp4" type="video/mp4">     <source src="/static/img/docs/tutorials/custom-javascript-tutorial/finished-project.webm" type="video/webm">   {/amp-video1} </source></source></figure> Jeśli utkniesz, zawsze możesz zerknąć na działający kod w katalogu „finished_code”.

# Gratulacje!

Wiesz już jak użyć składnika `<amp-script>` do napisania własnego kodu JavaScript w AMP. Udało Ci się wzbogacić składnik `<amp-form>` o własną logikę i funkcje interfejsu użytkownika! Możesz dodać więcej funkcji do swojej nowej strony! Aby zaś dowiedzieć się więcej na temat składnika `<amp-script>`, sprawdź [ dokumentację referencyjną](../../../documentation/components/reference/amp-script.md).
