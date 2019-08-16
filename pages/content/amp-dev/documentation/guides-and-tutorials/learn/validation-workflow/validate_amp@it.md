---
$title: Convalidare le pagine AMP
---

Il punto di forza di AMP non sta semplicemente nel fatto che velocizza le pagine, ma che le velocizza in modo tale da poter essere *convalidate*. In questo modo, terze parti quali Twitter, Instagram o la Ricerca Google possono scegliere di pubblicare le pagine AMP per gli utenti in modi sempre più interessanti.

## Come faccio a verificare se la mia è una pagina AMP valida?

Per convalidare un documento AMP esistono diversi modi che consentono di ottenere lo stesso risultato, quindi puoi utilizzare il metodo più adatto al tuo stile di sviluppo.

Oltre alla validità delle tue pagine AMP, potresti voler verificare che il tuo documento AMP sia [rilevabile](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) per le piattaforme di terze parti.

### Console per sviluppatori del browser

Nello strumento di convalida AMP è integrata la libreria JS AMP, che è quindi subito disponibile in ogni pagina AMP. Per eseguire la convalida, procedi nel seguente modo:

  * Apri la pagina AMP nel browser.
  * Aggiungi "`#development=1`" all'URL, ad esempio `http://localhost:8000/released.amp.html#development=1`.
  * Apri la [console Strumenti per sviluppatori di Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e controlla se ci sono errori di convalida.

Gli errori della Console per sviluppatori saranno simili al seguente:

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Screenshot degli errori di convalida AMP nella console per sviluppatori di Chrome" layout="responsive"></amp-img>

### Interfaccia web

Lo strumento di convalida AMP può essere utilizzato come un'interfaccia web all'indirizzo [validator.ampproject.org](https://validator.ampproject.org/). In questa interfaccia gli errori vengono mostrati all'interno del codice sorgente HTML della pagina.
L'interfaccia è un editor interattivo: le modifiche apportate al codice sorgente HTML comportano una riconvalida interattiva.

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="Screenshot di validator.ampproject.org con esempi di errori." layout="responsive"></amp-img>

### Estensione del browser

È possibile accedere allo strumento di convalida AMP direttamente dalla barra degli strumenti del browser utilizzando un'estensione del browser. Durante la navigazione, l'estensione convalida automaticamente ogni pagina AMP visitata e ti dà un'indicazione visiva della validità della pagina mostrando un'icona colorata.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="Icona AMP rossa che indica un documento AMP non valido."></amp-img>

    </td>
    <td>Quando vengono riscontrati errori all'interno di una pagina AMP, l'icona dell'estensione viene visualizzata in rosso e viene indicato il numero di errori riscontrati.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="Icona AMP verde che indica un documento AMP valido."></amp-img>

    </td>
    <td>Quando non vengono riscontrati errori all'interno di una pagina AMP, l'icona viene visualizzata in verde e viene indicato il numero di avvisi, se presenti.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="Icona AMP blu che indica l&#39;esistenza di una variante HTML AMP, accessibile facendo clic."></amp-img>

    </td>
    <td>Se la pagina non è in formato AMP, ma viene indicato che è disponibile una versione AMP, l'icona diventa un'icona di collegamento blu. Se si fa clic sull'estensione, il browser viene reindirizzato alla versione AMP.
    </td>
  </tr>
</table>

Estensione dello strumento di convalida AMP per [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) e [Opera](https://addons.opera.com/it/extensions/details/amp-validator/?display=en).

### Strumento della riga di comando

Come prerequisito potresti dover installare <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js con il relativo strumento di gestione dei pacchetti `npm` nel tuo sistema</a>.

Digita `npm install -g amphtml-validator` per installare lo [strumento della riga di comando per lo strumento di convalida HTML AMP](https://www.npmjs.com/package/amphtml-validator).

Ora convalidiamo una pagina HTML AMP esistente.

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Come prevedibile, questa è una pagina HTML AMP valida. Ora proviamo con una pagina non valida: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Per eseguire il comando `amphtml-validator` puoi indicare l'URL della pagina o un nome di file locale. Scarica e salva [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) in un file, dopodiché esegui il comando seguente:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

Il formato dei messaggi di errore è: nome del file, riga, colonna e messaggio, spesso seguito da un link che rimanda al riferimento HTML AMP. Alcuni editor, incluso Emacs (cerca il comando compile e la modalità di compilazione), sono in grado di interpretare questo formato e ti permettono di passare agli errori nel file originale.

Prova a iniziare a creare la tua pagina AMP utilizzando [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html):

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

Lo strumento della riga di comando offre funzioni aggiuntive, tra cui la disattivazione del colore, la stampa di output JSON o l'esecuzione di una versione specifica del codice JavaScript dello strumento di convalida (per impostazione predefinita viene eseguito l'ultimo script pubblicato).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## Cosa succede se la mia pagina non è valida?

Lo strumento di convalida AMP non è pratico soltanto durante lo sviluppo, ma viene utilizzato anche dalle piattaforme come Twitter o Google che integrano le tue pagine AMP nei propri contenuti e risultati di ricerca. Inoltre, queste piattaforme in genere non richiedono le pagine direttamente al tuo server, ma utilizzano la cache AMP di Google, un servizio gratuito di memorizzazione nella cache delle pagine che vengono messe a disposizione di tutti e vengono caricate ancora più velocemente.

Se il servizio di convalida AMP rileva qualche problema con la tua pagina, questa non verrà rilevata e distribuita dai siti web di terze parti e non verrà visualizzata nella cache AMP di Google. Quindi non soltanto non usufruiresti dei vantaggi della velocità della cache, ma è probabile che la tua pagina non venga vista in molte posizioni. Sarebbe proprio un peccato, quindi assicuriamoci che non succeda.

## Come faccio a correggere gli errori di convalida?

La maggior parte degli errori di convalida è facile da correggere. Prova a utilizzare il seguente tag HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Questo genera il seguente errore di convalida AMP, mostrato nei vari strumenti che seguono:

 * Console per sviluppatori del browser
<amp-img alt="Errore AMP: Il tag &quot;img&quot; può comparire solo come discendente del tag &quot;noscript&quot;. Forse intendevi &quot;amp-img&quot;? riga 11, colonna 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

 * Interfaccia web
<amp-img alt="Errore AMP: Il tag &quot;img&quot; può comparire solo come discendente del tag &quot;noscript&quot;. Forse intendevi &quot;amp-img&quot;? riga 11, colonna 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

 * Estensione del browser
<amp-img alt="Errore AMP: Il tag &quot;img&quot; può comparire solo come discendente del tag &quot;noscript&quot;. Forse intendevi &quot;amp-img&quot;? riga 11, colonna 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

Ogni strumento fornisce diverse informazioni:

  * La posizione (riga e colonna) nel documento HTML in cui si è verificato l'errore, selezionabile in alcune interfacce per evidenziare tale posizione. In questo esempio il problema si è verificato nella riga 11, colonna 2.
  * Una riga di testo che descrive l'errore. In questo esempio il testo indica che abbiamo utilizzato un tag `<img>`, ma che invece avremmo dovuto utilizzare un tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
  * Un link che rimanda a un documento pertinente relativo all'errore; in questo esempio la documentazione relativa al tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). Non vengono generati link alla documentazione per tutti gli errori.

Rileggendo con attenzione la specifica, ci siamo accorti di avere utilizzato un tag `<img>`, quando invece avremmo dovuto utilizzare un tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Per comprendere meglio l'elenco completo di potenziali errori, leggi la [guida agli errori di convalida AMP](validation_errors.md).
Se dopo un'attenta valutazione hai ancora difficoltà, [pubblica una domanda](http://stackoverflow.com/questions/tagged/amp-html) e cercheremo di aiutarti.
