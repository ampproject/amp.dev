---
'$title': Integracja z AMP w celu obsługi reklam wizualnych
$order: 5
description: Ten przewodnik jest przeznaczony dla sieci reklamowych, które chcą zintegrować się z AMP, aby serwować reklamy wizualne na stronach AMP.
formats:
  - ads
---

Ten przewodnik jest przeznaczony dla sieci reklamowych, które chcą zintegrować się z AMP, aby serwować reklamy wizualne na stronach AMP.

## Omówienie

Prowadząc serwer reklamowy, możesz zintegrować się z AMP w celu serwowania tradycyjnych reklam HTML na stronach AMP, jak również serwować reklamy [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Chcesz serwować tradycyjne reklamy HTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Chcesz serwować reklamy AMPHTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (tj. jeśli nie został jeszcze przez Ciebie utworzony taki składnik do serwowania tradycyjnych reklam HTML).
2. [Utwórz integrację Fast Fetch w celu serwowania reklam AMPHTML](#creating-a-fast-fetch-integration).

## Tworzenie składnika `amp-ad` <a name="creating-an-amp-ad"></a>

Wydawcy, których obsługuje Twój serwer reklam, dodają dostarczoną przez Ciebie bibliotekę JavaScript i umieszczają różne „fragmenty kodu reklam”, które opierają się na owej bibliotece JavaScript w celu pobierania reklam i renderowania ich w swoich witrynach internetowych. AMP nie zezwala wydawcom na wykonywanie dowolnego kodu JavaScript, trzeba więc samodzielnie uzupełnić otwarty kod AMP, aby umożliwić żądanie reklam z Twojego serwera reklamowego za pomocą znacznika [`amp-ad`](../../../documentation/components/reference/amp-ad.md).

[tip type="note"] **UWAGA —** tej implementacji [`amp-ad`](../../../documentation/components/reference/amp-ad.md) możesz użyć do wyświetlania tradycyjnych reklam HTML **oraz** reklam AMPHTML. [/tip]

Na przykład, serwer Amazon A9 można wywołać przy użyciu następującej składni:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

W powyższym kodzie atrybut `type` określa sieć reklamową, którą w tym przypadku jest A9. Atrybuty `data-*` są zależne od parametrów, których oczekuje serwer A9 firmy Amazon w celu dostarczenia reklamy. Plik [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) pokazuje, w jaki sposób parametry są mapowane w celu wykonania wywołania adresu URL serwera A9 przez kod JavaScript. Odpowiednie parametry przekazywane przez znacznik [`amp-ad`](../../../documentation/components/reference/amp-ad.md) są dołączane do adresu URL w celu zwrócenia reklamy.

Instrukcje dotyczące tworzenia integracji składnika [`amp-ad`](../../../documentation/components/reference/amp-ad.md) — patrz [Integracja sieci reklamowych z AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Tworzenie integracji Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) to mechanizm AMP, który oddziela żądanie reklamy od odpowiedzi z reklamą, umożliwiając wcześniejsze generowanie żądań reklam w cyklu życia strony i renderowanie reklam tylko wtedy, gdy prawdopodobnie zobaczą je użytkownicy. Fast Fetch zapewnia preferencyjne przetwarzanie zweryfikowanych reklam AMPHTML przed tradycyjnymi reklamami HTML. W Fast Fetch, jeśli reklama nie przejdzie walidacji, jest ona otaczana międzydomenowym elementem iframe w celu przekazania do piaskownicy z pozostałej części dokumentu AMPHTML. Reklama AMPHTML przechodząca walidację jest z kolei zapisywana bezpośrednio w stronie. Mechanizm Fast Fetch obsługuje zarówno reklamy AMP, jak i bez AMP; w przypadku reklam, które nie przeszły walidacji, nie są wymagane żadne dodatkowe żądania reklam.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Przepływ integracji mechanizmu Fast Fetch', caption='Przepływ integracji mechanizmu Fast Fetch' ) }}

Aby serwować reklamy AMPHTML ze swojego serwera reklam, musisz zapewnić integrację mechanizmu Fast Fetch, która obejmuje:

1. Obsługę komunikacji w sieci SSL.
2. Dostarczenie skryptu JavaScript do tworzenia żądania reklam (przykładowe implementacje: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Walidacja i podpisanie kreacji za pomocą usługi walidacji. [Cloudflare](https://blog.cloudflare.com/firebolt/) zapewnia usługę weryfikacji reklam AMP, umożliwiając każdemu niezależnemu dostawcy reklam dostarczanie szybszych, lżejszych i bardziej angażujących reklam.

Instrukcje dotyczące tworzenia integracji Fast Fetch zawiera [Przewodnik implementacji sieci Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).

## Zasoby pokrewne

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Lista obsługiwanych dostawców reklam](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Wpis na blogu opisujący wdrożenie Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
