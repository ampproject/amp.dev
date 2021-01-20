---
"$title": Kurulum
"$order": '0'
description: 'Bu öğreticiye başlamadan önce aşağıdakilere ihtiyacınız olacak: - HTML, CSS ve JavaScript hakkında temel bilgi - Seçtiğiniz bir tarayıcı; - Bir metin editörü...'
"$parent": "/content/docs/interaction_dynamic/interactivity.md"
---

## Ön koşullar

Bu öğreticiye başlamadan önce aşağıdakilere ihtiyacınız olacak:

- HTML, CSS ve JavaScript hakkında temel bilgi
- Seçtiğiniz bir tarayıcı
- Seçtiğiniz bir metin editörü
- [Node.js ve NPM](https://docs.npmjs.com/getting-started/installing-node) makinenizde yüklü

## Geliştirme ortamınızı ayarlama

### 1. Adım. Kodu indirin

Öğreticinin başlangıç kodunu [ZIP dosyası](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip) olarak veya git aracılığıyla indirin:

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### 2. Adım Bağımlılıkları yükleyin

Arşiv dosyasını açın (gerekirse) ve dizine gidin. Bağımlılıkları `npm install` çalıştırarak yükleyin.

```shell
cd advanced-interactivity-in-amp
npm install
```

### 3. Adım Geliştirme sunucusunu çalıştırın

Geliştirme sunucusunu node.js ile başlatın:

```shell
node app.js
```

Ardından, web tarayıcınızda çalışan AMP sayfasını görmek için <a href="http://localhost:3000">http://localhost:3000</a> adresine gidin!
