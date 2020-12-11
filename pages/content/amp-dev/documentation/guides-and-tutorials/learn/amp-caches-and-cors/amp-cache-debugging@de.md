---
"$title": Probleme mit dem AMP Cache lösen
order: '8'
formats:
- websites
- stories
- ads
teaser:
  text: Warum verhält sich mein Dokument in einem AMP Cache falsch?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Warum verhält sich mein Dokument in einem AMP Cache falsch? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Gültige AMP Dokumente unterscheiden sich in ihrer Darstellung und ihrem Verhalten in AMP Caches in der Regel nicht von der Quelle. Es gibt jedoch einige Komponenten und Serverkonfigurationen, die problematisch sein können.

Wenn ein bestimmtes Dokument in der Quelle erwartungsgemäß dargestellt wird und sich ebenso verhält, dies im Cache aber nicht der Fall ist ( [Zuordnung der Quell-URLs zum Google AMP Cache](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), versuche Folgendes:

1. Öffne die Entwickler-/Fehlerkonsole deines Browsers und behebe alle angezeigten Fehler und Warnungen.
2. Lass dein Dokument durch [AMPBench](https://ampbench.appspot.com/) laufen und behebe alle unerwarteten Fehler und Warnungen.

Sollte das Problem nach diesen Schritten weiterhin bestehen, sieh dir die nachstehende Tabelle an.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Symptom</th>
      <th width="30%">Problem</th>
      <th width="40%">Lösung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Webschriftarten werden nicht angezeigt (stattdessen werden Fallback Schriftarten verwendet).</td>
      <td>Der AMP Cache wurde vom Schriftartenanbieter nicht in die Liste zulässiger Caches aufgenommen.</td>
      <td>Wende dich an den Schriftartenanbieter und bitte ihn, <a href="https://amp.dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests#cors-security-in-amp">alle Caches</a> zuzulassen.</td>
    </tr>
    <tr>
      <td>Assets (z. B. Schriftarten und Bilder) werden nicht angezeigt (<strong>nur HTTP Quellen</strong>).</td>
      <td>Das Dokument verwendet protokollbezogene URLs.</td>
      <td>Wechsle zu absoluten URLs (verwende also <code>http://www.site.com/doc/amp</code>, nicht <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Assets (z. B. Schriftarten und Bilder) werden nicht angezeigt.</td>
      <td>Die Assets werden mit dem falschen MIME Typ bereitgestellt.</td>
      <td>Gib einen <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">zulässigen MIME Typ</a> an.</td>
    </tr>
    <tr>
      <td>Der AMP Cache kann nicht auf die Assets zugreifen.</td>
      <td>Stelle sicher, dass der AMP Cache auf deine Assets zugreifen kann und nicht durch eine IP Adresse, einen User Agent usw. blockiert wird (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Liste der vom Google Crawler verwendeten User Agents</a>).</td>
    </tr>
    <tr>
      <td>Dynamische Elemente wie <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code> verhalten sich nicht wie erwartet.</td>
      <td>Defekte oder fehlende CORS Header.</td>
      <td>Diese Komponenten senden Cross-Origin Anfragen vom AMP Cache an deine Quelle. Standardmäßig blockieren Browser solche Anfragen. Um diese Anfragen zuzulassen, definiere <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS Header</a>, die <a href="https://amp.dev/documentation/guides-and-tutorials/amp-cors-requests.html">alle Caches</a> zulassen.</td>
    </tr>
    <tr>
      <td>Es werden weiterhin Inhalte bereitgestellt, die aufgrund einer rechtlichen Aufforderung zur Löschung von Inhalten entfernt werden müssen.</td>
      <td>Der AMP Cache hat die Löschung noch nicht registriert.</td>
      <td>Befolge die Richtlinien zur Aktualisierung von Inhalten für jeden einzelnen AMP Cache. Informationen zum Google AMP Cache findest du unter <a href="https://developers.google.com/amp/cache/update-cache">AMP-Inhalte aktualisieren</a>.</td>
    </tr>
</tbody>
</table>

</table>
