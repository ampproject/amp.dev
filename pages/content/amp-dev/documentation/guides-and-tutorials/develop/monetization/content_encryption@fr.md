---
formats:
  - websites
'$title': Comment protéger le contenu de votre abonnement avec le chiffrement côté client
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: "Résolvez les problèmes de chiffrement de contenu en implémentant la validation des abonnés premium et le déchiffrement du contenu côté client. Avec cette solution, les utilisateurs disposant d'un accès premium pourront déchiffrer du contenu sans avoir à charger une nouvelle page ou à attendre qu'un back-end réponde!"
author: CrystalOnScript
---

Si vous êtes auteur d'une publication en ligne, vous comptez probablement sur les abonnés pour vos recettes. Vous pouvez bloquer le contenu premium derrière un paywall côté client en utilisant [l'obfuscation CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Malheureusement, de nombreux férus de technologie peuvent contourner ce problème.

Au lieu de cela, vous pouvez montrer aux utilisateurs un document qui sans aucun contenu premium! Vous pouvez par exemple afficher une page entièrement nouvelle une fois que votre back-end valide l'utilisateur. Bien que plus sûre, cette méthode demande du temps, des ressources et la patience des utilisateurs.

Résolvez ces deux problèmes en implémentant la validation des abonnés premium et le déchiffrement du contenu côté client. Avec cette solution, les utilisateurs disposant d'un accès premium pourront déchiffrer du contenu sans avoir à charger une nouvelle page ou à attendre qu'un back-end réponde!

# Vue d'ensemble de la configuration

Pour implémenter le déchiffrage côté client, vous combinerez la cryptographie à clé symétrique et à clé publique de la manière suivante:

1. Créez une clé symétrique aléatoire pour chaque document, en accordant à chaque document une clé _unique_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
2. Chiffrez le contenu premium avec la clé symétrique de son document. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }} La clé est symétrique pour permettre à la même clé de chiffrer et déchiffrer le contenu. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
3. Chiffrez la clé du document avec une clé publique, en utilisant un protocole de [cryptage hybride ](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)pour chiffrer les clés symétriques. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
4. À l'aide du ou des composants [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) et/ou [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites), enregistrez la clé du document chiffré dans le document AMP, avec le contenu chiffré. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

Le document AMP enregistre la clé chiffrée en lui-même. Cela empêche le découplage du document chiffré avec la clé qui le décode.

# Comment cela fonctionne?

