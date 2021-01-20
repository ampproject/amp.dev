---
$title: Обеспечьте удаление шаблонного кода AMP
$order: 50
tags:
- lcp
---

Наибольший прирост производительности при использовании AMP-оптимизатора достигается за счет удаления шаблонного кода AMP. Однако выполнить это не всегда возможно, например при использовании компонента, блокирующего рендеринг, такого как [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites). Если использование [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) снижает производительность вашей страницы, рассмотрите возможность перейти на серверное A/B-тестирование. Если у вас возникают проблемы с порогами соответствия при использовании компонентов AMP и вам не удается найти альтернативы, создайте [задачу на GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type%3A+Page+experience&template=page-experience.md&title=Page+experience+issue), чтобы команда AMP могла вам помочь.
