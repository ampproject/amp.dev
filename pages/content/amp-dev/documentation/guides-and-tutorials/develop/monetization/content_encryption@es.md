---
formats:
  - websites
'$title': Proteja el contenido de su suscripción mediante el cifrado del lado del cliente
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Resuelva los problemas de cifrado de contenido implementando la validación de los suscriptores premium y la desencriptación de contenido en el lado del cliente. ¡Con esta solución, los usuarios con acceso premium podrán desencriptar contenido sin necesidad de cargar una nueva página o esperar a que responda un backend!
author: CrystalOnScript
---

Si tiene una publicación en línea, probablemente dependa de los suscriptores para obtener ingresos. Puede bloquear el contenido premium detrás de un muro de pago en el cliente mediante la [ofuscación de CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`visualización: ninguna`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Desafortunadamente, los expertos en tecnología pueden solucionar esto.

En su lugar, es posible que a los usuarios se les muestre un documento que carece por completo de contenido premium. Y se les entregue una página completamente nueva una vez que su backend valide al usuario. Aunque es más seguro, este método cuesta tiempo, recursos y la satisfacción del usuario.

Resuelva los problemas implementando la validación de suscriptores premium y el desencriptando el contenido en el lado del cliente. Con esta solución, los usuarios con acceso premium podrán desencriptar contenido sin la necesidad de cargar una nueva página o esperar a que responda un backend

# Descripción general de la configuración

Para implementar la desencriptación en el lado del cliente, se combinará la criptografía de clave simétrica y de clave pública de la siguiente manera:

1. Cree una clave simétrica aleatoria para cada documento, permitiendo que cada documento tenga una clave _única_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Cifre el contenido premium con la clave simétrica de su documento. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} La clave es simétrica para permitir que la misma clave cifre y descifre el contenido. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Cifre la clave del documento con una clave pública, utilizando un protocolo de [cifrado híbrido ](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)para cifrar las claves simétricas. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. Con los componentes [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) y/o [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites) almacene la clave del documento cifrado dentro del documento de AMP, junto con el contenido premium cifrado. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

El documento de AMP almacena la clave cifrada dentro de sí mismo. Esto evita el disociación del documento cifrado con la clave que lo desencripta.

# ¿Cómo funciona?

