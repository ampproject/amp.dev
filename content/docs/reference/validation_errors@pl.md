---
$title: Błędy weryfikacji stron AMP
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

Poprawne dokumenty AMP nie mogą zawierać żadnych błędów weryfikacji.
Ten artykuł pomoże Ci lepiej zrozumieć błędy weryfikacji i skuteczniej usuwać problemy, które możesz napotkać podczas [weryfikacji stron AMP](/pl/docs/guides/debug/validate.html).
Pełny przegląd błędów weryfikacji zawiera [specyfikacja narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

[TOC]

## Błędy tagów HTML i atrybutów na stronach AMP

### Brak obowiązkowego tagu

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj (lub popraw) obowiązkowy tag HTML.</td>
  </tr>
</table>

Wszystkie dokumenty AMP muszą zawierać poniższe tagi:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Obowiązkowe tagi zawierają pole `mandatory: true` w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii), a [specyfikacja AMP](/docs/reference/spec.html) również odwołuje się do niego.

### Brak tagu wymaganego przez inny tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj (lub popraw) wymagany tag HTML.</td>
  </tr>
</table>

Narzędzie do weryfikacji generuje błąd `TAG_REQUIRED_BY_MISSING` po napotkaniu rozszerzonego komponentu w dokumencie AMP, dla którego nie ma odpowiednika w postaci tagu `<script>`.

[Rozszerzone komponenty](/docs/reference/extended.html) muszą być zawarte w dokumencie AMP jako niestandardowe elementy.
Aby usunąć takie błędy, przejdź do referencyjnej strony rozszerzonego elementu, skopiuj wymagany skrypt i wklej go do tagu `<head>` dokumentu AMP.

### Niedozwolony tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń niedozwolony tag.</td>
  </tr>
</table>

Tagi są dozwolonymi elementami, i chociaż nie istnieje zamknięta lista wszystkich niedozwolonych tagów, [specyfikacja AMP](/docs/reference/spec.html) zawiera obszerną definicję takich tagów.

### Brak obowiązkowego atrybutu

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj obowiązkowy atrybut do tagu.</td>
  </tr>
</table>

Obowiązkowe atrybuty tagów AMP są zdefiniowane w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Wystarczy tylko znaleźć tag, przejrzeć wyświetlone atrybuty i sprawdzić, czy występuje tam wartość `mandatory: true`.
Specyfikacja każdego tagu AMP zawiera również jego obowiązkowe atrybuty.

### Nieprawidłowa wartość atrybutu

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Zmień wartość atrybutu na prawidłową.</td>
  </tr>
</table>

