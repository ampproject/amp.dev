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
import params from '../params/base.js';

const DEFAULT_TITLE = 'untitled';

class TitleUpdater {
  constructor(win) {
    this.win = win;
    this.originalTitle = win.document.title;
    this.titleLabel = win.document.getElementById('document-title');
  }

  update(text) {
    this.win.requestIdleCallback(() => {
      const match = text.match(/<title[^>]*>([^<]+)<\/title>/im);
      const snippetTitle = match ? match[1] : this.extractTitleFromUrl_();

      if (this.titleLabel) {
        this.titleLabel.textContent = snippetTitle;
        this.titleLabel.classList.toggle('hidden', false);
      }

      this.win.document.title = snippetTitle + ' - ' + this.originalTitle;
    });
  }

  extractTitleFromUrl_() {
    let string = params.get('url', '');
    if (!string) {
      return DEFAULT_TITLE;
    }

    string = new URL(string).pathname;
    string = this.stripTrailingSlash_(string);
    string = this.baseName_(string);
    string = this.stripFileExtension_(string);
    string = string.replace(/_/g, ' ');
    string = decodeURIComponent(string);
    string = string.replace(/%27/g, "'");
    return string;
  }

  stripTrailingSlash_(string) {
    if (!string.endsWith('/')) {
      return string;
    }
    return string.substring(0, string.length - 1);
  }

  baseName_(string) {
    const index = string.lastIndexOf('/');
    if (index === -1) {
      return string;
    }
    return string.substring(index + 1);
  }

  stripFileExtension_(string) {
    const index = string.lastIndexOf('.');
    if (index === -1) {
      return string;
    }
    return string.substring(0, index);
  }
}

export default new TitleUpdater(window);
