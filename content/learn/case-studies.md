---
$title: Case Studies
$order: 5
$path: /case-studies/
class: case-studies
---

<div class="card-container">
    {% for item in g.collection(doc.collection.pod_path + '/' + doc.base).docs(recursive=false, locale=doc.locale)|reverse %}
    {% if loop.index0 == 0 %}
    <div class="card wide">
        <div class="card__image">
        <a href="{{item.url.path}}">
        {% if item.featured %}
            <amp-img width="800" height="1371" layout="responsive" src="/static/img/{{item.featured}}">
        {% else %}
            <amp-img height="190" width="297" layout="responsive" src="/static/img/{{item.thumb}}">
        {% endif %}
        </a>
        </div>
        <div class="card__content">
        {% if item.logo %}
        <div class="logos">
          <amp-img layout="flex-item" src="/static/img/logo-blue.svg" width="66" height="28"></amp-img>
          <span>+</span>
          <amp-img layout="flex-item" src="/static/img/{{item.logo.src}}" width="{{item.logo.width}}" height="{{item.logo.height}}"></amp-img>
        </div>
        {% endif %}
        <a href="{{item.url.path}}"><h4 class="card__title">{{_(item.headline or item.title)}}</h4></a>
        <p>{{item.date}}</p>
        <p>{{item.description}}</p>
        <div class="card__action">
        <a href="{{item.url.path}}">Read the case study</a>
        </div>
        </div>
    </div>
    {% else %}
    <div class="card">
        <div class="card__image">
        <a href="{{item.url.path}}"><amp-img height="614" width="1102" layout="responsive" src="/static/img/{{item.thumb}}"></a>
        </div>
        <div class="card__content">
        <a href="{{item.url.path}}"><h4 class="card__title">{{_(item.headline or item.title)}}</h4></a>
        <p>{{item.date}}</p>
        </div>
        <div class="card__action">
        <a href="{{item.url.path}}">Read the case study</a>
        </div>
    </div>
    {% endif %}
    {% endfor %}
</div>