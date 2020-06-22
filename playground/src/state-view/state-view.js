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

import JSONTreeView from 'json-tree-view';
import 'json-tree-view/example/build/devtools.css';
import './state-view.scss';
import events from '../events/events.js';
import * as Button from '../button/button.js';
import * as Preview from '../preview/preview.js';
import FlyIn from '../fly-in/base.js';

export function createStateView(target, trigger) {
  return new StateView(target, trigger);
}

export const EVENT_AMP_BIND_REQUEST_STATE = 'event-amp-bind-request-state';

class StateView extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.requestState.bind(this));

    // Content container
    this.stateView = document.createElement('div');
    this.stateView.className = 'state-view';

    // Set treeview for state
    this.treeView = new JSONTreeView('', {});
    this.treeView.showCountOfObjectOrArray = false;
    this.treeView.readonly = true;
    this.treeView.expand(true);

    // configure amp-state listener
    events.subscribe(Preview.EVENT_AMP_BIND_READY, (stateResult) => {
      window.requestIdleCallback(() => {
        if (!stateResult) {
          this.trigger.disable();
        } else {
          this.trigger.enable();
        }
      });
    });

    events.subscribe(Preview.EVENT_AMP_BIND_NEW_STATE, (state) => {
      this.setStateViewContent(state);
    });
  }

  requestState() {
    events.publish(EVENT_AMP_BIND_REQUEST_STATE);
    this.content.classList.add('loading');
    this.upadateContent(this.stateView);
    this.toggle();
  }

  setStateViewContent(state) {
    this.content.classList.remove('loading');
    this.treeView.value = state;
    this.stateView.appendChild(this.treeView.dom);
    this.upadateContent(this.stateView);
  }
}
