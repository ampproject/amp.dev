---
"$title": Śledzenie zaangażowania za pomocą analityki
"$order": '4'
description: Platformy analityczne są powszechnie integrowane z witrynami internetowymi za pomocą fragmentów kodu JavaScript inline i wywołań funkcji, które wywołują zdarzenia odsyłane do systemu analitycznego.
---

Platformy analityczne są powszechnie integrowane z witrynami internetowymi za pomocą fragmentów kodu JavaScript inline i wywołań funkcji, które wywołują zdarzenia odsyłane do systemu analitycznego. AMP zapewnia elastyczną składnię konfiguracji JSON, która pozwala na powielanie tego procesu dla kilku partnerów analitycznych.

Poniżej widnieje przykład tradycyjnego kodu śledzenia Google Analytics w języku JavaScript. Przepiszemy go na format JSON [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), ale najpierw spójrzmy na tradycyjne podejście:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Ten kod JavaScript jest dość prosty; wysyła powiadomienie w celu śledzenia zdarzenia odsłony strony.

Aby odtworzyć tę funkcjonalność w AMP, musimy najpierw **dodać** bibliotekę składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) do sekcji `<head>` naszego dokumentu:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Następnie należy **dodać** składnik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) na końcu sekcji `body` dokumentu:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

Podobnie jak w przykładzie kodu JavaScript u góry tej strony, ten fragment [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) wyśle do usługi Google Analytics powiadomienie, że strona została wyświetlona.

Aby to określić, ustawiliśmy `type` `googleanalytics`, a następnie w JSON utworzyliśmy wyzwalacz, który nazwaliśmy „default pageview”.  Wyzwalacz ten będzie uruchamiany, gdy strona będzie widoczna (ze względu na parametr `"on": "visible"`"), a po jego uruchomieniu wyślemy żądanie analityki `pageview` do usługi Google Analytics wraz z podanymi przez nas zmiennymi `vars`.

JSON używany do konfiguracji składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) jest bardzo elastycznym formatem opisu wysyłanych danych analitycznych i momentu ich wysyłania.  Składnik [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ma pełne szczegóły dotyczące formatu.

Bazując na powyższym przykładzie, możemy **dodać** następny wyzwalacz o nazwie `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

Jak można się domyślić z nazwy tego nowego wyzwalacza, będzie on uruchomiony po kliknięciu elementu z identyfikatorem `"header"` (określonym przez właściwości `"on": "click"` i `"selector": "#header"`).  Gdy wyzwalacz ten zostanie uruchomiony, wyślemy żądanie `event` do naszego dostawcy usług analityki, określając kilka zmiennych do uwzględnienia w żądaniu.

Jeśli masz niestandardową platformę śledzenia, z którą chcesz się zintegrować, możesz nadal korzystać ze składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) i zdefiniować własne spersonalizowane punkty końcowe adresów URL, a które chcesz wysyłać dane śledzenia. Dowiedz się więcej z dokumentacji referencyjnej składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **UWAGA —**  `“UA-YYYY-Y”` to przykładowe konto Google Analytics; w razie użycia tego przykładu w swojej witrynie należy je zastąpić kodem śledzenia Google Analytics tej witryny. [/tip]

[tip type="tip"] **PORADA —** jeśli interesuje Cię prostszy system śledzenia, możesz przyjrzeć się składnikowi [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Jeśli potrzebujesz tylko śledzić odsłony stron, składnik [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) jest rozwiązaniem lżejszym niż [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), ponieważ ma na celu tylko spełnienie wymagań tradycyjnego śledzenia przy użyciu piksela. Dowiedz się więcej z artykułu [Analityka: przewodnik po podstawach](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
