---
$title: Aggiunta di un’immagine
---

La maggior parte dei tag HTML può essere utilizzata direttamente in HTML AMP, tuttavia alcuni tag, come `<img>`, vengono sostituiti con tag HTML AMP personalizzati equivalenti o leggermente ottimizzati (inoltre alcuni tag problematici sono stati del tutto esclusi, vedi [Tag HTML nelle specifiche](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Per illustrare il possibile aspetto del markup supplementare, ecco il codice necessario per incorporare un’immagine nella pagina:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Per capire perché stiamo sostituendo tag come `<img>` con [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) e quanti di essi sono disponibili, vai alla sezione [Includere Iframe ed elementi multimediali](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md).
