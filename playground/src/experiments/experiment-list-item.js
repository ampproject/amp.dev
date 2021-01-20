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

import './experiment-list-item.scss';
import template from './experiment-list-item.hbs';
import events from '../events/events.js';

export const EVENT_REMOVE_EXPERIMENT = 'event-remove-experiment';

export function createExperimentListItem(target, experiment) {
  return new ExperimentItem(target, experiment);
}

class ExperimentItem {
  /**
   * @param {Element} target  Where the item gets appended to
   * @param {Object} experiment Holds information about the experiment
   */
  constructor(target, experiment) {
    this.experiment = experiment;
    this.target = target;
    this.item = target.appendChild(this._render(experiment));

    this.item
      .querySelector('button')
      .addEventListener('click', this._onClick.bind(this));
  }

  /**
   * Renders template with the information given in details
   * @return {Element}
   */
  _render(experiment) {
    const item = document.createElement('li');
    item.className = 'experiments-list-item';

    item.insertAdjacentHTML(
      'beforeend',
      template({
        experiment,
      })
    );

    return item;
  }

  _onClick(e) {
    e.preventDefault();
    this.target.removeChild(this.item);
    events.publish(EVENT_REMOVE_EXPERIMENT, this.experiment);
  }
}
