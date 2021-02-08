---
'$title': Dołączanie obrazu
$order: 2
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

[tip type="read-on"] <strong>CZYTAJ DALEJ —</strong> aby dowiedzieć się, dlaczego zastępujemy znaczniki takie jak <code><img></code> znacznikiem <a><code><amp-img></code></a> i ile ich jest dostępnych, odwiedź stronę <a>Dodawanie obrazów i filmów</a>. [/tip]
