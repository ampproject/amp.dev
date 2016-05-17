---
layout: page
title: Voorbeeld weergeven en valideren
order: 3
locale: nl
---

Bekijk een voorbeeld van de AMP-pagina zoals u ook andere statische HTML-sites bekijkt. Hier is geen constructiestap of voorbewerking voor nodig. Kies uit een van deze opties:

  - **Open het voorbeeld rechtstreeks in de browser vanuit het bestandssysteem** (bepaalde elementen werken mogelijk niet vanwege XMLHttpRequests-fouten).
  - **Gebruik een lokale webserver zoals Apache 2 of Nginx**.
    *(Tip: Voer voor een snelle webserver `python -m SimpleHTTPServer` uit.)*

Zorg er daarna voor dat uw AMP-pagina **daadwerkelijk geldige AMP is**, anders kan de pagina niet worden gevonden en gedistribueerd door externe platforms zoals Google Zoeken. Valideer de pagina als volgt:

  1. Open de pagina in uw browser.
  1. Voeg '`#development=1`' aan de URL toe, bijvoorbeeld: `http://localhost:8000/released.amp.html#development=1`.
  1. Open de [Chrome DevTools-console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) en controleer of er validatiefouten zijn.

[Meer informatie over validatie](/docs/guides/validate.html) en wat u kunt doen als er zich fouten voordoen.

{% include button.html title="Doorgaan naar stap 5" link="/docs/get_started/create/prepare_for_discovery.nl.html" %}
