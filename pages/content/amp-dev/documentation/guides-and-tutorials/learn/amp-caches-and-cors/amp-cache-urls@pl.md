---
'$title': Format adresu URL serwera buforującego AMP i obsługa żądań
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

Ten dokument zawiera informacje o formacie adresu URL serwera buforującego AMP i sposobie obsługi żądań przez serwer buforujący AMP.

## Format adresu URL

Jeśli jest to możliwe, usługa Google AMP Cache tworzy subdomenę domeny każdego dokumentu AMP, najpierw konwertując ją z [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) na UTF-8. Serwer buforujący zastępuje każdy znak `-` (kreskę) znakami `--` (2 kreskami), a każdy znak `.` (kropkę) na znak {code 4}- (kreskę). Na przykład domena `pub.com` będzie mapowana na subdomenę `pub-com.cdn.ampproject.org`.

Do konwersji adresu URL na wersję serwera buforującego AMP można użyć tego kalkulatora adresów URL:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Użyj modułu <a>AMP-Toolbox Cache URL</a> <a>Node.js</a> do translacji adresu URL ze źródła na format adresu URL serwera buforującego AMP. [/tip]

Dokument ten opisuje:

- Strukturę adresu URL na serwerze buforującym AMP.
- Jak przewidzieć wygląd adresów URL na serwerze buforującym AMP.
- Jak odwrócić nagłówek Cache Origin AMP, aby określić domenę jego wydawcy.

## Protokół nazw domen

Wszystkie dokumenty używają protokołu https na serwerze buforującym AMP.

## Sufiks nazwy domeny

Wszystkie serwery buforujące AMP są rejestrowane w pliku JSON, dostępnym online w [repozytorium AMPHTML](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). Przykładowy rekord serwera buforującego w tym pliku będzie wyglądał tak:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Serwer buforujący AMP serwuje rekordy domeny określonej parametrem `cacheDomain`. W tym przypadku domeną jest `cdn.ampproject.org`.

Ten dokument używa jako przykładów adresów URL z domeny `cdn.ampproject.org`, ale inne serwery buforujące zazwyczaj używają podobnej struktury adresów URL.

## Prefiks nazwy domeny

Serwer buforujący AMP serwuje dokumenty ze zmienionym adresem URL, takim jak `example-com.cdn.ampproject.org`. Pierwszy element oryginalnej nazwy domeny z kropką w przykładzie, `example.com`, jest konwertowany na `example-com`. Dokument odwołuje się do ciągu bez kropki, `example-com` jako „prefiksu domeny”. Poniżej widnieje algorytm, który wykonuje to przekształcenie.

W prefiksie tym, ze względu na ograniczenia związane z certyfikatami https (TLS), [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1), nie używa się elementów z wieloma kropkami, takich jak `example.com.cdn.ampproject.org`:

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

Domeny wydawcy mogą składać się z maksymalnie 255 znaków, a prefiks każdej domeny jest ograniczony do 63 znaków, zgodnie z dokumentem [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11), stwierdzającym:

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

Wszystkie domeny wydawcy są mapowane na unikalny prefiks domeny. Algorytm próbuje w tym celu utworzyć mapowanie zrozumiałe dla człowieka. Jeśli domeny wydawców są zbyt długie oraz w przypadkach opisanych poniżej mapowanie powraca do używania bezpiecznego hashingu:

### Algorytm podstawowy

Podstawowy algorytm konwersji domeny wydawcy na prefiks domeny jest następujący:

