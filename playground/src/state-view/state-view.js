// Copyright 2018 The AMPHTML Authors
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

const JSONTreeView = require('json-tree-view');
require('json-tree-view/example/build/devtools.css');
require('./state-view.scss');

// import events from '../events/events.js';
import * as Button from '../button/button.js';
import FlyIn from '../fly-in/base.js';

export function createStateView(target, trigger) {
  return new StateView(target, trigger);
}

const DESKTOP_WIDTH = 1024;

class StateView extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));

    const view = new JSONTreeView('example', this.getJSONData());
    view.showCountOfObjectOrArray = false;
    view.readonly = true;
    view.expand(true);

    const content = document.createElement('div');
    content.className = 'state-view';
    content.appendChild(view.dom);

    this.upadateContent(content);
  }

  getJSONData() {
    const json = {
    }
    return json;
  }
}
