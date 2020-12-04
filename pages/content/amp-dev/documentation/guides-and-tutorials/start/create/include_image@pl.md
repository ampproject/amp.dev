---
"$title": Dołączanie obrazu
"$order": '2'
description: Większości znaczników HTML można używać bezpośrednio w AMP HTML, ale niektóre znaczniki, takie jak <img>, są zastępowane równoważnymi lub nieco ulepszonymi znacznikami niestandardowymi AMP HTML.
author: pbakaus
contributors:
- bpaduch
---

Większości znaczników HTML można używać bezpośrednio w AMP HTML, ale niektóre znaczniki, takie jak `<img>`, są zastępowane równoważnymi lub nieco ulepszonymi znacznikami niestandardowymi AMP HTML (a kilka sprawiających problemy znaczników jest całkowicie zakazanych, patrz [Znaczniki HTML w specyfikacji](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#html-tags)).

Oto kod wymagany do osadzenia obrazu na stronie, pokazujący jak mogą wyglądać dodatkowe znaczniki:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **READ ON –** To learn why we’re replacing tags like `<img>` with [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), and how many are available, visit [Include Images & Video](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). [/tip]
