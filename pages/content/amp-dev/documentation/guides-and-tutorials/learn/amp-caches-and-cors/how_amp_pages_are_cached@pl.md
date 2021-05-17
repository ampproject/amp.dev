---
'$title': Jak są buforowane strony AMP
$order: 0
description: W tym dokumencie opisano rolę serwerów buforujących AMP w ekosystemie AMP oraz sposób buforowania strony AMP.
formats:
  - websites
  - stories
  - ads
---

W tym dokumencie opisano rolę serwerów buforujących AMP w ekosystemie AMP oraz sposób buforowania strony AMP.

## Do czego służy serwer buforujący AMP?

<a>Usługa buforowania AMP</a> to sieć dostarczania treści (CDN) oparta na serwerach proxy i służąca do dostarczania prawidłowych dokumentów AMP. Serwery buforujące AMP są przeznaczone do następujących celów:

1. Serwowania jedynie prawidłowych stron AMP.
2. Umożliwiania wstępnego ładowana stron AMP w sposób wydajny i bezpieczny.
3. Wykonywania dodatkowych, korzystnych dla użytkownika optymalizacji wydajności zawartości.

[tip type="note"] Dokumenty wiadomości e-mail AMP stanowią wyjątek od buforowania AMP. [/tip]

Dowiedz się więcej o serwerach buforujących AMP z poniższego filmu na YouTube lub z postu na blogu [Why AMP Caches Exist](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Obejrzyj ten film, aby dowiedzieć się, dlaczego istnieją serwery buforujące AMP.']

## Jakie serwery buforujące AMP są dostępne?

Obecnie jest dwóch dostawców usługi buforowania AMP:

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP jest otwartym ekosystemem, a AMP Project aktywnie zachęca do tworzenia większej liczby serwerów buforujących AMP. Więcej informacji na temat tworzenia serwerów buforujących AMP zawierają [Wytyczne usługi buforowania AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Jak wybrać serwer buforujący AMP?

Jako wydawca nie wybierasz serwera buforującego AMP, _w istocie to platforma_ łącząca się z zawartością wybiera serwer buforujący AMP (jeśli istnieje) do użycia.

Jest to odwrócenie typowego modelu, w którym dostarczanie treści leży w gestii wydawcy. Model ten pozwala jednak platformom na zapewnienie swoim użytkownikom przewidywalnej wydajności pod obciążeniem oraz, między innymi, na zapewnienie wymaganych niezmiennych funkcji zabezpieczeń i prywatności w fazzie wstępnego renderowania AMP. Więcej informacji na temat ścisłych wytycznych dotyczących tworzenia serwerów buforujących AMP zawierają [Wytyczne usługi buforowania AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Czy można zrezygnować z buforowania?

Buforowanie jest podstawową częścią ekosystemu AMP. Opublikowanie prawidłowego dokumentu AMP automatycznie włącza dostarczenie go do serwera buforującego.

Jeśli nie chcesz, aby Twój dokument został zbuforowany, jedną z opcji jest usunięcie atrybutu `amp` ze znacznika HTML. Sprawi to, że dokument będzie technicznie nieprawidłowym dokumentem AMP, a jednocześnie nie wpłynie to na jego funkcjonalność.

## Kto żąda buforowanych stron AMP?

Dostęp do buforowanych stron AMP mają platformy (takie jak wyszukiwarka Google, Wiadomości Google i Bing) oraz aplikacje mobilne. Aplikacje mobilne mogą łączyć się z buforowaną zawartością AMP poprzez adres URL (patrz [interfejs AMP URL API Google](https://developers.google.com/amp/cache/use-amp-url)) lub żądanie XHR różnych źródeł w aplikacjach PWA (więcej informacji znajdziesz w artykule [Osadzanie i używanie AMP jako źródła danych](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## W jaki sposób jest buforowana moja strona AMP?

Używając formatu AMP, udostępniasz swoją zawartość do buforowania serwerom buforującym AMP. Strona AMP może zostać zbuforowana na serwerze buforującym AMP na kilka sposobów:

- **Odnalezienie przez platformę**: platformy odnajdują zawartość AMP za pomocą znacznika `<html ⚡>` albo `<html amp>` i buforują ją. Na przykład wyszukiwarka Google indeksuje zawartość; w przypadku wszystkich zidentyfikowanych prawidłowych stron AMP zawartość ta jest dodawana do usługi Google AMP Cache.

- **Żądanie buforowania adresu URL**: platformy mogą w szczególności żądać strony AMP, używając formatu adresu URL serwera buforującego AMP. Serwer buforujący AMP działa jako odwrotny serwer proxy, w związku z czym, gdy platforma uzyskuje dostęp do strony, skutkuje to automatycznym jej zbuforowaniem.

  - Przykład adresu URL usługi Google AMP Cache: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **UWAGA —** adres URL serwera bufoirujacego AMP nie jest adresem URL zwracanym użytkownikowi, użytkownicy zazwyczaj nie żądają treści za pomocą tych adresów URL. [/tip]

- **Dodanie przez wydawcę**: wydawcy mogą dodać stronę AMP do usługi buforowania AMP. Opcja ta ma zastosowanie tylko do usługi buforowania Google AMP Cache (zobacz patrz artykuł [Usługa Google AMP Cache: aktualizowanie zawartości AMP](https://developers.google.com/amp/cache/update-cache)).

## Dodatkowe zasoby

- [Wytyczne AMP Project dotyczące usługi buforowania AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)
- [Omówienie usługi Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Dokumentacja usługi Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
