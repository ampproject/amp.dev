---
"$title": Sprawianie, by Twoje strony można było odnaleźć
"$order": '3'
description: Skonfigurowanie tego dwukierunkowego powiązania jest konieczne, aby wyszukiwarki mogły zrozumieć związek między naszym zwykłym kanonicznym dokumentem HTML, a dokumentem AMP.
---

Po utworzeniu artykułu informacyjnego w AMP upewnijmy się, że użytkownicy będą mogli znaleźć i odkryć tę treść.

## Powiązanie treści AMP

Witryna internetowa może składać się z samych stron AMP, niektórych stron AMP lub nie zawierać żadnych stron AMP. Ta część samouczka przedstawia jak włączyć AMP do struktury witryny internetowej.

Linkowanie kanoniczne na zwykłych stronach HTML jest powszechną techniką deklarowania, która strona powinna być uznana za preferowaną, gdy wiele stron zawiera tę samą treść.

Jednym z typowych podejść podczas dodawania AMP do witryny internetowej jest generowanie wersji AMP tradycyjnych stron HTML bez AMP. Obie wersje mają na ogół tę samą treść (np. tekst artykułu), ale mogą mieć różne prezentacje.  W tym scenariuszu należy traktować tradycyjne strony HTML jako strony „kanoniczne” i sparować strony AMP z tymi stronami HTML.

Jeśli możesz, użyj AMP do utworzenia witryny tak, jak każdej innej biblioteki JavaScript i zapomnij o linkowaniu kanonicznym. Użycie AMP do utworzenia całej witryny internetowej drastycznie zmniejsza obciążenie związane z jej utrzymaniem.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Do celów niniejszego samouczka skupimy się na przypadku, gdy masz stronę w wersji AMP i bez AMP. W tym samouczku nasza witryna internetowa zawiera artykuł informacyjny na stronie HTML bez AMP (`article.html`) oraz wersję AMP tej strony, (`article.amp.html`). Sparujemy te strony za pomocą znaczników `link`.

Zrobiliśmy już pierwszy krok, aby osiągnąć to w naszym dokumencie AMP, włączając w sekcji `<head>` znacznik linku do strony kanonicznej:

```html
<link rel="canonical" href="/article.html">
```

Następnym krokiem jest powiązanie artykułu kanonicznego ze stroną AMP. Osiąga się to poprzez dodanie znacznika `<link rel="amphtml">` do sekcji `<head>` artykułu kanonicznego.

W pliku `article.html` **dodaj** następujący kod do sekcji `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

Poniższy diagram ilustruje kierunki znaczników linków:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

Ustawienie tego dwukierunkowego powiązania jest konieczne, aby wyszukiwarki mogły zrozumieć związek między naszym zwykłym kanonicznym dokumentem HTML, a dokumentem AMP. Gdyby nie podano żadnych linków, niekoniecznie byłoby jasne dla wyszukiwarki, które artykuły są „wersjami AMP” zwykłych dokumentów HTML. Jawnie podając te linki zapewniamy, że nie ma żadnych niejasności!

## Dodawanie danych strukturalnych

Prawidłowe strony AMP nie wymagają danych strukturalnych [schema.org](http://schema.org/), ale niektóre platformy, takie jak wyszukiwarka Google, wymagają tego do obsługi pewnych formatów, takich jak karuzela Top Stories. Włączenie danych strukturalnych jest zazwyczaj dobrym pomysłem. Dane strukturalne pomagają wyszukiwarkom lepiej zrozumieć stronę internetową i lepiej wyświetlać zawartość na stronach wyników wyszukiwania (np. w bogatych fragmentach). Dane strukturalne dodaje się w sekcji `<head>` strony AMP za pomocą znacznika typu skryptu `application/ld+json`.

W przypadku naszego artykułu informacyjnego **dodaj** następujące dane strukturalne na końcu sekcji `<head>` dokumentu AMP:

```html

<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
 },
 "headline": "My First AMP Article",
 "image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
 },
 "datePublished": "2015-02-05T08:00:00+08:00",
 "dateModified": "2015-02-05T09:20:00+08:00",
 "author": {
   "@type": "Person",
   "name": "John Doe"
 },
 "publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
 },
 "description": "My first experience in an AMPlified world"
}
</script>
```

[tip type="note"] **UWAGA —** treść powinna być zawsze taka sama. W przypadku artykułów informacyjnych należy podać typ „NewsArticle”. Nagłówek powinien być zgodny z tytułem artykułu. Obiekt obrazu odnosi się do obrazu hero image artykułu. [/tip]

**Ponownie załaduj** stronę w przeglądarce i sprawdź, czy nie wprowadzono żadnych błędów walidacji AMP.

[tip type="note"] Oprócz formatu danych strukturalnych schema.org są również inne formaty obsługiwane przez wyszukiwarki i sieci mediów społecznościowych. Sprawdź następującą dokumentację:

- [Znaczniki meta kart Twittera](https://dev.twitter.com/cards/overview)
- [Znaczniki meta Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Walidacja danych strukturalnych

Wiele platform udostępnia narzędzia do walidacji, pozwalające sprawdzić prawidłowość danych strukturalnych. W tym samouczku sprawdzimy poprawność naszych danych strukturalnych za pomocą [narzędzia Google do sprawdzania danych uporządkowanych](https://developers.google.com/structured-data/testing-tool/).

1. W nowym oknie przeglądarki otwórz <a>narzędzie Google do sprawdzania danych uporządkowanych</a>.
2. Wybierz kartę **Fragment kodu**.
3. Skopiuj i wklej pełny kod źródłowy ze strony AMP do panelu edytora tekstów narzędzia do sprawdzania poprawności.
4. Kliknij przycisk **Rozpocznij test**.

Jeśli dane strukturalne są prawidłowe, wyświetlonych zostanie **0 błędów** i **0 ostrzeżeń**.

[tip type="read-on"] **CZYTAJ DALEJ —** aby dowiedzieć się więcej na temat odnajdywania strony, zapoznaj się z przewodnikiem [Spraw, by Twoje strony można było odnaleźć](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). [/tip]

Niesamowita robota!  Artykuł informacyjny AMP został utworzony.
