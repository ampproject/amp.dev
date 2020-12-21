---
"$title": Vorschau und Validierung
"$order": '5'
description: 'Preview the AMP page just as you would preview any other static HTML site. There’s no build step or preprocessing required. You can choose to: ...'
author: pbakaus
contributors:
- bpaduch
---

## Vorschau

Preview the AMP page just as you would preview any other static HTML site. There’s no build step or preprocessing required. You can choose to:

- **Open the page directly in the browser from the file system** (certain elements might not work due to XMLHttpRequests failing).
- **Use a local web server like Apache 2 or Nginx**. *(Tip: For a quick web server, run `python -m SimpleHTTPServer`.)*

## Validate

Next, make sure that your AMP page **is actually valid AMP**, or it won’t get discovered and distributed by third-party platforms like Google Search. To validate:

1. Öffne deine Seite in deinem Browser.
2. Füge "`#development=1`" zur URL hinzu, z. B. `http://localhost:8000/released.amp.html#development=1`.
3. Öffne die [Chrome DevTools Konsole](https://developers.google.com/web/tools/chrome-devtools/debug/console/) und suche nach Validierungsfehlern.

[tip type="read-on"] **READ ON –** [Learn more about validation](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), and what to do when you get errors. [/tip]
