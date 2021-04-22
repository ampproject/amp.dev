---
formats:
  - websites
$title: Protect your subscription content with client-side encryption
$titles:
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: 'Solve content encryption issues by implementing premium subscriber validation and content decryption on the client side. With this solution, users with premium access will be able to decrypt content without needing to load a new page or wait for a backend to respond!'
author: CrystalOnScript
---

If you’re an online publication, you probably rely on subscribers for revenue. You might block premium content behind a paywall on the client using [CSS obfuscation](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Unfortunately, more tech savvy people can work around this.

Instead, you may be showing users a document that completely lacks premium content! Serving an entirely new page once your backend validates the user. While more secure, this method costs time, resources and user happiness.

Solve both these issues by implementing premium subscriber validation and content decryption on the client side. With this solution, users with premium access will be able to decrypt content without needing to load a new page or wait for a backend to respond!


# Setup overview 

To implement client-side decryption, you will combine both symmetric-key and public-key cryptography in the following way:

1.  Create a random symmetric-key for each document, granting each document a _unique_ key.
{{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Unique keys for each unique document.') }}
1.  Encrypt the premium content with it's document's symmetric-key.
{{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use the document key to encrypt premium content.') }}
    The key is symmetric to allow the same key to encrypt and decrypt the content.
{{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='The same key that encrypts the document also decrypts it.') }}
1.  Encrypt the document key with a public key, using a [hybrid encryption ](https://en.wikipedia.org/wiki/Hybrid_cryptosystem)protocol to encrypt the symmetric keys.
{{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='A hybrid encryption protocol encrypts the symmetric key with a public key.') }}
1.  Using the [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) and/or [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites)component(s), store the encrypted document key inside of the AMP document, alongside the encrypted premium content.
{{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Both keys are stored inside of the AMP document.') }}

The AMP document stores the encrypted key in itself. This prevents decoupling of the encrypted document with the key that decodes it.

# How does it work? 

1.  AMP parses the key from encrypted content on the document the user lands on.
{{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='The public and symmetric key encryptions.') }}
1.   While serving the premium content, AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch. 
{{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='AMP sends the encrypted symmetric key from the document to the authorizer as a part of the user’s entitlements fetch.') }}
1.  The authorizer decides if the user has the correct permissions. If yes, the authorizer decrypts the document’s symmetric key with the authorizer’s private key from their public/private key pair. Then the authorizer returns the document key to the [amp-subscriptions component logic](https://github.com/ampproject/amphtml/blob/main/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264).
{{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='AMP logic decrypts the keys.') }}
1.  AMP decrypts the premium content with the document key and shows it to the user!
{{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='AMP decrypts the premium content with the document key and shows it to the user.') }}

# Implementation steps

Follow the steps below to integrate AMP encryption handling with your internal entitlements server. 

## Step 1: Create a public/private key pair

To encrypt the document’s symmetric key, you need to have your own public/private key pair. The public-key encryption is a [hybrid encryption](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) protocol, specifically a [P-256 Elliptic Curve](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)) ECIES asymmetric encryption method with an [AES-GCM](https://tools.ietf.org/html/rfc5288) (128-bit) symmetric encryption method. 

We require public key handling to be done with [Tink](https://github.com/google/tink) using [this asymmetric key type](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). To create your private-public key pair, use either of the following:

*   Tink’s [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) class
*   [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (Tink’s key utility tool)

Both support key rotation. Implementing key rotation limits vulnerability to a compromised private key.

To help you get started in creating asymmetric keys, we created [this script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). It:

1.  Creates a new ECIES with AEAD key. 
1.  Outputs the public key in plaintext to an output file.
1.  Outputs the private key to another output file.
1.  Encrypts the generated private key using a key hosted on Google Cloud (GCP) before writing to the output file, (commonly referred to as [Envelope Encryption](https://cloud.google.com/kms/docs/envelope-encryption)).

We require storing/publishing your public [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) in [JSON format](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). This allows other AMP provided tools to work seamlessly. Our script already outputs the public key in this format.

## Step 2: Encrypt articles

Decide if you will manually encrypt premium content, or automatically encrypt premium content. 

### Manually Encrypt 

We require [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) symmetric method using Tink to encrypt premium content. The symmetric document key used to encrypt the premium content should be unique for each document. Add the document key to a JSON object that contains the key in base64-encoded plaintext, as well as the SKUs required to access the document’s encrypted content. 

The JSON object below contains an example of the key in base64-encoded plaintext and the SKU. 

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Encrypt the above JSON object using the public key generated in Create a Public/Private Key Pair. 

Add the encrypted result as the value to the key `"local"`. Place the key-value pair within a JSON object wrapped inside a `<script type="application/json" cryptokeys="">` tag. Place the tag in the head of the document. 

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

You are required to encrypt the document key with the local environment and [Google’s public key](https://news.google.com/swg/encryption/keys/prod/tink/public_key). Including Google’s public key allows Google AMP cache to serve your document. You must instantiate a [Tink Keyset](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) to accept the Google public key from it’s URL: 

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

Google’s public key is a [Tink Keyset](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) in [JSON format](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). See [here](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) for an example of working with this keyset.

Read-on: [See an example of a working encrypted AMP document.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Auto Encrypt

Encrypt document using our [script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). The script accepts an HTML document and encrypts all contents inside of `<section subscriptions-section="content" encrypted>` tags. Using the public keys located at the URLs passed to it, the script encrypts the document key that is created by the script. Using this script ensures that all content is encoded and formatted correctly for serving. See [here](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) for further instructions on using this script.

## Step 3: Integrate authorizer

You need to update your authorizer to decrypt document keys when a user has the correct entitlements. The amp-subscriptions component automatically sends the encrypted document key to the `"local"` authorizer through a [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70) URL parameter. It performs:

1.  Parsing the document key from the `"local"` JSON key field.
1.  Document decryption.

You must use Tink to decrypt document keys in your authorizer. To decrypt with Tink, instantiate a [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) client using the private keys generated in the Create a Public/Private Key Pair section. Do this upon server startup for optimal performance. 

Your HybridDecrypt/Authorizer deployment should roughly match your key rotation schedule. This creates availability of all generated keys to the HybridDecrypt client.

Tink has extensive [documentation](https://github.com/google/tink/tree/master/docs) and [examples](https://github.com/google/tink/tree/master/examples) in C++, Java, Go, and Python to help you get started on your server-side implementation.

### Request management

When a request comes to your authorizer:

1.  Parse the entitlements pingback URL for the “crypt=” parameter.
1.  Decode the "crypt=” parameter value with base64. The value stored in the URL parameter is the base64-encoded encrypted JSON object.
1.  Once the encrypted key is in it’s raw bytes form, use HybridDecrypt’s decrypt function to decrypt the key using your private key.
1.  If decryption is successful, parse the result into a JSON object.
1.  Verify the user’s access to one of the entitlements listed in the AccessRequirements JSON field.
1.  Return the document key from the “Key” field of the decrypted JSON object in the entitlements response. Add the decrypted document key in a new field entitled “decryptedDocumentKey” in the entitlements response. This grants access to the AMP framework.

The sample below is a pseudo-code snippet that outlines the description steps above: 

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



# Related resources

Check out the documentation and examples found on the [Tink Github page](https://github.com/google/tink). 

All helper scripts are in the [subscriptions-project/encryption Github repo](https://github.com/subscriptions-project/encryption).


# Further support

For any questions, comments, or concerns, please file a [Github Issue](https://github.com/subscriptions-project/encryption/issues).
