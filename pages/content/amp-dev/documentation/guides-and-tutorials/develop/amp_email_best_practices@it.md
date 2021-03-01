---
'$title': Procedure consigliate per le e-mail AMP
$order: 1
'$category': Develop
formats:
  - email
---

Il sistema AMP consente l'impiego di nuovi tipi di contenuti coinvolgenti e interessanti nelle e-mail! Durante la progettazione di e-mail, può essere utile tenere presente le seguenti procedure consigliate per garantire le massime prestazioni e affidabilità di tali contenuti su tutte le piattaforme e il loro funzionamento secondo le aspettative degli utenti.

#Velocità

Quando si utilizza il componente [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) per prelevare dinamicamente i contenuti, occorre includere un segnaposto per mantenere l'integrità della struttura dei componenti. Il layout del segnaposto dovrebbe essere quanto più simile possibile a quello del documento dopo la ricezione dei dati richiesti. Ciò garantisce che le dimensioni del messaggio non cambino e non alterino significativamente il layout.

#Usabilità e accessibilità

- Quando si utilizza il componente [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), assicurarsi che l'attributo `controls` sia stato impostato. Ciò consente agli utenti di dispositivi touchscreen quali gli smartphone di navigare in una sequenza.
- Quando si utilizza il componente [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), occorre considerare che non tutti i tipi di input sono supportati su iOS. Per ulteriori informazioni, consultare la pagina [Valori di input supportati](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) nella Guida HTML di Safari.
- Non tutti i [valori degli attributi `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) sono supportati su tutte le app e i browser. Per questo conviene sempre assumere che il completamento automatico non sia disponibile per i propri utenti, impiegando moduli brevi.

#Stili

- Assicurarsi che le e-mail utilizzino solo [CSS supportati da AMP per e-mail](../learn/email-spec/amp-email-css.md?format=email)
- Evitare ogni uso di unità viewport (`vw`, `vh`, `vmin` e `vmax`) nei codici CSS e HTML. Poiché le e-mail AMP vengono visualizzate all'interno di un iframe, il riquadro di visualizzazione dell'e-mail non corrisponde a quello del browser.
- Ciascun tipo di browser ha i propri stili CSS predefiniti. Utilizzare una libreria CSS che normalizzi gli stili, se necessario. Per ulteriori informazioni sugli stili predefiniti, sulla normalizzazione degli stili e un elenco di librerie disponibili, consultare la pagina [Riavvio, Ripristini e Logica](https://css-tricks.com/reboot-resets-reasoning/).
- Prestare attenzione alla fuoriuscita dai margini nei codici CSS: potrebbero non essere riprodotti a causa di [una limitazione del layout AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Dispositivi mobili

Verificare che il messaggio abbia una buona visualizzazione sugli schermi di tutte le dimensioni utilizzando le [CSS media query](style_and_layout/control_layout.md?format=email) per identificare i dispositivi in uso. I messaggi devono essere testati su dispositivi mobili per assicurarsi che il layout sia corretto e che i componenti funzionino come previsto.

#Altri suggerimenti

Utilizzando AMP per la realizzazione di e-mail, può essere utile tenere presenti i seguenti suggerimenti e trucchi:

- Il playground di AMP per e-mail non fa uso di proxy XHR, ma alcuni servizi di posta elettronica li impiegano.
- La parte MIME AMP dovrebbe apparire prima della parte MIME HTML nella e-mail per garantire la massima compatibilità tra i client e-mail.
- L'attributo `src` di [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), quello [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) di [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) e quello `src` per [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) o l'attributo href di un tag `<a>` non possono essere modificati da [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- I messaggi dovrebbero includere una versione HTML statica nel caso in cui un utente venga portato alla versione HTML del messaggio o se l'utente inoltra il messaggio.
