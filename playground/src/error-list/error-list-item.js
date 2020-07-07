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

import events from '../events/events.js';
import * as Editor from '../editor/editor.js';

import template from './error-list-item.hbs';

export function createErrorListItem(target, error) {
  return new ErrorListItem(target, error);
}

class ErrorListItem {
  /**
   * @param {Element} target  Where the item gets appended to
   * @param {Object} details Holds information about the error
   */
  constructor(target, details) {
    this.details = details;

    this.element = target.appendChild(this._render());
    this.element.addEventListener('click', this._onClick.bind(this));
  }

  /**
   * Renders template with the information given in details
   * @return {Element}
   */
  _render() {
    const element = document.createElement('template');
    element.innerHTML = template(this.details);

    return element.content.firstChild;
  }

  _onClick(e) {
    e.preventDefault();
    events.publish(
      Editor.EVENT_UPDATE_CURSOR_FOCUS,
      this.details.line,
      this.details.col
    );
  }
}
