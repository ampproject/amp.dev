---
"$title": AMP for Email best practices
"$order": '1'
"$category": Develop
formats:
- email
---

O AMP possibilita o uso de novos tipos de conteúdo imersivo e envolvente no e-mail! Ao projetar e-mails, tenha em mente as seguintes práticas recomendadas para garantir que eles tenham bom desempenho, que sejam confiáveis em todas as plataformas e que funcionem da forma esperada por seus usuários.

#Velocidade

When using [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) to dynamically fetch content, include a placeholder to keep the integrity of the components structure. The placeholder should be as similar in layout as possible to the document after it's returned the requested data. This ensures the message size isn't changing or mutating the layout significantly.

#Usabilidade e acessibilidade

- When using [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), ensure the `controls` attribute is set. This lets users on touchscreen devices such as smartphones to navigate the carousel.
- Ao usar [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), tenha em mente que nem todos os tipos de entrada são suportados no iOS. Consulte o documento [Supported Input Values](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) na Referência HTML do Safari para mais informações.
- Nem todos os [valores de atributos `autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)  são suportados em diferentes aplicativos e navegadores. Assuma que o autocomplete não estará disponível para seus usuários e mantenha os formulários curtos.

#Estilo

- Make sure your email is only using [AMP for Email Supported CSS](../learn/email-spec/amp-email-css.md?format=email)
- Evite usar unidades viewport (`vw`, `vh`, `vmin` e `vmax`)  em qualquer lugar do seu CSS e HTML. Como os e-mails AMP são renderizados dentro de um iframe, a área de visualização do e-mail não corresponde à área de visualização do navegador.
- Diferentes navegadores possuem diferentes estilos de CSS padrão. Use uma biblioteca CSS que normaliza os estilos, se necessário. Para mais informações sobre estilos padrão, normalização de estilos e uma lista de bibliotecas disponíveis, veja [Reboot, Resets, and Reasoning](https://css-tricks.com/reboot-resets-reasoning/).
- Tenha cuidado com margens transbordantes em CSS: elas não podem ser renderizadas devido a [uma limitação de layout do AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Mobile

Certifique-se de que a sua mensagem apresenta-se bem em todos os tamanhos de tela, usando [CSS media queries](style_and_layout/control_layout.md?format=email) para identificar o dispositivo. Mensagens devem ser testadas em dispositivos móveis para garantir que o layout esteja correto e que os componentes funcionem como esperado.

#Outras questões

Ao trabalhar com AMP para E-mail, tenha em mente as seguintes dicas e truques:

- The AMP for Email playground doesn't proxy XHRs, but some email providers do.
- A parte MIME AMP deve aparecer antes da parte MIME HTML no seu e-mail para garantir a máxima compatibilidade entre diferentes clientes de e-mail.
- O atributo `src` de [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) de [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), o `src` de [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) ou o atributo href de uma tag `<a>`não pode ser alterado por [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Suas mensagens devem incluir uma versão HTML estática para o caso de um usuário ser redirecionado para a versão HTML da mensagem, ou se esse usuário encaminhar a mensagem.
