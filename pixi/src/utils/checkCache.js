const KEY_PREFIX = 'pixi';

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  setItem(key, value) {
    this.store.set(key, value);
  }

  getItem(key) {
    return this.store.get(key) || null;
  }
}

class CheckCache {
  constructor(window) {
    if (window) {
      this.storage = window.sessionStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  setItem(key, value) {
    this.storage.setItem(`${KEY_PREFIX}-${key}`, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(this.storage.getItem(`${KEY_PREFIX}-${key}`));
  }
}

export default CheckCache;
