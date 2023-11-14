---
'$title': Ajouter AMP aux e-mails existants
$order: 1
author: CrystalOnScript
formats:
  - email
---

Le format AMP pour e-mails est intégré en tant que nouveau composant MIME. Si votre e-mail est envoyé à un fournisseur prenant en charge AMP pour e-mails, il sera affiché; sinon, ne vous inquiétez pas! Le fournisseur affichera votre texte de secours au format HTML ou texte brut. Utilisez ce guide pour inclure AMP dans vos e-mails.

# Inclure la partie AMP MIME

L'e-mail est structuré comme une [arborescence MIME](https://en.wikipedia.org/wiki/MIME), qui contient le corps du message et les éventuelles pièces jointes. Pour inclure AMP dans vos e-mails, vous devrez ajouter une nouvelle partie MIME avec le type de contenu `text/x-amp-html`.

La partie AMP MIME doit être imbriquée sous un nœud `multipart/alternative` et placée près des parties `text/html` ou `text/plain` existantes. Cela garantit que l'e-mail sera affiché sur tous les clients.

```html
From: Person A
<persona@example.com>
  To: Person B
  <personb@example.com>
    Subject: An AMP email! Content-Type: multipart/alternative;
    boundary="001a114634ac3555ae05525685ae" --001a114634ac3555ae05525685ae
    Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes Hello
    World in plain text! --001a114634ac3555ae05525685ae Content-Type:
    text/x-amp-html; charset="UTF-8"

    <!DOCTYPE html>
    <html ⚡4email data-css-strict>
      <head>
        <meta charset="utf-8" />
        <style amp4email-boilerplate>
          body {
            visibility: hidden;
          }
        </style>
        <script async src="https://ampjs.org/v0.js"></script>
      </head>
      <body>
        Hello World in AMP!
      </body>
    </html>
    --001a114634ac3555ae05525685ae-- Content-Type: text/html; charset="UTF-8"

    <span>Hello World in HTML!</span>
    --001a114634ac3555ae05525685ae</personb@example.com
  ></persona@example.com
>
```

[tip type="important"] Certains clients de messagerie n'affichent que la dernière partie MIME. Pour vous assurer qu'un e-mail est affiché, placez la partie MIME `text/x-amp-html` \_avant \_la partie MIME `text/html`. [/tip]

# Que se passe-t-il lorsque les destinataires transfèrent ou répondent à un e-mail AMP?

Lorsqu'un utilisateur transfère ou répond à un e-mail AMP, la partie `text/x-amp-html` de l'arborescence MIME est supprimée. C'est pourquoi il est important de fournir un contenu alternatif dans la partie HTML, même lors de l'envoi d'e-mails AMP à des clients prenant en charge le type MIME.
