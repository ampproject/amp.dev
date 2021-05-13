---
'$title': CORS w AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Wiele składników i rozszerzeń AMP wykorzystuje zdalne punkty końcowe za pomocą
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Wiele składników i rozszerzeń AMP wykorzystuje zdalne punkty końcowe, stosując żądania Cross-Origin Resource Sharing (CORS). Niniejszy dokument wyjaśnia kluczowe aspekty korzystania z CORS w AMP. Aby dowiedzieć się więcej o samym CORS, zobacz [Specyfikacje CORS W3](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin" data-md-type="link">Po co mi CORS do własnego źródła?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Stosowanie plików cookie do żądań CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Zabezpieczenia CORS w AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Weryfikowanie żądań CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Zezwalanie na żądania określonych źródeł CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Zezwalanie na żądania tych samych źródeł</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Wysyłanie nagłówków odpowiedzi CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">Nagłówek Access-Control-Allow-Origin: </a><origin data-md-type="raw_html"></origin>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Przetwarzanie żądań zmiany stanu</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Przykładowy sposób postępowania: obsługa żądań i odpowiedzi CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Testowanie CORS w AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Po co mi CORS do własnego źródła?<a id="why-do-i-need-cors-for-my-own-origin"></a>

Konieczność stosowania mechanizmu CORS do żądań własnego źródła może być dezorientująca, zagłębmy się w to.

Składniki AMP pobierające dane dynamiczne (np. amp-form, amp-list itd.) wysyłają żądania CORS do zdalnych punktów końcowych w celu pobrania danych. Jeśli strona AMP zawiera takie składniki, trzeba obsługiwać CORS, aby te żądania nie kończyły się niepowodzeniem.

Zilustrujmy to na przykładzie:

Powiedzmy, że masz stronę AMP, która zawiera listę produktów z cenami. Aby zaktualizować ceny na stronie, użytkownik klika przycisk, który pobiera najnowsze ceny z punktu końcowego JSON (za pomocą składnika amp-list). JSON jest w Twojej domenie.

Dobrze, strona jest zatem _w mojej domenie_ i JSON też jest _w mojej domenie_. Nie widzę żadnego problemu!

Ach, ale jak Twój użytkownik dostał się na stronę AMP? Czy dostęp jest uzyskiwany do buforowanej strony? Jest dość prawdopodobne, że użytkownik nie uzyskał bezpośredniego dostępu do strony AMP, ale zamiast tego odnalazł ją za pośrednictwem innej platformy. Na przykład wyszukiwarka Google do szybkiego renderowania stron AMP używa usługi Google AMP Cache; są to strony buforowane i serwowane na serwerach usługi Google AMP Cache, _w innej_ domenie. Gdy użytkownik kliknie przycisk, aby zaktualizować ceny na swojej stronie, buforowana strona AMP wysyła żądanie do domeny Twojego źródła, aby uzyskać ceny, co skutkuje niezgodnością źródeł (serwer buforujący -> domena źródła). Aby zezwolić na takie żądania danych z różnych źródeł, musisz obsługiwać mechanizm CORS, w przeciwnym razie żądanie nie powiedzie się.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS i pamięć podręczna" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Co mam zatem zrobić?**

1. W przypadku stron AMP pobierających dane dynamiczne testuj wersję buforowaną tych stron; _nie testuj tylko we własnej domenie_. (Patrz [Testowanie CORS w AMP](#testing-cors-in-amp) poniżej)
2. Wykonaj zawarte w niniejszym dokumencie instrukcje dotyczące obsługi żądań i odpowiedzi CORS.

## Stosowanie plików cookie do żądań CORS <a id="utilizing-cookies-for-cors-requests"></a>

Większość składników AMP wykorzystującch żądania CORS albo automatycznie ustawia tryb [credentials mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode), albo pozwala autorowi na opcjonalne włączenie go. Na przykład składnik [`amp-list`](https://amp.dev/documentation/components/amp-list) pobiera dynamiczną zawartość z pliku JSON punktu końcowego CORS i pozwala autorowi na ustawienie trybu uwierzytelniania za pomocą atrybutu `credentials`.

_Przykład: dodawanie spersonalizowanej zawartości do składnika amp-list za pomocą plików cookie_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Dzięki określeniu trybu credentials źródło może uwzględniać pliki cookie w żądaniu CORS, a także ustawiać pliki cookie w odpowiedzi (z zastrzeżeniem [ograniczeń dotyczących plików cookie stron trzecich](#third-party-cookie-restrictions)).

### Ograniczenia dotyczące plików cookie stron trzecich <a name="third-party-cookie-restrictions"></a>

Ograniczenia dotyczące plików cookie stron trzecich określone w przeglądarce mają zastosowanie również do uwierzytelnionych żądań CORS w AMP. Ograniczenia te zależą od przeglądarki i platformy, ale w przypadku niektórych przeglądarek źródło można ustawić tylko wtedy, gdy użytkownik wcześniej odwiedzi źródło w oknie strony pierwszej (najwyższym). Innymi słowy, tylko wtedy, gdy użytkownik bezpośrednio odwiedził witrynę źródła. W związku z tym, usługa dostępna za pośrednictwem CORS nie może zakładać, że będzie w stanie domyślnie ustawiać pliki cookie.

## Zabezpieczenia CORS w AMP <a name="cors-security-in-amp"></a>

Aby zapewnić prawidłowość i bezpieczeństwo żądań i odpowiedzi na stronach AMP, musisz:

1. [Zweryfikować żądanie](#verify-cors-requests).
2. [Wysłać odpowiednie nagłówki odpowiedzi](#send-cors-response-headers).

Jeśli używasz Node na swoim zapleczu, możesz użyć [oprogramowania pośredniczącego AMP CORS](https://www.npmjs.com/package/amp-toolbox-cors), które jest częścią [przybornika AMP](https://github.com/ampproject/amp-toolbox).

### Weryfikowanie żądań CORS <a id="verify-cors-requests"></a>

Gdy Twój punkt końcowy otrzyma żądanie CORS:

1. [Sprawdź, czy nagłówek CORS <code>Origin</code> jest dozwolonym źródłem (źródło wydawcy + serwery buforujące AMP)](#verify-cors-header).
2. [Jeśli nie ma nagłówka Origin sprawdź, czy żądanie pochodzi z tego samego źródła. (za pomocą nagłówka `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Zezwalanie na żądania określonych źródeł CORS <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Punkty końcowe CORS otrzymują żądane źródło za pomocą nagłówka HTTP `Origin`. Punkty końcowe powinny zezwalać na żądania tylko z: (1) własnego źródła wydawcy; oraz (2) każdego źródła `cacheDomain` wymienionego na liście pod adresem [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json).

Na przykład, punkty końcowe powinny zezwalać na żądania z:

- Subdomeny Google AMP Cache: `https://<publisher's domain>.cdn.ampproject.org` <br>(na przykład `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Informacje na temat formatów adresów URL serwerów buforujących AMP znajdują się w tych zasobach:

- [Omówienie usługi Google AMP Cache](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) Zezwalanie na żądania tych samych źródeł <a id="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

W przypadku żądań tego samego źródła, w których brakuje nagłówka `Origin` AMP ustawia następujący nagłówek niestandardowy:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Ten nagłówek niestandardowy jest wysyłany przez środowisko uruchomieniowe AMP po wygenerowaniu żądania XHR tego samego źródła (tj. dokumentu serwowanego z niebuforowanego adresu URL). Zezwól na żądania zawierające nagłówek `AMP-Same-Origin:true`.

### Wysyłanie nagłówków odpowiedzi CORS <a id="send-cors-response-headers"></a>

Po zweryfikowaniu żądania CORS wynikowa odpowiedź HTTP musi zawierać następujące nagłówki:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

Nagłówek ten jest wymogiem <a href="https://www.w3.org/TR/cors/">specyfikacji CORS W3</a>, w których <code>origin</code> odnosi się do źródła generującego żądanie, które zostało dozwolone za pomocą nagłówka żądania CORS <code>Origin</code> (na przykład <code>"https://<domena wydawcy>.cdn.ampproject.org"</code>).

Chociaż specyfikacja CORS W3 zezwala na zwrócenie w odpowiedzi wartości <code>\*</code>, dla większego bezpieczeństwa należy:

- Jeśli nagłówek `Origin` jest obecny, zatwierdzić i powtórzyć wartość nagłówka <code>Origin</code>.

### Przetwarzanie żądań zmiany stanu <a id="processing-state-changing-requests"></a>

[tip type="important"] Wykonaj te kontrole poprawności _&nbsp;przed _ przetworzeniem wniosku. Taka walidacja pozwala zapewnić ochronę przed atakami CSRF i uniknąć przetwarzania żądań niezaufanych źródeł. [/tip]

Przed przetworzeniem żądań, które mogłyby zmienić stan systemu (np. użytkownik zapisuje się na listę mailingową lub z niej wypisuje), sprawdź co następuje:

**Jeśli nagłówek `Origin` jest ustawiony**:

1. Jeśli źródło nie odpowiada jednej z poniższych wartości, należy zatrzymać przetwarzanie i zwrócić odpowiedź z błędem:

   - `<domena wydawcy>.cdn.ampproject.org`
   - źródło wydawcy (Twoje)

   gdzie `*` to symbol wieloznaczny, a nie znak gwiazdki ( \* ).

2. W przeciwnym razie przetwórz żądanie.

**Jeśli nagłówek `Origin` nie jest ustawiony**:

1. Sprawdź, czy żądanie zawiera nagłówek `AMP-Same-Origin: true`. Jeśli żądanie nie zawiera tego nagłówka, zatrzymaj przetwarzanie i zwróć odpowiedź z błędem.
2. W przeciwnym razie przetwórz żądanie.

## Przykładowy sposób postępowania: obsługa żądań i odpowiedzi CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

W żądaniach CORS do Twojego punktu końcowego należy uwzględnić dwa scenariusze:

1. Żądanie z tego samego źródła.
2. Żądanie ze źródła buforowanego (z serwera buforującego AMP).

Przejdźmy te scenariusze z przykładem. W naszym przykładzie, zarządzamy witryną `example.com`, w której znajduje się strona AMP o nazwie `article-amp.html.`. Strona AMP zawiera składnik `amp-list`, służący do pobierania danych dynamicznych z pliku `data.json`, który również znajduje się w witrynie `example.com`. Chcemy przetwarzać żądania do naszego pliku `data.json`, pochodzące z naszej strony AMP. Te żądania mogą pochodzić ze strony AMP o tym samym źródle (nie buforowanym) lub ze strony AMP z innego źródła (buforowanego).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Przykład CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Dozwolone źródła <a name="allowed-origins"></a>

Na podstawie tego, co wiemy o CORS i AMP (z powyższej sekcji [Weryfikowanie żądań CORS ](#verify-cors-requests)), do celów naszego przykładu będziemy zezwalać na żądania z następujących domen:

- `example.com` — domena wydawcy
- `example-com.cdn.ampproject.org` — subdomena Google AMP Cache

### Nagłówki odpowiedzi na dozwolone żądania <a name="response-headers-for-allowed-requests"></a>

W przypadku żądań z dozwolonych źródeł nasza odpowiedź będzie zawierać następujące nagłówki:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Poniżej widnieją dodatkowe nagłówki odpowiedzi, które możemy zawrzeć w naszej odpowiedzi CORS:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Pseudokod CORS <a name="pseudo-cors-logic"></a>

Naszą logikę obsługi żądań i odpowiedzi CORS można uprościć do następującego pseudokodu:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Przykładowy kod CORS <a name="cors-sample-code"></a>

Oto przykładowa funkcja JavaScript, której możemy użyć do obsługi żądań i odpowiedzi CORS:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Uwaga**: próbka działającego kodu znajduje się w pliku [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Scenariusz 1: żądanie otrzymane od strony AMP o tym samym źródle <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

W poniższym scenariuszu strona `article-amp.html` żąda pliku `data.json`; źródła są te same.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Przykład CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Jeśli zbadamy żądanie, znajdziemy:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Jako że żądanie to pochodzi z tego samego źródła, nie ma nagłówka `Origin`, ale ma niestandardowy nagłówek żądania AMP `AMP-Same-Origin: true`. Możemy zezwolić na to żądanie, ponieważ pochodzi ono z tego samego źródła (`https://example.com`).

Nasza odpowiedź ma wówczas następujące nagłówki:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Scenariusz 2: żądanie otrzymane od buforowanej strony AMP <a name="scenario-2-get-request-from-cached-amp-page"></a>

W poniższym scenariuszu strona `article-amp.html` buforowana na serwerze Google AMP Cache żąda pliku `data.json`; źródła są różne.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Przykład CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Jeśli zbadamy żądanie, znajdziemy:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Jako że żądanie zawiera nagłówek `Origin` sprawdzimy, czy pochodzi on z dozwolonego źródła. Możemy zezwolić na to żądanie, ponieważ pochodzi ono z dozwolonego źródła.

Nasza odpowiedź ma wówczas następujące nagłówki:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Praca z buforowanymi czcionkami <a name="working-with-cached-fonts"></a>

Usługa Google AMP Cache buforuje dokumenty AMP HTML, obrazy i czcionki, aby optymalizować szybkość działania strony AMP. Czyniąc stronę AMP szybką, chcemy również być ostrożni, zabezpieczając buforowane zasoby. Zmienimy sposób, w jaki serwer buforujący AMP odpowiada na buforowane na nim zasoby, zazwyczaj czcionki, poprzez respektowanie wartości źródła `Access-Control-Allow-Origin`.

### Wcześniejszy sposób działania (przed październikiem 2019 r.) <a name="past-behavior-before-october-2019"></a>

Gdy strona AMP ładowała plik `https://example.com/some/font.ttf` z atrybutu `@font-face src`, serwer buforujący AMP buforował plik z czcionkami i serwował zasób jak poniżej, mając symbol wieloznaczny jako wartość `Access-Control-Allow-Origin`.

- Adres URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Nowy sposób działania (od października 2019 r.) <a name="new-behavior-october-2019-and-after"></a>

Bieżąca implementacja jest mało restrykcyjna, ale może to prowadzić do nieoczekiwanego wykorzystania czcionek z witryn o różnych źródłach. Wskutekj tej zmiany serwer buforujący AMP zaczyna odpowiadać dokładnie tą samą wartością `Access-Control-Allow-Origin`, którą odpowiada serwer źródła. Aby poprawnie załadować czcionki z buforowanego dokumentu AMP, trzeba zaakceptować źródło z serwera buforującego AMP za pomocą nagłówka.

Przykładowa implementacja:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Jeśli na przykład chcesz ładować /some/font.ttf w pliku `https://example.com/amp.html`, serwer źródła powinien odpowiedzieć nagłówkiem Access-Control-Allow-Origin jak poniżej.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Przykład czcionki CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Jeśli dostęp do pliku z czcionką można uzyskiwać z dowolnego źródła, możesz zastosować odpowiedź `Access-Control-Allow-Origin` z symbolem wieloznacznym, serwer buforujący AMP będzie również powtarzać tę wartość, czyli zwracać odpowiedź `Access-Control-Allow-Origin: *`. Jeśli masz już to ustawienie, nie musisz niczego zmieniać. [/tip]

Planujemy dokonać tej zmiany około połowy października 2019 roku i oczekujemy, że każdy wydawca AMP stosujący czcionki z własnego serwera sprawdzi, czy ma to na nie wpływ.

#### Plan wdrożenia <a name="roll-out-plan"></a>

- 2019-09-30: wersja zawiera precyzyjniejszą kontrolę nad domenami, których dotyczy ta zmiana. Kompilacja powinna zostać wdrożona w ciągu tego tygodnia.
- 2019-10-07: domeny testowe zostaną udostępnione do celów ręcznego testowania.
- 2019-10-14: (ale w zależności od przebiegu testów): funkcja zostanie ogólnie wdrożona.

Kwestie pokrewne znajdziesz [tutaj](https://github.com/ampproject/amphtml/issues/24834).

## Testowanie CORS w AMP <a name="testing-cors-in-amp"></a>

Testując swoje strony AMP, przetestuj również buforowane wersje stron AMP.

### Weryfikowanie strony za pomocą adresu URL na serwerze buforującym <a name="verify-the-page-via-the-cache-url"></a>

Aby upewnić się, że strona AMP z serwera buforującego jest renderowana i działa prawidłowo:

1. W przeglądarce otwórz adres URL, którego serwer buforujący AMP użyje do uzyskania dostępu do danej strony AMP. Możesz ustalić format adresu URL na serwerze buforującym za pomocą tego narzędzia [w sekcji AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Przykład:

   - Adres URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Format adresu URL na serwerze buforującym AMP: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Otwórz narzędzia programistyczne swojej przeglądarki i sprawdź, czy nie ma żadnych błędów, a wszystkie zasoby zostały załadowane prawidłowo.

### Weryfikowanie nagłówków odpowiedzi serwera <a name="verify-your-server-response-headers"></a>

Aby sprawdzić, czy Twój serwer wysyła odpowiednie nagłówki odpowiedzi HTTP, możesz użyć polecenia `curl`. W poleceniu `curl`, podaj adres URL żądania i wszelkie niestandardowe nagłówki, które chcesz dodać.

**Składnia**: `curl url-żądania> -H <nagłówek-niestandardowy> - I`

#### Testowanie żądania z tego samego źródła <a name="test-request-from-same-origin"></a>

W żądaniu tego samego źródła system AMP dodaje nagłówek niestandardowy `AMP-Same-Origin:true`.

Oto nasze polecenie curl służące do testowania żądania z `https://ampbyexample.com` do pliku `examples.json` (w tej samej domenie):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Wyniki polecenia pokazują prawidłowe nagłówki odpowiedzi (uwaga: obcięte zostały dodatkowe informacje):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Testowanie żądania z buforowanej strony AMP <a name="test-request-from-cached-amp-page"></a>

W żądaniu CORS z innej domeny (tzn. z serwera buforującego) nagłówek `Origin` jest częścią żądania.

Oto nasze polecenie curl służące do testowania żądania ze strony AMP buforowanej w usłudze Google AMP Cache do pliku `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Wyniki polecenia pokazują prawidłowe nagłówki odpowiedzi:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
