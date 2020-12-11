---
$title: Reklama w relacjach internetowych
description: Relacje internetowe to interaktywne pełnoekranowe materiały, angażujące czytelników w treść. Reklama przy użyciu relacji AMP pozwala na bezproblemową i niezakłóconą...
---

Relacje internetowe to interaktywne pełnoekranowe materiały, angażujące czytelników w treść. Reklama przy użyciu relacji AMP pozwala na bezproblemową i niezakłóconą integrację ze sposobem przeglądania witryn przez użytkownika, dzięki czemu użytkownik pozostaje zaangażowany i zachwycony platformą.

##Rozmieszczenie reklam
W odróżnieniu od stron internetowych AMP, na których ilość i umiejscowienie reklam projektuje się przez umieszczenie wielu składników [`amp-ad`](../../../documentation/components/reference/amp-ad.md), w przypadku relacji internetowych wystarczy jeden składnik [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md), aby zadecydować o ilości i rozmieszczeniu reklam.

Rozszerzenie [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) jest otoką składnika [`amp-ad`](../../../documentation/components/reference/amp-ad.md), dynamicznie wstawiającą jedną lub kilka reklam, gdy użytkownik konsumuje treść relacji. Aby zapewnić użytkownikowi najlepsze wrażenia:

1. Reklamy są wstępnie renderowane do czasu wykonania relacji internetowych, a następnie wstawiane. Gwarantuje to, że użytkownicy nigdy nie zostaną wyświetlone puste lub niezaładowane reklamy.

2. Gęstość reklam jest optymalizowana w stosunku do treści, aby zapobiec przesyceniu. Rozszerzenie [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) decyduje, kiedy i gdzie wstawiać reklamy w miarę postępów użytkownika.

Środowisko uruchomieniowe AMP generuje wywołanie reklamy tak wcześnie, jak to możliwe i czasami umieszcza pierwszą po dwóch pierwszych stronach, a nigdy jako ostatnią stronę.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img>
</amp-anim>

[tip type="note"] **UWAGA —** dłuższa relacja AMP stwarza więcej możliwości zamieszczania reklam. Dokładne umiejscowienie algorytmu reklamy będzie z czasem nadal optymalizowane. [/tip]

##Interakcja z użytkownikiem
Użytkownicy mogą przechodzić między reklamami w taki sam sposób, jak w przypadku zwykłych stron relacji, dotykając dwóch trzecich ekranu po prawej stronie.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Obraz pokazujący obszar, który użytkownicy mogą dotknąć, aby pominąć reklamę', caption='Użytkownicy mogą przechodzić między reklamami, dotykając dwóch trzecich ekranu po prawej stronie.', align='' ) }}