1. AMP analyse la clé à partir du contenu chiffré du document sur lequel l'utilisateur atterrit. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
2. Pendant la diffusion du contenu premium, AMP envoie la clé symétrique chiffrée du document à l'auteur dans le cadre de la récupération des droits de l'utilisateur. {{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
3. L'auteur décide si l'utilisateur dispose des autorisations appropriées. Si oui, l'auteur déchiffre la clé symétrique du document avec la clé privée de l'auteur à partir de sa paire de clés publique/privée. Ensuite, l'auteur renvoie la clé du document dans la [logique du composant amp-subscriptions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
4. AMP déchiffre le contenu premium avec la clé du document et le montre à l'utilisateur! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Étapes d'implémentation

Suivez les étapes ci-dessous pour intégrer la gestion du chiffrement AMP à votre serveur de droits interne.

## Étape 1: créer une paire de clés publique/privée

Pour chiffrer la clé symétrique du document, vous devez disposer de votre propre paire de clés publique/privée. Le chiffrement à clé publique est un protocole de [chiffrage hybride](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), en particulier pour chiffrer une méthode de cryptage asymétrique ECIES à [courbe elliptique P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) avec une méthode de cryptage symétrique [AES-GCM](https://tools.ietf.org/html/rfc5288) (128 bits).

Nous exigeons que la gestion des clés publiques soit effectuée avec [Tink](https://github.com/google/tink) en utilisant [ce type de clé asymétrique](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Pour créer votre paire de clés privée-publique, utilisez l'une des méthodes suivantes:

- Classe [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) de Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (outil clé de Tink)

Les deux prennent en charge la rotation des clés. L'implémentation de la rotation des clés limite la vulnérabilité à une clé privée compromise.

Pour vous aider à créer vos premières clés asymétriques, nous avons créé [ce script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen):

1. Il crée un nouvel ECIES avec la clé AEAD.
2. Il affiche la clé publique en texte brut dans un fichier de sortie.
3. Il affiche la clé privée dans un autre fichier de sortie.
4. Il chiffre la clé privée générée à l'aide d'une clé hébergée sur Google Cloud (GCP) avant de l'écrire dans le fichier de sortie (généralement appelé [chiffrage d'enveloppe](https://cloud.google.com/kms/docs/envelope-encryption)).

Nous recommandons de stocker/publier votre [jeu de clés Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) au format [JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Cela permet aux autres outils fournis par AMP de fonctionner parfaitement. Notre script affiche déjà la clé publique dans ce format.

## Étape 2: chiffrer les articles

Décidez si vous allez chiffrer manuellement ou automatiquement le contenu premium.

### Chiffrage manuel

Nous recommandons la méthode symétrique [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) utilisant Tink pour crypter le contenu premium. La clé de document symétrique utilisée pour chiffrer le contenu premium doit être unique pour chaque document. Ajoutez la clé de document à un objet JSON qui contient la clé en texte brut codé en base64, ainsi que les SKU nécessaires pour accéder au contenu chiffré du document.

L'objet JSON ci-dessous contient un exemple de la clé en texte brut encodé en base64 et le SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Chiffrez l'objet JSON ci-dessus à l'aide de la clé publique générée dans la section Comment créer une paire de clés publique/privée.

Ajoutez le résultat chiffré comme valeur à la clé `"local"`. Placez la paire clé-valeur dans un objet JSON encapsulé dans une balise `<script type="application/json" cryptokeys="">`. Placez la balise dans la tête du document.

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

Vous devez chiffrer la clé du document avec l'environnement local et la [clé publique de Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). L'inclusion de la clé publique de Google permet à Google AMP Cache de diffuser votre document. Vous devez instancier un [jeu de clés Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) pour accepter la clé publique Google à partir de son URL:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

La clé publique de Google est un [jeu de clés Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) au [format JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Voir [ici](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) pour un exemple d'utilisation de ce jeu de clés.

Lire: [voir un exemple de document AMP chiffré fonctionnel.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Chiffrement automatique

Chiffrez le document à l'aide de notre [script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). Le script accepte un document HTML et chiffre tout le contenu à l'intérieur des balises `<section subscriptions-section="content" encrypted>`. À l'aide des clés publiques situées dans les URL qui lui sont transmises, le script chiffre la clé de document créée par le script. L'utilisation de ce script garantit le codage et le formatage corrects de tout le contenu en vue de sa diffusion. Voir [ici](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) pour plus d'informations sur l'utilisation de ce script.

## Étape 3: intégrer l'agent d'autorisation

Vous devez mettre à jour votre agent d'autorisation pour déchiffrer les clés de document lorsqu'un utilisateur dispose des droits appropriés. Le composant amp-subscriptions envoie automatiquement la clé de document chiffrée à l'autorisation `"local"` via un paramètre d'URL ["crypt ="](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Il assure:

1. L'analyse de la clé de document à partir du champ de clé JSON `"local"`.
2. Le déchiffrage du document.

Vous devez utiliser Tink pour déchiffrer les clés de document dans votre agent d'autorisation. Pour déchiffrer avec Tink, instanciez un client [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) à l'aide des clés privées générées dans la section Comment créer une paire de clés publique/privée. Faites-le au démarrage du serveur pour des performances optimales.

Le déploiement de votre HybridDecrypt/agent d'autorisation doit correspondre à peu près à votre calendrier de rotation des clés. Cela assure la disponibilité de toutes les clés générées pour le client HybridDecrypt.

Tink propose une [documentation](https://github.com/google/tink/tree/master/docs) complète et des [exemples](https://github.com/google/tink/tree/master/examples) en C ++, Java, Go et Javascript pour vous aider à démarrer votre implémentation côté serveur.

### Gestion des demandes

Lorsqu'une demande parvient à votre agent d'autorisation:

1. Analysez l'URL de pingback des droits pour le paramètre "crypt =".
2. Décodez la valeur du paramètre "crypt =" avec base64. La valeur stockée dans le paramètre URL est l'objet JSON chiffré en base64.
3. Une fois que la clé chiffrée est sous forme d'octets bruts, utilisez la fonction de déchiffrement de HybridDecrypt pour déchiffrer la clé à l'aide de votre clé privée.
4. En cas de réussite du déchiffrement, analysez le résultat dans un objet JSON.
5. Vérifiez l'accès de l'utilisateur à l'un des droits répertoriés dans le champ JSON AccessRequirements.
6. Renvoyez la clé du document à partir du champ « Clé » de l'objet JSON déchiffré dans la réponse de droits. Ajoutez la clé de document déchiffrée dans un nouveau champ intitulé « decryptedDocumentKey » dans la réponse de droits. Cela donne accès au framework AMP.

L'exemple ci-dessous est un extrait de pseudo-code qui décrit les étapes de description ci-dessus:

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

# Ressources associées

Consultez la documentation et les exemples disponibles sur la [page Github de Tink](https://github.com/google/tink).

Tous les scripts d'assistance se trouvent dans le [référentiel Github subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Pour plus d'aide

Pour toute question, commentaire ou préoccupation, veuillez déposer un [ticket Github](https://github.com/subscriptions-project/encryption/issues).
