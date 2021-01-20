---
$title: Use the JavaScript Module version of the AMP Runtime
$order: 25
tags:
- lcp
- fid
---
It's important to respect your users and their bandwidth. Using 
[JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
can make a huge positive difference on your page performance in modern web browsers.
You can opt into the JavaScript Module version of the AMP Runtime as well as AMP
components by using the 
[`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm)
flag with the latest
[AMP Optimizer](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/)
version. Keeping your implementation up-to-date splits up JavaScript programs into
separate modules, and only imports what's needed! Please note that since this feature
is experimental (launching soon!), using this feature would make your AMP page invalid.
