---
$title: Case Studies
$order: 5
$path: /case-studies/
class: case-studies
---

Learn how publishers, platforms and vendors benefit from implementing AMP.

<div class="card-container">
    {% for item in g.collection(doc.collection.pod_path + '/' + doc.base).docs(recursive=false, locale=doc.locale) %}
    <div class="card">
        <div class="card__image">
        <a href="{{item.url.path}}"><amp-img height="190" width="297" layout="responsive" src="/static/img/{{item.thumb}}"></a>
        </div>
        <div class="card__content">
        <h4 class="card__title">{{item.headline or item.title}}</h4>
        <p>{{item.date}}</p>
        </div>
        <div class="card__action">
        <a href="{{item.url.path}}">Read the case study</a>
        </div>
    </div>
    {% endfor %}
</div>