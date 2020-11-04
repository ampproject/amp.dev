---
$title: Preconnect to Google fonts
$order: 150
tags:
- lcp
---
Resource hints such as `preconnect` are features supported by modern browsers
to boost website performance and reduce loading time. 
<br><br>
Use them manually by adding the
following to your page:
```
<link href=https://fonts.gstatic.com rel="dns-prefetch preconnect" crossorigin>
```
