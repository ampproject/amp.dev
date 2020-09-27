---
$title: Validating your AMP HTML
$order: 8
description: Whenever you create an AMP page, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate your AMP pages ...

author: bpaduch
---

Because Web Stories are built with AMP, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate AMP pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). In this tutorial, we'll enable the AMP Validator by turning on the developer mode.  To turn on the developer mode, add the following fragment identifier to your URL and reload the page:

```text
#development=1
```

For example:

```text
http://localhost:8000/pets.html#development=1
```

Open the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser), and verify there are no AMP errors. You might need to refresh your browser to see validation messages. If your page is free of errors, you should see the message:

```text
 AMP validation successful.
```