Ten błąd oznacza, że tag HTML zawiera atrybut o dozwolonej nazwie, ale o niedozwolonej wartości.
Ten błąd wywołują często nieprawidłowe wartości adresów URL.
Wszystkie wartości adresów URL (w atrybutach `href` i `src`) muszą odpowiadać jednej z takich [możliwych wartości atrybutów](http://www.w3schools.com/tags/att_a_href.asp).

<strong>WAŻNE:</strong> wiele wartości adresów URL na stronach AMP wymaga HTTPS. Jeśli ten błąd pojawia się z niejasnych dla Ciebie przyczyn, sprawdź w specyfikacji odpowiedniego tagu AMP, czy konkretny atrybut wymaga HTTPS.

### Niedozwolony atrybut

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń atrybut z tagu HTML.</td>
  </tr>
</table>

Atrybuty są dozwolonymi elementami, dlatego nie istnieje zamknięta lista wszystkich niedozwolonych atrybutów.
Aby dowiedzieć się, które atrybuty są obsługiwane w przypadku konkretnego tagu, wyszukaj tag HTML, a następnie atrybut `attrs` w [specyfikacji narzędzia AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Oprócz listy dozwolonych atrybutów każdego tagu, wszystkie tagi AMP mogą używać dowolnego atrybutu wymienionego w sekcji `$GLOBAL_ATTRS`. Dozwolone są również wszystkie atrybuty z prefiksem `"data-"`.

### Brak obowiązkowego tekstu lub jest on nieprawidłowy

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj lub popraw obowiązkowy tekst w tagu.</td>
  </tr>
</table>

CDATA to dane o treści umieszczone między początkowym i końcowym tagiem HTML, które są aktualnie weryfikowane w celu umieszczenia ich na liście elementów dozwolonych albo niedozwolonych.
Przykłady tagów z obowiązkowymi danymi CDATA:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

oraz:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Przykłady komunikatów związanych z tym problemem:

* „Obowiązkowy schemat stylu (kod JavaScript włączony)”
* „Obowiązkowy schemat stylu (brak skryptu)”
* „Niedozwolony prefiks nazwy klasy CSS -amp-”
* „Niedozwolony atrybut !important w kodzie CSS”
* „Niedozwolony atrybut @charset w kodzie CSS”
* „Niedozwolony atrybut @import w kodzie CSS”
* „Niedozwolony atrybut @namespace w kodzie CSS”
* „Niedozwolony atrybut @supports w kodzie CSS”
* „Niedozwolony atrybut @document w kodzie CSS”
* „Niedozwolony atrybut @page w kodzie CSS”
* „Niedozwolony atrybut @viewport w kodzie CSS”

### Niedozwolony tekst w tagu

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>CDATA_VIOLATES_BLACKLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń niedozwolony tekst.</td>
  </tr>
</table>

Określone dane CSS są niedozwolone w procesie weryfikacji podstawowych reguł CSS stron AMP.

Poniżej znajduje się lista niedozwolonych danych CSS (zobacz też atrybut [`blacklisted_cdata_regex` w specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` („prefiks nazwy klasy CSS -amp-”)
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Niedozwolona właściwość w atrybucie w tagu

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń niedozwoloną właściwość w określonym atrybucie.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy atrybut zawiera niedozwoloną nazwę właściwości.
W tym kontekście termin „właściwość” oznacza strukturalne dane klucza/wartości w atrybucie.
Na przykład atrybuty `width` i `minimum-scale` w tagu `<meta name="viewport content="width=device-width;minimum-scale=1">` są nazwami właściwości.

Użycie poniższego tagu spowoduje wygenerowanie błędu DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Innym przykładem tagu, który spowoduje wystąpienie błędu, jest:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Prawidłowa składnia: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Nieprawidłowa wartość właściwości

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Popraw wartość właściwości.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy atrybut zawiera nieprawidłową wartość właściwości.
W tym kontekście termin „właściwość” oznacza strukturalne dane klucza/wartości w atrybucie.
Na przykład atrybuty `device-width` i `1` w tagu `<meta name="viewport content="width=device-width;minimum-scale=1">` są wartościami właściwości.

Użycie poniższego tagu spowoduje wystąpienie błędu INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Innym przykładem tagu, który spowoduje wystąpienie błędu, jest:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Prawidłowa składnia: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Brak adresu URL

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Rozwiązanie</strong></td>
    <td>Dodaj prawidłowy adres URL.</td>
  </tr>
</table>

Ten błąd występuje w przypadku braku adresu URL w atrybucie, który go wymaga – na przykład wówczas, gdy atrybuty `href` lub `src` są puste.

### Nieprawidłowy adres URL

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Rozwiązanie</strong></td>
    <td>Popraw adres URL.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy atrybut zawiera adres URL, ale jest on nieprawidłowy.

### Nieprawidłowy protokół adresu URL

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Rozwiązanie</strong></td>
    <td>Użyj prawidłowego protokołu. Być może protokół `http` należy zastąpić protokołem `https`.</td>
  </tr>
</table>

Ten błąd występuje w przypadku tagów zawierających atrybuty `href` lub `src`, którym trzeba przyporządkować konkretną wartość (konkretny protokół).
Na przykład wiele tagów wymaga protokołu `https`.

### Brak obowiązkowej właściwości w atrybucie

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj brakującą właściwość.</td>
  </tr>
</table>

Obecnie ten błąd występuje w przypadku braku poniższych obowiązkowych właściwości:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Odnoszą się one do oczekiwanych tagów:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Wzajemnie wykluczające się atrybuty

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń jeden ze wzajemnie wykluczających się atrybutów.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy tag zawiera oba wzajemnie wykluczające się atrybuty.
Na przykład w poniższych tagach dozwolony jest tylko jeden z wymienionych atrybutów:

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` albo `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` albo `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` albo `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` albo `data-videoid`

### Brak obowiązkowego atrybutu z listy

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Dodaj brakujący obowiązkowy atrybut z podanej listy atrybutów.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy w tagu brakuje jednego wymaganego atrybutu.
Na przykład poniższe tagi wymagają jednego z dwóch atrybutów do wyboru:

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` albo `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` albo `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` albo `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` albo `data-videoid`

### Niewłaściwy tag nadrzędny

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Ustaw tag jako bezpośredni element podrzędny wymaganego tagu nadrzędnego.</td>
  </tr>
</table>

Niektóre tagi wymagają bezpośredniego tagu nadrzędnego (w przeciwieństwie do odległego przodka).
Poniżej znajduje się lista wymaganych tagów nadrzędnych dla określonych tagów (w kolejności tag – element nadrzędny):

* Tag `!doctype` wymaga tagu nadrzędnego `root`.
* Tag `html` wymaga tagu nadrzędnego `!doctype`.
* Tag `head` wymaga tagu nadrzędnego `html`.
* Tag `body` wymaga tagu nadrzędnego `html`.
* Tag `link` wymaga tagu nadrzędnego `head`.
* Tag `meta` wymaga tagu nadrzędnego `head`.
* Tag `style amp-custom` wymaga tagu nadrzędnego `head`.
* Tag `style` wymaga tagu nadrzędnego `boilerplate (noscript)`.
* Tag `noscript` wymaga tagu nadrzędnego `head`.
* Tag `script` wymaga tagu nadrzędnego `head`.
* Tag `source` wymaga tagu multimediów (`amp-audio`, `amp-video` itd.).

### Niedozwolony przodek tagu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń (albo przenieś) niedozwolony zagnieżdżony tag.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy tag jest potomkiem innego tagu, który nie przeszedł weryfikacji.
Obecnie jedynym przykładem jest tag `template`, który nie może być zagnieżdżony pod innym tagiem `template`.

### Obowiązkowy przodek tagu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Przenieś tag albo ustaw go jako potomka określonego tagu.</td>
  </tr>
</table>

Obowiązkowe tagi potomne są zdefiniowane za pomocą atrybutu `mandatory_ancestor` w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Ten błąd występuje w przypadku, gdy w poniższych tagach brakuje atrybutu `mandatory_ancestor` (w kolejności tag – przodek):

* Tag `img` musi być elementem potomnym tagu `noscript`.
* Tag `video` musi być elementem potomnym tagu `noscript`.
* Tag `audio` musi być elementem potomnym tagu `noscript`.
* Tag `noscript` musi być elementem potomnym tagu `body`.

### Obowiązkowy przodek tagu z podpowiedzią

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń tag, ustaw go jako element potomny określonego tagu lub zastąp go tagiem z podpowiedzią.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy dokument AMP zawiera jeden z poniższych tagów, który jest nieprawidłowo zagnieżdżony w jego obowiązkowym tagu nadrzędnym:

* Tag `img` nie jest zagnieżdżony w tagu nadrzędnym `noscript`.
* Tag `video` nie jest zagnieżdżony w tagu nadrzędnym `noscript`.
* Tag `audio` nie jest zagnieżdżony w tagu nadrzędnym `noscript`.
* Tag `noscript` nie jest zagnieżdżony w tagu nadrzędnym `body`.

### Zduplikowany unikalny tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń jeden ze zduplikowanych tagów z dokumentu AMP.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy dozwolone jest tylko jedno wystąpienie tagu, a dokument zawiera jego duplikat.

Znana jest pełna lista unikalnych tagów:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Błędy stylu i układu

Zanim przejdziemy do omawiania błędów stylu i układu, warto wyjaśnić działanie [stylu](/pl/docs/guides/author-develop/responsive/style_pages.html) i [układu](/pl/docs/guides/author-develop/responsive/control_layout.html) na stronach AMP. Strony AMP są stronami HTML, dlatego ich styl jest bardzo podobny do stylu każdej strony HTML.
Istnieją jednak pewne ograniczenia, które mają zagwarantować szybkie wczytywanie się stron, a narzędzie do weryfikacji stron AMP wymusza stosowanie tych ograniczeń.

Na stronach AMP układ podlega ściślejszej kontroli.
Każdy wyświetlany na stronie tag wymaga wstępnie określonej wysokości i szerokości, co znacznie usprawnia renderowanie i przewijanie.
Nie oznacza to, że te atrybuty muszą być wpisywane ręcznie.
Niektóre układy przyjmują domyślne wartości, dlatego narzędzie do weryfikacji stron AMP nie będzie generować błędów w ich przypadku.

Każdy tag AMP zawiera listę atrybutów `supported_layouts` zdefiniowaną w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Narzędzie generuje błędy w przypadku nieobsługiwanych układów, a zasady weryfikacji stosuje do układów o wstępnie zdefiniowanych parametrach.

### Zbyt długi arkusz stylów

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Zmniejsz rozmiar arkusza stylów tak, by nie przekraczał 50 000 bajtów.</td>
  </tr>
</table>

Narzędzie do weryfikacji stron AMP generuje ten błąd, gdy zmierzony rozmiar zawartości stylów w tagu `<style amp-custom>` przekracza limit 50 000 bajtów.

### Błąd składni CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń błąd składni CSS.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy określony tag zawiera błędy składni CSS.
Jeśli nie wiesz, co powoduje ten błąd, spróbuj przeanalizować składnię CSS za pomocą internetowego narzędzia do weryfikacji składni CSS, takiego jak [csslint](http://csslint.net/).

### Błąd składni CSS w określonej regule

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń podany błąd składni CSS.</td>
  </tr>
</table>

Ten błąd dotyczy reguł ze znakiem @ w składni CSS; standard AMP dopuszcza zaledwie kilka takich reguł w przypadku takiej składni
(zobacz też [specyfikację standardu AMP](/docs/reference/spec.html)).
Na przykład reguła `@import` jest niedozwolona.
Błąd weryfikacji wyraźnie wskazuje nieprawidłową regułę, co ułatwia usuwanie występujących w niej błędów.

### Tag AMP nie obsługuje domniemanego układu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Podaj prawidłowy atrybut układu dla tagu.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy nie określisz układu dla tagu AMP, a domniemany układ (oparty na szerokości, wysokości i rozmiarach) nie jest obsługiwany.
Sprawdź wartości atrybutu `supported_layout` dla tagu w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Atrybut `layout` określa faktyczne działanie układu.
Więcej informacji na temat działania układu zawiera artykuł pt. [Kontrolowanie układu](/pl/docs/guides/author-develop/responsive/control_layout.html) oraz [specyfikacja systemowa układu AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

**Uwaga:** jeśli nie określisz układu i nie uwzględnisz wartości atrybutu `width` i `height`, układ przyjmie domyślną wartość CONTAINER. Narzędzie do weryfikacji wygeneruje błąd, ponieważ wartość CONTAINER nie jest obsługiwana przez żaden tag AMP.
Aby usunąć błąd, określ układ inny niż CONTAINER lub dodaj wartość `width` i/lub `height`.

### Atrybut niedozwolony przez domniemany układ

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Rozwiązanie</strong></td>
    <td>Usuń niedozwolony atrybut z tagu albo określ układ, w którym taki atrybut jest dozwolony.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy nie określisz układu dla tagu AMP, a domniemany układ zawiera niedozwolony atrybut.
Niedozwolone atrybuty typów układów są opisane w [specyfikacji systemowej układu AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

### Określony układ nie jest obsługiwany przez tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Określ układ, który jest obsługiwany przez tag.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy określony układ dla tagu nie jest obsługiwany.
Sprawdź wartości atrybutu `supported_layout` dla tagu w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Atrybut `layout` określa faktyczne działanie układu.
Więcej informacji na temat działania układu zawiera artykuł [Kontrolowanie układu](/pl/docs/guides/author-develop/responsive/control_layout.html) oraz [specyfikacja systemowa układu AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

### Atrybut niedozwolony przez określony układ

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Rozwiązanie</strong></td>
    <td>Usuń niedozwolony atrybut z tagu albo określ układ, w którym taki atrybut jest dozwolony.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy określisz układ dla tagu AMP, który zawiera niedozwolony atrybut.
Niedozwolone atrybuty typów układów są opisane w [specyfikacji systemowej układu AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

### Nieprawidłowa wartość dla atrybutu wymaganego przez układ

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Ustaw określoną wartość atrybutu.</td>
  </tr>
</table>

Ten błąd występuje wówczas, gdy wartość atrybutu jest nieprawidłowa dla określonego układu.
Aby lepiej zrozumieć, co generuje ten błąd, dowiedz się więcej na temat [różnych schematów działania układów](/pl/docs/guides/author-develop/responsive/control_layout.html).

Załóżmy, że układ ma być typu `fixed-height`, a parametry `height` i `width` mają określone wartości liczbowe.
Układ typu `fixed-height` przyjmuje wartość `height`.
Atrybut `width` nie może występować albo musi zostać ustawiony tak, by przyjmował wartość `auto`.
Narzędzie do weryfikacji generuje błąd ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Niespójne jednostki szerokości i wysokości

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Użyj spójnych jednostek szerokości i wysokości.</td>
  </tr>
</table>

Z wyjątkiem atrybutu `layout=fixed` wysokość i szerokość musi być wyrażona w tych samych jednostkach.
Gdy tak nie jest, występuje ten błąd.

Na przykład użycie tagu `<amp-img src="" layout="responsive" width="42px" height="42rem">` spowoduje wygenerowanie poniższego komunikatu o błędzie:

Niespójne jednostki szerokości i wysokości w tagu „amp-img” – szerokość jest podana w „px”, a wysokość – w „rem”.

## Błędy związane z użyciem szablonów

Strony AMP nie mogą zawierać składni określającej szablony, chyba że taka składnia jest umieszczona w tagu AMP, który z definicji ma zawierać szablony, na przykład [amp-mustache](/docs/reference/extended/amp-mustache.html).

Pliki źródłowe mogą zawierać szablony pod warunkiem, że dane wyjściowe wygenerowane z tych plików nie będą zawierać szablonów (zobacz też [Korzystanie z narzędzi do wstępnej obróbki kodu CSS](/pl/docs/guides/author-develop/responsive/style_pages.html)).

### Atrybut zawiera składnię szablonu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń składnię szablonu otoczoną nawiasami klamrowymi z atrybutu.</td>
  </tr>
</table>

Ten błąd występuje za każdym razem, gdy narzędzie do weryfikacji napotka na [składnię szablonu otoczoną nawiasami klamrowymi](https://mustache.github.io/mustache.5.html) w wartości atrybutu.

### Atrybut zawiera składnię szablonu bez kodów zmiany znaczenia

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Użyj kodów zmiany znaczenia składni szablonu otoczonej nawiasami klamrowymi.</td>
  </tr>
</table>

Ten błąd występuje za każdym razem, gdy narzędzie do weryfikacji napotka na [składnię szablonu otoczoną nawiasami klamrowymi bez kodów zmiany znaczenia](https://mustache.github.io/mustache.5.html) w wartości atrybutu.

### Atrybut zawiera część szablonu

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń część szablonu otoczonego nawiasami klamrowymi.</td>
  </tr>
</table>

Ten błąd występuje za każdym razem, gdy narzędzie do weryfikacji napotka na [część szablonu otoczonego nawiasami klamrowymi](https://mustache.github.io/mustache.5.html) w wartości atrybutu.

## Błędy związane z nieużywanymi elementami

### Nieużywany tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Usuń nieużywany tag.</td>
  </tr>
</table>

To ostrzeżenie występuje wówczas, gdy dokument AMP zawiera tag AMP, który wcześniej był poprawny.
Ten komunikat jest tylko ostrzeżeniem, które nie wpływa na poprawność dokumentów AMP.
Aktualnie nie istnieje lista nieużywanych tagów. To ostrzeżenie jest przeznaczone dla elementów, które w przyszłości przestaną być używane.

### Nieużywany atrybut

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Rozwiązanie</strong></td>
  	<td>Zgodnie z właściwą praktyką usuń nieużywany atrybut.</td>
  </tr>
</table>

To ostrzeżenie wyświetla się wówczas, gdy dokument AMP zawiera atrybut AMP, który wcześniej był poprawny.
Ten komunikat jest tylko ostrzeżeniem, które nie wpływa na poprawność dokumentów AMP.

Aby znaleźć nieużywane atrybuty każdego tagu AMP, wyszukaj ciąg `deprecation` w [specyfikacji narzędzia do weryfikacji stron AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
</body>
</html>
