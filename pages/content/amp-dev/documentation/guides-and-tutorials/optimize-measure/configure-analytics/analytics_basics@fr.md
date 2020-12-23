---
"$title": 'Analytics: principes de base'
"$order": '0'
description: 'AMP fournit deux composants pour répondre à vos besoins d''analyse et de mesure: amp-pixel et amp-analytics. Les deux options envoient des données d''analyse à un point de terminaison défini.'
formats:
- websites
- stories
---

Commencez ici pour tout savoir sur les bases des analyses AMP.

## Utiliser amp-pixel ou amp-analytics ? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP fournit deux composants pour répondre à vos besoins d'analyse et de mesure : [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) et [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Ces deux options envoient les données d'analyse à un point de terminaison prédéfini.

Si vous recherchez des comportements comme un simple [pixel de suivi](https://en.wikipedia.org/wiki/Web_beacon#Implementation) le composant [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) fournit un suivi de base des vues de page ; les données sur les vues de page sont envoyées à une URL donnée. Certaines intégrations avec un fournisseur peuvent appeler ce composant, auquel cas elles indiqueront le point de terminaison exact de l'URL.

Pour la plupart des solutions d'analyse, utilisez [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Le suivi des vues de page fonctionne également avec [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Ce composant vous permet aussi de suivre l'engagement des utilisateurs avec n'importe quel type de contenu sur les pages, y compris les clics sur des liens et des boutons. [filter formats="websites"] Vous pouvez également mesurer jusqu'où l'utilisateur a fait défiler la page, savoir s'il a interagi ou non avec des réseaux sociaux et bien plus encore. [/filter] [filter formats="stories"] Vous pouvez aussi voir jusqu'où l'utilisateur est allé dans une story et s'il a utilisé les éléments interactifs. [/filter]

[tip type="read-on"] Voir [Analyses AMP: approfondissement](../../../../documentation/components/reference/amp-analytics.md). [/tip]

Dans le cadre de l'intégration avec la plateforme AMP, des fournisseurs ont proposé des configurations [`amp-analytics`](../../../../documentation/components/reference/amp-pixel.md) prédéfinies, de sorte à faciliter l'enregistrement des données et leur transmission à leurs outils de suivi. Accédez à la documentation des fournisseurs depuis la liste [Fournisseurs d'analyses](../../../../documentation/components/reference/amp-analytics.md).

Dans vos pages, vous pouvez utiliser à la fois [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) et [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md): <a><code>amp-pixel</code></a> pour un simple suivi des vues de page et <a><code>amp-analytics</code></a> pour tout le reste. Vous pouvez également ajouter chaque balise plusieurs fois. Si vous travaillez avec plusieurs fournisseurs de solutions d'analyse, vous aurez besoin d'une balise par solution. Rappelez-vous que plus les pages AMP sont simples, mieux c'est pour les utilisateurs. Donc si vous n'avez pas besoin de balises supplémentaires, ne les utilisez pas.

## Créer une configuration d'analyse simple

Apprenez à créer une configuration simple [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) et [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Configuration simple de <code>amp-pixel</code>

Pour créer une configuration simple de la balise <a><code>amp-pixel</code></a>, insérez un code du type suivant dans le corps de votre page AMP:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

Dans cet exemple, les données sur les vues de page sont envoyées à l'URL définie, accompagnées d'un numéro aléatoire. La variable <code>RANDOM</code> est l'une des nombreuses <a>variables de substitution de la plateforme AMP</a>. En savoir plus sur la [substitution des variables](../../../../documentation/components/reference/amp-analytics.md) ici.

Le composant [`amp-pixel`](../../../../documentation/components/reference/amp-analytics.md) étant intégré, vous n'avez pas besoin d'une déclaration d'inclusion comme avec les composants étendus d'AMP, notamment <a><code data-md-type="codespan">amp-analytics</code></a>. Vous devez néanmoins placer la balise [<code>amp-pixel</code>](../../../../documentation/components/index.html) aussi près que possible du début du corps de la page, c'est-à-dire de la balise <code><body></code>. En effet, le pixel de suivi ne se déclenche que lorsque la balise est affichée. Si la balise <a><code>amp-pixel</code></a> est positionnée près du bas de la page, il pourrait ne pas se déclencher.

### Configuration simple de <code>amp-analytics</code>

Pour créer une configuration simple de la balise [`amp-analytics`](../../../../documentation/components/reference/amp-pixel.md), vous devez d'abord inclure la déclaration <code>custom-element</code> après la balise <code><head></code> du document AMP (voir également <a>Déclaration d'inclusion de composant</a>) :

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

L'exemple suivant est similaire à <a>l'exemple de <code data-md-type="codespan">amp-pixel</code></a>. À chaque fois qu'une page est visible, l'événement est déclenché et envoie les données sur les vues de page à une URL définie, accompagnées d'un identifiant aléatoire:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

Dans l'exemple ci-dessus, nous avons défini une requête appelée pageview sur `https://foo.com/pixel?RANDOM`. Comme nous l'avons indiqué plus tôt, RANDOM est remplacé par un numéro aléatoire. La requête ressemblera donc à `https://foo.com/pixel?0.23479283687235653498734`.

Lorsque la page devient visible (tel que spécifié par l'utilisation du mot clé de déclenchement <code>visible</code>), un événement est déclenché et la requête `pageview` est envoyée. L'attribut triggers détermine à quel moment la requête pageview est déclenchée. En savoir plus sur les [requêtes et déclencheurs](../../../../documentation/components/reference/amp-analytics.md).

[filter formats="stories"]

## Configuration par défaut des stories AMP

L'expérience utilisateur typique des sites Web est différente de celle des stories. Sur un site Web, un utilisateur peut lire le titre, faire défiler la page jusqu'en bas, interagir avec un formulaire avant de cliquer sur un lien vers la page suivante. Les stories occupent la fenêtre complète et les utilisateurs utilisent le toucher plutôt que le défilement pour avancer.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

Beaucoup aimeraient mesurer chaque nouvelle [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) dans la story comme une nouvelle page vue parce que le contenu d'un écran à l'autre est sensiblement différent. Cependant, la page n'est qu'un élément d'une story complète - et un utilisateur a généralement besoin de voir de nombreuses pages d'une story pour avoir une idée complète de la story. Ainsi, la question de savoir comment nous comptons quelque chose d'aussi simple qu'une vue de page a d'énormes implications pour notre approche analytique.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

AMP Analytics facilite la mise en œuvre de ce qui précède à l'aide de n'importe quel fournisseur d'analyse. Par exemple, avec le [Global Site Tag](https://developers.google.com/gtagjs/) Google Analytics, l'on obtiendra l'extrait ci-dessous.

```html
<amp-analytics type="gtag" data-credentials="include">
 <script type="application/json">
  {
    "vars": {
      "gtag_id":"YOUR_GOOGLE_ANALYTICS_ID",
      "config": {
        "YOUR_GOOGLE_ANALYTICS_ID": {
          "groups":"default"
        }
      }
    },
    "triggers": {
      "storyProgress": {
        "on":"story-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_progress",
          "event_category":"${title}",
          "event_label":"${storyPageId}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      },
      "storyEnd": {
        "on":"story-last-page-visible",
        "vars": {
          "event_name":"custom",
          "event_action":"story_complete",
          "event_category":"${title}",
          "send_to": [
            "YOUR_GOOGLE_ANALYTICS_ID"
          ]
        }
      }
    }
  }
 </script>
</amp-analytics>
```

Cette configuration par défaut devrait vous donner une configuration de travail complète pour une story AMP.

Si vous souhaitez aller au-delà de ce que la configuration par défaut peut vous offrir, lisez [Analytics pour vos stories AMP](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg) pour trouver des cas d'utilisation plus avancés avec Google Analytics.

[/filter]

## Substitution des variables <a name="user-identification"></a>

Les composants [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) et [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) autorisent toutes les substitutions de variables d'URL standard (voir [Substitutions de variables HTML AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)). Dans l'exemple suivant, la demande de vue de page est envoyée à l'URL, avec l'URL canonique du document AMP actuel, son titre et un [ID client](analytics_basics.md#user-identification):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

En raison de sa simplicité, la balise [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) ne peut inclure que des variables définies par la plateforme ou que le runtime AMP peut analyser à partir de la page AMP. Dans l'exemple ci-dessus, la plateforme renseigne les valeurs pour `canonicalURL` et `clientId(site-user-id)`. La balise [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) peut inclure les mêmes variables que [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), ainsi que des variables définies de manière unique dans la configuration de la balise.

Utilisez le format `${varName}` dans une chaîne de requête pour une page ou une variable définie par la plateforme. La balise [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) remplacera le modèle par sa valeur réelle au moment de la construction de la demande d'analyse (voir également [Variables prises en charge dans `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Dans l'exemple suivant sur [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), la demande de vue de page est envoyée à l'URL, avec des données supplémentaires extraites des substitutions de variables, certaines étant fournies par la plateforme et d'autres définies en de façon intégrée, dans la configuration de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account":"ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Dans l'exemple ci-dessus, les variables `account` et `title` sont définis dans la configuration [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Les variables `canonicalUrl` et `clientId` ne sont pas définies dans la configuration, leurs valeurs sont donc remplacées par la plateforme.

[tip type="important"] **IMPORTANT - **La substitution des variables est flexible; vous pouvez définir les mêmes variables à différents emplacements, et le runtime AMP analysera les valeurs dans cet ordre de priorité (voir [Ordre de substitution des variables](deep_dive_analytics.md#variable-substitution-ordering) ). [/tip]

## Identification des utilisateurs <a name="user-identification"></a>

Les sites Web utilisent des cookies pour stocker des informations spécifiques sur un utilisateur dans le navigateur. Les cookies peuvent être utilisés pour indiquer qu'un utilisateur a déjà visité un site. Dans AMP, les pages peuvent être diffusées à partir du site Web d'un éditeur ou d'un cache (comme Google AMP Cache). Le site Web de l'éditeur et le cache sont susceptibles d'avoir des domaines différents. Pour des raisons de sécurité, les navigateurs peuvent (et vont souvent) limiter l'accès aux cookies d'un autre domaine (voir aussi [Suivi des utilisateurs selon les origines](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

Par défaut, AMP gère la fourniture d'un ID client, que la page soit accessible depuis le site Web d'origine de l'éditeur ou via un cache. L'ID client généré par AMP a une valeur de `"amp-"` suivi d'une chaîne aléatoire encodée en `base64` et reste le même pour l'utilisateur si ce même utilisateur visite à nouveau.

AMP gère la lecture et l'écriture de l'ID client dans tous les cas. Cela est particulièrement notable dans le cas où une page est diffusée via un cache ou affichée en dehors du contexte de visualisation du site d'origine de l'éditeur. Dans ce cas, l'accès aux cookies du site de l'éditeur n'est pas disponible.

Lorsqu'une page AMP est diffusée à partir du site d'un éditeur, le cadre d'ID client utilisé par AMP peut être informé d'un cookie de secours à rechercher et à utiliser. Dans ce cas, l'argument `cid-scope-cookie-fallback-name` de la variable `clientId` est interprété comme un nom de cookie. Le formatage peut apparaître sous la forme `CLIENT_ID(cid-scope-cookie-fallback-name)` ou `${clientId(cid-scope-cookie-fallback-name)}`.

Par exemple:

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

Si AMP constate que ce cookie est défini, la substitution d'ID client renverra la valeur du cookie. Si l'AMP trouve que ce cookie n'est pas défini, alors AMP générera une valeur de la forme `amp-` suivie d'une chaîne aléatoire encodée en base64.

En savoir plus sur la substitution d'ID client, y compris comment ajouter un ID de notification utilisateur facultatif, dans [Variables prises en charge dans l'analyse AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

En savoir plus: plus de détails sur l'analyse dans [AMP Analytics: approfondissement](deep_dive_analytics.md) et [les cas d'utilisation](use_cases.md).
