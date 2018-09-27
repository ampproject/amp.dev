---
$title: Aggiunta di un’immagine
---

La maggior parte dei tag HTML può essere utilizzata direttamente in HTML AMP, tuttavia alcuni tag, come `<img>`, vengono sostituiti con tag HTML AMP personalizzati equivalenti o leggermente ottimizzati (inoltre alcuni tag problematici sono stati del tutto esclusi, vedi [Tag HTML nelle specifiche]({{g.doc('/content/docs/fundamentals/spec.md', locale=doc.locale).url.path}})).

Per illustrare il possibile aspetto del markup supplementare, ecco il codice necessario per incorporare un’immagine nella pagina:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Per capire perché stiamo sostituendo tag come `<img>` con `<amp-img>` e quanti di essi sono disponibili, vai alla sezione [Includere Iframe ed elementi multimediali](/it/docs/media/amp_replacements.html).

<div class="prev-next-buttons">
  <a class="button prev-button" href="/it/docs/getting_started/create/basic_markup.html"><span class="arrow-prev">Precedente</span></a>
  <a class="button next-button" href="/it/docs/getting_started/create/presentation_layout.html"><span class="arrow-next">Prossimo</span></a>
</div>

