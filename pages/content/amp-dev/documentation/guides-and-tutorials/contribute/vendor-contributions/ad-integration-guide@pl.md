---
'$title': Zintegruj swoje technologie reklamowe z AMP
$order: 3
formats:
  - ads
teaser:
  text: Jeśli jesteś dostawcą technologii reklamowych i chcesz zintegrować je z AMP HTML, zapoznaj się z poniższymi wytycznymi.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Jeśli jesteś dostawcą technologii reklamowych i chcesz zintegrować je z AMP HTML, zapoznaj się z poniższymi wytycznymi. Aby zapewnić minimalne opóźnienia i wysoką jakość, przed przesłaniem żądania ściągnięcia do projektu open-source AMP wykonaj instrukcje podane [tutaj](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads). Ogólne wskazówki na temat wnoszenia wkładu do AMP zawiera strona [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/ads/../docs/contributing.md).

## Serwer reklam <a name="ad-server"></a>

_Przykłady: DFP, A9_

Wydawcy, których obsługujesz jako serwer reklam dodają dostarczoną przez Ciebie bibliotekę JavaScript i umieszczają różne opate na bibliotece JavaScript „fragmenty kodu reklam” w celu pobierania reklam i renderowania ich na stronie internetowej wydawcy.

Jako że AMP nie zezwala wydawcom na wykonywanie dowolnego kodu JavaScript, należy dodać własny wkład do otwartego kodu AMP, aby umożliwić tagowi `amp-ad` żądanie reklam z Twojego serwera reklam.

Przykład: serwer Amazon A9 można wywołać przy użyciu następującej składni:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Zauważ, że każdy z atrybutów następujących po właściwości `type` jest zależny od parametrów, których oczekuje serwer Amazon A9 w celu dostarczenia reklamy. Plik [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) pokazuje jak są mapowane parametry w celu wykonania wywołania skryptu JavaScript, który wywołuje serwer A9 poprzez adres URL `https://c.amazon-adsystem.com/aax2/assoc.js`. W celu zwrócenia reklamy do adresu URL są dołączane odpowiednie parametry przekazywane przez znacznik reklamy AMP.

Szczegółowe informacje na temat integrowania sieci reklamowej z AMP znajdziesz w artykule [Integrowanie sieci reklamowych z AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## System Supply Side Platform (SSP) lub Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Przykłady: Rubicon, Criteo, AppNexus, Ad-Exchange_

Jeśli prowadzisz platformę sprzedaży, która ma być wywoływana bezpośrednio ze strony internetowej wydawcy, musisz postępować zgodnie z tymi samymi powyższymi wskazówkami integracji, dotyczącymi serwera reklam. Dodanie własnej wartości `type` do znacznika amp-ad pozwala na przesłanie Twojego znacznika bezpośrednio do wydawcy, dzięki czemu może on wstawić ten znacznik bezpośrednio do swoich stron AMP.

System SSP coraz częściej współpracuje z wydawcami w celu przesyłania znaczników reklam SSP do ich serwerów reklam. W tym przypadku upewnij się, że wszystkie zasoby ładowane przez Twój skrypt w kreacji na serwerze reklam są wykonywane za pomocą protokołu HTTPS. Niektórych formatów reklam, takich jak reklamy rozszerzalne, dotyczą pewne ograniczenia, dlatego zalecamy przetestowanie najczęściej dostarczanych formatów kreacji u wydawców.

## Agencja reklamowa <a name="ad-agency"></a>

_Przykłady: Essence, Omnicom_

Współpracuj z wydawcą, aby upewnić się, że tworzone przez Ciebie kreacje są zgodne z AMP. Wszystkie kreacje są serwowane do ramek iframe, których rozmiar jest określany w chwili wywołania reklamy, upewnij się więc, że Twoja kreacja nie próbuje modyfikować rozmiaru ramki iframe.

Upewnij się, że wszystkie zasoby będące częścią kreacji są żądane za pomocą protokołu HTTPS. Niektóre formaty reklam nie są obecnie w pełni obsługiwane i zalecamy testowanie kreacji w środowisku AMP. Niektóre przykłady to: reklamy rozszerzalne rich media, interstitial, page-level.

## Odtwarzacz wideo <a name="video-player"></a>

_Przykłady: Brightcove, Ooyala_

Odtwarzacz wideo, który działa na zwykłych stronach HTML, nie będzie działać w AMP, dlatego też należy utworzyć specjalny znacznik, który pozwoli środowisku uruchomieniowemu AMP na załadowanie odtwarzacza. Firma Brightcove stworzyła niestandardowy znacznik [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md), umożliwiający odtwarzanie multimediów i reklam na stronach AMP.

Odtwarzacz Brightcove można wywołać w następujący sposób:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Instrukcje dotyczące opracowania znacznika AMP takiego jak znacznik Brightcove znajdują się w [tym żądaniu ściągnięcia ](https://github.com/ampproject/amphtml/pull/1052).

## Sieć reklam wideo <a name="video-ad-network"></a>

_Przykłady: Tremor, Brightroll_

Jeśli prowadzisz sieć reklam wideo, we współpracy z wydawcą musisz upewnić się, że:

- Wszystkie zasoby wideo są obsługiwane za pomocą protokołu HTTPS
- Odtwarzacz wideo wydawcy obsługuje AMP

## Data Management Platform (DMP) <a name="data-management-platform-dmp"></a>

_Przykłady: KRUX, Bluekai_

Zobacz [jak poprawić niestandardową konfigurację reklam](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Podobne podejście można zastosować w celu wzbogacenia wywołania reklamy poprzez przekazanie segmentów grupy docelowej otrzymanych z pliku cookie użytkownika do wywołania reklamy.

## Dostawca widoczności <a name="viewability-provider"></a>

_Przykłady: MOAT, Integral Ad Science_

Dostawcy widoczności integrują się zazwyczaj z wydawcami za pomocą otok kreacji serwera reklam. W takim przypadku należy upewnić się, że otoka kreacji ładuje wszystkie zasoby za pomocą protokołu HTTPS.

W przypadku np. MOAT adres `http://js.moatads.com` musi być zmieniany na `https://z.moatads.com`

Sprawdź też podejście polegające na stosowaniu [wzorca IntersectionObserver](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## Platforma rekomendacji treści <a name="content-recommendation-platform"></a>

_Przykłady: Taboola, Outbrain_

Przydatne, jeśli musisz dzisiaj osadzić jakiś kod JavaScript w witrynie internetowej wydawcy, ale podejście to nie będzie działać na stronach AMP. Aby polecać treść na stronie AMP, sugerujemy użycie rozszerzenia [`amp-embed`](https://amp.dev/documentation/components/amp-ad) do żądania szczegółów treści. Sprawdź przykład [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
