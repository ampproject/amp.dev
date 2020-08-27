const DEFAULT_LANGUAGE = 'en';

class I18n {
  constructor() {
    this.language = DEFAULT_LANGUAGE;
    this.staticText = {};
    this.statusBanners = {};
    this.recommendations = {};
  }

  async init() {
    const pixiContent = await Promise.all([
      AMP.getState('pixi.i18n'),
      AMP.getState('pixiStatusBanners'),
      AMP.getState('pixiRecommendations'),
    ]);
    const i18nConfig = JSON.parse(pixiContent[0]);
    this.language = i18nConfig.language;
    this.staticText = i18nConfig.staticText;
    this.statusBanners = JSON.parse(pixiContent[1]);
    this.recommendations = JSON.parse(pixiContent[2]);
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
}

export default new I18n();
