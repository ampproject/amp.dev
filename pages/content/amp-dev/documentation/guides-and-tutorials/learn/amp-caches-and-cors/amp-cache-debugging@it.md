---
"$title": Eseguire il debug dei problemi della cache AMP
order: '8'
formats:
- websites
- stories
- ads
teaser:
  text: Perché il mio documento su una cache AMP è danneggiato?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Perché il mio documento su una cache AMP è danneggiato? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

I documenti AMP validi in genere appaiono e si comportano nello stesso modo sia quando sono letti da una cache AMP che nella loro origine. Tuttavia, alcuni componenti e configurazioni del server possono dare problemi.

Se un particolare documento appare e si comporta come previsto sulla sua origine, ma non quando viene visualizzato tramite la cache ([come mappare gli URL di origine alla cache AMP Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), provare la seguente procedura:

1. Aprire la console del browser sugli strumenti per sviluppatori o sugli errori del browser e risolvere eventuali errori o avvisi visualizzati.
2. Eseguire il documento tramite [AMPBench](https://ampbench.appspot.com/) e risolvere eventuali errori o avvisi imprevisti.

Se il problema persiste dopo aver seguito tale procedura, controllare la tabella seguente.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Effetto</th>
      <th width="30%">Problema</th>
      <th width="40%">Soluzione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>I caratteri web non vengono visualizzati (sono utilizzati i caratteri di fallback)</td>
      <td>La cache AMP non è inserita nella lista dei caratteri consentiti dal fornitore.</td>
      <td>Contattare il fornitore dei caratteri chiedendogli di inserire nell'elenco dei consentiti <a href="https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests#cors-security-in-amp">tutte le cache</a>.</td>
    </tr>
    <tr>
      <td>Le risorse (quali caratteri e immagini) non vengono visualizzate (<strong>solo origini HTTP</strong>)</td>
      <td>Il documento utilizza URL relativi per il protocollo.</td>
      <td>Passare agli URL assoluti (ovvero, <code>http://www.site.com/doc/amp</code>, non <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Le risorse (ad esempio, caratteri e immagini) non sono visualizzate</td>
      <td>Le risorse sono fornite con il tipo MIME errato.</td>
      <td>Indicare un <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">tipo MIME accettabile</a>.</td>
    </tr>
    <tr>
      <td>La cache AMP non può accedere alle risorse.</td>
      <td>Verificare che la cache AMP possa accedere alle risorse e che non sia bloccata da un indirizzo IP o da un agente utente e simili (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Elenco degli agenti utente utilizzati dal crawler di Google</a>).</td>
    </tr>
    <tr>
      <td>Gli elementi dinamici quali <code><amp-form></amp-form></code> e <code><amp-list></amp-list></code>, non si comportano come previsto.</td>
      <td>Intestazioni CORS danneggiate o mancanti.</td>
      <td>Questi componenti effettuano richieste multi-origine dalla cache AMP all'origine del documento. Per impostazione predefinita, i browser bloccano queste richieste. Per consentire queste richieste, realizzare <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">intestazioni CORS</a> che inseriscono negli elenchi dei consentiti <a href="https://amp.dev/documentation/guides-and-tutorials/amp-cors-requests.html">tutte le cache</a>.</td>
    </tr>
    <tr>
      <td>I contenuti forniti devono essere rimossi a causa di un avviso di rimozione legale.</td>
      <td>La cache AMP non ha ancora ricevuto l'avviso di rimozione.</td>
      <td>Seguire le linee guida per aggiornare il contenuto di ogni cache AMP. Per la cache AMP Google, consultare <a href="https://developers.google.com/amp/cache/update-cache">Aggiornamento di contenuti AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>
