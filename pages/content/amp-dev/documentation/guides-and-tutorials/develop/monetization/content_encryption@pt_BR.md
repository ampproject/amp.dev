---
formats:
  - websites
'$title': Proteja o conteúdo de suas assinaturas com criptografia lado-cliente
'$titles':
  teaser: Protect your subscription content with client-side encryption.
$order: 10
description: Solucione problemas de criptografia de conteúdo implementando validação de assinante premium e descriptografia de conteúdo no lado do cliente. Com esta solução, usuários com acesso premium poderão descriptografar conteúdo sem precisar carregar uma nova página ou esperar a resposta do back-end!
author: CrystalOnScript
---

Se você for uma publicação on-line, você provavelmente depende de assinantes para obter receita. Você talvez bloqueie o conteúdo premium atrás de um paywall no cliente usando [obfuscação de CSS](https://medium.com/paywall-hacks/how-to-bypass-virtually-every-news-paywall-705602c4c2ce) (`display: none`).

{{ image('/static/img/docs/guides/cse/cse1.jpg', 541, 270, align='', layout='intrinsic', alt='Premium content is hidden until users are authenticated.') }}

Infelizmente, pessoas mais experientes em tecnologia podem facilmente contornar esse bloqueio.

Como alternativa, você pode estar mostrando aos usuários um documento que não possui nenhum conteúdo premium e mostrar uma página totalmente nova apenas quando o back-end validar o usuário. Embora esta seja uma solução mais segura, é um método que custa tempo, recursos e felicidade do usuário.

Resolva esses dois problemas implementando a validação de assinante premium e a descriptografia de conteúdo no lado do cliente. Com esta solução, usuários com acesso premium poderão descriptografar conteúdo sem precisar carregar uma nova página ou esperar a resposta do back-end!

# Visão geral da configuração

Para implementar a descriptografia do lado do cliente, você combinará criptografia de chave simétrica com criptografia de chave pública da seguinte maneira:

1. Crie uma chave simétrica aleatória para cada documento, concedendo a cada documento uma chave _unívoca_. {{ image('/static/img/docs/guides/cse/cse2.jpg', 259, 232, align='', layout='intrinsic', alt='Chaves unívocas para cada documento único.') }}
2. Criptografe o conteúdo premium com a chave simétrica do documento. {{ image('/static/img/docs/guides/cse/cse3.jpg', 130, 243, align='', layout='intrinsic', alt='Use a chave do documento para criptografar o conteúdo premium.') }} A chave é simétrica para permitir que a mesma chave criptografe e descriptografe o conteúdo. {{ image('/static/img/docs/guides/cse/cse4.jpg', 188, 141, align='', layout='intrinsic', alt='A mesma chave que criptografa o documento também o descriptografa.') }}
3. Criptografe a chave do documento com uma chave pública, usando um protocolo de [criptografia híbrida](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) para criptografar as chaves simétricas. {{ image('/static/img/docs/guides/cse/cse5.jpg', 309, 114, align='', layout='intrinsic', alt='Um protocolo de criptografia híbrida criptografa a chave simétrica com uma chave pública.') }}
4. Usando o(s) componente(s) [`<amp-subscriptions>`](https://amp.dev/documentation/components/amp-subscriptions/) e/ou [`<amp-subscriptions-google>`](https://amp.dev/documentation/components/amp-subscriptions-google/?format=websites), armazene a chave do documento criptografado dentro do documento AMP, juntamente com o conteúdo premium criptografado. {{ image('/static/img/docs/guides/cse/cse6.jpg', 264, 261, align='', layout='intrinsic', alt='Ambas as chaves são armazenadas dentro do documento AMP.') }}

O documento AMP armazena a chave criptografada nele mesmo. Isto evita a dissociação do documento criptografado com a chave que o decodifica.

# Como funciona?

1. O AMP processa a chave a partir do conteúdo criptografado no documento que o usuário acessa. {{ image('/static/img/docs/guides/cse/cse7.jpg', 115, 94, align='', layout='intrinsic', alt='As criptografias de chave pública e simétrica.') }}
2. Ao servir o conteúdo premium, o AMP envia a chave simétrica criptografada do documento ao mecanismo de autorização como parte da obtenção das permissões do usuário.{{ image('/static/img/docs/guides/cse/cse8.jpg', 150, 251, align='', layout='intrinsic', alt='O AMP envia a chave simétrica criptografada do documento ao mecanismo de autorização como parte da obtenção das permissões do usuário') }}
3. O mecanismo de autorização decide se o usuário tem as permissões corretas. Se sim, o mecanismo de autorização descriptografa a chave simétrica do documento com a chave privada do mecanismo de autorização, obtido do seu par de chaves pública/privada. Em seguida, o mecanismo de autorização retorna a chave do documento para a [lógica do componente amp-subscriptions](https://github.com/ampproject/amphtml/blob/master/extensions/amp-subscriptions/0.1/amp-subscriptions.js#L264). {{ image('/static/img/docs/guides/cse/cse9.jpg', 237, 244, align='', layout='intrinsic', alt='A lógica AMP descriptografa as chaves.') }}
4. O AMP descriptografa o conteúdo premium com a chave do documento e mostra ao usuário! {{ image('/static/img/docs/guides/cse/cse10.jpg', 250, 319, align='', layout='intrinsic', alt='O AMP descriptografa o conteúdo premium com a chave do documento e mostra ao usuário.') }}

# Passo-a-passo da implementação

Siga os passos abaixo para integrar a manipulação de criptografia AMP ao seu servidor interno de permissões.

## Passo 1: Crie um par de chaves pública/privada

Para criptografar a chave simétrica do documento, você precisa ter seu próprio par de chaves pública/privada. A criptografia de chave pública é um protocolo de [criptografia híbrida](https://en.wikipedia.org/wiki/Hybrid_cryptosystem), especificamente um método de criptografia assimétrica ECIES [Curva elíptica P-256](<https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)>) com um método de criptografia simétrica [AES-GCM](https://tools.ietf.org/html/rfc5288) (128 bits).

É necessário que o tratamento de chaves públicas seja feito com [Tink](https://github.com/google/tink) usando [este tipo de chave assimétrica](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/vendor/github.com/google/tink/go/hybrid/hybrid_key_templates.go#L32). Para criar seu par de chaves pública-privada, use uma das opções a seguir:

- A classe [KeysetManager](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/KeysetManager.java) do Tink
- [Tinkey](https://github.com/google/tink/blob/master/docs/TINKEY.md) (ferramenta utilitária do Tink para geração de chaves)

Ambos suportam rotação de chaves. A implementação da rotação de chaves limita a vulnerabilidade de uma chave privada comprometida.

Para ajudá-lo a criar chaves assimétricas, criamos [este script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/gcp_key_gen). Ele:

1. Cria um novo ECIES com chave AEAD.
2. Gera uma chave pública em texto comum e grava num arquivo de saída.
3. Gera uma chave privada e grava noutro arquivo de saída.
4. Criptografa a chave privada gerada usando uma chave hospedada no Google Cloud (GCP) antes de gravar no arquivo de saída (isto é geralmente chamado de [Criptografia de Envelope](https://cloud.google.com/kms/docs/envelope-encryption)).

É necessário armazenar/publicar seu [Conjunto de Chaves Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) público em [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Isto permite que outras ferramentas fornecidas pela AMP funcionem sem interrupções. Nosso script já gera a chave pública nesse formato.

## Passo 2: Criptografe os artigos

Decida se você prefere criptografar manualmente ou automaticamente o conteúdo premium .

### Criptografia manual

É necessário usar o método simétrico [AES-GCM 128](https://en.wikipedia.org/wiki/Galois/Counter_Mode) com o Tink para criptografar conteúdo premium. A chave simétrica do documento, usada para criptografar o conteúdo premium, deve ser exclusiva para cada documento. Adicione a chave do documento a um objeto JSON que contenha a chave em formato texto simples codificado em base64, bem como os SKUs necessários para acessar o conteúdo criptografado do documento.

O objeto JSON abaixo contém um exemplo da chave em formato texto simples codificado em base64 e do SKU.

```
{
  AccessRequirements: ['thenewsynews.com:premium'],
  Key: 'aBcDef781-2-4/sjfdi',
}
```

Criptografe o objeto JSON acima usando a chave pública gerada em Crie um par de chaves pública/privada.

Adicione o resultado criptografado como valor da chave `"local"`. Coloque o par chave-valor em um objeto JSON empacotado dentro de uma tag `<script type="application/json" cryptokeys="">`. Coloque a tag no head do documento.

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

Você precisa criptografar a chave do documento com o ambiente local e [a chave pública Google](https://news.google.com/swg/encryption/keys/prod/tink/public_key). A inclusão da chave pública Google permite que o cache de AMP do Google sirva seu documento. Você deve instanciar um [Conjunto de chaves Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) para aceitar a chave pública Google da sua URL:

`https://news.google.com/swg/encryption/keys/prod/tink/public\_key`

A chave pública Google é um [Conjunto de chaves Tink](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/proto/tink.proto#L131) em [formato JSON](https://github.com/google/tink/blob/2f3e0a64258060d4f7501aa6460fdefbf6c9ba2b/go/keyset/json_io.go). Veja [aqui](https://github.com/subscriptions-project/encryption/blob/617f0911c9870dae900a232e2dc8ee9196677a89/golang/pkg/encryption/encryption.go#L83) um exemplo de como trabalhar com esse conjunto de chaves.

Leia mais: [Veja um exemplo de um documento AMP criptografado em funcionamento.](https://github.com/subscriptions-project/scenic-demo/blob/master/app/views/article-amp.html)

### Criptografia automática

Criptografe o documento usando nosso [script](https://github.com/subscriptions-project/encryption/tree/master/golang/cmd/encrypt). O script aceita um documento HTML e criptografa todo o conteúdo dentro das tags `<section subscriptions-section="content" encrypted>`. Usando as chaves públicas localizadas nas URLs passadas para ele, o script criptografa a chave do documento que é criada pelo script. O uso desse script garante que todo o conteúdo seja codificado e formatado corretamente para ser servido. Veja [aqui](https://github.com/subscriptions-project/encryption/blob/master/golang/cmd/encrypt/README.md) para mais instruções sobre como usar este script.

## Passo 3: Integre o mecanismo de autorização

Você precisa atualizar seu mecanismo de autorização para descriptografar as chaves do documento quando um usuário possuir as permissões corretas. O componente amp-subscriptions envia automaticamente a chave do documento criptografado para o mecanismo de autorização `"local"` através de um parâmetro de URL [“crypt=”](https://github.com/ampproject/amphtml/blob/4ebe3df7afb0a6d054bccfd6800421a149a20d55/extensions/amp-subscriptions/0.1/local-subscription-platform-remote.js#L70). Ele faz o seguinte:

1. Processa a chave do documento obtida do campo JSON `"local"`.
2. Decodifica o documento.

Você deve usar o Tink para decodificar as chaves do documento no seu mecanismo de autorização. Para decodificar com o Tink, instancie um cliente [HybridDecrypt](https://github.com/google/tink/blob/master/java/src/main/java/com/google/crypto/tink/HybridDecrypt.java) usando as chaves privadas geradas na seção Crie um par de chaves pública/privada. Faça isto na inicialização do servidor para o melhor desempenho.

Sua implantação do HybridDecrypt/Mecanismo de Autorização deve corresponder aproximadamente ao seu cronograma de rotação de chaves. Isso garante a disponibilidade de todas as chaves geradas para o cliente HybridDecrypt.

Tink possui ampla [documentação](https://github.com/google/tink/tree/master/docs) e [exemplos](https://github.com/google/tink/tree/master/examples) em C++, Java, Go e Javascript para lhe ajudar a começar com sua implementação lado-servidor.

### Gestão de solicitações

Quando uma solicitação chega ao seu mecanismo de autorização:

1. Analise a URL de pingback de permissões para extrair dados do parâmetro "crypt="
2. Decodifique o valor do parâmetro "crypt=” usando base64. O valor armazenado no parâmetro da URL é o objeto JSON criptografado e codificado em base64.
3. Depois que a chave criptografada estiver no formato de bytes brutos, use a função decrypt do HybridDecrypt para descriptografar a chave usando sua chave privada.
4. Se a descriptografia ocorrer com sucesso, faça o processamento do resultado como um objeto JSON.
5. Verifique o acesso do usuário a uma das permissões listadas no campo JSON AccessRequirements.
6. Retorne a chave do documento obtida no campo "Key" do objeto JSON descriptografado, na sua resposta de permissões. Adicione a chave do documento descriptografada em um novo campo intitulado "decryptedDocumentKey" na resposta de permissões. Isto garante o acesso ao framework AMP.

O exemplo abaixo é um trecho de pseudo-código que descreve as etapas detalhadas acima:

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

Confira a documentação e exemplos encontrados na [página Github do Tink](https://github.com/google/tink).

Todos os scripts auxiliares estão no [repositório GitHub subscriptions-project/encryption](https://github.com/subscriptions-project/encryption).

# Suporte adicional

Para qualquer dúvida, comentário ou outras questões, por favor registre um [Issue no Github](https://github.com/subscriptions-project/encryption/issues).
