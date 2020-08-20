const DEFAULT_LANGUAGE = 'en';

class I18n {
  constructor() {
    this.language = DEFAULT_LANGUAGE;
    this.translations = {};
  }

  async init() {
    try {
      const i18nConfig = JSON.parse(await AMP.getState('pixi.i18n'));
      this.language = i18nConfig.language;
      this.translations = i18nConfig.translations;
    } catch (e) {
      console.warn(
        'Could not get translations from amp-state. Falling back to original strings',
        e
      );
    }
  }

  translate(originalString) {
    const translation = this.translations[originalString];
    if (!translation && IS_DEVELOPMENT) {
      // Mark untranslated strings during development
      return `[${this.language}] ${originalString}`;
    }

    return translation || originalString;
  }
}

export default new I18n();
