---
'$title': Erstellen Sie ein Live-Blog
$order: 102
description: Live Blogs sind Webseiten, die ein aktuelles Ereignis wie eine Sportveranstaltung oder eine Wahl verfolgen und häufig aktualisiert werden. Mit AMP kannst du ein Live Blog implementieren, indem du ...
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - bpaduch
---

Live-Blogs sind Webseiten, die während eines laufenden Ereignisses, z. B. eines Sportereignisses oder einer Wahl, regelmäßig aktualisiert werden. In AMP können Sie mithilfe der [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) Komponente ein Live-Blog implementieren.

Dieses Tutorial bietet einen kurzen Überblick über die [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) Komponente und konzentriert sich auf einige Implementierungsdetails für Live-Blogs, wie [Paginierung](#pagination) und [Deep Linking](#deeplinking) . Wir werden das [Live-Blog-Beispiel](live_blog.md) von AMP By Example verwenden, um die Implementierung von Live-Blogs in AMP zu veranschaulichen.

[tip type="tip"] **TIP –** Use the [LiveBlogPosting](http://schema.org/LiveBlogPosting) metadata markup so your blog can be integrated with third-party platform features. [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Übersicht der `amp-live-list`

Die [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) Komponente fragt das Host-Dokument regelmäßig nach neuen Inhalten ab und aktualisiert den Browser des Benutzers, sobald neue Elemente verfügbar werden. Dies bedeutet, dass jedes Mal, wenn ein neuer Blog-Beitrag hinzugefügt werden muss, das Host-Dokument vom CMS aktualisiert werden sollte, um die Aktualisierung sowohl in den Hauptteil als auch in den [Metadatenabschnitt](../../../documentation/examples/documentation/Live_Blog.html#metadata) der Seite aufzunehmen.

So könnte der ursprüngliche Code für das Blog aussehen:

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Sehen wir uns diesen Code genauer an:

Jede Instanz der Komponente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) benötigt eine eindeutige ID, da mehrere solcher Komponenten auf einer Seite vorhanden sein könnten. In diesem Beispiel haben wir `my-live-list` als eindeutige ID angegeben.

Das Attribut `data-poll-interval` gibt an, wie oft Abfragen erfolgen sollen. Wenn das Host Dokument aktualisiert wird, sollte das Update dem Benutzer nach dem nächsten Zeitintervall zur Verfügung stehen.

Jedes Mal, wenn ein neues Element zum Host Dokument hinzugefügt wird, zeigt das Element `<button update on="tap:my-live-list.update">` den Button "You have updates" an, der beim Anklicken das Laden aktueller Posts auf der Seite auslöst.

Live Blogs können sehr groß werden und die Seite zu lang machen. Du kannst das Attribut `data-max-items-per-page` verwenden, um anzugeben, wie viele Elemente dem Live Blog hinzugefügt werden können. Wenn die Anzahl der Elemente nach der Aktualisierung `data-max-items-per-page` überschreitet, werden die ältesten Aktualisierungen, die über diesen Wert hinausgehen, entfernt. Wenn die Seite z. B. derzeit 9 Einträge hat, `data-max-items-per-page` auf 10 festgelegt ist und mit der letzten Aktualisierung 3 neue Einträge eintreffen, werden die beiden ältesten Einträge von der Seite mit der letzten Aktualisierung entfernt.

Alle Blogeinträge in [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) müssen dem Element `<div items></div>` untergeordnet sein. Da jeder Beitrag als Element gesehen wird, muss jedes Element eine eindeutige `id` und das Attribut `data-sort-time` haben.

## Implementierungsdetails

Nun, da du mit der Komponente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) vertraut bist, können wir die Implementierung eines komplexeren Live Blogs anschauen. Lies weiter, um mehr über die Implementierung von Paginierung und die Funktionsweise von Deep Linking zu erfahren.

### Seitennummerierung <a name="pagination"></a>

Die Performance langer Blogs kann mithilfe von Paginierung verbessert werden. Dabei wir die Anzahl der auf einer Seite angezeigten Blog Elemente begrenzt. Um die Paginierung zu implementieren, füge in der Komponente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) das Element `<div pagination></div>` hinzu und füge dann das für die Paginierung erforderliche Markup ein (z. B. eine Seitenzahl oder einen Link zur nächsten und vorherigen Seite).

Mit Paginierung wird der einfache Code, den wir bereits verwendet haben, zu:

```html
<amp-live-list
  id="my-live-list"
  data-poll-interval="15000"
  data-max-items-per-page="5"
>
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
    </nav>
  </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

Du bist dafür zuständig, die Navigationselemente korrekt zu füllen, indem du die gehostete Seite aktualisierst. Im [Beispiel für ein Live Blog](live_blog.md) rendern wir die Seite beispielsweise über ein serverseitiges Template und verwenden einen Abfrageparameter, um festzulegen, was das erste Blog Element auf der Seite sein soll. Wir beschränken den Umfang der Seite auf 5 Elemente. Wenn der Server also mehr als 5 Elemente generiert hat, wird einem Benutzer, der die Hauptseite aufruft, das Element "Weiter" im Navigationsbereich angezeigt. Weitere Informationen findest du unter [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Sobald die Menge der Blogbeiträge die von `data-max-items-per-page` festgelegte maximale Anzahl von Elementen überschreitet, werden die älteren Blogeinträge über den Link "Weiter"auf den nächsten Seiten angezeigt, zum Beispiel auf Seite 2. Da [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) den Server in Intervallen abfragt, um festzustellen, ob sich die Einträge geändert haben, ist es nicht notwendig, den Server abzufragen, wenn der Benutzer nicht auf der ersten Seite ist.

Du kannst das Attribut "disabled" zur gehosteten Seite hinzufügen, um den Abfragemechanismus zu verhindern. Im Beispiel für ein Live Blogs führen wir dieses Verhalten in einem serverseitigen Template aus. Wenn die angeforderte Seite nicht die erste ist, fügen wir das Attribut "disabled" zur Komponente [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) hinzu.

### Deep Linking <a name="deeplinking"></a>

Bei der Veröffentlichung eines Blogbeitrags ist es wichtig, einen Deep Link zum Beitrag erstellen zu können, um Funktionen wie das Teilen von Beiträgen zu ermöglichen. Mit [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) ist Deep Linking anhand der `id` des Blogelements möglich. So kannst du zum Beispiel mit [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) direkt zum Blogbeitrag mit der ID `post3` navigieren.

AMP By Example verwendet ein Cookie im [Beispiel für ein Live Blog](live_blog.md), um neue Inhalte zu generieren. Wenn du die Seite also zum ersten Mal aufrufst, ist der Beitrag mit der ID "post3" möglicherweise nicht verfügbar. In diesem Fall wirst du zum ersten Beitrag weitergeleitet.

## Ressourcen <a></a>

Oder sieh dir diese RTC Ressourcen an:

- Referenzdokumentation zu [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [Beispiel für ein Live Blog von AMP By Example](live_blog.md)
