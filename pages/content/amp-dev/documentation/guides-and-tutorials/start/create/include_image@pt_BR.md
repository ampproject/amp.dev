---
'$title': Inclua uma imagem
$order: 2
description: A maioria das tags HTML podem ser usadas diretamente em AMP HTML, mas algumas, como a tag <img>, são substituídas por tags AMP HTML equivalentes ou ligeiramente melhoradas
author: pbakaus
contributors:
  - bpaduch
---

A maioria das tags HTML podem ser usadas diretamente em AMP HTML, mas algumas, como a tag `<img>`, são substituídas por tags AMP HTML equivalentes ou ligeiramente melhoradas e personalizadas (e algumas poucas tags problemáticas são diretamente eliminadas, consulte [Tags HTML na especificação](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Para demonstrar qual seria a aparência de uma marcação adicional, veja o código necessário para incorporar uma imagem na página:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **LEIA MAIS –** Para saber por que estamos substituindo tags como `<img>` por [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) e quantas estão disponíveis, consulte [Incluir imagens e vídeo](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md).[/tip]
