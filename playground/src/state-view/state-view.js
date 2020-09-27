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

import './state-view.scss';
import JSONTreeView from 'json-tree-view';
import 'json-tree-view/example/build/devtools.css';
import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Preview from '../preview/preview.js';
import FlyIn from '../fly-in/fly-in.js';

export function createStateView(target, trigger) {
  if (!target) return;
  return new StateView(target, trigger);
}

export const EVENT_AMP_BIND_REQUEST_STATE = 'event-amp-bind-request-state';

class StateView extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.requestState.bind(this));

    // Set treeview for state
    this.treeView = new JSONTreeView('', {});
    this.treeView.showCountOfObjectOrArray = false;
    this.content.appendChild(this.treeView.dom.querySelector('.children'));

    /**
     * Disabled on IE11
     * Listen for state changes in tree view and hand hand them over to highlightChanges()
     */
    if (document.evaluate) {
      this.treeView.on('change', (self, key) => {
        this.highlightChanges(key);
      });
    }

    // configure amp-state listener
    events.subscribe(Preview.EVENT_AMP_BIND_READY, (state) => {
      window.requestIdleCallback(() => {
        if (!state) {
          this.trigger.disable();
        } else {
          this.trigger.enable();
        }
      });
    });

    events.subscribe(Preview.EVENT_AMP_BIND_NEW_STATE, (state) => {
      this.render(state);
    });
  }

  requestState() {
    this.content.classList.add('loading');
    events.publish(EVENT_AMP_BIND_REQUEST_STATE);
    this.toggle();
  }

  /**
   * Run highlight animation on updated tree view dom elements
   * @param  {Array} key     Array of keys in tree view that have changed
   */
  highlightChanges(key) {
    key.shift();
    if (!key.length) {
      return;
    }

    const highlightedItems = this.content.querySelectorAll('.highlight');
    for (const item of highlightedItems) {
      item.classList.remove('highlight');
    }

    let expression = ``;
    for (let i = 0; i < key.length; i++) {
      const selector = key[i];

      expression += `//div[. = '${selector}']/..`;

      if (i != key.length - 1) {
        expression += `/div[@class='children']`;
      }
    }

    const treeRoot = this.content.querySelector('.children');
    const highlight = document.evaluate(
      expression,
      treeRoot,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    if (highlight.singleNodeValue) {
      highlight.singleNodeValue.classList.add('highlight');
    }
  }

  render(state) {
    this.content.classList.remove('loading');
    this.treeView.value = state;
    this.treeView.refresh();
    this.treeView.expand(true);
    this.treeView.readonly = true;
  }
}