Użytkownicy mogą wchodzić w bezpośrednią interakcję z reklamą, dotykając wyrenderowanego przez system przycisku [wezwania do działania](story_ads_best_practices.md#call-to-action-button-text-enum), wyświetlanego w dolnej jednej trzeciej wszystkich reklam w relacjach AMP. Dotknięcie przycisku może wysłać użytkownika do jednej z następujących lokalizacji, skonfigurowanych przez twórcę reklamy:

- Strony internetowej AMP
- Strony internetowej bez AMP
- Sklepu App Store lub Google Play
- [Relacji sponsorowanej](story_ads_best_practices.md#sponsored-story)

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Obrazek pokazujący, że użytkownicy są przekierowywani do miejsca docelowego reklamy, ale mogą wrócić do relacji..', caption='Użytkownicy są przekierowywani do miejsca docelowego reklamy, ale mogą wrócić do relacji.', align='' ) }}

##Konfigurowanie

Relacje internetowe nie mogą obsługiwać składnika [`amp-ad`](../../../documentation/components/reference/amp-ad.md) bezpośrednio na stronie. Zamiast tego, wszystkie reklamy są pobierane i wyświetlane przez rozszerzenie [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). Składnik [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) musi zostać umieszczony jako bezpośredni element podrzędny składnika [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html] <amp-story> <amp-story-auto-ads> <script data-md-type="raw_html" type="application/json"><br>{<br>&quot;ad-attributes&quot;: {<br>// ad server configuration<br>}<br>}<br></script> </amp-story-auto-ads> <amp-story-page> ... </amp-story-page></amp-story> [/sourcecode]

W przeciwieństwie do zwykłego składnika [`amp-ad`](../../../documentation/components/reference/amp-ad.md), nie jest wymagany żaden element `<fallback>` ani `<placeholder>`, ponieważ reklamy w formacie AMP Story będą wyświetlane dopiero po wyrenderowaniu w całości.

##Integracja obsługi serwera reklam

Najprostszym sposobem dodania reklam do relacji AMP jest serwowanie reklam z obsługiwanego serwera reklamowego.

Serwery reklam, które obecnie obsługują reklamy w formacie AMP Story:

- [Google Ad Manager (wcześniej DoubleClick)](advertise_amp_stories.md#google-ad-manager)

Jeśli prowadzisz serwer reklam i chcesz serwować reklamy fabularne, skontaktuj się z nami, zgłaszając [problem w GitHub](https://github.com/ampproject/amphtml/issues/new). Zespół AMP chętnie się z Tobą skontaktuje!

Wydawcy mogą również umieszczać reklamy niestandardowe, jeśli skonfigurują własny serwer reklam. [Proces ten szczegółowo opisano tutaj](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

## Google Ad Manager <a name="google-ad-manager"></a>

Informacje o serwerze reklam są oznaczone w składniku [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) na początku relacji AMP.

Obiekt konfiguracji JSON należy określić w składniku [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md), określającym sposób pobierania i wyświetlania reklam. Poniższe pola są wymagane do obsługi i wyświetlania reklam na platformie Google Ad Manager:

- Jako `"type"` należy podać `"doubleclick"`
- Element `"data-slot"` musi być dopasowany do jednostki reklamy

[sourcecode:html] {amp-story0} {amp-story-auto-ads1} <script data-md-type="raw_html" type="application/json">
{
&amp;quot;ad-attributes&amp;quot;: {
&amp;quot;type&amp;quot;: &amp;quot;doubleclick&amp;quot;,
&amp;quot;data-slot&amp;quot;: &amp;quot;/30497360/a4a/amp_story_dfp_example&amp;quot;
}
}
</script> {/amp-story-auto-ads1} {amp-story-page3} ... {/amp-story-page3}{/amp-story0} [/sourcecode]

Te kluczowe pary wartości są kopiowane do elementu [`amp-ad`](../../../documentation/components/reference/amp-ad.md) wygenerowanego dla relacji. Zamiast kolumny `additional_data` można dodać dodatkowe informacje potrzebne do elementu, takie jak `targeting`.

[sourcecode:html] {amp-story0} {amp-story-auto-ads1} <script data-md-type="raw_html" type="application/json">
{
&amp;quot;ad-attributes&amp;quot;: {
&amp;quot;type&amp;quot;: &amp;quot;doubleclick&amp;quot;,
&amp;quot;data-slot&amp;quot;: &amp;quot;/30497360/a4a/amp_story_dfp_example&amp;quot;,
&amp;quot;additional_data&amp;quot;: &amp;quot;additional_data_information&amp;quot;
}
}
</script> {/amp-story-auto-ads1} {amp-story-page3} ... {/amp-story-page3}{/amp-story0} [/sourcecode]

[tip type="note"] W celu uzyskania informacji o przesyłaniu reklam do Google Ad Manager przeczytaj artykuł [Kreacje niestandardowe w relacjach internetowych](https://support.google.com/admanager/answer/9038178) i sprawdź nasz przewodnik [Najlepsze metody tworzenia reklam w formacie AMP Story](story_ads_best_practices.md).[/tip]
