---
"$title": Opis części relacji AMP
"$order": '2'
description: Relacja internetowa to pełnoekranowy storytelling wizualny, przekazujące informacje za pomocą obrazów, filmów, grafiki, dźwięku i innych elementów. Jest to idealne rozwiązanie dla użytkowników...
author: bpaduch
---

Relacja internetowa to pełnoekranowy storytelling wizualny, przekazujące informacje za pomocą obrazów, filmów, grafiki, dźwięku i innych elementów. Jest to idealne rozwiązanie dla użytkowników chcących serwować małe, lecz bogate wizualnie kąski treści.

Podstawowymi składnikami relacji internetowych są pojedyncze **strony**. Strony te z kolei składają się z pojedynczych **warstw**, zawierających podstawowe **elementy** HTML i AMP.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Każdy z tych składników jest tłumaczony na składniki AMP: relację reprezentuje składnik [`amp-story`](../../../../documentation/components/reference/amp-story.md), stronę reprezentuje składnik `amp-story-page`, a warstwy reprezentuje składnik `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Zacznijmy tworzyć naszą relację internetową od kontenera [`amp-story`](../../../../documentation/components/reference/amp-story.md).
