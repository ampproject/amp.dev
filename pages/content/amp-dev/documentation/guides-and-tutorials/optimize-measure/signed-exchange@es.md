---
"$title": Cómo obtener los servicios de AMP mediante intercambios firmados
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

AMP proporciona beneficios que están relacionados con la velocidad, los cuales van más allá del formato, para ello se utilizan técnicas como el almacenamiento en el caché y la carga previa. Sin embargo, estos beneficios pueden tener [desventajas](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) como mostrar URL adicionales cuando se insertan en un [Visor AMP](https://developers.google.com/search/docs/guides/about-amp). Al suministrar el contenido de AMP mediante intercambios firmados, puede utilizar una nueva característica de la plataforma web para solucionar este tipo de problemas.

Los [intercambios firmados](https://developers.google.com/web/updates/2018/11/signed-exchanges) están conformados por un documento válido de AMP y la URL original del contenido. Esta información está protegida por firmas digitales que vinculan de forma segura el documento con la URL que se solicitó. Esto permite que los navegadores muestren la URL original de forma segura en la barra de direcciones, en lugar de que aparezca el nombre del host en el equipo que suministró los bytes al navegador.

*Además del* contenido firmado también se entrega el contenido habitual de AMP (de forma adicional y no en lugar de este).

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] Esta característica actualmente es compatible con Chrome, pero se prevé que posteriormente pueda implementarse en otros navegadores. [/tip]

# ¿Los intercambios firmados funcionarán para mí?

Para implementar los intercambios firmados, es necesario que cumpla con los siguientes requisitos:

- Contar con la capacidad de configurar y controlar los encabezados de HTTP generados por su servidor (la mayoría de las soluciones de alojamiento basadas en la web como Blogger *no* son compatibles con los intercambios firmados).
- Tener la capacidad de generar intercambios firmados en AMP, tales como ejecutar [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), en [Go binary](https://golang.org/doc/install), o dentro de una [máquina virtual Docker](https://docs.docker.com/machine/get-started/).
    - El paquete debe actualizarse cada seis semanas.
- Tener la capacidad de [modificar](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) los encabezados `Accept` y `AMP-Cache-Transform` en los servidores perimetrales HTTP, al devolver diferentes tipos de contenido para la misma URL.
- El sistema que ejecuta el `amppackager` debe ser capaz de realizar solicitudes de salida en la red hacia:
    - La autoridad emisora de certificados que expida su certificado.
    - El servidor del editor que aloja los documentos de AMP para firmarlos.
    - El `cdn.ampproject.org` para obtener la versión actual de AMP.
- Tener un sistema de archivos con almacenamiento continuo de acceso compartido entre todas las instancias del `amppackager` que se ejecuten en el mismo centro de datos.

# Cómo implementar los intercambios firmados

A continuación, se sugiere establecer la implementación de tal forma que sea compatible con los intercambios firmados en sus documentos AMP.

## Cómo adquirir un certificado que sea compatible con TLS

Para producir intercambios firmados, necesitará un certificado TLS con la extensión `CanSignHttpExchanges`. A partir de abril del 2019, [DigiCert](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/) es el único proveedor de esta extensión ([obtener más información](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

Para generar el certificado, la Autoridad de certificación (CA) necesitará de una Solicitud de firma de certificado (CSR), la cual puede generarse mediante `openssl`. El ejemplo de una CSR se encuentra en `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## Cómo determinar cuáles son las URL que se firmarán

Es necesario que cree un patrón URL donde se defina cuáles son los documentos que deben firmarse. Es fundamental que tanto el contenido privado como la información personalizada no sean firmados, esto con la finalidad de evitar el envío de contenido erróneo o falso.

Por motivos relacionados con el rendimiento, el empaquetador solo debe aprobar documentos AMP válidos como entrada. Está bien si se necesitan algunos documentos AMP que no son válidos, pero debe evitarse el envío de todo el tráfico mediante el empaquetador.

## Cómo implementar el empaquetador en un servidor de ensayo

Primero debe configurar los intercambios firmados en un servidor de ensayo para verificar que su configuración sea correcta antes de migrar al entorno de producción.

Le recomendamos utilizar [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) para generar intercambios firmados. Sin embargo, si esto no se ajusta bien a su entorno de producción puede utilizar a los clientes de la línea de comandos `transform` y [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange), controlar la negociación del contenido y certificar la administración de tareas usted mismo.

Las siguientes instrucciones aplican para las implementaciones donde se utiliza `amppackager`.

### Configuración

El archivo de configuración de [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) requiere un **CertFile** y un **KeyFile**.

El **KeyFile** es la clave privada (`ampbyexample-packager.key` en el ejemplo anterior), y debe tener el siguiente formato. (Nota: no comparta su propia clave privada, y protéjala de intercambios accidentales).

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

El **CertFile** es el certificado público. Si DigiCert proporcionó el certificado, este puede generarse mediante la concatenación del certificado de origen proporcionado por DigiCert y el archivo `DigiCertCA.crt`.

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### Instalación

Siga las instrucciones que se encuentran [aquí para configurar el `amppackager` en su sitio](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] Consulte [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (utilizado por `amp.dev`) como un ejemplo de los cambios del lado del servidor que deberá hacer para enrutar las solicitudes que necesite `amppkg`. [/tip]

### Las pruebas

Verifique que su sitio de ensayo responda con el contenido de tipo MIME para `application/signed-exchange` cuando se haya especificado mediante la solicitud HTTP. Por ejemplo (sustituya `staging.example.com` por su servidor de ensayo):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

La salida debe incluir esta línea:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] El `v="1..100"` en la solicitud es un marcador de posición. Sin embargo, no se ajusta exactamente con este valor, en vez de eso, como [se describió en las instrucciones de instalación de amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), verifique que solamente haya un encabezado  `amp-cache-transform`, e ignore el valor. [/tip]

[tip type="important"] La versión de la cadena en la respuesta `v=b3` es de agosto del 2019. Esta versión se modificará. [/tip]

La mayor parte de la respuesta debe ser su página de AMP (en texto sin formato). Cuando la página sea mayor a 16 kB, habrá un pequeño encabezado binario repartido en unos cuantos bytes binarios.

La [herramienta `dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) puede utilizarse para inspeccionar la respuesta:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(Tenga en cuenta que el interruptor `-verify` no funcionará en este momento porque los certificados que se necesitan no se encuentran en el servidor `https://example.com/`).

Verifique que la respuesta incluya *siempre* el encabezado `Vary` con el valor `Accept,AMP-Cache-Transform` (independientemente de si el tipo MIME es `text/html`, `application/signed-exchange`, o algún otro):

```sh
$ curl -si https://staging.example.com/ | less
```

La salida debe incluir esta línea:

```txt
vary: Accept,AMP-Cache-Transform
```

## Cómo implementar el empaquetador en el entorno de producción

### Instalación

Ajuste los pasos para implementar el ensayo como se mostró anteriormente, de una manera que sea apropiada para su entorno de producción.

### Las pruebas

#### Con las herramientas de la línea de comandos

Ejecute las mismas pruebas que se describieron anteriormente. También en este momento debería funcionar `dump-signedexchange -verify`.

#### Con Chrome

También puede realizar pruebas en Chrome con la ayuda de la [extensión ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). Lleve a cabo la instalación desde la tienda web de Chrome y configure los `Request Headers` para `amp-cache-transform` en un `Value` de `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

Después de solicitar `https://example.com/` su servidor enviará un intercambio firmado, pero debe lucir y comportarse igual que antes. Debe revisar que el intercambio firmado se devuelva correctamente mediante la[ consola de DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

En la pestaña `Network`, haga clic sobre su nombre de dominio y verifique que el `Signed HTTP exchange` aparezca en `Preview`.

#### Con el caché AMP de Google

Confirme que los intercambios firmados son compatibles con el caché AMP de Google. Esto está relacionado con su visibilidad en los motores de búsqueda como Google Search.

Para probar los intercambios firmados en el caché AMP de Google, abra la pestaña de la red en DevTools, habilite `Preserve log`, y visite una URL, por ejemplo `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

Si la solicitud fue exitosa, DevTools mostrará un `200` con una fila de `signed-exchange` y una fila `from signed-exchange`.

Si no tiene éxito, faltarán las filas correspondientes al intercambio firmado o aparecerán resaltadas en color rojo. También podría haber un encabezado `warning` que proporcione información adicional.

## Intercambios firmados en Google Search

Si sus páginas de AMP se distribuyeron exitosamente como intercambios firmados, los resultados de su búsqueda mostrarán el símbolo del relámpago de AMP, igual que antes, pero al hacer clic sobre los resultados se mostrará `https://example.com` en la barra de la URL, en lugar de una URL que comience con `https://www.google.com/amp/….`. Además, no aparecerá la barra `viewer`.

En la consola de DevTools, debajo de la pestaña `network` podrá consultar `signed-exchange` bajo la columna `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# Proveedores de servicios para intercambios firmados

Aquí puede consultar una lista con la Red de distribución de contenidos CDN y los proveedores de alojamiento que ofrecen soporte inmediato para los intercambios firmados. Utilizar alguno de estos recursos es la forma más fácil de comenzar con los intercambios firmados:

- [El programa de instalación AMP Packager de Google Cloud Click-to-Deploy](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) es una herramienta para mejorar las URL de AMP al publicar AMP utilizando intercambios firmados. Para obtener más detalles, consulte el [blog de AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [La URL AMP real de Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) es una de las redes más grandes del mundo. Actualmente, las empresas, las organizaciones sin fines de lucro, los bloggers y cualquier persona que tenga presencia en Internet presumen tener sitios web, así como aplicaciones más rápidas y seguras gracias a Cloudflare.