1. Zdekodowanie punycode domeny wydawcy. Patrz [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Zastąpienie każdego znaku „`-`” (łącznik) w danych wyjściowych z kroku 1 znakami „`--`” (dwoma łącznikami).
3. Zastąpienie każdego znaku „`.`” (kropka) w danych wyjściowych z kroku 2 znakami „`-`” (łącznik).
4. Jeżeli wynik kroku 3 ma znak „`-`” (łącznik) zarówno na miejscu 3 i 4, do wyniku kroku 3 należy dodać prefiks „`0-`” i sufiks „`-0`”. Informacje ogólne — patrz [#26205](https://github.com/ampproject/amphtml/issues/26205).
5. Zakodowanie punycode danych wyjściowych z kroku 3. Patrz [RFC 3492](https://tools.ietf.org/html/rfc3492)

Kilka przykładów podstawowego algorytmu:

<table>
  <tr>
   <td>
<strong>Domena wydawcy</strong>
   </td>
   <td>
<strong>Prefiks domeny</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Po uruchomieniu podstawowego algorytmu, jeśli i tylko wtedy, gdy prefiks domeny nie jest prawidłową etykietą DNS, uruchamiamy opisany poniżej algorytm rezerwowy.

Prefiks domeny nie jest prawidłową etykietą DNS, jeśli jego długość przekracza 63 znaki.

### Algorytm rezerwowy

Algorytm rezerwowy konwersji domeny wydawcy na prefiks domeny jest następujący:

1. Zaszyfrowanie domeny wydawcy przy użyciu algorytmu SHA256.
2. Opatrzenie znakami ucieczki Base32 wyniku kroku 1.
3. Usunięcie 4 ostatnich znaków z wyniku kroku 2; są to zawsze znaki `=` (równości).

Algorytm rezerwowy wytworzy 52-znakowy ciąg taki, jak poniższy, bez żadnego znaku `-` (myślnika): `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Algorytm łączony

Algorytm łączony jest następujący:

1. Wykonanie algorytmu podstawowego. Jeśli wynik jest prawidłową etykietą DNS, należy dodać sufiks domeny serwera buforującego i zwrócić na przykład subdomenę `example-com.cdn.ampproject.org`. W przeciwnym razie należy przejść do kroku 2.
2. Wykonanie algorytmu rezerwowego. Należy dołączyć sufiks domeny serwera buforującego i zwrócić, na przykład: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## Ścieżka adresu URL

Ścieżka adresu URL na serwerze buforującym AMP zawsze składa się z jednego lub więcej katalogów prefiksów, takich jak `/c`, po których, tylko wtedy, gdy adres URL wydawcy to http `s`, następuje infiks `/s`, a następnie adres URL dokumentu wydawcy bez protokołu.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

Katalogi prefiksu, takie jak `/c`, odpowiadają różnym typom serwowania, które może wykonywać serwer buforujący AMP. Różne serwery buforujące AMP mogą obsługiwać inne typy serwowania i nie jest to wyczerpująca lista:

- `/c` — <strong>C</strong>ontent: jest to dokument AMP serwowany jako samodzielna strona, do której można utworzyć bezpośrednie łącza w niektórych interfejsach.
- `/v` — <strong>V</strong>iewer: jest to również dokument AMP, ale serwowany w środowisku ramki [AMP Viewer](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer), wyświetlającym dokument AMP w kontekście strony wyników wyszukiwania lub innego interfejsu.
- `/wp` — <strong>W</strong>eb <strong>P</strong>ackage: jest to dokument AMP serwowany w formacie [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/), technologii pakietów sieci web. Te adresy URL działają jako przekierowania do własnego źródła wydawcy.
- `/cert` — <strong>Cert</strong>ificate: jest to certyfikat publiczny do stosowania z plikami [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/).
- `/i` - <strong>I</strong>mage: jest to obraz serwowany przez serwer buforujący AMP, zazwyczaj jako podzasób dokumentu.
- `/ii` — <strong>I</strong>mage: jest to również obraz serwowany przez serwer buforujący AMP, ale zazwyczaj może być łączony z innymi parametrami konfiguracji serwera buforującego, takimi jak `/ii/w800`, które wskazują maksymalną szerokość żądanego dokumentu. Serwer buforujący może wytwarzać obrazy w innej skali, aby oszczędzić przepustowość przeglądarki.

Serwer buforujący AMP może również dodać do adresu URL dokumentu specjalne parametry zapytania, które nie są częścią zapytania o dokument wydawcy. Na przykład [`<amp-live-list>`](../../../components/reference/amp-live-list.md) wykonuje żądania odświeżenia poprzez pobranie dokumentu z parametrem `amp_latest_update_time<`. Parametry te nie są przekazywane do źródła podczas indeksowania dokumentu, ale muszą być obecne w celu skonfigurowania żądania do serwera buforującego AMP.

## Źródła CORS

Wielu wydawców używa żądań CORS ze swoich dokumentów AMP do pobierania dodatkowych danych. Żądania CORS działają poprzez wysłanie w żądaniu nagłówka HTTP `Origin:`, określającego źródło dokumentu wysyłającego żądanie. Jak widać powyżej, źródło dokumentu jest na serwerze buforującym AMP inne niż w oryginalnym dokumencie. W powyższych sekcjach dotyczących nazw domen można znaleźć algorytm określania źródła adresu URL serwera buforującego AMP na podstawie adresu URL wydawcy. Poniżej podajemy odwrócony algorytm służący do odszyfrowywania nagłówka żądania CORS `Origin:` z powrotem na oryginalną domenę wydawcy.

### Źródło serwera buforującego AMP na domenę publiczną

Wartość nagłówka Origin serwera buforującego AMP będzie wyglądać jak jeden z poniższych przykładów:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

Najpierw usuń prefiks protokołu (`https://`) oraz sufiks domeny serwera buforującego AMP, taki jak `.cdn.ampproject.org`. Sufiks może pochodzić z jednego z serwerów buforujących wymienionych w pliku [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json). Pozostały ciąg będzie „prefiksem domeny”. W przypadku dwóch powyższych przykładów „prefiks domeny” jest następujący:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Następnie sprawdź, czy „prefiks domeny” zawiera co najmniej jeden znak „<code>-</code>” (łącznik). Obecność co najmniej jednego łącznika jest zdecydowanie najczęstszym przypadkiem. Jeśli „prefiks domeny” nie zawiera co najmniej jednego znaku „<code>-</code>’” (łącznika), to nie można bezpośrednio odwrócić nagłówka Origin serwera buforującego AMP. Jeśli jednak znasz zestaw możliwych domen wydawców, możesz utworzyć zestaw nagłówków Origin serwerów buforujących AMP, używając algorytmu generowania nazwy domeny, który przedstawiono wyżej w tym dokumencie. Następnie można dokonać walidacji w odniesieniu do ustalonego zestawu.

Pozostała część algorytmu zakłada, że „prefiks domeny” zawiera co najmniej jeden znak „`-`” (łącznik).

1. Jeśli prefiks domeny zaczyna się od `xn--`, należy odszyfrować „prefiks domeny” punycode. Na przykład `xn---com-p33b41770a` przybierze postać `⚡😊-com`. Informacje o punycode zawiera dokument [RFC 3492](https://tools.ietf.org/html/rfc3492).
2. Jeśli prefiks domeny zaczyna się od znaków „`0-`” i kończy znakami „`-0`”, należy usunąć zarówno prefiks "`0-`", jak i sufiks „-0”.
3. Iteruj przez znaki wyjściowe z kroku 2 w kolejności, emitując je w kolejności, w jakiej zostały napotkane. Gdy napotkasz znak „`-`” (łącznik), spójrz na następny znak. Jeśli następnym znakiem jest również „`-`” (łącznik), pomiń oba znaki z danych wejściowych i emituj jeden znak „`-`” (łącznik). Jeśli następnym znakiem jest jakikolwiek inny znak, pomiń tylko bieżący pojedynczy znak „`-`” (łącznik) i emituj znak „`.`” (kropkę). Na przykład ciąg `a--b-example-com` przybierze postać `a-b.example.com`.
4. Zakoduj punycode wyniku z kroku 3. Punycode — patrz dokument [RFC 3492](https://tools.ietf.org/html/rfc3492)

Wynikiem kroku 4 będzie domena wydawcy. Protokół jest niedostępny z samej domeny, ale jest to albo protokół `http`, albo <code>https</code>. Port jest zawsze portem domyślnym danego protokołu.

## Obsługa przekierowań i błędów

Oto kilka przykładów sposobu, w jaki serwer buforujący AMP obsługuje przekierowania i błędy:

**Przekierowania**

Serwer buforujący AMP podąża za przekierowaniami podczas rozpoznawania adresów URL AMP. Jeśli na przykład adres URL przekierowuje do innego adresu URL AMP:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Następnie serwer buforujący AMP zwróci zawartość rozpoznanego przekierowania oryginalnego adresu URL.

Przykład: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Ważne: jeśli przenosisz lokalizację plików AMP na swój serwer, ustaw przekierowanie ze starej lokalizacji do nowej.

**Nie znaleziono**

Jeśli strona nie zostanie znaleziona na serwerze buforującym AMP, serwer wyświetli stronę błędu i zwróci status 404.

Przykład: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**Nieprawidłowy AMP**

Gdy strona AMP jest nieprawidłowa, serwer buforujący AMP przekierowuje do strony kanonicznej.

Przykład: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Błędy serwera**

Jeśli adres URL zwraca błędy 5XX serwera, serwer buforujący AMP zwraca status 404.

Przykład: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
