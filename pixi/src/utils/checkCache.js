const KEY_PREFIX = 'pixi';

class CheckCache {
  constructor() {
    this.storage = window.sessionStorage;
  }

  setItem(key, value) {
    this.storage.setItem(`${KEY_PREFIX}-${key}`, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(this.storage.getItem(`${KEY_PREFIX}-${key}`));
  }
}

export default new CheckCache();
