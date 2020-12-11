---
"$title": Dodawanie rozszerzonych składników AMP
"$order": '2'
description: System składników AMP pozwala na szybkie tworzenie wydajnych i elastycznych funkcji w artykułach przy minimalnym nakładzie pracy. Biblioteka AMP HTML ma trzy klasyfikacje składników AMP...
---

System składników AMP pozwala na szybkie tworzenie wydajnych i elastycznych funkcji w artykułach przy minimalnym nakładzie pracy. Biblioteka AMP HTML ma trzy klasyfikacje składników AMP:

- **wbudowane**: są to składniki zawarte w podstawowej bibliotece JavaScript AMP (określonej w sekcji `<head>`), takie jak [`amp-img`](../../../../documentation/components/reference/amp-img.md) i [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Tych składników można natychmiast używać w dokumencie AMP.

- **rozszerzone**: są to rozszerzenia biblioteki podstawowej, które muszą być jawnie dodane do dokumentu jako elementy niestandardowe. Elementy niestandardowe wymagają specjalnych skryptów, dodawanych do sekcji `<head>` (np., `<script async custom-element="[`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **eksperymentalne**: są to składniki, które zostały dopuszczone do użytku, ale nie są jeszcze gotowe do szerokiego zastosowania. Programiści mogą zdecydować się na stosowanie tych funkcji, zanim zostaną one w pełni wydane.  Dowiedz się więcej z artykułu [Funkcje eksperymentalne](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Nasza próbka korzysta już z wbudowanego składnika [`amp-img`](../../../../documentation/components/reference/amp-img.md) i zbadaliśmy jak ten składnik odnosi się do systemu układu AMP w samouczku [Konwersja HTML na AMP](../../../../documentation/guides-and-tutorials/start/converting/index.md). Teraz dodajmy kilka powszechnie używanych **rozszerzonych** składników AMP do naszego artykułu informacyjnego.

## Monetyzacja za pomocą reklam

Reklamy w AMP konstruuje się za pomocą składnika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) pozwala na konfigurację reklam na kilka sposobów, takich jak szerokość, wysokość i tryb układu. Wiele platform reklamowych wymaga jednak dodatkowej konfiguracji, np. identyfikatora konta sieci reklamowej, określenia serwowanej reklamy lub opcji targetowania reklamy. Opcje te można z łatwością określić w składniku [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) za pomocą atrybutów HTML.

Spójrz na ten przykład reklamy **DoubleClick**:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Jak widać, jest to bardzo prosta konfiguracja. Zwróć uwagę na atrybut `type`, który informuje składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) o platformie reklamowej, której chcemy użyć. W tym przypadku chcemy użyć platformy [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), więc jako wartość podaliśmy `doubleclick`.

Atrybut `data-slot` jest bardziej unikalny. W elementach [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) wszelkie atrybuty zaczynające się od `data-` są atrybutami specyficznymi dla danego usługodawcy. To znaczy, że niekoniecznie wszyscy usługodawcy będą wymagali tego konkretnego atrybutu ani niekoniecznie będą reagować, jeśli zostanie on podany. Porównaj na przykład powyższą próbkę **DoubleClick** z następującą reklamą testową z platformy [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Spróbuj **dodać** oba powyższe przykłady do swojego artykułu zaraz po znaczniku `<header>`.

Pamiętaj, że nie wszystkie składniki są zawarte w głównym pliku JavaScript biblioteki AMP. Musimy dołączyć dodatkowe żądanie JavaScript dotyczące składnika reklamowego.

**Dodaj** następujący skrypt w sekcji `<head>`:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

**Odśwież** stronę, aby zobaczyć dwie testowe reklamy:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **WAŻNE —** możesz mieć w swojej konsoli programistycznej kilka błędów, takich jak `Mixed Content` lub `XMLHttpRequest cannot load`. Pierwszy błąd jest prawdopodobnie związany z reklamą A9, ponieważ nie wszystkie ładowane treści są bezpieczne. Jest to istotny wymóg, dotyczący wszystkich reklam obsługiwanych na platformie AMP. [/tip]

Dwa elementy [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) poniżej stanowią przykład elastyczności, jaką składnik [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) zapewnia obsługowym funkcjom platformy reklamowej.  W tym przypadku skonfigurowaliśmy (za pomocą pulpitu nawigacyjnego DoubleClick) dwie reklamy testowe DoubleClick, które będą pokazywane tylko w niektórych krajach — pierwsza będzie pokazywana tylko w Wielkiej Brytanii, a druga tylko w USA.  Spróbuj **dodać** te dwie konfiguracje reklam z geotargetingiem w dokumencie AMP poniżej reklam dodanych wcześniej:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Odśwież** stronę i spójrz. Poniższy zrzut ekranu został zrobiony z Kanady, więc nie została załadowana żadna z reklam:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **UWAGA —** w tych znacznikach [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) znajdują się dodatkowe znaczniki `div` z atrybutem `fallback`. Czy zgadniesz, co znaczy ten atrybut {code 5}fallback? Informuje on system ładujący AMP, aby pokazywał zawartość tego elementu tylko wtedy, gdy nie zostanie załadowany element nadrzędny. Więcej informacji zawiera artykuł [Elementy zastępcze i zasoby rezerwowe](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **CZYTAJ DALEJ —** aby sprawdzić najnowsze obsługiwane sieci reklamowe, zapoznaj się z dokumentacją referencyjną składnika [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **UWAGA —** uruchamianie wewnątrz dokumentu AMP kodu JavaScript dostarczonego przez sieć reklamową jest niedozwolone. Zamiast tego, środowisko uruchomieniowe AMP ładuje ramkę iframe z innego źródła (poprzez piaskownicę iframe) i wykonuje JS sieci reklamowej w tej piaskownicy iframe. [/tip]

Nasz dokument AMP zawiera teraz osadzony na stronie tekst, obraz i reklamę, które są kluczowymi elementami, niezbędnymi do opowiedzenia historii i zarabiania na treści. Nowoczesne strony internetowe często zawierają jednak więcej funkcji niż tylko obrazy i tekst.

Wznieśmy nasz dokument AMP na wyższy poziom i dodajmy bardziej zaawansowaną funkcjonalność internetową, która jest powszechnie spotykana w artykułach informacyjnych, na przykład:

- Filmy z YouTube
- Tweety
- Cytaty z artykułów

## Osadzanie filmu z YouTube

Spróbujmy osadzić w dokumencie film z YouTube. **Dodaj** następujący kod tuż za sekcją `<header>` w dokumencie AMP (nad właśnie dodanymi elementami [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Odśwież** stronę. Zamiast filmu zobaczysz tekst: *The video could not be loaded.*

Nawet jeśli Twoja przeglądarka może bez problemu wyświetlać filmy z YouTube, i tak wyświetli ten błąd. Dlaczego? Wideo w rzeczywistości nie zostało załadowane, a raczej zawiódł sam składnik.

Pamiętaj, że nie wszystkie składniki są zawarte w głównym pliku JavaScript biblioteki AMP. Musimy dołączyć dodatkowe żądanie JavaScript dotyczące składnika YouTube.

[tip type="note"] **UWAGA —** jeśli nadal masz otwartą konsolę programistyczną i w adresie URL `#development=1`, w tym momencie wyświetlony zostanie błąd walidatora AMP przypominający o dodaniu JavaScript [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) i link do dokumentacji, która wskaże znacznik `script` do dodania. [/tip]

**Dodaj** następujący skrypt w sekcji `<head>`:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Odśwież** stronę, aby zobaczyć film z YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Podobnie jak w przypadku innych elementów na stronie, określiliśmy atrybuty `width` i `height` filmu, aby system układu AMP mógł obliczyć współczynnik proporcji. Ponadto ustawiliśmy `layout` `responsive`, aby film wypełnił szerokość swojego elementu nadrzędnego.

Aby dowiedzieć się więcej na temat osadzania filmów z YouTube, przeczytaj dokumentację składnika [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Aby poznać więcej składników obsługujących wideo i multimedia, sprawdź [listę składników multimedialnych AMP](../../../../documentation/components/index.html#media).

[tip type="tip"] **PORADA —** aby informować użytkowników, że składnik nie został załadowany lub nie jest obsługiwany w danej przeglądarce, użyj atrybutu [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks). [/tip]

## Wyświetlanie tweetów

Osadzanie wstępnie sforrmatowanych tweetów z Twittera jest częste w artykułach informacyjnych. Składnik [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) może z łatwością zapewnić tę funkcjonalność.

Zacznij od dodania następującego żądania JavaScript do sekcji `<head>` dokumentu:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Teraz w artykule **dodaj** ten kod w celu osadzenia tweeta:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

Atrybut `data-tweetid` jest kolejnym przykładem niestandardowego atrybutu wymaganego przez platformę. W tym przypadku Twitter koreluje wartość atrybutu `data-tweetid` z danym tweetem.

**Odśwież** przeglądarkę i spójrz na stronę. Powinien zostać wyświetlony tweet:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Aby dowiedzieć się więcej na temat osadzania tweetów z Twittera, przeczytaj dokumentację składnika [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **PORADA —** AMP zapewnia więcej składników do osadzania treści z sieci społecznościowych. Zobacz najnowsze [składniki AMP do mediów społecznościowych](../../../../documentation/components/index.html#social). [/tip]

## Wyróżnianie cytatu z artykułu

Typową cechą artykułów informacyjnych jest wyróżnianie szczególnie wciągających fragmentów tekstu z artykułu. Na przykład cytat z konkretnego źródła lub ważny fakt może być powtórzony większą czcionką, aby przyciągnąć uwagę czytelnika.

Nie wszystkie owe fragmenty tekstu mają jednak tę samą długość w znakach, co może utrudniać zrównoważenie większego rozmiaru czcionki z ilością miejsca, jaką tekst zajmuje na stronie.

AMP zapewnia kolejny składnik specjalnie zaprojektowany na tego typu sytuacje, o nazwie [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Składnik [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) umożliwia zdefiniowanie elementu o stałej szerokości i wysokości oraz maksymalnym rozmiarze czcionki. Składnik inteligentnie skaluje rozmiar czcionki w celu **dopasowania** tekstu do dostępnej szerokości i wysokości.

Wypróbujmy go. Najpierw **dodaj** bibliotekę składnika do sekcji `<head>`:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Dodaj do strony następujące elementy:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Odśwież** stronę i sprawdź wynik!

Eksperymentuj dalej. Co się stanie, jeśli cytat będzie znacznie krótszy?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

A jeśli cytat jest dłuższy?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

W ramach ostatniego eksperymentu ze składnikiem [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) spróbuj utworzyć krótki fragment tekstu, taki jak „Hello” o znacznie większej wysokości (na przykład o wartości 400), i zachowaj wartość atrybutu max-font-size 42. Jak wygląda wynikowa strona? Czy tekst jest wyśrodkowany w pionie? Czy też wysokość znacznika [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) zmniejsza się, aby pasować do maksymalnego rozmiaru czcionki? Wiesz już co nieco o systemie układu AMP, spróbuj więc odpowiedzieć na pytanie przed rozpoczęciem zabawy z kodem!

Więcej informacji o składniku [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) zawiera [demo na żywo w AMP by Example](../../../../documentation/examples/documentation/amp-fit-text.html).
