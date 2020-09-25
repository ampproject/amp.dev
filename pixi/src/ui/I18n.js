// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import marked from 'marked';

const DEFAULT_LANGUAGE = 'en';

class I18n {
  constructor() {
    this.language = DEFAULT_LANGUAGE;
    this.staticText = {};
    this.statusBanners = {};
    this.recommendations = {};
    this.infoTexts = {};
  }

  async init() {
    let pixiContent = [];
    try {
      pixiContent = await Promise.all([
        AMP.getState('pixi.i18n'),
        AMP.getState('pixiStatusBanners'),
        AMP.getState('pixiRecommendations'),
        AMP.getState('pixiInfoTexts'),
      ]);
    } catch (e) {
      console.error('Failed to initialize translations', e);
    }

    const i18nConfig = JSON.parse(pixiContent[0]);
    this.language = i18nConfig.language;
    this.scriptText = i18nConfig.scriptText;
    this.statusBanners = JSON.parse(pixiContent[1]);
    this.recommendations = JSON.parse(pixiContent[2]);
    this.infoTexts = JSON.parse(pixiContent[3]);
  }

  getText(textKey) {
    const keys = textKey.split('.');
    return keys.reduce(
      (node, key) => (node && node[key]) || '',
      this.scriptText
    );
  }

  getRecommendation(recommendationId) {
    return this.recommendations[recommendationId];
  }

  getSortedRecommendations(recommendations) {
    const result = [];
    for (const item of recommendations) {
      const id = item.id;
      const recommendation = this.getRecommendation(id);
      if (recommendation) {
        result.push(
          Object.assign({}, item, recommendation, {
            body: recommendation.body || marked(item.description),
          })
        );
      } else {
        console.error('Unable to find recommendation text', id);
      }
    }
    result.sort((a, b) => a.order - b.order);
    return result;
  }

  getStatusBanner(statusBannerId) {
    return this.statusBanners[statusBannerId];
  }

  getInfoText(infoTextId) {
    return this.infoTexts[infoTextId];
  }

  getLanguage() {
    return this.language;
  }
}

export default new I18n();
