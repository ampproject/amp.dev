---
$title: Incluir uma imagem
---

A maioria das tags HTML podem ser usadas diretamente em AMP HTML, mas algumas, como a tag `<img>`, são substituídas por tags AMP HTML equivalentes ou ligeiramente melhoradas e personalizadas (e algumas poucas tags problemáticas são diretamente eliminadas, consulte [Tags HTML na especificação]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}})).

Para demonstrar qual seria a aparência de uma marcação adicional, veja o código necessário para incorporar uma imagem na página:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Leia mais: Para saber por que estamos substituindo tags como `<img>` por `<amp-img>` e quantas estão disponíveis, consulte [Incluir imagens e vídeo]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/amp_replacements.md', locale=doc.locale).url.path}}).