1. AMP analiza la clave del contenido cifrado en el documento destino del usuario. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. Mientras entrega el contenido premium, AMP envía la clave simétrica cifrada del documento al autorizador como parte de la recuperación de derechos del usuario. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. El autorizador decide si el usuario cuenta con los permisos correctos. En caso afirmativo, el autorizador desencripta la clave simétrica del documento con la clave privada del autorizador de su par de claves públicas o privadas. Después, el autorizador devuelve la clave del documento a la [lógica del componente amp-subscriptions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. ¡AMP desencripta el contenido premium con la clave del documento y se lo muestre al usuario! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Pasos de la implementación

Siga siguientes los pasos para integrar la administración del cifrado de AMP con su servidor de derechos interno.

## Paso 1: crear un par de claves públicas o privadas

Para cifrar la clave simétrica del documento, debe tener su propio par de claves públicas o privadas. El cifrado de claves públicas es un protocolo de [cifrado híbrido](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), específicamente es un método de cifrado asimétrico ECIES de [curva elíptica P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) con un método de cifrado simétrico [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bits).

Además, es necesario que la administración de claves públicas se realice con [Tink](https://github.com/google/tink) utilizando [ este tipo de clave asimétrica](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Para crear su par de claves públicas y privadas, utilice cualquiera de los siguientes:

- Clase [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) de Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (herramienta de utilidad clave de Tink)

Ambos son compatibles con la rotación de claves. La implementación de la rotación de claves limita la vulnerabilidad a una clave privada riesgosa.

Para ayudarlo a comenzar a crear claves asimétricas, creamos [este script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen):

1. Cree un nuevo ECIES con clave AEAD.
2. Envíe la clave pública en texto sin formato a un archivo de salida.
3. Envíe la clave privada a otro archivo de salida.
4. Cifre la clave privada generada mediante una clave alojada en Google Cloud (GCP) antes de escribir en el archivo de salida (comúnmente conocido como [Envoltura de cifrado](https://cloud.google.com/kms/docs/envelope-encryption)).

Es necesario almacenar o publicar su conjunto de [claves Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) públicas en [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Esto permite que otras herramientas proporcionadas por AMP funcionen de forma eficiente. Nuestro script ya genera la clave pública en este formato.

## Paso 2: Cifrar los artículos

Decida si hará el cifrado manual del contenido premium o hará el cifrado automático del contenido premium.

### Cifrado manual

Es necesario el método simétrico [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) que utiliza Tink para cifrar contenido premium. La clave simétrica del documento que se utiliza para cifrar el contenido premium debe ser única para cada documento. Agregue la clave del documento a un objeto JSON que incluya la clave en texto sin formato codificado en base64, así como los SKU necesarios para acceder al contenido cifrado del documento.

En el siguiente objeto JSON se incluye un ejemplo de la clave en texto sin formato codificado en base64 y el SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Cifre el objeto JSON anterior utilizando la clave pública generada en Crear un par de claves públicas o privadas.

Agregue el resultado cifrado como valor a la clave `"local"`. Coloque el par clave-valor dentro de un objeto JSON envuelto dentro de una etiqueta `<script type="application/json" cryptokeys="">`. Coloque la etiqueta en el encabezado del documento.

```
<head>
...
<script type="application/json" cryptokeys="">
{
  "local": ['y0^r$t^ff'], // This is for your environment
  "google.com": ['g00g|e$t^ff'], // This is for Google's environment
}
</script>
…
</head>
```

Debe cifrar la clave del documento con el entorno local y la [clave pública de Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Incluir la clave pública de Google permite que el caché AMP de Google entregue su documento. Debe crear una instancia de un [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) para aceptar la clave pública de Google desde su URL:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

La clave pública de Google es un [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) en [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Consulte [aquí](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) un ejemplo de cómo trabajar con este conjunto de claves.

Lectura: [Consulte un ejemplo de un documento AMP cifrado que funciona.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Cifrado automático

Cifre el documento mediante nuestro [script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). El script acepta un documento HTML y encripta todo el contenido dentro de las etiquetas `<section subscriptions-section="content" encrypted>`. Utilizando las claves públicas ubicadas en las URL que se le transfieren, el script cifra la clave del documento que crea el script. El uso de esta secuencia de comandos garantiza que todo el contenido esté codificado y formateado correctamente para su publicación. [Aquí](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) se encuentra la información para obtener más instrucciones sobre el uso de este script.

## Paso 3: Integrar el autorizador

Debe actualizar su autorizador para descifrar las claves del documento cuando un usuario tiene los derechos correctos. El componente amp-subscriptions envía automáticamente la clave del documento cifrada al autorizador `"local"` a través de un parámetro URL [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70), el cual realiza:

1. Un análisis de la clave en el documento del campo con una clave JSON `"local"`.
2. Desencripta documentos.

Debe utilizar Tink para desencriptar las claves de los documentos en su autorizador. Para desencriptar con Tink, cree una instancia de un cliente [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) utilizando las claves privadas generadas en la sección Crear un par de claves públicas o privadas. Haga esto al iniciar el servidor para obtener un rendimiento óptimo.

Su implementación de HybridDecrypt o del Autorizador debe coincidir aproximadamente con su programa de rotación de claves. Esto crea disponibilidad de todas las claves generadas para el cliente HybridDecrypt.

Tink cuenta con un amplio número de [documentos](https://github.com/google/tink/tree/master/docs) y [ejemplos](https://github.com/google/tink/tree/master/examples) en C ++, Java, Go y Javascript para ayudarlo a comenzar con la implementación del lado del servidor.

### Administración de solicitudes

Cuando llega una solicitud a su autorizador:

1. Analice la URL de pingback de derechos para el parámetro "crypt =".
2. Desencripta el valor del parámetro "crypt =" con base64. El valor almacenado en el parámetro de URL es el objeto JSON cifrado codificado en base64.
3. Una vez que la clave cifrada está en su forma de bytes sin procesar, utilice la función de desencriptado de HybridDecrypt para desencriptar la clave utilizando su clave privada.
4. Si la desencriptación se realiza correctamente, analice el resultado en un objeto JSON.
5. Verifique el acceso del usuario a uno de los derechos que se registran en el campo JSON AccessRequirements.
6. Se devuelve la clave en el documento del campo "Clave" que se encuentra en el objeto JSON desencriptado en la respuesta de derechos. Agregue la clave del documento desencriptado en un nuevo campo titulado "DecryptedDocumentKey" que se encuentra en la respuesta de derechos. Esto le permite el acceso al Framework AMP.

El siguiente ejemplo es un fragmento de pseudocódigo en el que se describen los pasos anteriores:

```js
string decryptDocumentKey(string encryptedKey, List < string > usersEntitlements,
    HybridDecrypt hybridDecrypter) {
    // 1. Base64 decode the input encrypted key.
    bytes encryptedKeyBytes = base64.decode(encryptedKey);
    // 2. Try to decrypt the encrypted key.
    bytes decryptedKeyBytes;
    try {
        decryptedKeyBytes = hybridDecrypter.decrypt(
            encryptedKeyBytes, null /* contextInfo */ );
    } catch (error e) {
        // Decryption error occurred. Handle it how you want.
        LOG("Error occurred decrypting: ", e);
        return "";
    }
    // 3. Parse the decrypted text into a JSON object.
    string decryptedKey = new string(decryptedKeyBytes, UTF_8);
    json::object decryptedParsedJson = JsonParser.parse(decryptedKey);
    // 4. Check to see if the requesting user has the entitlements specified in
    //    the AccessRequirements section of the JSON object.
    for (entitlement in usersEntitlements) {
        if (decryptedParsedJson["AccessRequirements"]
            .contains(entitlement)) {
            // 5. Return the document key if the user has entitlements.
            return decryptedParsedJson["Key"];
        }
    }
    // User doesn't have correct requirements, return empty string.
    return "";
}

JsonResponse getEntitlements(string requestUri) {
    // Do normal handling of entitlements here…
    List < string > usersEntitlements = getUsersEntitlementInfo();

    // Check if request URI has "crypt" parameter.
    String documentCrypt = requestUri.getQueryParameters().getFirst("crypt");

    // If URI has "crypt" param, try to decrypt it.
    string documentKey;
    if (documentCrypt != null) {
        documentKey = decryptDocumentKey(
            documentCrypt,
            usersEntitlements,
            this.hybridDecrypter_);
    }

    // Construct JSON response.
    JsonResponse response = JsonResponse {
        signedEntitlements: getSignedEntitlements(),
        isReadyToPay: getIsReadyToPay(),
    };
    if (!documentKey.empty()) {
        response.decryptedDocumentKey = documentKey;
    }
    return response;
}
```

# Recursos relacionados

Consulte la documentación y los ejemplos que se encuentran en la [página de Tink Github](https://github.com/google/tink).

Todos los scripts auxiliares están disponibles en el [repositorio subscriptions-project/encryption de Github](https://github.com/subscriptions-project/encryption).

# Ayuda adicional

Si tiene alguna pregunta, comentario o inquietud, complete una <a>Plantilla para solucionar problemas en GitHub</a>.
