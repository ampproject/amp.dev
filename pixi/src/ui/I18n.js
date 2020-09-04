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
    this.staticText = i18nConfig.staticText;
    this.statusBanners = JSON.parse(pixiContent[1]);
    this.recommendations = JSON.parse(pixiContent[2]);
    this.infoTexts = JSON.parse(pixiContent[3]);
  }

  /** @deprecated use getText instead */
  translate(originalString) {
    return originalString;
  }

  getText(textKey) {
    const keys = textKey.split('.');
    return keys.reduce(
      (node, key) => (node && node[key]) || '',
      this.staticText
    );
  }

  getRecommendation(recommendationId) {
    return this.recommendations[recommendationId];
  }

  getStatusBanner(statusBannerId) {
    return this.statusBanners[statusBannerId];
  }

  getInfoText(infoTextId) {
    return this.infoTexts[infoTextId];
  }
}

export default new I18n();
