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
    const pixiContent = await Promise.all([
      AMP.getState('pixi.i18n'),
      AMP.getState('pixiStatusBanners'),
      AMP.getState('pixiRecommendations'),
      AMP.getState('pixiInfoTexts'),
    ]);
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
        const {body, ...props} = recommendation;
        result.push({
          id,
          body: body || item.description,
          ...props,
        });
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
