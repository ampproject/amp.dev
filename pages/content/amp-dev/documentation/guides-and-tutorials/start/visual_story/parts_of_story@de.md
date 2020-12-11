---
"$title": Die Bestandteile einer AMP Story
"$order": '2'
description: Eine Web Story ist visuelles Storytelling im Vollbildmodus, bei dem Informationen zusammen mit Bildern, Videos, Grafiken, Ton und mehr vermittelt werden. Web Storys sind ideal für Benutzer …
author: bpaduch
---

Eine Web Story ist visuelles Storytelling im Vollbildmodus, bei dem Informationen zusammen mit Bildern, Videos, Grafiken, Ton und mehr vermittelt werden. Web Storys sind ideal für Benutzer, die optisch ansprechenden Content als kleine Häppchen konsumieren möchten.

Die Grundzutaten einer Web Story sind einzelne **Seiten**. Diese Seiten bestehen wiederum aus einzelnen **Ebenen**, die einfache HTML und AMP **Elemente** enthalten.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Jeder dieser Bestandteile wird in AMP Komponenten übersetzt, wobei [`amp-story`](../../../../documentation/components/reference/amp-story.md) die Story repräsentiert, `amp-story-page` die Seite und `amp-story-grid-layer` die Ebenen.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Beginnen wir nun mit der Erstellung unserer Web Story und verwenden dazu den Container [`amp-story`](../../../../documentation/components/reference/amp-story.md).
