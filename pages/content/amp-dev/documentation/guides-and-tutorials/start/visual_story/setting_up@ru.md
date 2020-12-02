---
"$title": Подготовка
"$order": '1'
description: Подготовка среды разработки, шаг 1. Скачайте код. Скачайте код примера для данного урока либо в виде ZIP-файла, либо через git...
author: bpaduch
---

## Предварительные требования

Чтобы завершить этот урок, вам понадобятся:

- Базовые знания HTML, CSS и JavaScript
- Базовое понимание основных концепций AMP (см. урок [Преобразование HTML в AMP](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- Браузер (на ваш выбор)
- Текстовый редактор (на ваш выбор)

## Подготовка среды разработки

#### Шаг 1. Скачайте код

1. Скачайте код для данного урока, упакованный в виде zip-файла, со следующего URL-адреса: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Распакуйте содержимое zip-файла. В каталоге **amp-pets-story** находятся изображения, видео, аудио и файлы данных, которые мы будем использовать для создания нашей истории. Файл **pets.html** — это стартовая точка нашей истории. Полную версию истории можно найти в файле [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Шаг 2. Запустите страницу-пример

Чтобы протестировать историю-пример, ее файлы необходимо открывать с веб-сервера. Существует несколько способов создать временный локальный веб-сервер для тестирования. Вот несколько вариантов; выберите тот, который вам лучше всего подходит:

- [Приложение «Web Server for Chrome» для Google Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Локальный HTTP-сервер на Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

После настройки локального веб-сервера посмотрите, как наша завершенная веб-история будет выглядеть в конце этого урока, перейдя по следующему <a href="http://localhost:8000/pets-completed.html">URL-адресу</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **ВАЖНО! ** Убедитесь, что URL-адрес выдается с `localhost`; в противном случае веб-история может загружаться неправильно, и вы можете столкнуться с ошибками, например с такими, как: `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` [/tip]

Просмотрите готовую историю, чтобы получить представление о том, что мы будем создавать.
