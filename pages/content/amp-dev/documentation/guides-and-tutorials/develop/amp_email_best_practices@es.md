---
'$title': Prácticas recomendadas de AMP para correos electrónicos
$order: 1
'$category': Develop
formats:
  - email
---

¡AMP le permitirá crear nuevos y emocionantes tipos de contenidos que además sean inmersivos y atractivos en el correo electrónico! Cuando diseñe correos electrónicos, tenga en cuenta las siguientes prácticas recomendadas para garantizar que sean eficientes y confiables en todas las plataformas y funcionen como los usuarios esperan.

#Velocidad

Cuando utilice [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) para obtener contenido de forma dinámica, incluya un marcador de posición para mantener la integridad en la estructura de los componentes. El marcador de posición debe tener un diseño que sea lo más similar posible al documento cuando se devuelvan los datos solicitados. Esto garantiza que el tamaño del mensaje no modifique o altere el diseño de forma significativa.

#Utilidad y accesibilidad

- Cuando utilice [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), asegúrese de que el atributo `controls` esté configurado. Esto permite que los usuarios que utilicen dispositivos de pantalla táctil como los teléfonos inteligentes naveguen en carrusel.
- Cuando use [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), tenga en cuenta que no todos los tipos de entrada son compatibles con iOS. Para obtener más información, consulte los [valores de entrada que son compatibles](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) en la referencia HTML de Safari.
- No todos los [valores del atributo](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) `autocomplete` son compatibles con todas las aplicaciones y navegadores. Suponga que el autocompletado no está disponible para sus usuarios y mantenga los formularios cortos.

#Diseño

- Asegúrese de que su correo electrónico solo utiliza [AMP para correos electrónicos que son compatible con CSS](../learn/email-spec/amp-email-css.md?format=email)
- Evite utilizar los elementos de la ventana de visualización (`vw`, `vh`, `vmin` y `vmax`) en cualquier parte de su CSS y HTML. Debido a que los correos electrónicos de AMP se procesan dentro de un iframe, la ventana de visualización del correo electrónico no coincide con la del navegador.
- Diferentes navegadores tienen diferentes diseños CSS predeterminados. Si es necesario, utilice una biblioteca CSS que estandarice los diseños. Para obtener más información sobre los diseños predeterminados, la estandarización de los diseños y una lista de las bibliotecas disponibles, consulte el artículo [Reiniciar, restablecer y razonar](https://css-tricks.com/reboot-resets-reasoning/).
- Tenga cuidado con el desbordamiento del margen en CSS: posiblemente no se lleve a cabo la renderización debido a [una limitación en el diseño de AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Dispositivos móviles

Asegúrese de que su mensaje se vea bien en todos los tamaños de pantalla, para ello utilice [consultas de medios en CSS](style_and_layout/control_layout.md?format=email) para identificar el dispositivo. Los mensajes deben probarse en dispositivos móviles para garantizar que el diseño sea correcto y los componentes funcionen según lo esperado.

#Otros trucos

Cuando trabaje con AMP para correos electrónicos, tenga en cuenta los siguientes consejos y trucos:

- En AMP la ventana de pruebas del correo electrónico no sustituye a las XHR, pero algunos proveedores de correos electrónicos sí lo hacen.
- La sección de AMP MIME debe aparecer antes de la sección de HTML MIME en su correo electrónico para garantizar la mayor compatibilidad entre los clientes del correo electrónico.
- El atributo `src` de [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) para [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), el `src` para [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email), o el atributo href de una etiqueta `<a>` no puede modificarse por [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Sus mensajes deben incluir una versión HTML estática en caso de que un usuario sea conducido a la versión HTML de algún mensaje, o si ese usuario reenvía el mensaje.
